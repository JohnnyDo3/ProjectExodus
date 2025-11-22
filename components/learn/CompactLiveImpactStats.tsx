'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Flame, Trash2, Droplets, Trees, Factory, Zap } from 'lucide-react'

interface StatConfig {
  label: string
  icon: any
  color: string
  perSecond: number
  unit: string
  decimals: number
}

const STATS_CONFIG: StatConfig[] = [
  {
    label: 'CO₂ Emissions',
    icon: Flame,
    color: 'orange',
    perSecond: 1100,
    unit: 'tons',
    decimals: 0
  },
  {
    label: 'Global Waste',
    icon: Trash2,
    color: 'red',
    perSecond: 80,
    unit: 'kg',
    decimals: 0
  },
  {
    label: 'Plastic Waste',
    icon: Factory,
    color: 'purple',
    perSecond: 10,
    unit: 'kg',
    decimals: 0
  },
  {
    label: 'Deforestation',
    icon: Trees,
    color: 'green',
    perSecond: 0.5,
    unit: 'hectares',
    decimals: 2
  },
  {
    label: 'Water Used',
    icon: Droplets,
    color: 'blue',
    perSecond: 127000,
    unit: 'm³',
    decimals: 0
  },
  {
    label: 'Energy Used',
    icon: Zap,
    color: 'yellow',
    perSecond: 1700,
    unit: 'MWh',
    decimals: 0
  }
]

export function CompactLiveImpactStats() {
  const [mounted, setMounted] = useState(false)
  const [timeInterval, setTimeInterval] = useState<'second' | 'minute' | 'hour'>('second')
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    setMounted(true)
    setStartTime(Date.now())
  }, [])

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

  return (
    <div className="space-y-4">
      {/* Time Interval Selector - Compact */}
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

      {/* Stats Grid - Compact 3x2 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {STATS_CONFIG.map((stat, index) => {
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
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Compact CTA */}
      <div className="text-center p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border-2 border-red-500/40 max-w-3xl mx-auto">
        <p className="text-sm font-bold text-theme-muted">
          <span className="font-black text-red-500">LIVE DATA</span> - These numbers update in real-time. Learn how to make a difference below.
        </p>
      </div>
    </div>
  )
}
