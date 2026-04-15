import Image from 'next/image';
import type { WPAuthorSummary } from '@/lib/wp';

type Props = {
  authors: WPAuthorSummary[];
  className?: string;
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 8.034.011C3.66.01.106 3.562.105 7.936a7.9 7.9 0 0 0 1.07 3.97L0 16l4.204-1.102a7.94 7.94 0 0 0 3.829.977h.003c4.373 0 7.926-3.552 7.927-7.926a7.9 7.9 0 0 0-2.362-5.623m-5.565 12.22h-.003a6.6 6.6 0 0 1-3.366-.92l-.241-.144-2.495.654.666-2.433-.157-.25a6.59 6.59 0 0 1-1.013-3.516c.002-3.635 2.96-6.593 6.597-6.593a6.56 6.56 0 0 1 4.687 1.944 6.56 6.56 0 0 1 1.939 4.692c-.002 3.636-2.96 6.594-6.594 6.594m3.615-4.934c-.198-.099-1.172-.579-1.354-.646-.182-.066-.314-.099-.446.1-.132.197-.512.645-.628.777-.116.132-.231.149-.429.05-.198-.1-.836-.308-1.592-.981-.588-.524-.986-1.17-1.102-1.368-.115-.198-.012-.305.087-.404.09-.09.198-.232.297-.347.099-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.446-1.074-.611-1.471-.16-.386-.323-.333-.446-.339l-.38-.007a.73.73 0 0 0-.529.248c-.181.198-.694.678-.694 1.653 0 .975.711 1.918.81 2.05.099.132 1.398 2.136 3.387 2.994.473.204.841.326 1.128.418.474.151.905.13 1.246.079.38-.057 1.173-.48 1.338-.944.165-.463.165-.86.116-.943-.05-.082-.182-.132-.38-.231" />
    </svg>
  );
}

function AuthorItem({ author }: { author: WPAuthorSummary }) {
  return (
    <li className="border-b border-[var(--line)] pb-4 last:border-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface-2)]">
          {author.avatarUrl ? (
            <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" sizes="40px" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-[var(--text-muted)]">
              {author.name.slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--text-main)]">{author.name}</p>
          <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)]">{author.description}</p>
        </div>
      </div>
    </li>
  );
}

export function AuthorSidebar({ authors, className = '' }: Props) {
  return (
    <aside className={`space-y-5 ${className}`}>
      <section className="rounded-[1.1rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">Autores</p>
        <ul className="mt-4 space-y-4">
          {authors.length ? (
            authors.map((author) => <AuthorItem key={author.slug} author={author} />)
          ) : (
            <li className="text-sm text-[var(--text-muted)]">Os autores aparecerão aqui conforme novos posts forem publicados.</li>
          )}
        </ul>
      </section>

      <section className="rounded-[1.1rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">Contato</p>
        <ul className="mt-4 space-y-3 text-sm">
          <li>
            <a
              href="https://wa.me/5545998011416"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-main)] transition-colors hover:text-brand-orange"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/obrunobelegante/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-main)] transition-colors hover:text-brand-orange"
            >
              <InstagramIcon />
              Instagram
            </a>
          </li>
          <li>
            <a href="mailto:contato@belegante.co" className="inline-flex items-center gap-2 text-[var(--text-main)] transition-colors hover:text-brand-orange">
              <MailIcon />
              contato@belegante.co
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
}
