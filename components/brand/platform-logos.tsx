/*
 * Monochrome platform marks, drawn as inline SVG on a 24×24 box and filled with
 * currentColor so they take the ground's text colour and invert with the theme.
 *
 * Single-colour and simplified on purpose: the brand system runs achromatic, and
 * a wall of thirty full-colour vendor logos would put thirty competing accents
 * on one frame. Nominative use — these are the tools the work runs on.
 *
 * These are hand-drawn approximations, not official assets. Where a brand's mark
 * cannot be reduced faithfully from memory, `Initials` renders the system's own
 * ruled-box monogram instead. Inventing a company's identity would be worse than
 * setting its name, and the ruled box is a deliberate treatment rather than a gap.
 */
export type PlatformId =
  | "google-ads"
  | "meta"
  | "linkedin"
  | "bing"
  | "tiktok"
  | "reddit"
  | "snapchat"
  | "pinterest"
  | "chatgpt"
  | "ga4"
  | "gtm"
  | "segment"
  | "amplitude"
  | "hubspot"
  | "salesforce"
  | "sixsense"
  | "propensity"
  | "apollo"
  | "clay"
  | "contactlevel"
  | "n8n"
  | "zapier"
  | "claude"
  | "lovable"
  | "webflow"
  | "shopify"
  | "gohighlevel"
  | "lemlist";

/* The ruled-box monogram from the Marks sheet, reused for tools without a mark. */
function Initials({ text }: { text: string }) {
  return (
    <>
      <rect x="1.2" y="1.2" width="21.6" height="21.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text
        x="12"
        y="12.6"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={text.length > 2 ? "7.6" : "9.6"}
        fontWeight="500"
        fill="currentColor"
      >
        {text}
      </text>
    </>
  );
}

