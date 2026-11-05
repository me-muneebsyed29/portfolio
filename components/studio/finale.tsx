"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { EASE } from "@/lib/motion";

/*
 * Where every page ends. Whatever the page passes in sits first (the home page
 * closes with Hello and Contact), then the name, set as large as the column
 * allows in a taupe-to-charcoal gradient. Each letter rises into place as the
 * block arrives, and the whole line drifts up a little slower than the scroll,
 * so the page settles rather than stops. The footer sits underneath.
 */
const NAME = "Muneeb Syed";

export function Finale({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);
  const glow = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <>
      {children}
      <div ref={ref} className="relative overflow-hidden">
        <Container>
          <div aria-hidden className="h-px bg-border" />
        </Container>
        {/* A low taupe glow comes up behind the name as you arrive. */}
        <motion.div
          aria-hidden
          style={{ opacity: reduceMotion ? 1 : glow }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(190,169,142,0.14),transparent_70%)]"
        />
        <motion.p
          aria-hidden
          style={reduceMotion ? undefined : { y }}
          className="font-display relative mx-auto mt-24 mb-10 max-w-[1280px] px-4 pb-[0.14em] text-center text-[17.5vw] leading-[0.82] tracking-[-0.03em] whitespace-nowrap select-none md:mt-32 md:text-[15vw] xl:text-[15rem]"
        >
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: "40%" }}
              whileInView={{ opacity: 1, y: "0%" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.04 * i }}
              className="inline-block bg-gradient-to-b from-[#bea98e] via-[#8f8070] to-[#2c2c2c] bg-clip-text text-transparent"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.p>
        <Footer />
      </div>
    </>
  );
}
