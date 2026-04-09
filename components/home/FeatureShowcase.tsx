'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap, ShoppingBag, Users, Fish,
  Share2, Brain, Trophy, FileText, ArrowRight,
  Leaf, Droplet, Zap, UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ============================================
// FEATURE DATA
// ============================================

interface Feature {
  id: string
  title: string
  tagline: string
  description: string
  href: string
  icon: typeof GraduationCap
  accentColor: string
  gridClass?: string
  hero?: boolean
  stats?: string[]
}

const features: Feature[] = [
  {
    id: 'learn',
    title: 'Learning Academy',
    tagline: 'ACE Credit Recommended',
    description: 'Interactive Digital Scrolls with deep-dive courses across 6 sustainability topics. Real academic credit potential.',
    href: '/learn',
    icon: GraduationCap,
    accentColor: '#36763d',
    gridClass: 'md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2',
    hero: true,
    stats: ['330+ Questions', '6 Topics', 'ACE Accredited'],
  },
  {
    id: 'products',
    title: 'Marketplace',
    tagline: 'Sustainable Products',
    description: 'Browse thousands of sustainable products across every category.',
    href: '/products',
    icon: ShoppingBag,
    accentColor: '#357777',
  },
  {
    id: 'community',
    title: 'Community',
    tagline: 'Forums & Events',
    description: 'Discussions, events, and a vibrant community of advocates.',
    href: '/community',
    icon: Users,
    accentColor: '#c24f31',
  },
  {
    id: 'networking',
    title: 'Network',
    tagline: 'Build Connections',
    description: 'Connect with changemakers, collaborate on projects, and grow your impact together.',
    href: '/network',
    icon: Share2,
    accentColor: '#357777',
    gridClass: 'lg:col-span-2',
  },
  {
    id: 'tank',
    title: 'My Tank',
    tagline: 'Your Impact Hub',
    description: 'Track analytics and manage your sustainability journey.',
    href: '/my/volition',
    icon: Fish,
    accentColor: '#36763d',
  },
  {
    id: 'mindmaps',
    title: 'Creative Tools',
    tagline: 'Mind Maps & Docs',
    description: 'Mind maps, collaborative docs, and architecture tools.',
    href: '/mindmaps',
    icon: Brain,
    accentColor: '#c24f31',
  },
  {
    id: 'gamification',
    title: 'Achievements',
    tagline: 'Level Up',
    description: 'Badges, streaks, leaderboards, and rewards as you grow.',
    href: '/dashboard',
    icon: Trophy,
    accentColor: '#36763d',
  },
  {
    id: 'articles',
    title: 'Resources',
    tagline: 'Articles & Media',
    description: 'Curated articles, videos, and sustainability resources.',
    href: '/articles',
    icon: FileText,
    accentColor: '#357777',
  },
]

// ============================================
// ANIMATED SCENES
// ============================================

