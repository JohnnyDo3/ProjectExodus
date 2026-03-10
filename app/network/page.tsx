'use client'

// ============================================
// THE FISHBOWL
// "We are all fish in the same bowl —
//  swimming together, shimmering together,
//  connected by the water we share."
// ============================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName } from '@/components/fishbowl/FishSpecies'
import Link from 'next/link'
import toast from 'react-hot-toast'
import '@/components/fishbowl/fishbowl.css'
import {
  Users,
  Search,
  UserPlus,
  UserCheck,
  Sparkles,
  Activity,
  ChevronRight,
  ChevronLeft,
  Filter,
  X,
  MapPin,
  Briefcase,
  Heart,
  Globe,
  Compass,
  ArrowRight,
  Clock,
  Check,
  Loader2,
  Fish,
  BookOpen,
  MessageCircle,
  Info,
  Eye,
  EyeOff,
} from 'lucide-react'

// ============================================
// TYPES
// ============================================

type PrimaryView = 'fishbowl' | 'directory'
type NetworkTab = 'all' | 'following' | 'followers' | 'mutual' | 'suggestions' | 'pending'

interface PendingRequest {
  id: string
  requester: NetworkCardUser
  message: string | null
  createdAt: string
}

interface NetworkStats {
  following: number
  followers: number
  mutual: number
  suggestions: number
  pending: number
}

interface FishbowlUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
}

