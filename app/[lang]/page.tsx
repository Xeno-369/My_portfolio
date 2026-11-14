import { notFound } from "next/navigation";
import { Contact } from "@/components/contact";
import { Ctf } from "@/components/ctf";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { hasLocale, ui } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = ui[lang];

  return (
    <>
      <Hero lang={lang} t={t} />
      <Experience lang={lang} t={t} />
      <Projects lang={lang} t={t} />
      <Skills lang={lang} t={t} />
      <Ctf lang={lang} t={t} />
      <Contact lang={lang} t={t} />
    </>
  );
}
