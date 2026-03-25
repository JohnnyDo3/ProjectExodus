'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  MessageSquare,
  FileText,
  BookOpen,
  Users,
  FolderKanban,
  Link2,
  Target,
  Bell,
  BarChart3,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import type { LayoutSection } from './LayoutBuilder'

interface ProjectData {
  id: string
  slug: string
  name: string
  discussions?: { id: string; title: string; replyCount: number; author: { name: string } }[]
  researchPosts?: { id: string; heading: string; author: { name: string }; createdAt: Date }[]
  learningModules?: { id: string; title: string; difficulty: string }[]
  subgroups?: { id: string; name: string; memberCount: number }[]
  members?: { id: string; user: { name: string; image?: string }; role: string }[]
  _count?: {
    discussions: number
    researchPosts: number
    learningModules: number
    subgroups: number
    members: number
  }
}

interface LayoutRendererProps {
  project: ProjectData
  layout: LayoutSection[]
  userRole?: 'VIEWER' | 'CONTRIBUTOR' | 'MODERATOR' | 'ADMIN' | 'OWNER'
  className?: string
}

const SECTION_ICONS: Record<string, typeof MessageSquare> = {
  discussions: MessageSquare,
  research: FileText,
  learning: BookOpen,
  members: Users,
  subgroups: FolderKanban,
  resources: Link2,
  milestones: Target,
  announcements: Bell,
  activity: BarChart3
}

