import { ReleaseItem, RosterItem, TourDateItem } from './types';

export const LABEL_DATA = {
  name: "Mubashar Hussain",
  fullWordmark: "MUBASHAR HUSSAIN",
  leftHalf: "MUBASHAR",
  rightHalf: "HUSSAIN",
  tagline: "Full Stack Development with AI Integration",
  tag: "Full Stack Development with AI Integration",
  descriptionParagraphs: [
    "I am learning AI Integration along with full-stack web development. My main skills include Frontend Development, React, TypeScript, EJS, Node.js, Express.js, PHP, Laravel, MongoDB, Mongoose, MySQL, SQL Server, Git, and GitHub.",
    "I can build responsive and interactive frontends using React and TypeScript, create dynamic pages with EJS, and develop backend applications and RESTful APIs using Node.js, Express.js, PHP, and Laravel. For databases, I work with MongoDB, Mongoose, MySQL, and SQL Server.",
    "I am also learning to integrate AI-powered features and APIs into web applications to create smarter and more automated user experiences. I use Git and GitHub for version control and have built projects such as an Airbnb clone and a social media platform.",
    "Overall, my core stack is React, TypeScript, Node.js, Express.js, PHP, Laravel, MongoDB, MySQL, Git, and GitHub, with a growing focus on AI Integration."
  ],
  coreSkills: [
    { name: "MERN Stack Developer", percent: "95%" },
    { name: "AI Integration", percent: "90%" },
    { name: "Vercel Deployment", percent: "89%" }
  ],
  imprintCode: "ENGINEER // MUBASHAR-HUSSAIN-2026",
  location: "LAHORE, PAKISTAN",
  pressSpec: "REACT • TYPESCRIPT • NODE • AI INTEGRATION"
};

export const RELEASES: ReleaseItem[] = [
  {
    code: "MH-01",
    title: "Airbnb Clone Platform",
    artist: "Mubashar Hussain",
    year: "2026",
    speed: "Full Stack MERN",
    weight: "RESTful API Architecture",
    edition: "Production Ready",
    format: "Web Application",
    genre: "Node.js • Express • MongoDB • React",
    palette: {
      accent: "#E8913C",
      secondary: "#2E6B72",
      bg: "#111417"
    },
    tracklist: [
      "User Authentication & Authorization",
      "Interactive Listings & Map Integration",
      "Booking Management & Reviews"
    ]
  },
  {
    code: "MH-02",
    title: "Social Media Platform",
    artist: "Mubashar Hussain",
    year: "2025",
    speed: "MERN + Realtime",
    weight: "Scalable Database Schema",
    edition: "Interactive Hub",
    format: "Full Stack Web App",
    genre: "React • Node.js • Express • MongoDB",
    palette: {
      accent: "#2E6B72",
      secondary: "#E8913C",
      bg: "#0E1315"
    },
    tracklist: [
      "Real-time Post Feeds & Likes",
      "Media Uploads & Comment Threads",
      "User Profiles & Friend Relationships"
    ]
  },
  {
    code: "MH-03",
    title: "AI Integration Studio",
    artist: "Mubashar Hussain",
    year: "2025",
    speed: "AI APIs & Tool Calling",
    weight: "Gemini & LLM Pipelines",
    edition: "Smart Automation Suite",
    format: "Next-Gen AI App",
    genre: "TypeScript • React • AI APIs • Node",
    palette: {
      accent: "#E8913C",
      secondary: "#9EA5A8",
      bg: "#141312"
    },
    tracklist: [
      "AI Prompt Engineering & Function Calling",
      "Contextual Document Analysis",
      "Streaming Response Architecture"
    ]
  },
  {
    code: "MH-04",
    title: "Dynamic EJS & PHP / Laravel Hub",
    artist: "Mubashar Hussain",
    year: "2024",
    speed: "Server-Side Rendering",
    weight: "MySQL & Relational SQL",
    edition: "Multi-Role System",
    format: "Dynamic Web Portal",
    genre: "PHP • Laravel • EJS • MySQL",
    palette: {
      accent: "#E8913C",
      secondary: "#2E6B72",
      bg: "#15120F"
    },
    tracklist: [
      "Relational Database Migrations",
      "Blade / EJS Template Orchestration",
      "Role-Based Access Control (RBAC)"
    ]
  },
  {
    code: "MH-05",
    title: "Interactive DAW & Stem Mixer",
    artist: "Mubashar Hussain",
    year: "2024",
    speed: "Web Audio API",
    weight: "Interactive Canvas & Audio Stems",
    edition: "Creative Audio Tool",
    format: "Web Audio Interface",
    genre: "JavaScript • Web Audio • Modern CSS",
    palette: {
      accent: "#2E6B72",
      secondary: "#9EA5A8",
      bg: "#101416"
    },
    tracklist: [
      "Multi-track Stem Playback Engine",
      "Dynamic Gain & Filter Sliders",
      "Waveform Visualization"
    ]
  }
];

