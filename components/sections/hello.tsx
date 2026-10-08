"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SkySection } from "@/components/sky/sky-section";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const tags = ["Builder", "Growth operator", "Father", "Bengaluru"];

/*
 * Hi, I'm Muneeb: the warm-up right before the ask. Avatar and bio side by
 * side on desktop; on phones a round avatar above the text, and the bio cut
 * to its first two sentences plus the dad line.
 */
export function Hello() {
  return (
    <SkySection id="about" note="that’s me, minus the floating">
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12"
      >
        <motion.div variants={fadeUp} className="shrink-0">
          <div className="relative size-28 overflow-hidden rounded-full border-4 border-white shadow-[0_18px_40px_-20px_rgba(16,64,140,0.6)] md:size-44">
            <Image src="/sky/avatar-badge.webp" alt="Illustrated portrait of Muneeb Syed" fill sizes="176px" className="object-cover" />
          </div>
        </motion.div>
        <div>
          <motion.h2
            variants={fadeUp}
            className="text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-foreground md:text-[2.6rem]"
          >
            Hi, I’m Muneeb.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-body text-muted-foreground text-pretty">
            I’m a growth operator in Bengaluru. I’ve spent five years running paid media for B2B SaaS teams in
            the US, Canada and India.
            <span className="hidden md:inline">
              {" "}
              I like systems, product design, and building small tools with AI.
            </span>{" "}
            I’m also a dad, which has taught me more about patience than any attribution model.
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="caps-label rounded-full bg-white/70 px-3 py-1.5 text-muted-foreground">
                {tag}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </SkySection>
  );
}
