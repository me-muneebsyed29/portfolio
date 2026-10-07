import { Wordmark } from "@/components/brand/wordmark";
import { Monogram } from "@/components/brand/monogram";
import { siteConfig } from "@/lib/site-config";

/* The full wordmark closes the page on a slim pane of glass, floating over the
   hills in the nature finale. Slim on purpose: the landscape is the last
   thing the page has to say. */
export function Footer() {
  return (
    <footer className="px-3 sm:px-5">
      <div className="glass mx-auto flex max-w-[1240px] flex-col gap-5 rounded-[1.75rem] px-6 py-5 md:flex-row md:items-center md:justify-between md:rounded-full md:px-8">
        <div className="flex items-center gap-4">
          <Monogram size={28} className="text-foreground" />
          <div>
            <p className="text-[15px] text-foreground">
              <Wordmark variant="full" />
            </p>
            <p className="mono-label mt-1.5 text-muted-foreground">
              {siteConfig.role} · Bengaluru
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-caption">
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
          <p className="mono-label text-faint">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
