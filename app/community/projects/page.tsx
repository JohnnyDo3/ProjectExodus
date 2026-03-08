'use client'

import {
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  Target,
  Play,
  Compass,
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
  ACTIVE:    { bg: '#059669', text: '#ffffff', label: 'Active',    glow: 'rgba(5,150,105,0.25)' },
  COMPLETED: { bg: '#3b82f6', text: '#ffffff', label: 'Completed', glow: 'rgba(59,130,246,0.25)' },
  PLANNING:  { bg: '#d97706', text: '#ffffff', label: 'Planning',  glow: 'rgba(217,119,6,0.25)' },
}

// ─── SVG Illustrations ───────────────────────────────────────────────────────

// Generative landscape for no-image project cards — each seed produces
// a unique terrain of contour lines, hills, scattered flora, and a small sun.
function CardLandscape({ seed = 0 }: { seed?: number }) {
  const a = (seed * 37) % 100
  const b = (seed * 53) % 80
  const c = (seed * 71) % 60
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.09]" viewBox="0 0 300 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun / moon */}
      <circle cx={240 - a * 0.5} cy={35 + b * 0.2} r="14" fill="var(--primary)" fillOpacity="0.15" />
      <circle cx={240 - a * 0.5} cy={35 + b * 0.2} r="18" fill="none" stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="0.5" />
      {/* Contour lines */}
      <path d={`M0,${95+a*0.3} Q60,${65+b*0.4} 150,${95+a*0.2} T300,${80+b*0.3}`} fill="none" stroke="var(--foreground)" strokeWidth="0.9" />
      <path d={`M0,${115+a*0.2} Q90,${80+b*0.3} 200,${125-a*0.15} T300,${108+b*0.2}`} fill="none" stroke="var(--foreground)" strokeWidth="0.7" />
      <path d={`M0,${135+a*0.1} Q120,${108+b*0.2} 220,${140-a*0.1} T300,${130+b*0.15}`} fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
      <path d={`M0,${152+c*0.1} Q150,${140+a*0.08} 250,${155-b*0.05} T300,${148+c*0.1}`} fill="none" stroke="var(--foreground)" strokeWidth="0.4" />
      {/* Small trees / flora along the middle contour */}
      <line x1={45+a*0.3} y1={110+b*0.15} x2={45+a*0.3} y2={100+b*0.15} stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.8" />
      <circle cx={45+a*0.3} cy={97+b*0.15} r="4" fill="var(--primary)" fillOpacity="0.08" />
      <line x1={130+c*0.4} y1={105+a*0.12} x2={130+c*0.4} y2={93+a*0.12} stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.8" />
      <circle cx={130+c*0.4} cy={90+a*0.12} r="5" fill="var(--primary)" fillOpacity="0.06" />
      <line x1={210-b*0.3} y1={118+c*0.1} x2={210-b*0.3} y2={108+c*0.1} stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.8" />
      <circle cx={210-b*0.3} cy={105+c*0.1} r="3.5" fill="var(--primary)" fillOpacity="0.07" />
      {/* Distant birds — two small V shapes */}
      <path d={`M${70+c*0.5},${45+a*0.15} l-3,3 l3,-1 l3,1 l-3,-3`} fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
      <path d={`M${95+c*0.4},${40+a*0.1} l-2.5,2.5 l2.5,-0.8 l2.5,0.8 l-2.5,-2.5`} fill="none" stroke="var(--foreground)" strokeWidth="0.4" />
      {/* Ground texture dots */}
      <circle cx={25+a*0.2} cy={160+b*0.1} r="1" fill="var(--foreground)" fillOpacity="0.06" />
      <circle cx={80+c*0.3} cy={155+a*0.08} r="0.8" fill="var(--foreground)" fillOpacity="0.05" />
      <circle cx={170+b*0.2} cy={162+c*0.06} r="1.2" fill="var(--foreground)" fillOpacity="0.05" />
      <circle cx={260-a*0.15} cy={158+b*0.05} r="0.7" fill="var(--foreground)" fillOpacity="0.06" />
      {/* Compass rose — small, in the corner */}
      <g transform={`translate(${270-a*0.1}, ${25+b*0.05})`} opacity="0.06">
        <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--foreground)" strokeWidth="0.6" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--foreground)" strokeWidth="0.6" />
        <polygon points="0,-8 -2,-2 0,-3 2,-2" fill="var(--foreground)" />
      </g>
    </svg>
  )
}

