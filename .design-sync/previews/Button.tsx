import { Button } from 'taffy-web';

const row = { display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' as const };

export function Variants() {
  return (
    <div style={row}>
      <Button variant="primary">Join the waitlist</Button>
      <Button variant="secondary">See your buckets</Button>
      <Button variant="ghost">Learn more</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={row}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={row}>
      <Button>Enabled</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
