"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer } from "@/lib/motion";

const credibility = [
  "$25M+ Managed",
  "5+ Years",
  "Enterprise SaaS",
  "Google, Meta & LinkedIn",
  "AI-native GTM",
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center pt-32 pb-24">
      <AmbientBackground />
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {siteConfig.role}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-medium text-balance text-foreground sm:text-6xl md:text-hero"
          >
            Building AI-first growth systems that turn paid media into predictable pipeline.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl"
          >
            Helping B2B SaaS companies scale revenue through AI-powered paid media,
            experimentation, and growth systems.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              render={<a href={siteConfig.bookingUrl} />}
              nativeButton={false}
              size="lg"
              className="rounded-full px-6"
            >
              Book a Call
            </Button>
            <Button
              render={<a href="#work" />}
              nativeButton={false}
              size="lg"
              variant="ghost"
              className="rounded-full px-6"
            >
              View Case Studies
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8"
          >
            {credibility.map((item) => (
              <span key={item} className="text-sm text-muted-foreground">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
