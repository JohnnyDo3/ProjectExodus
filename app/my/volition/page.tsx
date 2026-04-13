'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  Zap,
  User,
  Briefcase,
  FileText,
  BookOpen,
  Users,
  MessageCircle,
  Leaf,
  Rocket,
  Maximize2,
  Minimize2,
  Minus,
  RotateCcw,
  Check,
  Settings,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Fish,
  ChevronUp,
  ChevronDown,
  Palette,
  Info,
  Sparkles,
  UserPlus,
  Shell,
  Flame,
  Anchor,
  Sailboat,
  Ship,
  Castle,
  Pyramid,
  Landmark,
  Waves,
  Skull,
  BarChart3,
} from 'lucide-react'
import Link from 'next/link'

import { useVolitionLayout, LaneId, DEFAULT_LANES } from '@/hooks/useVolitionLayout'
import { useIsMobile } from '@/hooks/useIsMobile'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization, type FishTier } from '@/components/fishbowl/FishSpecies'
import { FishCustomizer } from '@/components/fishbowl/FishCustomizer'
import '@/components/fishbowl/fishbowl.css'

import { DynamicSpotlight } from '@/components/volition/DynamicSpotlight'
import { QuickActionsBar } from '@/components/volition/QuickActionsBar'
import { ActivityFeed } from '@/components/volition/ActivityFeed'
import AnalyticsDashboard from '@/components/volition/AnalyticsDashboard'

import { ProfileCard } from '@/components/volition/cards/ProfileCard'
import { ProfileBusinessCard } from '@/components/profile/ProfileBusinessCard'
import { ProjectCard } from '@/components/volition/cards/ProjectCard'
import { ProjectPreviewModal } from '@/components/volition/cards/ProjectPreviewModal'
import { ArticleCard } from '@/components/volition/cards/ArticleCard'
import { LearningCard } from '@/components/volition/cards/LearningCard'
import { NetworkCard } from '@/components/volition/cards/NetworkCard'
import { FeedPostCard } from '@/components/volition/cards/FeedPostCard'
import { ImpactCard } from '@/components/volition/cards/ImpactCard'

// ─── Fish Tank Types & Constants ─────────────────────────────────────────────

interface FishbowlUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
  fishCustomization?: FishCustomization | null
  isMutual?: boolean
}

interface PersonalFishbowlData {
  user: FishbowlUser | null
  connections: FishbowlUser[]
  stats: { following: number; followers: number; mutual: number }
}

const DECOR_THEMES = [
  { id: 'ocean', name: 'Ocean Reef', icon: Shell, description: 'Coral reef with ocean plants' },
  { id: 'volcano', name: 'Volcano', icon: Flame, description: 'Volcanic reef with lava vents' },
  { id: 'shipwreck', name: 'Shipwreck', icon: Anchor, description: 'Sunken ship vibes' },
  { id: 'sailboat', name: 'Sailboat', icon: Sailboat, description: 'Sunken sailboat wreck' },
  { id: 'submarine', name: 'Submarine', icon: Ship, description: 'Sunken submarine base' },
  { id: 'castle', name: 'Castle', icon: Castle, description: 'Sunken medieval fortress' },
  { id: 'pyramid', name: 'Pyramid', icon: Pyramid, description: 'Ancient Egyptian ruins' },
  { id: 'temple', name: 'Temple', icon: Landmark, description: 'Japanese torii and pagoda' },
  { id: 'atlantis', name: 'Atlantis', icon: Waves, description: 'Lost city of Atlantis' },
  { id: 'minimal', name: 'Minimal', icon: Fish, description: 'Clean, simple look' },
  { id: 'stagnant', name: 'Stagnant', icon: Skull, description: 'Deer skull with willow vines' },
] as const

const FISH_SPECIES = [
  { tier: 0 as FishTier, name: 'Guppy', unlockScore: 0 },
  { tier: 1 as FishTier, name: 'Tetra', unlockScore: 10 },
  { tier: 2 as FishTier, name: 'Angelfish', unlockScore: 25 },
  { tier: 3 as FishTier, name: 'Clownfish', unlockScore: 50 },
  { tier: 4 as FishTier, name: 'Blue Tang', unlockScore: 100 },
  { tier: 5 as FishTier, name: 'Royal Betta', unlockScore: 200 },
]

const iconMap = {
  User,
  Briefcase,
  FileText,
  BookOpen,
  Users,
  MessageCircle,
  Leaf,
  Rocket,
}

// ─── Column Lane ────────────────────────────────────────────────────────────
// Fixed-width vertical column with vertically scrolling cards

