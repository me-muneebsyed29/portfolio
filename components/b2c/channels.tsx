"use client";

import { motion } from "framer-motion";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { channels, categories } from "@/data/b2c/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function B2CChannels() {
  return (
    <B2CSection id="channels" className="border-t border-border bg-surface">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <B2CEyebrow>What I run</B2CEyebrow>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl">
          <B2CTitle>Every channel where consumers actually decide.</B2CTitle>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.name}
                variants={fadeUp}
                className="group bg-background p-8 transition-colors hover:bg-card"
              >
                <Icon className="size-5 text-primary" strokeWidth={1.75} />
                <h3 className="mt-6 text-lg font-semibold text-foreground">{channel.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {channel.description}
                </p>
                <p className="font-mono-ui mt-6 border-t border-border pt-4 text-[11px] uppercase tracking-[0.1em] text-primary/80">
                  {channel.proof}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} className="mt-16">
          <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Categories I&apos;ve scaled
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <li
                key={category}
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80"
              >
                {category}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </B2CSection>
  );
}
