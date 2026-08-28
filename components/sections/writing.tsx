"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { essays } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* A ledger of rows, not cards: index, title, standfirst, reading time. Reading
   time is a figure, so it takes the mono face like every other number. */
export function Writing() {
  return (
    <Section id="writing">
      <Eyebrow index="05">Writing</Eyebrow>
      <SectionTitle className="mt-5 max-w-xl">Essays on growth and AI.</SectionTitle>

      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 border-t border-rule"
      >
        {essays.map((essay, i) => (
          <motion.a
            key={essay.title}
            href="#writing"
            variants={fadeUp}
            className="group grid grid-cols-1 gap-x-8 gap-y-3 border-b border-rule py-7 transition-colors duration-200 hover:bg-panel md:grid-cols-12 md:items-baseline"
          >
            <p className="mono-label text-faint md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="text-lg font-semibold tracking-[-0.025em] text-balance text-foreground md:col-span-5">
              {essay.title}
            </h3>
            <p className="text-caption text-muted-foreground text-pretty md:col-span-5">
              {essay.excerpt}
            </p>
            <span className="figures whitespace-nowrap text-caption text-faint md:col-span-1 md:text-right">
              {essay.readingTime}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
