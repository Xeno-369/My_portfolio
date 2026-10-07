import { certifications, rankings } from "@/lib/content";
import { Hud } from "./hud";

export function Hall() {
  return (
    <section id="hall" className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.32em] text-[var(--accent)] uppercase">
        //06. hall of fame
      </p>
      <h2 className="font-display mt-2 text-3xl md:text-4xl">Certifications & classements</h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c) => (
            <Hud key={c.title} className="p-4">
              <p className="font-mono text-[10px] tracking-widest text-[var(--dim)] uppercase">
                {c.date}
              </p>
              <h3 className="mt-1 text-sm font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-[var(--muted)]">{c.org}</p>
            </Hud>
          ))}
        </div>
        <Hud label="rankings" className="p-5">
          <ul className="space-y-4">
            {rankings.map((t) => (
              <li key={t.title} className="border-l-2 border-[var(--accent)] pl-3">
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
                    <p className="font-mono text-sm">{t.title}</p>
                  </a>
                ) : (
                  <p className="font-mono text-sm">{t.title}</p>
                )}
                <p className="mt-0.5 text-xs text-[var(--muted)]">{t.detail}</p>
              </li>
            ))}
          </ul>
        </Hud>
      </div>
    </section>
  );
}
