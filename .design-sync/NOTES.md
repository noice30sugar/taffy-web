# design-sync notes — taffy-web → Claude Design project "Taffy"

This repo is a **Next.js app**, not a published component library. The synced design
system is the **Taffy web kit** in `components/ui/`, translated from the iOS app's
`Theme.swift` (transorter repo). Project id: `04484cef-5f5b-4d54-af93-9a041e658168`.

## Setup that makes the converter work here (package shape, synth-entry)

- **Entry is the barrel, not a dist.** There is no built `dist/`. Run the converter with
  `--entry ./components/ui/index.ts`. That barrel re-exports each component as a *named*
  export (`export { default as Button }`), so the bundle exposes `window.Taffy.Button` etc.
- **Components are discovered via `cfg.componentSrcMap`, not a shipped `.d.ts`.** Passing
  `--entry` makes the converter think a dist exists, so it will NOT auto-derive components
  from `src/`. The explicit `componentSrcMap` (one entry per component) is what populates the
  component list and points prop/JSDoc extraction at the `.tsx` sources. Add a new primitive →
  add it to BOTH `components/ui/index.ts` and `componentSrcMap`.
- **Props come from `cfg.dtsPropsFor`, hand-authored.** Synth-entry prop extraction degrades to
  `{[key: string]: unknown}` (the ts-morph checker can't resolve the source interfaces without a
  built `.d.ts`). Each component's real props interface body is mirrored in `dtsPropsFor`. **If you
  change a component's props, update `dtsPropsFor` to match** — it is the API contract the design
  agent codes against; nothing downstream catches drift.

## CSS + fonts (regenerate before every build)

- `cfg.cssEntry` points at `.design-sync/.cache/styles-compiled.css` — a **generated** file
  (gitignored). Regenerate it before building:
  1. `npx @tailwindcss/cli@4 -i app/globals.css -o .design-sync/.cache/styles-compiled.css`
     (Tailwind v4 auto-scans `components/ui` + `app/` for used utilities; this carries the
     `@theme` tokens AND the `body{background:ink}` rule, so preview cards render dark-first.)
  2. Prepend the brand-font `@import` (next/font doesn't exist in previews):
     `@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap");`
     → validate reports `[FONT_REMOTE]` (informational, expected; fonts load at runtime).
- The app-derived tokens (sage, silver, ink-4, semantic colors, 20-color `cat-*` bucket palette,
  elevation shadows) were added to `app/globals.css` `@theme`. Don't clobber the pre-existing
  marketing-gold/pink decisions there.

## Scope decisions

- **Foundation-only sync (2026-06-18).** Synced: tokens + 6 primitives (Button, Card, Badge,
  SectionHeading, Stat, Input). **ReactBits** (reactbits.dev — animated components, TS+Tailwind
  variant, shadcn/jsrepo install) was deliberately deferred: its value is *motion*, which the
  static preview cards can't convey, and WebGL backgrounds won't render in the headless check.
  Pull ReactBits flair (animated hero text, backgrounds, counters, spotlight/tilted cards) in
  **when building the actual site in Claude Design**, re-themed to Taffy tokens. If later synced,
  prefer components with a meaningful still state (Counter, Spotlight/Tilted Card).
- All components are in group `general`. Fine for 6; regroup via `docsMap` category stubs if it grows.

## Known render warns

- None. All 6 render clean (no `[RENDER_THIN]`/`variantsIdentical`). `[FONT_REMOTE]` is expected (see above).

## Re-sync risks (what can silently go stale)

- **`styles-compiled.css` is generated, gitignored, and `cfg.cssEntry` depends on it.** A re-sync
  that skips the two-step regen above will build against a missing/stale stylesheet. Always
  regenerate first.
- **`dtsPropsFor` is a hand-maintained mirror of the component props.** It does not auto-track the
  `.tsx`. Edit a component's API → edit `dtsPropsFor`, or the agent gets a wrong contract.
- **`componentSrcMap` must list every primitive.** A new component absent from it is silently
  skipped (no error — discovery just won't see it).
- Bundle is built from source `.tsx` directly (no app build step), so it tracks the working tree,
  not a release artifact.
