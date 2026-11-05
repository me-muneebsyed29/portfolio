import { cn } from "@/lib/utils";

/*
 * Wordmark. The name in Cormorant Garamond, upright, with a taupe full stop as
 * the one accent in the mark. `short` is the first name only, for tight
 * spaces; `full` is the whole name, for the header and footer.
 */
export function Wordmark({
  variant = "full",
  accent = true,
  className,
}: {
  variant?: "short" | "full";
  accent?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("font-display inline-block leading-none tracking-[-0.01em]", className)}>
      {variant === "full" ? "Muneeb Syed" : "Muneeb"}
      <span className={accent ? "text-primary" : undefined}>.</span>
    </span>
  );
}
