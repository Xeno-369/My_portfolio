"use client";

import { useEffect, useRef } from "react";

type Blip = { angle: number; dist: number; born: number };

const RANGE = 60; // cm affichés
const STEP = 2; // degrés par pas, comme le servo réel

/**
 * Reproduction du comportement de GhostEyes : balayage 180° par pas de 2°,
 * servo figé sur la cible, alerte graduée en trois zones, reprise du scan.
 */
export function Radar({
  labels,
  className = "",
}: {
  labels: { scanning: string; alert: string; angle: string; distance: string; zone: string };
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const angleRef = useRef<HTMLSpanElement>(null);
  const distRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let angle = 0;
    let dir = 1;
    let last = 0;
    let lockUntil = 0;
    let target = newTarget();
    let locked: Blip | null = null;
    const blips: Blip[] = [];
    let css = readCss();
    let frame = 0;

    function newTarget() {
      return { angle: 12 + Math.round(Math.random() * 78) * 2, dist: 8 + Math.random() * 46 };
    }
    function readCss() {
      const s = getComputedStyle(document.documentElement);
      const v = (n: string, d: string) => s.getPropertyValue(n).trim() || d;
      return {
        accent: v("--accent", "#55d2c8"),
        green: v("--green", "#76e2a6"),
        warn: v("--warn", "#f2b84b"),
        danger: v("--danger", "#f2777a"),
        muted: v("--muted", "#94a2b1"),
        line: v("--line-strong", "rgba(255,255,255,.16)"),
      };
    }
    const level = (d: number) => (d < 15 ? css.danger : d < 30 ? css.warn : css.green);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const polar = (cx: number, cy: number, R: number, deg: number, d: number) => {
      const a = (deg * Math.PI) / 180;
      const r = (d / RANGE) * R;
      return [cx - Math.cos(a) * r, cy - Math.sin(a) * r] as const;
    };

    function draw(now: number) {
      const cx = w / 2;
      const cy = h - 14;
      const R = Math.min(w / 2 - 14, h - 28);
      ctx!.clearRect(0, 0, w, h);
      if (R <= 0) return; // cadre pas encore dimensionné

      // grille
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = css.line;
      ctx!.fillStyle = css.muted;
      ctx!.font = "10px ui-monospace, monospace";
      for (let i = 1; i <= 4; i++) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, (R * i) / 4, Math.PI, 2 * Math.PI);
        ctx!.stroke();
        ctx!.fillText(`${(RANGE * i) / 4}`, cx + (R * i) / 4 - 14, cy + 11);
      }
      for (let d = 0; d <= 180; d += 30) {
        const [x, y] = polar(cx, cy, R, d, RANGE);
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(x, y);
        ctx!.stroke();
      }

      // traînée du faisceau
      const a = (angle * Math.PI) / 180;
      const trail = (26 * Math.PI) / 180;
      const from = Math.PI + a;
      for (let i = 0; i < 13; i++) {
        const t0 = from - dir * (trail * i) / 13;
        const t1 = from - dir * (trail * (i + 1)) / 13;
        ctx!.globalAlpha = 0.16 * (1 - i / 13);
        ctx!.fillStyle = locked ? level(locked.dist) : css.accent;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.arc(cx, cy, R, Math.min(t0, t1), Math.max(t0, t1));
        ctx!.closePath();
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // faisceau
      const [bx, by] = polar(cx, cy, R, angle, RANGE);
      ctx!.strokeStyle = locked ? level(locked.dist) : css.accent;
      ctx!.lineWidth = 1.6;
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(bx, by);
      ctx!.stroke();

      // échos
      for (let i = blips.length - 1; i >= 0; i--) {
        const b = blips[i];
        const age = (now - b.born) / 4200;
        if (age >= 1) {
          blips.splice(i, 1);
          continue;
        }
        const [x, y] = polar(cx, cy, R, b.angle, b.dist);
        ctx!.fillStyle = level(b.dist);
        ctx!.globalAlpha = 1 - age;
        ctx!.beginPath();
        ctx!.arc(x, y, 3.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = (1 - age) * 0.35;
        ctx!.beginPath();
        ctx!.arc(x, y, 3.4 + age * 16, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      ctx!.fillStyle = css.accent;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx!.fill();
    }

    const readout = () => {
      if (statusRef.current) statusRef.current.textContent = locked ? labels.alert : labels.scanning;
      if (dotRef.current) dotRef.current.style.background = locked ? level(locked.dist) : css.accent;
      if (angleRef.current) angleRef.current.textContent = `${String(angle).padStart(3, "0")}°`;
      if (distRef.current)
        distRef.current.textContent = locked ? `${locked.dist.toFixed(0).padStart(2, "0")} cm` : "— cm";
    };

    const tick = (now: number) => {
      if (visible) {
        if (frame++ % 30 === 0) css = readCss();
        if (now >= lockUntil) {
          if (locked) {
            locked = null; // la cible a disparu : reprise du balayage
            target = newTarget();
          }
          if (now - last > 26) {
            last = now;
            angle += dir * STEP;
            if (angle >= 180) {
              angle = 180;
              dir = -1;
            } else if (angle <= 0) {
              angle = 0;
              dir = 1;
            }
            if (angle === target.angle) {
              locked = { ...target, born: now };
              blips.push(locked);
              lockUntil = now + 1500; // servo figé sur la cible
            }
            readout();
          }
        }
        draw(now);
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    if (reduce) {
      angle = 62;
      locked = { angle: 62, dist: 24, born: performance.now() };
      blips.push(locked);
      readout();
      draw(performance.now());
    } else {
      readout();
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [labels.alert, labels.scanning]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} aria-hidden className="aspect-[2/1.08] w-full" />
      <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line font-mono text-xs">
        <p className="flex items-center gap-2 bg-surface px-3 py-2.5">
          <span ref={dotRef} className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span ref={statusRef} className="truncate text-fg">
            {labels.scanning}
          </span>
        </p>
        <p className="bg-surface px-3 py-2.5 text-muted">
          {labels.angle} <span ref={angleRef} className="text-fg">000°</span>
        </p>
        <p className="bg-surface px-3 py-2.5 text-muted">
          {labels.distance} <span ref={distRef} className="text-fg">— cm</span>
        </p>
      </div>
      <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-dim">
        <span className="inline-flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" /> &gt; 30 cm
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-warn" /> 15–30 cm
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-danger" /> &lt; 15 cm
        </span>
        <span>{labels.zone}</span>
      </p>
    </div>
  );
}
