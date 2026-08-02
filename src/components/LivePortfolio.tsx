import React, { useState, useMemo } from 'react';
import type { PortfolioData, Certification } from '../types';
import {
  MapPin, Mail, Phone, Calendar, Briefcase, ExternalLink,
  Award, Eye, FileDown, Laptop, CheckCircle, Sparkles,
  TrendingUp, Lock, FileText
} from 'lucide-react';

// Custom inline SVG components for Brand & Social Logos
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LeetcodeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.102 17.93l-2.697 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.358a1.082 1.082 0 010-1.62l4.51-4.358c.466-.451 1.211-.451 1.677 0l2.697 2.606a1.083 1.083 0 001.529 0 1.012 1.012 0 000-1.477l-2.697-2.606c-1.306-1.262-3.425-1.262-4.73 0L3.89 12.682a3.245 3.245 0 000 4.858l6.304 6.09c1.305 1.262 3.425 1.262 4.73 0l6.304-6.09a1.012 1.012 0 000-1.477 1.083 1.083 0 00-1.529 0l-3.597 3.468zM22.03 10.518l-9.304-8.99a3.245 3.245 0 00-4.73 0L5.304 4.135a1.083 1.083 0 000 1.62 1.012 1.012 0 001.529 0l2.697-2.606c.466-.451 1.211-.451 1.677 0l9.304 8.99c.466.451 1.211.451 1.677 0l1.304-1.26c.466-.451.466-1.211 0-1.662z" />
  </svg>
);

const KaggleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3h3v8.5L14.5 6H18l-6 5.5 6.5 7.5H15l-5-6V19H6V3Z" />
  </svg>
);

const GmailIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.29 1.454-2.032 2.514-1.203L12 11.23l9.486-6.976C22.546 3.425 24 4.167 24 5.457Z" />
  </svg>
);

const DiscordIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03Z" />
  </svg>
);

interface LivePortfolioProps {
  data: PortfolioData;
  theme: 'dark' | 'light';
  onStartEdit: () => void;
}

