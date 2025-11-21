import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
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
  Sparkles
} from 'lucide-react'
import prisma from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'

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
            forumPosts: true,
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
  const session = await getServerSession(authOptions)
  const user = await getUserProfile(id)

  if (!user) {
    notFound()
  }

  const isOwnProfile = session?.user?.id === user.id

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Banner */}
      <div
        className="h-80 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] relative"
        style={user.banner ? {
          backgroundImage: `url(${user.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="border-4 border-theme-primary shadow-theme-2xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full border-8 border-[var(--background)] overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl font-black text-[var(--primary-foreground)]">
                        {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-4xl font-black text-[var(--foreground)] mb-2">
                        {user.name || 'Anonymous User'}
                      </h1>
                      {user.headline && (
                        <p className="text-xl font-bold text-theme-muted mb-4">
                          {user.headline}
                        </p>
                      )}
                    </div>
                    {isOwnProfile ? (
                      <Link href="/profile/edit">
                        <Button size="lg" className="font-black">
                          <Edit className="w-5 h-5 mr-2" />
                          EDIT PROFILE
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="lg" className="font-black">
                          <UserPlus className="w-5 h-5 mr-2" />
                          FOLLOW
                        </Button>
                        <Button size="lg" variant="outline" className="font-black">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          MESSAGE
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Current Position */}
                  {(user.jobTitle || user.company) && (
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-5 h-5 text-theme-primary" />
                      <span className="text-lg font-semibold text-[var(--foreground)]">
                        {user.jobTitle}
                        {user.jobTitle && user.company && ' at '}
                        {user.company && <span className="font-black text-theme-primary">{user.company}</span>}
                      </span>
                    </div>
                  )}

                  {/* Location */}
                  {user.location && (
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-theme-accent" />
                      <span className="text-base font-semibold text-theme-muted">
                        {user.location}
                      </span>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    {user.website && (
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-theme-primary hover:text-theme-accent transition-colors">
                        <Globe className="w-5 h-5" />
                        <span className="font-bold text-sm">Website</span>
                      </a>
                    )}
                    {user.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-theme-primary hover:text-theme-accent transition-colors">
                        <Linkedin className="w-5 h-5" />
                        <span className="font-bold text-sm">LinkedIn</span>
                      </a>
                    )}
                    {user.twitter && (
                      <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-theme-primary hover:text-theme-accent transition-colors">
                        <Twitter className="w-5 h-5" />
                        <span className="font-bold text-sm">Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t-2 border-theme-muted">
                <div className="text-center">
                  <div className="text-3xl font-black text-theme-primary mb-1">
                    {user._count.followers}
                  </div>
                  <div className="text-sm font-bold text-theme-muted uppercase">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-theme-accent mb-1">
                    {user._count.following}
                  </div>
                  <div className="text-sm font-bold text-theme-muted uppercase">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-theme-secondary mb-1">
                    {user._count.articles}
                  </div>
                  <div className="text-sm font-bold text-theme-muted uppercase">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-theme-primary mb-1">
                    {user._count.forumPosts}
                  </div>
                  <div className="text-sm font-bold text-theme-muted uppercase">Forum Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-theme-accent mb-1">
                    {user._count.createdProjects}
                  </div>
                  <div className="text-sm font-bold text-theme-muted uppercase">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            {user.bio && (
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-black mb-4 text-[var(--foreground)]">ABOUT</h2>
                  <p className="text-base font-medium text-theme-muted leading-relaxed whitespace-pre-wrap">
                    {user.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {user.experience && Array.isArray(user.experience) && (user.experience as any[]).length > 0 && (
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-black mb-6 text-[var(--foreground)] flex items-center gap-3">
                    <Briefcase className="w-7 h-7 text-theme-accent" />
                    EXPERIENCE
                  </h2>
                  <div className="space-y-6">
                    {(user.experience as any[]).map((exp: any, index: number) => (
                      <div key={index} className="border-l-4 border-theme-accent pl-6">
                        <h3 className="text-xl font-black text-theme-accent mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-lg font-bold text-[var(--foreground)] mb-2">
                          {exp.company}
                        </p>
                        <p className="text-sm font-semibold text-theme-muted mb-3">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        {exp.description && (
                          <p className="text-base font-medium text-theme-muted leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {user.education && Array.isArray(user.education) && (user.education as any[]).length > 0 && (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-black mb-6 text-[var(--foreground)] flex items-center gap-3">
                    <GraduationCap className="w-7 h-7 text-theme-secondary" />
                    EDUCATION
                  </h2>
                  <div className="space-y-6">
                    {(user.education as any[]).map((edu: any, index: number) => (
                      <div key={index} className="border-l-4 border-theme-secondary pl-6">
                        <h3 className="text-xl font-black text-theme-secondary mb-1">
                          {edu.school}
                        </h3>
                        <p className="text-lg font-bold text-[var(--foreground)] mb-2">
                          {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                        </p>
                        <p className="text-sm font-semibold text-theme-muted">
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Expertise */}
            {user.expertise && user.expertise.length > 0 && (
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-6">
                  <h2 className="text-xl font-black mb-4 text-[var(--foreground)] flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-theme-primary" />
                    EXPERTISE
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] text-[var(--primary-foreground)] rounded-lg font-bold text-sm shadow-theme-md"
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
                <CardContent className="p-6">
                  <h2 className="text-xl font-black mb-4 text-[var(--foreground)]">INTERESTS</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent rounded-lg font-semibold text-sm border-2 border-theme-accent"
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
                <CardContent className="p-6">
                  <h2 className="text-xl font-black mb-4 text-[var(--foreground)] flex items-center gap-2">
                    <Award className="w-6 h-6 text-theme-secondary" />
                    BADGES
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {user.userBadges.map((userBadge) => (
                      <div
                        key={userBadge.id}
                        className="flex flex-col items-center p-3 bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] rounded-lg shadow-theme-md"
                        title={userBadge.badge.description}
                      >
                        <span className="text-3xl mb-1">{userBadge.badge.icon}</span>
                        <span className="text-xs font-bold text-[var(--primary-foreground)] text-center">
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
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-theme-primary" />
                  <span className="font-bold text-theme-muted">MEMBER SINCE</span>
                </div>
                <p className="text-xl font-black text-[var(--foreground)]">
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
