# taffy-web

The marketing site for **Taffy** — a spending-tracker iOS app you triage like a
card deck. Live at **[taffybuckets.com](https://taffybuckets.com)**.

Next.js 16 (App Router, TypeScript) + Tailwind v4, deployed on Vercel.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

No environment variables are required — the site is fully static marketing +
legal copy with no backend.

> **Judge the animation in a production build.** React StrictMode double-mounts
> in dev, which cycles the hero deck-sort loop about 3× too fast. Use
> `npm run build && npm start` before tuning any timing.

## Routes

| Route | What |
|---|---|
| `/` | The landing page — hero, "how it works" scroll tour, FAQ, App Store CTA |
| `/privacy`, `/terms` | Legal copy, shared `LegalLayout` |
| `/kit` | Internal design-system showcase. Not linked; `noindex` |
| `/logo` | Internal wordmark/favicon size preview. Not linked; `noindex` |

## Layout

```
app/          routes, layout (fonts), globals.css (design tokens + hero styles)
components/   page sections (Hero, Features, Faq, FinalCta, Nav, Footer)
components/ui/  the design-system primitives shown on /kit
lib/          structured-data.ts — JSON-LD + SITE_URL
public/       assets actually served by the site
design-reference/  brand + app source art and the visual reference (not served)
docs/         design-notes.md — locked design decisions and hero mechanics
```

`design-reference/` is the source-of-truth art (brand marks, mascot poses, raw
app screens, App Store screenshots). `public/` holds only the subset the site
actually serves; pull from `design-reference/` when a design needs more.

## Deploy

Vercel builds `main` automatically. The custom domain `taffybuckets.com` is
configured in Vercel with DNS at Cloudflare.

## Design

Design decisions are locked and documented in
[`docs/design-notes.md`](docs/design-notes.md) — the type system, the hero
deck-sort animation and its tuning dials, and the directions already explored
and rejected. Read it before changing the hero.

The design system is also synced to a Claude Design project; see
[`.design-sync/NOTES.md`](.design-sync/NOTES.md) for how that build is wired
(notably: change a `components/ui/` prop → update `dtsPropsFor` in
`.design-sync/config.json` to match).

## License

Not open source. The source is public for reference; the Taffy name, wordmark,
mascot, and all brand art are proprietary. All rights reserved.
