"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * 02 / TYPE — FIGURES. The mono face and tabular figures come from `.figures`,
 * so a counting number never changes width mid-animation and columns of stats
 * stay aligned while they run.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  /* Derived rather than pushed through setState in the effect: with motion
     reduced there is nothing to animate, so the final value is simply what we
     render — no cascading render, and the figure is correct on first paint. */
  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={cn("figures", className)}>
      {prefix}
      {Number.isInteger(value) ? Math.round(shown) : shown.toFixed(1)}
      {suffix}
    </span>
  );
}
