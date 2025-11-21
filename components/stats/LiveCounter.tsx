'use client'

import { useEffect, useState } from 'react'

interface LiveCounterProps {
  perSecond: number
  unit: string
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function LiveCounter({
  perSecond,
  unit,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}: LiveCounterProps) {
  const [mounted, setMounted] = useState(false)
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

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  const getCurrentValue = () => {
    if (!mounted) return 0
    const elapsedSeconds = (Date.now() - startTime) / 1000
    return perSecond * elapsedSeconds
  }

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{formatNumber(getCurrentValue())}{suffix} {unit}
    </span>
  )
}
