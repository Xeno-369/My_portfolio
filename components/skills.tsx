import { skillGroups, tools } from "@/lib/content";
import { Hud } from "./hud";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.32em] text-[var(--accent)] uppercase">
        //05. loadout
      </p>
      <h2 className="font-display mt-2 text-3xl md:text-4xl">Compétences & outils</h2>
      <Hud label="toolbox" className="mt-8 p-5">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
          {tools.map((t) => (
            <li
              key={t.slug}
              className="flex flex-col items-center gap-2 border border-[var(--line)] px-2 py-3 transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${t.slug}/4dffc3`}
                alt=""
                className="h-8 w-8 object-contain"
              />
              <span className="text-center font-mono text-[10px] tracking-wide">{t.name}</span>
            </li>
          ))}
        </ul>
      </Hud>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {skillGroups.map((g) => (
          <Hud key={g.title} label={g.title} className="p-5">
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="border border-[var(--line)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] px-3 py-1.5 font-mono text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Hud>
        ))}
      </div>
    </section>
  );
}
