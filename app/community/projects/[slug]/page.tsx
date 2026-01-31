'use client'

import { BackButton } from '@/components/navigation/BackButton'
import { useState, useEffect, useRef, use, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import TeamCollaborationVisualization from '@/components/projects/TeamCollaborationVisualization'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'
import { MemberBadges, BadgeGrid } from '@/components/projects/members/MemberBadges'
import ProjectSage from '@/components/projects/ai/ProjectSage'
import {
  ArrowLeft,
  Users,
  Target,
  Calendar,
  MessageSquare,
  Send,
  Settings as SettingsIcon,
  Shield,
  Crown,
  User,
  Network,
  Pencil,
  Trash2,
  X,
  Save,
  BookOpen,
  FlaskConical,
  Award,
  Layers,
  Bell,
  ChevronRight,
  CheckCircle,
  Clock,
  Play,
  FileText,
  ExternalLink,
  Plus,
  Loader2,
  Sparkles,
  TrendingUp,
  Lock,
  Unlock,
  Brain,
  File,
} from 'lucide-react'
import Link from 'next/link'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import { DocumentTemplateSelector } from '@/components/documents/DocumentTemplateSelector'
import type { DocumentTemplate } from '@/data/document-templates'

type TabType = 'overview' | 'learning' | 'research' | 'discussions' | 'members' | 'mindmaps' | 'documents' | 'settings'

interface LearningModule {
  id: string
  title: string
  description: string
  order: number
  contentType: string
  userProgress?: {
    completedAt: Date | null
    progress: number
  } | null
}

interface ResearchPost {
  id: string
  heading: string
  summary: string
  tags: string[]
  isPinned: boolean
  viewCount: number
  author: {
    id: string
    name: string
    image?: string
  }
  _count: {
    comments: number
  }
  createdAt: string
}

interface Subgroup {
  id: string
  name: string
  description: string
  memberLimit: number | null
  _count: {
    members: number
  }
  userMembership?: {
    role: string
  } | null
}

interface MemberWithBadges {
  id: string
  userId: string
  role: string
  contributionScore: number | null
  user: {
    id: string
    name: string
    image?: string
  }
  recognitions: Array<{ badge: string }>
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [project, setProject] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasInteractedWithChat, setHasInteractedWithChat] = useState(false)

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  // New feature states
  const [learningModules, setLearningModules] = useState<LearningModule[]>([])
  const [researchPosts, setResearchPosts] = useState<ResearchPost[]>([])
  const [subgroups, setSubgroups] = useState<Subgroup[]>([])
  const [membersWithBadges, setMembersWithBadges] = useState<MemberWithBadges[]>([])
  const [mindMapData, setMindMapData] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [loadingModules, setLoadingModules] = useState(false)
  const [loadingResearch, setLoadingResearch] = useState(false)
  const [loadingSubgroups, setLoadingSubgroups] = useState(false)
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [loadingMindMap, setLoadingMindMap] = useState(false)
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

  // Sage visibility
  const [showSage, setShowSage] = useState(false)

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [editedGoal, setEditedGoal] = useState('')
  const [editedStatus, setEditedStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects`)
      const data = await res.json()
      if (data.success) {
        const proj = data.data.find((p: any) => p.slug === slug)
        setProject(proj)
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  const fetchMessages = useCallback(async () => {
    if (!project?.id) return
    try {
      const res = await fetch(`/api/projects/${project.id}/messages`)
      const data = await res.json()
      if (data.success) {
        setMessages(data.data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }, [project?.id])

  const fetchLearningModules = useCallback(async () => {
    if (!project?.id) return
    setLoadingModules(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/learning`)
      const data = await res.json()
      if (data.success) {
        setLearningModules(data.data)
      }
    } catch (error) {
      console.error('Error fetching learning modules:', error)
    } finally {
      setLoadingModules(false)
    }
  }, [project?.id])

  const fetchResearchPosts = useCallback(async () => {
    if (!project?.id) return
    setLoadingResearch(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/research`)
      const data = await res.json()
      if (data.success) {
        setResearchPosts(data.data)
      }
    } catch (error) {
      console.error('Error fetching research:', error)
    } finally {
      setLoadingResearch(false)
    }
  }, [project?.id])

  const fetchSubgroups = useCallback(async () => {
    if (!project?.id) return
    setLoadingSubgroups(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/subgroups`)
      const data = await res.json()
      if (data.success) {
        setSubgroups(data.data)
      }
    } catch (error) {
      console.error('Error fetching subgroups:', error)
    } finally {
      setLoadingSubgroups(false)
    }
  }, [project?.id])

  const fetchMembersWithBadges = useCallback(async () => {
    if (!project?.id) return
    setLoadingMembers(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/members?include=badges`)
      const data = await res.json()
      if (data.success) {
        setMembersWithBadges(data.data)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoadingMembers(false)
    }
  }, [project?.id])

  const fetchMindMap = useCallback(async () => {
    if (!project?.mindMapId) return
    setLoadingMindMap(true)
    try {
      const res = await fetch(`/api/mindmaps/${project.mindMapId}`)
      const data = await res.json()
      if (data.success) {
        setMindMapData(data.data)
      }
    } catch (error) {
      console.error('Error fetching mind map:', error)
    } finally {
      setLoadingMindMap(false)
    }
  }, [project?.mindMapId])

  const fetchDocuments = useCallback(async () => {
    if (!project?.id) return
    setLoadingDocuments(true)
    try {
      const res = await fetch(`/api/documents?projectId=${project.id}`)
      const data = await res.json()
      if (data.success) {
        setDocuments(data.data)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoadingDocuments(false)
    }
  }, [project?.id])

  const handleCreateDocument = useCallback(async (template: DocumentTemplate, customTitle?: string) => {
    if (!project?.id) return

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          title: customTitle || template.name,
          description: template.description,
          content: template.content,
          type: template.type,
          status: 'DRAFT',
        }),
      })

      const data = await res.json()
      if (data.success) {
        // Refresh documents list
        await fetchDocuments()
        // Navigate to the new document
        router.push(`/community/projects/${slug}/documents/${data.data.id}`)
      } else {
        throw new Error(data.error || 'Failed to create document')
      }
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Failed to create document. Please try again.')
      throw error
    }
  }, [project?.id, slug, router, fetchDocuments])

  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  useEffect(() => {
    if (project?.id) {
      fetchMessages()
      // Poll for new messages every 5 seconds
      const interval = setInterval(fetchMessages, 5000)
      return () => clearInterval(interval)
    }
  }, [project?.id, fetchMessages])

  // Load tab-specific data
  useEffect(() => {
    if (!project?.id) return

    if (activeTab === 'learning') {
      fetchLearningModules()
    } else if (activeTab === 'research') {
      fetchResearchPosts()
    } else if (activeTab === 'members') {
      fetchMembersWithBadges()
      fetchSubgroups()
    } else if (activeTab === 'mindmaps') {
      fetchMindMap()
    } else if (activeTab === 'documents') {
      fetchDocuments()
    } else if (activeTab === 'overview') {
      // Load summary data for overview
      fetchSubgroups()
      fetchLearningModules()
    }
  }, [activeTab, project?.id, fetchLearningModules, fetchResearchPosts, fetchSubgroups, fetchMembersWithBadges, fetchMindMap, fetchDocuments])

  useEffect(() => {
    // Only auto-scroll if user has interacted with the chat
    if (hasInteractedWithChat) {
      scrollToBottom()
    }
  }, [messages, hasInteractedWithChat])

  // Check for edit mode from URL and initialize edit values
  useEffect(() => {
    if (project && session?.user?.id === project.creatorId) {
      const editParam = searchParams.get('edit')
      if (editParam === 'true') {
        setIsEditing(true)
        setEditedName(project.name || '')
        setEditedDescription(project.description || '')
        setEditedGoal(project.goal || '')
        setEditedStatus(project.status || 'PLANNING')
      }
    }
  }, [project, session?.user?.id, searchParams])

  const startEditing = () => {
    if (project) {
      setEditedName(project.name || '')
      setEditedDescription(project.description || '')
      setEditedGoal(project.goal || '')
      setEditedStatus(project.status || 'PLANNING')
      setIsEditing(true)
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    // Remove edit param from URL
    router.replace(`/community/projects/${slug}`)
  }

  const saveChanges = async () => {
    if (!project?.id) return
    setIsSaving(true)
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedName,
          description: editedDescription,
          goal: editedGoal,
          status: editedStatus,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setProject((prev: any) => ({
          ...prev,
          name: editedName,
          description: editedDescription,
          goal: editedGoal,
          status: editedStatus,
        }))
        setIsEditing(false)
        router.replace(`/community/projects/${slug}`)
      } else {
        alert(data.error || 'Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!project?.id) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (data.success) {
        router.push('/community/projects')
      } else {
        alert(data.error || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setHasInteractedWithChat(true)
    setIsSending(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      })

      const data = await res.json()
      if (data.success) {
        setNewMessage('')
        fetchMessages()
      } else {
        alert(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="border-4 border-theme-secondary">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-black mb-4 text-theme-muted">PROJECT NOT FOUND</h2>
            <p className="text-lg font-semibold mb-8 text-theme-muted">
              This project doesn't exist or has been removed.
            </p>
            <Link href="/community/projects">
              <Button className="font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO PROJECTS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusColors = {
    ACTIVE: { bg: 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]', text: 'text-theme-primary' },
    COMPLETED: { bg: 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]', text: 'text-theme-accent' },
    PLANNING: { bg: 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]', text: 'text-theme-secondary' },
  }

  const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING
  const isMember = project.members?.some((m: any) => m.userId === session?.user?.id)
  const isCreator = project.creatorId === session?.user?.id
  const userMembership = project.members?.find((m: any) => m.userId === session?.user?.id)

  const getRoleBadge = (member: any) => {
    if (member.userId === project.creatorId) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--primary-foreground)] text-xs font-black">
          <Crown className="w-3 h-3" />
          OWNER
        </div>
      )
    }
    if (member.role === 'ADMIN') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--primary)_80%,var(--background))] text-[var(--primary-foreground)] text-xs font-black">
          <Shield className="w-3 h-3" />
          ADMIN
        </div>
      )
    }
    if (member.role === 'MODERATOR') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--secondary)_60%,var(--background))] text-[var(--foreground)] text-xs font-black">
          <Shield className="w-3 h-3" />
          MOD
        </div>
      )
    }
    return null
  }

  const tabs: { id: TabType; label: string; icon: typeof Users; memberOnly?: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'mindmaps', label: 'Mind Map', icon: Brain, memberOnly: true },
    { id: 'documents', label: 'Documents', icon: File, memberOnly: true },
    { id: 'learning', label: 'Learning', icon: BookOpen, memberOnly: true },
    { id: 'research', label: 'Research', icon: FlaskConical, memberOnly: true },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare, memberOnly: true },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, memberOnly: true },
  ]

  const completedModules = learningModules.filter((m: LearningModule) => m.userProgress?.completedAt).length
  const totalModules = learningModules.length

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <BackButton label="Back to Projects" fallbackUrl="/community/projects" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3 flex-wrap">
                  {isEditing ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="px-4 py-2 rounded-full font-black text-sm uppercase bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary"
                    >
                      <option value="PLANNING">PLANNING</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  ) : (
                    <div className={`px-4 py-2 rounded-full ${colors.bg} ${colors.text} font-black text-sm uppercase`}>
                      {project.status}
                    </div>
                  )}
                  {isCreator && !isEditing && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--primary-foreground)] font-black text-xs uppercase flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      YOUR PROJECT
                    </div>
                  )}
                  {isCreator && !isEditing && (
                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={startEditing}
                        className="font-bold"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        EDIT
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteModal(true)}
                        className="font-bold text-red-500 border-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        DELETE
                      </Button>
                    </div>
                  )}
                  {isEditing && (
                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEditing}
                        disabled={isSaving}
                        className="font-bold"
                      >
                        <X className="w-4 h-4 mr-1" />
                        CANCEL
                      </Button>
                      <Button
                        size="sm"
                        onClick={saveChanges}
                        disabled={isSaving}
                        className="font-bold"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        {isSaving ? 'SAVING...' : 'SAVE'}
                      </Button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-4xl font-black mb-3 text-[var(--foreground)] bg-transparent border-b-4 border-theme-primary focus:outline-none w-full"
                    placeholder="Project Name"
                  />
                ) : (
                  <h1 className="text-4xl font-black mb-3 text-[var(--foreground)]">
                    {project.name}
                  </h1>
                )}

                {isEditing ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="text-lg font-semibold text-theme-muted mb-4 bg-transparent border-2 border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-theme-primary w-full resize-none"
                    placeholder="Project description..."
                    rows={2}
                  />
                ) : (
                  <p className="text-lg font-semibold text-theme-muted mb-4">
                    {project.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm font-bold text-theme-muted">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project._count?.members || 0} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>{subgroups.length} subgroups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{totalModules} learning modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {!isCreator && !isMember && (
                  <div className="mt-4">
                    <JoinProjectButton
                      projectId={project.id}
                      projectName={project.name}
                      isMember={isMember}
                      isOwner={isCreator}
                    />
                  </div>
                )}
              </div>

              {/* Quick Actions Card */}
              <Card className="lg:w-72 border-2 border-theme-primary">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {isMember && (
                      <Button
                        onClick={() => setShowSage(true)}
                        className="w-full font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        ASK SAGE AI
                      </Button>
                    )}
                    {isMember && (
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('discussions')}
                        className="w-full font-bold"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        JOIN DISCUSSION
                      </Button>
                    )}
                    {isMember && totalModules > 0 && (
                      <div className="p-3 bg-[var(--muted)] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold">Learning Progress</span>
                          <span className="text-sm font-black text-theme-primary">
                            {completedModules}/{totalModules}
                          </span>
                        </div>
                        <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all"
                            style={{ width: `${totalModules > 0 ? (completedModules / totalModules) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--background)] sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-1 overflow-x-auto py-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isDisabled = tab.memberOnly && !isMember
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => !isDisabled && setActiveTab(tab.id)}
                    disabled={isDisabled}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : isDisabled
                        ? 'text-theme-muted opacity-50 cursor-not-allowed'
                        : 'text-theme-muted hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {isDisabled ? <Lock className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Goal */}
                {project.goal && (
                  <Card className="border-2 border-theme-accent">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]">
                          <Target className="w-6 h-6 text-theme-accent" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg mb-1">PROJECT GOAL</h3>
                          <p className="text-[var(--foreground)] font-semibold">{project.goal}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-theme-primary" />
                      <div className="text-3xl font-black">{project._count?.members || 0}</div>
                      <div className="text-sm font-bold text-theme-muted">Members</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <Layers className="w-8 h-8 mx-auto mb-2 text-theme-accent" />
                      <div className="text-3xl font-black">{subgroups.length}</div>
                      <div className="text-sm font-bold text-theme-muted">Subgroups</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 text-theme-secondary" />
                      <div className="text-3xl font-black">{totalModules}</div>
                      <div className="text-sm font-bold text-theme-muted">Modules</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <div className="text-3xl font-black">{messages.length}</div>
                      <div className="text-sm font-bold text-theme-muted">Messages</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Subgroups Preview */}
                {subgroups.length > 0 && (
                  <Card className="border-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl font-black flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        SUBGROUPS
                      </CardTitle>
                      {isMember && (
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('members')}>
                          View All <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {subgroups.slice(0, 4).map((sg: Subgroup) => (
                          <div key={sg.id} className="p-4 bg-[var(--muted)] rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-black">{sg.name}</h4>
                              <span className="text-sm font-bold text-theme-muted">
                                {sg._count.members}{sg.memberLimit ? `/${sg.memberLimit}` : ''} members
                              </span>
                            </div>
                            <p className="text-sm text-theme-muted line-clamp-2">{sg.description}</p>
                            {sg.userMembership && (
                              <span className="inline-block mt-2 px-2 py-0.5 bg-[var(--primary)]/10 text-theme-primary text-xs font-bold rounded">
                                Joined as {sg.userMembership.role}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Team Network - Members Only */}
                {isMember && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-xl font-black flex items-center gap-2">
                        <Network className="w-5 h-5" />
                        TEAM COLLABORATION MAP
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TeamCollaborationVisualization
                        projectId={project.id}
                        projectName={project.name}
                        members={project.members?.map((m: any) => ({
                          id: m.id,
                          userId: m.userId,
                          name: m.user.name || 'Anonymous',
                          image: m.user.image,
                          role: m.role,
                          isCreator: m.userId === project.creatorId,
                          messageCount: messages.filter((msg: any) => msg.userId === m.userId).length,
                        })) || []}
                        currentUserId={session?.user?.id || null}
                        messages={messages}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Learning Tab */}
            {activeTab === 'learning' && isMember && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">LEARNING MODULES</h2>
                  {totalModules > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-theme-muted">
                        {completedModules} of {totalModules} completed
                      </div>
                      <div className="w-32 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                          style={{ width: `${(completedModules / totalModules) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {loadingModules ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                  </div>
                ) : learningModules.length === 0 ? (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-theme-muted opacity-50" />
                      <h3 className="text-xl font-black mb-2 text-theme-muted">NO LEARNING MODULES YET</h3>
                      <p className="text-theme-muted">This project hasn't added any learning content yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {learningModules.map((module: LearningModule, index: number) => {
                      const isCompleted = module.userProgress?.completedAt
                      const progress = module.userProgress?.progress || 0

                      return (
                        <Card key={module.id} className={`border-2 ${isCompleted ? 'border-green-500/50' : 'border-[var(--border)]'}`}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                                isCompleted
                                  ? 'bg-green-500/20 text-green-500'
                                  : 'bg-[var(--muted)] text-theme-muted'
                              }`}>
                                {isCompleted ? <CheckCircle className="w-6 h-6" /> : index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-black text-lg">{module.title}</h3>
                                    <p className="text-theme-muted mt-1">{module.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {isCompleted ? (
                                      <span className="px-3 py-1 bg-green-500/10 text-green-500 font-bold text-sm rounded-full">
                                        Completed
                                      </span>
                                    ) : progress > 0 ? (
                                      <span className="px-3 py-1 bg-[var(--primary)]/10 text-theme-primary font-bold text-sm rounded-full">
                                        {progress}% Complete
                                      </span>
                                    ) : (
                                      <Button size="sm" variant="outline" className="font-bold">
                                        <Play className="w-4 h-4 mr-1" />
                                        Start
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 mt-3 text-sm text-theme-muted">
                                  <span className="flex items-center gap-1">
                                    <FileText className="w-4 h-4" />
                                    {module.contentType}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Research Tab */}
            {activeTab === 'research' && isMember && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">RESEARCH & RESOURCES</h2>
                  <Button className="font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    ADD RESEARCH
                  </Button>
                </div>

                {loadingResearch ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                  </div>
                ) : researchPosts.length === 0 ? (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <FlaskConical className="w-16 h-16 mx-auto mb-4 text-theme-muted opacity-50" />
                      <h3 className="text-xl font-black mb-2 text-theme-muted">NO RESEARCH POSTS YET</h3>
                      <p className="text-theme-muted mb-4">Share research, articles, and resources with your team.</p>
                      <Button className="font-bold">
                        <Plus className="w-4 h-4 mr-2" />
                        ADD FIRST POST
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {researchPosts.map((post: ResearchPost) => (
                      <Card key={post.id} className={`border-2 ${post.isPinned ? 'border-amber-500/50' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {post.isPinned && (
                                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-xs font-bold rounded">
                                    PINNED
                                  </span>
                                )}
                                {post.tags.map((tag: string) => (
                                  <span key={tag} className="px-2 py-0.5 bg-[var(--muted)] text-theme-muted text-xs font-medium rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <h3 className="font-black text-lg mb-2">{post.heading}</h3>
                              <p className="text-theme-muted line-clamp-2">{post.summary}</p>
                              <div className="flex items-center gap-4 mt-4 text-sm text-theme-muted">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {post.author.name}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" />
                                  {post._count.comments} comments
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mind Maps Tab */}
            {activeTab === 'mindmaps' && isMember && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">PROJECT MIND MAP</h2>
                </div>

                {loadingMindMap ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                  </div>
                ) : !project.mindMapId ? (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <Brain className="w-16 h-16 mx-auto mb-4 text-theme-muted opacity-50" />
                      <h3 className="text-xl font-black mb-2 text-theme-muted">NO MIND MAP YET</h3>
                      <p className="text-theme-muted mb-4">This project doesn't have a mind map configured yet.</p>
                      <p className="text-sm text-theme-muted">Mind maps are created during project setup and help visualize project structure and goals.</p>
                    </CardContent>
                  </Card>
                ) : mindMapData ? (
                  <Card className="border-2 border-theme-primary">
                    <CardContent className="p-6">
                      <div className="mb-4 p-4 bg-[var(--muted)] rounded-lg">
                        <h3 className="font-black mb-2">{mindMapData.title || 'Project Mind Map'}</h3>
                        {mindMapData.description && (
                          <p className="text-sm text-theme-muted">{mindMapData.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <span className="flex items-center gap-1 text-theme-muted">
                            <Network className="w-4 h-4" />
                            {mindMapData._count?.nodes || 0} nodes
                          </span>
                          <span className="flex items-center gap-1 text-theme-muted">
                            <ArrowLeft className="w-4 h-4" />
                            {mindMapData._count?.connections || 0} connections
                          </span>
                          <span className="flex items-center gap-1 text-theme-muted">
                            <Users className="w-4 h-4" />
                            {mindMapData._count?.contributors || 0} contributors
                          </span>
                        </div>
                      </div>
                      <div className="text-center py-8 bg-[var(--background)] rounded-lg border-2 border-dashed">
                        <Brain className="w-12 h-12 mx-auto mb-4 text-theme-primary" />
                        <p className="text-theme-muted mb-4">Interactive mind map viewer coming soon</p>
                        <Button variant="outline" className="font-bold">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          OPEN IN FULL SCREEN
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && isMember && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">PROJECT DOCUMENTS</h2>
                  <Button className="font-bold" onClick={() => setShowTemplateSelector(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    NEW DOCUMENT
                  </Button>
                </div>

                {loadingDocuments ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                  </div>
                ) : documents.length === 0 ? (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-theme-muted opacity-50" />
                      <h3 className="text-xl font-black mb-2 text-theme-muted">NO DOCUMENTS YET</h3>
                      <p className="text-theme-muted mb-4">Create collaborative documents for meeting notes, proposals, reports, and more.</p>
                      <Button className="font-bold" onClick={() => setShowTemplateSelector(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        CREATE FIRST DOCUMENT
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc: any) => (
                      <Link key={doc.id} href={`/community/projects/${slug}/documents/${doc.id}`}>
                        <Card className="border-2 hover:border-theme-primary transition-colors cursor-pointer h-full">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                <FileText className="w-5 h-5 text-theme-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-black text-lg mb-1 truncate">{doc.title}</h3>
                                <p className="text-xs text-theme-muted">
                                  {new Date(doc.updatedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            {doc.description && (
                              <p className="text-sm text-theme-muted line-clamp-2 mb-3">{doc.description}</p>
                            )}
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-2 py-1 bg-[var(--muted)] rounded text-theme-muted">
                                {doc.type}
                              </span>
                              <span className={`px-2 py-1 rounded font-bold ${
                                doc.status === 'PUBLISHED'
                                  ? 'bg-green-500/10 text-green-500'
                                  : doc.status === 'DRAFT'
                                  ? 'bg-[var(--muted)] text-theme-muted'
                                  : 'bg-[var(--primary)]/10 text-theme-primary'
                              }`}>
                                {doc.status}
                              </span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-3 text-xs text-theme-muted">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {doc._count?.collaborators || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {doc._count?.comments || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                v{doc.version || 1}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Discussions Tab */}
            {activeTab === 'discussions' && isMember && (
              <div className="space-y-6">
                <Card className="border-2 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <MessageSquare className="w-6 h-6" />
                      PROJECT DISCUSSION
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Messages */}
                    <div className="mb-6 h-96 overflow-y-auto bg-[var(--muted)] rounded-lg p-4 space-y-4">
                      {messages.length === 0 ? (
                        <div className="text-center py-12">
                          <MessageSquare className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-bold text-theme-muted">No messages yet</p>
                          <p className="text-sm font-medium text-theme-muted mt-2">
                            Be the first to start the conversation!
                          </p>
                        </div>
                      ) : (
                        messages.map((msg: any) => {
                          const isOwnMessage = msg.userId === session?.user?.id
                          const memberData = project.members?.find((m: any) => m.userId === msg.userId)

                          return (
                            <div
                              key={msg.id}
                              className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                            >
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                {msg.user.image ? (
                                  <img
                                    src={msg.user.image}
                                    alt={msg.user.name}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                                )}
                              </div>
                              <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
                                <div className="flex items-center gap-2 mb-1">
                                  {!isOwnMessage && (
                                    <>
                                      <span className="font-black text-sm text-[var(--foreground)]">
                                        {msg.user.name || 'Anonymous'}
                                      </span>
                                      {memberData && getRoleBadge(memberData)}
                                    </>
                                  )}
                                  {isOwnMessage && (
                                    <>
                                      {memberData && getRoleBadge(memberData)}
                                      <span className="font-black text-sm text-[var(--foreground)]">
                                        {msg.user.name || 'Anonymous'}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div
                                  className={`inline-block p-3 rounded-lg ${
                                    isOwnMessage
                                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                      : 'bg-[var(--background)] text-[var(--foreground)]'
                                  } font-semibold`}
                                >
                                  {msg.content}
                                </div>
                                <p className="text-xs font-medium text-theme-muted mt-1">
                                  {new Date(msg.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          )
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onFocus={() => setHasInteractedWithChat(true)}
                        placeholder="Type your message..."
                        disabled={isSending}
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors disabled:opacity-50"
                      />
                      <Button
                        type="submit"
                        disabled={isSending || !newMessage.trim()}
                        className="font-bold px-6"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        SEND
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-8">
                {/* Subgroups Section */}
                {subgroups.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                      <Layers className="w-6 h-6" />
                      SUBGROUPS
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subgroups.map((sg: Subgroup) => (
                        <Card key={sg.id} className="border-2 hover:border-theme-primary transition-colors">
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-black text-lg">{sg.name}</h3>
                              {sg.userMembership && (
                                <span className="px-2 py-1 bg-[var(--primary)]/10 text-theme-primary text-xs font-bold rounded">
                                  {sg.userMembership.role}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-theme-muted mb-4 line-clamp-2">{sg.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-theme-muted">
                                <Users className="w-4 h-4 inline mr-1" />
                                {sg._count.members}{sg.memberLimit ? `/${sg.memberLimit}` : ''} members
                              </span>
                              {isMember && !sg.userMembership && (
                                <Button size="sm" variant="outline" className="font-bold">
                                  Join
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Members List */}
                <div>
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    ALL MEMBERS ({project.members?.length || 0})
                  </h2>

                  {loadingMembers ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(membersWithBadges.length > 0 ? membersWithBadges : project.members || []).map((member: any) => (
                        <Link key={member.id} href={`/profile/${member.userId}`}>
                          <Card className="border-2 hover:border-theme-primary transition-colors cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                  {member.user?.image ? (
                                    <img
                                      src={member.user.image}
                                      alt={member.user.name}
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  ) : (
                                    <User className="w-6 h-6 text-[var(--primary-foreground)]" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-black truncate">
                                    {member.user?.name || 'Anonymous'}
                                  </p>
                                  <div className="mt-1">
                                    {getRoleBadge(member)}
                                  </div>
                                  {member.recognitions && member.recognitions.length > 0 && (
                                    <MemberBadges
                                      badges={member.recognitions.map((r: { badge: string }) => r.badge)}
                                      size="sm"
                                      maxDisplay={4}
                                      className="mt-2"
                                    />
                                  )}
                                  {member.contributionScore && member.contributionScore > 0 && (
                                    <div className="flex items-center gap-1 mt-2 text-xs text-theme-muted">
                                      <TrendingUp className="w-3 h-3" />
                                      <span>{member.contributionScore} contribution score</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Badge Legend */}
                {isMember && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-xl font-black flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        RECOGNITION BADGES
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-theme-muted mb-4">
                        Earn badges by contributing to the project. Here are all available badges:
                      </p>
                      <BadgeGrid badges={[]} earnedBadges={[]} />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && isMember && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black">PROJECT SETTINGS</h2>

                {isCreator ? (
                  <div className="space-y-6">
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="font-black flex items-center gap-2">
                          <Bell className="w-5 h-5" />
                          NOTIFICATION PREFERENCES
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-theme-muted">Notification settings coming soon...</p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-red-500/30">
                      <CardHeader>
                        <CardTitle className="font-black text-red-500 flex items-center gap-2">
                          <Trash2 className="w-5 h-5" />
                          DANGER ZONE
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-theme-muted mb-4">
                          Permanently delete this project and all its data. This action cannot be undone.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setShowDeleteModal(true)}
                          className="font-bold text-red-500 border-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          DELETE PROJECT
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-2">
                    <CardContent className="p-8 text-center">
                      <Shield className="w-12 h-12 mx-auto mb-4 text-theme-muted" />
                      <h3 className="text-xl font-black mb-2">MEMBER SETTINGS</h3>
                      <p className="text-theme-muted">
                        Contact the project owner for administrative changes.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Not a Member Message for restricted tabs */}
            {!isMember && ['learning', 'research', 'discussions', 'mindmaps', 'documents', 'settings'].includes(activeTab) && (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-12 text-center">
                  <Lock className="w-16 h-16 text-theme-secondary mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-black mb-4 text-theme-muted">
                    MEMBERS ONLY
                  </h3>
                  <p className="text-lg font-semibold mb-6 text-theme-muted">
                    Join this project to access {activeTab} and collaborate with the team!
                  </p>
                  <JoinProjectButton
                    projectId={project.id}
                    projectName={project.name}
                    isMember={isMember}
                    isOwner={isCreator}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Project Sage AI Modal */}
      {showSage && isMember && (
        <ProjectSage
          projectId={project.id}
          projectName={project.name}
          isOpen={showSage}
          onClose={() => setShowSage(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.name}"? This will permanently remove the project and all its messages. This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* Document Template Selector */}
      {project && (
        <DocumentTemplateSelector
          isOpen={showTemplateSelector}
          onClose={() => setShowTemplateSelector(false)}
          onSelect={handleCreateDocument}
          projectId={project.id}
        />
      )}
    </div>
  )
}
