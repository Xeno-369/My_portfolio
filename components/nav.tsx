"use client";

import { useState } from "react";
import { profile } from "@/lib/content";
import { useTheme } from "./theme";

const links = [
  ["//01", "Profil", "#profil"],
  ["//02", "Terminal", "#terminal"],
  ["//03", "Stage", "#experience"],
  ["//04", "Projets", "#projets"],
  ["//05", "Skills", "#skills"],
  ["//06", "Hall", "#hall"],
  ["//07", "Contact", "#contact"],
];

export function Nav() {
  const { mode, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="font-display text-lg tracking-[0.22em] text-[var(--accent)]">
          {profile.alias}
        </a>
        <nav className="hidden items-center gap-4 text-xs font-mono lg:flex">
          {links.map(([id, label, href]) => (
            <a
              key={href}
              href={href}
              className="group flex gap-2 text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <span className="text-[var(--dim)] group-hover:text-[var(--accent)]">{id}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="hud px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase"
          >
            {mode === "night" ? "mode://engineer" : "mode://cyber"}
          </button>
          <a
            href={profile.cv}
            className="hidden px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--bg)] bg-[var(--accent)] sm:inline"
          >
            CV
          </a>
          <button
            type="button"
            className="hud px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="grid gap-1 border-t border-[var(--line)] px-4 py-3 font-mono text-xs lg:hidden">
          {links.map(([id, label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex gap-3 py-2 text-[var(--muted)]"
            >
              <span className="text-[var(--dim)]">{id}</span>
              {label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
