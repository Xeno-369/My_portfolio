"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/content";
import { Hud } from "./hud";

export function Hero() {
  return (
    <section id="profil" className="relative mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
      <div>
        <p className="font-mono text-xs tracking-[0.32em] text-[var(--accent)] uppercase">
          initiating user_ // {profile.alias}
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display mt-4 text-4xl leading-[1.05] md:text-6xl"
        >
          {profile.name}
        </motion.h1>
        <p className="font-display mt-4 text-sm tracking-[0.08em] text-[var(--accent)] md:text-lg">
          {profile.mottoDay}
          <br />
          {profile.mottoNight}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
          {profile.headline}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--fg)]/80">
          {profile.mission}
        </p>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] tracking-widest uppercase">
          <span className="hud px-3 py-2">{profile.roleEngineer}</span>
          <span className="hud px-3 py-2 text-[var(--accent)]">{profile.roleCyber}</span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => {
            const inner = (
              <Hud className="h-full px-3 py-3">
                <p className="font-mono text-[10px] tracking-widest text-[var(--dim)] uppercase">
                  {s.label}
                </p>
                <p className="font-display mt-1 text-lg text-[var(--accent)]">{s.value}</p>
                <p className="text-[11px] text-[var(--muted)]">{s.detail}</p>
              </Hud>
            );
            return s.href ? (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={s.label}>{inner}</div>
            );
          })}
        </div>
      </div>

      <Hud label="portrait.exe" className="overflow-hidden p-2">
        <div className="portrait-glow relative aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photo}
            alt={`Portrait de ${profile.name}`}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-25 bg-[linear-gradient(180deg,transparent,var(--accent))]" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[10px] tracking-widest text-[var(--accent)]">
            <span>REC ● LIVE</span>
            <span>Xeno_369</span>
          </div>
        </div>
      </Hud>
    </section>
  );
}
