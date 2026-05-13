'use client'

/**
 * Minimal author card for the article sidebar — just an avatar +
 * the author's name, linking to their profile. Sits at the top of
 * the published article sidebar. Falls back to the user's fishbowl
 * fish design when they haven't set a profile photo.
 */

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { FishSVG, getTierFromScore, type FishCustomization } from '@/components/fishbowl/FishSpecies'

interface MinimalAuthorCardProps {
  author: {
    id: string
    name?: string | null
    image?: string | null
    stockScore?: number | null
    fishCustomization?: FishCustomization | null
  }
}

export function MinimalAuthorCard({ author }: MinimalAuthorCardProps) {
  if (!author?.id) return null

  const name = author.name || 'Anonymous'
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .filter(Boolean)
    .join('')

  const fishTier = typeof author.stockScore === 'number'
    ? getTierFromScore(author.stockScore)
    : 0

  return (
    <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
      <CardContent className="p-4">
        <Link
          href={`/users/${author.id}`}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--muted)] border-2 border-theme-primary shrink-0 flex items-center justify-center">
            {author.image ? (
              <Image
                src={author.image}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
                unoptimized
              />
            ) : author.fishCustomization || typeof author.stockScore === 'number' ? (
              // Default avatar: render the user's own fishbowl fish.
              // Wrapped in a transform so it fits the circular crop.
              <div className="w-full h-full flex items-center justify-center scale-90">
                <FishSVG
                  tier={fishTier}
                  size={40}
                  customization={author.fishCustomization || undefined}
                  id={`avatar-fish-${author.id}`}
                />
              </div>
            ) : (
              <span className="text-sm font-black text-theme-primary">
                {initials || '?'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-theme-muted uppercase tracking-wider">
              By
            </p>
            <p className="font-bold text-sm truncate group-hover:text-theme-primary transition-colors">
              {name}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