export const ROSTER: RosterItem[] = [
  {
    id: "r-1",
    name: "React & TypeScript",
    discipline: "FRONTEND & COMPONENT ARCHITECTURE",
    location: "CLIENT",
    editionsCount: "CORE SKILL",
    activeYears: "2023 — PRESENT"
  },
  {
    id: "r-2",
    name: "Node.js & Express.js",
    discipline: "BACKEND APIS & CUSTOM MIDDLEWARE",
    location: "SERVER",
    editionsCount: "CORE SKILL",
    activeYears: "2023 — PRESENT"
  },
  {
    id: "r-3",
    name: "AI Integration & LLM APIs",
    discipline: "GEMINI API & SMART AUTOMATION",
    location: "AI SUITE",
    editionsCount: "SPECIALIZATION",
    activeYears: "2024 — PRESENT"
  },
  {
    id: "r-4",
    name: "MongoDB & Mongoose",
    discipline: "NOSQL SCHEMAS & DOCUMENT STORAGE",
    location: "DATABASE",
    editionsCount: "CORE SKILL",
    activeYears: "2023 — PRESENT"
  },
  {
    id: "r-5",
    name: "PHP, Laravel & MySQL",
    discipline: "RELATIONAL DATABASES & MVC PATTERNS",
    location: "FULL STACK",
    editionsCount: "CORE SKILL",
    activeYears: "2023 — PRESENT"
  }
];

export const TOUR_DATES: TourDateItem[] = [
  {
    id: "d-1",
    date: "AVAILABLE NOW",
    city: "FULL STACK DEVELOPMENT",
    venue: "Remote & Hybrid Engagements",
    artists: "Mubashar Hussain",
    format: "MERN Stack + Next.js Applications",
    status: "OPEN FOR HIRE",
    statusType: "amber"
  },
  {
    id: "d-2",
    date: "ACTIVE FOCUS",
    city: "AI INTEGRATION SERVICES",
    venue: "API Integration & Smart Workflows",
    artists: "Mubashar Hussain",
    format: "Generative AI & Tool Calling",
    status: "READY FOR DEPLOYMENT",
    statusType: "teal"
  },
  {
    id: "d-3",
    date: "ONGOING",
    city: "BACKEND & RESTFUL APIS",
    venue: "Node.js, Express, PHP & Laravel",
    artists: "Mubashar Hussain",
    format: "Scalable Database & Authentication",
    status: "AVAILABLE",
    statusType: "muted"
  },
  {
    id: "d-4",
    date: "CONTINUOUS",
    city: "FRONTEND UI/UX DESIGN",
    venue: "Tailwind CSS & Responsive Layouts",
    artists: "Mubashar Hussain",
    format: "Production Grade SPAs",
    status: "OPEN FOR HIRE",
    statusType: "amber"
  }
];
