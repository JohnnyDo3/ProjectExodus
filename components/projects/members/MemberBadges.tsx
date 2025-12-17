'use client'

import { motion } from 'framer-motion'
import {
  Compass,
  Building2,
  GraduationCap,
  Heart,
  Search,
  Map,
  Shield,
  Sparkles,
  Star,
  Trophy
} from 'lucide-react'

export type RecognitionBadge =
  | 'PIONEER'
  | 'ARCHITECT'
  | 'SCHOLAR'
  | 'MENTOR'
  | 'RESEARCHER'
  | 'PATHFINDER'
  | 'STEWARD'
  | 'CATALYST'
  | 'RISING_STAR'
  | 'TOP_CONTRIBUTOR'

interface BadgeInfo {
  name: string
  description: string
  icon: typeof Compass
  color: string
  bgColor: string
}

const BADGE_INFO: Record<RecognitionBadge, BadgeInfo> = {
  PIONEER: {
    name: 'Pioneer',
    description: 'Early contributor to the project',
    icon: Compass,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  },
  ARCHITECT: {
    name: 'Architect',
    description: 'Significant structural contributions',
    icon: Building2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  SCHOLAR: {
    name: 'Scholar',
    description: 'Completed all learning + actively contributing',
    icon: GraduationCap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  MENTOR: {
    name: 'Mentor',
    description: 'Helping others learn',
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10'
  },
  RESEARCHER: {
    name: 'Researcher',
    description: 'Active in research sections',
    icon: Search,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10'
  },
  PATHFINDER: {
    name: 'Pathfinder',
    description: 'Finding and sharing new resources',
    icon: Map,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  STEWARD: {
    name: 'Steward',
    description: 'Long-term consistent contributor',
    icon: Shield,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  },
  CATALYST: {
    name: 'Catalyst',
    description: 'Sparking productive discussions',
    icon: Sparkles,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  RISING_STAR: {
    name: 'Rising Star',
    description: 'Learning the process, showing growth',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  TOP_CONTRIBUTOR: {
    name: 'Top Contributor',
    description: 'Highest contribution score',
    icon: Trophy,
    color: 'text-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20'
  }
}

interface MemberBadgesProps {
  badges: RecognitionBadge[]
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  maxDisplay?: number
  className?: string
}

export function MemberBadges({
  badges,
  size = 'md',
  showLabels = false,
  maxDisplay = 5,
  className = ''
}: MemberBadgesProps) {
  const displayBadges = badges.slice(0, maxDisplay)
  const remaining = badges.length - maxDisplay

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayBadges.map((badge, index) => {
        const info = BADGE_INFO[badge]
        const Icon = info.icon

        return (
          <motion.div
            key={badge}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div
              className={`${sizeClasses[size]} rounded-full ${info.bgColor} ${info.color} flex items-center justify-center`}
              title={info.name}
            >
              <Icon className={iconSizes[size]} />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg px-3 py-2 whitespace-nowrap">
                <p className="font-medium text-sm">{info.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{info.description}</p>
              </div>
            </div>

            {showLabels && (
              <span className="text-xs text-[var(--muted-foreground)] mt-1 block text-center">
                {info.name}
              </span>
            )}
          </motion.div>
        )
      })}

      {remaining > 0 && (
        <div
          className={`${sizeClasses[size]} rounded-full bg-[var(--muted)] flex items-center justify-center text-xs font-medium`}
          title={`${remaining} more badge${remaining > 1 ? 's' : ''}`}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

interface BadgeGridProps {
  badges: RecognitionBadge[]
  earnedBadges?: RecognitionBadge[]
  onBadgeClick?: (badge: RecognitionBadge) => void
  className?: string
}

export function BadgeGrid({
  badges = Object.keys(BADGE_INFO) as RecognitionBadge[],
  earnedBadges = [],
  onBadgeClick,
  className = ''
}: BadgeGridProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ${className}`}>
      {badges.map((badge) => {
        const info = BADGE_INFO[badge]
        const Icon = info.icon
        const isEarned = earnedBadges.includes(badge)

        return (
          <motion.button
            key={badge}
            onClick={() => onBadgeClick?.(badge)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl border transition-colors text-center ${
              isEarned
                ? `${info.bgColor} border-current ${info.color}`
                : 'bg-[var(--muted)]/50 border-[var(--border)] opacity-50'
            }`}
          >
            <div className={`w-12 h-12 mx-auto rounded-full ${info.bgColor} ${info.color} flex items-center justify-center mb-2`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="font-medium text-sm">{info.name}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">
              {info.description}
            </p>
            {isEarned && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                Earned
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

// Single badge display component
interface SingleBadgeProps {
  badge: RecognitionBadge
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function SingleBadge({
  badge,
  size = 'md',
  showLabel = true,
  className = ''
}: SingleBadgeProps) {
  const info = BADGE_INFO[badge]
  const Icon = info.icon

  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-xs' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-sm' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-base' }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size].container} rounded-full ${info.bgColor} ${info.color} flex items-center justify-center`}>
        <Icon className={sizeClasses[size].icon} />
      </div>
      {showLabel && (
        <div>
          <p className={`font-medium ${sizeClasses[size].text}`}>{info.name}</p>
          <p className="text-xs text-[var(--muted-foreground)]">{info.description}</p>
        </div>
      )}
    </div>
  )
}

export { BADGE_INFO }
export default MemberBadges
