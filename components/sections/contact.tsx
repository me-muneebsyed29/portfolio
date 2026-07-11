"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/layout/section";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const links = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "LinkedIn", value: "@muneebsyed29", href: siteConfig.linkedin },
  { label: "Book a call", value: "30 min intro call", href: siteConfig.bookingUrl },
];

export function Contact() {
  return (
    <Section id="contact" className="pb-32 md:pb-48">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-16 md:grid-cols-12"
      >
        <div className="md:col-span-7">
          <motion.div variants={fadeUp}>
            <Eyebrow>Contact</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-medium text-balance text-foreground sm:text-4xl md:text-section"
          >
            Let&apos;s build something people remember.
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-12 space-y-6 border-t border-border pt-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between border-b border-border pb-6 text-lg"
              >
                <span className="text-muted-foreground">{link.label}</span>
                <span className="inline-flex items-center gap-2 font-medium text-foreground">
                  {link.value}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="md:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <ContactForm />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
