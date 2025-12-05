'use client'

import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check initial value
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [breakpoint])

  return isMobile
}

// Hook for getting current breakpoint name
export function useBreakpoint(): 'xxs' | 'xs' | 'sm' | 'md' | 'lg' {
  const [breakpoint, setBreakpoint] = useState<'xxs' | 'xs' | 'sm' | 'md' | 'lg'>('lg')

  useEffect(() => {
    const getBreakpoint = (): 'xxs' | 'xs' | 'sm' | 'md' | 'lg' => {
      const width = window.innerWidth
      if (width >= 1200) return 'lg'
      if (width >= 996) return 'md'
      if (width >= 768) return 'sm'
      if (width >= 480) return 'xs'
      return 'xxs'
    }

    const checkBreakpoint = () => {
      setBreakpoint(getBreakpoint())
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)

    return () => {
      window.removeEventListener('resize', checkBreakpoint)
    }
  }, [])

  return breakpoint
}
