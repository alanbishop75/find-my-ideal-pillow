import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FindMyIdealPillow — find the right pillow for how you sleep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f0eb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#1a1a1a",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          Find My Ideal Pillow
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#555",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Personalised pillow recommendations · 2-minute quiz · UK retailers
        </div>
        <div
          style={{
            marginTop: 40,
            background: "#c17b3a",
            color: "#fff",
            borderRadius: 12,
            padding: "16px 40px",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          findmyidealpillow.com
        </div>
      </div>
    ),
    { ...size }
  );
}
