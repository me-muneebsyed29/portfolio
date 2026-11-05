import { cn } from "@/lib/utils";

/* 1280px content column with a 24px gutter on phones and 40px from tablet up.
   The backdrop's column rules sit on the same box, so the grid lines and the
   copy share edges. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
