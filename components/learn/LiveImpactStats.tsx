'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Flame, Trash2, Droplets, Trees, Factory, Zap } from 'lucide-react'

interface StatConfig {
  label: string
  icon: any
  color: string
  perSecond: number // base rate per second
  unit: string
  decimals: number
}

const STATS_CONFIG: StatConfig[] = [
  {
    label: 'Global Waste Generated',
    icon: Trash2,
    color: 'red',
    perSecond: 80, // ~2.12 billion tons per year = 80kg/sec globally
    unit: 'kg',
    decimals: 0
  },
  {
    label: 'CO₂ Emissions',
    icon: Flame,
    color: 'orange',
    perSecond: 1100, // ~37 billion tons per year = 1,100 kg/sec
    unit: 'tons',
    decimals: 0
  },
  {
    label: 'Plastic Waste',
    icon: Factory,
    color: 'purple',
    perSecond: 10, // ~380 million tons per year = 10 kg/sec
    unit: 'kg',
    decimals: 0
  },
  {
    label: 'Deforestation',
    icon: Trees,
    color: 'green',
    perSecond: 0.5, // ~10 million hectares per year = 0.32 hectares/sec
    unit: 'hectares',
    decimals: 2
  },
  {
    label: 'Water Consumption',
    icon: Droplets,
    color: 'blue',
    perSecond: 127000, // ~4 trillion m³ per year = 127,000 m³/sec
    unit: 'm³',
    decimals: 0
  },
  {
    label: 'Energy Used',
    icon: Zap,
    color: 'yellow',
    perSecond: 1700, // ~580,000 TWh per year = 1,700 MW/sec
    unit: 'MWh',
    decimals: 0
  }
]

export function LiveImpactStats() {
  const [mounted, setMounted] = useState(false)
  const [timeInterval, setTimeInterval] = useState<'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'>('second')
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    setMounted(true)
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStartTime(Date.now())
    }, 100) // Update every 100ms for smooth animation

    return () => clearInterval(interval)
  }, [])

  const getMultiplier = () => {
    switch (timeInterval) {
      case 'second': return 1
      case 'minute': return 60
      case 'hour': return 3600
      case 'day': return 86400
      case 'month': return 2592000 // 30 days
      case 'year': return 31536000
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
      red: 'border-red-500',
      orange: 'border-orange-500',
      purple: 'border-purple-500',
      green: 'border-green-500',
      blue: 'border-blue-500',
      yellow: 'border-yellow-500'
    }
    return colors[color] || 'border-theme-primary'
  }

  return (
    <div className="space-y-8">
      {/* Time Interval Selector */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 p-2 bg-[var(--card)] rounded-2xl border-4 border-theme-primary shadow-theme-lg">
          {(['second', 'minute', 'hour', 'day', 'month', 'year'] as const).map((interval) => (
            <button
              key={interval}
              onClick={() => {
                setTimeInterval(interval)
                setStartTime(Date.now())
              }}
              className={`px-6 py-3 rounded-xl font-black text-sm uppercase transition-all ${
                timeInterval === interval
                  ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-lg scale-105'
                  : 'bg-transparent text-theme-muted hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              Per {interval}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS_CONFIG.map((stat, index) => {
          const Icon = stat.icon
          const value = getCurrentValue(stat)

          return (
            <Card
              key={index}
              className={`border-4 ${getBorderClass(stat.color)} ${getBgClass(stat.color)} transform hover:scale-105 transition-all duration-300`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full ${getBgClass(stat.color)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${getColorClass(stat.color)}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-black text-theme-muted uppercase tracking-wider">
                      {stat.label}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={`text-4xl md:text-5xl font-black ${getColorClass(stat.color)} tabular-nums`}>
                    {formatNumber(value, stat.decimals)}
                  </div>
                  <div className="text-sm font-bold text-theme-muted uppercase">
                    {stat.unit} / {timeInterval}
                  </div>
                </div>

                {/* Animated pulse indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getColorClass(stat.color).replace('text-', 'bg-')} animate-pulse`}></div>
                  <span className="text-xs font-semibold text-theme-muted">Live counting...</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center p-8 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl border-4 border-red-500">
        <h3 className="text-3xl font-black text-[var(--foreground)] mb-3">
          THE CLOCK IS TICKING ⏰
        </h3>
        <p className="text-lg font-semibold text-theme-muted max-w-3xl mx-auto">
          Every second counts. These numbers represent the environmental impact happening <span className="font-black text-red-500">RIGHT NOW</span>.
          But together, we can change this trajectory. Learn how to make a difference below.
        </p>
      </div>
    </div>
  )
}
