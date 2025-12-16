'use client'

// ============================================
// DIGITAL SCROLL CONTEXT
// Provides global state for Digital Scroll visibility
// Used to auto-hide header when scroll is open
// ============================================

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface DigitalScrollContextValue {
  isScrollOpen: boolean
  setScrollOpen: (open: boolean) => void
}

const DigitalScrollContext = createContext<DigitalScrollContextValue | null>(null)

export function DigitalScrollProvider({ children }: { children: ReactNode }) {
  const [isScrollOpen, setIsScrollOpen] = useState(false)

  const setScrollOpen = useCallback((open: boolean) => {
    setIsScrollOpen(open)
  }, [])

  return (
    <DigitalScrollContext.Provider value={{ isScrollOpen, setScrollOpen }}>
      {children}
    </DigitalScrollContext.Provider>
  )
}

export function useDigitalScrollContext() {
  const context = useContext(DigitalScrollContext)
  if (!context) {
    // Return a default value if used outside provider
    return { isScrollOpen: false, setScrollOpen: () => {} }
  }
  return context
}

export default DigitalScrollProvider
