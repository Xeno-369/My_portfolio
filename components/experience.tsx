import Link from "next/link";
import { experience } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowRight, ArrowUpRight, Check } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Experience({ lang, t }: { lang: Locale; t: Dict }) {
  const e = experience;
  return (
    <Section id="experience" zone="blue" kicker={t.experience.kicker} title={t.experience.title}>
      <Reveal className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              {e.role[lang]} <span className="text-muted">·</span>{" "}
              <span className="text-accent">{e.org}</span>
            </h3>
            <p className="mt-1.5 font-mono text-xs text-muted">{e.dates[lang]}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[t.experience.done, t.experience.certified].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1 text-xs font-medium text-accent"
              >
                <Check width={13} height={13} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted">{e.summary[lang]}</p>
        <a
          href={e.brief}
          target="_blank"
          rel="noreferrer"
          className="link mt-4 inline-flex items-center gap-1.5 text-sm"
        >
          {t.experience.brief}
          <ArrowUpRight width={14} height={14} />
        </a>
      </Reveal>

      <ol className="mt-4 grid gap-4 md:grid-cols-2">
        {e.tasks.map((task, i) => (
          <Reveal as="li" key={task.n} delay={0.06 * i} className="card card-hover flex flex-col p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-dim">task/{task.n}</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-accent">
                <Check width={12} height={12} />
                {t.experience.done.toLowerCase()}
              </span>
            </div>
            <h4 className="mt-3 text-lg font-semibold tracking-tight">{task.title}</h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{task.detail[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            {task.slug || task.repo ? (
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
                {task.slug ? (
                  <Link
                    href={`/${lang}/projects/${task.slug}`}
                    className="inline-flex items-center gap-1.5 font-medium text-accent"
                  >
                    {t.experience.caseStudy}
                    <ArrowRight width={14} height={14} />
                  </Link>
                ) : null}
                {task.repo ? (
                  <a
                    href={task.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="link inline-flex items-center gap-1.5 text-muted"
                  >
                    {t.experience.repo}
                    <ArrowUpRight width={14} height={14} />
                  </a>
                ) : null}
              </div>
            ) : null}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
