import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { resolveArticleContent } from '@/lib/article/contentStorage'

/**
 * Diagnostic endpoint: returns the raw stored HTML body for one of
 * the requester's own articles. Used to figure out why the
 * footnotes extractor isn't matching a specific DOCX's markup — the
 * user can just visit /api/_debug/article-html?slug=foo and copy
 * the response instead of digging through dev tools.
 *
 * Strictly limited to articles whose authorId matches the requester,
 * so it can't be used to read drafts or unpublished content
 * belonging to anyone else.
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json(
      { error: 'Pass a slug, e.g. ?slug=your-article-slug' },
      { status: 400 },
    )
  }

  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      authorId: true,
      content: true,
      contentPublicId: true,
      contentUrl: true,
    },
  })

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  if (article.authorId !== session.user.id) {
    return NextResponse.json(
      { error: 'You can only inspect articles you authored.' },
      { status: 403 },
    )
  }

  const content = await resolveArticleContent(article)

  // Pretty-printed HTML so it's readable when pasted into a chat.
  // Just inserts newlines between block elements; not a real formatter.
  const pretty = content
    .replace(/></g, '>\n<')
    .replace(/\n{2,}/g, '\n')

  return new NextResponse(pretty, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
