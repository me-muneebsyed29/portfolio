import Link from "next/link";
import { SkyBackdrop } from "@/components/sky/sky-backdrop";
import { ChalkNote } from "@/components/sky/sky-section";
import { WEATHER_SCRIPT } from "@/lib/weather-script";

/* A lost page is just a cloud that drifted off. Carries its own sky, since
   unmatched URLs render outside the B2B layout. */
export default function NotFound() {
  return (
    <div className="sky relative isolate flex min-h-screen flex-col items-center justify-center px-4">
      <script dangerouslySetInnerHTML={{ __html: WEATHER_SCRIPT }} />
      <SkyBackdrop />
      <ChalkNote className="mb-4">404, but make it scenic</ChalkNote>
      <div className="glass w-full max-w-lg rounded-[2rem] px-8 py-12 text-center md:px-12">
        <h1 className="text-[2.4rem] leading-[1.05] font-bold tracking-[-0.03em] text-foreground">
          This page drifted off.
        </h1>
        <Link
          href="/"
          className="caps-label mt-8 inline-flex h-12 items-center rounded-full bg-primary px-7 text-primary-foreground shadow-[0_10px_24px_-10px_rgba(22,104,227,0.8)]"
        >
          Head back home
        </Link>
      </div>
    </div>
  );
}
