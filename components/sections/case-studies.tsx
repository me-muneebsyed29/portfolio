"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { caseStudies } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, isFigure } from "@/lib/utils";

/*
 * The index stays fully achromatic. Cadmium is reserved for the stat strip on
 * each study's own page, where there is one frame and one number to argue —
 * three accent figures side by side here would break the one-per-frame rule.
 */
export function CaseStudies() {
  return (
    <Section id="work">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow index="03">Selected work</Eyebrow>
          <SectionTitle className="mt-5">Case studies.</SectionTitle>
        </div>
        <p className="max-w-xs text-caption text-muted-foreground text-pretty">
          Problem, approach, execution, outcome — what happened and why.
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-px border-t-2 border-rule bg-rule lg:grid-cols-3"
      >
        {caseStudies.map((study, i) => (
          <motion.div key={study.slug} variants={fadeUp}>
            <Link
              href={`/work/${study.slug}`}
              className="group flex h-full flex-col justify-between bg-background p-7 transition-colors duration-200 hover:bg-panel"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="mono-label text-faint">
                    Case study {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <p className="mono-label mt-6 text-muted-foreground">{study.category}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-balance text-foreground">
                  {study.client}
                </h3>
                <p className="mt-4 text-caption text-muted-foreground text-pretty">
                  {study.summary}
                </p>
              </div>

              <div className="mt-10">
                <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-rule pt-6">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <dd
                        className={cn(
                          "text-lg font-bold text-foreground",
                          isFigure(metric.value) ? "figures" : "tracking-[-0.025em]"
                        )}
                      >
                        {metric.value}
                      </dd>
                      <dt className="mono-label mt-2 text-faint">{metric.label}</dt>
                    </div>
                  ))}
                </dl>
                <span className="mono-label mt-7 inline-block text-muted-foreground transition-colors group-hover:text-foreground">
                  Read case study
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
