"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { experience, profile, projects, rankings, skillGroups, socials } from "@/lib/content";
import { Hud } from "./hud";

type Line = { kind: "in" | "out"; text: string };

const FLAG = "flag{xeno369_dual_core_online}";

function run(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  if (c === "help") {
    return [
      "commandes: help, whoami, motto, experience, projects, skills, ctf, social, contact, cat flag.txt, clear",
    ];
  }
  if (c === "whoami") {
    return [
      `${profile.name} · ${profile.alias}`,
      profile.mottoDay,
      profile.mottoNight,
      profile.roleEngineer,
      profile.roleCyber,
      profile.location,
    ];
  }
  if (c === "motto") {
    return [profile.mottoDay, profile.mottoNight, profile.doctrine];
  }
  if (c === "experience" || c === "stage") {
    return experience.flatMap((job) => [
      `${job.org} · ${job.role} (${job.dates}) — ${job.status}`,
      ...job.tasks.map((t) => `  [${t.status}] ${t.n} ${t.title}`),
    ]);
  }
  if (c === "projects") {
    return projects.map((p) => `> ${p.featured ? "[PHARE] " : ""}${p.title} — ${p.tag}`);
  }
  if (c === "skills") {
    return skillGroups.flatMap((g) => [`[${g.title}]`, ...g.items.map((i) => `  · ${i}`)]);
  }
  if (c === "ctf") return rankings.map((t) => `* ${t.title} — ${t.detail}`);
  if (c === "social") return socials.map((s) => `${s.label}: ${s.href}`);
  if (c === "contact") {
    return [profile.email, profile.phone, profile.github, profile.linkedin, profile.discord];
  }
  if (c === "cat flag.txt" || c === "cat ./flag.txt") {
    return ["accès autorisé.", FLAG];
  }
  if (c === "ls") return ["flag.txt", "projects/", "skills.md", "whoami"];
  return [`command not found: ${cmd}`, "tape `help`"];
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "xeno-shell v1.0 — session chiffrée" },
    { kind: "out", text: "tape `help` pour la carte des commandes." },
  ]);
  const [value, setValue] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const prompt = useMemo(() => "xeno@iai:~$", []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cmd = value;
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      setValue("");
      return;
    }
    setLines((prev) => [
      ...prev,
      { kind: "in", text: `${prompt} ${cmd}` },
      ...run(cmd).map((text) => ({ kind: "out" as const, text })),
    ]);
    setValue("");
    requestAnimationFrame(() => end.current?.scrollIntoView({ behavior: "smooth" }));
  }

  return (
    <section id="terminal" className="mx-auto max-w-6xl px-4 py-12">
      <Hud label="shell://interactive" className="p-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-[var(--dim)] uppercase">
          <span className="h-2 w-2 rounded-full bg-red-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-2">pty — /bin/xeno</span>
        </div>
        <div className="h-64 overflow-y-auto font-mono text-sm leading-6">
          {lines.map((l, i) => (
            <p
              key={i}
              className={l.kind === "in" ? "text-[var(--accent)]" : "text-[var(--fg)]/85"}
            >
              {l.text}
            </p>
          ))}
          <div ref={end} />
        </div>
        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2 border-t border-[var(--line)] pt-2 font-mono text-sm">
          <span className="text-[var(--accent)]">{prompt}</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label="Commande terminal"
          />
        </form>
      </Hud>
    </section>
  );
}
