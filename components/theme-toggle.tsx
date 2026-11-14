"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./icons";

type Mode = "night" | "day";

const subscribe = (cb: () => void) => {
  window.addEventListener("xeno:mode", cb);
  return () => window.removeEventListener("xeno:mode", cb);
};
const read = (): Mode => (document.documentElement.dataset.mode === "day" ? "day" : "night");

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => "night");
}

export function toggleMode() {
  const root = document.documentElement;
  const next: Mode = root.dataset.mode === "day" ? "night" : "day";
  root.dataset.mode = next;
  try {
    localStorage.setItem("xeno-mode", next);
  } catch {}
  window.dispatchEvent(new Event("xeno:mode"));
}

export function ThemeToggle({ toDay, toNight }: { toDay: string; toNight: string }) {
  const mode = useMode();
  const label = mode === "night" ? toDay : toNight;
  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {mode === "night" ? <Sun /> : <Moon />}
    </button>
  );
}
