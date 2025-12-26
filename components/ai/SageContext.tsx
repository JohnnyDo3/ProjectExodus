'use client'

import { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react'

interface Position {
  x: number
  y: number
}

interface SageContextValue {
  // State
  isNapping: boolean
  isAnimating: boolean
  animationPhase: 'idle' | 'going-to-nap' | 'waking-up'
  lastPosition: Position | null

  // Refs for animation coordinates
  sageButtonRef: React.RefObject<HTMLButtonElement | null>
  headerLogoRef: React.RefObject<HTMLDivElement | null>

  // Actions
  startNap: () => void
  wakeUp: () => void
  setLastPosition: (pos: Position) => void
  onAnimationComplete: (phase: 'going-to-nap' | 'waking-up') => void

  // Position getters
  getSagePosition: () => Position | null
  getHeaderPosition: () => Position | null
}

const SageContext = createContext<SageContextValue | null>(null)

export function SageProvider({ children }: { children: ReactNode }) {
  const [isNapping, setIsNapping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'going-to-nap' | 'waking-up'>('idle')
  const [lastPosition, setLastPosition] = useState<Position | null>(null)

  const sageButtonRef = useRef<HTMLButtonElement | null>(null)
  const headerLogoRef = useRef<HTMLDivElement | null>(null)

  const getSagePosition = useCallback((): Position | null => {
    if (!sageButtonRef.current) return null
    const rect = sageButtonRef.current.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }, [])

  const getHeaderPosition = useCallback((): Position | null => {
    if (!headerLogoRef.current) return null
    const rect = headerLogoRef.current.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }, [])

  const startNap = useCallback(() => {
    // Save current position before napping - use fallback if button ref not available
    const currentPos = getSagePosition() || {
      x: typeof window !== 'undefined' ? window.innerWidth - 60 : 100,
      y: typeof window !== 'undefined' ? window.innerHeight - 60 : 100
    }
    setLastPosition(currentPos)

    setIsAnimating(true)
    setAnimationPhase('going-to-nap')
  }, [getSagePosition])

  const wakeUp = useCallback(() => {
    setIsAnimating(true)
    setAnimationPhase('waking-up')
  }, [])

  const onAnimationComplete = useCallback((phase: 'going-to-nap' | 'waking-up') => {
    setIsAnimating(false)
    setAnimationPhase('idle')

    if (phase === 'going-to-nap') {
      setIsNapping(true)
    } else if (phase === 'waking-up') {
      setIsNapping(false)
    }
  }, [])

  return (
    <SageContext.Provider
      value={{
        isNapping,
        isAnimating,
        animationPhase,
        lastPosition,
        sageButtonRef,
        headerLogoRef,
        startNap,
        wakeUp,
        setLastPosition,
        onAnimationComplete,
        getSagePosition,
        getHeaderPosition,
      }}
    >
      {children}
    </SageContext.Provider>
  )
}

export function useSageContext() {
  const context = useContext(SageContext)
  if (!context) {
    throw new Error('useSageContext must be used within a SageProvider')
  }
  return context
}

// Safe hook that doesn't throw if used outside provider
export function useSageContextSafe() {
  return useContext(SageContext)
}
