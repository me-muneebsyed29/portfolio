"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { fadeUp, viewportOnce } from "@/lib/motion";

/*
 * Ledger rows rather than a carousel: a scroller would need arrows, which the
 * system forbids, and it would hide four of six quotes behind an interaction.
 * Long quotes show a verbatim excerpt and expand in place, so all six are
 * present on the page and nothing is paraphrased to make it fit.
 */
function Row({ item, index }: { item: Testimonial; index: number }) {
  const [open, setOpen] = useState(false);
  const hasMore = item.quote.join(" ") !== item.excerpt;
  const bodyId = `testimonial-${index}`;

  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      /* Each row drives its own reveal rather than inheriting the section's.
         Variant propagation does not cross this component boundary, so relying
         on it left every row stuck at opacity 0. The index delay reproduces the
         stagger a parent container would otherwise have applied. */
      transition={{ delay: Math.min(index, 4) * 0.07 }}
      className="grid grid-cols-1 gap-x-8 gap-y-6 border-b border-rule py-10 md:grid-cols-12"
    >
      <p className="mono-label text-faint md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </p>

      <blockquote className="md:col-span-7" id={bodyId}>
        {open ? (
          item.quote.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-lg font-semibold tracking-[-0.025em] text-balance text-foreground md:text-xl"
                  : "mt-5 text-body text-muted-foreground text-pretty"
              }
            >
              {para}
            </p>
          ))
        ) : (
          <p className="text-lg font-semibold tracking-[-0.025em] text-balance text-foreground md:text-xl">
            {item.excerpt}
          </p>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={bodyId}
            className="mono-label mt-6 border border-rule px-3 py-2 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            {open ? "Show less" : "Read in full"}
          </button>
        )}
      </blockquote>

      <figcaption className="md:col-span-3 md:col-start-10">
        {item.metric && (
          <div className="mb-5">
            <p className="figures text-2xl font-bold leading-none text-cadmium">
              {item.metric.value}
            </p>
            <p className="mono-label mt-2 text-faint">{item.metric.label}</p>
          </div>
        )}
        <p className="mono-label text-foreground">{item.name}</p>
        <p className="mono-label mt-2 text-faint">{item.role}</p>
        <p className="mono-label mt-1 text-faint">{item.company}</p>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <Eyebrow index="04">Testimonials</Eyebrow>
      <SectionTitle className="mt-5 max-w-xl">What people say.</SectionTitle>

      <div className="mt-14 border-t border-rule">
        {testimonials.map((item, i) => (
          <Row key={item.name} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
