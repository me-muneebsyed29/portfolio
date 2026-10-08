"use client";

import { motion, type Variants } from "framer-motion";
import type { DoodleId } from "@/data/how-i-work";
import { cn } from "@/lib/utils";

/*
 * Pen doodles for the How I work notes, one per note. Same hand as the chalk
 * doodles on the sky, but drawn in ink on the white cards, and sketched in
 * once when the note scrolls into view.
 */
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, delay: 0.12 * i, ease: [0.65, 0, 0.35, 1] },
      opacity: { duration: 0.01, delay: 0.12 * i },
    },
  }),
};

const pen = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<DoodleId, string[]> = {
  /* A loop with an arrowhead: one machine, going round. */
  loop: [
    "M14 30c0-10 8-17 18-17 11 0 18 8 18 17 0 10-8 17-18 17-7 0-12-3-15-8",
    "M11 33l6 7 6-6",
    "M26 30h12M32 24v12",
  ],
  /* Fast arrow with speed lines. */
  arrow: ["M8 40C22 34 36 24 52 12", "M40 11l13 0-3 13", "M6 24h10M10 32h8M4 16h8"],
  /* Megaphone and its sound. */
  megaphone: [
    "M10 26v10h8l18 10V16L18 26z",
    "M18 36l3 10h5l-2-9",
    "M44 22c3 2 4 5 4 9s-1 7-4 9M50 17c4 4 6 9 6 14s-2 10-6 14",
  ],
  /* A stack of coins. */
  coins: [
    "M14 44c0 3 7 5 15 5s15-2 15-5M14 37c0 3 7 5 15 5s15-2 15-5",
    "M14 30c0-3 7-5 15-5s15 2 15 5-7 5-15 5-15-2-15-5z",
    "M14 30v14M44 30v14",
    "M40 16c0-4 4-7 9-7s9 3 9 7-4 7-9 7",
  ],
};

export function NoteDoodle({ id, className }: { id: DoodleId; className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 62 56"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("text-primary", className)}
    >
      {paths[id].map((d, i) => (
        <motion.path key={i} d={d} variants={draw} custom={i} {...pen} />
      ))}
    </motion.svg>
  );
}
