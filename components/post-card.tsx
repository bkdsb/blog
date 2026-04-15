import Image from 'next/image';
import Link from 'next/link';
import { formatDate, htmlToText, type WPPostCard } from '@/lib/wp';

type Props = {
  post: WPPostCard;
};

export function PostCard({ post }: Props) {
  const plainExcerpt = htmlToText(post.excerpt);
  const image = post.featuredImage?.node;
  const authorName = post.author?.node?.name?.trim() || 'Equipe BELEGANTE_';

  return (
    <article className="group overflow-hidden rounded-xl2 border border-[var(--line)] bg-[var(--surface)] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,26,22,0.12)]">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-[var(--surface-2)]">
          {image?.sourceUrl ? (
            <Image
              src={image.sourceUrl}
              alt={image.altText || htmlToText(post.title)}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)]" />
          )}
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <p>{formatDate(post.date)}</p>
            <p>{authorName}</p>
          </div>

          <h2
            className="font-heading text-2xl leading-tight text-[var(--text-main)] transition-colors group-hover:text-brand-orange"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          {plainExcerpt ? <p className="line-clamp-3 text-base leading-relaxed text-[var(--text-muted)]">{plainExcerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}
