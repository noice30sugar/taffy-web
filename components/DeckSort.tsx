"use client";

// This component IS an animation timeline: each effect seeds a phase and then
// advances it on timers. Setting state in the effect body is the mechanism, not
// an accident -- the phases are pixel-tuned against the iOS choreography (see
// docs/design-notes.md) and restructuring them has broken the deck before.
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, type ReactNode } from "react";

/*
  Animated hero visual: the app's transaction "deck" sorting itself, faithful to
  the iOS choreography (CardDeckView + CardDeckHeroTransforms + CardDeckAnimations):

    - The deck NEVER moves. The next card sits in its final resting position
      directly beneath the hero and is revealed in place as the hero leaves.
    - Sort = stamp pops in (spring 0.35 / bounce 0.25) + card border recolors,
      then the hero slides straight right (offsetX 500) and fades (spring 0.45).
      No rotation/scale/vertical and no entry animation — nothing travels back
      toward the deck; the revealed card simply becomes the new hero.
    - When the deck empties, a green capsule sweeps left→right over the full bar
      (TriageProgressBar completionSweep, easeOut 0.6s), then the bar drains and
      the loop restarts.

  Cards / deck edges / stamp use the real app tokens (Theme.swift). Honors
  prefers-reduced-motion (static stamped frame, no loop).
*/

type Tx = { merchant: string; date: string; amount: string };
type Cat = { name: string; color: string; icon: ReactNode };

const TX: Tx[] = [
  { merchant: "Amazon", date: "Jun 13, 2026", amount: "34.50" },
  { merchant: "Rabba Foods", date: "Jun 12, 2026", amount: "48.20" },
  { merchant: "Tim Hortons", date: "Jun 12, 2026", amount: "6.75" },
  { merchant: "Hydro One", date: "Jun 10, 2026", amount: "94.00" },
  { merchant: "Presto", date: "Jun 9, 2026", amount: "12.00" },
  { merchant: "Netflix", date: "Jun 8, 2026", amount: "20.99" },
  { merchant: "Loblaws", date: "Jun 7, 2026", amount: "76.40" },
];

const Cart = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h2.2l2.3 12.4a1.6 1.6 0 0 0 1.6 1.3h8.8a1.6 1.6 0 0 0 1.6-1.3L21 7H5.3" />
  </svg>
);
const Fork = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v18M17 3c-1.7 0-3 2.2-3 5s1.3 4 3 4 3-1.2 3-4-1.3-5-3-5zM17 12v9" />
  </svg>
);
const Bolt = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);
const Car = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M5 13h14v4H5zM5 17v2M19 17v2" />
    <circle cx="8" cy="13.5" r="1" /><circle cx="16" cy="13.5" r="1" />
  </svg>
);
const Bag = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7h12l1 13H5L6 7zM9 7a3 3 0 0 1 6 0" />
  </svg>
);
const Star = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" />
  </svg>
);

const CATS: Cat[] = [
  { name: "Groceries", color: "#22c55e", icon: Cart },
  { name: "Dining", color: "#f89820", icon: Fork },
  { name: "Bills", color: "#0ea5e9", icon: Bolt },
  { name: "Transport", color: "#6366f1", icon: Car },
  { name: "Shopping", color: "#a855f7", icon: Bag },
  { name: "Fun", color: "#f43f5e", icon: Star },
];

// Fly-off vectors — the card flicks fully off-screen to the RIGHT (x = 100vw),
// flinging in 3D: it turns its face away (rotateY), banks (rotateZ), recedes
// (scale), and drifts vertically (y) so each exit differs. ry = rotateY°,
// rz = bank°, s = end scale, y = vertical drift px. Deterministic per card.
const EXITS = [
  { y: -34, rz: -9, ry: 26, s: 0.84 },
  { y: 26, rz: 8, ry: 22, s: 0.86 },
  { y: -60, rz: -13, ry: 31, s: 0.82 },
  { y: 50, rz: 11, ry: 24, s: 0.85 },
  { y: -18, rz: -7, ry: 29, s: 0.84 },
  { y: 40, rz: 10, ry: 20, s: 0.87 },
  { y: -46, rz: -12, ry: 28, s: 0.83 },
];

const N = TX.length;

// Reshuffle deal: how many cards rebuild the stack (top hero + 4 decklines) and
// the resting depth transforms (depth 0 = top, matching the .ds-edge k1–k4 below).
const DEAL = 5;
const DEPTH_Y = [0, 10, 20, 30, 40];
const DEPTH_SX = [1, 0.981, 0.959, 0.941, 0.919];
// Per-depth border, matching the .ds-edge k1–k4 baked fade, so the dealt cards'
// decklines are the SAME brightness as the real edges they become — no jump at
// the reshuffle→play handoff.
const DEPTH_BORDER = ["#7891b4", "#7891b4", "#5e718c", "#445064", "#2d3441"];

