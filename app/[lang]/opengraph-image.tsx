import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";
import { locales } from "@/lib/i18n";

export const alt = "Victor Yanfouom Kanfitine — cybersecurity, systems & networks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Aperçu affiché lors d'un partage (LinkedIn, Discord, X…). */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const fr = lang !== "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#e7edf4",
          background:
            "radial-gradient(900px 520px at 85% 0%, rgba(106,169,255,0.28), transparent 70%), radial-gradient(700px 480px at 0% 100%, rgba(118,226,166,0.18), transparent 70%), #070b11",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#94a2b1" }}>
          <span style={{ color: "#6aa9ff" }}>~/</span>xeno_369
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            Victor Yanfouom
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.1,
              color: "#6aa9ff",
            }}
          >
            Kanfitine
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#94a2b1" }}>
            {fr
              ? "Cybersécurité · systèmes & réseaux · IoT embarqué"
              : "Cybersecurity · systems & networks · embedded IoT"}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5e6c7b" }}>
          <span>{profile.site.replace("https://", "")}</span>
          <span>{fr ? "Disponible pour un stage" : "Open to internships"}</span>
        </div>
      </div>
    ),
    size,
  );
}
