'use client'

import { useMemo, useCallback } from 'react'
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useDashboardLayout } from '@/hooks/useDashboardLayout'
import { WidgetId, GRID_COLS, GRID_BREAKPOINTS, ROW_HEIGHT } from '@/types/dashboard'
import {
  ProfileWidget,
  DiscussionsWidget,
  LearningWidget,
  ProjectsWidget,
  NetworkWidget,
  ArticlesWidget,
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
  // Customization mode
  isCustomizing?: boolean
  // Callbacks
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
  isCustomizing = false,
  onDeletePost,
  onDeleteProject,
  onDeleteArticle,
  onFollow,
  onRefetchLearning,
}: DashboardGridProps) {
  const isMobile = useIsMobile()
  const {
    layouts,
    activeWidgets,
    widgetSettings,
    onLayoutChange,
    removeWidget,
    updateWidgetSettings,
  } = useDashboardLayout()

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
      const handleRemove = isCustomizing ? () => removeWidget(widgetId) : undefined

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
                updateWidgetSettings('discussions', { filter })
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
                updateWidgetSettings('learning', { filter })
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
                updateWidgetSettings('projects', { filter })
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
      removeWidget,
      updateWidgetSettings,
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
        draggableHandle=".react-grid-draghandle"
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

        /* Only show resize handles in customize mode */
        .dashboard-grid-container.customizing .react-resizable-handle {
          display: block;
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
          z-index: 10;
        }

        .dashboard-grid-container.customizing .react-resizable-handle::after {
          content: '';
          position: absolute;
          right: 4px;
          bottom: 4px;
          width: 8px;
          height: 8px;
          border-right: 2px solid var(--primary);
          border-bottom: 2px solid var(--primary);
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .dashboard-grid-container.customizing .react-resizable-handle:hover::after {
          opacity: 1;
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
        }
      `}</style>
    </div>
  )
}
