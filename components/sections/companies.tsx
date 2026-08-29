"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { PlatformLogo } from "@/components/brand/platform-logos";
import { toolGroups } from "@/data/companies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/*
 * Twenty-eight tools is too many for a single row, so the wall is a ruled table
 * with the category in the margin — the same structure the spec sheets use.
 * Everything rests at label grey and comes up to full chalk on hover.
 */
export function Companies() {
  return (
    <section className="border-t-2 border-rule py-14">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {toolGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={fadeUp}
              className="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-rule py-7 last:border-b-0 md:grid-cols-12"
            >
              <p className="mono-label pt-1 text-faint md:col-span-2">{group.label}</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-5 md:col-span-10">
                {group.tools.map((tool) => (
                  <li
                    key={tool.id}
                    className="flex items-center gap-2.5 text-faint transition-colors duration-200 hover:text-foreground"
                  >
                    <PlatformLogo id={tool.id} className="size-5 shrink-0" />
                    <span className="mono-label">{tool.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
