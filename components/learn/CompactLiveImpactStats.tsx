'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Flame, Trash2, Droplets, Trees, Factory, Zap, Loader2, RefreshCw } from 'lucide-react'

interface StatConfig {
  label: string
  icon: any
  color: string
  perSecond: number
  unit: string
  decimals: number
  source?: string
}

const ICON_MAP: Record<string, any> = {
  'CO₂ Emissions': Flame,
  'Global Waste': Trash2,
  'Plastic Waste': Factory,
  'Deforestation': Trees,
  'Water Used': Droplets,
  'Energy Used': Zap,
}

const COLOR_MAP: Record<string, string> = {
  'CO₂ Emissions': 'orange',
  'Global Waste': 'red',
  'Plastic Waste': 'purple',
  'Deforestation': 'green',
  'Water Used': 'blue',
  'Energy Used': 'yellow',
}

const DECIMALS_MAP: Record<string, number> = {
  'CO₂ Emissions': 0,
  'Global Waste': 0,
  'Plastic Waste': 0,
  'Deforestation': 3,
  'Water Used': 0,
  'Energy Used': 0,
}

export function CompactLiveImpactStats() {
  const [mounted, setMounted] = useState(false)
  const [statsConfig, setStatsConfig] = useState<StatConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeInterval, setTimeInterval] = useState<'second' | 'minute' | 'hour'>('second')
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    setMounted(true)
    setStartTime(Date.now())
    fetchEnvironmentalData()
  }, [])

  const fetchEnvironmentalData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/environmental-stats')
      const data = await response.json()

      if (!data.success) {
        throw new Error('Failed to fetch environmental data')
      }

      const transformedStats: StatConfig[] = data.stats.map((stat: any) => ({
        label: stat.label,
        icon: ICON_MAP[stat.label],
        color: COLOR_MAP[stat.label],
        perSecond: stat.perSecond,
        unit: stat.unit,
        decimals: DECIMALS_MAP[stat.label] ?? 0,
        source: stat.source,
      }))

      setStatsConfig(transformedStats)
      setError(null)
    } catch (err) {
      console.error('Error fetching environmental stats:', err)
      setError('Failed to load real-time data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStartTime(Date.now())
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getMultiplier = () => {
    switch (timeInterval) {
      case 'second': return 1
      case 'minute': return 60
      case 'hour': return 3600
    }
  }

  const formatNumber = (num: number, decimals: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  const getCurrentValue = (stat: StatConfig) => {
    if (!mounted) return 0
    const elapsedSeconds = (Date.now() - startTime) / 1000
    const baseValue = stat.perSecond * getMultiplier()
    const currentValue = baseValue + (stat.perSecond * elapsedSeconds)
    return currentValue
  }

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      red: 'text-red-500',
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      green: 'text-green-500',
      blue: 'text-blue-500',
      yellow: 'text-yellow-500'
    }
    return colors[color] || 'text-theme-primary'
  }

  const getBgClass = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-500/10',
      orange: 'bg-orange-500/10',
      purple: 'bg-purple-500/10',
      green: 'bg-green-500/10',
      blue: 'bg-blue-500/10',
      yellow: 'bg-yellow-500/10'
    }
    return colors[color] || 'bg-theme-primary/10'
  }

  const getBorderClass = (color: string) => {
    const colors: Record<string, string> = {
      red: 'border-red-500/40',
      orange: 'border-orange-500/40',
      purple: 'border-purple-500/40',
      green: 'border-green-500/40',
      blue: 'border-blue-500/40',
      yellow: 'border-yellow-500/40'
    }
    return colors[color] || 'border-theme-primary'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-theme-primary mx-auto mb-4" />
          <p className="text-theme-muted font-bold">Loading real-time environmental data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto p-6 bg-red-500/10 border-2 border-red-500/40 rounded-xl">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <button
            onClick={fetchEnvironmentalData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="inline-flex gap-1 p-1 bg-[var(--card)] rounded-xl border-2 border-red-500/40">
          {(['second', 'minute', 'hour'] as const).map((interval) => (
            <button
              key={interval}
              onClick={() => {
                setTimeInterval(interval)
                setStartTime(Date.now())
              }}
              className={`px-4 py-1.5 rounded-lg font-black text-xs uppercase transition-all ${
                timeInterval === interval
                  ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg'
                  : 'bg-transparent text-theme-muted hover:text-[var(--foreground)]'
              }`}
            >
              /{interval}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon
          const value = getCurrentValue(stat)

          return (
            <Card
              key={index}
              className={`border-2 ${getBorderClass(stat.color)} ${getBgClass(stat.color)}`}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-8 h-8 rounded-full ${getBgClass(stat.color)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${getColorClass(stat.color)}`} />
                  </div>
                  <h3 className="text-[10px] font-black text-theme-muted uppercase tracking-tight leading-tight">
                    {stat.label}
                  </h3>
                </div>

                <div className={`text-xl md:text-2xl font-black ${getColorClass(stat.color)} tabular-nums mb-0.5`}>
                  {formatNumber(value, stat.decimals)}
                </div>
                <div className="text-[10px] font-bold text-theme-muted uppercase">
                  {stat.unit}/{timeInterval}
                </div>
                {stat.source && (
                  <div className="text-[8px] font-semibold text-theme-muted/60 mt-1 truncate" title={stat.source}>
                    {stat.source}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border-2 border-red-500/40 max-w-3xl mx-auto">
        <p className="text-sm font-bold text-theme-muted">
          <span className="font-black text-red-500">REAL DATA</span> from Global Carbon Project, World Bank, FAO, IEA, and OECD. Updated hourly.
        </p>
        <button
          onClick={fetchEnvironmentalData}
          className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-theme-primary hover:text-[var(--primary)] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Refresh Data
        </button>
      </div>
    </div>
  )
}
