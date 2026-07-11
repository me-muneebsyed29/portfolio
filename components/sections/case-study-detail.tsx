"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import type { CaseStudy } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return (
    <article>
      <section className="pt-32 pb-16 md:pt-40">
        <Container>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/#work"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Back to work
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-sm text-muted-foreground">
              {study.category}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance text-foreground md:text-6xl"
            >
              {study.client}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
              {study.summary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-3"
            >
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-2xl font-medium text-foreground md:text-3xl">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <div className="border-t border-border">
        <Container className="py-16 md:py-24">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-16 md:grid-cols-12"
          >
            <motion.div variants={fadeUp} className="md:col-span-4">
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Problem
              </h2>
              <p className="mt-4 text-lg text-foreground/90 text-pretty">{study.problem}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-4">
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Approach
              </h2>
              <ul className="mt-4 space-y-3">
                {study.approach.map((line) => (
                  <li key={line} className="text-base text-foreground/90 text-pretty">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-4">
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Execution
              </h2>
              <ul className="mt-4 space-y-3">
                {study.execution.map((line) => (
                  <li key={line} className="text-base text-foreground/90 text-pretty">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-16 rounded-2xl border border-border bg-card p-10 md:p-14"
          >
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Outcome
            </h2>
            <p className="mt-4 max-w-2xl text-2xl font-medium text-balance text-foreground md:text-3xl">
              {study.outcome}
            </p>
          </motion.div>
        </Container>
      </div>
    </article>
  );
}
