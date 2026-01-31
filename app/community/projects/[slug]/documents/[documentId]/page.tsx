'use client'

import { use, useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/BackButton'
import { CollaborativeEditor } from '@/components/documents/CollaborativeEditor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  FileText,
  Users,
  MessageSquare,
  Clock,
  Eye,
  Edit3,
  Trash2,
  Download,
  Share2,
  MoreVertical,
  Loader2,
  Lock,
  CheckCircle,
} from 'lucide-react'

export default function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string; documentId: string }>
}) {
  const { slug, documentId } = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  const [document, setDocument] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [canEdit, setCanEdit] = useState(false)

  // Fetch document and project data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch project
        const projectRes = await fetch('/api/projects')
        const projectData = await projectRes.json()
        if (projectData.success) {
          const proj = projectData.data.find((p: any) => p.slug === slug)
          setProject(proj)
        }

        // Fetch document
        const docRes = await fetch(`/api/documents/${documentId}`)
        const docData = await docRes.json()
        if (docData.success) {
          setDocument(docData.data)

          // Check if user can edit
          const isMember = proj?.members?.some((m: any) => m.userId === session?.user?.id)
          const isCreator = docData.data.creatorId === session?.user?.id
          const collaborator = docData.data.collaborators?.find(
            (c: any) => c.userId === session?.user?.id
          )
          const hasEditPermission =
            collaborator?.permission === 'EDIT' || collaborator?.permission === 'ADMIN'

          setCanEdit(isCreator || hasEditPermission || isMember)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchData()
    }
  }, [slug, documentId, session])

  const handleSave = useCallback(
    async (content: string) => {
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
        } else {
          throw new Error(data.error || 'Failed to save document')
        }
      } catch (error) {
        console.error('Error saving document:', error)
        throw error
      } finally {
        setIsSaving(false)
      }
    },
    [documentId, document]
  )

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

  const statusColors = {
    PUBLISHED: 'bg-green-500/10 text-green-500 border-green-500/20',
    DRAFT: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    IN_REVIEW: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    ARCHIVED: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  }

  const statusColor = statusColors[document.status as keyof typeof statusColors] || statusColors.DRAFT

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-6 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] via-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_10%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-4">
              <BackButton
                label="Back to Documents"
                fallbackUrl={`/community/projects/${slug}?tab=documents`}
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={`px-3 py-1 border ${statusColor} font-black text-xs`}>
                    {document.status}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 font-bold text-xs">
                    {document.type}
                  </Badge>
                </div>

                <h1 className="text-3xl font-black mb-2 text-[var(--foreground)]">{document.title}</h1>

                {document.description && (
                  <p className="text-base font-semibold text-theme-muted">{document.description}</p>
                )}

                <div className="flex items-center gap-4 mt-3 text-sm text-theme-muted">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {document._count?.collaborators || 0} collaborators
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {document._count?.comments || 0} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    v{document.version || 1}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {document.readCount || 0} views
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {canEdit && !isEditMode && (
                  <Button onClick={() => setIsEditMode(true)} className="font-bold">
                    <Edit3 className="w-4 h-4 mr-2" />
                    EDIT
                  </Button>
                )}
                {isEditMode && (
                  <Button onClick={() => setIsEditMode(false)} variant="outline" className="font-bold">
                    <Eye className="w-4 h-4 mr-2" />
                    VIEW
                  </Button>
                )}
                <Button variant="outline" className="font-bold">
                  <Share2 className="w-4 h-4 mr-2" />
                  SHARE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-0">
                <CollaborativeEditor
                  documentId={documentId}
                  initialContent={document.content || ''}
                  onSave={handleSave}
                  readOnly={!canEdit || !isEditMode}
                  autoSave={true}
                  autoSaveInterval={30000}
                  showToolbar={canEdit && isEditMode}
                  showStats={true}
                  placeholder="Start writing your document..."
                  enableCollaboration={true}
                  collaborationType="document"
                  currentUser={
                    session?.user
                      ? {
                          id: session.user.id!,
                          name: session.user.name,
                          image: session.user.image,
                        }
                      : null
                  }
                />
              </CardContent>
            </Card>

            {/* Document Info Sidebar */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm font-black flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    COLLABORATORS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-theme-muted">Collaboration features coming soon</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm font-black flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    VERSION HISTORY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-theme-muted">Version tracking coming soon</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm font-black flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    COMMENTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-theme-muted">Comments section coming soon</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
