import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Clock, User, Calendar, MessageCircle, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'
import Link from 'next/link'

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
      <section className="hero-gradient py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {article.featured && (
              <div className="inline-block px-4 py-2 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium">
                Featured Article
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-earth-700 max-w-3xl mx-auto">
                {article.excerpt}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-earth-600 pt-4">
              {article.author?.name && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.publishedAt}>
                    {formatDate(new Date(article.publishedAt))}
                  </time>
                </div>
              )}
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              )}
              {article.comments && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{article.comments.length} comments</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <Link
                href={`/learn?category=${article.category.slug}`}
                className="inline-block px-4 py-2 bg-moss-100 text-moss-700 rounded-lg text-sm font-medium hover:bg-moss-200"
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
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Main Content */}
              <article className="md:col-span-3">
                <Card>
                  <CardContent className="p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">
                      {article.content ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: article.content }}
                          className="article-content"
                        />
                      ) : (
                        <p className="text-earth-700 leading-relaxed whitespace-pre-wrap">
                          {article.excerpt || 'Article content coming soon...'}
                        </p>
                      )}
                    </div>
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

                {/* Comments Section */}
                {article.comments && article.comments.length > 0 && (
                  <div className="mt-12">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
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
                                <div className="w-10 h-10 rounded-full bg-moss-100 flex items-center justify-center">
                                  <User className="w-5 h-5 text-moss-600" />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-earth-900">
                                    {comment.user?.name || 'Anonymous'}
                                  </span>
                                  <span className="text-sm text-earth-500">
                                    {formatDate(new Date(comment.createdAt))}
                                  </span>
                                </div>
                                <p className="text-earth-700">{comment.content}</p>
                              </div>
                            </div>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-14 space-y-4 border-l-2 border-sand-200 pl-6">
                                {comment.replies.map((reply: any) => (
                                  <div key={reply.id} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                      <div className="w-8 h-8 rounded-full bg-ocean-100 flex items-center justify-center">
                                        <User className="w-4 h-4 text-ocean-600" />
                                      </div>
                                    </div>
                                    <div className="flex-grow">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-earth-900 text-sm">
                                          {reply.user?.name || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-earth-500">
                                          {formatDate(new Date(reply.createdAt))}
                                        </span>
                                      </div>
                                      <p className="text-sm text-earth-700">{reply.content}</p>
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
                {/* Author Card */}
                {article.author && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">About the Author</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-moss-100 flex items-center justify-center mx-auto mb-3">
                          {article.author.image ? (
                            <img
                              src={article.author.image}
                              alt={article.author.name || 'Author'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10 text-moss-600" />
                          )}
                        </div>
                        <h3 className="font-bold text-earth-900 mb-2">
                          {article.author.name}
                        </h3>
                        {article.author.bio && (
                          <p className="text-sm text-earth-600">
                            {article.author.bio}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Share Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Share Article</CardTitle>
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
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Continue Learning</h2>
            <p className="text-lg text-earth-700">
              Explore more articles on sustainability and eco-friendly living
            </p>
            <Link href="/learn">
              <Button size="lg">
                Browse All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
