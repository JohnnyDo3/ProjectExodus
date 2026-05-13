import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { FollowButton } from '@/components/profile/FollowButton'
import { ProfileBusinessCard } from '@/components/profile/ProfileBusinessCard'
import { ShareButtons } from '@/components/article/ShareButtons'
import { BannerUploader } from '@/components/profile/BannerUploader'
import { EndorsementsWidget } from '@/components/profile/EndorsementsWidget'
import {
  ArrowLeft,
  Edit,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Calendar,
  MessageSquare,
  FileText,
  BookOpen,
  Languages,
  ShieldCheck,
  Heart,
  Star,
  Folder,
  Trophy,
} from 'lucide-react'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { loadProfile } from '@/lib/profile/loadProfile'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface ArrayEntry {
  [key: string]: unknown
}

function safeArray(value: unknown): ArrayEntry[] {
  return Array.isArray(value) ? (value as ArrayEntry[]) : []
}

async function getRecentActivity(userId: string) {
  const [articles, projects] = await Promise.all([
    prisma.article.findMany({
      where: { authorId: userId, status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: {
        id: true, title: true, slug: true, excerpt: true,
        coverImage: true, readTime: true, publishedAt: true,
      },
    }).catch(() => []),
    prisma.project.findMany({
      where: { creatorId: userId, visibility: 'PUBLIC' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true, name: true, slug: true, description: true,
        coverImage: true, createdAt: true,
      },
    }).catch(() => []),
  ])
  return { articles, projects }
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const { user, isOwnProfile } = await loadProfile(id, session?.user?.id)
  if (!user) notFound()

  const { articles, projects } = await getRecentActivity(user.id as string)

  // Local convenience accessors. The loader returns Record<string, unknown>
  // since privacy filtering may have stripped fields; downstream code
  // already guards every section by truthiness.
  const u = user as Record<string, any>
  const experience = safeArray(u.experience)
  const education = safeArray(u.education)
  const skills = safeArray(u.skills)
  const certifications = safeArray(u.certifications)
  const volunteer = safeArray(u.volunteer)
  const publications = safeArray(u.publications)
  const honors = safeArray(u.honors)
  const userProjects = safeArray(u.projects)
  const languages = Array.isArray(u.languages) ? u.languages as (string | { name: string; level?: string })[] : []
  const expertise: string[] = Array.isArray(u.expertise) ? u.expertise : []
  const interests: string[] = Array.isArray(u.interests) ? u.interests : []
  const badges: { id: string; badge: { name: string; description?: string; icon: string } }[] = Array.isArray(u.userBadges) ? u.userBadges : []
  const counts = (u._count || {}) as { followers?: number; following?: number; articles?: number; createdProjects?: number }

  const canonicalUrl = `${SITE_URL}/profile/${u.id}`

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Back to Network nav — for visitors only. Own profile is the
          landing page, no back link needed. */}
      {!isOwnProfile && (
        <div className="bg-[var(--background)] border-b-2 border-[var(--border)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-5xl mx-auto">
              <Link href="/network">
                <Button variant="ghost" size="sm" className="font-bold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Network
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── Banner ────────────────────────────────────────────── */}
      <div
        className="relative h-48 sm:h-64 md:h-72 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
        style={u.banner ? {
          backgroundImage: `url(${u.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--muted)] via-[var(--muted)]/40 to-transparent" />
        {isOwnProfile && <BannerUploader userId={u.id as string} />}
      </div>

      {/* ─── Hero card (overlapping the banner) ───────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="border-4 border-theme-primary shadow-theme-2xl">
            <CardContent className="p-5 sm:p-7">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 -mt-16 sm:-mt-20 mx-auto md:mx-0">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-[6px] border-[var(--background)] overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-2xl">
                    {u.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={u.image} alt={u.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl font-black text-[var(--primary-foreground)]">
                        {(u.name as string)?.[0]?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Identity + actions */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] leading-tight">
                          {u.name || 'Anonymous'}
                        </h1>
                        {u.verified && (
                          <ShieldCheck className="w-6 h-6 text-theme-primary shrink-0" aria-label="Verified" />
                        )}
                      </div>
                      {u.headline && (
                        <p className="text-base sm:text-lg font-bold text-theme-muted mt-0.5">
                          {u.headline as string}
                        </p>
                      )}
                      {(u.jobTitle || u.company) && (
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Briefcase className="w-4 h-4 text-theme-primary shrink-0" />
                          <span className="font-semibold text-[var(--foreground)]">
                            {u.jobTitle}
                            {u.jobTitle && u.company && ' at '}
                            {u.company && <span className="font-black text-theme-primary">{u.company}</span>}
                          </span>
                        </div>
                      )}
                      {u.location && (
                        <div className="flex items-center gap-1 mt-1.5 text-sm">
                          <MapPin className="w-4 h-4 text-theme-accent shrink-0" />
                          <span className="font-semibold text-theme-muted">{u.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isOwnProfile ? (
                        <Link href="/settings">
                          <Button size="sm" className="font-black">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit profile
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <FollowButton userId={u.id as string} className="font-black" />
                          <Link href={`/messages/${u.id}`}>
                            <Button size="sm" variant="outline" className="font-black">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Social + share row */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                    {u.website && (
                      <a href={u.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-theme-primary hover:opacity-80 font-bold">
                        <Globe className="w-4 h-4" /> Website
                      </a>
                    )}
                    {u.linkedin && (
                      <a href={u.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-theme-primary hover:opacity-80 font-bold">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                    {u.twitter && (
                      <a href={u.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-theme-primary hover:opacity-80 font-bold">
                        <Twitter className="w-4 h-4" /> Twitter
                      </a>
                    )}
                    {u.email && (
                      <a href={`mailto:${u.email}`} className="inline-flex items-center gap-1 text-theme-muted hover:text-theme-primary font-bold">
                        <Mail className="w-4 h-4" /> {u.email as string}
                      </a>
                    )}
                    {u.phone && (
                      <a href={`tel:${u.phone}`} className="inline-flex items-center gap-1 text-theme-muted hover:text-theme-primary font-bold">
                        <Phone className="w-4 h-4" /> {u.phone as string}
                      </a>
                    )}
                    <div className="ml-auto">
                      <ShareButtons
                        url={canonicalUrl}
                        title={`${u.name || 'Profile'} on Project Exodus`}
                        description={(u.headline as string) || (u.bio as string)?.slice(0, 160) || ''}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats — four columns, fixes the previous grid-cols-5 bug. */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t-2 border-[var(--border)]">
                <Stat label="Followers" value={counts.followers ?? 0} accent="text-theme-primary" />
                <Stat label="Following" value={counts.following ?? 0} accent="text-theme-accent" />
                <Stat label="Articles" value={counts.articles ?? 0} accent="text-theme-secondary" />
                <Stat label="Projects" value={counts.createdProjects ?? 0} accent="text-theme-accent" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Digital business card widget (existing) ──────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-5xl mx-auto">
          <ProfileBusinessCard userId={u.id as string} isFullView={true} />
        </div>
      </div>

      {/* ─── Main content (two columns) ──────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {/* Left column — long-form sections */}
          <div className="md:col-span-2 space-y-4">
            {u.bio && (
              <CollapsibleSection title="About" icon={null}>
                <p className="text-sm font-medium text-theme-muted leading-relaxed whitespace-pre-wrap">
                  {u.bio as string}
                </p>
              </CollapsibleSection>
            )}

            {experience.length > 0 && (
              <CollapsibleSection title="Experience" icon={<Briefcase className="w-5 h-5 text-theme-accent" />}>
                <div className="space-y-4">
                  {experience.map((exp: ArrayEntry, i: number) => (
                    <div key={i} className="border-l-4 border-theme-accent pl-4">
                      {!!exp.title && <h3 className="text-lg font-black text-theme-accent mb-0.5">{exp.title as string}</h3>}
                      {!!exp.company && <p className="text-base font-bold text-[var(--foreground)] mb-0.5">{exp.company as string}</p>}
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-xs font-semibold text-theme-muted mb-1.5">
                          {(exp.startDate as string) || ''}{(exp.startDate || exp.endDate) && ' – '}{(exp.endDate as string) || 'Present'}
                        </p>
                      )}
                      {!!exp.description && (
                        <p className="text-sm font-medium text-theme-muted leading-relaxed whitespace-pre-wrap">{exp.description as string}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

            {education.length > 0 && (
              <CollapsibleSection title="Education" icon={<GraduationCap className="w-5 h-5 text-theme-secondary" />}>
                <div className="space-y-4">
                  {education.map((edu: ArrayEntry, i: number) => (
                    <div key={i} className="border-l-4 border-theme-secondary pl-4">
                      {!!edu.school && <h3 className="text-lg font-black text-theme-secondary mb-0.5">{edu.school as string}</h3>}
                      <p className="text-base font-bold text-[var(--foreground)] mb-0.5">
                        {edu.degree as string} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy as string}` : ''}
                      </p>
                      {(edu.startYear || edu.endYear) && (
                        <p className="text-xs font-semibold text-theme-muted">
                          {(edu.startYear as string) || ''}{(edu.startYear || edu.endYear) && ' – '}{(edu.endYear as string) || 'Present'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

            {userProjects.length > 0 && (
              <CollapsibleSection title="Notable projects" icon={<Folder className="w-5 h-5 text-theme-primary" />}>
                <div className="space-y-3">
                  {userProjects.map((p: ArrayEntry, i: number) => (
                    <div key={i} className="border-l-4 border-theme-primary pl-4">
                      {!!p.title && <h3 className="text-base font-black text-theme-primary mb-0.5">{p.title as string}</h3>}
                      {!!p.description && <p className="text-sm text-theme-muted leading-relaxed">{p.description as string}</p>}
                      {!!p.url && (
                        <a href={p.url as string} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-theme-primary underline mt-1 inline-block">
                          Visit →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

            {publications.length > 0 && (
              <CollapsibleSection title="Publications" icon={<BookOpen className="w-5 h-5 text-theme-accent" />}>
                <ul className="space-y-2 text-sm">
                  {publications.map((p: ArrayEntry, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-theme-primary shrink-0">•</span>
                      <span className="text-theme-muted leading-relaxed">
                        {!!p.title && <strong className="text-[var(--foreground)]">{p.title as string}</strong>}
                        {p.publisher ? ` · ${p.publisher as string}` : ''}
                        {p.year ? ` (${p.year as string})` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {honors.length > 0 && (
              <CollapsibleSection title="Honors & awards" icon={<Trophy className="w-5 h-5 text-theme-secondary" />}>
                <ul className="space-y-2 text-sm">
                  {honors.map((h: ArrayEntry, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-theme-secondary shrink-0">•</span>
                      <span className="text-theme-muted leading-relaxed">
                        {!!h.title && <strong className="text-[var(--foreground)]">{h.title as string}</strong>}
                        {h.issuer ? ` · ${h.issuer as string}` : ''}
                        {h.year ? ` (${h.year as string})` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {volunteer.length > 0 && (
              <CollapsibleSection title="Volunteer experience" icon={<Heart className="w-5 h-5 text-theme-primary" />}>
                <ul className="space-y-2 text-sm">
                  {volunteer.map((v: ArrayEntry, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-theme-primary shrink-0">•</span>
                      <span className="text-theme-muted leading-relaxed">
                        {!!v.role && <strong className="text-[var(--foreground)]">{v.role as string}</strong>}
                        {v.organization ? ` at ${v.organization as string}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {articles.length > 0 && (
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-4">
                  <h2 className="text-xl font-black text-[var(--foreground)] mb-3">Recent articles</h2>
                  <ul className="space-y-3">
                    {articles.map(a => (
                      <li key={a.id}>
                        <Link href={`/articles/${a.slug}`} className="block group">
                          <p className="font-bold text-[var(--foreground)] group-hover:text-theme-primary transition-colors">
                            {a.title}
                          </p>
                          {a.excerpt && (
                            <p className="text-sm text-theme-muted leading-snug mt-0.5 line-clamp-2">{a.excerpt}</p>
                          )}
                          <p className="text-xs text-theme-muted mt-1">
                            {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                            {a.readTime ? ` · ${a.readTime} min read` : ''}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {projects.length > 0 && (
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-4">
                  <h2 className="text-xl font-black text-[var(--foreground)] mb-3">Recent projects</h2>
                  <ul className="space-y-3">
                    {projects.map(p => (
                      <li key={p.id}>
                        <Link href={`/community/projects/${p.slug}`} className="block group">
                          <p className="font-bold text-[var(--foreground)] group-hover:text-theme-accent transition-colors">
                            {p.name}
                          </p>
                          {p.description && (
                            <p className="text-sm text-theme-muted leading-snug mt-0.5 line-clamp-2">{p.description}</p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column — concise sidebar */}
          <div className="space-y-4">
            {!!u.declaration && (
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-4">
                  <h2 className="text-sm font-black mb-2 uppercase tracking-wider text-theme-primary">Declaration</h2>
                  <p className="text-sm italic text-theme-muted leading-relaxed">&quot;{u.declaration as string}&quot;</p>
                </CardContent>
              </Card>
            )}

            {expertise.length > 0 && (
              <EndorsementsWidget userId={u.id as string} isOwnProfile={isOwnProfile} />
            )}

            {skills.length > 0 && (
              <SidebarCard title="Skills" icon={<Star className="w-5 h-5 text-theme-primary" />}>
                <ChipList items={skills.map(s => (typeof s === 'string' ? s : (s as ArrayEntry).name as string)).filter(Boolean)} variant="outline" />
              </SidebarCard>
            )}

            {languages.length > 0 && (
              <SidebarCard title="Languages" icon={<Languages className="w-5 h-5 text-theme-accent" />}>
                <ul className="text-sm space-y-1.5">
                  {languages.map((l, i) => (
                    <li key={i} className="text-[var(--foreground)]">
                      {typeof l === 'string'
                        ? l
                        : (<><span className="font-bold">{l.name}</span>{l.level && <span className="text-theme-muted"> — {l.level}</span>}</>)}
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            )}

            {certifications.length > 0 && (
              <SidebarCard title="Certifications" icon={<Award className="w-5 h-5 text-theme-secondary" />}>
                <ul className="text-sm space-y-2">
                  {certifications.map((c: ArrayEntry, i: number) => (
                    <li key={i} className="leading-tight">
                      <p className="font-bold text-[var(--foreground)]">{c.name as string}</p>
                      {!!c.issuer && <p className="text-xs text-theme-muted">{c.issuer as string}</p>}
                      {!!c.year && <p className="text-xs text-theme-muted">{c.year as string}</p>}
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            )}

            {interests.length > 0 && (
              <SidebarCard title="Interests" icon={null}>
                <ChipList items={interests} variant="outline-accent" />
              </SidebarCard>
            )}

            {badges.length > 0 && (
              <SidebarCard title="Badges" icon={<Award className="w-5 h-5 text-theme-secondary" />}>
                <div className="grid grid-cols-2 gap-2">
                  {badges.map(b => (
                    <div
                      key={b.id}
                      className="flex flex-col items-center p-2 bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] rounded-lg shadow-theme-md"
                      title={b.badge.description}
                    >
                      <span className="text-2xl mb-1">{b.badge.icon}</span>
                      <span className="text-[10px] font-bold text-[var(--primary-foreground)] text-center leading-tight">{b.badge.name}</span>
                    </div>
                  ))}
                </div>
              </SidebarCard>
            )}

            {u.resume && (
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-4">
                  <a
                    href={u.resume as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-black text-theme-accent hover:opacity-80"
                  >
                    <FileText className="w-5 h-5" />
                    Download résumé
                  </a>
                </CardContent>
              </Card>
            )}

            <Card className="border-4 border-theme-primary">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-theme-primary" />
                  <span className="font-bold text-theme-muted text-sm uppercase tracking-wider">Member since</span>
                </div>
                <p className="text-lg font-black text-[var(--foreground)]">
                  {new Date(u.createdAt as string).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────── small helpers ────────────────────────────── */

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-black mb-0.5 ${accent}`}>{value}</div>
      <div className="text-xs font-bold text-theme-muted uppercase">{label}</div>
    </div>
  )
}

function CollapsibleSection({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode | null
  children: React.ReactNode
}) {
  return (
    <Card className="border-4 border-theme-primary/40">
      <details open>
        <summary className="p-4 cursor-pointer hover:bg-[var(--muted)] transition-colors list-none">
          <h2 className="text-xl font-black text-[var(--foreground)] inline-flex items-center gap-2">
            {icon}
            {title}
          </h2>
        </summary>
        <CardContent className="px-4 pb-4 pt-0">{children}</CardContent>
      </details>
    </Card>
  )
}

function SidebarCard({ title, icon, children }: { title: string; icon: React.ReactNode | null; children: React.ReactNode }) {
  return (
    <Card className="border-4 border-theme-accent/40">
      <CardContent className="p-4">
        <h2 className="text-sm font-black mb-3 text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
          {icon}
          {title}
        </h2>
        {children}
      </CardContent>
    </Card>
  )
}

function ChipList({ items, variant }: { items: string[]; variant: 'solid' | 'outline' | 'outline-accent' }) {
  const cls =
    variant === 'solid'
      ? 'px-2 py-1 bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] text-[var(--primary-foreground)] rounded-lg font-bold text-xs shadow-theme-md'
      : variant === 'outline-accent'
        ? 'px-2 py-1 bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent rounded-lg font-semibold text-xs border-2 border-theme-accent'
        : 'px-2 py-1 bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] text-theme-primary rounded-lg font-semibold text-xs border-2 border-theme-primary/40'
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className={cls}>{item}</span>
      ))}
    </div>
  )
}
