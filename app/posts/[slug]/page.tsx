import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AuthorSidebar } from '@/components/author-sidebar';
import { fetchPostBySlug, fetchPostSlugs, formatDate, getAuthorSummaries, htmlToText } from '@/lib/wp';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await fetchPostSlugs(100);
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Erro ao gerar slugs estáticos:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'Este conteúdo não está disponível.',
    };
  }

  const description = htmlToText(post.excerpt || post.content).slice(0, 160);
  const image = post.featuredImage?.node?.sourceUrl;

  return {
    title: htmlToText(post.title),
    description,
    openGraph: {
      type: 'article',
      title: htmlToText(post.title),
      description,
      publishedTime: post.date,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: htmlToText(post.title),
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = post.content?.trim() || post.excerpt?.trim() || '';

  const authorSummaries = getAuthorSummaries([post], 1);

  return (
    <article className="mx-auto w-full max-w-6xl px-6 pb-24 pt-14 md:pt-20">
      <div className="grid items-start gap-9 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <div>
          <header className="space-y-6 border-b border-[var(--line)] pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">{formatDate(post.date)}</p>

            <h1
              className="font-heading text-4xl leading-[1.02] text-[var(--text-main)] md:text-6xl"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {post.author?.node?.name ? <p className="text-base text-[var(--text-muted)]">Por {post.author.node.name}</p> : null}
          </header>

          {contentHtml ? (
            <section
              className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-[var(--text-main)] prose-p:text-[var(--text-main)] prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--text-main)] prose-blockquote:border-brand-orange prose-blockquote:text-[var(--text-muted)]"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <p className="mt-10 text-[var(--text-muted)]">Este post ainda não possui conteúdo visível.</p>
          )}
        </div>

        <AuthorSidebar authors={authorSummaries} className="xl:sticky xl:top-24" />
      </div>
    </article>
  );
}
