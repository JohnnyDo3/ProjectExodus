'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Briefcase, Plus, Edit2, Trash2 } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface DeckCard {
  id: string
  title: string
  subtitle?: string
  date?: Date
  slug?: string
  isOwner?: boolean
}

interface ProjectsWidgetProps {
  projects: any[]
  userId?: string
  onRemove?: () => void
  filter?: string
  onFilterChange?: (filter: string) => void
  onDeleteProject?: (id: string) => void
}

export function ProjectsWidget({
  projects,
  userId,
  onRemove,
  filter = 'all',
  onFilterChange,
  onDeleteProject,
}: ProjectsWidgetProps) {
  const router = useRouter()
  const [projectCards, setProjectCards] = useState<DeckCard[]>([])

  useEffect(() => {
    if (projects.length > 0) {
      // Filter projects based on filter
      let filteredProjects = [...projects]
      if (filter === 'created') {
        filteredProjects = projects.filter(p => p.creatorId === userId)
      } else if (filter === 'joined') {
        filteredProjects = projects.filter(p => p.creatorId !== userId)
      }

      const cards: DeckCard[] = filteredProjects.map(project => ({
        id: project.id,
        title: project.name,
        subtitle: project.status,
        date: new Date(project.createdAt),
        slug: project.slug,
        isOwner: project.creatorId === userId,
      }))
      setProjectCards(cards)
    } else {
      setProjectCards([])
    }
  }, [projects, filter, userId])

  const handleEditProject = (slug: string) => {
    router.push(`/community/projects/${slug}?edit=true`)
  }

  const filterButtons = (
    <div className="flex gap-1">
      {[
        { id: 'all', label: 'All' },
        { id: 'created', label: 'Mine' },
        { id: 'joined', label: 'Joined' },
      ].map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange?.(f.id)}
          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
            filter === f.id
              ? 'bg-[var(--secondary)] text-white'
              : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]/20'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )

  return (
    <WidgetWrapper
      id="projects"
      title="My Projects"
      icon={Briefcase}
      theme="secondary"
      onRemove={onRemove}
      showRemove={!!onRemove}
      headerActions={
        <Link href="/community/projects/new">
          <button className="w-6 h-6 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </Link>
      }
    >
      <div className="flex flex-col h-full">
        {/* Filters */}
        <div className="px-3 py-2 border-b border-[var(--border)]">
          {filterButtons}
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {projectCards.map(card => (
            <div key={card.id} className="relative group">
              <Link href={`/community/projects/${card.slug}`}>
                <div className="p-2.5 bg-gradient-to-br from-[var(--secondary)]/5 to-transparent border border-[var(--secondary)]/20 rounded-lg cursor-pointer hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-1 pr-5">
                      {card.title}
                    </h3>
                    {card.isOwner && (
                      <span className="text-[8px] font-bold px-1 bg-[var(--secondary)] text-white rounded">
                        Owner
                      </span>
                    )}
                  </div>
                  {card.date && (
                    <p className="text-[10px] text-[var(--foreground)]/40 mt-1">
                      {card.date.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
              {/* Only show edit/delete for owner */}
              {card.isOwner && (
                <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleEditProject(card.slug || '')
                    }}
                    className="w-5 h-5 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                    title="Edit"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onDeleteProject?.(card.id)
                    }}
                    className="w-5 h-5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                    title="Delete"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
          {projectCards.length === 0 && (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-[var(--foreground)]/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-[var(--foreground)]/50">No projects yet</p>
              <Link href="/community/projects/new">
                <button className="mt-3 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-xs font-medium hover:bg-[var(--primary)] transition-colors">
                  Create One
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  )
}
