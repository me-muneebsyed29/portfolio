"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { PlatformLogo } from "@/components/brand/platform-logos";
import { companies } from "@/data/companies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Mark plus wordmark, all in one colour. Rests at label grey and comes up to
   full chalk on hover — the wall reads as texture until you look at it. */
export function Companies() {
  return (
    <section className="border-t-2 border-rule py-10">
      <Container>
        <motion.ul
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-center gap-x-10 gap-y-6"
        >
          {companies.map((company) => (
            <motion.li
              key={company.id}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-faint transition-colors duration-200 hover:text-foreground"
            >
              <PlatformLogo id={company.id} className="size-5 shrink-0" />
              <span className="mono-label">{company.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
