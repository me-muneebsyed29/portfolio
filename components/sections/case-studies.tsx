"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section, Eyebrow, SectionTitle } from "@/components/layout/section";
import { caseStudies } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, isFigure } from "@/lib/utils";

/*
 * The index stays in ink. The accent blue is reserved for the stat strip on
 * each study's own page, where there is one frame and one number to argue;
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
        className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        {caseStudies.map((study, i) => (
          <motion.div key={study.slug} variants={fadeUp} className="h-full">
            <Link
              href={`/work/${study.slug}`}
              className="glass-card group flex h-full flex-col justify-between rounded-3xl p-7 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/90"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="caps-label text-faint">
                    Case study {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <p className="caps-label mt-6 text-muted-foreground">{study.category}</p>
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
                      <dt className="caps-label mt-2 text-faint">{metric.label}</dt>
                    </div>
                  ))}
                </dl>
                <span className="caps-label mt-7 inline-flex items-center gap-2 text-primary">
                  Read case study
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
