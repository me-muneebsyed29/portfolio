"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SkySection } from "@/components/sky/sky-section";
import { PaperPlane } from "@/components/sky/doodles";
import { BookCall, Fill, getSrc, trackEvent } from "@/components/meta-ads/ui";
import { finalCta, sellOptions, spendBands } from "@/data/meta-ads";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* Same Web3Forms inbox as the homepage form. */
const WEB3FORMS_ACCESS_KEY = "5a81973b-6946-4089-829c-2370d3d97b5a";

type Status = "idle" | "sending" | "success" | "error";

const field = "h-11 rounded-xl border-white bg-white/80 focus-visible:bg-white";
const select =
  "h-11 w-full rounded-xl border border-white bg-white/80 px-3 text-sm text-foreground outline-none focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-ring/50";

/* 12. Final call to action, with the free video review behind a second
   button for colder prospects. */
export function FinalCta() {
  const [showForm, setShowForm] = useState(false);

  return (
    <SkySection
      id="contact"
      note={
        <span className="inline-flex items-end gap-2">
          <PaperPlane className="w-24 translate-y-2 rotate-[32deg] md:w-28" />
          {finalCta.chalk}
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
            Show me your <span className="marker">account.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-md text-body text-muted-foreground text-pretty">
            {finalCta.body}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3">
            <BookCall location="final" className="h-14 sm:w-fit" />
            <Button
              type="button"
              variant="outline"
              size="lg"
              aria-expanded={showForm}
              onClick={() => {
                setShowForm((v) => !v);
                if (!showForm) trackEvent("meta_ads_cta", { cta: "video_review_open", location: "final" });
              }}
              className="caps-label h-auto min-h-12 w-full rounded-full border-white bg-white/80 px-7 py-3 whitespace-normal hover:bg-white sm:w-fit md:hidden"
            >
              {showForm ? "Hide the form" : finalCta.reviewLabel}
            </Button>
            <p className="text-caption text-faint md:hidden">
              <Fill>{finalCta.reviewNote}</Fill>
            </p>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 border-t border-rule">
            {[
              { label: siteConfig.email, hint: "email", href: `mailto:${siteConfig.email}` },
              { label: "@muneebsyed29", hint: "LinkedIn", href: siteConfig.linkedin },
            ].map((row) => (
              <li key={row.hint}>
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => trackEvent("meta_ads_cta", { cta: row.hint.toLowerCase(), location: "final" })}
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
        </div>

        {/* Desktop: the review form sits beside the copy. */}
        <motion.div variants={fadeUp} className="hidden md:col-span-6 md:col-start-7 md:block">
          <div className="glass-card rounded-3xl p-7 md:p-8">
            <ReviewForm />
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
                <ReviewForm idPrefix="m-" />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </SkySection>
  );
}

function ReviewForm({ idPrefix = "" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const id = (name: string) => `${idPrefix}review-${name}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("src", getSrc());
    data.set("track", new URLSearchParams(window.location.search).get("track") ?? "");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        trackEvent("meta_ads_review_submit", {
          spend: String(data.get("monthly_meta_spend") ?? ""),
          sells: String(data.get("what_you_sell") ?? ""),
        });
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-xl font-bold tracking-[-0.02em] text-foreground">{finalCta.reviewLabel}</p>
        <p className="mt-1 text-caption text-muted-foreground">
          A recorded walkthrough of your account, <Fill>{finalCta.reviewNote}</Fill>.
        </p>
      </div>

      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="Meta Ads video review request" />
      <input type="hidden" name="from_name" value="muneebsyed29.com/meta-ads" />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("name")} className="caps-label text-faint">
            Your name
          </Label>
          <Input id={id("name")} name="name" required autoComplete="name" className={field} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("email")} className="caps-label text-faint">
            Work email
          </Label>
          <Input id={id("email")} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("website")} className="caps-label text-faint">
          Website
        </Label>
        <Input id={id("website")} name="website" type="url" required placeholder="https://" className={field} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("spend")} className="caps-label text-faint">
            Monthly Meta spend
          </Label>
          <select id={id("spend")} name="monthly_meta_spend" required defaultValue="" className={select}>
            <option value="" disabled>
              Pick a range
            </option>
            {spendBands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("sell")} className="caps-label text-faint">
            What you sell
          </Label>
          <select id={id("sell")} name="what_you_sell" required defaultValue="" className={select}>
            <option value="" disabled>
              Pick one
            </option>
            {sellOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("problem")} className="caps-label text-faint">
          What’s going wrong, in one line
        </Label>
        <Input
          id={id("problem")}
          name="message"
          required
          placeholder="Leads are cheap but sales says they’re junk…"
          className={field}
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"} className="caps-label h-12 w-full rounded-full">
        {status === "sending" && "Sending…"}
        {status === "success" && "Sent"}
        {status === "idle" && "Request my review"}
        {status === "error" && "Try again"}
      </Button>

      {status === "success" && (
        <p className="text-caption text-muted-foreground">Got it. I’ll look at the account and send you the video.</p>
      )}
      {status === "error" && (
        <p className="text-caption text-destructive">That didn’t go through. Email me at {siteConfig.email} instead.</p>
      )}
    </form>
  );
}
