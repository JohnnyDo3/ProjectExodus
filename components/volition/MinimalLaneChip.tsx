'use client'

import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface MinimalLaneChipProps {
  id: string
  title: string
  icon: LucideIcon
  count: number
  gradient: string
  isExpanded: boolean
  onClick: () => void
}

export function MinimalLaneChip({
  id,
  title,
  icon: Icon,
  count,
  gradient,
  isExpanded,
  onClick,
}: MinimalLaneChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between gap-3 p-4 rounded-2xl
        bg-gradient-to-r ${gradient}
        text-white shadow-lg
        transition-all duration-200
        ${isExpanded
          ? 'ring-4 ring-white/30 shadow-xl scale-[1.02]'
          : 'hover:shadow-xl hover:scale-[1.02]'
        }
      `}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
          <span className="text-xs font-medium text-white/70">
            {count === 0 ? 'No items' : `${count} item${count !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-white" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white" />
        )}
      </div>
    </motion.button>
  )
}
