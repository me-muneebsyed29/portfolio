"use client";

import { useEffect, useRef } from "react";
import { mulberry32, pxToSceneX, ridgeY, ridges, sceneScale, sceneToPx, SCENE_H } from "./landscape";

/*
 * Everything that moves in the nature finale: grass rooted on the meadow line,
 * wildflowers, butterflies, birds and pollen. One canvas, one rAF loop.
 *
 * Interaction:
 * - the cursor parts the grass it passes over, and butterflies keep clear of it
 * - a click on open meadow sends a gust rolling out from that point, shaking
 *   petals loose; a click in the sky flushes a small flock of birds
 *
 * The loop only runs while the finale is on screen and the tab is visible.
 * With reduced motion it paints one still frame and stops.
 *
 * Grass is batched: blades are bucketed by depth band and shade, and each
 * bucket is one path and one fill, so ~1,500 blades cost a dozen fill calls.
 */

type Blade = {
  x: number;
  y: number;
  h: number;
  w: number;
  phase: number;
  bend: number;
};

type Flower = Blade & { color: string; r: number; band: number };

type Petal = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; life: number; color: string };

type Mote = { x: number; y: number; vy: number; phase: number; r: number };

type Butterfly = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  retarget: number;
  phase: number;
  color: string;
};

type Bird = { ox: number; oy: number; phase: number; size: number };
type Flock = { x: number; y: number; vx: number; vy: number; birds: Bird[] };

type Gust = { x: number; y: number; t0: number };

const BANDS = 4;
const SHADES = 3;

/* Back bands are cooler and darker, front bands warmer and lit. */
const bladeColors = [
  ["#3f7f3a", "#467f3e", "#3a7536"],
  ["#4b9140", "#55983f", "#478a3d"],
  ["#5aa544", "#66ad47", "#529c40"],
  ["#6cb84a", "#7fc452", "#5fae45"],
];

const petalColors = ["#ffffff", "#ffd84d", "#ff9fb5", "#c9b6ff", "#fff3b0"];
const wingColors = ["#ffcf3f", "#ff9f5a", "#7cc0ff"];

function isInteractive(target: EventTarget | null) {
  return target instanceof Element && !!target.closest("a, button, input, textarea, select, label, .glass, .glass-card");
}

