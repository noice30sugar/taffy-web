# Taffy landing — design notes

Durable design decisions for `taffybuckets.com`. These were settled with the
owner and are **locked** — read this before reworking the hero rather than
re-litigating a direction that was already tried.

Goal: **warm-premium** finance landing — editorial craft without the coldness.
The raven/bucket-hat mascot carries the warmth, so the type and layout stay
restrained.

## Type system (locked)

- **Newsreader** — editorial serif headings, with a **gold italic accent word**.
- **Schibsted Grotesk** — body and UI.
- **Plus Jakarta Sans + DM Sans** — the in-page app-card UI, mirroring the iOS
  `Theme` so the hero deck matches the real app.

Loaded in `app/layout.tsx` as CSS vars `--font-heading` / `--font-body` /
`--font-card` / `--font-card-meta`; tokens wired in `app/globals.css` `@theme`.

## Hero (locked)

"Bucket your *spending.*" with the **bucket hat resting on the "B"**, beside an
animated **deck-sort** — the app's transaction deck sorting itself.

Files: `components/Hero.tsx`, `components/DeckSort.tsx` (`"use client"`), styles
in `app/globals.css` under the `Hero (Gold v3)` banner comment.

### Deck-sort mechanics

- **The deck never moves.** The next card sits in its final resting position
  beneath the hero card and is revealed *in place* — no settle or entry
  animation. (An entry animation caused a "card travels backward" bug; the fix
  was resetting `phase` to idle in the same state update as the index bump.)
- **Sort cycle, per card:** idle → stamp pops in at **750ms** (`0.28s` bouncy
  spring) → **slide at 1150ms** (a 400ms beat after the stamp) → next card at
  **1650ms** (500ms slide window). The stamped card has **no outer colored
  glow** — it bled onto the deck lines; category color reads through the
  recolored border plus the centered stamp capsule.
- **Fly-off:** the hero card **flicks fully off-screen** —
  `translate3d(100vw, …)` in 3D (`perspective` + `rotateY` face-turn + `rotateZ`
  bank + `scale` recede + 2.5px motion blur), **opaque the whole way, no fade**,
  on a fast-out curve so the deceleration tail lands off-screen. Per-card
  variance via CSS vars (`--fly-y/-ry/-rz/-s`); body `overflow-x: hidden` clips
  it.
  **Structure matters:** outer `.ds-active` does positioning/centering (2D,
  mobile `translateX(-50%)`); inner `.ds-active-fly` does the 3D fling. Keep
  them separate — when one element carried both, centering and the animated
  transform fought and mobile centering broke.
- **Deck lines reflect the real remaining count:** `edgesCount = clamp(N-1-n, 0, 4)`.
  Edges (`.ds-edge`, opacity per count) fade out one by one, deepest first, so
  the **last card sits over an empty deck**. Baked-fade border colors
  `#7891b4 → #5e718c → #445064 → #2d3441`.
- **Completion → empty → reshuffle:** `clear` (deck empties, no ✓ yet) →
  `sweep` (sage-green `#9AD0A0` bar fill L→R, 1.1s) → **✓ reveal synced to the
  sweep reaching 100%** → `refill` (a reshuffle deal: `DEAL=5` blank cards slide
  in R→L, deepest first, each adding a deck line; the top card lands and its
  text fades on) → resume.
  Driven by a `doneCount` edge-trigger so intermediate `comp`/`n` updates don't
  tear the timeline down. Timeline: `SWEEP_DELAY 240` → `sweep` (`SWEEP_MS 1100`)
  → check via a dedicated **`data-check="in"`** flag at `SWEEP_DELAY+SWEEP_MS` →
  `HOLD 720` → `refill` → reset `+1420`. The check is gated on `data-check`, not
  on `data-deck="empty"`, so it times to the sweep rather than to the clear.
- **Seamless reshuffle↔play handoff:** dealt back-cards are styled to match
  `.ds-edge` exactly (1.5px border, no shadow, per-depth `DEPTH_BORDER` matching
  the baked fade); the top dealt card matches the hero (2px + deep ground
  shadow). Settled-reshuffle and play deck lines are pixel-identical.