// Ghost card illustration — a seed in soil with roots reaching down
// and a tiny sprout breaking the surface, surrounded by soil particles.
function GhostSeedScene({ index = 0 }: { index?: number }) {
  const drift = (index * 23) % 40
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-25">
      {/* Soil line */}
      <path d={`M8,36 Q15,${34+drift*0.05} 30,36 Q45,${37-drift*0.04} 52,35.5`} stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Seed body underground */}
      <ellipse cx="30" cy="40" rx="5" ry="3.5" fill="var(--foreground)" fillOpacity="0.1" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.6" />
      {/* Root tendrils */}
      <path d="M28,43 Q26,48 24,52" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
      <path d="M30,43.5 Q30,49 29,54" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
      <path d="M32,43 Q34,47 36,51" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
      {/* Sprout emerging */}
      <path d="M30,37 Q30,32 30,28" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.7" fill="none" />
      {/* Two tiny unfurling leaves */}
      <path d="M30,30 Q26,27 28,24" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.6" fill="none" />
      <path d="M30,30 Q34,27 32,24" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.6" fill="none" />
      <ellipse cx="27" cy="25" rx="2.5" ry="1.5" transform="rotate(-20 27 25)" fill="var(--primary)" fillOpacity="0.08" />
      <ellipse cx="33" cy="25" rx="2.5" ry="1.5" transform="rotate(20 33 25)" fill="var(--primary)" fillOpacity="0.08" />
      {/* Soil particles */}
      <circle cx={18+drift*0.2} cy="38" r="0.8" fill="var(--foreground)" fillOpacity="0.1" />
      <circle cx={42-drift*0.15} cy="37" r="0.6" fill="var(--foreground)" fillOpacity="0.08" />
      <circle cx="22" cy={41+drift*0.03} r="0.5" fill="var(--foreground)" fillOpacity="0.08" />
      <circle cx="38" cy={40+drift*0.02} r="0.7" fill="var(--foreground)" fillOpacity="0.09" />
      {/* Water droplet approaching */}
      <path d={`M${20+drift*0.3},${18-drift*0.1} Q${21+drift*0.3},${15-drift*0.1} ${20+drift*0.3},${13-drift*0.1}`} stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />
      <circle cx={20+drift*0.3} cy={13-drift*0.1} r="1" fill="var(--accent)" fillOpacity="0.1" />
    </svg>
  )
}

