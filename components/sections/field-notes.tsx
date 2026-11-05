"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StudioSection, SectionHead, ArrowLink } from "@/components/studio/section";
import { essays, type Essay } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const byNewest = [...essays].sort((a, b) => b.date.localeCompare(a.date));

/* Ruled rows of title, teaser and read time. On hover the title slides in
   and an arrow arrives at the end of the row. Phones drop the teaser. */
export function EssayRows({ items, showDate = false }: { items: Essay[]; showDate?: boolean }) {
  return (
    <motion.ul
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-12 border-t border-border md:mt-16"
    >
      {items.map((essay) => (
        <motion.li key={essay.slug} variants={fadeUp}>
          <Link
            href={`/writing/${essay.slug}`}
            className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-border py-7 transition-colors duration-500 hover:bg-card md:grid-cols-12 md:px-4 md:py-9"
          >
            <h3 className="font-display text-[1.75rem] leading-[1.08] text-balance text-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-6 md:text-[2.2rem] md:group-hover:translate-x-2">
              {essay.title}
            </h3>
            <p className="hidden text-caption text-muted-foreground text-pretty md:col-span-4 md:block">{essay.excerpt}</p>
            <span className="figures flex items-center justify-end gap-3 text-caption whitespace-nowrap text-faint md:col-span-2">
              {showDate
                ? `${new Date(essay.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · `
                : null}
              {essay.readingTime}
              <span
                aria-hidden
                className="hidden -translate-x-2 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:inline"
              >
                →
              </span>
            </span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* The homepage block. */
export function FieldNotes() {
  return (
    <StudioSection id="writing" index="06" label="Writing" note="strong opinions, loosely held">
      <SectionHead
        title={
          <>
            Field <span className="em-taupe">notes.</span>
          </>
        }
        sub="Short essays on paid media, growth and AI."
      >
        <ArrowLink href="/writing">All notes</ArrowLink>
      </SectionHead>
      <EssayRows items={byNewest.slice(0, 4)} />
    </StudioSection>
  );
}

/* The /writing page: every essay, newest first, with dates. */
export function FieldNotesIndex() {
  return (
    <StudioSection ruled={false} label={<Link href="/" className="link-draw">← Home</Link>} note="strong opinions, loosely held">
      <SectionHead
        as="h1"
        title={
          <>
            Field <span className="em-taupe">notes.</span>
          </>
        }
        sub="Short essays on paid media, growth and AI. Strong opinions, loosely held."
      />
      <EssayRows items={byNewest} showDate />
    </StudioSection>
  );
}
