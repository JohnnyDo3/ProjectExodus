import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { auth } from '@/auth'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Clock, User, Calendar, MessageCircle, Tag, FileText, Pencil, RefreshCw } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { formatDate } from '@/lib/utils/format'
import Link from 'next/link'
import { ArticleClientWrapper } from '@/components/article/ArticleClientWrapper'
import { ReadingProgress } from '@/components/article/ReadingProgress'
import { ShareButtons } from '@/components/article/ShareButtons'
import { siteConfig } from '@/lib/metadata'

// Caching disabled: the response varies by user (the author sees their
// own drafts; everyone else sees only PUBLISHED). ISR per-URL would
// serve the wrong content. Page is still fast — single DB query.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

async function getArticle(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    // Forward the requester's cookies so the API can identify them via
    // next-auth's session cookie. Without this, the server-to-server
    // fetch is anonymous and the author can't see their own drafts.
    const incomingHeaders = await headers()
    const cookie = incomingHeaders.get('cookie') ?? ''
    const res = await fetch(`${baseUrl}/api/articles/${slug}`, {
      headers: { cookie },
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

// Per-article SEO: real OpenGraph and Twitter card metadata so social
// shares render the article's own title / excerpt / cover image instead
// of the generic site-level defaults. Also produces canonical and
// article-time tags that search engines use for freshness signals.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) {
    return { title: 'Article not found' }
  }
  const title = article.title
  const description = (article.excerpt || article.title || '').slice(0, 200)
  const image = article.coverImage || undefined
  const canonical = `${SITE_URL}/articles/${slug}`
  const authorName = article.author?.name || undefined

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      siteName: siteConfig.name,
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt || article.publishedAt || undefined,
      authors: authorName ? [authorName] : undefined,
      tags: Array.isArray(article.tags)
        ? article.tags.map((t: { tag?: { name?: string } } | string) =>
            typeof t === 'string' ? t : t.tag?.name
          ).filter(Boolean)
        : undefined,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [article, session] = await Promise.all([getArticle(slug), auth()])

  if (!article) {
    notFound()
  }

  const isDraft = article.status !== 'PUBLISHED'
  const isAuthor = session?.user?.id && session.user.id === article.author?.id
  const canonicalUrl = `${SITE_URL}/articles/${slug}`

  // schema.org/Article structured data for search engines + Apple News
  // + LinkedIn rich previews. Only emitted for published articles —
  // we don't want crawlers indexing drafts.
  const articleJsonLd = article.status === 'PUBLISHED'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt || undefined,
        image: article.coverImage ? [article.coverImage] : undefined,
        datePublished: article.publishedAt || undefined,
        dateModified: article.updatedAt || article.publishedAt || undefined,
        wordCount: typeof article.readTime === 'number' ? article.readTime * 200 : undefined,
        author: article.author?.name
          ? {
              '@type': 'Person',
              name: article.author.name,
              ...(article.author.id ? { url: `${SITE_URL}/users/${article.author.id}` } : {}),
            }
          : undefined,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        ...(article.category?.name
          ? { articleSection: article.category.name }
          : {}),
      }
    : null

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors">
      {articleJsonLd && (
        <script
          type="application/ld+json"
          // Structured data isn't user content; it's a controlled object
          // we serialise here. Safe to inject directly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}

      {/* Reading-progress bar (sticky at viewport top) — only for
          published articles so drafts don't pretend to be a real read. */}
      {article.status === 'PUBLISHED' && (
        <ReadingProgress
          articleSlug={article.slug}
          estimatedReadTime={article.readTime || 5}
        />
      )}

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <BackButton label="Back to Articles" fallbackUrl="/articles" />
            {isAuthor && (
              <Link
                href={`/articles/write?draft=${article.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border-2 border-theme-primary text-sm font-bold hover:bg-theme-primary hover:text-[var(--primary-foreground)] transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Link>
            )}
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {isDraft && (
              <div>
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/20 border-2 border-amber-500 rounded-full shadow-lg">
                  <FileText className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                  <span className="text-sm font-black text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                    {article.status === 'DRAFT' ? 'Draft — only you can see this' : article.status}
                  </span>
                </div>
              </div>
            )}
            {article.featured && !isDraft && (
              <div>
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full shadow-lg">
                  <span className="text-sm font-black text-[var(--primary-foreground)] uppercase tracking-wide">
                    Featured Article
                  </span>
                </div>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-[var(--foreground)]">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl sm:text-2xl font-semibold max-w-4xl mx-auto text-theme-muted">
                {article.excerpt}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-bold pt-6">
              {article.author?.name && (
                <div className="flex items-center gap-2 text-theme-primary">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{article.author.name}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2 text-theme-muted">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <time dateTime={article.publishedAt}>
                    {formatDate(new Date(article.publishedAt))}
                  </time>
                </div>
              )}
              {/* "Last updated" — only surface when the article was
                  meaningfully edited after publish (more than a day later).
                  Reader-trust signal: transparency on corrections / edits. */}
              {article.publishedAt && article.updatedAt &&
                new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() > 86_400_000 && (
                  <div className="flex items-center gap-2 text-theme-muted">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>
                      UPDATED{' '}
                      <time dateTime={article.updatedAt}>
                        {formatDate(new Date(article.updatedAt))}
                      </time>
                    </span>
                  </div>
                )}
              {article.readTime && (
                <div className="flex items-center gap-2 text-theme-accent">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{article.readTime} MIN READ</span>
                </div>
              )}
              {article.comments && (
                <div className="flex items-center gap-2 text-theme-muted">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{article.comments.length} COMMENTS</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <Link
                href={`/learn?category=${article.category.slug}`}
                className="inline-block px-6 py-3 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] rounded-2xl text-base font-black uppercase shadow-xl hover:shadow-2xl transition-shadow"
              >
                {article.category.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Share row sits above the body, plus a copy below in
                ArticleClientWrapper near the end of the article. */}
            {article.status === 'PUBLISHED' && (
              <div className="flex justify-end mb-6">
                <ShareButtons
                  url={canonicalUrl}
                  title={article.title}
                  description={article.excerpt || ''}
                />
              </div>
            )}
            <ArticleClientWrapper article={article} />
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">CONTINUE LEARNING</h2>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              Explore more articles on sustainability and eco-friendly living
            </p>
            <Link href="/learn">
              <Button size="lg" className="text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-2xl">
                BROWSE ALL ARTICLES →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