export function LayoutRenderer({
  project,
  layout,
  userRole = 'VIEWER',
  className = ''
}: LayoutRendererProps) {
  // Filter and sort sections based on visibility and user role
  const visibleSections = layout
    .filter(section => {
      if (!section.enabled) return false

      // Check visibility
      if (section.visibility === 'admins' && !['ADMIN', 'OWNER'].includes(userRole)) {
        return false
      }
      if (section.visibility === 'contributors' && userRole === 'VIEWER') {
        return false
      }

      return true
    })
    .sort((a, b) => a.order - b.order)

  return (
    <div className={`space-y-6 ${className}`}>
      {visibleSections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SectionRenderer
            section={section}
            project={project}
            userRole={userRole}
          />
        </motion.div>
      ))}

      {visibleSections.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          <p>No sections available yet.</p>
          {['ADMIN', 'OWNER'].includes(userRole) && (
            <Link
              href={`/community/projects/${project.slug}/settings/layout`}
              className="text-[var(--primary)] hover:underline mt-2 inline-block"
            >
              Configure project layout
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

interface SectionRendererProps {
  section: LayoutSection
  project: ProjectData
  userRole: string
}

function SectionRenderer({ section, project, userRole }: SectionRendererProps) {
  const Icon = SECTION_ICONS[section.icon] || MessageSquare
  const title = section.customTitle || section.name
  const baseUrl = `/community/projects/${project.slug}`

  const sectionContent: Record<string, React.ReactNode> = {
    discussions: (
      <DiscussionsPreview
        discussions={project.discussions || []}
        count={project._count?.discussions || 0}
        projectUrl={baseUrl}
      />
    ),
    research: (
      <ResearchPreview
        posts={project.researchPosts || []}
        count={project._count?.researchPosts || 0}
        projectUrl={baseUrl}
      />
    ),
    learning: (
      <LearningPreview
        modules={project.learningModules || []}
        count={project._count?.learningModules || 0}
        projectUrl={baseUrl}
      />
    ),
    subgroups: (
      <SubgroupsPreview
        subgroups={project.subgroups || []}
        count={project._count?.subgroups || 0}
        projectUrl={baseUrl}
      />
    ),
    members: (
      <MembersPreview
        members={project.members || []}
        count={project._count?.members || 0}
        projectUrl={baseUrl}
      />
    ),
    resources: (
      <PlaceholderSection title="Resources" description="External links and documents" />
    ),
    milestones: (
      <PlaceholderSection title="Goals & Milestones" description="Track project progress" />
    ),
    announcements: (
      <PlaceholderSection title="Announcements" description="Important project updates" />
    ),
    activity: (
      <PlaceholderSection title="Activity Feed" description="Recent project activity" />
    )
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <Link
          href={`${baseUrl}/${section.id}`}
          className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Section Content */}
      <div className="p-4">
        {sectionContent[section.id] || (
          <PlaceholderSection title={title} description="Coming soon" />
        )}
      </div>
    </div>
  )
}

// Preview Components

function DiscussionsPreview({
  discussions,
  count,
  projectUrl
}: {
  discussions: NonNullable<ProjectData['discussions']>
  count: number
  projectUrl: string
}) {
  if (discussions.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        message="No discussions yet"
        action={{ label: 'Start a discussion', href: `${projectUrl}/discussions/new` }}
      />
    )
  }

  return (
    <div className="space-y-2">
      {discussions.slice(0, 3).map(d => (
        <Link
          key={d.id}
          href={`${projectUrl}/discussions/${d.id}`}
          className="block p-3 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          <p className="font-medium text-sm line-clamp-1">{d.title}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {d.author.name} · {d.replyCount} replies
          </p>
        </Link>
      ))}
      {count > 3 && (
        <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">
          +{count - 3} more discussions
        </p>
      )}
    </div>
  )
}

function ResearchPreview({
  posts,
  count,
  projectUrl
}: {
  posts: NonNullable<ProjectData['researchPosts']>
  count: number
  projectUrl: string
}) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        message="No research posts yet"
        action={{ label: 'Share research', href: `${projectUrl}/research/new` }}
      />
    )
  }

  return (
    <div className="space-y-2">
      {posts.slice(0, 3).map(p => (
        <Link
          key={p.id}
          href={`${projectUrl}/research/${p.id}`}
          className="block p-3 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          <p className="font-medium text-sm line-clamp-1">{p.heading}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {p.author.name} · {new Date(p.createdAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
      {count > 3 && (
        <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">
          +{count - 3} more posts
        </p>
      )}
    </div>
  )
}

function LearningPreview({
  modules,
  count,
  projectUrl
}: {
  modules: NonNullable<ProjectData['learningModules']>
  count: number
  projectUrl: string
}) {
  if (modules.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        message="No learning modules yet"
        action={{ label: 'Create module', href: `${projectUrl}/learn/new` }}
      />
    )
  }

  const difficultyColors: Record<string, string> = {
    BEGINNER: 'bg-green-500/10 text-green-500',
    INTERMEDIATE: 'bg-amber-500/10 text-amber-500',
    ADVANCED: 'bg-red-500/10 text-red-500',
    CURRENT_STATE: 'bg-purple-500/10 text-purple-500'
  }

  return (
    <div className="space-y-2">
      {modules.slice(0, 4).map(m => (
        <Link
          key={m.id}
          href={`${projectUrl}/learn/${m.id}`}
          className="flex items-center justify-between p-3 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          <span className="font-medium text-sm line-clamp-1">{m.title}</span>
          <span className={`px-2 py-0.5 text-xs rounded-full ${difficultyColors[m.difficulty] || ''}`}>
            {m.difficulty}
          </span>
        </Link>
      ))}
      {count > 4 && (
        <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">
          +{count - 4} more modules
        </p>
      )}
    </div>
  )
}

function SubgroupsPreview({
  subgroups,
  count,
  projectUrl
}: {
  subgroups: NonNullable<ProjectData['subgroups']>
  count: number
  projectUrl: string
}) {
  if (subgroups.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        message="No subgroups yet"
        action={{ label: 'Create subgroup', href: `${projectUrl}/subgroups/new` }}
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {subgroups.slice(0, 4).map(s => (
        <Link
          key={s.id}
          href={`${projectUrl}/subgroups/${s.id}`}
          className="p-3 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          <p className="font-medium text-sm line-clamp-1">{s.name}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {s.memberCount} members
          </p>
        </Link>
      ))}
      {count > 4 && (
        <div className="col-span-2 text-xs text-[var(--muted-foreground)] text-center pt-2">
          +{count - 4} more subgroups
        </div>
      )}
    </div>
  )
}

function MembersPreview({
  members,
  count,
  projectUrl
}: {
  members: NonNullable<ProjectData['members']>
  count: number
  projectUrl: string
}) {
  if (members.length === 0) {
    return (
      <EmptyState
        icon={Users}
        message="No members yet"
      />
    )
  }

  return (
    <div>
      <div className="flex -space-x-2 mb-3">
        {members.slice(0, 8).map((m, i) => (
          <div
            key={m.id}
            className="relative w-10 h-10 rounded-full border-2 border-[var(--card)] bg-[var(--muted)] flex items-center justify-center overflow-hidden"
            style={{ zIndex: 10 - i }}
          >
            {m.user.image ? (
              <Image src={m.user.image} alt={m.user.name || ''} fill unoptimized sizes="100%" className="object-cover" />
            ) : (
              <span className="text-sm font-medium">
                {(m.user.name || 'U').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        ))}
        {count > 8 && (
          <div
            className="w-10 h-10 rounded-full border-2 border-[var(--card)] bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-xs font-medium"
            style={{ zIndex: 2 }}
          >
            +{count - 8}
          </div>
        )}
      </div>
      <p className="text-sm text-[var(--muted-foreground)]">
        {count} member{count !== 1 ? 's' : ''} in this project
      </p>
    </div>
  )
}

function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-6 text-[var(--muted-foreground)]">
      <p className="font-medium">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  message,
  action
}: {
  icon: typeof MessageSquare
  message: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="text-center py-6">
      <Icon className="w-8 h-8 mx-auto text-[var(--muted-foreground)]/50 mb-2" />
      <p className="text-sm text-[var(--muted-foreground)]">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-block mt-3 text-sm text-[var(--primary)] hover:underline"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

export default LayoutRenderer
