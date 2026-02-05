'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Crown, MoreHorizontal, Trash2, UserMinus, Shield, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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

interface CollaboratorsListProps {
  collaborators: Collaborator[]
  ownerId: string
  currentUserId: string
  canManage: boolean
  onUpdatePermission: (collaboratorId: string, permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN') => Promise<void>
  onRemove: (collaboratorId: string) => Promise<void>
  onTransferOwnership?: (userId: string) => Promise<void>
}

export function CollaboratorsList({
  collaborators,
  ownerId,
  currentUserId,
  canManage,
  onUpdatePermission,
  onRemove,
  onTransferOwnership,
}: CollaboratorsListProps) {
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null)
  const [confirmTransfer, setConfirmTransfer] = useState<string | null>(null)

  const handleUpdatePermission = async (
    collaboratorId: string,
    permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN'
  ) => {
    setIsUpdating(collaboratorId)
    try {
      await onUpdatePermission(collaboratorId, permission)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemove = async (collaboratorId: string) => {
    setIsUpdating(collaboratorId)
    try {
      await onRemove(collaboratorId)
    } finally {
      setIsUpdating(null)
      setConfirmRemove(null)
    }
  }

  const handleTransferOwnership = async (userId: string) => {
    if (!onTransferOwnership) return
    setIsUpdating(userId)
    try {
      await onTransferOwnership(userId)
    } finally {
      setIsUpdating(null)
      setConfirmTransfer(null)
    }
  }

  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
        Collaborators
      </div>

      {/* Owner (always first) */}
      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--secondary)]/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Owner indicator */}
            <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-sm">
              {collaborators.find((c) => c.userId === ownerId)?.user.name?.[0]?.toUpperCase() || 'O'}
            </div>
            <Crown className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {collaborators.find((c) => c.userId === ownerId)?.user.name || 'Owner'}
              </span>
              {ownerId === currentUserId && (
                <span className="text-[10px] text-[var(--muted)]">(you)</span>
              )}
            </div>
            <span className="text-xs text-[var(--muted)]">Owner</span>
          </div>
        </div>
      </div>

      {/* Other collaborators */}
      {collaborators
        .filter((c) => c.userId !== ownerId)
        .map((collaborator) => {
          const isExpanded = expandedUser === collaborator.id
          const isSelf = collaborator.userId === currentUserId
          const isUpdatingThis = isUpdating === collaborator.id

          return (
            <div
              key={collaborator.id}
              className="rounded-lg border border-transparent hover:border-[var(--border)] hover:bg-[var(--secondary)]/5 transition-colors"
            >
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  {collaborator.user.image ? (
                    <img
                      src={collaborator.user.image}
                      alt={collaborator.user.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--secondary)]/30 flex items-center justify-center font-bold text-sm">
                      {collaborator.user.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {collaborator.user.name || 'Unknown User'}
                      </span>
                      {isSelf && (
                        <span className="text-[10px] text-[var(--muted)]">(you)</span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--muted)]">
                      {collaborator.user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {canManage && !isSelf ? (
                    <>
                      <PermissionSelect
                        value={collaborator.permission}
                        onChange={(permission) =>
                          handleUpdatePermission(collaborator.id, permission)
                        }
                        disabled={isUpdatingThis}
                        size="sm"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setExpandedUser(isExpanded ? null : collaborator.id)
                        }
                        className="h-7 w-7 p-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs text-[var(--muted)] px-2 py-1 bg-[var(--secondary)]/20 rounded">
                      {collaborator.permission}
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded actions */}
              {isExpanded && canManage && !isSelf && (
                <div className="px-2 pb-2">
                  <div className="p-2 bg-[var(--secondary)]/10 rounded-lg space-y-2">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                      <span>Joined {formatDistanceToNow(new Date(collaborator.joinedAt), { addSuffix: true })}</span>
                      {collaborator.lastViewedAt && (
                        <span>
                          Last viewed{' '}
                          {formatDistanceToNow(new Date(collaborator.lastViewedAt), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                      <span>{collaborator.editsCount} edits</span>
                      <span>{collaborator.commentsCount} comments</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                      {confirmRemove === collaborator.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs text-red-500">Remove access?</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemove(collaborator.id)}
                            disabled={isUpdatingThis}
                            className="h-6 px-2 text-xs text-red-500 hover:bg-red-500/10"
                          >
                            Yes, remove
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmRemove(null)}
                            className="h-6 px-2 text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : confirmTransfer === collaborator.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs text-yellow-500">Transfer ownership?</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleTransferOwnership(collaborator.userId)}
                            disabled={isUpdatingThis}
                            className="h-6 px-2 text-xs text-yellow-500 hover:bg-yellow-500/10"
                          >
                            Yes, transfer
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmTransfer(null)}
                            className="h-6 px-2 text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmRemove(collaborator.id)}
                            className="h-7 px-2 text-xs text-red-500 hover:bg-red-500/10"
                          >
                            <UserMinus className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                          {onTransferOwnership && currentUserId === ownerId && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setConfirmTransfer(collaborator.id)}
                              className="h-7 px-2 text-xs"
                            >
                              <Crown className="w-3 h-3 mr-1" />
                              Make Owner
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

      {collaborators.filter((c) => c.userId !== ownerId).length === 0 && (
        <div className="text-center py-4 text-sm text-[var(--muted)]">
          No collaborators yet. Invite someone to collaborate!
        </div>
      )}
    </div>
  )
}

export default CollaboratorsList
