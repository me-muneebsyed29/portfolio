import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/data/case-studies";
import { essays } from "@/data/writing";

/*
 * Only real, crawlable URLs.
 *
 * Previously this also listed /#work, /#writing, /#about and /#contact. A
 * fragment is not a separate document — Google drops the hash and sees four
 * duplicates of the homepage, so a third of the file was noise.
 *
 * It also listed the B2C subdomain, which has no DNS record yet. A sitemap entry
 * that cannot be fetched is a hard error in Search Console. Add it back once
 * b2c.muneebsyed29.com resolves, and note that a cross-host entry is only
 * honoured when both hosts are verified on the same account.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, lastModified: new Date() },
    ...caseStudies.map((study) => ({
      url: `${siteConfig.url}/work/${study.slug}`,
      lastModified: new Date(),
    })),
    ...essays.map((essay) => ({
      url: `${siteConfig.url}/writing/${essay.slug}`,
      lastModified: new Date(essay.date),
    })),
  ];
}