export const LivePortfolio: React.FC<LivePortfolioProps> = ({ data, onStartEdit }) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'projects' | 'heatmap' | 'experience' | 'certifications'>('skills');
  const [flippedProjects, setFlippedProjects] = useState<Record<string, boolean>>({});
  const [activeCertModal, setActiveCertModal] = useState<Certification | null>(null);
  const [heatmapPlatform, setHeatmapPlatform] = useState<'github' | 'leetcode'>('github');
  const [heatmapYear, setHeatmapYear] = useState<2024 | 2025 | 2026>(2026);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const toggleProjectFlip = (id: string) => {
    setFlippedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const genderLabel = {
    male: 'Male',
    female: 'Female',
    'non-binary': 'Non-Binary',
    other: 'Other'
  }[data.profile.gender];

  // Visual custom brand SVG logos helper
  const getTechIcon = (name: string) => {
    const uppercaseName = name.toUpperCase();
    if (uppercaseName.includes('REACT') || uppercaseName.includes('NEXT')) {
      return (
        <svg className="w-5 h-5 text-[#61DAFB] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    }
    if (uppercaseName.includes('TYPESCRIPT')) {
      return (
        <svg className="w-5 h-5 text-[#3178C6] fill-currentColor" viewBox="0 0 24 24">
          <path d="M1.5 1.5h21v21h-21v-21zm19.5 19.5v-18h-18v18h18zM13.2 13.8h-1.8v-1.8H15v-1.5H9.6v6.6H15v-1.5h-1.8v-1.8zM17.4 10.5h-1.5v6.6h1.5v-6.6z" />
        </svg>
      );
    }
    if (uppercaseName.includes('TAILWIND')) {
      return (
        <svg className="w-5 h-5 text-[#38BDF8] fill-currentColor" viewBox="0 0 24 24">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C12.337 13.382 10.976 12 8.001 12z" />
        </svg>
      );
    }
    if (uppercaseName.includes('LLM') || uppercaseName.includes('AI') || uppercaseName.includes('AGENT')) {
      return (
        <svg className="w-5 h-5 text-[#A855F7] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    }
    if (uppercaseName.includes('PYTHON') || uppercaseName.includes('FASTAPI')) {
      return (
        <svg className="w-5 h-5 text-[#FFE873] fill-currentColor" viewBox="0 0 24 24">
          <path d="M11.97 0C5.39 0 5.56 2.87 5.56 2.87l.03 2.94h6.44v.9H5.66S2 6.27 2 12.03c0 5.75 3.19 5.59 3.19 5.59h1.91v-2.69s-.07-3.22 3.16-3.22h6.14s3.16.09 3.16-3.13v-5.7s-.18-3.08-6.59-3.08zm-3.25 1.78a.93.93 0 1 1 0 1.86.93.93 0 0 1 0-1.86zm7.26 13.33H9.54s-3.16-.09-3.16 3.13v5.7s.18 3.08 6.59 3.08c6.58 0 6.41-2.87 6.41-2.87l-.03-2.94h-6.44v-.9h6.37S22 17.73 22 11.97c0-5.75-3.19-5.59-3.19-5.59h-1.91v2.69s.07 3.22-3.16 3.22zm-2.22 5.51a.93.93 0 1 1 0 1.86.93.93 0 0 1 0-1.86z" />
        </svg>
      );
    }
    if (uppercaseName.includes('NODE') || uppercaseName.includes('EXPRESS')) {
      return (
        <svg className="w-5 h-5 text-[#339933] fill-currentColor" viewBox="0 0 24 24">
          <path d="M12 2a1 1 0 0 0-.5.13l-8 4.62A1 1 0 0 0 3 7.62v9.23a1 1 0 0 0 .5.87l8 4.62a1 1 0 0 0 1 0l8-4.62a1 1 0 0 0 .5-.87V7.62a1 1 0 0 0-.5-.87l-8-4.62A1 1 0 0 0 12 2zm-1 3.54v12.92L5 13.85V7.69l6-2.15zm2 0 6 2.15v6.16l-6 4.61V5.54z" />
        </svg>
      );
    }
    if (uppercaseName.includes('POSTGRESQL') || uppercaseName.includes('DATABASE')) {
      return (
        <svg className="w-5 h-5 text-[#4169E1] fill-currentColor" viewBox="0 0 24 24">
          <path d="M13.65 14H10.5v-1.5h3.15c.66 0 1.2-.54 1.2-1.2s-.54-1.2-1.2-1.2h-3.15v-1.5h3.15c.66 0 1.2-.54 1.2-1.2s-.54-1.2-1.2-1.2h-3.15V6.7h3.15C15.82 6.7 17.5 8.38 17.5 10.5S15.82 14.3 13.65 14z" />
        </svg>
      );
    }
    if (uppercaseName.includes('DOCKER') || uppercaseName.includes('KUBERNETES') || uppercaseName.includes('DEVOPS')) {
      return (
        <svg className="w-5 h-5 text-[#2496ED] fill-currentColor" viewBox="0 0 24 24">
          <path d="M13.983 8.878h-2.28v2.11h2.28v-2.11zm3.337 0h-2.282v2.11h2.282v-2.11zm3.34 0h-2.28v2.11h2.28v-2.11zm-10.012 3.12h-2.28v2.11h2.28v-2.11zm3.337 0h-2.282v2.11h2.282v-2.11zm3.34 0h-2.28v2.11h2.28v-2.11zm3.343 0h-2.282v2.11h2.282v-2.11zm-13.36 3.12h-2.28v2.11h2.28v-2.11zm3.337 0h-2.282v2.11h2.282v-2.11zm3.34 0h-2.28v2.11h2.28v-2.11zM1.123 13.43c0 2.2 1.34 4.88 4.22 4.88h13.33c4.15 0 5.3-2.6 5.3-4.88 0-1.85-.92-3.11-2.43-3.11-.96 0-1.78.43-2.31 1.08-.24-1.22-1.12-2.18-2.61-2.18-.89 0-1.63.35-2.1.88V6.012h-6.22V13.43H1.123z" />
        </svg>
      );
    }
    return <Sparkles className="w-5 h-5 text-[#00D2C2]" />;
  };

  // Generate deterministic heatmap data
  const heatmapCells = useMemo(() => {
    // Generate 53 weeks x 7 days = 371 cells
    const cells = [];
    const seed = data.profile.name.length + heatmapYear + (heatmapPlatform === 'github' ? 10 : 20);

    for (let i = 0; i < 371; i++) {
      const val = Math.abs(Math.sin(seed + i * 0.15) * Math.cos(seed - i * 0.05));
      let intensity = 0;
      if (val > 0.85) intensity = 4;
      else if (val > 0.6) intensity = 3;
      else if (val > 0.35) intensity = 2;
      else if (val > 0.15) intensity = 1;

      cells.push({
        id: i,
        intensity,
        count: intensity * 2 + (i % 3)
      });
    }
    return cells;
  }, [data.profile.name, heatmapPlatform, heatmapYear]);

  const totalContributions = useMemo(() => {
    return heatmapCells.reduce((sum, cell) => sum + cell.count, 0);
  }, [heatmapCells]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 relative">

      {/* ================= CORE DISPLAY AREA ================= */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-y-auto md:overflow-hidden gap-6 p-1">

        {/* ================= LEFT SECTION (Constant ID Card Sidebar) ================= */}
        <div className="w-full md:w-[35%] flex-shrink-0 flex flex-col h-full min-h-0">
          <div className="relative rounded-2xl flex flex-col items-center justify-between h-full bg-[#12141A] border border-[#1A1D26] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-y-auto custom-scrollbar">

            {/* Ambient cyber decorations */}
            <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#00D2C2] shadow-[0_0_8px_#00D2C2] z-20" />
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#0A9396] shadow-[0_0_8px_#0A9396] z-20" />

            {/* Full-width avatar photo container (Taller h-96 height) */}
            <div className="w-full h-[380px] relative overflow-hidden flex-shrink-0 border-b border-[#1A1D26]">
              {data.profile.avatarUrl ? (
                <img
                  src={data.profile.avatarUrl}
                  alt={data.profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-[#00D2C2] font-bold text-3xl font-mono">
                  ID
                </div>
              )}
              
              {/* Padded Text Overlay at the bottom of the photo */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/85 to-transparent pt-20 pb-4 px-6 flex flex-col items-center text-center">
                
                {/* Available status badge floating near the middle-bottom */}
                {/* <div className="mb-3 bg-[#0A0B0E]/80 backdrop-blur-sm text-[9px] text-emerald-400 border border-emerald-500/50 px-2.5 py-0.5 rounded-full flex items-center space-x-1.5 font-bold shadow-[0_0_8px_rgba(16,185,129,0.2)] whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot flex-shrink-0" />
                  <span>AVAILABLE FOR WORK</span>
                </div> */}

                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-tight">
                  {data.profile.name || 'Anonymous Developer'}
                </h2>
                <p className="text-xs font-semibold text-[#00D2C2] uppercase tracking-wider mt-1.5">
                  {data.profile.jobTitle || 'Full Stack & AI Engineer'}
                </p>
              </div>
            </div>

            {/* Profile Info Details (padded wrapper for the rest of details) */}
            <div className="w-full px-6 pb-6 pt-4 flex flex-col items-center flex-1 justify-between">


              {/* Metadata columns */}
              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="col-span-1 bg-[#0A0B0E]/60 p-3 rounded-xl border border-[#1A1D26] text-center flex flex-col ">
                  <span className="block text-[8px] text-dark-muted uppercase font-bold tracking-wider mb-0.5">Work Experience</span>
                  <span className="text-[11px] font-extrabold text-white font-mono">{data.profile.experience || '4+ Years'}</span>
                </div>
                <div className="col-span-2 bg-[#0A0B0E]/60 p-3 rounded-xl border border-[#1A1D26] text-center flex flex-col ">
                  <span className="block text-[8px] text-dark-muted uppercase font-bold tracking-wider mb-0.5">Current Company</span>
                  <span className="text-[11px] font-extrabold text-[#00D2C2] font-mono truncate block" title={data.profile.company}>{data.profile.company || 'N/A'}</span>
                </div>
              </div>

              {/* Details table and resume button */}
              <div className="flex items-stretch gap-3 w-full mt-5 border-t border-[#1A1D26] pt-4 select-text">
                {/* Contacts and location */}
                <div className="flex-1 space-y-2 text-xs text-slate-300">
                  <MapPin size={13} className="text-[#00D2C2] flex-shrink-0" />
                  <span className="truncate">{data.profile.location || 'Remote'}</span>
                </div>
                <a
                  href={`mailto:${data.profile.email}`}
                  className="flex items-center space-x-2 text-xs text-slate-300 hover:text-[#00D2C2] transition truncate"
                >
                  <Mail size={13} className="text-[#00D2C2] flex-shrink-0" />
                  <span className="truncate">{data.profile.email || 'Click to Email'}</span>
                </a>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Phone size={13} className="text-[#00D2C2] flex-shrink-0" />
                  <span>{data.profile.phone || 'N/A'}</span>
                </div>
              </div>

              {/* Resume download Button */}
              {data.socials.resumeUrl && (
                <a
                  href={data.socials.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-24 bg-[#00D2C2] hover:bg-[#00D2C2]/90 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,210,194,0.3)] mb-4 hover:scale-[1.02] flex flex-col justify-center items-center gap-1 text-center flex-shrink-0"
                >
                  <FileDown size={14} />
                  <span className="font-bold tracking-wider leading-none">RESUME</span>
                </a>
              )}

            </div>

            {/* Action Bar (socialHandles) */}
            <div className="w-full border-t border-[#1A1D26] pt-4 px-6 pb-6 select-none flex-shrink-0">

              {/* Floating dark social handles toolbar */}
              <div className="flex justify-around items-center bg-[#0A0B0E] border border-[#1A1D26] px-2 py-2 rounded-full shadow-inner">
                {data.socials.github && (
                  <a 
                  href={data.socials.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors">
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-0.5 text-[9px] font-mono font-bold text-white bg-slate-950 border border-[#1A1D26] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      GitHub
                    </span>
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {data.socials.linkedin && (
                  <a href={data.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors" title="LinkedIn">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {data.socials.leetcode && (
                  <a href={data.socials.leetcode} target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors" title="LeetCode">
                    <LeetcodeIcon className="w-4 h-4" />
                  </a>
                )}
                {data.socials.twitter && (
                  <a href={data.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors" title="X (Twitter)">
                    <XIcon className="w-4 h-4" />
                  </a>
                )}
                {data.socials.discord && (
                  <a href={data.socials.discord.startsWith('http') ? data.socials.discord : 'https://discord.com'} target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors" title={`Discord: ${data.socials.discord}`}>
                    <DiscordIcon className="w-4 h-4" />
                  </a>
                )}
                {data.socials.gmail && (
                  <a href={`mailto:${data.socials.gmail}`} className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors" title="Gmail">
                    <GmailIcon className="w-4 h-4" />
                  </a>
                )}
                {data.socials.kaggle && (
                  <a href={data.socials.kaggle} target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-[#00D2C2] transition-colors" title="Kaggle">
                    <KaggleIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ================= RIGHT SECTION (Interactive Dashboard Pane) ================= */}
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">

          {/* Navigation tab controls bar */}
          <div className="flex space-x-1.5 md:space-x-3 overflow-x-auto pb-2.5 select-none no-scrollbar flex-shrink-0">
            {[
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'heatmap', label: 'Heatmap' },
              { id: 'experience', label: 'Experience' },
              { id: 'certifications', label: 'Certifications' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${activeTab === tab.id
                  ? 'bg-[#00D2C2] text-slate-900 border-[#00D2C2] shadow-[0_0_12px_rgba(0,210,194,0.3)] font-extrabold'
                  : 'bg-[#12141A] border-[#1A1D26] text-slate-400 hover:border-[#00D2C2]/50 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive pane window viewport */}
          <div className="flex-1 rounded-2xl p-5 overflow-y-auto custom-scrollbar relative bg-[#12141A] border border-[#1A1D26] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] min-h-0">

            {/* TAB: Skills Grid */}
            {activeTab === 'skills' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-[#00D2C2] uppercase tracking-wider flex items-center">
                  <Laptop size={14} className="mr-2" /> Stack & Competencies
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {data.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative p-4 bg-[#0A0B0E] rounded-xl border border-[#1A1D26] hover:border-[#00D2C2] transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between h-28"
                    >
                      <div className="flex justify-between items-start">
                        <div className="p-1.5 bg-[#12141A] rounded-lg border border-[#1A1D26]">
                          {getTechIcon(skill.name)}
                        </div>
                        <span className="text-[8px] uppercase font-bold px-2 py-0.5 bg-[#12141A] text-slate-400 rounded-full border border-[#1A1D26] font-mono">
                          {skill.category}
                        </span>
                      </div>

                      <div className="mt-2">
                        <span className="block font-bold text-xs text-white tracking-wide truncate">{skill.name}</span>
                        <div className="w-full bg-[#1A1D26] h-1 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-[#00D2C2] h-full transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>

                      {/* Tooltip Overlay */}
                      <div className="absolute inset-0 bg-[#12141A] p-3.5 rounded-xl border border-[#00D2C2] text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10 flex flex-col justify-between">
                        <div>
                          <span className="block font-extrabold text-white mb-1.5 text-xs">{skill.name}</span>
                          <p className="text-[10px] text-slate-400 leading-normal font-normal">{skill.usageNote}</p>
                        </div>
                        <div className="flex justify-between items-center mt-1 border-t border-[#1A1D26] pt-1.5 font-mono text-[9px]">
                          <span className="uppercase text-slate-400">{skill.category}</span>
                          <span className="text-[#00D2C2] font-bold">PROFICIENCY: {skill.proficiency}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Projects Grid with 3D Card flips */}
            {activeTab === 'projects' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-[#00D2C2] uppercase tracking-wider flex items-center">
                  <Award size={14} className="mr-2" /> Engineering Showcase
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {data.projects.map((proj) => {
                    const isFlipped = !!flippedProjects[proj.id];
                    return (
                      <div
                        key={proj.id}
                        className="card-perspective h-[250px] w-full cursor-pointer select-none"
                        onClick={() => toggleProjectFlip(proj.id)}
                      >
                        <div className={`card-inner h-full w-full ${isFlipped ? 'is-flipped' : ''}`}>

                          {/* FRONT OF THE CARD */}
                          <div className="card-front rounded-xl overflow-hidden bg-[#0A0B0E] border border-[#1A1D26] hover:border-[#00D2C2]/50 flex flex-col h-full transition duration-300">
                            <div className="relative h-28 overflow-hidden bg-slate-950 flex-shrink-0">
                              <img
                                src={proj.thumbnailUrl}
                                alt={proj.title}
                                className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-sm text-[8px] text-[#00D2C2] font-extrabold uppercase py-0.5 px-2 rounded-full border border-[#00D2C2]/40">
                                Click Flip ❯
                              </div>
                            </div>
                            <div className="flex-1 p-3.5 flex flex-col justify-between overflow-hidden">
                              <div>
                                <h4 className="font-extrabold text-sm text-white truncate tracking-wide">{proj.title}</h4>
                                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                                  {proj.keyFeatures[0] || 'Modern verification portfolio platform built using React.'}
                                </p>
                              </div>
                              <div className="space-y-2 border-t border-[#1A1D26] pt-2">
                                <div className="flex space-x-1 overflow-x-auto no-scrollbar whitespace-nowrap">
                                  {proj.techTags.map((tag) => (
                                    <span key={tag} className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#12141A] border border-[#1A1D26] text-[#00D2C2]">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex justify-between items-center text-[9px] pt-1" onClick={(e) => e.stopPropagation()}>
                                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-slate-400 hover:text-[#00D2C2] font-bold">
                                    <GithubIcon className="w-3 h-3" />
                                    <span>[ CODE ]</span>
                                  </a>
                                  <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-[#00D2C2] font-extrabold">
                                    <ExternalLink size={10} />
                                    <span>[ LIVE DEMO ]</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* BACK OF THE CARD */}
                          <div className="card-back rounded-xl p-4 bg-[#0A0B0E] border-2 border-[#00D2C2] flex flex-col justify-between h-full">
                            <div className="overflow-hidden flex-1 flex flex-col">
                              <div className="flex justify-between items-center border-b border-[#1A1D26] pb-1.5 mb-2.5">
                                <span className="text-[9px] font-extrabold text-[#00D2C2] uppercase tracking-wider">Key Project Features</span>
                                <span className="text-[8px] text-slate-400 font-mono">Flip back ⟲</span>
                              </div>
                              <ul className="space-y-1.5 overflow-y-auto flex-1 custom-scrollbar pr-1">
                                {proj.keyFeatures.map((feat, idx) => (
                                  <li key={idx} className="flex items-start text-[10px] text-slate-300 font-normal leading-normal">
                                    <CheckCircle size={10} className="text-[#00D2C2] mr-1.5 mt-0.5 flex-shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="border-t border-[#1A1D26] pt-2 mt-2 flex justify-between items-center text-[9px]" onClick={(e) => e.stopPropagation()}>
                              <div className="flex space-x-1 truncate max-w-[50%]">
                                {proj.techTags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="text-[8px] font-semibold text-slate-400">{tag}</span>
                                ))}
                              </div>
                              <div className="flex space-x-3 flex-shrink-0 font-bold">
                                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#00D2C2] text-slate-400">Code</a>
                                <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-[#00D2C2]">Live</a>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: Contribution Heatmap */}
            {activeTab === 'heatmap' && (
              <div className="space-y-5">

                {/* Platform Toggle Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1D26] pb-3">
                  <h3 className="text-sm font-bold text-[#00D2C2] uppercase tracking-wider flex items-center">
                    <Calendar size={14} className="mr-2" /> Contribution Graph
                  </h3>

                  {/* Platforms toggler */}
                  <div className="flex items-center space-x-1 bg-[#0A0B0E] p-1 rounded-xl border border-[#1A1D26]">
                    <button
                      onClick={() => setHeatmapPlatform('github')}
                      className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1 transition ${heatmapPlatform === 'github'
                        ? 'bg-emerald-500 text-white font-extrabold shadow'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>GitHub</span>
                    </button>
                    <button
                      onClick={() => setHeatmapPlatform('leetcode')}
                      className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1 transition ${heatmapPlatform === 'leetcode'
                        ? 'bg-orange-500 text-white font-extrabold shadow'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      <LeetcodeIcon className="w-3 h-3" />
                      <span>LeetCode</span>
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Year:</span>
                    {[2024, 2025, 2026].map(y => (
                      <button
                        key={y}
                        onClick={() => setHeatmapYear(y as any)}
                        className={`px-2 py-0.5 text-xs font-bold rounded ${heatmapYear === y
                          ? 'bg-[#00D2C2]/10 border border-[#00D2C2] text-[#00D2C2] font-mono'
                          : 'border border-[#1A1D26] text-slate-400 hover:border-[#00D2C2]/40 hover:text-white'
                          }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 text-[9px] text-slate-400 font-mono font-semibold">
                    <TrendingUp size={12} className="text-[#00D2C2]" />
                    <span>TOTAL: {totalContributions} submissions for {heatmapPlatform === 'github' ? data.heatmap.githubUsername : data.heatmap.leetcodeUsername}</span>
                  </div>
                </div>

                {/* Matrix Grid */}
                <div className="bg-[#0A0B0E] p-4 rounded-xl border border-[#1A1D26] overflow-x-auto custom-scrollbar no-scrollbar">
                  <div className="flex space-x-1 min-w-[500px]">
                    {Array.from({ length: 53 }).map((_, colIdx) => (
                      <div key={colIdx} className="flex flex-col space-y-1">
                        {Array.from({ length: 7 }).map((_, rowIdx) => {
                          const cellIdx = colIdx * 7 + rowIdx;
                          const cell = heatmapCells[cellIdx] || { intensity: 0, count: 0 };

                          let colorClass = 'bg-[#1A1D26]/40';
                          if (heatmapPlatform === 'github') {
                            colorClass = [
                              'bg-[#1A1D26]/40',
                              'bg-emerald-950/60 text-emerald-500 border border-emerald-900/10',
                              'bg-emerald-800/60',
                              'bg-emerald-600',
                              'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.3)]'
                            ][cell.intensity];
                          } else {
                            colorClass = [
                              'bg-[#1A1D26]/40',
                              'bg-orange-950/60 text-orange-500 border border-orange-900/10',
                              'bg-orange-800/60',
                              'bg-orange-600',
                              'bg-orange-400 shadow-[0_0_4px_rgba(251,146,60,0.3)]'
                            ][cell.intensity];
                          }

                          return (
                            <div
                              key={rowIdx}
                              className={`w-[9px] h-[9px] rounded-sm transition-all hover:scale-125 ${colorClass}`}
                              title={`${cell.count} contributions on day ${cellIdx}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-between items-center border-t border-[#1A1D26] pt-3 text-[9px] text-slate-400 select-none">
                  <span>Dynamic matrix updates</span>
                  <div className="flex items-center space-x-1 font-semibold uppercase tracking-wider font-mono">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#1A1D26]/40" />
                    <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-900/40' : 'bg-orange-900/40'}`} />
                    <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-700/60' : 'bg-orange-700/60'}`} />
                    <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                    <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                    <span>More</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: Work Experience & Timeline */}
            {activeTab === 'experience' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-[#00D2C2] uppercase tracking-wider flex items-center">
                  <Briefcase size={14} className="mr-2" /> Timeline Steps
                </h3>
                {data.experiences.length === 0 ? (
                  <div className="text-xs text-slate-500 italic">No experiences registered.</div>
                ) : (
                  <div className="relative border-l border-[#1A1D26] pl-6 ml-3 space-y-8 select-none">
                    {data.experiences.map((exp) => (
                      <div key={exp.id} className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#00D2C2] bg-[#12141A] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2C2]" />
                        </span>
                        <div className="mb-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="font-extrabold text-sm text-white tracking-wide">{exp.designation}</h4>
                            <span className="text-[9px] font-bold text-[#00D2C2] uppercase tracking-widest sm:mt-0 mt-1 font-mono">{exp.dateRange}</span>
                          </div>
                          <span className="block text-xs font-semibold text-slate-400">{exp.company}</span>
                        </div>
                        <ul className="space-y-1.5 mt-2.5">
                          {exp.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start text-xs text-slate-300 font-normal leading-relaxed">
                              <span className="text-[#00D2C2] font-bold mr-2">»</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Certifications & badging */}
            {activeTab === 'certifications' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-[#00D2C2] uppercase tracking-wider flex items-center">
                  <Award size={14} className="mr-2" /> Digital Badges & Audits
                </h3>
                {data.certifications.length === 0 ? (
                  <div className="text-xs text-slate-500 italic">No certifications registered.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        onClick={() => setActiveCertModal(cert)}
                        className="group p-4 bg-[#0A0B0E] rounded-xl border border-[#1A1D26] hover:border-[#00D2C2] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-32"
                      >
                        <div className="flex justify-between items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold border ${cert.imagePreset === 'aws' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                            cert.imagePreset === 'google' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                              cert.imagePreset === 'meta' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                                'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20'
                            }`}>
                            {cert.imagePreset === 'aws' ? 'AWS' :
                              cert.imagePreset === 'google' ? 'GCP' :
                                cert.imagePreset === 'meta' ? 'META' : 'CERT'}
                          </div>
                          <span className="text-[8px] text-slate-400 font-mono">{cert.issueDate}</span>
                        </div>
                        <div className="mt-2.5">
                          <h4 className="font-bold text-xs text-white truncate tracking-wide group-hover:text-[#00D2C2] transition">{cert.name}</h4>
                          <span className="block text-[9px] text-slate-400 font-medium truncate">{cert.issuer}</span>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-[9px] border-t border-[#1A1D26] pt-2 text-slate-400 font-semibold">
                          <span className="flex items-center text-[#00D2C2] font-extrabold uppercase tracking-wide">
                            <Eye size={10} className="mr-1" /> View Creds
                          </span>
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#00D2C2] flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Verify <ExternalLink size={9} className="ml-0.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ================= WATERMARK AND LEGAL FOOTER ================= */}
      <footer className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-[11px] text-slate-500 border-t border-[#1A1D26] pt-3 pb-1 select-none gap-2 font-mono mt-2">
        <span>Verified by SkillCard • Made with ❤️ by Apoorva Verma</span>
        <div className="flex space-x-4">
          <button onClick={() => setShowTerms(true)} className="hover:text-[#00D2C2] transition font-bold">[ Terms & Conditions ]</button>
          <button onClick={() => setShowPrivacy(true)} className="hover:text-[#00D2C2] transition font-bold">[ Privacy Policy ]</button>
        </div>
      </footer>

      {/* ================= FLOATING CTA BANNER (Bottom Right) ================= */}
      <button
        onClick={onStartEdit}
        className="fixed bottom-14 right-6 z-40 bg-gradient-to-r from-[#00D2C2] to-[#0A9396] hover:from-[#00D2C2]/90 hover:to-[#0A9396]/90 text-slate-900 font-extrabold text-[11px] md:text-xs uppercase tracking-wider px-5 py-3 rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,194,0.4)] flex items-center gap-1.5 animate-bounce select-none"
      >
        <span>✨ Create Your Verified SkillCard</span>
      </button>

      {/* ================= CERTIFICATE VERIFICATION PREVIEW MODAL ================= */}
      {activeCertModal && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setActiveCertModal(null)}
        >
          <div
            className="w-full max-w-md bg-[#12141A] border-2 border-[#00D2C2] rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 select-none">
              <button
                onClick={() => setActiveCertModal(null)}
                className="text-slate-400 hover:text-rose-500 font-bold border border-[#1A1D26] px-2.5 py-0.5 rounded text-xs"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="text-center space-y-4 pt-4">
              <div className="flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold border ${activeCertModal.imagePreset === 'aws' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                  activeCertModal.imagePreset === 'google' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                    activeCertModal.imagePreset === 'meta' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                      'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20'
                  }`}>
                  {activeCertModal.imagePreset === 'aws' ? 'AWS' :
                    activeCertModal.imagePreset === 'google' ? 'GCP' :
                      activeCertModal.imagePreset === 'meta' ? 'META' : 'CERT'}
                </div>
              </div>

              <div className="border-y border-[#1A1D26] py-3">
                <span className="text-[10px] font-bold text-[#00D2C2] uppercase tracking-widest">Digital Developer Achievement</span>
                <h4 className="text-base font-extrabold text-white tracking-wide mt-1">{activeCertModal.name}</h4>
                <p className="text-xs text-slate-400 font-semibold mt-1">Issued by {activeCertModal.issuer}</p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono border-b border-[#1A1D26] pb-3">
                <span>Issue Date: {activeCertModal.issueDate}</span>
                <span className="text-emerald-400 font-bold">VERIFIED ✓</span>
              </div>

              <div className="pt-2">
                <a
                  href={activeCertModal.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-[#00D2C2] text-slate-900 font-extrabold text-xs uppercase tracking-widest py-2.5 rounded-xl hover:bg-[#00D2C2]/90 transition shadow-[0_0_15px_rgba(0,210,194,0.3)]"
                >
                  <span>Launch External Verification Link</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRIVACY POLICY MODAL ================= */}
      {showPrivacy && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="w-full max-w-md bg-[#12141A] border-2 border-[#00D2C2] rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 select-none">
              <button
                onClick={() => setShowPrivacy(false)}
                className="text-slate-400 hover:text-rose-500 font-bold border border-[#1A1D26] px-2.5 py-0.5 rounded text-xs"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-4 pt-4 text-left">
              <div className="flex items-center space-x-2 border-b border-[#1A1D26] pb-3">
                <Lock className="text-[#00D2C2] w-5 h-5" />
                <h4 className="text-base font-extrabold text-white tracking-wide">Zero-Retention Privacy Policy</h4>
              </div>

              <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <p>
                  At SkillCard, we take credentials security and user privacy extremely seriously. Our platform works on a zero-persistence framework.
                </p>
                <div className="bg-[#0A0B0E] p-3.5 rounded-xl border border-emerald-500/20 text-[11px] text-emerald-400 font-mono leading-normal">
                  <strong>Memory buffer execution only:</strong> Uploaded resumes, PDFs, or verification credentials are held exclusively in-memory, parsed instantly, and completely purged from memory bytes immediately upon completion.
                </div>
                <ul className="space-y-2 list-disc pl-4 text-slate-400 text-[11px]">
                  <li>We do not store uploaded documents on any storage database.</li>
                  <li>No logs containing document data or parsed text are written to disk.</li>
                  <li>All processes run in temporary execution units.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-[#1A1D26]">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-full py-2.5 bg-[#00D2C2] text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#00D2C2]/90 transition"
                >
                  Understood & Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TERMS & CONDITIONS MODAL ================= */}
      {showTerms && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="w-full max-w-md bg-[#12141A] border-2 border-[#00D2C2] rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 select-none">
              <button
                onClick={() => setShowTerms(false)}
                className="text-slate-400 hover:text-rose-500 font-bold border border-[#1A1D26] px-2.5 py-0.5 rounded text-xs"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-4 pt-4 text-left">
              <div className="flex items-center space-x-2 border-b border-[#1A1D26] pb-3">
                <FileText className="text-[#00D2C2] w-5 h-5" />
                <h4 className="text-base font-extrabold text-white tracking-wide">Terms & Conditions</h4>
              </div>

              <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <p>
                  Please review the terms of service that govern your verified SkillCard profile generation:
                </p>
                <ol className="space-y-2.5 list-decimal pl-4 text-slate-400 text-[11px]">
                  <li>
                    <strong className="text-white">Profile Verification:</strong> Verification badges are issued based on computational validation of uploaded third-party files.
                  </li>
                  <li>
                    <strong className="text-white">Developer Responsibility:</strong> You represent that all details uploaded or stored are accurate and belong to you.
                  </li>
                  <li>
                    <strong className="text-white">Fair Use:</strong> Any attempts to upload corrupted files, malware, or forge verifications will result in profile ban.
                  </li>
                </ol>
              </div>

              <div className="pt-2 border-t border-[#1A1D26]">
                <button
                  onClick={() => setShowTerms(false)}
                  className="w-full py-2.5 bg-[#00D2C2] text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#00D2C2]/90 transition"
                >
                  I Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
