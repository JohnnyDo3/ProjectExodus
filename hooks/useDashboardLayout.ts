'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Layouts } from 'react-grid-layout'
import {
  DashboardLayoutData,
  WidgetId,
  WidgetSettings,
  DEFAULT_LAYOUTS,
  DEFAULT_WIDGET_ORDER,
} from '@/types/dashboard'

const STORAGE_KEY = 'volition-dashboard-layout'
const OLD_STORAGE_KEY = 'volition-column-order'
const CURRENT_VERSION = 1

// Get default layout data
function getDefaultLayoutData(): DashboardLayoutData {
  return {
    version: CURRENT_VERSION,
    layouts: DEFAULT_LAYOUTS,
    activeWidgets: [...DEFAULT_WIDGET_ORDER],
    widgetSettings: {
      profile: {},
      discussions: { filter: 'recent' },
      learning: { filter: 'all' },
      projects: { filter: 'all' },
      network: {},
      articles: {},
    },
  }
}

// Migrate from old column-order format to new layout format
function migrateFromOldFormat(oldColumnOrder: string[]): DashboardLayoutData {
  const defaultData = getDefaultLayoutData()

  // Map old column IDs to new widget IDs
  const widgetIdMap: Record<string, WidgetId> = {
    profile: 'profile',
    discussions: 'discussions',
    learning: 'learning',
    projects: 'projects',
    network: 'network',
    articles: 'articles',
  }

  // Convert column order to active widgets
  const activeWidgets: WidgetId[] = oldColumnOrder
    .filter((id) => widgetIdMap[id])
    .map((id) => widgetIdMap[id])

  return {
    ...defaultData,
    activeWidgets: activeWidgets.length > 0 ? activeWidgets : DEFAULT_WIDGET_ORDER,
  }
}

// Load layout data from localStorage
function loadLayoutData(): DashboardLayoutData {
  if (typeof window === 'undefined') {
    return getDefaultLayoutData()
  }

  try {
    // Check for new format first
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (storedData) {
      const parsed = JSON.parse(storedData) as DashboardLayoutData
      // Validate version and migrate if needed
      if (parsed.version === CURRENT_VERSION) {
        return parsed
      }
      // Future: Add version migration logic here
    }

    // Check for old format and migrate
    const oldData = localStorage.getItem(OLD_STORAGE_KEY)
    if (oldData) {
      const oldColumnOrder = JSON.parse(oldData) as string[]
      const migrated = migrateFromOldFormat(oldColumnOrder)
      // Save migrated data and remove old key
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
      localStorage.removeItem(OLD_STORAGE_KEY)
      return migrated
    }
  } catch (error) {
    console.error('Error loading dashboard layout:', error)
  }

  return getDefaultLayoutData()
}

// Save layout data to localStorage
function saveLayoutData(data: DashboardLayoutData): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving dashboard layout:', error)
  }
}

export function useDashboardLayout() {
  const [layouts, setLayouts] = useState<Layouts>(() => loadLayoutData().layouts)
  const [activeWidgets, setActiveWidgets] = useState<WidgetId[]>(
    () => loadLayoutData().activeWidgets
  )
  const [widgetSettings, setWidgetSettings] = useState<Record<WidgetId, WidgetSettings>>(
    () => loadLayoutData().widgetSettings
  )
  const [isCustomizing, setIsCustomizing] = useState(false)

  // Debounce timer ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-save with debounce
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveLayoutData({
        version: CURRENT_VERSION,
        layouts,
        activeWidgets,
        widgetSettings,
      })
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [layouts, activeWidgets, widgetSettings])

  // Handle layout change from react-grid-layout
  const onLayoutChange = useCallback(
    (currentLayout: ReactGridLayout.Layout[], allLayouts: Layouts) => {
      setLayouts(allLayouts)
    },
    []
  )

  // Add a widget to the dashboard
  const addWidget = useCallback((widgetId: WidgetId) => {
    setActiveWidgets((prev) => {
      if (prev.includes(widgetId)) return prev
      return [...prev, widgetId]
    })
  }, [])

  // Remove a widget from the dashboard
  const removeWidget = useCallback((widgetId: WidgetId) => {
    setActiveWidgets((prev) => prev.filter((id) => id !== widgetId))
  }, [])

  // Toggle widget visibility
  const toggleWidget = useCallback((widgetId: WidgetId) => {
    setActiveWidgets((prev) => {
      if (prev.includes(widgetId)) {
        return prev.filter((id) => id !== widgetId)
      }
      return [...prev, widgetId]
    })
  }, [])

  // Update widget settings (collapsed, filter, etc.)
  const updateWidgetSettings = useCallback(
    (widgetId: WidgetId, settings: Partial<WidgetSettings>) => {
      setWidgetSettings((prev) => ({
        ...prev,
        [widgetId]: { ...prev[widgetId], ...settings },
      }))
    },
    []
  )

  // Reset to default layout
  const resetToDefaults = useCallback(() => {
    const defaultData = getDefaultLayoutData()
    setLayouts(defaultData.layouts)
    setActiveWidgets(defaultData.activeWidgets)
    setWidgetSettings(defaultData.widgetSettings)
  }, [])

  // Get filtered layouts based on active widgets
  const getFilteredLayouts = useCallback((): Layouts => {
    const filtered: Layouts = {}

    for (const [breakpoint, layout] of Object.entries(layouts)) {
      filtered[breakpoint] = layout.filter((item) =>
        activeWidgets.includes(item.i as WidgetId)
      )
    }

    return filtered
  }, [layouts, activeWidgets])

  // Toggle customization mode
  const toggleCustomizing = useCallback(() => {
    setIsCustomizing((prev) => !prev)
  }, [])

  // Enter customization mode
  const startCustomizing = useCallback(() => {
    setIsCustomizing(true)
  }, [])

  // Exit customization mode
  const stopCustomizing = useCallback(() => {
    setIsCustomizing(false)
  }, [])

  return {
    layouts,
    activeWidgets,
    widgetSettings,
    isCustomizing,
    onLayoutChange,
    addWidget,
    removeWidget,
    toggleWidget,
    updateWidgetSettings,
    resetToDefaults,
    getFilteredLayouts,
    toggleCustomizing,
    startCustomizing,
    stopCustomizing,
  }
}
