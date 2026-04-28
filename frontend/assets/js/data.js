const LEARNING_DATA = {
  afrobeat: {
    id: "afrobeat",
    label: "Genre 01",
    name: "Afrobeat",
    origin: "Nigeria · 1970s",
    bpm: 95,
    bpmLabel: "~95 BPM",
    drum: "Talking drum",
    vocals: "Call-and-response",
    trackName: "Heis",
    artist: "Rema",
    clipStart: "0:05",
    clipEnd: "0:20",
    clipDuration: 15,
    bpmNote: "~95 BPM — feel this first",
    drumNote: "Talking drum — do-do-do-DUM syncopated hit",
    overviewPath: "/pages/learning/afrobeat.html",
    listenPath: "/pages/learning/listen-afrobeat.html",
    cultureNote:
      "Afrobeat grew out of Nigerian live-band culture and often carries a strong sense of performance, repetition, and message.",
    artistNote:
      "When listeners study Afrobeat history, Fela Kuti often becomes the anchor point for understanding its roots and influence.",
    listeningPrompts: [
      "Lock into the tempo before chasing every instrument.",
      "Listen for the talking drum accents that answer the groove instead of sitting directly on top of it.",
      "Notice how the vocals feel energetic and present rather than distant or purely atmospheric.",
    ],
    recapPoints: [
      "Usually feels slower and more live-band driven than Amapiano.",
      "Talking drum accents help give the groove its syncopated character.",
      "Its identity is tied closely to Nigeria and a strong performance tradition.",
    ],
    moreTracks: [
      {
        trackName: "Commas",
        artist: "Ayra Starr",
        audioFile: "afrobeat/commas-ayra-starr.webm",
        id: "commas-ayra-starr"
      },
      {
        trackName: "Woman",
        artist: "Rema",
        audioFile: "afrobeat/woman-rema.webm",
        id: "woman-rema"
      },
      {
        trackName: "Kese",
        artist: "Wizkid",
        audioFile: "afrobeat/kese-wizkid.webm",
        id: "kese-wizkid"
      },
      {
        trackName: "Ifeoma",
        artist: "Ozedikus",
        audioFile: "afrobeat/ifeoma-ozedikus.webm",
        id: "ifeoma-ozedikus"
      },
      {
        trackName: "Holy Ghost",
        artist: "Omah Lay",
        audioFile: "afrobeat/holy-ghost-omah-lay.webm",
        id: "holy-ghost-omah-lay"
      },
    ],
  },
  amapiano: {
    id: "amapiano",
    label: "Genre 02",
    name: "Amapiano",
    origin: "South Africa · 2010s",
    bpm: 112,
    bpmLabel: "~112 BPM",
    drum: "Log drum",
    vocals: "Minimal / chanted",
    trackName: "Mnike",
    artist: "Tyler ICU & Uncle Waffles",
    clipStart: "0:00",
    clipEnd: "0:20",
    clipDuration: 20,
    bpmNote: "~112 BPM — FASTER than Afrobeat (~95) ← KEY DIFFERENCE",
    drumNote: "Log drum — BOOM-tss rolling pattern",
    overviewPath: "/pages/learning/amapiano.html",
    listenPath: "/pages/learning/listen-amapiano.html",
    cultureNote:
      "Amapiano emerged from South African dance scenes and is built around a smoother, more immersive club atmosphere.",
    artistNote:
      "Its rise is often tied to township dance culture, DJ-led circulation, and tracks that reward repeated listening on the dance floor.",
    listeningPrompts: [
      "Feel the bounce of the faster tempo before focusing on specific sounds.",
      "Listen for the deep log drum pulse underneath the groove.",
      "Notice how the piano textures float over the rhythm and make the track feel airy.",
    ],
    recapPoints: [
      "Usually feels faster, lighter, and more hypnotic than Afrobeat.",
      "The log drum is one of the clearest clues that you are hearing Amapiano.",
      "Its identity is strongly connected to South African dance and club culture.",
    ],
    moreTracks: [
      {
        trackName: "Water",
        artist: "Tyla",
        audioFile: "amapiano/water-tyla.webm",
        id: "water-tyla"
      },
      {
        trackName: "Tshwala Bam",
        artist: "TitoM & Yuppe",
        audioFile: "amapiano/tshwala-bam.webm",
        id: "tshwala-bam"
      },
      {
        trackName: "Dalie",
        artist: "Kamo Mphela",
        audioFile: "amapiano/dalie-kamo-mphela.webm",
        id: "dalie-kamo-mphela"
      },
      {
        trackName: "Zenzele",
        artist: "Uncle Waffles",
        audioFile: "amapiano/zenzele-uncle-waffles.webm",
        id: "zenzele-uncle-waffles"
      },
      {
        trackName: "Shake Ah",
        artist: "Tyla & Tony Durado",
        audioFile: "amapiano/shake-ah-tyla-tony-durado.webm",
        id: "shake-ah-tyla-tony-durado"
      },
    ],
  },
};

const LEARNING_FLOW = [
  {
    id: "entry",
    title: "Choose a starting point",
    path: "/pages/learning/index.html",
  },
  {
    id: "afrobeat-overview",
    title: "Afrobeat overview",
    path: "/pages/learning/afrobeat.html",
  },
  {
    id: "afrobeat-listen",
    title: "Listen to Afrobeat",
    path: "/pages/learning/listen-afrobeat.html",
  },
  {
    id: "amapiano-overview",
    title: "Amapiano overview",
    path: "/pages/learning/amapiano.html",
  },
  {
    id: "amapiano-listen",
    title: "Listen to Amapiano",
    path: "/pages/learning/listen-amapiano.html",
  },
  {
    id: "compare",
    title: "Compare the genres",
    path: "/pages/learning/compare.html",
  },
  {
    id: "recap",
    title: "Recap before quiz",
    path: "/pages/learning/recap.html",
  },
];

const COMPARISON_DATA = [
  {
    label: "Origin",
    afrobeat: "Nigeria, with roots in 1970s live-band culture",
    amapiano: "South Africa, shaped by township dance and house scenes",
  },
  {
    label: "Tempo feel",
    afrobeat: "Mid-tempo and swung, with a grounded pulse",
    amapiano: "Faster and bouncier, with a smoother dance glide",
  },
  {
    label: "Signature clue",
    afrobeat: "Talking drum accents and live-band energy",
    amapiano: "Log drum bass and floating piano motifs",
  },
  {
    label: "Vocal approach",
    afrobeat: "More direct and call-and-response oriented",
    amapiano: "Often lighter, chant-like, or more spacious",
  },
  {
    label: "Performance vibe",
    afrobeat: "Feels expansive, percussive, and stage-driven",
    amapiano: "Feels immersive, hypnotic, and club-oriented",
  },
];

const RECAP_CHECKS = [
  {
    prompt: "If a track feels piano-led with a deep rolling bass pulse, which genre should you suspect first?",
    answer: "Amapiano",
  },
  {
    prompt: "If the groove feels more live-band, percussion-forward, and tied to talking drum accents, which genre fits better?",
    answer: "Afrobeat",
  },
  {
    prompt: "Which genre in this lesson is generally faster on average?",
    answer: "Amapiano",
  },
];
