import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo preview — Taffy",
  robots: { index: false },
};

// Internal preview: the wordmark at real sizes on dark + light, plus the
// bucket-symbol favicon at small sizes. Not linked from the site.
const SIZES = [
  { px: 200, label: "200px — hero / lockup" },
  { px: 96, label: "96px" },
  { px: 48, label: "48px" },
  { px: 32, label: "32px" },
  { px: 28, label: "28px — nav (current)" },
  { px: 24, label: "24px" },
  { px: 18, label: "18px — tiny" },
];

const FAVICON = [64, 48, 32, 24, 16];

function Row({
  src,
  dark,
}: {
  src: string;
  dark: boolean;
}) {
  return (
    <div
      className="rounded-3xl p-10"
      style={{ background: dark ? "#101014" : "#F0EDE8" }}
    >
      <p
        className="mb-8 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: dark ? "#9a9aa4" : "#6b6b70" }}
      >
        {dark ? "On dark (#101014)" : "On light (#F0EDE8)"}
      </p>
      <div className="flex flex-col gap-8">
        {SIZES.map((s) => (
          <div key={s.px} className="flex items-center gap-8">
            <span
              className="w-44 shrink-0 font-mono text-xs"
              style={{ color: dark ? "#6b6b73" : "#8a8a94" }}
            >
              {s.label}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Taffy" style={{ height: s.px, width: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoPreview() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold text-fg">Wordmark at real sizes</h1>
      <p className="mb-12 text-fg-dim">
        The same mark scaled down — judge legibility (esp. the hat + the{" "}
        <code>a</code> under it) at nav/favicon sizes.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Row src="/brand/taffy-wordmark-hat.png" dark />
        <Row src="/brand/taffy-wordmark-hat-ink.png" dark={false} />
      </div>

      {/* favicon = the hatted "a" (no standalone bucket symbol) */}
      <h2 className="mb-6 mt-16 text-xl font-bold text-fg">
        Favicon — hatted “a”
      </h2>
      <div className="flex flex-wrap items-end gap-8 rounded-3xl bg-ink-2 p-10">
        {FAVICON.map((px) => (
          <div key={px} className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/favicon-a.png"
              alt="Taffy favicon"
              style={{ height: px, width: px }}
            />
            <span className="font-mono text-xs text-fg-faint">{px}px</span>
          </div>
        ))}
      </div>
    </main>
  );
}
