import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">404</p>
      <h1 className="mt-4 font-heading text-5xl text-brand-ink">Conteúdo não encontrado</h1>
      <p className="mt-4 max-w-lg text-brand-muted">Esse post pode ter sido removido ou ainda não está publicado.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg border border-brand-orange/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-orange transition-colors hover:bg-brand-orange/10"
      >
        Voltar para o blog
      </Link>
    </div>
  );
}
