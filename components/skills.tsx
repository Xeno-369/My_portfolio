import { skillGroups, tools } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Skills({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <Section id="skills" zone="teal" kicker={t.skills.kicker} title={t.skills.title}>
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title.en} delay={0.05 * i} className="card p-6 sm:p-7">
            <h3 className="flex items-baseline justify-between text-lg font-semibold tracking-tight">
              {g.title[lang]}
              <span className="font-mono text-xs font-normal text-dim">
                {String(g.items.length).padStart(2, "0")}
              </span>
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-surface-2/60 px-3 py-1.5 text-sm text-fg/90 transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 overflow-hidden rounded-2xl border border-line py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="marquee flex w-max gap-10 font-mono text-sm text-muted">
          {[...tools, ...tools].map((tool, i) => (
            <li key={i} aria-hidden={i >= tools.length} className="flex items-center gap-10">
              {tool}
              <span className="text-accent">/</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
