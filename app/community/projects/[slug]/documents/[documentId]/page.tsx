'use client'

import { use, useEffect, useState, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { BackButton } from '@/components/navigation/BackButton'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  FileText,
  Users,
  MessageSquare,
  Clock,
  Eye,
  Edit3,
  Share2,
  Loader2,
  Lock,
  Star,
  ChevronLeft,
  ChevronRight,
  History,
  Info,
  List,
  MoreVertical,
  Download,
  Copy,
  Trash2,
  Maximize2,
  X,
  Settings,
} from 'lucide-react'

// Import document components
import { ModeSelector, EditorMode } from '@/components/documents/editor/ModeSelector'
import { FindReplaceDialog } from '@/components/documents/editor/FindReplaceDialog'
import { ZoomControls } from '@/components/documents/editor/ZoomControls'
import { KeyboardShortcutsModal } from '@/components/documents/editor/KeyboardShortcutsModal'
import { FocusMode } from '@/components/documents/editor/FocusMode'
import { CommentsSidebar } from '@/components/documents/comments/CommentsSidebar'
import { InlineCommentPopover } from '@/components/documents/comments/InlineCommentPopover'
import { VersionHistoryPanel } from '@/components/documents/versions/VersionHistoryPanel'
import { VersionDiff } from '@/components/documents/versions/VersionDiff'
import { RestoreVersionModal } from '@/components/documents/versions/RestoreVersionModal'
import { ShareModal } from '@/components/documents/sharing/ShareModal'
import { ExportMenu } from '@/components/documents/export/ExportMenu'
import { TableOfContents } from '@/components/documents/navigation/TableOfContents'
import { DocumentInfoPanel } from '@/components/documents/info/DocumentInfoPanel'
import { ActiveUsersBar } from '@/components/documents/presence/ActiveUsersBar'
import { PresenceIndicator } from '@/components/documents/presence/PresenceIndicator'

