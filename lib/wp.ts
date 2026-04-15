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

export type WPPostCard = {
  id: string;
  slug: string;
  uri: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage?: { node?: WPImage | null } | null;
};

export type WPPost = WPPostCard & {
  content: string;
  author?: { node?: { name?: string | null } | null } | null;
};

const POST_CARD_FIELDS = `
  id
  slug
  uri
  title
  excerpt
  date
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

export async function fetchPosts(first = 24): Promise<WPPostCard[]> {
  const query = `
    query GetPosts($first: Int!) {
      posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${POST_CARD_FIELDS}
        }
      }
    }
  `;

  type Data = { posts: { nodes: WPPostCard[] } };
  const data = await wpFetch<Data>(query, { first }, 120, ['posts']);
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
