import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Taffy",
  robots: { index: false }, // shell only; un-block once real content lands
};

// SHELL ONLY. The full Privacy Policy content is owned by the
// "Real legal + App Store URLs" roadmap task (generate via Termly per
// docs/launch-setup.md §C). This page reserves the clean /privacy URL the
// iOS app already links to.
export default function Privacy() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-6 py-24">
      <Link href="/" className="text-sm text-ink-secondary hover:text-gold">
        ← Taffy
      </Link>
      <h1 className="text-3xl font-bold text-ink-primary">Privacy Policy</h1>
      <p className="text-ink-secondary">
        Our full privacy policy is coming soon, ahead of Taffy&rsquo;s public
        launch.
      </p>
      <p className="text-ink-secondary">
        In short: bank login credentials never touch our servers (they go
        directly to your bank through Plaid), your data is isolated per-user, we
        never sell your data, and you can delete your account and all its data
        from inside the app at any time.
      </p>
      <p className="text-sm text-ink-secondary">
        Questions?{" "}
        <a
          href="mailto:support@taffybuckets.com"
          className="text-gold hover:underline"
        >
          support@taffybuckets.com
        </a>
      </p>
    </main>
  );
}
