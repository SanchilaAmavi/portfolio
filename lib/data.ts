// ============================================================
// DATA FILE — Edit everything here to update your portfolio
// ============================================================

export const personalInfo = {
  name:         "Maha Marakkalage Sanchila Amavi",
  shortName:    "Sanchila Amavi",
  initials:     "SA",
  title:        "Electronics & Telecommunication Engineer",
  taglines:     ["AI Systems Builder", "IoT Architect", "Embedded Engineer"],
  bio:          "Electronics and Telecommunication Engineering undergraduate at General Sir John Kotelawala Defence University. I build end-to-end systems spanning embedded hardware, AI inference, IoT cloud pipelines, mobile apps, and robotics - from PCB to production.",
  university:   "General Sir John Kotelawala Defence University",
  degree:       "BSc. (Hons) in Electronic and Telecommunication Engineering",
  email:        "sanchilaamavi@gmail.com",
  phone:        "+94 76 422 7785",
  location:     "Sri Lanka",
  github:       "https://github.com/SanchilaAmavi",
  linkedin:     "https://www.linkedin.com/in/sanchila-amavi-6b4660274?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  resumePath:   "/resume.pdf",
  profileImage: "/images/profile.jpg",
  stats: [
    { label: "Projects", value: "6+" },
    { label: "Awards",   value: "9+" },
    { label: "Certs",    value: "7" },
  ],
};

// ── EDUCATION ────────────────────────────────────────────────
export const education = [
  {
    institution: "General Sir John Kotelawala Defence University",
    degree:      "BSc. (Hons) Electronic and Telecommunication Engineering",
    period:      "Feb 2024 – Present",
    image:       "/images/kdu.jpg",
  },
  {
    institution: "Devi Balika Vidyalaya, Colombo 08",
    degree:      "GCE Advanced Level - Physical Science Stream",
    period:      "Jan 2014 – Dec 2022",
    detail:      "A/L: Combined Maths · Physics · Chemistry",
    image:       "/images/devi-balika.jpg",
  },
];

export const coursework = [
  "Electronic Systems",
  "Signals & Systems",
  "Communication Theory",
  "Electromagnetics",
  "Control Systems",
  "Electronic Circuits",
  "Communication Networks",
  "Image Processing & Vision",
  "Digital Signal Processing",
  "Embedded Systems",
  "Power Electronics",
  "Digital System Design",
];

