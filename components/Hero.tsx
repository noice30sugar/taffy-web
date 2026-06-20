import Image from "next/image";
import PhoneFrame from "./PhoneFrame";
import AppStoreBadge from "./AppStoreBadge";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-[172px]">
      <div className="relative z-[2] mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="flex flex-col items-start">
          <span className="rise inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-[15px] py-[7px] text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Coming soon to iOS
          </span>

          <h1
            className="rise mt-[22px] text-fg"
            style={{
              ["--rise-delay" as string]: "80ms",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 6vw, 4.8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Bucket your
            <br />
            spending.
          </h1>

          <p
            className="rise mt-[22px] max-w-[30rem] text-fg-dim"
            style={{ ["--rise-delay" as string]: "160ms", fontSize: "1.14rem", lineHeight: 1.62 }}
          >
            You don&rsquo;t want a budget. You want to see where your money goes.
            Taffy turns the chore into a swipe — connect your bank, flick each
            transaction into a bucket, done.
          </p>

          <div
            className="rise mt-[34px] flex flex-wrap items-center gap-[14px]"
            style={{ ["--rise-delay" as string]: "240ms" }}
          >
            <AppStoreBadge />
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-2xl border border-line bg-transparent px-7 py-3.5 text-base font-semibold text-fg transition outline-none hover:bg-ink-2 focus-visible:ring-2 focus-visible:ring-line active:scale-[0.98]"
            >
              Join the waitlist
            </a>
          </div>

          <p
            className="rise mt-4 text-[0.85rem] text-fg-faint"
            style={{ ["--rise-delay" as string]: "300ms" }}
          >
            Early access · Connect any Canadian bank securely via Plaid
          </p>
        </div>

        {/* hero phone + mascot */}
        <div
          className="rise relative flex min-h-[560px] items-center justify-center"
          style={{ ["--rise-delay" as string]: "180ms" }}
        >
          {/* glow-pulse behind the phone */}
          <div
            aria-hidden
            className="absolute left-[6%] top-[6%] z-0 h-[88%] w-[88%]"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(253,190,24,.22), transparent 62%)",
              filter: "blur(18px)",
              animation: "glowpulse 7s ease-in-out infinite",
            }}
          />
          <div className="relative" style={{ transform: "rotate(2deg)" }}>
            <PhoneFrame
              src="/screens/inbox-deck.png"
              alt="Taffy inbox — swipe each transaction into a bucket"
              priority
              width={312}
              className="relative z-[1]"
            />
            <Image
              src="/brand/bucket-hat.png"
              alt=""
              width={673}
              height={415}
              aria-hidden
              className="absolute z-[2] h-auto w-[150px]"
              style={{
                top: "-24px",
                right: "-52px",
                transform: "rotate(37deg)",
                transformOrigin: "center",
                filter: "drop-shadow(0 12px 18px rgba(0,0,0,.45))",
              }}
            />
          </div>
          {/* ground shadow under the mascot */}
          <span
            aria-hidden
            className="absolute bottom-[-2%] left-0 z-[2] h-[22px] w-[148px]"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,.5), transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          <Image
            src="/mascot/raven-presenting.png"
            alt="Taffy mascot presenting the app"
            width={411}
            height={383}
            priority
            className="absolute bottom-[-9%] left-[-13%] z-[3] w-[252px]"
            style={{ transform: "rotate(-1deg)" }}
          />
        </div>
      </div>
    </section>
  );
}
