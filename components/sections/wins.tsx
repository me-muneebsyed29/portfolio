"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { wins } from "@/data/wins";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * The four-cell stat strip from the Applications sheet: one cell in cadmium —
 * the one this section is about — and the rest stay chalk even though they are
 * also good numbers. Cells are divided by rules, not gaps.
 */
export function Wins() {
  return (
    <Section id="wins" ruled={false}>
      <Eyebrow index="01">Selected wins</Eyebrow>
      <SectionTitle className="mt-5 max-w-xl">Outcomes, not activity.</SectionTitle>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-px border-t-2 border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4"
      >
        {wins.map((win, i) => (
          <motion.div
            key={win.label}
            variants={fadeUp}
            className={cn(
              "flex min-h-[224px] flex-col justify-between bg-background pt-7 pr-6 pb-6",
              /* A cell with a rule to its left needs padding to clear it; a cell
                 that starts a row must stay flush with the container edge, or
                 the strip stops aligning with the heading above it. The grid is
                 1 / 2 / 4 columns, so which cells start a row changes with the
                 breakpoint — hence the index maths rather than a static class. */
              i % 2 !== 0 && "sm:pl-6",
              i % 4 === 0 ? "lg:pl-0" : "lg:pl-6"
            )}
          >
            <AnimatedCounter
              value={win.value}
              prefix={win.prefix}
              suffix={win.suffix}
              className={cn(
                "text-[2.5rem] font-bold leading-none",
                win.accent ? "text-cadmium" : "text-foreground"
              )}
            />
            <div className="mt-8">
              <p className="mono-label text-foreground">{win.label}</p>
              <p className="mt-3 text-caption text-muted-foreground text-pretty">{win.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
