export const profile = {
  name: "Victor Yanfouom Kanfitine",
  alias: "Xeno_369",
  mottoDay: "Computer Science Student by day.",
  mottoNight: "CTF Player by night.",
  roleEngineer: "Ingénieur Systèmes, Réseaux & IoT",
  roleCyber: "CTF Player · Cybersécurité",
  headline:
    "Étudiant ingénieur IAI-Togo — systèmes, réseaux, IoT embarqué et cybersécurité offensive.",
  location: "Lomé, Togo",
  email: "newtonvictor38@gmail.com",
  phone: "+228 71 64 32 87",
  github: "https://github.com/Xeno-369",
  linkedin:
    "https://www.linkedin.com/in/victor-yanfouom-kanfitine-20521935b",
  discord: "https://discord.gg/3h8K5hyS",
  mastodon: "https://mastodon.social/@VictorNEWTON",
  twitter: "https://x.com/_Xeno_369",
  cyberini: "https://cyberini.com/profil-ctf/?j=xeno369",
  tryhackme: "https://tryhackme.com/p/Xeno369",
  cv: "/cv.pdf",
  photo: "/me/main.png",
  doctrine:
    "Understand the break. Own the fix. Leave the system stronger.",
  mission:
    "Je construis des systèmes de détection temps réel et je résous des challenges crypto / reverse — pour sécuriser les équipements connectés et fiabiliser le contrôle.",
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Discord", href: profile.discord },
  { label: "Cyberini", href: profile.cyberini },
  { label: "TryHackMe", href: profile.tryhackme },
  { label: "X / Twitter", href: profile.twitter },
  { label: "Mastodon", href: profile.mastodon },
];

export const stats = [
  {
    label: "Cyberini",
    value: "5e",
    detail: "7 710 pts · 58 flags · Cyber Maître",
    href: profile.cyberini,
  },
  {
    label: "TryHackMe",
    value: "Top 15%",
    detail: "3 356 pts · 41 salles · lv.7",
    href: profile.tryhackme,
  },
  { label: "IAI-Togo", value: "L2", detail: "Systèmes & Réseaux" },
  { label: "GitHub", value: "13", detail: "repos publics", href: profile.github },
];

export const projects = [
  {
    id: "ghosteyes",
    featured: true,
    title: "GhostEyes",
    tag: "Projet phare · IoT embarqué",
    stack: ["C / Arduino", "Processing 4", "HC-SR04", "SG90", "LCD I2C"],
    href: "https://github.com/Xeno-369/GhostEyes_Project",
    image: "/projects/ghosteyes/GE_final1.png",
    gallery: [
      "/projects/ghosteyes/GE_final1.png",
      "/projects/ghosteyes/GE_final2.png",
      "/projects/ghosteyes/GE_final3.png",
      "/projects/ghosteyes/circuit.png",
      "/generated/ghosteyes-sonar.jpg",
    ],
    summary:
      "Radar ultrason intelligent : balayage 180°, servo figé sur cible, alertes 3 niveaux, LCD 16×2 et IHM sonar temps réel. Montage physique opérationnel — vitrine hardware.",
  },
  {
    id: "miabe",
    featured: true,
    title: "ChainCacao — MIABE 2026",
    tag: "Hackathon · Blockchain · Traçabilité",
    stack: ["Solidity", "Polygon Amoy", "RPC", "Web", "Mobile"],
    href: "https://tracabilit-web.vercel.app/",
    image: "/projects/miabe/chaincacao-web-home.png",
    gallery: [
      "/projects/miabe/chaincacao-web-home.png",
      "/projects/miabe/chaincacao-web-verify.png",
      "/projects/miabe/chaincacao-web-dashboard.png",
      "/projects/miabe/chaincacao-mobile-login.png",
    ],
    summary:
      "Chaîne Cacao : traçabilité EUDR du café et cacao togolais, de la parcelle à l’importateur. App web (vérification de lots, dashboards rôles) + app mobile agriculteur. Smart contract Solidity, RPC Polygon Amoy, frontend refactorisé en composants.",
    demos: [
      { label: "App web", href: "https://tracabilit-web.vercel.app/" },
      {
        label: "App mobile",
        href: "https://tracabilite-mobile-agriculteur-d42w.vercel.app/",
      },
    ],
  },
  {
    id: "cryptoarsenal",
    title: "CryptoArsenal",
    tag: "CTF · Crypto",
    stack: ["Python", "RSA / AES", "ECDSA", "encodings"],
    href: "https://github.com/Xeno-369/CryptoArsenal",
    image: "/generated/cryptoarsenal.jpg",
    summary:
      "Boîte à outils crypto de compétition : modules RSA, AES, XOR, chiffrements classiques et encodages multi-couches, validés sur des flags réels.",
  },
  {
    id: "ghtrace",
    title: "OSINT_GHTRACE",
    tag: "OSINT",
    stack: ["Python", "GH Archive", "ClickHouse"],
    href: "https://github.com/Xeno-369/OSINT_GHTRACE",
    image: "/generated/ghtrace.jpg",
    summary:
      "CLI sans dépendance pour retracer l’activité GitHub publique (timeline + détail) à partir des archives GH Archive — CTF, auto-audit, données déjà publiques.",
  },
];

