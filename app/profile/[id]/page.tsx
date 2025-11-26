import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { FollowButton } from '@/components/profile/FollowButton'
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Edit,
  UserPlus,
  MessageSquare,
  Award,
  Calendar,
  Building2,
  Sparkles,
  ArrowLeft
} from 'lucide-react'
import prisma from '@/lib/db/prisma'
import { auth } from '@/auth'

async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          include: {
            badge: true
          }
        },
        _count: {
          select: {
            followers: true,
            following: true,
            articles: true,
            createdProjects: true
          }
        }
      }
    })
    return user
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const user = await getUserProfile(id)

  if (!user) {
    notFound()
  }

  const isOwnProfile = session?.user?.id === user.id

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Back to Network Navigation */}
      {!isOwnProfile && (
        <div className="bg-[var(--background)] border-b-2 border-[var(--border)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-5xl mx-auto">
              <Link href="/network">
                <Button variant="ghost" size="sm" className="font-bold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  BACK TO NETWORK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Compact Banner */}
      <div
        className="h-40 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] relative"
        style={user.banner ? {
          backgroundImage: `url(${user.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent" />
      </div>

      {/* Compact Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="border-4 border-theme-primary shadow-theme-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Smaller Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full border-6 border-[var(--background)] overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-black text-[var(--primary-foreground)]">
                        {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h1 className="text-3xl font-black text-[var(--foreground)] mb-1">
                        {user.name || 'Anonymous User'}
                      </h1>
                      {user.headline && (
                        <p className="text-lg font-bold text-theme-muted mb-2">
                          {user.headline}
                        </p>
                      )}
                    </div>
                    {isOwnProfile ? (
                      <Link href="/profile/edit">
                        <Button size="sm" className="font-black">
                          <Edit className="w-4 h-4 mr-2" />
                          EDIT
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex gap-2">
                        <FollowButton userId={user.id} className="font-black" />
                        <Link href={`/messages/${user.id}`}>
                          <Button size="sm" variant="outline" className="font-black">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            MESSAGE
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Current Position */}
                  {(user.jobTitle || user.company) && (
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-theme-primary" />
                      <span className="text-base font-semibold text-[var(--foreground)]">
                        {user.jobTitle}
                        {user.jobTitle && user.company && ' at '}
                        {user.company && <span className="font-black text-theme-primary">{user.company}</span>}
                      </span>
                    </div>
                  )}

                  {/* Location & Links - Combined */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-theme-accent" />
                        <span className="font-semibold text-theme-muted">{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-theme-primary hover:text-theme-accent transition-colors">
                        <Globe className="w-4 h-4" />
                        <span className="font-bold">Website</span>
                      </a>
                    )}
                    {user.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-theme-primary hover:text-theme-accent transition-colors">
                        <Linkedin className="w-4 h-4" />
                        <span className="font-bold">LinkedIn</span>
                      </a>
                    )}
                    {user.twitter && (
                      <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-theme-primary hover:text-theme-accent transition-colors">
                        <Twitter className="w-4 h-4" />
                        <span className="font-bold">Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Compact Stats */}
              <div className="grid grid-cols-5 gap-3 mt-6 pt-6 border-t-2 border-theme-muted">
                <div className="text-center">
                  <div className="text-2xl font-black text-theme-primary mb-1">
                    {user._count.followers}
                  </div>
                  <div className="text-xs font-bold text-theme-muted uppercase">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-theme-accent mb-1">
                    {user._count.following}
                  </div>
                  <div className="text-xs font-bold text-theme-muted uppercase">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-theme-secondary mb-1">
                    {user._count.articles}
                  </div>
                  <div className="text-xs font-bold text-theme-muted uppercase">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-theme-accent mb-1">
                    {user._count.createdProjects}
                  </div>
                  <div className="text-xs font-bold text-theme-muted uppercase">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compact Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-4">
            {/* About - Collapsible */}
            {user.bio && (
              <Card className="border-4 border-theme-primary">
                <details open>
                  <summary className="p-4 cursor-pointer hover:bg-[var(--muted)] transition-colors list-none">
                    <h2 className="text-xl font-black text-[var(--foreground)] inline">ABOUT</h2>
                  </summary>
                  <CardContent className="px-4 pb-4 pt-0">
                    <p className="text-sm font-medium text-theme-muted leading-relaxed whitespace-pre-wrap">
                      {user.bio}
                    </p>
                  </CardContent>
                </details>
              </Card>
            )}

            {/* Experience - Collapsible */}
            {user.experience && Array.isArray(user.experience) && (user.experience as any[]).length > 0 && (
              <Card className="border-4 border-theme-accent">
                <details open>
                  <summary className="p-4 cursor-pointer hover:bg-[var(--muted)] transition-colors list-none">
                    <h2 className="text-xl font-black text-[var(--foreground)] inline flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-theme-accent inline" />
                      EXPERIENCE
                    </h2>
                  </summary>
                  <CardContent className="px-4 pb-4 pt-0">
                    <div className="space-y-4">
                      {(user.experience as any[]).map((exp: any, index: number) => (
                        <div key={index} className="border-l-4 border-theme-accent pl-4">
                          <h3 className="text-lg font-black text-theme-accent mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-base font-bold text-[var(--foreground)] mb-1">
                            {exp.company}
                          </p>
                          <p className="text-xs font-semibold text-theme-muted mb-2">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </p>
                          {exp.description && (
                            <p className="text-sm font-medium text-theme-muted leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </details>
              </Card>
            )}

            {/* Education - Collapsible */}
            {user.education && Array.isArray(user.education) && (user.education as any[]).length > 0 && (
              <Card className="border-4 border-theme-secondary">
                <details open>
                  <summary className="p-4 cursor-pointer hover:bg-[var(--muted)] transition-colors list-none">
                    <h2 className="text-xl font-black text-[var(--foreground)] inline flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-theme-secondary inline" />
                      EDUCATION
                    </h2>
                  </summary>
                  <CardContent className="px-4 pb-4 pt-0">
                    <div className="space-y-4">
                      {(user.education as any[]).map((edu: any, index: number) => (
                        <div key={index} className="border-l-4 border-theme-secondary pl-4">
                          <h3 className="text-lg font-black text-theme-secondary mb-1">
                            {edu.school}
                          </h3>
                          <p className="text-base font-bold text-[var(--foreground)] mb-1">
                            {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                          </p>
                          <p className="text-xs font-semibold text-theme-muted">
                            {edu.startYear} - {edu.endYear || 'Present'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </details>
              </Card>
            )}
          </div>

          {/* Right Column - More Compact */}
          <div className="space-y-4">
            {/* Expertise */}
            {user.expertise && user.expertise.length > 0 && (
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-4">
                  <h2 className="text-lg font-black mb-3 text-[var(--foreground)] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-theme-primary" />
                    EXPERTISE
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.map((skill: any, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] text-[var(--primary-foreground)] rounded-lg font-bold text-xs shadow-theme-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-4">
                  <h2 className="text-lg font-black mb-3 text-[var(--foreground)]">INTERESTS</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest: any, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent rounded-lg font-semibold text-xs border-2 border-theme-accent"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Badges */}
            {user.userBadges && user.userBadges.length > 0 && (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-4">
                  <h2 className="text-lg font-black mb-3 text-[var(--foreground)] flex items-center gap-2">
                    <Award className="w-5 h-5 text-theme-secondary" />
                    BADGES
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {user.userBadges.map((userBadge: any) => (
                      <div
                        key={userBadge.id}
                        className="flex flex-col items-center p-2 bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] rounded-lg shadow-theme-md"
                        title={userBadge.badge.description}
                      >
                        <span className="text-2xl mb-1">{userBadge.badge.icon}</span>
                        <span className="text-[10px] font-bold text-[var(--primary-foreground)] text-center leading-tight">
                          {userBadge.badge.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Member Since */}
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-theme-primary" />
                  <span className="font-bold text-theme-muted text-sm">MEMBER SINCE</span>
                </div>
                <p className="text-lg font-black text-[var(--foreground)]">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
