'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'
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
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import { useVolitionLayout, LaneId, DEFAULT_LANES } from '@/hooks/useVolitionLayout'
import { useIsMobile } from '@/hooks/useIsMobile'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'

import { DynamicSpotlight } from '@/components/volition/DynamicSpotlight'
import { QuickActionsBar } from '@/components/volition/QuickActionsBar'

import { ProfileCard } from '@/components/volition/cards/ProfileCard'
import { ProfileBusinessCard } from '@/components/profile/ProfileBusinessCard'
import { ProjectCard } from '@/components/volition/cards/ProjectCard'
import { ProjectPreviewModal } from '@/components/volition/cards/ProjectPreviewModal'
import { ArticleCard } from '@/components/volition/cards/ArticleCard'
import { LearningCard } from '@/components/volition/cards/LearningCard'
import { NetworkCard } from '@/components/volition/cards/NetworkCard'
import { FeedPostCard } from '@/components/volition/cards/FeedPostCard'
import { ImpactCard } from '@/components/volition/cards/ImpactCard'

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

// ─── Netflix Lane ───────────────────────────────────────────────────────────
// Full-width lane with horizontal scrolling cards (Netflix-style row)

function NetflixLane({
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
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

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
  }, [checkScroll, isCollapsed])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' })
  }

  return (
    <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden transition-all">
      {/* Lane Header */}
      <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${gradient} bg-opacity-10`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">
              {title}
            </h3>
            {count > 0 && (
              <span className="text-xs font-medium text-[var(--foreground)]/50">
                {count} item{count !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onAdd && !isCustomizing && (
            <button
              onClick={onAdd}
              className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
              title={addLabel}
            >
              <Plus className="w-4 h-4 text-[var(--foreground)]/60" />
            </button>
          )}
          {!isCustomizing && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-[var(--foreground)]/60" />
              ) : (
                <ChevronUp className="w-4 h-4 text-[var(--foreground)]/60" />
              )}
            </button>
          )}
          {isCustomizing && onRemove && (
            <button
              onClick={onRemove}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Lane Content - Horizontal Scroll */}
      {!isCollapsed && (
        <div className="relative">
          {/* Chevron nav */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[var(--card)] shadow-lg border border-[var(--border)] flex items-center justify-center transition-all ${
              canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-[var(--foreground)]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[var(--card)] shadow-lg border border-[var(--border)] flex items-center justify-center transition-all ${
              canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4 text-[var(--foreground)]" />
          </button>

          {/* Fade edges */}
          <div className={`absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[var(--card)] to-transparent pointer-events-none z-10 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[var(--card)] to-transparent pointer-events-none z-10 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth p-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {count === 0 && emptyState ? emptyState : children}
          </div>

          <style jsx global>{`
            .scrollbar-none::-webkit-scrollbar { display: none; }
          `}</style>
        </div>
      )}

      {/* Bottom add button */}
      {onAdd && !isCollapsed && !isCustomizing && (
        <div className="px-4 pb-3">
          <button
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-sm font-medium text-[var(--foreground)]/50 hover:text-[var(--primary)] transition-all"
          >
            <Plus className="w-4 h-4" />
            {addLabel || 'Add'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function LaneEmptyState({
  icon: Icon,
  message,
  action,
  href,
}: {
  icon: any
  message: string
  action?: string
  href?: string
}) {
  return (
    <div className="min-w-[260px] flex flex-col items-center justify-center py-8 px-6 text-center bg-[var(--muted)]/30 rounded-xl border-2 border-dashed border-[var(--border)]">
      <div className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-[var(--foreground)]/30" />
      </div>
      <p className="text-sm font-medium text-[var(--foreground)]/50 mb-2">{message}</p>
      {action && href && (
        <a
          href={href}
          className="px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
        >
          {action}
        </a>
      )}
    </div>
  )
}

// ─── Lane Card ──────────────────────────────────────────────────────────────
// Fixed-width card for horizontal scrolling inside a lane

function LaneCard({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`${wide ? 'min-w-[380px] w-[380px]' : 'min-w-[300px] w-[300px]'} flex-shrink-0`}>
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

  // Business card modal
  const [showBusinessCardModal, setShowBusinessCardModal] = useState(false)

  // Project preview modal
  const [previewProject, setPreviewProject] = useState<any | null>(null)

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
  ])

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
  const emptyStates: Record<LaneId, { icon: any; message: string; action?: string; href?: string }> = {
    profile: { icon: User, message: 'Complete your profile' },
    projects: { icon: Briefcase, message: 'No projects yet', action: 'Start a Project', href: '/community/projects/new' },
    articles: { icon: FileText, message: 'No articles yet', action: 'Write an Article', href: '/articles/write' },
    learning: { icon: BookOpen, message: 'Start learning', action: 'Browse Courses', href: '/learn' },
    network: { icon: Users, message: 'Grow your network', action: 'Find People', href: '/network/browse' },
    feed: { icon: MessageCircle, message: 'No posts yet', action: 'Start a Discussion', href: '/community/forum/new' },
    impact: { icon: Leaf, message: 'Track your impact' },
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
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Your Volition</h1>
                <p className="text-xs text-white/60">
                  Track your contributions to Project Exodus
                </p>
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

      {/* Dynamic Spotlight */}
      <div className="container mx-auto px-4 pt-6">
        <DynamicSpotlight
          notifications={notifications}
          learningModules={learningModules}
          projects={projects}
          onDismiss={dismissSpotlight}
        />
      </div>

      {/* ═══ PROFILE HERO SECTION ═══ */}
      {orderedLanes.some(l => l.id === 'profile') && (
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
      )}

      {/* ═══ CONTENT SECTIONS ═══ */}
      <main className="pb-24 space-y-2">
        {orderedLanes
          .filter(lane => lane.id !== 'profile')
          .map((lane, i) => {
            const Icon = iconMap[lane.icon as keyof typeof iconMap] || User
            const addConfig = getAddConfig(lane.id)

            return (
              <section key={lane.id}>
                {i > 0 && <SectionDivider />}

                <SectionHeader
                  title={lane.title}
                  icon={Icon}
                  count={getLaneCount(lane.id)}
                  gradient={lane.gradient}
                  onAdd={addConfig.onAdd}
                  addLabel={addConfig.label}
                  isCustomizing={isCustomizing}
                  onRemove={() => toggleLane(lane.id)}
                />

                <VerticalGrid>
                  {renderSectionContent(lane.id)}
                </VerticalGrid>
              </section>
            )
          })}
      </main>

      {/* Quick Actions Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
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

    </div>
  )
}
