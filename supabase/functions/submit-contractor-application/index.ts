import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const ApplicationSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(50),
  boroughPreference: z.enum(["m20", "m21", "m14", "any"]),
  experienceMonths: z.enum(["lt_6", "6_12", "12_24", "gt_24"]),
  languages: z.array(z.string()).min(1),
  hoursPerWeek: z.enum(["lt_10", "10_20", "20_30", "gt_30"]),
  whyTarnshire: z.string().max(2000).optional().default(""),
  rightToWork: z.enum(["yes", "no"]),
  dbsWilling: z.enum(["yes", "no"]),
  selfEmployedOk: z.enum(["yes", "no"]),
  references: z.string().min(1).max(4000),
  anythingElse: z.string().max(2000).optional().default(""),
});

type Application = z.infer<typeof ApplicationSchema>;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

const BOROUGH_LABELS: Record<string, string> = {
  m20: "M20 Didsbury",
  m21: "M21 Chorlton",
  m14: "M14 Withington",
  any: "Any of the three",
};
const EXPERIENCE_LABELS: Record<string, string> = {
  lt_6: "Less than 6 months",
  "6_12": "6–12 months",
  "12_24": "1–2 years",
  gt_24: "2+ years",
};
const HOURS_LABELS: Record<string, string> = {
  lt_10: "Less than 10 hours/week",
  "10_20": "10–20 hours/week",
  "20_30": "20–30 hours/week",
  gt_30: "30+ hours/week",
};
const YES_NO_LABELS: Record<string, string> = { yes: "Yes", no: "No" };

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders,
    });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const parsed = ApplicationSchema.safeParse(body);
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
    console.error("Missing SUPABASE env vars");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: row, error: insertErr } = await supabase
    .from("contractor_applications")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      borough_preference: data.boroughPreference,
      experience_months: data.experienceMonths,
      languages: data.languages,
      hours_per_week: data.hoursPerWeek,
      why_tarnshire: data.whyTarnshire || null,
      right_to_work: data.rightToWork,
      dbs_willing: data.dbsWilling,
      self_employed_ok: data.selfEmployedOk,
      references: data.references,
      anything_else: data.anythingElse || null,
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
  const careersFrom = fromEmail.replace("quotes@", "careers@");

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
        from: careersFrom,
        to: [opsEmail],
        reply_to: data.email,
        subject: `New contractor application — ${data.name} (${BOROUGH_LABELS[data.boroughPreference]})`,
        html: buildInternalEmail(data, row.id),
      }),
      sendEmail(resendKey, {
        from: careersFrom,
        to: [data.email],
        reply_to: "careers@tarnshire.co.uk",
        subject: "Application received — Tarnshire",
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
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}

function buildInternalEmail(data: Application, id: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0; padding:32px 16px; background:#F7F4EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#15171A;">
  <div style="max-width:560px; margin:0 auto;">
    <p style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#0E5E5A; margin:0 0 16px;">New contractor application</p>
    <h1 style="font-family:Georgia,serif; font-size:28px; line-height:1.15; margin:0 0 24px; color:#15171A;">${escapeHtml(data.name)}</h1>

    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Email</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;"><a href="mailto:${escapeHtml(data.email)}" style="color:#15171A;">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Phone</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(data.phone)}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Borough</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(BOROUGH_LABELS[data.boroughPreference] || data.boroughPreference)}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Experience</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(EXPERIENCE_LABELS[data.experienceMonths] || data.experienceMonths)}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Languages</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${data.languages.map(escapeHtml).join(", ")}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Hours/week</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${escapeHtml(HOURS_LABELS[data.hoursPerWeek] || data.hoursPerWeek)}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Right to work</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${YES_NO_LABELS[data.rightToWork]}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">DBS willing</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${YES_NO_LABELS[data.dbsWilling]}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B;">Self-employed OK</td><td style="padding:8px 0; border-bottom:1px solid #E5E2DC; font-size:14px; text-align:right;">${YES_NO_LABELS[data.selfEmployedOk]}</td></tr>
    </table>

    ${data.whyTarnshire ? `<h3 style="font-family:Georgia,serif; font-size:16px; margin:24px 0 8px;">Why Tarnshire</h3><p style="font-size:14px; line-height:1.55; margin:0; color:#3A3A3A; white-space:pre-wrap;">${escapeHtml(data.whyTarnshire)}</p>` : ""}

    <h3 style="font-family:Georgia,serif; font-size:16px; margin:24px 0 8px;">References</h3>
    <p style="font-size:14px; line-height:1.55; margin:0; color:#3A3A3A; white-space:pre-wrap;">${escapeHtml(data.references)}</p>

    ${data.anythingElse ? `<h3 style="font-family:Georgia,serif; font-size:16px; margin:24px 0 8px;">Anything else</h3><p style="font-size:14px; line-height:1.55; margin:0; color:#3A3A3A; white-space:pre-wrap;">${escapeHtml(data.anythingElse)}</p>` : ""}

    <p style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6F6E6B; margin:32px 0 0;">Reference: ${id}</p>
    <p style="font-size:14px; color:#3A3A3A; margin:24px 0 0;">Respond within five working days. Reply to this email to reach the applicant directly.</p>
  </div>
</body></html>`;
}

function buildAckEmail(data: Application, id: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0; padding:48px 16px; background:#F7F4EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#15171A;">
  <div style="max-width:520px; margin:0 auto;">
    <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:500; color:#15171A; margin:0 0 32px;">Tarnshire</p>
    <h1 style="font-family:Georgia,serif; font-size:32px; line-height:1.1; margin:0 0 24px; color:#15171A;">Thanks, ${escapeHtml(data.name.split(" ")[0])}.</h1>
    <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 20px;">We've received your application to join the Tarnshire contractor network in ${escapeHtml(BOROUGH_LABELS[data.boroughPreference] || data.boroughPreference)}. Our standards lead reads every application personally.</p>
    <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 20px;">If your experience and right-to-work status match the standards on our careers page, we'll invite you to a 30-minute conversation within five working days. If not, we'll write back and tell you why.</p>
    <p style="font-size:16px; line-height:1.6; color:#3A3A3A; margin:0 0 32px;">If anything in your application needs changing, just reply to this email.</p>
    <p style="font-size:11px; letter-spacing:0.04em; text-transform:uppercase; color:#6F6E6B; margin:32px 0 0;">Reference: ${id}</p>
    <hr style="border:none; border-top:1px solid #E5E2DC; margin:32px 0 24px;" />
    <p style="font-size:12px; line-height:1.5; color:#6F6E6B; margin:0;">Tarnshire · Manchester · Greater Manchester · United Kingdom<br>This email was sent because you submitted an application at tarnshire.co.uk/careers.</p>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