function rgba(hex: string, a: number) {
  const v = parseInt(hex.slice(1), 16);
  return `rgba(${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}, ${a})`;
}

type Phase = "idle" | "stamped" | "exit";
// Completion choreography: clear (deck empties) → sweep (green fills bar) →
// refill (deck stacks back in, bars drain) → none (next round).
type Comp = "none" | "clear" | "sweep" | "refill";

function Card({
  tx,
  cat,
  stamped,
  style,
  blank,
  revealText,
}: {
  tx: Tx;
  cat?: Cat;
  stamped?: boolean;
  style?: React.CSSProperties;
  blank?: boolean; // card box only — no text (a deck card being dealt)
  revealText?: boolean; // text fades in once the card has landed (final deal card)
}) {
  return (
    <article className={`ds-card${revealText ? " ds-reveal-text" : ""}`} style={style}>
      {!blank && (
        <>
          <div className="ds-merch">{tx.merchant}</div>
          <div className="ds-foot">
            <span className="ds-date">{tx.date}</span>
            <span className="ds-amt">${tx.amount}</span>
          </div>
        </>
      )}
      {cat && !blank && (
        <span
          className={`ds-stamp ${stamped ? "show" : ""}`}
          style={{
            background: cat.color,
            boxShadow: `0 4px 16px ${rgba(cat.color, 0.6)}, 0 0 32px ${rgba(cat.color, 0.3)}`,
          }}
        >
          {cat.icon}
          {cat.name}
        </span>
      )}
    </article>
  );
}

