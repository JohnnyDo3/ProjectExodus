'use client'

import type { PeriodDefinition } from '@/data/architecture/periods'
import { formatYear, getEraColor } from '@/data/architecture/globeConnections'
import { getPeriodById } from '@/data/architecture/periods'

interface PeriodDetailPanelProps {
  period: PeriodDefinition
  onClose: () => void
  onNavigate: (periodId: string) => void
}

export function PeriodDetailPanel({ period, onClose, onNavigate }: PeriodDetailPanelProps) {
  const eraColor = getEraColor(period.startYear)

  return (
    <div
      className="relative max-w-[320px] rounded-lg backdrop-blur-md overflow-hidden"
      style={{
        background: 'rgba(0,0,0,0.8)',
        border: `1px solid ${eraColor}40`,
        boxShadow: `0 0 20px ${eraColor}15, inset 0 0 20px ${eraColor}05`,
        /* CSS animation removed — Turbopack compat */
      }}
    >
      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(212,165,74,0.02) 3px,
            rgba(212,165,74,0.02) 6px
          )`,
        }}
      />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{period.icon}</span>
            <div>
              <h2
                className="text-sm font-semibold tracking-wide leading-tight"
                style={{ color: eraColor }}
              >
                {period.name}
              </h2>
              <p
                className="text-[10px] font-medium tracking-wider uppercase mt-0.5"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {formatYear(period.startYear)} – {period.ongoing ? 'Present' : formatYear(period.endYear)}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            aria-label="Close period details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Key characteristics */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {period.keyCharacteristics.slice(0, 4).map((char, i) => (
              <span
                key={i}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  background: `${eraColor}15`,
                  border: `1px solid ${eraColor}20`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="mb-3">
          <p
            className="text-[9px] font-medium tracking-wider uppercase mb-1"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Regions
          </p>
          <p
            className="text-[11px]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {period.primaryRegions.map(r =>
              r.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
            ).join(', ')}
          </p>
        </div>

        {/* Iconic buildings */}
        {period.iconicBuildings.length > 0 && (
          <div className="mb-3">
            <p
              className="text-[9px] font-medium tracking-wider uppercase mb-1"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Iconic Buildings
            </p>
            <div className="flex flex-col gap-0.5">
              {period.iconicBuildings.slice(0, 3).map((b, i) => (
                <p key={i} className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: eraColor }}>{b.name}</span>
                  <span className="mx-1" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span>{b.location}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Influence links */}
        <div className="flex flex-wrap gap-1.5">
          {period.influencedBy.length > 0 && (
            <div>
              <p
                className="text-[8px] font-medium tracking-wider uppercase mb-0.5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Influenced by
              </p>
              <div className="flex flex-wrap gap-1">
                {period.influencedBy.map(id => {
                  const p = getPeriodById(id)
                  return p ? (
                    <button
                      key={id}
                      onClick={() => onNavigate(id)}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm hover:brightness-125 transition-all cursor-pointer"
                      style={{
                        color: getEraColor(p.startYear),
                        background: `${getEraColor(p.startYear)}15`,
                        border: `1px solid ${getEraColor(p.startYear)}25`,
                      }}
                    >
                      {p.shortName}
                    </button>
                  ) : null
                })}
              </div>
            </div>
          )}

          {period.influenced.length > 0 && (
            <div>
              <p
                className="text-[8px] font-medium tracking-wider uppercase mb-0.5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Influenced
              </p>
              <div className="flex flex-wrap gap-1">
                {period.influenced.slice(0, 4).map(id => {
                  const p = getPeriodById(id)
                  return p ? (
                    <button
                      key={id}
                      onClick={() => onNavigate(id)}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm hover:brightness-125 transition-all cursor-pointer"
                      style={{
                        color: getEraColor(p.startYear),
                        background: `${getEraColor(p.startYear)}15`,
                        border: `1px solid ${getEraColor(p.startYear)}25`,
                      }}
                    >
                      {p.shortName}
                    </button>
                  ) : null
                })}
                {period.influenced.length > 4 && (
                  <span className="text-[9px] px-1 py-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    +{period.influenced.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
