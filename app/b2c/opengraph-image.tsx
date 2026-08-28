import { ImageResponse } from "next/og";
import { b2cConfig } from "@/lib/b2c-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function B2COpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090a",
          color: "#f2f5f3",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 28, color: "#939c97", display: "flex" }}>{b2cConfig.name}</div>
          <div
            style={{
              display: "flex",
              border: "1px solid #c9f24d",
              borderRadius: 4,
              color: "#c9f24d",
              fontSize: 18,
              letterSpacing: 2,
              padding: "4px 10px",
            }}
          >
            B2C
          </div>
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          Paid media for consumer brands, run by the person you actually hired.
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 22, color: "#939c97" }}>
          <div style={{ display: "flex" }}>$15M+ managed</div>
          <div style={{ display: "flex" }}>Meta · Google · TikTok · Snap</div>
          <div style={{ display: "flex" }}>{b2cConfig.markets}</div>
        </div>
      </div>
    ),
    size
  );
}
