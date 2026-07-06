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
    { label: "Projects", value: "10+" },
    { label: "Awards",   value: "10+" },
    { label: "Certs",    value: "10+" },
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
    github:   "https://github.com/SanchilaAmavi/mine-safety-system",
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
    github:   "https://github.com/SanchilaAmavi/driver-fatigue-detection",
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
    github:   "https://github.com/SanchilaAmavi/LankaMesh",
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
    github:   "https://github.com/SanchilaAmavi/AI-Proctoring-System",
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
    github:   "https://github.com/SanchilaAmavi/mars-robot-challenge",
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
    github:   "https://github.com/SanchilaAmavi/ROSCO25-Team_Botrix-Robot",
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
// Replace the existing `achievements` array in your lib/data.ts with this.
export const achievements = [
  {
    title: "Winner — 1st Place (Inter University · Female · Individual)",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Winner",
    description:
      "Secured gold in the individual air rifle event at the Multi-Sport Shooting Championship 2025, competing against female athletes from universities island-wide. Demonstrated consistent accuracy and composure under competition pressure.",
    image: "/images/MSSC 1 st place individual 2025.jpg",
  },
  {
    title: "Champions — 1st Place (Inter University · Female · Team)",
    event: "Target Sprint Shooting Competition",
    year:  "2025",
    type:  "Winner",
    description:
      "Led the KDU female team to a championship title at the Target Sprint Shooting Competition 2025 — a discipline combining precision air rifle shooting with sprint running. The team demonstrated both athletic and marksmanship excellence.",
    image: "/images/target sprint 1st place team 2025.jpg",
  },
  {
    title: "Inter-Faculty Netball Champions — 1st Place",
    event: "Inter Faculty Netball Tournament",
    year:  "2025",
    type:  "Winner",
    description:
      "Contributed to the faculty netball team's championship victory at the KDU Inter-Faculty Netball Tournament 2025. The team combined tactical play and physical endurance to clinch the top position in a competitive inter-faculty field.",
    image: "/images/netball.jpg",
  },
  {
    title: "2nd Place (Inter University · Female · Group)",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Award",
    description:
      "Claimed silver as part of the KDU female group team at the Multi-Sport Shooting Championship 2025. The team delivered a strong collective performance across multiple shooting rounds against university competitors nationwide.",
    image: "/images/mssc 2nd place group 2025.jpg",
  },
  {
    title: "3rd Place (Inter University · Female · Individual)",
    event: "Target Sprint Shooting Championship",
    year:  "2025",
    type:  "Award",
    description:
      "Earned bronze in the individual Target Sprint event at the 2025 championship — a demanding combined discipline requiring accurate shooting immediately after a physical sprint, testing both stamina and fine motor control.",
    image: "/images/target sprint 3rd place individual 2025.jpg",
  },
  {
    title: "KDU Colour Award — Air Rifle",
    event: "KDU Sports Awards",
    year:  "2025",
    type:  "Award",
    description:
      "Received the prestigious KDU Colours Award for outstanding representation of the university in air rifle shooting at national inter-university level — the highest sporting recognition awarded by General Sir John Kotelawala Defence University.",
    image: "/images/kdu colour 2025 certificate.jpg",
  },
  {
    title: "KDU Merit Award — Air Rifle",
    event: "KDU Sports Awards",
    year:  "2024",
    type:  "Award",
    description:
      "Awarded the KDU Merit Award for significant contribution and performance in university-level air rifle shooting during the 2024 academic year, recognising consistent competitive achievement.",
    image: "/images/kdu merit 2024.jpg",
  },
  {
    title: "Precision Shooter — Air Rifle",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Award",
    description:
      "Honoured with the Precision Shooter title at MSSC 2025 for achieving an exceptionally tight grouping score, demonstrating elite-level accuracy and trigger discipline in the air rifle discipline.",
    image: "/images/precision shooter 2025.jpg",
  },
  {
    title: "Excellent Shooter — 100 Marks (Air Rifle)",
    event: "MSSC Shooting Championship",
    year:  "2025",
    type:  "Award",
    description:
      "Attained a perfect score of 100 marks in the air rifle event at MSSC 2025, earning the Excellent Shooter distinction. A perfect score reflects complete mastery of form, breath control, and sight alignment under competition conditions.",
    image: "/images/excellent shooter 100 marks 2025.jpg",
  },
  {
    title: "Sharp Shooter — Air Rifle",
    event: "Inter University Shooting Championship",
    year:  "2026",
    type:  "Award",
    description:
      "Awarded the Sharp Shooter title at the 2026 Inter University Shooting Championship for sustained high-accuracy performance across all shooting rounds in the air rifle category.",
    image: null,
  },
  {
    title: "Sharp Shooter — Air Rifle",
    event: "Inter University Shooting Championship",
    year:  "2024",
    type:  "Award",
    description:
      "Recognised as Sharp Shooter at the 2024 Inter University Shooting Championship, marking the first year of competitive inter-university shooting participation with an impressive scoring record.",
    image: "/images/Inter university meet 2024.jpeg",
  },
  {
    title: "Precision Shooter — Air Rifle",
    event: "MSSC Shooting Championship",
    year:  "2024",
    type:  "Award",
    description:
      "Earned the Precision Shooter distinction at MSSC 2024 for delivering a high-accuracy score in the air rifle event — validating consistent shooting form at the inter-university level in the inaugural competitive year.",
    image: null,
  },
  {
    title: "Sharp Shooter — Air Rifle",
    event: "Inter Shooting Championship",
    year:  "2014",
    type:  "Award",
    description:
      "Awarded the Sharp Shooter title at the 2014 Inter Shooting Championship — the first competitive shooting recognition, marking the beginning of a decade-long journey in precision air rifle sport.",
    image: "/images/2014 sharp shooter.jpg",
  },
  {
    title: "ROSCO '25 — Autonomous Robotics Competition",
    event: "IMechE / ERIC / KDU",
    year:  "2025",
    type:  "Participant",
    description:
      "Participated as Team Linestorm at ROSCO'25, the Robotics Showdown Competition organised by the IMechE Student Chapter and ERIC of KDU. Designed and built a fully autonomous robot capable of line following, wall following, and ramp navigation.",
    image: "/images/Rosco Certificate.jpg",
  },
  {
    title: "TECHXhiBiT 2.0 — Hardware & Software Exhibition",
    event: "TECHXhiBiT 2.0 Exhibition",
    year:  "2026",
    type:  "Participant",
    description:
      "Showcased engineering project work at the TECHXhiBiT 2.0 Hardware & Software Exhibition, presenting embedded systems and IoT solutions to an audience of industry professionals, academics, and fellow engineers.",
    image: "/images/texhibit certificate.jpg",
  },
];
// ── CERTIFICATIONS ───────────────────────────────────────────
// Paste this into your lib/data.ts BEFORE the leadership export
// Make sure your achievements array above ends with ];

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
    image:       null,
  },
  {
    title:       "Introduction to GitHub Administrative",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Completed the GitHub Foundations learning path covering GitHub administration.",
    images: [
      "/images/introduction to github administrative.jpeg",
      "/images/introduction to github.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/JHLJUSFT?sharingId=4564DD6EAE22D7BC",
  },
  {
    title:       "Introduction to GitHub Products",
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
    title:       "Introduction to GitHub",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Completed the GitHub Foundations learning path covering GitHub fundamentals.",
    images: [
      "/images/introduction to github.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/Y4ZYQN7R?sharingId=4564DD6EAE22D7BC",
  },
  {
    title:       "Train and Evaluate Regression Models",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Learned how to build, train, and evaluate regression models to predict continuous values using supervised learning techniques.",
    images: [
      "/images/regression model.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/Y4ZYKL6R?sharingId=4564DD6EAE22D7BC",
  },
  {
    title:       "Train and Evaluate Clustering Models",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Explored clustering techniques to group unlabeled data and evaluated model performance using unsupervised learning methods.",
    images: [
      "/images/train and evaluating.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/2TE2SAAV?sharingId=4564DD6EAE22D7BC",
    },
    {
    title:       "Train and Evaluate Classification Models",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Learned to train and evaluate classification models using supervised learning techniques to predict categorical outcomes and assess model performance.",
    images: [
      "/images/train and evaluating classification.jpeg",
    },
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/WMYWQLJN?sharingId=4564DD6EAE22D7BC",
  },
  {
    title:       "Explore and Analyze Data with Python",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Used Python libraries such as Pandas and Matplotlib to explore datasets, perform data cleaning, and extract meaningful insights through visual and statistical analysis.",
    images: [
      "/images/explore and analyze data.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/D35D3VVJ?sharingId=4564DD6EAE22D7BC",
  },
   {
    title:       "Introduction to Machine Learning Concepts",
    issuer:      "Microsoft Learn",
    year:        "2026",
    description: "Gained foundational understanding of machine learning concepts including supervised vs unsupervised learning, model training, and evaluation workflows.",
    images: [
      "/images/machine learning.jpeg",
    ],
    verifyUrl: "https://learn.microsoft.com/api/achievements/share/en-us/SanchilaAmavi-5264/BUSBULPD?sharingId=4564DD6EAE22D7BC",
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
