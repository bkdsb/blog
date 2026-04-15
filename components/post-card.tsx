import Image from 'next/image';
import Link from 'next/link';
import { formatDate, htmlToText, type WPPostCard } from '@/lib/wp';

type Props = {
  post: WPPostCard;
};

export function PostCard({ post }: Props) {
  const plainExcerpt = htmlToText(post.excerpt);
  const image = post.featuredImage?.node;

  return (
    <article className="group overflow-hidden rounded-xl2 border border-[#e8e2d8] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,26,22,0.12)]">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-[#eee7db]">
          {image?.sourceUrl ? (
            <Image
              src={image.sourceUrl}
              alt={image.altText || htmlToText(post.title)}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0e7d7] to-[#ddd1bb]" />
          )}
        </div>

        <div className="space-y-4 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">{formatDate(post.date)}</p>

          <h2
            className="font-heading text-2xl leading-tight text-brand-ink transition-colors group-hover:text-brand-orange"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          {plainExcerpt ? <p className="line-clamp-3 text-base leading-relaxed text-brand-muted">{plainExcerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}
