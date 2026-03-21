'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  TreePine, Wind, Home, Droplets, Utensils, Waves,
  ChevronLeft, ChevronRight, ExternalLink, Leaf,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Billboard slide data — real sustainable technology innovations
// ---------------------------------------------------------------------------

interface BillboardSlide {
  id: string
  category: string
  title: string
  subtitle: string
  description: string
  stat: string
  statLabel: string
  source: string
  sourceUrl: string
  gradient: string
  accentColor: string
  icon: any
  imageUrl: string
}

const SLIDES: BillboardSlide[] = [
  {
    id: 'artificial-trees',
    category: 'Carbon Capture',
    title: 'Mechanical Trees',
    subtitle: 'CO₂ capture 1,000× faster than nature',
    description:
      'Klaus Lackner\'s MechanicalTree™ uses passive moisture-swing sorbent discs — no energy-intensive fans. Each 10-meter column absorbs CO₂ from ambient air; discs saturate in ~20 minutes, retract into a sealed canister to release pure CO₂. A cluster of 12 trees captures ~1 ton/day. Carbon Collect Ltd deployed the first prototype at ASU\'s Tempe campus in 2022, with Gen-II announced in 2024 targeting under $200/ton by 2030.',
    stat: '1,000×',
    statLabel: 'faster than real trees',
    source: 'Arizona State University / Carbon Collect',
    sourceUrl: 'https://news.asu.edu/20220415-solutions-first-mechanicaltree-installed-asu-carbon-collect-tempe',
    gradient: 'from-emerald-600 via-green-700 to-teal-800',
    accentColor: 'emerald',
    icon: TreePine,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
  },
  {
    id: 'system-3e',
    category: 'Green Building',
    title: 'System 3E — Poland',
    subtitle: 'Hemp-lime modular passive housing',
    description:
      'System 3E is a Polish construction method using prefabricated hemp-lime (hempcrete) wall panels on timber frames. The walls provide thermal insulation (U-value as low as 0.15 W/m²K), moisture regulation, and carbon storage in a single layer. Buildings meet near-zero energy standards while the hemp-lime composite sequesters CO₂ throughout its lifetime. Multiple residential projects have been completed across Poland.',
    stat: '0.15',
    statLabel: 'W/m²K wall U-value',
    source: 'System 3E / Hemp Building Association',
    sourceUrl: 'https://system3e.pl',
    gradient: 'from-amber-600 via-yellow-700 to-orange-800',
    accentColor: 'amber',
    icon: Home,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  },
  {
    id: 'hemp-insulation',
    category: 'Sustainable Materials',
    title: 'HempWool Insulation',
    subtitle: 'Carbon-negative, R-3.5 per inch',
    description:
      'Hempitecture\'s HempWool uses industrial hemp fibers to create batt insulation rated R-3.5 per inch — comparable to fiberglass but carbon-negative. Growing 1 ton of hemp absorbs 1.62 tons of CO₂. The insulation is naturally fire-resistant (Class A rating), mold-resistant, and vapor-permeable. It\'s been installed in major projects including a 22-unit affordable housing complex in Idaho and commercial buildings across the US.',
    stat: '1.62',
    statLabel: 'tons CO₂ absorbed per ton',
    source: 'Hempitecture Inc.',
    sourceUrl: 'https://www.hempitecture.com',
    gradient: 'from-lime-600 via-green-700 to-emerald-800',
    accentColor: 'lime',
    icon: Leaf,
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
  },
  {
    id: 'climeworks',
    category: 'Direct Air Capture',
    title: 'Climeworks Mammoth',
    subtitle: 'World\'s largest DAC plant — Iceland',
    description:
      'Climeworks\' Mammoth plant in Hellisheiði, Iceland launched May 2024 as the world\'s largest DAC facility — 10× its predecessor Orca. 72 modular collector containers use geothermal energy to heat sorbents and release captured CO₂. Via Carbfix, the CO₂ is dissolved in water and injected into basalt through 2 on-site wells, mineralizing into rock in under 2 years — permanent geological storage. Carbfix has mineralized over 80,000 tons of CO₂ in Iceland since 2012.',
    stat: '36,000',
    statLabel: 'tons CO₂ capacity/year',
    source: 'Climeworks AG',
    sourceUrl: 'https://climeworks.com/plant-mammoth',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-800',
    accentColor: 'cyan',
    icon: Wind,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    id: 'solein',
    category: 'Future Food',
    title: 'Solein — Protein From Air',
    subtitle: 'Solar Foods, Finland',
    description:
      'Solar Foods produces Solein, a single-cell protein made by feeding hydrogen-oxidizing bacteria with CO₂, water, and renewable electricity. The result is a protein-rich powder (65-70% protein) that uses 100× less land than soy and 10× less water. Solein received regulatory approval in Singapore (2022) and has been submitted for EU Novel Food approval. Solar Foods\' Factory 01 in Vantaa, Finland began commercial production in 2024.',
    stat: '100×',
    statLabel: 'less land than soy protein',
    source: 'Solar Foods Ltd.',
    sourceUrl: 'https://solarfoods.com',
    gradient: 'from-orange-500 via-amber-600 to-yellow-700',
    accentColor: 'orange',
    icon: Utensils,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    id: 'seabin',
    category: 'Ocean Cleanup',
    title: 'Seabin Project',
    subtitle: 'Floating trash collectors for marinas',
    description:
      'The Seabin is a floating debris interception device designed for marinas, yacht clubs, and ports. Each unit operates 24/7, filtering up to 25,000 liters of water per hour, capturing floating debris, microplastics down to 2mm, and even surface oils. A single Seabin removes approximately 1.4 tons of marine debris per year. Founded in 2015 by Australian surfers Andrew Turton and Pete Ceglinski, there are now 900+ units deployed across 52 countries.',
    stat: '900+',
    statLabel: 'units in 52 countries',
    source: 'Seabin Project Pty Ltd',
    sourceUrl: 'https://seabinproject.com',
    gradient: 'from-blue-600 via-sky-700 to-teal-800',
    accentColor: 'blue',
    icon: Waves,
    imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&q=80',
  },
]

