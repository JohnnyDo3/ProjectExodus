'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'
import { GripVertical } from 'lucide-react'

interface SortableCardProps {
  id: string
  children: ReactNode
  isCustomizing?: boolean
}

export function SortableCard({ id, children, isCustomizing = false }: SortableCardProps) {
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
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group
        ${isDragging ? 'shadow-2xl' : ''}
        ${isCustomizing ? 'ring-2 ring-dashed ring-[var(--primary)]/30 rounded-xl' : ''}
      `}
    >
      {/* Drag handle - only visible in customize mode */}
      {isCustomizing && (
        <button
          {...attributes}
          {...listeners}
          className="
            absolute -left-1 top-1/2 -translate-y-1/2 z-10
            p-1.5 rounded-lg bg-[var(--primary)] text-white
            opacity-0 group-hover:opacity-100 transition-opacity
            cursor-grab active:cursor-grabbing
            shadow-lg
          "
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  )
}
