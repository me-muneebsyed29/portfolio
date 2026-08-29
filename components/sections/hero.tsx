"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { GridGround } from "@/components/brand/grid-ground";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * "EACH FRAME: ONE ACCENT NUMBER, NOTHING ELSE." The $25M+ figure is the single
 * cadmium element on this screen — the other figure stays chalk even though it
 * is also a good number.
 */
const stats: { figure: string; label: string; accent?: boolean }[] = [
  { figure: "$25M+", label: "Media managed", accent: true },
  { figure: "5+", label: "Years operating" },
];

/* Qualitative credentials carry no figure, so they sit in a mono caps line
   rather than in the stat strip — a cell with an empty number is not a cell. */
const credentials = ["Enterprise SaaS", "Google · Meta · LinkedIn", "AI-native GTM"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center border-b-2 border-rule pt-28 pb-14 md:pb-22"
    >
      <GridGround />
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p variants={fadeUp} className="mono-label text-muted-foreground">
            {siteConfig.role} · Bengaluru
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.025em] text-balance text-foreground sm:text-[3.25rem] md:text-hero"
          >
            Building AI-first growth systems that turn paid media into predictable pipeline.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-body text-muted-foreground text-pretty"
          >
            Helping B2B SaaS companies scale revenue through AI-powered paid media,
            experimentation, and growth systems.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              render={<a href={siteConfig.bookingUrl} />}
              nativeButton={false}
              size="lg"
              className="mono-label h-11 px-6"
            >
              Book a Call
            </Button>
            <Button
              render={<a href="#work" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="mono-label h-11 px-6"
            >
              View Case Studies
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07, 0.25)}
          initial="hidden"
          animate="show"
          /* Bounded to the strip it heads. Left full width the rule carried on
             for another 240px past the last credential, which read as a gap
             rather than a divider. */
          className="mt-16 max-w-2xl border-t-2 border-rule"
        >
          {/* Padding rather than a flex gap, so the rule sits centred between the
              two stats instead of 56px from one and 24px from the other. */}
          <dl className="flex flex-wrap gap-y-8">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="border-l border-rule px-6 pt-6 first:border-l-0 first:pl-0"
              >
                <dd
                  className={cn(
                    "figures text-3xl font-bold leading-none",
                    item.accent ? "text-cadmium" : "text-foreground"
                  )}
                >
                  {item.figure}
                </dd>
                <dt className="mono-label mt-3 text-muted-foreground">{item.label}</dt>
              </motion.div>
            ))}
          </dl>

          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {credentials.map((item) => (
              <li key={item} className="mono-label text-faint">
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
