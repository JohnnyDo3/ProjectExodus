'use client'

import { useMemo } from 'react'
import {
  formatYear,
  getArcsForRegion,
  REGION_CENTROIDS,
  type GlobeArc,
} from '@/data/architecture/globeConnections'

interface ConnectionInfoPanelProps {
  regionId: string
  currentYear: number
  onClose: () => void
  onArcClick?: (arc: GlobeArc) => void
}

export function ConnectionInfoPanel({
  regionId,
  currentYear,
  onClose,
  onArcClick,
}: ConnectionInfoPanelProps) {
  const region = REGION_CENTROIDS[regionId]
  const arcs = useMemo(
    () => getArcsForRegion(regionId, currentYear),
    [regionId, currentYear],
  )

  // Group arcs by era material for section headers
  const groupedArcs = useMemo(() => {
    const groups: { era: string; color: string; arcs: GlobeArc[] }[] = []
    let currentEra = ''

    for (const arc of arcs) {
      if (arc.eraMaterial !== currentEra) {
        currentEra = arc.eraMaterial
        groups.push({ era: currentEra, color: arc.eraColor, arcs: [] })
      }
      groups[groups.length - 1].arcs.push(arc)
    }
    return groups
  }, [arcs])

  // Separate incoming vs outgoing
  const incoming = arcs.filter(a => a.targetRegion === regionId)
  const outgoing = arcs.filter(a => a.sourceRegion === regionId)

  if (!region) return null

  return (
    <div
      className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-[300px] md:w-[340px] max-h-[calc(100%-120px)]
                 flex flex-col rounded-lg overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(212, 165, 74, 0.25)',
        boxShadow: '0 0 30px rgba(212, 165, 74, 0.08), inset 0 0 30px rgba(212, 165, 74, 0.03)',
        /* animation handled via CSS transition */
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
            {arcs.length} connection{arcs.length !== 1 ? 's' : ''} · {incoming.length} in · {outgoing.length} out
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          aria-label="Close connection panel"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Coordinates display */}
      <div
        className="relative flex gap-4 px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(212, 165, 74, 0.08)' }}
      >
        <span className="text-[9px] font-mono" style={{ color: 'rgba(212,165,74,0.5)' }}>
          LAT {region.lat.toFixed(1)}°
        </span>
        <span className="text-[9px] font-mono" style={{ color: 'rgba(212,165,74,0.5)' }}>
          LNG {region.lng.toFixed(1)}°
        </span>
      </div>

      {/* Scrollable connections list */}
      <div
        className="relative flex-1 overflow-y-auto min-h-0 px-4 py-3"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(212,165,74,0.3) transparent',
        }}
      >
        {arcs.length === 0 ? (
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
              No connections at this point in time
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {groupedArcs.map((group) => (
              <div key={group.era}>
                {/* Era section header */}
                <div className="flex items-center gap-2 py-1.5 mt-1 first:mt-0">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: group.color }}
                  />
                  <span
                    className="text-[9px] font-bold tracking-wider uppercase"
                    style={{ color: `${group.color}CC` }}
                  >
                    {group.era} Era
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: `${group.color}25` }}
                  />
                  <span
                    className="text-[9px] font-medium"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {group.arcs.length}
                  </span>
                </div>

                {/* Individual arcs */}
                {group.arcs.map((arc) => {
                  const isIncoming = arc.targetRegion === regionId
                  const otherRegion = isIncoming ? arc.sourceRegion : arc.targetRegion
                  const otherName = REGION_CENTROIDS[otherRegion]?.name || otherRegion

                  return (
                    <button
                      key={arc.id}
                      className="w-full text-left px-2.5 py-2 rounded-md transition-all hover:bg-white/[0.04] group"
                      onClick={() => onArcClick?.(arc)}
                    >
                      <div className="flex items-start gap-2">
                        {/* Direction arrow */}
                        <div
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: arc.eraColor }}
                        >
                          {isIncoming ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Connection description */}
                          <p className="text-[11px] font-medium leading-tight" style={{ color: 'rgba(255,255,255,0.75)' }}>
                            {isIncoming ? (
                              <>
                                <span style={{ color: arc.eraColor }}>{arc.sourcePeriodName}</span>
                                <span style={{ color: 'rgba(255,255,255,0.3)' }}> → </span>
                                <span>{arc.targetPeriodName}</span>
                              </>
                            ) : (
                              <>
                                <span>{arc.sourcePeriodName}</span>
                                <span style={{ color: 'rgba(255,255,255,0.3)' }}> → </span>
                                <span style={{ color: arc.eraColor }}>{arc.targetPeriodName}</span>
                              </>
                            )}
                          </p>

                          {/* Region + year */}
                          <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            {isIncoming ? 'From' : 'To'}{' '}
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>{otherName}</span>
                            <span className="mx-1">·</span>
                            {formatYear(arc.startYear)}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with summary */}
      <div
        className="relative flex-shrink-0 px-4 py-2.5"
        style={{
          borderTop: '1px solid rgba(212, 165, 74, 0.12)',
          background: 'rgba(212, 165, 74, 0.03)',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Through {formatYear(currentYear)}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[9px]" style={{ color: 'rgba(212,165,74,0.6)' }}>
              ← {incoming.length} in
            </span>
            <span className="text-[9px]" style={{ color: 'rgba(212,165,74,0.6)' }}>
              {outgoing.length} out →
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
