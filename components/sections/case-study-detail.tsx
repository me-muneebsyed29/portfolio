"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SkySection } from "@/components/sky/sky-section";
import { StickyNote } from "@/components/sky/doodles";
import type { CaseStudy } from "@/data/case-studies";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, isFigure, lowerFirst } from "@/lib/utils";

/*
 * The case study template from the sky direction doc, so clicking through
 * from the homepage feels like the same flight: hero card with the result as
 * the headline and the biggest number on a sticky note, then the setup, what
 * was broken, what I changed, what moved, an optional lesson as a handwritten
 * note, and the ask.
 */

/* Before and after, in pen: a tangle on the left, a clean climb on the right. */
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
          strokeWidth={i === 3 ? 1.4 : 2.4}
          strokeDasharray={i === 3 ? "4 6" : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: { pathLength: 1, opacity: 1, transition: { duration: 0.9, delay: 0.2 * i } },
          }}
        />
      ))}
      <text x="40" y="104" className="font-hand" fontSize="18" fill="currentColor" textAnchor="middle">
        before
      </text>
      <text x="200" y="104" className="font-hand" fontSize="18" fill="currentColor" textAnchor="middle">
        after
      </text>
    </motion.svg>
  );
}

function Block({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section variants={fadeUp} className={className}>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const [lead, second] = study.metrics;
  /* The client's own words, when they've given a testimonial. */
  const quote = testimonials.find((t) => t.caseStudy === study.slug);

  return (
    <article className="pt-24 md:pt-28">
      <SkySection note={<Link href="/work">← all the receipts</Link>}>
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-center gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <motion.p variants={fadeUp} className="caps-label text-foreground">
              {study.client}
              <span className="text-faint">
                {" "}
                · {study.context ? `${study.context} · ` : ""}
                {study.period}
              </span>
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-3 flex flex-wrap gap-2">
              <li className="caps-label rounded-full bg-primary/10 px-2.5 py-1 text-cadmium-sm">{study.industry}</li>
              {study.markets.map((m) => (
                <li key={m} className="caps-label rounded-full bg-white/70 px-2.5 py-1 text-muted-foreground">
                  {m}
                </li>
              ))}
              {study.channels.map((c) => (
                <li key={c} className="caps-label rounded-full bg-white/70 px-2.5 py-1 text-muted-foreground">
                  {c}
                </li>
              ))}
            </motion.ul>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[2.2rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance text-foreground md:text-[3.2rem]"
            >
              {study.headline}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-body text-muted-foreground text-pretty">
              {study.oneLine}
            </motion.p>
            <motion.dl variants={fadeUp} className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {study.metrics.map((metric, i) => (
                <div key={metric.label} className="glass-card flex min-w-36 flex-col-reverse rounded-2xl px-5 py-4">
                  <dt className="caps-label mt-1 text-faint">{metric.label}</dt>
                  <dd
                    className={cn(
                      "text-2xl font-bold",
                      isFigure(metric.value) ? "figures" : "tracking-[-0.02em]",
                      i === 0 ? "text-cadmium" : "text-foreground"
                    )}
                  >
                    {metric.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
          <div className="flex justify-center md:col-span-4">
            <StickyNote className="w-52">
              <span className="figures block font-sans text-[2.6rem] leading-none font-extrabold">{lead.value}</span>
              <span className="mt-1 block">{lowerFirst(lead.label)}</span>
            </StickyNote>
          </div>
        </motion.div>
      </SkySection>

      <SkySection>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-12"
        >
          <Block title="The setup">
            <p className="max-w-2xl text-body text-muted-foreground text-pretty">{study.setup}</p>
          </Block>

          <Block title="What was broken">
            <ul className="flex max-w-2xl flex-col gap-2">
              {study.broken.map((line) => (
                <li key={line} className="flex gap-3 text-body text-muted-foreground">
                  <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-foreground/40" />
                  {line}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="What I changed">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <ol className="flex flex-col gap-3 md:col-span-8">
                {study.changed.map((line, i) => (
                  <li key={line} className="flex gap-4 text-body text-muted-foreground">
                    <span className="figures w-6 shrink-0 font-bold text-primary">{i + 1}</span>
                    {line}
                  </li>
                ))}
              </ol>
              <div className="md:col-span-4 md:pt-2">
                <BeforeAfter />
              </div>
            </div>
          </Block>

          <Block title="What moved">
            <p className="text-[1.6rem] font-bold tracking-[-0.02em] text-foreground">
              <span className="figures text-cadmium">{lead.value}</span> {lowerFirst(lead.label)}
              {second ? (
                <>
                  {" "}
                  · <span className={isFigure(second.value) ? "figures" : undefined}>{second.value}</span>{" "}
                  {lowerFirst(second.label)}
                </>
              ) : null}
            </p>
            <p className="mt-3 max-w-2xl text-body text-muted-foreground text-pretty">{study.moved}</p>
          </Block>

          {quote ? (
            <motion.figure variants={fadeUp} className="max-w-2xl -rotate-1 bg-[#ffe066] px-7 pt-8 pb-6 text-[#3a2a00] shadow-[0_18px_30px_-18px_rgba(120,80,0,0.55)]">
              <blockquote className="text-lg leading-snug font-semibold text-pretty">“{quote.note}”</blockquote>
              <figcaption className="mt-4 text-caption">
                <strong>{quote.name}</strong>, {quote.role}, {quote.company}
              </figcaption>
            </motion.figure>
          ) : null}

          {study.lesson ? (
            <Block title="What I’d do again">
              <p className="font-hand max-w-2xl -rotate-1 text-[1.8rem] leading-tight text-primary">{study.lesson}</p>
            </Block>
          ) : null}
        </motion.div>
      </SkySection>

      <SkySection note="your turn">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-foreground md:text-[2.4rem]">
            Want this for your account?
          </h2>
          <Button
            render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
            nativeButton={false}
            size="lg"
            className="caps-label h-12 w-full rounded-full px-7 shadow-[0_10px_24px_-10px_rgba(22,104,227,0.8)] sm:w-auto"
          >
            Book a call
          </Button>
        </div>
      </SkySection>
    </article>
  );
}
