import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Briefcase, User, Users, MapPin, Target, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'

async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch projects')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  const statusColors = {
    ACTIVE: { bg: 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]', text: 'text-theme-primary', border: 'border-theme-primary' },
    COMPLETED: { bg: 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]', text: 'text-theme-accent', border: 'border-theme-accent' },
    PLANNING: { bg: 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]', text: 'text-theme-secondary', border: 'border-theme-secondary' },
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-black text-[var(--foreground)]">
              COMMUNITY PROJECTS
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Collaborate on local sustainability initiatives that make a real difference
            </p>
            <Link href="/community/projects/new">
              <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                START A PROJECT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--background)] border-b-4 border-theme-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black mb-2 text-theme-primary">
                  {projects.filter((p: any) => p.status === 'ACTIVE').length}
                </div>
                <div className="text-lg font-bold text-theme-muted">
                  ACTIVE PROJECTS
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2 text-theme-accent">
                  {projects.reduce((sum: number, p: any) => sum + p._count.members, 0)}
                </div>
                <div className="text-lg font-bold text-theme-muted">
                  TOTAL MEMBERS
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2 text-theme-secondary">
                  {projects.filter((p: any) => p.status === 'COMPLETED').length}
                </div>
                <div className="text-lg font-bold text-theme-muted">
                  COMPLETED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project: any) => {
                const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING

                return (
                  <Link key={project.id} href={`/community/projects/${project.slug}`}>
                    <Card className="hover-lift border-4 border-theme-primary hover:border-theme-accent transition-all cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} font-black text-sm uppercase`}>
                            {project.status}
                          </div>
                          <div className="text-2xl">🌍</div>
                        </div>
                        <CardTitle className="text-2xl font-black">
                          {project.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base font-semibold mb-6 leading-relaxed text-[var(--foreground)]">
                          {project.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          {project.goal && (
                            <div className="flex items-start gap-2 text-sm font-semibold text-theme-muted">
                              <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{project.goal}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm font-bold text-theme-muted">
                            <User className="w-4 h-4" />
                            <span>Led by {project.creator.name || 'Anonymous'}</span>
                          </div>
                        </div>

                        {/* Members */}
                        <div className="flex items-center justify-between pt-4 border-t-2 border-theme-muted">
                          <div className="flex -space-x-2">
                            {project.members.slice(0, 4).map((member: any, idx: number) => (
                              <div
                                key={member.user.id}
                                className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] border-2 border-[var(--background)] flex items-center justify-center"
                                title={member.user.name || 'User'}
                              >
                                {member.user.image ? (
                                  <img
                                    src={member.user.image}
                                    alt={member.user.name || 'User'}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="w-5 h-5 text-theme-accent" />
                                )}
                              </div>
                            ))}
                            {project._count.members > 4 && (
                              <div className="w-10 h-10 rounded-full bg-[var(--primary)] border-2 border-[var(--background)] flex items-center justify-center">
                                <span className="text-xs font-black text-[var(--primary-foreground)]">
                                  +{project._count.members - 4}
                                </span>
                              </div>
                            )}
                          </div>
                          <div onClick={(e) => e.preventDefault()}>
                            <JoinProjectButton projectId={project.id} projectName={project.name} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {projects.length === 0 && (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-16 text-center">
                  <Briefcase className="w-20 h-20 text-theme-secondary mx-auto mb-6" />
                  <h3 className="text-3xl font-black mb-4 text-theme-muted">
                    NO PROJECTS YET
                  </h3>
                  <p className="text-lg font-semibold mb-8 text-theme-muted">
                    Be the first to start a community project!
                  </p>
                  <Link href="/community/projects/new">
                    <Button size="lg" className="text-lg px-10 py-6 font-black">
                      CREATE FIRST PROJECT
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-black">READY TO MAKE AN IMPACT?</h2>
            <p className="text-2xl font-semibold">
              Join a project or start your own. Together, we're building a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/projects/new">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)] font-black shadow-2xl">
                  START A PROJECT
                </Button>
              </Link>
              <Link href="/community/forum">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  VISIT FORUM
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
