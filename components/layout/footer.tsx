import { ChalkNote } from "@/components/sky/sky-section";
import { siteConfig } from "@/lib/site-config";

/* A slim pane of glass floating over the hills in the nature finale. Slim on
   purpose: the landscape is the last thing the page has to say. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-3 sm:px-5">
      <div className="mx-auto max-w-[1240px]">
        <ChalkNote className="mr-6 mb-3 ml-auto rotate-2 md:mr-10">thanks for scrolling this far</ChalkNote>
        <div className="glass flex flex-col gap-5 rounded-[1.75rem] px-6 py-5 md:flex-row md:items-center md:justify-between md:rounded-full md:px-8">
          <p className="text-caption text-muted-foreground">
            <strong className="font-bold text-foreground">{siteConfig.name}</strong> · {siteConfig.role} ·{" "}
            Bengaluru
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-caption">
            <a href={`mailto:${siteConfig.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
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
            <a href="#" className="font-semibold text-primary">
              Back up to the clouds ↑
            </a>
            <p className="text-faint">
              © {year} {siteConfig.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