// Empty state — a barren landscape with a single path leading to the horizon,
// a sun low on the skyline, and wind lines suggesting openness / potential.
function EmptyLandscape() {
  return (
    <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 mx-auto">
      {/* Sky */}
      {/* Sun on horizon */}
      <circle cx="100" cy="52" r="16" fill="var(--primary)" fillOpacity="0.12" />
      <circle cx="100" cy="52" r="22" fill="none" stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="0.5" />
      <circle cx="100" cy="52" r="28" fill="none" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 100 + Math.cos(rad) * 20
        const y1 = 52 - Math.sin(rad) * 20
        const x2 = 100 + Math.cos(rad) * 32
        const y2 = 52 - Math.sin(rad) * 32
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="0.5" />
      })}
      {/* Horizon line */}
      <line x1="0" y1="60" x2="200" y2="60" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.6" />
      {/* Rolling hills */}
      <path d="M0,65 Q30,55 60,62 Q90,50 120,60 Q150,52 180,58 L200,62 L200,120 L0,120Z" fill="var(--primary)" fillOpacity="0.03" />
      <path d="M0,72 Q50,62 100,70 Q150,60 200,68 L200,120 L0,120Z" fill="var(--primary)" fillOpacity="0.025" />
      {/* Path leading to horizon — converging perspective lines */}
      <path d="M85,120 Q95,85 100,60" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.6" fill="none" />
      <path d="M115,120 Q105,85 100,60" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.6" fill="none" />
      {/* Path dashes */}
      <line x1="97" y1="90" x2="103" y2="90" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="98" y1="80" x2="102" y2="80" stroke="var(--foreground)" strokeOpacity="0.05" strokeWidth="0.5" />
      <line x1="99" y1="70" x2="101" y2="70" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      {/* Wind lines */}
      <path d="M10,40 Q25,38 40,40" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.4" fill="none" />
      <path d="M20,44 Q30,42 45,44" stroke="var(--foreground)" strokeOpacity="0.05" strokeWidth="0.4" fill="none" />
      <path d="M155,38 Q170,36 185,38" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.4" fill="none" />
      <path d="M160,42 Q172,40 190,43" stroke="var(--foreground)" strokeOpacity="0.05" strokeWidth="0.4" fill="none" />
      {/* Lone tree at the edge of the path */}
      <line x1="130" y1="65" x2="130" y2="52" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.7" />
      <circle cx="130" cy="49" r="5" fill="var(--primary)" fillOpacity="0.06" />
      <circle cx="130" cy="49" r="3" fill="var(--primary)" fillOpacity="0.04" />
      {/* Small birds */}
      <path d="M55,30 l-2,2 l2,-0.7 l2,0.7 l-2,-2" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
      <path d="M62,26 l-1.5,1.5 l1.5,-0.5 l1.5,0.5 l-1.5,-1.5" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.3" fill="none" />
      <path d="M145,28 l-2,2 l2,-0.7 l2,0.7 l-2,-2" stroke="var(--foreground)" strokeOpacity="0.07" strokeWidth="0.4" fill="none" />
    </svg>
  )
}

