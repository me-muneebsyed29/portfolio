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
 * cadmium element on this screen — the rest stay chalk even though they are also
 * good numbers.
 *
 * These are scale and credential figures, deliberately not the outcome figures.
 * Selected Wins sits one section below with -65%, 7x and +40%; repeating those
 * here would spend the same proof twice in one scroll.
 *
 * Sourcing, so these stay honest as the page changes:
 * - Markets is US, Canada and India, the three named in the B2C positioning.
 *   Europe is deliberately not counted: the only European signal on the site is
 *   the euro-denominated case study, which is placeholder copy.
 * - The average ROAS is Muneeb's own cross-client figure, confirmed by him. It
 *   is NOT the 3.3 in Karunakaran Nagarajan's testimonial further down, which is
 *   the top of one client's 2-3.3 range. The two matching is a coincidence.
 */
const stats: { figure: string; label: string; accent?: boolean }[] = [
  { figure: "$25M+", label: "Media managed", accent: true },
  { figure: "5+", label: "Years operating" },
  { figure: "3", label: "Markets served" },
  /* Abbreviated so the label holds one line in a quarter-width cell; spelled out
     it wrapped while its three neighbours did not, dropping this cell's label
     off the shared baseline. */
  { figure: "3.3×", label: "Avg. client ROAS" },
];

/* Qualitative credentials carry no figure, so they sit in a mono caps line
   rather than in the stat strip — a cell with an empty number is not a cell.
   The market list sits here so the figure above it evidences itself. */
const credentials = [
  "Enterprise SaaS",
  "US · Canada · India",
  "Google · Meta · LinkedIn",
  "AI-native GTM",
];

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
          /* Matches the headline's measure, and gives the four labels room to
             each hold a single line. */
          className="mt-16 max-w-4xl border-t-2 border-rule"
        >
          {/* A four-column grid rather than a flex row: equal cells keep the
              dividers on a regular rhythm instead of letting them fall wherever
              each figure happens to end. Padding, not a gap, so a rule sits
              centred between its neighbours. */}
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className={cn(
                  "pt-6 pr-6",
                  /* A cell starting a row stays flush with the container edge
                     and drops its rule; the grid is 2 columns, then 4 from sm,
                     so which cells those are changes with the breakpoint. */
                  i % 2 === 0 ? "pl-0" : "border-l border-rule pl-6",
                  i % 4 === 0 ? "sm:border-l-0 sm:pl-0" : "sm:border-l sm:border-rule sm:pl-6"
                )}
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
