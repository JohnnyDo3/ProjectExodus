import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Users, Search, UserPlus, MapPin, Briefcase } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        headline: true,
        location: true,
        expertise: true,
        _count: {
          select: {
            followers: true,
            articles: true,
            forumPosts: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export default async function MemberDirectoryPage() {
  const users = await getUsers()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Community" fallbackUrl="/community" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-black text-[var(--foreground)]">
              MEMBER DIRECTORY
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Connect with {users.length}+ sustainability champions from around the world
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-[var(--background)] border-b-4 border-theme-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-theme-muted" />
              <input
                type="text"
                placeholder="Search members by name, location, or expertise..."
                className="w-full pl-16 pr-6 py-4 text-lg font-semibold rounded-2xl bg-[var(--card)] border-4 border-theme-primary focus:border-theme-accent focus:outline-none text-[var(--foreground)] placeholder:text-theme-muted shadow-theme-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card key={user.id} className="border-4 border-theme-primary hover:border-theme-accent transition-all hover-lift">
                  <CardContent className="p-6">
                    <Link href={`/profile/${user.id}`} className="block">
                      {/* User Avatar */}
                      <div className="flex flex-col items-center text-center mb-4">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || 'User'}
                            className="w-20 h-20 rounded-full object-cover mb-3"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mb-3">
                            <span className="text-3xl font-black text-white">
                              {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                            </span>
                          </div>
                        )}

                        <h3 className="text-xl font-black text-[var(--foreground)] mb-1 hover:text-theme-primary transition-colors">
                          {user.name || 'Anonymous User'}
                        </h3>

                        {user.headline && (
                          <p className="text-sm font-semibold text-theme-muted mb-3">
                            {user.headline}
                          </p>
                        )}

                        {user.location && (
                          <div className="flex items-center gap-1 text-sm font-semibold text-theme-muted mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Expertise Tags */}
                      {user.expertise && user.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 justify-center">
                          {user.expertise.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary rounded-lg font-bold text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {user.expertise.length > 3 && (
                            <span className="px-2 py-1 bg-[var(--muted)] text-theme-muted rounded-lg font-bold text-xs">
                              +{user.expertise.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t-2 border-theme-muted">
                        <div className="text-center">
                          <div className="text-lg font-black text-theme-primary">
                            {user._count.followers}
                          </div>
                          <div className="text-xs font-bold text-theme-muted">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-black text-theme-accent">
                            {user._count.articles}
                          </div>
                          <div className="text-xs font-bold text-theme-muted">Articles</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-black text-theme-secondary">
                            {user._count.forumPosts}
                          </div>
                          <div className="text-xs font-bold text-theme-muted">Posts</div>
                        </div>
                      </div>
                    </Link>

                    {/* Follow Button */}
                    <Button size="sm" className="w-full mt-4 font-black">
                      <UserPlus className="w-4 h-4 mr-2" />
                      FOLLOW
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
