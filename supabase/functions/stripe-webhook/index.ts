// Supabase Edge Function — runs on Deno, deployed via `supabase functions deploy stripe-webhook`.
// Auto-injected env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Manually-set secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, OPS_NOTIFICATION_EMAIL, FROM_EMAIL.
// @ts-nocheck — Deno + esm.sh imports the Next.js TS server cannot resolve.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno&deno-std=0.224.0&no-check";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "stripe-signature, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

async function sendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    reply_to?: string;
    subject: string;
    html: string;
  },
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!stripeKey || !webhookSecret) {
    console.error("Missing Stripe env vars");
    return new Response(JSON.stringify({ error: "Server config error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing stripe-signature header" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const body = await req.text();
  const stripe = new Stripe(stripeKey, {
    apiVersion: "2024-09-30.acacia" as any,
    httpClient: Stripe.createFetchHttpClient(),
  });

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const opsEmail = Deno.env.get("OPS_NOTIFICATION_EMAIL") ?? "ss7538dk@gmail.com";
  const fromEmail = (Deno.env.get("FROM_EMAIL") ?? "Tarnshire <quotes@tarnshire.co.uk>").replace(
    "quotes@",
    "bookings@",
  );

  console.log(`Received event: ${event.type} ${event.id}`);

  switch (event.type) {
    case "payment_intent.succeeded": {
      const intent = event.data.object as any;
      const bookingId = intent.metadata?.booking_id;
      if (!bookingId) {
        console.error("No booking_id in PaymentIntent metadata");
        return new Response(JSON.stringify({ received: true, warning: "No booking_id" }), {
          status: 200,
          headers: jsonHeaders,
        });
      }

      const { data: booking, error: fetchErr } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();
      if (fetchErr || !booking) {
        console.error("Booking not found:", bookingId, fetchErr);
        return new Response(JSON.stringify({ received: true, warning: "Booking not found" }), {
          status: 200,
          headers: jsonHeaders,
        });
      }

      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          confirmed_at: new Date().toISOString(),
          stripe_customer_id: intent.customer || null,
        })
        .eq("id", bookingId);

      if (resendKey) {
        try {
          await Promise.all([
            sendEmail(resendKey, {
              from: fromEmail,
              to: [opsEmail],
              reply_to: booking.contact_email,
              subject: `New booking confirmed — ${booking.contact_name} (${booking.postcode.slice(0, 3)})`,
              html: buildOpsEmail(booking),
            }),
            sendEmail(resendKey, {
              from: fromEmail,
              to: [booking.contact_email],
              reply_to: "hello@tarnshire.co.uk",
              subject: "Your Tarnshire booking is confirmed",
              html: buildCustomerEmail(booking),
            }),
          ]);
        } catch (emailErr) {
          console.error("Email send failed:", emailErr);
        }
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as any;
      const bookingId = intent.metadata?.booking_id;
      if (bookingId) {
        await supabase.from("bookings").update({ status: "failed" }).eq("id", bookingId);
      }
      break;
    }

    case "payment_intent.canceled": {
      const intent = event.data.object as any;
      const bookingId = intent.metadata?.booking_id;
      if (bookingId) {
        await supabase
          .from("bookings")
          .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
          .eq("id", bookingId);
      }
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as any;
      const intentId = charge.payment_intent;
      if (intentId) {
        await supabase
          .from("bookings")
          .update({ status: "refunded" })
          .eq("stripe_payment_intent_id", intentId);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200, headers: jsonHeaders });
});

function buildOpsEmail(booking: any): string {
  const amount = (booking.amount_charged_pence / 100).toFixed(2);
  return `<!DOCTYPE html><html><body style="margin:0; padding:32px 16px; background:#F7F4EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#15171A;">
    <div style="max-width:560px; margin:0 auto;">
      <p style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#0E5E5A; margin:0 0 16px;">Booking confirmed — payment received</p>
      <h1 style="font-family:Georgia,serif; font-size:28px; line-height:1.15; margin:0 0 24px;">£${amount} · ${escapeHtml(booking.contact_name)}</h1>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; text-transform:uppercase; color:#6F6E6B;">Email</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;"><a href="mailto:${escapeHtml(booking.contact_email)}" style="color:#15171A;">${escapeHtml(booking.contact_email)}</a></td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; text-transform:uppercase; color:#6F6E6B;">Phone</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(booking.contact_phone)}</td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; text-transform:uppercase; color:#6F6E6B;">Postcode</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(booking.postcode)}</td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; text-transform:uppercase; color:#6F6E6B;">Property</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(booking.bedrooms)} bed · ${escapeHtml(booking.bathrooms)} bath</td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; text-transform:uppercase; color:#6F6E6B;">Frequency</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(booking.frequency)}</td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; text-transform:uppercase; color:#6F6E6B;">First visit</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(booking.preferred_date)} · ${escapeHtml(booking.preferred_time_slot)}</td></tr>
      </table>
      ${booking.notes ? `<h3 style="font-family:Georgia,serif; font-size:16px; margin:24px 0 8px;">Customer notes</h3><p style="font-size:14px; line-height:1.55; margin:0; color:#3A3A3A; white-space:pre-wrap;">${escapeHtml(booking.notes)}</p>` : ""}
      <p style="font-size:11px; text-transform:uppercase; color:#6F6E6B; margin:32px 0 0;">Reference: ${booking.id}</p>
      <p style="font-size:14px; color:#3A3A3A; margin:16px 0 0;">Assign a cleaner via /admin and confirm the visit time with the customer within 24 working hours.</p>
    </div></body></html>`;
}

function buildCustomerEmail(booking: any): string {
  const amount = (booking.amount_charged_pence / 100).toFixed(2);
  const firstName = booking.contact_name.split(" ")[0];
  return `<!DOCTYPE html><html><body style="margin:0; padding:48px 16px; background:#F7F4EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#15171A;">
    <div style="max-width:520px; margin:0 auto;">
      <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:500; margin:0 0 32px;">Tarnshire</p>
      <h1 style="font-family:Georgia,serif; font-size:32px; line-height:1.1; margin:0 0 24px;">Thanks, ${escapeHtml(firstName)}. Your booking is confirmed.</h1>
      <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 20px;">Payment of <strong>£${amount}</strong> received. Your first visit is scheduled for <strong>${escapeHtml(booking.preferred_date)}, ${escapeHtml(booking.preferred_time_slot)}</strong>.</p>
      <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 20px;">We'll be in touch within 24 working hours to confirm which cleaner will attend. You'll receive their name and a phone number in case anything changes on the day.</p>
      <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 32px;">If anything in the booking needs changing, just reply to this email.</p>
      <p style="font-size:11px; letter-spacing:0.04em; text-transform:uppercase; color:#6F6E6B; margin:32px 0 0;">Reference: ${booking.id}</p>
      <hr style="border:none; border-top:1px solid #E5E2DC; margin:32px 0 24px;" />
      <p style="font-size:12px; line-height:1.5; color:#6F6E6B; margin:0;">Tarnshire is a trading name of Brushly Ltd, registered in England and Wales (Company No. 17056861). Registered office: 18 Howard Road, Reigate, RH2 7JE.</p>
    </div></body></html>`;
}
