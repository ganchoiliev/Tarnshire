"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminSessionValid, destroyAdminSession } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase/server";

type Result = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<Result> {
  if (!(await isAdminSessionValid())) return { ok: false, error: "Not authenticated." };
  return { ok: true };
}

export async function signOutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function updateQuoteStatusAction(id: string, status: string): Promise<Result> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateApplicationStatusAction(
  id: string,
  status: string,
): Promise<Result> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;
  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from("contractor_applications")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateQuoteNotesAction(id: string, notes: string): Promise<Result> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;
  const supabase = getServiceSupabase();
  const trimmed = notes.trim();
  const { error } = await supabase
    .from("quote_requests")
    .update({ internal_notes: trimmed === "" ? null : trimmed })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateApplicationNotesAction(
  id: string,
  notes: string,
): Promise<Result> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;
  const supabase = getServiceSupabase();
  const trimmed = notes.trim();
  const { error } = await supabase
    .from("contractor_applications")
    .update({ internal_notes: trimmed === "" ? null : trimmed })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}
