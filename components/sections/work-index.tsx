"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StudioSection, SectionHead } from "@/components/studio/section";
import { CaseCard, HighlightCard } from "@/components/sections/case-card";
import { caseStudies, type Industry, type Market } from "@/data/case-studies";
import { highlights } from "@/data/highlights";
import { cn } from "@/lib/utils";

/*
 * /work: every case study, then the highlights, filterable by industry and
 * market. Everything is in the server-rendered HTML; the filters only hide
 * cards, so search engines and no-JS readers see the full list.
 */
const industries = Array.from(
  new Set<Industry>([...caseStudies.map((s) => s.industry), ...highlights.map((h) => h.industry)])
);
const markets: Market[] = ["US", "Canada", "Europe", "India"];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "caps-label rounded-full border px-3.5 py-2 transition-colors duration-300",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-[#4a4a4a] hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function WorkIndex() {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [market, setMarket] = useState<Market | null>(null);

  const match = useMemo(
    () => (i: Industry, m: Market[]) => (!industry || i === industry) && (!market || m.includes(market)),
    [industry, market]
  );
  const studies = caseStudies.filter((s) => match(s.industry, s.markets));
  const notes = highlights.filter((h) => match(h.industry, h.markets));

  return (
    <StudioSection
      ruled={false}
      label={
        <Link href="/" className="link-draw">
          ← Home
        </Link>
      }
      note="every number, every market"
    >
      <SectionHead
        as="h1"
        title={
          <>
            All the <span className="em-taupe">receipts.</span>
          </>
        }
        sub="Enterprise, B2B SaaS, EdTech, D2C and local businesses across the US, Canada, Europe and India. Pick a filter."
      />

      <div className="mt-12 flex flex-col gap-3">
        <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
          <Chip active={!industry} onClick={() => setIndustry(null)}>
            All industries
          </Chip>
          {industries.map((i) => (
            <Chip key={i} active={industry === i} onClick={() => setIndustry(industry === i ? null : i)}>
              {i}
            </Chip>
          ))}
        </div>
        <div role="group" aria-label="Filter by market" className="flex flex-wrap gap-2">
          <Chip active={!market} onClick={() => setMarket(null)}>
            All markets
          </Chip>
          {markets.map((m) => (
            <Chip key={m} active={market === m} onClick={() => setMarket(market === m ? null : m)}>
              {m}
            </Chip>
          ))}
        </div>
      </div>

      <p className="caps-label mt-10 text-faint" aria-live="polite">
        {studies.length} case {studies.length === 1 ? "study" : "studies"}
        {notes.length ? ` and ${notes.length} highlight${notes.length === 1 ? "" : "s"}` : ""}
      </p>

      {studies.length ? (
        <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <li key={study.slug}>
              <CaseCard study={study} />
            </li>
          ))}
        </ul>
      ) : null}

      {notes.length ? (
        <>
          <h2 className="font-display mt-20 border-t border-border pt-10 text-[2.25rem] leading-none text-foreground">
            More highlights
          </h2>
          <p className="mt-3 text-caption text-muted-foreground">
            Agency and in-house work where the story is the scale.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((item) => (
              <li key={item.client}>
                <HighlightCard item={item} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {!studies.length && !notes.length ? (
        <p className="mt-8 text-body text-muted-foreground">
          Nothing in that combination yet.{" "}
          <button
            type="button"
            onClick={() => {
              setIndustry(null);
              setMarket(null);
            }}
            className="link-draw text-primary"
          >
            Clear filters
          </button>
        </p>
      ) : null}
    </StudioSection>
  );
}
