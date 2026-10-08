import { Nav } from "@/components/layout/nav";
import { CalEmbed } from "@/components/cal-embed";
import { SkyBackdrop } from "@/components/sky/sky-backdrop";
import { PlaneCursor } from "@/components/sky/plane-cursor";
import { WEATHER_SCRIPT } from "@/lib/weather-script";
import { JsonLd, siteGraph } from "@/lib/structured-data";

/*
 * The sky system: always daylight, in sunny, rainy or snowy weather (see
 * lib/weather.ts). The `.sky` class switches the token set (globals.css), and `isolate`
 * keeps the fixed sky's negative z-index inside this tree. Each page ends
 * itself with <NatureFinale>, since only the home page puts copy over it.
 */
export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="sky relative isolate flex min-h-screen flex-col">
      {/* Applies the remembered weather before the sky paints. */}
      <script dangerouslySetInnerHTML={{ __html: WEATHER_SCRIPT }} />
      {/* Who the site is by and what it is. Lives here rather than in the
          root layout so the B2C site, which has its own, doesn't inherit it. */}
      <JsonLd data={siteGraph()} />
      <SkyBackdrop />
      <Nav />
      <main className="flex-1">{children}</main>
      <CalEmbed />
      <PlaneCursor />
    </div>
  );
}
