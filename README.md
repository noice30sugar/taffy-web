# taffy-web

Marketing landing page + waitlist for **Taffy** (`taffybuckets.com`).
Next.js (App Router, TS) + Tailwind v4, deployed on Vercel. Brand source of
truth: `docs/brand.md` in the `transorter` repo.

## Status

- **Phase A (foundation) — done:** repo scaffold, brand fonts/tokens, Supabase
  waitlist API (`/api/join`), `/privacy` + `/terms` shells, assets staged.
- **Phase B (design + build) — pending:** the actual landing page design and
  layout (hero, features, screenshots, styled waitlist form, motion). The
  current `app/page.tsx` is a placeholder.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in the real values
npm run dev                  # http://localhost:3000
```

## Environment

| Var | What |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) key — safe to expose; the `waitlist` table is **insert-only** via RLS |

Used **server-side only** by `app/api/join/route.ts` → `lib/waitlist.ts`.

## Waitlist

`POST /api/join` with `{ "email": "you@example.com" }` inserts into the Supabase
`public.waitlist` table (`email` unique, anon-insert-only RLS). Duplicates return
`{ ok: true, duplicate: true }`. Read signups from the Supabase dashboard or via
the service-role key (never exposed here).

## Deploy (Vercel + Cloudflare DNS)

1. Push to GitHub (done — private repo `taffy-web`).
2. Vercel → New Project → import `taffy-web`. Framework auto-detects Next.js.
3. Set `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` in Vercel → Settings →
   Environment Variables.
4. Deploy. Then add the custom domain `taffybuckets.com` in Vercel and point
   the Cloudflare-managed DNS at it (CNAME per Vercel's instructions). DNS stays
   at Cloudflare per `docs/launch-setup.md`.

## TODO before launch

- [ ] **Swap the placeholder wordmark/logo.** The current `public/brand/taffy-wordmark-light.svg` + `lockup-light.svg` are placeholders. Drop the real logo files in `public/brand/` (same filenames) and it updates everywhere — **nav, footer, and the OG share card** (`app/opengraph-image.tsx`).
- [ ] apple-touch-icon PNG (only the SVG favicon exists today).

## Assets

- `public/brand/` — Taffy wordmark + bucket symbol + lockup SVGs (from
  `transorter/marketing/brand/`).
- `public/screens/` — raw app frames (iPhone 17 Pro, 1206×2622). Device-frame /
  mockup treatment is a Phase B design decision.
- Favicon, apple-touch-icon, and OG image are Phase B (design-dependent;
  formally owned by the `marketing-site-assets` task).
