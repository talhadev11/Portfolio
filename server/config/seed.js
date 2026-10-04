import { Profile } from '../models/Profile.js';
import { SkillCategory } from '../models/Skill.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';

export const initialProfileData = {
  name: "Talha",
  title: "Senior Full Stack & Mobile Application Developer",
  experienceYears: "6+",
  roles: [
    "Full Stack Web Developer",
    "Mobile Application Architect",
    "Flutter & React Specialist",
    "Cloud & Backend Engineer"
  ],
  tagline: "Architecting resilient web ecosystems and high-octane mobile apps with clean code, scalable architecture, and pixel-perfect UX.",
  bio: [
    "I am a Full Stack Web & Mobile Developer passionate about building modern, scalable, and user-focused digital products. I specialize in developing high-performance web applications using React, Next.js, Node.js, and Python, along with cross-platform mobile applications using Flutter and Android.",
    "I combine strong development practices with a focus on clean architecture, responsive design, API integration, and scalable solutions. From turning ideas into functional products to improving existing applications, I aim to create seamless experiences across web and mobile platforms."
  ],
  stats: [
    { label: "Years of Experience", value: "6+" },
    { label: "Projects Delivered", value: "45+" },
    { label: "Mobile Apps Published", value: "14" },
    { label: "Client Satisfaction", value: "99%" }
  ],
  highlights: [
    "Expert in full-cycle web & mobile product development",
    "Deep background in state management (Riverpod, Bloc, Redux)",
    "API design: High-throughput REST, GraphQL & Microservices",
    "Production DevOps: Docker, Kubernetes, AWS, Firebase & Vercel"
  ],
  contact: {
    email: "talhavirk616@gmail.com",
    phone: "+1 (555) 382-9104",
    location: "Pakistan (GMT+5)",
    availability: "Available for new projects & senior contracts",
    resumeUrl: "#resume"
  },
  socials: [
    { name: "GitHub", url: "https://github.com/talhadev11/", icon: "Github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-talha-031885323/", icon: "Linkedin" },
    { name: "Email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=talhavirk616@gmail.com", icon: "Mail" }
  ]
};

export const initialSkillsData = [
  {
    category: "Frontend Development",
    description: "Modern, performant, and responsive web user interfaces with cutting-edge styling frameworks.",
    icon: "Layout",
    accent: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.25)",
    order: 0,
    skills: [
      { name: "HTML5", level: "Expert", icon: "FileCode2" },
      { name: "CSS3", level: "Expert", icon: "Palette" },
      { name: "JavaScript (ES6+)", level: "Expert", icon: "Code2" },
      { name: "TypeScript", level: "Advanced", icon: "FileCode" },
      { name: "React.js", level: "Expert", icon: "Atom" },
      { name: "Vue.js", level: "Proficient", icon: "Layers" },
      { name: "Next.js", level: "Advanced", icon: "Globe" },
      { name: "Tailwind CSS", level: "Expert", icon: "Sparkles" },
      { name: "Bootstrap", level: "Advanced", icon: "Boxes" },
      { name: "Material-UI (MUI)", level: "Advanced", icon: "Component" }
    ]
  },
  {
    category: "Backend Development",
    description: "Robust, concurrent microservices, distributed architectures, and secure API gateways.",
    icon: "Server",
    accent: "from-purple-500 to-indigo-500",
    glow: "rgba(168, 85, 247, 0.25)",
    order: 1,
    skills: [
      { name: "Python", level: "Expert", icon: "Terminal" },
      { name: "JavaScript (Node.js)", level: "Expert", icon: "Cpu" },
      { name: "FastAPI", level: "Advanced", icon: "Zap" },
      { name: "Express.js", level: "Expert", icon: "Server" },
      { name: "NestJS", level: "Advanced", icon: "ShieldCheck" },
      { name: "RESTful APIs", level: "Expert", icon: "Network" },
      { name: "GraphQL", level: "Advanced", icon: "Share2" },
      { name: "Microservices", level: "Advanced", icon: "Workflow" }
    ]
  },
  {
    category: "Mobile Application Development",
    description: "Cross-platform and native-grade mobile applications with clean architecture and reactive state management.",
    icon: "Smartphone",
    accent: "from-cyan-500 to-emerald-500",
    glow: "rgba(6, 182, 212, 0.25)",
    order: 2,
    skills: [
      { name: "Flutter (Dart)", level: "Expert", icon: "Smartphone" },
      { name: "Android Development (Kotlin/Java Basics)", level: "Advanced", icon: "Bot" },
      { name: "Provider", level: "Expert", icon: "GitBranch" },
      { name: "Riverpod", level: "Expert", icon: "Repeat" },
      { name: "Bloc", level: "Advanced", icon: "Blocks" }
    ]
  },
  {
    category: "Databases & Tools",
    description: "Relational, document, and real-time databases combined with developer toolchains.",
    icon: "Database",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.25)",
    order: 3,
    skills: [
      { name: "MongoDB", level: "Advanced", icon: "Database" },
      { name: "PostgreSQL", level: "Expert", icon: "Database" },
      { name: "MySQL", level: "Advanced", icon: "Database" },
      { name: "Firebase Firestore", level: "Expert", icon: "Flame" },
      { name: "Git", level: "Expert", icon: "GitCommit" },
      { name: "GitHub", level: "Expert", icon: "Github" },
      { name: "VS Code", level: "Expert", icon: "Code" },
      { name: "Android Studio", level: "Advanced", icon: "Smartphone" },
      { name: "Postman", level: "Expert", icon: "Send" }
    ]
  },
  {
    category: "Deployment & Hosting",
    description: "Automated CI/CD pipelines, containerized deployments, and serverless hosting infrastructures.",
    icon: "Cloud",
    accent: "from-violet-500 to-pink-500",
    glow: "rgba(139, 92, 246, 0.25)",
    order: 4,
    skills: [
      { name: "Vercel", level: "Expert", icon: "Triangle" },
      { name: "Netlify", level: "Expert", icon: "CloudRain" },
      { name: "Firebase", level: "Expert", icon: "Flame" },
      { name: "Heroku", level: "Advanced", icon: "Cloud" }
    ]
  }
];

