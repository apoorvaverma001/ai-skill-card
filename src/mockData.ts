import type { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Alex Mercer",
    jobTitle: "Senior Full Stack Engineer",
    gender: "non-binary",
    experience: "6+ Years Exp.",
    company: "Vortex Labs",
    companyLogoUrl: "⚡",
    location: "San Francisco, CA",
    email: "alex.mercer@vortexlabs.io",
    phone: "+1 (555) 019-2831",
    avatarPreset: "cyberpunk-neon",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=250&auto=format&fit=crop&q=80",
    bio: "Passionate about crafting ultra-sleek UI design systems, real-time agentic software, and high-performance serverless stacks. Focused on clean micro-interactions and pixel-perfect aesthetics."
  },
  socials: {
    linkedin: "https://linkedin.com/in/alexmercer",
    github: "https://github.com/alexmercer",
    leetcode: "https://leetcode.com/alexmercer",
    twitter: "https://x.com/alexmercer",
    discord: "https://discord.gg/alexmercer",
    gmail: "alex.mercer@vortexlabs.io",
    resumeUrl: "https://example.com/alex-mercer-resume.pdf"
  },
  skills: [
    {
      id: "s1",
      name: "React & Next.js",
      category: "frontend",
      proficiency: 95,
      usageNote: "Building responsive SPAs and SSR platforms with optimized core web vitals (LCP, INP).",
      iconName: "React"
    },
    {
      id: "s2",
      name: "TypeScript",
      category: "frontend",
      proficiency: 95,
      usageNote: "Strict typings, customized utility types, and safe server/client shared schemas.",
      iconName: "Code"
    },
    {
      id: "s3",
      name: "Tailwind CSS",
      category: "frontend",
      proficiency: 90,
      usageNote: "Creating customized design tokens, glassmorphism overlays, and complex responsiveness layouts.",
      iconName: "Layers"
    },
    {
      id: "s4",
      name: "Node.js & Express",
      category: "backend",
      proficiency: 85,
      usageNote: "Scalable backend APIs, custom middleware, token authorization, and microservices.",
      iconName: "Server"
    },
    {
      id: "s5",
      name: "PostgreSQL",
      category: "database",
      proficiency: 80,
      usageNote: "Database modeling, complex JSONB fields, indexing, query optimization and locks.",
      iconName: "Database"
    },
    {
      id: "s6",
      name: "Docker & K8s",
      category: "devops",
      proficiency: 75,
      usageNote: "Multi-stage Dockerfiles, compose environments, and localized containerized testing.",
      iconName: "Box"
    },
    {
      id: "s7",
      name: "GraphQL",
      category: "backend",
      proficiency: 80,
      usageNote: "Designing schema schemas, writing resolver pipelines, and optimizing queries with data-loaders.",
      iconName: "Cpu"
    },
    {
      id: "s8",
      name: "Python & FastAPI",
      category: "backend",
      proficiency: 85,
      usageNote: "Rapid REST services building, machine learning inference integrations, and automation scripts.",
      iconName: "FileCode"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "PlacePicker Dashboard",
      thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
      techTags: ["React", "Vite", "Node.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/alexmercer/place-picker",
      liveDemoUrl: "https://place-picker-demo.vercel.app",
      keyFeatures: [
        "Interactive map canvas utilizing OpenStreetMap geolocation coordinates",
        "Strict JWT-based security middleware with cookie verification",
        "Robust custom caching system that decreased query latencies by 70%",
        "Sleek masonry dashboard layout fitting perfectly in 100vh"
      ]
    },
    {
      id: "p2",
      title: "ApexAnalytics Engine",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80",
      techTags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Prisma"],
      githubUrl: "https://github.com/alexmercer/apex-analytics",
      liveDemoUrl: "https://apex-analytics.vercel.app",
      keyFeatures: [
        "Real-time reactive visual grids built using Recharts dashboard widgets",
        "Dynamic query URL parameter synchronization for interactive range selections",
        "Fully serverless database configuration with automated pooling",
        "Clean server-side page renders using ISR caching strategy"
      ]
    },
    {
      id: "p3",
      title: "Vortex Shell IDE",
      thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=80",
      techTags: ["TypeScript", "Electron", "Xterm.js", "Node.js"],
      githubUrl: "https://github.com/alexmercer/vortex-shell",
      liveDemoUrl: "https://vortex-shell.io",
      keyFeatures: [
        "Hardware-accelerated terminal render engine utilizing canvas layer",
        "Seamless local filesystem hook integration through custom bindings",
        "Built-in theme engine with custom JSON palette loaders",
        "Low memory foot-print architecture (< 80MB basic process)"
      ]
    }
  ],
  experiences: [
    {
      id: "e1",
      company: "Vortex Labs",
      designation: "Senior Frontend Lead",
      dateRange: "2024 - Present",
      achievements: [
        "Architected core dashboard client-side UI, lowering LCP by 45% and INP by 30ms.",
        "Led a team of 6 engineers developing modular design tokens and micro-frontends.",
        "Built dynamic data visualizations used by over 25,000 daily active software teams."
      ]
    },
    {
      id: "e2",
      company: "Aether Technologies",
      designation: "Full Stack Developer",
      dateRange: "2021 - 2024",
      achievements: [
        "Developed node-based serverless workflow orchestrator for cloud service automations.",
        "Improved backend database response times by 35% through indexing and caching layers.",
        "Successfully migrated legacy Angular monorepo to modular Vite and React systems."
      ]
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      issueDate: "2025-04",
      verificationUrl: "https://aws.amazon.com/verification",
      imagePreset: "aws"
    },
    {
      id: "c2",
      name: "Meta Front-End Developer Professional",
      issuer: "Meta",
      issueDate: "2024-09",
      verificationUrl: "https://coursera.org/verification",
      imagePreset: "meta"
    },
    {
      id: "c3",
      name: "Google Cloud Digital Leader",
      issuer: "Google",
      issueDate: "2024-02",
      verificationUrl: "https://cloud.google.com/certification",
      imagePreset: "google"
    }
  ],
  heatmap: {
    githubUsername: "alexmercer",
    leetcodeUsername: "alexmercer"
  }
};
