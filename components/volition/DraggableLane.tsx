'use client'

import { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface DraggableLaneProps {
  id: string
  children: ReactNode
  isCustomizing?: boolean
}

export function DraggableLane({ id, children, isCustomizing = false }: DraggableLaneProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex-shrink-0 ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      {/* Drag handle - only visible when customizing */}
      {isCustomizing && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 cursor-grab active:cursor-grabbing bg-[var(--primary)] text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-[var(--primary)]/90 transition-colors"
        >
          <GripVertical className="w-4 h-4" />
          <span className="text-xs font-bold">Drag to reorder</span>
        </div>
      )}
      {children}
    </div>
  )
}
