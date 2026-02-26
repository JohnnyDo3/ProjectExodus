'use client'

import { useEffect, useRef, useState } from 'react'

interface PulseHeaderProps {
  totalActivity: number
  hourlyActivity: number[]
  tickerItems: { id: string; title: string; userName: string; type: string }[]
}

const TYPE_VERB: Record<string, string> = {
  post: 'shared',
  article: 'published',
  project: 'launched',
  forum_post: 'posted',
  comment: 'commented',
  new_member: 'joined',
  follow: 'connected',
  event: 'created',
}

export function PulseHeader({ totalActivity, hourlyActivity, tickerItems }: PulseHeaderProps) {
  const [pulseSpeed, setPulseSpeed] = useState(3)
  const tickerRef = useRef<HTMLDivElement>(null)

  // Pulse speed: more activity = faster beat
  useEffect(() => {
    const recentHour = hourlyActivity[23] || 0
    if (recentHour > 10) setPulseSpeed(1)
    else if (recentHour > 5) setPulseSpeed(1.5)
    else if (recentHour > 2) setPulseSpeed(2)
    else setPulseSpeed(3)
  }, [hourlyActivity])

  // Peak hour for heatmap
  const maxHourly = Math.max(...hourlyActivity, 1)

  return (
    <div className="relative overflow-hidden">
      {/* Pulse rings + stats */}
      <div className="flex items-center justify-center gap-8 py-8 sm:py-10">

        {/* Left: 24h arc heatmap */}
        <div className="hidden md:block relative w-32 h-16">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {hourlyActivity.map((count, i) => {
              // Semicircle: spread 24 cells across 180 degrees
              const angle = (i / 23) * Math.PI
              const x = 100 - Math.cos(angle) * 85
              const y = 95 - Math.sin(angle) * 80
              const opacity = count / maxHourly
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="var(--primary)"
                  opacity={Math.max(0.1, opacity)}
                  className="transition-opacity duration-500"
                />
              )
            })}
            {/* Labels */}
            <text x="10" y="98" fill="var(--muted-foreground)" fontSize="8" fontFamily="var(--font-geist-mono)">24h</text>
            <text x="185" y="98" fill="var(--muted-foreground)" fontSize="8" fontFamily="var(--font-geist-mono)">now</text>
          </svg>
        </div>

        {/* Center: Pulse rings */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[var(--primary)] opacity-30 pulse-ring"
            style={{ animationDuration: `${pulseSpeed}s` }}
          />
          {/* Middle ring */}
          <div
            className="absolute inset-3 rounded-full border border-[var(--primary)] opacity-40 pulse-ring"
            style={{ animationDuration: `${pulseSpeed * 1.3}s`, animationDelay: `${pulseSpeed * 0.3}s` }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-6 rounded-full border border-[var(--primary)] opacity-50 pulse-ring"
            style={{ animationDuration: `${pulseSpeed * 1.6}s`, animationDelay: `${pulseSpeed * 0.6}s` }}
          />
          {/* Center count */}
          <div className="relative z-10 text-center">
            <div className="font-headline text-3xl sm:text-4xl font-black text-[var(--foreground)]">
              {totalActivity}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              this week
            </div>
          </div>
        </div>

        {/* Right: quick stats */}
        <div className="hidden md:flex flex-col gap-1 text-right">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            Last Hour
          </div>
          <div className="font-headline text-2xl font-black text-[var(--foreground)]">
            {hourlyActivity[23] || 0}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mt-1">
            Peak
          </div>
          <div className="font-headline text-2xl font-black text-[var(--primary)]">
            {maxHourly}
          </div>
        </div>
      </div>

      {/* Ticker tape */}
      {tickerItems.length > 0 && (
        <div className="border-t border-b border-[var(--border)] bg-[var(--muted)] overflow-hidden py-2">
          <div ref={tickerRef} className="ticker-scroll flex items-center gap-8 whitespace-nowrap">
            {/* Duplicate for seamless loop */}
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={`${item.id}-${i}`} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" />
                <span className="font-bold">{item.userName}</span>
                <span className="text-[var(--muted-foreground)]">{TYPE_VERB[item.type] || 'did something'}</span>
                <span className="font-body-serif italic truncate max-w-[200px]">{item.title}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
