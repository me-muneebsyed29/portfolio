import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 02 / TYPE reserves the mono face for figures — "every number, everywhere".
 * A qualitative stat value ("Steady", "Enterprise ABM") is not a figure, so it
 * stays in the display face rather than being dressed up as data.
 */
export function isFigure(value: string) {
  return /\d/.test(value)
}
