'use client'

import { ActivityCard, type ActivityItem } from './ActivityCard'

interface ActivityRiverProps {
  items: ActivityItem[]
}

export function ActivityRiver({ items }: ActivityRiverProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-body-serif italic text-sm text-[var(--muted-foreground)]">
          No activity yet in this category. Check back soon.
        </p>
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
          </div>

          {/* Center column */}
          <div className="flex flex-col gap-3">
            {centerCol.map((item, i) => (
              <ActivityCard key={item.id} item={item} index={2 + i * 3} />
            ))}
          </div>

          {/* Right column */}
          <div className="hidden lg:flex flex-col gap-3">
            {rightCol.map((item, i) => (
              <ActivityCard key={item.id} item={item} index={3 + i * 3} />
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider bottom */}
      <div className="wave-top bg-[var(--muted)] h-6 -mt-1" />
    </div>
  )
}
