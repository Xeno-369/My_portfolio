import { profile, socials } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowUpRight, Download } from "./icons";
import { CopyEmail } from "./copy-email";
import { Reveal } from "./reveal";

export function Contact({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <section id="contact" data-zone="green" className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="card relative overflow-hidden p-7 sm:p-12 md:p-16">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <p className="kicker">{t.contact.kicker}</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {t.contact.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t.contact.body}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            {t.contact.write}
          </a>
          <CopyEmail email={profile.email} copy={t.contact.copy} copied={t.contact.copied} />
          <a href={profile.cv} className="btn">
            <Download />
            {t.heroCv}
          </a>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-[auto_1fr] sm:gap-16">
          <div className="space-y-1.5 font-mono text-sm text-muted">
            <p className="text-fg">{profile.email}</p>
            <p>{profile.phone}</p>
            <p>{profile.location[lang]}</p>
          </div>
          <ul className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link inline-flex items-center gap-1 text-muted"
                >
                  {s.label}
                  <ArrowUpRight width={13} height={13} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <p className="mt-10 text-center font-mono text-xs text-dim">“{profile.doctrine}”</p>
    </section>
  );
}
