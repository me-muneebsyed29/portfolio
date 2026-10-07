"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SkySection } from "@/components/sky/sky-section";
import type { Essay, EssayBlock } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

/* Long-form sets at 17/1.55 on a measure short enough to read. */
function Block({ block }: { block: EssayBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-14 text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:text-2xl">
          {block.text}
        </h2>
      );

    case "quote":
      return (
        <blockquote className="mt-12 border-l-4 border-[#ffd84d] pl-6">
          <p className="text-xl font-semibold tracking-[-0.025em] text-balance text-foreground md:text-2xl">
            {block.text}
          </p>
        </blockquote>
      );

    case "list":
      return (
        <ul className="mt-8 border-t border-rule">
          {block.items.map((item, i) => (
            <li key={item} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-5">
              <span className="caps-label pt-1 text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-foreground text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "p":
      return <p className="mt-7 text-body text-foreground text-pretty">{block.text}</p>;
  }
}

export function EssayDetail({ essay }: { essay: Essay }) {
  const published = new Date(essay.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="pt-24 md:pt-28">
      <SkySection note={<Link href="/#writing">← back to field notes</Link>}>
        <motion.div variants={staggerContainer(0.09)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="caps-label text-faint">
            Field note · {published} · {essay.readingTime} read
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-3xl text-[2.2rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance text-foreground md:text-[3.2rem]"
          >
            {essay.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl border-t border-rule pt-8 text-xl text-muted-foreground text-pretty"
          >
            {essay.standfirst}
          </motion.p>
        </motion.div>
      </SkySection>

      <SkySection>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-[68ch]"
        >
          {essay.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <div className="mt-16 border-t border-rule pt-6">
            <p className="text-caption font-bold text-foreground">{siteConfig.name}</p>
            <p className="text-caption text-faint">
              {siteConfig.role} · {published}
            </p>
          </div>
        </motion.div>
      </SkySection>
    </article>
  );
}
