"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { b2cConfig } from "@/lib/b2c-config";

/* Same Web3Forms inbox as the B2B site; the subject line is what separates the
   two streams, so leads land already tagged by which site they came from. */
const WEB3FORMS_ACCESS_KEY = "5a81973b-6946-4089-829c-2370d3d97b5a";

const SPEND_BANDS = [
  "Under $5K / month",
  "$5K – $25K / month",
  "$25K – $100K / month",
  "$100K+ / month",
  "Not running ads yet",
];

type Status = "idle" | "sending" | "success" | "error";

export function B2CContactForm() {
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
      <input type="hidden" name="subject" value="New B2C audit request — b2c.muneebsyed29.com" />
      <input type="hidden" name="from_name" value="B2C Site" />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="b2c-name">Name</Label>
          <Input id="b2c-name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b2c-email">Email</Label>
          <Input
            id="b2c-email"
            name="email"
            type="email"
            placeholder="you@brand.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="b2c-brand">Brand &amp; website</Label>
        <Input id="b2c-brand" name="brand" placeholder="Brand name and URL" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="b2c-spend">Monthly ad spend</Label>
        <select
          id="b2c-spend"
          name="monthly_ad_spend"
          required
          defaultValue=""
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="" disabled>
            Select a range
          </option>
          {SPEND_BANDS.map((band) => (
            <option key={band} value={band} className="bg-card text-foreground">
              {band}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="b2c-message">What&apos;s the problem you want solved?</Label>
        <Textarea
          id="b2c-message"
          name="message"
          placeholder="Where growth is stuck, what you've already tried, and what good would look like."
          required
          rows={5}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="h-11 w-full rounded-full font-semibold sm:w-auto sm:px-8"
      >
        {status === "sending" && "Sending…"}
        {status === "success" && "Request sent ✓"}
        {status === "idle" && b2cConfig.cta.primary}
        {status === "error" && "Try again"}
      </Button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "success" && (
          <span className="text-muted-foreground">
            Thanks — I&apos;ll come back to you within two working days.
          </span>
        )}
        {status === "error" && (
          <span className="text-destructive">
            Something went wrong. Email {b2cConfig.email} directly and I&apos;ll pick it up
            there.
          </span>
        )}
      </p>
    </form>
  );
}