const ROTATION_INTERVAL = 6000 // 6 seconds per slide

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SustainableTechBillboard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number | null>(null)

  const slide = SLIDES[activeIndex]

  // Auto-rotation
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setIsTransitioning(true)
        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % SLIDES.length)
          setIsTransitioning(false)
        }, 300)
      }
    }, ROTATION_INTERVAL)
  }, [isPaused])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 300)
    startTimer() // Reset timer on manual navigation
  }

  const goNext = () => goToSlide((activeIndex + 1) % SLIDES.length)
  const goPrev = () => goToSlide((activeIndex - 1 + SLIDES.length) % SLIDES.length)

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
    touchStartX.current = null
  }

  // Haptic feedback
  const haptic = () => {
    try { navigator.vibrate?.(8) } catch {}
  }

  return (
    <div className="relative w-full my-8 sm:my-12">
      {/* Section header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-theme-muted flex items-center gap-2">
          <Leaf className="w-3 h-3" />
          Sustainable Innovation Spotlight
          <Leaf className="w-3 h-3" />
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-transparent" />
      </div>

      {/* Billboard card */}
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-[var(--border)]/40 bg-[var(--card)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Content: split layout */}
        <div
          className={`flex flex-col md:flex-row transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Left: Visual */}
          <div className={`relative md:w-2/5 h-48 sm:h-56 md:h-auto md:min-h-[340px] bg-gradient-to-br ${slide.gradient} overflow-hidden`}>
            {/* Background image with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Icon + category */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                <slide.icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                {slide.category}
              </span>
            </div>

            {/* Big stat */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white/90 leading-none drop-shadow-lg">
                {slide.stat}
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-white/60 mt-1 uppercase tracking-wider">
                {slide.statLabel}
              </p>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)] leading-tight mb-1">
                {slide.title}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[var(--primary)] mb-4">
                {slide.subtitle}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* Source + CTA */}
            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-[10px] sm:text-xs text-[var(--muted-foreground)] font-mono">
                Source: {slide.source}
              </p>
              <a
                href={slide.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${slide.gradient} text-white text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity shadow-lg`}
                onClick={haptic}
              >
                Learn More
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Nav arrows — desktop */}
        <button
          onClick={() => { haptic(); goPrev() }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10 hidden md:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => { haptic(); goNext() }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10 hidden md:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 md:bottom-4">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { haptic(); goToSlide(i) }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-[var(--primary)]'
                  : 'w-2 bg-[var(--muted-foreground)]/40 hover:bg-[var(--muted-foreground)]/70'
              }`}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Auto-rotation progress bar */}
        {!isPaused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--border)]/20">
            <div
              className="h-full bg-[var(--primary)]/60"
              style={{
                animation: `billboard-progress ${ROTATION_INTERVAL}ms linear infinite`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes billboard-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
