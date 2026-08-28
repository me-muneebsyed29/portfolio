"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { b2cConfig } from "@/lib/b2c-config";
import { fadeUp, staggerContainer } from "@/lib/motion";

const credibility = [
  "$15M+ ad spend managed",
  "Meta · TikTok · Snap certified",
  "5+ years",
  "95% of accounts ROAS-positive",
  b2cConfig.markets,
];

export function B2CHero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center pt-32 pb-20">
      {/* Accent bloom + grid — the only decoration on the page. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.02] mix-blend-overlay" />
      </div>

      <Container>
        <motion.div
          variants={staggerContainer(0.11)}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono-ui flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {b2cConfig.role}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[2.6rem] leading-[1.03] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-6xl md:text-7xl"
          >
            Paid media for consumer brands, run by the person you{" "}
            <span className="text-primary">actually hired</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl"
          >
            $15M+ in ad spend across Meta, Google, TikTok, Snap and YouTube — for D2C,
            consumer apps, home services and EdTech in the US, Canada and India. One senior
            operator on your account. No junior handoffs, no agency layers.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              size="lg"
              className="h-12 rounded-full px-7 text-[15px] font-semibold"
            >
              {b2cConfig.cta.primary}
            </Button>
            <Button
              render={<a href="#results" />}
              nativeButton={false}
              size="lg"
              variant="ghost"
              className="h-12 rounded-full px-6 text-[15px] text-foreground"
            >
              {b2cConfig.cta.secondary}
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="font-mono-ui mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-xs uppercase tracking-[0.1em] text-muted-foreground"
          >
            {credibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
