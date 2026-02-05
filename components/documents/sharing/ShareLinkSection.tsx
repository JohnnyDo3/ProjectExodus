'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Link2, Copy, Check, Globe, Lock, RefreshCw, Trash2, Calendar, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PermissionSelect, type SharePermission } from './PermissionSelect'

type Permission = SharePermission

interface ShareLinkSectionProps {
  shareToken: string | null
  shareExpiry: Date | null
  publicAccess: Permission | null
  documentId: string
  canManage: boolean
  onGenerate: (permission: Permission) => Promise<string>
  onRevoke: () => Promise<void>
  onUpdatePermission: (permission: Permission) => Promise<void>
}

export function ShareLinkSection({
  shareToken,
  shareExpiry,
  publicAccess,
  documentId,
  canManage,
  onGenerate,
  onRevoke,
  onUpdatePermission,
}: ShareLinkSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission>(publicAccess || 'VIEW')
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false)

  const shareUrl = shareToken
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/documents/shared/${shareToken}`
    : null

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await onGenerate(selectedPermission)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRevoke = async () => {
    setIsRevoking(true)
    try {
      await onRevoke()
    } finally {
      setIsRevoking(false)
      setShowRevokeConfirm(false)
    }
  }

  const handleCopy = async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleUpdatePermission = async (permission: Permission) => {
    setSelectedPermission(permission)
    if (shareToken) {
      await onUpdatePermission(permission)
    }
  }

  const isExpired = shareExpiry && new Date(shareExpiry) < new Date()

  return (
    <div className="space-y-4">
      {shareToken ? (
        <>
          {/* Active link display */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Link sharing is on</span>
              {isExpired && (
                <span className="px-1.5 py-0.5 text-[10px] bg-red-500/10 text-red-500 rounded font-medium">
                  Expired
                </span>
              )}
            </div>

            {/* Link URL */}
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-[var(--secondary)]/10 border border-[var(--border)] rounded-lg text-sm font-mono truncate">
                {shareUrl}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Link settings */}
            <div className="p-3 bg-[var(--secondary)]/5 border border-[var(--border)] rounded-lg space-y-3">
              {/* Permission */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">Anyone with the link can</span>
                {canManage ? (
                  <PermissionSelect
                    value={selectedPermission}
                    onChange={(value) => handleUpdatePermission(value as Permission)}
                    excludeAdmin
                    size="sm"
                  />
                ) : (
                  <span className="text-sm font-medium">{publicAccess?.toLowerCase()}</span>
                )}
              </div>

              {/* Expiry */}
              {shareExpiry && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Expires
                  </span>
                  <span className={`text-sm ${isExpired ? 'text-red-500' : ''}`}>
                    {format(new Date(shareExpiry), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            {canManage && (
              <div className="flex items-center gap-2">
                {showRevokeConfirm ? (
                  <div className="flex items-center gap-2 flex-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">Revoke access for everyone?</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRevoke}
                      disabled={isRevoking}
                      className="text-red-500 hover:bg-red-500/10"
                    >
                      {isRevoking ? 'Revoking...' : 'Yes, revoke'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowRevokeConfirm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="text-xs"
                    >
                      <RefreshCw className={`w-3 h-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                      Generate new link
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowRevokeConfirm(true)}
                      className="text-xs text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Revoke link
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* No link - create one */}
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[var(--secondary)]/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[var(--muted)]" />
            </div>
            <div>
              <h3 className="font-medium">Link sharing is off</h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                Only people you invite can access this document
              </p>
            </div>

            {canManage && (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-[var(--muted)]">People with the link can</span>
                  <PermissionSelect
                    value={selectedPermission}
                    onChange={(value) => setSelectedPermission(value as Permission)}
                    excludeAdmin
                    size="sm"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="font-bold"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 mr-2" />
                      Create shareable link
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Info text */}
      <div className="text-xs text-[var(--muted)] text-center">
        {shareToken
          ? 'Anyone with this link can access the document according to the permissions set above.'
          : 'Create a link to share this document with people outside your project.'}
      </div>
    </div>
  )
}

export default ShareLinkSection
