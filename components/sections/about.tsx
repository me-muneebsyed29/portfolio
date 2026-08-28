"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/layout/section";
import { Monogram } from "@/components/brand/monogram";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const traits = ["Builder", "Growth Operator", "Father", "Bengaluru"];

/* The portrait takes the frame treatment images get in this system: squared off
   in a well, 1px rule, no crop to a shape and no shadow, with the monogram
   stamping the bottom-right corner. */
export function About() {
  return (
    <Section id="about">
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8"
      >
        <motion.figure variants={fadeUp} className="md:col-span-4">
          <div className="relative aspect-square w-full max-w-[260px] border border-rule bg-well">
            <Image
              src="/avatar.png"
              alt="Portrait of Muneeb Syed"
              fill
              sizes="260px"
              className="object-cover"
            />
            <Monogram size={24} className="absolute right-2.5 bottom-2.5 text-muted-foreground" />
          </div>
          <figcaption className="mono-label mt-4 text-faint">
            Bengaluru, India · 2026
          </figcaption>
        </motion.figure>

        <div className="md:col-span-7 md:col-start-6">
          <motion.div variants={fadeUp}>
            <Eyebrow index="06">About</Eyebrow>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:text-2xl"
          >
            Interested in AI, business, systems thinking, and product design.
          </motion.p>

          <motion.dl
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-px border-t border-rule bg-rule sm:grid-cols-4"
          >
            {traits.map((trait) => (
              <div key={trait} className="bg-background pt-4">
                <dd className="mono-label text-muted-foreground">{trait}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </Section>
  );
}
