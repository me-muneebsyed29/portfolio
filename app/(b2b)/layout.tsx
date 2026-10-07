import { Nav } from "@/components/layout/nav";
import { CalEmbed } from "@/components/cal-embed";
import { SkyBackdrop } from "@/components/sky/sky-backdrop";

/*
 * The sky system: always daylight, so there is no theme provider or toggle.
 * The `.sky` class switches the token set (see globals.css), and `isolate`
 * keeps the fixed sky's negative z-index inside this tree. Each page ends
 * itself with <NatureFinale>, since only the home page puts copy over it.
 */
export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="sky relative isolate flex min-h-screen flex-col">
      <SkyBackdrop />
      <Nav />
      <main className="flex-1">{children}</main>
      <CalEmbed />
    </div>
  );
}
