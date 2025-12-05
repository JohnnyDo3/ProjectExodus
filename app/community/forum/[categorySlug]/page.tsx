import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, User, Pin, ThumbsUp, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'

async function getCategoryData(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/forum/category/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching category data:', error)
    return null
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params
  const data = await getCategoryData(categorySlug)

  if (!data) {
    notFound()
  }

  const { category, posts } = data

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-moss-50 via-ocean-50 to-terra-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/community/forum" className="inline-block mb-6">
              <Button variant="outline" size="sm" className="font-bold">
                ← BACK TO FORUM
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{category.icon}</div>
              <div>
                <h1 className="text-5xl font-black text-[var(--foreground)]">
                  {category.name}
                </h1>
              </div>
            </div>

            <p className="text-xl font-semibold mb-6 text-[var(--foreground)]">
              {category.description}
            </p>

            <div className="flex items-center gap-4">
              <Button size="lg" className="text-lg px-8 py-5 font-black shadow-lg">
                NEW POST
              </Button>
              <div className="text-base font-bold text-[var(--muted-foreground)]">
                {category._count.posts} posts in this category
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 bg-[var(--card)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/community/forum/posts/${post.id}`}>
                  <Card className="hover-lift border-4 border-ocean-200 hover:border-ocean-400 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Author Avatar */}
                        <div className="w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center flex-shrink-0">
                          {post.author.image ? (
                            <img
                              src={post.author.image}
                              alt={post.author.name || 'User'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-moss-600" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            {post.pinned && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-terra-100 rounded-full">
                                <Pin className="w-3 h-3 text-terra-600" />
                                <span className="text-xs font-black text-terra-600 uppercase">
                                  Pinned
                                </span>
                              </div>
                            )}
                            <h3 className="text-xl font-black text-[var(--foreground)]">
                              {post.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-6 text-sm font-semibold text-[var(--muted-foreground)]">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{post.author.name || 'Anonymous'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDate(new Date(post.createdAt))}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post._count.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post._count.likes} likes</span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center">
                          <div className="text-2xl font-black text-ocean-600">→</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {posts.length === 0 && (
                <Card className="border-4 border-sand-200">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-sand-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-black mb-2 text-[var(--muted-foreground)]">
                      NO POSTS YET
                    </h3>
                    <p className="font-semibold mb-6 text-[var(--muted-foreground)]">
                      Be the first to start a conversation!
                    </p>
                    <Button size="lg" className="font-black">
                      CREATE FIRST POST
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