function ColumnLane({
  title,
  icon: Icon,
  count,
  gradient,
  onAdd,
  addLabel,
  isCustomizing,
  onRemove,
  children,
  emptyState,
  viewMode = 'expanded',
}: {
  title: string
  icon: any
  count: number
  gradient: string
  onAdd?: () => void
  addLabel?: string
  isCustomizing?: boolean
  onRemove?: () => void
  children: React.ReactNode
  emptyState?: React.ReactNode
  viewMode?: 'expanded' | 'compact' | 'minimal'
}) {
  const isMinimal = viewMode === 'minimal'

  // Minimal: dashboard summary tile — gradient header + content preview
  if (isMinimal) {
    const childArray = Array.isArray(children) ? children : React.Children.toArray(children)
    const visibleItems = childArray.flat().slice(0, 3)
    const remaining = count - visibleItems.length

    return (
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden transition-all hover:shadow-lg hover:border-[var(--primary)]/30 group">
        {/* Gradient header strip */}
        <div className={`flex items-center justify-between px-3 py-2 bg-gradient-to-r ${gradient}`}>
          <div className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 text-white" />
            <h3 className="text-[11px] font-bold text-white uppercase tracking-wide">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-bold text-white tabular-nums">
                {count}
              </span>
            )}
            {isCustomizing && onRemove && (
              <button
                onClick={onRemove}
                className="p-0.5 rounded bg-white/10 hover:bg-red-500/40 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Content preview */}
        <div className="p-2 space-y-1">
          {count === 0 && emptyState ? (
            <p className="text-[10px] text-center text-[var(--foreground)]/40 py-2 italic">No items yet</p>
          ) : (
            <>
              {visibleItems}
              {remaining > 0 && (
                <p className="text-[10px] text-center text-[var(--foreground)]/40 pt-0.5">
                  +{remaining} more
                </p>
              )}
            </>
          )}
        </div>

        {/* Quick add */}
        {onAdd && !isCustomizing && (
          <div className="px-2 pb-2">
            <button
              onClick={onAdd}
              className="w-full flex items-center justify-center gap-1 py-1 rounded-lg border border-dashed border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-[10px] font-medium text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-all"
            >
              <Plus className="w-2.5 h-2.5" />
              {addLabel || 'Add'}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-[340px] min-w-[340px] flex flex-col bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden transition-all max-h-[calc(100vh-280px)]">
      {/* Lane Header */}
      <div className={`flex items-center justify-between p-3 bg-gradient-to-r ${gradient} bg-opacity-10 flex-shrink-0`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">
              {title}
            </h3>
            {count > 0 && (
              <span className="text-[11px] font-medium text-[var(--foreground)]/50">
                {count} item{count !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onAdd && !isCustomizing && (
            <button
              onClick={onAdd}
              className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
              title={addLabel}
            >
              <Plus className="w-4 h-4 text-[var(--foreground)]/60" />
            </button>
          )}
          {isCustomizing && onRemove && (
            <button
              onClick={onRemove}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Lane Content - Vertical Scroll */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-3"
        style={{ scrollbarWidth: 'thin' }}
      >
        {count === 0 && emptyState ? emptyState : children}
      </div>

      {/* Bottom add button */}
      {onAdd && !isCustomizing && (
        <div className="px-3 pb-3 flex-shrink-0">
          <button
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-xs font-medium text-[var(--foreground)]/50 hover:text-[var(--primary)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            {addLabel || 'Add'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Lane Scroller ──────────────────────────────────────────────────────────
// Netflix-style horizontal scroller for the column lanes

function LaneScroller({ children, viewMode = 'expanded' }: { children: React.ReactNode; viewMode?: 'expanded' | 'compact' | 'minimal' }) {
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
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  // Minimal mode: responsive dashboard grid
  if (viewMode === 'minimal') {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="relative pb-24">
      {/* Chevron nav */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[var(--card)] shadow-xl border border-[var(--border)] flex items-center justify-center transition-all ${
          canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-[var(--foreground)]" />
      </button>
      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[var(--card)] shadow-xl border border-[var(--border)] flex items-center justify-center transition-all ${
          canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-5 h-5 text-[var(--foreground)]" />
      </button>

      {/* Fade edges */}
      <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-20 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-20 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-8 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function LaneEmptyState({
  icon: Icon,
  message,
  description,
  action,
  href,
}: {
  icon: any
  message: string
  description?: string
  action?: string
  href?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-5 text-center bg-gradient-to-b from-[var(--muted)]/20 to-[var(--muted)]/40 rounded-2xl border-2 border-dashed border-[var(--border)]/60">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center mb-3 shadow-sm">
        <Icon className="w-7 h-7 text-[var(--primary)]/60" />
      </div>
      <p className="text-sm font-bold text-[var(--foreground)]/60 mb-1">{message}</p>
      {description && (
        <p className="text-xs text-[var(--foreground)]/40 mb-3 max-w-[200px]">{description}</p>
      )}
      {action && href && (
        <a
          href={href}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-bold hover:shadow-lg hover:scale-105 transition-all"
        >
          {action}
        </a>
      )}
    </div>
  )
}

// ─── Lane Card ──────────────────────────────────────────────────────────────
// Full-width card for vertical stacking inside a column lane

function LaneCard({ children }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="w-full">
      {children}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const isMobile = useIsMobile()

  // Layout state
  const {
    enabledLanes,
    viewMode,
    isCustomizing,
    getOrderedLanes,
    allLanes,
    toggleLane,
    cycleViewMode,
    resetToDefaults,
    startCustomizing,
    stopCustomizing,
    dismissSpotlight,
  } = useVolitionLayout()

  // Data state
  const [projects, setProjects] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [localDrafts, setLocalDrafts] = useState<any[]>([])
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [networkSuggestions, setNetworkSuggestions] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [learningModules, setLearningModules] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    type: 'discussion' | 'project' | 'article' | null
    id: string | null
    title: string
  }>({ isOpen: false, type: null, id: null, title: '' })
  const [isDeleting, setIsDeleting] = useState(false)

  // Lane picker modal
  const [showLanePicker, setShowLanePicker] = useState(false)

  // Volition content tab (activity vs analytics)
  const [volitionTab, setVolitionTab] = useState<'activity' | 'analytics'>('activity')

  // Business card modal
  const [showBusinessCardModal, setShowBusinessCardModal] = useState(false)

  // Project preview modal
  const [previewProject, setPreviewProject] = useState<any | null>(null)

  // ─── Fish Tank State ──────────────────────────────────────────────────────
  const [showTank, setShowTank] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try { return localStorage.getItem('volition-tank-visible') !== 'false' } catch { return true }
  })
  const [fishData, setFishData] = useState<PersonalFishbowlData | null>(null)
  const [fishLoading, setFishLoading] = useState(false)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [activeDecor, setActiveDecor] = useState<string>(() => {
    if (typeof window === 'undefined') return 'ocean'
    try { return localStorage.getItem('personal-tank-theme') || 'ocean' } catch { return 'ocean' }
  })
  const [showDecorPanel, setShowDecorPanel] = useState(false)
  const [showFishInfo, setShowFishInfo] = useState(false)
  const [showFriendPanel, setShowFriendPanel] = useState(false)
  const [pastTank, setPastTank] = useState(false)
  const decorPanelRef = useRef<HTMLDivElement>(null)
  const infoPanelRef = useRef<HTMLDivElement>(null)
  const friendPanelRef = useRef<HTMLDivElement>(null)
  const decorBtnRef = useRef<HTMLButtonElement>(null)
  const infoBtnRef = useRef<HTMLButtonElement>(null)
  const friendBtnRef = useRef<HTMLButtonElement>(null)
  const [tankFriendIds, setTankFriendIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set()
    try {
      const saved = localStorage.getItem('personal-tank-friends')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch { return new Set() }
  })

  // Toggle tank visibility
  const toggleTank = useCallback(() => {
    setShowTank(prev => {
      const next = !prev
      try { localStorage.setItem('volition-tank-visible', String(next)) } catch {}
      return next
    })
  }, [])

  // Fetch fish data
  const fetchFishData = useCallback(async () => {
    setFishLoading(true)
    try {
      const res = await fetch('/api/fishbowl/personal')
      const json = await res.json()
      if (json.success) setFishData(json.data)
    } catch (error) {
      console.error('Error fetching fishbowl:', error)
    } finally {
      setFishLoading(false)
    }
  }, [])

  // Toggle friend in tank
  const toggleFriendInTank = useCallback((friendId: string) => {
    setTankFriendIds(prev => {
      const next = new Set(prev)
      if (next.has(friendId)) next.delete(friendId)
      else next.add(friendId)
      localStorage.setItem('personal-tank-friends', JSON.stringify([...next]))
      return next
    })
  }, [])

  // Save fish customization
  const handleSaveFishCustomization = useCallback(async (customization: FishCustomization) => {
    const res = await fetch('/api/fishbowl/personal/customize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customization),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error)
    setFishData(prev => prev ? { ...prev, user: prev.user ? { ...prev.user, fishCustomization: customization } : null } : null)
    setShowCustomizer(false)
  }, [])

  // Close overlay panels on click outside
  useEffect(() => {
    if (!showDecorPanel && !showFishInfo && !showFriendPanel) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (showDecorPanel && decorPanelRef.current && !decorPanelRef.current.contains(target) && !decorBtnRef.current?.contains(target)) setShowDecorPanel(false)
      if (showFishInfo && infoPanelRef.current && !infoPanelRef.current.contains(target) && !infoBtnRef.current?.contains(target)) setShowFishInfo(false)
      if (showFriendPanel && friendPanelRef.current && !friendPanelRef.current.contains(target) && !friendBtnRef.current?.contains(target)) setShowFriendPanel(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showDecorPanel, showFishInfo, showFriendPanel])

  // Fetch functions
  const fetchProjects = useCallback(async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        if (data.success && Array.isArray(data.data)) {
          const userProjects = data.data.filter(
            (p: any) =>
              p.members?.some((m: any) => m.userId === session.user.id) ||
              p.creatorId === session.user.id
          )
          setProjects(userProjects)
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }, [session?.user?.id])

  const fetchArticles = useCallback(async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch(`/api/articles?authorId=${session.user.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setArticles(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }, [session?.user?.id])

  // Load local drafts from localStorage
  const loadLocalDrafts = useCallback(() => {
    try {
      const savedDraft = localStorage.getItem('article-draft-v2')
      if (savedDraft) {
        const draft = JSON.parse(savedDraft)
        if (draft.articleData?.title || draft.articleData?.content) {
          const draftArticle = {
            id: 'local-draft',
            title: draft.articleData.title || 'Untitled Draft',
            slug: 'local-draft',
            excerpt: draft.articleData.excerpt || '',
            coverImage: draft.articleData.coverImage || null,
            status: 'LOCAL_DRAFT',
            views: 0,
            readTime: Math.ceil((draft.articleData.content?.split(/\s+/).length || 0) / 200),
            createdAt: draft.savedAt || new Date().toISOString(),
            isLocalDraft: true,
          }
          setLocalDrafts([draftArticle])
        } else {
          setLocalDrafts([])
        }
      } else {
        setLocalDrafts([])
      }
    } catch (error) {
      console.error('Error loading local drafts:', error)
      setLocalDrafts([])
    }
  }, [])

  const fetchFeedPosts = useCallback(async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch('/api/social/feed?limit=50')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          const userPosts = data.data.posts?.filter(
            (post: any) => post.userId === session.user.id
          ) || []
          setFeedPosts(userPosts)
        }
      }
    } catch (error) {
      console.error('Error fetching feed posts:', error)
    }
  }, [session?.user?.id])

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch(`/api/users/${session.user.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) setUserProfile(data.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }, [session?.user?.id])

  const fetchNetworkSuggestions = useCallback(async () => {
    try {
      const res = await fetch('/api/network/suggestions?limit=10')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setNetworkSuggestions(data.data.suggestions || [])
        }
      }
    } catch (error) {
      console.error('Error fetching network suggestions:', error)
    }
  }, [])

  const fetchFollowing = useCallback(async () => {
    try {
      const res = await fetch('/api/users/following')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setFollowing(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching following:', error)
    }
  }, [])

  const fetchLearningModules = useCallback(async () => {
    try {
      const res = await fetch('/api/learning/user')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setLearningModules(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching learning modules:', error)
    }
  }, [])

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications?limit=5')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setNotifications(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    if (session?.user?.id) {
      loadLocalDrafts()

      Promise.all([
        fetchProjects(),
        fetchArticles(),
        fetchFeedPosts(),
        fetchProfile(),
        fetchNetworkSuggestions(),
        fetchFollowing(),
        fetchLearningModules(),
        fetchNotifications(),
        fetchFishData(),
      ]).finally(() => setIsLoading(false))
    }
  }, [
    session?.user?.id,
    loadLocalDrafts,
    fetchProjects,
    fetchArticles,
    fetchFeedPosts,
    fetchProfile,
    fetchNetworkSuggestions,
    fetchFollowing,
    fetchLearningModules,
    fetchNotifications,
    fetchFishData,
  ])

  // Track scroll past the tank (viewport height) to show/hide QuickActionsBar
  useEffect(() => {
    const handleScroll = () => {
      setPastTank(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle delete
  const handleDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return

    setIsDeleting(true)
    try {
      let endpoint = ''
      if (deleteModal.type === 'discussion') {
        endpoint = `/api/social/post/${deleteModal.id}`
      } else if (deleteModal.type === 'project') {
        endpoint = `/api/projects/${deleteModal.id}`
      } else if (deleteModal.type === 'article') {
        endpoint = `/api/articles/${deleteModal.id}`
      }

      const res = await fetch(endpoint, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        if (deleteModal.type === 'discussion') {
          setFeedPosts((prev) => prev.filter((p) => p.id !== deleteModal.id))
        } else if (deleteModal.type === 'project') {
          setProjects((prev) => prev.filter((p) => p.id !== deleteModal.id))
        } else if (deleteModal.type === 'article') {
          setArticles((prev) => prev.filter((a) => a.id !== deleteModal.id))
        }
        setDeleteModal({ isOpen: false, type: null, id: null, title: '' })
      }
    } catch (error) {
      console.error('Error deleting:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle follow
  const handleFollow = async (userId: string) => {
    try {
      const res = await fetch('/api/connections/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followingId: userId }),
      })
      if (res.ok) {
        fetchNetworkSuggestions()
        fetchFollowing()
      }
    } catch (error) {
      console.error('Error following user:', error)
    }
  }

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-medium text-[var(--foreground)]/60">
            Loading Your Volition...
          </p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user
  const orderedLanes = getOrderedLanes()

  // Get lane count
  const getLaneCount = (laneId: LaneId): number => {
    switch (laneId) {
      case 'profile': return 1
      case 'projects': return projects.length
      case 'articles': return articles.length + localDrafts.length
      case 'learning': return learningModules.length
      case 'network': return following.length + networkSuggestions.length
      case 'feed': return feedPosts.length
      default: return 0
    }
  }

  // Get lane empty state config
  const emptyStates: Record<LaneId, { icon: any; message: string; description?: string; action?: string; href?: string }> = {
    profile: { icon: User, message: 'Complete your profile', description: 'Add your bio, skills, and interests to connect with the community' },
    projects: { icon: Briefcase, message: 'No projects yet', description: 'Collaborate with others on sustainability initiatives', action: 'Start a Project', href: '/community/projects/new' },
    articles: { icon: FileText, message: 'No articles yet', description: 'Share your knowledge and insights with the community', action: 'Write an Article', href: '/articles/write' },
    learning: { icon: BookOpen, message: 'Start learning', description: 'Explore sustainability courses and track your progress', action: 'Browse Courses', href: '/learn' },
    network: { icon: Users, message: 'Grow your network', description: 'Connect with sustainability advocates and experts', action: 'Find People', href: '/fishbowl?view=directory' },
    feed: { icon: MessageCircle, message: 'No posts yet', description: 'Join discussions and share your thoughts', action: 'Start a Discussion', href: '/community/forum/new' },
    impact: { icon: Leaf, message: 'Track your impact', description: 'See how your actions contribute to sustainability goals' },
  }

  // Get add config per lane
  const getAddConfig = (laneId: LaneId) => {
    switch (laneId) {
      case 'projects': return { onAdd: () => window.location.href = '/community/projects/new', label: 'New Project' }
      case 'articles': return { onAdd: () => window.location.href = '/articles/write', label: 'Write Article' }
      case 'feed': return { onAdd: () => window.location.href = '/community/forum/new', label: 'New Post' }
      default: return {}
    }
  }

  // Render a lane's cards for horizontal scrolling
  const renderLaneContent = (laneId: LaneId) => {
    switch (laneId) {
      case 'projects':
        return projects.map((project) => (
          <LaneCard key={project.id}>
            <ProjectCard
              project={project}
              userId={user.id}
              viewMode={viewMode}
              onPreview={(p) => setPreviewProject(p)}
              onDelete={(id) =>
                setDeleteModal({
                  isOpen: true,
                  type: 'project',
                  id,
                  title: 'Delete Project',
                })
              }
            />
          </LaneCard>
        ))

      case 'articles':
        return (
          <>
            {localDrafts.map((draft) => (
              <LaneCard key={draft.id}>
                <ArticleCard
                  article={{ ...draft, status: 'DRAFT' }}
                  viewMode={viewMode}
                  onDelete={() => {
                    localStorage.removeItem('article-draft-v2')
                    setLocalDrafts([])
                  }}
                />
              </LaneCard>
            ))}
            {articles.map((article) => (
              <LaneCard key={article.id}>
                <ArticleCard
                  article={article}
                  viewMode={viewMode}
                  onDelete={(id) =>
                    setDeleteModal({
                      isOpen: true,
                      type: 'article',
                      id,
                      title: 'Delete Article',
                    })
                  }
                />
              </LaneCard>
            ))}
          </>
        )

      case 'learning':
        return learningModules.map((module) => (
          <LaneCard key={module.id}>
            <LearningCard module={module} viewMode={viewMode} />
          </LaneCard>
        ))

      case 'network': {
        const networkItems: React.ReactNode[] = []
        following.forEach((u) => {
          networkItems.push(
            <LaneCard key={`following-${u.id}`}>
              <NetworkCard user={u} type="following" viewMode={viewMode} />
            </LaneCard>
          )
        })
        networkSuggestions.forEach((u) => {
          networkItems.push(
            <LaneCard key={`suggestion-${u.id}`}>
              <NetworkCard
                user={u}
                type="suggestion"
                viewMode={viewMode}
                onFollow={handleFollow}
              />
            </LaneCard>
          )
        })
        return networkItems
      }

      case 'feed':
        return feedPosts.map((post) => (
          <LaneCard key={post.id} wide>
            <FeedPostCard
              post={post}
              currentUserId={user.id}
              viewMode={viewMode}
              onDelete={(id) =>
                setDeleteModal({
                  isOpen: true,
                  type: 'discussion',
                  id,
                  title: 'Delete Post',
                })
              }
            />
          </LaneCard>
        ))

      case 'impact':
        return (
          <LaneCard wide>
            <ImpactCard viewMode={viewMode} />
          </LaneCard>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ═══ PERSONAL FISH TANK - Full Viewport Landing ═══ */}
      <section className="relative h-[100dvh] max-h-[100dvh] overflow-hidden">
        <div className="bg-[#0A1628] h-full flex flex-col min-h-0 max-h-[100dvh] overflow-hidden">
            {/* Tank toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-gradient-to-r from-[#0D2137]/95 via-[#123855]/95 to-[#0D2137]/95 border-b border-cyan-800/30">
              <div className="flex items-center gap-2">
                <Fish className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-cyan-100">MY TANK</span>
                {fishData?.user && (
                  <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-md bg-cyan-900/30 border border-cyan-800/40">
                    <FishSVG tier={getTierFromScore(fishData.user.stockScore)} size={16} customization={(fishData.user.fishCustomization as FishCustomization | null) || null} id="vol-header-fish" />
                    <span className="text-[10px] font-bold text-cyan-300">{getTierName(getTierFromScore(fishData.user.stockScore))} · {fishData.user.stockScore} STOCK</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {/* Customize fish */}
                {fishData?.user && (
                  <button
                    onClick={() => setShowCustomizer(true)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white hover:from-purple-500/80 hover:to-pink-500/80 transition-all border border-purple-500/30"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span className="hidden sm:inline">Customize</span>
                  </button>
                )}
                {/* Decor */}
                <button
                  ref={decorBtnRef}
                  onClick={() => { setShowDecorPanel(!showDecorPanel); setShowFishInfo(false); setShowFriendPanel(false) }}
                  className={`p-1.5 rounded-lg border transition-colors ${showDecorPanel ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300' : 'bg-cyan-900/30 border-cyan-800/40 text-cyan-500 hover:border-cyan-600/60'}`}
                  title="Tank decor"
                >
                  <Palette className="w-3.5 h-3.5" />
                </button>
                {/* Info */}
                <button
                  ref={infoBtnRef}
                  onClick={() => { setShowFishInfo(!showFishInfo); setShowDecorPanel(false); setShowFriendPanel(false) }}
                  className={`p-1.5 rounded-lg border transition-colors ${showFishInfo ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300' : 'bg-cyan-900/30 border-cyan-800/40 text-cyan-500 hover:border-cyan-600/60'}`}
                  title="Fish species guide"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {/* Add friends */}
                <button
                  ref={friendBtnRef}
                  onClick={() => { setShowFriendPanel(!showFriendPanel); setShowDecorPanel(false); setShowFishInfo(false) }}
                  className={`p-1.5 rounded-lg border transition-colors ${showFriendPanel ? 'bg-teal-600/30 border-teal-500/50 text-teal-300' : 'bg-cyan-900/30 border-cyan-800/40 text-cyan-500 hover:border-cyan-600/60'}`}
                  title="Add friend's fish"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                </button>
                {/* Community link */}
                <Link
                  href="/fishbowl"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500 transition-all"
                >
                  <Fish className="w-3 h-3" />
                  <span className="hidden sm:inline">Community</span>
                </Link>
                {/* Scroll to content */}
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-cyan-900/30 border border-cyan-800/40 text-cyan-400 hover:bg-cyan-800/40 transition-colors"
                >
                  <ChevronDown className="w-3 h-3" />
                  <span className="hidden sm:inline">View Content</span>
                </button>
              </div>
            </div>

            {/* Overlay panels */}
            <div className="relative">
              {showDecorPanel && (
                <div ref={decorPanelRef} className="absolute left-0 right-0 top-0 mx-4 p-3 rounded-b-xl bg-[#0A1628]/95 border border-t-0 border-cyan-800/30 backdrop-blur-sm shadow-xl shadow-black/40 z-40">
                  <p className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Tank Theme</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DECOR_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => { setActiveDecor(theme.id); try { localStorage.setItem('personal-tank-theme', theme.id) } catch {} }}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
                          activeDecor === theme.id
                            ? 'border-cyan-400 bg-cyan-900/40 shadow-lg shadow-cyan-900/20'
                            : 'border-cyan-800/30 bg-cyan-900/10 hover:border-cyan-600/50'
                        }`}
                      >
                        <theme.icon className={`w-4 h-4 ${activeDecor === theme.id ? 'text-cyan-300' : 'text-cyan-600'}`} />
                        <div className="text-left">
                          <p className={`text-[10px] font-bold ${activeDecor === theme.id ? 'text-cyan-200' : 'text-cyan-400'}`}>{theme.name}</p>
                          <p className="text-[8px] text-cyan-600">{theme.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showFishInfo && (
                <div ref={infoPanelRef} className="absolute left-0 right-0 top-0 mx-4 p-3 rounded-b-xl bg-[#0A1628]/95 border border-t-0 border-cyan-800/30 backdrop-blur-sm shadow-xl shadow-black/40 z-40">
                  <p className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Fish Species & Stock Levels</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {FISH_SPECIES.map(sp => {
                      const isUnlocked = (fishData?.user?.stockScore || 0) >= sp.unlockScore
                      return (
                        <div
                          key={sp.tier}
                          className={`flex items-center gap-2 p-2 rounded-lg ${isUnlocked ? 'bg-cyan-900/30 border border-cyan-700/30' : 'bg-cyan-950/30 border border-cyan-900/20 opacity-50'}`}
                        >
                          <FishSVG tier={sp.tier} size={20} />
                          <div>
                            <p className="text-[9px] text-cyan-500 font-medium">{sp.name}</p>
                            <p className="text-[9px] text-cyan-600">
                              {sp.unlockScore === 0 ? '0-9' : sp.unlockScore === 10 ? '10-24' : sp.unlockScore === 25 ? '25-49' : sp.unlockScore === 50 ? '50-99' : sp.unlockScore === 100 ? '100-199' : '200+'} STOCK
                            </p>
                            {!isUnlocked && <p className="text-[8px] text-amber-500/70 font-bold">LOCKED</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {showFriendPanel && (
                <div ref={friendPanelRef} className="absolute left-0 right-0 top-0 mx-4 p-3 rounded-b-xl bg-[#0A1628]/95 border border-t-0 border-teal-800/30 backdrop-blur-sm shadow-xl shadow-black/40 z-40">
                  <p className="text-[10px] text-teal-500 font-bold uppercase mb-2">Add Friend&apos;s Fish to Tank</p>
                  {(() => {
                    const mutualFriends = fishData?.connections?.filter(c => c.isMutual) || []
                    return mutualFriends.length > 0 ? (
                      <div className="max-h-[160px] overflow-y-auto space-y-1">
                        {mutualFriends.map(friend => {
                          const friendTier = getTierFromScore(friend.stockScore)
                          const isInTank = tankFriendIds.has(friend.id)
                          return (
                            <div key={friend.id} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-900/30 transition-colors">
                              <button
                                onClick={() => toggleFriendInTank(friend.id)}
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                  isInTank
                                    ? 'bg-teal-500/25 border border-teal-500/50 text-teal-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400'
                                    : 'bg-cyan-900/30 border border-cyan-800/40 text-cyan-700 hover:bg-teal-500/20 hover:border-teal-500/40 hover:text-teal-400'
                                }`}
                              >
                                {isInTank ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                              </button>
                              <FishSVG tier={friendTier} size={18} id={`vol-friend-${friend.id}`} />
                              <span className="flex-1 text-xs font-medium text-cyan-200 truncate">{friend.name}</span>
                              <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black bg-teal-500/20 text-teal-400 border border-teal-500/30">MUTUAL</span>
                              <span className="text-[9px] text-cyan-600 font-bold">{friend.stockScore} STOCK</span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Users className="w-6 h-6 text-cyan-700 mx-auto mb-2" />
                        <p className="text-[10px] text-cyan-600">No mutual friends yet.</p>
                        <p className="text-[9px] text-cyan-700 mt-1">Follow people who follow you back to add their fish!</p>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            {/* Fish tank */}
            <div className="flex-1 min-h-0 p-3 sm:p-4">
              {fishLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-bold text-cyan-400">Filling your tank...</p>
                  </div>
                </div>
              ) : (() => {
                const mutualFriends = fishData?.connections?.filter(c => c.isMutual) || []
                const fishbowlUsers = fishData?.user
                  ? [fishData.user, ...mutualFriends.filter(c => tankFriendIds.has(c.id))]
                  : []
                const userCustomization = (fishData?.user?.fishCustomization as FishCustomization | null) || null

                return fishbowlUsers.length > 0 ? (
                  <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden">
                    <Fishbowl
                      users={fishbowlUsers}
                      ownerCustomization={userCustomization}
                      ownerId={fishData?.user?.id}
                      contained
                      theme={activeDecor}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 40%, #123855 100%)' }}>
                    <div className="text-center space-y-3">
                      <Fish className="w-12 h-12 text-cyan-700 mx-auto" />
                      <p className="text-base font-bold text-cyan-500">Your tank is empty</p>
                      <p className="text-sm text-cyan-600">Follow people to add fish!</p>
                      <Link href="/network" className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all">
                        <Users className="w-4 h-4" />
                        Find People
                      </Link>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
      </section>

      {/* ═══ YOUR VOLITION HEADER ═══ */}
      <div className={`sticky top-0 z-50 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] border-b border-white/10 transition-all ${viewMode === 'minimal' ? 'py-0' : ''}`}>
        <div className={`container mx-auto px-4 ${viewMode === 'minimal' ? 'py-2' : 'py-4'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`${viewMode === 'minimal' ? 'w-7 h-7 rounded-lg' : 'w-10 h-10 rounded-xl'} bg-white/20 backdrop-blur flex items-center justify-center transition-all`}>
                <Zap className={`${viewMode === 'minimal' ? 'w-3.5 h-3.5' : 'w-5 h-5'} text-white`} />
              </div>
              <div>
                <h1 className={`${viewMode === 'minimal' ? 'text-sm' : 'text-xl'} font-bold text-white transition-all`}>Your Volition</h1>
                {viewMode !== 'minimal' && (
                  <p className="text-xs text-white/60">
                    Track your contributions to Project Exodus
                  </p>
                )}
              </div>
            </div>

            {/* Desktop controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* View mode toggle */}
              <button
                onClick={cycleViewMode}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                title={
                  viewMode === 'expanded' ? 'Switch to compact view' :
                  viewMode === 'compact' ? 'Switch to minimal view' :
                  'Switch to expanded view'
                }
              >
                {viewMode === 'expanded' ? (
                  <Minimize2 className="w-4 h-4" />
                ) : viewMode === 'compact' ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
                <span className="text-xs">
                  {viewMode === 'expanded' ? 'Full' :
                   viewMode === 'compact' ? 'Compact' :
                   'Minimal'}
                </span>
              </button>

              {!isCustomizing ? (
                <button
                  onClick={startCustomizing}
                  className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLanePicker(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Sections</span>
                  </button>
                  <button
                    onClick={resetToDefaults}
                    className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={stopCustomizing}
                    className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-white/90 rounded-lg text-[var(--primary)] text-sm font-bold transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Done</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customize mode banner */}
      {isCustomizing && (
        <div className="bg-[var(--primary)]/10 border-b border-[var(--primary)]/20 py-2 px-4 text-center">
          <p className="text-sm font-medium text-[var(--primary)]">
            Customize Mode: Manage your sections and layout
          </p>
        </div>
      )}

      {/* ═══ PROFILE HERO SECTION ═══ */}
      {orderedLanes.some(l => l.id === 'profile') && (
        viewMode === 'minimal' ? (
          /* Minimal: compact profile bar */
          <section className="px-4 sm:px-6 lg:px-8 pt-3 pb-1">
            <div className="max-w-7xl mx-auto">
              <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {user.image ? (
                      <Image src={user.image} alt={user.name || ''} fill unoptimized sizes="100%" className="object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--foreground)] truncate">{user.name || 'User'}</p>
                    {userProfile?.headline && (
                      <p className="text-[10px] text-[var(--foreground)]/50 truncate">{userProfile.headline}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--foreground)]/50 uppercase">
                    <span className="text-center"><span className="text-sm font-bold text-[var(--foreground)] block">{userProfile?._count?.followers || 0}</span>Followers</span>
                    <span className="text-center"><span className="text-sm font-bold text-[var(--foreground)] block">{userProfile?._count?.following || 0}</span>Following</span>
                    <span className="text-center"><span className="text-sm font-bold text-[var(--foreground)] block">{userProfile?._count?.projectMemberships || 0}</span>Projects</span>
                    <span className="text-center"><span className="text-sm font-bold text-[var(--foreground)] block">{userProfile?._count?.articles || 0}</span>Articles</span>
                  </div>
                  <button
                    onClick={() => setShowBusinessCardModal(true)}
                    className="p-1.5 rounded-lg bg-[var(--muted)] hover:bg-[var(--primary)]/10 transition-colors ml-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                  </button>
                  {isCustomizing && (
                    <button
                      onClick={() => toggleLane('profile')}
                      className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Normal: full profile card */
          <section className="py-6">
            <div className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
              {isCustomizing && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => toggleLane('profile')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              )}
              <ProfileCard
                user={user}
                userProfile={userProfile}
                viewMode={viewMode}
                onExpand={() => setShowBusinessCardModal(true)}
              />
            </div>
          </section>
        )
      )}

      {/* ═══ ACTIVITY FEED & ANALYTICS (Tabbed) ═══ */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Bar */}
          <div className="flex items-center gap-1 mb-4 bg-[var(--muted)] rounded-xl p-1 w-fit">
            <button
              onClick={() => setVolitionTab('activity')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                volitionTab === 'activity'
                  ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm border border-[var(--border)]'
                  : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]/70'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Activity
            </button>
            <button
              onClick={() => setVolitionTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                volitionTab === 'analytics'
                  ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm border border-[var(--border)]'
                  : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]/70'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </button>
          </div>

          {/* Tab Content */}
          {volitionTab === 'activity' ? (
            <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
              <div className="flex items-center gap-2.5 p-4 border-b border-[var(--border)]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">Network Activity</h2>
                  <p className="text-[11px] text-[var(--foreground)]/50">Latest from people you follow</p>
                </div>
              </div>
              <div className="p-4">
                <ActivityFeed />
              </div>
            </div>
          ) : (
            <AnalyticsDashboard />
          )}
        </div>
      </section>

      {/* ═══ CONTENT LANES ═══ */}
      <LaneScroller viewMode={viewMode}>
        {orderedLanes
          .filter(lane => lane.id !== 'profile')
          .map((lane) => {
            const Icon = iconMap[lane.icon as keyof typeof iconMap] || User
            const addConfig = getAddConfig(lane.id)

            const emptyConfig = emptyStates[lane.id]

            return (
              <ColumnLane
                key={lane.id}
                title={lane.title}
                icon={Icon}
                count={getLaneCount(lane.id)}
                gradient={lane.gradient}
                onAdd={addConfig.onAdd}
                addLabel={addConfig.label}
                isCustomizing={isCustomizing}
                onRemove={() => toggleLane(lane.id)}
                viewMode={viewMode}
                emptyState={
                  emptyConfig ? (
                    <LaneEmptyState
                      icon={emptyConfig.icon}
                      message={emptyConfig.message}
                      description={emptyConfig.description}
                      action={emptyConfig.action}
                      href={emptyConfig.href}
                    />
                  ) : undefined
                }
              >
                {renderLaneContent(lane.id)}
              </ColumnLane>
            )
          })}
      </LaneScroller>

      {/* Quick Actions Bar - only visible below the tank */}
      <div
        className="fixed bottom-6 left-1/2 z-40 transition-all duration-300"
        style={{
          opacity: pastTank ? 1 : 0,
          transform: `translateX(-50%) translateY(${pastTank ? '0px' : '20px'})`,
          pointerEvents: pastTank ? 'auto' : 'none',
        }}
      >
        <QuickActionsBar
          onCustomize={isCustomizing ? stopCustomizing : startCustomizing}
          isCustomizing={isCustomizing}
        />
      </div>

      {/* Lane Picker Modal */}
      {showLanePicker && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowLanePicker(false)}
        >
          <div
            className="bg-[var(--card)] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[var(--border)]">
              <h2 className="text-lg font-bold text-[var(--foreground)]">Manage Sections</h2>
              <p className="text-sm text-[var(--foreground)]/60">Toggle which sections appear on your dashboard</p>
            </div>

            <div className="p-4 max-h-[50vh] overflow-y-auto space-y-2">
              {allLanes.map((lane) => {
                const Icon = iconMap[lane.icon as keyof typeof iconMap] || User
                const isEnabled = enabledLanes.includes(lane.id)

                return (
                  <button
                    key={lane.id}
                    onClick={() => toggleLane(lane.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isEnabled
                        ? 'bg-[var(--primary)]/10 border-2 border-[var(--primary)]'
                        : 'bg-[var(--muted)] border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${lane.gradient} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-[var(--foreground)]">{lane.title}</p>
                    </div>
                    {isEnabled && (
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-4 border-t border-[var(--border)]">
              <button
                onClick={() => setShowLanePicker(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, type: null, id: null, title: '' })
        }
        onConfirm={handleDelete}
        title={deleteModal.title}
        description={
          deleteModal.type === 'discussion'
            ? 'This will permanently delete this post and all its comments.'
            : deleteModal.type === 'project'
            ? 'This will permanently delete this project and remove all members.'
            : 'This will permanently delete this article.'
        }
        isLoading={isDeleting}
      />

      {/* Business Card Edit Modal - Full Resume View */}
      {showBusinessCardModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowBusinessCardModal(false)}
        >
          <div
            className="my-8 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileBusinessCard
              userId={user.id || ''}
              onClose={() => setShowBusinessCardModal(false)}
              onSave={() => {
                fetchProfile()
                setShowBusinessCardModal(false)
              }}
              isFullView={true}
            />
          </div>
        </div>
      )}

      {/* Project Preview Modal */}
      <ProjectPreviewModal
        project={previewProject}
        isOpen={!!previewProject}
        onClose={() => setPreviewProject(null)}
        userId={user.id}
      />

      {/* Fish Customizer Modal */}
      {showCustomizer && fishData?.user && (
        <FishCustomizer
          stockScore={fishData.user.stockScore}
          currentCustomization={(fishData.user.fishCustomization as FishCustomization | null) || null}
          onSave={handleSaveFishCustomization}
          onClose={() => setShowCustomizer(false)}
        />
      )}

    </div>
  )
}
