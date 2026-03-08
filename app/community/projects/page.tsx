'use client'

import {
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  Target,
  Play,
  Compass,
  Sprout,
  Leaf,
  TreePine,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProjectRow {
  title: string
  subtitle: string
  projects: any[]
  ghostCount: number
}

// ─── Status config ───────────────────────────────────────────────────────────
// Each status maps to an Exodus narrative beat:
//   ACTIVE  → growing / in motion  (living green)
//   PLANNING → seeds not yet sown   (warm amber)
//   COMPLETED → harvested / fulfilled (steady blue)

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string; glow: string }> = {
  ACTIVE:    { bg: '#059669', text: '#ffffff', label: 'Growing',   glow: 'rgba(5,150,105,0.25)' },
  COMPLETED: { bg: '#3b82f6', text: '#ffffff', label: 'Harvested', glow: 'rgba(59,130,246,0.25)' },
  PLANNING:  { bg: '#d97706', text: '#ffffff', label: 'Seeding',   glow: 'rgba(217,119,6,0.25)' },
}

// ─── SVG: Topographic lines (generative feel for no-image cards) ─────────

function TopoPattern({ seed = 0 }: { seed?: number }) {
  // Simple deterministic offsets from seed
  const a = (seed * 37) % 100
  const b = (seed * 53) % 80
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={`M0,${100+a*0.3} Q75,${60+b*0.4} 150,${100+a*0.2} T300,${80+b*0.3}`} fill="none" stroke="var(--foreground)" strokeWidth="1" />
      <path d={`M0,${120+a*0.2} Q100,${80+b*0.3} 200,${130-a*0.15} T300,${110+b*0.2}`} fill="none" stroke="var(--foreground)" strokeWidth="0.8" />
      <path d={`M0,${140+a*0.1} Q120,${110+b*0.2} 220,${145-a*0.1} T300,${135+b*0.15}`} fill="none" stroke="var(--foreground)" strokeWidth="0.6" />
      <circle cx={50+a*0.5} cy={40+b*0.3} r="18" fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
      <circle cx={220-a*0.3} cy={60+b*0.2} r="12" fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
    </svg>
  )
}

// ─── SVG: Seed icon for ghost cards ─────────────────────────────────────────

function SeedIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
      <path
        d="M14 24 C14 24 14 16 14 14 C14 10 10 7 6 6 C10 6 14 3 14 3 C14 3 18 6 22 6 C18 7 14 10 14 14 C14 16 14 24 14 24Z"
        fill="var(--foreground)"
        fillOpacity="0.15"
        stroke="var(--foreground)"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
      <line x1="14" y1="14" x2="14" y2="24" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.8" />
    </svg>
  )
}

// ─── Ghost Card ──────────────────────────────────────────────────────────────
// Each ghost is a dormant seed — a project waiting to exist.

