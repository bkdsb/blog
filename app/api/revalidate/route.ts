import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RevalidatePayload = {
  secret?: string;
  slug?: string;
};

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  const searchSecret = request.nextUrl.searchParams.get('secret') ?? undefined;
  let body: RevalidatePayload = {};

  try {
    body = (await request.json()) as RevalidatePayload;
  } catch {
    // Body is optional for this endpoint.
  }

  const providedSecret = searchSecret ?? body.secret;

  if (!REVALIDATE_SECRET || providedSecret !== REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const slug = typeof body.slug === 'string' ? body.slug.trim() : '';

  revalidateTag('posts');
  revalidatePath('/');

  if (slug) {
    revalidateTag(`post:${slug}`);
    revalidatePath(`/posts/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: slug ? ['posts', `post:${slug}`, '/', `/posts/${slug}`] : ['posts', '/'],
    now: new Date().toISOString(),
  });
}
