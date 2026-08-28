"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { MetricCounter } from "@/components/b2c/metric-counter";
import { metrics, brands } from "@/data/b2c/metrics";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function B2CMetrics() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-24">
      <Container>
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <motion.div key={metric.label} variants={fadeUp}>
                <MetricCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className="block text-4xl font-semibold tracking-[-0.03em] text-primary md:text-5xl"
                />
                <p className="mt-3 text-[15px] font-medium text-foreground">{metric.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {metric.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-20 border-t border-border pt-10">
            <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Consumer brands I&apos;ve run media for
            </p>
            <ul className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-6">
              {brands.map((brand) => (
                <li key={brand.name}>
                  <span className="text-xl font-semibold tracking-tight text-foreground/90 md:text-2xl">
                    {brand.name}
                  </span>
                  <span className="font-mono-ui mt-1 block text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {brand.note}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