function GhostCard({ index = 0 }: { index?: number }) {
  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px]">
      <div className="aspect-[16/10] rounded-lg overflow-hidden relative border border-dashed border-[var(--border)]"
        style={{ background: 'linear-gradient(160deg, var(--muted) 0%, var(--background) 100%)' }}
      >
        {/* Subtle topo lines */}
        <TopoPattern seed={index * 17 + 3} />

        {/* Seed center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <div
            className="transition-transform duration-[3000ms] ease-in-out"
            style={{ animation: `gentle-sway ${3 + index * 0.4}s ease-in-out infinite alternate` }}
          >
            <SeedIcon />
          </div>
          <span className="text-[10px] font-medium text-[var(--muted-foreground)]/50 tracking-widest uppercase">
            Awaiting
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: any; index: number }) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.ACTIVE

  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] group relative">
      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[var(--muted)] relative cursor-pointer transition-shadow duration-300 group-hover:shadow-lg"
        style={{ boxShadow: `0 0 0 0 ${status.glow}` }}
      >
        {/* Background */}
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(145deg, var(--card) 0%, var(--muted) 60%, var(--card) 100%)`,
            }}
          >
            <TopoPattern seed={index} />
          </div>
        )}

        {/* Persistent gradient veil at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/20 to-transparent" />

        {/* Status pill with subtle glow */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full"
            style={{
              background: status.bg,
              color: status.text,
              boxShadow: `0 0 8px ${status.glow}`,
            }}
          >
            {status.label}
          </span>
        </div>

        {/* Member count */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-[var(--card)]/80 backdrop-blur-sm text-[var(--card-foreground)] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[var(--border)]/50">
          <Users className="w-3 h-3" />
          {project._count.members}
        </div>

        {/* Always-visible bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="text-[var(--foreground)] font-bold text-sm leading-tight truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {project.creator?.name || 'Anonymous'}
            </span>
            {project.goal && (
              <>
                <span className="text-[var(--border)]">|</span>
                <span className="flex items-center gap-1 truncate">
                  <Target className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{project.goal}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hover reveal */}
        <div className="absolute inset-0 bg-[var(--card)]/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-20">
          {project.description && (
            <p className="text-xs text-[var(--muted-foreground)] text-center px-5 line-clamp-3 leading-relaxed max-w-[90%]">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Link href={`/community/projects/${project.slug}`}>
              <Button
                size="sm"
                className="h-8 text-[11px] font-bold uppercase tracking-wider rounded-full px-4"
              >
                Explore
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

function ScrollRow({ title, subtitle, projects, ghostCount }: ProjectRow) {
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
      <div className="flex items-baseline justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
            {title}
          </h2>
          <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5 tracking-wide">
            {subtitle}
          </p>
        </div>
        {projects.length > 0 && (
          <span className="text-xs text-[var(--muted-foreground)] font-medium tabular-nums">
            {projects.length}
          </span>
        )}
      </div>

      {/* Scroll container */}
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 w-14 z-20 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shadow-md">
              <ChevronLeft className="w-4 h-4 text-[var(--foreground)]" />
            </div>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 w-14 z-20 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shadow-md">
              <ChevronRight className="w-4 h-4 text-[var(--foreground)]" />
            </div>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project: any, i: number) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          {Array.from({ length: ghostCount }).map((_, i) => (
            <GhostCard key={`ghost-${i}`} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Billboard / The Horizon ─────────────────────────────────────────────────
// The featured project is the guiding star — the first light on the horizon
// of a new world. This is what an Exodus looks like from the front of the line.

function Billboard({ project, totalProjects, totalContributors }: {
  project: any
  totalProjects: number
  totalContributors: number
}) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.ACTIVE

  return (
    <div className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(280px, 45vh, 520px)' }}
    >
      {/* Background layer */}
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 80%, var(--primary)/0.12 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 20%, var(--accent)/0.08 0%, transparent 70%),
            linear-gradient(175deg, var(--background) 0%, var(--muted) 40%, var(--card) 70%, var(--background) 100%)
          `
        }}>
          {/* Horizon line — the threshold */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Distant mountain silhouette */}
            <path
              d="M0,280 Q100,220 200,260 Q350,180 450,240 Q550,200 650,230 Q750,170 850,220 Q950,195 1050,240 Q1150,210 1200,250 L1200,400 L0,400Z"
              fill="var(--primary)"
              fillOpacity="0.04"
            />
            {/* Horizon glow line */}
            <line x1="0" y1="265" x2="1200" y2="265" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="1" />
            {/* Scattered waypoints */}
            <circle cx="180" cy="258" r="2" fill="var(--primary)" fillOpacity="0.2" />
            <circle cx="480" cy="238" r="1.5" fill="var(--accent)" fillOpacity="0.2" />
            <circle cx="780" cy="218" r="2" fill="var(--primary)" fillOpacity="0.15" />
            <circle cx="1020" cy="242" r="1.5" fill="var(--accent)" fillOpacity="0.15" />
            {/* Topo contours */}
            <path d="M0,300 Q300,270 600,290 Q900,260 1200,285" fill="none" stroke="var(--foreground)" strokeOpacity="0.03" strokeWidth="0.8" />
            <path d="M0,320 Q300,300 600,315 Q900,290 1200,310" fill="none" stroke="var(--foreground)" strokeOpacity="0.025" strokeWidth="0.8" />
          </svg>
        </div>
      )}

      {/* Gradient veils */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <div className="max-w-2xl">
            {/* Exodus compass mark */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-[var(--primary)]/30 flex items-center justify-center bg-[var(--primary)]/10">
                <Compass className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full"
                  style={{ background: status.bg, color: status.text, boxShadow: `0 0 12px ${status.glow}` }}
                >
                  {status.label}
                </span>
                <span className="text-[10px] font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
                  Featured Initiative
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--foreground)] leading-[1.05] tracking-tight">
              {project.name}
            </h1>

            {project.description && (
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] mt-3 leading-relaxed line-clamp-2 max-w-lg">
                {project.description}
              </p>
            )}

            {/* Action row */}
            <div className="flex items-center gap-3 mt-6">
              <Link href={`/community/projects/${project.slug}`}>
                <Button
                  size="lg"
                  className="h-10 text-sm font-bold uppercase tracking-wider rounded-full gap-2 px-6"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Explore
                </Button>
              </Link>
              <JoinProjectButton projectId={project.id} projectName={project.name} />
            </div>

            {/* Journey stats */}
            <div className="flex items-center gap-6 mt-5 text-xs text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)]">{project._count.members}</strong> on this path
              </span>
              <span className="text-[var(--border)]">|</span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)]">{totalProjects}</strong> initiatives
              </span>
              <span className="text-[var(--border)]">|</span>
              <span className="flex items-center gap-1.5">
                <TreePine className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)]">{totalContributors}</strong> travelers
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
        <div className="text-center space-y-4">
          <Sprout className="w-8 h-8 text-[var(--primary)] mx-auto animate-pulse" />
          <p className="text-xs text-[var(--muted-foreground)] tracking-widest uppercase">Gathering the seeds...</p>
        </div>
      </div>
    )
  }

  // ─── Build rows ────────────────────────────────────────────────────────

  const active = projects.filter((p) => p.status === 'ACTIVE')
  const planning = projects.filter((p) => p.status === 'PLANNING')
  const completed = projects.filter((p) => p.status === 'COMPLETED')

  const featured = [...active].sort((a, b) => (b._count?.members || 0) - (a._count?.members || 0))[0]
    || projects[0]

  const activeWithoutFeatured = featured ? active.filter((p) => p.id !== featured.id) : active

  const CARDS_PER_ROW = 7
  const ghostsFor = (arr: any[]) => Math.max(CARDS_PER_ROW - arr.length, 2)

  const rows: ProjectRow[] = [
    {
      title: 'Active Projects',
      subtitle: 'Active initiatives shaping the path forward',
      projects: activeWithoutFeatured,
      ghostCount: ghostsFor(activeWithoutFeatured),
    },
    {
      title: 'In Planning',
      subtitle: 'Ideas taking root \u2014 join early and help them grow',
      projects: planning,
      ghostCount: ghostsFor(planning),
    },
    {
      title: 'Completed',
      subtitle: 'Completed journeys and the impact they left behind',
      projects: completed,
      ghostCount: ghostsFor(completed),
    },
  ]

  const totalContributors = projects.reduce((sum, p) => sum + (p._count?.members || 0), 0)

  // ─── Empty state ───────────────────────────────────────────────────────

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center space-y-5 px-4 max-w-md">
          <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mx-auto">
            <Sprout className="w-9 h-9 text-[var(--primary)]" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)]">The Land is Quiet</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              No projects have been planted yet. Head to the community to sow the first seed.
            </p>
          </div>
          <Link href="/community">
            <Button className="font-bold text-sm uppercase tracking-wider rounded-full px-6 mt-1">
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
      {/* Keyframe for ghost seed sway */}
      <style>{`
        @keyframes gentle-sway {
          0% { transform: rotate(-3deg) translateY(0); }
          100% { transform: rotate(3deg) translateY(-2px); }
        }
      `}</style>

      {/* ═══ THE HORIZON ═══ */}
      {featured && (
        <Billboard
          project={featured}
          totalProjects={projects.length}
          totalContributors={totalContributors}
        />
      )}

      {/* ═══ THE JOURNEY ═══ */}
      <main className="space-y-10 py-10">
        {rows.map((row) => (
          <ScrollRow
            key={row.title}
            title={row.title}
            subtitle={row.subtitle}
            projects={row.projects}
            ghostCount={row.ghostCount}
          />
        ))}
      </main>
    </div>
  )
}
