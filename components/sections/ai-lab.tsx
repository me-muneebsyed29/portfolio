"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { labProjects } from "@/data/ai-lab";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function AiLab() {
  return (
    <Section id="ai-lab">
      <Eyebrow>AI Lab</Eyebrow>
      <SectionTitle className="mt-4 max-w-2xl">
        Experiments in AI-powered growth.
      </SectionTitle>
      <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
        Internal tools I build to test where AI actually changes how growth work gets done.
      </p>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {labProjects.map((project) => (
          <motion.div
            key={project.name}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-full border border-border">
                <project.icon className="size-4.5 text-foreground" strokeWidth={1.5} />
              </div>
              <Badge variant="secondary" className="rounded-full border-border bg-transparent text-xs text-muted-foreground">
                {project.status}
              </Badge>
            </div>
            <h3 className="mt-6 text-lg font-medium text-foreground">{project.name}</h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{project.tagline}</p>
            <p className="mt-4 text-sm text-muted-foreground text-pretty">{project.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
