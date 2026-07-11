"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { companies } from "@/data/companies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Companies() {
  return (
    <section className="border-y border-border py-16">
      <Container>
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-between gap-x-10 gap-y-8"
        >
          {companies.map((company) => (
            <motion.span
              key={company.name}
              variants={fadeUp}
              className="text-lg font-medium tracking-tight text-muted-foreground/50 grayscale transition-all duration-300 hover:text-foreground hover:opacity-100 md:text-xl"
            >
              {company.name}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
