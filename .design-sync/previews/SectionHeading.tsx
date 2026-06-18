import { SectionHeading } from 'taffy-web';

export function Default() {
  return (
    <div style={{ maxWidth: 560 }}>
      <SectionHeading
        eyebrow="How it works"
        title="Bucket your spending."
        subtitle="You don't want a budget. You just want to see where your money goes — Taffy is spending awareness without the homework."
      />
    </div>
  );
}

export function Centered() {
  return (
    <div style={{ maxWidth: 560 }}>
      <SectionHeading
        align="center"
        eyebrow="Pricing"
        title="Simple, honest pricing"
        subtitle="No tiers, no upsells — just the app."
      />
    </div>
  );
}

export function TitleOnly() {
  return (
    <div style={{ maxWidth: 560 }}>
      <SectionHeading title="Frequently asked questions" />
    </div>
  );
}
