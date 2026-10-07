import { profile, socials } from "@/lib/content";
import { Hud } from "./hud";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12 pb-24">
      <p className="font-mono text-xs tracking-[0.32em] text-[var(--accent)] uppercase">
        //07. handshake
      </p>
      <h2 className="font-display mt-2 text-3xl md:text-4xl">Contact</h2>
      <Hud className="mt-8 grid gap-6 p-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-[var(--muted)]">
            Ouvert aux collabs CTF, projets IoT / réseaux et systèmes embarqués.
          </p>
          <p className="mt-3 font-mono text-xs text-[var(--accent)]">{profile.doctrine}</p>
          <ul className="mt-5 space-y-2 font-mono text-sm">
            <li>
              <a className="hover:text-[var(--accent)]" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>{profile.phone}</li>
            <li>{profile.location}</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-3 font-mono text-xs tracking-widest uppercase">
          {socials.map((s) => (
            <a key={s.label} className="hud px-4 py-3" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
          <a className="hud px-4 py-3 bg-[var(--accent)] text-[var(--bg)]" href={profile.cv}>
            Télécharger le CV
          </a>
        </div>
      </Hud>
    </section>
  );
}
