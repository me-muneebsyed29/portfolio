"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { wins } from "@/data/wins";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Four floating cards on the glass, like the UI widgets in the banner. One
 * figure takes the sky blue (the one this section is about); the rest stay ink
 * even though they are also good numbers.
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
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {wins.map((win) => (
          <motion.div
            key={win.label}
            variants={fadeUp}
            className="glass-card flex min-h-[220px] flex-col justify-between rounded-3xl p-6"
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
