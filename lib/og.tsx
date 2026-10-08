/* eslint-disable @next/next/no-img-element -- satori renders plain <img>, next/image does not apply */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/*
 * The sky link preview, shared by the homepage, essays and case studies: a
 * sunny sky, the floating head, the page's headline on glass and one line of
 * chalk. Fonts and images come from assets/ so it builds offline.
 */
export const ogSize = { width: 1200, height: 630 };

const asset = (path: string) => readFile(join(process.cwd(), "assets", path));
const dataUrl = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

export async function skyOgImage({
  kicker,
  title,
  highlight,
  chalk,
  sticky,
}: {
  kicker: string;
  title: string;
  /* Trailing word(s) of the title to set on the yellow highlighter. */
  highlight?: string;
  chalk: string[];
  /* A big number on a sticky note in place of the head, for case studies. */
  sticky?: { value: string; label: string };
}) {
  const [head, cloud, jakarta800, jakarta600, caveat] = await Promise.all([
    asset("og-head.png"),
    asset("og-cloud.png"),
    asset("fonts/plus-jakarta-sans-latin-800-normal.woff"),
    asset("fonts/plus-jakarta-sans-latin-600-normal.woff"),
    asset("fonts/caveat-latin-700-normal.woff"),
  ]);

  const lead = highlight && title.endsWith(highlight) ? title.slice(0, -highlight.length).trimEnd() : title;
  const titleSize = title.length > 60 ? 48 : title.length > 40 ? 56 : 62;

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

      <div style={{ position: "absolute", top: 44, left: 64, display: "flex", fontFamily: "Caveat", fontSize: 40, color: "#ffffff" }}>
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
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 22,
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -2,
          }}
        >
          {lead}
          {highlight && lead !== title ? (
            <span style={{ background: "#ffd84d", padding: "0 6px", marginLeft: 14 }}>{highlight}</span>
          ) : null}
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 24, fontWeight: 600, color: "#34496b" }}>
          {siteConfig.name} · muneebsyed29.com
        </div>
      </div>

      {sticky ? (
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 170,
            width: 300,
            display: "flex",
            flexDirection: "column",
            padding: "40px 32px 32px",
            background: "#ffd84d",
            color: "#3a2a00",
            transform: "rotate(4deg)",
            boxShadow: "0 24px 40px -20px rgba(120,80,0,0.6)",
          }}
        >
          <span style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{sticky.value}</span>
          <span style={{ marginTop: 10, fontFamily: "Caveat", fontSize: 40 }}>{sticky.label}</span>
        </div>
      ) : (
        <img src={dataUrl(head)} alt="" width={300} height={415} style={{ position: "absolute", right: 84, top: 150 }} />
      )}

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
        {chalk.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: jakarta800, weight: 800, style: "normal" },
        { name: "Jakarta", data: jakarta600, weight: 600, style: "normal" },
        { name: "Caveat", data: caveat, weight: 700, style: "normal" },
      ],
    },
  );
}
