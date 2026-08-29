"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { testimonials } from "@/data/testimonials";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/*
 * Quotes set as ledger rows rather than cards: flush left, ruled, attribution in
 * mono caps underneath. No portraits, no quote-mark graphics, nothing centred.
 *
 * Unfilled entries carry a visible PLACEHOLDER tag — built like the redaction
 * tag on the Applications sheet, which is a labelled tag rather than a smear —
 * so a reader can never mistake template copy for a real endorsement.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <Eyebrow index="04">Testimonials</Eyebrow>
      <SectionTitle className="mt-5 max-w-xl">What people say.</SectionTitle>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 border-t border-rule"
      >
        {testimonials.map((item, i) => (
          <motion.figure
            key={`${item.name}-${i}`}
            variants={fadeUp}
            className="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-rule py-10 md:grid-cols-12"
          >
            <p className="mono-label text-faint md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </p>

            <blockquote className="md:col-span-7">
              <p className="text-xl font-semibold tracking-[-0.025em] text-balance text-foreground">
                {item.quote}
              </p>
            </blockquote>

            <figcaption className="md:col-span-3 md:col-start-10">
              {item.placeholder && (
                <span className="mono-label mb-4 inline-block border border-cadmium px-2 py-1 text-cadmium">
                  Placeholder
                </span>
              )}
              <p className="mono-label text-foreground">{item.name}</p>
              <p className="mono-label mt-2 text-faint">
                {item.role} · {item.company}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Section>
  );
}