- **No pulsing:** the deep ground shadow lives only on the **static** next card,
  never on the moving hero — a moving deep shadow pulsed the deck-edge peek ±30%
  per sort.
- **Progress bar below the deck** mirrors the app's `TriageProgressBar`: gold
  fills as cards sort; green sweep and drain on completion.
- `prefers-reduced-motion` → a static stamped frame, no loop (gated on
  `.ds-active-fly`).

### Deck-vs-text balance

`.ds-stage` is a **fixed-width box (368px) centered in its grid cell**
(`justify-self: center`) so the deck reads centered at every desktop width;
mobile resets to `width: 100%`. The deck is **scaled up as one unit**
(`transform: scale(1.22)`, origin center) to give the right column enough mass
to counterweight the headline — chosen over re-typesetting a dozen fixed-px
card/edge/`DEPTH_*` values, which would risk the pixel-tuned deck-line and
fly-off handoff. Caveat: `scale` rasterizes card text at 1.22× (crisp at 2× DPR;
if softening shows on a 1× display, lift the card's base dimensions into CSS
vars instead).

The warm glow is `.ds-stage::before` (`left: 50%`, `top: 117px` = card center on
both stages) so it tracks the deck. It used to be `.hero-deck::before`,
section-anchored, and drifted off-center.

### Tuning dials

- Fly-off speed: `.ds-active-fly` transition `0.6s` + distance `100vw` (drop to
  ~70vw for a slower-reading exit).
- Stamp pop: `.ds-stamp` `0.28s`. Stamp→slide gap: per-card `t2` (1150ms).
- Reshuffle stagger: `i * 110ms` in `DeckSort.tsx`.
- Completion: `SWEEP_DELAY 240` / `SWEEP_MS 1100` (**must match the
  `.ds-prog-sweep` width transition**) / `HOLD 720`, then `refill` and reset
  `+1420`.
- Deck size: `.ds-stage { transform: scale(1.22) }`.

Judge all of these in a production build — StrictMode makes dev run ~3× fast.

## Explored and rejected

- **Literal bucket illustrations** — read as trash cans.
- **Phone + floating chips ("Copilot" variant)** — kept only as a fallback.
- **Candy / taffy name metaphors** — the name is just the mascot's name.
- **"Encasing" the right column** (hard border, surface panel, dot grid) — the
  border produced a card-in-a-card look. The right column felt light because of
  *mass*, not position; enlarging the deck resolved it.

Deferred but liked, if the right column ever needs narrative weight: warm
atmosphere behind the deck, the **raven mascot presenting the deck**
(`design-reference/mascot/raven-presenting.png`), or showing the category
**buckets** the cards sort into.

## iOS app source references

The animation is faithful to the real app. Ground truth lives in the
`transorter` repo under `transorter/Views/Triage/`:

| File | What it fixes |
|---|---|
| `CardDeckHeroTransforms.swift` | `.exiting` → `heroOffsetX 500`, opacity 0, no rotation/scale |
| `CardDeckAnimations.swift` | `performStampAnimation`: stamp `spring(0.35, bounce 0.25)`, slide-off `spring(0.45, bounce 0.08)` |
| `CardDeckView.swift` | "Static deck (edges + next card) — never moves." |
| `DeckEdgesBackground.swift` | Deck edges: offsets 10/20/30/40, scaleX .98/.96/.94/.92 |
| `TransactionCardView.swift` | Card tokens: surface `#1B1B20`, deck-edge border `#7891B4`, radius 16, merchant Plus Jakarta Bold 38 / amount 28, stamp = solid category-color capsule |
| `TriageProgressBar.swift` | Completion sweep uses `Theme.success` (#8BAA90), `easeOut 0.6s` — slowed to ~1.1s here |

Brand source of truth: `docs/brand.md` in the `transorter` repo. The web
translation of the iOS `Theme.swift` is `components/ui/`, shown on `/kit` and
described in `design-reference/visual-reference.md`.

## Gotcha

**Non-ASCII characters in a CSS comment hard-fail Lightning CSS** (Tailwind v4),
and Next then silently serves the last-good stylesheet — new rules vanish with
no error in the console. Keep `globals.css` comments ASCII-only.
