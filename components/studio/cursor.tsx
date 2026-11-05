"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/*
 * A two-part cursor: a small taupe dot that sits exactly on the pointer, and a
 * hairline ring that trails it on a spring. Over anything clickable the ring
 * opens up and takes a faint taupe wash; on press it tightens.
 *
 * Mouse devices only. Touch, pen and reduced-motion visitors keep the native
 * pointer and never mount any of this.
 */
const INTERACTIVE = "a, button, summary, label, [role='button'], input[type='submit'], [data-cursor]";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribeFine(callback: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function StudioCursor() {
  const reduceMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false
  );
  const enabled = finePointer && !reduceMotion;
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("studio-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHover(!!target?.closest?.(INTERACTIVE));
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("studio-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = hover ? 56 : 32;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute top-0 left-0 rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          borderColor: hover ? "rgba(190,169,142,0.9)" : "rgba(190,169,142,0.45)",
          backgroundColor: hover ? "rgba(190,169,142,0.08)" : "rgba(190,169,142,0)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute top-0 left-0 size-[6px] rounded-full bg-[#bea98e]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hover ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
