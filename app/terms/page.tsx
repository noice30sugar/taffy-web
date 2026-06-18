import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Taffy",
  robots: { index: false }, // shell only; un-block once real content lands
};

// SHELL ONLY. The full Terms of Service content is owned by the
// "Real legal + App Store URLs" roadmap task (generate via Termly per
// docs/launch-setup.md §C). This page reserves the clean /terms URL the
// iOS app already links to.
export default function Terms() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-6 py-24">
      <Link href="/" className="text-sm text-ink-secondary hover:text-gold">
        ← Taffy
      </Link>
      <h1 className="text-3xl font-bold text-ink-primary">Terms of Service</h1>
      <p className="text-ink-secondary">
        Our full terms of service are coming soon, ahead of Taffy&rsquo;s public
        launch.
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
