import { LucideIcon } from 'lucide-react'
import { Layout, Layouts } from 'react-grid-layout'

// Widget IDs
export type WidgetId =
  | 'profile'
  | 'discussions'
  | 'learning'
  | 'projects'
  | 'network'
  | 'articles'

// Widget theme colors
export type WidgetTheme = 'primary' | 'accent' | 'secondary'

// Widget definition for the registry
export interface WidgetDefinition {
  id: WidgetId
  name: string
  description: string
  icon: LucideIcon
  defaultSize: { w: number; h: number }
  minSize: { w: number; h: number }
  maxSize?: { w: number; h: number }
  theme: WidgetTheme
}

// Per-widget settings stored in localStorage
export interface WidgetSettings {
  collapsed?: boolean
  filter?: string // Widget-specific filter state (e.g., 'recent', 'popular')
}

// Complete dashboard layout data for localStorage
export interface DashboardLayoutData {
  version: number
  layouts: Layouts
  activeWidgets: WidgetId[]
  widgetSettings: Record<WidgetId, WidgetSettings>
}

// Layout item from react-grid-layout
export type LayoutItem = Layout

// Grid configuration
export const GRID_COLS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
export const GRID_BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
export const ROW_HEIGHT = 50

// Default widget order
export const DEFAULT_WIDGET_ORDER: WidgetId[] = [
  'profile',
  'discussions',
  'learning',
  'projects',
  'network',
  'articles',
]

// Default layouts for each breakpoint
export const DEFAULT_LAYOUTS: Layouts = {
  lg: [
    { i: 'profile', x: 0, y: 0, w: 4, h: 12, minW: 3, minH: 8 },
    { i: 'discussions', x: 4, y: 0, w: 4, h: 10, minW: 3, minH: 6 },
    { i: 'learning', x: 8, y: 0, w: 4, h: 10, minW: 3, minH: 6 },
    { i: 'projects', x: 0, y: 12, w: 4, h: 8, minW: 3, minH: 5 },
    { i: 'network', x: 4, y: 10, w: 4, h: 8, minW: 3, minH: 5 },
    { i: 'articles', x: 8, y: 10, w: 4, h: 8, minW: 3, minH: 5 },
  ],
  md: [
    { i: 'profile', x: 0, y: 0, w: 5, h: 10, minW: 3, minH: 8 },
    { i: 'discussions', x: 5, y: 0, w: 5, h: 8, minW: 3, minH: 6 },
    { i: 'learning', x: 0, y: 10, w: 5, h: 8, minW: 3, minH: 6 },
    { i: 'projects', x: 5, y: 8, w: 5, h: 6, minW: 3, minH: 5 },
    { i: 'network', x: 0, y: 18, w: 5, h: 6, minW: 3, minH: 5 },
    { i: 'articles', x: 5, y: 14, w: 5, h: 6, minW: 3, minH: 5 },
  ],
  sm: [
    { i: 'profile', x: 0, y: 0, w: 6, h: 10, minW: 3, minH: 8 },
    { i: 'discussions', x: 0, y: 10, w: 6, h: 8, minW: 3, minH: 6 },
    { i: 'learning', x: 0, y: 18, w: 6, h: 8, minW: 3, minH: 6 },
    { i: 'projects', x: 0, y: 26, w: 6, h: 6, minW: 3, minH: 5 },
    { i: 'network', x: 0, y: 32, w: 6, h: 6, minW: 3, minH: 5 },
    { i: 'articles', x: 0, y: 38, w: 6, h: 6, minW: 3, minH: 5 },
  ],
  xs: [
    { i: 'profile', x: 0, y: 0, w: 4, h: 10, minW: 2, minH: 8 },
    { i: 'discussions', x: 0, y: 10, w: 4, h: 8, minW: 2, minH: 6 },
    { i: 'learning', x: 0, y: 18, w: 4, h: 8, minW: 2, minH: 6 },
    { i: 'projects', x: 0, y: 26, w: 4, h: 6, minW: 2, minH: 5 },
    { i: 'network', x: 0, y: 32, w: 4, h: 6, minW: 2, minH: 5 },
    { i: 'articles', x: 0, y: 38, w: 4, h: 6, minW: 2, minH: 5 },
  ],
  xxs: [
    { i: 'profile', x: 0, y: 0, w: 2, h: 10, minW: 2, minH: 8 },
    { i: 'discussions', x: 0, y: 10, w: 2, h: 8, minW: 2, minH: 6 },
    { i: 'learning', x: 0, y: 18, w: 2, h: 8, minW: 2, minH: 6 },
    { i: 'projects', x: 0, y: 26, w: 2, h: 6, minW: 2, minH: 5 },
    { i: 'network', x: 0, y: 32, w: 2, h: 6, minW: 2, minH: 5 },
    { i: 'articles', x: 0, y: 38, w: 2, h: 6, minW: 2, minH: 5 },
  ],
}

// Props for widget components
export interface WidgetProps {
  widgetId: WidgetId
  onRemove?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  filter?: string
  onFilterChange?: (filter: string) => void
}

// Context data types for volition data provider
export interface VolitionData {
  userProfile: any
  projects: any[]
  articles: any[]
  feedPosts: any[]
  learningModules: any[]
  networkSuggestions: any[]
  following: any[]
  isLoading: boolean
  refetch: () => Promise<void>
}
