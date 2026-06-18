import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";

export default function FinalCta() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-line bg-ink-2 px-8 py-16 text-center sm:px-16">
        <div className="glow glow-gold left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2" />
        <div className="relative flex flex-col items-center">
          <h2 className="text-4xl font-bold leading-tight text-fg sm:text-5xl">
            Be first in line.
          </h2>
          <p className="mt-4 max-w-md text-lg text-fg-dim">
            Join the waitlist and we&rsquo;ll let you know the moment Taffy lands
            on the App Store.
          </p>
          <div className="mt-9 flex w-full justify-center">
            <WaitlistForm source="footer-cta" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
