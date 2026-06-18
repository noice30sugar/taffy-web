// Server-side waitlist insert against Supabase PostgREST.
// Uses the publishable (anon) key + an insert-only RLS policy — no service-role
// secret is needed or stored. Runs only in the /api/join route (server).

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

export type JoinResult = "ok" | "duplicate" | "error";

export async function addToWaitlist(
  email: string,
  source = "landing",
): Promise<JoinResult> {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.error("[waitlist] Supabase env not configured");
    return "error";
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, source }),
  });

  if (res.status === 201) return "ok";
  if (res.status === 409) return "duplicate"; // unique(email) violation
  console.error("[waitlist] insert failed", res.status, await res.text());
  return "error";
}
