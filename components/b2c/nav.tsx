"use client";

import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
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
import { b2cConfig } from "@/lib/b2c-config";
import { cn } from "@/lib/utils";

export function B2CNav() {
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
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-tight text-foreground transition-opacity group-hover:opacity-70">
            {b2cConfig.name}
          </span>
          <span className="font-mono-ui rounded-sm border border-primary/40 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary">
            B2C
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {b2cConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={b2cConfig.b2bUrl}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            B2B site
            <ArrowUpRight className="size-3.5" />
          </a>
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            size="lg"
            className="rounded-full px-5 font-semibold"
          >
            {b2cConfig.cta.primary}
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-border bg-background sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-foreground">{b2cConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1 px-6">
                {b2cConfig.nav.map((item) => (
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
                <a
                  href={b2cConfig.b2bUrl}
                  className="inline-flex items-center gap-1 border-b border-border py-4 text-lg text-muted-foreground"
                >
                  B2B site
                  <ArrowUpRight className="size-4" />
                </a>
              </nav>
              <div className="mt-8 px-6">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      render={<a href="#contact" />}
                      nativeButton={false}
                      className="w-full rounded-full font-semibold"
                    />
                  }
                >
                  {b2cConfig.cta.primary}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
}
