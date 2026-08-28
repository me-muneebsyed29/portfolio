"use client";

import { motion } from "framer-motion";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { process } from "@/data/b2c/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function B2CProcess() {
  return (
    <B2CSection id="process" className="border-t border-border bg-surface">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <B2CEyebrow>How it works</B2CEyebrow>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl">
          <B2CTitle>Audit. Restructure. Test. Then scale — in that order.</B2CTitle>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Most accounts fail because someone tried to scale step four without doing step
          two. The order is the method.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.step} variants={fadeUp} className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-primary" strokeWidth={1.75} />
                  <span className="font-mono-ui text-xs tabular-nums text-muted-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </B2CSection>
  );
}
