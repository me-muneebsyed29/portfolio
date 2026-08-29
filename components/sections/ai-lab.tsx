"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { labProjects } from "@/data/ai-lab";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Cards read as cells in a table — indexed, ruled, flat. Status sits in a mono
   tag built like the redaction tag on the Applications sheet: panel fill, 1px
   faint border, mono caps. */
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
        className="mt-14 grid grid-cols-1 gap-px border-t-2 border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3"
      >
        {labProjects.map((project, i) => (
          <motion.article
            key={project.name}
            variants={fadeUp}
            className="flex h-full flex-col bg-background p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="figures text-caption font-medium text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mono-label border border-faint bg-panel px-2 py-1 text-faint">
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

        {/* Five cards leave one trailing cell empty in both the 2- and 3-column
            layouts, which would otherwise expose the rule grid as a solid block. */}
        <div aria-hidden className="hidden bg-background sm:block" />
      </motion.div>
    </Section>
  );
}
