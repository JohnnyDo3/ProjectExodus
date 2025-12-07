'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// Lane definitions
export type LaneId =
  | 'profile'
  | 'projects'
  | 'articles'
  | 'learning'
  | 'network'
  | 'feed'
  | 'impact'

export interface LaneDefinition {
  id: LaneId
  title: string
  icon: string
  gradient: string
  enabled: boolean
}

export const DEFAULT_LANES: LaneDefinition[] = [
  { id: 'profile', title: 'Identity', icon: 'User', gradient: 'from-[var(--primary)] to-[var(--accent)]', enabled: true },
  { id: 'projects', title: 'Projects', icon: 'Briefcase', gradient: 'from-[var(--secondary)] to-[var(--primary)]', enabled: true },
  { id: 'articles', title: 'Articles', icon: 'FileText', gradient: 'from-[var(--accent)] to-[var(--secondary)]', enabled: true },
  { id: 'learning', title: 'Learning', icon: 'BookOpen', gradient: 'from-[var(--primary)] to-[var(--secondary)]', enabled: true },
  { id: 'network', title: 'Network', icon: 'Users', gradient: 'from-[var(--accent)] to-[var(--primary)]', enabled: true },
  { id: 'feed', title: 'Feed', icon: 'MessageCircle', gradient: 'from-[var(--secondary)] to-[var(--accent)]', enabled: true },
  { id: 'impact', title: 'Impact', icon: 'Leaf', gradient: 'from-green-500 to-emerald-500', enabled: true },
]

// Card order per lane - stores the order of item IDs within each lane (partial since not all lanes may have custom order)
export type CardOrderMap = Partial<Record<LaneId, string[]>>

interface VolitionLayoutData {
  version: number
  laneOrder: LaneId[]
  enabledLanes: LaneId[]
  isCompact: boolean
  spotlightDismissed: string[]
  cardOrder: CardOrderMap
}

const STORAGE_KEY = 'volition-layout-v3'
const CURRENT_VERSION = 2

function getDefaultLayoutData(): VolitionLayoutData {
  return {
    version: CURRENT_VERSION,
    laneOrder: DEFAULT_LANES.map(l => l.id),
    enabledLanes: DEFAULT_LANES.filter(l => l.enabled).map(l => l.id),
    isCompact: false,
    spotlightDismissed: [],
    cardOrder: {},
  }
}

function loadLayoutData(): VolitionLayoutData {
  if (typeof window === 'undefined') {
    return getDefaultLayoutData()
  }

  const defaults = getDefaultLayoutData()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as VolitionLayoutData
      if (parsed.version === CURRENT_VERSION) {
        // Validate arrays exist and are actually arrays
        return {
          version: CURRENT_VERSION,
          laneOrder: Array.isArray(parsed.laneOrder) ? parsed.laneOrder : defaults.laneOrder,
          enabledLanes: Array.isArray(parsed.enabledLanes) ? parsed.enabledLanes : defaults.enabledLanes,
          isCompact: typeof parsed.isCompact === 'boolean' ? parsed.isCompact : defaults.isCompact,
          spotlightDismissed: Array.isArray(parsed.spotlightDismissed) ? parsed.spotlightDismissed : [],
          cardOrder: parsed.cardOrder && typeof parsed.cardOrder === 'object' ? parsed.cardOrder : {},
        }
      }
    }
  } catch (error) {
    console.error('Error loading volition layout:', error)
  }

  return defaults
}

function saveLayoutData(data: VolitionLayoutData): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving volition layout:', error)
  }
}

