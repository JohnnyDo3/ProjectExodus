'use client'

import { Users, Target, Calendar, MoreHorizontal, Eye, Edit, Trash2, Award, MessageSquare, FileText, BookOpen, TrendingUp, Rocket } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ViewMode } from '@/hooks/useVolitionLayout'

interface ProjectMemberData {
  role: 'VIEWER' | 'CONTRIBUTOR' | 'MODERATOR' | 'ADMIN' | 'OWNER'
  contributionScore?: number
  recognitions?: { badge: string }[]
}

interface ProjectCardProps {
  project: {
    id: string
    name: string
    slug: string
    description?: string | null
    goal?: string | null
    status: string
    creatorId: string
    createdAt: string | Date
    _count?: {
      members?: number
      discussions?: number
      researchPosts?: number
      learningModules?: number
    }
    // User's membership in this project
    membership?: ProjectMemberData
  }
  userId?: string
  viewMode?: ViewMode
  onDelete?: (id: string) => void
  onPreview?: (project: any) => void // Show preview modal instead of navigating
  showContributions?: boolean // New: show contribution summary
  className?: string
}

const statusColors: Record<string, { bg: string; text: string }> = {
  ACTIVE: {
    bg: 'bg-[var(--primary)]/10',
    text: 'text-[var(--primary)]',
  },
  COMPLETED: {
    bg: 'bg-[var(--accent)]/10',
    text: 'text-[var(--accent)]',
  },
  PLANNING: {
    bg: 'bg-[var(--secondary)]/10',
    text: 'text-[var(--secondary)]',
  },
  PAUSED: {
    bg: 'bg-[var(--foreground)]/10',
    text: 'text-[var(--foreground)]/60',
  },
  ARCHIVED: {
    bg: 'bg-[var(--muted)]',
    text: 'text-[var(--muted-foreground)]',
  },
}

const roleColors: Record<string, { bg: string; text: string; label: string }> = {
  OWNER: { bg: 'bg-amber-500/10', text: 'text-amber-500', label: 'Owner' },
  ADMIN: { bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'Admin' },
  MODERATOR: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'Mod' },
  CONTRIBUTOR: { bg: 'bg-green-500/10', text: 'text-green-500', label: 'Contributor' },
  VIEWER: { bg: 'bg-gray-500/10', text: 'text-gray-500', label: 'Viewer' },
}

