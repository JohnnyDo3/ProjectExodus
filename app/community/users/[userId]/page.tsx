import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, Calendar, MessageSquare, Award, Briefcase, Users } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
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
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Community" fallbackUrl="/community/users" />
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-2xl border-4 border-[var(--background)]">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-[var(--primary-foreground)]" />
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h1 className="text-5xl font-black mb-3 text-[var(--foreground)]">
                  {user.name || 'Anonymous User'}
                </h1>
                {user.bio && (
                  <p className="text-xl font-semibold mb-4 text-theme-muted">
                    {user.bio}
                  </p>
                )}
                <div className="flex items-center gap-6 text-base font-semibold mb-6 text-theme-muted">
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
      <section className="py-8 bg-[var(--background)] border-b-4 border-theme-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black mb-1 text-theme-primary">
                  {user._count.forumPosts}
                </div>
                <div className="text-sm font-bold text-theme-muted">POSTS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1 text-theme-accent">
                  {user._count.forumReplies}
                </div>
                <div className="text-sm font-bold text-theme-muted">REPLIES</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1 text-theme-secondary">
                  {user.projects.length}
                </div>
                <div className="text-sm font-bold text-theme-muted">PROJECTS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1 text-theme-primary">
                  {user.badges.length}
                </div>
                <div className="text-sm font-bold text-theme-muted">BADGES</div>
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
                  <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                    RECENT POSTS
                  </h2>
                  <div className="space-y-4">
                    {user.forumPosts.map((post: any) => (
                      <Link key={post.id} href={`/community/forum/posts/${post.id}`}>
                        <Card className="hover-lift border-2 border-theme-accent hover:border-theme-primary transition-all">
                          <CardContent className="p-5">
                            <h3 className="text-lg font-black mb-2 text-[var(--foreground)]">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm font-semibold text-theme-muted">
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
                      <Card className="border-2 border-theme-muted">
                        <CardContent className="p-8 text-center">
                          <p className="font-semibold text-theme-muted">
                            No posts yet
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                    RECENT REPLIES
                  </h2>
                  <div className="space-y-4">
                    {user.forumReplies.slice(0, 5).map((reply: any) => (
                      <Link key={reply.id} href={`/community/forum/posts/${reply.post.id}`}>
                        <Card className="hover-lift border-2 border-theme-primary hover:border-theme-accent transition-all">
                          <CardContent className="p-5">
                            <p className="text-sm font-bold mb-2 text-theme-muted">
                              Replied to: {reply.post.title}
                            </p>
                            <p className="text-base font-semibold line-clamp-2 text-[var(--foreground)]">
                              {reply.content}
                            </p>
                            <p className="text-sm font-semibold mt-2 text-theme-muted">
                              {formatDate(new Date(reply.createdAt))}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                    {user.forumReplies.length === 0 && (
                      <Card className="border-2 border-theme-muted">
                        <CardContent className="p-8 text-center">
                          <p className="font-semibold text-theme-muted">
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
                <Card className="border-4 border-theme-secondary">
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
                          <div key={userBadge.badge.id} className="flex items-center gap-3 p-3 bg-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] rounded-xl">
                            <div className="text-3xl">{userBadge.badge.icon}</div>
                            <div>
                              <p className="font-black text-sm text-[var(--foreground)]">
                                {userBadge.badge.name}
                              </p>
                              <p className="text-xs font-semibold text-theme-muted">
                                {userBadge.badge.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-center py-4 text-theme-muted">
                        No badges earned yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card className="border-4 border-theme-primary">
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
                          <div key={membership.project.id} className="p-3 bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] rounded-xl">
                            <p className="font-black text-sm mb-1 text-[var(--foreground)]">
                              {membership.project.name}
                            </p>
                            <p className="text-xs font-semibold text-theme-muted">
                              {membership.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-center py-4 text-theme-muted">
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
