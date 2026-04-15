import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e0d4] bg-[#f6f2eb]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ink">
          Blog Belegante
        </Link>

        <nav className="flex items-center gap-6 text-sm text-brand-muted">
          <Link href="/" className="transition-colors hover:text-brand-orange">
            Início
          </Link>
          <a
            href="https://belegante.co"
            className="transition-colors hover:text-brand-orange"
            target="_blank"
            rel="noreferrer"
          >
            Site
          </a>
        </nav>
      </div>
    </header>
  );
}
