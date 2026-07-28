import React, { useState, useMemo } from 'react';
import type { PortfolioData, Certification } from '../types';
import { 
  MapPin, Mail, Phone, Calendar, Briefcase, ExternalLink, 
  Award, Eye, FileDown, Info, Laptop, CheckCircle, Sparkles, Smile,
  TrendingUp, MessageSquare
} from 'lucide-react';

// Custom inline SVG components for Brand Logos (lucide-react has removed brand icons)
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

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LeetcodeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.102 17.93l-2.697 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.358a1.082 1.082 0 010-1.62l4.51-4.358c.466-.451 1.211-.451 1.677 0l2.697 2.606a1.083 1.083 0 001.529 0 1.012 1.012 0 000-1.477l-2.697-2.606c-1.306-1.262-3.425-1.262-4.73 0L3.89 12.682a3.245 3.245 0 000 4.858l6.304 6.09c1.305 1.262 3.425 1.262 4.73 0l6.304-6.09a1.012 1.012 0 000-1.477 1.083 1.083 0 00-1.529 0l-3.597 3.468zM22.03 10.518l-9.304-8.99a3.245 3.245 0 00-4.73 0L5.304 4.135a1.083 1.083 0 000 1.62 1.012 1.012 0 001.529 0l2.697-2.606c.466-.451 1.211-.451 1.677 0l9.304 8.99c.466.451 1.211.451 1.677 0l1.304-1.26c.466-.451.466-1.211 0-1.662z" />
  </svg>
);

interface LivePortfolioProps {
  data: PortfolioData;
  theme: 'dark' | 'light';
}

