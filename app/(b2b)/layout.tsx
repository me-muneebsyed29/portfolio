import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CalEmbed } from "@/components/cal-embed";

export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <CalEmbed />
    </ThemeProvider>
  );
}
