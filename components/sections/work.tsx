"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { caseStudies } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, isFigure } from "@/lib/utils";

/*
 * The receipts. Three cards in a row on desktop; on phones a swipe carousel
 * at 85% width so the next card peeks, showing the headline and metrics only
 * (the one-liner moves to the story page).
 *
 * The first metric on each card is the accent: it is the number that study is
 * about.
 */
export function Work() {
  return (
    <SkySection id="work" note="the why is inside →">
      <SectionHead title="The receipts." sub="Three accounts. What was broken, what I changed, what moved." />

      <motion.ul
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {caseStudies.map((study) => (
          <motion.li key={study.slug} variants={fadeUp} className="w-[85%] shrink-0 snap-start md:w-auto">
            <Link
              href={`/work/${study.slug}`}
              className="glass-card group flex h-full flex-col rounded-3xl p-6 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/90 md:p-7"
            >
              <p className="caps-label text-faint">{study.client}</p>
              <p className="caps-label mt-2 w-fit rounded-full bg-primary/10 px-2.5 py-1 text-cadmium-sm">{study.tag}</p>
              <h3 className="mt-5 text-xl leading-snug font-bold tracking-[-0.02em] text-balance text-foreground">
                {study.headline}
              </h3>
              <p className="mt-3 hidden text-caption text-muted-foreground text-pretty md:block">{study.oneLine}</p>

              <div aria-hidden className="min-h-7 flex-1" />
              <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-5">
                {study.metrics.map((metric, i) => (
                  <div key={metric.label}>
                    <dd
                      className={cn(
                        "text-lg font-bold",
                        isFigure(metric.value) ? "figures" : "tracking-[-0.02em]",
                        i === 0 ? "text-cadmium" : "text-foreground"
                      )}
                    >
                      {metric.value}
                    </dd>
                    <dt className="caps-label mt-1 text-faint">{metric.label}</dt>
                  </div>
                ))}
              </dl>
              <span className="caps-label mt-6 inline-flex items-center gap-2 text-primary">
                Read the story
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </SkySection>
  );
}
