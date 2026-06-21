import { Badge, Button, Card, Input, SectionHeading, Stat } from "@/components/ui";

/**
 * Design-kit showcase — the Taffy web design system translated from the iOS app.
 * Used for visual verification and as usage reference. Not linked from the site.
 */
export const metadata = { title: "Taffy — Design Kit", robots: { index: false } };

const CATEGORIES = [
  { name: "Groceries", color: "var(--color-cat-emerald)" },
  { name: "Coffee", color: "var(--color-cat-amber)" },
  { name: "Transit", color: "var(--color-cat-sky)" },
  { name: "Rent", color: "var(--color-cat-indigo)" },
  { name: "Dining", color: "var(--color-cat-rose)" },
];

export default function KitPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        eyebrow="Design Kit"
        title="Taffy web components"
        subtitle="The iOS app's aesthetic, translated to the web — dark-first, gold-led, with the signature bracketed corners."
      />

      <div className="mt-16 flex flex-col gap-14">
        {/* Typography */}
        <section className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-faint">
            Typography (Gold v3)
          </h3>
          <Card className="flex flex-col gap-7">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-fg-faint">
                Headings · Newsreader (editorial serif) ·{" "}
                <code className="text-fg-dim">--font-heading</code>
              </p>
              <p
                className="text-fg"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "2.6rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                Bucket your{" "}
                <span style={{ fontStyle: "italic", fontWeight: 600, color: "var(--color-gold)" }}>
                  spending.
                </span>
              </p>
              <p className="mt-1 text-sm text-fg-faint">
                Weights 600/700 + italic. Gold italic accent for emphasis words.
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-fg-faint">
                Body / UI · Schibsted Grotesk · <code className="text-fg-dim">--font-body</code>
              </p>
              <p className="max-w-prose text-fg-dim" style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                You don&rsquo;t want a budget. You want to see where your money goes — a
                deck of transactions, one tap each, sorted.
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-fg-faint">
                App-card UI · Plus Jakarta Sans + DM Sans ·{" "}
                <code className="text-fg-dim">--font-card</code> /{" "}
                <code className="text-fg-dim">--font-card-meta</code>
              </p>
              <p className="text-fg" style={{ fontFamily: "var(--font-card)", fontWeight: 800, fontSize: "1.6rem" }}>
                Rabba Foods
              </p>
              <p className="text-fg-faint" style={{ fontFamily: "var(--font-card-meta)", fontSize: "0.95rem" }}>
                Jun 12, 2026 — mirrors the iOS transaction card so the hero deck matches the app.
              </p>
            </div>
          </Card>
        </section>

        {/* Buttons */}
        <section className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-faint">Buttons</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Join the waitlist</Button>
            <Button variant="secondary">See your buckets</Button>
            <Button variant="ghost">Learn more</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        {/* Cards */}
        <section className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-faint">Cards</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            <Card>
              <p className="font-semibold text-fg">Standard</p>
              <p className="mt-1 text-sm text-fg-dim">Card surface on ink with a hairline border.</p>
            </Card>
            <Card cornerAccent>
              <p className="font-semibold text-fg">Corner accent</p>
              <p className="mt-1 text-sm text-fg-dim">The app's signature bracketed corners.</p>
            </Card>
            <Card surface="elevated">
              <p className="font-semibold text-fg">Elevated</p>
              <p className="mt-1 text-sm text-fg-dim">Raised surface for modals & popovers.</p>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-faint">Badges & category buckets</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="gold" dot>Coming soon</Badge>
            <Badge tone="sage">Synced</Badge>
            <Badge tone="silver">Beta</Badge>
            <Badge tone="neutral">Default</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((c) => (
              <Badge key={c.name} color={c.color} dot>{c.name}</Badge>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-faint">Stats</h3>
          <Card className="flex flex-wrap gap-12">
            <Stat label="This month" value="$2,418.50" delta={{ direction: "up", value: "12% vs last" }} />
            <Stat label="Dining out" value="$312.00" delta={{ direction: "down", value: "8% vs last" }} />
            <Stat label="Transactions sorted" value="148" />
          </Card>
        </section>

        {/* Inputs */}
        <section className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-faint">Inputs</h3>
          <div className="grid max-w-md gap-4">
            <Input type="email" placeholder="you@email.com" aria-label="Email" />
            <Input defaultValue="not-an-email" invalid aria-label="Email (error)" />
          </div>
        </section>
      </div>
    </main>
  );
}
