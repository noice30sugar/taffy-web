import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./ui/SectionHeading";

type Feature = {
  eyebrow: string;
  title: string;
  text: string;
  src: string;
  alt: string;
  glow: string;
  reversed?: boolean;
};

const FEATURES: Feature[] = [
  {
    eyebrow: "01 · Connect",
    title: "Link your bank in seconds.",
    text: "Securely connect any Canadian bank through Plaid — read-only and bank-grade. Taffy pulls your transactions in; it can never move a cent.",
    src: "/screens/accounts-plaid.png",
    alt: "Taffy — your connected bank accounts and balances",
    glow: "radial-gradient(circle, rgba(253,190,24,.32), transparent 70%)",
  },
  {
    eyebrow: "02 · Sort",
    title: "Swipe each charge into a bucket.",
    text: "It feels like stamping a deck of cards — flick one way, flick the other, and a whole month sorts in about a minute. Auto-tag learns your regulars, so the pile shrinks every visit.",
    src: "/screens/inbox-deck.png",
    alt: "Taffy — swipe each transaction into a bucket",
    glow: "radial-gradient(circle, rgba(240,160,32,.32), transparent 70%)",
    reversed: true,
  },
  {
    eyebrow: "03 · See",
    title: "Where your money actually went.",
    text: "A live donut breaks the month down by category — always measured against the period before, so you feel the change, not just the total.",
    src: "/screens/dashboard-donut.png",
    alt: "Taffy — where your month went, the donut dashboard",
    glow: "radial-gradient(circle, rgba(247,222,150,.3), transparent 70%)",
  },
  {
    eyebrow: "04 · Track",
    title: "Your whole spending story.",
    text: "Zoom from this week to this year to all-time. Taffy keeps your top merchants and totals in view, and shows how today stacks up against your past self.",
    src: "/screens/lifetime.png",
    alt: "Taffy — lifetime spending and top merchants",
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
          title="Connect once. Then just swipe."
          subtitle="No budgets to babysit. Four screens take you from a messy feed to your whole spending story."
          align="center"
        />
      </Reveal>

      <div className="tf-feat">
        {FEATURES.map((f) => (
          <Reveal key={f.eyebrow}>
            <div className={`tf-feat-row ${f.reversed ? "rev" : ""}`}>
              <div className="tf-feat-shot">
                <span className="tf-feat-glow" style={{ background: f.glow }} />
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
