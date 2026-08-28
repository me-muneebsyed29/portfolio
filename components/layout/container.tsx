import { cn } from "@/lib/utils";

/* 03 / STRUCTURE: 1128px content column, 56px outer margin on documents.
   Everything inside sits flush left — the grid is never centred. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1128px] px-6 md:px-14", className)}>
      {children}
    </div>
  );
}