// Loading illustration — a seed cracking open with energy lines
function LoadingSeed() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      {/* Ground line */}
      <path d="M10,32 Q24,30 38,32" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Seed splitting open */}
      <path d="M22,33 Q20,29 22,26" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <path d="M26,33 Q28,29 26,26" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <ellipse cx="21" cy="34" rx="4" ry="2.5" transform="rotate(-10 21 34)" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.5" />
      <ellipse cx="27" cy="34" rx="4" ry="2.5" transform="rotate(10 27 34)" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.5" />
      {/* Sprout emerging */}
      <path d="M24,28 Q24,22 24,16" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
      {/* Unfurling leaf */}
      <path d="M24,20 Q20,16 21,12" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
      <ellipse cx="20.5" cy="13" rx="3" ry="1.8" transform="rotate(-25 20.5 13)" fill="var(--primary)" fillOpacity="0.12" />
      <path d="M24,22 Q28,18 27,14" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
      <ellipse cx="27.5" cy="15" rx="2.5" ry="1.5" transform="rotate(25 27.5 15)" fill="var(--primary)" fillOpacity="0.1" />
      {/* Energy / growth lines radiating */}
      <line x1="24" y1="11" x2="24" y2="7" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" />
      <line x1="18" y1="13" x2="15" y2="10" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.4" />
      <line x1="30" y1="13" x2="33" y2="10" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.4" />
      {/* Root hints */}
      <path d="M22,36 Q20,40 19,44" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
      <path d="M26,36 Q28,39 29,43" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
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
        {/* Background landscape */}
        <CardLandscape seed={index * 17 + 3} />

        {/* Seed scene */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div
            style={{ animation: `gentle-sway ${3 + index * 0.4}s ease-in-out infinite alternate` }}
          >
            <GhostSeedScene index={index} />
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
            <CardLandscape seed={index} />
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
          {/* Full landscape illustration */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">

            {/* Sun / celestial body */}
            <circle cx="900" cy="120" r="45" fill="var(--primary)" fillOpacity="0.06" />
            <circle cx="900" cy="120" r="60" fill="none" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.8" />
            <circle cx="900" cy="120" r="80" fill="none" stroke="var(--primary)" strokeOpacity="0.02" strokeWidth="0.5" />
            {/* Sun rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
              const rad = (angle * Math.PI) / 180
              return <line key={angle} x1={900 + Math.cos(rad) * 50} y1={120 - Math.sin(rad) * 50} x2={900 + Math.cos(rad) * 75} y2={120 - Math.sin(rad) * 75} stroke="var(--primary)" strokeOpacity="0.03" strokeWidth="0.5" />
            })}

            {/* Distant mountain range */}
            <path
              d="M0,280 Q100,220 200,260 Q350,180 450,240 Q550,200 650,230 Q750,170 850,220 Q950,195 1050,240 Q1150,210 1200,250 L1200,400 L0,400Z"
              fill="var(--primary)"
              fillOpacity="0.04"
            />
            {/* Second mountain layer — closer, slightly darker */}
            <path
              d="M0,300 Q80,270 180,290 Q280,260 380,285 Q500,250 600,275 Q720,255 840,280 Q940,260 1060,278 Q1140,265 1200,275 L1200,400 L0,400Z"
              fill="var(--primary)"
              fillOpacity="0.025"
            />

            {/* Horizon glow line */}
            <line x1="0" y1="265" x2="1200" y2="265" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="1" />

            {/* Winding path through the landscape */}
            <path
              d="M500,400 Q480,370 510,340 Q540,310 520,285 Q500,265 530,250"
              fill="none" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="1.5"
            />
            <path
              d="M540,400 Q520,370 550,340 Q580,310 560,285 Q540,265 530,250"
              fill="none" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="1.5"
            />
            {/* Path dashes getting smaller toward horizon */}
            <line x1="520" y1="360" x2="535" y2="360" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.6" />
            <line x1="525" y1="330" x2="538" y2="330" stroke="var(--foreground)" strokeOpacity="0.035" strokeWidth="0.5" />
            <line x1="528" y1="300" x2="537" y2="300" stroke="var(--foreground)" strokeOpacity="0.03" strokeWidth="0.4" />

            {/* Trees along the path — varying sizes for depth */}
            {/* Large foreground tree (left) */}
            <line x1="180" y1="310" x2="180" y2="280" stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="1.5" />
            <circle cx="180" cy="274" r="12" fill="var(--primary)" fillOpacity="0.04" />
            <circle cx="180" cy="274" r="8" fill="var(--primary)" fillOpacity="0.03" />
            {/* Medium tree */}
            <line x1="350" y1="295" x2="350" y2="272" stroke="var(--primary)" strokeOpacity="0.07" strokeWidth="1.2" />
            <circle cx="350" cy="268" r="9" fill="var(--primary)" fillOpacity="0.035" />
            {/* Small distant tree */}
            <line x1="680" y1="270" x2="680" y2="258" stroke="var(--primary)" strokeOpacity="0.06" strokeWidth="0.8" />
            <circle cx="680" cy="255" r="6" fill="var(--primary)" fillOpacity="0.03" />
            {/* Tiny trees on the ridge */}
            <line x1="850" y1="260" x2="850" y2="252" stroke="var(--primary)" strokeOpacity="0.05" strokeWidth="0.6" />
            <circle cx="850" cy="250" r="4" fill="var(--primary)" fillOpacity="0.025" />
            <line x1="1020" y1="265" x2="1020" y2="258" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" />
            <circle cx="1020" cy="256" r="3.5" fill="var(--primary)" fillOpacity="0.02" />
            {/* Tree cluster right side */}
            <line x1="1080" y1="268" x2="1080" y2="255" stroke="var(--primary)" strokeOpacity="0.05" strokeWidth="0.7" />
            <circle cx="1080" cy="252" r="5" fill="var(--primary)" fillOpacity="0.025" />
            <line x1="1095" y1="270" x2="1095" y2="260" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.6" />
            <circle cx="1095" cy="258" r="4" fill="var(--primary)" fillOpacity="0.02" />

            {/* Birds in formation */}
            <g opacity="0.06">
              <path d="M300,150 l-4,4 l4,-1.5 l4,1.5 l-4,-4" stroke="var(--foreground)" strokeWidth="0.8" fill="none" />
              <path d="M320,143 l-3.5,3.5 l3.5,-1.2 l3.5,1.2 l-3.5,-3.5" stroke="var(--foreground)" strokeWidth="0.7" fill="none" />
              <path d="M312,155 l-3,3 l3,-1 l3,1 l-3,-3" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
              <path d="M335,148 l-3,3 l3,-1 l3,1 l-3,-3" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
              <path d="M325,158 l-2.5,2.5 l2.5,-0.8 l2.5,0.8 l-2.5,-2.5" stroke="var(--foreground)" strokeWidth="0.5" fill="none" />
            </g>
            {/* Second bird group, farther */}
            <g opacity="0.04">
              <path d="M750,100 l-3,3 l3,-1 l3,1 l-3,-3" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
              <path d="M765,95 l-2.5,2.5 l2.5,-0.8 l2.5,0.8 l-2.5,-2.5" stroke="var(--foreground)" strokeWidth="0.5" fill="none" />
              <path d="M758,105 l-2,2 l2,-0.7 l2,0.7 l-2,-2" stroke="var(--foreground)" strokeWidth="0.4" fill="none" />
            </g>

            {/* Scattered waypoint markers */}
            <circle cx="180" cy="258" r="2" fill="var(--primary)" fillOpacity="0.2" />
            <circle cx="480" cy="238" r="1.5" fill="var(--accent)" fillOpacity="0.2" />
            <circle cx="780" cy="218" r="2" fill="var(--primary)" fillOpacity="0.15" />
            <circle cx="1020" cy="242" r="1.5" fill="var(--accent)" fillOpacity="0.15" />

            {/* Ground contour lines */}
            <path d="M0,320 Q200,300 400,315 Q600,295 800,310 Q1000,290 1200,305" fill="none" stroke="var(--foreground)" strokeOpacity="0.025" strokeWidth="0.8" />
            <path d="M0,345 Q250,330 500,342 Q750,325 1000,338 Q1100,332 1200,340" fill="none" stroke="var(--foreground)" strokeOpacity="0.02" strokeWidth="0.6" />

            {/* Small plants / grass tufts in foreground */}
            <path d="M60,350 Q62,342 60,338" stroke="var(--primary)" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
            <path d="M63,350 Q65,344 67,340" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
            <path d="M150,340 Q152,333 150,328" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
            <path d="M820,345 Q822,338 820,333" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
            <path d="M823,345 Q826,340 828,335" stroke="var(--primary)" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
            <path d="M1150,335 Q1152,328 1150,324" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />

            {/* Compass rose — bottom right */}
            <g transform="translate(1130, 370)" opacity="0.05">
              <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--foreground)" strokeWidth="0.8" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="var(--foreground)" strokeWidth="0.8" />
              <polygon points="0,-12 -3,-3 0,-5 3,-3" fill="var(--foreground)" />
              <text x="0" y="-15" textAnchor="middle" fontSize="4" fill="var(--foreground)" fillOpacity="0.8">N</text>
            </g>
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
                  Featured
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
                <strong className="text-[var(--foreground)]">{project._count.members}</strong> contributors
              </span>
              <span className="text-[var(--border)]">|</span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)]">{totalProjects}</strong> projects
              </span>
              <span className="text-[var(--border)]">|</span>
              <span className="flex items-center gap-1.5">
                <TreePine className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)]">{totalContributors}</strong> members
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
          <div className="animate-pulse">
            <LoadingSeed />
          </div>
          <p className="text-xs text-[var(--muted-foreground)] tracking-widest uppercase">Loading projects...</p>
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
          <EmptyLandscape />
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)]">No Projects Yet</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              Head over to the community page to start a new project.
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