// ── PROJECTS ─────────────────────────────────────────────────
export const projects = [
  {
    id:       1,
    title:    "Mine Pulse",
    subtitle: "Smart Underground Mine Safety Monitoring System",
    category: "IoT & Embedded",
    status:   "completed",
    year:     "2025",
    featured: true,
    image:    "/images/mine-pulse.jpg",
    github:   "#",
    description:
      "Multi-node IoT safety system for real-time underground hazard detection covering methane, carbon monoxide, and flooding. Custom PCBs, LoRa mesh with collision avoidance, Firebase cloud integration, Flutter mobile app, and GSM SMS alerting.",
    highlights: [
      "Custom PCB design for underground & surface nodes",
      "LoRa mesh with ACK handshaking & node addressing",
      "Firebase Realtime DB + FCM push notifications",
      "SMS alerts via SIM800L GSM module",
    ],
    tags: ["ESP32-S3", "LoRa SX1278", "SIM800L", "Firebase", "Flutter", "React.js", "EasyEDA", "C++", "Dart"],
  },
  {
    id:       2,
    title:    "Driver Fatigue Detection System",
    subtitle: "AI-Powered Driver Safety Application — NexDrive",
    category: "AI & ML",
    status:   "completed",
    year:     "2026",
    featured: true,
    image:    "/images/fatigue.jpg",
    github:   "#",
    description:
      "Full-stack real-time driver safety platform combining deep learning fatigue detection, live GPS tracking, voice alerts, and emergency response. EfficientNet-B0 CNN with PERCLOS-based continuous fatigue scoring.",
    highlights: [
      "EfficientNet-B0 trained for 4-class behavioural classification",
      "PERCLOS scoring with escalating voice alert engine",
      "Flutter app with live GPS map & emergency contacts",
      "FastAPI backend with JWT auth, Docker containerised",
    ],
    tags: ["Python", "PyTorch", "OpenCV", "FastAPI", "Flutter", "Dart", "Google Maps", "Firebase", "Docker"],
  },
  {
    id:       3,
    title:    "LankaMesh",
    subtitle: "LoRa-Based Decentralized Mesh Communication Network",
    category: "IoT & Embedded",
    status:   "completed",
    year:     "2026",
    featured: true,
    image:    "/images/lankamesh.jpg",
    github:   "#",
    description:
      "Decentralized wireless mesh communication network using LoRa for emergency and low-connectivity environments. Peer-to-peer SOS alerts, messages, and GPS data sharing without internet infrastructure.",
    highlights: [
      "Long-range LoRa peer-to-peer communication",
      "ESP32-S3 + LoRa RA-02 + GPS module architecture",
      "Flutter app for emergency alert categorization",
      "Scalable disaster communication framework",
    ],
    tags: ["ESP32-S3", "LoRa RA-02", "GPS", "Flutter", "IoT", "Embedded Systems"],
  },
  {
    id:       4,
    title:    "AI Proctoring System",
    subtitle: "Intelligent Real-Time Examination Monitoring Platform",
    category: "AI & ML",
    status:   "completed",
    year:     "2026",
    featured: false,
    image:    "/images/proctoring.jpg",
    github:   "#",
    description:
      "Real-time exam proctoring combining MediaPipe face detection and YOLOv8 object detection. Dynamic risk scoring, audio alerts, live dashboard with risk-over-time graphs, and comprehensive session logging.",
    highlights: [
      "YOLOv8 + MediaPipe multi-violation detection",
      "Dynamic risk scoring with configurable thresholds",
      "Python AI core + FastAPI backend + Flutter app",
      "CSV session logging for post-examination audit",
    ],
    tags: ["Python", "YOLOv8", "MediaPipe", "OpenCV", "FastAPI", "Flutter", "Dart", "Tkinter"],
  },
  {
    id:       5,
    title:    "Mars Robot",
    subtitle: "Autonomous Robotics Competition System",
    category: "Robotics",
    status:   "completed",
    year:     "2025",
    featured: false,
    image:    "/images/mars-robot.jpg",
    github:   "#",
    description:
      "Autonomous robot for competition-based navigation and object handling. Sensor fusion across IR, ultrasonic, gyroscope, and colour sensors. SolidWorks chassis, 3D printed, encoder-based motor control.",
    highlights: [
      "Sensor fusion: IR, ultrasonic, MPU6050, TCS34725",
      "ESP32-S3 real-time decision-making & motor control",
      "SolidWorks design, 3D-printed fabrication",
      "TB6612FNG motor driver with encoder feedback",
    ],
    tags: ["ESP32-S3", "C/C++", "IR", "Ultrasonic", "MPU6050", "TCS34725", "SolidWorks"],
  },
  {
    id:       6,
    title:    "ROSCO'25 Competition Robot",
    subtitle: "Autonomous Line & Wall Following Robot",
    category: "Robotics",
    status:   "completed",
    year:     "2025",
    featured: false,
    image:    "/images/rosco.jpg",
    github:   "#",
    description:
      "Autonomous robot for ROSCO'25 supporting line following, wall following, obstacle avoidance, and ramp navigation. Modular state-machine architecture with PID control and custom laser-cut acrylic chassis.",
    highlights: [
      "8-channel IR array + VL53L0X ToF + MPU6050 fusion",
      "PID-based line following & wall distance regulation",
      "Modular perception–decision–control architecture",
      "Laser-cut acrylic + 3D-printed sensor mounts",
    ],
    tags: ["ESP32-S3", "VL53L0X", "IR Sensors", "MPU6050", "TB6612FNG", "SolidWorks", "PID"],
  },
];