function AnimatedScene({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'learn':
      return (
        <>
          {/* Floating book pages */}
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={`page-${i}`}
              className="absolute rounded-sm border"
              style={{
                width: 16 + i * 4,
                height: 20 + i * 5,
                left: `${8 + i * 18}%`,
                top: `${12 + (i % 3) * 18}%`,
                borderColor: color,
                opacity: 0.1 + i * 0.02,
                animation: `feat-float ${3 + i * 0.7}s ease-in-out infinite ${i * 0.5}s`,
                transform: `rotate(${-15 + i * 8}deg)`,
              }}
            />
          ))}
          {/* Graduation cap */}
          <GraduationCap
            className="absolute right-[12%] top-[15%]"
            style={{
              width: 44, height: 44, color, opacity: 0.12,
              animation: 'feat-float 4s ease-in-out infinite 1s',
            }}
          />
          {/* Knowledge symbols */}
          {['∑', 'π', '∞', '☀', '✦', '∫'].map((sym, i) => (
            <span
              key={sym}
              className="absolute font-bold select-none"
              style={{
                left: `${5 + i * 16}%`,
                bottom: `${8 + (i % 3) * 12}%`,
                color,
                opacity: 0.08,
                fontSize: 12 + i * 3,
                animation: `feat-rise ${5 + i}s linear infinite ${i * 1.2}s`,
              }}
            >
              {sym}
            </span>
          ))}
        </>
      )

    case 'products':
      return (
        <>
          {/* Product grid dots */}
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-lg"
              style={{
                width: 22,
                height: 22,
                left: `${15 + (i % 3) * 28}%`,
                top: `${12 + Math.floor(i / 3) * 28}%`,
                backgroundColor: color,
                opacity: 0.06,
                animation: `feat-pulse ${2 + (i % 3) * 0.4}s ease-in-out infinite ${i * 0.15}s`,
              }}
            />
          ))}
          <Leaf
            className="absolute right-[15%] bottom-[18%]"
            style={{ width: 28, height: 28, color, opacity: 0.1, animation: 'feat-float 5s ease-in-out infinite' }}
          />
        </>
      )

    case 'community':
      return (
        <>
          {/* Chat bubbles */}
          {[
            { left: '12%', top: '18%', w: 48, h: 26, delay: 0 },
            { left: '48%', top: '30%', w: 40, h: 22, delay: 1.5 },
            { left: '22%', top: '52%', w: 52, h: 28, delay: 3 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-xl"
              style={{
                width: b.w, height: b.h,
                left: b.left, top: b.top,
                backgroundColor: color,
                opacity: 0.08,
                animation: `feat-pop ${4}s ease-out infinite ${b.delay}s`,
              }}
            >
              <div className="absolute top-[35%] left-2 right-3 h-[2px] rounded-full" style={{ backgroundColor: color, opacity: 0.25 }} />
              <div className="absolute top-[55%] left-2 right-5 h-[2px] rounded-full" style={{ backgroundColor: color, opacity: 0.15 }} />
            </div>
          ))}
          {/* User dots */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute rounded-full"
              style={{
                width: 8, height: 8,
                right: `${10 + i * 14}%`,
                bottom: `${12 + (i % 2) * 12}%`,
                backgroundColor: color,
                opacity: 0.1,
                animation: `feat-pulse ${2 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </>
      )

    case 'networking':
      return (
        <>
          {/* Network nodes */}
          {[
            { x: '20%', y: '25%' }, { x: '50%', y: '18%' },
            { x: '75%', y: '35%' }, { x: '35%', y: '55%' },
            { x: '12%', y: '60%' }, { x: '62%', y: '65%' },
            { x: '85%', y: '55%' },
          ].map((node, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6 + (i % 3) * 3,
                height: 6 + (i % 3) * 3,
                left: node.x, top: node.y,
                backgroundColor: color,
                opacity: 0.12,
                animation: `feat-pulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.4}s`,
              }}
            />
          ))}
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
            {[
              ['20%', '25%', '50%', '18%', 2],
              ['50%', '18%', '75%', '35%', 2.5],
              ['35%', '55%', '75%', '35%', 3],
              ['12%', '60%', '35%', '55%', 2.2],
              ['20%', '25%', '35%', '55%', 2.8],
              ['62%', '65%', '85%', '55%', 2.4],
              ['50%', '18%', '62%', '65%', 3.2],
            ].map(([x1, y1, x2, y2, dur], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="8" to="0" dur={`${dur}s`} repeatCount="indefinite" />
              </line>
            ))}
          </svg>
        </>
      )

    case 'tank':
      return (
        <>
          {/* Fish */}
          {[
            { top: '25%', size: 26, dur: 7, delay: 0 },
            { top: '48%', size: 20, dur: 9, delay: 2 },
            { top: '65%', size: 16, dur: 6, delay: 4 },
          ].map((f, i) => (
            <Fish
              key={i}
              className="absolute"
              style={{
                width: f.size, height: f.size,
                top: f.top, left: '8%',
                color, opacity: 0.1,
                animation: `feat-swim ${f.dur}s ease-in-out infinite ${f.delay}s`,
              }}
            />
          ))}
          {/* Bubbles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`bub-${i}`}
              className="absolute rounded-full border"
              style={{
                width: 3 + i * 2, height: 3 + i * 2,
                left: `${18 + i * 15}%`,
                bottom: '20%',
                borderColor: color,
                opacity: 0.08,
                animation: `feat-rise ${3 + i * 0.8}s ease-out infinite ${i * 0.6}s`,
              }}
            />
          ))}
          {/* Wave */}
          <svg className="absolute top-[12%] inset-x-0 w-full h-5" style={{ opacity: 0.06 }}>
            <path d="M0,10 Q20,2 40,10 Q60,18 80,10 Q100,2 120,10 Q140,18 160,10 Q180,2 200,10" fill="none" stroke={color} strokeWidth="2">
              <animate attributeName="d"
                values="M0,10 Q20,2 40,10 Q60,18 80,10 Q100,2 120,10 Q140,18 160,10 Q180,2 200,10;M0,10 Q20,18 40,10 Q60,2 80,10 Q100,18 120,10 Q140,2 160,10 Q180,18 200,10;M0,10 Q20,2 40,10 Q60,18 80,10 Q100,2 120,10 Q140,18 160,10 Q180,2 200,10"
                dur="4s" repeatCount="indefinite" />
            </path>
          </svg>
        </>
      )

    case 'mindmaps':
      return (
        <>
          {/* Central node */}
          <div
            className="absolute rounded-full"
            style={{
              width: 12, height: 12,
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: color, opacity: 0.15,
              animation: 'feat-pulse 3s ease-in-out infinite',
            }}
          />
          {/* Branches */}
          {[
            { angle: 0, len: 55 }, { angle: 72, len: 45 },
            { angle: 144, len: 50 }, { angle: 216, len: 40 },
            { angle: 288, len: 48 },
          ].map((b, i) => {
            const rad = (b.angle * Math.PI) / 180
            const endX = 50 + Math.cos(rad) * (b.len / 3.5)
            const endY = 50 + Math.sin(rad) * (b.len / 3.5)
            return (
              <div key={i}>
                {/* Branch line container (rotated) */}
                <div
                  className="absolute origin-left"
                  style={{
                    left: '50%', top: '50%',
                    transform: `rotate(${b.angle}deg)`,
                  }}
                >
                  <div
                    style={{
                      width: b.len, height: 2,
                      backgroundColor: color,
                      opacity: 0.08,
                      transformOrigin: 'left',
                      animation: `feat-grow ${2 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
                    }}
                  />
                </div>
                {/* End node */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 7, height: 7,
                    left: `${endX}%`, top: `${endY}%`,
                    backgroundColor: color, opacity: 0.1,
                    animation: `feat-pulse ${2 + i * 0.4}s ease-in-out infinite ${1 + i * 0.3}s`,
                  }}
                />
              </div>
            )
          })}
        </>
      )

    case 'gamification':
      return (
        <>
          {/* Sparkle stars */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute select-none"
              style={{
                left: `${8 + i * 13}%`,
                top: `${12 + (i % 3) * 25}%`,
                color, opacity: 0.12,
                fontSize: 8 + (i % 3) * 4,
                animation: `feat-sparkle ${2 + i * 0.5}s ease-in-out infinite ${i * 0.6}s`,
              }}
            >
              ✦
            </div>
          ))}
          {/* Trophy */}
          <Trophy
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 32, height: 32, color, opacity: 0.08, animation: 'feat-float 4s ease-in-out infinite' }}
          />
          {/* Floating points */}
          {['+10', '+25', '+5', '+50'].map((pts, i) => (
            <span
              key={pts}
              className="absolute font-bold text-[10px] select-none"
              style={{
                left: `${15 + i * 22}%`,
                bottom: '25%',
                color, opacity: 0.1,
                animation: `feat-rise ${3 + i}s ease-out infinite ${i * 1.2}s`,
              }}
            >
              {pts}
            </span>
          ))}
        </>
      )

    case 'articles':
      return (
        <>
          {/* Stacked documents */}
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute rounded-md border"
              style={{
                width: 40, height: 52,
                left: `${28 + i * 12}%`,
                top: `${16 + i * 8}%`,
                borderColor: color,
                backgroundColor: `${color}06`,
                opacity: 0.1 + i * 0.02,
                animation: `feat-float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
                transform: `rotate(${-5 + i * 5}deg)`,
              }}
            >
              {/* Text lines */}
              {[0, 1, 2].map(j => (
                <div
                  key={j}
                  className="rounded-full mx-1.5"
                  style={{
                    height: 2,
                    marginTop: 6 + j * 6,
                    width: `${55 + j * 10}%`,
                    backgroundColor: color,
                    opacity: 0.18,
                  }}
                />
              ))}
            </div>
          ))}
          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`p-${i}`}
              className="absolute rounded-full"
              style={{
                width: 4, height: 4,
                left: `${15 + i * 30}%`,
                top: `${30 + i * 15}%`,
                backgroundColor: color, opacity: 0.08,
                animation: `feat-drift ${4 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
              }}
            />
          ))}
        </>
      )

    default:
      return null
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

