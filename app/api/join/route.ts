import { NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/waitlist";

// Basic email shape check — the DB enforces uniqueness; this just rejects junk early.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email: unknown;
  let source: unknown;
  try {
    const body = await req.json();
    email = body?.email;
    source = body?.source;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !EMAIL_RE.test(email.trim())
  ) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const result = await addToWaitlist(
    email.trim().toLowerCase(),
    typeof source === "string" ? source.slice(0, 40) : "landing",
  );

  // Treat duplicate as success — don't reveal who's already signed up, and a
  // returning visitor should see the same friendly confirmation.
  if (result === "ok") return NextResponse.json({ ok: true });
  if (result === "duplicate")
    return NextResponse.json({ ok: true, duplicate: true });

  return NextResponse.json({ error: "server_error" }, { status: 500 });
}
