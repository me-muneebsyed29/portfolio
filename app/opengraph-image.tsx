import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#090909",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#a1a1aa", display: "flex" }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 980,
            display: "flex",
          }}
        >
          Building AI-first growth systems that turn paid media into predictable pipeline.
        </div>
        <div style={{ fontSize: 24, color: "#a1a1aa", display: "flex" }}>
          {siteConfig.role}
        </div>
      </div>
    ),
    size
  );
}
