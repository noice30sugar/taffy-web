import { Badge } from 'taffy-web';

const row = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const };

export function Tones() {
  return (
    <div style={row}>
      <Badge tone="gold" dot>Coming soon</Badge>
      <Badge tone="sage">Synced</Badge>
      <Badge tone="silver">Beta</Badge>
      <Badge tone="neutral">Default</Badge>
    </div>
  );
}

const CATEGORIES = [
  { name: 'Groceries', color: 'var(--color-cat-emerald)' },
  { name: 'Coffee', color: 'var(--color-cat-amber)' },
  { name: 'Transit', color: 'var(--color-cat-sky)' },
  { name: 'Rent', color: 'var(--color-cat-indigo)' },
  { name: 'Dining', color: 'var(--color-cat-rose)' },
];

export function CategoryBuckets() {
  return (
    <div style={row}>
      {CATEGORIES.map((c) => (
        <Badge key={c.name} color={c.color} dot>{c.name}</Badge>
      ))}
    </div>
  );
}
