const WPGRAPHQL_URL = process.env.WPGRAPHQL_URL ?? 'https://blog.belegante.co/graphql';

type GraphQLError = { message: string };
type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[] };

export type WPImage = {
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
};

export type WPAuthor = {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  avatar?: {
    url?: string | null;
  } | null;
};

export type WPAuthorSummary = {
  name: string;
  slug: string;
  description: string;
  avatarUrl: string;
};

export type WPPostCard = {
  id: string;
  slug: string;
  uri: string;
  title: string;
  excerpt: string;
  date: string;
  author?: {
    node?: WPAuthor | null;
  } | null;
  featuredImage?: { node?: WPImage | null } | null;
};

export type WPPost = WPPostCard & {
  content: string;
};

const POST_CARD_FIELDS = `
  id
  slug
  uri
  title
  excerpt
  date
  author {
    node {
      name
      slug
      description
      avatar {
        url
      }
    }
  }
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
`;

async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 120,
  tags?: string[],
): Promise<T> {
  const response = await fetch(WPGRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate, tags },
  });

  if (!response.ok) {
    throw new Error(`WPGraphQL HTTP ${response.status}`);
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(' | '));
  }

  if (!json.data) {
    throw new Error('WPGraphQL returned empty data');
  }

  return json.data;
}

export async function fetchPosts(first = 24, search = ''): Promise<WPPostCard[]> {
  const query = `
    query GetPosts($first: Int!, $search: String) {
      posts(first: $first, where: { status: PUBLISH, search: $search, orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${POST_CARD_FIELDS}
        }
      }
    }
  `;

  type Data = { posts: { nodes: WPPostCard[] } };
  const data = await wpFetch<Data>(query, { first, search: search.trim() || null }, 120, ['posts']);
  return data.posts.nodes;
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ${POST_CARD_FIELDS}
        content
        author {
          node {
            name
          }
        }
      }
    }
  `;

  type Data = { post: WPPost | null };
  const data = await wpFetch<Data>(query, { slug }, 120, ['posts', `post:${slug}`]);
  return data.post;
}

export async function fetchPostSlugs(first = 100): Promise<string[]> {
  const query = `
    query GetPostSlugs($first: Int!) {
      posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
        }
      }
    }
  `;

  type Data = { posts: { nodes: { slug: string }[] } };
  const data = await wpFetch<Data>(query, { first }, 600, ['posts']);
  return data.posts.nodes.map((node) => node.slug);
}

export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function getAuthorSummaries(posts: WPPostCard[], limit = 4): WPAuthorSummary[] {
  const map = new Map<string, WPAuthorSummary>();

  for (const post of posts) {
    const author = post.author?.node;
    const name = author?.name?.trim() || '';
    if (!name) continue;

    const slug = (author?.slug?.trim() || name.toLowerCase().replace(/\s+/g, '-')).slice(0, 90);
    const key = slug || name.toLowerCase();
    if (map.has(key)) continue;

    map.set(key, {
      name,
      slug,
      description: (author?.description?.trim() || 'Autor convidado do Blog BELEGANTE_.').slice(0, 220),
      avatarUrl: author?.avatar?.url?.trim() || '',
    });
  }

  return Array.from(map.values()).slice(0, limit);
}