export function useVolitionLayout() {
  const [laneOrder, setLaneOrder] = useState<LaneId[]>(() => loadLayoutData().laneOrder)
  const [enabledLanes, setEnabledLanes] = useState<LaneId[]>(() => loadLayoutData().enabledLanes)
  const [isCompact, setIsCompact] = useState(() => loadLayoutData().isCompact)
  const [spotlightDismissed, setSpotlightDismissed] = useState<string[]>(() => loadLayoutData().spotlightDismissed)
  const [cardOrder, setCardOrderState] = useState<CardOrderMap>(() => loadLayoutData().cardOrder)
  const [isCustomizing, setIsCustomizing] = useState(false)

  // Debounce save
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveLayoutData({
        version: CURRENT_VERSION,
        laneOrder,
        enabledLanes,
        isCompact,
        spotlightDismissed,
        cardOrder,
      })
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [laneOrder, enabledLanes, isCompact, spotlightDismissed, cardOrder])

  // Get ordered lanes
  const getOrderedLanes = useCallback((): LaneDefinition[] => {
    const order = Array.isArray(laneOrder) ? laneOrder : DEFAULT_LANES.map(l => l.id)
    const enabled = Array.isArray(enabledLanes) ? enabledLanes : DEFAULT_LANES.filter(l => l.enabled).map(l => l.id)

    return order
      .filter(id => enabled.includes(id))
      .map(id => DEFAULT_LANES.find(l => l.id === id)!)
      .filter(Boolean)
  }, [laneOrder, enabledLanes])

  // Toggle lane visibility
  const toggleLane = useCallback((laneId: LaneId) => {
    setEnabledLanes(prev => {
      const prevArray = Array.isArray(prev) ? prev : []
      if (prevArray.includes(laneId)) {
        return prevArray.filter(id => id !== laneId)
      }
      return [...prevArray, laneId]
    })
  }, [])

  // Reorder lanes
  const reorderLanes = useCallback((newOrder: LaneId[]) => {
    setLaneOrder(newOrder)
  }, [])

  // Move lane
  const moveLane = useCallback((fromIndex: number, toIndex: number) => {
    setLaneOrder(prev => {
      const prevArray = Array.isArray(prev) ? prev : DEFAULT_LANES.map(l => l.id)
      const newOrder = [...prevArray]
      const [removed] = newOrder.splice(fromIndex, 1)
      newOrder.splice(toIndex, 0, removed)
      return newOrder
    })
  }, [])

  // Toggle compact mode
  const toggleCompact = useCallback(() => {
    setIsCompact(prev => !prev)
  }, [])

  // Dismiss spotlight item
  const dismissSpotlight = useCallback((itemId: string) => {
    setSpotlightDismissed(prev => [...prev, itemId])
  }, [])

  // Clear dismissed spotlights
  const clearDismissedSpotlights = useCallback(() => {
    setSpotlightDismissed([])
  }, [])

  // Get card order for a lane
  const getCardOrder = useCallback((laneId: LaneId): string[] => {
    return cardOrder[laneId] || []
  }, [cardOrder])

  // Set card order for a lane
  const setCardOrder = useCallback((laneId: LaneId, order: string[]) => {
    setCardOrderState(prev => ({
      ...prev,
      [laneId]: order,
    }))
  }, [])

  // Reorder cards within a lane
  const reorderCards = useCallback((laneId: LaneId, fromIndex: number, toIndex: number) => {
    setCardOrderState(prev => {
      const currentOrder = prev[laneId] || []
      const newOrder = [...currentOrder]
      const [removed] = newOrder.splice(fromIndex, 1)
      newOrder.splice(toIndex, 0, removed)
      return {
        ...prev,
        [laneId]: newOrder,
      }
    })
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultLayoutData()
    setLaneOrder(defaults.laneOrder)
    setEnabledLanes(defaults.enabledLanes)
    setIsCompact(defaults.isCompact)
    setSpotlightDismissed([])
    setCardOrderState({})
  }, [])

  // Customization mode
  const startCustomizing = useCallback(() => {
    setIsCustomizing(true)
  }, [])

  const stopCustomizing = useCallback(() => {
    setIsCustomizing(false)
  }, [])

  return {
    // State
    laneOrder,
    enabledLanes,
    isCompact,
    spotlightDismissed,
    isCustomizing,
    cardOrder,

    // Computed
    getOrderedLanes,
    allLanes: DEFAULT_LANES,

    // Actions
    toggleLane,
    reorderLanes,
    moveLane,
    toggleCompact,
    dismissSpotlight,
    clearDismissedSpotlights,
    resetToDefaults,
    startCustomizing,
    stopCustomizing,
    getCardOrder,
    setCardOrder,
    reorderCards,
  }
}
