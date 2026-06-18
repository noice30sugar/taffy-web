import { Input } from 'taffy-web';

export function Default() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Input type="email" placeholder="you@email.com" aria-label="Email" />
    </div>
  );
}

export function Invalid() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Input defaultValue="not-an-email" invalid aria-label="Email (error)" />
    </div>
  );
}
