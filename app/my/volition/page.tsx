'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import {
  Zap,
  User,
  Briefcase,
  FileText,
  BookOpen,
  Users,
  MessageCircle,
  Leaf,
  Maximize2,
  Minimize2,
  RotateCcw,
  Check,
  Settings,
  Plus,
  X,
} from 'lucide-react'

import { useVolitionLayout, LaneId, DEFAULT_LANES } from '@/hooks/useVolitionLayout'
import { useIsMobile } from '@/hooks/useIsMobile'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'

import { DynamicSpotlight } from '@/components/volition/DynamicSpotlight'
import { LaneContainer } from '@/components/volition/LaneContainer'
import { Lane } from '@/components/volition/Lane'
import { QuickActionsBar } from '@/components/volition/QuickActionsBar'

import { ProfileCard } from '@/components/volition/cards/ProfileCard'
import { ProjectCard } from '@/components/volition/cards/ProjectCard'
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
}

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const isMobile = useIsMobile()

  // Layout state
  const {
    enabledLanes,
    isCompact,
    isCustomizing,
    getOrderedLanes,
    allLanes,
    toggleLane,
    toggleCompact,
    resetToDefaults,
    startCustomizing,
    stopCustomizing,
    dismissSpotlight,
  } = useVolitionLayout()

  // Data state
  const [projects, setProjects] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [networkSuggestions, setNetworkSuggestions] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [learningModules, setLearningModules] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mobile tab navigation
  const [activeLaneIndex, setActiveLaneIndex] = useState(0)

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

  // Fetch functions
  const fetchProjects = useCallback(async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
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

  // Render lane content based on lane ID
  const renderLaneContent = (laneId: LaneId) => {
    switch (laneId) {
      case 'profile':
        return (
          <ProfileCard
            user={user}
            userProfile={userProfile}
            isCompact={isCompact}
          />
        )

      case 'projects':
        return projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              userId={user.id}
              isCompact={isCompact}
              onDelete={(id) =>
                setDeleteModal({
                  isOpen: true,
                  type: 'project',
                  id,
                  title: 'Delete Project',
                })
              }
            />
          ))
        ) : null

      case 'articles':
        return articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isCompact={isCompact}
              onDelete={(id) =>
                setDeleteModal({
                  isOpen: true,
                  type: 'article',
                  id,
                  title: 'Delete Article',
                })
              }
            />
          ))
        ) : null

      case 'learning':
        return learningModules.length > 0 ? (
          learningModules.map((module) => (
            <LearningCard
              key={module.id}
              module={module}
              isCompact={isCompact}
            />
          ))
        ) : null

      case 'network':
        return (
          <>
            {following.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[var(--foreground)]/50 uppercase mb-2 px-1">
                  Following
                </h4>
                {following.slice(0, 3).map((user) => (
                  <NetworkCard
                    key={user.id}
                    user={user}
                    type="following"
                    isCompact={isCompact}
                    className="mb-2"
                  />
                ))}
              </div>
            )}
            {networkSuggestions.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-[var(--foreground)]/50 uppercase mb-2 px-1">
                  Suggested
                </h4>
                {networkSuggestions.slice(0, 5).map((user) => (
                  <NetworkCard
                    key={user.id}
                    user={user}
                    type="suggestion"
                    isCompact={isCompact}
                    onFollow={handleFollow}
                    className="mb-2"
                  />
                ))}
              </div>
            )}
          </>
        )

      case 'feed':
        return feedPosts.length > 0 ? (
          feedPosts.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              currentUserId={user.id}
              isCompact={isCompact}
              onDelete={(id) =>
                setDeleteModal({
                  isOpen: true,
                  type: 'discussion',
                  id,
                  title: 'Delete Post',
                })
              }
            />
          ))
        ) : null

      case 'impact':
        return <ImpactCard isCompact={isCompact} />

      default:
        return null
    }
  }

  // Get lane empty state
  const getLaneEmptyState = (laneId: LaneId) => {
    const emptyStates: Record<LaneId, { icon: any; message: string; action?: string; href?: string }> = {
      profile: { icon: User, message: 'Complete your profile' },
      projects: { icon: Briefcase, message: 'No projects yet', action: 'Start a Project', href: '/community/projects/new' },
      articles: { icon: FileText, message: 'No articles yet', action: 'Write an Article', href: '/articles/write' },
      learning: { icon: BookOpen, message: 'Start learning', action: 'Browse Courses', href: '/learn' },
      network: { icon: Users, message: 'Grow your network', action: 'Find People', href: '/network/browse' },
      feed: { icon: MessageCircle, message: 'No posts yet', action: 'Start a Discussion', href: '/community/forum/new' },
      impact: { icon: Leaf, message: 'Track your impact' },
    }

    const state = emptyStates[laneId]
    const Icon = state.icon

    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center mb-3">
          <Icon className="w-6 h-6 text-[var(--foreground)]/30" />
        </div>
        <p className="text-sm font-medium text-[var(--foreground)]/50 mb-3">{state.message}</p>
        {state.action && state.href && (
          <a
            href={state.href}
            className="px-4 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold hover:bg-[var(--primary)]/20 transition-colors"
          >
            {state.action}
          </a>
        )}
      </div>
    )
  }

  // Get lane count
  const getLaneCount = (laneId: LaneId): number => {
    switch (laneId) {
      case 'projects': return projects.length
      case 'articles': return articles.length
      case 'learning': return learningModules.length
      case 'network': return following.length + networkSuggestions.length
      case 'feed': return feedPosts.length
      default: return 0
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
              {/* Compact toggle */}
              <button
                onClick={toggleCompact}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                title={isCompact ? 'Expand cards' : 'Compact cards'}
              >
                {isCompact ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
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
                    <span>Lanes</span>
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

      {/* Mobile lane tabs */}
      {isMobile && (
        <div className="sticky top-[72px] z-40 bg-[var(--background)] border-b border-[var(--border)] overflow-x-auto scrollbar-none">
          <div className="flex px-2 py-2 gap-2">
            {orderedLanes.map((lane, index) => {
              const Icon = iconMap[lane.icon as keyof typeof iconMap] || User
              const isActive = index === activeLaneIndex
              return (
                <button
                  key={lane.id}
                  onClick={() => setActiveLaneIndex(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${lane.gradient} text-white`
                      : 'bg-[var(--muted)] text-[var(--foreground)]/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{lane.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Customize mode banner */}
      {isCustomizing && (
        <div className="bg-[var(--primary)]/10 border-b border-[var(--primary)]/20 py-2 px-4 text-center">
          <p className="text-sm font-medium text-[var(--primary)]">
            Customize Mode: Manage your lanes and layout
          </p>
        </div>
      )}

      {/* Dynamic Spotlight */}
      <div className="container mx-auto px-4 pt-4">
        <DynamicSpotlight
          notifications={notifications}
          learningModules={learningModules}
          projects={projects}
          onDismiss={dismissSpotlight}
        />
      </div>

      {/* Main content area */}
      <div className="py-4">
        {isMobile ? (
          // Mobile: Show active lane only
          <div className="container mx-auto px-4">
            {orderedLanes[activeLaneIndex] && (
              <Lane
                id={orderedLanes[activeLaneIndex].id}
                title={orderedLanes[activeLaneIndex].title}
                icon={iconMap[orderedLanes[activeLaneIndex].icon as keyof typeof iconMap] || User}
                count={getLaneCount(orderedLanes[activeLaneIndex].id)}
                gradient={orderedLanes[activeLaneIndex].gradient}
                isCompact={isCompact}
                isCustomizing={isCustomizing}
                onRemove={() => toggleLane(orderedLanes[activeLaneIndex].id)}
                emptyState={getLaneEmptyState(orderedLanes[activeLaneIndex].id)}
                className="w-full"
              >
                {renderLaneContent(orderedLanes[activeLaneIndex].id)}
              </Lane>
            )}
          </div>
        ) : (
          // Desktop: Horizontal scrolling lanes
          <LaneContainer showNavArrows>
            {orderedLanes.map((lane) => {
              const Icon = iconMap[lane.icon as keyof typeof iconMap] || User
              return (
                <Lane
                  key={lane.id}
                  id={lane.id}
                  title={lane.title}
                  icon={Icon}
                  count={getLaneCount(lane.id)}
                  gradient={lane.gradient}
                  isCompact={isCompact}
                  isCustomizing={isCustomizing}
                  onRemove={() => toggleLane(lane.id)}
                  emptyState={getLaneEmptyState(lane.id)}
                  onAdd={
                    lane.id === 'projects' ? () => window.location.href = '/community/projects/new' :
                    lane.id === 'articles' ? () => window.location.href = '/articles/write' :
                    lane.id === 'feed' ? () => window.location.href = '/community/forum/new' :
                    undefined
                  }
                  addLabel={
                    lane.id === 'projects' ? 'New Project' :
                    lane.id === 'articles' ? 'Write Article' :
                    lane.id === 'feed' ? 'New Post' :
                    'Add'
                  }
                >
                  {renderLaneContent(lane.id)}
                </Lane>
              )
            })}
          </LaneContainer>
        )}
      </div>

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
              <h2 className="text-lg font-bold text-[var(--foreground)]">Manage Lanes</h2>
              <p className="text-sm text-[var(--foreground)]/60">Toggle which lanes appear on your dashboard</p>
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

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
