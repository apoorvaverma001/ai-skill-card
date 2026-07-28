export interface ProfileInfo {
  name: string;
  jobTitle: string;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  experience: string;
  company: string;
  companyLogoUrl: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl: string;
  avatarPreset: string;
  bio: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  leetcode: string;
  twitter: string;
  discord: string;
  gmail: string;
  resumeUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'other';
  proficiency: number; // 0 to 100
  usageNote: string;
  iconName: string; // lucide icon name or matching SVG identifier
}

export interface Project {
  id: string;
  title: string;
  thumbnailUrl: string;
  techTags: string[];
  githubUrl: string;
  liveDemoUrl: string;
  keyFeatures: string[]; // Front/Back features bullet points
}

export interface Experience {
  id: string;
  company: string;
  designation: string;
  dateRange: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  verificationUrl: string;
  imagePreset: 'aws' | 'google' | 'meta' | 'other';
}

export interface HeatmapConfig {
  githubUsername: string;
  leetcodeUsername: string;
}

export interface PortfolioData {
  profile: ProfileInfo;
  socials: SocialLinks;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  heatmap: HeatmapConfig;
}
