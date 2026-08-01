import type { PortfolioData } from '../types';

export const apoorvaPortfolioData: PortfolioData = {
  profile: {
    name: "Apoorva Verma",
    jobTitle: "Full Stack & AI Engineer",
    gender: "female",
    experience: "2+ Years",
    company: "Sasahyog Technologies Private Limited",
    companyLogoUrl: "🚀",
    location: "Uttar Pradesh, India",
    email: "apoorva92verma@gmail.com",
    phone: "+91 6398437478",
    avatarPreset: "cyberpunk-neon",
    avatarUrl: "https://lh3.googleusercontent.com/d/1Dq4HToia3V7kN5PYFTwRElOaKHRF8h4_",
    bio: "Full Stack & AI Engineer specializing in large language models, agentic workflows, custom React interfaces, and high-performance serverless backends. Passionate about crafting pixel-perfect micro-interactions and secure software."
  },
  socials: {
    linkedin: "https://linkedin.com/in/apoorvaverma001",
    github: "https://github.com/apoorvaverma",
    leetcode: "https://leetcode.com/apoorvaverma",
    twitter: "https://x.com/apoorvaverma",
    discord: "apoorva_verma#1234",
    gmail: "apoorva.verma@skillcard.io",
    resumeUrl: "https://example.com/apoorva-verma-resume.pdf",
    kaggle: "https://kaggle.com/apoorvaverma"
  },
  skills: [
    {
      id: "s1",
      name: "React & Next.js",
      category: "frontend",
      proficiency: 95,
      usageNote: "Building responsive SPAs and SSR platforms with optimized Core Web Vitals (LCP, INP).",
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
      name: "LLMs & AI Agents",
      category: "backend",
      proficiency: 90,
      usageNote: "Implementing RAG pipelines, function calling, agent chains, and vector store retrieval.",
      iconName: "Cpu"
    },
    {
      id: "s5",
      name: "Python & FastAPI",
      category: "backend",
      proficiency: 90,
      usageNote: "Building AI-driven microservices, model inference APIs, and automated agent tools.",
      iconName: "FileCode"
    },
    {
      id: "s6",
      name: "Node.js & Express",
      category: "backend",
      proficiency: 85,
      usageNote: "Scalable REST & GraphQL APIs, custom middlewares, and real-time WebSockets integration.",
      iconName: "Server"
    },
    {
      id: "s7",
      name: "PostgreSQL",
      category: "database",
      proficiency: 85,
      usageNote: "Database modeling, complex JSONB fields, indexing, and query optimization.",
      iconName: "Database"
    },
    {
      id: "s8",
      name: "Docker & Kubernetes",
      category: "devops",
      proficiency: 80,
      usageNote: "Containerizing services, multi-stage builds, and orchestration configuration.",
      iconName: "Box"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "SkillCard Platform",
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
      techTags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/apoorvaverma/skill-card",
      liveDemoUrl: "https://skillcard.io",
      keyFeatures: [
        "Interactive 3D glassmorphic dashboard showcasing verified developer profiles",
        "Zero-retention document processing using in-memory byte buffers",
        "Dynamic contribution activity heatmaps integrated with GitHub & LeetCode APIs",
        "Complete multi-step onboarding wizard for seamless credential verification"
      ]
    },
    {
      id: "p2",
      title: "Agentic Workspace Controller",
      thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=80",
      techTags: ["Python", "FastAPI", "Gemini API", "Docker"],
      githubUrl: "https://github.com/apoorvaverma/agentic-workspace",
      liveDemoUrl: "https://workspace-controller.io",
      keyFeatures: [
        "Autonomous multi-agent system executing shell operations and file manipulation tasks",
        "Real-time task synchronization over high-performance WebSockets connections",
        "Strict security sandboxing enclosing tool execution and limiting system call footprints",
        "Integrated context retrieval using structured semantic embeddings & vector storage"
      ]
    },
    {
      id: "p3",
      title: "ApexAnalytics Engine",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80",
      techTags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Prisma"],
      githubUrl: "https://github.com/apoorvaverma/apex-analytics",
      liveDemoUrl: "https://apex-analytics-demo.io",
      keyFeatures: [
        "Real-time reactive visual grids built using Recharts dashboard widgets",
        "Dynamic query URL parameter synchronization for interactive range selections",
        "Fully serverless database configuration with automated pooling",
        "Clean server-side page renders using ISR caching strategy"
      ]
    }
  ],
  experiences: [
    {
      id: "e1",
      company: "SkillCard Labs",
      designation: "Lead AI & Full Stack Engineer",
      dateRange: "2024 - Present",
      achievements: [
        "Architected the core verification engine, ensuring secure in-memory processing of developer documents.",
        "Developed interactive glassmorphic UI dashboard, achieving 100/100 performance scores.",
        "Designed custom multi-agent compiler that automates code generation and unit testing pipelines."
      ]
    },
    {
      id: "e2",
      company: "Vortex Labs",
      designation: "Senior Software Engineer",
      dateRange: "2022 - 2024",
      achievements: [
        "Built high-performance microservices stack in Go & Python serving 1M+ daily requests.",
        "Optimized SQL query response times by 40% through custom database index tuning and query refactoring.",
        "Migrated monolith architectures to serverless functions, decreasing hosting overheads by 50%."
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
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google",
      issueDate: "2024-11",
      verificationUrl: "https://cloud.google.com/certification",
      imagePreset: "google"
    },
    {
      id: "c3",
      name: "Meta Front-End Developer Professional",
      issuer: "Meta",
      issueDate: "2024-06",
      verificationUrl: "https://coursera.org/verification",
      imagePreset: "meta"
    }
  ],
  heatmap: {
    githubUsername: "apoorvaverma",
    leetcodeUsername: "apoorvaverma"
  }
};
