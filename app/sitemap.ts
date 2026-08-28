import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/data/case-studies";
import { b2cConfig } from "@/lib/b2c-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "#work", "#writing", "#about", "#contact"].map((path) => ({
    url: `${siteConfig.url}/${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = caseStudies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    lastModified: new Date(),
  }));

  // The B2C subdomain shares this deployment, so it has no sitemap of its own.
  // Listing it here is what gets it discovered — both hosts need to be verified
  // in Search Console for a cross-host entry to be honoured.
  const b2cRoutes = [{ url: b2cConfig.url, lastModified: new Date() }];

  return [...routes, ...workRoutes, ...b2cRoutes];
}
