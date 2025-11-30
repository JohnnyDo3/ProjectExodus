'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Rocket, ChevronRight } from 'lucide-react'
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

export function ActiveProjectsWidget({ initialProjects }: Props) {
  const [filter, setFilter] = useState<'newest' | 'oldest'>('newest')
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  useEffect(() => {
    const sorted = [...initialProjects]
    if (filter === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    setProjects(sorted)
  }, [filter, initialProjects])

  return (
    <div className="p-5 bg-[var(--card)] rounded-3xl border-3 border-theme-secondary/40 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base font-black text-[var(--foreground)]">Active Projects</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <button
              onClick={() => setFilter('newest')}
              className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors ${
                filter === 'newest'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setFilter('oldest')}
              className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors ${
                filter === 'oldest'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
              }`}
            >
              Oldest
            </button>
          </div>
          <Link href="/community/projects">
            <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full hover:bg-[var(--muted)]">
              View all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/community/projects/${project.slug}`}>
            <div className="p-4 bg-[var(--muted)]/50 rounded-2xl hover:bg-[var(--muted)] transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-theme-secondary/30 h-full">
              <h3 className="font-bold text-sm text-[var(--foreground)] mb-1.5 line-clamp-1">{project.name}</h3>
              <p className="text-xs font-medium text-theme-muted mb-2 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between text-[10px] font-bold text-theme-muted">
                <span><span title="Members">@</span> {project._count.members} members</span>
                <span className="px-2 py-0.5 bg-theme-secondary/20 text-theme-secondary rounded-full">
                  {project.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
