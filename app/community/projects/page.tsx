import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Briefcase, User, Users, MapPin, Target, CheckCircle } from 'lucide-react'
import Link from 'next/link'

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
    ACTIVE: { bg: 'bg-moss-100', text: 'text-moss-700', border: 'border-moss-300' },
    COMPLETED: { bg: 'bg-ocean-100', text: 'text-ocean-700', border: 'border-ocean-300' },
    PLANNING: { bg: 'bg-terra-100', text: 'text-terra-700', border: 'border-terra-300' },
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-terra-50 via-moss-50 to-ocean-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-black" style={{ color: '#000' }}>
              COMMUNITY PROJECTS
            </h1>
            <p className="text-xl font-semibold" style={{ color: '#333' }}>
              Collaborate on local sustainability initiatives that make a real difference
            </p>
            <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
              START A PROJECT
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b-4 border-sand-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black mb-2" style={{ color: '#36763d' }}>
                  {projects.filter((p: any) => p.status === 'ACTIVE').length}
                </div>
                <div className="text-lg font-bold" style={{ color: '#666' }}>
                  ACTIVE PROJECTS
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2" style={{ color: '#357777' }}>
                  {projects.reduce((sum: number, p: any) => sum + p._count.members, 0)}
                </div>
                <div className="text-lg font-bold" style={{ color: '#666' }}>
                  TOTAL MEMBERS
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2" style={{ color: '#c24f31' }}>
                  {projects.filter((p: any) => p.status === 'COMPLETED').length}
                </div>
                <div className="text-lg font-bold" style={{ color: '#666' }}>
                  COMPLETED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project: any) => {
                const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING

                return (
                  <Card key={project.id} className="hover-lift border-4 border-moss-200 hover:border-moss-400 transition-all">
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
                      <p className="text-base font-semibold mb-6 leading-relaxed" style={{ color: '#1f2937' }}>
                        {project.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {project.goal && (
                          <div className="flex items-start gap-2 text-sm font-semibold" style={{ color: '#666' }}>
                            <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{project.goal}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm font-bold" style={{ color: '#666' }}>
                          <User className="w-4 h-4" />
                          <span>Led by {project.creator.name || 'Anonymous'}</span>
                        </div>
                      </div>

                      {/* Members */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-sand-200">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 4).map((member: any, idx: number) => (
                            <div
                              key={member.user.id}
                              className="w-10 h-10 rounded-full bg-ocean-100 border-2 border-white flex items-center justify-center"
                              title={member.user.name || 'User'}
                            >
                              {member.user.image ? (
                                <img
                                  src={member.user.image}
                                  alt={member.user.name || 'User'}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-ocean-600" />
                              )}
                            </div>
                          ))}
                          {project._count.members > 4 && (
                            <div className="w-10 h-10 rounded-full bg-moss-500 border-2 border-white flex items-center justify-center">
                              <span className="text-xs font-black text-white">
                                +{project._count.members - 4}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button size="sm" className="font-black">
                          JOIN PROJECT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {projects.length === 0 && (
              <Card className="border-4 border-terra-300">
                <CardContent className="p-16 text-center">
                  <Briefcase className="w-20 h-20 text-terra-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-black mb-4" style={{ color: '#666' }}>
                    NO PROJECTS YET
                  </h3>
                  <p className="text-lg font-semibold mb-8" style={{ color: '#888' }}>
                    Be the first to start a community project!
                  </p>
                  <Button size="lg" className="text-lg px-10 py-6 font-black">
                    CREATE FIRST PROJECT
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-black">READY TO MAKE AN IMPACT?</h2>
            <p className="text-2xl font-semibold">
              Join a project or start your own. Together, we're building a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl">
                START A PROJECT
              </Button>
              <Link href="/community/forum">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-white text-white hover:bg-white hover:text-earth-900 font-black">
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
