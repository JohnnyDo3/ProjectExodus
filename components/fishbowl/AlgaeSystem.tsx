'use client'

import { memo, useEffect, useState, useMemo } from 'react'

// ─── Algae Buildup & Cleaning System ────────────────────────────────
//
// Realistic algae cycle based on real aquarium behavior:
//   - Algae film starts appearing ~24-48 hours after last clean
//   - Becomes clearly visible by ~48 hours
//   - Snails clean the glass over 72 hours
//   - Full cycle: ~48h buildup + 72h cleaning = 120h (5 days)
//
// Uses localStorage to persist state across sessions.
// Everything is deterministic from a cycleStart timestamp:
//   elapsed < GROWTH_HOURS  → algae growing (opacity increases)
//   elapsed >= GROWTH_HOURS → cleaning phase (opacity decreases over 72h)
//   elapsed >= CYCLE_HOURS  → new cycle begins

const GROWTH_HOURS = 48        // hours for algae to fully build up
const CLEAN_HOURS = 72         // hours for snails to clean all algae
const CYCLE_HOURS = GROWTH_HOURS + CLEAN_HOURS // 120 hours total cycle
const STORAGE_KEY = 'fishbowl-algae-state'
const PATCH_COUNT = 18         // number of algae patches per cycle

// ─── Seeded random for deterministic patch placement ────────────────

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface AlgaePatchData {
  x: number      // 0-1 relative
  y: number      // 0-1 relative
  size: number   // base radius in px
  hue: number    // slight color variation
  shape: number  // 0-1 controls shape distortion
  delay: number  // 0-1 fraction of growth period before this patch starts appearing
}

// Generate deterministic patch positions from a seed
function generatePatches(seed: number): AlgaePatchData[] {
  const rand = seededRandom(seed)
  const patches: AlgaePatchData[] = []

  for (let i = 0; i < PATCH_COUNT; i++) {
    patches.push({
      x: 0.05 + rand() * 0.90,
      y: 0.08 + rand() * 0.84,
      size: 14 + rand() * 26,       // 14-40px radius
      hue: 80 + rand() * 60,        // green to yellow-green (80-140)
      shape: rand(),
      delay: rand() * 0.6,          // patches appear staggered over first 60% of growth period
    })
  }

  return patches
}

// ─── Algae state persistence ────────────────────────────────────────

interface PersistedAlgaeState {
  cycleStart: number  // timestamp (ms) when current cycle began
  seed: number        // random seed for patch placement
}

function loadAlgaeState(): PersistedAlgaeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedAlgaeState
      // Validate
      if (parsed.cycleStart && parsed.seed) {
        // If the cycle is expired, start a new one
        const elapsed = (Date.now() - parsed.cycleStart) / (1000 * 3600) // hours
        if (elapsed < CYCLE_HOURS) {
          return parsed
        }
        // Start new cycle
      }
    }
  } catch {
    // Fall through to create new state
  }

  const newState: PersistedAlgaeState = {
    cycleStart: Date.now(),
    seed: Math.floor(Math.random() * 2147483646) + 1,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  return newState
}

