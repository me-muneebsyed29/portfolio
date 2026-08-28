"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

const WEB3FORMS_ACCESS_KEY = "5a81973b-6946-4089-829c-2370d3d97b5a";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
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
          <Label htmlFor="name" className="mono-label text-faint">
            Name
          </Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="mono-label text-faint">
            Email
          </Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="mono-label text-faint">
          Company
        </Label>
        <Input id="company" name="company" placeholder="Your company" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="mono-label text-faint">
          Message
        </Label>
        <Textarea id="message" name="message" placeholder="What's on your mind?" required rows={5} />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mono-label h-11 w-full"
      >
        {status === "sending" && "Sending…"}
        {status === "success" && "Message sent"}
        {status === "idle" && "Send message"}
        {status === "error" && "Try again"}
      </Button>

      {status === "success" && (
        <p className="text-caption text-muted-foreground">
          Thanks — I&apos;ll get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-caption text-destructive">
          Something went wrong. Try emailing {siteConfig.email} directly.
        </p>
      )}
    </form>
  );
}