export const LivePortfolio: React.FC<LivePortfolioProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'experience' | 'heatmap' | 'certifications'>('about');
  
  // Project flip states (mapping project ID -> boolean flipped)
  const [flippedProjects, setFlippedProjects] = useState<Record<string, boolean>>({});

  // Certifications modal state
  const [activeCertModal, setActiveCertModal] = useState<Certification | null>(null);

  // Heatmap State
  const [heatmapPlatform, setHeatmapPlatform] = useState<'github' | 'leetcode'>('github');
  const [heatmapYear, setHeatmapYear] = useState<2024 | 2025 | 2026>(2026);

  const toggleProjectFlip = (id: string) => {
    setFlippedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Gender visual definitions
  const genderLabel = {
    male: 'He / Him',
    female: 'She / Her',
    'non-binary': 'They / Them',
    other: 'Individual'
  }[data.profile.gender];

  // Render tech SVG or Lucide replacement
  const getTechIcon = (name: string) => {
    const uppercaseName = name.toUpperCase();
    if (uppercaseName.includes('REACT')) {
      return (
        <svg className="w-6 h-6 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" className="hidden"/>
          <path d="M22 12c0-1.66-1.34-3-3-3-1.03 0-1.94.52-2.48 1.32C15.36 9.4 13.78 8.8 12 8.8s-3.36.6-4.52 1.52C6.94 9.52 6.03 9 5 9c-1.66 0-3 1.34-3 3 0 1.03.52 1.94 1.32 2.48C3.12 15.1 3 15.54 3 16c0 1.66 1.34 3 3 3 1.03 0 1.94-.52 2.48-1.32 1.16.92 2.74 1.52 4.52 1.52s3.36-.6 4.52-1.52c.54.8 1.45 1.32 2.48 1.32 1.66 0 3-1.34 3-3 0-.46-.12-.9-.32-1.52.8-.54 1.32-1.45 1.32-2.48zm-10 4.8c-2.65 0-4.8-2.15-4.8-4.8s2.15-4.8 4.8-4.8 4.8 2.15 4.8 4.8-2.15 4.8-4.8 4.8z"/>
        </svg>
      );
    }
    // Return placeholder
    return <Sparkles className="w-5 h-5 text-accent-cyan" />;
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
    <div className="w-full flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden gap-6 p-1">
      
      {/* ================= LEFT SECTION (Constant ID Card Sidebar) ================= */}
      <div className="w-full md:w-[35%] flex-shrink-0 flex flex-col">
        <div className="relative rounded-2xl p-5 flex flex-col items-center text-center transition-all h-full justify-between
          bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border
          shadow-glass-light dark:shadow-glass-dark"
        >
          {/* Futuristic ambient corner glow dots */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#00D2C2]" />
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent-teal shadow-[0_0_8px_#0A9396]" />
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-accent-teal shadow-[0_0_8px_#0A9396]" />
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#00D2C2]" />

          {/* Profile Header Details */}
          <div className="w-full flex flex-col items-center">
            {/* Portrait Image with Status Pulse Badge */}
            <div className="relative mb-4 mt-2">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-accent-cyan shadow-glow-cyan">
                {data.profile.avatarUrl ? (
                  <img 
                    src={data.profile.avatarUrl} 
                    alt={data.profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-accent-cyan font-bold text-3xl font-mono">
                    ID
                  </div>
                )}
              </div>
              {/* Online pulse tag */}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-[10px] text-white px-2 py-0.5 rounded-full flex items-center space-x-1 font-semibold border border-light-card dark:border-dark-card shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot flex-shrink-0" />
                <span>AVAILABLE</span>
              </div>
            </div>

            {/* Name, Role & Company */}
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-light-text dark:text-dark-text leading-tight mt-1">
              {data.profile.name || 'Anonymous Developer'}
            </h2>
            <p className="text-xs font-semibold text-accent-cyan uppercase tracking-wider mt-1">
              {data.profile.jobTitle || 'Freelance Developer'}
            </p>
            <div className="flex items-center space-x-1 bg-light-canvas dark:bg-dark-canvas/50 px-2 py-0.5 rounded border border-light-border dark:border-dark-border mt-2">
              <span className="text-xs font-bold text-light-text dark:text-dark-text flex items-center gap-1">
                <span className="text-accent-cyan font-mono text-sm">{data.profile.companyLogoUrl || '🏢'}</span> 
                {data.profile.company || 'Autonomous'}
              </span>
            </div>

            {/* Meta statistics cards */}
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              <div className="bg-light-canvas dark:bg-dark-canvas/40 p-2 rounded border border-light-border dark:border-dark-border text-center">
                <span className="block text-[10px] text-light-muted dark:text-dark-muted uppercase font-bold tracking-wider">Experience</span>
                <span className="text-xs font-extrabold text-light-text dark:text-dark-text font-mono">{data.profile.experience || 'N/A'}</span>
              </div>
              <div className="bg-light-canvas dark:bg-dark-canvas/40 p-2 rounded border border-light-border dark:border-dark-border text-center">
                <span className="block text-[10px] text-light-muted dark:text-dark-muted uppercase font-bold tracking-wider">Pronouns</span>
                <span className="text-xs font-extrabold text-light-text dark:text-dark-text font-mono">{genderLabel}</span>
              </div>
            </div>

            {/* Details Stepper details */}
            <div className="w-full space-y-2 mt-4 text-left border-t border-light-border dark:border-dark-border pt-4">
              <div className="flex items-center space-x-2.5 text-xs text-light-text dark:text-dark-text">
                <MapPin size={14} className="text-accent-cyan flex-shrink-0" />
                <span className="truncate">{data.profile.location || 'Remote'}</span>
              </div>
              <a 
                href={`mailto:${data.profile.email}`} 
                className="flex items-center space-x-2.5 text-xs text-light-text dark:text-dark-text hover:text-accent-cyan transition truncate"
              >
                <Mail size={14} className="text-accent-cyan flex-shrink-0" />
                <span className="truncate">{data.profile.email || 'Click to Email'}</span>
              </a>
              <div className="flex items-center space-x-2.5 text-xs text-light-text dark:text-dark-text">
                <Phone size={14} className="text-accent-cyan flex-shrink-0" />
                <span>{data.profile.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Social Action Toolbar */}
          <div className="w-full mt-6 select-none border-t border-light-border dark:border-dark-border pt-4">
            
            {/* Resume button */}
            {data.socials.resumeUrl && (
              <a
                href={data.socials.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-accent-cyan text-slate-900 font-extrabold text-xs uppercase tracking-widest py-2 rounded-xl hover:bg-accent-cyan/90 transition shadow-glow-cyan mb-3"
              >
                <FileDown size={14} />
                <span>[ ⬇ Resume ]</span>
              </a>
            )}

            {/* Floating rounded toolbar with hover tooltips */}
            <div className="flex justify-around items-center bg-light-canvas dark:bg-[#0E1014] border border-light-border dark:border-[#1E222B] px-2 py-1.5 rounded-full">
              
              {/* GitHub */}
              {data.socials.github && (
                <a 
                  href={data.socials.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-accent-cyan dark:hover:text-accent-cyan transition-all hover:bg-light-card dark:hover:bg-dark-card flex items-center justify-center"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}

              {/* LinkedIn */}
              {data.socials.linkedin && (
                <a 
                  href={data.socials.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-accent-cyan dark:hover:text-accent-cyan transition-all hover:bg-light-card dark:hover:bg-dark-card flex items-center justify-center"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}

              {/* LeetCode */}
              {data.socials.leetcode && (
                <a 
                  href={data.socials.leetcode} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-accent-cyan dark:hover:text-accent-cyan transition-all hover:bg-light-card dark:hover:bg-dark-card flex items-center justify-center"
                  title="LeetCode Profile"
                >
                  <LeetcodeIcon className="w-4 h-4" />
                </a>
              )}

              {/* Twitter */}
              {data.socials.twitter && (
                <a 
                  href={data.socials.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-accent-cyan dark:hover:text-accent-cyan transition-all hover:bg-light-card dark:hover:bg-dark-card flex items-center justify-center"
                  title="Twitter / X"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}

              {/* Discord */}
              {data.socials.discord && (
                <a 
                  href={data.socials.discord.startsWith('http') ? data.socials.discord : `https://discord.com`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-accent-cyan dark:hover:text-accent-cyan transition-all hover:bg-light-card dark:hover:bg-dark-card flex items-center justify-center"
                  title={`Discord: ${data.socials.discord}`}
                >
                  <MessageSquare size={16} />
                </a>
              )}

              {/* Gmail */}
              {data.socials.gmail && (
                <a 
                  href={`mailto:${data.socials.gmail}`}
                  className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-accent-cyan dark:hover:text-accent-cyan transition-all hover:bg-light-card dark:hover:bg-dark-card flex items-center justify-center"
                  title="Direct Gmail"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION (Interactive Multi-Card Dashboard) ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Navigation tabs */}
        <div className="flex space-x-1.5 md:space-x-3 overflow-x-auto pb-2 select-none no-scrollbar flex-shrink-0">
          {[
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'Experience' },
            { id: 'heatmap', label: 'Heatmap' },
            { id: 'certifications', label: 'Certifications' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-accent-cyan text-slate-900 shadow-glow-cyan font-extrabold'
                  : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:border-accent-cyan/50 hover:text-light-text dark:hover:text-dark-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Active Pane (Glassmorphic viewport) */}
        <div className="flex-1 rounded-2xl p-4 md:p-6 overflow-y-auto custom-scrollbar relative
          bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border
          shadow-glass-light dark:shadow-glass-dark"
        >
          {/* TAB 1: About */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-accent-cyan uppercase tracking-wider mb-2 flex items-center">
                  <Info size={16} className="mr-1.5" /> Background Info
                </h3>
                <p className="text-sm text-light-text dark:text-dark-text leading-relaxed font-normal">
                  {data.profile.bio || "No summary provided yet."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-light-border dark:border-dark-border pt-6">
                <div>
                  <h4 className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-2">Dev Identity Verified</h4>
                  <ul className="space-y-2 text-xs font-medium text-light-text dark:text-dark-text">
                    <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2 flex-shrink-0" /> Full Stack Capabilities</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2 flex-shrink-0" /> LocalStorage State Synchronization</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2 flex-shrink-0" /> Responsive layout compatibility</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center items-center bg-light-canvas dark:bg-dark-canvas/30 p-4 rounded-xl border border-light-border dark:border-dark-border">
                  <Smile className="w-10 h-10 text-accent-cyan mb-2" />
                  <span className="text-sm font-semibold text-light-text dark:text-dark-text">{data.profile.name}</span>
                  <span className="text-[10px] text-light-muted dark:text-dark-muted uppercase tracking-wider font-mono mt-0.5">Verified Profile Owner</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Skills & Tech Grid */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-accent-cyan uppercase tracking-wider flex items-center">
                <Laptop size={16} className="mr-1.5" /> Stack & Competencies
              </h3>

              {data.skills.length === 0 ? (
                <div className="text-sm text-light-muted dark:text-dark-muted italic">No skills registered yet. Go to Edit Profile Form step 3.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {data.skills.map((skill) => (
                    <div 
                      key={skill.id}
                      className="group relative p-3.5 bg-light-canvas dark:bg-[#0F1116] rounded-xl border border-light-border dark:border-dark-border hover:border-accent-cyan transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                    >
                      {/* Card Content */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-1.5 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border">
                          {getTechIcon(skill.name)}
                        </div>
                        <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted rounded-full border border-light-border dark:border-dark-border font-mono">
                          {skill.category}
                        </span>
                      </div>

                      <div>
                        <span className="block font-bold text-xs text-light-text dark:text-dark-text tracking-wide">{skill.name}</span>
                        {/* Custom visual progress track */}
                        <div className="w-full bg-light-border dark:bg-[#1A1F29] h-1 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="bg-accent-cyan h-full transition-all duration-500" 
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>

                      {/* Floating hover note tooltip */}
                      <div className="absolute inset-0 bg-light-card dark:bg-dark-card p-3 rounded-xl border border-accent-cyan text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10 flex flex-col justify-between">
                        <div>
                          <span className="block font-extrabold text-light-text dark:text-dark-text mb-1">{skill.name}</span>
                          <p className="text-[10px] text-light-muted dark:text-dark-muted leading-tight">{skill.usageNote}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2 border-t border-light-border dark:border-dark-border pt-1.5 font-mono text-[9px]">
                          <span className="uppercase text-light-muted dark:text-dark-muted">{skill.category}</span>
                          <span className="text-accent-cyan font-bold">PROFICIENCY: {skill.proficiency}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Interactive 3D Projects flip cards */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-accent-cyan uppercase tracking-wider flex items-center">
                <Award size={16} className="mr-1.5" /> Project Portfolio Showcase
              </h3>

              {data.projects.length === 0 ? (
                <div className="text-sm text-light-muted dark:text-dark-muted italic">No projects registered. Open Edit mode to add project data.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.projects.map((proj) => {
                    const isFlipped = !!flippedProjects[proj.id];

                    return (
                      <div 
                        key={proj.id} 
                        className="card-perspective h-[250px] w-full cursor-pointer select-none"
                        onClick={() => toggleProjectFlip(proj.id)}
                      >
                        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                          
                          {/* ============ FRONT SIDE ============ */}
                          <div className="card-front rounded-xl overflow-hidden bg-light-canvas dark:bg-[#0F1116] border border-light-border dark:border-dark-border flex flex-col">
                            {/* Header preview image */}
                            <div className="relative h-28 overflow-hidden bg-slate-950 flex-shrink-0">
                              <img 
                                src={proj.thumbnailUrl} 
                                alt={proj.title} 
                                className="w-full h-full object-cover opacity-85 transition-transform duration-300 hover:scale-105" 
                              />
                              <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-sm text-[9px] text-accent-cyan font-extrabold uppercase py-0.5 px-2 rounded-full border border-accent-cyan/40">
                                Click Flip ❯
                              </div>
                            </div>

                            {/* Info overlay */}
                            <div className="flex-1 p-3.5 flex flex-col justify-between overflow-hidden">
                              <div>
                                <h4 className="font-extrabold text-sm text-light-text dark:text-dark-text truncate tracking-wide">{proj.title}</h4>
                                <p className="text-[10px] text-light-muted dark:text-dark-muted line-clamp-2 mt-1 font-normal leading-snug">
                                  {proj.keyFeatures[0] || 'High performance tech portfolio project.'}
                                </p>
                              </div>

                              <div className="space-y-2 border-t border-light-border dark:border-dark-border/40 pt-2 flex-shrink-0">
                                {/* Tech tags */}
                                <div className="flex space-x-1 overflow-x-auto no-scrollbar whitespace-nowrap">
                                  {proj.techTags.map((tag) => (
                                    <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-accent-cyan">
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                {/* Actions buttons */}
                                <div className="flex justify-between items-center text-[10px] pt-1" onClick={(e) => e.stopPropagation()}>
                                  <a 
                                    href={proj.githubUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="flex items-center space-x-1 text-light-muted dark:text-dark-muted hover:text-accent-cyan font-bold"
                                  >
                                    <GithubIcon className="w-3.5 h-3.5" />
                                    <span>[ CODE ]</span>
                                  </a>
                                  <a 
                                    href={proj.liveDemoUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="flex items-center space-x-1 text-accent-cyan font-extrabold"
                                  >
                                    <ExternalLink size={12} />
                                    <span>[ LIVE DEMO ]</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ============ BACK SIDE (Flipped) ============ */}
                          <div className="card-back rounded-xl p-4 bg-light-canvas dark:bg-[#0D1015] border border-accent-cyan flex flex-col justify-between">
                            <div className="overflow-hidden">
                              <div className="flex justify-between items-center border-b border-light-border dark:border-dark-border/50 pb-1.5 mb-2">
                                <span className="text-[10px] font-extrabold text-accent-cyan uppercase tracking-wider">Checkout Key Features</span>
                                <span className="text-[9px] text-light-muted dark:text-dark-muted font-mono">Flip back ⟲</span>
                              </div>

                              <ul className="space-y-1.5 overflow-y-auto max-h-[140px] custom-scrollbar pr-1">
                                {proj.keyFeatures.map((feat, idx) => (
                                  <li key={idx} className="flex items-start text-[10px] text-light-text dark:text-dark-text font-normal leading-tight">
                                    <CheckCircle size={10} className="text-accent-cyan mr-1.5 mt-0.5 flex-shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* bottom metadata mirror */}
                            <div className="border-t border-light-border dark:border-dark-border/40 pt-2 flex justify-between items-center text-[10px]" onClick={(e) => e.stopPropagation()}>
                              <div className="flex space-x-1.5 truncate max-w-[50%]">
                                {proj.techTags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="text-[8px] font-semibold text-light-muted dark:text-dark-muted">{tag}</span>
                                ))}
                              </div>
                              <div className="flex space-x-3 flex-shrink-0">
                                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-0.5 font-bold hover:text-accent-cyan text-light-muted dark:text-dark-muted">
                                  <GithubIcon className="w-3 h-3" />
                                  <span>Code</span>
                                </a>
                                <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-0.5 font-extrabold text-accent-cyan">
                                  <ExternalLink size={11} />
                                  <span>Live</span>
                                </a>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Work Experience & Timeline */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-accent-cyan uppercase tracking-wider flex items-center">
                <Briefcase size={16} className="mr-1.5" /> Professional Steps & Timeline
              </h3>

              {data.experiences.length === 0 ? (
                <div className="text-sm text-light-muted dark:text-dark-muted italic">No experiences logged yet. Open Edit Mode to append items.</div>
              ) : (
                <div className="relative border-l border-light-border dark:border-dark-border pl-6 ml-3 space-y-8 select-none">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="relative">
                      {/* Bullet tracker node */}
                      <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent-cyan bg-light-card dark:bg-dark-card flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      </span>

                      {/* Header details */}
                      <div className="mb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="font-extrabold text-sm text-light-text dark:text-dark-text tracking-wide">
                            {exp.designation}
                          </h4>
                          <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest sm:mt-0 mt-0.5">
                            {exp.dateRange}
                          </span>
                        </div>
                        <span className="block text-xs font-semibold text-light-muted dark:text-dark-muted">{exp.company}</span>
                      </div>

                      {/* Bullet achievements */}
                      <ul className="space-y-1.5 mt-2.5">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start text-xs text-light-text dark:text-dark-text font-normal leading-relaxed">
                            <span className="text-accent-cyan font-bold mr-2">»</span>
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

          {/* TAB 5: Contribution Heatmap */}
          {activeTab === 'heatmap' && (
            <div className="space-y-6">
              
              {/* Heatmap header controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-light-border dark:border-dark-border pb-3 flex-shrink-0">
                <h3 className="text-base font-bold text-accent-cyan uppercase tracking-wider flex items-center">
                  <Calendar size={16} className="mr-1.5" /> Contribution Activity Graph
                </h3>

                {/* Platforms switch */}
                <div className="flex items-center space-x-1.5 bg-light-canvas dark:bg-dark-canvas p-1 rounded-xl border border-light-border dark:border-dark-border select-none">
                  <button
                    onClick={() => setHeatmapPlatform('github')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 transition ${
                      heatmapPlatform === 'github'
                        ? 'bg-emerald-500 text-white font-extrabold shadow'
                        : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                    }`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>[ GitHub ]</span>
                  </button>
                  <button
                    onClick={() => setHeatmapPlatform('leetcode')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 transition ${
                      heatmapPlatform === 'leetcode'
                        ? 'bg-orange-500 text-white font-extrabold shadow'
                        : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                    }`}
                  >
                    <LeetcodeIcon className="w-3.5 h-3.5" />
                    <span>[ LeetCode ]</span>
                  </button>
                </div>
              </div>

              {/* Year Selectors & total summary stats */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-light-muted dark:text-dark-muted font-bold uppercase tracking-widest">Select Year:</span>
                  {[2024, 2025, 2026].map(y => (
                    <button
                      key={y}
                      onClick={() => setHeatmapYear(y as any)}
                      className={`px-2 py-0.5 text-xs font-bold rounded ${
                        heatmapYear === y
                          ? 'bg-accent-cyan/15 border border-accent-cyan text-accent-cyan font-mono'
                          : 'border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:border-accent-cyan/40 hover:text-light-text'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-light-muted dark:text-dark-muted font-mono font-semibold">
                  <TrendingUp size={12} className="text-accent-cyan" />
                  <span>TOTAL: {totalContributions} submissions for {heatmapPlatform === 'github' ? data.heatmap.githubUsername : data.heatmap.leetcodeUsername}</span>
                </div>
              </div>

              {/* Heatmap Grid Cell renderer */}
              <div className="bg-light-canvas dark:bg-[#0D1015] p-4 rounded-xl border border-light-border dark:border-dark-border overflow-x-auto custom-scrollbar no-scrollbar">
                <div className="flex space-x-1 min-w-[500px]">
                  
                  {/* Generate 53 columns representing weeks */}
                  {Array.from({ length: 53 }).map((_, colIdx) => (
                    <div key={colIdx} className="flex flex-col space-y-1">
                      {Array.from({ length: 7 }).map((_, rowIdx) => {
                        const cellIdx = colIdx * 7 + rowIdx;
                        const cell = heatmapCells[cellIdx] || { intensity: 0, count: 0 };
                        
                        // Select colors
                        let colorClass = 'bg-light-border dark:bg-dark-border/40';
                        if (heatmapPlatform === 'github') {
                          // GitHub Green intensity
                          colorClass = [
                            'bg-light-border dark:bg-[#1A1F29]/40',
                            'bg-emerald-950/60 dark:bg-emerald-900/30 text-emerald-500 border border-emerald-900/20',
                            'bg-emerald-800/80 dark:bg-emerald-800/50',
                            'bg-emerald-600 dark:bg-emerald-600',
                            'bg-emerald-400 dark:bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.3)]'
                          ][cell.intensity];
                        } else {
                          // LeetCode Orange intensity
                          colorClass = [
                            'bg-light-border dark:bg-[#1A1F29]/40',
                            'bg-orange-950/60 dark:bg-orange-900/30 text-orange-500 border border-orange-900/20',
                            'bg-orange-855/80 dark:bg-orange-800/50',
                            'bg-orange-600 dark:bg-orange-600',
                            'bg-orange-400 dark:bg-orange-400 shadow-[0_0_4px_rgba(251,146,60,0.3)]'
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

              {/* Stats Legend bar */}
              <div className="flex justify-between items-center border-t border-light-border dark:border-dark-border/50 pt-3 text-[10px] text-light-muted dark:text-dark-muted select-none">
                <span>Grid matches platform activity</span>
                <div className="flex items-center space-x-1 font-semibold uppercase tracking-wider font-mono">
                  <span>Less</span>
                  <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-[#1A1F29]/40' : 'bg-[#1A1F29]/40'}`} />
                  <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-900/50' : 'bg-orange-900/50'}`} />
                  <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-700/80' : 'bg-orange-700/80'}`} />
                  <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                  <span className={`w-2.5 h-2.5 rounded-sm ${heatmapPlatform === 'github' ? 'bg-emerald-400 shadow-glow-cyan' : 'bg-orange-400 shadow-[0_0_6px_#fb923c]'}`} />
                  <span>More</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: Certifications & achievements */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-accent-cyan uppercase tracking-wider flex items-center">
                <Award size={16} className="mr-1.5" /> Certified Badges & Verification
              </h3>

              {data.certifications.length === 0 ? (
                <div className="text-sm text-light-muted dark:text-dark-muted italic">No certifications listed. Open Edit mode to add some achievements.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.certifications.map((cert) => (
                    <div 
                      key={cert.id}
                      onClick={() => setActiveCertModal(cert)}
                      className="group p-4 bg-light-canvas dark:bg-[#0F1116] rounded-xl border border-light-border dark:border-dark-border hover:border-accent-cyan transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border border-light-border dark:border-dark-border ${
                          cert.imagePreset === 'aws' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                          cert.imagePreset === 'google' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                          cert.imagePreset === 'meta' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                          'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20'
                        }`}>
                          {cert.imagePreset === 'aws' ? 'A' :
                           cert.imagePreset === 'google' ? 'G' :
                           cert.imagePreset === 'meta' ? 'M' : '★'}
                        </div>
                        <span className="text-[10px] text-light-muted dark:text-dark-muted font-mono">{cert.issueDate}</span>
                      </div>

                      <div className="mt-2">
                        <h4 className="font-bold text-xs text-light-text dark:text-dark-text tracking-wide truncate group-hover:text-accent-cyan transition">{cert.name}</h4>
                        <span className="block text-[10px] text-light-muted dark:text-dark-muted font-medium">{cert.issuer}</span>
                      </div>

                      <div className="mt-3 flex justify-between items-center text-[10px] border-t border-light-border dark:border-dark-border/40 pt-2 text-light-muted dark:text-dark-muted font-semibold">
                        <span className="flex items-center text-accent-cyan font-extrabold uppercase tracking-wide">
                          <Eye size={11} className="mr-1" /> View Creds
                        </span>
                        <a 
                          href={cert.verificationUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="hover:text-accent-cyan flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Verify <ExternalLink size={10} className="ml-1" />
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

      {/* ================= CERTIFICATE VERIFICATION PREVIEW MODAL ================= */}
      {activeCertModal && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setActiveCertModal(null)}
        >
          <div 
            className="w-full max-w-md bg-light-card dark:bg-dark-card border-2 border-accent-cyan rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 select-none">
              <button 
                onClick={() => setActiveCertModal(null)}
                className="text-light-muted dark:text-dark-muted hover:text-rose-500 font-bold border border-light-border dark:border-dark-border/50 px-2.5 py-0.5 rounded text-xs"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="text-center space-y-4 pt-4">
              <div className="flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border ${
                  activeCertModal.imagePreset === 'aws' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                  activeCertModal.imagePreset === 'google' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  activeCertModal.imagePreset === 'meta' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                  'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20'
                }`}>
                  {activeCertModal.imagePreset === 'aws' ? 'AWS' :
                   activeCertModal.imagePreset === 'google' ? 'GCP' :
                   activeCertModal.imagePreset === 'meta' ? 'META' : 'CERT'}
                </div>
              </div>

              <div className="border-y border-light-border dark:border-dark-border/50 py-3">
                <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest">Digital Developer Achievement</span>
                <h4 className="text-lg font-extrabold text-light-text dark:text-dark-text tracking-wide mt-1">{activeCertModal.name}</h4>
                <p className="text-xs text-light-muted dark:text-dark-muted font-semibold mt-1">Issued by {activeCertModal.issuer}</p>
              </div>

              <div className="flex justify-between items-center text-xs text-light-muted dark:text-dark-muted font-mono border-b border-light-border dark:border-dark-border/40 pb-3">
                <span>Issue Date: {activeCertModal.issueDate}</span>
                <span>Credential Status: VERIFIED ✓</span>
              </div>

              <div className="pt-2">
                <a 
                  href={activeCertModal.verificationUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-accent-cyan text-slate-900 font-extrabold text-xs uppercase tracking-widest py-2.5 rounded-xl hover:bg-accent-cyan/90 transition shadow-glow-cyan"
                >
                  <span>Launch External Verification Link</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
