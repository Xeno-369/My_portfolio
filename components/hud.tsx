import type { ReactNode } from "react";

export function Hud({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`hud relative ${className}`}>
      {label ? (
        <span className="absolute -top-2.5 left-4 bg-[var(--bg)] px-2 font-mono text-[10px] tracking-[0.28em] text-[var(--accent)] uppercase">
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}
