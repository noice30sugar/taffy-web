import { Card } from 'taffy-web';

const grid = { display: 'grid', gap: 20, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', maxWidth: 760 };
const title = { fontWeight: 600, color: 'var(--color-fg)', margin: 0 };
const body = { marginTop: 4, fontSize: 14, color: 'var(--color-fg-dim)' };

export function Surfaces() {
  return (
    <div style={grid}>
      <Card>
        <p style={title}>Standard</p>
        <p style={body}>Card surface on ink with a hairline border.</p>
      </Card>
      <Card cornerAccent>
        <p style={title}>Corner accent</p>
        <p style={body}>The app&rsquo;s signature bracketed corners.</p>
      </Card>
      <Card surface="elevated">
        <p style={title}>Elevated</p>
        <p style={body}>Raised surface for modals &amp; popovers.</p>
      </Card>
    </div>
  );
}

export function FeatureCard() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Card cornerAccent>
        <p style={{ ...title, fontSize: 18 }}>Sort, don&rsquo;t budget</p>
        <p style={body}>
          Swipe each transaction into a bucket and see where your money went — in under a minute.
        </p>
      </Card>
    </div>
  );
}
