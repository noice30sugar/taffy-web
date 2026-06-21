"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./ui/SectionHeading";

type Feature = {
  eyebrow: string;
  title: string;
  text: string;
  src: string;
  alt: string;
  glow: string;
  /** Bucket-palette color for this step's tick + eyebrow accent. */
  tick: string;
};

const FEATURES: Feature[] = [
  {
    eyebrow: "01 · Connect",
    title: "Link your bank in seconds.",
    text: "Securely connect any Canadian or US bank through Plaid — read-only and bank-grade. Taffy pulls your transactions in; it can never move a cent.",
    src: "/screens/accounts-plaid.png",
    alt: "Taffy — your connected bank accounts and balances",
    glow: "radial-gradient(circle, rgba(253,190,24,.32), transparent 70%)",
    tick: "var(--color-gold)",
  },
  {
    eyebrow: "02 · Sort",
    title: "Sort each charge with a tap.",
    text: "Each charge pops up as a card — tap a category button and it's bucketed. Frequent purchases get auto-tagged, so it's faster every time.",
    src: "/screens/inbox-deck.png",
    alt: "Taffy — tap each transaction into a bucket",
    glow: "radial-gradient(circle, rgba(240,160,32,.32), transparent 70%)",
    tick: "var(--color-cat-tangerine)",
  },
  {
    eyebrow: "03 · See",
    title: "Where your money actually went.",
    text: "Every category sized by what you spent, and measured against last month — up or down, at a glance. The whole story on one screen, no scrolling.",
    src: "/screens/dashboard-overview-v4.png",
    alt: "Taffy dashboard — total spent on a gauge, spending by category, and every category vs last month",
    glow: "radial-gradient(circle, rgba(240,112,80,.32), transparent 70%)",
    tick: "var(--color-cat-coral)",
  },
  {
    eyebrow: "04 · Track",
    title: "Your whole spending story.",
    text: "Zoom from this week to this year to all-time. See month-to-month breakdowns and spending charts, with your top merchants and totals always in view.",
    src: "/screens/lifetime-trend.png",
    alt: "Taffy — lifetime spending, a merchant's trend, and top merchants",
    glow: "radial-gradient(circle, rgba(250,128,164,.3), transparent 70%)",
    tick: "var(--color-pink)",
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Which step crosses screen-center is the active one. A centered IO band
  // (top/bottom 45% trimmed) means only the block over the middle counts —
  // JS just picks the index; the screen crossfade itself is pure CSS.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of stepRefs.current) if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how" className="scroll-mt-[90px] px-6 pt-16 pb-9">
      <Reveal className="relative mx-auto mb-[70px] max-w-[720px]">
        <SectionHeading
          eyebrow="How it works"
          title="Connect once. Then just tap."
          subtitle="No budgets to babysit. Four screens take you from a messy feed to your whole spending story."
          align="center"
        />
      </Reveal>

      <div className="tour">
        {/* Pinned stage: phone holds all four screens stacked; the active one
            crossfades in. Tick rail tracks progress. Hidden on mobile. */}
        <div className="tour-stage" aria-hidden="true">
          <ol className="tour-ticks">
            {FEATURES.map((f, i) => (
              <li
                key={f.eyebrow}
                className={`tour-tick ${i === active ? "on" : ""}`}
                style={{ ["--tick" as string]: f.tick }}
              />
            ))}
          </ol>
          <div className="tour-phone">
            <span
              className="tour-glow"
              style={{ background: FEATURES[active].glow }}
            />
            <div className="tour-screens">
              {FEATURES.map((f, i) => (
                <Image
                  key={f.src}
                  className={`tour-screen ${i === active ? "on" : ""}`}
                  src={f.src}
                  alt=""
                  fill
                  sizes="300px"
                  priority={i === 0}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling copy. Each step is ~90vh so the stage stays pinned across
            the whole section; the active one lights up, the rest dim. */}
        <div className="tour-steps">
          {FEATURES.map((f, i) => (
            <article
              key={f.eyebrow}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-idx={i}
              className={`tour-step ${i === active ? "on" : ""}`}
            >
              {/* Mobile-only inline phone — the pinned stage is hidden < 820px. */}
              <div className="tour-step-shot">
                <span className="tour-glow" style={{ background: f.glow }} />
                <Image
                  src={f.src}
                  alt={f.alt}
                  width={1206}
                  height={2622}
                  sizes="300px"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <span className="tour-step-eyebrow" style={{ color: f.tick }}>
                {f.eyebrow}
              </span>
              <h3 className="tour-step-title">{f.title}</h3>
              <p className="tour-step-text">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
