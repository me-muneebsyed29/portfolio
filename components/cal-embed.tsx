"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ensureCal, openBooking } from "@/lib/booking";
import { EASE } from "@/lib/motion";

/*
 * Floating Book a call, opening Cal.com's booking popup in place.
 *
 * Cal's own floatingButton renders inside a closed shadow root that only takes a
 * fill colour and a label, so the button is ours (the same blue pill and mono
 * label as the nav CTA) and Cal only supplies the modal it opens. The popup and
 * its tracking live in lib/booking.ts, shared with every other booking button.
 */

export function CalEmbed() {
  const [visible, setVisible] = useState(false);

  /* Loads embed.js after hydration, so the popup is ready on first click. */
  useEffect(() => {
    ensureCal();
  }, []);

  /* Desktop: the hero already has a booking button, so the floating one
     appears once that has scrolled out of view. Phones: the pill is always
     there, one thumb away, as the sky direction doc asks. */
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const onScroll = () => setVisible(phone.matches || window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: EASE }}
          /* z-40 keeps it under the header and the mobile menu sheet (z-50). */
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center md:inset-x-auto md:right-8 md:bottom-8"
        >
          <Button
            onClick={() => openBooking("floating")}
            size="lg"
            className="caps-label pointer-events-auto h-12 rounded-full border-2 border-white px-6 shadow-[0_14px_30px_-12px_rgba(22,104,227,0.8)]"
          >
            Book a call
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
