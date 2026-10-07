"use client";

import { motion } from "framer-motion";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { NoteDoodle } from "@/components/sky/note-doodles";
import { howIWork } from "@/data/how-i-work";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Four notes, 2x2 on desktop and stacked on phones, a pen doodle on each. */
export function HowIWork() {
  return (
    <SkySection id="how-i-work" note="boring fundamentals, exciting results">
      <SectionHead
        title="Before I touch your ad account."
        sub="Four things I check first, because they decide whether ads can work at all."
      />
      <motion.ul
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {howIWork.map((item) => (
          <motion.li key={item.title} variants={fadeUp} className="glass-card flex gap-5 rounded-3xl p-6 md:p-8">
            <NoteDoodle id={item.doodle} className="w-14 shrink-0 md:w-16" />
            <div>
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">{item.title}</h3>
              <p className="mt-2 text-body text-muted-foreground text-pretty">{item.body}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </SkySection>
  );
}
