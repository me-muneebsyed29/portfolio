import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* 02 / MONOGRAM: "Favicon uses the alternate, solid: an outline box turns to
   mush at 16px." Solid slab, letters only, no rule. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#CC4327",
          color: "#F2F2F0",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "-0.5px",
          fontFamily: "sans-serif",
        }}
      >
        SM
      </div>
    ),
    size
  );
}
