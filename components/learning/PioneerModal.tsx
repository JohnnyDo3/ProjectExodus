'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Quote, Award, MapPin, Calendar, User } from 'lucide-react'
import { Founder } from './FounderCard'
import { Button } from '@/components/ui/Button'

interface PioneerModalProps {
  pioneer: Founder | null
  isOpen: boolean
  onClose: () => void
}

export function PioneerModal({ pioneer, isOpen, onClose }: PioneerModalProps) {
  if (!pioneer) return null

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full z-50 flex items-center justify-center"
          >
            <div className="bg-[var(--card)] rounded-2xl shadow-2xl border-2 border-[var(--border)] overflow-hidden max-h-[90vh] overflow-y-auto w-full">
              {/* Header with portrait */}
              <div className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  {/* Portrait */}
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30 flex-shrink-0">
                    {pioneer.portrait ? (
                      <img
                        src={pioneer.portrait}
                        alt={pioneer.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className={`text-2xl font-black ${pioneer.portrait ? 'hidden' : ''}`}>
                      {pioneer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black">{pioneer.name}</h2>
                    <p className="text-white/80 font-medium">{pioneer.title}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-white/70">
                      {pioneer.nationality && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {pioneer.nationality}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {pioneer.birthYear}{pioneer.deathYear ? `–${pioneer.deathYear}` : '–present'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Quote */}
                {pioneer.quote && (
                  <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] rounded-xl p-4 border-l-4 border-[var(--primary)]">
                    <Quote className="w-6 h-6 text-[var(--primary)] mb-2" />
                    <p className="italic text-[var(--foreground)] font-medium">"{pioneer.quote}"</p>
                  </div>
                )}

                {/* Bio */}
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--primary)]" />
                    About
                  </h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {pioneer.fullBio || pioneer.shortBio}
                  </p>
                </div>

                {/* Contributions */}
                {pioneer.contributions && pioneer.contributions.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[var(--primary)]" />
                      Key Contributions
                    </h3>
                    <ul className="space-y-2">
                      {pioneer.contributions.map((contribution, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[var(--muted-foreground)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learn More */}
                {pioneer.learnMoreUrl && (
                  <a
                    href={pioneer.learnMoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-[var(--primary)] text-white font-bold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Clickable pioneer name component for inline text
export function PioneerMention({
  pioneer,
  onClick
}: {
  pioneer: Founder
  onClick: (pioneer: Founder) => void
}) {
  return (
    <button
      onClick={() => onClick(pioneer)}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] text-[var(--primary)] font-semibold hover:bg-[color-mix(in_srgb,var(--primary)_25%,var(--background))] transition-colors cursor-pointer border-b-2 border-dashed border-[var(--primary)]"
      aria-label={`Learn more about ${pioneer.name}`}
    >
      {pioneer.name}
    </button>
  )
}

// Helper function to parse content and wrap pioneer names with clickable spans
export function parseContentWithPioneerLinks(
  content: string,
  pioneers: Founder[],
  onPioneerClick: (pioneer: Founder) => void
): React.ReactNode[] {
  if (!pioneers.length) {
    return [content]
  }

  // Create a map for quick lookup
  const pioneerNames = pioneers.map(p => ({
    name: p.name,
    pioneer: p,
    // Also include common variations
    variations: [
      p.name,
      p.name.split(' ').pop() || '', // Last name only
    ].filter(Boolean)
  }))

  // Create regex to match pioneer names
  const namePatterns = pioneerNames.flatMap(p => p.variations).filter(n => n.length > 2)
  if (!namePatterns.length) return [content]

  const regex = new RegExp(`\\b(${namePatterns.join('|')})\\b`, 'gi')

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }

    // Find the pioneer for this match
    const matchedName = match[1]
    const pioneer = pioneers.find(p =>
      p.name.toLowerCase() === matchedName.toLowerCase() ||
      (p.name.split(' ').pop() || '').toLowerCase() === matchedName.toLowerCase()
    )

    if (pioneer) {
      parts.push(
        <PioneerMention
          key={`${pioneer.id}-${match.index}`}
          pioneer={pioneer}
          onClick={onPioneerClick}
        />
      )
    } else {
      parts.push(matchedName)
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return parts
}
