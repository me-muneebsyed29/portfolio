import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.title;

/*
 * The link preview, per the sky direction doc: a sunny sky, the floating
 * head, the hero headline on glass, and "more pipeline, less BS" in chalk.
 * Fonts and images are read from assets/ so the image builds offline.
 */
const asset = (path: string) => readFile(join(process.cwd(), "assets", path));
const dataUrl = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

export default async function OpengraphImage() {
  const [head, cloud, jakarta800, jakarta600, caveat] = await Promise.all([
    asset("og-head.png"),
    asset("og-cloud.png"),
    asset("fonts/plus-jakarta-sans-latin-800-normal.woff"),
    asset("fonts/plus-jakarta-sans-latin-600-normal.woff"),
    asset("fonts/caveat-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "linear-gradient(180deg, #1f7fe8 0%, #3d97f0 40%, #79bbf7 80%, #a9d5fd 100%)",
        fontFamily: "Jakarta",
      }}
    >
      <img src={dataUrl(cloud)} alt="" width={700} height={300} style={{ position: "absolute", left: -120, bottom: -60, opacity: 0.95 }} />

      <div
        style={{
          position: "absolute",
          top: 44,
          left: 64,
          display: "flex",
          fontFamily: "Caveat",
          fontSize: 40,
          color: "#ffffff",
        }}
      >
        paid media · growth · AI
      </div>

      <div
        style={{
          position: "absolute",
          left: 56,
          top: 120,
          width: 700,
          display: "flex",
          flexDirection: "column",
          padding: "44px 48px",
          borderRadius: 40,
          background: "rgba(255,255,255,0.82)",
          border: "2px solid rgba(255,255,255,0.95)",
          color: "#0b1d3a",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, fontWeight: 600, letterSpacing: 2.4, color: "#34496b", textTransform: "uppercase" }}>
          Growth operator for B2B SaaS · Bengaluru
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 22, fontSize: 62, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          I turn ad spend into pipeline you can plan
          <span style={{ background: "#ffd84d", padding: "0 6px", marginLeft: 14 }}>around.</span>
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 24, fontWeight: 600, color: "#34496b" }}>
          {siteConfig.name} · muneebsyed29.com
        </div>
      </div>

      <img src={dataUrl(head)} alt="" width={300} height={415} style={{ position: "absolute", right: 84, top: 120 }} />

      <div
        style={{
          position: "absolute",
          right: 60,
          top: 40,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Caveat",
          fontSize: 40,
          lineHeight: 1,
          color: "#ffffff",
          transform: "rotate(4deg)",
        }}
      >
        <span>more pipeline,</span>
        <span>less BS :)</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: jakarta800, weight: 800, style: "normal" },
        { name: "Jakarta", data: jakarta600, weight: 600, style: "normal" },
        { name: "Caveat", data: caveat, weight: 700, style: "normal" },
      ],
    },
  );
}
