import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { BootIntro } from "@/components/boot-intro";
import { Nav } from "@/components/nav";
import { Terminal } from "@/components/terminal";
import { ScrollProgress, ZoneWatcher } from "@/components/zone";
import { profile } from "@/lib/content";
import { hasLocale, locales, ui } from "@/lib/i18n";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans-next" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-next" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b11" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang !== "en";
  const description = fr
    ? "Étudiant ingénieur en systèmes, réseaux et cybersécurité à Lomé. Stage CodeAlpha, audit de code, détection d'intrusion, IoT embarqué et CTF."
    : "Engineering student in systems, networks and cybersecurity based in Lomé. CodeAlpha internship, code audit, intrusion detection, embedded IoT and CTFs.";
  return {
    metadataBase: new URL(profile.site),
    title: {
      default: `${profile.name} — ${fr ? "Cybersécurité, systèmes & réseaux" : "Cybersecurity, systems & networks"}`,
      template: `%s — ${profile.name}`,
    },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: fr ? "fr_FR" : "en_US",
      description,
    },
  };
}

// Applique le thème mémorisé avant le premier affichage (pas de flash).
const themeScript = `try{var m=localStorage.getItem("xeno-mode");if(m==="day"||m==="night")document.documentElement.dataset.mode=m}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = ui[lang];

  return (
    <html
      lang={lang}
      data-mode="night"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <BootIntro />
        {/* flag 1/3 — pour celles et ceux qui lisent le code source */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: "<!-- 1/3 : XENO{r34d_th3_s0urc3   (next: /robots.txt) -->",
          }}
        />
        <div className="ambient" aria-hidden />
        <ScrollProgress />
        <ZoneWatcher />
        <div className="relative z-10">
          <Nav lang={lang} t={t} />
          <main>{children}</main>
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-dim">
              <p>
                © {new Date().getFullYear()} · {t.footer}
              </p>
              <p>{t.footerHint} Ctrl K → hint</p>
            </div>
          </footer>
        </div>
        <Terminal lang={lang} />
      </body>
    </html>
  );
}
