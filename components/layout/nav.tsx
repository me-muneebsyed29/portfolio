"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/brand/wordmark";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/*
 * A floating glass pill rather than a bar, so the sky stays visible across the
 * top of the page. It firms up a little once the page scrolls and copy starts
 * passing underneath it.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:px-5 md:top-4"
    >
      <div
        className={cn(
          "glass mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between gap-8 rounded-full pr-2 pl-6 transition-colors duration-300 md:pr-2.5 md:pl-7",
          scrolled && "bg-white/75!"
        )}
      >
        <a
          href="#top"
          className="text-[17px] text-foreground transition-opacity hover:opacity-70"
          aria-label={`${siteConfig.name} — home`}
        >
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-caption uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
            nativeButton={false}
            size="sm"
            className="mono-label h-10 rounded-full px-5"
          >
            Book a Call
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-white/80 bg-white/80 backdrop-blur-2xl sm:max-w-sm"
            >
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="text-left text-[17px] text-foreground">
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col px-6">
                {siteConfig.nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <a
                        href={item.href}
                        className="border-b border-rule py-5 text-caption uppercase tracking-[0.16em] text-foreground"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-10 px-6">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
                      nativeButton={false}
                      className="mono-label h-12 w-full rounded-full"
                    />
                  }
                >
                  Book a Call
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
