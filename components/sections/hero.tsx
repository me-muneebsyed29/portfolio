"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import {
  Burst,
  Emphasis,
  GrowthChart,
  HandList,
  PaperPlane,
  Smiley,
  StickyNote,
  Swoosh,
} from "@/components/sky/doodles";
import { siteConfig } from "@/lib/site-config";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * One accent number per screen still holds: $25M+ takes the sky blue, the rest
 * stay ink even though they are also good numbers.
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

/* Qualitative credentials carry no figure, so they sit in a small caps line
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
    <section id="top" className="relative pt-28 pb-16 md:pt-32 md:pb-24">
      {/* Banner doodles, drawn on the sky around the glass. Wide screens only:
          below that there is no sky margin for them to live in. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
        <HandList
          items={["Ideas", "Experiments", "Campaigns", "Learn", "Repeat"]}
          className="absolute top-36 left-[max(1.5rem,calc(50%-46rem))]"
        />
        <PaperPlane className="absolute top-[13.5rem] left-[calc(50%+11rem)] w-48" />
        <div className="absolute top-28 right-[max(1.5rem,calc(50%-47rem))] flex items-start gap-3">
          <GrowthChart className="w-36" />
          <div className="pt-2">
            <p className="font-hand text-[1.7rem] leading-[1.05] font-medium text-white uppercase">
              More
              <br />
              pipeline
              <br />
              less BS
            </p>
            <Smiley className="mt-2 ml-8 w-9" />
          </div>
        </div>
      </div>

      <Container className="relative max-w-[1240px]">
        {/* The handwritten tagline sits on the sky, above the glass. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto mb-6 flex w-fit items-center gap-2 md:mb-8"
        >
          <Emphasis className="w-6 md:w-8" />
          <p className="font-hand text-[2rem] leading-none font-bold text-white drop-shadow-[0_2px_10px_rgba(10,60,140,0.25)] md:text-[2.9rem]">
            paid media · growth · AI
          </p>
          <Emphasis flip className="w-6 md:w-8" />
          <Swoosh className="absolute -bottom-4 left-4 w-[92%] md:-bottom-6" />
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="show"
            className="glass relative rounded-[2rem] p-6 sm:p-10 md:p-12 lg:col-span-8"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {/* The floating head lives beside the card on large screens;
                  smaller screens get it as a badge in the card instead. The
                  badge has its own square image, framed so the whole head
                  (hair to chin) sits inside the circle; cropping the tall
                  cutout cut the chin off. */}
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-[0_6px_14px_-6px_rgba(16,64,140,0.5)] lg:hidden">
                <Image src="/sky/avatar-badge.webp" alt="" fill sizes="48px" className="object-cover" />
              </span>
              <p className="caps-label w-fit rounded-full bg-white/70 px-3 py-1.5 text-muted-foreground">
                {siteConfig.role} · Bengaluru
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-[2.3rem] font-bold leading-[1.05] tracking-[-0.025em] text-balance text-foreground sm:text-[3rem] md:text-[3.75rem]"
            >
              Building AI-first growth systems that turn paid media into{" "}
              <span className="marker">predictable pipeline.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-body text-muted-foreground text-pretty"
            >
              Helping B2B SaaS companies scale revenue through AI-powered paid media,
              experimentation, and growth systems.
            </motion.p>

            <motion.div variants={fadeUp} className="relative mt-9 flex flex-wrap items-center gap-3">
              <Button
                render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
                nativeButton={false}
                size="lg"
                className="caps-label h-12 rounded-full px-7 shadow-[0_10px_24px_-10px_rgba(22,104,227,0.8)]"
              >
                Book a Call
              </Button>
              <Button
                render={<a href="#work" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="caps-label h-12 rounded-full border-white bg-white/80 px-7 hover:bg-white"
              >
                View Case Studies
              </Button>
              <Burst className="-ml-1 w-8 -translate-y-4 text-primary/70" />
            </motion.div>

            <motion.dl
              variants={staggerContainer(0.07, 0.2)}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="glass-card flex flex-col-reverse justify-between rounded-2xl px-4 pt-4 pb-3.5"
                >
                  <dt className="caps-label mt-2.5 text-muted-foreground">{item.label}</dt>
                  <dd
                    className={cn(
                      "figures text-[1.75rem] font-bold leading-none",
                      item.accent ? "text-cadmium" : "text-foreground"
                    )}
                  >
                    {item.figure}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {credentials.map((item) => (
                <li key={item} className="caps-label text-faint">
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* The 3D head from the avatar, cut out of its own sky so it floats in
              this one, bobbing like the banner's paper plane. */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            className="relative hidden lg:col-span-4 lg:block"
          >
            <div className="animate-bob relative mx-auto w-[88%] max-w-[340px] motion-reduce:animate-none">
              <Image
                src="/sky/avatar-head.webp"
                alt="Illustrated portrait of Muneeb Syed"
                width={560}
                height={775}
                priority
                sizes="340px"
                className="h-auto w-full drop-shadow-[0_30px_40px_rgba(12,60,140,0.35)]"
              />
            </div>
            <StickyNote className="absolute -bottom-6 left-0 w-44">
              Good strategy,
              <br />
              brighter days :)
            </StickyNote>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
