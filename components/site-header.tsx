import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--surface-overlay)] backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold uppercase tracking-[0.18em] text-[var(--text-main)]">
          BELEGANTE_
        </Link>

        <nav className="flex items-center gap-5 text-sm text-[var(--text-muted)]">
          <Link href="/" className="transition-colors hover:text-brand-orange">
            Início
          </Link>
          <Link href="/posts" className="transition-colors hover:text-brand-orange">
            Posts
          </Link>
          <a
            href="https://belegante.co"
            className="transition-colors hover:text-brand-orange"
            target="_blank"
            rel="noreferrer"
          >
            Site
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