// ── SKILLS ───────────────────────────────────────────────────
export const skills = [
  {
    category: "AI / ML & Vision",
    icon:     "Brain",
    items: [
      "Python", "PyTorch", "TensorFlow", "Keras", "OpenCV",
      "YOLOv8", "MediaPipe", "CNNs", "MobileNetV2",
      "Transfer Learning", "PERCLOS Analysis", "ONNX Runtime",
    ],
  },
  {
    category: "Embedded Systems & IoT",
    icon:     "Cpu",
    items: [
      "ESP32 / ESP32-S3", "Arduino", "Embedded C/C++",
      "LoRa SX1278", "GSM SIM800L", "Sensor Integration",
      "PCB Design", "EasyEDA", "Motor Control", "PID Control",
      "Sensor Fusion", "Autonomous Navigation",
    ],
  },
  {
    category: "Mobile, Web & Cloud",
    icon:     "Globe",
    items: [
      "Flutter", "Dart", "React.js", "Next.js", "TypeScript",
      "Tailwind CSS", "FastAPI", "REST APIs",
      "Firebase Realtime DB", "FCM", "Docker", "Android Dev",
    ],
  },
  {
    category: "Programming Languages",
    icon:     "Code",
    items:    ["Python", "C", "C++", "Dart", "JavaScript", "HTML5", "CSS3", "SQL"],
  },
  {
    category: "Data & Analysis",
    icon:     "BarChart2",
    items:    ["NumPy", "Pandas", "Matplotlib", "Data Visualization", "Statistical Analysis"],
  },
  {
    category: "Design & Tools",
    icon:     "Wrench",
    items: [
      "EasyEDA", "Proteus", "LTspice", "SolidWorks",
      "MATLAB", "Arduino IDE", "VS Code", "Git", "GitHub",
      "Docker", "Postman", "Canva",
    ],
  },
];


// ── ACHIEVEMENTS ─────────────────────────────────────────────
export const achievements = [
  {
    title: "Winner — 1st Place (Inter University · Female · Individual)",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Winner",
    image: "/images/MSSC 1 st place individual 2025.jpg",
  },
  {
    title: "Champions",
    event: "Target Sprint Shooting Competition",
    year:  "2025",
    type:  "Winner",
    image: "/images/target sprint 1st place team 2025.jpg",
  },
  {
    title: "Inter-Faculty Netball Champions",
    event: "Inter Faculty Netball Tournament",
    year:  "2025",
    type:  "Winner",
    description:
      "Secured 1st place with the faculty netball team in the Inter-Faculty Netball Tournament.",
    image: "/images/netball.jpg",
  },
  {
    title: "ROSCO '25 | Robotics Showdown Competition",
    event: "IMechE / ERIC / KDU",
    year:  "2025",
    type:  "Participant",
    description:
      "Participated as Team Linestrom in the Robotics Showdown Competition 2025, organized by the Institution of Mechanical Engineers Student Chapter and the Electronics, Robotics and Innovation Club of KDU.",
    image: "/images/Rosco Certificate.jpg",
  },
  {
    title: "TECHXhiBiT 2.0 | Hardware & Software Exhibition",
    event: "TECHXhiBiT 2.0 Exhibition",
    year:  "2026",
    type:  "Participant",
    description:
      "Participated and showcased engineering project work at the TECHXhiBiT 2.0 Hardware & Software Exhibition.",
    image: "/images/texhibit certificate.jpg", // ⚠ matches your folder's exact spelling
  },
  {
    title: "KDU Colour Award — Air Rifle",
    event: "KDU Sports Awards",
    year:  "2025",
    type:  "Award",
    image: "/images/kdu colour 2025 certificate.jpg", // ⚠ confirm real extension
  },
  {
    title: "KDU Merit Award — Air Rifle",
    event: "KDU Sports Awards",
    year:  "2024",
    type:  "Award",
    image: "/images/kdu merit 2024.jpg",
  },
  {
    title: "2nd Place (Inter University · Female · Group)",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Award",
    image: "/images/mssc 2nd place group 2025.jpg",
  },
  {
    title: "3rd Place (Inter University · Female · Individual)",
    event: "Target Sprint Shooting Championship",
    year:  "2025",
    type:  "Award",
    image: "/images/target sprint 3rd place individual 2025.jpg",
  },
  {
    title: "Precision Shooter — Air Rifle",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Award",
    image: "/images/precision shooter 2025.jpg",
  },
  {
    title: "Excellent Shooter — Air Rifle",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Award",
    image: "/images/excellent shooter 100 marks 2025.jpg",
  },
  {
    title: "Precision Shooter — Air Rifle",
    event: "MSSC Shooting Championship",
    year:  "2024",
    type:  "Award",
    image: null, // ⚠ still no matching file in your folder
  },
  {
    title: "Sharp Shooter — Air Rifle",
    event: "Inter University Shooting Championship",
    year:  "2026",
    type:  "Award",
    image: null, // ⚠ still no matching file in your folder
  },
  {
    title: "Sharp Shooter — Air Rifle",
    event: "Inter University Shooting Championship",
    year:  "2024",
    type:  "Award",
    image: "/images/Inter university meet 2024.jpeg",
  },
  {
    title: "Sharp Shooter — Air Rifle",
    event: "Inter Shooting Championship",
    year:  "2014",
    type:  "Award",
    image: "/images/2014 sharp shooter.jpg",
  },
];

