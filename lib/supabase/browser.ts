import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton. Throws at first use (not at module load), so that pages importing
// this module can still prerender at build time when env vars aren't injected.
// In the browser, NEXT_PUBLIC_* env vars are baked into the client bundle at build,
// so getSupabase() succeeds on first call as long as they were set before `next build`.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  _client = createClient(url, key);
  return _client;
}
