import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.belegante.co';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Blog Belegante',
    template: '%s | Blog Belegante',
  },
  description: 'Blog da BELEGANTE_ com dicas sobre SEO, inteligência artificial, tráfego pago e estratégia digital.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Blog Belegante',
    title: 'Blog Belegante',
    description: 'Blog da BELEGANTE_ com dicas sobre SEO, inteligência artificial, tráfego pago e estratégia digital.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Belegante',
    description: 'Blog da BELEGANTE_ com dicas sobre SEO, inteligência artificial, tráfego pago e estratégia digital.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('belegante_blog_theme');
                  if (theme) document.documentElement.dataset.theme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body bg-[var(--bg)] text-[var(--text-main)] antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
