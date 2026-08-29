"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/layout/section";
import { Monogram } from "@/components/brand/monogram";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const traits = ["Builder", "Growth Operator", "Father", "Bengaluru"];

/*
 * Copy leads and the portrait follows, so the kicker and statement start on the
 * same left edge as every other section on the page. With the portrait first the
 * whole block began 436px in, which broke the flush-left rule the system is
 * built on and left the short text column stranded beside a taller image.
 *
 * The portrait takes the frame treatment images get here: squared off in a well,
 * 1px rule, no crop to a shape and no shadow, monogram stamping the corner.
 */
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
        <div className="md:col-span-7">
          <motion.div variants={fadeUp}>
            <Eyebrow index="07">About</Eyebrow>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:text-2xl"
          >
            Interested in AI, business, systems thinking, and product design.
          </motion.p>

          {/* A plain ruled row rather than a cell grid: four short labels in
              divided cells left each one hard against its own rule. */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-rule pt-6"
          >
            {traits.map((trait) => (
              <li key={trait} className="mono-label text-muted-foreground">
                {trait}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.figure variants={fadeUp} className="md:col-span-4 md:col-start-9">
          <div className="relative aspect-square w-full max-w-[260px] border border-rule bg-well md:ml-auto">
            <Image
              src="/avatar.png"
              alt="Portrait of Muneeb Syed"
              fill
              sizes="260px"
              className="object-cover"
            />
            <Monogram size={24} className="absolute right-2.5 bottom-2.5 text-muted-foreground" />
          </div>
          <figcaption className="mono-label mt-4 text-faint md:text-right">
            Bengaluru, India · 2026
          </figcaption>
        </motion.figure>
      </motion.div>
    </Section>
  );
}
