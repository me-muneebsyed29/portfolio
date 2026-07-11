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
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="text-[15px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            render={<a href={siteConfig.bookingUrl} />}
            nativeButton={false}
            size="sm"
            className="rounded-full px-5"
          >
            Book a Call
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-l border-border bg-background sm:max-w-sm"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-foreground">
                {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1 px-6">
              {siteConfig.nav.map((item) => (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={
                    <a
                      href={item.href}
                      className="border-b border-border py-4 text-lg text-foreground/90"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-8 px-6">
              <SheetClose
                nativeButton={false}
                render={
                  <Button
                    render={<a href={siteConfig.bookingUrl} />}
                    nativeButton={false}
                    className="w-full rounded-full"
                  />
                }
              >
                Book a Call
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </motion.header>
  );
}
