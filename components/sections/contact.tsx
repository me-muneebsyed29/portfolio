"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkySection } from "@/components/sky/sky-section";
import { PaperPlane } from "@/components/sky/doodles";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const rows = [
  { label: "Book a 30-min call", hint: "fastest", href: siteConfig.bookingUrl },
  { label: siteConfig.email, hint: "email", href: `mailto:${siteConfig.email}` },
  { label: "@muneebsyed29", hint: "LinkedIn", href: siteConfig.linkedin },
];

/*
 * The close. The paper plane that took off in the hero lands here. Desktop
 * puts the ways to reach Muneeb beside the form; phones lead with one big
 * booking button and tuck the form behind "Prefer to write?".
 */
export function Contact() {
  const [showForm, setShowForm] = useState(false);
  return (
    <SkySection
      id="contact"
      note={
        <span className="inline-flex items-end gap-2">
          <PaperPlane className="w-24 translate-y-2 rotate-[32deg] md:w-28" />
          see you on the other side :)
        </span>
      }
    >
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-6">
          <motion.h2
            variants={fadeUp}
            className="text-[2.2rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance text-foreground md:text-[3rem]"
          >
            Let’s get your pipeline <span className="marker">flying.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-md text-body text-muted-foreground text-pretty">
            Tell me what you’re running and where it’s stuck. I’ll tell you honestly if I can help.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 text-caption text-faint">
            Trusted by Pella, Time Doctor, Universal Robots and 19 others.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 md:hidden">
            <Button
              render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
              nativeButton={false}
              size="lg"
              className="caps-label h-14 w-full rounded-full text-[0.8rem] shadow-[0_10px_24px_-10px_rgba(22,104,227,0.8)]"
            >
              Book a 30-min call
            </Button>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-6 border-t border-rule md:mt-10">
            {rows.map((row, i) => (
              <li key={row.hint} className={i === 0 ? "hidden md:block" : undefined}>
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group -mx-3 flex items-center justify-between gap-6 rounded-xl border-b border-rule px-3 py-4 transition-colors duration-200 hover:bg-white/60"
                >
                  <span className="font-semibold text-foreground">{row.label}</span>
                  <span className="flex items-center gap-2 text-caption text-faint">
                    {row.hint}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>

          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            className="caps-label mt-6 text-primary md:hidden"
          >
            {showForm ? "Hide the form" : "Prefer to write?"}
          </button>
        </div>

        <motion.div variants={fadeUp} className="hidden md:col-span-5 md:col-start-8 md:block">
          <div className="glass-card rounded-3xl p-7 md:p-8">
            <ContactForm />
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {showForm ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="glass-card rounded-3xl p-6">
                <ContactForm idPrefix="m-" />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </SkySection>
  );
}