export default function DeckSort() {
  const [n, setN] = useState(0); // cards sorted this round (0..N)
  const [phase, setPhase] = useState<Phase>("idle");
  const [comp, setComp] = useState<Comp>("none");
  const [checkIn, setCheckIn] = useState(false); // sage ✓ — revealed as the sweep completes
  const [doneCount, setDoneCount] = useState(0); // edge-trigger for completion
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const done = n >= N;

  // Fire the completion sequence exactly once when the deck empties.
  useEffect(() => {
    if (done && !reduced) setDoneCount((c) => c + 1);
  }, [done, reduced]);

  // Completion choreography. Depends ONLY on doneCount so the intermediate comp/n
  // updates below never tear this timeline down mid-flight.
  //   clear  — last card has flown off an already-empty deck (no ✓ yet)
  //   sweep  — green capsule fills the full bar L→R (the "you cleared it" payoff)
  //   ✓ reveal — the sage check pops in exactly as the sweep reaches 100%, so the
  //            bar filling and the check landing read as one beat
  //   refill — ✓ fades; blank cards reshuffle in R→L, then the top card's text
  //            fades on; both bars drain
  //   none   — fresh round resumes
  useEffect(() => {
    if (doneCount === 0 || reduced) return;
    const SWEEP_DELAY = 240; // let the deck finish clearing before the bar fills
    const SWEEP_MS = 1100; // matches .ds-prog-sweep width transition
    const HOLD = 720; // savor the full bar + check together
    setComp("clear");
    const t1 = setTimeout(() => setComp("sweep"), SWEEP_DELAY);
    // Check lands as the sweep completes — the two greens resolve in sync.
    const tc = setTimeout(() => setCheckIn(true), SWEEP_DELAY + SWEEP_MS);
    const t3 = setTimeout(() => {
      setCheckIn(false);
      setComp("refill");
    }, SWEEP_DELAY + SWEEP_MS + HOLD);
    const t4 = setTimeout(() => {
      setComp("none");
      setN(0);
    }, SWEEP_DELAY + SWEEP_MS + HOLD + 1420);
    return () => {
      clearTimeout(t1);
      clearTimeout(tc);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [doneCount, reduced]);

  // Per-card sort loop — paused while the deck is empty (done) or the completion
  // sequence is running (comp !== "none").
  useEffect(() => {
    if (reduced || done || comp !== "none") return;
    setPhase("idle");
    const t1 = setTimeout(() => setPhase("stamped"), 750);
    // Slide ~400ms after the stamp lands (was 750) — just enough beat to read the
    // category, then go. The slide window (t3 − t2 = 500ms) is unchanged.
    const t2 = setTimeout(() => setPhase("exit"), 1150);
    // Reset phase to idle in the SAME update as the index bump so the incoming
    // card never renders one frame at the previous card's exit transform (which
    // made it appear to fly in right-to-left before settling).
    const t3 = setTimeout(() => {
      setPhase("idle");
      setN((v) => v + 1);
    }, 1650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [n, reduced, done, comp]);

  const idx = n % N;
  const cur = TX[idx];
  const next = TX[(idx + 1) % N];
  const cat = CATS[idx % CATS.length];
  const ex = EXITS[idx % EXITS.length];

  const stamped = reduced || phase === "stamped" || phase === "exit";
  const exiting = phase === "exit";

  // The deck is visually empty while the green sweep plays, then reshuffles in.
  const deckState = comp === "clear" || comp === "sweep" ? "empty" : comp === "refill" ? "refill" : "full";
  const playing = comp === "none" && !done;

  // Decklines under the hero reflect the cards actually left behind it, so the
  // stack visibly shrinks in the final stretch and the LAST card sits over an
  // empty deck (no edges, no next card).
  const edgesCount = Math.max(0, Math.min(4, N - 1 - n));

  const goldPct = reduced ? 55 : comp === "refill" ? 0 : done ? 100 : (Math.min(n, N) / N) * 100;
  const sweepPct = comp === "sweep" ? 100 : 0;
  const remaining = N - Math.min(n, N);

  // Per-card fling variance as CSS vars — the transform itself lives in CSS (so
  // the mobile centering offset can compose with it without inline styles winning).
  const activeStyle = {
    "--fly-y": `${ex.y}px`,
    "--fly-ry": `${ex.ry}deg`,
    "--fly-rz": `${ex.rz}deg`,
    "--fly-s": `${ex.s}`,
  } as React.CSSProperties;

  // Only recolor the border on stamp — no outer colored glow, which would bleed
  // onto the deck lines just below. The recolored border + the centered stamp
  // capsule (its own glow) carry the category color.
  const cardStyle: React.CSSProperties | undefined = stamped ? { borderColor: cat.color } : undefined;

  return (
    <div className="ds-stage" data-deck={deckState} data-check={checkIn ? "in" : "out"} aria-hidden>
      {/* progress bar: gold fills, green sweeps on completion, then both drain */}
      <div className="ds-prog">
        <div className="ds-prog-track">
          <div
            className="ds-prog-fill"
            style={{ width: `${goldPct}%`, transitionDuration: comp === "refill" ? "0.7s" : "0.45s" }}
          />
          <div
            className="ds-prog-sweep"
            style={{ width: `${sweepPct}%`, transitionDuration: comp === "refill" ? "0.6s" : "1.1s" }}
          />
        </div>
        <p className="ds-prog-label">
          {done ? (
            <b style={{ color: "#9ad0a0" }}>All sorted!</b>
          ) : (
            <>
              <b>{remaining}</b> transaction{remaining === 1 ? "" : "s"} to sort
            </>
          )}
        </p>
      </div>

      {/* colored glow left behind at the origin as the hero flies out — only
          when there's a card behind it to glow onto; on the last card it would
          just hover over the empty deck before the check, so suppress it. */}
      <div
        className={`ds-flash ${exiting && n < N - 1 ? "show" : ""}`}
        style={{ background: `radial-gradient(circle at 50% 50%, ${rgba(cat.color, 0.85)}, transparent 70%)` }}
      />

      {/* empty-deck payoff: a sage check, visible while the deck is cleared */}
      <div className="ds-empty">
        <span className="ds-empty-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>

      {/* Normal play. Decklines fade out one-by-one (deepest first) as the stack
          shrinks; by the last card there are none and no next card — the hero
          sits over an empty deck. */}
      {playing && (
        <>
          <div className="ds-deck">
            <div className="ds-edge k4" style={{ opacity: edgesCount >= 4 ? 1 : 0 }} />
            <div className="ds-edge k3" style={{ opacity: edgesCount >= 3 ? 1 : 0 }} />
            <div className="ds-edge k2" style={{ opacity: edgesCount >= 2 ? 1 : 0 }} />
            <div className="ds-edge k1" style={{ opacity: edgesCount >= 1 ? 1 : 0 }} />
          </div>
          {n < N - 1 && (
            <div className="ds-next">
              <Card tx={next} />
            </div>
          )}
          <div className="ds-active" key={n}>
            <div className={`ds-active-fly ${exiting ? "is-exit" : ""}`} style={activeStyle}>
              <Card tx={cur} cat={cat} stamped={stamped} style={cardStyle} />
            </div>
          </div>
        </>
      )}

      {/* Reshuffle (refill): DEAL blank cards slide in R→L, deepest first, each
          overlaying the last and adding a deckline; the final (top) card lands
          and its text fades back on. Resting depths match the .ds-edge stack, so
          the handoff to normal play is seamless. */}
      {comp === "refill" && (
        <div className="ds-reshuffle">
          {Array.from({ length: DEAL }).map((_, i) => {
            const d = DEAL - 1 - i; // depth 0 = top/hero, dealt last
            const top = d === 0;
            return (
              <div
                key={i}
                className="ds-deal-slot"
                style={{ transform: `translateY(${DEPTH_Y[d]}px) scaleX(${DEPTH_SX[d]})`, zIndex: 10 - d }}
              >
                <Card
                  tx={TX[0]}
                  blank={!top}
                  revealText={top}
                  style={{ animationDelay: `${i * 110}ms`, borderColor: DEPTH_BORDER[d] }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
