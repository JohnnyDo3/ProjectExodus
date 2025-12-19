'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Users, MapPin, Award, Search, Filter,
  ExternalLink, BookOpen, Briefcase, Globe, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { practitioners, expertiseAreas, Practitioner } from '@/data/exodology-practitioners'

const certificationColors = {
  'founding': 'bg-gradient-to-r from-amber-500 to-orange-600',
  'master': 'bg-gradient-to-r from-purple-500 to-violet-600',
  'stewardship': 'bg-gradient-to-r from-blue-500 to-indigo-600',
  'application': 'bg-gradient-to-r from-teal-500 to-cyan-600',
  'literacy': 'bg-gradient-to-r from-green-500 to-emerald-600'
}

const certificationLabels = {
  'founding': 'Founding Member',
  'master': 'Master Certification',
  'stewardship': 'Stewardship Certification',
  'application': 'Application Certification',
  'literacy': 'Literacy Certification'
}

export default function PractitionerDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null)
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null)

  const filteredPractitioners = practitioners.filter(p => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = p.name.toLowerCase().includes(query)
      const matchesAffiliation = p.affiliation.toLowerCase().includes(query)
      const matchesLocation = p.location.toLowerCase().includes(query)
      if (!matchesName && !matchesAffiliation && !matchesLocation) return false
    }
    if (selectedExpertise && !p.expertise.includes(selectedExpertise)) return false
    if (selectedCertification && p.certificationLevel !== selectedCertification) return false
    return true
  })

  const featuredPractitioners = practitioners.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exodology
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">Practitioner Directory</h1>
                <p className="text-xl text-white/80">
                  Scholars and practitioners contributing to Exodology
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{practitioners.length}</div>
                <div className="text-sm text-white/70">Practitioners</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{practitioners.filter(p => p.certificationLevel === 'founding' || p.certificationLevel === 'master').length}</div>
                <div className="text-sm text-white/70">Senior Members</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{new Set(practitioners.map(p => p.location.split(', ').pop())).size}</div>
                <div className="text-sm text-white/70">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <Card className="border border-[var(--border)] mb-8">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    placeholder="Search by name, affiliation, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] text-sm border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                {/* Expertise Filter */}
                <select
                  value={selectedExpertise || ''}
                  onChange={(e) => setSelectedExpertise(e.target.value || null)}
                  className="px-3 py-2 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] text-sm border border-[var(--border)]"
                >
                  <option value="">All expertise</option>
                  {Object.entries(expertiseAreas).map(([key, area]) => (
                    <option key={key} value={key}>{area.name} ({area.count})</option>
                  ))}
                </select>

                {/* Certification Filter */}
                <select
                  value={selectedCertification || ''}
                  onChange={(e) => setSelectedCertification(e.target.value || null)}
                  className="px-3 py-2 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] text-sm border border-[var(--border)]"
                >
                  <option value="">All certifications</option>
                  {Object.entries(certificationLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>

                {(searchQuery || selectedExpertise || selectedCertification) && (
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedExpertise(null); setSelectedCertification(null); }}
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Featured Practitioners */}
          {!searchQuery && !selectedExpertise && !selectedCertification && (
            <section className="mb-12">
              <h2 className="text-xl font-black text-[var(--foreground)] mb-4">Featured Contributors</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPractitioners.map((practitioner, i) => (
                  <motion.div
                    key={practitioner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <PractitionerCard practitioner={practitioner} featured />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* All Practitioners */}
          <section>
            <h2 className="text-xl font-black text-[var(--foreground)] mb-4">
              {searchQuery || selectedExpertise || selectedCertification ? 'Search Results' : 'All Practitioners'} ({filteredPractitioners.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPractitioners.map((practitioner, i) => (
                <motion.div
                  key={practitioner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <PractitionerCard practitioner={practitioner} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Join CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="border-2 border-teal-500/30 bg-gradient-to-br from-teal-500/5 to-cyan-500/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4">
                  Join the Community
                </h3>
                <p className="text-[var(--muted-foreground)] mb-6 max-w-2xl mx-auto">
                  Begin your Exodology learning journey and earn certifications to be listed in the practitioner directory.
                  Connect with a growing network of scholars and practitioners working on system transitions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/exodology/paths">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-0">
                      Start Learning <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <Link href="/exodology/certifications">
                    <Button variant="outline">
                      View Certifications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function PractitionerCard({ practitioner, featured }: { practitioner: Practitioner; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className={`border ${featured ? 'border-2 border-teal-500/30' : 'border-[var(--border)]'} h-full`}>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {practitioner.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--foreground)]">{practitioner.name}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">{practitioner.title}</p>
            <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] mt-1">
              <MapPin className="w-3 h-3" />
              {practitioner.location}
            </div>
          </div>
        </div>

        {/* Certification Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold ${certificationColors[practitioner.certificationLevel]} mb-3`}>
          <Award className="w-3 h-3" />
          {certificationLabels[practitioner.certificationLevel]}
        </div>

        {/* Affiliation */}
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-3">
          <Briefcase className="w-4 h-4" />
          {practitioner.affiliation}
        </div>

        {/* Bio */}
        <p className={`text-sm text-[var(--muted-foreground)] mb-3 ${expanded ? '' : 'line-clamp-3'}`}>
          {practitioner.bio}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {practitioner.expertise.slice(0, expanded ? undefined : 3).map(exp => (
            <span
              key={exp}
              className="text-xs px-2 py-0.5 rounded bg-[var(--muted)]/50 text-[var(--muted-foreground)]"
            >
              {expertiseAreas[exp as keyof typeof expertiseAreas]?.name || exp}
            </span>
          ))}
          {!expanded && practitioner.expertise.length > 3 && (
            <span className="text-xs text-[var(--muted-foreground)]">
              +{practitioner.expertise.length - 3} more
            </span>
          )}
        </div>

        {expanded && (
          <>
            {/* Contributions */}
            <div className="mb-4">
              <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Key Contributions</h4>
              <div className="space-y-2">
                {practitioner.contributions.map((contrib, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 uppercase font-medium">
                        {contrib.type}
                      </span>
                      <span className="font-medium text-[var(--foreground)]">{contrib.title}</span>
                    </div>
                    <p className="text-[var(--muted-foreground)] ml-[4.5rem] mt-0.5">{contrib.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Projects */}
            {practitioner.activeProjects && practitioner.activeProjects.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Active Projects</h4>
                <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                  {practitioner.activeProjects.map((project, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {practitioner.links && (
              <div className="flex gap-3">
                {practitioner.links.website && (
                  <a
                    href={practitioner.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                {practitioner.links.orcid && (
                  <a
                    href={`https://orcid.org/${practitioner.links.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    ORCID
                  </a>
                )}
              </div>
            )}
          </>
        )}

        {/* Expand/Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-teal-600 hover:underline mt-2"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </CardContent>
    </Card>
  )
}
