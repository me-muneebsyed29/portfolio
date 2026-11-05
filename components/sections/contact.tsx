"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioSection } from "@/components/studio/section";
import { RevealWords } from "@/components/studio/motion-text";
import { ContactForm } from "@/components/sections/contact-form";
import { brands } from "@/data/brands";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const rows = [
  { label: "Book a 30-min call", hint: "Fastest", href: siteConfig.bookingUrl },
  { label: siteConfig.email, hint: "Email", href: `mailto:${siteConfig.email}` },
  { label: "@muneebsyed29", hint: "LinkedIn", href: siteConfig.linkedin },
];

/*
 * The close. Desktop puts the ways to reach Muneeb beside the form, as large
 * ruled rows that fill with taupe on hover; phones lead with one big booking
 * button and tuck the form behind "Prefer to write?".
 */
export function Contact() {
  const [showForm, setShowForm] = useState(false);
  return (
    <StudioSection id="contact" index="08" label="Contact" note="see you on the other side">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="md:col-span-7"
        >
          <h2 className="font-display text-[3.2rem] leading-[0.95] text-balance text-foreground md:text-[5rem]">
            <RevealWords text="Let’s get your pipeline flying." emphasis={1} inView />
          </h2>
          <motion.p variants={fadeUp} className="mt-7 max-w-md text-body text-muted-foreground text-pretty">
            Tell me what you’re running and where it’s stuck. I’ll tell you honestly if I can help.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 text-caption text-faint">
            Trusted by Pella, JetLearn, Universal Robots and {brands.length - 3} others.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 md:hidden">
            <Button
              render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
              nativeButton={false}
              size="lg"
              className="caps-label h-14 w-full rounded-full text-[0.8rem]"
            >
              Book a 30-min call
            </Button>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 border-t border-border md:mt-14">
            {rows.map((row, i) => (
              <li key={row.hint} className={i === 0 ? "hidden md:block" : undefined}>
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-border py-5 md:py-6"
                >
                  {/* Taupe fill that rises from the rule on hover. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  />
                  <span className="font-display relative text-[1.5rem] leading-none text-foreground transition-[color,transform] duration-500 group-hover:translate-x-4 group-hover:text-primary-foreground md:text-[2rem]">
                    {row.label}
                  </span>
                  <span className="relative flex items-center gap-2 pr-0 text-caption text-faint transition-[color,transform] duration-500 group-hover:-translate-x-4 group-hover:text-primary-foreground">
                    <span className="caps-label">{row.hint}</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>

          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            className="caps-label link-draw mt-8 text-primary md:hidden"
          >
            {showForm ? "Hide the form" : "Prefer to write?"}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hidden md:col-span-5 md:block"
        >
          <div className="rounded-[1.25rem] border border-border bg-card p-8 lg:p-10">
            <p className="caps-label text-primary">Write to me</p>
            <div className="mt-6">
              <ContactForm />
            </div>
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
              <div className="rounded-[1.25rem] border border-border bg-card p-6">
                <ContactForm idPrefix="m-" />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </StudioSection>
  );
}
