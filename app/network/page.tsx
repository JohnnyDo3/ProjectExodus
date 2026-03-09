'use client'

// ============================================
// THE CONSTELLATION
// "We are not separate stars scattered in void.
//  We are a constellation — each light connected
//  by invisible threads of shared purpose."
// ============================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ConstellationCard, ConstellationCardSkeleton, type ConstellationCardUser } from '@/components/network/ConstellationCard'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'
import Link from 'next/link'
import toast from 'react-hot-toast'
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
  Orbit,
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
  Network,
  BookOpen,
} from 'lucide-react'

// ============================================
// TYPES
// ============================================

type PrimaryView = 'network' | 'directory'
type NetworkTab = 'all' | 'following' | 'followers' | 'mutual' | 'suggestions' | 'pending'

interface PendingRequest {
  id: string
  requester: ConstellationCardUser
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

// ============================================
// AMBIENT ORB CONFIG
// ============================================

interface OrbConfig {
  size: number
  x: number
  y: number
  duration: number
  delay: number
  dx: number
  dy: number
}

const ORB_CONFIGS: OrbConfig[] = [
  { size: 300, x: 10, y: 15, duration: 25, delay: 0, dx: 40, dy: -30 },
  { size: 200, x: 70, y: 60, duration: 30, delay: 3, dx: -30, dy: 25 },
  { size: 250, x: 85, y: 20, duration: 28, delay: 5, dx: -20, dy: 40 },
  { size: 180, x: 30, y: 75, duration: 22, delay: 8, dx: 35, dy: -20 },
  { size: 350, x: 50, y: 40, duration: 35, delay: 2, dx: -25, dy: -35 },
  { size: 150, x: 15, y: 50, duration: 20, delay: 10, dx: 25, dy: 30 },
  { size: 220, x: 60, y: 85, duration: 26, delay: 6, dx: -35, dy: -25 },
  { size: 280, x: 40, y: 10, duration: 32, delay: 4, dx: 30, dy: 35 },
]

// ============================================
// AMBIENT ORBS COMPONENT
// ============================================

function AmbientOrbs() {
  const { phase, twilightProgress } = useTimeTheme()

  const orbColors = useMemo(() => {
    const isNight = twilightProgress > 0.65
    const isTwilight = twilightProgress > 0.3 && twilightProgress <= 0.65

    if (isNight) {
      return {
        primary: 'rgba(110, 181, 255, 0.06)',
        secondary: 'rgba(212, 160, 255, 0.05)',
        tertiary: 'rgba(127, 219, 202, 0.04)',
      }
    }
    if (isTwilight) {
      return {
        primary: 'rgba(232, 160, 93, 0.08)',
        secondary: 'rgba(194, 79, 49, 0.06)',
        tertiary: 'rgba(155, 111, 143, 0.05)',
      }
    }
    // Day
    return {
      primary: 'rgba(54, 118, 61, 0.05)',
      secondary: 'rgba(66, 147, 147, 0.04)',
      tertiary: 'rgba(212, 102, 67, 0.03)',
    }
  }, [twilightProgress])

  const colorPalette = [
    orbColors.primary, orbColors.secondary, orbColors.tertiary,
    orbColors.primary, orbColors.secondary, orbColors.tertiary,
    orbColors.primary, orbColors.secondary,
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {ORB_CONFIGS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${colorPalette[i]}, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, orb.dx, -orb.dx * 0.5, 0],
            y: [0, orb.dy, -orb.dy * 0.7, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// VIEW TOGGLE PILL
// ============================================

function ViewToggle({
  active,
  onChange,
}: {
  active: PrimaryView
  onChange: (view: PrimaryView) => void
}) {
  const { twilightProgress } = useTimeTheme()
  const isNight = twilightProgress > 0.65

  return (
    <div
      className="relative inline-flex rounded-full p-1 transition-colors duration-500"
      style={{
        background: isNight
          ? 'rgba(255,255,255,0.06)'
          : 'color-mix(in srgb, var(--muted) 80%, var(--background))',
      }}
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          background: 'var(--primary)',
        }}
        layout
        layoutId="view-toggle-pill"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        animate={{
          left: active === 'network' ? '4px' : '50%',
          right: active === 'directory' ? '4px' : '50%',
        }}
      />
      <button
        onClick={() => onChange('network')}
        className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
          active === 'network' ? 'text-[var(--primary-foreground)]' : 'text-[var(--muted-foreground)]'
        }`}
      >
        <Orbit className="w-4 h-4" />
        My Network
      </button>
      <button
        onClick={() => onChange('directory')}
        className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
          active === 'directory' ? 'text-[var(--primary-foreground)]' : 'text-[var(--muted-foreground)]'
        }`}
      >
        <Globe className="w-4 h-4" />
        Directory
      </button>
    </div>
  )
}

