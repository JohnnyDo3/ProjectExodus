'use client'

import { useMemo, useCallback } from 'react'
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useIsMobile } from '@/hooks/useIsMobile'
import { WidgetId, WidgetSettings, GRID_COLS, GRID_BREAKPOINTS, ROW_HEIGHT } from '@/types/dashboard'
import {
  ProfileWidget,
  DiscussionsWidget,
  LearningWidget,
  ProjectsWidget,
  NetworkWidget,
  ArticlesWidget,
  ClockWidget,
  QuickLinksWidget,
  QuoteWidget,
} from './widgets'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardGridProps {
  // Data props
  userProfile: any
  user: any
  feedPosts: any[]
  learningModules: any[]
  projects: any[]
  following: any[]
  networkSuggestions: any[]
  articles: any[]
  // Layout state (from useDashboardLayout in parent)
  layouts: Layouts
  activeWidgets: WidgetId[]
  widgetSettings: Record<WidgetId, WidgetSettings>
  isCustomizing: boolean
  // Layout callbacks
  onLayoutChange: (currentLayout: Layout[], allLayouts: Layouts) => void
  onRemoveWidget: (widgetId: WidgetId) => void
  onUpdateWidgetSettings: (widgetId: WidgetId, settings: Partial<WidgetSettings>) => void
  // Data callbacks
  onDeletePost?: (id: string) => void
  onDeleteProject?: (id: string) => void
  onDeleteArticle?: (id: string) => void
  onFollow?: (userId: string) => void
  onRefetchLearning?: () => void
}

