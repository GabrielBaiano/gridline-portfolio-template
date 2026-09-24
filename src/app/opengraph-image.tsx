import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolio";

export const runtime = "nodejs";
export const alt = `${portfolioData.personal.name} · ${portfolioData.personal.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const siteDomain =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbaiano.vercel.app").replace(
      /^https?:\/\//,
      ""
    );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "64px 72px",
          color: "#ffffff",
          border: "2px solid #262626",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#171717",
              border: "1px solid #262626",
              fontSize: "20px",
              color: "#a3a3a3",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span style={{ display: "flex" }}>
              {portfolioData.personal.statusBadge || "Available for projects"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#737373",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            developer portfolio
          </div>
        </div>

        {/* Center Intro */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-2px",
              color: "#fafafa",
              lineHeight: 1.1,
            }}
          >
            {portfolioData.personal.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 500,
              color: "#a3a3a3",
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            {`${portfolioData.personal.role} — ${portfolioData.personal.bio[0]}`}
          </div>
        </div>

        {/* Bottom Bar: Tech Tags & Domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px dashed #262626",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["React", "Next.js", "TypeScript", "Performance", "SVG UI"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#171717",
                    border: "1px solid #262626",
                    fontSize: "18px",
                    color: "#d4d4d4",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 600,
              color: "#737373",
              fontFamily: "monospace",
            }}
          >
            {siteDomain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
