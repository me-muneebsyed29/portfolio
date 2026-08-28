"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/*
 * Which icon shows is decided in CSS off the `.dark` class rather than by a
 * mounted flag in React. next-themes sets that class before first paint, so the
 * correct icon is right on the server render too — no hydration guard, no
 * setState in an effect, and no flash of the wrong glyph.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden size-4.5 dark:block" strokeWidth={1.5} />
      <Moon className="size-4.5 dark:hidden" strokeWidth={1.5} />
    </Button>
  );
}
