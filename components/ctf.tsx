import { certifications, rankings } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Ctf({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <Section id="ctf" zone="green" kicker={t.ctf.kicker} title={t.ctf.title}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{t.ctf.rankings}</h3>
          <ul className="mt-4 border-t border-line">
            {rankings.map((r, i) => {
              const row = (
                <>
                  <span className="w-28 shrink-0 text-xl font-semibold tracking-tight text-accent sm:w-36 sm:text-2xl">
                    {r.value[lang]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 font-medium text-fg">
                      {r.title}
                      {r.href ? (
                        <ArrowUpRight
                          width={14}
                          height={14}
                          className="text-dim transition-colors group-hover:text-accent"
                        />
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{r.detail[lang]}</span>
                  </span>
                </>
              );
              return (
                <Reveal as="li" key={r.title} delay={0.04 * i} className="border-b border-line">
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 py-5 transition-[padding] duration-300 hover:pl-2"
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-5">{row}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{t.ctf.certs}</h3>
          <ul className="mt-4 border-t border-line">
            {certifications.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={0.04 * i}
                className="flex items-baseline justify-between gap-4 border-b border-line py-4"
              >
                <span>
                  <span className="block font-medium text-fg">{c.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{c.org}</span>
                </span>
                <span className="shrink-0 font-mono text-xs text-dim">{c.date[lang]}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
