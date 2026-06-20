import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./ui/SectionHeading";

type Crop = { src: string; alt: string; w: number; h: number };
type Feature = {
  eyebrow: string;
  title: string;
  text: string;
  src: string;
  alt: string;
  glow: string;
  reversed?: boolean;
  /** Feature 03: dashboard phone with two floating cropped cards. */
  orbit?: { phoneW: number; phoneH: number; crops: Crop[] };
};

const FEATURES: Feature[] = [
  {
    eyebrow: "01 · Connect",
    title: "Link your bank in seconds.",
    text: "Securely connect any Canadian or US bank through Plaid — read-only and bank-grade. Taffy pulls your transactions in; it can never move a cent.",
    src: "/screens/accounts-plaid.png",
    alt: "Taffy — your connected bank accounts and balances",
    glow: "radial-gradient(circle, rgba(253,190,24,.32), transparent 70%)",
  },
  {
    eyebrow: "02 · Sort",
    title: "Sort each charge with a tap.",
    text: "Each charge pops up as a card — tap a category button and it's bucketed. Frequent purchases get auto-tagged, so it's faster every time.",
    src: "/screens/inbox-deck.png",
    alt: "Taffy — tap each transaction into a bucket",
    glow: "radial-gradient(circle, rgba(240,160,32,.32), transparent 70%)",
    reversed: true,
  },
  {
    eyebrow: "03 · See",
    title: "Where your money actually went.",
    text: "A live gauge totals the month, the donut splits it into buckets, and every category is measured against the month before — the whole story, no scrolling.",
    src: "/screens/dashboard-gauge.png",
    alt: "Taffy dashboard — the monthly spending gauge and total",
    glow: "radial-gradient(circle, rgba(247,222,150,.32), transparent 70%)",
    orbit: {
      phoneW: 368,
      phoneH: 800,
      crops: [
        {
          src: "/screens/breakdown-crop.png",
          alt: "Taffy — spending by category this month",
          w: 344,
          h: 542,
        },
        {
          src: "/screens/compare-crop.png",
          alt: "Taffy — every category compared against last month",
          w: 344,
          h: 445,
        },
      ],
    },
  },
  {
    eyebrow: "04 · Track",
    title: "Your whole spending story.",
    text: "Zoom from this week to this year to all-time. See month-to-month breakdowns and spending charts, with your top merchants and totals always in view.",
    src: "/screens/lifetime-trend.png",
    alt: "Taffy — lifetime spending, a merchant's trend, and top merchants",
    glow: "radial-gradient(circle, rgba(253,190,24,.3), transparent 70%)",
    reversed: true,
  },
];

export default function Features() {
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

      <div className="tf-feat">
        {FEATURES.map((f) => (
          <Reveal key={f.eyebrow}>
            <div className={`tf-feat-row ${f.reversed ? "rev" : ""}`}>
              <div className={`tf-feat-shot ${f.orbit ? "tf-orbit" : ""}`}>
                <span className="tf-feat-glow" style={{ background: f.glow }} />
                {f.orbit ? (
                  <>
                    <div className="tf-orbit-phone">
                      <Image
                        src={f.src}
                        alt={f.alt}
                        width={f.orbit.phoneW}
                        height={f.orbit.phoneH}
                        sizes="224px"
                      />
                    </div>
                    {f.orbit.crops.map((c, i) => (
                      <figure key={c.src} className={`tf-crop tf-crop-${i === 0 ? "a" : "b"}`}>
                        <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="300px" />
                      </figure>
                    ))}
                  </>
                ) : (
                  <div className="tf-feat-phone">
                    <Image
                      src={f.src}
                      alt={f.alt}
                      width={1206}
                      height={2622}
                      sizes="300px"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
              <div className="tf-feat-copy">
                <span className="tf-feat-eyebrow">{f.eyebrow}</span>
                <h3 className="tf-feat-title">{f.title}</h3>
                <p className="tf-feat-text">{f.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
