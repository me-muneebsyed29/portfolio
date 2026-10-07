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
