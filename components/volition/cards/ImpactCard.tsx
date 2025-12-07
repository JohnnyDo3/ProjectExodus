'use client'

import { Leaf, Droplets, Recycle, Zap, TrendingUp } from 'lucide-react'

interface ImpactCardProps {
  stats?: {
    co2Saved?: number
    wasteReduced?: number
    waterSaved?: number
    energySaved?: number
  }
  isCompact?: boolean
  className?: string
}

const impactMetrics = [
  {
    id: 'co2',
    label: 'CO₂ Saved',
    unit: 'kg',
    icon: Leaf,
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  {
    id: 'waste',
    label: 'Waste Reduced',
    unit: 'lbs',
    icon: Recycle,
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  {
    id: 'water',
    label: 'Water Saved',
    unit: 'gal',
    icon: Droplets,
    gradient: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-500',
  },
  {
    id: 'energy',
    label: 'Energy Saved',
    unit: 'kWh',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
]

export function ImpactCard({
  stats = {},
  isCompact = false,
  className = '',
}: ImpactCardProps) {
  const getStatValue = (id: string): number => {
    switch (id) {
      case 'co2':
        return stats.co2Saved || 0
      case 'waste':
        return stats.wasteReduced || 0
      case 'water':
        return stats.waterSaved || 0
      case 'energy':
        return stats.energySaved || 0
      default:
        return 0
    }
  }

  const totalImpact = Object.values(stats).reduce((a, b) => (a || 0) + (b || 0), 0)

  if (isCompact) {
    return (
      <div className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[var(--foreground)]">Environmental Impact</p>
            <p className="text-xs text-green-600">
              {totalImpact > 0 ? `${totalImpact.toFixed(1)} total units saved` : 'Start tracking your impact'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--foreground)]">Environmental Impact</h3>
            <p className="text-xs text-[var(--foreground)]/60">Your sustainability contributions</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="p-4 space-y-3">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon
          const value = getStatValue(metric.id)

          return (
            <div
              key={metric.id}
              className={`p-3 rounded-xl ${metric.bgColor} flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[var(--foreground)]">{metric.label}</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${metric.textColor}`}>
                  {value.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--foreground)]/50 ml-1">{metric.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Encouragement */}
      {totalImpact === 0 && (
        <div className="px-4 pb-4">
          <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-center">
            <TrendingUp className="w-6 h-6 text-[var(--primary)] mx-auto mb-2" />
            <p className="text-sm font-medium text-[var(--foreground)]">
              Start making sustainable choices!
            </p>
            <p className="text-xs text-[var(--foreground)]/60 mt-1">
              Your impact will be tracked here
            </p>
          </div>
        </div>
      )}

      {/* Total impact summary */}
      {totalImpact > 0 && (
        <div className="px-4 pb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center">
            <p className="text-2xl font-bold">{totalImpact.toFixed(1)}</p>
            <p className="text-xs opacity-80">Total Impact Score</p>
          </div>
        </div>
      )}
    </div>
  )
}
