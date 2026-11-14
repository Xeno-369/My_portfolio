import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowRight } from "./icons";
import { Radar } from "./radar";
import { Reveal } from "./reveal";
import { Section } from "./section";

export const radarLabels = (lang: Locale) =>
  lang === "fr"
    ? { scanning: "BALAYAGE", alert: "ALERTE", angle: "angle", distance: "dist.", zone: "seuils d'exemple, configurables" }
    : { scanning: "SCANNING", alert: "ALERT", angle: "angle", distance: "dist.", zone: "sample thresholds, configurable" };

export function Projects({ lang, t }: { lang: Locale; t: Dict }) {
  const ghost = projects.find((p) => p.slug === "ghosteyes")!;
  const rest = projects.filter((p) => p.slug !== "ghosteyes");

  return (
    <Section id="projects" zone="teal" kicker={t.projects.kicker} title={t.projects.title}>
      {/* Projet phare : le radar tourne en direct */}
      <Reveal className="card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col p-6 sm:p-9">
            <p className="font-mono text-xs text-accent">{ghost.tag[lang]}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{ghost.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{ghost.summary[lang]}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {ghost.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-8">
              <Link href={`/${lang}/projects/${ghost.slug}`} className="btn btn-primary">
                {t.projects.read}
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="border-t border-line bg-surface-2/50 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="pulse-dot" />
              {t.projects.live}
            </p>
            <Radar labels={radarLabels(lang)} />
            <p className="mt-4 text-xs leading-relaxed text-dim">{t.projects.liveNote}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal
            as="article"
            key={p.slug}
            delay={0.05 * (i % 2)}
            className={`card card-hover group relative flex flex-col overflow-hidden ${
              p.featured ? "md:col-span-2 md:flex-row" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden bg-surface-2 ${
                p.featured ? "aspect-[16/9] md:aspect-auto md:w-[55%]" : "aspect-[16/8]"
              }`}
            >
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  sizes={p.featured ? "(min-width: 768px) 620px, 100vw" : "(min-width: 768px) 540px, 100vw"}
                  className="object-cover object-top opacity-90 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="font-mono text-xs text-accent">{p.tag[lang]}</p>
              <h3 className="mt-2.5 text-xl font-semibold tracking-tight sm:text-2xl">
                <Link href={`/${lang}/projects/${p.slug}`} className="after:absolute after:inset-0">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{p.summary[lang]}</p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <ArrowRight className="shrink-0 text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
