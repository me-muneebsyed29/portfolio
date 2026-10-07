"use client";

import { CloudRain, Snowflake, Sun } from "lucide-react";
import { setWeather, useWeather, type Weather } from "@/lib/weather";
import { cn } from "@/lib/utils";

const options: { value: Weather; label: string; Icon: typeof Sun }[] = [
  { value: "sunny", label: "Sunny", Icon: Sun },
  { value: "rainy", label: "Rainy", Icon: CloudRain },
  { value: "snowy", label: "Snowy", Icon: Snowflake },
];

/*
 * Three-way weather switch in the nav. A radio group rather than a cycling
 * button, so every option is visible and reachable by keyboard, and the
 * current one is announced.
 */
export function WeatherToggle({ className }: { className?: string }) {
  const weather = useWeather();
  const index = options.findIndex((o) => o.value === weather);

  return (
    <div
      role="radiogroup"
      aria-label="Weather"
      className={cn("relative flex items-center rounded-full bg-white/55 p-1 ring-1 ring-white/80", className)}
    >
      {/* One indicator that slides under the active option. Plain CSS rather
          than a shared-layout animation, which misplaces itself inside a fixed
          header once the page has scrolled. */}
      <span
        aria-hidden
        className="absolute top-1 left-1 size-8 rounded-full bg-primary shadow-[0_6px_14px_-6px_rgba(22,104,227,0.9)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${index * 2}rem)` }}
      />
      {options.map(({ value, label, Icon }) => {
        const active = weather === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setWeather(value)}
            className={cn(
              "relative flex size-8 items-center justify-center rounded-full transition-colors duration-200",
              active ? "text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="relative size-4" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