export interface NetworkCardUser {
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

// ============================================
// AQUATIC USER CARD
// ============================================

function AquaticUserCard({
  user,
  isFollowing = false,
  isFollowingMe = false,
  isLoadingFollow = false,
  onFollow,
  onMessage,
  isLoggedIn = false,
  index = 0,
}: {
  user: NetworkCardUser
  isFollowing?: boolean
  isFollowingMe?: boolean
  isLoadingFollow?: boolean
  onFollow?: (userId: string) => void
  onMessage?: (userId: string) => void
  isLoggedIn?: boolean
  index?: number
}) {
  const stockScore = useMemo(() => {
    if (!user._count) return 0
    return (
      ((user._count.createdProjects || 0) * 10) +
      ((user._count.articles || 0) * 5) +
      ((user._count.followers || 0) * 1) +
      ((user._count.projectMemberships || 0) * 2)
    )
  }, [user._count])

  const tier = getTierFromScore(stockScore)
  const tierName = getTierName(tier)

  const relationshipBadge = useMemo(() => {
    if (isFollowing && isFollowingMe) {
      return { label: 'MUTUAL', bg: 'bg-gradient-to-r from-teal-500 to-cyan-400' }
    }
    if (isFollowing) {
      return { label: 'FOLLOWING', bg: 'bg-gradient-to-r from-cyan-500 to-blue-500' }
    }
    if (isFollowingMe) {
      return { label: 'FOLLOWS YOU', bg: 'bg-gradient-to-r from-purple-500 to-violet-500' }
    }
    return null
  }, [isFollowing, isFollowingMe])

  const tags = user.interests?.length ? user.interests : user.expertise || []

  return (
    <motion.div
      layout
      layoutId={`aquatic-${user.id}`}
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
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.25), transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-cyan-800/30 transition-all duration-500"
        style={{
          background: 'rgba(10, 22, 40, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Tier gradient accent bar */}
        <div className="h-1 relative overflow-hidden"
          style={{
            background: `linear-gradient(to right, ${
              tier >= 4 ? '#8b5cf6, #3b82f6' :
              tier >= 2 ? '#f59e0b, #10b981' :
              '#06b6d4, #0ea5e9'
            })`,
          }}
        />

        <div className="p-4 sm:p-5 relative">
          {/* Top row: Fish + Avatar + Info */}
          <div className="flex items-start gap-3 sm:gap-4 mb-3">
            {/* Avatar with fish badge */}
            <Link href={`/profile/${user.id}`} className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl p-[2px]"
                style={{
                  background: `linear-gradient(135deg, ${
                    tier >= 4 ? '#8b5cf6, #3b82f6' :
                    tier >= 2 ? '#f59e0b, #10b981' :
                    '#06b6d4, #0ea5e9'
                  })`,
                  boxShadow: `0 0 16px rgba(34,211,238,0.3)`,
                }}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="w-full h-full rounded-[10px] object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-[10px] bg-[#0A1628] flex items-center justify-center">
                    <span className="text-xl font-black text-cyan-400">
                      {(user.name?.[0] || user.email[0]).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* Fish species badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center">
                  <FishSVG tier={tier} size={22} />
                </div>
              </motion.div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link href={`/profile/${user.id}`}>
                    <h3 className="text-sm sm:text-base font-black text-cyan-100 truncate hover:text-cyan-300 transition-colors">
                      {user.name || 'Anonymous'}
                    </h3>
                  </Link>
                  {user.headline && (
                    <p className="text-[11px] sm:text-xs text-cyan-400/70 truncate mt-0.5">
                      {user.headline}
                    </p>
                  )}
                  {(user.jobTitle || user.company) && (
                    <p className="text-[10px] sm:text-[11px] text-cyan-500/60 truncate mt-0.5 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 flex-shrink-0" />
                      {user.jobTitle}{user.jobTitle && user.company ? ' at ' : ''}{user.company}
                    </p>
                  )}
                </div>
                {relationshipBadge && (
                  <span className={`flex-shrink-0 px-2 py-0.5 ${relationshipBadge.bg} text-white text-[9px] font-black rounded-full shadow-sm`}>
                    {relationshipBadge.label}
                  </span>
                )}
              </div>
              {user.location && (
                <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] text-cyan-500/60">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-[11px] sm:text-xs text-cyan-300/60 line-clamp-2 mb-3 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-cyan-900/40 text-cyan-300 border border-cyan-800/30"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-900/20 text-cyan-500/70 text-[9px] sm:text-[10px] font-bold">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Match score (for suggestions) */}
          {user.matchScore !== undefined && user.matchScore > 0 && (
            <div className="flex items-center gap-2 mb-3 px-2.5 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-300">
                {Math.round(user.matchScore)}% match
              </span>
              {user.matchReasons && user.matchReasons.length > 0 && (
                <span className="text-[9px] text-cyan-500/70 truncate">
                  {user.matchReasons[0]}
                </span>
              )}
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-1 p-2.5 rounded-xl mb-3 bg-cyan-900/20 border border-cyan-800/20">
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-cyan-300">
                {user._count?.followers ?? 0}
              </p>
              <p className="text-[8px] sm:text-[9px] font-bold text-cyan-600 uppercase tracking-wider">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-teal-300">
                {user._count?.projectMemberships ?? 0}
              </p>
              <p className="text-[8px] sm:text-[9px] font-bold text-cyan-600 uppercase tracking-wider">
                Projects
              </p>
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-blue-300">
                {stockScore}
              </p>
              <p className="text-[8px] sm:text-[9px] font-bold text-cyan-600 uppercase tracking-wider">
                Stock
              </p>
            </div>
          </div>

          {/* Fish tier badge */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-900/25 border-l-3 border-cyan-500/50 mb-3"
            style={{ borderLeft: '3px solid rgba(34,211,238,0.4)' }}
          >
            <FishSVG tier={tier} size={18} />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[11px] font-black text-cyan-300">
                {tierName.toUpperCase()}
              </span>
              <span className="text-[9px] text-cyan-500/70">
                Tier {tier + 1}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {onFollow && (
              <button
                onClick={() => onFollow(user.id)}
                disabled={isLoadingFollow || !isLoggedIn}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isFollowing
                    ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-700/40 hover:border-cyan-600/60'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/30'
                } disabled:opacity-50`}
              >
                {isLoadingFollow ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : isFollowing ? (
                  <>
                    <UserCheck className="w-3 h-3" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3" />
                    Follow
                  </>
                )}
              </button>
            )}
            {onMessage && (
              <button
                disabled={!isLoggedIn}
                onClick={() => onMessage(user.id)}
                className="px-3 py-2 rounded-xl bg-cyan-900/30 text-cyan-300 border border-cyan-700/40 hover:border-cyan-600/60 transition-all duration-300 disabled:opacity-50"
                title="Send Message"
              >
                <MessageCircle className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// SKELETON CARD
// ============================================

function AquaticCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-2xl overflow-hidden border border-cyan-800/20"
      style={{ background: 'rgba(10, 22, 40, 0.75)' }}
    >
      <div className="h-1 bg-cyan-900/40 animate-pulse" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-cyan-900/40 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-cyan-900/40 rounded-lg animate-pulse w-2/3" />
            <div className="h-3 bg-cyan-900/30 rounded-lg animate-pulse w-1/2" />
            <div className="h-3 bg-cyan-900/20 rounded-lg animate-pulse w-1/3" />
          </div>
        </div>
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-16 bg-cyan-900/30 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 p-2.5 rounded-xl bg-cyan-900/20 animate-pulse h-14" />
        <div className="h-10 bg-cyan-900/20 rounded-lg animate-pulse" />
        <div className="flex gap-2">
          <div className="flex-1 h-9 bg-cyan-900/30 rounded-xl animate-pulse" />
          <div className="w-10 h-9 bg-cyan-900/30 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// NETWORK TAB BAR
// ============================================

function NetworkTabBar({
  active,
  onChange,
  stats,
}: {
  active: NetworkTab
  onChange: (tab: NetworkTab) => void
  stats: NetworkStats
}) {
  const tabs: { id: NetworkTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'all', label: 'All', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'following', label: 'Following', icon: <UserCheck className="w-3.5 h-3.5" />, count: stats.following },
    { id: 'followers', label: 'Followers', icon: <Heart className="w-3.5 h-3.5" />, count: stats.followers },
    { id: 'mutual', label: 'Mutual', icon: <Activity className="w-3.5 h-3.5" />, count: stats.mutual },
    { id: 'suggestions', label: 'Discover', icon: <Compass className="w-3.5 h-3.5" />, count: stats.suggestions },
    { id: 'pending', label: 'Pending', icon: <Clock className="w-3.5 h-3.5" />, count: stats.pending },
  ]

  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
            active === tab.id
              ? 'text-cyan-300 bg-cyan-900/40 border border-cyan-700/40'
              : 'text-cyan-500/70 hover:text-cyan-300 hover:bg-cyan-900/20'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && tab.count > 0 && (
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${
                active === tab.id
                  ? 'bg-cyan-500 text-[#0A1628]'
                  : 'bg-cyan-900/40 text-cyan-500'
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ============================================
// VIEW TOGGLE
// ============================================

function ViewToggle({
  active,
  onChange,
}: {
  active: PrimaryView
  onChange: (view: PrimaryView) => void
}) {
  return (
    <div className="relative inline-flex rounded-full p-1 bg-cyan-900/40 border border-cyan-800/30">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600"
        layout
        layoutId="fishbowl-view-pill"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        animate={{
          left: active === 'fishbowl' ? '4px' : '50%',
          right: active === 'directory' ? '4px' : '50%',
        }}
      />
      <button
        onClick={() => onChange('fishbowl')}
        className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
          active === 'fishbowl' ? 'text-white' : 'text-cyan-500/70'
        }`}
      >
        <Fish className="w-4 h-4" />
        My Network
      </button>
      <button
        onClick={() => onChange('directory')}
        className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
          active === 'directory' ? 'text-white' : 'text-cyan-500/70'
        }`}
      >
        <Globe className="w-4 h-4" />
        Directory
      </button>
    </div>
  )
}

// ============================================
// STAT BUBBLE
// ============================================

function StatBubble({
  label,
  value,
  icon,
  delay,
}: {
  label: string
  value: number
  icon: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent)',
          filter: 'blur(12px)',
        }}
      />
      <div className="relative flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-cyan-800/30 bg-cyan-900/20 backdrop-blur-sm transition-all duration-300 hover:bg-cyan-900/30 hover:border-cyan-700/40">
        <div className="text-cyan-400 mb-0.5">{icon}</div>
        <span className="text-2xl sm:text-3xl font-black text-cyan-100">{value}</span>
        <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">{label}</span>
      </div>
    </motion.div>
  )
}

// ============================================
// PENDING REQUEST CARD
// ============================================

function PendingRequestCard({
  request,
  onAccept,
  onReject,
  isProcessing,
  index,
}: {
  request: PendingRequest
  onAccept: (id: string) => void
  onReject: (id: string) => void
  isProcessing: boolean
  index: number
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.06 }}
      className="relative rounded-2xl overflow-hidden border border-cyan-800/30 p-4 sm:p-5"
      style={{
        background: 'rgba(10, 22, 40, 0.75)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex items-start gap-3">
        <Link href={`/profile/${request.requester.id}`} className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 p-[2px]">
            {request.requester.image ? (
              <img src={request.requester.image} alt={request.requester.name || ''} className="w-full h-full rounded-[10px] object-cover" />
            ) : (
              <div className="w-full h-full rounded-[10px] bg-[#0A1628] flex items-center justify-center">
                <span className="text-lg font-black text-cyan-400">
                  {(request.requester.name?.[0] || '?').toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/profile/${request.requester.id}`}>
            <h4 className="text-sm font-black text-cyan-100 truncate hover:text-cyan-300 transition-colors">
              {request.requester.name || 'Anonymous'}
            </h4>
          </Link>
          {request.requester.headline && (
            <p className="text-[11px] text-cyan-500/70 truncate">{request.requester.headline}</p>
          )}
          {request.message && (
            <p className="text-xs text-cyan-400/60 mt-2 italic line-clamp-2">
              &ldquo;{request.message}&rdquo;
            </p>
          )}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onAccept(request.id)}
              disabled={isProcessing}
              className="flex items-center gap-1 text-xs font-bold h-7 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              <Check className="w-3 h-3" />
              Accept
            </button>
            <button
              onClick={() => onReject(request.id)}
              disabled={isProcessing}
              className="flex items-center gap-1 text-xs font-bold h-7 px-3 rounded-lg bg-cyan-900/30 text-cyan-300 border border-cyan-700/40 hover:border-cyan-600/60 transition-all disabled:opacity-50"
            >
              <X className="w-3 h-3" />
              Decline
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// EMPTY STATE
// ============================================

function EmptyState({
  icon,
  title,
  message,
  action,
}: {
  icon: React.ReactNode
  title: string
  message: string
  action?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-cyan-500/50 bg-cyan-900/20 border border-cyan-800/20">
        {icon}
      </div>
      <h3 className="text-lg font-black text-cyan-100 mb-1">{title}</h3>
      <p className="text-sm text-cyan-500/70 font-medium max-w-sm">{message}</p>
      {action}
    </motion.div>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function NetworkPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Primary view
  const initialView = (searchParams.get('view') as PrimaryView) || 'fishbowl'
  const [primaryView, setPrimaryView] = useState<PrimaryView>(initialView)
  const [networkTab, setNetworkTab] = useState<NetworkTab>('all')

  // Fishbowl data
  const [fishbowlUsers, setFishbowlUsers] = useState<FishbowlUser[]>([])
  const [showFishbowl, setShowFishbowl] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  // Network data states
  const [allUsers, setAllUsers] = useState<NetworkCardUser[]>([])
  const [followingUsers, setFollowingUsers] = useState<NetworkCardUser[]>([])
  const [followerUsers, setFollowerUsers] = useState<NetworkCardUser[]>([])
  const [suggestions, setSuggestions] = useState<NetworkCardUser[]>([])
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([])
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())
  const [followerIds, setFollowerIds] = useState<Set<string>>(new Set())

  // Directory states
  const [directoryUsers, setDirectoryUsers] = useState<NetworkCardUser[]>([])
  const [directoryTotal, setDirectoryTotal] = useState(0)
  const [directoryPage, setDirectoryPage] = useState(1)
  const [directoryTotalPages, setDirectoryTotalPages] = useState(1)

  // UI states
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDirectoryLoading, setIsDirectoryLoading] = useState(false)
  const [loadingFollowId, setLoadingFollowId] = useState<string | null>(null)
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [locationFilter, setLocationFilter] = useState('')
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [interestsFilter, setInterestsFilter] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'alphabetical'>('newest')

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Stats
  const stats: NetworkStats = useMemo(() => ({
    following: followingUsers.length,
    followers: followerUsers.length,
    mutual: followingUsers.filter(u => followerIds.has(u.id)).length,
    suggestions: suggestions.length,
    pending: pendingRequests.length,
  }), [followingUsers, followerUsers, followerIds, suggestions, pendingRequests])

  // Current user fish info
  const currentFishUser = useMemo(() => {
    return fishbowlUsers.find(u => u.id === session?.user?.id)
  }, [fishbowlUsers, session?.user?.id])

  const currentTier = currentFishUser ? getTierFromScore(currentFishUser.stockScore) : 0
  const currentTierName = currentFishUser ? getTierName(currentTier) : 'Guppy'

  // ============================================
  // DATA FETCHING
  // ============================================

  const fetchFishbowlData = useCallback(async () => {
    try {
      const res = await fetch('/api/fishbowl')
      const data = await res.json()
      if (data.success) {
        setFishbowlUsers(data.data)
      }
    } catch (error) {
      console.error('Error fetching fishbowl data:', error)
    }
  }, [])

  const fetchNetworkData = useCallback(async () => {
    if (!session?.user?.id) return
    setIsLoading(true)

    try {
      const [followingRes, followersRes, suggestionsRes, pendingRes] = await Promise.all([
        fetch('/api/users/following'),
        fetch('/api/users/followers'),
        fetch('/api/network/suggestions'),
        fetch('/api/connections/requests'),
      ])

      const [followingData, followersData, suggestionsData, pendingData] = await Promise.all([
        followingRes.json(),
        followersRes.json(),
        suggestionsRes.json(),
        pendingRes.json(),
      ])

      if (followingData.success) {
        const users = followingData.data || followingData.following || []
        setFollowingUsers(users)
        setFollowingIds(new Set(users.map((u: NetworkCardUser) => u.id)))
      }

      if (followersData.success) {
        const users = followersData.data || followersData.followers || []
        setFollowerUsers(users)
        setFollowerIds(new Set(users.map((u: NetworkCardUser) => u.id)))
      }

      if (suggestionsData.success) {
        const sugData = suggestionsData.data?.suggestions || suggestionsData.data || []
        setSuggestions(Array.isArray(sugData) ? sugData : [])
      }

      if (pendingData.success) {
        const rawRequests = pendingData.data?.requests || pendingData.data || []
        const requests = (Array.isArray(rawRequests) ? rawRequests : []).map((r: any) => ({
          id: r.id,
          requester: r.user || r.requester || { id: r.userId, name: null, email: '', image: null, headline: null, bio: null, location: null, guardianArchetype: null, interests: [] },
          message: r.message || null,
          createdAt: r.createdAt,
        }))
        setPendingRequests(requests)
      }

      // Combine all unique users for the "all" tab
      const allMap = new Map<string, NetworkCardUser>()
      const addUsers = (users: NetworkCardUser[]) => {
        users.forEach(u => {
          if (!allMap.has(u.id) && u.id !== session.user?.id) {
            allMap.set(u.id, u)
          }
        })
      }
      if (followingData.success) addUsers(followingData.data || followingData.following || [])
      if (followersData.success) addUsers(followersData.data || followersData.followers || [])
      if (suggestionsData.success) addUsers(suggestionsData.data || suggestionsData.suggestions || [])

      setAllUsers(Array.from(allMap.values()))
    } catch (error) {
      console.error('Error fetching network data:', error)
      toast.error('Failed to load network data')
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  const fetchDirectoryUsers = useCallback(async () => {
    setIsDirectoryLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        location: locationFilter,
        page: directoryPage.toString(),
        limit: '18',
      })

      if (skillsFilter.length > 0) {
        params.append('skills', skillsFilter.join(','))
      }
      if (interestsFilter.length > 0) {
        params.append('interests', interestsFilter.join(','))
      }

      const res = await fetch(`/api/users/search?${params}`)
      const data = await res.json()

      if (data.success) {
        setDirectoryUsers(data.data.users.map((u: any) => ({
          ...u,
          bio: u.bio || null,
          headline: u.headline || null,
          location: u.location || null,
          interests: u.interests || [],
          expertise: u.expertise || [],
          guardianArchetype: u.guardianArchetype || null,
          _count: u._count || { followers: 0 },
        })))
        setDirectoryTotalPages(data.data.pagination.totalPages)
        setDirectoryTotal(data.data.pagination.total)
      }
    } catch (error) {
      console.error('Error fetching directory:', error)
    } finally {
      setIsDirectoryLoading(false)
    }
  }, [searchQuery, locationFilter, skillsFilter, interestsFilter, directoryPage])

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    if (session?.user?.id) {
      fetchNetworkData()
      fetchFishbowlData()
    }
  }, [session?.user?.id, fetchNetworkData, fetchFishbowlData])

  useEffect(() => {
    if (primaryView === 'directory') {
      fetchDirectoryUsers()
    }
  }, [primaryView, fetchDirectoryUsers])

  // Debounced search for directory
  useEffect(() => {
    if (primaryView !== 'directory') return
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => {
      setDirectoryPage(1)
      fetchDirectoryUsers()
    }, 400)
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [searchQuery, locationFilter, skillsFilter, interestsFilter])

  // ============================================
  // HANDLERS
  // ============================================

  const handleFollow = async (userId: string) => {
    if (!session?.user?.id) {
      toast.error('Please sign in to follow users')
      return
    }

    setLoadingFollowId(userId)
    const wasFollowing = followingIds.has(userId)

    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: wasFollowing ? 'DELETE' : 'POST',
      })

      if (res.ok) {
        const newIds = new Set(followingIds)
        if (wasFollowing) {
          newIds.delete(userId)
          setFollowingUsers(prev => prev.filter(u => u.id !== userId))
          toast.success('Unfollowed')
        } else {
          newIds.add(userId)
          const user = allUsers.find(u => u.id === userId) || suggestions.find(u => u.id === userId) || directoryUsers.find(u => u.id === userId)
          if (user) {
            setFollowingUsers(prev => [...prev, user])
          }
          toast.success('Following!')
        }
        setFollowingIds(newIds)
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoadingFollowId(null)
    }
  }

  const handleMessage = (userId: string) => {
    router.push(`/messages?to=${userId}`)
  }

  const handleAcceptRequest = async (requestId: string) => {
    setProcessingRequestId(requestId)
    try {
      const res = await fetch(`/api/connections/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      })
      if (res.ok) {
        setPendingRequests(prev => prev.filter(r => r.id !== requestId))
        toast.success('Connection accepted!')
        fetchNetworkData()
      }
    } catch {
      toast.error('Failed to accept')
    } finally {
      setProcessingRequestId(null)
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    setProcessingRequestId(requestId)
    try {
      const res = await fetch(`/api/connections/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject' }),
      })
      if (res.ok) {
        setPendingRequests(prev => prev.filter(r => r.id !== requestId))
        toast.success('Request declined')
      }
    } catch {
      toast.error('Failed to decline')
    } finally {
      setProcessingRequestId(null)
    }
  }

