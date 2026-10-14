"use client";

import Link from "next/link";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { EssayRows } from "@/components/sections/field-notes";
import { essays } from "@/data/writing";
import { caseStudies } from "@/data/case-studies";
import { CaseCard } from "@/components/sections/case-card";

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
  const current = caseStudies.find((s) => s.slug === exclude);
  /* Same industry first, then the featured ones, so the next read is close
     to what brought someone here. */
  const others = caseStudies
    .filter((s) => s.slug !== exclude)
    .sort((a, b) => Number(b.industry === current?.industry) - Number(a.industry === current?.industry) || Number(!!b.featured) - Number(!!a.featured))
    .slice(0, 3);
  return (
    <SkySection note="more of the same flight">
      <SectionHead title="More receipts.">
        <Link href="/work" className="caps-label shrink-0 text-primary">
          All case studies →
        </Link>
      </SectionHead>
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {others.map((study) => (
          <li key={study.slug}>
            <CaseCard study={study} compact />
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
