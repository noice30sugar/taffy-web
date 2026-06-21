# Taffy — Visual Reference

Design direction for the **Taffy** website, to match the iOS app. Attach the images in
this folder when prompting Claude Design, and use this doc as the written brief.

> **One-line brief:** Dark-first premium fintech with warm earthy accents. Linear/Wealthsimple
> credibility as the base layer; small whimsical moments on top. *Premium. Cool. Whimsical.*

---

## Brand personality

- **Three words:** Premium · Cool · Whimsical.
- **Voice:** Confident and clean at the foundation, with warmth sprinkled in. "Dark, credible
  fintech" base layer; "delightful surprises" interaction layer.
- **Feel target:** the user should feel *in control* and *sophisticated*, with moments of
  *delight* (a planned mascot, satisfying animations).
- **References:** Linear, Vercel, Wealthsimple (dark, sharp, premium). Duolingo *only* for the
  mascot/micro-moment idea — not the colorfulness.
- **Anti-references:** generic bank apps (Chase/Wells), full-Duolingo playfulness, wellness-soft
  (Headspace). Taffy is about money, never institutional, never bubbly.

---

## Color (dark-first — these are the app's dark-mode values)

| Role | Hex | Notes |
|---|---|---|
| Background | `#101014` | deep ink — the canvas |
| Grouped surface | `#151518` | section background |
| Card surface | `#1B1B20` | content containers |
| Elevated surface | `#222228` | modals, popovers |
| Primary text | `#EEEEF0` | near-white |
| Secondary text | `#8E8E96` | |
| Tertiary text | `#56565C` | |
| Hairline border | `rgba(255,255,255,0.08)` | |
| **Accent — gold** | `#DEBB6A` | premium lead (marketing gold `#FDBE18` for hero pop) |
| Accent — sage | `#8BAA90` | calm / growth / success |
| Accent — silver | `#B8B8C4` | neutral balance |
| Signature pink | `#FA80A4` | **sparing** pop only |
| Spending up (bad) | `#FF6B6B` | red |
| Spending down (good) | `#50DD80` | green |

**Category "bucket" palette** (the app sorts transactions into colored buckets): a 20-color
warm→green→blue→pink spectrum — e.g. Emerald `#22C55E`, Amber `#F0B400`, Sky `#0EA5E9`,
Indigo `#8B5CF6`, Rose `#F43F5E`. Use these for category tags/pills.

---

## Typography (Gold v3 — 2026-06-20)

- **Headings:** **Newsreader** (editorial serif), weights 600/700 + italic, tight tracking (`-0.02em`). Token: `--font-heading`. Use a **gold italic** accent on the emphasis word (e.g. "Bucket your *spending.*").
- **Body / UI:** **Schibsted Grotesk** (400/500/600/700). Token: `--font-body`. Keep it at body/UI sizes — let the serif own the display scale.
- **App-card UI:** **Plus Jakarta Sans** (merchant/amount) + **DM Sans** (date), tokens `--font-card` / `--font-card-meta`. These intentionally mirror the iOS `Theme` so the hero's transaction deck matches the real app card (`#1B1B20` surface, `#7891B4` deck-edge border).
- **Financial figures:** **tabular** digits (`font-variant-numeric: tabular-nums`) — alignment matters for money.

> Pre-v3 (deprecated): headings were Plus Jakarta Sans, body DM Sans. The redesign moved to an editorial serif lead (warm-premium, "Cred craft without the coldness") while the raven/bucket-hat carries the warmth.

---

## Signature elements (lean into these — they make Taffy recognizable)

1. **The triage deck** — swipeable transaction cards, the core "swipe into a bucket" loop. See
   `app-screens/inbox-deck.png`. This is THE hero motif.
2. **Corner accents** — thin (1.5px) gold L-brackets in card corners. Distinctive, premium.
3. **Category buckets** — colored pills/tags from the palette above.
4. **The donut dashboard** — spending breakdown ring. See `app-screens/dashboard-donut.png`.
5. **Generous negative space + soft shadows** — dark but inviting, never sterile.

Design principle: *Premium foundation, playful moments.* Keep layout/type/color credible;
put whimsy in motion, transitions, and small rewards — never sacrifice the foundation for a gag.

---

## Reference images in this folder

**`app-screens/`** — actual in-app screens (the source of truth for the aesthetic):
- `inbox-deck.png` — the triage deck (swipe-to-categorize). The signature screen.
- `dashboard-donut.png` — spending dashboard with the donut breakdown.
- `lifetime.png` — lifetime spending / category breakdown.
- `all-caught-up.png` — empty/done state (the "cleared the deck" reward moment).
- `autotag-review.png` — auto-tagging review UI.
- `accounts-plaid.png` — connected bank accounts.

**`app-store-screenshots/`** — polished marketing framing of the app (6.9" set).

**`brand/`** — wordmark, bucket symbol, lockups (svg + png), favicon. The hatted-"a" wordmark
(`taffy-wordmark-hat.png`) is current.

**`web-kit/taffy-web-kit.png`** — the web component kit already built + synced to Claude Design
(Button, Card + corner-accent, Badge/category pills, SectionHeading, Stat, Input). The website
should compose from these on-brand parts.

---

## The web component vocabulary (already in the Claude Design "Taffy" project)

`Button` (gold / sage / ghost) · `Card` (+ signature corner-accent) · `Badge` (tones + category
pills) · `SectionHeading` (gold eyebrow + Jakarta title) · `Stat` (mono tabular figures, up=red /
down=green) · `Input` (gold focus, pink error). Build the site from these.
