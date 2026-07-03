import Image from "next/image";
import DeckSort from "./DeckSort";

export default function Hero() {
  return (
    <section id="top" className="hero-deck">
      <div className="hero-deck-inner">
        {/* copy */}
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <span className="dot" />
            Now on the App Store
          </span>

          <h1 className="hero-h1">
            <span className="hero-bwrap">
              B
              <Image
                src="/brand/bucket-hat.png"
                alt=""
                aria-hidden
                width={60}
                height={37}
                priority
                className="hero-bhat"
              />
            </span>
            ucket your <span className="it">spending.</span>
          </h1>

          <p className="hero-sub">
            You don&rsquo;t want a budget. You want to see where your money goes.
            Taffy turns the chore into a tap — a deck of transactions, one tap
            each, sorted.
          </p>

          <div className="hero-ctas">
            <a
              href="https://apps.apple.com/app/id6781802776"
              target="_blank"
              rel="noopener"
              className="hero-cta"
            >
              Download on the App Store <span className="ic">→</span>
            </a>
            <a href="#how" className="hero-ghost">
              See how it works
            </a>
          </div>

          <p className="hero-fine">
            Free on iPhone · Connect any Canadian or US bank securely via Plaid
          </p>
        </div>

        {/* animated deck-sort */}
        <DeckSort />
      </div>
    </section>
  );
}
