'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import {
  User,
  Settings,
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
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ProfileColumn } from '@/components/profile/ProfileColumn'
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
  const [currentPage, setCurrentPage] = useState(0)
  const [projects, setProjects] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [messageContent, setMessageContent] = useState('')
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [discussionFilter, setDiscussionFilter] = useState<'recent' | 'oldest' | 'popular'>('recent')
  const [networkSuggestions, setNetworkSuggestions] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])

  // Deck columns data
  const [discussionCards, setDiscussionCards] = useState<DeckCard[]>([])
  const [learningCards, setLearningCards] = useState<DeckCard[]>([])
  const [projectCards, setProjectCards] = useState<DeckCard[]>([])

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
        fetchContacts(),
        fetchNetworkSuggestions(),
        fetchFollowing(),
      ]).finally(() => setIsLoading(false))
    }
  }, [session?.user?.id])

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

    if (articles.length > 0) {
      const cards: DeckCard[] = articles.map(article => ({
        id: article.id,
        title: article.title,
        subtitle: `${article._count?.comments || 0} comments`,
        date: new Date(article.createdAt),
        type: 'learning' as const,
      }))
      setLearningCards(cards)
    }

    if (projects.length > 0) {
      const cards: DeckCard[] = projects.map(project => ({
        id: project.id,
        title: project.name,
        subtitle: project.status,
        date: new Date(project.createdAt),
        type: 'project' as const,
      }))
      setProjectCards(cards)
    }
  }, [feedPosts, articles, projects, discussionFilter])

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
      const res = await fetch(`/api/users/${session?.user?.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.data.articles) {
          setArticles(data.data.articles)
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

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setContacts(data.data.filter((u: any) => u.id !== session?.user?.id).slice(0, 20))
        }
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
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

  const goToPage = (page: number) => {
    setCurrentPage(page)
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
                <p className="text-xs font-medium text-white/70">
                  {currentPage === 0 ? 'Your Deck' : 'Network & Messages'}
                </p>
                <p className="text-[9px] font-medium text-white/50 italic mt-0.5">
                  Track your contributions to Project Exodus. They are YOUR STOCK of the P.E. system.
                </p>
              </div>
            </div>

            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(0)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentPage === 0 ? 'bg-white text-[var(--primary)]' : 'bg-white/20 text-white'
                }`}
              >
                1
              </button>
              <button
                onClick={() => goToPage(1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentPage === 1 ? 'bg-white text-[var(--primary)]' : 'bg-white/20 text-white'
                }`}
              >
                2
              </button>
            </div>

            <Link href="/settings">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                SETTINGS
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Pages Container */}
      <div className="relative h-[calc(100vh-100px)] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {/* PAGE 1: DECK COLUMNS */}
          <div className="w-full h-full flex-shrink-0 overflow-hidden">
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
                  {/* Profile Column */}
                  <DraggableColumn id="profile">
                    <ProfileColumn
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

              {/* Discussions Column */}
                  <DraggableColumn id="discussions">
              <div className="flex-shrink-0 w-80 min-h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg">
                <div className="p-4 border-b border-[var(--border)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-theme-primary" />
                      <h2 className="text-sm font-black text-[var(--foreground)]">YOUR FEED POSTS</h2>
                    </div>
                    <Link href="/community/feed">
                      <button className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                  {/* Filter Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDiscussionFilter('recent')}
                      className={`flex-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        discussionFilter === 'recent'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setDiscussionFilter('oldest')}
                      className={`flex-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        discussionFilter === 'oldest'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Oldest
                    </button>
                    <button
                      onClick={() => setDiscussionFilter('popular')}
                      className={`flex-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        discussionFilter === 'popular'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Popular
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {discussionCards.map(card => (
                    <div key={card.id} className="relative group">
                      <Link href="/community/feed">
                        <div className="p-4 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border-2 border-theme-primary rounded-xl cursor-pointer hover:shadow-lg transition-all">
                          <h3 className="text-sm font-black text-[var(--foreground)] mb-1 line-clamp-2 pr-12">
                            {card.title}
                          </h3>
                          {card.subtitle && (
                            <p className="text-xs font-medium text-theme-muted mb-2">{card.subtitle}</p>
                          )}
                          {card.date && (
                            <p className="text-[10px] font-bold text-theme-muted opacity-70">
                              {card.date.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </Link>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            alert('Edit post: ' + card.id)
                          }}
                          className="w-7 h-7 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--accent)] transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (confirm('Delete this post?')) {
                              alert('Delete post: ' + card.id)
                            }
                          }}
                          className="w-7 h-7 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <X className="w-3 h-3" />
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

              {/* Learning Column */}
                  <DraggableColumn id="learning">
              <div className="flex-shrink-0 w-80 min-h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg">
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-theme-accent" />
                    <h2 className="text-sm font-black text-[var(--foreground)]">YOUR LEARNING</h2>
                  </div>
                  <button
                    onClick={() => addNewCard('learning')}
                    className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {learningCards.map(card => (
                    <div key={card.id} className="relative group">
                      <div className="p-4 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border-2 border-theme-accent rounded-xl cursor-pointer hover:shadow-lg transition-all">
                        <h3 className="text-sm font-black text-[var(--foreground)] mb-1 line-clamp-2 pr-12">
                          {card.title}
                        </h3>
                        {card.subtitle && (
                          <p className="text-xs font-medium text-theme-muted mb-2">{card.subtitle}</p>
                        )}
                        {card.date && (
                          <p className="text-[10px] font-bold text-theme-muted opacity-70">
                            {card.date.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            alert('Edit learning: ' + card.id)
                          }}
                          className="w-7 h-7 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (confirm('Delete this learning item?')) {
                              alert('Delete learning: ' + card.id)
                            }
                          }}
                          className="w-7 h-7 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {learningCards.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">No learning items yet</p>
                      <button
                        onClick={() => addNewCard('learning')}
                        className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)] transition-colors"
                      >
                        Add One
                      </button>
                    </div>
                  )}
                </div>
              </div>
                  </DraggableColumn>

              {/* Projects Column */}
                  <DraggableColumn id="projects">
              <div className="flex-shrink-0 w-80 min-h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-secondary shadow-lg">
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-theme-secondary" />
                    <h2 className="text-sm font-black text-[var(--foreground)]">YOUR PROJECTS</h2>
                  </div>
                  <button
                    onClick={() => addNewCard('project')}
                    className="w-7 h-7 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {projectCards.map(card => (
                    <div key={card.id} className="relative group">
                      <div className="p-4 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent border-2 border-theme-secondary rounded-xl cursor-pointer hover:shadow-lg transition-all">
                        <h3 className="text-sm font-black text-[var(--foreground)] mb-1 line-clamp-2 pr-12">
                          {card.title}
                        </h3>
                        {card.subtitle && (
                          <p className="text-xs font-medium text-theme-muted mb-2">{card.subtitle}</p>
                        )}
                        {card.date && (
                          <p className="text-[10px] font-bold text-theme-muted opacity-70">
                            {card.date.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            alert('Edit project: ' + card.id)
                          }}
                          className="w-7 h-7 bg-[var(--secondary)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (confirm('Delete this project?')) {
                              alert('Delete project: ' + card.id)
                            }
                          }}
                          className="w-7 h-7 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
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

              {/* Network Highlights Column */}
                  <DraggableColumn id="network">
              <div className="flex-shrink-0 w-80 min-h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg">
                <div className="p-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-theme-primary" />
                    <h2 className="text-sm font-black text-[var(--foreground)]">NETWORK HIGHLIGHTS</h2>
                  </div>
                  <p className="text-[9px] font-medium text-theme-muted">Suggested connections & recent followers</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {/* Recent Followers */}
                  {following.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-black text-[var(--foreground)] mb-2">Recent Connections</h3>
                      <div className="space-y-2">
                        {following.slice(0, 3).map((user: any) => (
                          <div key={user.id} className="flex items-center gap-2 p-2 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                              {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                              ) : (
                                <User className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-black text-[var(--foreground)] truncate">{user.name || 'Anonymous'}</p>
                              <p className="text-[10px] font-medium text-theme-muted truncate">{user.bio || 'Member'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Connections */}
                  <div>
                    <h3 className="text-xs font-black text-[var(--foreground)] mb-2">Suggested Connections</h3>
                    <div className="space-y-2">
                      {networkSuggestions.length > 0 ? (
                        networkSuggestions.map((user: any) => (
                          <div key={user.id} className="p-3 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border-2 border-theme-primary rounded-xl hover:shadow-lg transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                {user.image ? (
                                  <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                  <User className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-[var(--foreground)] truncate">{user.name || 'Anonymous'}</p>
                                <p className="text-[10px] font-medium text-theme-muted truncate">{user.headline || 'Member'}</p>
                              </div>
                            </div>
                            {user.matchReasons && user.matchReasons.length > 0 && (
                              <p className="text-[9px] font-medium text-theme-muted mb-2 line-clamp-2">
                                {user.matchReasons[0]}
                              </p>
                            )}
                            <button className="w-full py-1.5 px-3 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold hover:bg-[var(--accent)] transition-colors">
                              Connect
                            </button>
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

              {/* My Articles Column */}
                  <DraggableColumn id="articles">
              <div className="flex-shrink-0 w-80 min-h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg">
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-theme-accent" />
                    <h2 className="text-sm font-black text-[var(--foreground)]">YOUR ARTICLES</h2>
                  </div>
                  <button
                    onClick={() => alert('Create new article')}
                    className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {articles.length > 0 ? (
                    articles.map((article: any) => (
                      <div key={article.id} className="relative group">
                        <div className="p-4 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border-2 border-theme-accent rounded-xl cursor-pointer hover:shadow-lg transition-all">
                          <h3 className="text-sm font-black text-[var(--foreground)] mb-1 line-clamp-2 pr-12">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-xs font-medium text-theme-muted mb-2 line-clamp-2">{article.excerpt}</p>
                          )}
                          <div className="flex items-center justify-between text-[10px] font-bold text-theme-muted">
                            <span>{article._count?.comments || 0} comments</span>
                            {article.createdAt && (
                              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              alert('Edit article: ' + article.id)
                            }}
                            className="w-7 h-7 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                            title="Edit"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (confirm('Delete this article?')) {
                                alert('Delete article: ' + article.id)
                              }
                            }}
                            className="w-7 h-7 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                            title="Delete"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">No articles yet</p>
                      <button
                        onClick={() => alert('Create new article')}
                        className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)] transition-colors"
                      >
                        Write One
                      </button>
                    </div>
                  )}
                </div>
              </div>
                  </DraggableColumn>
                </div>
              </SortableContext>
            </DndContext>

            {/* Navigation Arrow - Right */}
            <button
              onClick={() => goToPage(1)}
              className="fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all z-40"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* PAGE 2: NETWORK & MESSENGER */}
          <div className="w-full h-full flex-shrink-0 overflow-hidden">
            <div className="h-full flex gap-4 p-6">
              {/* Network/Contacts Column */}
              <div className="w-1/3 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg overflow-hidden">
                <div className="p-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-theme-primary" />
                    <h2 className="text-sm font-black text-[var(--foreground)]">NETWORK</h2>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-full pl-10 pr-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--foreground)] placeholder-theme-muted focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {contacts.map(contact => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`w-full p-4 border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors text-left ${
                        selectedContact?.id === contact.id ? 'bg-[var(--primary)]/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          {contact.image ? (
                            <img
                              src={contact.image}
                              alt={contact.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-[var(--foreground)] truncate">
                            {contact.name || 'Anonymous'}
                          </p>
                          <p className="text-xs font-medium text-theme-muted truncate">
                            {contact.headline || 'Member'}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messenger Column */}
              <div className="flex-1 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg overflow-hidden">
                {selectedContact ? (
                  <>
                    {/* Messenger Header */}
                    <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                          {selectedContact.image ? (
                            <img
                              src={selectedContact.image}
                              alt={selectedContact.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-[var(--foreground)]">
                            {selectedContact.name || 'Anonymous'}
                          </p>
                          <p className="text-xs font-medium text-theme-muted">Active now</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full hover:bg-[var(--muted)] flex items-center justify-center transition-colors">
                        <MoreVertical className="w-5 h-5 text-theme-muted" />
                      </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="text-center">
                        <p className="text-xs font-bold text-theme-muted">
                          Start a conversation with {selectedContact.name}
                        </p>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-[var(--border)]">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--foreground)] placeholder-theme-muted focus:outline-none focus:border-theme-primary"
                        />
                        <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg font-bold text-sm hover:bg-[var(--accent)] transition-colors flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <User className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                      <p className="text-sm font-bold text-theme-muted">Select a contact to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Arrow - Left */}
            <button
              onClick={() => goToPage(0)}
              className="fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all z-40"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
