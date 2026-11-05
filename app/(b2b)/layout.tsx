import type { Viewport } from "next";
import { Nav } from "@/components/layout/nav";
import { CalEmbed } from "@/components/cal-embed";
import { StudioBackdrop } from "@/components/studio/backdrop";
import { StudioCursor } from "@/components/studio/cursor";
import { JsonLd, siteGraph } from "@/lib/structured-data";

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
};

/*
 * The studio system: charcoal black, dark charcoal, dim gray and warm taupe.
 * The `.studio` class switches the token set (globals.css), and `isolate`
 * keeps the fixed backdrop's negative z-index inside this tree. Each page
 * ends itself with <Finale>, since only the home page puts copy in it.
 */
export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="top" className="studio relative isolate flex min-h-screen flex-col">
      {/* Who the site is by and what it is. Lives here rather than in the
          root layout so the B2C site, which has its own, doesn't inherit it. */}
      <JsonLd data={siteGraph()} />
      <StudioBackdrop />
      <Nav />
      <main className="flex-1">{children}</main>
      <CalEmbed />
      <StudioCursor />
    </div>
  );
}
