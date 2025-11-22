import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, User, Pin, ThumbsUp, Clock } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
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
      <section className="py-16 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Forum" fallbackUrl="/community/forum" />
          </div>
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

            <p className="text-xl font-semibold mb-6 text-theme-muted">
              {category.description}
            </p>

            <div className="flex items-center gap-4">
              <Button size="lg" className="text-lg px-8 py-5 font-black shadow-lg">
                NEW POST
              </Button>
              <div className="text-base font-bold text-theme-muted">
                {category._count.posts} posts in this category
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Forum" fallbackUrl="/community/forum" />
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/community/forum/posts/${post.id}`}>
                  <Card className="hover-lift border-4 border-theme-accent hover:border-theme-primary transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Author Avatar */}
                        <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center flex-shrink-0">
                          {post.author.image ? (
                            <img
                              src={post.author.image}
                              alt={post.author.name || 'User'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-theme-primary" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            {post.pinned && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] rounded-full">
                                <Pin className="w-3 h-3 text-theme-secondary" />
                                <span className="text-xs font-black text-theme-secondary uppercase">
                                  Pinned
                                </span>
                              </div>
                            )}
                            <h3 className="text-xl font-black text-[var(--foreground)]">
                              {post.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-6 text-sm font-semibold text-theme-muted">
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
                          <div className="text-2xl font-black text-theme-accent">→</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {posts.length === 0 && (
                <Card className="border-4 border-theme-secondary">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-theme-secondary mx-auto mb-4" />
                    <h3 className="text-2xl font-black mb-2 text-theme-muted">
                      NO POSTS YET
                    </h3>
                    <p className="font-semibold mb-6 text-theme-muted">
                      Be the first to start a discussion!
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