export function MeadowLife({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.closest("section") ?? canvas.parentElement!;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let s = 1;
    let meadowTop = 0;
    let buckets: Blade[][] = [];
    let flowers: Flower[] = [];
    let motes: Mote[] = [];
    let butterflies: Butterfly[] = [];
    let flocks: Flock[] = [];
    let petals: Petal[] = [];
    let gusts: Gust[] = [];
    let nextFlock = 4;
    const pointer = { x: -9999, y: -9999, active: false };

    const rootAt = (sceneX: number, depth: number) => {
      const top = ridgeY(ridges.meadow, sceneX);
      return sceneToPx(W, H, sceneX, top + depth * (SCENE_H - top));
    };

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (!W || !H) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      s = sceneScale(W, H);
      meadowTop = sceneToPx(W, H, 0, ridges.meadow.base - 30)[1];

      const rand = mulberry32(42);
      const x0 = pxToSceneX(W, H, -20);
      const x1 = pxToSceneX(W, H, W + 20);
      const unit = Math.max(0.8, Math.min(s, 1.4));

      buckets = Array.from({ length: BANDS * SHADES }, () => []);
      const count = Math.round(Math.min(1500, Math.max(360, W * 1.05)));
      for (let i = 0; i < count; i++) {
        const sx = x0 + rand() * (x1 - x0);
        const depth = Math.pow(rand(), 0.8);
        const [x, y] = rootAt(sx, depth);
        const band = Math.min(BANDS - 1, Math.floor(depth * BANDS));
        buckets[band * SHADES + Math.floor(rand() * SHADES)].push({
          x,
          y,
          h: (16 + 84 * Math.pow(depth, 1.3)) * unit * (0.65 + rand() * 0.7),
          w: (2.2 + 3.8 * depth) * unit,
          phase: rand() * Math.PI * 2,
          bend: 0,
        });
      }

      flowers = [];
      const flowerCount = Math.round(Math.min(52, Math.max(14, W / 30)));
      for (let i = 0; i < flowerCount; i++) {
        const sx = x0 + rand() * (x1 - x0);
        const depth = 0.12 + rand() * 0.8;
        const [x, y] = rootAt(sx, depth);
        flowers.push({
          x,
          y,
          h: (20 + 64 * depth) * unit * (0.8 + rand() * 0.4),
          w: 1.4 * unit,
          phase: rand() * Math.PI * 2,
          bend: 0,
          r: (2 + 3.4 * depth) * unit,
          color: petalColors[Math.floor(rand() * 4)],
          band: Math.min(BANDS - 1, Math.floor(depth * BANDS)),
        });
      }
      /* Drawn interleaved with the grass bands, so order by band first. */
      flowers.sort((a, b) => a.band - b.band || a.y - b.y);

      motes = Array.from({ length: 28 }, () => ({
        x: rand() * W,
        y: meadowTop - 40 + rand() * (H - meadowTop + 40),
        vy: 6 + rand() * 10,
        phase: rand() * Math.PI * 2,
        r: 0.8 + rand() * 1.6,
      }));

      butterflies = wingColors.map((color, i) => {
        const f = flowers[Math.floor(rand() * flowers.length)];
        return {
          x: f ? f.x : W * (0.2 + 0.3 * i),
          y: f ? f.y - f.h - 20 : H * 0.8,
          vx: 0,
          vy: 0,
          tx: f ? f.x : W / 2,
          ty: f ? f.y - f.h : H * 0.8,
          retarget: 0,
          phase: rand() * 10,
          color,
        };
      });
    }

    function spawnFlock(x?: number, y?: number, dir?: number) {
      const fromLeft = dir === undefined ? Math.random() > 0.5 : dir > 0;
      const n = 3 + Math.floor(Math.random() * 4);
      const size = (6 + Math.random() * 3) * Math.max(0.85, Math.min(s, 1.3));
      flocks.push({
        x: x ?? (fromLeft ? -60 : W + 60),
        y: y ?? H * (0.06 + Math.random() * 0.22),
        vx: (fromLeft ? 1 : -1) * (55 + Math.random() * 35),
        vy: y !== undefined ? -18 - Math.random() * 14 : (Math.random() - 0.5) * 6,
        birds: Array.from({ length: n }, (_, i) => ({
          ox: -i * 18 * (fromLeft ? 1 : -1) + (Math.random() - 0.5) * 8,
          oy: (i % 2 ? 1 : -1) * Math.ceil(i / 2) * 10 + (Math.random() - 0.5) * 6,
          phase: Math.random() * Math.PI * 2,
          size: size * (0.85 + Math.random() * 0.3),
        })),
      });
    }

    function bladePath(b: Blade, angle: number) {
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      const tx = b.x + sin * b.h;
      const ty = b.y - cos * b.h;
      const half = angle * 0.45;
      const cx = b.x + Math.sin(half) * b.h * 0.55;
      const cy = b.y - Math.cos(half) * b.h * 0.55;
      ctx!.moveTo(b.x - b.w / 2, b.y);
      ctx!.quadraticCurveTo(cx - b.w * 0.3, cy, tx, ty);
      ctx!.quadraticCurveTo(cx + b.w * 0.3, cy, b.x + b.w / 2, b.y);
    }

    /* Wind lean for a stem at x, plus the cursor and any gusts. Updates the
       stem's springy bend in place and returns the final angle. */
    function sway(b: Blade, t: number, dt: number) {
      const wind =
        0.1 +
        0.13 * Math.sin(b.x * 0.0045 - t * 1.25) +
        0.05 * Math.sin(t * 2.6 + b.phase) +
        0.03 * Math.sin(b.x * 0.02 + t * 3.1);

      let target = 0;
      if (pointer.active) {
        const dx = b.x - pointer.x;
        const dy = b.y - b.h * 0.6 - pointer.y;
        const R = 120 * Math.max(0.9, s);
        const d = Math.hypot(dx, dy);
        if (d < R) target += Math.sign(dx || 1) * Math.pow(1 - d / R, 2) * 1.1;
      }
      for (const g of gusts) {
        const age = t - g.t0;
        const dx = b.x - g.x;
        const d = Math.hypot(dx, b.y - g.y);
        const off = Math.abs(d - age * 650);
        if (off < 110) target += Math.sign(dx || 1) * (1 - off / 110) * 0.95 * Math.exp(-age * 1.1);
      }
      /* Quick to bend, slow to recover, like a real stem. */
      const k = Math.abs(target) > Math.abs(b.bend) ? 14 : 3.2;
      b.bend += (target - b.bend) * Math.min(1, k * dt);
      return wind + b.bend;
    }

    function drawBird(x: number, y: number, size: number, flap: number) {
      const lift = size * (0.25 + 0.55 * flap);
      ctx!.moveTo(x - size, y - lift * 0.4);
      ctx!.quadraticCurveTo(x - size * 0.45, y - lift, x, y);
      ctx!.quadraticCurveTo(x + size * 0.45, y - lift, x + size, y - lift * 0.4);
    }

    function drawButterfly(b: Butterfly, t: number) {
      const flap = Math.abs(Math.cos(t * 13 + b.phase));
      const size = 9 * Math.max(0.9, Math.min(s, 1.4));
      ctx!.save();
      ctx!.translate(b.x, b.y);
      ctx!.rotate(Math.max(-0.5, Math.min(0.5, b.vx * 0.01)));
      ctx!.fillStyle = b.color;
      for (const side of [-1, 1]) {
        ctx!.beginPath();
        ctx!.ellipse(side * size * 0.55 * flap, -size * 0.25, size * 0.6 * flap + 0.4, size * 0.75, side * 0.5, 0, Math.PI * 2);
        ctx!.ellipse(side * size * 0.4 * flap, size * 0.45, size * 0.4 * flap + 0.3, size * 0.5, -side * 0.4, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.fillStyle = "#3a2a1a";
      ctx!.fillRect(-0.7, -size * 0.7, 1.4, size * 1.3);
      ctx!.restore();
    }

    function frame(t: number, dt: number) {
      ctx!.clearRect(0, 0, W, H);

      /* Birds, behind everything else in the scene. */
      if (!reduceMotion) {
        nextFlock -= dt;
        if (nextFlock <= 0) {
          spawnFlock();
          nextFlock = 9 + Math.random() * 8;
        }
      }
      ctx!.strokeStyle = "rgba(26, 48, 84, 0.7)";
      ctx!.lineWidth = 1.6;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      for (const f of flocks) {
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.vy *= 1 - 0.4 * dt;
        for (const bird of f.birds) {
          const flap = 0.5 + 0.5 * Math.sin(t * 9 + bird.phase);
          drawBird(f.x + bird.ox, f.y + bird.oy + Math.sin(t * 2 + bird.phase) * 2, bird.size, flap);
        }
      }
      ctx!.stroke();
      flocks = flocks.filter((f) => f.x > -200 && f.x < W + 200 && f.y > -100);

      /* Pollen catching the light above the grass. */
      for (const m of motes) {
        if (!reduceMotion) {
          m.y -= m.vy * dt;
          m.x += Math.sin(t * 0.8 + m.phase) * 8 * dt + 6 * dt;
          if (m.y < meadowTop - 120) {
            m.y = H - 10;
            m.x = Math.random() * W;
          }
          if (m.x > W + 10) m.x = -10;
        }
        const a = 0.35 + 0.35 * Math.sin(t * 2 + m.phase);
        ctx!.fillStyle = `rgba(255, 248, 210, ${a})`;
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      gusts = gusts.filter((g) => t - g.t0 < 3);

      /* Grass and flowers, back band to front band. */
      let fi = 0;
      for (let band = 0; band < BANDS; band++) {
        for (let shade = 0; shade < SHADES; shade++) {
          const bucket = buckets[band * SHADES + shade];
          ctx!.fillStyle = bladeColors[band][shade];
          ctx!.beginPath();
          for (const b of bucket) bladePath(b, sway(b, t, dt));
          ctx!.fill();
        }
        while (fi < flowers.length && flowers[fi].band === band) {
          const f = flowers[fi++];
          const a = sway(f, t, dt) * 0.8;
          const hx = f.x + Math.sin(a) * f.h;
          const hy = f.y - Math.cos(a) * f.h;
          ctx!.strokeStyle = "#3f8a36";
          ctx!.lineWidth = f.w;
          ctx!.beginPath();
          ctx!.moveTo(f.x, f.y);
          ctx!.quadraticCurveTo(f.x + Math.sin(a * 0.4) * f.h * 0.5, f.y - f.h * 0.5, hx, hy);
          ctx!.stroke();
          ctx!.fillStyle = f.color;
          ctx!.beginPath();
          for (let p = 0; p < 5; p++) {
            const ang = (p / 5) * Math.PI * 2 + f.phase;
            ctx!.moveTo(hx + Math.cos(ang) * f.r, hy + Math.sin(ang) * f.r);
            ctx!.arc(hx + Math.cos(ang) * f.r, hy + Math.sin(ang) * f.r, f.r * 0.75, 0, Math.PI * 2);
          }
          ctx!.fill();
          ctx!.fillStyle = f.color === "#ffd84d" ? "#c47a12" : "#ffcf3f";
          ctx!.beginPath();
          ctx!.arc(hx, hy, f.r * 0.6, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      /* Butterflies wander between flowers and shy away from the cursor. */
      for (const b of butterflies) {
        if (!reduceMotion) {
          b.retarget -= dt;
          if (b.retarget <= 0 && flowers.length) {
            const f = flowers[Math.floor(Math.random() * flowers.length)];
            b.tx = f.x;
            b.ty = f.y - f.h - 6;
            b.retarget = 3 + Math.random() * 4;
          }
          let ax = (b.tx - b.x) * 0.6 + Math.sin(t * 3.1 + b.phase) * 60;
          let ay = (b.ty - b.y) * 0.6 + Math.cos(t * 4.3 + b.phase) * 70;
          if (pointer.active) {
            const dx = b.x - pointer.x;
            const dy = b.y - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < 120) {
              ax += (dx / (d || 1)) * 900 * (1 - d / 120);
              ay += (dy / (d || 1)) * 900 * (1 - d / 120);
            }
          }
          b.vx = (b.vx + ax * dt) * (1 - 1.8 * dt);
          b.vy = (b.vy + ay * dt) * (1 - 1.8 * dt);
          b.x += b.vx * dt;
          b.y += b.vy * dt;
        }
        drawButterfly(b, t);
      }

      /* Petals shaken loose by a gust. */
      for (const p of petals) {
        p.vx += (40 + Math.sin(t * 2 + p.rot) * 30) * dt;
        p.vy += (26 - Math.abs(p.vy) * 0.6) * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.life -= dt;
        ctx!.save();
        ctx!.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot);
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.ellipse(0, 0, 4 * Math.abs(Math.cos(p.rot * 1.7)) + 0.8, 2.4, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
      petals = petals.filter((p) => p.life > 0);
    }

    layout();

    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;
    let clock = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      clock += dt;
      frame(clock, dt);
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = visible && !document.hidden && !reduceMotion;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const still = () => {
      if (reduceMotion && W && H) frame(0, 0);
    };
    still();

    const resize = new ResizeObserver(() => {
      layout();
      still();
    });
    resize.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    if (reduceMotion) {
      return () => {
        resize.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = host.contains(e.target as Node);
    };
    const onLeave = () => {
      pointer.active = false;
    };
    /* A finger lifting is the touch version of the cursor leaving. */
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") pointer.active = false;
    };
    const onDown = (e: PointerEvent) => {
      if (!host.contains(e.target as Node) || isInteractive(e.target)) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < meadowTop - 60 * s) {
        spawnFlock(x, y, x < W / 2 ? 1 : -1);
        return;
      }
      gusts.push({ x, y, t0: clock });
      for (let i = 0; i < 24; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
        const v = 80 + Math.random() * 160;
        petals.push({
          x,
          y: y - 10,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 10,
          life: 2.5 + Math.random() * 2,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className ?? "absolute inset-0 h-full w-full"} />;
}
