import Reveal from "./Reveal";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import { FAQS } from "@/lib/structured-data";

/**
 * Visible FAQ, rendered from the same `FAQS` array that feeds the `FAQPage`
 * JSON-LD in `app/page.tsx`. Keeping one source means the structured data
 * always mirrors what a reader actually sees — the condition that makes
 * `FAQPage` markup legitimate rather than a policy violation.
 *
 * Built on native `<details>`/`<summary>`: no client JS, keyboard- and
 * screen-reader-accessible for free, and the answer text stays in the DOM even
 * while collapsed, so crawlers and LLMs read all of it.
 */
export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-[90px] px-6 pt-16 pb-9">
      <Reveal className="relative mx-auto mb-12 max-w-[720px]">
        <SectionHeading
          eyebrow="Questions"
          title="The things people ask first."
          subtitle="What Taffy is, how it reaches your bank, and what it costs."
          align="center"
        />
      </Reveal>

      <Reveal className="mx-auto max-w-[780px]">
        <Card surface="elevated" className="!p-0">
          {FAQS.map(({ question, answer }, i) => (
            <details
              key={question}
              className={`group ${i > 0 ? "border-t border-line" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-base font-semibold text-fg transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                {question}
                <Chevron />
              </summary>
              <p className="px-6 pb-5 pr-12 text-[0.95rem] leading-relaxed text-fg-dim">
                {answer}
              </p>
            </details>
          ))}
        </Card>
      </Reveal>
    </section>
  );
}

/** Caret that rotates and goes gold when its parent `<details>` is open. */
function Chevron() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
      className="shrink-0 text-fg-faint transition-transform duration-300 group-open:rotate-180 group-open:text-gold"
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
