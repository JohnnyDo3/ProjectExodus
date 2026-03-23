'use client'

import { useMemo } from 'react'
import {
  formatYear,
  getArcsForRegion,
  REGION_CENTROIDS,
  type GlobeArc,
} from '@/data/architecture/globeConnections'
import { ARCHITECTURAL_PERIODS, type PeriodDefinition } from '@/data/architecture/periods'

interface RegionArchitecturePanelProps {
  regionId: string
  currentYear: number
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Helpers — extract real architectural influence examples for a region
// ---------------------------------------------------------------------------

interface ArchitecturalInfluence {
  fromPeriod: PeriodDefinition
  toPeriod: PeriodDefinition
  fromRegion: string
  toRegion: string
  direction: 'incoming' | 'outgoing'
  fromBuildings: { name: string; location: string; year: string }[]
  toBuildings: { name: string; location: string; year: string }[]
  sharedCharacteristics: string[]
}

function getInfluencesForRegion(regionId: string, maxYear: number): ArchitecturalInfluence[] {
  const periodMap = new Map<string, PeriodDefinition>()
  for (const p of ARCHITECTURAL_PERIODS) periodMap.set(p.id, p)

  const arcs = getArcsForRegion(regionId, maxYear)
  const seen = new Set<string>()
  const influences: ArchitecturalInfluence[] = []

  for (const arc of arcs) {
    // Deduplicate by period pair
    const pairKey = `${arc.sourcePeriodId}-${arc.targetPeriodId}`
    if (seen.has(pairKey)) continue
    seen.add(pairKey)

    const fromPeriod = periodMap.get(arc.sourcePeriodId)
    const toPeriod = periodMap.get(arc.targetPeriodId)
    if (!fromPeriod || !toPeriod) continue

    const isIncoming = arc.targetRegion === regionId
    const fromBuildings = fromPeriod.iconicBuildings.slice(0, 2)
    const toBuildings = toPeriod.iconicBuildings.slice(0, 2)

    // Find shared characteristics between source and target
    const fromChars = new Set(fromPeriod.keyCharacteristics.map(c => c.toLowerCase()))
    const shared = toPeriod.keyCharacteristics.filter(c => {
      const lower = c.toLowerCase()
      for (const fc of fromChars) {
        // Check for significant word overlap (3+ chars)
        const words = lower.split(/\s+/)
        for (const word of words) {
          if (word.length >= 4 && fc.includes(word)) return true
        }
      }
      return false
    })

    influences.push({
      fromPeriod,
      toPeriod,
      fromRegion: arc.sourceRegion,
      toRegion: arc.targetRegion,
      direction: isIncoming ? 'incoming' : 'outgoing',
      fromBuildings,
      toBuildings,
      sharedCharacteristics: shared,
    })
  }

  return influences
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RegionArchitecturePanel({
  regionId,
  currentYear,
  onClose,
}: RegionArchitecturePanelProps) {
  const region = REGION_CENTROIDS[regionId]
  const influences = useMemo(
    () => getInfluencesForRegion(regionId, currentYear),
    [regionId, currentYear],
  )

  const incoming = influences.filter(i => i.direction === 'incoming')
  const outgoing = influences.filter(i => i.direction === 'outgoing')

  if (!region) return null

  return (
    <div
      className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-[320px] md:w-[380px] max-h-[calc(100%-120px)]
                 flex flex-col rounded-lg overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(212, 165, 74, 0.25)',
        boxShadow: '0 0 30px rgba(212, 165, 74, 0.08), inset 0 0 30px rgba(212, 165, 74, 0.03)',
      }}
    >
      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(212,165,74,0.015) 2px,
            rgba(212,165,74,0.015) 4px
          )`,
        }}
      />

      {/* Header */}
      <div
        className="relative flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          borderBottom: '1px solid rgba(212, 165, 74, 0.15)',
          background: 'rgba(212, 165, 74, 0.04)',
        }}
      >
        <div>
          <h3
            className="text-sm font-bold tracking-wide"
            style={{ color: '#D4A54A' }}
          >
            {region.name}
          </h3>
          <p
            className="text-[10px] font-medium tracking-wider uppercase mt-0.5"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Architectural Influences
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          aria-label="Close panel"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Summary bar */}
      <div
        className="relative flex gap-4 px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(212, 165, 74, 0.08)' }}
      >
        <span className="text-[9px] font-mono" style={{ color: 'rgba(212,165,74,0.5)' }}>
          {incoming.length} received
        </span>
        <span className="text-[9px] font-mono" style={{ color: 'rgba(212,165,74,0.5)' }}>
          {outgoing.length} spread
        </span>
        <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
          through {formatYear(currentYear)}
        </span>
      </div>

      {/* Scrollable influences list */}
      <div
        className="relative flex-1 overflow-y-auto min-h-0 px-4 py-3"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(212,165,74,0.3) transparent',
        }}
      >
        {influences.length === 0 ? (
          <div className="text-center py-8">
            <div
              className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(212,165,74,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,165,74,0.4)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              No architectural influences at this point in time.
              <br />
              <span style={{ color: 'rgba(212,165,74,0.5)' }}>Try sliding the timeline forward.</span>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {influences.map((inf, i) => {
              const otherRegionId = inf.direction === 'incoming' ? inf.fromRegion : inf.toRegion
              const otherRegionName = REGION_CENTROIDS[otherRegionId]?.name || otherRegionId

              return (
                <div
                  key={`${inf.fromPeriod.id}-${inf.toPeriod.id}-${i}`}
                  className="rounded-md overflow-hidden"
                  style={{
                    border: '1px solid rgba(212,165,74,0.12)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {/* Influence header */}
                  <div className="px-3 py-2" style={{ borderBottom: '1px solid rgba(212,165,74,0.08)' }}>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium">
                      <span style={{ color: inf.fromPeriod.color }}>{inf.fromPeriod.icon}</span>
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{inf.fromPeriod.shortName}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(212,165,74,0.6)" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <span style={{ color: inf.toPeriod.color }}>{inf.toPeriod.icon}</span>
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{inf.toPeriod.shortName}</span>
                    </div>
                    <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {inf.direction === 'incoming' ? 'Received from' : 'Spread to'}{' '}
                      <span style={{ color: 'rgba(212,165,74,0.6)' }}>{otherRegionName}</span>
                      {' · '}{formatYear(inf.toPeriod.startYear)}
                    </p>
                  </div>

                  {/* Building examples */}
                  <div className="px-3 py-2 space-y-1.5">
                    {/* Source buildings */}
                    {inf.fromBuildings.length > 0 && (
                      <div>
                        <p className="text-[8px] font-bold tracking-wider uppercase mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          Source — {inf.fromPeriod.shortName}
                        </p>
                        {inf.fromBuildings.map((b, bi) => (
                          <div key={bi} className="flex items-start gap-1.5 mb-0.5">
                            <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0" style={{ background: inf.fromPeriod.color }} />
                            <div>
                              <p className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {b.name}
                              </p>
                              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                {b.location} · {b.year}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Target buildings */}
                    {inf.toBuildings.length > 0 && (
                      <div>
                        <p className="text-[8px] font-bold tracking-wider uppercase mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          Influenced — {inf.toPeriod.shortName}
                        </p>
                        {inf.toBuildings.map((b, bi) => (
                          <div key={bi} className="flex items-start gap-1.5 mb-0.5">
                            <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0" style={{ background: inf.toPeriod.color }} />
                            <div>
                              <p className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {b.name}
                              </p>
                              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                {b.location} · {b.year}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Shared characteristics */}
                    {inf.sharedCharacteristics.length > 0 && (
                      <div className="pt-1" style={{ borderTop: '1px solid rgba(212,165,74,0.06)' }}>
                        <p className="text-[8px] font-bold tracking-wider uppercase mb-1" style={{ color: 'rgba(212,165,74,0.4)' }}>
                          Shared techniques
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {inf.sharedCharacteristics.map((c, ci) => (
                            <span
                              key={ci}
                              className="text-[9px] px-1.5 py-0.5 rounded"
                              style={{
                                background: 'rgba(212,165,74,0.08)',
                                color: 'rgba(212,165,74,0.7)',
                                border: '1px solid rgba(212,165,74,0.12)',
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div
        className="relative flex-shrink-0 px-4 py-2.5"
        style={{
          borderTop: '1px solid rgba(212, 165, 74, 0.12)',
          background: 'rgba(212, 165, 74, 0.03)',
        }}
      >
        <p className="text-[9px] text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Click other regions to compare architectural heritage
        </p>
      </div>
    </div>
  )
}
