import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { radarLabels } from "@/components/projects";
import { Radar } from "@/components/radar";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/lib/content";
import { hasLocale, locales, ui } from "@/lib/i18n";

type Props = PageProps<"/[lang]/projects/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!p || !hasLocale(lang)) return {};
  return {
    title: p.title,
    description: p.summary[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { fr: `/fr/projects/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{title}</h2>
      <div className="min-w-0">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!p || !hasLocale(lang)) notFound();
  const t = ui[lang];
  const tp = t.project;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <article data-zone={p.zone} className="mx-auto max-w-5xl px-5 pb-24 pt-10 md:pt-16">
      <Link
        href={`/${lang}#projects`}
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft width={14} height={14} />
        {tp.back}
      </Link>

      <Reveal>
        <p className="mt-10 font-mono text-xs text-accent">{p.tag[lang]}</p>
        <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl">
          {p.title}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl">{p.summary[lang]}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-[1fr_1.4fr_2fr]">
          <div className="bg-bg p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{tp.year}</dt>
            <dd className="mt-1.5 text-sm">{p.year}</dd>
          </div>
          <div className="bg-bg p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{tp.role}</dt>
            <dd className="mt-1.5 text-sm">{p.role[lang]}</dd>
          </div>
          <div className="bg-bg p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{tp.stack}</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          {p.links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`btn ${i === 0 ? "btn-primary" : ""}`}
            >
              {link.label[lang]}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </Reveal>

      {p.slug === "ghosteyes" ? (
        <Reveal className="card mt-12 p-5 sm:p-8">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="pulse-dot" />
            {t.projects.live}
          </p>
          <Radar labels={radarLabels(lang)} className="mx-auto max-w-3xl" />
          <p className="mt-4 text-center text-xs text-dim">{t.projects.liveNote}</p>
        </Reveal>
      ) : p.cover && !p.gallery ? (
        <Reveal className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl border border-line">
          <Image src={p.cover} alt="" fill priority sizes="(min-width: 1024px) 980px, 100vw" className="object-cover" />
        </Reveal>
      ) : null}

      <div className="mt-14">
        <Block title={tp.problem}>
          <p className="max-w-2xl text-lg leading-relaxed text-fg/90">{p.problem[lang]}</p>
        </Block>

        <Block title={tp.approach}>
          <ol className="max-w-2xl space-y-4">
            {p.approach.map((step, i) => (
              <li key={i} className="flex gap-4 leading-relaxed text-muted">
                <span className="mt-0.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>{step[lang]}</span>
              </li>
            ))}
          </ol>
        </Block>

        {p.findings ? (
          <Block title={tp.findings}>
            <ul className="space-y-3">
              {p.findings.map((f) => (
                <li key={f.cwe} className="card p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        f.severity === "critical" ? "bg-danger/15 text-danger" : "bg-warn/15 text-warn"
                      }`}
                    >
                      {f.severity === "critical"
                        ? lang === "fr" ? "Critique" : "Critical"
                        : lang === "fr" ? "Élevée" : "High"}
                    </span>
                    <span className="chip">{f.cwe}</span>
                    <code className="font-mono text-xs text-dim">{f.where}</code>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{f.title[lang]}</h3>
                  <p className="mt-2 text-sm text-muted">{f.status[lang]}</p>
                  <p className="mt-1 text-sm text-muted">
                    <span className="text-accent">fix →</span> {f.fix[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {p.rules ? (
          <Block title={tp.rules}>
            <ul className="space-y-5">
              {p.rules.map((r) => (
                <li key={r.rule}>
                  <h3 className="font-semibold tracking-tight">{r.name[lang]}</h3>
                  <pre className="scroll-thin mt-2 overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed text-fg/90">
                    <code>{r.rule}</code>
                  </pre>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{r.why[lang]}</p>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {p.alerts ? (
          <Block title={tp.alerts}>
            <pre className="scroll-thin overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-[11px] leading-6 text-muted">
              <code>{p.alerts.join("\n")}</code>
            </pre>
          </Block>
        ) : null}

        {p.modules ? (
          <Block title={tp.modules}>
            <div className="scroll-thin overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                  <tr className="border-b border-line">
                    <th className="py-2.5 pr-4 font-normal">Module</th>
                    <th className="py-2.5 pr-4 font-normal">{tp.technique}</th>
                    <th className="py-2.5 font-normal">{tp.testedOn}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.modules.map((m) => (
                    <tr key={m.name} className="border-b border-line align-top">
                      <td className="py-3 pr-4 font-mono text-xs text-accent">{m.name}</td>
                      <td className="py-3 pr-4 text-fg/90">{m.technique[lang]}</td>
                      <td className="py-3 text-muted">{m.testedOn[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>
        ) : null}

        <Block title={tp.result}>
          <ul className="max-w-2xl space-y-3">
            {p.result.map((r, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-fg/90">
                <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                {r[lang]}
              </li>
            ))}
          </ul>
        </Block>

        {p.limits ? (
          <Block title={tp.limits}>
            <ul className="max-w-2xl space-y-3">
              {p.limits.map((r, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-dim" />
                  {r[lang]}
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {p.gallery ? (
          <Block title={tp.gallery}>
            <div className="grid gap-3 sm:grid-cols-2">
              {p.gallery.map((g, i) => (
                <a
                  key={g.src}
                  href={g.src}
                  target="_blank"
                  rel="noreferrer"
                  className={`group overflow-hidden rounded-xl border border-line bg-surface ${
                    i === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={`${p.title} — ${i + 1}`}
                    width={g.w}
                    height={g.h}
                    sizes={i === 0 ? "(min-width: 1024px) 740px, 100vw" : "(min-width: 640px) 370px, 100vw"}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </a>
              ))}
            </div>
          </Block>
        ) : null}
      </div>

      <Link
        href={`/${lang}/projects/${next.slug}`}
        className="card card-hover group mt-6 flex items-center justify-between gap-6 p-6 sm:p-8"
      >
        <span>
          <span className="font-mono text-xs text-dim">{tp.next}</span>
          <span className="mt-1 block text-2xl font-semibold tracking-tight sm:text-3xl">{next.title}</span>
        </span>
        <ArrowRight
          width={22}
          height={22}
          className="text-dim transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent"
        />
      </Link>
    </article>
  );
}
