import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.belegante.co';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Blog Belegante',
    template: '%s | Blog Belegante',
  },
  description: 'Conteúdo, referências e bastidores sobre web design, presença digital e estratégia de marca.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Blog Belegante',
    title: 'Blog Belegante',
    description: 'Conteúdo, referências e bastidores sobre web design e presença digital.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Belegante',
    description: 'Conteúdo, referências e bastidores sobre web design e presença digital.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="font-body bg-brand-paper text-brand-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
