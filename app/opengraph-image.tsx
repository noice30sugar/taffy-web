import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Taffy — Bucket your spending.";

// Social share card: the wordmark (with hat) on deep ink. No standalone bucket
// symbol. Renders only an image — no text nodes — so no font data is required.
export default async function OpengraphImage() {
  const png = await readFile(
    join(process.cwd(), "public/brand/taffy-wordmark-hat.png"),
  );
  const wordmark = `data:image/png;base64,${png.toString("base64")}`;

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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmark} width={560} height={222} alt="Taffy" />
      </div>
    ),
    { ...size },
  );
}
