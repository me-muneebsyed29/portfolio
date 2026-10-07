"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { labProjects } from "@/data/ai-lab";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Indexed cards on the glass, with status in a small pill tag. */
export function AiLab() {
  return (
    <Section id="ai-lab">
      <Eyebrow index="05">AI Lab</Eyebrow>
      <SectionTitle className="mt-5 max-w-xl">Experiments in AI-powered growth.</SectionTitle>
      <p className="mt-5 max-w-lg text-body text-muted-foreground text-pretty">
        Internal tools I build to test where AI actually changes how growth work gets done.
      </p>

      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {labProjects.map((project, i) => (
          <motion.article
            key={project.name}
            variants={fadeUp}
            className="glass-card flex h-full flex-col rounded-3xl p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="figures text-caption font-medium text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mono-label rounded-full bg-primary/10 px-2.5 py-1 text-cadmium-sm">
                {project.status}
              </span>
            </div>
            <h3 className="mt-7 text-lg font-semibold tracking-[-0.025em] text-foreground">
              {project.name}
            </h3>
            <p className="mono-label mt-3 text-muted-foreground">{project.tagline}</p>
            <p className="mt-5 text-caption text-muted-foreground text-pretty">
              {project.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
