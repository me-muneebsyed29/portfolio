import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { b2cConfig } from "@/lib/b2c-config";

export function B2CFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-foreground">{b2cConfig.name}</span>
            <span className="font-mono-ui rounded-sm border border-primary/40 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary">
              B2C
            </span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Senior-led paid media for consumer brands. {b2cConfig.markets}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <a
            href={`mailto:${b2cConfig.email}`}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {b2cConfig.email}
          </a>
          <a
            href={b2cConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            LinkedIn
            <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={b2cConfig.b2bUrl}
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            B2B SaaS work
            <ArrowUpRight className="size-3.5" />
          </a>
          <p className="text-muted-foreground/60">
            © {new Date().getFullYear()} {b2cConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
