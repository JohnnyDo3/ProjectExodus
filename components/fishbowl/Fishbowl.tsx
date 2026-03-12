'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { SwimmingFish, type FishData } from './SwimmingFish'
import { DecorationBackground, DecorationMidground, DecorationForeground } from './AquaticDecorations'
import { PlecoPair, SnailGroup } from './TankCreatures'
import { AlgaeOverlay } from './AlgaeSystem'
import { FishOverlay } from './FishOverlay'
import { WaterEffects } from './WaterEffects'
import { getTierFromScore, type FishCustomization } from './FishSpecies'

interface FishbowlProps {
  users: Array<{
    id: string
    name: string | null
    stockScore: number
    image: string | null
  }>
  maxVisible?: number
  ownerCustomization?: FishCustomization | null
  ownerId?: string
  contained?: boolean
  theme?: string
  squareCorners?: boolean
}

// Only show a subset of fish at any given time. Fish swim in and out.
const DEFAULT_MAX_VISIBLE = 12

export function Fishbowl({ users, maxVisible = DEFAULT_MAX_VISIBLE, ownerCustomization, ownerId, contained = false, theme = 'ocean', squareCorners = false }: FishbowlProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredFish, setHoveredFish] = useState<FishData | null>(null)
  const [clickedFish, setClickedFish] = useState<FishData | null>(null)
  const [overlayPos, setOverlayPos] = useState<{ x: number; y: number } | null>(null)
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)
  const [visibleFishIds, setVisibleFishIds] = useState<Set<string>>(new Set())

  // Convert users to fish data
  const allFish: FishData[] = useMemo(() =>
    users
      .filter(u => u.name)
      .map(u => ({
        id: u.id,
        userId: u.id,
        name: u.name || 'Anonymous',
        stockScore: u.stockScore,
        image: u.image,
        tier: getTierFromScore(u.stockScore),
        customization: u.id === ownerId ? ownerCustomization : undefined,
      })),
    [users, ownerId, ownerCustomization]
  )

  // Rotate which fish are visible - never fully packed
  useEffect(() => {
    if (allFish.length === 0) return

    // Initial batch
    const initialCount = Math.min(maxVisible, allFish.length)
    const shuffled = [...allFish].sort(() => Math.random() - 0.5)
    setVisibleFishIds(new Set(shuffled.slice(0, initialCount).map(f => f.id)))

    // Periodically swap fish in/out
    const interval = setInterval(() => {
      setVisibleFishIds(prev => {
        const visible = Array.from(prev)
        const hidden = allFish.filter(f => !prev.has(f.id))

        if (hidden.length === 0 || visible.length === 0) return prev

        // Remove 1-2 fish
        const removeCount = Math.min(Math.ceil(Math.random() * 2), visible.length - 3)
        if (removeCount <= 0) return prev

        const next = new Set(prev)
        for (let i = 0; i < removeCount; i++) {
          const removeIdx = Math.floor(Math.random() * visible.length)
          next.delete(visible[removeIdx])
          visible.splice(removeIdx, 1)
        }

        // Add same number from hidden
        const shuffledHidden = [...hidden].sort(() => Math.random() - 0.5)
        for (let i = 0; i < Math.min(removeCount, shuffledHidden.length); i++) {
          next.add(shuffledHidden[i].id)
        }

        // Ensure we don't exceed max
        while (next.size > maxVisible) {
          const arr = Array.from(next)
          next.delete(arr[Math.floor(Math.random() * arr.length)])
        }

        return next
      })
    }, 8000 + Math.random() * 4000) // every 8-12 seconds

    return () => clearInterval(interval)
  }, [allFish, maxVisible])

  const visibleFish = useMemo(() =>
    allFish.filter(f => visibleFishIds.has(f.id)),
    [allFish, visibleFishIds]
  )

  // Measure container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
        setContainerRect(el.getBoundingClientRect())
      }
    })

    observer.observe(el)
    setContainerRect(el.getBoundingClientRect())

    return () => observer.disconnect()
  }, [])

  // Update container rect on scroll
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect())
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const handleFishHover = useCallback((fish: FishData, rect: DOMRect) => {
    if (clickedFish) return // don't show hover when click overlay is open
    setHoveredFish(fish)
    setOverlayPos({ x: rect.left + rect.width / 2, y: rect.top })
  }, [clickedFish])

  const handleFishLeave = useCallback(() => {
    if (clickedFish) return
    setHoveredFish(null)
    setOverlayPos(null)
  }, [clickedFish])

  const handleFishClick = useCallback((fish: FishData, rect: DOMRect) => {
    setClickedFish(fish)
    setHoveredFish(null)
    setOverlayPos({ x: rect.left + rect.width / 2, y: rect.top })
  }, [])

  const handleCloseOverlay = useCallback(() => {
    setClickedFish(null)
    setOverlayPos(null)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${squareCorners ? '' : 'rounded-2xl'}`}
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 20%, #0F2B46 40%, #123855 60%, #154565 80%, #1A5276 100%)',
      }}
    >
      {/* Water caustics/light effects */}
      <WaterEffects width={dimensions.width} height={dimensions.height} />

      {/* Background decorations — tall plants (behind everything) */}
      <DecorationBackground width={dimensions.width} theme={theme} />

      {/* Midground structures — between background sand and foreground glass */}
      <DecorationMidground width={dimensions.width} theme={theme} />

      {/* Swimming fish (z-index 10-20, swim between decoration layers) */}
      {dimensions.width > 0 && visibleFish.map((fish, i) => (
        <SwimmingFish
          key={fish.id}
          fish={fish}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
          onHover={handleFishHover}
          onLeave={handleFishLeave}
          onClick={handleFishClick}
          index={i}
          contained={contained}
        />
      ))}

      {/* Clown pleco pair (bottom feeders, mates for life) */}
      {dimensions.width > 0 && <PlecoPair containerWidth={dimensions.width} />}

      {/* Algae buildup on glass (cleaned by snails over 72h) */}
      <AlgaeOverlay width={dimensions.width} height={dimensions.height} />

      {/* Glass-cleaning snails: 3 for personal, 6 for community */}
      <SnailGroup count={contained ? 3 : 6} containerWidth={dimensions.width} containerHeight={dimensions.height} />

      {/* Foreground decorations — small rocks, corals, short plants (in front of fish) */}
      <DecorationForeground width={dimensions.width} theme={theme} />

      {/* Hover overlay */}
      {hoveredFish && !clickedFish && (
        <FishOverlay
          fish={hoveredFish}
          position={overlayPos}
          mode="hover"
          onClose={handleCloseOverlay}
          containerRect={containerRect}
        />
      )}

      {/* Click overlay */}
      {clickedFish && (
        <FishOverlay
          fish={clickedFish}
          position={overlayPos}
          mode="click"
          onClose={handleCloseOverlay}
          containerRect={containerRect}
        />
      )}


    </div>
  )
}