// ============================================
// NETWORK SUB-TAB BAR
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
              ? 'text-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,var(--background))]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && tab.count > 0 && (
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${
                active === tab.id
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
              }`}
            >
              {tab.count}
            </span>
          )}
          {active === tab.id && (
            <motion.div
              layoutId="network-tab-indicator"
              className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--primary)] rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

// ============================================
// STAT CARD (for hero section)
// ============================================

function StatOrb({
  label,
  value,
  icon,
  color,
  delay,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  delay: number
}) {
  const { twilightProgress } = useTimeTheme()
  const isNight = twilightProgress > 0.65

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
          background: `radial-gradient(circle, ${color}22, transparent)`,
          filter: 'blur(12px)',
        }}
      />
      <div
        className="relative flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border transition-all duration-300"
        style={{
          background: isNight ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(12px)',
          borderColor: `${color}22`,
        }}
      >
        <div style={{ color }} className="mb-0.5">
          {icon}
        </div>
        <span className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">{value}</span>
        <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
          {label}
        </span>
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
  const { twilightProgress } = useTimeTheme()
  const isNight = twilightProgress > 0.65

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.06 }}
      className="relative rounded-2xl overflow-hidden border border-[var(--border)] p-4 sm:p-5"
      style={{
        background: isNight ? 'rgba(10,10,24,0.75)' : 'var(--card)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex items-start gap-3">
        <Link href={`/profile/${request.requester.id}`} className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-[2px]">
            {request.requester.image ? (
              <img src={request.requester.image} alt={request.requester.name || ''} className="w-full h-full rounded-[10px] object-cover" />
            ) : (
              <div className="w-full h-full rounded-[10px] bg-[var(--card)] flex items-center justify-center">
                <span className="text-lg font-black text-[var(--primary)]">
                  {(request.requester.name?.[0] || '?').toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/profile/${request.requester.id}`}>
            <h4 className="text-sm font-black text-[var(--foreground)] truncate hover:text-[var(--primary)] transition-colors">
              {request.requester.name || 'Anonymous'}
            </h4>
          </Link>
          {request.requester.headline && (
            <p className="text-[11px] text-[var(--muted-foreground)] truncate">{request.requester.headline}</p>
          )}
          {request.message && (
            <p className="text-xs text-[var(--muted-foreground)] mt-2 italic line-clamp-2">
              &ldquo;{request.message}&rdquo;
            </p>
          )}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              onClick={() => onAccept(request.id)}
              disabled={isProcessing}
              className="text-xs font-bold h-7 px-3"
            >
              <Check className="w-3 h-3 mr-1" />
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(request.id)}
              disabled={isProcessing}
              className="text-xs font-bold h-7 px-3"
            >
              <X className="w-3 h-3 mr-1" />
              Decline
            </Button>
          </div>
        </div>
      </div>
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
  const { phase, twilightProgress, isDay } = useTimeTheme()

  // Primary view
  const initialView = (searchParams.get('view') as PrimaryView) || 'network'
  const [primaryView, setPrimaryView] = useState<PrimaryView>(initialView)
  const [networkTab, setNetworkTab] = useState<NetworkTab>('all')

  // Data states
  const [allUsers, setAllUsers] = useState<ConstellationCardUser[]>([])
  const [followingUsers, setFollowingUsers] = useState<ConstellationCardUser[]>([])
  const [followerUsers, setFollowerUsers] = useState<ConstellationCardUser[]>([])
  const [suggestions, setSuggestions] = useState<ConstellationCardUser[]>([])
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([])
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())
  const [followerIds, setFollowerIds] = useState<Set<string>>(new Set())

  // Directory states
  const [directoryUsers, setDirectoryUsers] = useState<ConstellationCardUser[]>([])
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

  const isNight = twilightProgress > 0.65

  // Stats
  const stats: NetworkStats = useMemo(() => ({
    following: followingUsers.length,
    followers: followerUsers.length,
    mutual: followingUsers.filter(u => followerIds.has(u.id)).length,
    suggestions: suggestions.length,
    pending: pendingRequests.length,
  }), [followingUsers, followerUsers, followerIds, suggestions, pendingRequests])

  // ============================================
  // DATA FETCHING
  // ============================================

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
        setFollowingIds(new Set(users.map((u: ConstellationCardUser) => u.id)))
      }

      if (followersData.success) {
        const users = followersData.data || followersData.followers || []
        setFollowerUsers(users)
        setFollowerIds(new Set(users.map((u: ConstellationCardUser) => u.id)))
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
      const allMap = new Map<string, ConstellationCardUser>()
      const addUsers = (users: ConstellationCardUser[]) => {
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
    }
  }, [session?.user?.id, fetchNetworkData])

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
          // Find the user in allUsers or suggestions and add to following
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

  const getNetworkUsers = useCallback((): ConstellationCardUser[] => {
    let users: ConstellationCardUser[] = []

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
      <div className="min-h-screen flex items-center justify-center relative">
        <AmbientOrbs />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4 relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto"
          >
            <Orbit className="w-16 h-16 text-[var(--primary)]" />
          </motion.div>
          <p className="text-lg font-bold text-[var(--muted-foreground)]">
            Mapping the constellation...
          </p>
        </motion.div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <AmbientOrbs />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md px-6 relative z-10"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
            <Network className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-[var(--foreground)]">
            Join the Constellation
          </h2>
          <p className="text-[var(--muted-foreground)] font-medium">
            Sign in to discover your network of sustainability champions
          </p>
          <Link href="/auth/signin">
            <Button className="font-bold text-base px-8 py-3">
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen relative">
      <AmbientOrbs />

      <div className="relative z-10">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--foreground)] mb-3">
                  <span className="inline-block">
                    THE{' '}
                    <span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
                    >
                      CONSTELLATION
                    </span>
                  </span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm sm:text-base text-[var(--muted-foreground)] font-medium max-w-xl mx-auto"
                >
                  Every connection is a star in your sky. Watch your constellation grow.
                </motion.p>
              </motion.div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                <StatOrb
                  label="Following"
                  value={stats.following}
                  icon={<UserCheck className="w-5 h-5" />}
                  color="var(--primary)"
                  delay={0.1}
                />
                <StatOrb
                  label="Followers"
                  value={stats.followers}
                  icon={<Heart className="w-5 h-5" />}
                  color="var(--secondary)"
                  delay={0.2}
                />
                <StatOrb
                  label="Mutual"
                  value={stats.mutual}
                  icon={<Activity className="w-5 h-5" />}
                  color="var(--accent)"
                  delay={0.3}
                />
                {stats.pending > 0 && (
                  <StatOrb
                    label="Pending"
                    value={stats.pending}
                    icon={<Clock className="w-5 h-5" />}
                    color="#f59e0b"
                    delay={0.4}
                  />
                )}
              </div>

              {/* View Toggle */}
              <div className="flex justify-center mb-6">
                <ViewToggle active={primaryView} onChange={handleViewChange} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CONTROLS BAR */}
        {/* ============================================ */}
        <section className="pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-4">
              {/* Network sub-tabs */}
              <AnimatePresence mode="wait">
                {primaryView === 'network' && (
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
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={primaryView === 'network' ? 'Search your network...' : 'Search all members...'}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      background: isNight ? 'rgba(255,255,255,0.06)' : 'var(--card)',
                      border: `1px solid var(--border)`,
                      color: 'var(--foreground)',
                      backdropFilter: 'blur(12px)',
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {primaryView === 'directory' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="font-bold text-xs"
                  >
                    <Filter className="w-3.5 h-3.5 mr-1.5" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 px-1.5 py-0.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-[9px] font-black">
                        {[locationFilter, ...skillsFilter, ...interestsFilter].filter(Boolean).length}
                      </span>
                    )}
                  </Button>
                )}

                {primaryView === 'network' && (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 rounded-xl text-xs font-bold border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
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
                    <div
                      className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl border border-[var(--border)]"
                      style={{
                        background: isNight ? 'rgba(255,255,255,0.04)' : 'var(--card)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      {/* Location */}
                      <div>
                        <label className="flex items-center gap-1 text-xs font-bold text-[var(--foreground)] mb-2">
                          <MapPin className="w-3 h-3" />
                          LOCATION
                        </label>
                        <input
                          type="text"
                          value={locationFilter}
                          onChange={(e) => { setLocationFilter(e.target.value); setDirectoryPage(1) }}
                          placeholder="e.g., San Francisco"
                          className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm"
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="flex items-center gap-1 text-xs font-bold text-[var(--foreground)] mb-2">
                          <Briefcase className="w-3 h-3" />
                          SKILLS
                        </label>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {skillsFilter.map((skill) => (
                            <span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold">
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
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] text-xs"
                          />
                          <Button onClick={addSkillFilter} size="sm" className="text-xs h-7 px-2">+</Button>
                        </div>
                      </div>

                      {/* Interests */}
                      <div>
                        <label className="flex items-center gap-1 text-xs font-bold text-[var(--foreground)] mb-2">
                          <Sparkles className="w-3 h-3" />
                          INTERESTS
                        </label>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {interestsFilter.map((interest) => (
                            <span key={interest} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--primary)] text-[var(--primary)] text-[10px] font-bold">
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
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] text-xs"
                          />
                          <Button onClick={addInterestFilter} size="sm" className="text-xs h-7 px-2">+</Button>
                        </div>
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={clearAllFilters}
                          className="text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
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

        {/* ============================================ */}
        {/* CONTENT */}
        {/* ============================================ */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {/* ============================================ */}
                {/* NETWORK VIEW */}
                {/* ============================================ */}
                {primaryView === 'network' && (
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
                          <ConstellationCardSkeleton key={i} index={i} />
                        ))}
                      </div>
                    ) : networkUsers.length === 0 ? (
                      <EmptyState
                        icon={
                          networkTab === 'suggestions'
                            ? <Compass className="w-12 h-12" />
                            : <Users className="w-12 h-12" />
                        }
                        title={
                          searchQuery
                            ? 'No matches found'
                            : networkTab === 'following'
                              ? 'Not following anyone yet'
                              : networkTab === 'followers'
                                ? 'No followers yet'
                                : networkTab === 'mutual'
                                  ? 'No mutual connections'
                                  : networkTab === 'suggestions'
                                    ? 'No suggestions right now'
                                    : 'Your network is empty'
                        }
                        message={
                          searchQuery
                            ? 'Try a different search term'
                            : 'Start discovering people in the Directory view!'
                        }
                        action={
                          !searchQuery && (
                            <Button
                              onClick={() => handleViewChange('directory')}
                              className="font-bold mt-2"
                            >
                              <Globe className="w-4 h-4 mr-2" />
                              Browse Directory
                            </Button>
                          )
                        }
                      />
                    ) : (
                      <LayoutGroup>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <AnimatePresence mode="popLayout">
                            {networkUsers.map((user, i) => (
                              <ConstellationCard
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
                      <p className="text-xs font-bold text-[var(--muted-foreground)]">
                        {directoryTotal} member{directoryTotal !== 1 ? 's' : ''}
                        {hasActiveFilters && ' matching filters'}
                      </p>
                    </div>

                    {isDirectoryLoading ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(9)].map((_, i) => (
                          <ConstellationCardSkeleton key={i} index={i} />
                        ))}
                      </div>
                    ) : directoryUsers.length === 0 ? (
                      <EmptyState
                        icon={<Users className="w-12 h-12" />}
                        title={hasActiveFilters ? 'No matches found' : 'No members yet'}
                        message={hasActiveFilters ? 'Try adjusting your filters' : 'Be the first to join!'}
                        action={
                          hasActiveFilters && (
                            <Button onClick={clearAllFilters} variant="outline" className="font-bold mt-2">
                              Clear Filters
                            </Button>
                          )
                        }
                      />
                    ) : (
                      <>
                        <LayoutGroup>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence mode="popLayout">
                              {directoryUsers.map((user, i) => (
                                <ConstellationCard
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDirectoryPage(p => Math.max(1, p - 1))}
                              disabled={directoryPage === 1}
                              className="font-bold text-xs"
                            >
                              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                              Prev
                            </Button>

                            <div className="flex gap-1">
                              {generatePageNumbers(directoryPage, directoryTotalPages).map((page, i) => (
                                page === '...' ? (
                                  <span key={`dots-${i}`} className="px-2 py-1 text-xs text-[var(--muted-foreground)]">
                                    ...
                                  </span>
                                ) : (
                                  <button
                                    key={page}
                                    onClick={() => setDirectoryPage(page as number)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-300 ${
                                      directoryPage === page
                                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg'
                                        : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                                    }`}
                                  >
                                    {page}
                                  </button>
                                )
                              ))}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDirectoryPage(p => Math.min(directoryTotalPages, p + 1))}
                              disabled={directoryPage === directoryTotalPages}
                              className="font-bold text-xs"
                            >
                              Next
                              <ChevronRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
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
  const { twilightProgress } = useTimeTheme()
  const isNight = twilightProgress > 0.65

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-[var(--muted-foreground)]"
        style={{
          background: isNight ? 'rgba(255,255,255,0.04)' : 'var(--muted)',
        }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-black text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] font-medium max-w-sm">{message}</p>
      {action}
    </motion.div>
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
