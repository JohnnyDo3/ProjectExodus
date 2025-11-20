import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, Users, Pin } from 'lucide-react'
import Link from 'next/link'

async function getForumCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/forum`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch forum categories')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching forum categories:', error)
    return []
  }
}

export default async function ForumPage() {
  const categories = await getForumCategories()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-black text-[var(--foreground)]">
              COMMUNITY FORUM
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Connect, share, and learn with fellow sustainability enthusiasts
            </p>
            <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
              START A DISCUSSION
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-black mb-2 text-[var(--foreground)]">
                DISCUSSION CATEGORIES
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Explore conversations across different topics
              </p>
            </div>

            <div className="space-y-4">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/community/forum/${category.slug}`}>
                  <Card className="hover-lift border-4 border-theme-primary hover:border-theme-accent transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 text-3xl shadow-lg">
                          {category.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="text-2xl font-black mb-2 text-[var(--foreground)]">
                            {category.name}
                          </h3>
                          <p className="text-base font-semibold mb-4 text-theme-muted">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm font-bold text-theme-muted">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span>{category._count.posts} POSTS</span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center">
                          <div className="text-3xl font-black text-theme-primary">→</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {categories.length === 0 && (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-theme-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2 text-theme-muted">
                    NO CATEGORIES YET
                  </h3>
                  <p className="font-semibold text-theme-muted">
                    Check back soon for discussions!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black mb-2 text-theme-primary">
                  {categories.reduce((sum: number, cat: any) => sum + cat._count.posts, 0)}
                </div>
                <div className="text-lg font-bold text-theme-muted">
                  DISCUSSIONS
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2 text-theme-accent">
                  {categories.length}
                </div>
                <div className="text-lg font-bold text-theme-muted">
                  CATEGORIES
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2 text-theme-secondary">
                  1K+
                </div>
                <div className="text-lg font-bold text-theme-muted">
                  MEMBERS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
