'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'classic';

const THEME_KEY = 'belegante_blog_theme';

const THEME_OPTIONS: Array<{ value: ThemeMode; label: string; short: string }> = [
  { value: 'light', label: 'Dia', short: 'D' },
  { value: 'dark', label: 'Noite', short: 'N' },
  { value: 'classic', label: 'Leitura', short: 'L' },
];

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore localStorage errors in private/locked environments.
  }
}

function SunIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

function MoonIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.3 14.2a8.4 8.4 0 1 1-10.5-10.5 6.9 6.9 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

function EyeReadIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      if (saved && ['light', 'dark', 'classic'].includes(saved)) {
        setTheme(saved);
        applyTheme(saved);
      } else {
        applyTheme('light');
      }
    } catch {
      applyTheme('light');
    }
  }, []);

  const selectTheme = (value: ThemeMode) => {
    setTheme(value);
    applyTheme(value);
  };

  const activeIndex = Math.max(
    0,
    THEME_OPTIONS.findIndex((option) => option.value === theme),
  );

  return (
    <div className="relative inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]" aria-label="Modo de leitura">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1 top-1 h-8 w-8 rounded-full border border-brand-orange/45 bg-brand-orange/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_14px_rgba(255,77,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: `translateX(${activeIndex * 2}rem)` }}
      />

      {THEME_OPTIONS.map((option) => {
        const active = option.value === theme;
        const Icon =
          option.value === 'light' ? SunIcon : option.value === 'dark' ? MoonIcon : EyeReadIcon;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => selectTheme(option.value)}
            className="group relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-transform duration-300 hover:-translate-y-[1px] active:translate-y-0"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
          >
            <Icon
              className={`h-4 w-4 transition-all duration-300 ${
                active
                  ? 'scale-110 text-brand-orange drop-shadow-[0_0_10px_rgba(255,77,0,0.35)]'
                  : 'text-[var(--text-muted)] group-hover:scale-110 group-hover:text-[var(--text-main)]'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
