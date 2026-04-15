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

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [ready, setReady] = useState(false);

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
    setReady(true);
  }, []);

  const selectTheme = (value: ThemeMode) => {
    setTheme(value);
    applyTheme(value);
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1" aria-label="Modo de leitura">
      {THEME_OPTIONS.map((option) => {
        const active = option.value === theme;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => selectTheme(option.value)}
            className={`inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
              active
                ? 'bg-brand-orange text-white'
                : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text-main)]'
            }`}
            aria-pressed={active}
            title={option.label}
            disabled={!ready && option.value !== 'light'}
          >
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sm:hidden">{option.short}</span>
          </button>
        );
      })}
    </div>
  );
}
