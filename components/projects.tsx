"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import { Hud } from "./hud";

export function Projects() {
  return (
    <section id="projets" className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.32em] text-[var(--accent)] uppercase">
        //04. archives
      </p>
      <h2 className="font-display mt-2 text-3xl md:text-4xl">Projets & hackathons</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            className={p.featured ? "md:col-span-2 lg:col-span-2" : ""}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, type: "spring", stiffness: 260, damping: 22 }}
          >
            <Hud className="h-full overflow-hidden hover:border-[var(--accent)]">
              <a href={p.href} target="_blank" rel="noreferrer" className="block">
                {p.image ? (
                  <div className={`relative overflow-hidden ${p.featured ? "h-56 md:h-72" : "h-36"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--hud)] to-transparent" />
                  </div>
                ) : null}
              </a>
              <div className="p-5">
                <p className="font-mono text-[10px] tracking-widest text-[var(--accent)] uppercase">
                  {p.tag}
                </p>
                <h3 className="font-display mt-2 text-xl md:text-2xl">
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {p.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-[var(--line)] px-2 py-0.5 font-mono text-[10px] text-[var(--dim)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {"demos" in p && p.demos ? (
                  <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] tracking-widest uppercase">
                    {p.demos.map((d) => (
                      <a key={d.href} href={d.href} target="_blank" rel="noreferrer" className="hud px-3 py-2">
                        {d.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                {p.gallery && p.gallery.length > 1 ? (
                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {p.gallery.slice(0, 5).map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt=""
                        className="h-14 w-20 shrink-0 object-cover border border-[var(--line)]"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </Hud>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
