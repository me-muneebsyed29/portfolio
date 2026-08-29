/*
 * Monochrome platform marks, drawn as inline SVG on a 24×24 box and filled with
 * currentColor so they take the ground's text colour and invert with the theme.
 *
 * Single-colour and simplified on purpose: the brand system runs achromatic, and
 * a wall of eight full-colour vendor logos would put eight competing accents on
 * one frame. Nominative use — these are the platforms the work runs on.
 */
export type PlatformId =
  | "google-ads"
  | "meta"
  | "linkedin"
  | "hubspot"
  | "salesforce"
  | "amplitude"
  | "segment"
  | "webflow";

export function PlatformLogo({
  id,
  className,
}: {
  id: PlatformId;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "currentColor",
    "aria-hidden": true as const,
  };

  switch (id) {
    // Two angled bars meeting at the apex, with the round terminal at the foot.
    case "google-ads":
      return (
        <svg {...common}>
          <g stroke="currentColor" strokeWidth="5.2" strokeLinecap="round" fill="none">
            <path d="M12 4.4 18.6 16.8" />
            <path d="M12 4.4 5.4 16.8" />
          </g>
          <circle cx="5.4" cy="17.6" r="3.4" />
        </svg>
      );

    // The interlocking loop.
    case "meta":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
          <path d="M12 12C10.3 8.4 8.6 6.6 6.6 6.6 4 6.6 2.4 9 2.4 12s1.6 5.4 4.2 5.4c2 0 3.7-1.8 5.4-5.4Z" />
          <path d="M12 12c1.7-3.6 3.4-5.4 5.4-5.4 2.6 0 4.2 2.4 4.2 5.4s-1.6 5.4-4.2 5.4c-2 0-3.7-1.8-5.4-5.4Z" />
        </svg>
      );

    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
        </svg>
      );

    // Sprocket: ring, stem, node. Drawn as one connected figure.
    case "hubspot":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.1">
          <circle cx="10.6" cy="15.4" r="5.4" />
          <path d="M10.6 10V7.6h5.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18.6" cy="7.6" r="2.6" fill="currentColor" stroke="none" />
        </svg>
      );

    case "salesforce":
      return (
        <svg {...common}>
          <path d="M9.9 6.3a4.3 4.3 0 0 1 3.1-1.3c1.6 0 3 .9 3.8 2.2a5 5 0 0 1 2-.4 4.9 4.9 0 0 1 0 9.8c-.3 0-.6 0-.9-.1a3.6 3.6 0 0 1-4.7 1.5 4.1 4.1 0 0 1-7.6-.2 3.8 3.8 0 0 1-4.3-3.7c0-1.4.8-2.7 1.9-3.3a4.4 4.4 0 0 1 6.7-4.5Z" />
        </svg>
      );

    // Ascending bars under an arc.
    case "amplitude":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2.2 17.4c3.4 0 4.6-11 7.2-11s3.4 11 6 11" />
          <path d="M15.4 17.4h6.4" />
        </svg>
      );

    // Two offset arcs.
    case "segment":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M20.4 8.3A9 9 0 0 0 4.6 6.9" />
          <path d="M3.6 15.7a9 9 0 0 0 15.8 1.4" />
          <path d="M13.6 8.3h7.8M2.6 15.7h7.8" />
        </svg>
      );

    // The two-stroke W.
    case "webflow":
      return (
        <svg {...common}>
          <path d="M23 5.4 16.6 18.6h-5.9l2.7-5.2h-.12c-2.2 2.9-5.5 4.8-10.2 5.2V13.5s3-.18 4.8-2.06H3.1V5.4h5.9v4.9h.12L11.5 5.4h4.5v4.86h.12L18.5 5.4H23Z" />
        </svg>
      );
  }
}