export function FeatureShowcase() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const showSignUp = !isAuthenticated && status !== 'loading'

  return (
    <section className="py-24 md:py-32 bg-[var(--background)] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--primary)_3%,var(--background))] to-transparent" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(54,118,61,0.1), rgba(53,119,119,0.1))',
                color: '#36763d',
              }}
            >
              THE PLATFORM
            </span>
            <h2 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
            }}>
              HERE&apos;S WHAT YOU GET
            </h2>
            <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium">
              Everything you need to live, learn, and lead sustainably — all in one place.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[190px] gap-4 md:gap-5 lg:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.id}
                  href={feature.href}
                  className={cn(
                    'block',
                    feature.gridClass,
                  )}
                >
                  <motion.div
                    className="group relative w-full h-full min-h-[180px] md:min-h-0 overflow-hidden rounded-2xl border-2 cursor-pointer"
                    style={{ borderColor: `${feature.accentColor}25` }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  >
                    {/* Background gradient */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${feature.accentColor}12 0%, ${feature.accentColor}08 50%, ${feature.accentColor}15 100%)`,
                      }}
                    />

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at 50% 80%, ${feature.accentColor}18 0%, transparent 70%)`,
                      }}
                    />

                    {/* Animated scene */}
                    <div className="absolute inset-0 overflow-hidden transition-opacity duration-700 group-hover:opacity-140">
                      <AnimatedScene id={feature.id} color={feature.accentColor} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-end">
                      {/* Icon + tagline row */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `${feature.accentColor}18` }}
                        >
                          <Icon style={{ width: 18, height: 18, color: feature.accentColor }} />
                        </div>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `${feature.accentColor}12`, color: feature.accentColor }}
                        >
                          {feature.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-[var(--foreground)] mb-1">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className={cn(
                        'text-sm text-[var(--muted-foreground)] leading-relaxed',
                        !feature.hero && 'line-clamp-2',
                      )}>
                        {feature.description}
                      </p>

                      {/* Stats (hero only) */}
                      {feature.stats && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {feature.stats.map(stat => (
                            <span
                              key={stat}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                              style={{
                                backgroundColor: `${feature.accentColor}12`,
                                color: feature.accentColor,
                              }}
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Hover CTA */}
                      <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-sm font-bold" style={{ color: feature.accentColor }}>
                          Explore
                        </span>
                        <ArrowRight style={{ width: 14, height: 14, color: feature.accentColor }} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Border glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: `0 0 30px ${feature.accentColor}20, inset 0 0 30px ${feature.accentColor}08`,
                      }}
                    />
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* ============================================ */}
          {/* THREE PILLARS BAND */}
          {/* ============================================ */}
          <motion.div
            className="mt-20 md:mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden py-12 md:py-16 px-6">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#36763d] via-[#357777] to-[#c24f31]" />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.08) 20px, rgba(255,255,255,0.08) 40px)',
              }} />

              <div className="relative z-10 text-center text-white">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] mb-6 opacity-70">
                  THREE PILLARS · ONE MISSION
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-14 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Leaf className="w-7 h-7 md:w-9 md:h-9 opacity-90" />
                    <span className="text-2xl md:text-4xl font-black">FOOD</span>
                  </div>
                  <span className="hidden sm:block text-2xl opacity-30">·</span>
                  <div className="flex items-center gap-2.5">
                    <Droplet className="w-7 h-7 md:w-9 md:h-9 opacity-90" />
                    <span className="text-2xl md:text-4xl font-black">WATER</span>
                  </div>
                  <span className="hidden sm:block text-2xl opacity-30">·</span>
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-7 h-7 md:w-9 md:h-9 opacity-90" />
                    <span className="text-2xl md:text-4xl font-black">ENERGY</span>
                  </div>
                </div>

                <p className="text-base md:text-lg font-bold opacity-85 max-w-xl mx-auto">
                  Developing sustainable off-grid systems within built environments
                </p>
              </div>
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* SIGN UP CTA (non-authenticated users only) */}
          {/* ============================================ */}
          {showSignUp && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/auth/signup"
                className="group/cta inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: '#36763d',
                  background: 'linear-gradient(135deg, rgba(54,118,61,0.08), rgba(53,119,119,0.08))',
                }}
              >
                <UserPlus style={{ width: 18, height: 18, color: '#36763d' }} />
                <span className="text-base font-bold text-[var(--foreground)]">
                  Ready to unlock everything?
                </span>
                <span className="font-black" style={{ color: '#36763d' }}>
                  Sign Up Free
                </span>
                <ArrowRight
                  style={{ width: 16, height: 16, color: '#36763d' }}
                  className="group-hover/cta:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}
