import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/*
 * One place to build a page's metadata, so the search title, the social card
 * and the canonical always agree. Next replaces a parent's openGraph and
 * twitter objects wholesale rather than merging them, so a page that sets
 * only `title` and `description` would otherwise share the homepage's card
 * on LinkedIn and X. Share images still come from each route's
 * opengraph-image file.
 *
 * Titles get " · Muneeb Syed" from the root template; keep `title` under
 * about 46 characters so the whole thing fits in a Google result.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      ...(publishedTime ? { publishedTime, authors: [siteConfig.name] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
