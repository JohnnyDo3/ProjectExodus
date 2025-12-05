import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Clock, User, Calendar, MessageCircle, Tag } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { formatDate } from '@/lib/utils/format'
import Link from 'next/link'
import { MarkdownContent } from '@/components/article/MarkdownContent'
import { ReferencesWidget } from '@/components/article/ReferencesWidget'
import { PeerReviewWidget } from '@/components/article/PeerReviewWidget'
import { ArticleReviewSection } from '@/components/article/ArticleReviewSection'

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
    <div className="min-h-screen bg-[var(--background)] transition-colors">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Articles" fallbackUrl="/articles" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {article.featured && (
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
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <article className="md:col-span-2">
                <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                  <CardContent className="p-6 sm:p-8 md:p-12">
                    {article.content ? (
                      <MarkdownContent content={article.content} />
                    ) : (
                      <p className="text-lg font-medium leading-relaxed text-theme-muted">
                        {article.excerpt || 'Article content coming soon...'}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tagRel: any) => (
                        <Link
                          key={tagRel.tag.id}
                          href={`/learn?tag=${tagRel.tag.slug}`}
                          className="px-3 py-1 bg-[var(--muted)] hover:bg-[var(--primary)]/20 rounded-full text-sm text-[var(--foreground)] transition-colors"
                        >
                          {tagRel.tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Peer Reviews Section (Reddit-style) */}
                <div className="mt-12">
                  <ArticleReviewSection
                    articleId={article.id}
                    articleAuthorId={article.authorId}
                    initialReviews={article.peerReviews || []}
                  />
                </div>

                {/* Comments Section */}
                {article.comments && article.comments.length > 0 && (
                  <div className="mt-12">
                    <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[var(--foreground)]">
                          <MessageCircle className="w-5 h-5" />
                          Comments ({article.comments.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {article.comments.map((comment: any) => (
                          <div key={comment.id} className="space-y-4">
                            {/* Top-level comment */}
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                                  <User className="w-5 h-5 text-theme-primary" />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-[var(--foreground)]">
                                    {comment.user?.name || 'Anonymous'}
                                  </span>
                                  <span className="text-sm text-theme-muted">
                                    {formatDate(new Date(comment.createdAt))}
                                  </span>
                                </div>
                                <p className="text-[var(--foreground)]">{comment.content}</p>
                              </div>
                            </div>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-14 space-y-4 border-l-2 border-[var(--border)] pl-6">
                                {comment.replies.map((reply: any) => (
                                  <div key={reply.id} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                      <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                                        <User className="w-4 h-4 text-theme-accent" />
                                      </div>
                                    </div>
                                    <div className="flex-grow">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-[var(--foreground)] text-sm">
                                          {reply.user?.name || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-theme-muted">
                                          {formatDate(new Date(reply.createdAt))}
                                        </span>
                                      </div>
                                      <p className="text-sm text-[var(--foreground)]">{reply.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside className="md:col-span-1 space-y-6">
                {/* References Widget */}
                <ReferencesWidget references={article.references || []} />

                {/* Peer Review Widget */}
                <PeerReviewWidget
                  articleId={article.id}
                  peerReviews={article.peerReviews || []}
                />

                {/* Author Card */}
                {article.author && (
                  <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                    <CardHeader>
                      <CardTitle className="text-base text-[var(--foreground)]">About the Author</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <Link href={`/profile/${article.author.id}`} className="block">
                          <div className="w-20 h-20 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mx-auto mb-3 hover:scale-105 transition-transform cursor-pointer">
                            {article.author.image ? (
                              <img
                                src={article.author.image}
                                alt={article.author.name || 'Author'}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-10 h-10 text-theme-primary" />
                            )}
                          </div>
                          <h3 className="font-bold text-[var(--foreground)] mb-2 hover:text-theme-primary transition-colors cursor-pointer">
                            {article.author.name}
                          </h3>
                        </Link>
                        {article.author.bio && (
                          <p className="text-sm text-theme-muted">
                            {article.author.bio}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Share Card */}
                <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="text-base text-[var(--foreground)]">Share Article</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full text-sm" size="sm">
                        Share on Twitter
                      </Button>
                      <Button variant="outline" className="w-full text-sm" size="sm">
                        Share on Facebook
                      </Button>
                      <Button variant="outline" className="w-full text-sm" size="sm">
                        Copy Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
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
