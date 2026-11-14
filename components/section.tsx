import type { ReactNode } from "react";
import type { Zone } from "@/lib/content";
import { Reveal } from "./reveal";

export function Section({
  id,
  zone,
  kicker,
  title,
  children,
}: {
  id: string;
  zone: Zone;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-zone={zone} className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="kicker">{kicker}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
