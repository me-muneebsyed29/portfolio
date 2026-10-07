"use client";

import { useSyncExternalStore } from "react";
import { WEATHER_STORAGE_KEY } from "./weather-script";

/*
 * The sky site's weather: sunny, cloudy or snowy. Lives on <html data-weather>
 * so CSS can restyle the sky, clouds, glass and hills without React, and in
 * this tiny store so the canvases (rain, snow, the meadow) can follow along.
 *
 * The visitor's choice is remembered in localStorage and applied by an inline
 * script before first paint (lib/weather-script.ts), so a cloudy visitor never
 * sees a flash of sunshine on reload.
 */
export type Weather = "sunny" | "cloudy" | "snowy";

export const WEATHERS: Weather[] = ["sunny", "cloudy", "snowy"];

const listeners = new Set<() => void>();

function isWeather(value: unknown): value is Weather {
  return value === "sunny" || value === "cloudy" || value === "snowy";
}

export function getWeather(): Weather {
  if (typeof document === "undefined") return "sunny";
  const value = document.documentElement.dataset.weather;
  return isWeather(value) ? value : "sunny";
}

export function setWeather(weather: Weather) {
  document.documentElement.dataset.weather = weather;
  try {
    localStorage.setItem(WEATHER_STORAGE_KEY, weather);
  } catch {
    /* Private mode or blocked storage: the choice just won't persist. */
  }
  listeners.forEach((listener) => listener());
}

export function subscribeWeather(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useWeather() {
  return useSyncExternalStore(subscribeWeather, getWeather, () => "sunny" as Weather);
}
