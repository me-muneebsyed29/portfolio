export const siteConfig = {
  name: "Muneeb Syed",
  role: "AI-first Growth Operator",
  title: "Muneeb Syed — AI-first Growth Systems for B2B SaaS",
  description:
    "Helping B2B SaaS companies build predictable pipeline through paid media, GTM systems, experimentation, and AI.",
  /* The www host, because that is the one that answers 200 — the apex
     308-redirects to it. Pointing canonicals, the sitemap and robots at the apex
     meant every URL Google fetched was a redirect, and it split signals between
     two hostnames. If you'd rather the apex be canonical, flip the redirect in
     Vercel → Domains first, then change this back. */
  url: "https://www.muneebsyed29.com",
  /* Public by design — it ships in the page source of every GA4 site. */
  gaMeasurementId: "G-06DS8V2DMQ",
  email: "hello@muneebsyed29.com",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/muneebsyed29",
  twitter: "",
  // TODO: replace with a real scheduling link (Cal.com / Calendly) — falls back to the contact section.
  bookingUrl: "#contact",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Writing", href: "#writing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
