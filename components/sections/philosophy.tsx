"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { philosophy } from "@/data/philosophy";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Philosophy() {
  return (
    <Section id="philosophy">
      <Eyebrow>Growth philosophy</Eyebrow>
      <SectionTitle className="mt-4 max-w-2xl">
        What I believe about growth.
      </SectionTitle>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 divide-y divide-border border-t border-border"
      >
        {philosophy.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-12"
          >
            <h3 className="md:col-span-5 text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
              {item.title}
            </h3>
            <p className="md:col-span-6 md:col-start-7 text-lg text-muted-foreground text-pretty">
              {item.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
