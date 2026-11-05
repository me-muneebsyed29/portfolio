"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { CertBadges } from "@/components/studio/badges";
import { CountUp, RevealWords } from "@/components/studio/motion-text";
import { siteConfig } from "@/lib/site-config";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Who Muneeb is, what he promises, four numbers. Each traces to a source:
 * $25M+ is the career total in his LinkedIn headline (GALE alone ran $20M+ a
 * year), 3x is the Pella case study, 86% the iCode School one, and 95% is the
 * claim on his CV.
 *
 * The numbers sit on four tiles, one per colour in the palette, laid out the
 * way a palette card is: a name at the top, the value at the bottom. On phones
 * it is the card exactly: one wide taupe tile, two halves, one wide black.
 */
type Stat = { figure: string; label: string; context?: string; tone: "taupe" | "charcoal" | "dim" | "black" };

const stats: Stat[] = [
  { figure: "$25M+", label: "Ad spend managed", context: "Career total", tone: "taupe" },
  { figure: "3x", label: "ROAS for Pella", context: "From 0.8x", tone: "charcoal" },
  { figure: "86%", label: "Lower CPL", context: "US EdTech", tone: "dim" },
  { figure: "95%", label: "Of accounts ROAS-positive", tone: "black" },
];

const tones: Record<Stat["tone"], { tile: string; label: string; context: string }> = {
  taupe: { tile: "bg-[#bea98e] text-[#0c0c0c] col-span-2 lg:col-span-1", label: "text-[#0c0c0c]", context: "text-[#0c0c0c]/70" },
  charcoal: { tile: "bg-[#2c2c2c] text-foreground", label: "text-foreground", context: "text-muted-foreground" },
  dim: { tile: "bg-[#4a4a4a] text-foreground", label: "text-foreground", context: "text-foreground/75" },
  black: {
    tile: "bg-[#0c0c0c] text-foreground ring-1 ring-inset ring-[#2c2c2c] col-span-2 lg:col-span-1",
    label: "text-foreground",
    context: "text-muted-foreground",
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 800], [0, 80]);
  const portraitScale = useTransform(scrollY, [0, 800], [1, 1.08]);

  return (
    <section className="relative pt-28 pb-10 md:pt-40 md:pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8 lg:pt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE }}
              className="caps-label flex items-center gap-4 text-muted-foreground"
            >
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                className="h-px w-10 origin-left bg-primary"
              />
              Growth operator for B2B SaaS · Bengaluru
            </motion.div>

            <h1 className="font-display mt-8 text-[3.3rem] leading-[0.94] tracking-[-0.025em] text-foreground sm:text-[4.6rem] lg:text-[6.1rem]">
              <RevealWords text="I turn ad spend into pipeline you can plan around." emphasis={1} delay={0.25} />
            </h1>

            <motion.div variants={staggerContainer(0.1, 0.9)} initial="hidden" animate="show">
              <motion.p variants={fadeUp} className="mt-8 max-w-xl text-body text-muted-foreground text-pretty md:text-[1.15rem]">
                I help B2B SaaS teams fix what sits behind their ads, then scale what works. Faster tests,
                cleaner data, and AI doing the grunt work.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Button
                  render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
                  nativeButton={false}
                  size="lg"
                  className="caps-label group h-13 w-full rounded-full px-8 transition-[background-color,box-shadow] duration-500 hover:bg-[#cdbaa0] hover:shadow-[0_0_40px_-8px_rgba(190,169,142,0.6)] sm:w-auto"
                >
                  Book a 30-min call
                  <span aria-hidden className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Button>
                <a href="#work" className="caps-label link-draw w-fit self-center text-foreground sm:self-auto">
                  See the work
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* The portrait: unveiled from the bottom on load, then it eases
              down and in a touch as the page scrolls. */}
          <motion.figure
            initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0 round 1.25rem)" }}
            animate={{ clipPath: "inset(0% 0 0 0 round 1.25rem)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[1.25rem] bg-[#2c2c2c] lg:col-span-4 lg:max-w-none"
          >
            <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y: portraitY, scale: portraitScale }}>
              <Image
                src="/portrait.jpg"
                alt="Portrait of Muneeb Syed"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 90vw"
                className="object-cover object-[50%_30%] contrast-[1.05] grayscale"
              />
            </motion.div>
            {/* Warm the black and white toward taupe, and sink the foot into
                the ground so the caption reads. */}
            <div aria-hidden className="absolute inset-0 bg-[#bea98e] mix-blend-color opacity-25" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent" />

            <span className="caps-label absolute top-4 right-4 rounded-full bg-[#2c2c2c]/85 px-3.5 py-2 text-foreground backdrop-blur">
              5+ yrs
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
              <div>
                <p className="font-display text-[1.9rem] leading-none text-foreground">Muneeb Syed</p>
                <p className="caps-label mt-2 text-muted-foreground">Paid media · Growth · AI</p>
              </div>
              <p className="font-display text-right text-[1.15rem] leading-tight text-primary italic">
                more pipeline,
                <br />
                less BS.
              </p>
            </figcaption>
          </motion.figure>
        </div>

        <motion.dl
          variants={staggerContainer(0.08, 1.1)}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-2 gap-3 md:mt-20 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr]"
        >
          {stats.map((item) => {
            const tone = tones[item.tone];
            return (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className={cn(
                  "group flex min-h-40 flex-col justify-between rounded-[1.25rem] p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:min-h-52 md:p-7",
                  tone.tile
                )}
              >
                <dt className={cn("text-[1.05rem] leading-snug font-medium md:text-[1.2rem]", tone.label)}>{item.label}</dt>
                <dd className="mt-6">
                  <CountUp value={item.figure} className="font-display block text-[3rem] leading-none md:text-[4rem]" />
                  {item.context ? <span className={cn("caps-label mt-3 block", tone.context)}>{item.context}</span> : null}
                </dd>
              </motion.div>
            );
          })}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <p className="caps-label text-faint">Google · Meta · LinkedIn · TikTok — US, Canada, Europe, India</p>
          <CertBadges />
        </motion.div>
      </Container>
    </section>
  );
}
