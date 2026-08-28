"use client";

import { motion } from "framer-motion";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { b2cCaseStudies } from "@/data/b2c/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const featured = b2cCaseStudies.filter((s) => s.featured);
const rest = b2cCaseStudies.filter((s) => !s.featured);

export function B2CCaseStudies() {
  return (
    <B2CSection id="results">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <B2CEyebrow>Results</B2CEyebrow>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl">
          <B2CTitle>The accounts, the problem, and what actually changed.</B2CTitle>
        </motion.div>

        {/* Featured — full narrative. */}
        <div className="mt-16 space-y-6">
          {featured.map((study) => (
            <motion.article
              key={study.client}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-8 transition-colors hover:border-border-strong md:p-10"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-7">
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {study.category} · {study.market}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-balance text-foreground md:text-3xl">
                    {study.client}
                  </h3>
                  <p className="mt-2 text-lg text-pretty text-primary">{study.headline}</p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        The problem
                      </p>
                      <p className="mt-2.5 leading-relaxed text-pretty text-foreground/85">
                        {study.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        What I did
                      </p>
                      <ul className="mt-2.5 space-y-2.5">
                        {study.approach.map((item) => (
                          <li key={item} className="flex gap-3 text-pretty text-foreground/85">
                            <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-1">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="bg-background px-6 py-5">
                        <p className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                          {metric.label}
                        </p>
                        <p className="mt-1.5 text-xl font-semibold tracking-[-0.02em] text-primary">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Compact — result-first, for the shorter engagements. */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((study) => (
            <motion.article
              key={study.client}
              variants={fadeUp}
              className="flex flex-col rounded-xl border border-border bg-card p-8 transition-colors hover:border-border-strong"
            >
              <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {study.category} · {study.market}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
                {study.client}
              </h3>
              <p className="mt-2 text-pretty text-primary">{study.headline}</p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
                {study.problem}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
                {study.metrics.map((metric) => (
                  <li key={metric.label}>
                    <span className="font-mono-ui block text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="mt-1 block font-semibold text-foreground">{metric.value}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </B2CSection>
  );
}
