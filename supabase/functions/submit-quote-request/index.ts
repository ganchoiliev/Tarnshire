// Supabase Edge Function — runs on Deno, deployed via `supabase functions deploy submit-quote-request`.
// Auto-injected env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Manually-set secrets: RESEND_API_KEY, OPS_NOTIFICATION_EMAIL, FROM_EMAIL.
// @ts-nocheck — this file imports Deno + esm.sh URLs that the Next.js TS server cannot resolve.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const QuoteRequestSchema = z.object({
  sector: z.string().min(1).max(50),
  sizeBand: z.string().min(1).max(50),
  numSites: z.string().min(1).max(20),
  frequency: z.string().min(1).max(50),
  scope: z.array(z.string()).min(1),
  compliance: z.array(z.string()),
  walkthroughDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  walkthroughTimeSlot: z.enum(["morning", "afternoon", "either"]),
  contactName: z.string().min(1).max(200),
  contactRole: z.string().max(200).optional().default(""),
  contactCompany: z.string().min(1).max(200),
  contactEmail: z.string().email().max(200),
  contactPhone: z.string().max(50).optional().default(""),
});

type QuoteRequest = z.infer<typeof QuoteRequestSchema>;

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

  const parsed = QuoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.format() }),
      { status: 400, headers: jsonHeaders },
    );
  }
  const data = parsed.data;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: row, error: insertErr } = await supabase
    .from("quote_requests")
    .insert({
      sector: data.sector,
      size_band: data.sizeBand,
      num_sites: data.numSites,
      frequency: data.frequency,
      scope: data.scope,
      compliance: data.compliance,
      walkthrough_date: data.walkthroughDate,
      walkthrough_time_slot: data.walkthroughTimeSlot,
      contact_name: data.contactName,
      contact_role: data.contactRole || null,
      contact_company: data.contactCompany,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone || null,
    })
    .select("id, created_at")
    .single();

  if (insertErr) {
    console.error("Insert failed:", insertErr);
    return new Response(JSON.stringify({ error: "Database insert failed" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const opsEmail = Deno.env.get("OPS_NOTIFICATION_EMAIL");
  const fromEmail = Deno.env.get("FROM_EMAIL") || "Tarnshire <quotes@tarnshire.co.uk>";

  if (!resendKey || !opsEmail) {
    console.error("Missing RESEND_API_KEY or OPS_NOTIFICATION_EMAIL");
    return new Response(
      JSON.stringify({ ok: true, id: row.id, warning: "Row saved but email not sent" }),
      { status: 200, headers: jsonHeaders },
    );
  }

  try {
    await Promise.all([
      sendEmail(resendKey, {
        from: fromEmail,
        to: [opsEmail],
        reply_to: data.contactEmail,
        subject: `New quote request — ${data.contactCompany} (${data.sector})`,
        html: buildInternalEmail(data, row.id),
      }),
      sendEmail(resendKey, {
        from: fromEmail,
        to: [data.contactEmail],
        reply_to: "hello@tarnshire.co.uk",
        subject: "We've received your quote request — Tarnshire",
        html: buildAckEmail(data, row.id),
      }),
    ]);
  } catch (emailErr) {
    console.error("Email send failed:", emailErr);
    return new Response(
      JSON.stringify({ ok: true, id: row.id, warning: "Row saved, email delivery failed" }),
      { status: 200, headers: jsonHeaders },
    );
  }

  return new Response(JSON.stringify({ ok: true, id: row.id }), {
    status: 200,
    headers: jsonHeaders,
  });
});

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
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}

function buildInternalEmail(data: QuoteRequest, id: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0; padding:32px 16px; background:#F7F4EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#15171A;">
  <div style="max-width:560px; margin:0 auto;">
    <p style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#0E5E5A; margin:0 0 16px;">New quote request</p>
    <h1 style="font-family:Georgia,serif; font-size:28px; line-height:1.15; margin:0 0 24px; color:#15171A;">${escapeHtml(data.contactCompany)}</h1>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Contact</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.contactName)}${data.contactRole ? ` · ${escapeHtml(data.contactRole)}` : ""}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Email</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;"><a href="mailto:${escapeHtml(data.contactEmail)}" style="color:#15171A;">${escapeHtml(data.contactEmail)}</a></td></tr>
      ${data.contactPhone ? `<tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Phone</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.contactPhone)}</td></tr>` : ""}
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Sector</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.sector)}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Size</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.sizeBand)} · ${escapeHtml(data.numSites)} site(s)</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Frequency</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.frequency)}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Scope</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${data.scope.map(escapeHtml).join(", ")}</td></tr>
      ${data.compliance.length > 0 ? `<tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Compliance</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${data.compliance.map(escapeHtml).join(", ")}</td></tr>` : ""}
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Walkthrough</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.walkthroughDate)} · ${escapeHtml(data.walkthroughTimeSlot)}</td></tr>
    </table>
    <p style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B; margin:32px 0 0;">Reference: ${id}</p>
    <p style="font-size:14px; color:#3A3A3A; margin:24px 0 0;">Respond within 24 working hours. Reply to this email to reach the prospect directly.</p>
  </div>
</body></html>`;
}

function buildAckEmail(data: QuoteRequest, id: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0; padding:48px 16px; background:#F7F4EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#15171A;">
  <div style="max-width:520px; margin:0 auto;">
    <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:500; color:#15171A; margin:0 0 32px;">Tarnshire</p>
    <h1 style="font-family:Georgia,serif; font-size:32px; line-height:1.1; margin:0 0 24px; color:#15171A;">Thanks, ${escapeHtml(data.contactName.split(" ")[0])}.</h1>
    <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 20px;">We've received your quote request for ${escapeHtml(data.contactCompany)}. Our operations lead will be in touch within 24 working hours, Monday to Friday, to confirm a walkthrough on ${escapeHtml(data.walkthroughDate)}.</p>
    <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 32px;">If anything in the request needs changing, just reply to this email.</p>
    <p style="font-size:11px; letter-spacing:0.04em; text-transform:uppercase; color:#6F6E6B; margin:32px 0 0;">Reference: ${id}</p>
    <hr style="border:none; border-top:1px solid #E5E2DC; margin:32px 0 24px;" />
    <p style="font-size:12px; line-height:1.5; color:#6F6E6B; margin:0;">Tarnshire · Manchester · Greater Manchester · United Kingdom<br>This email was sent because you submitted a quote request at tarnshire.co.uk.</p>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
