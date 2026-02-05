'use client'

import { formatDistanceToNow, format } from 'date-fns'
import {
  Info, FileText, Clock, Eye, Edit3, Users, MessageSquare,
  Calendar, Target, Hash, BookOpen, X
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DocumentStats {
  wordCount: number
  charCount: number
  readingTime: number // in minutes
  pageCount: number // estimated
  version: number
  editCount: number
  viewCount: number
  collaboratorCount: number
  commentCount: number
}

interface DocumentInfoPanelProps {
  stats: DocumentStats
  createdAt: Date | string
  updatedAt: Date | string
  createdBy: {
    id: string
    name: string | null
    image: string | null
  }
  lastEditedBy?: {
    id: string
    name: string | null
    image: string | null
  } | null
  wordGoal?: number
  onWordGoalChange?: (goal: number) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function DocumentInfoPanel({
  stats,
  createdAt,
  updatedAt,
  createdBy,
  lastEditedBy,
  wordGoal = 0,
  onWordGoalChange,
  isCollapsed = false,
  onToggleCollapse,
}: DocumentInfoPanelProps) {
  const progressPercent = wordGoal > 0 ? Math.min((stats.wordCount / wordGoal) * 100, 100) : 0

  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-[var(--secondary)]/10 rounded-lg transition-colors"
      >
        <Info className="w-4 h-4" />
        <span className="font-semibold text-sm">Document Info</span>
        <span className="ml-auto text-xs text-[var(--muted)]">{stats.wordCount} words</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span className="font-bold text-sm">Document Info</span>
        </div>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Word count with goal */}
        <div className="p-3 bg-[var(--secondary)]/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--primary)]" />
              <span className="font-bold text-lg">{stats.wordCount.toLocaleString()}</span>
              <span className="text-sm text-[var(--muted)]">words</span>
            </div>
            {wordGoal > 0 && (
              <span className="text-xs text-[var(--muted)]">
                / {wordGoal.toLocaleString()} goal
              </span>
            )}
          </div>

          {wordGoal > 0 && (
            <div className="space-y-1">
              <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    progressPercent >= 100
                      ? 'bg-green-500'
                      : progressPercent >= 75
                      ? 'bg-blue-500'
                      : progressPercent >= 50
                      ? 'bg-yellow-500'
                      : 'bg-[var(--primary)]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{Math.round(progressPercent)}% complete</span>
                {progressPercent < 100 && (
                  <span>{(wordGoal - stats.wordCount).toLocaleString()} to go</span>
                )}
              </div>
            </div>
          )}

          {onWordGoalChange && (
            <div className="mt-2 flex items-center gap-2">
              <Target className="w-3 h-3 text-[var(--muted)]" />
              <input
                type="number"
                value={wordGoal || ''}
                onChange={(e) => onWordGoalChange(parseInt(e.target.value) || 0)}
                placeholder="Set word goal"
                className="flex-1 px-2 py-1 text-xs bg-[var(--background)] border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-[var(--secondary)]/5 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <Hash className="w-3 h-3" />
              <span className="text-[10px] uppercase">Characters</span>
            </div>
            <span className="font-bold text-sm">{stats.charCount.toLocaleString()}</span>
          </div>

          <div className="p-2 bg-[var(--secondary)]/5 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <BookOpen className="w-3 h-3" />
              <span className="text-[10px] uppercase">Read time</span>
            </div>
            <span className="font-bold text-sm">~{stats.readingTime} min</span>
          </div>

          <div className="p-2 bg-[var(--secondary)]/5 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <Eye className="w-3 h-3" />
              <span className="text-[10px] uppercase">Views</span>
            </div>
            <span className="font-bold text-sm">{stats.viewCount.toLocaleString()}</span>
          </div>

          <div className="p-2 bg-[var(--secondary)]/5 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <Edit3 className="w-3 h-3" />
              <span className="text-[10px] uppercase">Edits</span>
            </div>
            <span className="font-bold text-sm">{stats.editCount.toLocaleString()}</span>
          </div>

          <div className="p-2 bg-[var(--secondary)]/5 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <Users className="w-3 h-3" />
              <span className="text-[10px] uppercase">Collaborators</span>
            </div>
            <span className="font-bold text-sm">{stats.collaboratorCount}</span>
          </div>

          <div className="p-2 bg-[var(--secondary)]/5 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <MessageSquare className="w-3 h-3" />
              <span className="text-[10px] uppercase">Comments</span>
            </div>
            <span className="font-bold text-sm">{stats.commentCount}</span>
          </div>
        </div>

        {/* Version info */}
        <div className="p-3 bg-[var(--secondary)]/5 rounded-lg">
          <div className="flex items-center gap-1.5 text-[var(--muted)] mb-2">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] uppercase">Version</span>
          </div>
          <div className="font-bold text-sm">Version {stats.version}</div>
        </div>

        {/* Created info */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
              <Calendar className="w-3 h-3" />
              <span className="text-[10px] uppercase">Created</span>
            </div>
            <div className="flex items-center gap-2">
              {createdBy.image ? (
                <img
                  src={createdBy.image}
                  alt={createdBy.name || 'Creator'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-[10px] font-bold">
                  {createdBy.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div>
                <div className="text-sm font-medium">{createdBy.name || 'Unknown'}</div>
                <div className="text-[10px] text-[var(--muted)]">
                  {format(new Date(createdAt), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          </div>

          {/* Last edited info */}
          {lastEditedBy && (
            <div>
              <div className="flex items-center gap-1.5 text-[var(--muted)] mb-1">
                <Edit3 className="w-3 h-3" />
                <span className="text-[10px] uppercase">Last edited</span>
              </div>
              <div className="flex items-center gap-2">
                {lastEditedBy.image ? (
                  <img
                    src={lastEditedBy.image}
                    alt={lastEditedBy.name || 'Editor'}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[var(--secondary)]/30 flex items-center justify-center text-[10px] font-bold">
                    {lastEditedBy.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium">{lastEditedBy.name || 'Unknown'}</div>
                  <div className="text-[10px] text-[var(--muted)]">
                    {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentInfoPanel
