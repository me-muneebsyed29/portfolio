"use client";

import { motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/layout/section";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const links = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "LinkedIn", value: "@muneebsyed29", href: siteConfig.linkedin },
  { label: "Book a call", value: "30 min intro", href: siteConfig.bookingUrl },
];

export function Contact() {
  return (
    <Section id="contact">
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-6">
          <motion.div variants={fadeUp}>
            <Eyebrow index="08">Contact</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-lg text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-balance text-foreground md:text-h1"
          >
            Let&apos;s build something people remember.
          </motion.h2>

          <motion.dl variants={fadeUp} className="mt-12 border-t border-rule">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-5 transition-colors duration-200 hover:bg-panel"
              >
                <dt className="mono-label text-faint">{link.label}</dt>
                <dd className="text-caption text-foreground">{link.value}</dd>
              </a>
            ))}
          </motion.dl>
        </div>

        <motion.div variants={fadeUp} className="md:col-span-5 md:col-start-8">
          <div className="border-2 border-rule bg-panel p-7 md:p-8">
            <ContactForm />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