export function PlatformLogo({ id, className }: { id: PlatformId; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "currentColor",
    "aria-hidden": true as const,
  };

  const stroked = { ...common, fill: "none", stroke: "currentColor" };

  switch (id) {
    // ── Ad platforms ──────────────────────────────────────────────────────
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

    case "meta":
      return (
        <svg {...stroked} strokeWidth="2.1" strokeLinecap="round">
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

    // The folded "b" ribbon.
    case "bing":
      return (
        <svg {...common}>
          <path d="M5.6 2.2 10.3 3.9v12.4l5.1-2.9-2.5-1.2-1.6-4.1 7.5 3.4v4.4l-8.5 4.9-4.7-2.6V2.2Z" />
        </svg>
      );

    case "tiktok":
      return (
        <svg {...common}>
          <path d="M16.3 2.2c.5 2.6 2 4.2 4.5 4.4v3.1c-1.5.1-2.9-.4-4.2-1.3v6c0 4.6-4.3 7.4-8 5.4-2.7-1.4-3.6-5-2.1-7.6 1.3-2.2 3.8-3.2 6.2-2.6v3.2c-2-.5-3.4 1-3.1 2.6.2 1.3 1.6 2.1 2.9 1.6.9-.4 1.4-1.2 1.4-2.2V2.2h2.4Z" />
        </svg>
      );

    case "reddit":
      return (
        <svg {...common}>
          <circle cx="12" cy="13.9" r="7.7" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <circle cx="9.2" cy="13.2" r="1.5" />
          <circle cx="14.8" cy="13.2" r="1.5" />
          <path
            d="M9.2 17.2c1.7 1.2 3.9 1.2 5.6 0M12 6.3l1.5-3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <circle cx="13.9" cy="2.5" r="1.7" />
        </svg>
      );

    case "snapchat":
      return (
        <svg {...common}>
          <path d="M12 2.2c3 0 5.2 2.2 5.2 5.2 0 1 .1 2 .3 2.6.5.3 1.3.2 1.9 0 .5-.2 1 .1 1.1.6.1.5-.2.9-.9 1.2-.9.4-2 .6-2.1 1.2-.1.5.9 1.9 2.6 2.6.6.2.8.7.5 1.1-.4.6-2 .9-2.4 1.2-.2.2-.1.9-.5 1.1-.5.3-1.6-.1-2.6.1-.9.2-1.9 1.6-3.1 1.6s-2.2-1.4-3.1-1.6c-1-.2-2.1.2-2.6-.1-.4-.2-.3-.9-.5-1.1-.4-.3-2-.6-2.4-1.2-.3-.4-.1-.9.5-1.1 1.7-.7 2.7-2.1 2.6-2.6-.1-.6-1.2-.8-2.1-1.2-.7-.3-1-.7-.9-1.2.1-.5.6-.8 1.1-.6.6.2 1.4.3 1.9 0 .2-.6.3-1.6.3-2.6 0-3 2.2-5.2 5.2-5.2Z" />
        </svg>
      );

    case "pinterest":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <path d="M11 16.6c-.4 1.6-.9 3.2-2 4.3l-1.5-.5c.9-1.3 1.3-2.9 1.6-4.4l1-4.4c-.3-.6-.4-1.4-.2-2.1.4-1.5 1.9-2 2.7-1.2.7.7.4 1.9.1 3-.3 1.3.6 2.2 1.8 1.9 1.6-.4 2.3-2.3 2-4.2-.3-1.9-2-3.3-4.2-3.1-2.5.2-4 2.1-3.8 4.2.1.7.4 1.2.7 1.6.2.2.2.4.1.7l-.2.8c-.1.3-.3.4-.6.3-1.4-.6-2.2-2.3-2-4.3.3-2.9 2.8-5.2 6.2-5.2 3.3 0 5.7 2.2 5.8 5.1.1 3.3-1.9 5.8-4.5 5.8-1 0-1.9-.5-2.3-1.1l-.7 2.8Z" />
        </svg>
      );

    // The interlocking knot, reduced to its outline.
    case "chatgpt":
      return (
        <svg {...stroked} strokeWidth="1.9">
          <path d="M12 2.3a4.9 4.9 0 0 1 4.2 2.4 4.9 4.9 0 0 1 3.4 7.3 4.9 4.9 0 0 1-4.2 7.3A4.9 4.9 0 0 1 12 21.7a4.9 4.9 0 0 1-4.2-2.4 4.9 4.9 0 0 1-3.4-7.3 4.9 4.9 0 0 1 4.2-7.3A4.9 4.9 0 0 1 12 2.3Z" />
          <path d="M12 8.4v7.2M8.8 10.2l6.4 3.6M15.2 10.2l-6.4 3.6" />
        </svg>
      );

    // ── Data & GTM ────────────────────────────────────────────────────────
    case "ga4":
      return (
        <svg {...common}>
          <rect x="2.8" y="13.2" width="4.6" height="7.8" rx="2.3" />
          <rect x="9.7" y="8.4" width="4.6" height="12.6" rx="2.3" />
          <rect x="16.6" y="3" width="4.6" height="18" rx="2.3" />
        </svg>
      );

    case "gtm":
      return (
        <svg {...common}>
          <path
            d="M12 1.6 22.4 12 12 22.4 1.6 12 12 1.6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          />
          <path d="M12 7 17 12l-5 5-5-5 5-5Z" />
        </svg>
      );

    case "segment":
      return (
        <svg {...stroked} strokeWidth="2.2" strokeLinecap="round">
          <path d="M20.4 8.3A9 9 0 0 0 4.6 6.9" />
          <path d="M3.6 15.7a9 9 0 0 0 15.8 1.4" />
          <path d="M13.6 8.3h7.8M2.6 15.7h7.8" />
        </svg>
      );

    case "amplitude":
      return (
        <svg {...stroked} strokeWidth="2" strokeLinecap="round">
          <path d="M2.2 17.4c3.4 0 4.6-11 7.2-11s3.4 11 6 11" />
          <path d="M15.4 17.4h6.4" />
        </svg>
      );

    case "hubspot":
      return (
        <svg {...stroked} strokeWidth="2.1">
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

    case "sixsense":
      return <svg {...common}><Initials text="6S" /></svg>;
    case "propensity":
      return <svg {...common}><Initials text="Pr" /></svg>;
    case "apollo":
      return <svg {...common}><Initials text="Ap" /></svg>;
    case "clay":
      return <svg {...common}><Initials text="Cl" /></svg>;
    case "contactlevel":
      return <svg {...common}><Initials text="CL" /></svg>;

    // ── Build & automate ──────────────────────────────────────────────────
    case "n8n":
      return (
        <svg {...common}>
          <g stroke="currentColor" strokeWidth="1.7" fill="none">
            <path d="M6.2 11.2 9.6 8.2M6.2 12.8l3.4 3M14.4 8.2l3.4 3M14.4 15.8l3.4-3" />
          </g>
          <circle cx="3.6" cy="12" r="2.6" />
          <circle cx="12" cy="6.9" r="2.3" />
          <circle cx="12" cy="17.1" r="2.3" />
          <circle cx="20.4" cy="12" r="2.6" />
        </svg>
      );

    case "zapier":
      return (
        <svg {...stroked} strokeWidth="3" strokeLinecap="round">
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
        </svg>
      );

    // The radial burst.
    case "claude":
      return (
        <svg {...stroked} strokeWidth="1.9" strokeLinecap="round">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const inner = 2.6;
            const outer = i % 2 === 0 ? 9.6 : 7.8;
            /* Rounded to a fixed precision: raw trig results stringify to
               different lengths under Node and the browser, which renders the
               server and client markup unequal and trips hydration. */
            const p = (r: number, fn: (n: number) => number) =>
              (12 + fn(a) * r).toFixed(2);
            return (
              <path
                key={i}
                d={`M${p(inner, Math.cos)} ${p(inner, Math.sin)}L${p(outer, Math.cos)} ${p(outer, Math.sin)}`}
              />
            );
          })}
        </svg>
      );

    case "lovable":
      return <svg {...common}><Initials text="Lv" /></svg>;

    case "webflow":
      return (
        <svg {...common}>
          <path d="M23 5.4 16.6 18.6h-5.9l2.7-5.2h-.12c-2.2 2.9-5.5 4.8-10.2 5.2V13.5s3-.18 4.8-2.06H3.1V5.4h5.9v4.9h.12L11.5 5.4h4.5v4.86h.12L18.5 5.4H23Z" />
        </svg>
      );

    case "shopify":
      return (
        <svg {...common}>
          <path d="M5.5 7.3h13l1.2 12.9-7.7 1.6-7.7-1.6L5.5 7.3Z" />
          <path
            d="M9 8.4V6.1a3 3 0 0 1 6 0v2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          />
        </svg>
      );

    case "gohighlevel":
      return <svg {...common}><Initials text="GHL" /></svg>;
    case "lemlist":
      return <svg {...common}><Initials text="lem" /></svg>;
  }
}
