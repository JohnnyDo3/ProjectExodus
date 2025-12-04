'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Rocket, ChevronRight, Users, Clock, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Project {
  id: string
  name: string
  slug: string
  description: string
  status: string
  createdAt: Date | string
  _count: {
    members: number
  }
}

interface Props {
  initialProjects: Project[]
}

const statusConfig: Record<string, { label: string, className: string }> = {
  ACTIVE: { label: 'Active', className: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30' },
  PLANNING: { label: 'Planning', className: 'bg-amber-500/20 text-amber-600 border-amber-500/30' },
  COMPLETED: { label: 'Completed', className: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
  PAUSED: { label: 'Paused', className: 'bg-gray-500/20 text-gray-600 border-gray-500/30' },
}

export function ActiveProjectsWidget({ initialProjects }: Props) {
  const [filter, setFilter] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  useEffect(() => {
    const sorted = [...initialProjects]
    if (filter === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (filter === 'oldest') {
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (filter === 'popular') {
      sorted.sort((a, b) => b._count.members - a._count.members)
    }
    setProjects(sorted)
  }, [filter, initialProjects])

  function getTimeAgo(dateString: Date | string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-[var(--card)] rounded-3xl border-4 border-theme-secondary/30 shadow-lg overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <div className="p-5 border-b border-[var(--border)] relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 flex items-center justify-center shadow-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--foreground)]">Active Projects</h2>
              <p className="text-xs font-semibold text-theme-muted">Collaborate with the community</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/community/projects/new">
              <Button size="sm" className="bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 text-white font-bold rounded-full shadow-md hover:shadow-lg">
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </Link>
            <Link href="/community/projects">
              <Button variant="ghost" size="sm" className="font-bold text-sm rounded-full hover:bg-[var(--muted)]">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mt-4">
          {[
            { id: 'newest', label: 'Newest' },
            { id: 'oldest', label: 'Oldest' },
            { id: 'popular', label: 'Most Members' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 text-white shadow-md'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-5">
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
            <p className="text-sm font-bold text-theme-muted">No active projects yet</p>
            <p className="text-xs font-medium text-theme-muted mt-1">Start a new project to get the ball rolling!</p>
            <Link href="/community/projects/new" className="inline-block mt-4">
              <Button size="sm" className="bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 text-white font-bold rounded-full">
                <Plus className="w-4 h-4 mr-1" />
                Create Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project, index) => {
              const status = statusConfig[project.status] || statusConfig.ACTIVE

              return (
                <Link key={project.id} href={`/community/projects/${project.slug}`}>
                  <div className={`group relative p-5 rounded-2xl transition-all hover:shadow-lg cursor-pointer border-2 border-transparent hover:border-theme-secondary/30 h-full ${
                    index === 0 ? 'bg-gradient-to-br from-[var(--secondary)]/5 to-[var(--secondary)]/10' : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)]'
                  }`}>
                    {/* Status badge */}
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase ${status.className}`}>
                      {status.label}
                    </div>

                    {/* Content */}
                    <div className="pr-16">
                      <h3 className="font-black text-base text-[var(--foreground)] line-clamp-1 group-hover:text-theme-secondary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm font-medium text-theme-muted mt-1.5 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-theme-muted">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{project._count.members} members</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-theme-muted">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{getTimeAgo(project.createdAt)}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-theme-muted group-hover:text-theme-secondary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
