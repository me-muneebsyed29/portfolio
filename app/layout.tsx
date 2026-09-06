import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/* Brand sheet rev 02 / TYPE. Space Grotesk carries every word, JetBrains Mono
   carries every number — no overlap and no exceptions. Rev 02 replaced
   Instrument Sans in both roles; Space Mono was tested as the companion and
   rejected, because the mono has to stay neutral when the number is the
   argument. No third face exists — the signature mark is drawn, not typeset. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  /* 700 is the display weight; 400-600 cover body. */
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "B2B SaaS growth",
    "paid media",
    "AI GTM",
    "growth marketing",
    "demand generation",
    "performance marketing",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  /* Explicit canonical. Without it the page emitted none, which left Google to
     pick between the apex and www itself. */
  alternates: { canonical: siteConfig.url },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [siteConfig.linkedin].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Each site tree owns its own ThemeProvider: the B2B portfolio is
            dark by default with a toggle, B2C is always dark with none. A
            single root provider could only impose one of those. */}
        <Analytics />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
