import { siteConfig } from "@/lib/site-config";
import type { Essay } from "@/data/writing";
import type { CaseStudy } from "@/data/case-studies";

/*
 * Schema.org JSON-LD for the B2B site. The Person and WebSite nodes carry
 * stable @ids, so every article and breadcrumb can point back at the same
 * author and site instead of repeating them.
 */
const base = siteConfig.url;
export const PERSON_ID = `${base}/#person`;
export const WEBSITE_ID = `${base}/#website`;

/* Per-page share images get a hashed URL from Next, so structured data
   points at the stable site-wide one; each page's og:image tag still carries
   its own. */
const SITE_IMAGE = `${base}/opengraph-image`;

const abs = (path: string) => `${base}${path === "/" ? "" : path}`;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: siteConfig.name,
        jobTitle: `${siteConfig.role} for B2B SaaS`,
        url: base,
        image: `${base}/portrait.jpg`,
        email: siteConfig.email,
        address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
        knowsAbout: ["Paid media", "B2B SaaS growth", "Demand generation", "Performance marketing", "Marketing experimentation"],
        sameAs: [siteConfig.linkedin].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: base,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
      },
    ],
  };
}

/* Home is always the first crumb; pass the rest in order. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function essaySchema(essay: Essay) {
  const url = abs(`/writing/${essay.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: essay.title,
    description: essay.excerpt,
    datePublished: essay.date,
    dateModified: essay.date,
    image: SITE_IMAGE,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
}

export function caseStudySchema(study: CaseStudy) {
  const url = abs(`/work/${study.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: study.headline,
    description: study.oneLine,
    articleSection: "Case studies",
    image: SITE_IMAGE,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
}

/* Renders one JSON-LD block. `<` is escaped so content can never close the
   script tag early. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
