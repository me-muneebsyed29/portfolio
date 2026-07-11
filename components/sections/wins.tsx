"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { wins } from "@/data/wins";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Wins() {
  return (
    <Section id="wins">
      <Eyebrow>Selected wins</Eyebrow>
      <SectionTitle className="mt-4 max-w-2xl">
        Outcomes, not activity.
      </SectionTitle>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {wins.map((win) => (
          <motion.div
            key={win.label}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between bg-card p-8 min-h-[220px]"
          >
            <p className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              <AnimatedCounter value={win.value} prefix={win.prefix} suffix={win.suffix} />
            </p>
            <div className="mt-6">
              <p className="text-base font-medium text-foreground">{win.label}</p>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{win.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
