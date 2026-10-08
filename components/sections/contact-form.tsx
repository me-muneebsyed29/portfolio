"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

const WEB3FORMS_ACCESS_KEY = "5a81973b-6946-4089-829c-2370d3d97b5a";

type Status = "idle" | "sending" | "success" | "error";

/* Copy from the sky direction doc. `idPrefix` keeps ids unique when the
   phone and desktop versions of the form are both in the page. */
export function ContactForm({ idPrefix = "" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
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
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New lead from muneebsyed29.com" />
      <input type="hidden" name="from_name" value="Portfolio Website" />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}name`} className="caps-label text-faint">
            Your name
          </Label>
          <Input id={`${idPrefix}name`} name="name" placeholder="Muneeb" required className="h-11 rounded-xl border-white bg-white/80 focus-visible:bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}email`} className="caps-label text-faint">
            Work email
          </Label>
          <Input id={`${idPrefix}email`} name="email" type="email" placeholder="you@company.com" required className="h-11 rounded-xl border-white bg-white/80 focus-visible:bg-white" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}company`} className="caps-label text-faint">
          Company
        </Label>
        <Input id={`${idPrefix}company`} name="company" placeholder="Where you work" className="h-11 rounded-xl border-white bg-white/80 focus-visible:bg-white" />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}message`} className="caps-label text-faint">
          What’s going on?
        </Label>
        <Textarea
          id={`${idPrefix}message`}
          name="message"
          placeholder="We spend $20K a month on LinkedIn and CAC keeps climbing…"
          required
          rows={5}
          className="rounded-xl border-white bg-white/80 focus-visible:bg-white"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="caps-label h-12 w-full rounded-full"
      >
        {status === "sending" && "Sending…"}
        {status === "success" && "Sent"}
        {status === "idle" && "Send it"}
        {status === "error" && "Try again"}
      </Button>

      {status === "success" && (
        <p className="text-caption text-muted-foreground">
          Got it. I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-caption text-destructive">
          That didn&apos;t go through. Email me at {siteConfig.email} instead.
        </p>
      )}
    </form>
  );
}
