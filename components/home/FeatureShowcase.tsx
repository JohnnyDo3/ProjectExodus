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
  accentRgb: string
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
    accentRgb: '54,118,61',
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
    accentRgb: '53,119,119',
  },
  {
    id: 'community',
    title: 'Community',
    tagline: 'Forums & Events',
    description: 'Discussions, events, and a vibrant community of advocates.',
    href: '/community',
    icon: Users,
    accentColor: '#c24f31',
    accentRgb: '194,79,49',
  },
  {
    id: 'networking',
    title: 'Network',
    tagline: 'Build Connections',
    description: 'Connect with changemakers, collaborate on projects, and grow your impact together.',
    href: '/network',
    icon: Share2,
    accentColor: '#357777',
    accentRgb: '53,119,119',
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
    accentRgb: '54,118,61',
  },
  {
    id: 'mindmaps',
    title: 'Creative Tools',
    tagline: 'Mind Maps & Docs',
    description: 'Mind maps, collaborative docs, and architecture tools.',
    href: '/mindmaps',
    icon: Brain,
    accentColor: '#c24f31',
    accentRgb: '194,79,49',
  },
  {
    id: 'gamification',
    title: 'Achievements',
    tagline: 'Level Up',
    description: 'Badges, streaks, leaderboards, and rewards as you grow.',
    href: '/dashboard',
    icon: Trophy,
    accentColor: '#36763d',
    accentRgb: '54,118,61',
  },
  {
    id: 'articles',
    title: 'Resources',
    tagline: 'Articles & Media',
    description: 'Curated articles, videos, and sustainability resources.',
    href: '/articles',
    icon: FileText,
    accentColor: '#357777',
    accentRgb: '53,119,119',
  },
]

// ============================================
// ANIMATED SCENES
// ============================================

