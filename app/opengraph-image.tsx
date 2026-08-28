import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Applications sheet 04 / DECK COVER: "Cover carries no accent." Graphite
 * ground, chalk statement, mono caps details, monogram bottom-right. The first
 * cadmium number belongs on a data frame, not here.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1A1A",
          color: "#F2F2F0",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 15,
            letterSpacing: "2.4px",
            textTransform: "uppercase",
            color: "#A8A8A2",
          }}
        >
          <span>Syed Muneeb Rehaman</span>
          <span>{siteConfig.role} · Bengaluru</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-1.6px",
            maxWidth: 940,
          }}
        >
          Building AI-first growth systems that turn paid media into predictable pipeline.
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, background: "#3D3D3A" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingTop: 24,
              fontSize: 15,
              letterSpacing: "2.4px",
              textTransform: "uppercase",
              color: "#A8A8A2",
            }}
          >
            <span>muneebsyed29.com</span>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>SM</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
