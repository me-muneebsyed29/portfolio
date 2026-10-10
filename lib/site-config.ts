export const siteConfig = {
  name: "Muneeb Syed",
  /* One name everywhere: "Muneeb Syed" in type, "Muneeb" in casual lines. */
  role: "Growth operator",
  /* The search title. "Growth operator" is the voice on the page, but people
     search for paid media and growth help, so the title leads with that. */
  title: "Muneeb Syed · B2B SaaS paid media and growth consultant",
  description:
    "I help B2B SaaS teams turn ad spend into pipeline they can plan around. Sharper systems, faster tests, and AI doing the grunt work.",
  /* The www host, because that is the one that answers 200 — the apex
     308-redirects to it. Pointing canonicals, the sitemap and robots at the apex
     meant every URL Google fetched was a redirect, and it split signals between
     two hostnames. If you'd rather the apex be canonical, flip the redirect in
     Vercel → Domains first, then change this back. */
  url: "https://www.muneebsyed29.com",
  /* Google Tag Manager container. Public by design: it ships in the page
     source. GA4 (G-06DS8V2DMQ) and every other tag are managed inside it. */
  gtmId: "GTM-TJJSN2RR",
  email: "hello@muneebsyed29.com",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/muneebsyed29",
  twitter: "",
  bookingUrl: "https://cal.com/muneebsyed29/30min",
  /* Rooted at "/" so they also work from case study and essay pages. Contact
     is the Book a call button; About is the last scroll. */
  nav: [
    { label: "Work", href: "/#work" },
    { label: "How I work", href: "/#how-i-work" },
    { label: "Lab", href: "/#lab" },
    { label: "Writing", href: "/#writing" },
  ],
} as const;