// Dynamic import to prevent SSR issues with @hocuspocus/provider WebSocket APIs
const CollaborativeEditor = dynamic(
  () => import('@/components/documents/CollaborativeEditor').then(mod => ({ default: mod.CollaborativeEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-theme-primary animate-spin mx-auto mb-3" />
          <p className="text-theme-muted font-medium">Loading editor...</p>
        </div>
      </div>
    ),
  }
)

type SidebarPanel = 'outline' | 'comments' | 'versions' | 'collaborators' | 'info' | null

export default function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string; documentId: string }>
}) {
  const { slug, documentId } = use(params)
  const { data: session } = useSession()
  const router = useRouter()

  // Core state
  const [document, setDocument] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Permissions
  const [canEdit, setCanEdit] = useState(false)
  const [canComment, setCanComment] = useState(false)
  const [canSuggest, setCanSuggest] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  // Editor state
  const [editorMode, setEditorMode] = useState<EditorMode>('view')
  const [zoom, setZoom] = useState(100)
  const [editorRef, setEditorRef] = useState<any>(null)

  // Sidebar state
  const [activeSidebar, setActiveSidebar] = useState<SidebarPanel>('outline')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Modal state
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showFocusMode, setShowFocusMode] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showVersionDiff, setShowVersionDiff] = useState(false)
  const [showRestoreModal, setShowRestoreModal] = useState(false)

  // Data state
  const [comments, setComments] = useState<any[]>([])
  const [versions, setVersions] = useState<any[]>([])
  const [collaborators, setCollaborators] = useState<any[]>([])
  const [projectMembers, setProjectMembers] = useState<any[]>([])

  // Version compare state
  const [compareVersions, setCompareVersions] = useState<{ v1: any; v2: any } | null>(null)
  const [restoreVersion, setRestoreVersion] = useState<any>(null)

  // Comment popover state
  const [commentPopover, setCommentPopover] = useState<{
    isOpen: boolean
    position: { top: number; left: number }
    selectedText: string
    selectionRange?: { from: number; to: number }
  }>({
    isOpen: false,
    position: { top: 0, left: 0 },
    selectedText: '',
  })

  // Active users (for real-time presence)
  const [activeUsers, setActiveUsers] = useState<any[]>([])
  const [typingUsers, setTypingUsers] = useState<any[]>([])

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return

      try {
        setIsLoading(true)

        // Fetch project
        const projectRes = await fetch('/api/projects')
        const projectData = await projectRes.json()
        let currentProject = null
        if (projectData.success) {
          currentProject = projectData.data.find((p: any) => p.slug === slug)
          setProject(currentProject)
          setProjectMembers(currentProject?.members?.map((m: any) => m.user) || [])
        }

        // Fetch document
        const docRes = await fetch(`/api/documents/${documentId}`)
        const docData = await docRes.json()
        if (docData.success) {
          setDocument(docData.data)

          // Determine permissions
          const isMember = currentProject?.members?.some((m: any) => m.userId === session.user?.id)
          const isCreator = docData.data.creatorId === session.user?.id
          const collaborator = docData.data.collaborators?.find(
            (c: any) => c.userId === session.user?.id
          )
          const permission = collaborator?.permission

          setIsOwner(isCreator)
          setCanEdit(isCreator || permission === 'EDIT' || permission === 'ADMIN' || isMember)
          setCanComment(isCreator || ['COMMENT', 'SUGGEST', 'EDIT', 'ADMIN'].includes(permission) || docData.data.allowComments)
          setCanSuggest(isCreator || ['SUGGEST', 'EDIT', 'ADMIN'].includes(permission) || docData.data.allowSuggestions)

          // Set initial mode based on permissions
          if (isCreator || permission === 'EDIT' || permission === 'ADMIN') {
            setEditorMode('edit')
          } else if (['SUGGEST'].includes(permission)) {
            setEditorMode('suggest')
          } else {
            setEditorMode('view')
          }
        }

        // Fetch comments
        const commentsRes = await fetch(`/api/documents/${documentId}/comments`)
        const commentsData = await commentsRes.json()
        if (commentsData.success) {
          setComments(commentsData.data)
        }

        // Fetch versions
        const versionsRes = await fetch(`/api/documents/${documentId}/versions`)
        const versionsData = await versionsRes.json()
        if (versionsData.success) {
          setVersions(versionsData.data)
        }

        // Fetch collaborators
        const collabRes = await fetch(`/api/documents/${documentId}/collaborators`)
        const collabData = await collabRes.json()
        if (collabData.success) {
          setCollaborators(collabData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug, documentId, session])

  // Save handler
  const handleSave = useCallback(async (content: string) => {
    if (!document) return

    setIsSaving(true)
    try {
      const res = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await res.json()
      if (data.success) {
        setDocument((prev: any) => ({ ...prev, content, updatedAt: new Date() }))
        setLastSaved(new Date())
        setHasUnsavedChanges(false)
      } else {
        throw new Error(data.error || 'Failed to save document')
      }
    } catch (error) {
      console.error('Error saving document:', error)
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [documentId, document])

  // Comment handlers
  const handleAddComment = async (content: string, quotedText: string, position: { from: number; to: number }) => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, quotedText, position }),
      })

      const data = await res.json()
      if (data.success) {
        setComments((prev) => [data.data, ...prev])
        setCommentPopover({ isOpen: false, position: { top: 0, left: 0 }, selectedText: '' })
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const handleReplyComment = async (commentId: string, content: string) => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parentId: commentId }),
      })

      const data = await res.json()
      if (data.success) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? { ...c, replies: [...(c.replies || []), data.data] }
              : c
          )
        )
      }
    } catch (error) {
      console.error('Error replying to comment:', error)
    }
  }

  const handleResolveComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}/resolve`, {
        method: 'POST',
      })

      const data = await res.json()
      if (data.success) {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, isResolved: true } : c))
        )
      }
    } catch (error) {
      console.error('Error resolving comment:', error)
    }
  }

  // Version handlers
  const handleCreateCheckpoint = async () => {
    try {
      const res = await fetch(`/api/documents/${documentId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Manual checkpoint' }),
      })

      const data = await res.json()
      if (data.success) {
        setVersions((prev) => [data.data, ...prev])
        setDocument((prev: any) => ({ ...prev, version: data.data.versionNumber }))
      }
    } catch (error) {
      console.error('Error creating checkpoint:', error)
    }
  }

  const handleRestoreVersion = async (version: any, createCheckpoint: boolean) => {
    try {
      const res = await fetch(`/api/documents/${documentId}/versions/${version.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ createCheckpoint }),
      })

      const data = await res.json()
      if (data.success) {
        setDocument(data.data)
        // Refresh versions
        const versionsRes = await fetch(`/api/documents/${documentId}/versions`)
        const versionsData = await versionsRes.json()
        if (versionsData.success) {
          setVersions(versionsData.data)
        }
      }
    } catch (error) {
      console.error('Error restoring version:', error)
    }
  }

  // Collaborator handlers
  const handleInviteCollaborator = async (userId: string, permission: string) => {
    try {
      const res = await fetch(`/api/documents/${documentId}/collaborators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, permission }),
      })

      const data = await res.json()
      if (data.success) {
        setCollaborators((prev) => [...prev, data.data])
      }
    } catch (error) {
      console.error('Error inviting collaborator:', error)
      throw error
    }
  }

  // Export handler
  const handleExport = async (format: string) => {
    // Simplified export - in production, this would call a server endpoint
    const content = document?.content || ''

    if (format === 'md') {
      // Simple HTML to Markdown conversion
      const markdown = content
        .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
        .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
        .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
        .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
        .replace(/<[^>]*>/g, '')

      const blob = new Blob([markdown], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = window.document.createElement('a')
      a.href = url
      a.download = `${document?.title || 'document'}.md`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === 'html') {
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>${document?.title || 'Document'}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
  </style>
</head>
<body>
  <h1>${document?.title || 'Document'}</h1>
  ${content}
</body>
</html>`

      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = window.document.createElement('a')
      a.href = url
      a.download = `${document?.title || 'document'}.html`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === 'txt') {
      const text = content.replace(/<[^>]*>/g, '')
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = window.document.createElement('a')
      a.href = url
      a.download = `${document?.title || 'document'}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  // Calculate document stats
  const stats = useMemo(() => {
    const content = document?.content || ''
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const words = plainText ? plainText.split(/\s+/).length : 0
    const chars = plainText.length
    const readingTime = Math.ceil(words / 200)
    const pages = Math.ceil(words / 300)

    return {
      wordCount: words,
      charCount: chars,
      readingTime,
      pageCount: pages,
      version: document?.version || 1,
      editCount: document?.editCount || 0,
      viewCount: document?.readCount || 0,
      collaboratorCount: collaborators.length + 1,
      commentCount: comments.length,
    }
  }, [document, collaborators, comments])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-theme-primary" />
          <p className="text-lg font-bold text-theme-muted">Loading document...</p>
        </div>
      </div>
    )
  }

  if (!document || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="border-2 border-theme-secondary max-w-md">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-theme-muted opacity-50" />
            <h2 className="text-2xl font-black mb-4 text-theme-muted">DOCUMENT NOT FOUND</h2>
            <p className="text-theme-muted mb-6">
              This document doesn't exist or you don't have permission to view it.
            </p>
            <BackButton label="Back to Project" fallbackUrl={`/community/projects/${slug}`} />
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    PUBLISHED: 'bg-green-500/10 text-green-500 border-green-500/20',
    DRAFT: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    IN_REVIEW: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    ARCHIVED: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  }

  const statusColor = statusColors[document.status] || statusColors.DRAFT

  // Render sidebar content based on active panel
  const renderSidebarContent = () => {
    switch (activeSidebar) {
      case 'outline':
        return (
          <TableOfContents
            editor={editorRef}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )
      case 'comments':
        return (
          <CommentsSidebar
            comments={comments}
            currentUserId={session?.user?.id}
            isDocumentOwner={isOwner}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onAddComment={() => setActiveSidebar('comments')}
            onReply={handleReplyComment}
            onResolve={handleResolveComment}
          />
        )
      case 'versions':
        return (
          <VersionHistoryPanel
            versions={versions}
            currentVersion={document.version}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onPreview={(v) => setCompareVersions({ v1: v, v2: versions[0] })}
            onRestore={(v) => { setRestoreVersion(v); setShowRestoreModal(true); }}
            onCompare={(v1, v2) => { setCompareVersions({ v1, v2 }); setShowVersionDiff(true); }}
            onCreateCheckpoint={handleCreateCheckpoint}
          />
        )
      case 'info':
        return (
          <DocumentInfoPanel
            stats={stats}
            createdAt={document.createdAt}
            updatedAt={document.updatedAt}
            createdBy={document.creator}
            lastEditedBy={document.lastEditedBy}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )
      default:
        return null
    }
  }

  return (
    <FocusMode
      isActive={showFocusMode}
      onClose={() => setShowFocusMode(false)}
      wordCount={stats.wordCount}
    >
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border)]">
          <div className="flex items-center justify-between px-4 py-2">
            {/* Left section */}
            <div className="flex items-center gap-3">
              <BackButton
                label=""
                fallbackUrl={`/community/projects/${slug}?tab=documents`}
              />

              <div className="flex items-center gap-2">
                <Badge className={`px-2 py-0.5 text-[10px] border ${statusColor}`}>
                  {document.status}
                </Badge>
                <h1 className="font-bold text-lg truncate max-w-[300px]">{document.title}</h1>
                {document.isLocked && <Lock className="w-4 h-4 text-yellow-500" />}
              </div>
            </div>

            {/* Center section - Active users */}
            <div className="hidden md:flex items-center gap-4">
              <ActiveUsersBar users={activeUsers} />
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* Mode selector */}
              {canEdit && (
                <ModeSelector
                  mode={editorMode}
                  onChange={setEditorMode}
                  canEdit={canEdit}
                  canSuggest={canSuggest}
                />
              )}

              {/* Share button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareModal(true)}
                className="h-8 px-3 gap-1 font-bold"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>

              {/* Export menu */}
              <ExportMenu
                documentId={documentId}
                documentTitle={document.title}
                onExport={handleExport}
                onPrint={() => window.print()}
              />

              {/* More options */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Secondary toolbar */}
          <div className="flex items-center justify-between px-4 py-1 border-t border-[var(--border)] bg-[var(--secondary)]/5">
            <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
              <span>v{document.version}</span>
              <span>•</span>
              <span>{stats.wordCount} words</span>
              <span>•</span>
              <span>~{stats.readingTime} min read</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <ZoomControls
                zoom={zoom}
                onZoomChange={setZoom}
              />

              {/* Additional toolbar buttons */}
              <div className="flex items-center gap-1 pl-2 border-l border-[var(--border)]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFindReplace(true)}
                  title="Find & Replace"
                  className="h-7 w-7 p-0"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFocusMode(true)}
                  title="Focus Mode"
                  className="h-7 w-7 p-0"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKeyboardShortcuts(true)}
                  title="Keyboard Shortcuts"
                  className="h-7 w-7 p-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {/* Save status */}
              <div className="flex items-center gap-2 pl-2 border-l border-[var(--border)]">
                {isSaving ? (
                  <span className="text-xs text-[var(--muted)]">Saving...</span>
                ) : lastSaved ? (
                  <span className="text-xs text-green-500">Saved</span>
                ) : hasUnsavedChanges ? (
                  <span className="text-xs text-yellow-500">Unsaved changes</span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div className="px-4 py-1 border-t border-[var(--border)]">
              <PresenceIndicator typingUsers={typingUsers} />
            </div>
          )}
        </header>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor area */}
          <main className="flex-1 overflow-auto" style={{ zoom: `${zoom}%` }}>
            <div className="max-w-4xl mx-auto py-8 px-4">
              <Card className="border-2">
                <CardContent className="p-0">
                  <CollaborativeEditor
                    documentId={documentId}
                    initialContent={document.content || ''}
                    onSave={handleSave}
                    onUpdate={(content) => setHasUnsavedChanges(true)}
                    readOnly={editorMode === 'view'}
                    autoSave={editorMode === 'edit'}
                    autoSaveInterval={30000}
                    showToolbar={editorMode !== 'view'}
                    showStats={false}
                    placeholder="Start writing your document..."
                    enableCollaboration={!!process.env.NEXT_PUBLIC_HOCUSPOCUS_URL}
                    collaborationType="document"
                    currentUser={
                      session?.user
                        ? {
                            id: session.user.id!,
                            name: session.user.name ?? null,
                            image: session.user.image ?? null,
                          }
                        : null
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Sidebar */}
          {!sidebarCollapsed && activeSidebar && (
            <aside className="w-80 border-l border-[var(--border)] bg-[var(--background)] flex flex-col overflow-hidden">
              {/* Sidebar tabs */}
              <div className="flex items-center border-b border-[var(--border)]">
                <button
                  onClick={() => setActiveSidebar('outline')}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    activeSidebar === 'outline'
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                  title="Outline"
                >
                  <List className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => setActiveSidebar('comments')}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    activeSidebar === 'comments'
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                  title="Comments"
                >
                  <MessageSquare className="w-4 h-4 mx-auto" />
                  {comments.filter(c => !c.isResolved).length > 0 && (
                    <span className="ml-1 px-1 text-[10px] bg-[var(--primary)] text-white rounded-full">
                      {comments.filter(c => !c.isResolved).length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveSidebar('versions')}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    activeSidebar === 'versions'
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                  title="Version History"
                >
                  <History className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => setActiveSidebar('info')}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    activeSidebar === 'info'
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                  title="Document Info"
                >
                  <Info className="w-4 h-4 mx-auto" />
                </button>
              </div>

              {/* Sidebar content */}
              <div className="flex-1 overflow-hidden">
                {renderSidebarContent()}
              </div>
            </aside>
          )}

          {/* Sidebar toggle (when collapsed) */}
          {sidebarCollapsed && (
            <div className="w-12 border-l border-[var(--border)] bg-[var(--background)] flex flex-col items-center py-2 gap-1">
              <Button
                variant={activeSidebar === 'outline' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => { setActiveSidebar('outline'); setSidebarCollapsed(false); }}
                className="h-8 w-8 p-0"
                title="Outline"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={activeSidebar === 'comments' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => { setActiveSidebar('comments'); setSidebarCollapsed(false); }}
                className="h-8 w-8 p-0 relative"
                title="Comments"
              >
                <MessageSquare className="w-4 h-4" />
                {comments.filter(c => !c.isResolved).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[8px] bg-[var(--primary)] text-white rounded-full flex items-center justify-center">
                    {comments.filter(c => !c.isResolved).length}
                  </span>
                )}
              </Button>
              <Button
                variant={activeSidebar === 'versions' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => { setActiveSidebar('versions'); setSidebarCollapsed(false); }}
                className="h-8 w-8 p-0"
                title="Version History"
              >
                <History className="w-4 h-4" />
              </Button>
              <Button
                variant={activeSidebar === 'info' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => { setActiveSidebar('info'); setSidebarCollapsed(false); }}
                className="h-8 w-8 p-0"
                title="Document Info"
              >
                <Info className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <footer className="sticky bottom-0 z-30 bg-[var(--background)] border-t border-[var(--border)] px-4 py-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <div className="flex items-center gap-4">
              <span>{stats.wordCount} words</span>
              <span>{stats.charCount} characters</span>
              <span>~{stats.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{stats.collaboratorCount} collaborators</span>
              <span>{stats.commentCount} comments</span>
              <span>v{document.version}</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <FindReplaceDialog
          editor={editorRef}
          isOpen={showFindReplace}
          onClose={() => setShowFindReplace(false)}
        />

        <KeyboardShortcutsModal
          isOpen={showKeyboardShortcuts}
          onClose={() => setShowKeyboardShortcuts(false)}
        />

        <ShareModal
          isOpen={showShareModal}
          documentTitle={document.title}
          documentId={documentId}
          collaborators={collaborators}
          currentUserId={session?.user?.id || ''}
          ownerId={document.creatorId}
          shareToken={document.shareToken}
          shareExpiry={document.shareExpiry}
          publicAccess={document.publicAccess}
          projectMembers={projectMembers}
          onClose={() => setShowShareModal(false)}
          onInvite={handleInviteCollaborator}
          onUpdatePermission={async () => {}}
          onRemoveCollaborator={async () => {}}
          onGenerateLink={async () => ''}
          onRevokeLink={async () => {}}
          onUpdateLinkPermission={async () => {}}
        />

        {showVersionDiff && compareVersions && (
          <VersionDiff
            isOpen={showVersionDiff}
            version1={compareVersions.v1}
            version2={compareVersions.v2}
            onClose={() => { setShowVersionDiff(false); setCompareVersions(null); }}
            onRestoreVersion={(version) => {
              setRestoreVersion(version)
              setShowRestoreModal(true)
              setShowVersionDiff(false)
              setCompareVersions(null)
            }}
          />
        )}

        {showRestoreModal && restoreVersion && (
          <RestoreVersionModal
            isOpen={showRestoreModal}
            version={restoreVersion}
            currentVersion={document.version}
            onClose={() => { setShowRestoreModal(false); setRestoreVersion(null); }}
            onConfirm={handleRestoreVersion}
          />
        )}

        <InlineCommentPopover
          isOpen={commentPopover.isOpen}
          position={commentPopover.position}
          selectedText={commentPopover.selectedText}
          selectionRange={commentPopover.selectionRange}
          projectMembers={projectMembers}
          onClose={() => setCommentPopover({ isOpen: false, position: { top: 0, left: 0 }, selectedText: '' })}
          onSubmit={handleAddComment}
        />
      </div>
    </FocusMode>
  )
}
