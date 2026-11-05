import { PlatformLogo } from "@/components/brand/platform-logos";
import { certifications } from "@/data/credentials";
import { cn } from "@/lib/utils";

/*
 * Platform certifications as small badges. `withIds` shows the credential
 * IDs, so anyone can check them; the compact form is just the platforms.
 */
export function CertBadges({ withIds = false, className }: { withIds?: boolean; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Certifications">
      {certifications.map((cert) => (
        <li
          key={cert.name}
          className="flex items-center gap-2 rounded-full border border-border py-1.5 pr-3.5 pl-2.5 text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-foreground"
        >
          <PlatformLogo id={cert.platform} className="size-4 shrink-0" />
          <span className="text-caption font-medium">{withIds ? cert.name : `${cert.short} certified`}</span>
          {withIds && cert.id ? <span className="figures text-[0.7rem] text-faint">ID {cert.id}</span> : null}
        </li>
      ))}
    </ul>
  );
}
