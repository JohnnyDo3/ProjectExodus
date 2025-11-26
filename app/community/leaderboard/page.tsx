import { Card, CardContent } from '@/components/ui/Card'
import { Trophy, Medal, Award, TrendingUp, Users, MessageSquare, Rocket } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'

async function getLeaderboardData() {
  try {
    // Top Contributors by Articles
    const topArticleWriters = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        headline: true,
        expertise: true,
        _count: {
          select: {
            articles: true
          }
        }
      },
      orderBy: {
        articles: {
          _count: 'desc'
        }
      },
      take: 10
    })

    // Most Followed Users
    const mostFollowed = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        headline: true,
        _count: {
          select: {
            followers: true
          }
        }
      },
      orderBy: {
        followers: {
          _count: 'desc'
        }
      },
      take: 10
    })

    return {
      topArticleWriters,
      mostFollowed
    }
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
    return {
      topArticleWriters: [],
      mostFollowed: []
    }
  }
}

function LeaderboardSection({ title, users, icon: Icon, countKey, countLabel, medalColor }: any) {
  return (
    <Card className="border-4 border-theme-primary">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-full bg-${medalColor}-500/20 flex items-center justify-center`}>
            <Icon className={`w-7 h-7 text-${medalColor}-600`} />
          </div>
          <h2 className="text-2xl font-black text-[var(--foreground)]">{title}</h2>
        </div>

        <div className="space-y-4">
          {users.map((user: any, index: number) => {
            const medalIcons = [Trophy, Medal, Award]
            const MedalIcon = index < 3 ? medalIcons[index] : null
            const count = countKey.split('.').reduce((obj: any, key: string) => obj?.[key], user)

            return (
              <Link key={user.id} href={`/profile/${user.id}`}>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--muted)] transition-colors cursor-pointer group">
                  {/* Rank */}
                  <div className="w-10 text-center flex-shrink-0">
                    {MedalIcon ? (
                      <MedalIcon className={`w-8 h-8 mx-auto ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        'text-orange-600'
                      }`} />
                    ) : (
                      <span className="text-2xl font-black text-theme-muted">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        <span className="text-lg font-black text-white">
                          {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-[var(--foreground)] group-hover:text-theme-primary transition-colors truncate">
                      {user.name || 'Anonymous User'}
                    </h3>
                    {user.headline && (
                      <p className="text-sm font-semibold text-theme-muted truncate">
                        {user.headline}
                      </p>
                    )}
                  </div>

                  {/* Count */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black text-theme-primary">
                      {count}
                    </div>
                    <div className="text-xs font-bold text-theme-muted uppercase">
                      {countLabel}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function LeaderboardPage() {
  const { topArticleWriters, mostFollowed } = await getLeaderboardData()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Community" fallbackUrl="/community" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl">
                <Trophy className="w-14 h-14 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-black text-[var(--foreground)]">
              COMMUNITY LEADERBOARD
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Celebrating our top contributors and sustainability champions
            </p>
          </div>
        </div>
      </section>

      {/* Leaderboards */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Top Article Writers */}
            <LeaderboardSection
              title="TOP KNOWLEDGE SHARERS"
              users={topArticleWriters}
              icon={TrendingUp}
              countKey="_count.articles"
              countLabel="Articles"
              medalColor="primary"
            />

            {/* Most Followed */}
            <LeaderboardSection
              title="COMMUNITY LEADERS"
              users={mostFollowed}
              icon={Users}
              countKey="_count.followers"
              countLabel="Followers"
              medalColor="secondary"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-black">READY TO MAKE YOUR MARK?</h2>
            <p className="text-2xl font-semibold">
              Join the community, share your knowledge, and climb the leaderboard!
            </p>
            <div className="flex justify-center">
              <Link href="/community/feed">
                <button className="text-xl px-12 py-6 bg-white text-[var(--primary)] hover:bg-gray-100 font-black shadow-2xl rounded-2xl">
                  JOIN THE FEED
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
