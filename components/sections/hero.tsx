"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Emphasis,
  GrowthChart,
  HandList,
  PaperPlane,
  Smiley,
  StickyNote,
  Swoosh,
} from "@/components/sky/doodles";
import { weatherCopy } from "@/data/weather";
import { siteConfig } from "@/lib/site-config";
import { useWeather } from "@/lib/weather";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Who Muneeb is, what he promises, four numbers. The four numbers are the
 * proof that used to live in Selected wins; they appear here once and on the
 * case study cards, nowhere else.
 *
 * One accent number per screen: $25M+ takes the sky blue.
 *
 * Open question in the copy doc: whether $25M+ is the total across clients or
 * the enterprise fintech budget. Case study 3 says the latter; fix both
 * together once it is settled.
 */
const stats: { figure: string; label: string; accent?: boolean }[] = [
  { figure: "$25M+", label: "ad spend managed", accent: true },
  { figure: "65%", label: "lower CAC" },
  { figure: "7x", label: "spend, efficiency held" },
  { figure: "5+", label: "years doing this" },
];

/* The sticky note is the one thing the weather changes in the hero. */
function WeatherSticky({ className }: { className?: string }) {
  const weather = useWeather();
  return (
    <StickyNote className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={weather}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="block"
        >
          {weatherCopy[weather].sticky}
        </motion.span>
      </AnimatePresence>
    </StickyNote>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-6 md:pt-32 md:pb-10">
      {/* Banner doodles, drawn on the sky around the glass. Wide screens only:
          below that there is no sky margin for them to live in. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
        <HandList
          items={["ideas", "experiments", "campaigns", "learn", "repeat"]}
          className="absolute top-36 left-[max(1.5rem,calc(50%-46rem))]"
        />
        {/* The paper plane takes off here and lands in the contact card. */}
        <PaperPlane className="absolute top-[13.5rem] left-[calc(50%+11rem)] w-48" />
        <div className="absolute top-28 right-[max(2.5rem,calc(50%-46rem))] flex items-start gap-3">
          <GrowthChart className="w-28" />
          <div className="pt-2">
            <p className="chalk font-hand text-[1.7rem] leading-[1.05] font-medium whitespace-nowrap">
              more
              <br />
              pipeline,
              <br />
              less BS
            </p>
            <Smiley className="mt-2 ml-8 w-9" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-3 sm:px-5">
        {/* The handwritten top line sits on the sky, above the glass. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto mb-6 flex w-fit items-center gap-2 md:mb-8"
        >
          <Emphasis className="w-6 md:w-8" />
          <p className="chalk font-hand text-[2rem] leading-none font-bold md:text-[2.9rem]">
            paid media · growth · AI
          </p>
          <Emphasis flip className="w-6 md:w-8" />
          <Swoosh className="absolute -bottom-4 left-4 w-[92%] md:-bottom-6" />
        </motion.div>

        {/* Phones: the head comes first, at about half the width, with the
            weather note over its corner and the chalk aside beside it. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto mb-8 flex w-full max-w-md items-end justify-center lg:hidden"
        >
          <div className="animate-bob relative w-[55%] motion-reduce:animate-none">
            <Image
              src="/sky/avatar-head.webp"
              alt="Illustrated portrait of Muneeb Syed"
              width={560}
              height={775}
              priority
              sizes="55vw"
              className="h-auto w-full drop-shadow-[0_24px_30px_rgba(12,60,140,0.35)]"
            />
          </div>
          <p className="chalk font-hand absolute top-6 left-0 -rotate-6 text-[1.25rem] leading-[1.05] font-medium">
            more
            <br />
            pipeline,
            <br />
            less BS :)
          </p>
          <WeatherSticky className="absolute right-[6%] -bottom-4 w-40 px-4! pt-5! pb-4! [&_p]:text-[1.2rem]" />
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="show"
            className="glass relative rounded-[2rem] p-6 sm:p-10 md:p-12 lg:col-span-8"
          >
            <motion.p
              variants={fadeUp}
              className="caps-label w-fit rounded-full bg-white/70 px-3 py-1.5 text-muted-foreground"
            >
              Growth operator for B2B SaaS · Bengaluru
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-[2.4rem] leading-[1.04] font-bold tracking-[-0.03em] text-balance text-foreground sm:text-[3rem] md:text-[3.75rem]"
            >
              I turn ad spend into pipeline you can plan <span className="marker">around.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-body text-muted-foreground text-pretty">
              I help B2B SaaS teams fix what sits behind their ads, then scale what works. Faster
              tests, cleaner data, and AI doing the grunt work.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
                nativeButton={false}
                size="lg"
                className="caps-label h-12 w-full rounded-full px-7 shadow-[0_10px_24px_-10px_rgba(22,104,227,0.8)] sm:w-auto"
              >
                Book a 30-min call
              </Button>
              <Button
                render={<a href="#work" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="caps-label h-12 w-full rounded-full border-white bg-white/80 px-7 hover:bg-white sm:w-auto"
              >
                See the work
              </Button>
            </motion.div>

            <motion.dl variants={staggerContainer(0.07, 0.2)} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="glass-card flex flex-col-reverse justify-between rounded-2xl px-4 pt-4 pb-3.5"
                >
                  <dt className="mt-2 text-caption leading-snug font-medium text-muted-foreground">{item.label}</dt>
                  <dd
                    className={cn(
                      "figures text-[1.75rem] leading-none font-bold",
                      item.accent ? "text-cadmium" : "text-foreground"
                    )}
                  >
                    {item.figure}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <motion.p variants={fadeUp} className="caps-label mt-7 text-faint">
              Google · Meta · LinkedIn · US, Canada, India
            </motion.p>
          </motion.div>

          {/* Large screens: the 3D head floats beside the card, cut out of its
              own sky so it bobs in this one. */}
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
                sizes="340px"
                className="h-auto w-full drop-shadow-[0_30px_40px_rgba(12,60,140,0.35)]"
              />
            </div>
            <WeatherSticky className="absolute -bottom-6 left-0 w-48" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
