"use client";

import Link from "next/link";
import { StudioSection, SectionHead, ArrowLink } from "@/components/studio/section";
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
    <StudioSection label="Keep reading" note="if that one landed, try these">
      <SectionHead
        title={
          <>
            More field <span className="em-taupe">notes.</span>
          </>
        }
      >
        <ArrowLink href="/writing">All notes</ArrowLink>
      </SectionHead>
      <EssayRows items={others} />
      <p className="mt-10 text-caption text-muted-foreground">
        Want to see it in practice?{" "}
        <Link href="/#work" className="link-draw text-primary">
          The receipts →
        </Link>
      </p>
    </StudioSection>
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
    <StudioSection label="Keep reading" note="more of the same flight">
      <SectionHead
        title={
          <>
            More <span className="em-taupe">receipts.</span>
          </>
        }
      >
        <ArrowLink href="/work">All case studies</ArrowLink>
      </SectionHead>
      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {others.map((study) => (
          <li key={study.slug}>
            <CaseCard study={study} compact />
          </li>
        ))}
      </ul>
      <p className="mt-10 text-caption text-muted-foreground">
        Or read how I think about it in the{" "}
        <Link href="/writing" className="link-draw text-primary">
          field notes →
        </Link>
      </p>
    </StudioSection>
  );
}
