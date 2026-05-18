// Supabase Edge Function — runs on Deno, deployed via `supabase functions deploy create-booking`.
// Auto-injected env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Manually-set secrets: STRIPE_SECRET_KEY.
// @ts-nocheck — Deno + esm.sh imports the Next.js TS server cannot resolve.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const BookingRequestSchema = z.object({
  postcode: z.string().min(5).max(20),
  bedrooms: z.enum(["studio", "1", "2", "3", "4", "5_plus"]),
  bathrooms: z.enum(["1", "2", "3", "4_plus"]),
  additionalRooms: z.array(z.string()),
  frequency: z.enum(["weekly", "fortnightly", "monthly", "one_off"]),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTimeSlot: z.enum(["morning", "afternoon", "either"]),
  contactName: z.string().min(1).max(200),
  contactEmail: z.string().email().max(200),
  contactPhone: z.string().min(1).max(50),
  notes: z.string().max(2000).optional().default(""),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

const LAUNCH_POSTCODES = ["M20", "M21", "M14"];

function calculatePricePence(bedrooms: string, frequency: string): number {
  const base: Record<string, number> = {
    studio: 3500,
    "1": 4200,
    "2": 4200,
    "3": 5200,
    "4": 6200,
    "5_plus": 7200,
  };
  const adjust: Record<string, number> = {
    weekly: 1.0,
    fortnightly: 1.0,
    monthly: 1.05,
    one_off: 1.5,
  };
  const b = base[bedrooms] ?? 4200;
  const a = adjust[frequency] ?? 1.0;
  return Math.round(b * a);
}

async function createStripePaymentIntent(params: {
  amount: number;
  currency: string;
  description: string;
  receiptEmail: string;
  metadata: Record<string, string>;
}): Promise<{ id: string; client_secret: string }> {
  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  const body = new URLSearchParams();
  body.append("amount", String(params.amount));
  body.append("currency", params.currency);
  body.append("description", params.description);
  body.append("receipt_email", params.receiptEmail);
  body.append("automatic_payment_methods[enabled]", "true");
  Object.entries(params.metadata).forEach(([k, v]) => {
    body.append(`metadata[${k}]`, v);
  });

  const res = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Stripe ${res.status}: ${errText}`);
  }
  const json = await res.json();
  return { id: json.id, client_secret: json.client_secret };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const parsed = BookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.format() }),
      { status: 400, headers: jsonHeaders },
    );
  }
  const data = parsed.data;

  const outward = data.postcode.toUpperCase().replace(/\s+/g, "").slice(0, 3);
  if (!LAUNCH_POSTCODES.includes(outward)) {
    return new Response(
      JSON.stringify({
        error: "Postcode outside launch area",
        details:
          "Tarnshire only takes bookings in M20, M21, or M14 at v1. Outside the triangle, use the waitlist.",
      }),
      { status: 400, headers: jsonHeaders },
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE env vars");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const pricePence = calculatePricePence(data.bedrooms, data.frequency);

  const { data: row, error: insertErr } = await supabase
    .from("bookings")
    .insert({
      postcode: data.postcode,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      additional_rooms: data.additionalRooms,
      frequency: data.frequency,
      preferred_date: data.preferredDate,
      preferred_time_slot: data.preferredTimeSlot,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone,
      notes: data.notes || null,
      price_per_visit_pence: pricePence,
      amount_charged_pence: pricePence,
      status: "pending_payment",
    })
    .select("id")
    .single();

  if (insertErr || !row) {
    console.error("Insert failed:", insertErr);
    return new Response(JSON.stringify({ error: "Database insert failed" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  try {
    const intent = await createStripePaymentIntent({
      amount: pricePence,
      currency: "gbp",
      description: `Tarnshire booking — ${data.bedrooms} bed ${data.frequency} clean (${outward})`,
      receiptEmail: data.contactEmail,
      metadata: {
        booking_id: row.id,
        postcode: data.postcode,
        contact_name: data.contactName,
      },
    });

    await supabase
      .from("bookings")
      .update({ stripe_payment_intent_id: intent.id })
      .eq("id", row.id);

    return new Response(
      JSON.stringify({
        ok: true,
        booking_id: row.id,
        client_secret: intent.client_secret,
        amount_pence: pricePence,
      }),
      { status: 200, headers: jsonHeaders },
    );
  } catch (err) {
    console.error("Stripe error:", err);
    await supabase.from("bookings").update({ status: "failed" }).eq("id", row.id);
    return new Response(JSON.stringify({ error: "Payment setup failed" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
});
