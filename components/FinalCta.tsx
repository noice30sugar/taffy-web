import Image from "next/image";
import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";
import AppStoreBadge from "./AppStoreBadge";
import Card from "./ui/Card";

export default function FinalCta() {
  return (
    <section id="download" className="relative scroll-mt-20 px-6 pt-[78px] pb-[90px]">
      <Reveal className="mx-auto max-w-[780px]">
        <Card cornerAccent surface="elevated" className="!p-0">
          <div className="flex flex-col items-center px-8 pt-14 pb-[54px] text-center sm:px-8">
            <Image
              src="/mascot/raven-waving.png"
              alt="Taffy mascot waving"
              width={322}
              height={383}
              className="mb-1.5 h-auto w-40"
              style={{ filter: "drop-shadow(0 16px 28px rgba(0,0,0,.5))" }}
            />
            <h2
              className="text-fg"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Be first in line.
            </h2>
            <p className="mt-4 max-w-[30rem] text-lg leading-relaxed text-fg-dim">
              Taffy lands on the App Store soon. Join the waitlist and we&rsquo;ll
              tell you the moment it&rsquo;s live.
            </p>
            <div className="mt-[30px] flex w-full justify-center">
              <WaitlistForm source="footer-cta" />
            </div>
            <div className="mt-5">
              <AppStoreBadge />
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
