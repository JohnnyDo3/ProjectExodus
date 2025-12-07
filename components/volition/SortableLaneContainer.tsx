'use client'

import { ReactNode, useCallback, useState, useRef, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { LaneId } from '@/hooks/useVolitionLayout'

interface SortableLaneContainerProps {
  children: ReactNode
  laneIds: LaneId[]
  onReorder: (newOrder: LaneId[]) => void
  isCustomizing?: boolean
  showNavArrows?: boolean
  className?: string
}

export function SortableLaneContainer({
  children,
  laneIds,
  onReorder,
  isCustomizing = false,
  showNavArrows = true,
  className = '',
}: SortableLaneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Check scroll capabilities
  const checkScrollCapabilities = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    checkScrollCapabilities()

    container.addEventListener('scroll', checkScrollCapabilities)
    window.addEventListener('resize', checkScrollCapabilities)

    return () => {
      container.removeEventListener('scroll', checkScrollCapabilities)
      window.removeEventListener('resize', checkScrollCapabilities)
    }
  }, [checkScrollCapabilities])

  // Scroll by lane width
  const scrollByLane = useCallback((direction: 'left' | 'right') => {
    const container = containerRef.current
    if (!container) return

    const laneWidth = isMobile ? container.clientWidth : 320
    const scrollAmount = direction === 'left' ? -laneWidth : laneWidth

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }, [isMobile])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const oldIndex = laneIds.indexOf(active.id as LaneId)
      const newIndex = laneIds.indexOf(over.id as LaneId)
      const newOrder = arrayMove(laneIds, oldIndex, newIndex)
      onReorder(newOrder)
    }
  }, [laneIds, onReorder])

  const content = (
    <>
      {/* Navigation arrows (desktop only) */}
      {showNavArrows && !isMobile && (
        <>
          <button
            onClick={() => scrollByLane('left')}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[var(--card)] shadow-lg border border-[var(--border)] flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[var(--muted)] hover:scale-110'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-[var(--foreground)]" />
          </button>

          <button
            onClick={() => scrollByLane('right')}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[var(--card)] shadow-lg border border-[var(--border)] flex items-center justify-center transition-all ${
              canScrollRight
                ? 'opacity-100 hover:bg-[var(--muted)] hover:scale-110'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-[var(--foreground)]" />
          </button>
        </>
      )}

      {/* Scroll container */}
      <div
        ref={containerRef}
        className={`
          flex gap-4 overflow-x-auto overflow-y-hidden
          scrollbar-none scroll-smooth
          ${isMobile ? 'snap-x snap-mandatory' : ''}
          px-4 md:px-6 pb-4
          ${isCustomizing ? 'pt-10' : ''}
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>

      {/* Fade edges (desktop only) */}
      {!isMobile && (
        <>
          <div
            className={`absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-10 transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-10 transition-opacity ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </>
  )

  // Only wrap in DnD context when customizing
  if (isCustomizing) {
    return (
      <div className={`relative ${className}`}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={laneIds}
            strategy={horizontalListSortingStrategy}
          >
            {content}
          </SortableContext>
        </DndContext>

        <style jsx global>{`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {content}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
