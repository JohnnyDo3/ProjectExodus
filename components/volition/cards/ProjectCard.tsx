'use client'

import { Users, Target, Calendar, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

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
    }
  }
  userId?: string
  isCompact?: boolean
  onDelete?: (id: string) => void
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
}

export function ProjectCard({
  project,
  userId,
  isCompact = false,
  onDelete,
  className = '',
}: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const isOwner = project.creatorId === userId
  const colors = statusColors[project.status] || statusColors.PLANNING

  if (isCompact) {
    return (
      <Link
        href={`/community/projects/${project.slug}`}
        className={`block bg-[var(--muted)] rounded-xl p-3 hover:bg-[var(--muted)]/80 transition-colors ${className}`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
            {project.status}
          </span>
          {isOwner && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[var(--accent)]/10 text-[var(--accent)]">
              OWNER
            </span>
          )}
        </div>
        <h4 className="font-bold text-[var(--foreground)] truncate mb-1">{project.name}</h4>
        <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/50">
          <Users className="w-3 h-3" />
          <span>{project._count?.members || 0} members</span>
        </div>
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
            {isOwner && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-[var(--accent)]/10 text-[var(--accent)]">
                OWNER
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

        <Link
          href={`/community/projects/${project.slug}`}
          className="px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  )
}
