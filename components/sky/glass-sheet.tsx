import { cn } from "@/lib/utils";

/*
 * The translucent foreground: one continuous pane of frosted glass that every
 * section's copy sits on, with the sky moving behind it. A single pane rather
 * than a card per section, so the page reads as one surface held up in the
 * air, and the sky shows round its edges the whole way down.
 */
export function GlassSheet({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 sm:px-5">
      <div className={cn("glass mx-auto max-w-[1240px] rounded-[2rem] md:rounded-[2.5rem]", className)}>
        {children}
      </div>
    </div>
  );
}
