import PhoneFrame from "./PhoneFrame";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-36 pb-24 sm:pt-44">
      {/* atmosphere */}
      <div className="glow glow-gold left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2" />
      <div className="glow glow-pink right-[8%] top-[40%] h-[260px] w-[260px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="flex flex-col items-start">
          <span className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Coming soon to iOS
          </span>

          <h1 className="rise text-5xl font-extrabold leading-[1.02] text-fg sm:text-6xl lg:text-7xl" style={{ ["--rise-delay" as string]: "80ms" }}>
            Bucket your
            <br />
            spending.
          </h1>

          <p className="rise mt-6 max-w-md text-lg leading-relaxed text-fg-dim" style={{ ["--rise-delay" as string]: "160ms" }}>
            You don&rsquo;t want a budget. You just want to see where your money
            goes. Taffy is spending awareness without the homework — swipe each
            transaction into a bucket, and you&rsquo;re done.
          </p>

          <div id="join" className="rise mt-9 w-full scroll-mt-28" style={{ ["--rise-delay" as string]: "240ms" }}>
            <WaitlistForm source="hero" />
          </div>

          <div className="rise mt-7 flex flex-wrap items-center gap-3" style={{ ["--rise-delay" as string]: "320ms" }}>
            <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/60 px-4 py-2 text-sm text-fg-dim">
               Coming to the App Store
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/60 px-4 py-2 text-sm text-fg-dim">
              TestFlight beta soon
            </span>
          </div>
        </div>

        {/* hero phone */}
        <div className="rise relative flex justify-center lg:justify-end" style={{ ["--rise-delay" as string]: "200ms" }}>
          <PhoneFrame
            src="/screens/inbox-deck.png"
            alt="Taffy inbox — swipe each transaction into a bucket"
            priority
            width={326}
            className="rotate-[2deg]"
          />
        </div>
      </div>
    </section>
  );
}
