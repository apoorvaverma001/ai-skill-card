import React, { useState } from 'react';
import type { PortfolioData, Skill, Project, Experience, Certification } from '../types';
import { 
  User, Link, Cpu, FolderGit2, CalendarRange, Plus, Trash2, 
  ChevronRight, ChevronLeft, Award
} from 'lucide-react';

interface StepperFormProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const PRESET_AVATARS = [
  { name: 'Cyberpunk Neon', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=250&auto=format&fit=crop&q=80' },
  { name: 'Sleek Tech', url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=250&auto=format&fit=crop&q=80' },
  { name: 'Digital Minimalist', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=250&auto=format&fit=crop&q=80' },
  { name: 'Retro Arcade', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=250&auto=format&fit=crop&q=80' }
];

export const StepperForm: React.FC<StepperFormProps> = ({ data, onChange }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Helper to update specific sub-state
  const updateProfile = (fields: Partial<typeof data.profile>) => {
    onChange({
      ...data,
      profile: { ...data.profile, ...fields }
    });
  };

  const updateSocials = (fields: Partial<typeof data.socials>) => {
    onChange({
      ...data,
      socials: { ...data.socials, ...fields }
    });
  };

  const updateHeatmap = (fields: Partial<typeof data.heatmap>) => {
    onChange({
      ...data,
      heatmap: { ...data.heatmap, ...fields }
    });
  };

  // Step 3: Skills State & Helpers
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState<'frontend' | 'backend' | 'devops' | 'database' | 'other'>('frontend');
  const [newSkillProf, setNewSkillProf] = useState(80);
  const [newSkillNote, setNewSkillNote] = useState('');

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      id: 's_' + Date.now(),
      name: newSkillName.trim(),
      category: newSkillCat,
      proficiency: newSkillProf,
      usageNote: newSkillNote.trim() || 'General usage',
      iconName: newSkillCat === 'frontend' ? 'React' : newSkillCat === 'backend' ? 'Server' : 'Database'
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
    setNewSkillName('');
    setNewSkillNote('');
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  // Step 4: Projects State & Helpers
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjThumb, setNewProjThumb] = useState('');
  const [newProjTags, setNewProjTags] = useState('');
  const [newProjGithub, setNewProjGithub] = useState('');
  const [newProjLive, setNewProjLive] = useState('');
  const [newProjFeatures, setNewProjFeatures] = useState('');

  const addProject = () => {
    if (!newProjTitle.trim()) return;
    const bulletPoints = newProjFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const newProject: Project = {
      id: 'p_' + Date.now(),
      title: newProjTitle.trim(),
      thumbnailUrl: newProjThumb.trim() || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=80',
      techTags: newProjTags.split(',').map(t => t.trim()).filter(t => t.length > 0),
      githubUrl: newProjGithub.trim() || '#',
      liveDemoUrl: newProjLive.trim() || '#',
      keyFeatures: bulletPoints.length > 0 ? bulletPoints : ['Built high-performance interface', 'Clean architectural layout']
    };
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
    setNewProjTitle('');
    setNewProjThumb('');
    setNewProjTags('');
    setNewProjGithub('');
    setNewProjLive('');
    setNewProjFeatures('');
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  // Step 5: Experiences State & Helpers
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpDesignation, setNewExpDesignation] = useState('');
  const [newExpRange, setNewExpRange] = useState('');
  const [newExpAchievements, setNewExpAchievements] = useState('');

  const addExperience = () => {
    if (!newExpCompany.trim() || !newExpDesignation.trim()) return;
    const achievements = newExpAchievements
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    const newExp: Experience = {
      id: 'e_' + Date.now(),
      company: newExpCompany.trim(),
      designation: newExpDesignation.trim(),
      dateRange: newExpRange.trim() || '2025 - Present',
      achievements: achievements.length > 0 ? achievements : ['Handled client UI components development.']
    };
    onChange({
      ...data,
      experiences: [...data.experiences, newExp]
    });
    setNewExpCompany('');
    setNewExpDesignation('');
    setNewExpRange('');
    setNewExpAchievements('');
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(e => e.id !== id)
    });
  };

  // Step 5: Certifications State & Helpers
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [newCertPreset, setNewCertPreset] = useState<'aws' | 'google' | 'meta' | 'other'>('aws');

  const addCertification = () => {
    if (!newCertName.trim() || !newCertIssuer.trim()) return;
    const newCert: Certification = {
      id: 'c_' + Date.now(),
      name: newCertName.trim(),
      issuer: newCertIssuer.trim(),
      issueDate: newCertDate.trim() || '2026-01',
      verificationUrl: newCertUrl.trim() || '#',
      imagePreset: newCertPreset
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertDate('');
    setNewCertUrl('');
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(c => c.id !== id)
    });
  };

  const stepsList = [
    { num: 1, label: 'ID Info', icon: User },
    { num: 2, label: 'Socials', icon: Link },
    { num: 3, label: 'Skills', icon: Cpu },
    { num: 4, label: 'Projects', icon: FolderGit2 },
    { num: 5, label: 'Timeline & Graphs', icon: CalendarRange }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] overflow-hidden">
      
      {/* 5-Step Stepper Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border select-none">
        <div className="flex items-center space-x-2 md:space-x-4 w-full justify-around">
          {stepsList.map(step => {
            const StepIcon = step.icon;
            const isActive = step.num === currentStep;
            const isCompleted = step.num < currentStep;

            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className="flex flex-col items-center focus:outline-none transition group"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  isActive 
                    ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-glow-cyan' 
                    : isCompleted 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' 
                      : 'border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted group-hover:border-accent-cyan/50'
                }`}>
                  <StepIcon size={16} />
                </div>
                <span className={`text-[10px] md:text-xs mt-1 font-medium transition ${
                  isActive 
                    ? 'text-accent-cyan' 
                    : isCompleted 
                      ? 'text-emerald-500' 
                      : 'text-light-muted dark:text-dark-muted group-hover:text-light-text dark:group-hover:text-dark-text'
                }`}>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepper Body (Scrollable interior) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-light-canvas dark:bg-dark-canvas">
        
        {/* STEP 1: ID Card Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
              <User className="mr-2 text-accent-cyan" size={20} /> Personal ID Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Job Title</label>
                <input
                  type="text"
                  value={data.profile.jobTitle}
                  onChange={(e) => updateProfile({ jobTitle: e.target.value })}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Gender</label>
                <select
                  value={data.profile.gender}
                  onChange={(e) => updateProfile({ gender: e.target.value as any })}
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-Binary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Years of Experience</label>
                <input
                  type="text"
                  value={data.profile.experience}
                  onChange={(e) => updateProfile({ experience: e.target.value })}
                  placeholder="e.g. 6+ Years Exp."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Current Company</label>
                <input
                  type="text"
                  value={data.profile.company}
                  onChange={(e) => updateProfile({ company: e.target.value })}
                  placeholder="e.g. Vortex Labs"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Company Logo Symbol/Emoji</label>
                <input
                  type="text"
                  value={data.profile.companyLogoUrl}
                  onChange={(e) => updateProfile({ companyLogoUrl: e.target.value })}
                  placeholder="e.g. ⚡ or emoji or URL"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={data.profile.email}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                  placeholder="e.g. alex@vortex.io"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Phone Number</label>
                <input
                  type="text"
                  value={data.profile.phone}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                  placeholder="e.g. +1 (555) 019-2831"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Current Location</label>
                <input
                  type="text"
                  value={data.profile.location}
                  onChange={(e) => updateProfile({ location: e.target.value })}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Profile Photo URL</label>
                <input
                  type="text"
                  value={data.profile.avatarUrl}
                  onChange={(e) => updateProfile({ avatarUrl: e.target.value, avatarPreset: 'custom' })}
                  placeholder="Paste direct image link..."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>
            </div>

            {/* Profile Avatar Presets Selection */}
            <div>
              <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-2 uppercase tracking-wider">Or Select Preset Abstract Portrait Avatar</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      updateProfile({
                        avatarUrl: preset.url,
                        avatarPreset: preset.name
                      });
                    }}
                    className={`flex items-center space-x-2 p-2 rounded border text-left transition ${
                      data.profile.avatarUrl === preset.url
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-glow-cyan'
                        : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted hover:border-accent-cyan/40'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-8 h-8 rounded-full object-cover border border-light-border dark:border-dark-border" />
                    <span className="text-[10px] md:text-xs leading-tight font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Bio / Personal Intro Summary</label>
              <textarea
                value={data.profile.bio}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                placeholder="A short punchy intro of yourself..."
                rows={3}
                className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Social Links & Resume */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
              <Link className="mr-2 text-accent-cyan" size={20} /> Social Handles & Resume
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">GitHub URL</label>
                <input
                  type="text"
                  value={data.socials.github}
                  onChange={(e) => updateSocials({ github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.socials.linkedin}
                  onChange={(e) => updateSocials({ linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">LeetCode Profile URL</label>
                <input
                  type="text"
                  value={data.socials.leetcode}
                  onChange={(e) => updateSocials({ leetcode: e.target.value })}
                  placeholder="https://leetcode.com/..."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">X (Twitter) URL</label>
                <input
                  type="text"
                  value={data.socials.twitter}
                  onChange={(e) => updateSocials({ twitter: e.target.value })}
                  placeholder="https://x.com/..."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Discord Handle/Invite</label>
                <input
                  type="text"
                  value={data.socials.discord}
                  onChange={(e) => updateSocials({ discord: e.target.value })}
                  placeholder="Username or invite link..."
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Gmail Contact</label>
                <input
                  type="text"
                  value={data.socials.gmail}
                  onChange={(e) => updateSocials({ gmail: e.target.value })}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Resume PDF / Download link</label>
                <input
                  type="text"
                  value={data.socials.resumeUrl}
                  onChange={(e) => updateSocials({ resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/... or other cloud storage link"
                  className="w-full text-sm px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Skills & Technologies */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
              <Cpu className="mr-2 text-accent-cyan" size={20} /> Skills & Technologies
            </h3>

            {/* Current Skills list */}
            <div className="p-3 bg-light-card dark:bg-dark-card rounded border border-light-border dark:border-dark-border">
              <span className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">Currently Added Skills ({data.skills.length})</span>
              {data.skills.length === 0 ? (
                <div className="text-sm text-light-muted dark:text-dark-muted italic py-2">No skills added yet. Add some below.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="flex items-center space-x-2 bg-light-canvas dark:bg-dark-canvas px-3 py-1.5 rounded border border-light-border dark:border-dark-border group transition hover:border-rose-500"
                    >
                      <span className="text-xs font-semibold text-light-text dark:text-dark-text">{skill.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan font-bold">{skill.proficiency}%</span>
                      <button 
                        type="button" 
                        onClick={() => removeSkill(skill.id)} 
                        className="text-light-muted dark:text-dark-muted hover:text-rose-500 focus:outline-none"
                        title="Remove Skill"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add new skill form */}
            <div className="bg-light-card dark:bg-dark-card p-4 rounded border border-light-border dark:border-dark-border space-y-4">
              <span className="block text-xs font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Add New Technology Skill</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Technology Name</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Next.js, Docker, Python"
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Category</label>
                  <select
                    value={newSkillCat}
                    onChange={(e) => setNewSkillCat(e.target.value as any)}
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  >
                    <option value="frontend">Frontend / Client</option>
                    <option value="backend">Backend / Logic</option>
                    <option value="database">Database / Storage</option>
                    <option value="devops">DevOps / Cloud</option>
                    <option value="other">Other / Tools</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider flex justify-between">
                    <span>Proficiency Level</span>
                    <span className="text-accent-cyan font-bold">{newSkillProf}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={newSkillProf}
                    onChange={(e) => setNewSkillProf(parseInt(e.target.value))}
                    className="w-full h-1 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Brief Usage Note (Tooltip details)</label>
                  <input
                    type="text"
                    value={newSkillNote}
                    onChange={(e) => setNewSkillNote(e.target.value)}
                    placeholder="e.g. Building static exports and SSR dynamic queries."
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addSkill}
                className="flex items-center justify-center space-x-2 bg-accent-cyan text-slate-900 font-semibold px-4 py-2 rounded text-sm hover:bg-accent-cyan/90 transition shadow-glow-cyan"
              >
                <Plus size={16} />
                <span>Add Skill Tag</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Projects (Flip Card Builder) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
              <FolderGit2 className="mr-2 text-accent-cyan" size={20} /> Project Cards Builder
            </h3>

            {/* Current projects list */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">Added Projects ({data.projects.length})</span>
              {data.projects.length === 0 ? (
                <div className="text-sm text-light-muted dark:text-dark-muted italic py-3 text-center bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded">No projects added. Build your first project below.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.projects.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="flex justify-between items-center bg-light-card dark:bg-dark-card p-3 rounded border border-light-border dark:border-dark-border"
                    >
                      <div className="overflow-hidden mr-2">
                        <span className="block text-sm font-semibold text-light-text dark:text-dark-text truncate">{proj.title}</span>
                        <span className="block text-[10px] text-light-muted dark:text-dark-muted truncate">{proj.techTags.join(', ')}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeProject(proj.id)} 
                        className="text-light-muted dark:text-dark-muted hover:text-rose-500 p-1 flex-shrink-0"
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add new project form */}
            <div className="bg-light-card dark:bg-dark-card p-4 rounded border border-light-border dark:border-dark-border space-y-4">
              <span className="block text-xs font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Add New Project Card</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Project Title</label>
                  <input
                    type="text"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. PlacePicker Dashboard"
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Tech Stack Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newProjTags}
                    onChange={(e) => setNewProjTags(e.target.value)}
                    placeholder="e.g. React, Node.js, Cloudinary"
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Thumbnail Image URL</label>
                  <input
                    type="text"
                    value={newProjThumb}
                    onChange={(e) => setNewProjThumb(e.target.value)}
                    placeholder="Paste image URL (or leave blank for placeholder)"
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">GitHub Code URL</label>
                  <input
                    type="text"
                    value={newProjGithub}
                    onChange={(e) => setNewProjGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Live Demo URL</label>
                  <input
                    type="text"
                    value={newProjLive}
                    onChange={(e) => setNewProjLive(e.target.value)}
                    placeholder="https://..."
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider flex items-center">
                    <span>Key Features (Back side bullet points, one per line)</span>
                  </label>
                  <textarea
                    value={newProjFeatures}
                    onChange={(e) => setNewProjFeatures(e.target.value)}
                    placeholder="e.g. JWT-based authentication&#10;Automated Cloudinary asset uploads&#10;Smooth Framer transitions"
                    rows={3}
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addProject}
                className="flex items-center justify-center space-x-2 bg-accent-cyan text-slate-900 font-semibold px-4 py-2 rounded text-sm hover:bg-accent-cyan/90 transition shadow-glow-cyan"
              >
                <Plus size={16} />
                <span>Add Project Card</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Heatmap, Work Experience & Certifications */}
        {currentStep === 5 && (
          <div className="space-y-6">
            
            {/* HEATMAP USERNAMES */}
            <div>
              <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2 mb-4">
                <CalendarRange className="mr-2 text-accent-cyan" size={20} /> Live Contribution Heatmap Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-light-card dark:bg-dark-card p-4 rounded border border-light-border dark:border-dark-border">
                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">GitHub Username</label>
                  <input
                    type="text"
                    value={data.heatmap.githubUsername}
                    onChange={(e) => updateHeatmap({ githubUsername: e.target.value })}
                    placeholder="e.g. alexmercer"
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">LeetCode Username</label>
                  <input
                    type="text"
                    value={data.heatmap.leetcodeUsername}
                    onChange={(e) => updateHeatmap({ leetcodeUsername: e.target.value })}
                    placeholder="e.g. alexmercer"
                    className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                  />
                </div>
              </div>
            </div>

            {/* WORK EXPERIENCES BUILDER */}
            <div>
              <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2 mb-4">
                <CalendarRange className="mr-2 text-accent-cyan" size={20} /> Work Experience Stepper Builder
              </h3>
              
              {/* Existing Exp list */}
              <div className="space-y-2 mb-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center bg-light-card dark:bg-dark-card p-3 rounded border border-light-border dark:border-dark-border">
                    <div>
                      <span className="font-semibold text-sm text-light-text dark:text-dark-text">{exp.designation} at {exp.company}</span>
                      <span className="block text-xs text-light-muted dark:text-dark-muted">{exp.dateRange}</span>
                    </div>
                    <button type="button" onClick={() => removeExperience(exp.id)} className="text-light-muted dark:text-dark-muted hover:text-rose-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Exp form */}
              <div className="bg-light-card dark:bg-dark-card p-4 rounded border border-light-border dark:border-dark-border space-y-4">
                <span className="block text-xs font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Add Experience Stepper Card</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Company Name</label>
                    <input
                      type="text"
                      value={newExpCompany}
                      onChange={(e) => setNewExpCompany(e.target.value)}
                      placeholder="e.g. Vortex Labs"
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Designation / Role</label>
                    <input
                      type="text"
                      value={newExpDesignation}
                      onChange={(e) => setNewExpDesignation(e.target.value)}
                      placeholder="e.g. Senior Frontend Lead"
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Date Range</label>
                    <input
                      type="text"
                      value={newExpRange}
                      onChange={(e) => setNewExpRange(e.target.value)}
                      placeholder="e.g. 2024 - Present"
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Key Achievements (One per line)</label>
                    <textarea
                      value={newExpAchievements}
                      onChange={(e) => setNewExpAchievements(e.target.value)}
                      placeholder="e.g. Led redesign increasing LCP metrics&#10;Managed team of 4 engineers"
                      rows={2}
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center space-x-2 bg-accent-cyan text-slate-900 font-semibold px-4 py-2 rounded text-sm hover:bg-accent-cyan/90 transition shadow-glow-cyan"
                >
                  <Plus size={16} />
                  <span>Add Experience Stepper Card</span>
                </button>
              </div>
            </div>

            {/* CERTIFICATIONS BUILDER */}
            <div>
              <h3 className="text-lg font-semibold flex items-center text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2 mb-4">
                <Award className="mr-2 text-accent-cyan" size={20} /> Verified Achievements & Certifications
              </h3>
              
              {/* Existing Certs list */}
              <div className="space-y-2 mb-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-center bg-light-card dark:bg-dark-card p-3 rounded border border-light-border dark:border-dark-border">
                    <div>
                      <span className="font-semibold text-sm text-light-text dark:text-dark-text">{cert.name}</span>
                      <span className="block text-xs text-light-muted dark:text-dark-muted">{cert.issuer} ({cert.issueDate})</span>
                    </div>
                    <button type="button" onClick={() => removeCertification(cert.id)} className="text-light-muted dark:text-dark-muted hover:text-rose-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Cert form */}
              <div className="bg-light-card dark:bg-dark-card p-4 rounded border border-light-border dark:border-dark-border space-y-4">
                <span className="block text-xs font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Add Certification Entry</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Certification Name</label>
                    <input
                      type="text"
                      value={newCertName}
                      onChange={(e) => setNewCertName(e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Issuer</label>
                    <input
                      type="text"
                      value={newCertIssuer}
                      onChange={(e) => setNewCertIssuer(e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Issue Date</label>
                    <input
                      type="text"
                      value={newCertDate}
                      onChange={(e) => setNewCertDate(e.target.value)}
                      placeholder="e.g. 2026-05"
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Verification Link</label>
                    <input
                      type="text"
                      value={newCertUrl}
                      onChange={(e) => setNewCertUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-sm px-3 py-2 bg-light-canvas dark:bg-dark-canvas border border-light-border dark:border-dark-border rounded focus:outline-none focus:border-accent-cyan dark:text-dark-text text-light-text"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-light-text dark:text-dark-text mb-1 uppercase tracking-wider">Brand Icon Preset</label>
                    <div className="flex gap-4">
                      {['aws', 'google', 'meta', 'other'].map((p) => (
                        <label key={p} className="flex items-center space-x-2 cursor-pointer text-sm text-light-text dark:text-dark-text uppercase font-semibold">
                          <input 
                            type="radio" 
                            name="certPreset" 
                            value={p}
                            checked={newCertPreset === p}
                            onChange={() => setNewCertPreset(p as any)}
                            className="accent-accent-cyan"
                          />
                          <span>{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addCertification}
                  className="flex items-center space-x-2 bg-accent-cyan text-slate-900 font-semibold px-4 py-2 rounded text-sm hover:bg-accent-cyan/90 transition shadow-glow-cyan"
                >
                  <Plus size={16} />
                  <span>Add Certification</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stepper Footer Controls */}
      <div className="px-4 py-3 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border flex justify-between select-none">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(prev => prev - 1)}
          className={`flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded border border-light-border dark:border-dark-border hover:bg-light-canvas dark:hover:bg-dark-canvas transition ${
            currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'text-light-text dark:text-dark-text'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <span className="text-xs text-light-muted dark:text-dark-muted font-mono flex items-center">
          Step {currentStep} of 5
        </span>

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider bg-accent-cyan text-slate-900 px-4 py-2 rounded hover:bg-accent-cyan/90 transition shadow-glow-cyan"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="flex items-center text-xs text-emerald-500 font-bold uppercase tracking-widest px-4 py-2 border border-emerald-500/20 bg-emerald-500/10 rounded">
            ✨ Form Ready
          </div>
        )}
      </div>
    </div>
  );
};
