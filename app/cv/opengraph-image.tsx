import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// CV-specific social card — same visual system as the root OG image
// (app/_og-assets/og.tsx) but framed for a recruiter sharing/forwarding this
// page, so the link preview reads as "résumé" rather than "portfolio".
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Petr Vorlíček · CV";

const ACCENT = "#2275e8";
const INK = "#0a0a0a";
const GRAY = "#6b7280";

const fontDir = join(process.cwd(), "app/_og-assets");
const fontLight = readFileSync(join(fontDir, "dm-sans-300.ttf"));
const fontRegular = readFileSync(join(fontDir, "dm-sans-400.ttf"));
const fontBold = readFileSync(join(fontDir, "dm-sans-700.ttf"));

export default function CvOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: INK,
          fontFamily: "DM Sans",
          padding: "70px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: ACCENT,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: GRAY,
            }}
          >
            CV
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: GRAY,
            }}
          >
            Prague, CZ
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 300,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            Petr Vorlíček
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 24,
              fontSize: 36,
              fontWeight: 400,
            }}
          >
            Frontend Developer
            <span style={{ color: ACCENT, marginLeft: 14 }}>&amp; UI/UX Designer</span>
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              color: GRAY,
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            Education, skills, and selected work — with a downloadable PDF.
          </div>
        </div>

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
              gap: 14,
              fontSize: 24,
              color: "#374151",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 999,
              padding: "14px 26px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#22c55e",
              }}
            />
            Available for projects
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: ACCENT }}>
            vorlos.eu/cv
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: fontLight, weight: 300, style: "normal" },
        { name: "DM Sans", data: fontRegular, weight: 400, style: "normal" },
        { name: "DM Sans", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );
}
