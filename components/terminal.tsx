"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { certifications, experience, profile, projects, rankings, skillGroups, socials } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { TerminalIcon } from "./icons";
import { toggleMode } from "./theme-toggle";

const EVENT = "xeno:terminal";
export const openTerminal = () => window.dispatchEvent(new Event(EVENT));

export function TerminalButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openTerminal} className="btn font-mono !text-[0.82rem]">
      <TerminalIcon />
      {label}
    </button>
  );
}

type Tone = "in" | "out" | "ok" | "err" | "dim";
type Line = { tone: Tone; text: string };

const SECTIONS = ["experience", "projects", "skills", "ctf", "contact"] as const;
const COMMANDS = [
  "help", "whoami", "ls", "cat", "open", "cd", "skills", "ctf", "certs", "contact",
  "cv", "lang", "theme", "hint", "submit", "clear", "exit",
];
// SHA-256 du flag complet : le flag lui-même n'est pas dans ce fichier.
const FLAG_SHA256 = "70229370d9f067edecaf766681024606bdb3535c69037f93809c051a9f5455a6";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

const out = (...texts: string[]): Line[] => texts.map((text) => ({ tone: "out", text }));

export function Terminal({ lang }: { lang: Locale }) {
  const fr = lang === "fr";
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const welcome = useCallback(
    (): Line[] => [
      { tone: "dim", text: "xeno-shell 2.0 — " + (fr ? "tape `help` pour commencer" : "type `help` to get started") },
    ],
    [fr],
  );

  // Ouverture : bouton, ou Ctrl/Cmd + K
  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener(EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Invitation discrète pour les curieux qui ouvrent la console.
  useEffect(() => {
    console.log(
      "%c~/xeno_369%c\nThere is a flag hidden in this site, in three parts.\nPart 1 is in the page source. Open the terminal (Ctrl+K) and type `hint`.",
      "color:#55d2c8;font:600 14px ui-monospace,monospace",
      "color:inherit;font:12px ui-monospace,monospace",
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  async function run(raw: string): Promise<Line[]> {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ");
    const c = cmd.toLowerCase();
    const err = (text: string): Line[] => [{ tone: "err", text }];
    const ok = (text: string): Line[] => [{ tone: "ok", text }];
    const project = (slug: string) =>
      projects.find((p) => p.slug === slug.toLowerCase().replace(/^projects\//, "").replace(/\/$/, ""));

    switch (c) {
      case "help":
        return out(
          fr ? "Navigation" : "Navigation",
          "  ls [projects]        " + (fr ? "lister les sections ou les projets" : "list sections or projects"),
          "  cd <section>         " + (fr ? "aller à une section" : "jump to a section"),
          "  cat <projet>         " + (fr ? "résumé d'un projet" : "project summary"),
          "  open <projet>        " + (fr ? "ouvrir l'étude de cas" : "open the case study"),
          fr ? "Profil" : "Profile",
          "  whoami · skills · ctf · certs · contact · cv",
          fr ? "Réglages" : "Settings",
          "  lang fr|en · theme · clear · exit",
          "CTF",
          "  hint · submit <flag>",
        );
      case "whoami":
        return out(
          `${profile.name} (${profile.alias})`,
          profile.role[lang],
          profile.tagline,
          profile.location[lang],
          `"${profile.doctrine}"`,
        );
      case "ls":
        if (!arg) return out(...SECTIONS.map((s) => `${s}/`), "cv.pdf");
        if (/^projects\/?$/.test(arg)) return out(...projects.map((p) => `${p.slug.padEnd(22)} ${p.tag[lang]}`));
        return err(`ls: ${arg}: ` + (fr ? "aucun dossier de ce nom" : "no such directory"));
      case "cat": {
        if (arg === "cv.pdf") return out(fr ? "Fichier binaire. Essaie `cv`." : "Binary file. Try `cv`.");
        const p = project(arg);
        if (!p) return err(`cat: ${arg || "?"}: ` + (fr ? "projet inconnu — `ls projects`" : "unknown project — `ls projects`"));
        return out(
          `${p.title} — ${p.tag[lang]}`,
          p.summary[lang],
          `stack: ${p.stack.join(", ")}`,
          (fr ? "→ `open " : "→ `open ") + p.slug + "`",
        );
      }
      case "open": {
        const p = project(arg);
        if (!p) return err(`open: ${arg || "?"}: ` + (fr ? "projet inconnu — `ls projects`" : "unknown project — `ls projects`"));
        go(`/${lang}/projects/${p.slug}`);
        return ok(`→ /${lang}/projects/${p.slug}`);
      }
      case "cd":
      case "goto": {
        const s = arg.replace(/\/$/, "").toLowerCase();
        if (!s || s === "~" || s === "/") {
          go(`/${lang}`);
          return ok("→ ~");
        }
        if ((SECTIONS as readonly string[]).includes(s)) {
          go(`/${lang}#${s}`);
          return ok(`→ #${s}`);
        }
        return err(`cd: ${arg}: ` + (fr ? "section inconnue — `ls`" : "unknown section — `ls`"));
      }
      case "skills":
        return skillGroups.flatMap((g) => out(`[${g.title[lang]}]`, "  " + g.items.join(" · ")));
      case "ctf":
        return out(...rankings.map((r) => `${r.title.padEnd(32)} ${r.value[lang].padEnd(12)} ${r.detail[lang]}`));
      case "certs":
        return out(...certifications.map((x) => `${x.date[lang].padEnd(10)} ${x.title} — ${x.org}`));
      case "experience":
        return out(
          `${experience.role[lang]} · ${experience.org} · ${experience.dates[lang]}`,
          ...experience.tasks.map((x) => `  [✓] ${x.n} ${x.title}`),
        );
      case "contact":
        return out(profile.email, profile.phone, ...socials.map((s) => `${s.label.padEnd(10)} ${s.href}`));
      case "cv":
        window.open(profile.cv, "_blank", "noopener");
        return ok(fr ? "CV ouvert dans un nouvel onglet." : "Résumé opened in a new tab.");
      case "lang": {
        const next = arg.toLowerCase();
        if (next !== "fr" && next !== "en") return err("usage: lang fr|en");
        if (next === lang) return out(fr ? "Déjà en français." : "Already in English.");
        go(pathname.replace(/^\/(fr|en)/, `/${next}`));
        return ok(`→ ${next}`);
      }
      case "theme":
        toggleMode();
        return ok(fr ? "Thème basculé." : "Theme switched.");
      case "hint":
        return out(
          fr ? "Un flag XENO{...} est caché dans ce site, en trois morceaux :" : "A flag XENO{...} is hidden in this site, in three parts:",
          fr ? "  1/3  lis le code source de la page" : "  1/3  read the page source",
          fr ? "  2/3  les robots indiquent le chemin" : "  2/3  the robots point the way",
          fr ? "  3/3  le serveur parle dans ses en-têtes" : "  3/3  the server talks in its headers",
          fr ? "Assemble-les, puis : submit XENO{...}" : "Put them together, then: submit XENO{...}",
        );
      case "submit": {
        if (!arg) return err("usage: submit XENO{...}");
        if ((await sha256(arg.trim())) === FLAG_SHA256)
          return [
            { tone: "ok", text: fr ? "✓ Flag valide. Bien joué." : "✓ Valid flag. Well played." },
            {
              tone: "out",
              text: fr
                ? `Écris-moi avec le flag en objet : ${profile.email}`
                : `Email me with the flag as the subject: ${profile.email}`,
            },
          ];
        return err(fr ? "✗ Ce n'est pas le bon flag. `hint` ?" : "✗ Not the right flag. `hint`?");
      }
      case "sudo":
        return err(fr ? "xeno n'est pas dans le fichier sudoers. Cet incident sera signalé." : "xeno is not in the sudoers file. This incident will be reported.");
      case "exit":
        setOpen(false);
        return [];
      default:
        return err(`${cmd}: ` + (fr ? "commande introuvable — `help`" : "command not found — `help`"));
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = value.trim();
    setValue("");
    if (!raw) return;
    history.current.unshift(raw);
    cursor.current = -1;
    if (raw.toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const result = await run(raw);
    setLines((prev) => [...prev.slice(-200), { tone: "in", text: raw }, ...result]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      cursor.current = Math.max(-1, Math.min(h.length - 1, cursor.current + (e.key === "ArrowUp" ? 1 : -1)));
      setValue(cursor.current < 0 ? "" : h[cursor.current]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = value.split(/\s+/);
      const last = parts[parts.length - 1].toLowerCase();
      const pool =
        parts.length === 1
          ? COMMANDS
          : parts[0] === "cd"
            ? [...SECTIONS]
            : parts[0] === "lang"
              ? ["fr", "en"]
              : ["projects", ...projects.map((p) => p.slug)];
      const hits = pool.filter((x) => x.startsWith(last));
      if (hits.length === 1) {
        parts[parts.length - 1] = hits[0];
        setValue(parts.join(" ") + (parts.length === 1 ? " " : ""));
      } else if (hits.length > 1) {
        setLines((prev) => [...prev, { tone: "dim", text: hits.join("   ") }]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const tone: Record<Tone, string> = {
    in: "text-fg",
    out: "text-muted",
    ok: "text-accent",
    err: "text-danger",
    dim: "text-dim",
  };
  const shown = lines.length ? lines : welcome();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-start justify-items-center bg-black/55 px-3 pt-[9vh] backdrop-blur-sm sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-dim">
              <span className="flex items-center gap-2">
                <TerminalIcon className="text-accent" />
                xeno@portfolio: ~
              </span>
              <button type="button" onClick={() => setOpen(false)} className="hover:text-fg">
                esc
              </button>
            </div>

            <div className="scroll-thin h-[min(52vh,26rem)] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6">
              {shown.map((l, i) => (
                <p key={i} className={`whitespace-pre-wrap break-words ${tone[l.tone]}`}>
                  {l.tone === "in" ? <span className="text-accent">❯ </span> : null}
                  {l.text}
                </p>
              ))}
              <div ref={endRef} />
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-sm">
              <span className="text-accent">❯</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full bg-transparent text-fg outline-none placeholder:text-dim"
                placeholder={fr ? "help, ls projects, open ghosteyes…" : "help, ls projects, open ghosteyes…"}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label={fr ? "Commande" : "Command"}
              />
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
