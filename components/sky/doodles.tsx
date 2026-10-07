"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * Chalk-marker doodles from the banner: white strokes drawn straight onto the
 * sky. They sketch themselves in once when they scroll into view, then stay.
 * Paths are hand-placed with a little wobble on purpose; a perfectly smooth
 * curve reads as clip art rather than as someone's pen.
 *
 * All decorative, so every root is aria-hidden.
 */

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay: 0.15 * i, ease: [0.65, 0, 0.35, 1] },
      opacity: { duration: 0.01, delay: 0.15 * i },
    },
  }),
};

const chalk = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Doodle({
  viewBox,
  className,
  children,
}: {
  viewBox: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox={viewBox}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("chalk pointer-events-none", className)}
    >
      {children}
    </motion.svg>
  );
}

/* Paper plane on a dashed loop, the banner's "send it" gesture. */
export function PaperPlane({ className }: { className?: string }) {
  return (
    <Doodle viewBox="0 0 260 150" className={className}>
      <motion.path
        variants={draw}
        custom={0}
        d="M6 140c22-6 40-20 48-38 7-15-4-26-14-18-9 8 1 22 18 22 30 1 56-24 84-44 14-10 30-18 44-22"
        {...chalk}
        strokeWidth={2}
        strokeDasharray="7 9"
      />
      <motion.g variants={draw} custom={2}>
        <path d="M176 52 254 10 212 74Z" fill="#ffffff" stroke="none" />
        <path d="M176 52 254 10 200 60Z" fill="#d9e8fb" stroke="none" />
        <path d="M200 60 254 10 196 80Z" fill="#c4dbf7" stroke="none" />
      </motion.g>
      <motion.path variants={draw} custom={2} d="M176 52 254 10 212 74 200 60 196 80 200 60" {...chalk} strokeWidth={1.4} stroke="#b8d2f2" />
    </Doodle>
  );
}

/* Rising bars and an arrow, from the "more pipeline" corner of the banner. */
export function GrowthChart({ className }: { className?: string }) {
  return (
    <Doodle viewBox="0 0 220 170" className={className}>
      <motion.path variants={draw} custom={0} d="M8 162c40-2 120-1 204-4" {...chalk} />
      <motion.path variants={draw} custom={1} d="M30 160v-26h18v26M64 160v-44h18v44M98 160v-64h18v64M132 160v-92h18v92" {...chalk} strokeWidth={2} />
      <motion.path variants={draw} custom={2} d="M136 156l10-80M140 140l8-50" {...chalk} strokeWidth={1.4} />
      <motion.path variants={draw} custom={3} d="M14 128C60 96 110 60 176 18" {...chalk} />
      <motion.path variants={draw} custom={4} d="M154 16l23 1-6 22" {...chalk} />
    </Doodle>
  );
}

export function Smiley({ className }: { className?: string }) {
  return (
    <Doodle viewBox="0 0 60 60" className={className}>
      <motion.path variants={draw} custom={0} d="M30 4c15 0 26 11 26 26 0 14-12 26-26 26C16 56 4 45 4 30 4 16 15 5 31 5" {...chalk} />
      <motion.path variants={draw} custom={1} d="M21 23v4M39 23v4" {...chalk} strokeWidth={3} />
      <motion.path variants={draw} custom={2} d="M18 36c6 9 18 9 24 0" {...chalk} />
    </Doodle>
  );
}

/* Long marker swoosh used as an underline beneath handwritten taglines. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <Doodle viewBox="0 0 520 40" className={className}>
      <motion.path variants={draw} custom={1} d="M6 32C120 14 300 6 514 10" {...chalk} strokeWidth={3} />
    </Doodle>
  );
}

/* The three emphasis strokes either side of a word: "= AI =". */
export function Emphasis({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <Doodle viewBox="0 0 40 40" className={cn(flip && "-scale-x-100", className)}>
      <motion.path variants={draw} custom={2} d="M6 8l22 6M4 20h26M6 32l22-6" {...chalk} />
    </Doodle>
  );
}

/* Loose curling arrow, pointing on to whatever comes next. */
export function CurlArrow({ className }: { className?: string }) {
  return (
    <Doodle viewBox="0 0 90 60" className={className}>
      <motion.path variants={draw} custom={0} d="M6 6c-2 22 10 40 34 42 14 1 26-4 40-12" {...chalk} />
      <motion.path variants={draw} custom={1} d="M68 28l13 8-11 11" {...chalk} />
    </Doodle>
  );
}

/* Short burst lines, the "click" marks around the banner's Boost button. */
export function Burst({ className }: { className?: string }) {
  return (
    <Doodle viewBox="0 0 50 50" className={className}>
      <motion.path variants={draw} custom={3} d="M25 4v10M42 12l-7 7M46 30H36M8 12l7 7" {...chalk} />
    </Doodle>
  );
}

/* The stacked handwritten list from the banner's top-left. */
export function HandList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className={cn("chalk pointer-events-none -rotate-6", className)}
    >
      <ul className="font-hand text-[1.6rem] leading-[1.05] font-medium tracking-wide uppercase">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, x: -8 },
              show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
      <CurlArrow className="mt-1 ml-6 w-14" />
    </motion.div>
  );
}

/* Yellow sticky note, slightly crooked, with a strip of tape. */
export function StickyNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, rotate: 0, y: 10 }}
      whileInView={{ opacity: 1, rotate: 5, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className={cn(
        "pointer-events-none relative bg-[#ffd84d] px-5 pt-6 pb-5 shadow-[0_18px_30px_-16px_rgba(120,80,0,0.55)]",
        className
      )}
    >
      <span className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 bg-white/60" />
      <p className="font-hand text-[1.45rem] leading-[1.05] font-medium text-[#3a2a00]">{children}</p>
    </motion.div>
  );
}
