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
- `components/sky/` — the sky design: fixed cloud backdrop, glass sheet, chalk doodles, and the live nature finale (SVG hills + canvas grass, flowers, butterflies, birds)
- `components/ui/` — shadcn/ui primitives
- `data/` — typed content (brands, case studies, how I work, testimonials, lab, stack, writing, weather copy) — edit these directly to update copy
- `lib/site-config.ts` — name, email, LinkedIn, booking link

## Sky assets

`public/sky/` holds the pre-rendered cloud sprites (`cloud-1..5.webp`) and the avatar head cut out of its background (`avatar-head.webp`). The landscape at the end of every page is drawn in code (`components/sky/hills.tsx`, `components/sky/meadow-life.tsx`), so there is no photo to swap.

## Brand logos

The Brands wall shows each brand's name until a logo exists. Drop an SVG at `public/brands/<slug>.svg` (slugs are in `data/brands.ts`) and set `logo: true` on that brand. Hover notes (`note`) are also filled in there.

## Content still to swap in

- `data/case-studies.ts` — clients are anonymous; name them once cleared, and add each study's `lesson` (it renders as a handwritten note).
- `data/brands.ts` — logo files and the one-line hover notes.
- `data/writing.ts` — essay previews only; wire up to real posts/MDX when they exist.

## Deploy

Built for Vercel. Connect this repo, point `muneebsyed29.com` at the Vercel project (Vercel dashboard → Domains), and every push to `main` deploys automatically.

The legacy static site is preserved in `legacy-static-site/` for reference.
