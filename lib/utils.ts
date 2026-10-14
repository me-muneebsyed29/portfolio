import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Numbers get tabular figures; a qualitative stat value ("Steady", "Full ABM")
 * is not a figure, so it is set as a word rather than dressed up as data.
 */
export function isFigure(value: string) {
  return /\d/.test(value)
}

/* Lowercase a label to run on inside a sentence, but leave a leading acronym
   or platform name alone: "Net effective ROAS" → "net effective ROAS", while
   "ROAS" and "Google Ads ROAS" stay as they are. */
export function lowerFirst(label: string) {
  return /^([A-Z0-9]{2}|Google|Meta|LinkedIn|YouTube|TikTok)/.test(label)
    ? label
    : label.charAt(0).toLowerCase() + label.slice(1);
}
