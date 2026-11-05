import Link from "next/link";
import { StudioBackdrop } from "@/components/studio/backdrop";

/* A lost page, set like a closing card. Carries its own backdrop, since
   unmatched URLs render outside the B2B layout. */
export default function NotFound() {
  return (
    <div className="studio relative isolate flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <StudioBackdrop />
      <p className="caps-label text-primary">Error 404</p>
      <h1 className="font-display mt-6 text-[3.5rem] leading-[0.95] text-foreground md:text-[5.5rem]">
        This page <span className="em-taupe">drifted off.</span>
      </h1>
      <p className="mt-6 max-w-sm text-body text-muted-foreground">
        The link may be old, or the page moved. Everything worth reading is one click away.
      </p>
      <Link
        href="/"
        className="caps-label mt-10 inline-flex h-12 items-center rounded-full bg-primary px-8 text-primary-foreground transition-[background-color,box-shadow] duration-500 hover:bg-[#cdbaa0] hover:shadow-[0_0_40px_-8px_rgba(190,169,142,0.6)]"
      >
        Head back home
      </Link>
    </div>
  );
}