export const initialProjectsData = [
  {
    id: "pulse-ops",
    title: "PulseOps — Cloud APM & Telemetry Platform",
    category: "web",
    shortDescription: "Real-time telemetry and microservice observability dashboard with live WebSocket metric streaming.",
    fullDescription: "PulseOps provides cloud architects and DevOps teams with real-time insight into distributed microservice clusters. Built with React and TypeScript, it handles thousands of metrics per second with canvas-accelerated visualizations, intelligent alerting rules, and multi-tenant role-based access control.",
    tags: ["React.js", "TypeScript", "Next.js", "FastAPI", "Tailwind CSS", "PostgreSQL"],
    featured: true,
    stats: { users: "12,000+ MAU", latency: "< 85ms", rating: "4.9/5" },
    liveUrl: "https://example.com/demo/pulseops",
    githubUrl: "https://github.com/example/pulse-ops",
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
    badge: "Web App",
    order: 0
  },
  {
    id: "apex-fit",
    title: "ApexFit — AI Biometrics & Fitness Tracker",
    category: "mobile",
    shortDescription: "Offline-first cross-platform fitness companion with Bluetooth LE wearable sync and heart-rate telemetry.",
    fullDescription: "A comprehensive health and performance tracking app built in Flutter with Bloc state architecture. Features background GPS path tracing, real-time BLE sensor ingestion, dynamic heart-rate zone calculation, and zero-latency local caching with SQLite and Firebase Firestore synchronization.",
    tags: ["Flutter (Dart)", "Bloc", "Firebase", "HealthKit", "Android Kotlin"],
    featured: true,
    stats: { downloads: "150K+", rating: "4.8/5", stores: "iOS & Android" },
    liveUrl: "https://example.com/demo/apexfit",
    githubUrl: "https://github.com/example/apex-fit-mobile",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    badge: "Mobile App",
    order: 1
  },
  {
    id: "novapay-gateway",
    title: "NovaPay — B2B Merchant Settlement Portal",
    category: "web",
    shortDescription: "High-throughput financial portal for multi-currency payouts, invoice generation, and automated compliance.",
    fullDescription: "NovaPay powers instant payment settlements across 40+ global currencies. Features a high-security React interface protected by biometric 2FA, detailed ledger audits, and high-concurrency Node.js microservices processing millions in daily transaction volume.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "RESTful APIs"],
    featured: false,
    stats: { volume: "$45M+ Processed", uptime: "99.99%", audit: "SOC-2" },
    liveUrl: "https://example.com/demo/novapay",
    githubUrl: "https://github.com/example/novapay-portal",
    gradient: "from-purple-600 via-violet-600 to-pink-600",
    badge: "Web App",
    order: 2
  },
  {
    id: "zenith-crypto",
    title: "Zenith Wallet — Multi-Chain Non-Custodial App",
    category: "mobile",
    shortDescription: "Next-gen crypto wallet with hardware-enclave key encryption, biometrics, and cross-chain token swaps.",
    fullDescription: "Engineered using Flutter and Riverpod for uncompromising security and fluid 120Hz animations. Incorporates encrypted secure-enclave key storage, decentralized RPC failover routing, and real-time gas tracking across Ethereum, Solana, and Polygon.",
    tags: ["Flutter (Dart)", "Riverpod", "Android Studio", "SQLite", "Biometrics"],
    featured: true,
    stats: { activeWallets: "85K+", security: "Audited", chains: "12 Supported" },
    liveUrl: "https://example.com/demo/zenith-wallet",
    githubUrl: "https://github.com/example/zenith-wallet-flutter",
    gradient: "from-cyan-600 via-blue-600 to-indigo-800",
    badge: "Mobile App",
    order: 3
  },
  {
    id: "omni-learn",
    title: "OmniLearn — Adaptive Learning Management Suite",
    category: "web",
    shortDescription: "Interactive coding and STEM courseware with real-time browser sandbox and interactive code grading.",
    fullDescription: "A full-scale educational platform built with Next.js and Python FastAPI. Supports collaborative in-browser code editing, real-time quiz assessment with WebSockets, and personalized review paths guided by machine learning models.",
    tags: ["Next.js", "Python", "FastAPI", "MongoDB", "GraphQL", "Tailwind CSS"],
    featured: false,
    stats: { learners: "60K+", courses: "450+", completionRate: "88%" },
    liveUrl: "https://example.com/demo/omnilearn",
    githubUrl: "https://github.com/example/omnilearn-lms",
    gradient: "from-amber-500 via-orange-600 to-red-600",
    badge: "Web App",
    order: 4
  },
  {
    id: "nomad-go",
    title: "NomadGo — Offline Itinerary & Travel Hub",
    category: "mobile",
    shortDescription: "Collaborative travel companion with offline vector map rendering, expense splitting, and flight radar.",
    fullDescription: "Built with Flutter (Provider pattern) for global travelers facing spotty internet connections. It caches high-resolution vector maps, synchronizes shared trip expenses peer-to-peer, and alerts travelers to flight gate changes via Android foreground services.",
    tags: ["Flutter (Dart)", "Provider", "Mapbox SDK", "Firebase Firestore", "Android"],
    featured: false,
    stats: { tripsCreated: "200K+", offlineCoverage: "100%", rating: "4.7/5" },
    liveUrl: "https://example.com/demo/nomadgo",
    githubUrl: "https://github.com/example/nomadgo-mobile",
    gradient: "from-teal-500 via-emerald-600 to-green-700",
    badge: "Mobile App",
    order: 5
  },
  {
    id: "artisan-market",
    title: "Artisan — Headless B2B Wholesale Marketplace",
    category: "web",
    shortDescription: "Ultra-fast headless commerce platform with instant search indexing and customized bulk pricing tiers.",
    fullDescription: "A headless wholesale marketplace built with Vue.js/Next.js and NestJS microservices. Features sub-100ms faceted search across 500,000 SKUs, automated tax calculations, and dynamic tier discounts for enterprise buyers.",
    tags: ["Vue.js", "NestJS", "TypeScript", "Microservices", "PostgreSQL", "Vercel"],
    featured: false,
    stats: { skus: "500K+", searchLatency: "45ms", orders: "$18M/yr" },
    liveUrl: "https://example.com/demo/artisan",
    githubUrl: "https://github.com/example/artisan-marketplace",
    gradient: "from-indigo-600 via-purple-700 to-pink-600",
    badge: "Web App",
    order: 6
  },
  {
    id: "medisync-mobile",
    title: "MediSync — Telehealth & Rx Delivery Suite",
    category: "mobile",
    shortDescription: "Encrypted peer-to-peer video consultations, e-prescriptions, and on-demand pharmacy courier tracking.",
    fullDescription: "HIPAA-compliant native Android & Flutter mobile app featuring end-to-end encrypted WebRTC video visits with doctors, digital pharmacy fulfillment, and push-based delivery tracking with live courier mapping.",
    tags: ["Flutter (Dart)", "Android (Kotlin)", "WebRTC", "Firebase", "Bloc"],
    featured: false,
    stats: { consultations: "40K+", compliance: "HIPAA Certified", rating: "4.9/5" },
    liveUrl: "https://example.com/demo/medisync",
    githubUrl: "https://github.com/example/medisync-telehealth",
    gradient: "from-rose-500 via-pink-600 to-purple-700",
    badge: "Mobile App",
    order: 7
  }
];

