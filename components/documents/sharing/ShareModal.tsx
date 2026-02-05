'use client'

import { useState } from 'react'
import {
  X, Link2, Copy, Check, Globe, Lock, Users, Mail,
  ChevronDown, Trash2, Crown, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CollaboratorsList } from './CollaboratorsList'
import { InviteInput } from './InviteInput'
import { ShareLinkSection } from './ShareLinkSection'
import { PermissionSelect } from './PermissionSelect'

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
}

interface Collaborator {
  id: string
  userId: string
  user: User
  permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN'
  joinedAt: Date | string
  lastViewedAt?: Date | string | null
  editsCount: number
  commentsCount: number
}

interface ShareModalProps {
  isOpen: boolean
  documentTitle: string
  documentId: string
  collaborators: Collaborator[]
  currentUserId: string
  ownerId: string
  shareToken?: string | null
  shareExpiry?: Date | string | null
  publicAccess?: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | null
  projectMembers?: User[]
  onClose: () => void
  onInvite: (userId: string, permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN') => Promise<void>
  onUpdatePermission: (collaboratorId: string, permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN') => Promise<void>
  onRemoveCollaborator: (collaboratorId: string) => Promise<void>
  onGenerateLink: (permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT') => Promise<string>
  onRevokeLink: () => Promise<void>
  onUpdateLinkPermission: (permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT') => Promise<void>
  onTransferOwnership?: (userId: string) => Promise<void>
}

type TabType = 'people' | 'link'

export function ShareModal({
  isOpen,
  documentTitle,
  documentId,
  collaborators,
  currentUserId,
  ownerId,
  shareToken,
  shareExpiry,
  publicAccess,
  projectMembers = [],
  onClose,
  onInvite,
  onUpdatePermission,
  onRemoveCollaborator,
  onGenerateLink,
  onRevokeLink,
  onUpdateLinkPermission,
  onTransferOwnership,
}: ShareModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('people')
  const [isInviting, setIsInviting] = useState(false)
  const [inviteError, setInviteError] = useState<string | null>(null)

  const isOwner = currentUserId === ownerId
  const currentUserCollaborator = collaborators.find((c) => c.userId === currentUserId)
  const canManageCollaborators = isOwner || currentUserCollaborator?.permission === 'ADMIN'

  // Filter out users who are already collaborators
  const availableUsers = projectMembers.filter(
    (member) => !collaborators.some((c) => c.userId === member.id) && member.id !== ownerId
  )

  const handleInvite = async (userId: string, permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN') => {
    setIsInviting(true)
    setInviteError(null)
    try {
      await onInvite(userId, permission)
    } catch (error: any) {
      setInviteError(error.message || 'Failed to invite user')
    } finally {
      setIsInviting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-lg font-bold">Share "{documentTitle}"</h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Manage who can access this document
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)]">
          <button
            onClick={() => setActiveTab('people')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'people'
                ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            <Users className="w-4 h-4 inline-block mr-2" />
            People ({collaborators.length + 1})
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'link'
                ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            <Link2 className="w-4 h-4 inline-block mr-2" />
            Share Link
            {shareToken && (
              <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-green-500/10 text-green-500 rounded">
                Active
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {activeTab === 'people' ? (
            <div className="p-4 space-y-4">
              {/* Invite section */}
              {canManageCollaborators && (
                <div>
                  <InviteInput
                    users={availableUsers}
                    onInvite={handleInvite}
                    isLoading={isInviting}
                  />
                  {inviteError && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-red-500">
                      <AlertCircle className="w-3 h-3" />
                      {inviteError}
                    </div>
                  )}
                </div>
              )}

              {/* Collaborators list */}
              <CollaboratorsList
                collaborators={collaborators}
                ownerId={ownerId}
                currentUserId={currentUserId}
                canManage={canManageCollaborators}
                onUpdatePermission={onUpdatePermission}
                onRemove={onRemoveCollaborator}
                onTransferOwnership={onTransferOwnership}
              />
            </div>
          ) : (
            <div className="p-4">
              <ShareLinkSection
                shareToken={shareToken || null}
                shareExpiry={shareExpiry ? new Date(shareExpiry) : null}
                publicAccess={publicAccess || null}
                documentId={documentId}
                canManage={canManageCollaborators}
                onGenerate={onGenerateLink}
                onRevoke={onRevokeLink}
                onUpdatePermission={onUpdateLinkPermission}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            {shareToken ? (
              <>
                <Globe className="w-3 h-3" />
                Anyone with the link can {publicAccess?.toLowerCase() || 'view'}
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                Only collaborators can access
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  )
}

export default ShareModal
