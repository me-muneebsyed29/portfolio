"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StudioSection } from "@/components/studio/section";
import { RevealWords } from "@/components/studio/motion-text";
import type { CaseStudy } from "@/data/case-studies";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, isFigure, lowerFirst } from "@/lib/utils";

/*
 * The case study template, so clicking through from the homepage feels like
 * the same room: the result as the headline, the metrics on palette tiles
 * (taupe for the lead number), then the setup, what was broken, what I
 * changed, what moved, the client's words and an optional lesson, each as a
 * ruled chapter with its title in the left column. Then the ask.
 */

/* Before and after, in a taupe hairline: a tangle on the left, a clean climb
   on the right. Draws itself in on arrival. */
function BeforeAfter() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 260 110"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full max-w-[300px] text-primary"
    >
      {[
        "M10 70c10-20 20 18 30-4s14-30 24-6 12 22 22 0 10-14 18 4",
        "M150 92c18-6 36-14 52-30s30-34 48-50",
        "M234 12l15-1-3 15",
        "M126 34v52",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 3 ? 1 : 1.5}
          strokeDasharray={i === 3 ? "3 5" : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, delay: 0.25 * i } },
          }}
        />
      ))}
      <text x="40" y="106" fontSize="17" fontStyle="italic" fill="currentColor" textAnchor="middle" style={{ fontFamily: "var(--font-cormorant), serif" }}>
        before
      </text>
      <text x="200" y="106" fontSize="17" fontStyle="italic" fill="currentColor" textAnchor="middle" style={{ fontFamily: "var(--font-cormorant), serif" }}>
        after
      </text>
    </motion.svg>
  );
}

function Chapter({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-12 md:gap-10 md:pt-12"
    >
      <div className="md:col-span-4">
        <p className="figures caps-label text-primary">{index}</p>
        <h2 className="font-display mt-3 text-[2.1rem] leading-none text-foreground md:text-[2.6rem]">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </motion.section>
  );
}

