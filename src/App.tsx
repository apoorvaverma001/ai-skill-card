import { useState, useEffect, useRef } from 'react';
import type { PortfolioData } from './types';
import { defaultPortfolioData } from './mockData';
import { apoorvaPortfolioData } from './data/apoorvaData';
import { StepperForm } from './components/StepperForm';
import { LivePortfolio } from './components/LivePortfolio';
import {
  Save, Download, Upload, RotateCcw,
  Sun, Moon, Terminal, Check, AlertCircle, X,
  ChevronLeft, Home, Key
} from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  // 1. Unified Portfolio State (User Editable Data)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_builder_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local portfolio data, reverting to defaults", e);
      }
    }
    return defaultPortfolioData;
  });

  // 2. View Routing State ('landing' | 'login' | 'builder')
  const [view, setView] = useState<'landing' | 'login' | 'builder'>('landing');

  // 3. Wizard Step State
  const [currentStep, setCurrentStep] = useState(1);

  // 4. Theme Toggle State ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') return 'light';
    return 'dark'; // default to cyberpunk dark mode
  });

  // 5. Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync theme changes with DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Show floating toast alert helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // ACTION: Save Form to LocalStorage
  const handleSave = () => {
    try {
      localStorage.setItem('portfolio_builder_data', JSON.stringify(portfolioData));
      showToast("Portfolio data synchronized successfully!", "success");
    } catch (e) {
      console.error(e);
      showToast("Failed to write to LocalStorage.", "error");
    }
  };

  // ACTION: Export JSON
  const handleExportJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${portfolioData.profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio_data.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Portfolio JSON data exported successfully.", "success");
    } catch (e) {
      console.error(e);
      showToast("Failed to export JSON file.", "error");
    }
  };

  // ACTION: Import JSON (Hidden input trigger)
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (parsed && parsed.profile && parsed.socials && Array.isArray(parsed.skills)) {
          setPortfolioData(parsed);
          localStorage.setItem('portfolio_builder_data', JSON.stringify(parsed));
          showToast("Portfolio JSON imported and saved successfully!", "success");
        } else {
          showToast("Invalid JSON schema. Make sure it contains profile, socials, and skills.", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Error parsing file. Invalid JSON data.", "error");
      }
    };
    fileReader.readAsText(files[0]);
    e.target.value = '';
  };

  // ACTION: Reset Form Defaults
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to restore default developer data? This will clear current changes.")) {
      setPortfolioData(defaultPortfolioData);
      localStorage.setItem('portfolio_builder_data', JSON.stringify(defaultPortfolioData));
      showToast("Portfolio restored to defaults.", "info");
    }
  };

  // Navigation Back Action
  const handleBack = () => {
    if (view === 'login') {
      setView('landing');
    } else if (view === 'builder') {
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
      } else {
        setView('login');
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-light-canvas dark:bg-dark-canvas text-light-text dark:text-dark-text transition-colors duration-300">

      {/* ================= HEADER NAVIGATION BAR ================= */}
      <header className="flex-shrink-0 flex items-center justify-between p-3.5 bg-light-card dark:bg-[#12141A] border-b border-light-border dark:border-[#1A1D26] select-none gap-3">

        {/* Left Home / Branding */}
        <button
          onClick={() => setView('landing')}
          className="flex items-center space-x-2.5 text-left focus:outline-none"
        >
          {/* <div className="p-1.5 bg-[#00D2C2]/15 rounded-lg border border-[#00D2C2]/30 text-[#00D2C2] shadow-[0_0_10px_rgba(0,210,194,0.25)]">
            <Terminal size={18} />
          </div> */}
          <div>
            <h1 className="text-sm font-extrabold uppercase tracking-widest text-light-text dark:text-white leading-none">
              Apoorva Verma
            </h1>
            {/* Verified Badge */}
            <div className="mt-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)] flex items-center gap-1 select-none">
              <span>[ Verified Profile ✅ ]</span>
            </div>
          </div>
        </button>

        {/* Right Navigation & Toolbar controls */}
        <div className="flex items-center space-x-3.5">

          {/* Stepper Wizard / Login Navigation Controls */}
          {view !== 'landing' && (
            <div className="flex items-center space-x-2 border-r border-light-border dark:border-[#1A1D26] pr-3.5">
              <button
                onClick={handleBack}
                className="px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-light-card dark:bg-slate-900 border border-light-border dark:border-[#1A1D26] text-light-text dark:text-slate-300 hover:text-white hover:border-[#00D2C2]/50 transition flex items-center gap-1 focus:outline-none"
              >
                <ChevronLeft size={13} />
                <span>Back</span>
              </button>
              <button
                onClick={() => setView('landing')}
                className="px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-light-card dark:bg-slate-900 border border-light-border dark:border-[#1A1D26] text-light-text dark:text-slate-300 hover:text-white hover:border-[#00D2C2]/50 transition flex items-center gap-1 focus:outline-none"
              >
                <Home size={13} />
                <span>Home</span>
              </button>
            </div>
          )}

          {/* Form Quick Builder Controls (Only visible inside Wizard) */}
          {view === 'builder' && (
            <div className="hidden sm:flex items-center space-x-2 border-r border-light-border dark:border-[#1A1D26] pr-3.5">
              {/* Save */}
              <button
                onClick={handleSave}
                className="p-2 rounded-lg border border-light-border dark:border-[#1A1D26] bg-light-card dark:bg-[#12141A] hover:border-[#00D2C2] text-light-muted dark:text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                title="Save form changes"
              >
                <Save size={13} className="text-[#00D2C2]" />
                <span>Save</span>
              </button>

              {/* Export */}
              <button
                onClick={handleExportJSON}
                className="p-2 rounded-lg border border-light-border dark:border-[#1A1D26] bg-light-card dark:bg-[#12141A] hover:border-[#00D2C2] text-light-muted dark:text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                title="Export Profile data JSON"
              >
                <Download size={13} />
                <span>Export</span>
              </button>

              {/* Import */}
              <button
                onClick={handleImportClick}
                className="p-2 rounded-lg border border-light-border dark:border-[#1A1D26] bg-light-card dark:bg-[#12141A] hover:border-[#00D2C2] text-light-muted dark:text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                title="Import Profile data JSON"
              >
                <Upload size={13} />
                <span>Import</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                accept=".json"
                className="hidden"
              />

              {/* Reset */}
              <button
                onClick={handleResetDefaults}
                className="p-2 rounded-lg border border-light-border dark:border-[#1A1D26] bg-light-card dark:bg-[#12141A] hover:border-rose-500 text-light-muted dark:text-slate-400 hover:text-rose-500 transition flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                title="Reset builder to default layout"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          )}

          {/* Theme Toggler */}
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg border border-light-border dark:border-[#1A1D26] bg-light-card dark:bg-[#12141A] hover:border-[#00D2C2] text-light-muted dark:text-slate-400 hover:text-white transition focus:outline-none"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

        </div>
      </header>

      {/* ================= CORE DISPLAY AREA (Locked viewport height) ================= */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 bg-light-canvas dark:bg-[#090A0F] select-text">
        {view === 'landing' && (
          <LivePortfolio data={apoorvaPortfolioData} theme={theme} onStartEdit={() => setView('login')} />
        )}
        {view === 'login' && (
          <LoginPage onLoginSuccess={() => setView('builder')} />
        )}
        {view === 'builder' && (
          <StepperForm
            data={portfolioData}
            onChange={setPortfolioData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </main>

      {/* ================= FLOATING TOAST NOTIFIER (Cyberpunk UI alerts) ================= */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none select-none max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start space-x-2.5 p-3 rounded-xl border shadow-lg transition duration-300 animate-slide-in ${t.type === 'success'
                ? 'bg-slate-900 border-[#00D2C2] text-[#00D2C2] shadow-[0_0_12px_rgba(0,210,194,0.2)]'
                : t.type === 'error'
                  ? 'bg-slate-900 border-rose-500 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                  : 'bg-slate-900 border-sky-400 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
              }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {t.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            </div>
            <div className="flex-1 text-xs font-semibold leading-snug">
              {t.message}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-500 hover:text-white transition flex-shrink-0 focus:outline-none"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

// Inline Sub-component: Polished Glassmorphic Authentication Gate Page
const LoginPage = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 850);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-light-canvas dark:bg-[#090A0F]">
      <div className="w-full max-w-md bg-light-card dark:bg-[#12141A] border border-light-border dark:border-[#1A1D26] rounded-2xl p-6 md:p-8 shadow-2xl relative">

        {/* Glow accent corners */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2C2]/50 to-transparent" />

        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-[#00D2C2]/10 rounded-full text-[#00D2C2] mb-3">
            <Key size={20} />
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-light-text dark:text-white tracking-wider uppercase">
            Authentication Gate
          </h2>
          <p className="text-xs text-light-muted dark:text-slate-400 mt-1.5 font-medium leading-relaxed">
            Verify identity to generate your personalized developer SkillCard
          </p>
        </div>

        {/* Google sign-in wrapper */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-light-card dark:bg-slate-900 border border-light-border dark:border-[#1A1D26] hover:border-[#00D2C2]/60 text-light-text dark:text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition duration-200 focus:outline-none"
        >
          <svg className="w-4 h-4 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span>Sign In with Google</span>
        </button>

        <div className="flex items-center my-5 select-none">
          <div className="flex-1 border-t border-light-border dark:border-[#1A1D26]" />
          <span className="text-[10px] text-light-muted dark:text-slate-500 uppercase px-3 font-mono font-bold tracking-widest">or</span>
          <div className="flex-1 border-t border-light-border dark:border-[#1A1D26]" />
        </div>

        {/* Email Form fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-light-muted dark:text-slate-400 mb-1.5 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full text-xs px-3.5 py-2.5 bg-light-card dark:bg-slate-900 border border-light-border dark:border-[#1A1D26] rounded-xl focus:outline-none focus:border-[#00D2C2] text-light-text dark:text-white placeholder-slate-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-light-muted dark:text-slate-400 mb-1.5 uppercase tracking-widest">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs px-3.5 py-2.5 bg-light-card dark:bg-slate-900 border border-light-border dark:border-[#1A1D26] rounded-xl focus:outline-none focus:border-[#00D2C2] text-light-text dark:text-white placeholder-slate-500 font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00D2C2] text-slate-900 font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-[#00D2C2]/90 hover:scale-[1.01] transition-all shadow-[0_0_15px_rgba(0,210,194,0.25)] flex items-center justify-center focus:outline-none"
          >
            {loading ? 'Validating credentials...' : 'Sign In with Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
