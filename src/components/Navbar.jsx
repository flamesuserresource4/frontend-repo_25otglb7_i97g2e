import { useEffect, useState } from 'react';
import { Moon, Sun, Wallet } from 'lucide-react';

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('apflow-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === 'dark' : prefersDark;
    setDark(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('apflow-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('apflow-theme', 'light');
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-500 via-cyan-400 to-emerald-400 grid place-items-center text-white shadow-lg">
            <Wallet size={18} />
          </div>
          <span className="font-semibold text-lg tracking-tight text-neutral-800 dark:text-neutral-100">APFlow</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition">Fitur</a>
          <a href="#dashboard" className="hover:text-neutral-900 dark:hover:text-white transition">Dashboard</a>
          <a href="#form" className="hover:text-neutral-900 dark:hover:text-white transition">Input</a>
          <a href="#docs" className="hover:text-neutral-900 dark:hover:text-white transition">API</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:shadow-sm transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#form"
            className="hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow hover:opacity-95 transition"
          >
            Mulai Catat
          </a>
        </div>
      </div>
    </header>
  );
}