export const experience = [
  {
    id: "codealpha",
    org: "CodeAlpha",
    role: "Stagiaire cybersécurité",
    dates: "30 sept. 2026 — 30 oct. 2026",
    status: "En cours · 2 / 4 missions",
    brief: "/stage/CodeAlpha-M1-tasks.pdf",
    summary:
      "Stage CodeAlpha (Cyber Security, promo M1) : un seul cadre, quatre missions prévues. Ce n’est pas encore clos — sniffer et revue de code sont livrés ; sensibilisation phishing et NIDS sont en mise en place.",
    tasks: [
      {
        n: "01",
        title: "Basic Network Sniffer",
        status: "livré" as const,
        detail:
          "Capture Python (Scapy / socket) : IPs source/destination, protocoles, payloads — lab autorisé uniquement.",
        href: "https://github.com/Xeno-369/CodeAlpha_NetworkSniffer",
      },
      {
        n: "02",
        title: "Phishing Awareness Training",
        status: "en cours" as const,
        detail:
          "Module de sensibilisation : reconnaître emails et sites frauduleux, ingénierie sociale, bonnes pratiques, quiz.",
      },
      {
        n: "03",
        title: "Secure Coding Review",
        status: "livré" as const,
        detail:
          "Audit applicatif (OWASP Juice Shop) : findings, reco secure coding, documentation de remédiation.",
        href: "https://github.com/Xeno-369/CodeAlpha_SecureCodingReview",
      },
      {
        n: "04",
        title: "Network IDS",
        status: "en cours" as const,
        detail:
          "NIDS (Snort / Suricata) : règles, alertes, supervision du trafic, visualisation optionnelle des détections.",
      },
    ],
    skills: [
      "Python",
      "Scapy",
      "Analyse de paquets",
      "OWASP",
      "Revue de code",
      "Sensibilisation phishing",
      "NIDS",
      "Snort / Suricata",
    ],
    images: ["/generated/sniffer.jpg", "/generated/secure-review.jpg"],
  },
];

export const skillGroups = [
  {
    title: "Cybersécurité",
    items: [
      "Pentest web",
      "Cryptographie appliquée",
      "Post-quantique",
      "Forensic",
      "Reverse engineering",
      "OSINT",
      "AppSec / OWASP",
    ],
  },
  {
    title: "Systèmes & réseaux",
    items: [
      "Linux / Kali",
      "TCP/IP",
      "Routage",
      "Commutation",
      "Wireshark",
      "Nmap",
      "Nginx / Apache",
    ],
  },
  {
    title: "Développement",
    items: ["Python", "C", "Java", "Bash", "Pascal", "JavaScript", "Solidity", "PowerShell"],
  },
  {
    title: "IoT & embarqué",
    items: ["Arduino", "UART / I2C", "Capteurs", "Acquisition temps réel", "Processing"],
  },
];

export const certifications = [
  {
    title: "CCNA — Introduction to Networks",
    org: "Cisco Networking Academy · IAI-TOGO",
    date: "Jul 2026",
  },
  {
    title: "Introduction to Cybersecurity",
    org: "Cisco Networking Academy",
    date: "Aug 2026",
  },
  {
    title: "NDG Linux Essentials",
    org: "Cisco Networking Academy",
    date: "Aug 2026",
  },
  {
    title: "Linux Unhatched",
    org: "Cisco Networking Academy",
    date: "Apr 2026",
  },
  {
    title: "NSE 1 — Cybersecurity & Cloud Fundamentals",
    org: "Fortinet Training Institute",
    date: "Aug 2026",
  },
  {
    title: "MOOC Cybersécurité",
    org: "Cyberini",
    date: "Apr 2026",
  },
  {
    title: "Validation formation — 25 000 XP",
    org: "MIABE Hackathon 2026",
    date: "Fév 2026",
  },
];

export const rankings = [
  {
    title: "Cyberini — 5e / 5 377",
    detail: "Top 1 % · 7 710 pts · 58 challenges · rang Cyber Maître",
    href: profile.cyberini,
  },
  {
    title: "TryHackMe — Top 15 %",
    detail: "3 356 pts · 41 salles · niveau 7 · ligue Silver · 8 badges",
    href: profile.tryhackme,
  },
  {
    title: "CTF National · ANSI",
    detail: "Participations aux CTF nationaux organisés par l’ANSI",
  },
  {
    title: "CTFtime & CTF en ligne",
    detail: "Compétitions CTFtime et épreuves distantes, en plus du circuit national",
  },
  {
    title: "EcowasCTF",
    detail: "Participation régionale — pentest web, crypto, forensic, reverse",
  },
  {
    title: "Root-Me · HackTheBox",
    detail: "Entraînement actif sur les deux plateformes — labs, challenges, régularité. Pas de stats publiques affichées.",
  },
];

export const tools = [
  { name: "Python", slug: "python" },
  { name: "C", slug: "c" },
  { name: "Java", slug: "openjdk" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Bash", slug: "gnubash" },
  { name: "Solidity", slug: "solidity" },
  { name: "Linux", slug: "linux" },
  { name: "Kali", slug: "kalilinux" },
  { name: "Arduino", slug: "arduino" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Wireshark", slug: "wireshark" },
  { name: "Burp Suite", slug: "burpsuite" },
  { name: "Ghidra", slug: "ghidra" },
  { name: "Nmap", slug: "nmap" },
  { name: "Nginx", slug: "nginx" },
  { name: "Apache", slug: "apache" },
  { name: "Cloudflare", slug: "cloudflare" },
];
