'use client'

import { useState, useCallback } from 'react'
import { DragDropConfig, DragDropItem, DragDropZone } from '@/types/learning'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'

interface DragDropActivityProps {
  config: DragDropConfig['config']
  maxPoints: number
  onComplete: (score: number, maxScore: number, passed: boolean, feedback?: string) => void
}

export function DragDropActivity({
  config,
  maxPoints,
  onComplete
}: DragDropActivityProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({})
  const [draggingItem, setDraggingItem] = useState<string | null>(null)
  const [availableItems, setAvailableItems] = useState<DragDropItem[]>(
    config.shuffleItems
      ? [...config.items].sort(() => Math.random() - 0.5)
      : config.items
  )

  const handleDragStart = (itemId: string) => {
    setDraggingItem(itemId)
  }

  const handleDragEnd = () => {
    setDraggingItem(null)
  }

  const handleDrop = (zoneId: string) => {
    if (!draggingItem) return

    // Check if zone accepts this item
    const zone = config.zones.find(z => z.id === zoneId)
    const item = config.items.find(i => i.id === draggingItem)

    if (zone?.accepts && item?.category && !zone.accepts.includes(item.category)) {
      return // Zone doesn't accept this category
    }

    // Check max items
    const itemsInZone = Object.values(placements).filter(z => z === zoneId).length
    if (zone?.maxItems && itemsInZone >= zone.maxItems) {
      return // Zone is full
    }

    // Remove from previous zone if any
    const newPlacements = { ...placements }

    // Place in new zone
    newPlacements[draggingItem] = zoneId
    setPlacements(newPlacements)

    // Remove from available items
    setAvailableItems(prev => prev.filter(i => i.id !== draggingItem))
    setDraggingItem(null)
  }

  const handleRemoveFromZone = (itemId: string) => {
    const item = config.items.find(i => i.id === itemId)
    if (item) {
      setAvailableItems(prev => [...prev, item])
    }
    const newPlacements = { ...placements }
    delete newPlacements[itemId]
    setPlacements(newPlacements)
  }

  const handleSubmit = () => {
    let correct = 0
    const total = Object.keys(config.correctPlacements).length

    for (const [itemId, zoneId] of Object.entries(config.correctPlacements)) {
      if (placements[itemId] === zoneId) {
        correct++
      }
    }

    const percentage = total > 0 ? correct / total : 0
    const score = Math.round(percentage * maxPoints)
    const passed = percentage >= 0.7

    onComplete(
      score,
      maxPoints,
      passed,
      passed ? config.feedback.correct : config.feedback.incorrect
    )
  }

  const getItemsInZone = (zoneId: string) => {
    return Object.entries(placements)
      .filter(([_, zone]) => zone === zoneId)
      .map(([itemId]) => config.items.find(i => i.id === itemId))
      .filter(Boolean) as DragDropItem[]
  }

  const allItemsPlaced = availableItems.length === 0

  return (
    <div className="space-y-6">
      {/* Available Items */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-gray-500">Drag items to their correct zones:</h4>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {availableItems.length === 0 ? (
            <span className="text-gray-400 text-sm">All items placed!</span>
          ) : (
            availableItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                onTouchStart={() => handleDragStart(item.id)}
                className={cn(
                  'px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border-2 cursor-grab',
                  'border-gray-300 dark:border-gray-600 hover:border-primary',
                  'shadow-sm hover:shadow transition-all',
                  draggingItem === item.id && 'opacity-50 scale-95'
                )}
              >
                {item.image && (
                  <div className="relative w-8 h-8 mb-1 mx-auto"><Image src={item.image} alt={item.label} fill unoptimized sizes="100%" className="object-cover" /></div>
                )}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.zones.map((zone) => {
          const itemsInZone = getItemsInZone(zone.id)
          const isDragOver = draggingItem !== null

          return (
            <div
              key={zone.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(zone.id)}
              onTouchEnd={() => draggingItem && handleDrop(zone.id)}
              className={cn(
                'min-h-[120px] p-4 rounded-lg border-2 border-dashed transition-all',
                isDragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
              )}
            >
              <h4 className="font-medium mb-2">{zone.label}</h4>
              {zone.description && (
                <p className="text-xs text-gray-500 mb-2">{zone.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {itemsInZone.map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center gap-2"
                  >
                    <span className="text-sm">{item.label}</span>
                    <button
                      onClick={() => handleRemoveFromZone(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {itemsInZone.length === 0 && (
                  <span className="text-sm text-gray-400">Drop items here</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!allItemsPlaced}
          className={cn(
            'px-6 py-2 rounded-lg font-medium transition-colors',
            allItemsPlaced
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          Check Answers
        </button>
      </div>
    </div>
  )
}
