'use client'

import { ReactNode, Fragment } from 'react'
import { LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MinimalLaneChip } from './MinimalLaneChip'
import { LaneId } from '@/hooks/useVolitionLayout'

interface LaneConfig {
  id: LaneId
  title: string
  icon: LucideIcon
  gradient: string
  count: number
}

interface MinimalChipGridProps {
  lanes: LaneConfig[]
  expandedLaneId: LaneId | null
  onChipClick: (laneId: LaneId) => void
  renderLaneContent: (laneId: LaneId) => ReactNode
  getLaneEmptyState: (laneId: LaneId) => ReactNode
}

export function MinimalChipGrid({
  lanes,
  expandedLaneId,
  onChipClick,
  renderLaneContent,
  getLaneEmptyState,
}: MinimalChipGridProps) {
  // Calculate grid position for expansion panel
  // Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col
  // When a chip is expanded, content shows below it spanning the full width

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lanes.map((lane, index) => {
          const isExpanded = expandedLaneId === lane.id
          // Calculate if this chip's expansion panel should show
          // It shows after this chip's row
          const showExpansionAfter = isExpanded

          // Calculate row boundaries for expansion placement
          // Mobile: every chip, Tablet: every 2, Desktop: every 3
          const colsPerRow = { sm: 1, md: 2, lg: 3 }

          return (
            <Fragment key={lane.id}>
              {/* The chip itself */}
              <div className="relative">
                <MinimalLaneChip
                  id={lane.id}
                  title={lane.title}
                  icon={lane.icon}
                  count={lane.count}
                  gradient={lane.gradient}
                  isExpanded={isExpanded}
                  onClick={() => onChipClick(lane.id)}
                />
              </div>

              {/* Expansion panel - shows below the chip, spanning full width */}
              {showExpansionAfter && (
                <motion.div
                  className="col-span-1 sm:col-span-2 lg:col-span-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-4 shadow-lg">
                    {/* Lane header in expansion */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--border)]">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lane.gradient} flex items-center justify-center`}>
                        <lane.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">{lane.title}</h3>
                        <span className="text-xs text-[var(--foreground)]/50">
                          {lane.count === 0 ? 'No items' : `${lane.count} item${lane.count !== 1 ? 's' : ''}`}
                        </span>
                      </div>
                    </div>

                    {/* Lane content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lane.count === 0 ? (
                        <div className="col-span-full">
                          {getLaneEmptyState(lane.id)}
                        </div>
                      ) : (
                        renderLaneContent(lane.id)
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
