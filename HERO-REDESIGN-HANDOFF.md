# Taffy landing — hero redesign handoff

Session handoff for the `taffy-web` landing-page redesign (Gold v3). Pick up from here in a new session.

## Context & goal

Redesigning `taffybuckets.com` (this repo — Next.js → Vercel, **separate from the `transorter` iOS repo** at `~/tzdev/transorter`). Goal: **warm-premium** finance landing page — editorial/Cred-tier craft *without* the coldness; the raven/bucket-hat mascot carries the warmth so the type + layout can stay restrained.

Direction decided with the user (do not re-litigate):
- **Type system (locked):** Newsreader (editorial serif) headings with a **gold italic** accent word; Schibsted Grotesk body/UI; Plus Jakarta Sans + DM Sans for the in-page app-card UI (mirrors the iOS `Theme` so the hero deck matches the real app).
- **Hero (locked):** "Bucket your *spending.*" with the **bucket hat resting on the "B"** corner, beside an **animated "deck-sort"** — the app's transaction deck sorting itself.
- Rejected: literal bucket illustrations (looked like trash cans; deferred), phone+floating-chips "Copilot" variant (kept as fallback only), candy/Taffy-name metaphors (the name is just the mascot's name).

## Branch & run

- Branch: **`feat/hero-deck-sort`** (uncommitted — nothing has been committed or pushed; get user approval before committing).
- Dev server usually already running on `localhost:3000` (`npm run dev`).
- **Screenshot/verify recipe** (no Firecrawl auth; Playwright is in the npx cache, browsers via system Chrome):
  ```js
  // node /tmp/shot.mjs  — import Playwright by absolute path (CommonJS default import):
  const PWDIR = $(find ~/.npm/_npx -name playwright -maxdepth 4 -type d | grep -v headless | head -1)
  import pkg from '<PWDIR>/index.js'; const { chromium } = pkg;
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  // viewport 1280x820, deviceScaleFactor 2; goto localhost:3000; await document.fonts.ready
  ```
  Reference screenshots + this doc live in `.design-refs/` (scratch, gitignored-ish — untracked).

## What's done

1. **Fonts** — `app/layout.tsx` loads Newsreader / Schibsted_Grotesk / Plus_Jakarta_Sans / DM_Sans into CSS vars `--font-heading` / `--font-body` / `--font-card` / `--font-card-meta`. Tokens wired in `app/globals.css` `@theme`.
2. **Hero** — `components/Hero.tsx` (editorial headline + hat-on-B + CTAs) and `components/DeckSort.tsx` (the animated deck, `"use client"`). Styles in `app/globals.css` under the `Hero (Gold v3)` banner comment.
3. **DeckSort animation** — faithful to the iOS app, then extended (see source refs below + the 2026-06-20 session log at the bottom):
   - Deck **never moves**; the next card sits in its final resting position beneath the hero and is revealed **in place** (no settle/entry animation — earlier that caused a "card travels backward / flies in right-to-left" bug; fixed by resetting `phase` to idle in the same state update as the index bump).
   - **Sort cycle (per-card timing):** idle → stamp pops in at **750ms** (`0.28s` bouncy spring) → **slide at 1150ms** (400ms beat after the stamp) → next card at **1650ms** (500ms slide window). The stamped card has **no outer colored glow** (it bled onto the deck lines) — category color shows via the recolored border + the centered stamp capsule.
   - **Fly-off (the "swipe away"):** the hero **flicks fully off-screen** — `translate3d(100vw, …)` in 3D (`perspective` + `rotateY` face-turn + `rotateZ` bank + `scale` recede + 2.5px motion blur), **opaque the whole way (no fade)**, on a fast-out curve so the deceleration tail lands off-screen. Per-card variance via CSS vars (`--fly-y/-ry/-rz/-s`). Body `overflow-x: hidden` clips it (no scrollbar). **Structure:** outer `.ds-active` = positioning/centering (2D, mobile `translateX(-50%)`); inner `.ds-active-fly` = the 3D fling — kept separate so centering and the animated transform never fight (a regression where they did broke mobile centering — fixed).
   - **Decklines reflect real remaining count:** `edgesCount = clamp(N-1-n, 0, 4)`; decklines (`.ds-edge` opacity per-count) fade out one-by-one (deepest first) in the final stretch, so the **last card sits over an empty deck** (no edges, no next card). Baked-fade border colors `#7891b4 → #5e718c → #445064 → #2d3441`.
   - **Completion → empty → reshuffle:** when the deck empties, `clear` (sage ✓ scales in over the empty deck) → `sweep` (sage-green #8BAA90 bar fill L→R, ~1.0s) → `refill` (a **reshuffle deal**: `DEAL=5` blank cards slide in R→L deepest-first, each adding a deckline; the top card lands and its **text fades on**) → resume. Driven by a `doneCount` edge-trigger so intermediate `comp`/`n` updates don't tear the timeline down.
   - **Seamless reshuffle↔play handoff:** the dealt back-cards are styled to **match `.ds-edge` exactly** (1.5px border, no shadow, per-depth `DEPTH_BORDER` matching the baked fade); the top dealt card matches the hero (2px + deep ground shadow). Verified the settled-reshuffle and play decklines are pixel-identical (measured equal brightness).
   - **Dimming fix:** the deep ground shadow lives only on the **static** next card, not the moving hero (a moving deep shadow pulsed the deck-edge peek ±30% per sort). Verified flat.
   - **Progress bar below the deck** (app's `TriageProgressBar`): gold fills as cards sort; green sweep + drain on completion.
   - `prefers-reduced-motion` → static stamped frame, no loop (gated on `.ds-active-fly`).
4. **Brand kit updated** — `app/kit/page.tsx` has a new Typography section; `design-reference/visual-reference.md` typography section rewritten for Gold v3.

## Key app source references (ground truth for the animation)

In `~/tzdev/transorter/transorter/Views/Triage/`:
- `CardDeckHeroTransforms.swift` — `.exiting` → `heroOffsetX 500`, opacity 0, no rotation/scale.
- `CardDeckAnimations.swift` — `performStampAnimation`: stamp `spring(0.35, bounce 0.25)`, slide-off `spring(0.45, bounce 0.08)`.
- `CardDeckView.swift` — comment: *"Static deck (edges + next card) — never moves."*
- `DeckEdgesBackground.swift` — deck edges: offsets 10/20/30/40, scaleX .98/.96/.94/.92.
- `TransactionCardView.swift` — card tokens: surface `#1B1B20`, deck-edge border `#7891B4`, radius 16, merchant Plus Jakarta Bold 38 / amount 28, stamp = solid category-color capsule (icon + name).
- `TriageProgressBar.swift` — completion sweep uses `Theme.success` (#8BAA90), `easeOut 0.6s` (we slowed to ~1.1s per user).
- iOS Theme: `Theme.swift` (`Utilities/`).

Running the sim to re-check: `session_set_defaults { projectPath, scheme transorter, simulatorName "iPhone 17 Pro", bundleId com.taffybuckets.app, preferXcodebuild true }` → `build_run_sim`. App launches on the Inbox with mock data; tap a category button (e.g. Groceries) to sort. NOTE: `record_sim_video` stop failed to save a file this session — prefer `xcrun simctl io booted recordVideo` via Bash if video is needed.

## Remaining / next steps

1. **Redesign the rest of the page** (the main remaining work): `components/Features.tsx` ("how it works", currently the old `.tf-feat` zigzag) and `components/FinalCta.tsx` + `components/Footer.tsx` / `Nav.tsx` — carry Newsreader + Schibsted + the card/deck language down, retire the zigzag. They currently just inherit the new fonts.
2. **DeckSort tuning dials** (if feel needs adjusting once watched live — dev StrictMode double-mounts and cycles the loop ~3× fast, so true speed is best judged in prod):
   - Fly-off speed: `.ds-active-fly` transition `0.6s` + distance `100vw` (drop to ~70vw for a slower-reading exit).
   - Stamp pop: `.ds-stamp` `0.28s`; stamp→slide gap: per-card `t2` (1150ms).
   - Reshuffle stagger: `i * 110ms` in `DeckSort.tsx`; completion timeline in the `doneCount` effect (`clear` immediate, `sweep` 480ms, `refill` 1780ms, reset 3200ms).
3. **Minor polish:** hat micro-position; the deck count/`remaining` can start a touch off in dev (StrictMode) — clean in prod.
4. `components/PhoneFrame.tsx` and `components/AppStoreBadge.tsx` are now unused by the hero (PhoneFrame fully unused; AppStoreBadge still used in FinalCta).

## Session log — 2026-06-20 (deck-sort refinement)
All verified in-browser (Playwright screenshots/video + brightness measurements). Files: `components/DeckSort.tsx`, `app/globals.css`. Nothing committed.
- Fixed deck-line **dimming** (static-stack shadow, not moving hero) — peek brightness measured flat.
- Built **empty deck + reshuffle**: decklines now reflect real remaining count (last card over empty deck); completion plays sage-✓ + green sweep, then a reshuffle deal (blank cards slide R→L, top card text fades on).
- Reworked the **fly-off** from a slide-and-fade into a **3D flick fully off-screen, opaque** (perspective/rotateY/rotateZ/scale/blur); split `.ds-active` (positioning) from `.ds-active-fly` (3D) — also fixed a **mobile-centering regression** this introduced.
- Removed the green afterglow that hovered over the empty deck (gated `.ds-flash` to `n < N-1`).
- **Sped up** the stamp pop (`0.35s→0.28s`) and cut the stamp→slide delay (`750ms→400ms`).
- Made the **reshuffle→play deckline handoff seamless** (dealt back-cards match `.ds-edge` exactly: 1.5px, no shadow, graded `DEPTH_BORDER`) — measured pixel-identical.
- **Gotcha logged:** non-ASCII chars (box-drawing `──`) in a CSS comment hard-fail Lightning CSS (Tailwind v4); Next then silently serves the last-good stylesheet so new rules vanish with no error. Saved to the global lessons file.

## Working agreement
- All visual changes verified in-browser (Playwright screenshot) before presenting.
- `taffy-web` is NOT the protocol project — no `/proj-log`. Commit/push only with explicit user approval.
