"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/*
 * The fixed sky behind the whole B2B site. Three cloud depths drift sideways
 * on long CSS loops and slide up at different rates as the page scrolls, which
 * is what gives the glass in front of them a sense of altitude.
 *
 * Cloud sprites are pre-rendered (public/sky/cloud-*.webp) rather than drawn
 * live: five images cost less than one blur filter per frame, and they keep
 * their softness on every GPU.
 *
 * Each cloud's `x` is both its reduced-motion resting place and the phase of
 * its drift loop, so the static sky and the moving one look like the same sky.
 */
type Cloud = {
  src: number;
  /* vw from the left edge, and vh from the top of its layer */
  x: number;
  y: number;
  width: string;
  duration: number;
  opacity?: number;
};

const far: Cloud[] = [
  { src: 3, x: 8, y: 6, width: "min(34vw, 520px)", duration: 420, opacity: 0.55 },
  { src: 2, x: 62, y: 22, width: "min(26vw, 380px)", duration: 380, opacity: 0.5 },
  { src: 4, x: 30, y: 74, width: "min(22vw, 320px)", duration: 460, opacity: 0.5 },
  { src: 1, x: 84, y: 96, width: "min(30vw, 440px)", duration: 400, opacity: 0.45 },
];

const mid: Cloud[] = [
  { src: 1, x: -6, y: 30, width: "min(46vw, 720px)", duration: 300, opacity: 0.85 },
  { src: 5, x: 58, y: 58, width: "min(40vw, 620px)", duration: 260, opacity: 0.8 },
  { src: 2, x: 20, y: 110, width: "min(36vw, 560px)", duration: 280, opacity: 0.8 },
];

const near: Cloud[] = [
  { src: 3, x: 70, y: 4, width: "min(60vw, 980px)", duration: 210 },
  { src: 5, x: -14, y: 88, width: "min(56vw, 900px)", duration: 190 },
  { src: 4, x: 46, y: 140, width: "min(44vw, 700px)", duration: 230 },
];

function CloudLayer({ clouds }: { clouds: Cloud[] }) {
  return (
    <>
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="animate-drift absolute left-0 motion-reduce:animate-none"
          style={
            {
              top: `${cloud.y}vh`,
              width: cloud.width,
              opacity: cloud.opacity ?? 1,
              "--drift-duration": `${cloud.duration}s`,
              /* A negative delay starts the loop part-way through, at the
                 point where the cloud sits at its resting `x`. */
              "--drift-delay": `${-cloud.duration * ((cloud.x + 50) / 150)}s`,
              transform: `translateX(${cloud.x}vw)`,
            } as React.CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative
              sprite inside a CSS loop; next/image adds nothing here. */}
          <img
            src={`/sky/cloud-${cloud.src}.webp`}
            alt=""
            draggable={false}
            className="block h-auto w-full select-none"
          />
        </div>
      ))}
    </>
  );
}

export function SkyBackdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const farY = useTransform(scrollYProgress, [0, 1], ["0vh", "-12vh"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0vh", "-90vh"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Zenith to horizon. Kept to three close blues so it reads as sky, not
          as a gradient treatment. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#1f7fe8_0%,#3d97f0_38%,#79bbf7_78%,#a9d5fd_100%)]" />
      {/* Sun haze, top right, where the light on the clouds comes from. */}
      <div className="absolute -top-[20vh] -right-[10vw] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(255,250,225,0.55)_0%,rgba(255,250,225,0.18)_35%,transparent_70%)]" />

      <motion.div className="absolute inset-x-0 top-0 h-[140vh]" style={{ y: reduceMotion ? 0 : farY }}>
        <CloudLayer clouds={far} />
      </motion.div>
      <motion.div className="absolute inset-x-0 top-0 h-[170vh]" style={{ y: reduceMotion ? 0 : midY }}>
        <CloudLayer clouds={mid} />
      </motion.div>
      <motion.div className="absolute inset-x-0 top-0 h-[220vh]" style={{ y: reduceMotion ? 0 : nearY }}>
        <CloudLayer clouds={near} />
      </motion.div>
    </div>
  );
}
