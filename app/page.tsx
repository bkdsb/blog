import type { Metadata } from 'next';
import { PostCard } from '@/components/post-card';
import { fetchPosts, type WPPostCard } from '@/lib/wp';

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Últimos conteúdos do Blog Belegante publicados via WordPress headless com WPGraphQL.',
};

export default async function HomePage() {
  let posts: WPPostCard[] = [];

  try {
    posts = await fetchPosts(24);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-14 md:pt-20">
      <section className="mb-14 space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Headless WordPress + Next.js</p>

        <h1 className="max-w-[18ch] font-heading text-5xl leading-[0.98] text-brand-ink md:text-7xl">
          Blog clean, rápido e pronto para personalização.
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-brand-muted">
          Listagem automática do seu WordPress via WPGraphQL em um front-end Next.js App Router.
        </p>
      </section>

      {posts.length ? (
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <section className="rounded-xl2 border border-[#e8e2d8] bg-white p-8 shadow-soft">
          <h2 className="font-heading text-3xl text-brand-ink">Nenhum post encontrado no momento</h2>
          <p className="mt-3 text-brand-muted">
            Verifique a URL do WPGraphQL e se existem posts publicados no WordPress.
          </p>
        </section>
      )}
    </div>
  );
}
