/* eslint-disable @next/next/no-img-element -- satori renders plain <img>, next/image does not apply */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/*
 * The studio link preview, shared by the homepage, essays and case studies:
 * the charcoal-black ground, the page's headline in the serif, one aside in
 * the taupe italic, and on the right either the portrait or, for case
 * studies, the lead number on a taupe tile. Fonts and images come from
 * assets/ so it builds offline. The serif is a copy of Cormorant Garamond with
 * lining figures as the default digits (see assets/fonts/OFL-*.txt), since the
 * image renderer cannot turn on OpenType features the way the site's CSS does.
 */
export const ogSize = { width: 1200, height: 630 };

const asset = (path: string) => readFile(join(process.cwd(), "assets", path));
const dataUrl = (buf: Buffer, type = "image/jpeg") => `data:${type};base64,${buf.toString("base64")}`;

const INK = "#0c0c0c";
const CHARCOAL = "#2c2c2c";
const TAUPE = "#bea98e";
const IVORY = "#efe9e0";
const MUTED = "#a8a196";

export async function studioOgImage(input: {
  kicker: string;
  title: string;
  /* Trailing word(s) of the title to set in the taupe italic. */
  highlight?: string;
  aside: string[];
  /* A big number on a taupe tile in place of the portrait, for case studies. */
  tile?: { value: string; label: string };
}) {
  /* Neither bundled font has a ₹ glyph, so share images spell it Rs. */
  const rs = (text: string) => text.replace(/₹\s?/g, "Rs ");
  const kicker = rs(input.kicker);
  const title = rs(input.title);
  const highlight = input.highlight && rs(input.highlight);
  const aside = input.aside.map(rs);
  const tile = input.tile && { value: rs(input.tile.value), label: rs(input.tile.label) };

  const [portrait, manrope600, serif, serifItalic] = await Promise.all([
    asset("og-portrait.jpg"),
    asset("fonts/manrope-latin-600-normal.woff"),
    asset("fonts/cormorant-garamond-og-lining-500-normal.woff"),
    asset("fonts/cormorant-garamond-og-lining-500-italic.woff"),
  ]);

  const lead = highlight && title.endsWith(highlight) ? title.slice(0, -highlight.length).trimEnd() : title;
  const titleSize = title.length > 60 ? 62 : title.length > 40 ? 72 : 82;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: INK,
        color: IVORY,
        fontFamily: "Manrope",
      }}
    >
      {/* Hairline frame. */}
      <div style={{ position: "absolute", top: 28, left: 28, right: 28, bottom: 28, border: `1px solid ${CHARCOAL}`, borderRadius: 24, display: "flex" }} />

      <div
        style={{
          position: "absolute",
          left: 72,
          top: 72,
          bottom: 72,
          width: 690,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 17, fontWeight: 600, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>
          <div style={{ width: 40, height: 1, background: TAUPE, marginRight: 18 }} />
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Cormorant",
            fontSize: titleSize,
            lineHeight: 1,
            letterSpacing: -1.5,
          }}
        >
          {/* Word by word, so the italic tail wraps like the rest of the line. */}
          {lead.split(" ").map((word, i) => (
            <span key={i} style={{ marginRight: "0.22em" }}>
              {word}
            </span>
          ))}
          {highlight && lead !== title
            ? highlight.split(" ").map((word, i) => (
                <span key={`h${i}`} style={{ fontStyle: "italic", color: TAUPE, marginRight: "0.22em" }}>
                  {word}
                </span>
              ))
            : null}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Cormorant", fontSize: 34, color: IVORY }}>
            {siteConfig.name}
            <span style={{ color: TAUPE }}>.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontFamily: "Cormorant", fontStyle: "italic", fontSize: 28, lineHeight: 1.1, color: TAUPE }}>
            {aside.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </div>

      {tile ? (
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 72,
            bottom: 72,
            width: 330,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "36px 34px",
            borderRadius: 22,
            background: TAUPE,
            color: INK,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.2 }}>{tile.label}</span>
          <span style={{ fontFamily: "Cormorant", fontSize: tile.value.length > 7 ? 74 : 104, lineHeight: 1, letterSpacing: -2 }}>{tile.value}</span>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 72,
            bottom: 72,
            width: 330,
            display: "flex",
            borderRadius: 22,
            overflow: "hidden",
            background: CHARCOAL,
          }}
        >
          <img src={dataUrl(portrait)} alt="" width={486} height={486} style={{ position: "absolute", left: -78, top: -4, opacity: 0.92 }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 220,
              background: "linear-gradient(180deg, rgba(12,12,12,0), rgba(12,12,12,0.9))",
            }}
          />
        </div>
      )}
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Manrope", data: manrope600, weight: 600, style: "normal" },
        { name: "Cormorant", data: serif, weight: 500, style: "normal" },
        { name: "Cormorant", data: serifItalic, weight: 500, style: "italic" },
      ],
    },
  );
}
