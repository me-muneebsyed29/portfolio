import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.role}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
            <ArrowUpRight className="size-3.5" />
          </a>
          <p className="text-muted-foreground/70">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
