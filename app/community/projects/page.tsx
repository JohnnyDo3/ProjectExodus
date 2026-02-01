'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/navigation/BackButton'
import {
  Briefcase,
  User,
  Users,
  MapPin,
  Target,
  CheckCircle,
  Newspaper,
  LayoutGrid,
  List,
  BookOpen,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import { useState, useEffect } from 'react'

type ViewMode = 'newspaper' | 'grid' | 'compact' | 'magazine'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('newspaper')
  const [showViewSelector, setShowViewSelector] = useState(false)

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem('projects_view_mode')
    if (savedView && ['newspaper', 'grid', 'compact', 'magazine'].includes(savedView)) {
      setViewMode(savedView as ViewMode)
    }
  }, [])

  // Save view preference to localStorage
  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('projects_view_mode', mode)
    setShowViewSelector(false)
  }

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects', {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await res.json()
        setProjects(data.success ? data.data : [])
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const statusColors = {
    ACTIVE: { bg: 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]', text: 'text-theme-primary', border: 'border-theme-primary' },
    COMPLETED: { bg: 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]', text: 'text-theme-accent', border: 'border-theme-accent' },
    PLANNING: { bg: 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]', text: 'text-theme-secondary', border: 'border-theme-secondary' },
  }

  const viewOptions = [
    { id: 'newspaper' as ViewMode, label: 'Newspaper', icon: Newspaper, description: 'Detailed article-style cards' },
    { id: 'grid' as ViewMode, label: 'Grid', icon: LayoutGrid, description: 'Compact grid layout' },
    { id: 'compact' as ViewMode, label: 'List', icon: List, description: 'Dense list view' },
    { id: 'magazine' as ViewMode, label: 'Magazine', icon: BookOpen, description: 'Medium-sized cards' },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Floating View Selector Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="border-2 border-theme-primary bg-[var(--background)]/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-3">
            {showViewSelector ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--border)]">
                  <span className="text-xs font-black uppercase tracking-wide">Layout View</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowViewSelector(false)}
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
                {viewOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = viewMode === option.id
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleViewChange(option.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]'
                          : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
                      <div className="flex-1 text-left">
                        <div className="font-black text-sm">{option.label}</div>
                        <div className={`text-xs ${isActive ? 'opacity-90' : 'text-theme-muted'}`}>
                          {option.description}
                        </div>
                      </div>
                      {isActive && (
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1" />
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowViewSelector(true)}
                className="font-bold h-8"
                title="Change Layout View"
              >
                {viewOptions.find(v => v.id === viewMode)?.icon && (
                  (() => {
                    const Icon = viewOptions.find(v => v.id === viewMode)!.icon
                    return <Icon className="w-4 h-4 mr-2" />
                  })()
                )}
                <span className="hidden sm:inline">Layout</span>
                <Settings className="w-3 h-3 ml-2 sm:ml-1" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Newspaper Column Header */}
      <section className="border-b-8 border-double border-[var(--foreground)] bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <BackButton label="Back to Community" fallbackUrl="/community" />
          </div>

          {/* Newspaper Masthead Style Header */}
          <div className="max-w-4xl mx-auto text-center border-y-4 border-double border-[var(--foreground)] py-6">
            <div className="text-xs font-black tracking-[0.3em] text-theme-muted mb-2 uppercase">
              Community Section • Live Updates
            </div>
            <h1 className="text-7xl font-black text-[var(--foreground)] tracking-tight leading-none mb-2" style={{ fontFamily: 'serif' }}>
              COMMUNITY PROJECTS
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs font-bold text-theme-muted">
              <span>Est. 2024</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>Vol. {new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Subheadline */}
          <div className="max-w-3xl mx-auto text-center mt-6">
            <p className="text-lg font-semibold text-[var(--foreground)] italic leading-relaxed">
              Ongoing initiatives and collaborative efforts from our global community working toward a sustainable future
            </p>
          </div>
        </div>
      </section>

      {/* Stats - Newspaper Info Box */}
      <section className="bg-[var(--muted)] border-b-4 border-[var(--foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="border-4 border-double border-[var(--foreground)] bg-[var(--background)] p-6">
              <div className="text-center mb-4">
                <h3 className="text-sm font-black tracking-widest uppercase text-theme-muted border-b-2 border-[var(--foreground)] pb-2 inline-block px-4">
                  At a Glance
                </h3>
              </div>
              <div className="grid grid-cols-3 divide-x-2 divide-[var(--foreground)]">
                <div className="text-center px-4">
                  <div className="text-5xl font-black mb-1 text-[var(--foreground)]" style={{ fontFamily: 'serif' }}>
                    {projects.filter((p: any) => p.status === 'ACTIVE').length}
                  </div>
                  <div className="text-xs font-black text-theme-muted uppercase tracking-wide">
                    Active Projects
                  </div>
                </div>
                <div className="text-center px-4">
                  <div className="text-5xl font-black mb-1 text-[var(--foreground)]" style={{ fontFamily: 'serif' }}>
                    {projects.reduce((sum: number, p: any) => sum + p._count.members, 0)}
                  </div>
                  <div className="text-xs font-black text-theme-muted uppercase tracking-wide">
                    Community Members
                  </div>
                </div>
                <div className="text-center px-4">
                  <div className="text-5xl font-black mb-1 text-[var(--foreground)]" style={{ fontFamily: 'serif' }}>
                    {projects.filter((p: any) => p.status === 'COMPLETED').length}
                  </div>
                  <div className="text-xs font-black text-theme-muted uppercase tracking-wide">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Dynamic Layout */}
      <section className="py-12 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={viewMode === 'newspaper' ? 'max-w-4xl mx-auto' : 'max-w-7xl mx-auto'}>
            {/* Column Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-double border-[var(--foreground)]">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: 'serif' }}>
                  Latest Developments
                </h2>
                <p className="text-xs font-bold text-theme-muted uppercase tracking-wide">
                  Updated Live • {projects.length} Active Stories
                </p>
              </div>
              <Link href="/community/projects/new">
                <Button className="font-black text-xs uppercase tracking-wider border-2 border-[var(--foreground)]">
                  Create a Project
                </Button>
              </Link>
            </div>

            {/* Newspaper View */}
            {viewMode === 'newspaper' && (
              <div className="space-y-8">
                {projects.map((project: any) => {
                  const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING
                  const statusLabels = {
                    ACTIVE: 'Ongoing',
                    COMPLETED: 'Success Story',
                    PLANNING: 'In Development'
                  }

                  return (
                    <article key={project.id} className="border-b-2 border-[var(--foreground)] pb-8 last:border-b-0">
                      <div className="mb-4">
                        <div className="inline-block border-2 border-[var(--foreground)] px-3 py-1 mb-3">
                          <span className="text-xs font-black uppercase tracking-wider">
                            {statusLabels[project.status as keyof typeof statusLabels]}
                          </span>
                        </div>

                        <Link href={`/community/projects/${project.slug}`}>
                          <h3 className="text-4xl font-black leading-tight mb-2 hover:underline cursor-pointer" style={{ fontFamily: 'serif' }}>
                            {project.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-4 text-sm font-bold text-theme-muted border-l-4 border-[var(--foreground)] pl-3">
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            By {project.creator.name || 'Anonymous'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {project._count.members} {project._count.members === 1 ? 'Member' : 'Members'}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-lg leading-relaxed font-serif text-[var(--foreground)]" style={{ fontFamily: 'serif' }}>
                          <span className="text-5xl font-black float-left mr-2 leading-[0.8]" style={{ fontFamily: 'serif' }}>
                            {project.name.charAt(0)}
                          </span>
                          {project.description}
                        </p>
                      </div>

                      {project.goal && (
                        <div className="bg-[var(--muted)] border-l-4 border-[var(--foreground)] p-4 mb-4">
                          <div className="flex items-start gap-2">
                            <Target className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-black uppercase tracking-wide text-theme-muted mb-1">
                                Mission Objective
                              </p>
                              <p className="text-base font-bold text-[var(--foreground)]">
                                {project.goal}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <div className="flex -space-x-3">
                          {project.members.slice(0, 5).map((member: any) => (
                            <div
                              key={member.user.id}
                              className="w-8 h-8 rounded-full bg-[var(--muted)] border-2 border-[var(--background)] flex items-center justify-center"
                              title={member.user.name || 'User'}
                            >
                              {member.user.image ? (
                                <img
                                  src={member.user.image}
                                  alt={member.user.name || 'User'}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-4 h-4 text-theme-muted" />
                              )}
                            </div>
                          ))}
                          {project._count.members > 5 && (
                            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] border-2 border-[var(--background)] flex items-center justify-center">
                              <span className="text-xs font-black">
                                +{project._count.members - 5}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Link href={`/community/projects/${project.slug}`}>
                            <Button variant="outline" size="sm" className="font-black text-xs uppercase tracking-wider border-2">
                              Explore Full Project →
                            </Button>
                          </Link>
                          <JoinProjectButton projectId={project.id} projectName={project.name} />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project: any) => {
                  const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING

                  return (
                    <Card key={project.id} className="border-2 hover:border-theme-primary transition-all hover:shadow-xl">
                      <CardContent className="p-5">
                        <div className={`inline-block px-2 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-black uppercase mb-3`}>
                          {project.status}
                        </div>

                        <Link href={`/community/projects/${project.slug}`}>
                          <h3 className="text-xl font-black mb-2 hover:text-theme-primary transition-colors cursor-pointer line-clamp-2">
                            {project.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-theme-muted mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {project.goal && (
                          <div className="bg-[var(--muted)] p-3 rounded-lg mb-4">
                            <div className="flex items-start gap-2">
                              <Target className="w-4 h-4 mt-0.5 flex-shrink-0 text-theme-accent" />
                              <p className="text-xs font-semibold text-[var(--foreground)] line-clamp-2">
                                {project.goal}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-xs text-theme-muted mb-4">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {project.creator.name || 'Anonymous'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {project._count.members}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                          <Link href={`/community/projects/${project.slug}`}>
                            <Button variant="outline" size="sm" className="font-bold text-xs">
                              View →
                            </Button>
                          </Link>
                          <JoinProjectButton projectId={project.id} projectName={project.name} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Compact List View */}
            {viewMode === 'compact' && (
              <div className="space-y-3">
                {projects.map((project: any) => {
                  const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING

                  return (
                    <Card key={project.id} className="border hover:border-theme-primary transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`px-3 py-1.5 rounded-full ${colors.bg} ${colors.text} text-xs font-black uppercase flex-shrink-0`}>
                            {project.status}
                          </div>

                          <div className="flex-1 min-w-0">
                            <Link href={`/community/projects/${project.slug}`}>
                              <h3 className="text-lg font-black hover:text-theme-primary transition-colors cursor-pointer truncate">
                                {project.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-theme-muted truncate">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-theme-muted flex-shrink-0">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span className="hidden lg:inline">{project.creator.name || 'Anonymous'}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project._count.members}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Link href={`/community/projects/${project.slug}`}>
                              <Button variant="outline" size="sm" className="font-bold text-xs">
                                View
                              </Button>
                            </Link>
                            <JoinProjectButton projectId={project.id} projectName={project.name} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Magazine View */}
            {viewMode === 'magazine' && (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project: any) => {
                  const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING

                  return (
                    <Card key={project.id} className="border-2 hover:border-theme-primary transition-all hover:shadow-xl overflow-hidden">
                      <div className={`h-3 ${colors.bg}`}></div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`px-3 py-1.5 rounded-full ${colors.bg} ${colors.text} text-xs font-black uppercase`}>
                            {project.status}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-theme-muted">
                            <Users className="w-4 h-4" />
                            <span className="font-bold">{project._count.members}</span>
                          </div>
                        </div>

                        <Link href={`/community/projects/${project.slug}`}>
                          <h3 className="text-2xl font-black mb-3 hover:text-theme-primary transition-colors cursor-pointer">
                            {project.name}
                          </h3>
                        </Link>

                        <p className="text-base text-[var(--foreground)] mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {project.goal && (
                          <div className="bg-[var(--muted)] border-l-4 border-theme-accent p-4 mb-4">
                            <div className="flex items-start gap-2">
                              <Target className="w-5 h-5 mt-0.5 flex-shrink-0 text-theme-accent" />
                              <div>
                                <p className="text-xs font-black uppercase tracking-wide text-theme-muted mb-1">
                                  Mission
                                </p>
                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                  {project.goal}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                          <div className="flex items-center gap-2 text-sm text-theme-muted">
                            <User className="w-4 h-4" />
                            <span className="font-semibold">{project.creator.name || 'Anonymous'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/community/projects/${project.slug}`}>
                              <Button variant="outline" size="sm" className="font-bold">
                                Explore →
                              </Button>
                            </Link>
                            <JoinProjectButton projectId={project.id} projectName={project.name} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {projects.length === 0 && (
              <div className="border-4 border-double border-[var(--foreground)] bg-[var(--muted)] p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  <Briefcase className="w-16 h-16 text-theme-muted mx-auto mb-4" />
                  <h3 className="text-4xl font-black mb-4" style={{ fontFamily: 'serif' }}>
                    COLUMN AWAITING STORIES
                  </h3>
                  <div className="border-t-2 border-b-2 border-[var(--foreground)] py-4 mb-6">
                    <p className="text-lg font-serif italic text-[var(--foreground)]">
                      This section is reserved for community-driven initiatives and collaborative projects. Be the first to contribute to our growing collection of sustainability stories.
                    </p>
                  </div>
                  <Link href="/community/projects/new">
                    <Button size="lg" className="font-black text-sm uppercase tracking-wider border-2 border-[var(--foreground)] px-8 py-6">
                      Create a Project
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Editorial / Call to Action */}
      <section className="bg-[var(--background)] border-t-8 border-double border-[var(--foreground)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="border-4 border-[var(--foreground)] bg-[var(--muted)] p-8">
              <div className="text-center mb-6">
                <div className="inline-block border-b-2 border-[var(--foreground)] pb-2">
                  <h2 className="text-xs font-black tracking-[0.3em] uppercase text-theme-muted">
                    Editorial Notice
                  </h2>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-center mb-8">
                <h3 className="text-4xl font-black mb-4 leading-tight" style={{ fontFamily: 'serif' }}>
                  Your Story Matters
                </h3>
                <p className="text-lg font-serif italic text-[var(--foreground)] leading-relaxed mb-6">
                  The Community Projects column welcomes submissions from all members working toward sustainability, environmental protection, and collective action. Every initiative, regardless of size, contributes to our shared mission.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t-2 border-[var(--foreground)]">
                <Link href="/community/projects/new">
                  <Button size="lg" className="font-black text-sm uppercase tracking-wider border-2 border-[var(--foreground)] px-8 py-6 min-w-[200px]">
                    Launch Initiative
                  </Button>
                </Link>
                <span className="text-xl font-black text-theme-muted">or</span>
                <Link href="/community/forum">
                  <Button size="lg" variant="outline" className="font-black text-sm uppercase tracking-wider border-2 border-[var(--foreground)] px-8 py-6 min-w-[200px]">
                    Join Discussion
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
                <p className="text-xs font-bold text-theme-muted uppercase tracking-wide">
                  All projects subject to community guidelines • Established {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
