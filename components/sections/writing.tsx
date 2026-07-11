"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { essays } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Writing() {
  return (
    <Section id="writing">
      <Eyebrow>Writing</Eyebrow>
      <SectionTitle className="mt-4 max-w-2xl">
        Essays on growth and AI.
      </SectionTitle>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 divide-y divide-border border-t border-border"
      >
        {essays.map((essay) => (
          <motion.a
            key={essay.title}
            href="#writing"
            variants={fadeUp}
            className="group grid grid-cols-1 gap-2 py-8 md:grid-cols-12 md:items-center md:gap-6"
          >
            <h3 className="md:col-span-6 text-xl font-medium text-balance text-foreground">
              {essay.title}
            </h3>
            <p className="md:col-span-5 text-base text-muted-foreground text-pretty">
              {essay.excerpt}
            </p>
            <div className="flex items-center justify-between md:col-span-1 md:justify-end md:gap-3">
              <span className="text-sm text-muted-foreground">{essay.readingTime}</span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
