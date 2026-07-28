import { useState, useEffect, useRef } from 'react';
import type { PortfolioData } from './types';
import { defaultPortfolioData } from './mockData';
import { StepperForm } from './components/StepperForm';
import { LivePortfolio } from './components/LivePortfolio';
import { 
  Edit3, Eye, Save, Download, Upload, RotateCcw, 
  Sun, Moon, Terminal, Check, AlertCircle, X 
} from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  // 1. Unified Portfolio State
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

  // 2. View vs Edit Mode ('view' | 'edit')
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  // 3. Theme Toggle State ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') return 'light';
    // Default to dark mode for our cyber aesthetics
    return 'dark';
  });

  // 4. Toast Notification list
  const [toasts, setToasts] = useState<Toast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync theme changes with DOM documentElement
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
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // ACTION: Save explicitly to LocalStorage
  const handleSave = () => {
    try {
      localStorage.setItem('portfolio_builder_data', JSON.stringify(portfolioData));
      showToast("Portfolio data synchronized with LocalStorage successfully!", "success");
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

        // Simple validation to check that parsed data has required keys
        if (parsed && parsed.profile && parsed.socials && Array.isArray(parsed.skills)) {
          setPortfolioData(parsed);
          localStorage.setItem('portfolio_builder_data', JSON.stringify(parsed));
          showToast("Portfolio JSON imported and saved successfully!", "success");
        } else {
          showToast("Invalid JSON schema. Make sure it contains profile, socials, and skills fields.", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Error parsing file. Invalid JSON data.", "error");
      }
    };
    fileReader.readAsText(files[0]);
    // Clear input value
    e.target.value = '';
  };

  // ACTION: Reset Defaults
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to restore default mock developer data? This will clear current changes.")) {
      setPortfolioData(defaultPortfolioData);
      localStorage.setItem('portfolio_builder_data', JSON.stringify(defaultPortfolioData));
      showToast("Portfolio restored to default cyberpunk credentials.", "info");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-light-canvas dark:bg-dark-canvas text-light-text dark:text-dark-text transition-colors duration-300">
      
      {/* ================= HEADER NAVIGATION BAR ================= */}
      <header className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between p-3.5 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border gap-3 select-none">
        
        {/* Logo and Status */}
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-accent-cyan/15 rounded-lg border border-accent-cyan/30 text-accent-cyan shadow-glow-cyan">
            <Terminal size={18} />
          </div>
          <div>
            <h1 className="text-sm font-extrabold uppercase tracking-widest text-light-text dark:text-dark-text flex items-center gap-1.5">
              DEV<span className="text-accent-cyan">ID</span> Dashboard
            </h1>
            <span className="text-[9px] font-mono text-light-muted dark:text-dark-muted block leading-none">
              v1.0.4 • SECURE_NODE_ONLINE
            </span>
          </div>
        </div>

        {/* View / Edit Mode Switcher */}
        <div className="flex items-center bg-light-canvas dark:bg-dark-canvas p-1 rounded-xl border border-light-border dark:border-dark-border w-fit">
          <button
            onClick={() => setMode('edit')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition ${
              mode === 'edit'
                ? 'bg-accent-cyan text-slate-900 font-extrabold shadow-glow-cyan'
                : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            <Edit3 size={12} />
            <span>[ Edit Builder ]</span>
          </button>
          <button
            onClick={() => setMode('view')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition ${
              mode === 'view'
                ? 'bg-accent-cyan text-slate-900 font-extrabold shadow-glow-cyan'
                : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            <Eye size={12} />
            <span>[ Live Preview ]</span>
          </button>
        </div>

        {/* Quick Actions (Save, Export, Import, Reset, Theme) */}
        <div className="flex items-center space-x-2">
          
          {/* Theme Toggler */}
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-accent-cyan text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Explicit Save */}
          <button
            onClick={handleSave}
            className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-accent-cyan text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
            title="Save to local storage"
          >
            <Save size={14} className="text-accent-cyan" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-accent-cyan text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
            title="Export Profile JSON"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Import JSON */}
          <button
            onClick={handleImportClick}
            className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-accent-cyan text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
            title="Import Profile JSON"
          >
            <Upload size={14} />
            <span className="hidden sm:inline">Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".json"
            className="hidden"
          />

          {/* Reset Defaults */}
          <button
            onClick={handleResetDefaults}
            className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-rose-500 text-light-muted dark:text-dark-muted hover:text-rose-500 transition flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
            title="Reset Defaults"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </header>

      {/* ================= CORE DISPLAY AREA (Locked viewport height) ================= */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 bg-light-canvas dark:bg-dark-canvas select-text">
        {mode === 'edit' ? (
          <StepperForm data={portfolioData} onChange={setPortfolioData} />
        ) : (
          <LivePortfolio data={portfolioData} theme={theme} />
        )}
      </main>

      {/* ================= FLOATING TOAST NOTIFIER (Cyberpunk UI alerts) ================= */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none select-none max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start space-x-2.5 p-3 rounded-xl border shadow-lg transition duration-300 animate-slide-in ${
              t.type === 'success' 
                ? 'bg-slate-900 border-accent-cyan text-accent-cyan shadow-[0_0_12px_rgba(0,210,194,0.2)]'
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
              className="text-slate-500 hover:text-white transition flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
