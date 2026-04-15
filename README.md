# Blog Belegante (Next.js + WPGraphQL)

Projeto em **Next.js App Router** consumindo WordPress headless via **WPGraphQL**.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- WPGraphQL (`https://blog.belegante.co/graphql`)

## Como rodar

```bash
npm install
npm run dev
```

Abra: `http://localhost:3000`

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Variáveis:

- `WPGRAPHQL_URL` (default: `https://blog.belegante.co/graphql`)
- `NEXT_PUBLIC_SITE_URL` (ex: `https://blog.belegante.co`)

## Estrutura principal

- `app/page.tsx`: listagem de posts
- `app/posts/[slug]/page.tsx`: post individual por slug
- `lib/wp.ts`: queries e client WPGraphQL
- `components/post-card.tsx`: card/list item de post

## SEO

- Metadata global no `app/layout.tsx`
- Metadata por post com `generateMetadata` em `app/posts/[slug]/page.tsx`

## Deploy

```bash
npm run build
npm run start
```
