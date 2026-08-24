import { ImageResponse } from "next/og";
import { company } from "@/content/company";

export const alt =
  "AH ELEC RENOV — Électricité & rénovation intérieure, région parisienne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image Open Graph (partage social) générée dynamiquement. */
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
          background: "#1A1D23",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* halo cuivre */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: "9999px",
            background: "rgba(201,119,47,0.18)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#23272f",
              color: "#D98F4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            AH
          </div>
          <div
            style={{
              color: "#F7F5F1",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {company.brandName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#D98F4F",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 44, height: 3, background: "#C9772F" }} />
            Paris · Région parisienne
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#F7F5F1",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            <span>Électricité &amp; rénovation intérieure&nbsp;</span>
            <span style={{ color: "#D98F4F" }}>clé en main</span>
          </div>
          <div style={{ color: "rgba(247,245,241,0.7)", fontSize: 28 }}>
            Un seul interlocuteur, du devis à la réception.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            color: "rgba(247,245,241,0.6)",
            fontSize: 22,
          }}
        >
          Devis gratuit · Assurance décennale · Mise aux normes NF C 15-100
        </div>
      </div>
    ),
    size,
  );
}
