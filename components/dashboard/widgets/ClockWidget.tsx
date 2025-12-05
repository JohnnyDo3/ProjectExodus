'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface ClockWidgetProps {
  onRemove?: () => void
}

export function ClockWidget({ onRemove }: ClockWidgetProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatYear = (date: Date) => {
    return date.getFullYear()
  }

  return (
    <WidgetWrapper
      id="clock"
      title="Clock"
      icon={Clock}
      theme="accent"
      onRemove={onRemove}
      showRemove={!!onRemove}
    >
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tabular-nums tracking-tight">
          {formatTime(time)}
        </div>
        <div className="text-sm font-medium text-[var(--foreground)]/60 mt-2">
          {formatDate(time)}
        </div>
        <div className="text-xs font-medium text-[var(--foreground)]/40">
          {formatYear(time)}
        </div>
      </div>
    </WidgetWrapper>
  )
}
