"use client";

import { motion } from "framer-motion";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { problems } from "@/data/b2c/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function B2CProblems() {
  return (
    <B2CSection>
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-5">
          <motion.div variants={fadeUp}>
            <B2CEyebrow>The usual state of things</B2CEyebrow>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <B2CTitle>You&apos;re spending more every month and keeping less of it.</B2CTitle>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground">
            Almost every consumer account I audit has the same shape of problem. Not a
            budget problem — a structure problem that budget makes worse.
          </motion.p>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-border">
            {problems.map((problem, i) => (
              <motion.li
                key={problem}
                variants={fadeUp}
                className="flex items-baseline gap-5 border-b border-border py-5"
              >
                <span className="font-mono-ui text-xs text-primary/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-pretty text-foreground/90">{problem}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </B2CSection>
  );
}
