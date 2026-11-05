"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StudioSection } from "@/components/studio/section";
import { RevealWords } from "@/components/studio/motion-text";
import type { Essay, EssayBlock } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

/* Long-form sets at 17px on a 1.75 line, on a measure short enough to read.
   Subheads and pull quotes take the serif. */
function Block({ block }: { block: EssayBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display mt-16 text-[2rem] leading-[1.05] text-balance text-foreground md:text-[2.4rem]">
          {block.text}
        </h2>
      );

    case "quote":
      return (
        <blockquote className="my-14 border-l border-primary pl-7 md:pl-10">
          <p className="font-display text-[1.9rem] leading-[1.15] text-balance text-primary italic md:text-[2.4rem]">
            {block.text}
          </p>
        </blockquote>
      );

    case "list":
      return (
        <ul className="mt-8 border-t border-border">
          {block.items.map((item, i) => (
            <li key={item} className="grid grid-cols-[3rem_1fr] border-b border-border py-5">
              <span className="font-display figures text-[1.4rem] leading-none text-primary italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body leading-[1.7] text-foreground/90 text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "p":
      return <p className="mt-7 text-body leading-[1.75] text-foreground/85 text-pretty">{block.text}</p>;
  }
}

export function EssayDetail({ essay }: { essay: Essay }) {
  const published = new Date(essay.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="pt-20 md:pt-28">
      <StudioSection
        ruled={false}
        label={
          <Link href="/#writing" className="link-draw">
            ← Field notes
          </Link>
        }
        note={`${essay.readingTime} read`}
      >
        <motion.div variants={staggerContainer(0.09, 0.1)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="caps-label text-primary">
            Field note · {published}
          </motion.p>

          <h1 className="font-display mt-8 max-w-5xl text-[3rem] leading-[0.96] text-balance text-foreground md:text-[5.25rem]">
            <RevealWords text={essay.title} delay={0.2} stagger={0.04} />
          </h1>

          <motion.p
            variants={fadeUp}
            className="font-display mt-12 max-w-3xl border-t border-border pt-10 text-[1.6rem] leading-[1.3] text-muted-foreground italic text-pretty md:text-[1.9rem]"
          >
            {essay.standfirst}
          </motion.p>
        </motion.div>
      </StudioSection>

      <StudioSection>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[68ch]"
        >
          {essay.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <div className="mt-20 flex items-center gap-4 border-t border-border pt-8">
            <span aria-hidden className="size-2 rotate-45 bg-primary" />
            <div>
              <p className="font-display text-[1.4rem] leading-none text-foreground">{siteConfig.name}</p>
              <p className="mt-1 text-caption text-faint">
                {siteConfig.role} · {published}
              </p>
            </div>
          </div>
        </motion.div>
      </StudioSection>
    </article>
  );
}