export const initialExperienceData = [
  {
    id: "sanphix",
    role: "Full Stack Developer",
    company: "Sanphix",
    location: "Remote",
    period: "2025 — Present",
    type: "Full-time",
    description: "Spearheaded the development of core multi-tenant web applications and scalable enterprise web platforms.",
    achievements: [
      "Architected high-throughput React, Next.js, and FastAPI web platforms focused on high availability, performance, and uptime reliability.",
      "Optimized full-stack web architecture and reusable component libraries to streamline development and significantly reduce feature release cycles.",
      "Mentored team members in full-stack best practices, introducing automated CI/CD pipelines with Docker and GitHub Actions for smooth deployments."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Node.js", "Python"],
    order: 0
  },
  {
    id: "hyperion",
    role: "Senior Mobile Application Engineer",
    company: "Hyperion Interactive",
    location: "Remote",
    period: "2024 (January) — 2025 (May)",
    type: "Full-time",
    description: "Owned the architecture, state management, and real-time offline sync for top-rated consumer fintech and wellness apps.",
    achievements: [
      "Built 2 major flagship apps in Flutter (Dart) using Riverpod and clean architecture, earning 4.8+ stars across 100K+ store reviews.",
      "Optimized native Android Kotlin bridge layers, reducing app memory consumption by 32% and achieving smooth 60fps scrolling on low-end devices.",
      "Implemented Firebase Firestore real-time caching layer with background background workers for zero-drop offline experiences."
    ],
    skills: ["Flutter (Dart)", "Riverpod", "Android (Kotlin)", "Firebase Firestore", "RESTful APIs"],
    order: 1
  },
  {
    id: "spark",
    role: "Frontend & Android Developer",
    company: "TechStep",
    location: "Hybrid (INTERNSHIP)",
    period: "2023 — 2024",
    type: "Internship",
    description: "Built modular web components and assisted in building native Android applications.",
    achievements: [
      "Created reusable HTML5, CSS3, and JavaScript component libraries used across 8 client web properties.",
      "Assisted in maintaining and debugging Java/Kotlin native Android modules and integrating third-party analytics SDKs.",
      "Conducted unit and integration testing with Jest and Espresso, lifting test coverage from 45% to 80%."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Android (Java/Kotlin)", "Git", "Postman"],
    order: 2
  }
];

export const initialEducationData = {
  degrees: [
    {
      id: "bs-cs",
      institution: "COMSATS University Islamabad",
      degree: "Bachelor of Science in Computer Science",
      duration: "2024 — 2028",
      description: "Building strong fundamentals across systems, theory and applied software engineering. Active in self-directed work outside of coursework — automation, freelance and full-stack side projects.",
      coursework: [
        "Programming Fundamentals",
        "Object-Oriented Programming",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Discrete Mathematics",
        "Computer Architecture",
        "Operating Systems Basics",
        "Software Engineering",
        "Web Development",
        "Mobile Application Development"
      ],
      icon: "GraduationCap"
    }
  ],
  certifications: [
    {
      id: "cert-g-android",
      title: "Google Associate Android Developer",
      issuer: "Google Developers",
      year: "2021",
      credentialId: "G-AAD-894210",
      description: "Demonstrated production competency in native Android architecture, Kotlin coroutines, background processing, and UI performance.",
      badge: "Verified"
    },
    {
      id: "cert-aws-sa",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      year: "2022",
      credentialId: "AWS-SAA-310892",
      description: "Validated expertise in architecting resilient, high-performance, cost-optimized cloud solutions on Amazon Web Services.",
      badge: "Active"
    }
  ]
};

export const seedDatabase = async (force = false) => {
  try {
    // 1. Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0 || force) {
      if (force) await Profile.deleteMany({});
      await Profile.create(initialProfileData);
      console.log('🌱 Seeded Profile collection in MongoDB');
    }

    // 2. Skills
    const skillCount = await SkillCategory.countDocuments();
    if (skillCount === 0 || force) {
      if (force) await SkillCategory.deleteMany({});
      await SkillCategory.insertMany(initialSkillsData);
      console.log('🌱 Seeded SkillCategory collection in MongoDB');
    }

    // 3. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0 || force) {
      if (force) await Project.deleteMany({});
      await Project.insertMany(initialProjectsData);
      console.log('🌱 Seeded Project collection in MongoDB');
    }

    // 4. Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0 || force) {
      if (force) await Experience.deleteMany({});
      await Experience.insertMany(initialExperienceData);
      console.log('🌱 Seeded Experience collection in MongoDB');
    }

    // 5. Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0 || force) {
      if (force) await Education.deleteMany({});
      await Education.create(initialEducationData);
      console.log('🌱 Seeded Education collection in MongoDB');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};