// ── CERTIFICATIONS ───────────────────────────────────────────
export const certifications = [
  {
    title:       "AI/ML Engineer - Stage 1",
    issuer:      "SLIIT",
    year:        "2026",
    description: "Machine learning pipelines, supervised and unsupervised learning, neural networks, TensorFlow, Keras, and model evaluation techniques.",
    image:       "/images/stage1 sliit.jpeg",
    verifyUrl:   "https://code.sliit.org/certificates/fnjqs05ep8",
  },
  {
    title:       "AI/ML Engineer - Stage 2",
    issuer:      "SLIIT",
    year:        "2026",
    description: "Advanced model deployment, evaluation pipelines, and applied machine learning practices building on Stage 1.",
    image:       "/images/stage2 sliit.jpeg",
    verifyUrl:   "https://code.sliit.org/certificates/0qpqgpz2oi",
  },
  {
    title:       "PCB Design Workshop on EAGLE Software",
    issuer:      "IET / KDU",
    year:        "2025",
    description: "Active participation in the PCB Design workshop on EAGLE Software, held at the Faculty of Engineering, General Sir John Kotelawala Defence University, organized by IET On-Campus (KDU) and the Sri Lanka Institute of Robotics.",
    image:       "/images/IET Certificate.jpg",
  },
  {
    title:       "MATLAB Fundamentals",
    issuer:      "MATLAB Training Program",
    year:        "2024",
    description: "Numerical computing, matrix operations, data visualization, scripting, and engineering simulation techniques.",
    image:       null, // ⚠ still no matching file in your folder
  },
  // One entry, 3 photos — uses the new `images` array
  {
    title:       "introduction to github administrative",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Completed the GitHub Foundations learning path covering GitHub administration.",
    images: [
      "/images/introduction to github administrative.jpeg",
      
      "/images/introduction to github.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/en-us/users/sanchilaamavi-5264/transcript/76w62cknp2zj5j9",
  },
  {
    title:       "Introduction to Github Products",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Completed the GitHub Foundations learning path covering an introduction to GitHub products.",
    images: [
    
      "/images/introduction to github products.jpeg",
      "/images/introduction to github.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/CRHCXFE9?sharingId=4564DD6EAE22D7BC",
  },
  {
    title:       "introduction to github",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Completed the GitHub Foundations learning path covering  an introduction to GitHub fundamentals.",
    images: [
      "/images/introduction to github.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/en-us/users/sanchilaamavi-5264/transcript/76w62cknp2zj5j9",
  },
  
];
// ── LEADERSHIP ───────────────────────────────────────────────
export const leadership = [
  {
    role:   "Secretary",
    org:    "Shooting Sports Association KDU",
    period: "Aug 2025 – Present",
  },
  {
    role:   "Finance Team Member",
    org:    "GENESIZ'26",
    period: "May 2026 – Present",
  },
  {
    role:   "Finance Committee Member",
    org:    "ERIC KDU",
    period: "Feb 2026 – Present",
  },
  {
    role:   "Program Team Member",
    org:    "IEEE ComSoc KDU",
    period: "Jun 2024 – Jun 2026",
  },
  {
    role:   "Design Committee Member",
    org:    "Mathematical Society KDU",
    period: "Feb 2025 – Feb 2026",
  },
];