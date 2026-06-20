"use client";

import { useEffect, useRef } from "react";

/*
  Animated "mesh" atmosphere — soft gold radial blobs that drift behind the
  page, anchored to the hero phone, each feature screenshot, and the CTA so the
  glow follows the content as you scroll. Ported from the Claude Design "Gold"
  export. Canvas is fixed, behind everything (z-0), and never intercepts input.
  Honors prefers-reduced-motion (renders nothing).
*/
export default function MeshBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const st: {
      w: number;
      h: number;
      anchors: { x: number; yDoc: number; c: string; r: number; ph: number }[];
    } = { w: 0, h: 0, anchors: [] };

    const computeAnchors = () => {
      const sc = document.scrollingElement || document.documentElement;
      const top = sc.scrollTop;
      const defs: { el: Element; c: string; r: number }[] = [];

      const hero = document.querySelector("main section .phone");
      if (hero) defs.push({ el: hero, c: "253,190,24", r: 0.52 });

      const tones = ["253,190,24", "240,160,32", "247,222,150"];
      document
        .querySelectorAll(".tf-feat-shot")
        .forEach((el, i) => defs.push({ el, c: tones[i % 3], r: 0.4 }));

      const cta = document.querySelector("#download .reveal") || document.querySelector("#download");
      if (cta) defs.push({ el: cta, c: "253,190,24", r: 0.5 });

      st.anchors = defs.map((d, i) => {
        const rc = d.el.getBoundingClientRect();
        return {
          x: rc.left + rc.width / 2,
          yDoc: rc.top + top + rc.height / 2,
          c: d.c,
          r: d.r,
          ph: i * 1.7,
        };
      });
    };

    let tries = 0;
    const reset = () => {
      st.w = window.innerWidth || document.documentElement.clientWidth || 1280;
      st.h = window.innerHeight || document.documentElement.clientHeight || 800;
      canvas.width = Math.max(1, st.w * dpr);
      canvas.height = Math.max(1, st.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      try {
        computeAnchors();
      } catch {
        /* layout not ready yet */
      }
    };

    const ensureSize = () => {
      reset();
      if ((st.w <= 1 || canvas.width <= 1) && tries++ < 90) requestAnimationFrame(ensureSize);
    };
    ensureSize();
    // Re-measure as fonts/images settle and shift layout.
    const timers = [120, 400, 800, 1500].map((ms) => window.setTimeout(reset, ms));

    const update = (time: number) => {
      const { w, h } = st;
      const sc = document.scrollingElement || document.documentElement;
      const scrollTop = sc.scrollTop;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const a of st.anchors) {
        const cx = a.x + Math.sin(time * 0.0002 + a.ph) * 26;
        const cy = a.yDoc - scrollTop + Math.cos(time * 0.00018 + a.ph) * 22;
        const rad = a.r * Math.max(w, h);
        if (cy < -rad || cy > h + rad) continue;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${a.c},0.2)`);
        g.addColorStop(0.4, `rgba(${a.c},0.075)`);
        g.addColorStop(1, `rgba(${a.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    const loop = (t: number) => {
      update(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => reset();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  return <canvas id="tf-bg-fx" ref={ref} aria-hidden />;
}
