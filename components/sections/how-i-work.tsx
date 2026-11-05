"use client";

import { motion } from "framer-motion";
import { StudioSection, SectionHead } from "@/components/studio/section";
import { LineDrawing } from "@/components/studio/line-drawings";
import { howIWork } from "@/data/how-i-work";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/*
 * Four principles in a ruled 2x2 grid, like a spec sheet: a numeral in the
 * taupe italic, a line drawing that sketches itself in, the principle, and
 * one short paragraph. Stacked on phones.
 */
export function HowIWork() {
  return (
    <StudioSection id="how-i-work" index="03" label="How I work" note="boring fundamentals, exciting results">
      <SectionHead
        title={
          <>
            Before I touch your <span className="em-taupe">ad account.</span>
          </>
        }
        sub="Four things I check first, because they decide whether ads can work at all."
      />
      <motion.ol
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 border-t border-l border-border md:mt-20 md:grid-cols-2"
      >
        {howIWork.map((item, i) => (
          <motion.li
            key={item.title}
            variants={fadeUp}
            className="group relative border-r border-b border-border p-7 transition-colors duration-500 hover:bg-card md:p-12"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-display figures text-[3.5rem] leading-none text-primary italic md:text-[4.5rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <LineDrawing
                id={item.doodle}
                className="w-14 shrink-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:w-16"
              />
            </div>
            <h3 className="font-display mt-10 text-[1.9rem] leading-[1.05] text-foreground md:mt-14 md:text-[2.25rem]">
              {item.title}
            </h3>
            <p className="mt-4 max-w-md text-body text-muted-foreground text-pretty">{item.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </StudioSection>
  );
}
