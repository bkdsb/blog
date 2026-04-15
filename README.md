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
- `REVALIDATE_SECRET` (segredo para revalidação on-demand)

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

## Atualização de conteúdo (WordPress -> Next)

O blog usa ISR com cache automático:

- Home (`/`) revalida em ~2 minutos
- Post individual (`/posts/[slug]`) revalida em ~2 minutos

Para atualização imediata ao publicar/editar no WordPress, chame:

```bash
curl -X POST "https://SEU-DOMINIO/api/revalidate?secret=SEU_SEGREDO" \
  -H "Content-Type: application/json" \
  -d '{"slug":"slug-do-post"}'
```

Esse endpoint revalida:

- listagem de posts (`/`)
- tags de cache `posts` e `post:slug`
- rota do post (`/posts/slug`)

Sugestão: configurar webhook no WordPress para disparar esse endpoint em `publish_post` e `save_post`.
