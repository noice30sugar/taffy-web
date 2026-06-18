import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";

type Feature = {
  n: string;
  headline: string;
  subline: string;
  src: string;
  alt: string;
  pink?: boolean; // sparing pink pop for the delight/mascot beat
};

const FEATURES: Feature[] = [
  {
    n: "01",
    headline: "Swipe. Sorted.",
    subline: "A month of transactions, one flick each.",
    src: "/screens/inbox-deck.png",
    alt: "Swipeable deck of transactions to sort into buckets",
  },
  {
    n: "02",
    headline: "Where it all went.",
    subline: "Your whole month, minus the spreadsheet.",
    src: "/screens/dashboard-donut.png",
    alt: "Spending donut showing where the month's money went",
  },
  {
    n: "03",
    headline: "The receipts, all the way back.",
    subline: "Lifetime trends and your top merchants.",
    src: "/screens/lifetime.png",
    alt: "Lifetime spending trends and top merchants",
  },
  {
    n: "04",
    headline: "It learns your regulars.",
    subline: "Repeat merchants sort themselves.",
    src: "/screens/autotag-review.png",
    alt: "Auto-tag rules sorting repeat merchants automatically",
  },
  {
    n: "05",
    headline: "Deck cleared.",
    subline: "Most sessions take under a minute.",
    src: "/screens/all-caught-up.png",
    alt: "Inbox zero — the Taffy companion celebrates a cleared deck",
    pink: true,
  },
  {
    n: "06",
    headline: "Your bank. Never your password.",
    subline: "Every connection secured by Plaid.",
    src: "/screens/accounts-plaid.png",
    alt: "Securely connect a bank through Plaid",
  },
];

export default function Features() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      {/* wedge lead-in */}
      <Reveal className="mx-auto mb-24 max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Sort, don&rsquo;t budget
        </p>
        <h2 className="text-balance text-4xl font-bold leading-tight text-fg sm:text-5xl">
          Less than a budgeting app.
          <br className="hidden sm:block" /> That&rsquo;s the whole point.
        </h2>
      </Reveal>

      <div className="mx-auto flex max-w-5xl flex-col gap-28 sm:gap-36">
        {FEATURES.map((f, i) => {
          const imageRight = i % 2 === 0;
          return (
            <Reveal
              key={f.n}
              className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2"
            >
              {/* text */}
              <div className={imageRight ? "lg:order-1" : "lg:order-2"}>
                <span
                  className={`font-mono text-sm font-medium tracking-widest ${
                    f.pink ? "text-pink" : "text-gold"
                  }`}
                >
                  {f.n}
                </span>
                <h3 className="mt-3 text-3xl font-bold leading-tight text-fg sm:text-4xl">
                  {f.headline}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-fg-dim">
                  {f.subline}
                </p>
              </div>

              {/* phone */}
              <div
                className={`flex justify-center ${
                  imageRight ? "lg:order-2 lg:justify-end" : "lg:order-1 lg:justify-start"
                }`}
              >
                <PhoneFrame
                  src={f.src}
                  alt={f.alt}
                  width={290}
                  className={imageRight ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
