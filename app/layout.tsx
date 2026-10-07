import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xeno_369 — Victor Yanfouom Kanfitine",
  description:
    "Portfolio ingénieur systèmes, réseaux & IoT · CTF player. GhostEyes, cryptographie, Linux, Cisco.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-mode="night" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Share+Tech+Mono&family=Syne:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
