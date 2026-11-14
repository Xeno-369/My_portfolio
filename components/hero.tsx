import Image from "next/image";
import Link from "next/link";
import { profile, stats } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { Decrypt } from "./decrypt";
import { ArrowRight, Download } from "./icons";
import { NetCanvas } from "./net-canvas";
import { Reveal } from "./reveal";
import { TerminalButton } from "./terminal";

export function Hero({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <section data-zone="blue" className="relative isolate overflow-hidden">
      <NetCanvas className="absolute inset-0 -z-10 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_75%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.25fr_0.75fr] md:pb-24 md:pt-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
              <span className="pulse-dot" />
              {t.available}
              <span className="text-dim">·</span>
              {profile.location[lang]}
            </span>
          </Reveal>

          <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            <Decrypt text="Victor Yanfouom" className="block" />
            <Decrypt text="Kanfitine" className="block text-accent" />
          </h1>

          <Reveal delay={0.1}>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:text-sm">
              {profile.role[lang]}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-xl text-2xl leading-snug tracking-tight text-fg sm:text-[1.7rem]">
              {profile.tagline[lang]}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{profile.intro[lang]}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${lang}#projects`} className="btn btn-primary">
                {t.heroCta}
                <ArrowRight />
              </Link>
              <a href={profile.cv} className="btn">
                <Download />
                {t.heroCv}
              </a>
              <TerminalButton label={t.heroTerminal} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto w-full max-w-sm md:max-w-none">
          <figure className="group relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/20 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line-strong bg-surface">
              <Image
                src={profile.photo}
                alt={`Portrait — ${profile.name}`}
                fill
                priority
                sizes="(min-width: 768px) 360px, 90vw"
                className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16">
                <figcaption className="flex items-end justify-between font-mono text-[11px] text-white/85">
                  <span>
                    <span className="text-white/50">alias</span> {profile.alias}
                  </span>
                  <span>IAI-Togo · L2</span>
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line gap-px md:grid-cols-4">
          {stats.map((s, i) => {
            const body = (
              <>
                <p className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{s.label[lang]}</p>
              </>
            );
            return (
              <Reveal key={s.value} delay={0.05 * i} className="bg-bg">
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col p-5 transition-colors hover:bg-surface sm:p-6"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex h-full flex-col p-5 sm:p-6">{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
