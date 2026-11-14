"use client";

import { useState } from "react";
import { Check } from "./icons";

export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
    >
      {done ? <Check /> : null}
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
