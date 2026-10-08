"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { essays, type Essay } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const byNewest = [...essays].sort((a, b) => b.date.localeCompare(a.date));

/* Rows of title, teaser and read time. Phones drop the teaser. */
export function EssayRows({ items, showDate = false }: { items: Essay[]; showDate?: boolean }) {
  return (
    <motion.ul
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-10 border-t border-rule"
    >
      {items.map((essay) => (
        <motion.li key={essay.slug} variants={fadeUp}>
          <Link
            href={`/writing/${essay.slug}`}
            className="group -mx-4 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 rounded-2xl border-b border-rule px-4 py-6 transition-colors duration-200 hover:bg-white/60 md:grid-cols-12"
          >
            <h3 className="text-lg font-bold tracking-[-0.02em] text-balance text-foreground md:col-span-5">
              {essay.title}
            </h3>
            <p className="hidden text-caption text-muted-foreground text-pretty md:col-span-5 md:block">
              {essay.excerpt}
            </p>
            <span className="figures text-caption whitespace-nowrap text-faint md:col-span-2 md:text-right">
              {showDate
                ? `${new Date(essay.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · `
                : null}
              {essay.readingTime}
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
    <SkySection id="writing" note="strong opinions, loosely held">
      <SectionHead title="Field notes." sub="Short essays on paid media, growth and AI.">
        <Link href="/writing" className="caps-label shrink-0 text-primary">
          All notes →
        </Link>
      </SectionHead>
      <EssayRows items={byNewest.slice(0, 4)} />
    </SkySection>
  );
}

/* The /writing page: every essay, newest first, with dates. */
export function FieldNotesIndex() {
  return (
    <SkySection note={<Link href="/">← back up to the clouds</Link>}>
      <SectionHead
        as="h1"
        title="Field notes."
        sub="Short essays on paid media, growth and AI. Strong opinions, loosely held."
      />
      <EssayRows items={byNewest} showDate />
    </SkySection>
  );
}
