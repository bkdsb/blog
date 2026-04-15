import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthorSidebar } from '@/components/author-sidebar';
import { PostCard } from '@/components/post-card';
import { fetchPosts, getAuthorSummaries } from '@/lib/wp';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Listagem de posts do Blog BELEGANTE_ com busca por conteúdo.',
};

export default async function PostsListingPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const term = q.trim();
  const posts = await fetchPosts(60, term);
  const authors = getAuthorSummaries(posts, 6);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14 md:pt-20">
      <section className="mb-10 space-y-4 border-b border-[var(--line)] pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Arquivo</p>

        <h1 className="font-heading text-5xl leading-[0.98] text-[var(--text-main)] md:text-6xl">Todos os posts</h1>

        <form action="/posts" method="get" className="pt-2">
          <label htmlFor="q" className="sr-only">
            Buscar por posts
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="q"
              name="q"
              defaultValue={term}
              placeholder="Buscar por posts"
              className="h-12 w-full rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-brand-orange focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full border border-brand-orange/70 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange transition-colors hover:bg-brand-orange/10"
            >
              Buscar
            </button>
          </div>
        </form>
      </section>

      <section className="grid items-start gap-9 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <div>
          {posts.length ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl2 border border-[var(--line)] bg-[var(--surface)] p-8 shadow-soft">
              <h2 className="font-heading text-3xl text-[var(--text-main)]">Nada encontrado para “{term}”</h2>
              <p className="mt-3 text-[var(--text-muted)]">Tente outra palavra-chave ou volte para os últimos posts.</p>
              <Link
                href="/posts"
                className="mt-6 inline-flex rounded-full border border-brand-orange/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange transition-colors hover:bg-brand-orange/10"
              >
                Limpar busca
              </Link>
            </div>
          )}
        </div>

        <AuthorSidebar authors={authors} className="xl:sticky xl:top-24" />
      </section>
    </div>
  );
}
