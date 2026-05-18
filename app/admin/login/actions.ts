"use server";

import { validateAdminPassword, createAdminSession } from "@/lib/admin-auth";

type LoginResult = { ok: true } | { ok: false; error: string };

export async function loginAction(password: string): Promise<LoginResult> {
  if (!password) return { ok: false, error: "Password is required." };
  let valid = false;
  try {
    valid = validateAdminPassword(password);
  } catch {
    return { ok: false, error: "Server misconfiguration. Contact support." };
  }
  if (!valid) {
    await new Promise((r) => setTimeout(r, 500));
    return { ok: false, error: "Incorrect password." };
  }
  await createAdminSession();
  return { ok: true };
}
