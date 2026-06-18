// PLACEHOLDER — Phase A foundation only.
// The real landing-page design + layout (hero, features, screenshots, waitlist
// form, motion) is built in Phase B. This stub just confirms the foundation:
// brand fonts load, brand tokens resolve, and the dev server renders.

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink">
        Phase A · foundation
      </p>
      <h1 className="text-5xl font-extrabold tracking-tight text-ink-primary">
        Taffy
      </h1>
      <p className="text-lg text-ink-secondary">Bucket your spending.</p>
      <p className="mt-6 max-w-md text-sm text-ink-secondary">
        Scaffold ready. Waitlist API live at{" "}
        <code className="rounded bg-cream px-1.5 py-0.5">/api/join</code>. The
        landing page design is built in Phase B.
      </p>
    </main>
  );
}
