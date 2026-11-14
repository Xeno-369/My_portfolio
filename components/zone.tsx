"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Suit la section située au milieu de l'écran et reporte sa « zone »
 * (blue / teal / green) sur <html> : le CSS fait glisser la couleur d'accent.
 */
export function ZoneWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-zone]")).filter(
      (n) => n !== root,
    );
    if (!nodes.length) {
      delete root.dataset.zone;
      return;
    }
    root.dataset.zone = nodes[0].dataset.zone;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) root.dataset.zone = (e.target as HTMLElement).dataset.zone;
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
