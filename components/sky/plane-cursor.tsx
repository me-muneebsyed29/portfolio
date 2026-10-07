"use client";

import { useEffect, useRef } from "react";

/*
 * The cursor is the banner's paper plane. Its nose is the hotspot, so it
 * clicks exactly where a normal arrow would. It banks toward wherever the
 * mouse is heading, settles back into the usual up-left pointer pose when the
 * mouse rests, turns blue over anything clickable, and leaves a short dashed
 * contrail like the plane in the banner.
 *
 * Mouse and trackpad only: touch screens keep their native behaviour, text
 * fields keep the I-beam, and with reduced motion the plane stays in its
 * pointer pose with no trail.
 */

const REST_ANGLE = -135; // degrees; nose up and to the left, like an arrow
const TRAIL_LIFE = 0.55; // seconds a contrail point lasts

const INTERACTIVE = "a, button, [role='button'], [role='radio'], label, select, summary";
const TEXT_ENTRY = "input:not([type='checkbox']):not([type='radio']):not([type='submit']), textarea, [contenteditable='true']";

export function PlaneCursor() {
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const plane = planeRef.current;
    const canvas = trailRef.current;
    const ctx = canvas?.getContext("2d");
    if (!plane || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("plane-cursor");

    let x = -100;
    let y = -100;
    let angle = REST_ANGLE;
    let target = REST_ANGLE;
    let lastMove = 0;
    let visible = false;
    let raf = 0;
    let running = false;
    let last = performance.now();
    const trail: { x: number; y: number; t: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const render = () => {
      plane.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
    };

    const drawTrail = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      while (trail.length && now - trail[0].t > TRAIL_LIFE * 1000) trail.shift();
      if (trail.length < 2) return;
      let dist = 0;
      ctx.lineCap = "round";
      ctx.setLineDash([5, 7]);
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const age = (now - b.t) / (TRAIL_LIFE * 1000);
        const alpha = Math.max(0, 1 - age);
        /* Dark underlay then white dash, so the trail reads on white glass
           and on blue sky alike. Dash offset carries along the whole path
           so the dashes don't restart at every segment. */
        ctx.lineDashOffset = -dist;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(11, 29, 58, ${0.16 * alpha})`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        dist += Math.hypot(b.x - a.x, b.y - a.y);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (now - lastMove > 450) target = REST_ANGLE;
      /* Shortest way round, so the plane never spins the long way. */
      const delta = ((target - angle + 540) % 360) - 180;
      angle += delta * Math.min(1, dt * (now - lastMove > 450 ? 5 : 12));
      render();
      drawTrail(now);
      if (Math.abs(delta) < 0.3 && trail.length === 0) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        plane.dataset.visible = "true";
      }
      const now = performance.now();
      /* Only bank on deliberate movement; a 1px wobble shouldn't turn it. */
      if (Math.hypot(dx, dy) > 3) {
        target = (Math.atan2(dy, dx) * 180) / Math.PI;
        lastMove = now;
        if (!reduceMotion) trail.push({ x, y, t: now });
      }
      const el = e.target instanceof Element ? e.target : null;
      plane.dataset.hover = el?.closest(INTERACTIVE) ? "true" : "false";
      plane.dataset.hidden = el?.closest(TEXT_ENTRY) ? "true" : "false";
      if (reduceMotion) render();
      else wake();
    };

    const onLeave = () => {
      visible = false;
      plane.dataset.visible = "false";
      trail.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      plane.dataset.pressed = "true";
    };
    const onUp = () => {
      plane.dataset.pressed = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", resize);
    /* Leaving the window, or into an iframe like the booking popup. */
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("plane-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={trailRef} aria-hidden className="pointer-events-none fixed inset-0 z-[98] hidden [.plane-cursor_&]:block" />
      <div
        ref={planeRef}
        aria-hidden
        data-visible="false"
        className="plane-cursor-el pointer-events-none fixed top-0 left-0 z-[99] hidden origin-top-left [.plane-cursor_&]:block"
      >
        {/* Drawn nose-right with the nose at the element's origin, so rotating
            about the origin keeps the hotspot pinned under the pointer. */}
        <svg width="30" height="22" viewBox="0 0 30 22" className="plane-cursor-svg absolute -top-[11px] -left-[29px] overflow-visible">
          <path className="plane-wing-top" d="M29 11 1 1.5 8 11Z" />
          <path className="plane-wing-bottom" d="M29 11 8 11 1 20.5Z" />
          <path className="plane-fold" d="M29 11 8 11 10.5 15.5Z" />
          <path className="plane-outline" d="M29 11 1 1.5 8 11 1 20.5Z M8 11h21" />
        </svg>
      </div>
    </>
  );
}