const tileTones = [
  "bg-[#bea98e] text-[#0c0c0c] [&_dt]:text-[#0c0c0c]/70",
  "bg-[#2c2c2c] text-foreground [&_dt]:text-muted-foreground",
  "bg-[#4a4a4a] text-foreground [&_dt]:text-foreground/75",
  "bg-[#0c0c0c] text-foreground ring-1 ring-inset ring-[#2c2c2c] [&_dt]:text-muted-foreground",
];

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const [lead, second] = study.metrics;
  /* The client's own words, when they've given a testimonial. */
  const quote = testimonials.find((t) => t.caseStudy === study.slug);

  return (
    <article className="pt-20 md:pt-28">
      <StudioSection
        ruled={false}
        label={
          <Link href="/work" className="link-draw">
            ← All the receipts
          </Link>
        }
        note={study.context ?? "case study"}
      >
        <motion.div variants={staggerContainer(0.09, 0.1)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="caps-label text-foreground">
            {study.client}
            <span className="text-faint"> · {study.period}</span>
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
            <li className="caps-label rounded-full border border-primary/50 px-3 py-1.5 text-primary">{study.industry}</li>
            {[...study.markets, ...study.channels].map((m) => (
              <li key={m} className="caps-label rounded-full border border-border px-3 py-1.5 text-muted-foreground">
                {m}
              </li>
            ))}
          </motion.ul>
          <h1 className="font-display mt-10 max-w-5xl text-[3rem] leading-[0.96] text-balance text-foreground md:text-[5.25rem]">
            <RevealWords text={study.headline} delay={0.2} stagger={0.04} />
          </h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-body text-muted-foreground text-pretty md:text-[1.15rem]">
            {study.oneLine}
          </motion.p>
          <motion.dl
            variants={staggerContainer(0.07, 0.5)}
            className={cn(
              "mt-14 grid grid-cols-2 gap-3",
              study.metrics.length >= 4 ? "lg:grid-cols-4" : study.metrics.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            )}
          >
            {study.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                className={cn(
                  "flex min-h-36 flex-col justify-between rounded-[1.25rem] p-5 md:min-h-44 md:p-7",
                  tileTones[i % tileTones.length],
                  i === 0 && study.metrics.length % 2 === 1 && "col-span-2 lg:col-span-1"
                )}
              >
                <dt className="caps-label">{metric.label}</dt>
                <dd className={cn("font-display mt-6 text-[2.4rem] leading-none md:text-[3.25rem]", isFigure(metric.value) && "figures")}>
                  {metric.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </StudioSection>

      <StudioSection ruled={false} containerClassName="flex flex-col gap-16 pt-0 md:gap-20 md:pt-4">
        <Chapter index="01" title="The setup">
          <p className="max-w-2xl text-body text-muted-foreground text-pretty md:text-[1.15rem]">{study.setup}</p>
        </Chapter>

        <Chapter index="02" title="What was broken">
          <ul className="flex max-w-2xl flex-col border-t border-border">
            {study.broken.map((line) => (
              <li key={line} className="flex gap-4 border-b border-border py-4 text-body text-muted-foreground">
                <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rotate-45 bg-[#4a4a4a]" />
                {line}
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter index="03" title="What I changed">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <ol className="flex flex-col gap-5 lg:col-span-8">
              {study.changed.map((line, i) => (
                <li key={line} className="flex gap-5 text-body text-muted-foreground">
                  <span className="font-display figures w-7 shrink-0 text-[1.6rem] leading-none text-primary italic">
                    {i + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ol>
            <div className="lg:col-span-4 lg:pt-2">
              <BeforeAfter />
            </div>
          </div>
        </Chapter>

        <Chapter index="04" title="What moved">
          <p className="font-display text-[2rem] leading-[1.1] text-foreground md:text-[2.6rem]">
            <span className="figures text-primary">{lead.value}</span> {lowerFirst(lead.label)}
            {second ? (
              <>
                {" "}
                <span className="text-faint">·</span>{" "}
                <span className={isFigure(second.value) ? "figures" : undefined}>{second.value}</span> {lowerFirst(second.label)}
              </>
            ) : null}
          </p>
          <p className="mt-5 max-w-2xl text-body text-muted-foreground text-pretty">{study.moved}</p>
        </Chapter>

        {quote ? (
          <motion.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative rounded-[1.25rem] bg-[#bea98e] px-7 pt-14 pb-8 text-[#0c0c0c] md:px-14 md:pt-20 md:pb-12"
          >
            <span aria-hidden className="font-display absolute top-2 left-6 text-[7rem] leading-none text-[#0c0c0c]/20 md:left-12 md:text-[9rem]">
              “
            </span>
            <blockquote className="font-display max-w-3xl text-[1.9rem] leading-[1.15] text-balance md:text-[2.75rem]">
              {quote.note}
            </blockquote>
            <figcaption className="mt-8 text-caption">
              <strong className="font-semibold">{quote.name}</strong>
              <span className="text-[#0c0c0c]/70">
                {" "}
                · {quote.role}, {quote.company}
              </span>
            </figcaption>
          </motion.figure>
        ) : null}

        {study.lesson ? (
          <Chapter index="05" title="What I’d do again">
            <p className="font-display max-w-2xl text-[2rem] leading-[1.15] text-primary italic">{study.lesson}</p>
          </Chapter>
        ) : null}
      </StudioSection>

      <StudioSection label="Your turn">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[3rem] leading-[0.95] text-foreground md:text-[4.5rem]">
            Want this for your <span className="em-taupe">account?</span>
          </h2>
          <Button
            render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
            nativeButton={false}
            size="lg"
            className="caps-label h-13 w-full rounded-full px-8 transition-[background-color,box-shadow] duration-500 hover:bg-[#cdbaa0] hover:shadow-[0_0_40px_-8px_rgba(190,169,142,0.6)] sm:w-auto"
          >
            Book a call
          </Button>
        </div>
      </StudioSection>
    </article>
  );
}
