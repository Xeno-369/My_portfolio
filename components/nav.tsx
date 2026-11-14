"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { MenuIcon, TerminalIcon, XIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { openTerminal } from "./terminal";

export function Nav({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other: Locale = lang === "fr" ? "en" : "fr";
  const otherHref = pathname.replace(/^\/(fr|en)/, `/${other}`);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const links = [
    ["experience", t.nav.experience],
    ["projects", t.nav.projects],
    ["skills", t.nav.skills],
    ["ctf", t.nav.ctf],
    ["contact", t.nav.contact],
  ] as const;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={`/${lang}`} className="font-mono text-sm tracking-tight text-fg">
          <span className="text-accent">~/</span>xeno_369
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([id, label]) => (
            <Link key={id} href={`/${lang}#${id}`} className="transition-colors hover:text-fg">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openTerminal}
            className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <TerminalIcon />
            {t.terminal}
            <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-dim">Ctrl K</kbd>
          </button>
          <Link
            href={otherHref}
            hrefLang={other}
            aria-label={t.switchLang}
            title={t.switchLang}
            className="grid h-9 w-9 place-items-center rounded-full border border-line font-mono text-xs uppercase text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {other}
          </Link>
          <ThemeToggle toDay={t.themeToDay} toNight={t.themeToNight} />
          <a href={profile.cv} className="btn btn-primary hidden !h-9 !px-4 !text-xs sm:inline-flex">
            {t.cv}
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.close : t.menu}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="grid gap-1 border-t border-line px-5 py-4 md:hidden">
          {links.map(([id, label]) => (
            <Link
              key={id}
              href={`/${lang}#${id}`}
              onClick={() => setOpen(false)}
              className="py-2.5 text-lg text-fg"
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openTerminal();
              }}
              className="btn flex-1"
            >
              <TerminalIcon />
              {t.terminal}
            </button>
            <a href={profile.cv} className="btn btn-primary flex-1">
              {t.cv}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