  const handleViewChange = (view: PrimaryView) => {
    setPrimaryView(view)
    router.replace(`/network?view=${view}`, { scroll: false })
  }

  // ============================================
  // FILTER HELPERS
  // ============================================

  const addSkillFilter = () => {
    if (newSkill.trim() && !skillsFilter.includes(newSkill.trim())) {
      setSkillsFilter(prev => [...prev, newSkill.trim()])
      setNewSkill('')
      setDirectoryPage(1)
    }
  }

  const addInterestFilter = () => {
    if (newInterest.trim() && !interestsFilter.includes(newInterest.trim())) {
      setInterestsFilter(prev => [...prev, newInterest.trim()])
      setNewInterest('')
      setDirectoryPage(1)
    }
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setLocationFilter('')
    setSkillsFilter([])
    setInterestsFilter([])
    setDirectoryPage(1)
  }

  const hasActiveFilters = searchQuery || locationFilter || skillsFilter.length > 0 || interestsFilter.length > 0

  // ============================================
  // FILTERED + SORTED USERS (Network View)
  // ============================================

  const getNetworkUsers = useCallback((): NetworkCardUser[] => {
    let users: NetworkCardUser[] = []

    switch (networkTab) {
      case 'following':
        users = followingUsers
        break
      case 'followers':
        users = followerUsers
        break
      case 'mutual':
        users = followingUsers.filter(u => followerIds.has(u.id))
        break
      case 'suggestions':
        users = suggestions
        break
      case 'all':
      default:
        users = allUsers
        break
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      users = users.filter(u =>
        u.name?.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.headline?.toLowerCase().includes(q) ||
        u.location?.toLowerCase().includes(q) ||
        u.interests?.some(i => i.toLowerCase().includes(q)) ||
        u.expertise?.some(e => e.toLowerCase().includes(q))
      )
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        users = [...users].sort((a, b) => (b._count?.followers ?? 0) - (a._count?.followers ?? 0))
        break
      case 'alphabetical':
        users = [...users].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        break
      default:
        break
    }

    return users
  }, [networkTab, followingUsers, followerUsers, followerIds, suggestions, allUsers, searchQuery, sortBy])

