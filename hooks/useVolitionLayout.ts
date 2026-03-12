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
  { id: 'projects', title: 'Projects', icon: 'Rocket', gradient: 'from-violet-500 to-purple-600', enabled: true }, // Distinct branch - collaboration hub
  { id: 'articles', title: 'Articles', icon: 'FileText', gradient: 'from-[var(--accent)] to-[var(--secondary)]', enabled: true },
  { id: 'learning', title: 'Learning', icon: 'BookOpen', gradient: 'from-[var(--primary)] to-[var(--secondary)]', enabled: true },
  { id: 'network', title: 'Network', icon: 'Users', gradient: 'from-[var(--accent)] to-[var(--primary)]', enabled: true },
  { id: 'feed', title: 'Feed', icon: 'MessageCircle', gradient: 'from-[var(--secondary)] to-[var(--accent)]', enabled: true },
  { id: 'impact', title: 'Impact', icon: 'Leaf', gradient: 'from-green-500 to-emerald-500', enabled: true },
]

// Card order per lane - stores the order of item IDs within each lane (partial since not all lanes may have custom order)
export type CardOrderMap = Partial<Record<LaneId, string[]>>

// View mode for lanes
export type ViewMode = 'expanded' | 'compact' | 'minimal'

interface VolitionLayoutData {
  version: number
  laneOrder: LaneId[]
  enabledLanes: LaneId[]
  viewMode: ViewMode
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
    viewMode: 'expanded',
    spotlightDismissed: [],
    cardOrder: {},
  }
}

function loadLayoutData(): VolitionLayoutData {
  if (typeof window === 'undefined') {
    return getDefaultLayoutData()
  }

  const defaults = getDefaultLayoutData()
  const validLaneIds: LaneId[] = ['profile', 'projects', 'articles', 'learning', 'network', 'feed', 'impact']

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as any
      if (parsed.version === CURRENT_VERSION) {
        // Migrate from old isCompact boolean to new viewMode
        let viewMode: ViewMode = defaults.viewMode
        if ('viewMode' in parsed && (parsed.viewMode === 'expanded' || parsed.viewMode === 'compact' || parsed.viewMode === 'minimal')) {
          viewMode = parsed.viewMode
        } else if ('isCompact' in parsed && typeof parsed.isCompact === 'boolean') {
          // Backward compatibility: convert isCompact to viewMode
          viewMode = parsed.isCompact ? 'compact' : 'expanded'
        }

        // Validate laneOrder array and contents
        const validatedLaneOrder = Array.isArray(parsed.laneOrder) &&
          parsed.laneOrder.every((id: unknown) => typeof id === 'string' && validLaneIds.includes(id as LaneId))
          ? parsed.laneOrder
          : defaults.laneOrder

        // Validate enabledLanes array and contents
        const validatedEnabledLanes = Array.isArray(parsed.enabledLanes) &&
          parsed.enabledLanes.every((id: unknown) => typeof id === 'string' && validLaneIds.includes(id as LaneId))
          ? parsed.enabledLanes
          : defaults.enabledLanes

        // Validate spotlightDismissed contains only strings with reasonable length
        const validatedSpotlightDismissed = Array.isArray(parsed.spotlightDismissed) &&
          parsed.spotlightDismissed.every((id: unknown) => typeof id === 'string' && id.length < 200)
          ? parsed.spotlightDismissed
          : []

        // Validate cardOrder structure
        const validatedCardOrder: CardOrderMap = {}
        if (parsed.cardOrder && typeof parsed.cardOrder === 'object') {
          for (const [key, value] of Object.entries(parsed.cardOrder)) {
            if (
              validLaneIds.includes(key as LaneId) &&
              Array.isArray(value) &&
              value.every((id: unknown) => typeof id === 'string' && id.length < 200)
            ) {
              validatedCardOrder[key as LaneId] = value
            }
          }
        }

        return {
          version: CURRENT_VERSION,
          laneOrder: validatedLaneOrder,
          enabledLanes: validatedEnabledLanes,
          viewMode,
          spotlightDismissed: validatedSpotlightDismissed,
          cardOrder: validatedCardOrder,
        }
      }
    }
  } catch (error) {
    console.error('Error loading volition layout:', error)
    // Clear corrupted data
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      // Ignore storage errors
    }
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
  const [viewMode, setViewMode] = useState<ViewMode>(() => loadLayoutData().viewMode)
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
        viewMode,
        spotlightDismissed,
        cardOrder,
      })
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [laneOrder, enabledLanes, viewMode, spotlightDismissed, cardOrder])

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

  // Cycle view mode: expanded -> compact -> minimal -> expanded
  const cycleViewMode = useCallback(() => {
    setViewMode(prev => {
      if (prev === 'expanded') return 'compact'
      if (prev === 'compact') return 'minimal'
      return 'expanded'
    })
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
    setViewMode(defaults.viewMode)
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
    viewMode,
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
    cycleViewMode,
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
