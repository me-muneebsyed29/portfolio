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
import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/brand/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/*
 * Site header per the Marks sheet: short wordmark at 17px, flush left, with the
 * URL closing the bar. On scroll the header takes the ground colour and a 2px
 * rule — the system's separator — rather than the blur-and-shadow treatment it
 * forbids.
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
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled ? "border-b-2 border-rule bg-background" : "border-b-2 border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-8">
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
          <ThemeToggle />
          <Button
            render={<a href={siteConfig.bookingUrl} />}
            nativeButton={false}
            size="sm"
            className="mono-label h-9 px-4"
          >
            Book a Call
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l-2 border-rule bg-background sm:max-w-sm"
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
                      render={<a href={siteConfig.bookingUrl} />}
                      nativeButton={false}
                      className="mono-label h-11 w-full"
                    />
                  }
                >
                  Book a Call
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
}
