"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { B2CContactForm } from "@/components/b2c/contact-form";
import { b2cConfig } from "@/lib/b2c-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const included = [
  "A review of your ad accounts, tracking and funnel",
  "The specific things costing you money right now",
  "What I'd change first, and what I'd leave alone",
  "Yours to keep — including if you take it elsewhere",
];

export function B2CContact() {
  return (
    <B2CSection id="contact" className="border-t border-border bg-surface">
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-5">
          <motion.div variants={fadeUp}>
            <B2CEyebrow>Start here</B2CEyebrow>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <B2CTitle>Get a free account audit.</B2CTitle>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-pretty text-muted-foreground">
            No pitch deck and no obligation. If I don&apos;t think I can move your numbers,
            I&apos;ll say so in the first reply.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-10 space-y-4">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-pretty text-foreground/85">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="font-mono-ui mt-10 space-y-2 border-t border-border pt-8 text-xs uppercase tracking-[0.12em] text-muted-foreground"
          >
            <p>
              <a
                href={`mailto:${b2cConfig.email}`}
                className="transition-colors hover:text-primary"
              >
                {b2cConfig.email}
              </a>
            </p>
            <p>
              {b2cConfig.location} — working {b2cConfig.markets}
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-8 md:p-10">
            <B2CContactForm />
          </div>
        </motion.div>
      </motion.div>
    </B2CSection>
  );
}
