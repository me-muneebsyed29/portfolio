# muneebsyed29.com

Personal site for Muneeb Syed — AI-first Growth Operator. Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — routes (`/`, `/work`, `/work/[slug]`, `/writing`), metadata, sitemap/robots, generated icon + OG image
- `components/sections/` — one component per homepage section
- `components/layout/` — nav, footer, container, section wrapper
- `components/studio/` — the studio design system: the ambient backdrop, the custom cursor, the section frame (numbered label, serif aside, drawn rule), the word-reveal and count-up animations, the line drawings, and the closing name block (`Finale`)
- `components/ui/` — shadcn/ui primitives
- `data/` — typed content (case studies, highlights, credentials, brands, how I work, testimonials, lab, stack, writing, weather copy) — edit these directly to update copy
  - `case-studies.ts` — full stories; `featured: true` puts one on the homepage, the rest live on `/work`
  - `highlights.ts` — one-number results too thin for a full story, shown under the case studies on `/work`
  - `credentials.ts` — certifications (badges in the hero and Hello, and `hasCredential` in the Person schema) and the career line
- `lib/site-config.ts` — name, email, LinkedIn, booking link

## Design system

The B2B site runs on four colours and nothing else, set as tokens in `app/globals.css` under "Studio system":

| Colour | Hex | Used for |
| --- | --- | --- |
| Charcoal Black | `#0C0C0C` | The ground |
| Dark Charcoal | `#2C2C2C` | Hairlines, quiet surfaces, pills |
| Dim Gray | `#4A4A4A` | Stronger rules, secondary tiles |
| Warm Taupe | `#BEA98E` | The one accent: figures, italic emphasis, the main button |

Type is a warm ivory (`#EFE9E0`) taken from the taupe. Headlines, big figures and quotes are set in Instrument Serif, with its italic in taupe for emphasis. Body copy and labels use Plus Jakarta Sans.

`public/portrait.jpg` is the hero portrait, and `assets/og-portrait.jpg` is the copy used for share images. The illustrated avatars in `public/sky/` are no longer used, but they are still in the repo.

The B2C sub-brand (`/b2c`, `components/b2c/`) has its own look and is not part of this system.

## Brands

The Brands marquee sets each brand's name in the serif. Hover notes (`note`) and case study links (`caseStudy`) are set in `data/brands.ts`.

## Content still to swap in

- `data/writing.ts` — essay previews only; wire up to real posts/MDX when they exist.

## Deploy

Built for Vercel. Connect this repo, point `muneebsyed29.com` at the Vercel project (Vercel dashboard → Domains), and every push to `main` deploys automatically.

The legacy static site is preserved in `legacy-static-site/` for reference.
