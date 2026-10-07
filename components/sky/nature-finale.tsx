"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Footer } from "@/components/layout/footer";
import { GlassSheet } from "@/components/sky/glass-sheet";
import { CurlArrow } from "@/components/sky/doodles";
import { HillDefs, MeadowLayer, MidHillsLayer, MountainsLayer, NearHillLayer } from "./hills";
import { MeadowLife } from "./meadow-life";

/*
 * Where the scroll ends: the sky comes down to a live landscape. Hills rise
 * into place as you arrive, each layer at its own depth; the cursor shifts
 * them in parallax, parts the grass, and scatters the butterflies. A click on
 * the meadow sends a gust through it, a click in the sky flushes birds.
 *
 * The copy stays on glass in front of it, same as everywhere else. The
 * landscape keeps one viewport of height pinned to the bottom whatever the
 * content above it does, so the last screen of every page is open meadow.
 */

/* Depth per layer: how far it rises on arrival and how far it travels with
   the cursor. Further away moves less. */
const DEPTHS = { far: 0.15, mid: 0.4, near: 0.7, front: 1 } as const;

function useLayerMotion(
  depth: number,
  rise: MotionValue<number>,
  px: MotionValue<number>,
  py: MotionValue<number>
) {
  const x = useTransform(px, (v) => v * -36 * depth);
  const y = useTransform([rise, py], ([r, v]: number[]) => r * 140 * depth + v * -10 * depth);
  return { x, y };
}

export function NatureFinale({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  /* 1 while the finale is still below the fold, 0 once you reach the bottom. */
  const rise = useTransform(scrollYProgress, [0, 0.9], [1, 0], { clamp: true });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 18 });
  const py = useSpring(rawY, { stiffness: 60, damping: 18 });

  const far = useLayerMotion(DEPTHS.far, rise, px, py);
  const mid = useLayerMotion(DEPTHS.mid, rise, px, py);
  const near = useLayerMotion(DEPTHS.near, rise, px, py);
  const front = useLayerMotion(DEPTHS.front, rise, px, py);
  const still = { x: 0, y: 0 };

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section ref={ref} onPointerMove={onPointerMove} className="relative isolate overflow-hidden">
      <HillDefs />

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[max(100svh,640px)]">
        <motion.div className="absolute -inset-x-[3%] top-0 -bottom-10" style={reduceMotion ? still : far}>
          <MountainsLayer />
        </motion.div>
        <motion.div className="absolute -inset-x-[3%] top-0 -bottom-10" style={reduceMotion ? still : mid}>
          <MidHillsLayer />
        </motion.div>
        <motion.div className="absolute -inset-x-[3%] top-0 -bottom-10" style={reduceMotion ? still : near}>
          <NearHillLayer />
        </motion.div>
        <motion.div className="absolute -inset-x-[4%] top-0 -bottom-10" style={reduceMotion ? still : front}>
          <MeadowLayer />
          <MeadowLife />
        </motion.div>
      </div>

      <div className="relative pt-6 md:pt-10">
        {children ? <GlassSheet>{children}</GlassSheet> : null}

        {/* Room for the mountains to show between the copy and the footer. */}
        <div className="relative h-[30svh] min-h-[200px]">
          <div
            aria-hidden
            className="scene-hint pointer-events-none absolute bottom-6 left-[max(1.5rem,calc(50%-36rem))] hidden items-end gap-1 sm:flex"
          >
            <p className="font-hand -rotate-3 text-[1.6rem] leading-none font-medium">
              psst… click the meadow
            </p>
            <CurlArrow className="w-12 translate-y-6 rotate-12 text-inherit" />
          </div>
        </div>

        <Footer />

        {/* The last thing on the page is open meadow. */}
        <div className="h-[30svh] min-h-[200px]" />
      </div>
    </section>
  );
}
