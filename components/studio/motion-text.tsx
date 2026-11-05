"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Headline reveal: each word rises out of its own clipping mask, one after
 * the next. Words passed in `emphasis` (matched by position from the end)
 * set in the taupe italic.
 *
 * The full sentence stays in the DOM as plain text for screen readers and
 * search; the animated copy is aria-hidden.
 */
export function RevealWords({
  text,
  emphasis = 0,
  className,
  delay = 0,
  stagger = 0.06,
  inView = false,
}: {
  text: string;
  /* How many trailing words take the taupe italic. */
  emphasis?: number;
  className?: string;
  delay?: number;
  stagger?: number;
  /* Wait until scrolled into view instead of running on mount. */
  inView?: boolean;
}) {
  const words = text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const run = reduceMotion || !inView || seen;

  return (
    <span ref={ref} className={cn("block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const em = i >= words.length - emphasis;
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
              <motion.span
                className={cn("inline-block", em && "em-taupe pr-[0.04em]")}
                initial={reduceMotion ? false : { y: "110%" }}
                animate={run ? { y: "0%" } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}

/*
 * A figure that counts up the first time it scrolls into view. Prefix and
 * suffix ("$", "M+", "x", "%") are kept as written; only the number moves.
 * Strings without a number render as they are.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;

  /* Starts at the true figure, so no-JS readers and search see it; the count
     from zero only begins once the figure scrolls into view. */
  const count = useMotionValue(target);
  const text = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!match || reduceMotion || !seen) return;
    count.set(0);
    const controls = animate(count, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `match` is derived from `value`
  }, [seen, reduceMotion, target, count, value]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={cn("figures", className)}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
