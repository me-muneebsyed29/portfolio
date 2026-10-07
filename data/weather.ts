import type { Weather } from "@/lib/weather";

/*
 * The weather is a metaphor for growth conditions: sun means scale, clouds
 * mean test, snow means something is frozen. Each state swaps the hero's
 * sticky note and the chalk caption under the toggle, never the main copy.
 */
export const weatherCopy: Record<Weather, { label: string; caption: string; sticky: string }> = {
  sunny: {
    label: "Sunny",
    caption: "clear skies. time to scale.",
    sticky: "Good strategy, brighter days :)",
  },
  cloudy: {
    label: "Cloudy",
    caption: "bit cloudy. ship more tests.",
    sticky: "Cloudy data? Let’s clear it up.",
  },
  snowy: {
    label: "Snowy",
    caption: "frozen pipeline? let’s thaw it.",
    sticky: "Cold leads warm up with the right message.",
  },
};
