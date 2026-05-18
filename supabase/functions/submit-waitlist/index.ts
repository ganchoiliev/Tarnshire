// Supabase Edge Function — runs on Deno, deployed via `supabase functions deploy submit-waitlist`.
// Auto-injected env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// @ts-nocheck — Deno + esm.sh imports the Next.js TS server cannot resolve.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const WaitlistSchema = z.object({
  email: z.string().email().max(200),
  postcode: z.string().min(2).max(20),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

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

  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Validation failed" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const { email, postcode } = parsed.data;
  const outward = postcode.toUpperCase().replace(/\s+/g, "").slice(0, 3);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const { error } = await supabase
    .from("waitlist")
    .upsert(
      { email, postcode, postcode_outward: outward },
      { onConflict: "email,postcode_outward" },
    );

  if (error) {
    console.error("Waitlist insert failed:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders });
});
