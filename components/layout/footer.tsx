import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/brand/wordmark";
import { Monogram } from "@/components/brand/monogram";
import { siteConfig } from "@/lib/site-config";

/* The full wordmark closes the page, per "Full name: letterhead, deck cover,
   case study header, site footer." Contact lines are mono, flush left. */
export function Footer() {
  return (
    <footer className="border-t-2 border-rule py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[17px] text-foreground">
              <Wordmark variant="full" />
            </p>
            <p className="mono-label mt-3 text-muted-foreground">
              {siteConfig.role} · Bengaluru
            </p>
          </div>

          <div className="flex flex-col gap-3 text-caption md:items-end">
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
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between border-t border-rule pt-6">
          <p className="mono-label text-faint">
            © {new Date().getFullYear()} · Muneebsyed29.com
          </p>
          <Monogram size={24} className="text-muted-foreground" />
        </div>
      </Container>
    </footer>
  );
}
