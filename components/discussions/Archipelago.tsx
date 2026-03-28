'use client'

import { MessageSquare, FileText, Briefcase, GraduationCap, Users, Calendar } from 'lucide-react'

interface ArchipelagoProps {
  categoryCounts: Record<string, number>
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const ISLANDS = [
  { id: 'all', label: 'All Activity', icon: MessageSquare, color: 'var(--foreground)', blobClass: 'blob-shape', floatDelay: '0s' },
  { id: 'discussions', label: 'Discussions', icon: MessageSquare, color: 'var(--primary)', blobClass: 'blob-shape', floatDelay: '1.2s' },
  { id: 'articles', label: 'Articles', icon: FileText, color: 'var(--accent)', blobClass: 'blob-shape', floatDelay: '2.4s' },
  { id: 'projects', label: 'Projects', icon: Briefcase, color: 'var(--secondary)', blobClass: 'blob-shape', floatDelay: '0.6s' },
  { id: 'forums', label: 'Forums', icon: GraduationCap, color: 'var(--primary)', blobClass: 'blob-shape', floatDelay: '1.8s' },
  { id: 'members', label: 'Members', icon: Users, color: 'var(--accent)', blobClass: 'blob-shape', floatDelay: '3.0s' },
  { id: 'events', label: 'Events', icon: Calendar, color: 'var(--secondary)', blobClass: 'blob-shape', floatDelay: '0.4s' },
]

export function Archipelago({ categoryCounts, activeCategory, onCategoryChange }: ArchipelagoProps) {
  const maxCount = Math.max(...Object.values(categoryCounts), 1)

  return (
    <div className="py-6">
      <div className="text-center mb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
          Explore by Category
        </h2>
      </div>

      {/* Constellation SVG lines (decorative) */}
      <div className="relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 120">
          <line x1="115" y1="60" x2="230" y2="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="230" y1="60" x2="345" y2="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="345" y1="60" x2="460" y2="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="460" y1="60" x2="575" y2="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="575" y1="60" x2="690" y2="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Island row */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap relative z-10 px-4">
          {ISLANDS.map((island) => {
            const count = island.id === 'all'
              ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
              : (categoryCounts[island.id] || 0)
            const isActive = activeCategory === island.id
            // Scale: min 56px, max 80px based on relative count
            const scale = island.id === 'all' ? 1 : 0.7 + (count / maxCount) * 0.3
            const size = Math.round(56 + (scale - 0.7) * 80)
            const Icon = island.icon

            return (
              <button
                key={island.id}
                onClick={() => onCategoryChange(island.id)}
                className={`island-float flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                }`}
                style={{ animationDelay: island.floatDelay }}
                title={`${island.label}: ${count} items`}
              >
                {/* Blob shape */}
                <div
                  className={`${island.blobClass} flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'shadow-lg'
                      : ''
                  }`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: isActive ? island.color : 'var(--muted)',
                    border: isActive ? `2px solid ${island.color}` : '1px solid var(--border)',
                  }}
                >
                  <Icon
                    className="transition-colors duration-300"
                    style={{
                      width: `${size * 0.35}px`,
                      height: `${size * 0.35}px`,
                      color: isActive ? 'var(--background)' : island.color,
                    }}
                  />
                </div>

                {/* Label + count */}
                <span className={`text-[9px] font-bold uppercase tracking-wide mt-1.5 transition-colors ${
                  isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'
                }`}>
                  {island.label}
                </span>
                {count > 0 && (
                  <span className="text-[8px] font-bold text-[var(--muted-foreground)]">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
