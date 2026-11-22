"use client";

import { useEffect, useRef, useState } from "react";

const MAIN = "Hello, friend.";
const SUB = "you're in. — xeno_369";

type Phase = "typing" | "hold" | "glitch" | "out";

/**
 * Séquence d'intro façon Mr. Robot : écran noir, machine à écrire « Hello, friend. »,
 * scanlines CRT, burst glitch, puis fondu qui révèle le site.
 * Ne s'affiche qu'une fois par session. Un clic ou une touche la passe.
 */
export function BootIntro() {
  const [mounted, setMounted] = useState(false);
  const [typed, setTyped] = useState("");
  const [sub, setSub] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("xeno-boot") === "1") return;
      sessionStorage.setItem("xeno-boot", "1");
    } catch {
      /* stockage bloqué : on joue quand même l'intro */
    }

    setMounted(true);
    const push = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    const clearAll = () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
    const dismiss = () => {
      clearAll();
      setPhase("out");
      window.setTimeout(() => setMounted(false), 600);
    };

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setTyped(MAIN);
      setSub(SUB);
      setPhase("hold");
      push(() => setPhase("out"), 1500);
      push(() => setMounted(false), 2150);
    } else {
      // Minutage calibré pour une intro de 6,7 s au total (frappe + pauses + glitch + fondu).
      const start = 650;
      const speed = 118;
      for (let i = 1; i <= MAIN.length; i++) {
        push(() => setTyped(MAIN.slice(0, i)), start + i * speed);
      }
      const afterMain = start + MAIN.length * speed + 820;
      for (let i = 1; i <= SUB.length; i++) {
        push(() => setSub(SUB.slice(0, i)), afterMain + i * 38);
      }
      const afterSub = afterMain + SUB.length * 38 + 1030;
      push(() => setPhase("glitch"), afterSub);
      push(() => setPhase("out"), afterSub + 850);
      push(() => setMounted(false), afterSub + 850 + 900);
    }

    const onKey = () => dismiss();
    const onClick = () => dismiss();
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);

    return () => {
      clearAll();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`boot boot--${phase}`} role="presentation" aria-hidden>
      <div className="boot__scan" />
      <div className="boot__noise" />
      <div className="boot__center">
        <p className="boot__line" data-text={typed}>
          {typed}
          <span className="boot__cursor" />
        </p>
        <p className="boot__sub">{sub}</p>
      </div>
      <span className="boot__skip">press any key</span>
    </div>
  );
}
