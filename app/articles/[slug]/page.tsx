import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Clock, User, Calendar, MessageCircle, Tag } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { formatDate } from '@/lib/utils/format'
import Link from 'next/link'
import { MarkdownContent } from '@/components/article/MarkdownContent'
import { ArticleSidebar } from '@/components/article/ArticleSidebar'

// Extract references (URLs) from markdown content
function extractReferences(content: string): Array<{ url: string; text: string }> {
  const references: Array<{ url: string; text: string }> = []
  const seen = new Set<string>()

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const [, text, url] = match
    if (!seen.has(url) && url.startsWith('http')) {
      seen.add(url)
      references.push({ url, text: text || url })
    }
  }

  // Match raw URLs
  const urlRegex = /(?<![[(])https?:\/\/[^\s<>\])"']+/g
  while ((match = urlRegex.exec(content)) !== null) {
    const url = match[0]
    if (!seen.has(url)) {
      seen.add(url)
      // Try to extract domain name for display
      try {
        const hostname = new URL(url).hostname.replace('www.', '')
        references.push({ url, text: hostname })
      } catch {
        references.push({ url, text: url })
      }
    }
  }

  return references
}

async function getArticle(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/articles/${slug}`, {
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
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-ocean-50 via-moss-50 to-terra-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Articles" fallbackUrl="/articles" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {article.featured && (
              <div>
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-ocean-500 to-terra-500 rounded-full shadow-lg">
                  <span className="text-sm font-black text-white uppercase tracking-wide">
                    Featured Article
                  </span>
                </div>
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-black leading-tight" style={{ color: '#000' }}>
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-2xl font-semibold max-w-4xl mx-auto" style={{ color: '#333' }}>
                {article.excerpt}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-base font-bold pt-6">
              {article.author?.name && (
                <div className="flex items-center gap-2 text-ocean-700">
                  <User className="w-5 h-5" />
                  <span>{article.author.name}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2" style={{ color: '#666' }}>
                  <Calendar className="w-5 h-5" />
                  <time dateTime={article.publishedAt}>
                    {formatDate(new Date(article.publishedAt))}
                  </time>
                </div>
              )}
              {article.readTime && (
                <div className="flex items-center gap-2 text-moss-700">
                  <Clock className="w-5 h-5" />
                  <span>{article.readTime} MIN READ</span>
                </div>
              )}
              {article.comments && (
                <div className="flex items-center gap-2" style={{ color: '#666' }}>
                  <MessageCircle className="w-5 h-5" />
                  <span>{article.comments.length} COMMENTS</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <Link
                href={`/learn?category=${article.category.slug}`}
                className="inline-block px-6 py-3 bg-gradient-to-br from-moss-500 to-ocean-500 text-white rounded-2xl text-base font-black uppercase shadow-xl hover:shadow-2xl transition-shadow"
              >
                {article.category.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <article className="md:col-span-2">
                <Card>
                  <CardContent className="p-8 md:p-12">
                    {article.content ? (
                      <MarkdownContent content={article.content} />
                    ) : (
                      <p className="text-lg font-medium leading-relaxed" style={{ color: '#333' }}>
                        {article.excerpt || 'Article content coming soon...'}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-earth-900 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tagRel: any) => (
                        <Link
                          key={tagRel.tag.id}
                          href={`/learn?tag=${tagRel.tag.slug}`}
                          className="px-3 py-1 bg-sand-100 hover:bg-sand-200 rounded-full text-sm text-earth-700"
                        >
                          {tagRel.tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </article>

              {/* Sidebar with References, Discussion, Author, and Share */}
              <ArticleSidebar
                references={article.content ? extractReferences(article.content) : []}
                comments={article.comments || []}
                author={article.author}
                articleId={article.id}
                articleSlug={slug}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">CONTINUE LEARNING</h2>
            <p className="text-2xl font-semibold">
              Explore more articles on sustainability and eco-friendly living
            </p>
            <Link href="/learn">
              <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl rounded-2xl">
                BROWSE ALL ARTICLES →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
