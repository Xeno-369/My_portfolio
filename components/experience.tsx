import { experience } from "@/lib/content";
import { Hud } from "./hud";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.32em] text-[var(--accent)] uppercase">
        //03. stage
      </p>
      <h2 className="font-display mt-2 text-3xl md:text-4xl">Expérience</h2>
      <div className="mt-8 space-y-4">
        {experience.map((job) => {
          const done = job.tasks.filter((t) => t.status === "livré").length;
          const total = job.tasks.length;
          return (
            <Hud key={job.id} label={job.org} className="overflow-hidden">
              <div className="p-5 md:p-6">
                <p className="font-mono text-[10px] tracking-widest text-[var(--accent)] uppercase">
                  {job.dates} · {job.status}
                </p>
                <h3 className="font-display mt-2 text-xl">{job.role}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
                  {job.summary}
                </p>
                <div className="mt-4 h-1.5 overflow-hidden border border-[var(--line)]">
                  <div
                    className="h-full bg-[var(--accent)]"
                    style={{ width: `${(done / total) * 100}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] tracking-widest text-[var(--dim)] uppercase">
                  Avancement {done}/{total}
                </p>
                <ol className="mt-6 grid gap-3 md:grid-cols-2">
                  {job.tasks.map((t) => (
                    <li key={t.n} className="hud p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] tracking-widest text-[var(--dim)]">
                          TASK {t.n}
                        </span>
                        <span
                          className={`font-mono text-[10px] tracking-widest uppercase ${
                            t.status === "livré" ? "text-[var(--accent)]" : "text-[var(--muted)]"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold">{t.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{t.detail}</p>
                      {t.href ? (
                        <a
                          href={t.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block font-mono text-[10px] tracking-widest uppercase text-[var(--accent)]"
                        >
                          Repo GitHub →
                        </a>
                      ) : (
                        <p className="mt-3 font-mono text-[10px] tracking-widest text-[var(--dim)] uppercase">
                          Livrable à venir
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="border border-[var(--line)] px-2 py-0.5 font-mono text-[10px] text-[var(--dim)]"
                    >
                      {s}
                    </span>
                  ))}
                  {job.brief ? (
                    <a
                      href={job.brief}
                      target="_blank"
                      rel="noreferrer"
                      className="hud ml-auto px-3 py-2 font-mono text-[10px] tracking-widest uppercase"
                    >
                      Brief missions PDF
                    </a>
                  ) : null}
                </div>
              </div>
              {job.images?.length ? (
                <div className="grid grid-cols-2 gap-px border-t border-[var(--line)]">
                  {job.images.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" className="h-36 w-full object-cover md:h-44" />
                  ))}
                </div>
              ) : null}
            </Hud>
          );
        })}
      </div>
    </section>
  );
}
