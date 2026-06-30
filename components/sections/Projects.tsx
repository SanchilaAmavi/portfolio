"use client";

import { useState, useEffect, useRef } from "react";

// ─── GitHub SVG Icon ──────────────────────────────────────────────────────────
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── External Link Icon ───────────────────────────────────────────────────────
function ExternalIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface GallerySection {
  id: string;
  label: string;
  icon: string;
  accent: string;
  images: { src: string; caption: string; span?: "wide" | "tall" | "normal"; isVideo?: boolean }[];
}

interface ProjectDetail {
  headline: string;
  subline?: string;                           // ← NEW: short field descriptor
  overview: string[];
  creatorImage?: string;
  teamImage?: string;
  highlights: { icon: string; title: string; desc: string }[];
  gallerySections: GallerySection[];
  stats?: { label: string; value: string }[];
  sections?: { title: string; body: string }[];
  archDiagram?: string;
}

interface Project {
  id: string;
  number: string;
  status: "completed" | "ongoing" | "prototype";
  year: string;
  category: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fieldLine?: string;                        // ← NEW: short line for related fields
  tags: string[];
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  detail?: ProjectDetail;
}

// ─── MinePulse gallery ────────────────────────────────────────────────────────
const minepulseGallery: GallerySection[] = [
  {
    id: "hardware",
    label: "Hardware & Prototype",
    icon: "🔩",
    accent: "#f0fdf4",
    images: [
      { src: "/images/assembled mine pulse.jpg",         caption: "Fully assembled MinePulse — both nodes complete", span: "wide" },
      { src: "/images/prototype mine pulse.jpg",         caption: "Early prototype — development phase" },
      { src: "/images/working mine pulse.jpg",           caption: "System running live during field testing" },
      { src: "/images/assembled pcb mine pulse.jpg",     caption: "Underground node PCB — assembled & wired" },
    ],
  },
  {
    id: "final",
    label: "Final Build",
    icon: "🏗️",
    accent: "#eff6ff",
    images: [
      { src: "/images/final surface mine pulse.jpg",     caption: "Final surface gateway node", span: "wide" },
      { src: "/images/final underground mine pulse.jpg", caption: "Final underground node — deployment ready" },
      { src: "/images/final surface 1 mine pulse.jpg",   caption: "Surface node — OLED display & antenna detail" },
      { src: "/images/output.jpg",                       caption: "Live sensor output on surface OLED display" },
    ],
  },
  {
    id: "pcb",
    label: "PCB & Enclosure",
    icon: "🖥️",
    accent: "#fdf4ff",
    images: [
      { src: "/images/pcb mine pulse.jpg",               caption: "Custom PCB — top layer layout", span: "wide" },
      { src: "/images/pcb otherside minepulse.jpg",      caption: "Custom PCB — bottom layer layout" },
      { src: "/images/enclosure underground.jpg",        caption: "3D-designed underground node enclosure" },
      { src: "/images/enclosure surface.jpg",            caption: "3D-designed surface node enclosure" },
      { src: "/images/minepulse underground enclosure.jpg", caption: "Underground enclosure — final assembly" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: "📱",
    accent: "#fff7ed",
    images: [
      { src: "/images/minepulse mobile 1.jpg",  caption: "App home — live mine status dashboard" },
      { src: "/images/minepulse mobile3.jpg",   caption: "Real-time telemetry & sensor readings" },
      { src: "/images/minepulsemobile2.jpg",    caption: "Push notification panel — instant alerts" },
      { src: "/images/minepulsemobile4.jpg",    caption: "Alert history log with timestamps" },
      { src: "/images/minepulsemobile5.jpg",    caption: "Map View — live mine locations" },
    ],
  },
  {
    id: "web",
    label: "Web Dashboard & SMS",
    icon: "🌐",
    accent: "#f0fdf4",
    images: [
      { src: "/images/webapp minepulse.jpg",      caption: "Supervisor web dashboard — live mine status", span: "wide" },
      { src: "/images/web app mine pulse 1.jpg",  caption: "Alert frequency analytics" },
      { src: "/images/minepulse sms.jpg",         caption: "SMS alert delivered to supervisor mobile" },
    ],
  },
  {
    id: "video",
    label: "Demo Video",
    icon: "🎥",
    accent: "#f0fdf4",
    images: [
      { src: "/images/Minepulse testing.mp4", caption: "▶ MinePulse live demo — real-time hazard detection", span: "wide", isVideo: true },
    ],
  },
];

// ─── LankaMesh gallery ────────────────────────────────────────────────────────
const lankameshGallery: GallerySection[] = [
  {
    id: "hardware",
    label: "Hardware & Assembly",
    icon: "🔩",
    accent: "#f0fdf4",
    images: [
      { src: "/images/lankamesh.jpg",        caption: "LankaMesh assembled node — field ready", span: "wide" },
      { src: "/images/lankamesh-detail.jpg", caption: "Node internals — ESP32-S3, LoRa, GPS" },
    ],
  },
  {
    id: "mobile",
    label: "Flutter Mobile App",
    icon: "📱",
    accent: "#fdf4ff",
    images: [
      { src: "/images/lankamesh-mobile.jpg", caption: "Flutter app — SOS, map & message panel" },
       { src: "/images/lankamesh-sos.jpg",       caption: "SOS broadcast on app — emergency alert" },
    ],
  },
  {
    id: "diagram",
    label: "Architecture",
    icon: "📡",
    accent: "#eff6ff",
    images: [
      { src: "/images/lankamesh_flowchart.jpg", caption: "Node operation flowchart — mesh relay logic", span: "wide" },
     
    ],
  },
];

// ─── NexDrive gallery ─────────────────────────────────────────────────────────
const nexdriveGallery: GallerySection[] = [
  {
    id: "app-screens",
    label: "Mobile App Screens",
    icon: "📱",
    accent: "#eff6ff",
    images: [
      { src: "/images/NexDrive dashboard.jpg", caption: "NexDrive home dashboard — real-time safety score, trip stats & quick actions", span: "wide" },
      { src: "/images/NexDrive Map.jpg",       caption: "Live GPS map view — real-time driver location tracking" },
      { src: "/images/NexDrive SOS.jpg",       caption: "Emergency SOS screen — one-tap alert to emergency contacts" },
      { src: "/images/NexDrive assistant.jpg", caption: "NexDrive AI assistant — voice-guided safety recommendations" },
      { src: "/images/NexDrive mic.jpg",       caption: "Voice alert system — audio fatigue warning delivered to driver" },
    ],
  },
  {
    id: "detection",
    label: "Fatigue Detection",
    icon: "👁️",
    accent: "#fdf4ff",
    images: [
      { src: "/images/NexDrive1.jpg", caption: "Live fatigue monitoring screen — eye tracking & PERCLOS score overlay" },
      { src: "/images/NexDrive2.jpg", caption: "Fatigue detection active — alert level indicator & confidence score" },
      { src: "/images/NexDrivve Yawn.jpg", caption: "Yawn detection — real-time mouth contour analysis" },
    ],
  },
  {
    id: "video",
    label: "Demo Video",
    icon: "🎥",
    accent: "#f0fdf4",
    images: [
      { src: "/images/NexDrive video.mp4", caption: "▶ NexDrive live demo — real-time fatigue detection on device", span: "wide", isVideo: true },
    ],
  },
];

// ─── Mars Robot gallery ───────────────────────────────────────────────────────
const marsrobotGallery: GallerySection[] = [
  {
    id: "team",
    label: "Competition",
    icon: "🏆",
    accent: "#f0fdf4",
    images: [
      { src: "/images/marsrobot.jpg",          caption: "Assembled Mars Robot — ready for competition" },
      { src: "/images/marsrobot areana.jpg",   caption: "Arena layout — 6×4 grid plantation task" },
      { src: "/images/marsrobot team.jpg",     caption: "Team photo — competition day" },
    ],
  },
  {
    id: "cad",
    label: "CAD & 3D Design",
    icon: "🖥️",
    accent: "#fdf4ff",
    images: [
      { src: "/images/marsrobot brackets.jpg", caption: "3D-printed TT motor & servo arm brackets" },
      { src: "/images/marsrobotroboarm.jpg",   caption: "Robot arm — 3D-printed components" },
    ],
  },
];

// ─── AI Proctoring gallery ────────────────────────────────────────────────────
const aiproctoringGallery: GallerySection[] = [
  {
    id: "dashboard",
    label: "Live Dashboard",
    icon: "🖥️",
    accent: "#fdf4ff",
    images: [
      { src: "/images/proctoring1.jpg", caption: "Main dashboard — live video feed with detection overlays & risk score", span: "wide" },
      { src: "/images/proctoring2.jpg", caption: "Risk score analytics — spike pattern over exam session" },
      { src: "/images/proctoring3.jpg", caption: "Event distribution pie chart — No Face vs Phone Detected" },
    ],
  },
  {
    id: "detection",
    label: "Detection & Alerts",
    icon: "🚨",
    accent: "#fff7ed",
    images: [
      { src: "/images/proctoring4.jpg", caption: "Phone detection — YOLOv8 bounding box overlay", span: "wide" },
      { src: "/images/proctoring5.jpg", caption: "No Face Detected alert — red overlay visual warning" },
    ],
  },
];

// ─── ROSCO'25 gallery ─────────────────────────────────────────────────────────
const rosco25Gallery: GallerySection[] = [
  {
    id: "competition",
    label: "Competition",
    icon: "🏆",
    accent: "#f0fdf4",
    images: [
      { src: "/images/Rosco Competition.jpg",  caption: "ROSCO'25 — Team Botrix at the competition arena", span: "wide" },
      { src: "/images/Rosco robot.jpg",        caption: "Autonomous robot — fully assembled & ready" },
      { src: "/images/Rosco Arena.jpg",        caption: "Competition arena — line & wall following track" },
    ],
  },
  {
    id: "design",
    label: "Design & CAD",
    icon: "🖥️",
    accent: "#fdf4ff",
    images: [
      { src: "/images/Rosco solidwork design.jpg",            caption: "SolidWorks chassis layout — component placement", span: "wide" },
      { src: "/images/Rosco Solid work design chassie 2.jpg", caption: "SolidWorks chassis — second view" },
      { src: "/images/Rosco design.jpg",                      caption: "Chassis design overview" },
      { src: "/images/Rosco bracket design.jpg",              caption: "3D-printed motor & sensor brackets" },
    ],
  },
];

// ─── FeelFill gallery ─────────────────────────────────────────────────────────
const FeelFillGallery: GallerySection[] = [
  {
    id: "concept",
    label: "Concept & Design",
    icon: "💡",
    accent: "#fff7ed",
    images: [],
  },
];

// ─── Projects data ────────────────────────────────────────────────────────────
const projects: Project[] = [

  // ── 01 MinePulse ─────────────────────────────────────────────────────────
  {
    id: "minepulse",
    number: "01",
    status: "completed",
    year: "2025",
    category: "IoT & Embedded",
    name: "MinePulse",
    tagline: "Smart Underground Mine Safety System",
    fieldLine: "IoT · Embedded Systems · Cloud · Mobile",
    shortDesc:
      "Multi-node IoT safety system for real-time underground hazard detection covering methane, carbon monoxide, and flooding. Custom PCBs, LoRa mesh, Firebase cloud, Flutter app.",
    coverImage: "/images/assembled mine pulse.jpg",
    tags: ["ESP32-S3", "LoRa SX1278", "SIM800L", "Firebase", "Flutter", "+4"],
    githubUrl: "https://github.com/SanchilaAmavi/mine-safety-system",
    detail: {
      headline: "Saving miners with intelligent underground hazard alerts and cloud monitoring.",
      subline: "IoT · Embedded Systems · Cloud Backend · Mobile App",
      creatorImage: "/images/me minepulse.jpg",
      overview: [
        "MinePulse is a professional end-to-end mine safety solution engineered to protect miners with fast multi-gas hazard detection, immediate local and cloud alerts, and polished cross-platform monitoring applications.",
        "Two underground ESP32-S3 sensor nodes continuously measure methane (MQ-4), carbon monoxide (MQ-7), and water level. When any reading breaches the danger threshold, the node fires a 12V siren and transmits a LoRa radio alert to the surface gateway — all within milliseconds, with zero cloud dependency underground.",
        "At the surface, the gateway decodes the alert, activates a local buzzer, displays hazard details on an OLED screen, dispatches an SMS via SIM800L GSM, and simultaneously uploads the event to Firebase — instantly pushing notifications to the web dashboard and Flutter mobile app used by supervisors anywhere on-site.",
      ],
      highlights: [
        { icon: "📡", title: "LoRa 433 MHz",             desc: "Long-range wireless from underground nodes to surface — no WiFi or cellular infrastructure required underground." },
        { icon: "🔥", title: "Multi-Gas Detection",       desc: "Simultaneous real-time sensing of methane (CH4), carbon monoxide (CO), and water flooding from each node." },
        { icon: "🚨", title: "5-Channel Instant Alerts",  desc: "Siren · OLED · Buzzer · SMS · Firebase push — all triggered within seconds of any threshold breach." },
        { icon: "☁️", title: "Firebase Cloud Layer",      desc: "Realtime Database stores all alerts with full timestamps. Cloud Functions auto-dispatch FCM push to all devices." },
        { icon: "📱", title: "Flutter Mobile App",        desc: "Android/iOS app with live mine status, real-time telemetry, alert history, and Firebase Cloud Messaging notifications." },
        { icon: "🌐", title: "Web Dashboard",             desc: "Supervisor browser dashboard showing live mine status, alert history, analytics, and event timeline." },
        { icon: "🔌", title: "Custom PCB Design",         desc: "Professionally designed compact PCBs for both underground nodes and surface gateway — robust and field-deployable." },
        { icon: "🏗️", title: "Multi-Node Scalability",   desc: "One surface gateway monitors multiple underground nodes simultaneously. Built to expand across adjacent mine shafts." },
      ],
      gallerySections: minepulseGallery,
      stats: [
        { label: "Nodes",          value: "2" },
        { label: "Gas Sensors",    value: "CH4 · CO" },
        { label: "Alert Channels", value: "5" },
        { label: "LoRa Freq",      value: "433 MHz" },
        { label: "Cloud DB",       value: "Firebase" },
        { label: "Platforms",      value: "Android · iOS · Web" },
      ],
      sections: [
        {
          title: "System Architecture",
          body: "Each underground ESP32-S3-N16R8 node reads sensors every 2 seconds. On hazard detection, it fires the 12V siren via a transistor-MOSFET driver circuit and transmits a compact LoRa packet (node ID + sensor values + flags) to the surface gateway. The gateway processes the packet, activates the local buzzer, updates the SH1106 OLED display, sends an SMS via SIM800L GSM, and uploads the hazard event to Firebase Realtime Database — which propagates instantly to the web dashboard and triggers FCM push notifications to the Flutter app.",
        },
        {
          title: "Hardware Design",
          body: "Both underground nodes and surface gateway use custom-designed PCBs on ESP32-S3-N16R8 microcontrollers paired with LoRa Ra-02 SX1278 433 MHz radio modules. Underground nodes carry MQ-4 methane, MQ-7 CO, and water level sensors, plus a 12V siren driven through a transistor-MOSFET switching circuit. The surface gateway adds SIM800L GSM, 1.3\" SH1106 OLED, and active buzzer — powered by LM2596/XL4015 buck converters from a 12V supply.",
        },
        {
          title: "Cloud & Software Stack",
          body: "Firebase Realtime Database organises data under /status/mine1, /status/mine2, /alerts/mine1/history, and /alerts/mine2/history. Firebase Cloud Functions automatically dispatch FCM topic notifications whenever a new alert record is created. The Flutter mobile app subscribes to the mine_alerts topic for instant push alerts. The web dashboard uses the Firebase JS SDK for live real-time updates and is deployed on Firebase Hosting for zero-infrastructure access.",
        },
      ],
      archDiagram: `Underground Node 1 (Mine 1)          Underground Node 2 (Mine 2)
  ESP32-S3 + MQ-4 + MQ-7               ESP32-S3 + MQ-4 + MQ-7
  + Water Sensor + 12V Siren            + Water Sensor + 12V Siren
           │                                     │
           │  LoRa 433 MHz                        │  LoRa 433 MHz
           └─────────────────┬───────────────────┘
                             ▼
                    Surface Gateway
                  ESP32-S3 + OLED + Buzzer
                  + SIM800L + WiFi
                        │       │          │
                        │       │          └──► Firebase Realtime DB
                        │       └──────────►  SMS alert to supervisor
                        └──────────────────►  Local alarm + OLED display
                             │
                      Firebase Cloud
                   ┌──────────────────┐
                   │  /status/mine1   │
                   │  /status/mine2   │
                   │  /alerts/mine1   │
                   │  /alerts/mine2   │
                   └──────────────────┘
                        │            │
                  Web Dashboard   Flutter App
                  (Firebase       (Android/iOS
                   Hosting)        + FCM Push)`,
    },
  },

  // ── 02 LankaMesh ─────────────────────────────────────────────────────────
  {
    id: "lankamesh",
    number: "02",
    status: "completed",
    year: "2026",
    category: "IoT & Embedded",
    name: "LankaMesh",
    tagline: "LoRa-Based Disaster Mesh Communication Network",
    fieldLine: "IoT · Wireless Communication · Embedded · Mobile",
    shortDesc:
      "Decentralised wireless mesh communication network using LoRa for emergency and low-connectivity environments. Peer-to-peer SOS messaging, GPS tracking, and Flutter app.",
    coverImage: "/images/lankamesh.jpg",
    tags: ["ESP32-S3", "LoRa RA-02", "GPS NEO-4M", "Flutter", "Embedded C++", "+1"],
    githubUrl: "https://github.com/SanchilaAmavi",
    detail: {
      headline: "Keeping communities connected when all infrastructure fails — zero internet, zero cellular.",
      subline: "IoT · LoRa Mesh · GPS · Flutter Mobile",
      creatorImage: "/images/lankamesh-detail.jpg",
      teamImage: "/images/lankamesh team.jpg",
      overview: [
        "When disasters strike Sri Lanka — floods, landslides, cyclones — the first infrastructure to collapse is communication. Cellular towers lose power, internet backhaul goes down, and communities are left isolated at exactly the moment they need to coordinate rescue and relief.",
        "LankaMesh is a decentralised wireless mesh communication network built entirely on LoRa 433 MHz radio. Each node is an ESP32-S3 with a LoRa RA-02 module, GPS NEO-4M, SSD1306 OLED, and DHT22 environmental sensor, mounted on a custom PCB inside a waterproof ABS enclosure.",
        "Nodes form a self-healing peer-to-peer mesh: when an SOS is triggered, the packet is broadcast and automatically relayed by every intermediate node in range — extending the network reach far beyond a single hop. A Flutter mobile app connects over USB CDC Serial to send messages, trigger SOS, view the live map, and read sensor data.",
      ],
      highlights: [
        { icon: "📡", title: "LoRa Mesh — 5 km per Hop",        desc: "433 MHz with Spreading Factor 10, each node achieves 5 km open terrain. Relay nodes extend total reach far beyond any single hop." },
        { icon: "🆘", title: "One-Button SOS Broadcast",         desc: "GPIO button fires an immediate LoRa SOS packet containing the node's GPS coordinates, broadcast to all nodes in range. Auto-relayed by every intermediate node." },
        { icon: "🗺️", title: "Real-Time GPS Coordinate Share",   desc: "Every node broadcasts its GPS position (NEO-4M) every 15 seconds. The Flutter app plots all nodes on an OpenStreetMap view in real time." },
        { icon: "📋", title: "Structured Emergency Categories",   desc: "Messages are tagged as Medical, Flood, Landslide, Fire, Evacuation, Supply Request, or Other — letting rescuers triage incoming alerts by type." },
        { icon: "🔋", title: "Battery-Backed Multi-Day Field Op", desc: "ESP32-S3 sleeps between transmissions. DHT22 and GPS duty-cycled, targeting 48+ hours on a standard 18650 cell." },
        { icon: "📱", title: "Flutter App via USB CDC",          desc: "No Bluetooth needed. The app receives incoming messages, allows sending categorised text, triggers SOS, displays the map, and reads node sensor data." },
        { icon: "🌐", title: "Zero Infrastructure",              desc: "No servers, no SIM cards, no Wi-Fi access points. The system works the instant cellular fails — built for disaster, not convenience." },
        { icon: "🔌", title: "Custom PCB in ABS Enclosure",     desc: "ESP32-S3 + LoRa RA-02 + GPS NEO-4M + SSD1306 OLED + DHT22 on a custom PCB inside a waterproof ABS enclosure for field deployment." },
      ],
      gallerySections: lankameshGallery,
      stats: [
        { label: "Range / Hop",   value: "5 km" },
        { label: "LoRa Freq",     value: "433 MHz" },
        { label: "Spread Factor", value: "SF10" },
        { label: "TX Power",      value: "20 dBm" },
        { label: "SOS Latency",   value: "<400 ms" },
        { label: "Msg Types",     value: "5" },
      ],
      sections: [
        {
          title: "Hardware & PCB",
          body: "Each LankaMesh node is built around an ESP32-S3 paired with a LoRa RA-02 (SX1276, 433 MHz), GPS NEO-4M module, SSD1306 OLED display (128×64), and DHT22 temperature/humidity sensor — all mounted on a custom-designed PCB inside a waterproof ABS enclosure. The GPIO0 button triggers immediate SOS. Power comes from a single 18650 Li-ion cell with USB-C charging.",
        },
        {
          title: "Mesh Relay Protocol",
          body: "LankaMesh uses a custom LoRa packet format with source node ID, destination (broadcast or unicast), message type, sequence counter, GPS payload, and a 2-byte CRC. Every receiving node checks the sequence counter to avoid re-relaying duplicates, then rebroadcasts after a random 100–400 ms backoff — eliminating simultaneous relay collisions.",
        },
        {
          title: "Flutter App & USB Serial",
          body: "The Flutter mobile app connects to the node over USB CDC Serial at 115200 baud — no Bluetooth pairing required. The app parses incoming JSON frames from the node to display all online nodes on an OpenStreetMap tile view (flutter_map), show incoming messages with category and timestamp, allow the user to compose and send categorised text messages, and trigger an SOS directly from the app UI.",
        },
        {
          title: "Challenges & Solutions",
          body: "Limited range in dense terrain was addressed by optimising to SF10 + 128 kHz with 9 dBi higher-gain antennas. Power constraints were solved by duty-cycling DHT22 and GPS transmissions, targeting 48+ hours on a single 18650. Simultaneous retransmit collisions in the mesh relay were eliminated with random 100–400 ms backoff before relay.",
        },
      ],
      archDiagram: `  Field Node A                Field Node B              Field Node C
  ESP32-S3                    ESP32-S3                  ESP32-S3
  LoRa RA-02                  LoRa RA-02                LoRa RA-02
  GPS NEO-4M                  GPS NEO-4M                GPS NEO-4M
       │                           │                          │
       │ LoRa 433 MHz              │ LoRa 433 MHz             │
       └──────────────────┬────────┘                          │
                          │   relay                    LoRa 433 MHz
                    [Node B]────────────────────────────────────┘
                          │
                    Mesh Broadcast
               ┌──────────┴──────────┐
               │                     │
          Flutter App           All Nodes
          (USB CDC)              in Range`,
    },
  },

  // ── 03 NexDrive ──────────────────────────────────────────────────────────
  // FIX: removed "Elevision |" from tagline, removed all WSO2 references
  {
    id: "nexdrive",
    number: "03",
    status: "completed",
    year: "2026",
    category: "AI & ML",
    name: "NexDrive",
    tagline: "AI-Based Driver Fatigue & Safety Detection Platform",
    fieldLine: "Computer Vision · Deep Learning · Mobile App · FastAPI",
    shortDesc:
      "Full-stack driver safety platform combining deep learning fatigue detection (EfficientNet-B0, 93.24% accuracy), real-time face tracking, PERCLOS scoring, voice alerts, emergency SOS, and GPS tracking — built with PyTorch, FastAPI, and Flutter.",
    coverImage: "/images/NexDrive dashboard.jpg",
    tags: ["PyTorch", "EfficientNet-B0", "FastAPI", "Flutter", "ML Kit", "OpenCV", "+3"],
    githubUrl: "#",
    detail: {
      headline: "Preventing road fatalities by detecting driver drowsiness in real time — before the accident happens.",
      subline: "Computer Vision · Deep Learning · Mobile · FastAPI",
      overview: [
        "Every year over 1.35 million people die in road accidents globally, with 20% of all fatal crashes directly caused by driver fatigue and drowsiness. NexDrive is a complete AI-powered driver safety platform engineered to detect fatigue in real time and alert drivers before a dangerous situation occurs.",
        "The system is built on a custom-trained EfficientNet-B0 deep learning model achieving 93.24% test accuracy across four detection classes — eye closure, yawning, no yawn, and eyes open. The model was trained on 50,000+ images from the CEW and Yawn datasets using nine anti-overfitting techniques including transfer learning, dropout, batch normalisation, label smoothing, cosine annealing LR, early stopping, gradient clipping, and L2 regularisation.",
        "A Flutter mobile app named NexDrive connects to a FastAPI ML backend. The app uses Google ML Kit face detection for on-device facial landmark analysis — tracking eye open probability, mouth contour ratio, and head pose in real time to feed the PERCLOS drowsiness scoring engine. When fatigue is detected, the system triggers voice alerts, haptic feedback, push notifications, emergency SMS to contacts, and logs every event to the backend for post-trip analysis.",
      ],
      highlights: [
        { icon: "🧠", title: "EfficientNet-B0 — 93.24% Accuracy", desc: "Custom-trained deep learning model on 50,000+ images. 4-class detection: eye closed, open, yawn, no yawn. 9 anti-overfitting techniques. Trained with PyTorch in Google Colab." },
        { icon: "👁️", title: "PERCLOS Drowsiness Engine",          desc: "Industry-standard metric used by Bosch, Mobileye, and Tesla. 30-frame sliding window: PERCLOS × 0.7 + Yawn Rate × 0.3. Four alert levels: Normal → Warning → Danger → Critical." },
        { icon: "📱", title: "Flutter Cross-Platform App",         desc: "Android/iOS app with real-time camera feed, live fatigue score overlay, PERCLOS gauge, trip history charts, emergency SOS, GPS map view, and AI voice assistant." },
        { icon: "🔊", title: "Multi-Channel Alert System",         desc: "Voice TTS alerts, haptic vibration, push notifications, red screen overlay, and automatic emergency SMS — triggered progressively as drowsiness level escalates." },
        { icon: "🆘", title: "Emergency SOS & Contact Alerts",     desc: "One-tap SOS broadcasts the driver's GPS coordinates to pre-configured emergency contacts via SMS. Auto-triggered when CRITICAL fatigue level is sustained for >3 seconds." },
        { icon: "🗺️", title: "Live GPS Tracking",                  desc: "Real-time driver location on OpenStreetMap. GPS coordinates logged with every fatigue event for post-trip safety review." },
        { icon: "⚡", title: "FastAPI ML Backend",                 desc: "REST API serving EfficientNet-B0 with OpenCV face/eye cropping, PERCLOS session state management, trip recording, and safety statistics endpoints." },
        { icon: "📊", title: "Trip Analytics Dashboard",           desc: "Post-trip safety score breakdown, alert frequency charts, and session history — all accessible from the app's analytics screen." },
      ],
      gallerySections: nexdriveGallery,
      stats: [
        { label: "ML Accuracy",    value: "93.24%" },
        { label: "Model",          value: "EfficientNet-B0" },
        { label: "Training Imgs",  value: "50k+" },
        { label: "Alert Levels",   value: "4" },
        { label: "PERCLOS Window", value: "30 frames" },
        { label: "Alert Channels", value: "5" },
      ],
      sections: [
        {
          title: "Machine Learning Pipeline",
          body: "The EfficientNet-B0 model was trained in Google Colab on PyTorch using two Kaggle datasets — CEW Eye Dataset (48,000 images) and Yawn Eye Dataset (5,000+ images across yawn/no_yawn/open/closed classes). Images were preprocessed to 64×64 grayscale and augmented with nine Albumentations techniques: horizontal flip, random brightness/contrast, Gaussian noise, rotation, blur, CLAHE, shift-scale-rotate, grid distortion, and coarse dropout. Nine anti-overfitting techniques were applied simultaneously — including transfer learning with frozen backbone layers, dropout (50% + 25%), batch normalisation, L2 weight decay, label smoothing (0.1), cosine annealing LR scheduler, early stopping (patience=8), and gradient clipping. The model achieved 93.24% test accuracy with validation loss lower than training loss — a strong indicator of healthy generalisation.",
        },
        {
          title: "Real-Time Detection Architecture",
          body: "The Flutter mobile app captures a continuous live camera stream and passes each frame to Google ML Kit Face Detection, configured with enableClassification=true (eye open probabilities), enableLandmarks=true (mouth corner positions), and enableContours=true (upper/lower lip contours for yawn ratio calculation). The detected face region is cropped and sent to the FastAPI backend, where OpenCV Haar cascades further isolate the eye region before EfficientNet-B0 predicts the class. The PERCLOS engine maintains a 30-frame sliding window computing eye closure percentage and yawn rate. A weighted score (PERCLOS × 0.7 + Yawn Rate × 0.3) determines the alert level: NORMAL (<0.20), WARNING (0.20–0.40), DANGER (0.40–0.60), CRITICAL (>0.60).",
        },
        {
          title: "Flutter Mobile App — NexDrive Features",
          body: "The NexDrive Flutter app targets Android and iOS with a dark-themed professional UI. Key screens include: Home Dashboard with real-time safety score, trip count, alert count, and quick-start buttons; Camera Monitor with live face feed, animated PERCLOS gauge, fatigue score progress bar, colour-coded alert overlay, and Start/Stop controls; Trip History with session logs, per-trip safety scores, and alert counts; GPS Map View using geolocator showing live driver position; Emergency SOS screen with one-tap broadcast to configured contacts; Break Recommendations based on current fatigue level; and AI Voice Assistant (flutter_tts) delivering spoken safety guidance.",
        },
        {
          title: "FastAPI Backend",
          body: "The FastAPI backend exposes five endpoints: GET /health (system status and model info), POST /predict (face image → class + confidence + PERCLOS alert level), POST /trips/record (log completed trip with duration, alerts, safe score), GET /trips (retrieve last 50 trips), GET /stats (aggregated statistics including average score, total alerts, best/worst scores). The backend applies JWT-based authentication for all endpoints, ensuring only authenticated app users can access their trip data.",
        },
      ],
      archDiagram: `  Flutter Mobile App — NexDrive (Android / iOS)
  ┌──────────────────────────────────────────┐
  │  Camera Feed → Google ML Kit Face Detect │
  │  Eye Open Prob + Mouth Contour + HeadPose│
  │  PERCLOS Engine (30-frame sliding window)│
  │  Voice TTS + Haptic + Push Notification  │
  │  GPS Tracking + SOS + Trip History UI    │
  └──────────────────┬───────────────────────┘
                     │ REST API + JWT Token
                     ▼
  ┌──────────────────────────────────────────┐
  │         FastAPI ML Backend               │
  │  POST /predict                           │
  │   ├─ OpenCV Haar cascade crop            │
  │   ├─ EfficientNet-B0 inference           │
  │   └─ PERCLOS session state               │
  │  POST /trips/record · GET /trips         │
  │  GET  /stats · GET /health               │
  └──────────────────────────────────────────┘

  Alert Escalation:
  Score < 0.20    → ✅ NORMAL    (no action)
  Score 0.20–0.40 → ⚠️  WARNING  (voice + haptic)
  Score 0.40–0.60 → 🔴 DANGER   (notification + overlay)
  Score > 0.60    → 🚨 CRITICAL  (SOS SMS + all channels)`,
    },
  },

  // ── 04 AI Proctoring ─────────────────────────────────────────────────────
  {
    id: "aiproctor",
    number: "04",
    status: "completed",
    year: "2026",
    category: "AI & ML",
    name: "AI Proctoring System",
    tagline: "Intelligent Real-Time Examination Monitoring Platform",
    fieldLine: "Computer Vision · Object Detection · Python · Analytics",
    shortDesc:
      "Real-time exam proctoring combining MediaPipe face detection and YOLOv8 object detection. Dynamic risk scoring, audio alerts, live analytics dashboard, and comprehensive session logging.",
    coverImage: "/images/proctoring1.jpg",
    tags: ["Python", "YOLOv8", "MediaPipe", "OpenCV", "FastAPI", "Flutter", "+3"],
    githubUrl: "https://github.com/SanchilaAmavi/AI-Proctoring-System",
    detail: {
      headline: "Automated, unbiased exam surveillance — detecting academic dishonesty in real time without human intervention.",
      subline: "Computer Vision · YOLOv8 · MediaPipe · Python",
      overview: [
        "The AI Proctoring System is a comprehensive solution designed to monitor examination sessions in real-time using advanced computer vision and deep learning technologies. It analyzes live webcam feeds to monitor candidate behavior and detect potential academic dishonesty — including face absence, multiple persons, unauthorized device usage, and gaze deviation.",
        "The system focuses on automated surveillance during online examinations by identifying suspicious activities and enabling continuous, unbiased monitoring without requiring a human proctor. MediaPipe provides real-time face detection and multi-face identification at ~95% accuracy, while YOLOv8-nano efficiently detects mobile phones, tablets, and wireless devices at ~88% accuracy — all within a 40–60ms combined latency per frame.",
        "A Tkinter GUI dashboard presents a live video feed with detection overlays, a running total risk score, a Risk Score Over Time line graph, and an Event Type Distribution pie chart — all auto-updating during active monitoring. All events are logged to CSV with timestamps for post-examination audit and review.",
      ],
      highlights: [
        { icon: "🎯", title: "MediaPipe Face Detection",    desc: "Real-time face detection and tracking at ~95% accuracy. Detects missing faces, multiple persons, and off-angle presence for natural monitoring." },
        { icon: "📱", title: "YOLOv8 Device Detection",     desc: "59 MB YOLOv8-nano model detects mobile phones, tablets, and wireless devices with ~88% accuracy and 30–50ms inference time." },
        { icon: "⚡", title: "Dynamic Risk Scoring",        desc: "Configurable risk multipliers per event type (No Face: 5pts, Phone: 10pts, Multiple Faces: 8pts). Audio alert triggers when threshold exceeded." },
        { icon: "📊", title: "Live Analytics Dashboard",    desc: "Tkinter GUI with real-time video feed, colour-coded detection overlays, Risk Score Over Time graph, and Event Distribution pie chart." },
        { icon: "🔊", title: "Multi-Channel Alerts",        desc: "Immediate audio beep on suspicious detection with simultaneous red text overlays providing visual warnings." },
        { icon: "💾", title: "CSV Session Logging",         desc: "All events logged to proctoring_log.csv with timestamp, event type, and risk score. Multi-session support with separate log files." },
        { icon: "🌐", title: "Multi-Platform Architecture", desc: "Python AI core + FastAPI web backend + Flutter mobile app. Web dashboard accessible from any browser." },
        { icon: "🔄", title: "Full Session Lifecycle",      desc: "Start, Pause/Resume, Reset, and Exit & Save Logs controls. Prevents data loss with auto-save on exit." },
      ],
      gallerySections: aiproctoringGallery,
      stats: [
        { label: "Face Accuracy",   value: "~95%" },
        { label: "Object Accuracy", value: "~88%" },
        { label: "Latency",         value: "40–60ms" },
        { label: "Frame Rate",      value: "30 FPS" },
        { label: "Model Size",      value: "59 MB" },
        { label: "Log Format",      value: "CSV" },
      ],
      sections: [
        {
          title: "Detection Architecture",
          body: "The system runs two parallel detection pipelines on every captured frame. MediaPipe Face Detection (min_detection_confidence=0.7) identifies face presence, count, and position — flagging No Face Detected, Multiple Faces, and off-angle gaze. YOLOv8-nano (yolov8n.pt, 59 MB) simultaneously scans for object classes including mobile phones and tablets, issuing Phone Detected events. Both pipelines feed into the Risk Assessment Engine which classifies the event, applies a configurable risk multiplier, accumulates the session score, and triggers the alert layer if the threshold is exceeded.",
        },
        {
          title: "Dashboard & Analytics",
          body: "The Tkinter GUI window (1000×800) presents the live OpenCV video feed with real-time detection bounding boxes and label overlays. A prominently displayed Total Risk Score accumulates across the session. Two auto-updating Matplotlib charts provide analytics: a Risk Score Over Time line graph showing escalation patterns frame by frame, and an Event Type Distribution pie chart breaking down event categories by frequency.",
        },
        {
          title: "Multi-Platform Expansion",
          body: "The repository includes a full multi-platform architecture beyond the original Python desktop app: a FastAPI web backend serving a browser-based dashboard; a Flutter mobile prototype for Android/iOS remote monitoring with live session status, risk metrics, and session lifecycle controls; and native performance stubs for on-device camera access.",
        },
        {
          title: "Logging & Data Privacy",
          body: "All detection events are written to proctoring_log.csv with three columns: Timestamp (ISO 8601), Event (NO FACE DETECTED / PHONE DETECTED / MULTIPLE FACES), and Risk Score (per-event value). Multi-session support writes to separate log files per session. The Exit & Save Logs control triggers a graceful save of the complete session before closing.",
        },
      ],
      archDiagram: `Input Layer (Webcam Feed — OpenCV 640×480 @ 30 FPS)
         ↓
┌──────────────────────┐   ┌──────────────────────┐
│   MediaPipe Face     │   │   YOLOv8-nano        │
│   Detection          │   │   Object Detection   │
│   ~95% accuracy      │   │   ~88% accuracy      │
└──────────┬───────────┘   └──────────┬───────────┘
           └──────────┬───────────────┘
                      ↓
         Risk Assessment Engine
         - Event Classification
         - Risk Score Multipliers
         - Alert Threshold Check
                      ↓
         ┌────────────────────────────────┐
         │         Output Layer           │
         │  Tkinter GUI Dashboard         │
         │  Audio Alert (winsound beep)   │
         │  CSV Logging                   │
         │  FastAPI Web Backend           │
         │  Flutter Mobile App            │
         └────────────────────────────────┘`,
    },
  },

  // ── 05 Mars Robot ────────────────────────────────────────────────────────
  // FIX: removed redundant "Mars Robot |" prefix from tagline
  {
    id: "marsrobot",
    number: "05",
    status: "completed",
    year: "2025",
    category: "Robotics",
    name: "Mars Robot",
    tagline: "Autonomous Competition Robot — SLRC-Inspired Challenge",
    fieldLine: "Robotics · Embedded Systems · Sensor Fusion · Mechanical Design",
    shortDesc:
      "Autonomous robot for SLRC-inspired competition tasks: grid navigation, obstacle avoidance, ramp climbing, barcode scanning and intelligent potato sorting. ESP32-S3, sensor fusion, SolidWorks chassis, 3D-printed arm.",
    coverImage: "/images/marsrobot.jpg",
    tags: ["ESP32-S3", "TB6612FNG", "MPU6050", "TCS34725", "SolidWorks", "PID", "+3"],
    githubUrl: "#",
    detail: {
      headline: "A fully autonomous robot tackling grid navigation, ramp climbing, and barcode-guided sorting — zero human input from start to finish.",
      subline: "Robotics · Embedded C++ · Sensor Fusion · Mechanical Design",
      teamImage: "/images/marsrobot team.jpg",
      overview: [
        "As part of the Microprocessors, Microcontrollers and Embedded Systems (ET2223) module, our team designed and built a fully autonomous mobile robot for a competitive challenge inspired by the Sri Lankan Robotics Challenge (SLRC 2025 – University Category), organised by the University of Moratuwa.",
        "The Mars Robot Challenge: Greenhouse Survival Edition simulates greenhouse operations on Mars. The robot must navigate a 6×4 grid to collect potatoes, cross a muddy obstacle course, climb and descend a 20° ramp, scan a binary barcode, and sort good/bad potatoes into the correct baskets — all in a single autonomous run without any human input.",
        "The project demanded tight integration of electronics, embedded software, control algorithms, and mechanical design. A single state machine drives three sequential competition tasks, fusing data from IR, ultrasonic, IMU, and colour sensors in real time on the ESP32-S3.",
      ],
      highlights: [
        { icon: "🧠", title: "Single FSM — Three Tasks",       desc: "One finite state machine takes the robot through grid navigation, muddy road obstacle avoidance, ramp climbing, barcode scanning and potato sorting — zero human input once started." },
        { icon: "📡", title: "Four-Sensor Fusion",             desc: "8-channel IR array, ×3 HC-SR04 ultrasonics, MPU6050 IMU, and TCS34725 colour sensor fused in real time to drive PID line-following and obstacle-avoidance logic simultaneously." },
        { icon: "📐", title: "PID Line & Ramp Control",        desc: "Encoder-based wheel odometry with a tuned Kp/Ki/Kd PID loop for line following. MPU6050 pitch detection triggers dedicated ramp-climb and controlled-descent routines." },
        { icon: "🎨", title: "Colour & Barcode Detection",     desc: "TCS34725 detects green sticker cells in the 6×4 grid and reads a binary barcode (3 cm = 0, 6 cm = 1) to identify and sort good/bad potatoes into red/blue baskets." },
        { icon: "🦾", title: "3D-Printed 2-DOF Arm",          desc: "Self-designed robotic arm (shoulder + elbow + gripper) fully modelled and 3D-printed in PLA for fast iteration. Four MG90S servos drive the arm, gripper, and sort gate mechanism." },
        { icon: "⚙️", title: "SolidWorks Chassis",            desc: "Frame modelled in SolidWorks, laser-cut from acrylic for rigidity, with custom 3D-printed brackets mounting the arm, TT motors with hole encoders, and full sensor suite." },
        { icon: "🔋", title: "Self-Contained Power",          desc: "2S LiPo (7.4 V) with 5V regulation powers the ESP32-S3, TB6612FNG motor driver, and all servos from a single on-board pack." },
        { icon: "🏆", title: "SLRC-Standard Competition",     desc: "Tasks adapted from SLRC 2025 University Category under ET2223 at KDU. Three sequential tasks run in one competition run." },
      ],
      gallerySections: marsrobotGallery,
      stats: [
        { label: "Grid Size",    value: "6×4" },
        { label: "Ramp Angle",   value: "20°" },
        { label: "Sensor Types", value: "4" },
        { label: "Servos",       value: "4" },
        { label: "Tasks",        value: "3" },
        { label: "Battery",      value: "7.4V 2S" },
      ],
      sections: [
        {
          title: "Competition Tasks",
          body: "Task 1 — Plantation: Navigates a 6×4 grid autonomously, detecting green-sticker plant cells using TCS34725, then collecting yellow and white potatoes. Task 2 — Muddy Road & Ramp: Avoids randomly placed white-wall obstacles using three HC-SR04 ultrasonic sensors, then climbs and descends a 20° ramp (90 cm base) using MPU6050 pitch feedback. Task 3 — Collection & Sort: Reads a binary barcode (3 cm = 0, 6 cm = 1) using the IR array and TCS34725, determines good/bad potato classification, and actuates the sort-gate servo to direct potatoes into red or blue baskets.",
        },
        {
          title: "Electronics & Hardware",
          body: "Main processor: ESP32-S3 handling all PWM, I2C, and interrupts. Motor drive: TB6612FNG dual H-bridge controlling two TT DC motors with hole encoders. Sensors: 8-channel reflective IR array, three HC-SR04 ultrasonics (front/left/right), MPU6050 gyroscope, and TCS34725 colour sensor. Actuation: four MG90S servo motors for shoulder, elbow, gripper, and sorting gate. Power: 2S LiPo (7.4 V) stepped down to 5 V via on-board regulator.",
        },
        {
          title: "Mechanical Design & Fabrication",
          body: "The chassis frame was designed in SolidWorks and laser-cut from acrylic sheet. Custom 3D-printed PLA brackets mount the TT motors and servo motors precisely to the chassis. The robotic arm — with shoulder, elbow, and gripper joints — was fully self-designed and 3D-printed for fast iteration between competition runs.",
        },
        {
          title: "Software & Control Architecture",
          body: "The embedded firmware runs a modular FSM on ESP32-S3 with three top-level states corresponding to each competition task. The PID line controller reads the 8-channel IR array, computes error from the centre line, and drives differential motor speed via TB6612FNG PWM. Obstacle avoidance interrupts the line-follow loop when any ultrasonic measures below threshold. IMU pitch from MPU6050 triggers the ramp-climb routine. Encoder pulses from both TT motors feed dead-reckoning odometry for accurate 6×4 grid positioning.",
        },
      ],
      archDiagram: `  2S LiPo (7.4V) → 5V Regulator
          │
   ┌──────┴──────────────────────────────────┐
   │             ESP32-S3                    │
   │  ┌─────────────────────────────────┐   │
   │  │  Finite State Machine (FSM)     │   │
   │  │  Task 1: Plantation Grid        │   │
   │  │  Task 2: Muddy Road & Ramp      │   │
   │  │  Task 3: Collect & Sort         │   │
   │  └────────┬───────────┬────────────┘   │
   │           │           │                │
   │   ┌───────▼──┐  ┌────▼───────────┐   │
   │   │ Sensors  │  │  Actuators     │   │
   │   ├──────────┤  ├────────────────┤   │
   │   │ 8ch IR   │  │ TB6612FNG      │   │
   │   │ ×3 HC-SR │  │ → TT Motors    │   │
   │   │ MPU6050  │  │ ×4 MG90S Servo │   │
   │   │ TCS34725 │  │  (arm + gate)  │   │
   │   └──────────┘  └────────────────┘   │
   └────────────────────────────────────────┘`,
    },
  },

  // ── 06 ROSCO'25 ──────────────────────────────────────────────────────────
  // FIX: removed "Lankamesh | LoRa Based" prefix — completely wrong tagline
  {
    id: "rosco25",
    number: "06",
    status: "completed",
    year: "2025",
    category: "Robotics",
    name: "ROSCO'25 Robot",
    tagline: "Autonomous Line, Wall Following & Ramp Navigation Robot",
    fieldLine: "Robotics · PID Control · Sensor Fusion · Mechanical Design",
    shortDesc:
      "Autonomous robot for ROSCO'25 supporting line following, wall following, obstacle avoidance, and ramp navigation. Modular state-machine architecture with PID control and custom laser-cut acrylic chassis.",
    coverImage: "/images/Rosco robot.jpg",
    tags: ["ESP32-S3", "VL53L0X", "IR Sensors", "MPU6050", "PID", "+2"],
    githubUrl: "#",
    detail: {
      headline: "Team Botrix at ROSCO'25 — autonomous line, wall following and ramp navigation built with IMechE KDU.",
      subline: "Robotics · Embedded C++ · PID Control · SolidWorks",
      teamImage: "/images/Rosco Competition.jpg",
      overview: [
        "ROSCO'25 is a robotics competition organised by the Institution of Mechanical Engineers (IMechE) Student Chapter of KDU in collaboration with the Electronics, Robotics and Innovations Club (ERIC) of KDU. As Team Botrix, we designed and built a fully autonomous mobile robot to complete a series of progressive challenges.",
        "The robot was required to complete four sequential tasks in a single autonomous run: line following, wall following, advanced line following with intersections, and ramp riding. Each task demanded precise sensor fusion and reliable state-machine transitions without any human intervention.",
        "The mechanical and electronic system was designed end-to-end — from SolidWorks chassis layout to custom 3D-printed brackets, laser-cut acrylic structure, and a tuned PID firmware stack running on ESP32-S3.",
      ],
      highlights: [
        { icon: "🤖", title: "Fully Autonomous — Four Tasks",    desc: "Line following, wall following, advanced line following with intersections, and ramp riding — all completed in a single uninterrupted autonomous run." },
        { icon: "📡", title: "VL53L0X ToF Wall Detection",       desc: "Time-of-flight distance sensors provide precise wall clearance measurement for wall-following mode — far more accurate than ultrasonic at close range." },
        { icon: "📏", title: "8-Bit IR Array Line Following",    desc: "8-channel reflective IR sensor array feeds the PID controller for accurate centre-line tracking across straight runs and intersections." },
        { icon: "🔄", title: "MPU6050 Ramp Stabilisation",      desc: "Gyroscope feedback detects incline and adjusts motor power to maintain stable ramp ascent and controlled descent." },
        { icon: "⚙️", title: "TB6612FNG Dual Motor Driver",     desc: "PWM-controlled dual H-bridge drives two 6V 600 RPM N20 DC gear motors with smooth speed transitions for precise manoeuvring." },
        { icon: "🏗️", title: "SolidWorks + Laser-Cut Chassis", desc: "Chassis layout designed in SolidWorks, fabricated as laser-cut acrylic for structural rigidity and weight efficiency." },
        { icon: "🖨️", title: "Custom 3D-Printed Brackets",     desc: "All motor mounts, sensor holders, and structural brackets 3D-printed in PLA for fast iteration and precise component alignment." },
        { icon: "🔋", title: "12V LiPo Power System",          desc: "12V LiPo battery with regulated power distribution supplies stable voltage to all subsystems through dedicated voltage rails." },
      ],
      gallerySections: rosco25Gallery,
      stats: [
        { label: "Tasks",       value: "4" },
        { label: "Controller",  value: "ESP32-S3" },
        { label: "ToF Sensors", value: "VL53L0X" },
        { label: "IR Array",    value: "8-channel" },
        { label: "Motors",      value: "N20 600RPM" },
        { label: "Battery",     value: "12V LiPo" },
      ],
      sections: [
        {
          title: "Competition Tasks",
          body: "Task 1 — Line Following: Robot tracks a black line on white surface using the 8-channel IR array and PID controller. Task 2 — Wall Following: Switches to VL53L0X ToF sensors to maintain a fixed lateral distance from the wall surface. Task 3 — Advanced Line Following: Handles intersections and branching paths using sensor array logic to decide correct path direction. Task 4 — Ramp Riding: Detects ramp incline via MPU6050 pitch, boosts motor power for ascent, then applies controlled deceleration on descent.",
        },
        {
          title: "Electronics & Hardware",
          body: "Main processor: ESP32-S3 microcontroller managing real-time control and all sensor interfaces. Motor driver: TB6612FNG dual H-bridge for PWM-based motor control. Sensors: 8-channel reflective IR array for line detection, VL53L0X V2 time-of-flight sensors for wall measurement, MPU6050 gyroscope for orientation and ramp stability. Actuators: two 6V 600 RPM N20 DC gear motors. Power: 12V LiPo battery with regulated distribution.",
        },
        {
          title: "Mechanical Design & Fabrication",
          body: "The mechanical layout and component placement were designed in SolidWorks before fabrication. The chassis was laser-cut from acrylic sheet for structural strength and dimensional precision. Custom 3D-printed PLA brackets were produced for motor mounts and sensor holders. Final assembly integrated all electronic components with carefully routed wiring.",
        },
        {
          title: "Software & Control Architecture",
          body: "The embedded firmware runs a modular finite state machine (FSM) on ESP32-S3 with four top-level states corresponding to each competition task. The PID line controller continuously reads the 8-channel IR array, computes weighted error from centre, and drives differential motor speed via TB6612FNG PWM outputs. Wall-following mode switches input source to VL53L0X ToF readings. The MPU6050 pitch threshold triggers ramp-specific motor gain profiles for ascent and descent control.",
        },
      ],
      archDiagram: `  12V LiPo → Regulated Power Distribution
          │
   ┌──────┴──────────────────────────────────┐
   │             ESP32-S3                    │
   │  ┌─────────────────────────────────┐   │
   │  │  Finite State Machine (FSM)     │   │
   │  │  Task 1: Line Following         │   │
   │  │  Task 2: Wall Following         │   │
   │  │  Task 3: Advanced Line Follow   │   │
   │  │  Task 4: Ramp Riding            │   │
   │  └────────┬───────────┬────────────┘   │
   │           │           │                │
   │   ┌───────▼──┐  ┌────▼───────────┐   │
   │   │ Sensors  │  │  Actuators     │   │
   │   ├──────────┤  ├────────────────┤   │
   │   │ 8ch IR   │  │ TB6612FNG      │   │
   │   │ VL53L0X  │  │ → N20 Motors   │   │
   │   │ MPU6050  │  │                │   │
   │   └──────────┘  └────────────────┘   │
   └────────────────────────────────────────┘`,
    },
  },

  // ── 07 FeelFill ──────────────────────────────────────────────────────────
  {
    id: "smartpour",
    number: "07",
    status: "ongoing",
    year: "2026",
    category: "IoT & Embedded",
    name: "FeelFill",
    tagline: "Smart Measuring Cup for the Visually Impaired",
    fieldLine: "Assistive Tech · IoT · Embedded Systems · Inclusive Design",
    shortDesc:
      "An accessible smart measuring cup designed for visually impaired users — combining audio feedback, tactile sensing, and real-time volume detection to enable independent, accurate cooking and baking.",
    coverImage: "",
    tags: ["ESP32", "Capacitive Sensor", "DFPlayer Mini", "Embedded C++", "+2"],
    githubUrl: "#",
    detail: {
      headline: "Restoring kitchen independence for 39 million blind individuals — one accurate pour at a time.",
      subline: "Assistive Technology · IoT · Embedded Systems · Inclusive Design",
      overview: [
        "Globally, an estimated 285 million people live with visual impairment, of whom 39 million are fully blind. Among the most persistent challenges these individuals face are routine household tasks — such as measuring liquids accurately during cooking, medicine preparation, or beverage making. The absence of a visual reference forces reliance on another person or risking dangerous measurement errors.",
        "FeelFill is a low-cost, non-contact, capacitive liquid-level sensing device that provides real-time multi-modal feedback through voice announcements and haptic vibration to guide a visually impaired user to pour the exact required volume. The device is self-contained, battery-powered, and designed to clip onto any standard cup, making it universally applicable and affordable.",
        "Developed through the Design Thinking framework — grounded in a specific persona (Chamari Perera, 34, a fully blind home-maker from Galle) and validated by empathy research — the design satisfies all six stated design criteria: no visual display, non-contact sensing, universal cup fit, battery operation, under 8,000 LKR unit cost, and no smartphone or digital literacy required.",
      ],
      highlights: [
        { icon: "🎙️", title: "Voice Feedback at 4 Levels",      desc: "DFPlayer Mini + 8Ω speaker announces fill levels at 25%, 50%, 75%, and 100% — giving real-time audio guidance throughout the pour." },
        { icon: "📳", title: "Haptic Near-Full Warning",         desc: "Vibration motor fires at 95% capacity — giving the user time to stop pouring before overflow, even in noisy kitchen environments." },
        { icon: "🔬", title: "Non-Contact Capacitive Sensing",  desc: "External copper-tape electrode strip detects liquid level through the cup wall — no liquid contact required, fully hygienic and safe with hot liquids." },
        { icon: "🔌", title: "ESP32 + DFPlayer Architecture",   desc: "ESP32 microcontroller reads capacitive ADC, applies threshold logic, and drives DFPlayer Mini voice module and vibration motor through UART and GPIO." },
        { icon: "🔋", title: "8+ Hour Battery Life",            desc: "18650 Li-ion 3.7V / 3000 mAh cell with USB-C charging via TP4056. Deep-sleep between pours reduces idle current to under 1 mA." },
        { icon: "📐", title: "Universal Cup Fit",               desc: "Adjustable silicone sleeve fits cups from 50 mm to 100 mm outer diameter. Snap-fit ABS enclosure requires no tools for attachment." },
        { icon: "💰", title: "Affordable — Under 8,000 LKR",   desc: "Full BOM cost estimated at 5,100–7,800 LKR per unit. Target batch production cost drops to ~2,500 LKR at 500 units." },
        { icon: "♿", title: "Inclusive Design",                desc: "No screen, no smartphone, no literacy required. Single Start button operation. Non-stigmatising neutral clip-on form for public and home use." },
      ],
      gallerySections: FeelFillGallery,
      stats: [
        { label: "Fill Levels",   value: "4" },
        { label: "Resolution",    value: "~5 mL" },
        { label: "Battery",       value: "≥8 hr" },
        { label: "Cup Fit",       value: "50–100mm" },
        { label: "Unit Cost",     value: "<8k LKR" },
        { label: "Temp Range",    value: "0–60°C" },
      ],
      sections: [
        {
          title: "Problem & Design Thinking",
          body: "Standard measuring cups provide only visual graduation marks — useless for blind users. Existing assistive solutions (talking scales, Braille labels) do not solve dynamic pouring in real time. Finger dipping — the most common workaround — is unhygienic and dangerous with hot liquids. The FeelFill design was developed through a structured Design Thinking process: Empathize (persona interviews with Chamari Perera), Define (problem statement focused on real-time non-contact measurement), Ideate (three concepts evaluated), and Prototype (capacitive clip-on selected as the only concept satisfying all six criteria simultaneously).",
        },
        {
          title: "System Architecture",
          body: "Liquid rises inside the cup → dielectric field changes around the external copper-tape electrode → capacitive sensor output voltage rises → ESP32 ADC reads voltage → firmware maps voltage to fill percentage → DFPlayer Mini plays pre-recorded voice clip and/or vibration motor activates. Key specifications: sensing method is non-contact capacitive (external copper-tape electrode), microcontroller is ESP32 (Xtensa LX6 240 MHz, 12-bit ADC), voice output is DFPlayer Mini + 8Ω/1W speaker at ≥65 dB SPL at 0.5 m, feedback at 25/50/75/95/100%, battery life ≥8 hours, USB-C charging.",
        },
        {
          title: "Circuit Design",
          body: "Capacitive sensor: OUT → GPIO 34 (ADC1_CH6), VCC → 3.3V. DFPlayer Mini: TX/RX ↔ GPIO 25/26 (UART2), 5V supply. Vibration motor: GPIO 27 → 1kΩ base resistor → 2N2222 NPN transistor → motor. Push buttons (Start/Reset/Mode): GPIO 32, 33, 35 with internal pull-ups. Power rail: 18650 → TP4056 → 5V boost converter → LDO 3.3V for ESP32. The sealed ABS enclosure provides IPX4 splash resistance. Firmware includes watchdog timer recovery and sensor fault detection with an audio error alert.",
        },
        {
          title: "Design for Manufacture & Sustainability",
          body: "Design for Manufacturability: single two-layer PCB (100 mm × 60 mm), SMD components, copper tape electrode — no specialist tooling. Design for Assembly: snap-fit ABS shell with no screws; adjustable silicone band fits any cup in under 3 minutes. Design for Cost: first prototype 5,100–7,800 LKR; batch of 500 units targets ~2,500 LKR unit cost. Design for Reliability: non-contact sensing eliminates corrosion; MTBF >100,000 cycles; firmware updatable via USB. Sustainability: ABS/recycled PLA enclosure, RoHS-compliant PCB, modular component replacement, deep-sleep idle mode.",
        },
      ],
      archDiagram: `  18650 Li-ion → TP4056 → 5V Boost → 3.3V LDO
          │
   ┌──────┴──────────────────────────────────────┐
   │              ESP32 (240 MHz)                │
   │  ┌──────────────────────────────────────┐  │
   │  │  Firmware Logic                      │  │
   │  │  - ADC read (GPIO 34) every 200ms    │  │
   │  │  - Map voltage → fill percentage     │  │
   │  │  - Threshold check (25/50/75/95/100%)│  │
   │  │  - UART command → DFPlayer voice     │  │
   │  │  - GPIO 27 → vibration motor         │  │
   │  └──────────────────────────────────────┘  │
   │           │           │           │         │
   │   ┌───────▼──┐  ┌────▼──┐  ┌────▼──┐     │
   │   │Capacitive│  │DFPlay │  │Vibrate│     │
   │   │Sensor    │  │+ Spkr │  │Motor  │     │
   │   │(external │  │(voice │  │(haptic│     │
   │   │ strip)   │  │ alert)│  │ warn) │     │
   │   └──────────┘  └───────┘  └───────┘     │
   └─────────────────────────────────────────────┘

  Fill Feedback:
  25%  → ✅ Voice: "Quarter full"
  50%  → 📢 Voice: "Half full"
  75%  → 📢 Voice: "Three quarters"
  95%  → 📳 Vibration warning (near full)
  100% → 🔊 Voice: "Full" + Vibration`,
    },
  },
];

const CATEGORIES = ["All Projects", "AI & ML", "IoT & Embedded", "Robotics"];

// ─── Sectioned Gallery (dark-themed, larger images, captions always visible) ──
function SectionedGallery({ sections }: { sections: GallerySection[] }) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string; isVideo?: boolean; allImages: { src: string; caption: string; isVideo?: boolean }[]; idx: number } | null>(null);

  const current = sections.find(s => s.id === activeSection)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox) {
        const next = (lightbox.idx + 1) % lightbox.allImages.length;
        setLightbox({ ...lightbox, ...lightbox.allImages[next], idx: next });
      }
      if (e.key === "ArrowLeft" && lightbox) {
        const prev = (lightbox.idx - 1 + lightbox.allImages.length) % lightbox.allImages.length;
        setLightbox({ ...lightbox, ...lightbox.allImages[prev], idx: prev });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const openLightbox = (img: { src: string; caption: string; isVideo?: boolean }, idx: number) => {
    setLightbox({ ...img, allImages: current.images, idx });
  };

  // Filter empty gallery sections gracefully
  const hasImages = current.images.length > 0;

  return (
    <div>
      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {sections.map((s) => {
          const active = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
              style={active
                ? { background: "linear-gradient(135deg, var(--accent), var(--violet))", color: "#021018", borderColor: "transparent" }
                : { background: "var(--surface)", color: "var(--text-muted)", borderColor: "var(--border)" }}
            >
              <span>{s.icon}</span>
              {s.label}
              <span className="text-[0.52rem] px-1.5 py-0.5 rounded-full font-mono ml-0.5"
                style={{ background: active ? "rgba(2,16,24,0.2)" : "var(--surface-2)", color: active ? "#021018" : "var(--text-subtle)" }}>
                {s.images.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section label bar */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <span className="text-base">{current.icon}</span>
        <span className="text-xs font-bold text-[var(--text)]">{current.label}</span>
        <span className="text-[0.6rem] font-mono ml-1 text-[var(--text-subtle)]">{current.images.length} items</span>
      </div>

      {/* Empty state */}
      {!hasImages && (
        <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed"
          style={{
            borderColor: "var(--border)",
            backgroundImage: "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}>
          <span className="text-3xl mb-3 opacity-60">◈</span>
          <p className="text-sm font-semibold text-[var(--text-muted)]">Gallery in progress</p>
          <p className="text-xs text-[var(--text-subtle)] mt-1 font-mono">Build photos will land here as the prototype develops</p>
        </div>
      )}

      {/* Image grid — larger cells, caption always visible */}
      {hasImages && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {current.images.map((img, i) => {
            const isWide = img.span === "wide";
            const isTall = img.span === "tall";
            const isVid  = img.isVideo;
            return (
              <div
                key={i}
                className={`circuit-corners group relative rounded-2xl overflow-hidden cursor-pointer border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.015]
                  ${isWide ? "col-span-2" : isTall ? "row-span-2" : ""}`}
                style={{ aspectRatio: isWide ? "16/7" : isTall ? "4/7" : "4/3", background: "var(--surface)", borderColor: "var(--border)" }}
                onClick={() => openLightbox(img, i)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                {isVid ? (
                  <video
                    src={img.src}
                    className="w-full h-full object-cover"
                    muted loop playsInline
                    onMouseEnter={e => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={e => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                  />
                ) : (
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      el.parentElement!.style.background = "var(--surface-2)";
                    }}
                  />
                )}
                {/* Play indicator for videos */}
                {isVid && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">▶</div>
                  </div>
                )}
                {/* Caption — always visible at bottom, stronger gradient */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-8 pb-2.5 px-3">
                  <p className="text-white text-[0.65rem] leading-snug font-medium drop-shadow-sm">{img.caption}</p>
                </div>
                {/* Expand icon on hover */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center text-[0.65rem] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow">⤢</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-mono">ESC ✕</button>

            {/* Nav arrows */}
            {lightbox.allImages.length > 1 && (
              <>
                <button onClick={() => { const p=(lightbox.idx-1+lightbox.allImages.length)%lightbox.allImages.length; setLightbox({...lightbox,...lightbox.allImages[p],idx:p}); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all">‹</button>
                <button onClick={() => { const n=(lightbox.idx+1)%lightbox.allImages.length; setLightbox({...lightbox,...lightbox.allImages[n],idx:n}); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all">›</button>
              </>
            )}

            {lightbox.isVideo ? (
              <video src={lightbox.src} className="w-full max-h-[80vh] rounded-2xl shadow-2xl" controls autoPlay />
            ) : (
              <img src={lightbox.src} alt={lightbox.caption} className="image-reveal w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            )}
            <div className="mt-4 text-center">
              <p className="text-white/80 text-sm font-medium">{lightbox.caption}</p>
              {lightbox.allImages.length > 1 && (
                <p className="text-white/40 text-xs font-mono mt-1">{lightbox.idx + 1} / {lightbox.allImages.length}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Project Detail Modal (dark-themed — matches the rest of the site) ───────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const d = project.detail!;
  const [tab, setTab] = useState<"overview" | "gallery" | "tech">("overview");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  // Scroll modal content to top when tab changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const statusColor: Record<string, { bg: string; text: string }> = {
    completed: { bg: "var(--green-dim)", text: "var(--green)" },
    ongoing:   { bg: "var(--amber-dim)", text: "var(--amber)" },
    prototype: { bg: "var(--violet-dim)", text: "var(--violet)" },
  };
  const sc = statusColor[project.status];

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-start justify-center p-3 md:p-6 overflow-y-auto animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-shell relative w-full max-w-5xl my-4 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">

        {/* Hero */}
        <div className="scan-header relative h-56 md:h-72 overflow-hidden" style={{ background: "var(--bg)" }}>
          {project.coverImage && (
            <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover opacity-50"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
          {/* Decorative circuit grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          <button onClick={onClose} className="circuit-corners absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 flex items-center justify-center text-sm font-bold transition-all">✕</button>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[0.58rem] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>{project.status}</span>
              <span className="text-[0.6rem] font-mono text-[var(--text-subtle)]">{project.category} · {project.year}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] tracking-tight leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>{project.name}</h2>
            <p className="text-[var(--text-muted)] text-xs mt-1.5">{project.tagline}</p>
            {/* Field subline */}
            {d.subline && (
              <div className="flex items-center gap-1.5 mt-2">
                <span className="live-dot" />
                <p className="text-[0.62rem] font-mono text-[var(--accent)]/85 tracking-wide ml-1">{d.subline}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 py-3 border-b sticky top-0 z-20" style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}>
          {(["overview", "gallery", "tech"] as const).map((t) => {
            const labels: Record<string, string> = { overview: "Overview", gallery: "Gallery", tech: "Technical Details" };
            const icons:  Record<string, string> = { overview: "◈", gallery: "◉", tech: "◆" };
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)}
                className={`modal-tab flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${active ? "modal-tab-active" : ""}`}>
                <span className="text-[0.55rem]">{icons[t]}</span>
                {labels[t]}
              </button>
            );
          })}
          <div className="ml-auto flex gap-2">
            {project.githubUrl && project.githubUrl !== "#" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:border-[var(--border-hover)] hover:text-[var(--accent)]"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <GitHubIcon size={14} /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6 md:p-8" ref={contentRef}>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="space-y-7 animate-fade-in">
              {/* Headline quote */}
              <div className="modal-quote relative px-5 py-4 rounded-2xl overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: "linear-gradient(to bottom, var(--accent), var(--violet))" }} />
                <p className="text-sm md:text-base font-semibold leading-snug pl-2 text-[var(--text)]">"{d.headline}"</p>
              </div>

              {/* Stats strip */}
              {d.stats && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {d.stats.map((s) => (
                    <div key={s.label} className="modal-card p-3 text-center">
                      <p className="text-sm font-extrabold text-[var(--accent)]" style={{ fontFamily: "Syne, sans-serif" }}>{s.value}</p>
                      <p className="font-mono text-[0.45rem] uppercase tracking-widest mt-1 text-[var(--text-subtle)]">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Overview + image — each paragraph gets a numbered accent so the
                  "long description" reads as a structured narrative, not a wall of text */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.2em] mb-3 text-[var(--text-subtle)]">About this project</h3>
                  <div className="space-y-4">
                    {d.overview.map((p, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="font-mono text-[0.6rem] text-[var(--accent)]/50 mt-1 flex-shrink-0">0{i + 1}</span>
                        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {d.teamImage && (
                    <>
                      <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)]">The Team</h3>
                      <div className="circuit-corners rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                        <img src={d.teamImage} alt="Project team" className="w-full object-cover" style={{ aspectRatio: "4/3" }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    </>
                  )}
                  {d.creatorImage && !d.teamImage && (
                    <>
                      <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.2em] text-[var(--text-subtle)]">Creator</h3>
                      <div className="circuit-corners rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                        <img src={d.creatorImage} alt="Project creator" className="w-full object-cover" style={{ aspectRatio: "3/4" }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <p className="text-[0.62rem] text-center font-medium text-[var(--text-muted)]">Sanchila Amavi — Creator &amp; Engineer</p>
                    </>
                  )}
                </div>
              </div>

              <div className="circuit-divider" />

              {/* Key features */}
              <div>
                <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.2em] mb-4 text-[var(--text-subtle)]">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {d.highlights.map((h) => (
                    <div key={h.title} className="modal-card flex gap-3 p-4">
                      <span className="text-lg flex-shrink-0 mt-0.5">{h.icon}</span>
                      <div>
                        <p className="text-xs font-bold mb-1 text-[var(--text)]">{h.title}</p>
                        <p className="text-[0.68rem] leading-relaxed text-[var(--text-muted)]">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                {project.tags.filter(t => !t.startsWith("+")).map((t) => (
                  <span key={t} className="modal-pill text-[0.62rem] px-2.5 py-1 rounded-lg border">{t}</span>
                ))}
              </div>

              {/* CTA to gallery */}
              <button onClick={() => setTab("gallery")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold border-2 border-dashed transition-all hover:bg-[var(--accent)]/5"
                style={{ borderColor: "rgba(56,189,248,0.3)", color: "var(--accent)" }}>
                <span>◉</span> View Gallery →
              </button>
            </div>
          )}

          {/* GALLERY */}
          {tab === "gallery" && <SectionedGallery sections={d.gallerySections} />}

          {/* TECH */}
          {tab === "tech" && d.sections && (
            <div className="space-y-4 animate-fade-in">
              {d.sections.map((s, i) => (
                <div key={s.title} className="modal-card overflow-hidden">
                  <div className="px-5 py-3 flex items-center gap-3 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                    <span className="font-mono text-[0.55rem] text-[var(--accent)] font-bold">0{i + 1}</span>
                    <h4 className="text-sm font-bold text-[var(--text)]">{s.title}</h4>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">{s.body}</p>
                  </div>
                </div>
              ))}
              {d.archDiagram && (
                <div className="modal-card overflow-hidden">
                  <div className="px-5 py-3 flex items-center gap-3 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                    <span className="font-mono text-[0.55rem] text-[var(--accent)] font-bold">0{(d.sections?.length ?? 0) + 1}</span>
                    <h4 className="text-sm font-bold text-[var(--text)]">System Architecture Diagram</h4>
                  </div>
                  <div className="px-5 py-4" style={{ background: "var(--bg)" }}>
                    <pre className="text-[0.6rem] leading-relaxed overflow-x-auto text-[var(--green)]" style={{ fontFamily: "monospace" }}>{d.archDiagram}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const statusColors: Record<string, string> = {
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    ongoing:   "bg-amber-500/15 text-amber-400 border-amber-500/25",
    prototype: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  };
  const visibleTags = project.tags.filter(t => !t.startsWith("+")).slice(0, 4);
  const extra       = project.tags.find(t => t.startsWith("+"));
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt that tracks the cursor — reads as "inspecting a board",
  // not a generic hover lift. Clamped to a few degrees so it stays tasteful.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;
    const py = (e.clientY - r.top)  / r.height - 0.5;
    el.style.setProperty("--rx", `${px * 6}deg`);
    el.style.setProperty("--ry", `${-py * 6}deg`);
  };
  const resetTilt = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={cardRef}
      className="card circuit-corners tilt group flex flex-col cursor-pointer hover:border-[var(--border-hover)] hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
      style={{
        height: "440px",
        animationDelay: `${index * 60}ms`,
        animation: "fadeInUp 0.5s ease both",
      }}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={`text-[0.55rem] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>{project.status}</span>
          <span className="text-[0.58rem] font-mono text-[var(--text-subtle)]">{project.year}</span>
        </div>
        <span className="font-mono text-[0.58rem] text-[var(--text-subtle)]">{project.number}</span>
      </div>

      {/* Cover image — slightly taller for better visibility */}
      <div className="mx-5 rounded-xl overflow-hidden flex-shrink-0 relative group/img"
        style={{ height: "160px", background: "linear-gradient(135deg, var(--surface), color-mix(in srgb, var(--accent) 8%, var(--surface)))" }}>
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              el.parentElement!.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.2;font-size:2.5rem;">◈</div>`;
            }} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}>
            <span className="text-2xl opacity-50">◈</span>
            <span className="font-mono text-[0.55rem] tracking-widest uppercase text-[var(--text-subtle)]">Concept stage</span>
          </div>
        )}
        {/* Category overlay on image */}
        <div className="absolute top-2 left-2">
          <span className="text-[0.5rem] font-mono font-semibold px-2 py-0.5 rounded-full text-white/90"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>{project.category}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-5 pt-3.5 pb-4 gap-2 min-h-0">
        <div className="flex-shrink-0">
          <h3 className="text-[0.9rem] font-extrabold text-[var(--text)] leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>{project.name}</h3>
          <p className="text-[0.6rem] text-[var(--text-subtle)] mt-0.5 leading-snug line-clamp-1">{project.tagline}</p>
          {/* NEW: field line */}
          {project.fieldLine && (
            <p className="text-[0.55rem] font-mono text-[var(--accent)] mt-1 opacity-80 truncate">{project.fieldLine}</p>
          )}
        </div>
        <p className="text-[0.72rem] text-[var(--text-muted)] leading-relaxed line-clamp-2 flex-shrink-0">{project.shortDesc}</p>
        <div className="flex flex-wrap gap-1.5 flex-shrink-0" style={{ minHeight: "22px" }}>
          {visibleTags.map((t) => (
            <span key={t} className="tag text-[0.55rem] px-2 py-0.5">{t}</span>
          ))}
          {extra && <span className="tag text-[0.55rem] px-2 py-0.5 text-[var(--accent)]">{extra}</span>}
        </div>
        <div className="flex items-center justify-between pt-2 mt-auto flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="flex items-center gap-1.5 text-[var(--accent)] text-[0.7rem] font-semibold group-hover:gap-2.5 transition-all">
            {project.detail ? "View details" : "Coming soon"}
            {project.detail && <span className="transition-transform group-hover:translate-x-1">→</span>}
          </span>
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors" title="View on GitHub">
              <GitHubIcon size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [openProject,    setOpenProject]    = useState<Project | null>(null);

  const filtered = activeCategory === "All Projects"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="blob w-96 h-96 bg-[var(--accent)]/[0.05] top-0 right-0" />
      <div className="blob w-72 h-72 bg-[var(--violet)]/[0.06] bottom-0 left-0" />

      <div className="section-inner relative z-10">
        <div className="mb-10">
          <span className="eyebrow">03 / Projects</span>
          <h2 className="text-[1.6rem] md:text-[2.6rem] font-extrabold leading-[1.1] tracking-tight mt-3" style={{ fontFamily: "Syne, sans-serif" }}>
            <span className="text-[var(--text)]">Innovation</span>{" "}
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2 max-w-xl">
            Selected work across AI, IoT, embedded systems, and autonomous robotics.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const count = cat === "All Projects" ? projects.length : projects.filter(p => p.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                style={active
                  ? { background: "linear-gradient(135deg, var(--accent), var(--violet))", color: "#fff", borderColor: "transparent" }
                  : { borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {cat}
                {cat !== "All Projects" && (
                  <span className="text-[0.52rem] px-1.5 py-0.5 rounded-full font-mono"
                    style={{ background: active ? "rgba(255,255,255,0.2)" : "var(--surface)", color: active ? "#fff" : "var(--text-subtle)" }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => p.detail && setOpenProject(p)} />
          ))}
        </div>
      </div>

      {openProject?.detail && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}