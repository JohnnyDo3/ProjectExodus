'use client'

import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/navigation/BackButton'
import {
  Briefcase,
  User,
  Users,
  Target,
  CheckCircle,
  Newspaper,
  LayoutGrid,
  List,
  BookOpen,
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import { useState, useEffect } from 'react'

type ViewMode = 'newspaper' | 'grid' | 'compact' | 'magazine'

// ─── Status helpers ──────────────────────────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Ongoing',
  COMPLETED: 'Completed',
  PLANNING: 'In Planning',
}

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: 'border-[var(--primary)] text-[var(--primary)]',
  COMPLETED: 'border-[var(--accent)] text-[var(--accent)]',
  PLANNING: 'border-[var(--secondary)] text-[var(--secondary)]',
}

// ─── View options ────────────────────────────────────────────────────────────

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: typeof Newspaper }[] = [
  { id: 'newspaper', label: 'Broadsheet', icon: Newspaper },
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'compact', label: 'List', icon: List },
  { id: 'magazine', label: 'Magazine', icon: BookOpen },
]

// ─── Shared sub-components ───────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLE[status] || STATUS_STYLE.PLANNING
  return (
    <span className={`inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style}`}>
      {STATUS_LABEL[status] || status}
    </span>
  )
}

function Byline({ creator, memberCount }: { creator: string; memberCount: number }) {
  return (
    <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] font-body-serif">
      <span className="flex items-center gap-1">
        <User className="w-3 h-3" />
        {creator || 'Anonymous'}
      </span>
      <span className="text-[var(--border)]">|</span>
      <span className="flex items-center gap-1">
        <Users className="w-3 h-3" />
        {memberCount} {memberCount === 1 ? 'contributor' : 'contributors'}
      </span>
    </div>
  )
}

function MemberAvatars({ members, total }: { members: any[]; total: number }) {
  return (
    <div className="flex -space-x-2">
      {members.slice(0, 4).map((m: any) => (
        <div
          key={m.user.id}
          className="w-7 h-7 rounded-full bg-[var(--muted)] border-2 border-[var(--background)] flex items-center justify-center"
          title={m.user.name || 'User'}
        >
          {m.user.image ? (
            <img src={m.user.image} alt={m.user.name || ''} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-3 h-3 text-[var(--muted-foreground)]" />
          )}
        </div>
      ))}
      {total > 4 && (
        <div className="w-7 h-7 rounded-full bg-[var(--foreground)] text-[var(--background)] border-2 border-[var(--background)] flex items-center justify-center">
          <span className="text-[9px] font-bold">+{total - 4}</span>
        </div>
      )}
    </div>
  )
}

function GoalQuote({ goal }: { goal: string }) {
  return (
    <blockquote className="border-l-2 border-[var(--foreground)] pl-3 py-1 my-3">
      <p className="text-xs font-body-serif italic text-[var(--foreground)] leading-relaxed">
        <Target className="w-3 h-3 inline mr-1 -mt-0.5" />
        {goal}
      </p>
    </blockquote>
  )
}

function ProphetFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="prophet-frame border border-[var(--border)]">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('newspaper')
  const [viewOpen, setViewOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('projects_view_mode')
    if (saved && ['newspaper', 'grid', 'compact', 'magazine'].includes(saved)) {
      setViewMode(saved as ViewMode)
    }
  }, [])

  const switchView = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('projects_view_mode', mode)
    setViewOpen(false)
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setProjects(data.success ? data.data : [])
      } catch {
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // ─── Loading state ───────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-2 border-[var(--foreground)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-body-serif italic text-[var(--muted-foreground)]">Fetching the latest edition...</p>
        </div>
      </div>
    )
  }

  const activeCount = projects.filter((p: any) => p.status === 'ACTIVE').length
  const memberTotal = projects.reduce((sum: number, p: any) => sum + p._count.members, 0)
  const completedCount = projects.filter((p: any) => p.status === 'COMPLETED').length

  const dateline = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* ═══ MASTHEAD ═══ */}
      <header className="border-b border-[var(--foreground)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="mb-4">
            <BackButton label="Back to Community" fallbackUrl="/community" />
          </div>

          {/* Top rule */}
          <div className="border-t-2 border-b border-[var(--foreground)] py-1 mb-4">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
              <span>Community Section</span>
              <span>{dateline}</span>
              <span>Vol. {new Date().getFullYear() - 2023}, No. {new Date().getMonth() + 1}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-headline text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-[var(--foreground)]">
            Community Projects
          </h1>

          {/* Subtitle */}
          <p className="font-body-serif italic text-center text-sm sm:text-base text-[var(--muted-foreground)] mt-3 max-w-2xl mx-auto leading-relaxed">
            Collaborative initiatives from our global community working toward a sustainable future
          </p>

          {/* Bottom rule */}
          <div className="border-t border-b-2 border-[var(--foreground)] mt-4 py-1">
            <div className="flex items-center justify-center gap-6 text-[10px] font-bold tracking-wider uppercase text-[var(--muted-foreground)]">
              <span>{activeCount} Active</span>
              <span className="text-[var(--border)]">|</span>
              <span>{memberTotal} Contributors</span>
              <span className="text-[var(--border)]">|</span>
              <span>{completedCount} Completed</span>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ TOOLBAR ═══ */}
      <div className="border-b border-[var(--border)] bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* View selector */}
          <div className="relative">
            <button
              onClick={() => setViewOpen(!viewOpen)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {(() => {
                const opt = VIEW_OPTIONS.find(v => v.id === viewMode)!
                const Icon = opt.icon
                return <><Icon className="w-3.5 h-3.5" /> {opt.label}</>
              })()}
              <ChevronDown className={`w-3 h-3 transition-transform ${viewOpen ? 'rotate-180' : ''}`} />
            </button>

            {viewOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[var(--background)] border border-[var(--border)] shadow-lg z-50 min-w-[160px]">
                {VIEW_OPTIONS.map((opt) => {
                  const Icon = opt.icon
                  const active = viewMode === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => switchView(opt.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                        active
                          ? 'bg-[var(--foreground)] text-[var(--background)]'
                          : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {opt.label}
                      {active && <CheckCircle className="w-3 h-3 ml-auto" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <Link href="/community/projects/new">
            <Button size="sm" className="font-bold text-xs uppercase tracking-wider h-7 px-3">
              Start a Project
            </Button>
          </Link>
        </div>
      </div>

      {/* ═══ CONTENT AREA ═══ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="border border-[var(--border)] p-12 text-center max-w-2xl mx-auto">
            <Briefcase className="w-10 h-10 text-[var(--muted-foreground)] mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-black mb-3 text-[var(--foreground)]">
              No Projects Yet
            </h3>
            <p className="font-body-serif italic text-sm text-[var(--muted-foreground)] mb-6">
              This section awaits community-driven initiatives. Be the first to start one.
            </p>
            <Link href="/community/projects/new">
              <Button className="font-bold text-xs uppercase tracking-wider">
                Create a Project
              </Button>
            </Link>
          </div>
        )}

        {/* ─── NEWSPAPER / BROADSHEET VIEW ─── */}
        {viewMode === 'newspaper' && projects.length > 0 && (
          <div>
            {/* Lead story (first project) */}
            {projects.length > 0 && (() => {
              const lead = projects[0]
              return (
                <article className="pb-6 mb-6 border-b border-[var(--border)]">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    {/* Left column — lead story */}
                    <div className={lead.coverImage ? 'md:col-span-4' : 'md:col-span-6'}>
                      <StatusBadge status={lead.status} />
                      <Link href={`/community/projects/${lead.slug}`}>
                        <h2 className="font-headline text-3xl sm:text-4xl font-black leading-tight mt-2 mb-2 text-[var(--foreground)] hover:underline decoration-1 underline-offset-4 cursor-pointer">
                          {lead.name}
                        </h2>
                      </Link>
                      <Byline creator={lead.creator.name} memberCount={lead._count.members} />
                      <p className="font-body-serif text-base leading-relaxed mt-3 text-[var(--foreground)] newspaper-justify">
                        {lead.description}
                      </p>
                      {lead.goal && <GoalQuote goal={lead.goal} />}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]">
                        <MemberAvatars members={lead.members} total={lead._count.members} />
                        <div className="flex items-center gap-2">
                          <Link href={`/community/projects/${lead.slug}`}>
                            <Button variant="outline" size="sm" className="font-bold text-xs h-7">
                              Full Story
                            </Button>
                          </Link>
                          <JoinProjectButton projectId={lead.id} projectName={lead.name} />
                        </div>
                      </div>
                    </div>

                    {/* Right column — lead image if exists */}
                    {lead.coverImage && (
                      <div className="md:col-span-2">
                        <ProphetFrame src={lead.coverImage} alt={lead.name} />
                      </div>
                    )}
                  </div>
                </article>
              )
            })()}

            {/* Secondary stories — 2-column broadsheet grid */}
            {projects.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {projects.slice(1).map((project: any, i: number) => {
                  const isLeft = i % 2 === 0
                  const isLast = i === projects.length - 2
                  const pairIndex = Math.floor(i / 2)
                  const isLastRow = pairIndex === Math.floor((projects.length - 2) / 2)

                  return (
                    <article
                      key={project.id}
                      className={`py-5 ${
                        isLeft ? 'md:pr-5 md:border-r md:border-[var(--border)]' : 'md:pl-5'
                      } ${!isLastRow ? 'border-b border-[var(--border)]' : ''}`}
                    >
                      {project.coverImage && (
                        <div className="prophet-frame border border-[var(--border)] mb-3 aspect-[3/2]">
                          <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <StatusBadge status={project.status} />
                      <Link href={`/community/projects/${project.slug}`}>
                        <h3 className="font-headline text-xl font-black leading-tight mt-1.5 mb-1 text-[var(--foreground)] hover:underline decoration-1 underline-offset-2 cursor-pointer">
                          {project.name}
                        </h3>
                      </Link>
                      <Byline creator={project.creator.name} memberCount={project._count.members} />
                      <p className="font-body-serif text-sm leading-relaxed mt-2 text-[var(--foreground)] newspaper-justify line-clamp-4">
                        {project.description}
                      </p>
                      {project.goal && <GoalQuote goal={project.goal} />}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border)]">
                        <MemberAvatars members={project.members} total={project._count.members} />
                        <div className="flex items-center gap-2">
                          <Link href={`/community/projects/${project.slug}`}>
                            <Button variant="outline" size="sm" className="font-bold text-[10px] h-6 px-2">
                              Read More
                            </Button>
                          </Link>
                          <JoinProjectButton projectId={project.id} projectName={project.name} />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── GRID VIEW ─── */}
        {viewMode === 'grid' && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
            {projects.map((project: any) => (
              <article key={project.id} className="bg-[var(--background)] p-5">
                {project.coverImage && (
                  <div className="prophet-frame mb-3 aspect-[3/2]">
                    <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <StatusBadge status={project.status} />
                <Link href={`/community/projects/${project.slug}`}>
                  <h3 className="font-headline text-lg font-bold leading-snug mt-1.5 mb-1 text-[var(--foreground)] hover:underline decoration-1 underline-offset-2 cursor-pointer line-clamp-2">
                    {project.name}
                  </h3>
                </Link>
                <Byline creator={project.creator.name} memberCount={project._count.members} />
                <p className="font-body-serif text-xs leading-relaxed mt-2 text-[var(--foreground)] line-clamp-3">
                  {project.description}
                </p>
                {project.goal && <GoalQuote goal={project.goal} />}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border)]">
                  <Link href={`/community/projects/${project.slug}`}>
                    <Button variant="outline" size="sm" className="font-bold text-[10px] h-6 px-2">
                      View
                    </Button>
                  </Link>
                  <JoinProjectButton projectId={project.id} projectName={project.name} />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ─── COMPACT / LIST VIEW ─── */}
        {viewMode === 'compact' && projects.length > 0 && (
          <div className="divide-y divide-[var(--border)]">
            {projects.map((project: any) => (
              <article key={project.id} className="py-3 flex items-start gap-4">
                <StatusBadge status={project.status} />
                <div className="flex-1 min-w-0">
                  <Link href={`/community/projects/${project.slug}`}>
                    <h3 className="font-headline text-base font-bold text-[var(--foreground)] hover:underline decoration-1 underline-offset-2 cursor-pointer truncate">
                      {project.name}
                    </h3>
                  </Link>
                  <p className="font-body-serif text-xs text-[var(--muted-foreground)] truncate mt-0.5">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[var(--muted-foreground)] flex-shrink-0">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span className="hidden lg:inline">{project.creator.name || 'Anon'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project._count.members}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/community/projects/${project.slug}`}>
                    <Button variant="outline" size="sm" className="font-bold text-[10px] h-6 px-2">
                      View
                    </Button>
                  </Link>
                  <JoinProjectButton projectId={project.id} projectName={project.name} />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ─── MAGAZINE VIEW ─── */}
        {viewMode === 'magazine' && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project: any) => (
              <article key={project.id} className="border border-[var(--border)] overflow-hidden">
                {project.coverImage && (
                  <div className="prophet-frame aspect-[16/9]">
                    <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <StatusBadge status={project.status} />
                  <Link href={`/community/projects/${project.slug}`}>
                    <h3 className="font-headline text-2xl font-black leading-tight mt-2 mb-1 text-[var(--foreground)] hover:underline decoration-1 underline-offset-2 cursor-pointer">
                      {project.name}
                    </h3>
                  </Link>
                  <Byline creator={project.creator.name} memberCount={project._count.members} />
                  <p className="font-body-serif text-sm leading-relaxed mt-3 text-[var(--foreground)] newspaper-justify">
                    {project.description}
                  </p>
                  {project.goal && <GoalQuote goal={project.goal} />}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]">
                    <MemberAvatars members={project.members} total={project._count.members} />
                    <div className="flex items-center gap-2">
                      <Link href={`/community/projects/${project.slug}`}>
                        <Button variant="outline" size="sm" className="font-bold text-xs h-7">
                          Explore
                        </Button>
                      </Link>
                      <JoinProjectButton projectId={project.id} projectName={project.name} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* ═══ FOOTER NOTICE ═══ */}
      <footer className="border-t border-[var(--foreground)] bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline text-2xl font-black text-[var(--foreground)] mb-2">
              Your Story Matters
            </h2>
            <p className="font-body-serif italic text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
              The Community Projects column welcomes submissions from all members
              working toward sustainability, environmental protection, and collective action.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/community/projects/new">
                <Button className="font-bold text-xs uppercase tracking-wider">
                  Launch Initiative
                </Button>
              </Link>
              <Link href="/community/forum">
                <Button variant="outline" className="font-bold text-xs uppercase tracking-wider">
                  Join Discussion
                </Button>
              </Link>
            </div>
            <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wide mt-6">
              All projects subject to community guidelines
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
