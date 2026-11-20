"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Emphasis, GrowthChart, PaperPlane, Smiley, StickyNote, Swoosh } from "@/components/sky/doodles";
import { PlatformLogo } from "@/components/brand/platform-logos";
import { BookCall, trackEvent } from "@/components/meta-ads/ui";
import { hero } from "@/data/meta-ads";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";

/*
 * The /meta-ads hero: the homepage's layout (glass card, floating head,
 * chalk line above), with Meta copy and a sticky note that cycles three
 * results instead of the weather line.
 */
function ResultsSticky({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % hero.results.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);

  const r = hero.results[i];
  return (
    <StickyNote className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={r.line}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="block"
        >
          <span className="figures block font-sans text-[1.35rem] leading-tight font-extrabold">{r.figure}</span>
          <span className="mt-1 block">{r.line}</span>
        </motion.span>
      </AnimatePresence>
    </StickyNote>
  );
}

export function MetaHero() {
  return (
    <section id="top" className="relative pt-28 pb-6 md:pt-32 md:pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
        <PaperPlane className="absolute top-[13.5rem] left-[calc(50%+11rem)] w-48" />
        <div className="absolute top-28 right-[max(2.5rem,calc(50%-46rem))] flex items-start gap-3">
          <GrowthChart className="w-28" />
          <div className="pt-2">
            <p className="chalk font-hand text-[1.7rem] leading-[1.05] font-medium whitespace-nowrap">
              sales,
              <br />
              not likes
            </p>
            <Smiley className="mt-2 ml-8 w-9" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-3 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto mb-6 flex w-fit items-center gap-2 md:mb-8"
        >
          <Emphasis className="w-6 md:w-8" />
          <p className="chalk font-hand text-[1.8rem] leading-none font-bold md:text-[2.9rem]">{hero.chalk}</p>
          <Emphasis flip className="w-6 md:w-8" />
          <Swoosh className="absolute -bottom-4 left-4 w-[92%] md:-bottom-6" />
        </motion.div>

        {/* Phones: the head first, the results note over its corner. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto mb-8 flex w-full max-w-md items-end justify-center lg:hidden"
        >
          <div className="animate-bob relative w-[50%] motion-reduce:animate-none">
            <Image
              src="/sky/avatar-head.webp"
              alt="Illustrated portrait of Muneeb Syed"
              width={560}
              height={775}
              priority
              sizes="50vw"
              className="h-auto w-full drop-shadow-[0_24px_30px_rgba(12,60,140,0.35)]"
            />
          </div>
          <ResultsSticky className="absolute right-[2%] -bottom-4 w-44 px-4! pt-5! pb-4! [&_p]:text-[1.15rem]" />
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
              className="caps-label w-fit rounded-2xl bg-white/70 px-3 py-1.5 leading-relaxed text-muted-foreground sm:rounded-full"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-[2.3rem] leading-[1.04] font-bold tracking-[-0.03em] text-balance text-foreground sm:text-[3rem] md:text-[3.6rem]"
            >
              I run Meta Ads for brands that measure them in sales and{" "}
              <span className="marker">pipeline.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-body text-muted-foreground text-pretty">
              {hero.sub}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <BookCall location="hero" />
              <Button
                render={<a href="#work" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                onClick={() => trackEvent("meta_ads_cta", { cta: "see_work", location: "hero" })}
                className="caps-label h-12 w-full rounded-full border-white bg-white/80 px-7 hover:bg-white sm:w-auto"
              >
                See the Meta work
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 flex w-fit items-center gap-2 rounded-full bg-white/75 py-1.5 pr-3 pl-2 text-caption font-semibold text-foreground ring-1 ring-white"
            >
              <PlatformLogo id="meta" className="size-4 shrink-0" />
              {hero.cert}
            </motion.p>
          </motion.div>

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
            <ResultsSticky className="absolute -bottom-6 left-0 w-52" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