  const networkUsers = useMemo(() => getNetworkUsers(), [getNetworkUsers])

  // ============================================
  // LOADING STATE
  // ============================================

  if (status === 'loading') {
    return (
      <div className="h-full flex items-center justify-center bg-[#0A1628]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-cyan-400">Filling the fishbowl...</p>
        </motion.div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0A1628]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md px-6"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Fish className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-cyan-100">
            Join the Fishbowl
          </h2>
          <p className="text-cyan-400/80 font-medium">
            Sign in to swim with your community
          </p>
          <Link href="/auth/signin">
            <button className="font-bold text-base px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all">
              Sign In
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-full bg-[#0A1628]">
      {/* ============================================ */}
      {/* FISHBOWL HEADER */}
      {/* ============================================ */}
      <div className="bg-gradient-to-r from-[#0D2137]/95 via-[#123855]/95 to-[#0D2137]/95 backdrop-blur-sm border-b-2 border-cyan-800/50">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/50 flex items-center justify-center border border-cyan-700/50">
                <Fish className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-black text-cyan-100">THE FISHBOWL</h1>
                <p className="text-xs font-medium text-cyan-500/80">
                  Community aquarium · Every member is a fish
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Your fish info */}
              {currentFishUser && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                  <FishSVG tier={currentTier} size={24} />
                  <div>
                    <p className="text-[10px] text-cyan-500 font-medium">YOUR FISH</p>
                    <p className="text-xs font-bold text-cyan-200">{currentTierName} · {currentFishUser.stockScore} STOCK</p>
                  </div>
                </div>
              )}
              {/* Stats */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                <Users className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-bold text-cyan-300">{fishbowlUsers.length}</span>
              </div>
              {/* Toggle fishbowl visibility */}
              <button
                onClick={() => setShowFishbowl(!showFishbowl)}
                className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-800/40 hover:border-cyan-600/60 transition-colors"
                title={showFishbowl ? 'Hide aquarium' : 'Show aquarium'}
              >
                {showFishbowl ? (
                  <EyeOff className="w-4 h-4 text-cyan-500" />
                ) : (
                  <Eye className="w-4 h-4 text-cyan-500" />
                )}
              </button>
              {/* Info toggle */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-800/40 hover:border-cyan-600/60 transition-colors"
              >
                <Info className="w-4 h-4 text-cyan-500" />
              </button>
            </div>
          </div>

          {/* Info panel */}
          {showInfo && (
            <div className="mt-3 p-3 rounded-xl bg-[#0A1628]/80 border border-cyan-800/30 animate-in slide-in-from-top duration-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {([0, 1, 2, 3, 4, 5] as const).map(tier => (
                  <div key={tier} className="flex items-center gap-2 p-2 rounded-lg bg-cyan-900/20">
                    <FishSVG tier={tier} size={20} />
                    <div>
                      <p className="text-[9px] text-cyan-500 font-medium">{getTierName(tier)}</p>
                      <p className="text-[9px] text-cyan-600">
                        {tier === 0 && '0-9'}
                        {tier === 1 && '10-24'}
                        {tier === 2 && '25-49'}
                        {tier === 3 && '50-99'}
                        {tier === 4 && '100-199'}
                        {tier === 5 && '200+'}
                        {' STOCK'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-cyan-600 text-center">
                Hover over a fish to see who it is. Click to view profile, message, or connect.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* FISHBOWL AQUARIUM */}
      {/* ============================================ */}
      <AnimatePresence>
        {showFishbowl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="px-3 sm:px-4 pt-3 pb-3"
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden">
              <Fishbowl users={fishbowlUsers} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* NETWORK CONTENT (scrollable) */}
      {/* ============================================ */}
      <div>
        {/* Stats + View Toggle */}
        <section className="pt-6 pb-4">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
                <StatBubble
                  label="Following"
                  value={stats.following}
                  icon={<UserCheck className="w-5 h-5" />}
                  delay={0.1}
                />
                <StatBubble
                  label="Followers"
                  value={stats.followers}
                  icon={<Heart className="w-5 h-5" />}
                  delay={0.2}
                />
                <StatBubble
                  label="Mutual"
                  value={stats.mutual}
                  icon={<Activity className="w-5 h-5" />}
                  delay={0.3}
                />
                {stats.pending > 0 && (
                  <StatBubble
                    label="Pending"
                    value={stats.pending}
                    icon={<Clock className="w-5 h-5" />}
                    delay={0.4}
                  />
                )}
              </div>

              {/* View Toggle */}
              <div className="flex justify-center mb-4">
                <ViewToggle active={primaryView} onChange={handleViewChange} />
              </div>
            </div>
          </div>
        </section>

        {/* Controls Bar */}
        <section className="pb-4">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-4">
              {/* Network sub-tabs */}
              <AnimatePresence mode="wait">
                {primaryView === 'fishbowl' && (
                  <motion.div
                    key="network-tabs"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LayoutGroup>
                      <NetworkTabBar active={networkTab} onChange={setNetworkTab} stats={stats} />
                    </LayoutGroup>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search bar */}
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={primaryView === 'fishbowl' ? 'Search your network...' : 'Search all members...'}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 bg-cyan-900/20 border border-cyan-800/30 text-cyan-100 placeholder:text-cyan-600/50 focus:outline-none focus:border-cyan-600/60 backdrop-blur-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 hover:text-cyan-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {primaryView === 'directory' && (
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-cyan-900/20 border border-cyan-800/30 text-cyan-300 hover:border-cyan-600/60 transition-all"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 px-1.5 py-0.5 bg-cyan-500 text-[#0A1628] rounded-full text-[9px] font-black">
                        {[locationFilter, ...skillsFilter, ...interestsFilter].filter(Boolean).length}
                      </span>
                    )}
                  </button>
                )}

                {primaryView === 'fishbowl' && (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 rounded-xl text-xs font-bold border border-cyan-800/30 bg-cyan-900/20 text-cyan-300"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                )}
              </div>

              {/* Directory filters panel */}
              <AnimatePresence>
                {showFilters && primaryView === 'directory' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl border border-cyan-800/30 bg-cyan-900/20 backdrop-blur-sm">
                      {/* Location */}
                      <div>
                        <label className="flex items-center gap-1 text-xs font-bold text-cyan-300 mb-2">
                          <MapPin className="w-3 h-3" />
                          LOCATION
                        </label>
                        <input
                          type="text"
                          value={locationFilter}
                          onChange={(e) => { setLocationFilter(e.target.value); setDirectoryPage(1) }}
                          placeholder="e.g., San Francisco"
                          className="w-full px-3 py-2 rounded-lg bg-[#0A1628] border border-cyan-800/30 text-cyan-100 placeholder:text-cyan-700 focus:outline-none focus:border-cyan-600/60 transition-colors text-sm"
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="flex items-center gap-1 text-xs font-bold text-cyan-300 mb-2">
                          <Briefcase className="w-3 h-3" />
                          SKILLS
                        </label>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {skillsFilter.map((skill) => (
                            <span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-600 text-white text-[10px] font-bold">
                              {skill}
                              <button onClick={() => { setSkillsFilter(s => s.filter(x => x !== skill)); setDirectoryPage(1) }}>
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addSkillFilter()}
                            placeholder="Add skill"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A1628] border border-cyan-800/30 text-cyan-100 placeholder:text-cyan-700 focus:outline-none focus:border-cyan-600/60 text-xs"
                          />
                          <button onClick={addSkillFilter} className="text-xs h-7 px-2 rounded-lg bg-cyan-800/40 text-cyan-300 hover:bg-cyan-700/40 font-bold">+</button>
                        </div>
                      </div>

                      {/* Interests */}
                      <div>
                        <label className="flex items-center gap-1 text-xs font-bold text-cyan-300 mb-2">
                          <Sparkles className="w-3 h-3" />
                          INTERESTS
                        </label>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {interestsFilter.map((interest) => (
                            <span key={interest} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-cyan-500 text-cyan-300 text-[10px] font-bold">
                              {interest}
                              <button onClick={() => { setInterestsFilter(i => i.filter(x => x !== interest)); setDirectoryPage(1) }}>
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addInterestFilter()}
                            placeholder="Add interest"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A1628] border border-cyan-800/30 text-cyan-100 placeholder:text-cyan-700 focus:outline-none focus:border-cyan-600/60 text-xs"
                          />
                          <button onClick={addInterestFilter} className="text-xs h-7 px-2 rounded-lg bg-cyan-800/40 text-cyan-300 hover:bg-cyan-700/40 font-bold">+</button>
                        </div>
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={clearAllFilters}
                          className="text-xs font-bold text-cyan-500/70 hover:text-cyan-300 transition-colors"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {/* ============================================ */}
                {/* NETWORK VIEW */}
                {/* ============================================ */}
                {primaryView === 'fishbowl' && (
                  <motion.div
                    key="network-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {/* Pending requests tab */}
                    {networkTab === 'pending' ? (
                      <div>
                        {pendingRequests.length === 0 ? (
                          <EmptyState
                            icon={<Clock className="w-12 h-12" />}
                            title="No pending requests"
                            message="When someone sends you a connection request, it will appear here."
                          />
                        ) : (
                          <LayoutGroup>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              <AnimatePresence>
                                {pendingRequests.map((request, i) => (
                                  <PendingRequestCard
                                    key={request.id}
                                    request={request}
                                    onAccept={handleAcceptRequest}
                                    onReject={handleRejectRequest}
                                    isProcessing={processingRequestId === request.id}
                                    index={i}
                                  />
                                ))}
                              </AnimatePresence>
                            </div>
                          </LayoutGroup>
                        )}
                      </div>
                    ) : isLoading ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                          <AquaticCardSkeleton key={i} index={i} />
                        ))}
                      </div>
                    ) : networkUsers.length === 0 ? (
                      <EmptyState
                        icon={
                          networkTab === 'suggestions'
                            ? <Compass className="w-12 h-12" />
                            : <Fish className="w-12 h-12" />
                        }
                        title={
                          searchQuery
                            ? 'No fish found'
                            : networkTab === 'following'
                              ? 'Not following anyone yet'
                              : networkTab === 'followers'
                                ? 'No followers yet'
                                : networkTab === 'mutual'
                                  ? 'No mutual connections'
                                  : networkTab === 'suggestions'
                                    ? 'No suggestions right now'
                                    : 'Your fishbowl is empty'
                        }
                        message={
                          searchQuery
                            ? 'Try a different search term'
                            : 'Start discovering people in the Directory view!'
                        }
                        action={
                          !searchQuery && (
                            <button
                              onClick={() => handleViewChange('directory')}
                              className="font-bold mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center gap-2"
                            >
                              <Globe className="w-4 h-4" />
                              Browse Directory
                            </button>
                          )
                        }
                      />
                    ) : (
                      <LayoutGroup>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <AnimatePresence mode="popLayout">
                            {networkUsers.map((user, i) => (
                              <AquaticUserCard
                                key={user.id}
                                user={user}
                                isFollowing={followingIds.has(user.id)}
                                isFollowingMe={followerIds.has(user.id)}
                                isLoadingFollow={loadingFollowId === user.id}
                                onFollow={handleFollow}
                                onMessage={handleMessage}
                                isLoggedIn={!!session}
                                index={i}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      </LayoutGroup>
                    )}
                  </motion.div>
                )}

                {/* ============================================ */}
                {/* DIRECTORY VIEW */}
                {/* ============================================ */}
                {primaryView === 'directory' && (
                  <motion.div
                    key="directory-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {/* Results count */}
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-bold text-cyan-500/70">
                        {directoryTotal} member{directoryTotal !== 1 ? 's' : ''}
                        {hasActiveFilters && ' matching filters'}
                      </p>
                    </div>

                    {isDirectoryLoading ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(9)].map((_, i) => (
                          <AquaticCardSkeleton key={i} index={i} />
                        ))}
                      </div>
                    ) : directoryUsers.length === 0 ? (
                      <EmptyState
                        icon={<Fish className="w-12 h-12" />}
                        title={hasActiveFilters ? 'No fish found' : 'No members yet'}
                        message={hasActiveFilters ? 'Try adjusting your filters' : 'Be the first to join the fishbowl!'}
                        action={
                          hasActiveFilters && (
                            <button
                              onClick={clearAllFilters}
                              className="font-bold mt-3 px-4 py-2 rounded-xl bg-cyan-900/30 text-cyan-300 border border-cyan-700/40 text-sm hover:border-cyan-600/60 transition-all"
                            >
                              Clear Filters
                            </button>
                          )
                        }
                      />
                    ) : (
                      <>
                        <LayoutGroup>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence mode="popLayout">
                              {directoryUsers.map((user, i) => (
                                <AquaticUserCard
                                  key={user.id}
                                  user={user}
                                  isFollowing={followingIds.has(user.id)}
                                  isFollowingMe={followerIds.has(user.id)}
                                  isLoadingFollow={loadingFollowId === user.id}
                                  onFollow={handleFollow}
                                  onMessage={handleMessage}
                                  isLoggedIn={!!session}
                                  index={i}
                                />
                              ))}
                            </AnimatePresence>
                          </div>
                        </LayoutGroup>

                        {/* Pagination */}
                        {directoryTotalPages > 1 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-2 mt-10"
                          >
                            <button
                              onClick={() => setDirectoryPage(p => Math.max(1, p - 1))}
                              disabled={directoryPage === 1}
                              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-cyan-900/20 border border-cyan-800/30 text-cyan-300 hover:border-cyan-600/60 transition-all disabled:opacity-40"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              Prev
                            </button>

                            <div className="flex gap-1">
                              {generatePageNumbers(directoryPage, directoryTotalPages).map((page, i) => (
                                page === '...' ? (
                                  <span key={`dots-${i}`} className="px-2 py-1 text-xs text-cyan-600">
                                    ...
                                  </span>
                                ) : (
                                  <button
                                    key={page}
                                    onClick={() => setDirectoryPage(page as number)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-300 ${
                                      directoryPage === page
                                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/30'
                                        : 'text-cyan-500/70 hover:bg-cyan-900/30'
                                    }`}
                                  >
                                    {page}
                                  </button>
                                )
                              ))}
                            </div>

                            <button
                              onClick={() => setDirectoryPage(p => Math.min(directoryTotalPages, p + 1))}
                              disabled={directoryPage === directoryTotalPages}
                              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-cyan-900/20 border border-cyan-800/30 text-cyan-300 hover:border-cyan-600/60 transition-all disabled:opacity-40"
                            >
                              Next
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// ============================================
// HELPERS
// ============================================

function generatePageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | string)[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)

  return pages
}