export function ProjectCard({
  project,
  userId,
  viewMode = 'expanded',
  onDelete,
  onPreview,
  showContributions = false,
  className = '',
}: ProjectCardProps) {
  const isCompact = viewMode === 'compact'
  const isMinimal = viewMode === 'minimal'
  const [showMenu, setShowMenu] = useState(false)
  const isOwner = project.creatorId === userId

  // Minimal view - compact one-liner row for dashboard tile
  if (isMinimal) {
    const colors = statusColors[project.status] || statusColors.PLANNING
    return (
      <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors ${className}`}>
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />
        <span className="text-[11px] font-medium text-[var(--foreground)] truncate flex-1">{project.name}</span>
        <span className={`text-[9px] font-bold uppercase ${colors.text} flex-shrink-0`}>{project.status}</span>
      </div>
    )
  }
  const colors = statusColors[project.status] || statusColors.PLANNING
  const membership = project.membership
  const role = membership?.role || (isOwner ? 'OWNER' : undefined)
  const roleInfo = role ? roleColors[role] : null

  if (isCompact) {
    const compactContent = (
      <>
        <div className="flex items-center justify-between mb-1">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
            {project.status}
          </span>
          {roleInfo && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${roleInfo.bg} ${roleInfo.text}`}>
              {roleInfo.label}
            </span>
          )}
        </div>
        <h4 className="font-bold text-[var(--foreground)] truncate mb-1">{project.name}</h4>
        <div className="flex items-center gap-3 text-xs text-[var(--foreground)]/50">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {project._count?.members || 0}
          </span>
          {membership?.contributionScore !== undefined && membership.contributionScore > 0 && (
            <span className="flex items-center gap-1 text-[var(--primary)]">
              <TrendingUp className="w-3 h-3" />
              {membership.contributionScore}
            </span>
          )}
        </div>
      </>
    )

    // If onPreview is provided, use a button to show modal; otherwise use Link
    if (onPreview) {
      return (
        <button
          onClick={() => onPreview(project)}
          className={`block w-full text-left bg-[var(--muted)] rounded-xl p-3 hover:bg-[var(--muted)]/80 transition-colors ${className}`}
        >
          {compactContent}
        </button>
      )
    }

    return (
      <Link
        href={`/community/projects/${project.slug}`}
        className={`block bg-[var(--muted)] rounded-xl p-3 hover:bg-[var(--muted)]/80 transition-colors ${className}`}
      >
        {compactContent}
      </Link>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
              {project.status}
            </span>
            {roleInfo && (
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${roleInfo.bg} ${roleInfo.text}`}>
                {roleInfo.label}
              </span>
            )}
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-[var(--background)] transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-[var(--foreground)]/60" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-[var(--card)] rounded-lg shadow-lg border border-[var(--border)] py-1 min-w-[140px]">
                  <Link
                    href={`/community/projects/${project.slug}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  {isOwner && (
                    <>
                      <Link
                        href={`/community/projects/${project.slug}/edit`}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                        onClick={() => setShowMenu(false)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      {onDelete && (
                        <button
                          onClick={() => {
                            setShowMenu(false)
                            onDelete(project.id)
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <h4 className="text-base font-bold text-[var(--foreground)] mb-1 line-clamp-2">
          {project.name}
        </h4>

        {project.description && (
          <p className="text-sm text-[var(--foreground)]/60 line-clamp-2 mb-2">
            {project.description}
          </p>
        )}

        {project.goal && (
          <div className="flex items-start gap-2 text-xs text-[var(--foreground)]/50 mb-2">
            <Target className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{project.goal}</span>
          </div>
        )}
      </div>

      {/* Contribution Stats (optional) */}
      {showContributions && membership && (
        <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--background)]/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--foreground)]/70">Your Contributions</span>
            {membership.contributionScore !== undefined && (
              <span className="flex items-center gap-1 text-xs font-bold text-[var(--primary)]">
                <TrendingUp className="w-3 h-3" />
                {membership.contributionScore} pts
              </span>
            )}
          </div>
          {membership.recognitions && membership.recognitions.length > 0 && (
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs text-[var(--foreground)]/60">
                {membership.recognitions.length} badge{membership.recognitions.length !== 1 ? 's' : ''} earned
              </span>
            </div>
          )}
        </div>
      )}

      {/* Project Stats */}
      {showContributions && (
        <div className="px-4 py-2 border-t border-[var(--border)] grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-sm font-bold">{project._count?.members || 0}</p>
            <p className="text-[10px] text-[var(--foreground)]/50">Members</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">{project._count?.discussions || 0}</p>
            <p className="text-[10px] text-[var(--foreground)]/50">Discussions</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">{project._count?.researchPosts || 0}</p>
            <p className="text-[10px] text-[var(--foreground)]/50">Research</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">{project._count?.learningModules || 0}</p>
            <p className="text-[10px] text-[var(--foreground)]/50">Modules</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-[var(--foreground)]/50">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{project._count?.members || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onPreview && (
            <button
              onClick={() => onPreview(project)}
              className="px-3 py-1.5 rounded-lg bg-[var(--muted)] text-[var(--foreground)]/70 text-xs font-bold hover:bg-[var(--muted)]/80 transition-colors"
            >
              Preview
            </button>
          )}
          <Link
            href={`/community/projects/${project.slug}`}
            className="px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
          >
            {onPreview ? 'Expand' : 'View'}
          </Link>
        </div>
      </div>
    </div>
  )
}
