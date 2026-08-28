"use client";

import { motion } from "framer-motion";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { testimonials } from "@/data/b2c/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function B2CTestimonials() {
  return (
    <B2CSection className="border-t border-border bg-surface">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <B2CEyebrow>In their words</B2CEyebrow>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl">
          <B2CTitle>The people who handed me their ad budget.</B2CTitle>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.name}
              variants={fadeUp}
              className="flex flex-col rounded-xl border border-border bg-card p-8"
            >
              <blockquote className="flex-1 text-pretty leading-relaxed text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <span className="block font-medium text-foreground">{testimonial.name}</span>
                <span className="font-mono-ui mt-1 block text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {testimonial.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </B2CSection>
  );
}
