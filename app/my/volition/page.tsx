'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Zap, Settings, Check, RotateCcw, Plus, X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { useDashboardLayout } from '@/hooks/useDashboardLayout'
import { WIDGET_REGISTRY, ALL_WIDGET_IDS } from '@/components/dashboard/widgets'
import { WidgetId } from '@/types/dashboard'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const [projects, setProjects] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [networkSuggestions, setNetworkSuggestions] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [learningModules, setLearningModules] = useState<any[]>([])
  const [learningFilter, setLearningFilter] = useState<string>('all')

  // Dashboard layout hook
  const {
    activeWidgets,
    widgetSettings,
    isCustomizing,
    toggleWidget,
    resetToDefaults,
    updateWidgetSettings,
    startCustomizing,
    stopCustomizing,
  } = useDashboardLayout()

  // Widget picker modal state (only used in customize mode)
  const [showWidgetPicker, setShowWidgetPicker] = useState(false)

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    type: 'discussion' | 'project' | 'article' | null
    id: string | null
    title: string
  }>({ isOpen: false, type: null, id: null, title: '' })
  const [isDeleting, setIsDeleting] = useState(false)

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
              p.members.some((m: any) => m.userId === session.user.id) ||
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
      const res = await fetch(`/api/users/${session.user.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.data.articles) {
          setArticles(data.data.articles)
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
          const userPosts = data.data.posts.filter(
            (post: any) => post.userId === session.user.id
          )
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
      const res = await fetch('/api/network/suggestions?limit=6')
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
      const filter = widgetSettings.learning?.filter || 'all'
      const filterParam =
        filter !== 'all'
          ? `?filter=${filter === 'in_progress' ? 'in_progress' : 'completed'}`
          : ''
      const res = await fetch(`/api/learning/user${filterParam}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setLearningModules(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching learning modules:', error)
    }
  }, [widgetSettings.learning?.filter])

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
  ])

  // Refetch learning modules when filter changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchLearningModules()
    }
  }, [widgetSettings.learning?.filter, session?.user?.id, fetchLearningModules])

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
      } else {
        alert(data.error || 'Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete')
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
        // Refresh suggestions and following
        fetchNetworkSuggestions()
        fetchFollowing()
      }
    } catch (error) {
      console.error('Error following user:', error)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-medium text-[var(--foreground)]/60">
            Loading Your Dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
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
            <div className="flex items-center gap-2">
              {!isCustomizing ? (
                <button
                  onClick={startCustomizing}
                  className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Customize</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWidgetPicker(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Widget</span>
                  </button>
                  <button
                    onClick={resetToDefaults}
                    className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={stopCustomizing}
                    className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-white/90 rounded-lg text-[var(--primary)] text-sm font-bold transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Done</span>
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
            Customize Mode: Drag widgets to reposition, drag corners to resize, or click X to remove
          </p>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="pb-20">
        <DashboardGrid
          userProfile={userProfile}
          user={user}
          feedPosts={feedPosts}
          learningModules={learningModules}
          projects={projects}
          following={following}
          networkSuggestions={networkSuggestions}
          articles={articles}
          isCustomizing={isCustomizing}
          onDeletePost={(id) =>
            setDeleteModal({
              isOpen: true,
              type: 'discussion',
              id,
              title: 'Delete Discussion',
            })
          }
          onDeleteProject={(id) =>
            setDeleteModal({
              isOpen: true,
              type: 'project',
              id,
              title: 'Delete Project',
            })
          }
          onDeleteArticle={(id) =>
            setDeleteModal({
              isOpen: true,
              type: 'article',
              id,
              title: 'Delete Article',
            })
          }
          onFollow={handleFollow}
          onRefetchLearning={fetchLearningModules}
        />
      </div>

      {/* Widget Picker Modal */}
      {showWidgetPicker && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowWidgetPicker(false)}
        >
          <div
            className="bg-[var(--card)] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Add Widgets
              </h2>
              <button
                onClick={() => setShowWidgetPicker(false)}
                className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--foreground)]/60" />
              </button>
            </div>

            {/* Widget Grid */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {ALL_WIDGET_IDS.map((widgetId: WidgetId) => {
                  const widget = WIDGET_REGISTRY[widgetId]
                  const isActive = activeWidgets.includes(widgetId)
                  const Icon = widget.icon

                  return (
                    <button
                      key={widgetId}
                      onClick={() => toggleWidget(widgetId)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all text-left
                        ${
                          isActive
                            ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                            : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                        }
                      `}
                    >
                      {isActive && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">
                        {widget.name}
                      </h3>
                      <p className="text-xs text-[var(--foreground)]/60 line-clamp-2">
                        {widget.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/30">
              <p className="text-xs text-[var(--foreground)]/60 text-center">
                {activeWidgets.length} of {ALL_WIDGET_IDS.length} widgets active
              </p>
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
            ? 'This will permanently delete this discussion and all its comments.'
            : deleteModal.type === 'project'
            ? 'This will permanently delete this project and remove all members.'
            : 'This will permanently delete this article.'
        }
        isLoading={isDeleting}
      />
    </div>
  )
}
