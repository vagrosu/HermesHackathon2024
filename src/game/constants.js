export const SIZES = {
  screen: {
    width: 1024,
    height: 768,
  },
  platform: {
    width: 270,
    height: 30,
  },
  ground: {
    width: 360,
    height: 72,
  },
  player: {
    width: 28,
    height: 30,
  },
  goal: {
    width: 64,
    height: 52,
  },
  fire: {
    width: 20,
    height: 21,
  },
};

export const LEVELS = [
  {
    playerStart: {
      x: 30,
      y: SIZES.screen.height - SIZES.ground.height - SIZES.player.height,
    },
    platformData: [
      //First
      {
        x: SIZES.platform.width / 2,
        y: 555 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.platform.width / 2 + SIZES.platform.width,
        y: 555 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.platform.width / 2 + 2 * SIZES.platform.width,
        y: 555 + SIZES.platform.height / 2,
      },

      //Second
      {
        x: SIZES.screen.width - SIZES.platform.width / 2,
        y: 410 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.screen.width - SIZES.platform.width / 2 - SIZES.platform.width,
        y: 410 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.screen.width - SIZES.platform.width / 2 - 2 * SIZES.platform.width,
        y: 410 + SIZES.platform.height / 2,
      },

      //Third
      {
        x: SIZES.platform.width / 2,
        y: 265 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.platform.width / 2 + SIZES.platform.width,
        y: 265 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.platform.width / 2 + 2 * SIZES.platform.width,
        y: 265 + SIZES.platform.height / 2,
      },

      //Fourth
      {
        x: SIZES.screen.width - SIZES.platform.width / 2,
        y: 120 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.screen.width - SIZES.platform.width / 2 - SIZES.platform.width,
        y: 120 + SIZES.platform.height / 2,
      },
      {
        x: SIZES.screen.width - SIZES.platform.width / 2 - 2 * SIZES.platform.width,
        y: 120 + SIZES.platform.height / 2,
      },
    ],
    fireData: [
      { x: 500, y: 670 },

      { x: 300, y: 530 },
      { x: 600, y: 530 },

      { x: 400, y: 385 },
      { x: 1000, y: 385 },

      { x: 250, y: 240 },
      { x: 600, y: 240 },

      { x: 450, y: 95 },
    ],

    goal: {
      x: SIZES.screen.width - SIZES.goal.width / 2 - 30,
      y: 120 - (SIZES.goal.height * 1.5) / 2,
    },
    barrelFrequency: 6,
    barrelSpeed: 120,
    questionFrequency: 11,
  },
];

