import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "#work", "#writing", "#about", "#contact"].map((path) => ({
    url: `${siteConfig.url}/${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = caseStudies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...workRoutes];
}
