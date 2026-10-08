"use client";

import Link from "next/link";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { EssayRows } from "@/components/sections/field-notes";
import { essays } from "@/data/writing";
import { caseStudies } from "@/data/case-studies";
import { cn, isFigure } from "@/lib/utils";

/*
 * Where to go next, at the foot of every essay and case study. Keeps readers
 * moving through the site, and gives search engines a path between pages that
 * doesn't run through the homepage.
 */
export function MoreNotes({ exclude }: { exclude: string }) {
  const others = [...essays].filter((e) => e.slug !== exclude).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <SkySection note="if that one landed, try these">
      <SectionHead title="More field notes.">
        <Link href="/writing" className="caps-label shrink-0 text-primary">
          All notes →
        </Link>
      </SectionHead>
      <EssayRows items={others} />
      <p className="mt-8 text-caption text-muted-foreground">
        Want to see it in practice?{" "}
        <Link href="/#work" className="font-semibold text-primary">
          The receipts →
        </Link>
      </p>
    </SkySection>
  );
}

export function MoreWork({ exclude }: { exclude: string }) {
  const others = caseStudies.filter((s) => s.slug !== exclude);
  return (
    <SkySection note="two more, same flight">
      <SectionHead title="More receipts." />
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {others.map((study) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}`}
              className="glass-card group flex h-full flex-col rounded-3xl p-6 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/90"
            >
              <p className="caps-label text-faint">{study.client}</p>
              <h3 className="mt-3 text-xl leading-snug font-bold tracking-[-0.02em] text-balance text-foreground">
                {study.headline}
              </h3>
              <p className="mt-4 flex gap-6">
                {study.metrics.map((metric, i) => (
                  <span key={metric.label}>
                    <span
                      className={cn(
                        "block text-lg font-bold",
                        isFigure(metric.value) && "figures",
                        i === 0 ? "text-cadmium" : "text-foreground"
                      )}
                    >
                      {metric.value}
                    </span>
                    <span className="caps-label text-faint">{metric.label}</span>
                  </span>
                ))}
              </p>
              <span className="caps-label mt-5 text-primary">Read the story →</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-caption text-muted-foreground">
        Or read how I think about it in the{" "}
        <Link href="/writing" className="font-semibold text-primary">
          field notes →
        </Link>
      </p>
    </SkySection>
  );
}
