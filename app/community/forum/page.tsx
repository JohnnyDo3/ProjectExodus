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
      <section className="py-20 bg-gradient-to-br from-moss-50 via-ocean-50 to-terra-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-black" style={{ color: '#000' }}>
              ROUND TABLE
            </h1>
            <p className="text-xl font-semibold" style={{ color: '#333' }}>
              Connect, share, and learn with fellow sustainability enthusiasts
            </p>
            <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
              START A CONVERSATION
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-black mb-2" style={{ color: '#000' }}>
                TOPICS
              </h2>
              <p className="text-lg font-semibold" style={{ color: '#666' }}>
                Explore conversations across different topics
              </p>
            </div>

            <div className="space-y-4">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/community/forum/${category.slug}`}>
                  <Card className="hover-lift border-4 border-moss-200 hover:border-moss-400 transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center flex-shrink-0 text-3xl shadow-lg">
                          {category.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="text-2xl font-black mb-2" style={{ color: '#000' }}>
                            {category.name}
                          </h3>
                          <p className="text-base font-semibold mb-4" style={{ color: '#666' }}>
                            {category.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm font-bold" style={{ color: '#888' }}>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span>{category._count.posts} POSTS</span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center">
                          <div className="text-3xl font-black text-moss-600">→</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {categories.length === 0 && (
              <Card className="border-4 border-terra-200">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-terra-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2" style={{ color: '#666' }}>
                    NO CATEGORIES YET
                  </h3>
                  <p className="font-semibold" style={{ color: '#888' }}>
                    Check back soon for discussions!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black mb-2" style={{ color: '#36763d' }}>
                  {categories.reduce((sum: number, cat: any) => sum + cat._count.posts, 0)}
                </div>
                <div className="text-lg font-bold" style={{ color: '#666' }}>
                  CONVERSATIONS
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2" style={{ color: '#357777' }}>
                  {categories.length}
                </div>
                <div className="text-lg font-bold" style={{ color: '#666' }}>
                  CATEGORIES
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2" style={{ color: '#c24f31' }}>
                  1K+
                </div>
                <div className="text-lg font-bold" style={{ color: '#666' }}>
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
