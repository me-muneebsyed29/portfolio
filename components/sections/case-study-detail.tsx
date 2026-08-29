"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Monogram } from "@/components/brand/monogram";
import { Figure } from "@/components/brand/figures";
import type { CaseStudy } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, isFigure } from "@/lib/utils";

/*
 * Applications sheet 03 / CASE STUDY HEADER, on the 1128px content column:
 * mono kicker, then the finding as a 44px statement, then a stat strip with one
 * cadmium cell. Order is fixed, everything flush left, no arrows or shadows.
 */
export function CaseStudyDetail({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article>
      <section className="pt-28 pb-14">
        <Container>
          <motion.div variants={staggerContainer(0.09)} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link
                href="/#work"
                className="mono-label text-muted-foreground transition-colors hover:text-foreground"
              >
                Back to work
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mono-label mt-10 text-faint">
              Case study {String(index + 1).padStart(2, "0")} · {study.category}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-balance text-foreground md:text-h1"
            >
              {study.summary}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mono-label mt-6 text-muted-foreground"
            >
              {study.client}
            </motion.p>

            <motion.dl
              variants={fadeUp}
              className="mt-12 grid grid-cols-2 gap-px border-t-2 border-rule bg-rule sm:grid-cols-3"
            >
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex min-h-[104px] flex-col justify-between bg-background px-1 pt-6 pb-1 sm:pr-6"
                >
                  <dd
                    className={cn(
                      "font-bold leading-none",
                      // A figure gets the mono face at full size; a qualitative
                      // value is not data, so it sets smaller in the sans.
                      isFigure(metric.value)
                        ? "figures text-3xl"
                        : "text-xl tracking-[-0.025em]",
                      metric.accent ? "text-cadmium" : "text-foreground"
                    )}
                  >
                    {metric.value}
                  </dd>
                  <dt className="mono-label mt-4 text-muted-foreground">{metric.label}</dt>
                </div>
              ))}
            </motion.dl>

            {/* Achromatic: the strip above already spends this frame's accent. */}
            <motion.div variants={fadeUp} className="mt-14">
              <Figure
                id={study.figure}
                caption={study.figureCaption}
                size="hero"
                achromatic
              />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <div className="border-t-2 border-rule">
        <Container className="py-14 md:py-22">
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8"
          >
            <motion.section variants={fadeUp} className="md:col-span-4">
              <h2 className="mono-label text-faint">Problem</h2>
              <p className="mt-5 text-body text-foreground text-pretty">{study.problem}</p>
            </motion.section>

            <motion.section variants={fadeUp} className="md:col-span-4">
              <h2 className="mono-label text-faint">Approach</h2>
              <ul className="mt-5 space-y-4">
                {study.approach.map((line) => (
                  <li key={line} className="text-caption text-muted-foreground text-pretty">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={fadeUp} className="md:col-span-4">
              <h2 className="mono-label text-faint">Execution</h2>
              <ul className="mt-5 space-y-4">
                {study.execution.map((line) => (
                  <li key={line} className="text-caption text-muted-foreground text-pretty">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.section>
          </motion.div>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mt-14 border-2 border-rule bg-panel p-8 md:p-12"
          >
            <h2 className="mono-label text-faint">Outcome</h2>
            <p className="mt-5 max-w-2xl text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:text-2xl">
              {study.outcome}
            </p>
            {/* Monogram stamps the bottom-right of the frame at 24px, 10px inset. */}
            <Monogram
              size={24}
              className="absolute right-2.5 bottom-2.5 text-muted-foreground"
            />
          </motion.section>
        </Container>
      </div>
    </article>
  );
}