function startNewCycle(): PersistedAlgaeState {
  const newState: PersistedAlgaeState = {
    cycleStart: Date.now(),
    seed: Math.floor(Math.random() * 2147483646) + 1,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  return newState
}


// ─── Algae Overlay Component ────────────────────────────────────────

export const AlgaeOverlay = memo(({ width, height }: { width: number; height: number }) => {
  const [algaeState, setAlgaeState] = useState<PersistedAlgaeState | null>(null)
  const [elapsedHours, setElapsedHours] = useState(0)

  // Load state on mount
  useEffect(() => {
    setAlgaeState(loadAlgaeState())
  }, [])

  // Update elapsed time every 30 seconds
  useEffect(() => {
    if (!algaeState) return

    const update = () => {
      const elapsed = (Date.now() - algaeState.cycleStart) / (1000 * 3600)
      if (elapsed >= CYCLE_HOURS) {
        // Start new cycle
        const newState = startNewCycle()
        setAlgaeState(newState)
        setElapsedHours(0)
      } else {
        setElapsedHours(elapsed)
      }
    }

    update()
    const interval = setInterval(update, 30000) // update every 30 seconds
    return () => clearInterval(interval)
  }, [algaeState])

  // Generate patches deterministically
  const patches = useMemo(() => {
    if (!algaeState) return []
    return generatePatches(algaeState.seed)
  }, [algaeState])

  if (!algaeState || width === 0 || height === 0) return null

  // Calculate overall algae visibility
  // Growth phase: 0 → 1 over GROWTH_HOURS
  // Cleaning phase: 1 → 0 over CLEAN_HOURS
  const isGrowing = elapsedHours < GROWTH_HOURS
  const overallOpacity = isGrowing
    ? Math.min(1, elapsedHours / GROWTH_HOURS)
    : Math.max(0, 1 - (elapsedHours - GROWTH_HOURS) / CLEAN_HOURS)

  // Don't render if essentially invisible
  if (overallOpacity < 0.01) return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {patches.map((patch, i) => {
        // Each patch has its own appearance delay during growth
        let patchOpacity: number
        if (isGrowing) {
          // Staggered appearance: patches with higher delay appear later
          const patchGrowStart = patch.delay * GROWTH_HOURS
          const patchElapsed = Math.max(0, elapsedHours - patchGrowStart)
          const patchGrowDuration = GROWTH_HOURS - patchGrowStart
          patchOpacity = Math.min(1, patchElapsed / patchGrowDuration)
        } else {
          // During cleaning, patches fade from back to front (top patches clean first)
          // Simulate snails cleaning from bottom up
          const cleanProgress = (elapsedHours - GROWTH_HOURS) / CLEAN_HOURS
          // Patches with higher y (lower in tank) clean last
          const patchCleanDelay = patch.y * 0.4 // bottom patches delayed more
          const adjustedProgress = Math.max(0, (cleanProgress - patchCleanDelay) / (1 - patchCleanDelay))
          patchOpacity = Math.max(0, 1 - adjustedProgress * 1.3) // 1.3 to ensure it reaches 0
        }

        if (patchOpacity < 0.02) return null

        // Patch dimensions
        const px = patch.x * width
        const py = patch.y * height
        const baseSize = patch.size * (0.6 + patchOpacity * 0.4) // grows slightly as it fills in
        const scaleX = 1 + patch.shape * 0.4 // irregular shape
        const scaleY = 1 + (1 - patch.shape) * 0.3

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${px}px`,
              top: `${py}px`,
              width: `${baseSize * 2}px`,
              height: `${baseSize * 2}px`,
              transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY}) rotate(${patch.hue}deg)`,
              background: `radial-gradient(ellipse at 40% 40%,
                hsla(${patch.hue}, 55%, 35%, ${patchOpacity * 0.18}) 0%,
                hsla(${patch.hue + 10}, 45%, 28%, ${patchOpacity * 0.12}) 40%,
                hsla(${patch.hue - 5}, 40%, 22%, ${patchOpacity * 0.06}) 70%,
                transparent 100%)`,
              filter: `blur(${3 + patch.size * 0.08}px)`,
              animation: patchOpacity > 0.3 ? `algaePulse ${6 + i % 4}s ease-in-out infinite` : 'none',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        )
      })}

      {/* Subtle overall film layer during peak growth */}
      {overallOpacity > 0.3 && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              170deg,
              hsla(100, 30%, 30%, ${overallOpacity * 0.04}) 0%,
              hsla(110, 35%, 25%, ${overallOpacity * 0.06}) 30%,
              hsla(95, 25%, 28%, ${overallOpacity * 0.05}) 60%,
              hsla(105, 30%, 22%, ${overallOpacity * 0.03}) 100%
            )`,
          }}
        />
      )}
    </div>
  )
})
AlgaeOverlay.displayName = 'AlgaeOverlay'
