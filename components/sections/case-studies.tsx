"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { caseStudies } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CaseStudies() {
  return (
    <Section id="work">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <SectionTitle className="mt-4 max-w-2xl">
            Case studies.
          </SectionTitle>
        </div>
        <p className="max-w-sm text-base text-muted-foreground text-pretty">
          Problem, approach, execution, outcome — no fluff, just what happened and why.
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {caseStudies.map((study) => (
          <motion.div key={study.slug} variants={fadeUp}>
            <Link
              href={`/work/${study.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
            >
              <div>
                <p className="text-sm text-muted-foreground">{study.category}</p>
                <h3 className="mt-4 text-xl font-medium text-balance text-foreground">
                  {study.client}
                </h3>
                <p className="mt-3 text-base text-muted-foreground text-pretty">
                  {study.summary}
                </p>
              </div>

              <div className="mt-10">
                <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <p className="text-lg font-medium text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground opacity-70 transition-opacity group-hover:opacity-100">
                  Read case study
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
