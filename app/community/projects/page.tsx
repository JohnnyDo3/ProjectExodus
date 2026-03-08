'use client'

import {
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  Target,
  Play,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProjectRow {
  title: string
  projects: any[]
}

// ─── Status config ───────────────────────────────────────────────────────────

const STATUS_ACCENT: Record<string, string> = {
  ACTIVE: 'var(--primary)',
  COMPLETED: 'var(--accent)',
  PLANNING: 'var(--secondary)',
}

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  PLANNING: 'Planning',
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: any }) {
  const accent = STATUS_ACCENT[project.status] || 'var(--primary)'
  const statusLabel = STATUS_LABEL[project.status] || project.status

  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] group relative">
      <div className="aspect-[16/10] rounded-md overflow-hidden bg-[var(--muted)] relative cursor-pointer">
        {/* Background - cover image or gradient */}
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 30%, var(--background)) 0%, color-mix(in srgb, ${accent} 10%, var(--muted)) 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-[var(--foreground)]" />
              <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full border border-[var(--foreground)]" />
              <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full border border-[var(--foreground)]" />
            </div>
          </div>
        )}

        {/* Always-visible bottom gradient overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Status pill */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm"
            style={{
              background: accent,
              color: 'var(--background)',
            }}
          >
            {statusLabel}
          </span>
        </div>

        {/* Member count */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
          <Users className="w-3 h-3" />
          {project._count.members}
        </div>

        {/* Overlay info - always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="text-white font-bold text-sm leading-tight truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-white/60">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {project.creator?.name || 'Anonymous'}
            </span>
            {project.goal && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 truncate">
                  <Target className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{project.goal}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
          <div className="flex items-center gap-2">
            <Link href={`/community/projects/${project.slug}`}>
              <Button
                size="sm"
                className="h-8 text-[11px] font-bold uppercase tracking-wider rounded-md"
              >
                View Project
              </Button>
            </Link>
            <JoinProjectButton projectId={project.id} projectName={project.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Scrollable Row ──────────────────────────────────────────────────────────

function ScrollRow({ title, projects }: ProjectRow) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll, projects])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  if (projects.length === 0) return null

  return (
    <section className="relative group/row">
      {/* Row header */}
      <div className="flex items-center justify-between mb-3 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
          {title}
        </h2>
        <span className="text-xs text-[var(--muted-foreground)] font-medium">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      {/* Scroll container */}
      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-r from-[var(--background)] to-transparent flex items-center justify-start pl-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <div className="w-9 h-9 rounded-full bg-[var(--foreground)]/80 flex items-center justify-center backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5 text-[var(--background)]" />
            </div>
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-l from-[var(--background)] to-transparent flex items-center justify-end pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <div className="w-9 h-9 rounded-full bg-[var(--foreground)]/80 flex items-center justify-center backdrop-blur-sm">
              <ChevronRight className="w-5 h-5 text-[var(--background)]" />
            </div>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Billboard / Featured Project ────────────────────────────────────────────

function Billboard({ project }: { project: any }) {
  const accent = STATUS_ACCENT[project.status] || 'var(--primary)'

  return (
    <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] lg:aspect-[3.5/1] overflow-hidden">
      {/* Background */}
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 40%, #000) 0%, color-mix(in srgb, ${accent} 15%, #111) 50%, #0a0a0a 100%)`,
          }}
        >
          <div className="absolute inset-0 opacity-[0.06]">
            <div className="absolute top-[15%] right-[10%] w-40 h-40 rounded-full border border-white" />
            <div className="absolute bottom-[20%] left-[5%] w-24 h-24 rounded-full border border-white" />
            <div className="absolute top-[40%] left-[30%] w-16 h-16 rounded-full border border-white" />
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm"
                style={{
                  background: accent,
                  color: 'var(--background)',
                }}
              >
                Featured
              </span>
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                {project.status === 'ACTIVE' ? 'Active Now' : project.status === 'PLANNING' ? 'Coming Soon' : 'Completed'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight">
              {project.name}
            </h1>

            {project.description && (
              <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed line-clamp-2 max-w-lg">
                {project.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-5">
              <Link href={`/community/projects/${project.slug}`}>
                <Button
                  size="lg"
                  className="h-10 text-sm font-bold uppercase tracking-wider rounded-md gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  View Project
                </Button>
              </Link>
              <JoinProjectButton projectId={project.id} projectName={project.name} />
            </div>

            <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {project._count.members} contributors
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {project.creator?.name || 'Anonymous'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  // ─── Loading state ─────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--muted-foreground)]">Loading projects...</p>
        </div>
      </div>
    )
  }

  // ─── Build rows ────────────────────────────────────────────────────────

  const active = projects.filter((p) => p.status === 'ACTIVE')
  const planning = projects.filter((p) => p.status === 'PLANNING')
  const completed = projects.filter((p) => p.status === 'COMPLETED')

  // Pick featured project: most members among active, fallback to first project
  const featured = [...active].sort((a, b) => (b._count?.members || 0) - (a._count?.members || 0))[0]
    || projects[0]

  // Remaining projects for rows (exclude featured)
  const activeWithoutFeatured = featured ? active.filter((p) => p.id !== featured.id) : active

  const rows: ProjectRow[] = [
    { title: 'Active Projects', projects: activeWithoutFeatured },
    { title: 'In Planning', projects: planning },
    { title: 'Completed', projects: completed },
  ]

  // ─── Empty state ───────────────────────────────────────────────────────

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-[var(--muted-foreground)]" />
          </div>
          <h2 className="text-2xl font-black text-[var(--foreground)]">No Projects Yet</h2>
          <p className="text-sm text-[var(--muted-foreground)] max-w-sm">
            Head over to the community page to start a new project.
          </p>
          <Link href="/community">
            <Button className="font-bold text-sm uppercase tracking-wider rounded-md mt-2">
              Go to Community
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ═══ NETFLIX BILLBOARD ═══ */}
      {featured && <Billboard project={featured} />}

      {/* ═══ ROWS ═══ */}
      <main className="space-y-8 py-8">
        {rows.map((row) => (
          <ScrollRow
            key={row.title}
            title={row.title}
            projects={row.projects}
          />
        ))}
      </main>
    </div>
  )
}
