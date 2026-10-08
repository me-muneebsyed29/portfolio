"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { brandRows, brands, type Brand } from "@/data/brands";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { cn } from "@/lib/utils";

/*
 * Brands I've helped grow: one wall floating on the sky, every mark in the
 * same white tint so the wall reads as part of the sky and colour is the
 * reward on hover. Hover or focus lifts a brand, blooms a cloud puff behind
 * it, dims the rest, and pops a sticky note with what was run and where.
 * Styling lives in globals.css under "Brands wall".
 *
 * Phones get two marquee rows drifting in opposite directions; tapping a
 * brand pauses its row and pops its note.
 */

function BrandMark({ brand, active, onTap, tabbable = true }: {
  brand: Brand;
  active?: boolean;
  onTap?: () => void;
  tabbable?: boolean;
}) {
  const noteId = useId();
  const mark = brand.logo ? (
    // eslint-disable-next-line @next/next/no-img-element -- tinted with CSS filters
    <img src={`/brands/${brand.slug}.svg`} alt={brand.name} className="brand-logo h-7 w-auto md:h-8" />
  ) : (
    <span className="brand-word">{brand.name}</span>
  );
  const body = (
    <>
      <span aria-hidden className="brand-puff" />
      <span className="brand-float">{mark}</span>
      <span role="tooltip" id={noteId} className="brand-note">
        <strong className="block font-sans text-[0.8rem] font-bold not-italic">{brand.name}</strong>
        {brand.note ?? brand.site}
      </span>
    </>
  );
  const className = cn("brand", active && "is-active");

  /* Only brands with a case study are links: no dead links otherwise. */
  if (brand.caseStudy) {
    return (
      <Link
        href={`/work/${brand.caseStudy}`}
        aria-describedby={noteId}
        tabIndex={tabbable ? undefined : -1}
        className={className}
      >
        {body}
      </Link>
    );
  }
  return (
    <button
      type="button"
      aria-describedby={noteId}
      tabIndex={tabbable ? undefined : -1}
      onClick={onTap}
      className={className}
    >
      {body}
    </button>
  );
}

function MarqueeRow({ items, reverse }: { items: Brand[]; reverse?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  /* Two copies back to back, so the loop never shows a seam. */
  const loop = [...items, ...items];
  return (
    <div className="brand-wall overflow-hidden pt-20 pb-2" onMouseLeave={() => setActive(null)}>
      <div
        className={cn("brand-marquee flex w-max gap-10 pr-10", reverse && "brand-marquee-reverse")}
        style={{ animationPlayState: active ? "paused" : "running" }}
      >
        {loop.map((brand, i) => (
          <BrandMark
            key={`${brand.slug}-${i}`}
            brand={brand}
            active={active === `${brand.slug}-${i}`}
            tabbable={i < items.length}
            onTap={() => setActive((cur) => (cur === `${brand.slug}-${i}` ? null : `${brand.slug}-${i}`))}
          />
        ))}
      </div>
    </div>
  );
}

export function Brands() {
  const half = Math.ceil(brands.length / 2);
  return (
    <SkySection
      id="brands"
      bare
      note={
        <>
          <span className="hidden md:inline">go on, hover over one →</span>
          <span className="md:hidden">go on, tap one →</span>
        </>
      }
    >
      <div className="glass rounded-[2rem] px-6 py-8 sm:px-10 md:rounded-[2.5rem] md:px-14 md:py-10">
        <SectionHead
          title="Brands I’ve helped grow."
          sub={
            <>
              <span className="hidden md:inline">
                From household names in the US and Canada to SaaS teams and D2C brands in India.
              </span>
              <span className="md:hidden">US enterprise to India D2C.</span>
            </>
          }
        />
      </div>

      {/* Desktop: the wall, in the order the doc sets, floating on the sky. */}
      <div className="brand-wall mt-4 hidden flex-col items-center gap-y-2 pt-16 md:flex">
        {brandRows.map((row, r) => (
          <ul key={r} className="flex flex-wrap justify-center gap-x-14 gap-y-4">
            {row.map((brand, i) => (
              <li key={brand.slug} style={{ "--bob-delay": `${-((r * 7 + i * 3) % 11) * 0.6}s` } as React.CSSProperties}>
                <BrandMark brand={brand} />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Phones: two drifting rows. */}
      <div className="-mx-3 md:hidden">
        <MarqueeRow items={brands.slice(0, half)} />
        <MarqueeRow items={brands.slice(half)} reverse />
      </div>
    </SkySection>
  );
}
