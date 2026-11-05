"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { brands, type Brand } from "@/data/brands";
import { StudioSection, SectionHead } from "@/components/studio/section";
import { cn } from "@/lib/utils";

/*
 * Brands I've helped grow: two rows of names in the serif, drifting slowly in
 * opposite directions. Hovering or focusing a name lifts it to ivory, dims
 * the rest, pauses its row, and writes what was run and where into the
 * caption line underneath. On phones a tap does the same.
 *
 * Brands with a case study link to it; the rest are buttons, so nothing is a
 * dead link. Only the first copy of each row is in the tab order.
 */

function BrandName({
  brand,
  active,
  dimmed,
  tabbable,
  onActivate,
  onTap,
}: {
  brand: Brand;
  active: boolean;
  dimmed: boolean;
  tabbable: boolean;
  onActivate: (slug: string | null) => void;
  onTap: () => void;
}) {
  const className = cn(
    "font-display relative shrink-0 px-1 text-[2.4rem] leading-none whitespace-nowrap transition-[color,opacity] duration-500 outline-none md:text-[3.6rem]",
    active ? "text-foreground" : "text-faint hover:text-foreground focus-visible:text-foreground",
    dimmed && !active && "opacity-35"
  );
  const handlers = {
    onMouseEnter: () => onActivate(brand.slug),
    onFocus: () => onActivate(brand.slug),
    onBlur: () => onActivate(null),
    tabIndex: tabbable ? undefined : -1,
    "aria-hidden": tabbable ? undefined : true,
  };

  if (brand.caseStudy) {
    return (
      <Link href={`/work/${brand.caseStudy}`} className={cn(className, "italic")} {...handlers}>
        {brand.name}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onTap} className={className} {...handlers}>
      {brand.name}
    </button>
  );
}

function Row({
  items,
  reverse,
  activeSlug,
  setActive,
}: {
  items: Brand[];
  reverse?: boolean;
  activeSlug: string | null;
  setActive: (slug: string | null) => void;
}) {
  /* Two copies back to back, so the loop never shows a seam. */
  const loop = [...items, ...items];
  return (
    <div className="marquee-row marquee-mask overflow-hidden py-3" onMouseLeave={() => setActive(null)}>
      <div className={cn("marquee-track flex w-max items-center gap-8 pr-8 md:gap-12 md:pr-12", reverse && "marquee-track-reverse")}>
        {loop.map((brand, i) => (
          <span key={`${brand.slug}-${i}`} className="flex items-center gap-8 md:gap-12">
            <BrandName
              brand={brand}
              active={activeSlug === brand.slug}
              dimmed={activeSlug !== null}
              tabbable={i < items.length}
              onActivate={setActive}
              onTap={() => setActive(activeSlug === brand.slug ? null : brand.slug)}
            />
            <span aria-hidden className="size-1.5 rotate-45 bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Brands() {
  const [active, setActive] = useState<string | null>(null);
  const half = Math.ceil(brands.length / 2);
  const current = brands.find((b) => b.slug === active);

  return (
    <StudioSection
      id="brands"
      index="01"
      label="Clients"
      note={
        <>
          <span className="hidden md:inline">hover over a name</span>
          <span className="md:hidden">tap a name</span>
        </>
      }
      containerClassName="pb-14 md:pb-20"
    >
      <SectionHead
        title={
          <>
            Brands I’ve helped <span className="em-taupe">grow.</span>
          </>
        }
        sub={
          <>
            <span className="hidden md:inline">
              From household names in the US and Canada to SaaS teams and D2C brands in India.
            </span>
            <span className="md:hidden">US enterprise to India D2C.</span>
          </>
        }
      />

      <div className="-mx-6 mt-14 md:-mx-10 md:mt-20">
        <Row items={brands.slice(0, half)} activeSlug={active} setActive={setActive} />
        <Row items={brands.slice(half)} reverse activeSlug={active} setActive={setActive} />
      </div>

      {/* The caption line: what was run for the brand under the pointer. */}
      <div className="mt-8 flex min-h-14 items-center gap-4 border-t border-border pt-6" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current?.slug ?? "idle"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
          >
            {current ? (
              <>
                <span className="font-display text-[1.6rem] leading-none text-foreground">{current.name}</span>
                <span className="caps-label text-primary">{current.note ?? current.site}</span>
                {current.caseStudy ? <span className="caps-label text-faint">Case study →</span> : null}
              </>
            ) : (
              <span className="caps-label text-faint">
                {brands.length} brands across the US, Canada, Europe and India · names in italics have a case study
              </span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </StudioSection>
  );
}
