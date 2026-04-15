import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthorSidebar } from '@/components/author-sidebar';
import { PostCard } from '@/components/post-card';
import { fetchPosts, getAuthorSummaries, type WPPostCard } from '@/lib/wp';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Blog da BELEGANTE_ com dicas sobre SEO, IA, tráfego pago e estratégia digital.',
};

export default async function HomePage() {
  let posts: WPPostCard[] = [];

  try {
    posts = await fetchPosts(6);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
  }

  const authors = getAuthorSummaries(posts, 4);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14 md:pt-20">
      <section className="mb-14 space-y-6 border-b border-[var(--line)] pb-10">
        <h1 className="max-w-[16ch] font-heading text-5xl leading-[0.98] text-[var(--text-main)] md:text-7xl">
          Blog da BELEGANTE_
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
          Sobre SEO, inteligência artificial, tráfego pago e outras dicas pessoais.
        </p>
      </section>

      {posts.length ? (
        <section className="grid items-start gap-9 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="flex justify-center xl:justify-start">
              <Link
                href="/posts"
                className="inline-flex items-center rounded-full border border-brand-orange/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-orange transition-colors hover:bg-brand-orange/10"
              >
                Ver mais
              </Link>
            </div>
          </div>

          <AuthorSidebar authors={authors} className="xl:sticky xl:top-24" />
        </section>
      ) : (
        <section className="rounded-xl2 border border-[var(--line)] bg-[var(--surface)] p-8 shadow-soft">
          <h2 className="font-heading text-3xl text-[var(--text-main)]">Nenhum post encontrado no momento</h2>
          <p className="mt-3 text-[var(--text-muted)]">
            Verifique a URL do WPGraphQL e se existem posts publicados no WordPress.
          </p>
        </section>
      )}
    </div>
  );
}
