"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
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
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * A quiet bar across the top. Transparent over the hero, then it takes a
 * smoked-glass fill and a hairline once copy starts passing underneath. A
 * taupe line along its bottom edge tracks how far down the page you are.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-border bg-[#0c0c0c]/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-8 px-6 md:h-[4.5rem] md:px-10">
        <Link
          href="/"
          className="text-[1.6rem] text-foreground transition-opacity hover:opacity-75"
          aria-label={`${siteConfig.name}, home`}
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-draw text-[0.9rem] text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
            nativeButton={false}
            variant="outline"
            className="caps-label h-10 rounded-full border-primary/50 bg-transparent px-5 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Book a call
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open menu"
                className="group flex size-10 flex-col items-end justify-center gap-[7px] md:hidden"
              />
            }
          >
            <span className="h-px w-6 bg-foreground" />
            <span className="h-px w-4 bg-foreground transition-all group-hover:w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full border-l border-border bg-[#0c0c0c] sm:max-w-sm">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle className="text-left text-[1.6rem] text-foreground">
                <Wordmark />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-10 flex flex-col px-6">
              {siteConfig.nav.map((item, i) => (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 border-b border-border py-5 text-foreground"
                    />
                  }
                >
                  <span className="figures caps-label text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[2.25rem] leading-none">{item.label}</span>
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
                    className="caps-label h-12 w-full rounded-full"
                  />
                }
              >
                Book a call
              </SheetClose>
              <p className="mt-6 text-caption text-faint">{siteConfig.email}</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-primary/70"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
