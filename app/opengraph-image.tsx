import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Applications sheet 04 / DECK COVER: "Cover carries no accent." Graphite
 * ground, chalk statement, mono caps details, monogram bottom-right. The first
 * cadmium number belongs on a data frame, not here.
 *
 * The greyscale portrait runs full-bleed down the right edge, split from the
 * type by the system's 2px rule, so a shared link carries a face.
 */
const PORTRAIT_WIDTH = 400;

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/portrait.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#1A1A1A",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#F2F2F0",
          padding: "64px",
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
          <span>{siteConfig.role}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-1.3px",
          }}
        >
          Building AI-first growth systems that turn paid media into predictable
          pipeline.
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
            <span
              style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}
            >
              SM
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 2,
          height: "100%",
          background: "#3D3D3A",
        }}
      />
      <img
        src={portraitSrc}
        alt=""
        width={PORTRAIT_WIDTH}
        height={size.height}
        style={{
          width: PORTRAIT_WIDTH,
          height: size.height,
          objectFit: "cover",
        }}
      />
    </div>,
    size,
  );
}
