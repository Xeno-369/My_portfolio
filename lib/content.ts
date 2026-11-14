import { l, type L } from "./i18n";

export type Zone = "blue" | "teal" | "green";

export const profile = {
  name: "Victor Yanfouom Kanfitine",
  alias: "Xeno_369",
  role: l(
    "Étudiant ingénieur · systèmes, réseaux & cybersécurité",
    "Engineering student · systems, networks & cybersecurity",
  ),
  tagline: l(
    "Je casse des systèmes pour comprendre comment les rendre solides.",
    "I break systems to understand how to make them hold.",
  ),
  intro: l(
    "En 2ᵉ année à l'IAI-Togo, je construis des outils de détection, j'audite du code et je joue en CTF. Ce site montre le travail, pas le décor.",
    "Second-year student at IAI-Togo. I build detection tools, audit code and play CTFs. This site shows the work, not the scenery.",
  ),
  doctrine: "Understand the break. Own the fix. Leave the system stronger.",
  location: l("Lomé, Togo", "Lomé, Togo"),
  email: "newtonvictor38@gmail.com",
  phone: "+228 71 64 32 87",
  github: "https://github.com/Xeno-369",
  linkedin: "https://www.linkedin.com/in/victor-yanfouom-kanfitine-20521935b",
  discord: "https://discord.gg/3h8K5hyS",
  mastodon: "https://mastodon.social/@VictorNEWTON",
  twitter: "https://x.com/_Xeno_369",
  cyberini: "https://cyberini.com/profil-ctf/?j=xeno369",
  tryhackme: "https://tryhackme.com/p/Xeno369",
  cv: "/cv.pdf",
  photo: "/me/main.png",
  site: "https://kanfitine-victor.vercel.app",
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "TryHackMe", href: profile.tryhackme },
  { label: "Cyberini", href: profile.cyberini },
  { label: "Discord", href: profile.discord },
  { label: "X", href: profile.twitter },
  { label: "Mastodon", href: profile.mastodon },
];

export const stats: { value: string; label: L; href?: string }[] = [
  {
    value: "5ᵉ / 5 377",
    label: l("Cyberini · top 1 %", "Cyberini · top 1%"),
    href: profile.cyberini,
  },
  {
    value: "41",
    label: l("salles TryHackMe · niveau 7", "TryHackMe rooms · level 7"),
    href: profile.tryhackme,
  },
  { value: "4 / 4", label: l("missions de stage livrées", "internship tasks shipped") },
  { value: "6", label: l("certifications", "certifications") },
];

/* ------------------------------------------------------------------ */
/* Expérience                                                          */
/* ------------------------------------------------------------------ */

