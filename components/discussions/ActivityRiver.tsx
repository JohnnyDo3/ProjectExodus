'use client'

import { ActivityCard, type ActivityItem } from './ActivityCard'
import { MessageSquare, FileText, Briefcase, UserPlus, Calendar, Repeat } from 'lucide-react'

// Placeholder ghost cards that hint at what the page looks like with more activity
const GHOST_HINTS = [
  { type: 'post', icon: MessageSquare, label: 'Post', title: 'Share your thoughts with the community', preview: 'Start a discussion, ask a question, or share something that inspires you...' },
  { type: 'article', icon: FileText, label: 'Article', title: 'A story waiting to be written', preview: 'Publish articles about sustainability, projects, and ideas that matter...' },
  { type: 'project', icon: Briefcase, label: 'Project', title: 'The next great collaboration', preview: 'Launch a project and invite others to build something meaningful together...' },
  { type: 'new_member', icon: UserPlus, label: 'New Member', title: 'Someone new is about to join', preview: 'Every new voice strengthens the community...' },
  { type: 'event', icon: Calendar, label: 'Event', title: 'An event on the horizon', preview: 'Gatherings, workshops, and meetups bring the community to life...' },
  { type: 'follow', icon: Repeat, label: 'Connection', title: 'A connection waiting to happen', preview: 'Follow others to stay in the loop and grow your network...' },
]

function GhostCard({ hint, index }: { hint: typeof GHOST_HINTS[number]; index: number }) {
  const Icon = hint.icon
  return (
    <article
      className="relative overflow-hidden bg-[var(--background)] border border-dashed border-[var(--border)] p-4 opacity-30 select-none"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
          <Icon className="w-3 h-3" />
          {hint.label}
        </span>
      </div>
      <h3 className="font-headline font-bold text-sm leading-snug text-[var(--foreground)] mb-1">
        {hint.title}
      </h3>
      <p className="font-body-serif text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
        {hint.preview}
      </p>
      <div className="flex items-center mt-3 pt-2 border-t border-dashed border-[var(--border)]">
        <div className="w-5 h-5 rounded-full bg-[var(--muted)]" />
        <span className="ml-1.5 text-[10px] font-bold text-[var(--muted-foreground)]">Awaiting...</span>
      </div>
    </article>
  )
}

interface ActivityRiverProps {
  items: ActivityItem[]
}

export function ActivityRiver({ items }: ActivityRiverProps) {
  // Minimum ghost cards per column to fill out the grid
  const MIN_PER_COL = 2

  if (items.length === 0) {
    // All ghosts — show what the page could look like
    const ghostLeft = GHOST_HINTS.filter((_, i) => i % 3 === 0)
    const ghostCenter = GHOST_HINTS.filter((_, i) => i % 3 === 1)
    const ghostRight = GHOST_HINTS.filter((_, i) => i % 3 === 2)

    return (
      <div>
        <div className="wave-bottom bg-[var(--muted)] h-6 -mb-1" />
        <div className="bg-[var(--background)] px-2 sm:px-0">
          <div className="text-center py-6">
            <p className="font-body-serif italic text-sm text-[var(--muted-foreground)]">
              The community is just getting started — here's what it'll look like as it grows.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex flex-col gap-3">
              {ghostLeft.map((h, i) => <GhostCard key={h.type} hint={h} index={i} />)}
            </div>
            <div className="flex flex-col gap-3">
              {ghostCenter.map((h, i) => <GhostCard key={h.type} hint={h} index={i} />)}
            </div>
            <div className="hidden lg:flex flex-col gap-3">
              {ghostRight.map((h, i) => <GhostCard key={h.type} hint={h} index={i} />)}
            </div>
          </div>
        </div>
        <div className="wave-top bg-[var(--muted)] h-6 -mt-1" />
      </div>
    )
  }

  // First item is featured (large), rest flow in bento grid
  const featured = items[0]
  const rest = items.slice(1)

  // Split remaining into left and right columns for organic flow
  const leftCol: ActivityItem[] = []
  const rightCol: ActivityItem[] = []
  const centerCol: ActivityItem[] = []

  rest.forEach((item, i) => {
    if (i % 3 === 0) leftCol.push(item)
    else if (i % 3 === 1) centerCol.push(item)
    else rightCol.push(item)
  })

  // Figure out how many ghosts each column needs to reach MIN_PER_COL
  const ghostsNeededLeft = Math.max(0, MIN_PER_COL - leftCol.length)
  const ghostsNeededCenter = Math.max(0, MIN_PER_COL - centerCol.length)
  const ghostsNeededRight = Math.max(0, MIN_PER_COL - rightCol.length)
  const totalGhostsNeeded = ghostsNeededLeft + ghostsNeededCenter + ghostsNeededRight

  // Pick ghosts that aren't duplicating existing item types
  const existingTypes = new Set(items.map(i => i.type))
  const availableGhosts = [
    ...GHOST_HINTS.filter(g => !existingTypes.has(g.type)),
    ...GHOST_HINTS.filter(g => existingTypes.has(g.type)),
  ].slice(0, totalGhostsNeeded)

  let ghostIdx = 0

  return (
    <div>
      {/* Wave divider top */}
      <div className="wave-bottom bg-[var(--muted)] h-6 -mb-1" />

      <div className="bg-[var(--background)] px-2 sm:px-0">
        {/* Featured item — full width */}
        <div className="mb-4">
          <ActivityCard item={featured} index={0} featured />
        </div>

        {/* Bento grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            {leftCol.map((item, i) => (
              <ActivityCard key={item.id} item={item} index={1 + i * 3} />
            ))}
            {Array.from({ length: ghostsNeededLeft }).map((_, i) => {
              const ghost = availableGhosts[ghostIdx++]
              return ghost ? <GhostCard key={`ghost-l-${i}`} hint={ghost} index={leftCol.length + i} /> : null
            })}
          </div>

          {/* Center column */}
          <div className="flex flex-col gap-3">
            {centerCol.map((item, i) => (
              <ActivityCard key={item.id} item={item} index={2 + i * 3} />
            ))}
            {Array.from({ length: ghostsNeededCenter }).map((_, i) => {
              const ghost = availableGhosts[ghostIdx++]
              return ghost ? <GhostCard key={`ghost-c-${i}`} hint={ghost} index={centerCol.length + i} /> : null
            })}
          </div>

          {/* Right column */}
          <div className="hidden lg:flex flex-col gap-3">
            {rightCol.map((item, i) => (
              <ActivityCard key={item.id} item={item} index={3 + i * 3} />
            ))}
            {Array.from({ length: ghostsNeededRight }).map((_, i) => {
              const ghost = availableGhosts[ghostIdx++]
              return ghost ? <GhostCard key={`ghost-r-${i}`} hint={ghost} index={rightCol.length + i} /> : null
            })}
          </div>
        </div>
      </div>

      {/* Wave divider bottom */}
      <div className="wave-top bg-[var(--muted)] h-6 -mt-1" />
    </div>
  )
}
