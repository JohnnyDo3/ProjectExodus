'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import {
  User,
  Zap,
  BookOpen,
  MessageCircle,
  Briefcase,
  Plus,
  ChevronLeft,
  ChevronRight,
  Send,
  Search,
  MoreVertical,
  Filter,
  Heart,
  MessageSquare as MessageSquareIcon,
  Edit2,
  X,
  Trash2,
  FileText,
  CheckCircle,
  Mail,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IdentityDeclarationEditor } from '@/components/profile/IdentityDeclarationEditor'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

// Card type for deck columns
interface DeckCard {
  id: string
  title: string
  subtitle?: string
  date?: Date
  type: 'discussion' | 'learning' | 'project'
  slug?: string
  isOwner?: boolean
}

// Draggable Column Wrapper Component
function DraggableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing p-1.5 bg-[var(--muted)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors group"
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      {children}
    </div>
  )
}

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [discussionFilter, setDiscussionFilter] = useState<'recent' | 'oldest' | 'popular'>('recent')
  const [projectFilter, setProjectFilter] = useState<'all' | 'created' | 'joined'>('all')
  const [networkSuggestions, setNetworkSuggestions] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    type: 'discussion' | 'project' | null
    id: string | null
    title: string
  }>({ isOpen: false, type: null, id: null, title: '' })
  const [isDeleting, setIsDeleting] = useState(false)

  // Deck columns data
  const [discussionCards, setDiscussionCards] = useState<DeckCard[]>([])
  const [learningCards, setLearningCards] = useState<DeckCard[]>([])
  const [projectCards, setProjectCards] = useState<DeckCard[]>([])

  // Learning module state
  const [learningModules, setLearningModules] = useState<any[]>([])
  const [learningFilter, setLearningFilter] = useState<'all' | 'in_progress' | 'completed'>('all')

  // Column order state
  const [columnOrder, setColumnOrder] = useState<string[]>([
    'profile',
    'discussions',
    'learning',
    'projects',
    'network',
    'articles',
  ])

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Load column order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('volition-column-order')
    if (savedOrder) {
      try {
        setColumnOrder(JSON.parse(savedOrder))
      } catch (e) {
        console.error('Error loading column order:', e)
      }
    }
  }, [])

  // Save column order to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('volition-column-order', JSON.stringify(columnOrder))
  }, [columnOrder])

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
  }, [session?.user?.id])

  // Refetch learning modules when filter changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchLearningModules()
    }
  }, [learningFilter, session?.user?.id])

  useEffect(() => {
    // Convert fetched data to deck cards
    if (feedPosts.length > 0) {
      let sortedPosts = [...feedPosts]

      // Apply filter
      if (discussionFilter === 'recent' || discussionFilter === 'oldest') {
        sortedPosts.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return discussionFilter === 'recent' ? dateB - dateA : dateA - dateB
        })
      } else if (discussionFilter === 'popular') {
        sortedPosts.sort((a, b) => {
          const popularityA = (a._count?.likes || 0) + (a._count?.comments || 0)
          const popularityB = (b._count?.likes || 0) + (b._count?.comments || 0)
          return popularityB - popularityA
        })
      }

      const cards: DeckCard[] = sortedPosts.map(post => ({
        id: post.id,
        title: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
        subtitle: `${post._count?.likes || 0} likes • ${post._count?.comments || 0} comments`,
        date: new Date(post.createdAt),
        type: 'discussion' as const,
      }))
      setDiscussionCards(cards)
    }

    if (projects.length > 0) {
      // Filter projects based on projectFilter
      let filteredProjects = [...projects]
      if (projectFilter === 'created') {
        filteredProjects = projects.filter(p => p.creatorId === session?.user?.id)
      } else if (projectFilter === 'joined') {
        filteredProjects = projects.filter(p => p.creatorId !== session?.user?.id)
      }

      const cards = filteredProjects.map(project => ({
        id: project.id,
        title: project.name,
        subtitle: project.status,
        date: new Date(project.createdAt),
        type: 'project' as const,
        slug: project.slug,
        isOwner: project.creatorId === session?.user?.id,
      }))
      setProjectCards(cards as any)
    }
  }, [feedPosts, projects, discussionFilter, projectFilter, session?.user?.id])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          const userProjects = data.data.filter(
            (p: any) =>
              p.members.some((m: any) => m.userId === session?.user?.id) ||
              p.creatorId === session?.user?.id
          )
          setProjects(userProjects)
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchArticles = async () => {
    try {
      // Fetch user's own articles (including drafts) using mine=true
      const res = await fetch('/api/articles?mine=true&limit=50')
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.data) {
          setArticles(data.data)
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  const fetchFeedPosts = async () => {
    try {
      const res = await fetch('/api/social/feed?limit=50')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          // Filter to only show user's own posts
          const userPosts = data.data.posts.filter((post: any) => post.userId === session?.user?.id)
          setFeedPosts(userPosts)
        }
      }
    } catch (error) {
      console.error('Error fetching feed posts:', error)
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user?.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) setUserProfile(data.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchNetworkSuggestions = async () => {
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
  }

  const fetchFollowing = async () => {
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
  }

  const fetchLearningModules = async () => {
    try {
      const filterParam = learningFilter !== 'all' ? `?filter=${learningFilter === 'in_progress' ? 'in_progress' : 'completed'}` : ''
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
  }

  const addNewCard = (column: 'discussion' | 'learning' | 'project') => {
    const newCard: DeckCard = {
      id: `new-${Date.now()}`,
      title: `New ${column}`,
      subtitle: 'Just created',
      date: new Date(),
      type: column,
    }

    switch (column) {
      case 'discussion':
        setDiscussionCards(prev => [newCard, ...prev])
        break
      case 'learning':
        setLearningCards(prev => [newCard, ...prev])
        break
      case 'project':
        setProjectCards(prev => [newCard, ...prev])
        break
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return

    setIsDeleting(true)
    try {
      let endpoint = ''
      if (deleteModal.type === 'discussion') {
        endpoint = `/api/social/post/${deleteModal.id}`
      } else if (deleteModal.type === 'project') {
        endpoint = `/api/projects/${deleteModal.id}`
      }

      const res = await fetch(endpoint, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        // Refresh data
        if (deleteModal.type === 'discussion') {
          setFeedPosts(prev => prev.filter(p => p.id !== deleteModal.id))
        } else if (deleteModal.type === 'project') {
          setProjects(prev => prev.filter(p => p.id !== deleteModal.id))
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

  const handleEditDiscussion = (id: string) => {
    router.push(`/community/discussions/${id}?edit=true`)
  }

  const handleEditProject = (slug: string) => {
    router.push(`/community/projects/${slug}?edit=true`)
  }


  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading Your Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  return (
    <div className="h-screen overflow-hidden bg-[var(--background)] hide-footer">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[var(--primary)]/95 via-[var(--accent)]/95 to-[var(--secondary)]/95 backdrop-blur-sm border-b-2 border-theme-primary">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-white" />
              <div>
                <h1 className="text-xl font-black text-white">YOUR VOLITION</h1>
                <p className="text-[9px] font-medium text-white/50 italic mt-0.5">
                  Track your contributions to Project Exodus. They are YOUR STOCK of the P.E. system.
                </p>
                <p className="text-[8px] font-medium text-white/40 flex items-center gap-1 mt-1">
                  <GripVertical className="w-3 h-3" /> Drag widgets to reorganize your dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deck Columns Container */}
      <div className="relative h-[calc(100vh-100px)] overflow-hidden">
        <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                <div className="h-full flex gap-4 p-6 overflow-x-auto overflow-y-visible">
                  {/* Render columns in saved order */}
                  {columnOrder.map((columnId) => {
                    switch (columnId) {
                      case 'profile':
                        return (
                          <DraggableColumn key={columnId} id="profile">
                            <IdentityDeclarationEditor
                              initialProfile={{
                                name: userProfile?.name || user?.name || '',
                                headline: userProfile?.headline || '',
                                location: userProfile?.location || '',
                                email: userProfile?.email || user?.email || '',
                                phone: userProfile?.phone || '',
                                bio: userProfile?.bio || '',
                                skills: userProfile?.skills || [],
                                experience: userProfile?.experience || [],
                                education: userProfile?.education || [],
                                social: userProfile?.social || {},
                                portfolio: userProfile?.portfolio || [],
                                achievements: userProfile?.achievements || [],
                                resumeUrl: userProfile?.resumeUrl,
                                resumeFileName: userProfile?.resumeFileName,
                              }}
                            />
                          </DraggableColumn>
                        )

                      case 'discussions':
                        return (
                          <DraggableColumn key={columnId} id="discussions">
              <div className="flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg">
                <div className="p-3 border-b border-[var(--border)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-theme-primary" />
                      <h2 className="text-[8px] font-black text-[var(--foreground)] whitespace-nowrap">MY FEED POSTS</h2>
                    </div>
                    <Link href="/community/feed">
                      <button className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                  {/* Filter Buttons */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setDiscussionFilter('recent')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        discussionFilter === 'recent'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setDiscussionFilter('oldest')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        discussionFilter === 'oldest'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Oldest
                    </button>
                    <button
                      onClick={() => setDiscussionFilter('popular')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        discussionFilter === 'popular'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Popular
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-visible p-2 space-y-1.5">
                  {discussionCards.map(card => (
                    <div key={card.id} className="relative group">
                      <Link href={`/community/discussions/${card.id}`}>
                        <div className="p-2 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-theme-primary rounded cursor-pointer hover:shadow-sm transition-all">
                          <h3 className="text-[11px] font-bold text-[var(--foreground)] line-clamp-1 pr-8">
                            {card.title}
                          </h3>
                          {card.subtitle && (
                            <p className="text-[9px] font-medium text-theme-muted line-clamp-1">{card.subtitle}</p>
                          )}
                          {card.date && (
                            <p className="text-[9px] font-bold text-theme-muted opacity-70">
                              {card.date.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </Link>
                      {/* Owner actions - always show for user's own posts */}
                      <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleEditDiscussion(card.id)
                          }}
                          className="w-5 h-5 bg-[var(--primary)] text-white rounded hover:bg-[var(--accent)] transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit2 className="w-2.5 h-2.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDeleteModal({
                              isOpen: true,
                              type: 'discussion',
                              id: card.id,
                              title: 'Delete Discussion'
                            })
                          }}
                          className="w-5 h-5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {discussionCards.length === 0 && (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">No posts yet</p>
                      <Link href="/community/feed">
                        <button className="mt-3 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--accent)] transition-colors">
                          Create Post
                        </button>
                      </Link>
                    </div>
                  )}
                              </div>
                            </div>
                          </DraggableColumn>
                        )

                      case 'learning':
                        return (
                          <DraggableColumn key={columnId} id="learning">
                            <div className="flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg">
                <div className="p-3 border-b border-[var(--border)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-theme-accent" />
                      <h2 className="text-[8px] font-black text-[var(--foreground)] whitespace-nowrap">MY LEARNING</h2>
                    </div>
                    <Link href="/learn">
                      <button className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                  {/* Filter Buttons */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setLearningFilter('all')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        learningFilter === 'all'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setLearningFilter('in_progress')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        learningFilter === 'in_progress'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setLearningFilter('completed')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        learningFilter === 'completed'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-visible p-2 space-y-1.5">
                  {learningModules.map((module) => (
                    <Link key={module.id} href={`/learn/${module.article.slug}`}>
                      <div className="p-2 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-theme-accent rounded cursor-pointer hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between">
                          <h3 className="text-[11px] font-bold text-[var(--foreground)] line-clamp-1 flex-1 pr-2">
                            {module.article.title}
                          </h3>
                          {module.status === 'COMPLETED' && (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          )}
                        </div>

                        {/* Progress Bar for Large Modules */}
                        {module.article.moduleType === 'LARGE' && module.status === 'IN_PROGRESS' && (
                          <div className="mt-1">
                            <div className="h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] transition-all"
                                style={{ width: `${module.progressPercentage}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Module Info */}
                        <div className="flex items-center gap-1 mt-0.5">
                          {module.article.moduleType === 'LARGE' && (
                            <span className="text-[8px] font-bold text-theme-accent">{module.progressPercentage}%</span>
                          )}
                          {module.article.estimatedTime && (
                            <span className="text-[8px] font-medium text-theme-muted">
                              {module.article.estimatedTime}m
                            </span>
                          )}
                        </div>

                        {/* Quiz Status for Large Modules */}
                        {module.article.moduleType === 'LARGE' && module.quizAttempts > 0 && !module.quizPassed && (
                          <div className="mt-2 text-[10px] font-semibold text-orange-600">
                            Quiz attempts: {module.quizAttempts} - Score: {module.quizScore}/5
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                  {learningModules.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">
                        {learningFilter === 'completed'
                          ? 'No completed modules yet'
                          : learningFilter === 'in_progress'
                          ? 'No modules in progress'
                          : 'Start learning!'}
                      </p>
                      <Link href="/learn#featured-modules">
                        <button className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)] transition-colors">
                          Browse Modules
                        </button>
                      </Link>
                    </div>
                  )}
                              </div>
                            </div>
                          </DraggableColumn>
                        )

                      case 'projects':
                        return (
                          <DraggableColumn key={columnId} id="projects">
                            <div className="flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-secondary shadow-lg">
                <div className="p-3 border-b border-[var(--border)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-theme-secondary" />
                      <h2 className="text-[8px] font-black text-[var(--foreground)] whitespace-nowrap">MY PROJECTS</h2>
                    </div>
                    <Link href="/community/projects/new">
                      <button className="w-6 h-6 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                  {/* Filter Buttons */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setProjectFilter('all')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        projectFilter === 'all'
                          ? 'bg-[var(--secondary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]/20'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setProjectFilter('created')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        projectFilter === 'created'
                          ? 'bg-[var(--secondary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]/20'
                      }`}
                    >
                      Mine
                    </button>
                    <button
                      onClick={() => setProjectFilter('joined')}
                      className={`flex-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                        projectFilter === 'joined'
                          ? 'bg-[var(--secondary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]/20'
                      }`}
                    >
                      Joined
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-visible p-2 space-y-1.5">
                  {projectCards.map(card => (
                    <div key={card.id} className="relative group">
                      <Link href={`/community/projects/${card.slug}`}>
                        <div className="p-2 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent border border-theme-secondary rounded cursor-pointer hover:shadow-sm transition-all">
                          <div className="flex items-start justify-between">
                            <h3 className="text-[11px] font-bold text-[var(--foreground)] line-clamp-1 pr-5">
                              {card.title}
                            </h3>
                            {card.isOwner && (
                              <span className="text-[7px] font-black px-0.5 bg-[var(--secondary)] text-white rounded">
                                ★
                              </span>
                            )}
                          </div>
                          {card.date && (
                            <p className="text-[8px] font-medium text-theme-muted">
                              {card.date.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </Link>
                      {/* Only show edit/delete for owner */}
                      {card.isOwner && (
                        <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleEditProject(card.slug || '')
                            }}
                            className="w-5 h-5 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                            title="Edit"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setDeleteModal({
                                isOpen: true,
                                type: 'project',
                                id: card.id,
                                title: 'Delete Project'
                              })
                            }}
                            className="w-5 h-5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                            title="Delete"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {projectCards.length === 0 && (
                    <div className="text-center py-12">
                      <Briefcase className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">No projects yet</p>
                      <Link href="/community/projects/new">
                        <button className="mt-3 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)] transition-colors">
                          Create One
                        </button>
                      </Link>
                    </div>
                  )}
                              </div>
                            </div>
                          </DraggableColumn>
                        )

                      case 'network':
                        return (
                          <DraggableColumn key={columnId} id="network">
                            <div className="flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg overflow-hidden">
                              <div className="p-3 border-b border-[var(--border)]">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-theme-primary flex-shrink-0" />
                                    <h2 className="text-[8px] font-black text-[var(--foreground)] whitespace-nowrap">MY CONNECTIONS</h2>
                                  </div>
                                  <Link href="/network/browse">
                                    <button className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors flex-shrink-0" title="Browse Network">
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </Link>
                                </div>
                                {/* Filter-style Messages Button */}
                                <div className="flex gap-1.5">
                                  <Link href="/messages" className="flex-1">
                                    <button className="w-full px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white flex items-center justify-center gap-1">
                                      <Mail className="w-3 h-3" />
                                      Messages
                                    </button>
                                  </Link>
                                </div>
                              </div>
                              <div className="flex-1 overflow-y-auto scrollbar-visible p-2 space-y-2">
                                {/* Recent Followers */}
                                {following.length > 0 && (
                                  <div className="mb-2">
                                    <h3 className="text-[9px] font-black text-[var(--foreground)] mb-1.5">Recent</h3>
                                    <div className="space-y-1">
                                      {following.slice(0, 3).map((user: any) => (
                                        <Link key={user.id} href={`/profile/${user.id}`}>
                                          <div className="flex items-center gap-1.5 p-1.5 bg-[var(--muted)]/50 rounded hover:bg-[var(--muted)] transition-colors cursor-pointer">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                              {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                              ) : (
                                                <User className="w-3 h-3 text-white" />
                                              )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-xs font-black text-[var(--foreground)] truncate">{user.name || 'Anonymous'}</p>
                                              <p className="text-[10px] font-medium text-theme-muted truncate">{user.bio || 'Member'}</p>
                                            </div>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Suggested Connections */}
                                <div>
                                  <h3 className="text-xs font-black text-[var(--foreground)] mb-2">Suggested</h3>
                                  <div className="space-y-2">
                                    {networkSuggestions.length > 0 ? (
                                      networkSuggestions.map((user: any) => (
                                        <div key={user.id} className="p-2 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-theme-primary rounded-lg hover:shadow-md transition-all">
                                          <div className="flex items-center gap-2 mb-1.5">
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                              {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                              ) : (
                                                <User className="w-3.5 h-3.5 text-white" />
                                              )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-[11px] font-black text-[var(--foreground)] truncate">{user.name || 'Anonymous'}</p>
                                              <p className="text-[9px] font-medium text-theme-muted truncate">{user.headline || 'Member'}</p>
                                            </div>
                                          </div>
                                          {user.matchReasons && user.matchReasons.length > 0 && (
                                            <p className="text-[8px] font-medium text-theme-muted mb-1.5 line-clamp-1">
                                              {user.matchReasons[0]}
                                            </p>
                                          )}
                                          <Link href={`/profile/${user.id}`} className="block">
                                            <button className="w-full py-1 px-2 bg-[var(--primary)] text-white rounded text-[9px] font-bold hover:bg-[var(--accent)] transition-colors">
                                              Connect
                                            </button>
                                          </Link>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-xs font-medium text-theme-muted text-center py-4">No suggestions available</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DraggableColumn>
                        )

                      case 'articles':
                        return (
                          <DraggableColumn key={columnId} id="articles">
                            <div className="flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg">
                <div className="p-3 border-b border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-theme-accent" />
                    <h2 className="text-[8px] font-black text-[var(--foreground)] whitespace-nowrap">MY ARTICLES</h2>
                  </div>
                  <Link href="/articles/write">
                    <button className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-visible p-2 space-y-1.5">
                  {articles.length > 0 ? (
                    articles.map((article: any) => (
                      <div key={article.id} className="relative group">
                        <Link href={`/articles/${article.slug}`}>
                          <div className="p-2 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-theme-accent rounded cursor-pointer hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="text-[11px] font-bold text-[var(--foreground)] line-clamp-1 pr-8">
                                {article.title}
                              </h3>
                              {article.status === 'DRAFT' && (
                                <span className="text-[7px] font-black px-1 py-0.5 bg-amber-500/20 text-amber-600 rounded flex-shrink-0">
                                  DRAFT
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-[8px] font-medium text-theme-muted">
                              <span>{article._count?.comments || 0} comments • {article.views || 0} views</span>
                              {article.createdAt && (
                                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                        <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/articles/${article.slug}/edit`}>
                            <button
                              className="w-5 h-5 bg-[var(--accent)] text-white rounded hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                              title="Edit"
                            >
                              <Edit2 className="w-2.5 h-2.5" />
                            </button>
                          </Link>
                          <button
                            onClick={async (e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (confirm('Are you sure you want to delete this article? This cannot be undone.')) {
                                try {
                                  const res = await fetch(`/api/articles/${article.id}`, { method: 'DELETE' })
                                  if (res.ok) {
                                    setArticles(articles.filter((a: any) => a.id !== article.id))
                                  } else {
                                    alert('Failed to delete article')
                                  }
                                } catch (error) {
                                  alert('Error deleting article')
                                }
                              }
                            }}
                            className="w-5 h-5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                            title="Delete"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">No articles yet</p>
                      <Link href="/articles/write">
                        <button className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)] transition-colors">
                          Write One
                        </button>
                      </Link>
                    </div>
                  )}
                              </div>
                            </div>
                          </DraggableColumn>
                        )

                      default:
                        return null
                    }
                  })}
                </div>
              </SortableContext>
        </DndContext>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, title: '' })}
        onConfirm={handleDelete}
        title={deleteModal.title}
        description={
          deleteModal.type === 'discussion'
            ? 'This will permanently delete this discussion and all its comments.'
            : 'This will permanently delete this project and remove all members.'
        }
        isLoading={isDeleting}
      />
    </div>
  )
}
