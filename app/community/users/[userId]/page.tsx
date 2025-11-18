import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, Calendar, MessageSquare, Award, Briefcase, Users } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'

async function getUserProfile(userId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/users/${userId}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const user = await getUserProfile(userId)

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-ocean-50 to-moss-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-2xl border-4 border-white">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h1 className="text-5xl font-black mb-3" style={{ color: '#000' }}>
                  {user.name || 'Anonymous User'}
                </h1>
                {user.bio && (
                  <p className="text-xl font-semibold mb-4" style={{ color: '#333' }}>
                    {user.bio}
                  </p>
                )}
                <div className="flex items-center gap-6 text-base font-semibold mb-6" style={{ color: '#666' }}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Joined {formatDate(new Date(user.createdAt))}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{user._count.followers} followers</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button size="lg" className="font-black">FOLLOW</Button>
                  <Button size="lg" variant="outline" className="font-black border-2">MESSAGE</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b-4 border-sand-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#36763d' }}>
                  {user._count.forumPosts}
                </div>
                <div className="text-sm font-bold" style={{ color: '#666' }}>POSTS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#357777' }}>
                  {user._count.forumReplies}
                </div>
                <div className="text-sm font-bold" style={{ color: '#666' }}>REPLIES</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#c24f31' }}>
                  {user.projects.length}
                </div>
                <div className="text-sm font-bold" style={{ color: '#666' }}>PROJECTS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#b08d57' }}>
                  {user.badges.length}
                </div>
                <div className="text-sm font-bold" style={{ color: '#666' }}>BADGES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Recent Posts */}
                <div>
                  <h2 className="text-3xl font-black mb-6" style={{ color: '#000' }}>
                    RECENT POSTS
                  </h2>
                  <div className="space-y-4">
                    {user.forumPosts.map((post: any) => (
                      <Link key={post.id} href={`/community/forum/posts/${post.id}`}>
                        <Card className="hover-lift border-2 border-ocean-200 hover:border-ocean-400 transition-all">
                          <CardContent className="p-5">
                            <h3 className="text-lg font-black mb-2" style={{ color: '#000' }}>
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm font-semibold" style={{ color: '#666' }}>
                              <span>{post.category.name}</span>
                              <span>•</span>
                              <span>{formatDate(new Date(post.createdAt))}</span>
                              <span>•</span>
                              <span>{post._count.replies} replies</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                    {user.forumPosts.length === 0 && (
                      <Card className="border-2 border-sand-200">
                        <CardContent className="p-8 text-center">
                          <p className="font-semibold" style={{ color: '#888' }}>
                            No posts yet
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-3xl font-black mb-6" style={{ color: '#000' }}>
                    RECENT REPLIES
                  </h2>
                  <div className="space-y-4">
                    {user.forumReplies.slice(0, 5).map((reply: any) => (
                      <Link key={reply.id} href={`/community/forum/posts/${reply.post.id}`}>
                        <Card className="hover-lift border-2 border-moss-200 hover:border-moss-400 transition-all">
                          <CardContent className="p-5">
                            <p className="text-sm font-bold mb-2" style={{ color: '#666' }}>
                              Replied to: {reply.post.title}
                            </p>
                            <p className="text-base font-semibold line-clamp-2" style={{ color: '#1f2937' }}>
                              {reply.content}
                            </p>
                            <p className="text-sm font-semibold mt-2" style={{ color: '#888' }}>
                              {formatDate(new Date(reply.createdAt))}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                    {user.forumReplies.length === 0 && (
                      <Card className="border-2 border-sand-200">
                        <CardContent className="p-8 text-center">
                          <p className="font-semibold" style={{ color: '#888' }}>
                            No replies yet
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Badges */}
                <Card className="border-4 border-terra-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      BADGES
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.badges.length > 0 ? (
                      <div className="space-y-3">
                        {user.badges.map((userBadge: any) => (
                          <div key={userBadge.badge.id} className="flex items-center gap-3 p-3 bg-terra-50 rounded-xl">
                            <div className="text-3xl">{userBadge.badge.icon}</div>
                            <div>
                              <p className="font-black text-sm" style={{ color: '#000' }}>
                                {userBadge.badge.name}
                              </p>
                              <p className="text-xs font-semibold" style={{ color: '#666' }}>
                                {userBadge.badge.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-center py-4" style={{ color: '#888' }}>
                        No badges earned yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card className="border-4 border-moss-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      PROJECTS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.projects.length > 0 ? (
                      <div className="space-y-3">
                        {user.projects.map((membership: any) => (
                          <div key={membership.project.id} className="p-3 bg-moss-50 rounded-xl">
                            <p className="font-black text-sm mb-1" style={{ color: '#000' }}>
                              {membership.project.title}
                            </p>
                            <p className="text-xs font-semibold" style={{ color: '#666' }}>
                              {membership.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-center py-4" style={{ color: '#888' }}>
                        No projects yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
