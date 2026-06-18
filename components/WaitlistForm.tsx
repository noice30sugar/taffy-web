"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ source = "landing" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(
          data.duplicate
            ? "You're already on the list — see you at launch."
            : "You're on the list. We'll be in touch.",
        );
      } else {
        setStatus("error");
        setMessage(
          data.error === "invalid_email"
            ? "That email doesn't look right."
            : "Something went wrong. Try again?",
        );
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again?");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-fg">
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink"
        >
          ✓
        </span>
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@email.com"
          aria-label="Email address"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-2xl border border-line bg-ink-2 px-5 py-3.5 text-fg placeholder:text-fg-faint outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/25"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-2xl bg-gold px-6 py-3.5 font-semibold text-ink transition hover:brightness-105 active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <p
        className={`mt-2 min-h-5 px-1 text-sm ${
          status === "error" ? "text-pink" : "text-fg-faint"
        }`}
      >
        {status === "error" ? message : "Pre-launch list. No spam — just the launch."}
      </p>
    </form>
  );
}
