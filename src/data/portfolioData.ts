export interface Pillar {
  id: string;
  tag: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
}

export interface Solution {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  techSnippet?: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  phase: string;
  description: string;
  deliverable: string;
}

export const DEVELOPER_INFO = {
  name: "Shopon Hossen",
  role: "Full Stack Developer & Backend Architect",
  email: "shoponhossen2008@gmail.com",
  github: "https://github.com/shoponhossen",
  status: "Available for freelance & contract roles",
  location: "Khulna, Bangladesh · Remote Worldwide",
  experienceYears: "5+",
  coreStack: ["Python", "Django", "Django REST Framework", "React.js", "Python Flet", "PostgreSQL", "Tailwind CSS", "Redis"],
};

export const PILLARS: Pillar[] = [
  {
    id: "frontend",
    tag: "REACT & FLET",
    badge: "PILLAR 01",
    title: "Frontend & UI Engineering",
    description: "Clean reactive interfaces built with React.js, Tailwind CSS, modern state management, and Python Flet cross-platform applications. Prioritizing pixel fidelity, fluid micro-interactions, responsive design systems.",
    features: [
      "React.js & SPAs",
      "Tailwind CSS & UI",
      "Python Flet Desktop/Mobile",
      "Responsive UX Craft"
    ]
  },
  {
    id: "backend",
    tag: "DJANGO & DRF",
    badge: "PILLAR 02",
    title: "Backend & API Architecture",
    description: "Rock-solid Django and Django REST Framework architecture, relational database modeling with PostgreSQL, high-throughput REST APIs, JWT authentication, and secure business logic engineered for stability and deterministic state handling.",
    features: [
      "Python & Django Core",
      "REST API Engineering",
      "PostgreSQL & ORM Tuning",
      "JWT & Auth Guardrails"
    ]
  }
];

export const SOLUTIONS: Solution[] = [
  {
    id: "react-drf",
    index: "01",
    title: "React.js + Django/DRF",
    description: "Modern, reactive single-page frontends connected to robust Django REST backends for high-performance SaaS and web apps.",
    tags: ["React", "Django REST Framework", "Tailwind CSS"],
    techSnippet: "DRF API ViewSets + JWT + React Query hooks + Vite bundle optimization"
  },
  {
    id: "django-full",
    index: "02",
    title: "Entire Website In Django",
    description: "Complete server-rendered web applications built end-to-end in Python & Django with batteries-included security and ORM power.",
    tags: ["Django Templates", "Python", "PostgreSQL", "Auth"],
    techSnippet: "Django 5.0 + HTMX partial updates + Crispy Forms + CSRF/XSS protection"
  },
  {
    id: "flet-drf",
    index: "03",
    title: "Python Flet + Django/DRF",
    description: "Cross-platform desktop and mobile application development powered by Python Flet with a scalable DRF cloud backend.",
    tags: ["Flet UI", "Cross-Platform", "REST APIs", "Python"],
    techSnippet: "Flutter-backed native rendering via Python + token auth + async sync"
  },
  {
    id: "only-react",
    index: "04",
    title: "Only React.js Frontend",
    description: "High-performance, pixel-precise responsive single-page web applications, interactive dashboards, and client-facing UIs crafted with modern React and Tailwind CSS.",
    tags: ["React.js", "Tailwind CSS", "TypeScript", "State Management"],
    techSnippet: "Component architectures + Zustand/Redux + Tailwind CSS + Axios/TanStack Query + Vite build pipeline"
  },
  {
    id: "only-flet",
    index: "05",
    title: "Only a Flet App",
    description: "Standalone native-feeling interactive desktop and mobile apps built purely in Python with Flet's flutter-backed UI framework.",
    tags: ["Python Flet", "Desktop & Mobile", "Reactive UI"],
    techSnippet: "Zero Dart required, reactive state trees, SQLite local persistence"
  },
  {
    id: "only-drf",
    index: "06",
    title: "Only Backend using Django/DRF",
    description: "Clean, documented, and secure RESTful API architectures, database schemas, and microservice backends for existing frontend teams.",
    tags: ["DRF", "PostgreSQL", "API Docs", "Query Optimization"],
    techSnippet: "Swagger/OpenAPI 3.0 + Celery task queues + Redis caching + pg_stat_statements"
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: "1",
    title: "01 / Hire Me",
    phase: "COLLABORATION",
    description: "Initiate collaboration, discuss your project requirements, scope out features, timeline, and tech architecture.",
    deliverable: "Scoping Document & Timeline Commitment"
  },
  {
    number: "2",
    title: "02 / Planning",
    phase: "BLUEPRINT",
    description: "Wireframing the user experience, designing database schemas, defining REST API contracts, and planning milestones.",
    deliverable: "ERD Diagrams & OpenAPI Contract Specs"
  },
  {
    number: "3",
    title: "03 / Development",
    phase: "EXECUTION",
    description: "Writing clean, modular frontend components and backend logic, connecting endpoints, and verifying full-stack flow.",
    deliverable: "Tested Codebase & Staging Deployments"
  },
  {
    number: "4",
    title: "04 / Deliver",
    phase: "LAUNCH",
    description: "Thorough testing, deployment readiness, clear documentation, and smooth handoff for immediate launch.",
    deliverable: "CI/CD Pipeline, Live System & API Docs"
  }
];

export const FEATURED_PROJECT = {
  id: "fire-clash-bd",
  title: "Fire Clash BD",
  kicker: "PROFITABLE ESPORTS STARTUP // ACTIVE CASHFLOW & APK ENGINE",
  badge: "[LIVE STARTUP · MONETIZED]",
  liveUrl: "https://fireclashbd.github.io",
  apkDownloadUrl: "https://fireclashbd.github.io",
  revenueModel: "Tournament Entry Fees · Micro-transactions · Automated Payout Commission",
  description: "A real, profitable esports tournament startup in Bangladesh actively generating revenue. While the website serves as the landing gateway to distribute the Android APK, the mobile application is the core business engine—powering real-money tournament registrations, live match lobbies, automated bKash/Nagad wallet payouts, and instant room credential delivery.",
  techTags: [
    "Android App (Primary Engine)",
    "Profitable Startup",
    "bKash & Nagad MFS Payouts",
    "Python / Django REST API",
    "React Web Gateway"
  ],
  metrics: [
    { label: "Business Status", value: "PROFITABLE", desc: "Active daily player revenue" },
    { label: "Payout Engine", value: "AUTOMATED", desc: "Instant bKash/Nagad payouts" },
    { label: "Match Engine", value: "< 24ms", desc: "Real-time room distribution" },
    { label: "Slot Locking", value: "100% ACID", desc: "Deterministic zero-overbooking" }
  ],
  architectureHighlights: [
    "Core mobile app tournament engine with real-money entrance and cash payouts",
    "Automated bKash & Nagad transaction verification webhook reconciliation",
    "High-concurrency atomic row-locking on tournament slot registers",
    "Decoupled web distribution portal (fireclashbd.github.io) for continuous APK updates",
    "Real-time countdown triggers delivering custom room credentials securely"
  ]
};
