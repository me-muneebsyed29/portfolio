import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site-config";

/* A single hairline row under the closing name. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-caption text-muted-foreground">
            <span className="text-foreground">{siteConfig.name}</span> · {siteConfig.role} · Bengaluru
          </p>
          <p className="font-display mt-1 text-[1.1rem] text-faint italic">thanks for scrolling this far</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-caption">
          <a href={`mailto:${siteConfig.email}`} className="link-draw text-muted-foreground hover:text-foreground">
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-draw text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </a>
          <Link href="#top" className="link-draw text-primary">
            Back to top ↑
          </Link>
          <p className="text-faint">
            © {year} {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