function AnimatedScene({ id, color, rgb }: { id: string; color: string; rgb: string }) {
  switch (id) {
    case 'learn':
      return (
        <>
          {/* Floating book pages */}
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={`page-${i}`}
              className="absolute rounded-sm"
              style={{
                width: 18 + i * 5,
                height: 22 + i * 6,
                left: `${8 + i * 18}%`,
                top: `${10 + (i % 3) * 16}%`,
                border: `1.5px solid rgba(${rgb}, 0.25)`,
                backgroundColor: `rgba(${rgb}, 0.04)`,
                animation: `feat-float ${3 + i * 0.7}s ease-in-out infinite ${i * 0.5}s`,
                transform: `rotate(${-15 + i * 8}deg)`,
              }}
            />
          ))}
          {/* Graduation cap */}
          <GraduationCap
            className="absolute right-[12%] top-[12%]"
            style={{
              width: 48, height: 48, color, opacity: 0.2,
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
                bottom: `${8 + (i % 3) * 10}%`,
                color,
                opacity: 0.15,
                fontSize: 14 + i * 3,
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
                width: 24,
                height: 24,
                left: `${12 + (i % 3) * 30}%`,
                top: `${10 + Math.floor(i / 3) * 28}%`,
                backgroundColor: `rgba(${rgb}, 0.1)`,
                animation: `feat-pulse ${2 + (i % 3) * 0.4}s ease-in-out infinite ${i * 0.15}s`,
              }}
            />
          ))}
          <Leaf
            className="absolute right-[12%] bottom-[15%]"
            style={{ width: 30, height: 30, color, opacity: 0.18, animation: 'feat-float 5s ease-in-out infinite' }}
          />
        </>
      )

    case 'community':
      return (
        <>
          {/* Chat bubbles */}
          {[
            { left: '10%', top: '15%', w: 52, h: 28, delay: 0 },
            { left: '48%', top: '28%', w: 44, h: 24, delay: 1.5 },
            { left: '20%', top: '52%', w: 56, h: 30, delay: 3 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-xl"
              style={{
                width: b.w, height: b.h,
                left: b.left, top: b.top,
                backgroundColor: `rgba(${rgb}, 0.12)`,
                animation: `feat-pop 4s ease-out infinite ${b.delay}s`,
              }}
            >
              <div className="absolute top-[35%] left-2 right-3 h-[2px] rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.3)` }} />
              <div className="absolute top-[55%] left-2 right-5 h-[2px] rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.2)` }} />
            </div>
          ))}
          {/* User dots */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute rounded-full"
              style={{
                width: 10, height: 10,
                right: `${8 + i * 14}%`,
                bottom: `${10 + (i % 2) * 14}%`,
                backgroundColor: `rgba(${rgb}, 0.15)`,
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
            { x: '18%', y: '22%' }, { x: '48%', y: '15%' },
            { x: '72%', y: '32%' }, { x: '32%', y: '52%' },
            { x: '10%', y: '58%' }, { x: '60%', y: '62%' },
            { x: '82%', y: '50%' },
          ].map((node, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 8 + (i % 3) * 3,
                height: 8 + (i % 3) * 3,
                left: node.x, top: node.y,
                backgroundColor: `rgba(${rgb}, 0.2)`,
                animation: `feat-pulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.4}s`,
              }}
            />
          ))}
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
            {[
              ['18%', '22%', '48%', '15%', 2],
              ['48%', '15%', '72%', '32%', 2.5],
              ['32%', '52%', '72%', '32%', 3],
              ['10%', '58%', '32%', '52%', 2.2],
              ['18%', '22%', '32%', '52%', 2.8],
              ['60%', '62%', '82%', '50%', 2.4],
              ['48%', '15%', '60%', '62%', 3.2],
            ].map(([x1, y1, x2, y2, dur], i) => (
              <line key={i} x1={x1 as string} y1={y1 as string} x2={x2 as string} y2={y2 as string} stroke={color} strokeWidth="1.5" strokeDasharray="4 4">
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
            { top: '22%', size: 28, dur: 7, delay: 0 },
            { top: '45%', size: 22, dur: 9, delay: 2 },
            { top: '62%', size: 18, dur: 6, delay: 4 },
          ].map((f, i) => (
            <Fish
              key={i}
              className="absolute"
              style={{
                width: f.size, height: f.size,
                top: f.top, left: '8%',
                color, opacity: 0.18,
                animation: `feat-swim ${f.dur}s ease-in-out infinite ${f.delay}s`,
              }}
            />
          ))}
          {/* Bubbles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`bub-${i}`}
              className="absolute rounded-full"
              style={{
                width: 4 + i * 2, height: 4 + i * 2,
                left: `${18 + i * 15}%`,
                bottom: '18%',
                border: `1.5px solid rgba(${rgb}, 0.2)`,
                animation: `feat-rise ${3 + i * 0.8}s ease-out infinite ${i * 0.6}s`,
              }}
            />
          ))}
          {/* Wave */}
          <svg className="absolute top-[10%] inset-x-0 w-full h-5" style={{ opacity: 0.1 }}>
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
              width: 14, height: 14,
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: `rgba(${rgb}, 0.25)`,
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
                <div
                  className="absolute origin-left"
                  style={{ left: '50%', top: '50%', transform: `rotate(${b.angle}deg)` }}
                >
                  <div
                    style={{
                      width: b.len, height: 2,
                      backgroundColor: `rgba(${rgb}, 0.15)`,
                      transformOrigin: 'left',
                      animation: `feat-grow ${2 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
                    }}
                  />
                </div>
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 8, height: 8,
                    left: `${endX}%`, top: `${endY}%`,
                    backgroundColor: `rgba(${rgb}, 0.18)`,
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
                top: `${10 + (i % 3) * 25}%`,
                color, opacity: 0.2,
                fontSize: 10 + (i % 3) * 5,
                animation: `feat-sparkle ${2 + i * 0.5}s ease-in-out infinite ${i * 0.6}s`,
              }}
            >
              ✦
            </div>
          ))}
          {/* Trophy */}
          <Trophy
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 36, height: 36, color, opacity: 0.12, animation: 'feat-float 4s ease-in-out infinite' }}
          />
          {/* Floating points */}
          {['+10', '+25', '+5', '+50'].map((pts, i) => (
            <span
              key={pts}
              className="absolute font-bold text-[11px] select-none"
              style={{
                left: `${15 + i * 22}%`,
                bottom: '22%',
                color, opacity: 0.18,
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
              className="absolute rounded-md"
              style={{
                width: 44, height: 56,
                left: `${25 + i * 14}%`,
                top: `${14 + i * 8}%`,
                border: `1.5px solid rgba(${rgb}, 0.2)`,
                backgroundColor: `rgba(${rgb}, 0.04)`,
                animation: `feat-float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
                transform: `rotate(${-5 + i * 5}deg)`,
              }}
            >
              {[0, 1, 2].map(j => (
                <div
                  key={j}
                  className="rounded-full mx-1.5"
                  style={{
                    height: 2,
                    marginTop: 8 + j * 7,
                    width: `${55 + j * 10}%`,
                    backgroundColor: `rgba(${rgb}, 0.22)`,
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
                width: 5, height: 5,
                left: `${12 + i * 30}%`,
                top: `${28 + i * 15}%`,
                backgroundColor: `rgba(${rgb}, 0.12)`,
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--primary)_4%,var(--background))] to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
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
                background: 'linear-gradient(135deg, rgba(54,118,61,0.12), rgba(53,119,119,0.12))',
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
              EVERYTHING UNDER ONE ROOF
            </h2>
            <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium">
              One platform for sustainable living — discover, learn, connect, and create.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[200px] gap-4 md:gap-5 lg:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.id}
                  href={feature.href}
                  className={cn('block', feature.gridClass)}
                >
                  <motion.div
                    className="group relative w-full h-full min-h-[200px] md:min-h-0 overflow-hidden rounded-2xl border cursor-pointer bg-[var(--card)]"
                    style={{ borderColor: `rgba(${feature.accentRgb}, 0.2)` }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  >
                    {/* Background gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(145deg, rgba(${feature.accentRgb}, 0.06) 0%, transparent 50%, rgba(${feature.accentRgb}, 0.1) 100%)`,
                      }}
                    />

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at 50% 70%, rgba(${feature.accentRgb}, 0.12) 0%, transparent 70%)`,
                      }}
                    />

                    {/* Animated scene */}
                    <div className="absolute inset-0 overflow-hidden">
                      <AnimatedScene id={feature.id} color={feature.accentColor} rgb={feature.accentRgb} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-end">
                      {/* Icon badge */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `rgba(${feature.accentRgb}, 0.12)`, border: `1px solid rgba(${feature.accentRgb}, 0.15)` }}
                        >
                          <Icon style={{ width: 20, height: 20, color: feature.accentColor }} />
                        </div>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `rgba(${feature.accentRgb}, 0.1)`, color: feature.accentColor }}
                        >
                          {feature.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        'font-black text-[var(--foreground)] mb-1',
                        feature.hero ? 'text-xl md:text-2xl' : 'text-lg',
                      )}>
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
                              className="px-3 py-1.5 rounded-lg text-[11px] font-bold"
                              style={{
                                backgroundColor: `rgba(${feature.accentRgb}, 0.1)`,
                                color: feature.accentColor,
                                border: `1px solid rgba(${feature.accentRgb}, 0.12)`,
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

                    {/* Border + shadow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{
                        border: `1.5px solid rgba(${feature.accentRgb}, 0.3)`,
                        boxShadow: `0 8px 32px rgba(${feature.accentRgb}, 0.15), 0 2px 8px rgba(${feature.accentRgb}, 0.08)`,
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
