import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/auth'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Clock, User, Calendar, MessageCircle, Tag, FileText, Pencil } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { formatDate } from '@/lib/utils/format'
import Link from 'next/link'
import { ArticleClientWrapper } from '@/components/article/ArticleClientWrapper'

// Caching disabled: the response varies by user (the author sees their
// own drafts; everyone else sees only PUBLISHED). ISR per-URL would
// serve the wrong content. Page is still fast — single DB query.
export const dynamic = 'force-dynamic'

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

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors">
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
