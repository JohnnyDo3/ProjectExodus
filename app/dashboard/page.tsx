'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, Users, FileText, Settings, UserMinus, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Connection {
  id: string
  following: {
    id: string
    name: string | null
    email: string
    image: string | null
    bio: string | null
  }
  createdAt: string
}

interface Article {
  id: string
  title: string
  slug: string
  status: string
  publishedAt: string | null
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [connections, setConnections] = useState<Connection[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [unfollowing, setUnfollowing] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      // Fetch connections (people you follow)
      const connectionsRes = await fetch(`/api/users/${(session?.user as any)?.id}/connections`)
      if (connectionsRes.ok) {
        const data = await connectionsRes.json()
        setConnections(data.data || [])
      }

      // Fetch user's articles
      const articlesRes = await fetch(`/api/users/${(session?.user as any)?.id}/articles`)
      if (articlesRes.ok) {
        const data = await articlesRes.json()
        setArticles(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnfollow = async (followId: string, userId: string) => {
    setUnfollowing(followId)
    try {
      const res = await fetch('/api/users/follow', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followingId: userId })
      })

      if (res.ok) {
        setConnections(prev => prev.filter(c => c.id !== followId))
      }
    } catch (error) {
      console.error('Error unfollowing:', error)
    } finally {
      setUnfollowing(null)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-earth-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-moss-600" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900 transition-colors">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-moss-50 via-ocean-50 to-terra-50 dark:from-earth-800 dark:via-earth-900 dark:to-earth-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-xl">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-4xl font-black text-earth-900 dark:text-sand-100">
                  Welcome, {session.user?.name || 'User'}
                </h1>
                <p className="text-lg font-semibold text-earth-600 dark:text-sand-400">
                  Your sustainability dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* My Senate Widget - Interactive Connections */}
            <Card className="border-4 border-moss-300 dark:border-moss-700 dark:bg-earth-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-earth-900 dark:text-sand-100">
                  <Users className="w-5 h-5 text-moss-600 dark:text-moss-400" />
                  MY SENATE
                </CardTitle>
                <p className="text-sm text-earth-600 dark:text-sand-400">
                  People you follow in the community
                </p>
              </CardHeader>
              <CardContent>
                {connections.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-sand-300 dark:text-earth-600 mx-auto mb-4" />
                    <p className="text-earth-500 dark:text-sand-500 font-medium mb-4">
                      You haven't connected with anyone yet
                    </p>
                    <Link href="/community/users">
                      <Button variant="outline" size="sm" className="dark:border-earth-600 dark:text-sand-200">
                        Find People
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {connections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-center justify-between p-3 bg-moss-50 dark:bg-earth-700 rounded-lg group hover:bg-moss-100 dark:hover:bg-earth-600 transition-colors"
                      >
                        <Link
                          href={`/community/users/${connection.following.id}`}
                          className="flex items-center gap-3 flex-1 min-w-0"
                        >
                          <div className="w-10 h-10 rounded-full bg-moss-200 dark:bg-moss-800 flex items-center justify-center flex-shrink-0">
                            {connection.following.image ? (
                              <img
                                src={connection.following.image}
                                alt={connection.following.name || 'User'}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-moss-600 dark:text-moss-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-earth-900 dark:text-sand-100 truncate">
                              {connection.following.name || 'Anonymous'}
                            </p>
                            {connection.following.bio && (
                              <p className="text-xs text-earth-500 dark:text-sand-400 truncate">
                                {connection.following.bio}
                              </p>
                            )}
                          </div>
                        </Link>
                        <button
                          onClick={() => handleUnfollow(connection.id, connection.following.id)}
                          disabled={unfollowing === connection.id}
                          className="p-2 text-terra-600 dark:text-terra-400 hover:bg-terra-100 dark:hover:bg-terra-900/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Unfollow"
                        >
                          {unfollowing === connection.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <UserMinus className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {connections.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-sand-200 dark:border-earth-600">
                    <Link href="/community/users">
                      <Button variant="outline" size="sm" className="w-full dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700">
                        Find More People
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Articles Widget */}
            <Card className="border-4 border-ocean-300 dark:border-ocean-700 dark:bg-earth-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-earth-900 dark:text-sand-100">
                  <FileText className="w-5 h-5 text-ocean-600 dark:text-ocean-400" />
                  MY ARTICLES
                </CardTitle>
                <p className="text-sm text-earth-600 dark:text-sand-400">
                  Articles you've written
                </p>
              </CardHeader>
              <CardContent>
                {articles.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-sand-300 dark:text-earth-600 mx-auto mb-4" />
                    <p className="text-earth-500 dark:text-sand-500 font-medium mb-4">
                      You haven't written any articles yet
                    </p>
                    <Link href="/admin/articles/new">
                      <Button variant="outline" size="sm" className="dark:border-earth-600 dark:text-sand-200">
                        Write Your First Article
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="block p-3 bg-ocean-50 dark:bg-earth-700 rounded-lg hover:bg-ocean-100 dark:hover:bg-earth-600 transition-colors"
                      >
                        <p className="font-bold text-earth-900 dark:text-sand-100 line-clamp-1">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            article.status === 'PUBLISHED'
                              ? 'bg-moss-200 dark:bg-moss-900 text-moss-700 dark:text-moss-300'
                              : 'bg-sand-200 dark:bg-earth-600 text-earth-600 dark:text-sand-400'
                          }`}>
                            {article.status}
                          </span>
                          <span className="text-xs text-earth-500 dark:text-sand-400">
                            {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {articles.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-sand-200 dark:border-earth-600">
                    <Link href="/admin/articles/new">
                      <Button variant="outline" size="sm" className="w-full dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700">
                        Write New Article
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="md:col-span-2 border-4 border-terra-300 dark:border-terra-700 dark:bg-earth-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-earth-900 dark:text-sand-100">
                  <Settings className="w-5 h-5 text-terra-600 dark:text-terra-400" />
                  QUICK ACTIONS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Link href="/community/forum">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700">
                      <Users className="w-6 h-6" />
                      <span className="font-bold">Round Table</span>
                    </Button>
                  </Link>
                  <Link href="/community/projects">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700">
                      <FileText className="w-6 h-6" />
                      <span className="font-bold">Projects</span>
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700">
                      <FileText className="w-6 h-6" />
                      <span className="font-bold">Learn</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
