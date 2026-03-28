'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ExternalLink, Quote, Award, Calendar, MapPin, BookOpen } from 'lucide-react'

export interface Founder {
  id: string
  name: string
  title: string // e.g., "Father of Permaculture"
  portrait: string // URL or placeholder
  birthYear?: number
  deathYear?: number
  nationality?: string
  shortBio: string // 1-2 sentences
  fullBio?: string // Extended biography
  contributions: string[] // Key contributions
  quote?: string
  relatedTopics: string[] // e.g., ['permaculture', 'food-sovereignty']
  learnMoreUrl?: string
}

interface FounderCardProps {
  founder: Founder
  variant?: 'compact' | 'full' | 'inline'
  className?: string
}

export function FounderCard({ founder, variant = 'compact', className = '' }: FounderCardProps) {
  const [expanded, setExpanded] = useState(false)

  // Compact variant - small inline card
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-4 p-4 rounded-xl bg-[color-mix(in_srgb,var(--primary)_5%,var(--background))] border border-[var(--border)] ${className}`}
      >
        {/* Portrait */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--muted)] border-2 border-[var(--primary)]">
            {founder.portrait ? (
              <img
                src={founder.portrait}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-theme-muted">
                {founder.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[var(--foreground)] truncate">{founder.name}</h4>
          <p className="text-sm text-theme-primary font-medium">{founder.title}</p>
          <p className="text-sm text-theme-muted mt-1 line-clamp-2">{founder.shortBio}</p>
          {founder.birthYear && (
            <p className="text-xs text-theme-muted mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {founder.birthYear}{founder.deathYear ? ` - ${founder.deathYear}` : ' - Present'}
            </p>
          )}
        </div>
      </motion.div>
    )
  }

  // Inline variant - very small, for within paragraphs
  if (variant === 'inline') {
    return (
      <span
        className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] border border-[var(--border)] cursor-pointer hover:bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] transition-colors"
        title={`${founder.name} - ${founder.title}`}
      >
        <div className="relative w-5 h-5 rounded-full overflow-hidden bg-[var(--muted)]">
          {founder.portrait ? (
            <Image src={founder.portrait} alt={founder.name} fill unoptimized sizes="100%" className="object-cover" />
          ) : (
            <span className="text-xs font-bold">{founder.name[0]}</span>
          )}
        </div>
        <span className="text-sm font-medium text-theme-primary">{founder.name}</span>
      </span>
    )
  }

  // Full variant - expanded card with all details
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl overflow-hidden bg-[var(--card)] border-2 border-[var(--border)] shadow-lg ${className}`}
    >
      {/* Header with portrait */}
      <div className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-6">
        <div className="flex items-center gap-6">
          {/* Portrait */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
              {founder.portrait ? (
                <img
                  src={founder.portrait}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[var(--primary)] bg-[var(--muted)]">
                  {founder.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-[var(--primary)]" />
            </div>
          </div>

          {/* Name and title */}
          <div className="flex-1 text-white">
            <h3 className="text-2xl md:text-3xl font-black">{founder.name}</h3>
            <p className="text-lg font-medium opacity-90">{founder.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm opacity-80">
              {founder.birthYear && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {founder.birthYear}{founder.deathYear ? ` - ${founder.deathYear}` : ' - Present'}
                </span>
              )}
              {founder.nationality && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {founder.nationality}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Quote */}
        {founder.quote && (
          <blockquote className="relative pl-6 pr-4 py-3 bg-[color-mix(in_srgb,var(--primary)_5%,var(--background))] rounded-xl border-l-4 border-[var(--primary)]">
            <Quote className="absolute top-3 left-2 w-4 h-4 text-[var(--primary)] opacity-50" />
            <p className="italic text-[var(--foreground)]">"{founder.quote}"</p>
          </blockquote>
        )}

        {/* Bio */}
        <div>
          <p className="text-[var(--foreground)] leading-relaxed">
            {expanded && founder.fullBio ? founder.fullBio : founder.shortBio}
          </p>
          {founder.fullBio && founder.fullBio !== founder.shortBio && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-theme-primary font-medium text-sm mt-2 hover:underline"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Key Contributions */}
        <div>
          <h4 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-theme-primary" />
            Key Contributions
          </h4>
          <ul className="space-y-1">
            {founder.contributions.map((contribution, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-theme-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                {contribution}
              </li>
            ))}
          </ul>
        </div>

        {/* Learn More Link */}
        {founder.learnMoreUrl && (
          <a
            href={founder.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-theme-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Learn more about {founder.name.split(' ')[0]}
          </a>
        )}

        {/* Related Topics Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {founder.relatedTopics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--muted)] text-theme-muted"
            >
              {topic.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Helper component to render founder cards based on detected names in content
export function FounderMention({
  name,
  founders,
  variant = 'compact'
}: {
  name: string
  founders: Founder[]
  variant?: 'compact' | 'full' | 'inline'
}) {
  const founder = founders.find(f =>
    f.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(f.name.split(' ')[0].toLowerCase())
  )

  if (!founder) return null

  return <FounderCard founder={founder} variant={variant} />
}
