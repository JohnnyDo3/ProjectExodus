'use client'

// ============================================
// THE CONSTELLATION CARD
// "Each soul is a star in the network sky,
//  glowing with its own light, yet part of
//  a greater constellation."
// ============================================

import { useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'
import { Button } from '@/components/ui/Button'
import {
  Users,
  MapPin,
  UserPlus,
  UserCheck,
  Loader2,
  MessageCircle,
  Sparkles,
  Briefcase,
} from 'lucide-react'
import { resolveCommandment } from '@/lib/commandments'

// ============================================
// TYPES
// ============================================

export interface ConstellationCardUser {
  id: string
  name: string | null
  email: string
  image: string | null
  headline: string | null
  bio: string | null
  location: string | null
  company?: string | null
  jobTitle?: string | null
  interests?: string[]
  expertise?: string[]
  guardianArchetype: string | null
  declaration?: string | null
  _count?: {
    followers: number
    following?: number
    projectMemberships?: number
    articles?: number
    createdProjects?: number
  }
  matchScore?: number
  matchReasons?: string[]
  isFollowing?: boolean
  connectionStatus?: string
}

interface ConstellationCardProps {
  user: ConstellationCardUser
  isFollowing?: boolean
  isFollowingMe?: boolean
  isLoadingFollow?: boolean
  onFollow?: (userId: string) => void
  onMessage?: (userId: string) => void
  isLoggedIn?: boolean
  index?: number
  showActions?: boolean
}

// ============================================
// THE CARD
// ============================================

export function ConstellationCard({
  user,
  isFollowing = false,
  isFollowingMe = false,
  isLoadingFollow = false,
  onFollow,
  onMessage,
  isLoggedIn = false,
  index = 0,
  showActions = true,
}: ConstellationCardProps) {
  const { phase, twilightProgress, isDay } = useTimeTheme()

  // DB still stores legacy guardianArchetype values like 'michael' —
  // resolveCommandment handles both new commandment slugs and the
  // legacy ones, falling back to STEWARDSHIP for unknowns.
  const archetype = resolveCommandment(user.guardianArchetype)
  const ArchetypeIcon = archetype.icon
  // hexAccent + an alpha hex byte produces a CSS rgba() equivalent
  // without any string parsing: '40' ≈ 25%, '66' ≈ 40%.
  const glow = `${archetype.hexAccent}40`
  const glowNight = `${archetype.hexAccent}66`
  const accent = archetype.hexAccent

  // Calculate STOCK score
  const stockScore = useMemo(() => {
    if (!user._count) return 0
    return (
      ((user._count.createdProjects || 0) * 10) +
      ((user._count.articles || 0) * 5) +
      ((user._count.followers || 0) * 1) +
      ((user._count.projectMemberships || 0) * 2)
    )
  }, [user._count])

  // Theme-reactive ambiance
  const ambiance = useMemo(() => {
    const isNightPhase = twilightProgress > 0.65
    const isTwilightPhase = twilightProgress > 0.3 && twilightProgress <= 0.65
    const isDawnDusk = phase === 'dawn' || phase === 'dusk' || phase === 'sunrise' || phase === 'sunset'

    return {
      cardBg: isNightPhase
        ? 'rgba(10, 10, 24, 0.75)'
        : isTwilightPhase
          ? 'rgba(245, 235, 224, 0.65)'
          : 'rgba(250, 250, 249, 0.55)',
      blur: isNightPhase ? 'blur(20px)' : isTwilightPhase ? 'blur(16px)' : 'blur(12px)',
      glowColor: isNightPhase ? glowNight : glow,
      glowIntensity: isNightPhase ? 20 : isDawnDusk ? 15 : 8,
      borderOpacity: isNightPhase ? 0.3 : 0.15,
      shimmer: isDawnDusk,
      cosmic: isNightPhase,
    }
  }, [phase, twilightProgress, archetype])

  // Relationship badge
  const relationshipBadge = useMemo(() => {
    if (isFollowing && isFollowingMe) {
      return { label: 'MUTUAL', bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', pulse: true }
    }
    if (isFollowing) {
      return { label: 'FOLLOWING', bg: 'bg-gradient-to-r from-blue-500 to-sky-500', pulse: false }
    }
    if (isFollowingMe) {
      return { label: 'FOLLOWS YOU', bg: 'bg-gradient-to-r from-purple-500 to-violet-500', pulse: false }
    }
    return null
  }, [isFollowing, isFollowingMe])

  const tags = user.interests?.length ? user.interests : user.expertise || []

  return (
    <motion.div
      layout
      layoutId={`constellation-${user.id}`}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, y: -10 }}
      transition={{
        layout: { type: 'spring', stiffness: 150, damping: 25, mass: 1 },
        opacity: { duration: 0.4, ease: 'easeOut' },
        scale: { duration: 0.4, ease: 'easeOut' },
        y: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        delay: Math.min(index * 0.06, 0.6),
      }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="group relative"
    >
      {/* Glow layer */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${ambiance.glowColor}, transparent 70%)`,
          filter: `blur(${ambiance.glowIntensity}px)`,
        }}
      />

      {/* Card surface */}
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          background: ambiance.cardBg,
          backdropFilter: ambiance.blur,
          WebkitBackdropFilter: ambiance.blur,
          borderColor: `color-mix(in srgb, ${accent} ${ambiance.borderOpacity * 100}%, var(--border))`,
        }}
      >
        {/* Archetype gradient accent bar */}
        <div className={`h-1 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
          {/* Shimmer effect during twilight */}
          {ambiance.shimmer && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            />
          )}
        </div>

        {/* Cosmic sparkle overlay for night */}
        {ambiance.cosmic && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-white"
                style={{
                  left: `${15 + (i * 17) % 80}%`,
                  top: `${10 + (i * 23) % 75}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2 + (i * 0.7),
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}

        <div className="p-4 sm:p-5 relative">
          {/* Top row: Avatar + Info + Badge */}
          <div className="flex items-start gap-3 sm:gap-4 mb-3">
            {/* Avatar */}
            <Link href={`/profile/${user.id}`} className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${archetype.gradient} p-[2px]`}
                style={{
                  boxShadow: `0 0 ${ambiance.cosmic ? 16 : 8}px ${ambiance.glowColor}`,
                }}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="w-full h-full rounded-[10px] object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-[10px] bg-[var(--card)] flex items-center justify-center">
                    <span className={`text-xl font-black ${archetype.accentColor}`}>
                      {(user.name?.[0] || user.email[0]).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Online indicator / archetype pip */}
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-gradient-to-br ${archetype.gradient} flex items-center justify-center shadow-lg`}
                >
                  <ArchetypeIcon className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link href={`/profile/${user.id}`}>
                    <h3 className="text-sm sm:text-base font-black text-[var(--foreground)] truncate hover:text-[var(--primary)] transition-colors">
                      {user.name || 'Anonymous'}
                    </h3>
                  </Link>
                  {user.headline && (
                    <p className="text-[11px] sm:text-xs text-[var(--muted-foreground)] truncate mt-0.5">
                      {user.headline}
                    </p>
                  )}
                  {(user.jobTitle || user.company) && (
                    <p className="text-[10px] sm:text-[11px] text-[var(--muted-foreground)] truncate mt-0.5 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 flex-shrink-0" />
                      {user.jobTitle}{user.jobTitle && user.company ? ' at ' : ''}{user.company}
                    </p>
                  )}
                </div>

                {/* Relationship badge */}
                {relationshipBadge && (
                  <span className={`relative flex-shrink-0 px-2 py-0.5 ${relationshipBadge.bg} text-white text-[9px] font-black rounded-full shadow-sm`}>
                    {relationshipBadge.pulse && (
                      <motion.span
                        className={`absolute inset-0 rounded-full ${relationshipBadge.bg}`}
                        animate={{ opacity: [0.4, 0], scale: [1, 1.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className="relative">{relationshipBadge.label}</span>
                  </span>
                )}
              </div>

              {/* Location */}
              {user.location && (
                <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] text-[var(--muted-foreground)]">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-[11px] sm:text-xs text-[var(--muted-foreground)] line-clamp-2 mb-3 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-colors duration-300"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${accent} 12%, var(--background))`,
                    color: accent,
                  }}
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-[9px] sm:text-[10px] font-bold">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Match score (for suggestions) */}
          {user.matchScore !== undefined && user.matchScore > 0 && (
            <div className="flex items-center gap-2 mb-3 px-2.5 py-1.5 rounded-lg bg-[color-mix(in_srgb,var(--accent)_8%,var(--background))]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[10px] font-bold text-[var(--accent)]">
                {Math.round(user.matchScore)}% match
              </span>
              {user.matchReasons && user.matchReasons.length > 0 && (
                <span className="text-[9px] text-[var(--muted-foreground)] truncate">
                  {user.matchReasons[0]}
                </span>
              )}
            </div>
          )}

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-1 p-2.5 rounded-xl mb-3 transition-colors duration-300"
            style={{
              backgroundColor: ambiance.cosmic
                ? 'rgba(255,255,255,0.04)'
                : 'color-mix(in srgb, var(--muted) 60%, var(--background))',
            }}
          >
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-[var(--primary)]">
                {user._count?.followers ?? 0}
              </p>
              <p className="text-[8px] sm:text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-[var(--accent)]">
                {user._count?.projectMemberships ?? 0}
              </p>
              <p className="text-[8px] sm:text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                Projects
              </p>
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-black" style={{ color: accent }}>
                {stockScore}
              </p>
              <p className="text-[8px] sm:text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                Stock
              </p>
            </div>
          </div>

          {/* Guardian archetype badge */}
          <div
            className={`flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r ${archetype.bgGradient} mb-3 transition-all duration-300`}
            style={{
              borderLeft: `3px solid ${accent}`,
            }}
          >
            <ArchetypeIcon className={`w-4 h-4 ${archetype.accentColor}`} />
            <div className="flex items-baseline gap-1.5">
              <span className={`text-[11px] font-black ${archetype.accentColor}`}>
                {archetype.name}
              </span>
              <span className="text-[9px] text-[var(--muted-foreground)]">
                {archetype.title}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          {showActions && (
            <div className="flex gap-2">
              {onFollow && (
                <Button
                  onClick={() => onFollow(user.id)}
                  disabled={isLoadingFollow || !isLoggedIn}
                  variant={isFollowing ? 'outline' : 'primary'}
                  size="sm"
                  className="flex-1 text-xs font-bold h-8"
                >
                  {isLoadingFollow ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : isFollowing ? (
                    <>
                      <UserCheck className="w-3 h-3 mr-1" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3 mr-1" />
                      Follow
                    </>
                  )}
                </Button>
              )}
              {onMessage && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!isLoggedIn}
                  onClick={() => onMessage(user.id)}
                  className="h-8 px-3"
                  title="Send Message"
                >
                  <MessageCircle className="w-3 h-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// SKELETON CARD
// ============================================

export function ConstellationCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-2xl overflow-hidden border border-[var(--border)]"
      style={{
        background: 'var(--card)',
      }}
    >
      <div className="h-1 bg-[var(--muted)] animate-pulse" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[var(--muted)] animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[var(--muted)] rounded-lg animate-pulse w-2/3" />
            <div className="h-3 bg-[var(--muted)] rounded-lg animate-pulse w-1/2" />
            <div className="h-3 bg-[var(--muted)] rounded-lg animate-pulse w-1/3" />
          </div>
        </div>
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-16 bg-[var(--muted)] rounded-full animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 p-2.5 rounded-xl bg-[var(--muted)] animate-pulse h-14" />
        <div className="h-10 bg-[var(--muted)] rounded-lg animate-pulse" />
        <div className="flex gap-2">
          <div className="flex-1 h-8 bg-[var(--muted)] rounded-lg animate-pulse" />
          <div className="w-10 h-8 bg-[var(--muted)] rounded-lg animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}
