"use client";

import { Contact } from "./contact";
import { Experience } from "./experience";
import { PointerFX } from "./fx";
import { Hall } from "./hall";
import { Hero } from "./hero";
import { Nav } from "./nav";
import { Projects } from "./projects";
import { Skills } from "./skills";
import { Terminal } from "./terminal";
import { ThemeProvider } from "./theme";

export function Shell() {
  return (
    <ThemeProvider>
      <div id="top" className="relative min-h-screen">
        <PointerFX />
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <Nav />
        <main className="relative">
          <Hero />
          <Terminal />
          <Experience />
          <Projects />
          <Skills />
          <Hall />
          <Contact />
        </main>
        <footer className="border-t border-[var(--line)] py-6 text-center font-mono text-[10px] tracking-[0.28em] text-[var(--dim)] uppercase">
          Xeno_369 · dual core online · {new Date().getFullYear()}
        </footer>
      </div>
    </ThemeProvider>
  );
}
