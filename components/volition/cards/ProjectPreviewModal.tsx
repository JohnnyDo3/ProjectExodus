'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  X,
  ExternalLink,
  Users,
  Calendar,
  Target,
  MessageSquare,
  FileText,
  BookOpen,
  TrendingUp,
  Award,
  Rocket,
  ChevronRight
} from 'lucide-react'

interface ProjectMemberData {
  role: 'VIEWER' | 'CONTRIBUTOR' | 'MODERATOR' | 'ADMIN' | 'OWNER'
  contributionScore?: number
  recognitions?: { badge: string }[]
}

interface ProjectPreviewModalProps {
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
    membership?: ProjectMemberData
  } | null
  isOpen: boolean
  onClose: () => void
  userId?: string
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE: {
    bg: 'bg-[var(--primary)]/10',
    text: 'text-[var(--primary)]',
    label: 'Active'
  },
  COMPLETED: {
    bg: 'bg-[var(--accent)]/10',
    text: 'text-[var(--accent)]',
    label: 'Completed'
  },
  PLANNING: {
    bg: 'bg-[var(--secondary)]/10',
    text: 'text-[var(--secondary)]',
    label: 'Planning'
  },
  PAUSED: {
    bg: 'bg-[var(--foreground)]/10',
    text: 'text-[var(--foreground)]/60',
    label: 'Paused'
  },
  ARCHIVED: {
    bg: 'bg-[var(--muted)]',
    text: 'text-[var(--muted-foreground)]',
    label: 'Archived'
  },
}

const roleColors: Record<string, { bg: string; text: string; label: string }> = {
  OWNER: { bg: 'bg-amber-500/10', text: 'text-amber-500', label: 'Owner' },
  ADMIN: { bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'Admin' },
  MODERATOR: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'Moderator' },
  CONTRIBUTOR: { bg: 'bg-green-500/10', text: 'text-green-500', label: 'Contributor' },
  VIEWER: { bg: 'bg-gray-500/10', text: 'text-gray-500', label: 'Viewer' },
}

export function ProjectPreviewModal({
  project,
  isOpen,
  onClose,
  userId
}: ProjectPreviewModalProps) {
  // Guard against null project
  if (!project) {
    return null
  }

  const isOwner = project.creatorId === userId
  const colors = statusColors[project.status] || statusColors.PLANNING
  const membership = project.membership
  const role = membership?.role || (isOwner ? 'OWNER' : undefined)
  const roleInfo = role ? roleColors[role] : null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] w-full max-w-lg overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 p-6">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Project icon */}
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-4">
                  <Rocket className="w-7 h-7 text-white" />
                </div>

                {/* Title and badges */}
                <h2 className="text-xl font-bold text-white mb-2 pr-10">
                  {project.name}
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${colors.bg} ${colors.text} bg-white/90`}>
                    {colors.label}
                  </span>
                  {roleInfo && (
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${roleInfo.bg} ${roleInfo.text} bg-white/90`}>
                      {roleInfo.label}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Description */}
                {project.description && (
                  <p className="text-[var(--foreground)]/80 text-sm leading-relaxed">
                    {project.description}
                  </p>
                )}

                {/* Goal */}
                {project.goal && (
                  <div className="flex items-start gap-3 p-3 bg-[var(--muted)]/50 rounded-xl">
                    <Target className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-[var(--foreground)]/60 uppercase tracking-wide mb-1">Goal</p>
                      <p className="text-sm text-[var(--foreground)]">{project.goal}</p>
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-[var(--muted)]/50 rounded-xl">
                    <Users className="w-5 h-5 mx-auto mb-1 text-[var(--foreground)]/60" />
                    <p className="text-lg font-bold">{project._count?.members || 0}</p>
                    <p className="text-[10px] text-[var(--foreground)]/50 uppercase">Members</p>
                  </div>
                  <div className="text-center p-3 bg-[var(--muted)]/50 rounded-xl">
                    <MessageSquare className="w-5 h-5 mx-auto mb-1 text-[var(--foreground)]/60" />
                    <p className="text-lg font-bold">{project._count?.discussions || 0}</p>
                    <p className="text-[10px] text-[var(--foreground)]/50 uppercase">Discussions</p>
                  </div>
                  <div className="text-center p-3 bg-[var(--muted)]/50 rounded-xl">
                    <FileText className="w-5 h-5 mx-auto mb-1 text-[var(--foreground)]/60" />
                    <p className="text-lg font-bold">{project._count?.researchPosts || 0}</p>
                    <p className="text-[10px] text-[var(--foreground)]/50 uppercase">Research</p>
                  </div>
                  <div className="text-center p-3 bg-[var(--muted)]/50 rounded-xl">
                    <BookOpen className="w-5 h-5 mx-auto mb-1 text-[var(--foreground)]/60" />
                    <p className="text-lg font-bold">{project._count?.learningModules || 0}</p>
                    <p className="text-[10px] text-[var(--foreground)]/50 uppercase">Modules</p>
                  </div>
                </div>

                {/* Your Contributions (if member) */}
                {membership && membership.contributionScore !== undefined && membership.contributionScore > 0 && (
                  <div className="flex items-center justify-between p-3 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                      <span className="text-sm font-medium">Your Contributions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[var(--primary)]">{membership.contributionScore} pts</span>
                      {membership.recognitions && membership.recognitions.length > 0 && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-medium">{membership.recognitions.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Date info */}
                <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/50">
                  <Calendar className="w-4 h-4" />
                  <span>Created {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)] transition-colors"
                >
                  Close
                </button>
                <Link
                  href={`/community/projects/${project.slug}`}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Project
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectPreviewModal
