'use client'

import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/navigation/BackButton'
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  Target,
  Sparkles,
  Rocket,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProjectRow {
  title: string
  projects: any[]
  ghostCount: number
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

// ─── Ghost Card ──────────────────────────────────────────────────────────────

function GhostCard() {
  return (
    <Link href="/community/projects/new" className="block flex-shrink-0 group">
      <div className="w-[260px] sm:w-[300px] aspect-[16/10] rounded-lg border-2 border-dashed border-[var(--muted-foreground)]/30 bg-[var(--muted)]/40 flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/5 group-hover:scale-[1.03] cursor-pointer relative overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--foreground)]/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <div className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--muted-foreground)]/40 flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
          <Plus className="w-6 h-6 text-[var(--muted-foreground)]/60 group-hover:text-[var(--primary)] transition-colors" />
        </div>
        <div className="text-center px-4">
          <p className="text-sm font-bold text-[var(--muted-foreground)]/70 group-hover:text-[var(--primary)] transition-colors">
            Start Your Own
          </p>
          <p className="text-[11px] text-[var(--muted-foreground)]/50 mt-1">
            Launch a community project
          </p>
        </div>
      </div>
    </Link>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: any }) {
  const accent = STATUS_ACCENT[project.status] || 'var(--primary)'
  const statusLabel = STATUS_LABEL[project.status] || project.status

  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] group relative">
      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[var(--muted)] relative cursor-pointer">
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
            {/* Decorative pattern for no-image cards */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-[var(--foreground)]" />
              <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full border border-[var(--foreground)]" />
              <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full border border-[var(--foreground)]" />
            </div>
          </div>
        )}

        {/* Status pill - always visible */}
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

        {/* Member count - always visible */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
          <Users className="w-3 h-3" />
          {project._count.members}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-base leading-tight mb-1 line-clamp-2">
            {project.name}
          </h3>
          <p className="text-white/70 text-xs line-clamp-2 mb-3 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center gap-2">
            <Link href={`/community/projects/${project.slug}`}>
              <Button
                size="sm"
                className="h-7 text-[11px] font-bold uppercase tracking-wider rounded-md"
              >
                View Project
              </Button>
            </Link>
            <JoinProjectButton projectId={project.id} projectName={project.name} />
          </div>
        </div>
      </div>

      {/* Title below card - visible when NOT hovered */}
      <div className="mt-2 group-hover:opacity-0 transition-opacity duration-300">
        <Link href={`/community/projects/${project.slug}`}>
          <h3 className="text-sm font-bold text-[var(--foreground)] truncate hover:underline underline-offset-2">
            {project.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[var(--muted-foreground)]">
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
    </div>
  )
}

// ─── Scrollable Row ──────────────────────────────────────────────────────────

function ScrollRow({ title, projects, ghostCount }: ProjectRow) {
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

  const totalCards = projects.length + ghostCount
  if (totalCards === 0) return null

  return (
    <section className="relative group/row">
      {/* Row header */}
      <div className="flex items-center justify-between mb-3 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
          {title}
        </h2>
        {projects.length > 0 && (
          <span className="text-xs text-[var(--muted-foreground)] font-medium">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </span>
        )}
      </div>

      {/* Scroll container */}
      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-8 w-12 z-20 bg-gradient-to-r from-[var(--background)] to-transparent flex items-center justify-start pl-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
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
            className="absolute right-0 top-0 bottom-8 w-12 z-20 bg-gradient-to-l from-[var(--background)] to-transparent flex items-center justify-end pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <div className="w-9 h-9 rounded-full bg-[var(--foreground)]/80 flex items-center justify-center backdrop-blur-sm">
              <ChevronRight className="w-5 h-5 text-[var(--background)]" />
            </div>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {Array.from({ length: ghostCount }).map((_, i) => (
            <GhostCard key={`ghost-${i}`} />
          ))}
        </div>
      </div>
    </section>
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

  // Ghost slots fill each row to ~7 cards minimum
  const CARDS_PER_ROW = 7
  const ghostsFor = (arr: any[]) => Math.max(CARDS_PER_ROW - arr.length, 2)

  const rows: ProjectRow[] = [
    { title: 'Active Projects', projects: active, ghostCount: ghostsFor(active) },
    { title: 'In Planning', projects: planning, ghostCount: ghostsFor(planning) },
    { title: 'Completed', projects: completed, ghostCount: ghostsFor(completed) },
  ]

  const totalMembers = projects.reduce((sum, p) => sum + (p._count?.members || 0), 0)

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* ═══ HERO ═══ */}
      <header className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/15 via-[var(--background)] to-[var(--background)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <div className="mb-6">
            <BackButton label="Community" fallbackUrl="/community" />
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                Community Projects
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--foreground)] leading-[1.05] tracking-tight">
              Shape the Future,{' '}
              <span className="text-[var(--primary)]">Together</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted-foreground)] mt-4 leading-relaxed max-w-xl">
              Collaborative sustainability initiatives driven by our community. Join existing projects or start something new.
            </p>

            {/* Stats bar */}
            <div className="flex items-center gap-5 mt-6 text-sm">
              <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                <Rocket className="w-4 h-4 text-[var(--primary)]" />
                <span className="font-bold">{projects.length}</span>
                <span className="text-[var(--muted-foreground)]">projects</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                <Users className="w-4 h-4 text-[var(--primary)]" />
                <span className="font-bold">{totalMembers}</span>
                <span className="text-[var(--muted-foreground)]">contributors</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link href="/community/projects/new">
                <Button size="lg" className="font-bold text-sm uppercase tracking-wider rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ ROWS ═══ */}
      <main className="max-w-7xl mx-auto space-y-10 pb-16">
        {rows.map((row) => (
          <ScrollRow
            key={row.title}
            title={row.title}
            projects={row.projects}
            ghostCount={row.ghostCount}
          />
        ))}
      </main>

      {/* ═══ BOTTOM CTA ═══ */}
      <footer className="border-t border-[var(--border)] bg-gradient-to-b from-[var(--muted)]/50 to-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-[var(--foreground)]">
                Got an idea?
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Every project starts with a single step. Launch yours today.
              </p>
            </div>
            <Link href="/community/projects/new">
              <Button className="font-bold text-sm uppercase tracking-wider rounded-lg group">
                Launch a Project
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
