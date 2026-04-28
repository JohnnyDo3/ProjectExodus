'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { SwimmingFish, type FishData } from './SwimmingFish'
import { DecorationBackground, DecorationMidground, DecorationForeground } from './AquaticDecorations'
import { CrabGroup, SnailGroup } from './TankCreatures'
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
    fishCustomization?: FishCustomization | null
  }>
  maxVisible?: number
  ownerCustomization?: FishCustomization | null
  ownerId?: string
  contained?: boolean
  theme?: string
  squareCorners?: boolean
}

// Only show a subset of fish at any given time.
const DEFAULT_MAX_VISIBLE = 12
// Random delay between successive fish departures (one fish leaves at a time).
const DEPARTURE_MIN_MS = 20_000
const DEPARTURE_MAX_MS = 90_000
// Hard safety: if a departing fish hasn't exited after this long (e.g. it
// got stuck on a structure), force the swap anyway.
const DEPARTURE_TIMEOUT_MS = 20_000

export function Fishbowl({ users, maxVisible = DEFAULT_MAX_VISIBLE, ownerCustomization, ownerId, contained = false, theme = 'ocean', squareCorners = false }: FishbowlProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredFish, setHoveredFish] = useState<FishData | null>(null)
  const [clickedFish, setClickedFish] = useState<FishData | null>(null)
  const [overlayPos, setOverlayPos] = useState<{ x: number; y: number } | null>(null)
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)
  const [visibleFishIds, setVisibleFishIds] = useState<Set<string>>(new Set())
  const [departingFishIds, setDepartingFishIds] = useState<Set<string>>(new Set())
  const [pendingEntrances, setPendingEntrances] = useState<Map<string, 'left' | 'right'>>(new Map())

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
        customization: u.id === ownerId && ownerCustomization ? ownerCustomization : (u.fishCustomization as FishCustomization | undefined) || undefined,
      })),
    [users, ownerId, ownerCustomization]
  )

  // Initial population — pick a random subset to show on mount.
  useEffect(() => {
    if (allFish.length === 0) return
    const initialCount = Math.min(maxVisible, allFish.length)
    const shuffled = [...allFish].sort(() => Math.random() - 0.5)
    setVisibleFishIds(new Set(shuffled.slice(0, initialCount).map(f => f.id)))
  }, [allFish, maxVisible])

  // Track latest visible IDs in a ref so the scheduler doesn't need to
  // re-subscribe each time the visible set changes.
  const visibleIdsRef = useRef(visibleFishIds)
  visibleIdsRef.current = visibleFishIds
  const departingIdsRef = useRef(departingFishIds)
  departingIdsRef.current = departingFishIds

  // Schedule the next departure on a random 20-90s timer. Only one fish
  // departs at a time. When the picked fish actually exits screen (handled
  // by handleFishDeparted below), it's swapped for one from the hidden pool
  // and the next timer is scheduled.
  const departureTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduleNextDeparture = useCallback(() => {
    if (departureTimerRef.current) clearTimeout(departureTimerRef.current)
    if (allFish.length <= maxVisible) return // No offscreen pool — nothing to rotate
    const delay = DEPARTURE_MIN_MS + Math.random() * (DEPARTURE_MAX_MS - DEPARTURE_MIN_MS)
    departureTimerRef.current = setTimeout(() => {
      const visibleArr = Array.from(visibleIdsRef.current).filter(
        id => !departingIdsRef.current.has(id)
      )
      if (visibleArr.length === 0) {
        scheduleNextDeparture()
        return
      }
      const pick = visibleArr[Math.floor(Math.random() * visibleArr.length)]
      setDepartingFishIds(curr => {
        const next = new Set(curr)
        next.add(pick)
        return next
      })
    }, delay)
  }, [allFish.length, maxVisible])

  // Kick off the rotation once we have enough fish to actually rotate.
  useEffect(() => {
    if (allFish.length <= maxVisible) return
    scheduleNextDeparture()
    return () => {
      if (departureTimerRef.current) clearTimeout(departureTimerRef.current)
    }
  }, [allFish.length, maxVisible, scheduleNextDeparture])

  // When a departing fish actually exits the screen, swap it for a hidden one.
  const handleFishDeparted = useCallback((departedId: string) => {
    const candidates = allFish.filter(f =>
      !visibleIdsRef.current.has(f.id) && f.id !== departedId
    )
    if (candidates.length === 0) {
      // No replacement available — just remove the departed fish.
      setVisibleFishIds(curr => {
        const next = new Set(curr); next.delete(departedId); return next
      })
      setDepartingFishIds(curr => {
        const next = new Set(curr); next.delete(departedId); return next
      })
      scheduleNextDeparture()
      return
    }
    const replacement = candidates[Math.floor(Math.random() * candidates.length)]
    const entrance: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right'

    setVisibleFishIds(curr => {
      const next = new Set(curr)
      next.delete(departedId)
      next.add(replacement.id)
      return next
    })
    setDepartingFishIds(curr => {
      const next = new Set(curr); next.delete(departedId); return next
    })
    setPendingEntrances(curr => {
      const next = new Map(curr)
      next.set(replacement.id, entrance)
      return next
    })
    scheduleNextDeparture()
  }, [allFish, scheduleNextDeparture])

  // Safety: if a departing fish gets stuck and never reports, force the swap.
  useEffect(() => {
    if (departingFishIds.size === 0) return
    const timers: ReturnType<typeof setTimeout>[] = []
    departingFishIds.forEach(id => {
      timers.push(setTimeout(() => {
        if (departingIdsRef.current.has(id)) handleFishDeparted(id)
      }, DEPARTURE_TIMEOUT_MS))
    })
    return () => { timers.forEach(clearTimeout) }
  }, [departingFishIds, handleFishDeparted])

  // Once a replacement fish has been mounted, clear its pending entrance flag
  // so subsequent re-renders don't re-trigger the offscreen-spawn logic.
  useEffect(() => {
    if (pendingEntrances.size === 0) return
    const id = requestAnimationFrame(() => {
      setPendingEntrances(curr => (curr.size === 0 ? curr : new Map()))
    })
    return () => cancelAnimationFrame(id)
  }, [pendingEntrances])

  // Render every fish that's currently in the visible set (departing fish
  // remain in the visible set until they actually exit and are swapped).
  const renderedFish = useMemo(() =>
    allFish.filter(f => visibleFishIds.has(f.id)),
    [allFish, visibleFishIds]
  )

  // Measure container. Only updates on actual size changes — never on scroll —
  // so the fish tree doesn't re-render every time the user moves the page.
  // The overlay's containerRect is refreshed at the moment a fish is hovered/clicked.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setDimensions(prev =>
          prev.width === rect.width && prev.height === rect.height
            ? prev
            : { width: rect.width, height: rect.height }
        )
        setContainerRect(rect)
      }
    }
    measure()

    const observer = new ResizeObserver(() => measure())
    observer.observe(el)

    // Retry once for late-settling layouts (iPad/mobile)
    const retryTimeout = setTimeout(measure, 100)

    return () => {
      observer.disconnect()
      clearTimeout(retryTimeout)
    }
  }, [])

  const refreshContainerRect = useCallback(() => {
    if (containerRef.current) setContainerRect(containerRef.current.getBoundingClientRect())
  }, [])

  const handleFishHover = useCallback((fish: FishData, rect: DOMRect) => {
    if (clickedFish) return // don't show hover when click overlay is open
    refreshContainerRect()
    setHoveredFish(fish)
    setOverlayPos({ x: rect.left + rect.width / 2, y: rect.top })
  }, [clickedFish, refreshContainerRect])

  const handleFishLeave = useCallback(() => {
    if (clickedFish) return
    setHoveredFish(null)
    setOverlayPos(null)
  }, [clickedFish])

  const handleFishClick = useCallback((fish: FishData, rect: DOMRect) => {
    refreshContainerRect()
    setClickedFish(fish)
    setHoveredFish(null)
    setOverlayPos({ x: rect.left + rect.width / 2, y: rect.top })
  }, [refreshContainerRect])

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
      {dimensions.width > 0 && renderedFish.map((fish, i) => (
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
          theme={theme}
          departing={departingFishIds.has(fish.id)}
          entrance={pendingEntrances.get(fish.id)}
          onDeparted={handleFishDeparted}
        />
      ))}

      {/* Baby crabs — scuttle sideways along the bottom */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <CrabGroup containerWidth={dimensions.width} containerHeight={dimensions.height} contained={contained} />
      )}

      {/* Algae buildup on glass (cleaned by snails over 72h) */}
      <AlgaeOverlay width={dimensions.width} height={dimensions.height} />

      {/* Snails — split between glass-cleaners (with slime trails) and
          decor grazers. Personal: 1 glass + 2 decor. Community: 2 glass + 3 decor. */}
      <SnailGroup
        glassCount={contained ? 1 : 2}
        decorCount={contained ? 2 : 3}
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
      />

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
