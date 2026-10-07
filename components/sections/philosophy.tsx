"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { Figure } from "@/components/brand/figures";
import { philosophy } from "@/data/philosophy";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/*
 * Numbered rows on the 12-column grid, divided by hairlines, each with its
 * marginal figure on a small white card. The figures carry the accent blue
 * because no row here has an accent number for them to compete with.
 */
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
        className="mt-12 border-t border-rule"
      >
        {philosophy.map((item, i) => (
          <motion.article
            key={item.title}
            variants={fadeUp}
            className="grid grid-cols-1 gap-x-8 gap-y-6 border-b border-rule py-10 md:grid-cols-12"
          >
            <p className="mono-label text-faint md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div className="md:col-span-5">
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-5 text-body text-muted-foreground text-pretty">{item.body}</p>
            </div>
            <div className="glass-card w-fit rounded-2xl p-5 md:col-span-5 md:col-start-8 md:justify-self-end">
              <Figure id={item.figure} />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
