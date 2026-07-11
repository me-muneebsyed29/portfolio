# muneebsyed29.com

Personal site for Muneeb Syed — AI-first Growth Operator. Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — routes (`/`, `/work/[slug]`), metadata, sitemap/robots, generated icon + OG image
- `components/sections/` — one component per homepage section
- `components/layout/` — nav, footer, container, section wrapper
- `components/ui/` — shadcn/ui primitives
- `data/` — typed content (wins, case studies, AI Lab, writing, philosophy) — edit these directly to update copy
- `lib/site-config.ts` — name, email, LinkedIn, booking link

## Content still to swap in

- `lib/site-config.ts` → `bookingUrl` — currently points at the contact section; replace with a real Cal.com/Calendly link once you have one.
- `data/case-studies.ts` — placeholder client names/metrics; replace with real client details, logos, and screenshots per engagement.
- `data/companies.ts` — text wordmarks for the ad platforms/tools; swap for real client logos in `public/logos` if desired.
- `data/writing.ts` — essay previews only; wire up to real posts/MDX when they exist.

## Deploy

Built for Vercel. Connect this repo, point `muneebsyed29.com` at the Vercel project (Vercel dashboard → Domains), and every push to `main` deploys automatically.

The legacy static site is preserved in `legacy-static-site/` for reference.
