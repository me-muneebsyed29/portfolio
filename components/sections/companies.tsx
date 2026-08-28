"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { companies } from "@/data/companies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Platform wall in mono caps. No logos: the system forbids sourced marks sitting
   next to each other, and set type holds the grid better at small sizes. */
export function Companies() {
  return (
    <section className="border-t-2 border-rule py-10">
      <Container>
        <motion.ul
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          {companies.map((company) => (
            <motion.li
              key={company.name}
              variants={fadeUp}
              className="mono-label text-faint transition-colors duration-200 hover:text-foreground"
            >
              {company.name}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
