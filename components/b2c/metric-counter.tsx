"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { EASE } from "@/lib/motion";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Count-up that is correct before it animates.
 *
 * The shared AnimatedCounter starts at 0 and only reaches the real figure once
 * an IntersectionObserver fires — so server HTML, no-JS readers, and any missed
 * observer all render "0x". On a page whose entire argument is the numbers,
 * that's the worst possible failure mode.
 *
 * Here React renders the true value and the animation is driven by writing to
 * the DOM node directly, so the correct figure is always the resting state.
 */
export function MetricCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
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

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion || !inView) return;

    // Reset to zero and animate in the same frame, so the true value that React
    // rendered is never painted and then yanked back.
    const write = (v: number) => {
      node.textContent = `${prefix}${Math.round(v)}${suffix}`;
    };
    write(0);

    const controls = animate(0, value, { duration, ease: EASE, onUpdate: write });
    return () => {
      controls.stop();
      write(value);
    };
  }, [inView, value, duration, prefix, suffix, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
