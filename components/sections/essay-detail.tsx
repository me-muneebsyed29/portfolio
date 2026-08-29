"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Figure } from "@/components/brand/figures";
import { Monogram } from "@/components/brand/monogram";
import type { Essay, EssayBlock } from "@/data/writing";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

/* Long-form sets at 17/1.55 per 02 / TYPE, on a measure short enough to read.
   Never centred, never below 13px, and the figure comes before the argument. */
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
        <blockquote className="mt-12 border-l-2 border-cadmium pl-6">
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
              <span className="mono-label pt-1 text-faint">
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

export function EssayDetail({ essay, index }: { essay: Essay; index: number }) {
  const published = new Date(essay.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article>
      <section className="pt-28 pb-14">
        <Container>
          <motion.div variants={staggerContainer(0.09)} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link
                href="/#writing"
                className="mono-label text-muted-foreground transition-colors hover:text-foreground"
              >
                Back to writing
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mono-label mt-10 text-faint">
              Essay {String(index + 1).padStart(2, "0")} · {published} · {essay.readingTime} read
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-balance text-foreground md:text-h1"
            >
              {essay.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl border-t-2 border-rule pt-8 text-xl text-muted-foreground text-pretty"
            >
              {essay.standfirst}
            </motion.p>

            {/* The figure explains what the argument proves, so it leads. */}
            <motion.div variants={fadeUp} className="mt-14">
              <Figure id={essay.figure} caption={essay.figureCaption} size="hero" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <div className="border-t-2 border-rule">
        <Container className="py-14 md:py-22">
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

            <div className="mt-16 flex items-end justify-between border-t-2 border-rule pt-6">
              <div>
                <p className="mono-label text-foreground">Syed Muneeb Rehaman</p>
                <p className="mono-label mt-2 text-faint">
                  {siteConfig.role} · {published}
                </p>
              </div>
              <Monogram size={24} className="text-muted-foreground" />
            </div>
          </motion.div>
        </Container>
      </div>
    </article>
  );
}
