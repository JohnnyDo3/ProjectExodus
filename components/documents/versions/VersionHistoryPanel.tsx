'use client'

import { useState, useMemo } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import {
  Clock, History, RotateCcw, Eye, ChevronRight, Star, BookmarkPlus,
  Filter, Search, X, GitCompare
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface VersionAuthor {
  id: string
  name: string | null
  image: string | null
}

interface DocumentVersion {
  id: string
  versionNumber: number
  title: string
  content: string
  plainText?: string | null
  wordCount: number
  changeDescription?: string | null
  isAutoSaved: boolean
  isMajorVersion: boolean
  name?: string | null
  createdBy: VersionAuthor
  createdAt: Date | string
}

type VersionFilter = 'all' | 'checkpoints' | 'autosaved'

interface VersionHistoryPanelProps {
  versions: DocumentVersion[]
  currentVersion: number
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  onPreview?: (version: DocumentVersion) => void
  onRestore?: (version: DocumentVersion) => void
  onCompare?: (version1: DocumentVersion, version2: DocumentVersion) => void
  onCreateCheckpoint?: () => void
  onRenameVersion?: (versionId: string, name: string) => Promise<void>
}

export function VersionHistoryPanel({
  versions,
  currentVersion,
  isCollapsed = false,
  onToggleCollapse,
  onPreview,
  onRestore,
  onCompare,
  onCreateCheckpoint,
  onRenameVersion,
}: VersionHistoryPanelProps) {
  const [filter, setFilter] = useState<VersionFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<DocumentVersion | null>(null)
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null)
  const [renamingVersion, setRenamingVersion] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  // Sort versions by version number (newest first)
  const sortedVersions = useMemo(() => {
    return [...versions].sort((a, b) => b.versionNumber - a.versionNumber)
  }, [versions])

  // Apply filters
  const filteredVersions = useMemo(() => {
    let result = sortedVersions

    // Filter by type
    if (filter === 'checkpoints') {
      result = result.filter((v) => v.isMajorVersion || v.name)
    } else if (filter === 'autosaved') {
      result = result.filter((v) => v.isAutoSaved)
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (v) =>
          v.name?.toLowerCase().includes(term) ||
          v.changeDescription?.toLowerCase().includes(term) ||
          v.createdBy.name?.toLowerCase().includes(term) ||
          v.title.toLowerCase().includes(term)
      )
    }

    return result
  }, [sortedVersions, filter, searchTerm])

  // Group versions by date
  const groupedVersions = useMemo(() => {
    const groups: { [key: string]: DocumentVersion[] } = {}

    filteredVersions.forEach((version) => {
      const date = format(new Date(version.createdAt), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(version)
    })

    return groups
  }, [filteredVersions])

  const handleStartRename = (version: DocumentVersion) => {
    setRenamingVersion(version.id)
    setRenameValue(version.name || '')
  }

  const handleSubmitRename = async (versionId: string) => {
    if (onRenameVersion && renameValue.trim()) {
      await onRenameVersion(versionId, renameValue.trim())
    }
    setRenamingVersion(null)
    setRenameValue('')
  }

  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-[var(--secondary)]/10 rounded-lg transition-colors"
      >
        <History className="w-4 h-4" />
        <span className="font-semibold text-sm">Version History</span>
        <span className="ml-auto text-xs text-[var(--muted)]">v{currentVersion}</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4" />
          <span className="font-bold text-sm">Version History</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSearch(!showSearch)}
            className="h-7 w-7 p-0"
          >
            <Search className="w-4 h-4" />
          </Button>
          {onToggleCollapse && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleCollapse}
              className="h-7 w-7 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="p-2 border-b border-[var(--border)]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search versions..."
            className="w-full px-3 py-1.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            autoFocus
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-1 p-2 border-b border-[var(--border)]">
        <Button
          size="sm"
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
          className="h-7 px-2 text-xs flex-1"
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filter === 'checkpoints' ? 'primary' : 'ghost'}
          onClick={() => setFilter('checkpoints')}
          className="h-7 px-2 text-xs flex-1"
        >
          <Star className="w-3 h-3 mr-1" />
          Checkpoints
        </Button>
        <Button
          size="sm"
          variant={filter === 'autosaved' ? 'primary' : 'ghost'}
          onClick={() => setFilter('autosaved')}
          className="h-7 px-2 text-xs flex-1"
        >
          <Clock className="w-3 h-3 mr-1" />
          Auto-saved
        </Button>
      </div>

      {/* Create checkpoint button */}
      {onCreateCheckpoint && (
        <div className="p-2 border-b border-[var(--border)]">
          <Button
            onClick={onCreateCheckpoint}
            className="w-full h-8 text-xs font-bold"
          >
            <BookmarkPlus className="w-4 h-4 mr-1" />
            Create Checkpoint
          </Button>
        </div>
      )}

      {/* Compare mode indicator */}
      {selectedForCompare && (
        <div className="p-2 border-b border-[var(--border)] bg-[var(--primary)]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">
              Comparing with v{selectedForCompare.versionNumber}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedForCompare(null)}
              className="h-6 px-2 text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Versions list */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(groupedVersions).length > 0 ? (
          Object.entries(groupedVersions).map(([date, dateVersions]) => (
            <div key={date}>
              {/* Date header */}
              <div className="sticky top-0 px-3 py-1.5 text-xs font-medium text-[var(--muted)] bg-[var(--background)] border-b border-[var(--border)]">
                {format(new Date(date), 'MMMM d, yyyy')}
              </div>

              {/* Versions for this date */}
              {dateVersions.map((version) => {
                const isExpanded = expandedVersion === version.id
                const isRenaming = renamingVersion === version.id
                const isCurrent = version.versionNumber === currentVersion

                return (
                  <div
                    key={version.id}
                    className={`border-b border-[var(--border)] transition-colors ${
                      isCurrent ? 'bg-[var(--primary)]/5' : 'hover:bg-[var(--secondary)]/5'
                    }`}
                  >
                    {/* Version header */}
                    <div
                      className="flex items-start gap-2 p-3 cursor-pointer"
                      onClick={() => setExpandedVersion(isExpanded ? null : version.id)}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0 mt-0.5">
                        {version.createdBy.image ? (
                          <img
                            src={version.createdBy.image}
                            alt={version.createdBy.name || 'User'}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-xs font-bold">
                            {version.createdBy.name?.[0]?.toUpperCase() || '?'}
                          </div>
                        )}
                      </div>

                      {/* Version info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {isRenaming ? (
                            <input
                              type="text"
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmitRename(version.id)
                                if (e.key === 'Escape') setRenamingVersion(null)
                              }}
                              onBlur={() => handleSubmitRename(version.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 px-2 py-0.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                              autoFocus
                              placeholder="Version name"
                            />
                          ) : (
                            <>
                              <span className="font-medium text-sm">
                                {version.name || `Version ${version.versionNumber}`}
                              </span>
                              {version.isMajorVersion && (
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              )}
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 text-[10px] bg-[var(--primary)]/20 text-[var(--primary)] rounded font-bold">
                                  Current
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                          <span>{version.createdBy.name}</span>
                          <span>•</span>
                          <span>{format(new Date(version.createdAt), 'h:mm a')}</span>
                          <span>•</span>
                          <span>{version.wordCount} words</span>
                        </div>
                        {version.changeDescription && !isExpanded && (
                          <p className="text-xs text-[var(--muted)] mt-1 truncate">
                            {version.changeDescription}
                          </p>
                        )}
                      </div>

                      {/* Expand icon */}
                      <ChevronRight
                        className={`w-4 h-4 text-[var(--muted)] transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="px-3 pb-3 space-y-2">
                        {version.changeDescription && (
                          <p className="text-xs text-[var(--muted)]">
                            {version.changeDescription}
                          </p>
                        )}

                        <div className="flex items-center gap-2 flex-wrap">
                          {onPreview && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                onPreview(version)
                              }}
                              className="h-7 px-2 text-xs"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          )}

                          {onRestore && !isCurrent && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                onRestore(version)
                              }}
                              className="h-7 px-2 text-xs"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              Restore
                            </Button>
                          )}

                          {onCompare && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (selectedForCompare) {
                                  onCompare(selectedForCompare, version)
                                  setSelectedForCompare(null)
                                } else {
                                  setSelectedForCompare(version)
                                }
                              }}
                              className="h-7 px-2 text-xs"
                            >
                              <GitCompare className="w-3 h-3 mr-1" />
                              {selectedForCompare ? 'Compare' : 'Select for Compare'}
                            </Button>
                          )}

                          {onRenameVersion && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStartRename(version)
                              }}
                              className="h-7 px-2 text-xs"
                            >
                              Name
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <History className="w-8 h-8 mx-auto mb-3 text-[var(--muted)] opacity-50" />
            <p className="text-sm text-[var(--muted)]">
              {searchTerm
                ? 'No versions match your search'
                : filter === 'checkpoints'
                ? 'No checkpoints yet'
                : filter === 'autosaved'
                ? 'No auto-saved versions'
                : 'No version history'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VersionHistoryPanel
