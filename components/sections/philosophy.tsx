"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { philosophy } from "@/data/philosophy";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Numbered rows on the 12-column grid, divided by rules. The mono index in the
   margin is the "flagged row" idea from the illustration set, set in type. */
export function Philosophy() {
  return (
    <Section id="philosophy">
      <Eyebrow index="02">Growth philosophy</Eyebrow>
      <SectionTitle className="mt-5 max-w-xl">What I believe about growth.</SectionTitle>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 border-t border-rule"
      >
        {philosophy.map((item, i) => (
          <motion.article
            key={item.title}
            variants={fadeUp}
            className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-rule py-10 md:grid-cols-12"
          >
            <p className="mono-label text-faint md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:col-span-5 md:text-2xl">
              {item.title}
            </h3>
            <p className="text-body text-muted-foreground text-pretty md:col-span-6">
              {item.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
