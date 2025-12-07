'use client'

import { ReactNode, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { LucideIcon } from 'lucide-react'
import { Lane } from './Lane'

interface SortableLaneProps {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
  itemIds: string[]
  count?: number
  gradient?: string
  onAdd?: () => void
  addLabel?: string
  isCompact?: boolean
  isCustomizing?: boolean
  onRemove?: () => void
  emptyState?: ReactNode
  className?: string
  onReorder?: (newOrder: string[]) => void
}

export function SortableLane({
  id,
  title,
  icon,
  children,
  itemIds,
  count = 0,
  gradient,
  onAdd,
  addLabel,
  isCompact = false,
  isCustomizing = false,
  onRemove,
  emptyState,
  className = '',
  onReorder,
}: SortableLaneProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = itemIds.indexOf(active.id as string)
      const newIndex = itemIds.indexOf(over.id as string)
      const newOrder = arrayMove(itemIds, oldIndex, newIndex)
      onReorder?.(newOrder)
    }
  }, [itemIds, onReorder])

  return (
    <Lane
      id={id}
      title={title}
      icon={icon}
      count={count}
      gradient={gradient}
      onAdd={onAdd}
      addLabel={addLabel}
      isCompact={isCompact}
      isCustomizing={isCustomizing}
      onRemove={onRemove}
      emptyState={emptyState}
      className={className}
    >
      {isCustomizing && itemIds.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={itemIds}
            strategy={verticalListSortingStrategy}
          >
            {children}
          </SortableContext>
        </DndContext>
      ) : (
        children
      )}
    </Lane>
  )
}
