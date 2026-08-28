"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { faqs } from "@/data/b2c/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function B2CFaq() {
  return (
    <B2CSection id="faq">
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-4">
          <motion.div variants={fadeUp}>
            <B2CEyebrow>Questions</B2CEyebrow>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <B2CTitle>Before you ask.</B2CTitle>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-border">
            {faqs.map((faq) => (
              <motion.details
                key={faq.q}
                variants={fadeUp}
                /* Native <details> keeps this keyboard-accessible with no JS state. */
                className="group border-b border-border"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg text-pretty text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <Plus
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={1.75}
                  />
                </summary>
                <p className="pb-6 pr-12 leading-relaxed text-pretty text-muted-foreground">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.div>
    </B2CSection>
  );
}