export const QUESTIONS = {
  easy: [
    {
      title: "Reconnaissance",
      question: "Retro Kong încearcă să detecteze dispozitivele active pe rețeaua ta. Cum îți poți proteja dispozitivele?",
      answer: "Ascunde SSID-ul rețelei tale Wi-Fi pentru a face dispozitivele mai puțin vizibile.",
    },
    {
      title: "Criptare slabă",
      question: "Retro Kong încearcă să se conecteze la rețeaua ta Wi-Fi care folosește WEP. Ce schimbare rapidă poți face?",
      answer: "Schimbă criptarea rețelei tale din WEP în WPA2 sau WPA3 pentru o protecție mai bună.",
    },
    {
      title: "Man-in-the-Middle",
      question:
        "Observi că Retro Kong ar putea intercepta traficul necriptat. Ce metodă simplă poți folosi pentru a preveni acest lucru?",
      answer: "Asigură-te că toate site-urile pe care le vizitezi utilizează HTTPS pentru a cripta comunicațiile.",
    },
    {
      title: "Data Sniffing",
      question:
        "Retro Kong încearcă să captureze traficul de pe rețea utilizând un sniffer simplu. Cum poți minimiza riscul?",
      answer: "Utilizează criptarea pe întreaga rețea pentru a face datele capturate inutilizabile.",
    },
    {
      title: "Credential Stuffing",
      question:
        "Retro Kong folosește parole comune pentru a încerca să acceseze conturile tale. Ce poți face pentru a împiedica succesul acestor încercări?",
      answer: "Folosește parole unice și complexe pentru fiecare cont pe care îl ai.",
    },
    {
      title: "Brute Force",
      question:
        "Retro Kong încearcă să ghicească parolele conturilor tale folosind atacuri brute force simple. Ce metodă de bază poți folosi pentru a te proteja?",
      answer:
        "Utilizează parole lungi și complexe, combinate cu blocarea temporară a contului după un număr de încercări eșuate.",
    },
    {
      title: "Phishing",
      question:
        "Retro Kong trimite e-mailuri de phishing încercând să te convingă să dai click pe linkuri malițioase. Cum poți preveni căderea în capcană?",
      answer:
        "Educația utilizatorilor pentru a recunoaște semnele unui e-mail de phishing, cum ar fi greșeli gramaticale și linkuri suspecte.",
    },
    {
      title: "Exfiltrare de date",
      question: "Retro Kong încearcă să exfiltreze date prin e-mailuri necriptate. Cum poți interveni?",
      answer:
        "Asigură criptarea tuturor datelor sensibile trimise prin e-mail și utilizează politici de prevenire a pierderii datelor (DLP).",
    },
  ],
  medium: [
    {
      title: "Reconnaissance",
      question:
        "Retro Kong folosește scanări de porturi pentru a identifica serviciile active. Ce măsuri poți lua pentru a bloca aceste scanări?",
      answer:
        "Utilizează un firewall pentru a bloca porturile neutilizate și pentru a monitoriza tentativele de conexiune suspecte.",
    },
    {
      title: "Criptare slabă",
      question:
        "Retro Kong a detectat configurarea slabă a criptării pe routerul tău. Cum poți verifica și îmbunătăți această configurație?",
      answer:
        "Accesează setările routerului și asigură-te că folosești cele mai recente și sigure standarde de criptare disponibile, cum ar fi WPA3.",
    },
    {
      title: "Man-in-the-Middle",
      question: "Retro Kong ar putea folosi ARP spoofing pentru a intercepta datele. Cum poți detecta și preveni aceasta?",
      answer: "Folosește un software de securitate care detectează și blochează ARP spoofing-ul pe dispozitivele tale.",
    },
    {
      title: "Data Sniffing",
      question:
        "Retro Kong folosește tehnici de sniffing pentru a capta parolele transmise. Ce măsură de precauție poți lua?",
      answer: "Activează autentificarea pe baza de certificat și folosește tuneluri VPN pentru toate comunicațiile critice.",
    },
    {
      title: "Credential Stuffing",
      question:
        "Retro Kong a obținut o listă de nume de utilizator și parole dintr-o breșă de date. Cum poți reduce riscul ca acestea să fie folosite împotriva ta?",
      answer:
        "Activează autentificarea în doi pași (2FA) pentru a adăuga un nivel suplimentar de securitate la conturile tale.",
    },
    {
      title: "Brute Force",
      question:
        "Retro Kong folosește algoritmi mai avansați pentru a sparge parole complexe. Ce strategie poți adopta pentru a crește securitatea?",
      answer:
        "Implementează politici stricte de expirare și schimbare a parolelor, asigurându-te că parolele vechi nu pot fi reutilizate.",
    },
    {
      title: "Phishing",
      question:
        "Retro Kong folosește tehnici de spear phishing, țintind anumiți angajați cu mesaje personalizate. Ce măsuri poți lua?",
      answer:
        "Implementează filtre robuste de e-mail și soluții de securitate care verifică linkurile și atașamentele pentru malware.",
    },
    {
      title: "Exfiltrare de date",
      question:
        "Retro Kong folosește conexiuni criptate pentru a transfera date furate. Cum detectezi și blochezi aceste exfiltrări?",
      answer:
        "Monitorizează fluxurile de rețea pentru volume neobișnuite de trafic și utilizează soluții IPS/IDS pentru a bloca transferurile suspecte.",
    },
  ],
  hard: [
    {
      title: "Reconnaissance",
      question:
        "Retro Kong folosește tehnicile de OS fingerprinting pentru a determina sistemele de operare ale dispozitivelor tale. Cum poți împiedica acest lucru?",
      answer:
        "Configurează dispozitivele să nu răspundă la interogările ICMP sau la alte cereri care ar putea fi folosite pentru fingerprinting.",
    },
    {
      title: "Criptare slabă",
      question:
        "Retro Kong încearcă să exploateze vulnerabilitățile cunoscute în WPA2. Ce măsuri suplimentare poți lua pentru a întări securitatea?",
      answer:
        "Actualizează firmware-ul routerului pentru a include ultimele patch-uri de securitate și utilizează autentificare bazată pe certificat dacă este posibil.",
    },
    {
      title: "Man-in-the-Middle",
      question:
        "Retro Kong folosește tehnici avansate MITM folosind certificate false. Cum te poți asigura că certificatele sunt valide?",
      answer:
        "Folosește clienti de email și browsere care verifică validitatea lanțurilor de certificare și alertează utilizatorii când detectează anomalii.",
    },
    {
      title: "Data Sniffing",
      question: "Retro Kong folosește sniffing pentru a intercepta comunicații VoIP. Cum poți proteja aceste comunicații?",
      answer:
        "Criptează traficul VoIP folosind protocoale precum SRTP sau ZRTP pentru a împiedica interceptarea eficientă a convorbirilor.",
    },
    {
      title: "Credential Stuffing",
      question:
        "Retro Kong folosește tehnici avansate pentru a automatiza atacurile de credential stuffing pe scară largă. Cum poți detecta și răspunde rapid la aceste atacuri?",
      answer:
        "Monitorizează accesările conturilor pentru activități suspecte, cum ar fi încercările repetate de autentificare eșuate, și implementează sisteme de alertă rapidă.",
    },
    {
      title: "Brute Force",
      question:
        "Retro Kong a dezvoltat un sistem care utilizează puterea de procesare distribuită pentru a sparge parolele. Cum poți răspunde acestei amenințări?",
      answer:
        "Crește complexitatea cerințelor de parolă și folosește rate limiting pentru a încetini rata la care pot fi făcute încercările de autentificare.",
    },
    {
      title: "Phishing",
      question:
        "Retro Kong orchestrează o campanie avansată de phishing care imită comunicările interne. Cum asiguri protecția organizației?",
      answer:
        "Utilizează tehnologii de verificare a autenticității e-mailurilor, cum ar fi DMARC, SPF și DKIM, pentru a valida sursa e-mailurilor și a preveni falsificarea.",
    },
    {
      title: "Exfiltrare de date",
      question:
        "Retro Kong utilizează tehnici sofisticate pentru a masca exfiltrarea datelor ca trafic legitim. Ce abordare poți folosi pentru a identifica aceste tactici?",
      answer:
        "Implementează soluții avansate de analiză comportamentală a rețelei pentru a identifica modelele de trafic neobișnuite și pentru a distinge între activitățile normale și cele malițioase.",
    },
  ],
};

export function getRandomQuestion(difficulty) {
  if (!QUESTIONS[difficulty]) {
    throw new Error(`Invalid difficulty: ${difficulty}`);
  }

  const questions = QUESTIONS[difficulty];

  const randomIndex = Math.floor(Math.random() * questions.length);

  return questions[randomIndex];
}
