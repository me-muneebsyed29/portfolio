"use client";

import { useEffect, useRef } from "react";
import { getWeather, subscribeWeather, type Weather } from "@/lib/weather";

/*
 * Rain or snow over the whole sky, drawn on one fixed canvas behind the glass.
 * The finale draws its own precipitation in front of the hills (MeadowLife),
 * so this layer only has to cover the open sky.
 *
 * Fades in and out over about a second when the weather changes, and the
 * loop stops entirely in sunny weather or when the tab is hidden. With
 * reduced motion it paints one still frame of drops or flakes.
 */

type Drop = { x: number; y: number; len: number; speed: number };
type Flake = { x: number; y: number; r: number; speed: number; phase: number };

const RAIN_SLANT = 0.22;

export function Precipitation({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let drops: Drop[] = [];
    let flakes: Flake[] = [];
    let weather: Weather = getWeather();
    /* 0..1 strength of each kind, eased toward the current weather. */
    let rain = weather === "rainy" ? 1 : 0;
    let snow = weather === "snowy" ? 1 : 0;

    function layout() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
      const area = W * H;
      drops = Array.from({ length: Math.round(area / 7000) }, () => ({
        x: Math.random() * (W + H * RAIN_SLANT),
        y: Math.random() * H,
        len: 14 + Math.random() * 16,
        speed: 900 + Math.random() * 500,
      }));
      flakes = Array.from({ length: Math.round(area / 6500) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1 + Math.random() * 2.6,
        speed: 28 + Math.random() * 50,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(t: number, dt: number) {
      ctx!.clearRect(0, 0, W, H);

      if (rain > 0.01) {
        const n = Math.round(drops.length * rain);
        ctx!.strokeStyle = `rgba(225, 233, 245, ${0.5 * rain})`;
        ctx!.lineWidth = 1.1;
        ctx!.beginPath();
        for (let i = 0; i < n; i++) {
          const d = drops[i];
          d.y += d.speed * dt;
          d.x -= d.speed * dt * RAIN_SLANT;
          if (d.y > H + d.len) {
            d.y = -d.len - Math.random() * 60;
            d.x = Math.random() * (W + H * RAIN_SLANT);
          }
          ctx!.moveTo(d.x, d.y);
          ctx!.lineTo(d.x + d.len * RAIN_SLANT, d.y - d.len);
        }
        ctx!.stroke();
      }

      if (snow > 0.01) {
        const n = Math.round(flakes.length * snow);
        ctx!.fillStyle = `rgba(255, 255, 255, ${0.9 * snow})`;
        ctx!.beginPath();
        for (let i = 0; i < n; i++) {
          const f = flakes[i];
          f.y += f.speed * dt;
          f.x += Math.sin(t * 0.9 + f.phase) * 18 * dt + 6 * dt;
          if (f.y > H + 4) {
            f.y = -4;
            f.x = Math.random() * W;
          }
          if (f.x > W + 4) f.x = -4;
          ctx!.moveTo(f.x + f.r, f.y);
          ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        }
        ctx!.fill();
      }
    }

    layout();

    let raf = 0;
    let running = false;
    let last = 0;
    let clock = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      clock += dt;
      const ease = Math.min(1, dt * 1.4);
      rain += ((weather === "rainy" ? 1 : 0) - rain) * ease;
      snow += ((weather === "snowy" ? 1 : 0) - snow) * ease;
      draw(clock, dt);
      if (weather === "sunny" && rain < 0.01 && snow < 0.01) {
        ctx!.clearRect(0, 0, W, H);
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      if (reduceMotion) {
        rain = weather === "rainy" ? 1 : 0;
        snow = weather === "snowy" ? 1 : 0;
        draw(0, 0);
        return;
      }
      const shouldRun = !document.hidden && (weather !== "sunny" || rain > 0.01 || snow > 0.01);
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const unsubscribe = subscribeWeather(() => {
      weather = getWeather();
      sync();
    });
    const onResize = () => {
      layout();
      if (reduceMotion) draw(0, 0);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className ?? "absolute inset-0 h-full w-full"} />;
}
