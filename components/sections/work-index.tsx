"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
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
        "caps-label rounded-full px-3 py-1.5 transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-white/70 text-muted-foreground hover:bg-white hover:text-foreground"
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
    <SkySection note={<Link href="/">← back up to the clouds</Link>}>
      <SectionHead
        as="h1"
        title="All the receipts."
        sub="Enterprise, B2B SaaS, EdTech, D2C and local businesses across the US, Canada, Europe and India. Pick a filter."
      />

      <div className="mt-8 flex flex-col gap-3">
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

      <p className="mt-6 text-caption text-faint" aria-live="polite">
        {studies.length} case {studies.length === 1 ? "study" : "studies"}
        {notes.length ? ` and ${notes.length} highlight${notes.length === 1 ? "" : "s"}` : ""}
      </p>

      {studies.length ? (
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <li key={study.slug}>
              <CaseCard study={study} />
            </li>
          ))}
        </ul>
      ) : null}

      {notes.length ? (
        <>
          <h2 className="mt-12 text-xl font-bold tracking-[-0.02em] text-foreground">More highlights</h2>
          <p className="mt-1 text-caption text-muted-foreground">
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
            className="font-semibold text-primary"
          >
            Clear filters
          </button>
        </p>
      ) : null}
    </SkySection>
  );
}
