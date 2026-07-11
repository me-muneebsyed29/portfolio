"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/layout/section";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const traits = ["Builder", "Growth Operator", "Father", "Based in Bengaluru"];

export function About() {
  return (
    <Section id="about">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-8"
      >
        <motion.div variants={fadeUp} className="md:col-span-4">
          <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/avatar.png"
              alt="Portrait of Muneeb Syed"
              fill
              sizes="280px"
              className="object-cover"
              priority={false}
            />
          </div>
        </motion.div>

        <div className="md:col-span-8">
          <motion.div variants={fadeUp}>
            <Eyebrow>About</Eyebrow>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            {traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
              >
                {trait}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-2xl font-medium text-balance text-foreground md:text-3xl"
          >
            Interested in AI, business, systems thinking, and product design.
          </motion.p>
        </div>
      </motion.div>
    </Section>
  );
}