export const experience = {
  org: "CodeAlpha",
  role: l("Stagiaire cybersécurité", "Cybersecurity intern"),
  dates: l("30 sept. — 30 oct. 2026 · à distance", "Sep 30 — Oct 30, 2026 · remote"),
  summary: l(
    "Un mois, quatre missions, toutes livrées : de la capture de paquets à la détection d'intrusion, en passant par un audit de code documenté faille par faille.",
    "One month, four tasks, all shipped: from packet capture to intrusion detection, with a code audit documented finding by finding.",
  ),
  brief: "/stage/CodeAlpha-M1-tasks.pdf",
  tasks: [
    {
      n: "01",
      title: "Network Sniffer",
      detail: l(
        "Capture et analyse de paquets en Python / Scapy : adresses source et destination, protocoles, payloads. Interface et volume paramétrables, arrêt propre, usage en lab uniquement.",
        "Packet capture and analysis in Python / Scapy: source and destination addresses, protocols, payloads. Configurable interface and volume, clean shutdown, lab use only.",
      ),
      tags: ["Python", "Scapy"],
      repo: "https://github.com/Xeno-369/CodeAlpha_NetworkSniffer",
      slug: null as string | null,
    },
    {
      n: "02",
      title: "Phishing Awareness",
      detail: l(
        "Module de sensibilisation : reconnaître un e-mail ou un site frauduleux, comprendre l'ingénierie sociale, adopter les bons réflexes.",
        "Awareness module: spotting fraudulent emails and sites, understanding social engineering, building the right reflexes.",
      ),
      tags: ["Awareness", "Social engineering"],
      repo: null as string | null,
      slug: null as string | null,
    },
    {
      n: "03",
      title: "Secure Coding Review",
      detail: l(
        "Audit du code d'OWASP Juice Shop : 48 dépendances vulnérables relevées, 3 failles documentées avec cause racine, preuve de concept et correctif.",
        "Source audit of OWASP Juice Shop: 48 vulnerable dependencies flagged, 3 findings documented with root cause, proof of concept and fix.",
      ),
      tags: ["OWASP", "CWE-89", "CWE-22", "CWE-79"],
      repo: "https://github.com/Xeno-369/CodeAlpha_SecureCodingReview",
      slug: "secure-coding-review",
    },
    {
      n: "04",
      title: "Network IDS",
      detail: l(
        "Snort 3 déployé sous Kali : deux règles locales (ping ICMP, scan SYN), configuration validée sans avertissement, alertes confirmées en conditions réelles.",
        "Snort 3 deployed on Kali: two local rules (ICMP ping, SYN scan), configuration validated with zero warnings, alerts confirmed under real traffic.",
      ),
      tags: ["Snort 3", "Kali", "Nmap"],
      repo: "https://github.com/Xeno-369/CodeAlpha_NetworkIDS",
      slug: "network-ids",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */

export type Finding = {
  title: L;
  severity: "critical" | "high";
  cwe: string;
  where: string;
  status: L;
  fix: L;
};

export type Project = {
  slug: string;
  zone: Zone;
  featured?: boolean;
  title: string;
  tag: L;
  year: string;
  role: L;
  summary: L;
  stack: string[];
  cover?: string;
  gallery?: { src: string; w: number; h: number }[];
  links: { label: L; href: string }[];
  problem: L;
  approach: L[];
  result: L[];
  limits?: L[];
  findings?: Finding[];
  rules?: { name: L; rule: string; why: L }[];
  alerts?: string[];
  modules?: { name: string; technique: L; testedOn: L }[];
};

export const projects: Project[] = [
  {
    slug: "ghosteyes",
    zone: "teal",
    featured: true,
    title: "GhostEyes",
    tag: l("IoT embarqué · détection temps réel", "Embedded IoT · real-time detection"),
    year: "2026",
    role: l("Conception, électronique, firmware et interface", "Design, electronics, firmware and interface"),
    summary: l(
      "Un radar à ultrasons qui balaie 180°, se fige sur la cible et gradue l'alerte en trois niveaux. Monté, câblé, opérationnel.",
      "An ultrasonic radar that sweeps 180°, locks on its target and grades the alert in three levels. Built, wired, working.",
    ),
    stack: ["C / Arduino", "Processing 4", "HC-SR04", "SG90", "LCD I2C", "UART 9600"],
    cover: "/projects/ghosteyes/GE_final1.png",
    gallery: [
      { src: "/projects/ghosteyes/GE_final1.png", w: 1380, h: 752 },
      { src: "/projects/ghosteyes/GE_final2.png", w: 1408, h: 768 },
      { src: "/projects/ghosteyes/GE_final3.png", w: 1380, h: 752 },
      { src: "/projects/ghosteyes/circuit.png", w: 2684, h: 1643 },
    ],
    links: [{ label: l("Code source", "Source code"), href: "https://github.com/Xeno-369/GhostEyes_Project" }],
    problem: l(
      "Surveiller une zone sans caméra : savoir qu'un objet approche, à quelle distance et dans quelle direction, avec du matériel à quelques euros.",
      "Watching an area without a camera: knowing that something is approaching, how far and from where, with hardware that costs a few euros.",
    ),
    approach: [
      l(
        "Un capteur HC-SR04 monté sur un servomoteur SG90 balaie 180° par pas de 2°, avec gestion du timeout de mesure.",
        "An HC-SR04 sensor mounted on an SG90 servo sweeps 180° in 2° steps, with measurement timeout handling.",
      ),
      l(
        "À la détection, le servo se fige sur l'angle de la cible, puis reprend le balayage quand elle disparaît.",
        "On detection the servo locks on the target's angle, then resumes the sweep once it is gone.",
      ),
      l(
        "Trois zones de proximité à seuils configurables pilotent les LED verte, jaune, rouge et le buzzer.",
        "Three proximity zones with configurable thresholds drive the green, yellow and red LEDs and the buzzer.",
      ),
      l(
        "L'Arduino envoie « angle,distance » en série à 9600 bauds ; une interface Processing 4 dessine le sonar en direct, un LCD I2C affiche l'état.",
        "The Arduino streams “angle,distance” over serial at 9600 baud; a Processing 4 interface draws the sonar live and an I2C LCD shows the status.",
      ),
    ],
    result: [
      l("Montage complet sur support physique, présentable et opérationnel.", "Fully assembled on a physical mount, presentable and working."),
      l("Détection, verrouillage et alerte graduée fonctionnent de bout en bout.", "Detection, lock-on and graded alerting work end to end."),
      l("Filtrage du bruit de mesure et boîtier imprimé en 3D en cours.", "Measurement noise filtering and a 3D-printed case in progress."),
    ],
  },
  {
    slug: "chaincacao",
    zone: "green",
    featured: true,
    title: "ChainCacao",
    tag: l("Hackathon MIABE 2026 · blockchain", "MIABE Hackathon 2026 · blockchain"),
    year: "2026",
    role: l("Intégrateur blockchain, en équipe", "Blockchain integrator, in a team"),
    summary: l(
      "Tracer le cacao et le café togolais de la parcelle à l'importateur, pour répondre au règlement européen EUDR.",
      "Tracing Togolese cocoa and coffee from plot to importer, to meet the EU deforestation regulation (EUDR).",
    ),
    stack: ["Solidity", "Remix IDE", "Polygon Amoy", "RPC", "Web", "Mobile"],
    cover: "/projects/miabe/chaincacao-web-home.png",
    gallery: [
      { src: "/projects/miabe/chaincacao-web-home.png", w: 1777, h: 962 },
      { src: "/projects/miabe/chaincacao-web-verify.png", w: 1777, h: 962 },
      { src: "/projects/miabe/chaincacao-web-dashboard.png", w: 1777, h: 962 },
    ],
    links: [
      { label: l("Application web", "Web app"), href: "https://tracabilit-web.vercel.app/" },
      { label: l("Application mobile", "Mobile app"), href: "https://tracabilite-mobile-agriculteur-d42w.vercel.app/" },
    ],
    problem: l(
      "L'Europe exige désormais de prouver l'origine de chaque lot de cacao et de café. Sans traçabilité vérifiable, les producteurs togolais perdent l'accès à ce marché.",
      "Europe now requires proof of origin for every batch of cocoa and coffee. Without verifiable traceability, Togolese producers lose access to that market.",
    ),
    approach: [
      l("Smart contract en Solidity, développé et testé sous Remix IDE.", "Smart contract in Solidity, developed and tested in Remix IDE."),
      l("Intégration RPC sur le testnet Polygon Amoy pour ancrer chaque lot.", "RPC integration on the Polygon Amoy testnet to anchor every batch."),
      l(
        "Application web avec vérification de lots et tableaux de bord par rôle ; application mobile pour l'agriculteur.",
        "Web app with batch verification and per-role dashboards; mobile app for the farmer.",
      ),
      l("Refactorisation d'un frontend monolithique en composants modulaires.", "Refactoring of a monolithic frontend into modular components."),
    ],
    result: [
      l("Deux applications déployées et consultables en ligne.", "Two apps deployed and available online."),
      l(
        "Phase de formation du hackathon validée : 25 000 XP, édition panafricaine à 15 pays.",
        "Hackathon training phase validated: 25,000 XP, pan-African edition with 15 countries.",
      ),
    ],
  },
  {
    slug: "secure-coding-review",
    zone: "blue",
    title: "Secure Coding Review",
    tag: l("Stage CodeAlpha · audit de code", "CodeAlpha internship · code audit"),
    year: "2026",
    role: l("Auditeur", "Auditor"),
    summary: l(
      "Audit du code source d'OWASP Juice Shop : trois failles tracées de l'entrée utilisateur jusqu'à l'impact, avec correctif.",
      "Source audit of OWASP Juice Shop: three flaws traced from user input to impact, each with a fix.",
    ),
    stack: ["Node.js / Express", "Angular", "npm audit", "Burp Suite", "Docker", "Python"],
    cover: "/generated/secure-review.jpg",
    links: [
      { label: l("Rapport complet", "Full report"), href: "https://github.com/Xeno-369/CodeAlpha_SecureCodingReview/blob/main/SECURITY_AUDIT_REPORT.md" },
      { label: l("Dépôt", "Repository"), href: "https://github.com/Xeno-369/CodeAlpha_SecureCodingReview" },
    ],
    problem: l(
      "Trouver des failles dans une application ne suffit pas : il faut remonter à la ligne fautive, prouver l'exploitation et proposer un correctif qu'un développeur peut appliquer.",
      "Finding flaws in an application is not enough: you have to reach the faulty line, prove it is exploitable and propose a fix a developer can apply.",
    ),
    approach: [
      l("Reconnaissance : cartographie des routes Express et Angular.", "Reconnaissance: mapping Express and Angular routes."),
      l(
        "Threat modeling : priorité à l'authentification, à l'upload de fichiers et à la recherche.",
        "Threat modeling: authentication, file upload and search first.",
      ),
      l("Analyse automatisée des dépendances avec npm audit.", "Automated dependency analysis with npm audit."),
      l(
        "Analyse statique manuelle : suivi de la donnée depuis l'entrée utilisateur jusqu'à la requête SQL, l'écriture de fichier ou le rendu HTML.",
        "Manual static analysis: following the data from user input to the SQL query, the file write or the HTML render.",
      ),
      l("Preuve de concept sur une instance locale, sous Docker.", "Proof of concept against a local Docker instance."),
    ],
    result: [
      l(
        "48 dépendances vulnérables relevées : 7 critiques, 19 élevées, 19 modérées, 3 faibles.",
        "48 vulnerable dependencies flagged: 7 critical, 19 high, 19 moderate, 3 low.",
      ),
      l(
        "3 failles documentées avec CWE, catégorie OWASP Top 10, cause racine et correctif.",
        "3 findings documented with CWE, OWASP Top 10 category, root cause and fix.",
      ),
      l(
        "Cause commune identifiée : une entrée utilisateur utilisée sans validation.",
        "Shared root cause identified: user input trusted without validation.",
      ),
    ],
    findings: [
      {
        title: l("Injection SQL — contournement d'authentification", "SQL injection — authentication bypass"),
        severity: "critical",
        cwe: "CWE-89",
        where: "routes/login.ts",
        status: l("Exploitée : connexion administrateur obtenue", "Exploited: admin login obtained"),
        fix: l("Requête paramétrée à la place de la concaténation", "Parameterised query instead of string concatenation"),
      },
      {
        title: l("Zip Slip — écriture hors du dossier cible", "Zip Slip — write outside the target folder"),
        severity: "critical",
        cwe: "CWE-22",
        where: "routes/fileUpload.ts",
        status: l("Confirmée par analyse statique, script de PoC fourni", "Confirmed by static analysis, PoC script provided"),
        fix: l("Vérifier que le chemin résolu reste dans le dossier cible", "Check that the resolved path stays inside the target folder"),
      },
      {
        title: l("XSS DOM via le paramètre de recherche", "DOM XSS through the search parameter"),
        severity: "high",
        cwe: "CWE-79",
        where: "search-result.component.ts:144",
        status: l("Exploitée : exécution JavaScript confirmée", "Exploited: JavaScript execution confirmed"),
        fix: l("Retirer bypassSecurityTrustHtml ou assainir avec DOMPurify", "Drop bypassSecurityTrustHtml or sanitise with DOMPurify"),
      },
    ],
  },
  {
    slug: "network-ids",
    zone: "blue",
    title: "Network IDS",
    tag: l("Stage CodeAlpha · détection d'intrusion", "CodeAlpha internship · intrusion detection"),
    year: "2026",
    role: l("Déploiement, règles et validation", "Deployment, rules and validation"),
    summary: l(
      "Snort 3 déployé sur un réseau réel, avec des règles écrites à la main et des alertes qui le prouvent.",
      "Snort 3 deployed on a real network, with hand-written rules and the alerts to prove it.",
    ),
    stack: ["Snort 3", "Kali Linux", "Nmap", "ICMP / TCP"],
    cover: "/generated/sniffer.jpg",
    links: [
      { label: l("Rapport complet", "Full report"), href: "https://github.com/Xeno-369/CodeAlpha_NetworkIDS/blob/main/NIDS_REPORT.md" },
      { label: l("Dépôt", "Repository"), href: "https://github.com/Xeno-369/CodeAlpha_NetworkIDS" },
    ],
    problem: l(
      "Un IDS installé ne prouve rien. Il faut montrer qu'il voit le trafic, qu'il charge des règles écrites pour ce réseau et qu'il distingue un scan d'une connexion normale.",
      "An installed IDS proves nothing. You have to show that it sees the traffic, loads rules written for this network and tells a scan from a normal connection.",
    ),
    approach: [
      l("Installation de Snort 3 sous Kali et rattachement au réseau local via HOME_NET.", "Snort 3 installed on Kali and bound to the local network through HOME_NET."),
      l("Écriture de deux règles locales, incluses dans le bloc ips de snort.lua.", "Two local rules written and included in the ips block of snort.lua."),
      l("Validation de la configuration avec snort -T.", "Configuration validated with snort -T."),
      l("Test en conditions réelles : ping puis scan nmap -sS vers la passerelle.", "Real-traffic test: ping, then an nmap -sS scan against the gateway."),
    ],
    result: [
      l("Configuration validée sans avertissement : 868 règles chargées.", "Configuration validated with zero warnings: 868 rules loaded."),
      l("Une alerte par paquet ICMP, dans les deux sens.", "One alert per ICMP packet, in both directions."),
      l("Une alerte par port testé dès le seuil du scan franchi.", "One alert per probed port once the scan threshold is crossed."),
    ],
    rules: [
      {
        name: l("Ping ICMP", "ICMP ping"),
        rule: 'alert icmp any any -> $HOME_NET any ( msg:"ICMP Ping detecte"; sid:1000001; rev:1; )',
        why: l(
          "Contrôle de base : le moteur charge bien les règles locales et alerte sur un trafic simple et reproductible.",
          "Baseline check: the engine loads local rules and alerts on simple, reproducible traffic.",
        ),
      },
      {
        name: l("Scan de ports SYN", "SYN port scan"),
        rule: 'alert tcp any any -> $HOME_NET any ( msg:"Scan de ports possible SYN"; flags:S; detection_filter:track by_src, count 5, seconds 10; sid:1000002; rev:1; )',
        why: l(
          "Seuil de 5 SYN en 10 secondes par source : une connexion isolée ne le franchit pas, un nmap -sS le franchit aussitôt.",
          "Threshold of 5 SYNs in 10 seconds per source: a single connection stays below it, an nmap -sS crosses it at once.",
        ),
      },
    ],
    alerts: [
      '10/09-10:24:02.657266 [**] [1:1000001:1] "ICMP Ping detecte" [**] {ICMP} 192.168.1.254 -> 192.168.1.69',
      '10/09-10:24:03.656939 [**] [1:1000001:1] "ICMP Ping detecte" [**] {ICMP} 192.168.1.69 -> 192.168.1.254',
      '10/09-10:24:59.949526 [**] [1:1000002:1] "Scan de ports possible SYN" [**] {TCP} 192.168.1.69:60251 -> 192.168.1.254:3306',
      '10/09-10:24:59.949544 [**] [1:1000002:1] "Scan de ports possible SYN" [**] {TCP} 192.168.1.69:60251 -> 192.168.1.254:1723',
      '10/09-10:24:59.949562 [**] [1:1000002:1] "Scan de ports possible SYN" [**] {TCP} 192.168.1.69:60251 -> 192.168.1.254:25',
      '10/09-10:25:01.153025 [**] [1:1000002:1] "Scan de ports possible SYN" [**] {TCP} 192.168.1.69:60251 -> 192.168.1.254:443',
    ],
    limits: [
      l(
        "Le seuil fixe de la règle SYN peut produire des faux positifs sur une source légitime très active.",
        "The fixed threshold of the SYN rule can raise false positives on a very busy legitimate source.",
      ),
      l(
        "Snort fonctionne ici en détection, sans blocage automatique.",
        "Snort runs here in detection mode, with no automatic blocking.",
      ),
    ],
  },
  {
    slug: "cryptoarsenal",
    zone: "teal",
    title: "CryptoArsenal",
    tag: l("CTF · cryptographie offensive", "CTF · offensive cryptography"),
    year: "2026",
    role: l("Auteur", "Author"),
    summary: l(
      "Une boîte à outils née en compétition : chaque attaque résolue à la main est devenue un module réutilisable.",
      "A toolkit born in competition: every attack solved by hand became a reusable module.",
    ),
    stack: ["Python", "pycryptodome", "sympy", "RSA", "ECDSA", "AES"],
    cover: "/generated/cryptoarsenal.jpg",
    links: [{ label: l("Code source", "Source code"), href: "https://github.com/Xeno-369/CryptoArsenal" }],
    problem: l(
      "En CTF, on réécrit sans cesse la même attaque sous la pression du chrono. Chaque minute passée à refaire un script est une minute perdue sur le challenge suivant.",
      "In a CTF you keep rewriting the same attack against the clock. Every minute spent redoing a script is a minute lost on the next challenge.",
    ),
    approach: [
      l("Généraliser chaque attaque résolue ad hoc en un script autonome.", "Generalise every ad hoc solve into a standalone script."),
      l(
        "Intégrer à chaque script une démo qui reproduit un flag réellement obtenu.",
        "Ship each script with a demo that reproduces a flag actually captured.",
      ),
      l("Garder les dépendances minimales : pycryptodome, et sympy pour RSA.", "Keep dependencies minimal: pycryptodome, plus sympy for RSA."),
    ],
    result: [
      l("Dix familles d'attaques couvertes, du chiffre de César à l'oracle de padding.", "Ten attack families covered, from Caesar ciphers to padding oracles."),
      l("Modules validés sur des challenges de l'ESIG Tech Arena et d'autres CTF.", "Modules validated on ESIG Tech Arena challenges and other CTFs."),
    ],
    modules: [
      {
        name: "rsa_decrypt.py",
        technique: l("Attaque de Wiener (fractions continues)", "Wiener's attack (continued fractions)"),
        testedOn: l("« Petite fuite », ESIG Tech Arena", "“Petite fuite”, ESIG Tech Arena"),
      },
      {
        name: "ecdsa_lcg_nonce_attack.py",
        technique: l("Nonces liés par un LCG connu", "Nonces linked by a known LCG"),
        testedOn: l("Challenge ECDSA/LCG, ESIG Tech Arena", "ECDSA/LCG challenge, ESIG Tech Arena"),
      },
      {
        name: "padding_oracle_attack.py",
        technique: l("Oracle de padding CBC (Vaudenay)", "CBC padding oracle (Vaudenay)"),
        testedOn: l("« Oracle bavard », ESIG Tech Arena", "“Oracle bavard”, ESIG Tech Arena"),
      },
      {
        name: "aes_universal.py",
        technique: l("ECB / CBC / GCM / CTR et dérivation de clé", "ECB / CBC / GCM / CTR and key derivation"),
        testedOn: l("Déchiffrement final d'un flag ECDSA/LCG", "Final decryption of an ECDSA/LCG flag"),
      },
      {
        name: "multi_layer_decoder.py",
        technique: l("Détection et décodage d'encodages empilés", "Detection and decoding of stacked encodings"),
        testedOn: l("Épreuves de stéganographie, plusieurs CTF", "Steganography challenges, several CTFs"),
      },
      {
        name: "hash_format_builders.py",
        technique: l("Formats hashcat composites", "Composite hashcat formats"),
        testedOn: l("Interception MySQL en lab ARP", "MySQL interception in an ARP lab"),
      },
    ],
  },
  {
    slug: "osint-ghtrace",
    zone: "green",
    title: "OSINT_GHTRACE",
    tag: l("OSINT · ligne de commande", "OSINT · command line"),
    year: "2026",
    role: l("Auteur", "Author"),
    summary: l(
      "Retracer l'activité publique d'un dépôt ou d'un compte GitHub, même après suppression ou réécriture de l'historique.",
      "Tracing the public activity of a GitHub repo or account, even after deletion or history rewrite.",
    ),
    stack: ["Python 3.8+", "GH Archive", "ClickHouse"],
    cover: "/generated/ghtrace.jpg",
    links: [{ label: l("Code source", "Source code"), href: "https://github.com/Xeno-369/OSINT_GHTRACE" }],
    problem: l(
      "Supprimer un dépôt ou forcer un push n'efface pas ce que GH Archive a déjà enregistré. Ces archives publiques restent pourtant pénibles à interroger à la main.",
      "Deleting a repo or force-pushing does not erase what GH Archive has already recorded. Yet those public archives are painful to query by hand.",
    ),
    approach: [
      l(
        "Mode timeline : chronologie rapide via la copie publique de GH Archive hébergée par ClickHouse, filtrable par dépôt, utilisateur, type d'événement et dates.",
        "Timeline mode: fast chronology through the public GH Archive copy hosted by ClickHouse, filterable by repo, user, event type and dates.",
      ),
      l(
        "Mode detail : lecture en flux des archives brutes pour une date donnée, avec SHA, messages de commit, auteurs et collaborateurs ajoutés.",
        "Detail mode: streaming read of the raw archives for a given date, with SHAs, commit messages, authors and added collaborators.",
      ),
      l("Aucune dépendance externe : Python 3.8 suffit.", "No external dependency: Python 3.8 is enough."),
    ],
    result: [
      l("Une commande pour passer d'un pseudo à une chronologie exploitable.", "One command from a handle to a usable timeline."),
      l("Sortie JSON pour enchaîner avec d'autres outils.", "JSON output to chain with other tools."),
      l("Usage limité à des données déjà publiques : CTF et auto-audit.", "Limited to data that is already public: CTFs and self-audit."),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Compétences                                                         */
/* ------------------------------------------------------------------ */

export const skillGroups: { title: L; zone: Zone; items: string[] }[] = [
  {
    title: l("Cybersécurité", "Cybersecurity"),
    zone: "blue",
    items: ["Pentest web", "AppSec / OWASP Top 10", "Secure code review", "Applied cryptography", "Post-quantum", "Forensics", "Reverse engineering", "OSINT"],
  },
  {
    title: l("Systèmes & réseaux", "Systems & networks"),
    zone: "teal",
    items: ["Linux / Kali", "TCP/IP", "Routing", "Switching", "Nginx / Apache", "Snort / Suricata"],
  },
  {
    title: l("Développement", "Development"),
    zone: "teal",
    items: ["Python", "C", "Java", "Bash", "JavaScript / TypeScript", "Solidity", "Pascal", "PowerShell"],
  },
  {
    title: l("IoT & embarqué", "IoT & embedded"),
    zone: "green",
    items: ["Arduino", "UART / I2C", "Sensors & actuators", "Real-time acquisition", "Processing"],
  },
];

export const tools = [
  "Wireshark", "Nmap", "Burp Suite", "Ghidra", "Scapy", "Snort", "Docker", "Git", "Arduino IDE", "Remix IDE",
];

/* ------------------------------------------------------------------ */
/* CTF & certifications                                                */
/* ------------------------------------------------------------------ */

export const rankings: { title: string; value: string; detail: L; href?: string }[] = [
  {
    title: "Cyberini",
    value: "5ᵉ / 5 377",
    detail: l("7 710 points · 58 challenges · rang Cyber Maître", "7,710 points · 58 challenges · Cyber Maître rank"),
    href: profile.cyberini,
  },
  {
    title: "TryHackMe",
    value: "Top 15 %",
    detail: l("3 356 points · 41 salles · niveau 7 · ligue Silver", "3,356 points · 41 rooms · level 7 · Silver league"),
    href: profile.tryhackme,
  },
  {
    title: "CTF National · ANSI",
    value: "TG",
    detail: l("Participations aux CTF nationaux organisés par l'ANSI", "Entries in the national CTFs run by ANSI"),
  },
  {
    title: "EcowasCTF",
    value: "CEDEAO",
    detail: l("Compétition régionale : web, crypto, forensic, reverse", "Regional competition: web, crypto, forensics, reverse"),
  },
  {
    title: "CTFtime · Root-Me · HackTheBox",
    value: "∞",
    detail: l("Compétitions en ligne et entraînement régulier", "Online competitions and regular training"),
  },
];

export const certifications: { title: string; org: string; date: L }[] = [
  { title: "Cyber Security Internship", org: "CodeAlpha", date: l("oct. 2026", "Oct 2026") },
  { title: "NSE 1 — Cybersecurity & Cloud Fundamentals", org: "Fortinet Training Institute", date: l("août 2026", "Aug 2026") },
  { title: "NDG Linux Essentials", org: "Cisco Networking Academy", date: l("août 2026", "Aug 2026") },
  { title: "Introduction to Cybersecurity", org: "Cisco Networking Academy", date: l("août 2026", "Aug 2026") },
  { title: "CCNA 1 — Introduction to Networks", org: "Cisco Networking Academy · IAI-Togo", date: l("juil. 2026", "Jul 2026") },
  { title: "MOOC Cybersécurité", org: "Cyberini", date: l("avr. 2026", "Apr 2026") },
];
