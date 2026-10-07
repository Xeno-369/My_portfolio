"use client";

import { useEffect, useRef, useState } from "react";

export function PointerFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    enabled.current = true;
    setOn(true);
    document.documentElement.dataset.cursor = "on";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hover = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      document.documentElement.style.setProperty("--spot-x", `${x}px`);
      document.documentElement.style.setProperty("--spot-y", `${y}px`);
      const t = e.target as HTMLElement | null;
      hover = Boolean(
        t?.closest("a, button, input, textarea, [data-cursor='hover']"),
      );
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ring.current) {
        const s = hover ? 1.65 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${s})`;
        ring.current.dataset.hot = hover ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  if (!on) return null;

  return (
    <>
      <div className="spot pointer-events-none fixed inset-0 z-30" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
