import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Taffy — Bucket your spending.";

// Social share card: brand lockup on deep ink with a gold glow. Renders only
// vector (SVG) + shapes — no text nodes — so no font data is required and the
// build never depends on the network.
export default async function OpengraphImage() {
  const svg = await readFile(
    join(process.cwd(), "public/brand/lockup-light.svg"),
    "utf-8",
  );
  const lockup = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101014",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            width: 900,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(253,190,24,0.30), transparent 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockup} width={300} height={318} alt="Taffy" />
      </div>
    ),
    { ...size },
  );
}