export function DashboardGrid({
  userProfile,
  user,
  feedPosts,
  learningModules,
  projects,
  following,
  networkSuggestions,
  articles,
  layouts,
  activeWidgets,
  widgetSettings,
  isCustomizing,
  onLayoutChange,
  onRemoveWidget,
  onUpdateWidgetSettings,
  onDeletePost,
  onDeleteProject,
  onDeleteArticle,
  onFollow,
  onRefetchLearning,
}: DashboardGridProps) {
  const isMobile = useIsMobile()

  // Only enable interactions in customize mode (and not on mobile)
  const canDrag = isCustomizing && !isMobile
  const canResize = isCustomizing && !isMobile

  // Filter layouts to only include active widgets
  const filteredLayouts = useMemo(() => {
    const filtered: Layouts = {}
    for (const [breakpoint, layout] of Object.entries(layouts)) {
      filtered[breakpoint] = (layout as Layout[]).filter((item) =>
        activeWidgets.includes(item.i as WidgetId)
      )
    }
    return filtered
  }, [layouts, activeWidgets])

  // Handle layout change
  const handleLayoutChange = useCallback(
    (currentLayout: Layout[], allLayouts: Layouts) => {
      onLayoutChange(currentLayout, allLayouts)
    },
    [onLayoutChange]
  )

  // Render widget by ID
  const renderWidget = useCallback(
    (widgetId: WidgetId) => {
      const settings = widgetSettings[widgetId] || {}
      // Only allow removal in customize mode
      const handleRemove = isCustomizing ? () => onRemoveWidget(widgetId) : undefined

      switch (widgetId) {
        case 'profile':
          return (
            <ProfileWidget
              userProfile={userProfile}
              user={user}
              onRemove={handleRemove}
            />
          )
        case 'discussions':
          return (
            <DiscussionsWidget
              feedPosts={feedPosts}
              userId={user?.id}
              onRemove={handleRemove}
              filter={settings.filter || 'recent'}
              onFilterChange={(filter) =>
                onUpdateWidgetSettings('discussions', { filter })
              }
              onDeletePost={onDeletePost}
            />
          )
        case 'learning':
          return (
            <LearningWidget
              learningModules={learningModules}
              onRemove={handleRemove}
              filter={settings.filter || 'all'}
              onFilterChange={(filter) => {
                onUpdateWidgetSettings('learning', { filter })
                onRefetchLearning?.()
              }}
            />
          )
        case 'projects':
          return (
            <ProjectsWidget
              projects={projects}
              userId={user?.id}
              onRemove={handleRemove}
              filter={settings.filter || 'all'}
              onFilterChange={(filter) =>
                onUpdateWidgetSettings('projects', { filter })
              }
              onDeleteProject={onDeleteProject}
            />
          )
        case 'network':
          return (
            <NetworkWidget
              following={following}
              networkSuggestions={networkSuggestions}
              onRemove={handleRemove}
              onFollow={onFollow}
            />
          )
        case 'articles':
          return (
            <ArticlesWidget
              articles={articles}
              onRemove={handleRemove}
              onDeleteArticle={onDeleteArticle}
            />
          )
        case 'clock':
          return <ClockWidget onRemove={handleRemove} />
        case 'quicklinks':
          return <QuickLinksWidget onRemove={handleRemove} />
        case 'quote':
          return <QuoteWidget onRemove={handleRemove} />
        default:
          return null
      }
    },
    [
      userProfile,
      user,
      feedPosts,
      learningModules,
      projects,
      following,
      networkSuggestions,
      articles,
      widgetSettings,
      isCustomizing,
      onRemoveWidget,
      onUpdateWidgetSettings,
      onDeletePost,
      onDeleteProject,
      onDeleteArticle,
      onFollow,
      onRefetchLearning,
    ]
  )

  return (
    <div className={`dashboard-grid-container ${isCustomizing ? 'customizing' : ''}`}>
      <ResponsiveGridLayout
        className="layout"
        layouts={filteredLayouts}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLS}
        rowHeight={ROW_HEIGHT}
        isDraggable={canDrag}
        isResizable={canResize}
        onLayoutChange={handleLayoutChange}
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
        containerPadding={[16, 16]}
        useCSSTransforms={true}
        resizeHandles={canResize ? ['se', 'sw', 'ne', 'nw'] : []}
      >
        {activeWidgets.map((widgetId) => (
          <div key={widgetId} className="widget-container">
            {renderWidget(widgetId)}
          </div>
        ))}
      </ResponsiveGridLayout>

      <style jsx global>{`
        .dashboard-grid-container {
          min-height: calc(100vh - 120px);
        }

        .widget-container {
          height: 100%;
        }

        .widget-container > div {
          height: 100%;
        }

        /* Hide resize handles by default */
        .react-resizable-handle {
          display: none;
        }

        /* Customize mode - enable dragging anywhere on widget */
        .dashboard-grid-container.customizing .widget-container {
          cursor: grab;
        }

        .dashboard-grid-container.customizing .widget-container:active {
          cursor: grabbing;
        }

        /* Only show resize handles in customize mode */
        .dashboard-grid-container.customizing .react-resizable-handle {
          display: block;
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 10;
          background: transparent;
        }

        /* SE corner (bottom-right) */
        .dashboard-grid-container.customizing .react-resizable-handle-se {
          bottom: 0;
          right: 0;
          cursor: se-resize;
        }

        /* SW corner (bottom-left) */
        .dashboard-grid-container.customizing .react-resizable-handle-sw {
          bottom: 0;
          left: 0;
          cursor: sw-resize;
        }

        /* NE corner (top-right) */
        .dashboard-grid-container.customizing .react-resizable-handle-ne {
          top: 0;
          right: 0;
          cursor: ne-resize;
        }

        /* NW corner (top-left) */
        .dashboard-grid-container.customizing .react-resizable-handle-nw {
          top: 0;
          left: 0;
          cursor: nw-resize;
        }

        /* Visual indicator for resize handles */
        .dashboard-grid-container.customizing .react-resizable-handle::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 2px;
          opacity: 0.6;
          transition: opacity 0.2s, transform 0.2s;
        }

        .dashboard-grid-container.customizing .react-resizable-handle:hover::after {
          opacity: 1;
          transform: scale(1.2);
        }

        .dashboard-grid-container.customizing .react-resizable-handle-se::after {
          right: 4px;
          bottom: 4px;
        }

        .dashboard-grid-container.customizing .react-resizable-handle-sw::after {
          left: 4px;
          bottom: 4px;
        }

        .dashboard-grid-container.customizing .react-resizable-handle-ne::after {
          right: 4px;
          top: 4px;
        }

        .dashboard-grid-container.customizing .react-resizable-handle-nw::after {
          left: 4px;
          top: 4px;
        }

        /* Customize mode visual indicator */
        .dashboard-grid-container.customizing .widget-container > div {
          outline: 2px dashed var(--primary);
          outline-offset: -2px;
        }

        /* Grid item placeholder */
        .react-grid-placeholder {
          background: var(--primary);
          opacity: 0.2;
          border-radius: 12px;
          transition: all 0.15s ease;
        }

        /* Dragging state */
        .react-grid-item.react-draggable-dragging {
          z-index: 100;
          opacity: 0.9;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        /* Resizing state */
        .react-grid-item.resizing {
          z-index: 100;
          opacity: 0.9;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .react-resizable-handle {
            display: none !important;
          }

          .dashboard-grid-container {
            padding: 8px;
          }

          .dashboard-grid-container.customizing .widget-container > div {
            outline: none;
          }

          .dashboard-grid-container.customizing .widget-container {
            cursor: default;
          }
        }
      `}</style>
    </div>
  )
}
