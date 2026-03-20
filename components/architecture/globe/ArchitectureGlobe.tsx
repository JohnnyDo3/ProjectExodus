'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  getArcsForYear,
  getPointsForYear,
} from '@/data/architecture/globeConnections'
import { useGlobeIntroMaterial } from './useShardBuildMaterial'
import { useThemeGlobeMaterial } from './useThemeGlobeMaterial'

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false })

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type IntroPhase = 'building' | 'revealing' | 'pausing' | 'sweeping' | 'idle'

interface ArchitectureGlobeProps {
  currentYear: number
  isDayTheme: boolean
  introPhase: IntroPhase
  onBuildComplete: () => void
  onRevealComplete: () => void
}

interface GeoJSONFeature {
  type: string
  properties: Record<string, unknown>
  geometry: {
    type: string
    coordinates: unknown
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Camera starts facing the Levant (seed for back-to-front build)
const SEED_LAT = 31.8
const SEED_LNG = 35.2

// Earth reveal radiates from Mesopotamia (~first architectural record, 3500 BCE)
const MESOPOTAMIA_LAT = 33.3
const MESOPOTAMIA_LNG = 44.4

// Rotation speeds in radians/second
const BASE_SPEED = (2 * Math.PI) / 50    // one revolution per 50s
const IDLE_SPEED = (2 * Math.PI) / 20    // one revolution per 20s — engaging

// Target speeds per phase — actual speed lerps toward these for smooth ramp
const PHASE_SPEED: Record<IntroPhase, number> = {
  building:  0,                    // shader needs a stable globe
  revealing: 0,                    // shader needs a stable globe
  pausing:   (2 * Math.PI) / 40,  // rotation begins — earth is alive
  sweeping:  BASE_SPEED,           // base — accelerated by year
  idle:      IDLE_SPEED,           // fast enough to notice
}

// Camera altitude per phase — lerps for smooth dolly
const PHASE_ALTITUDE: Record<IntroPhase, number> = {
  building:  3.0,   // start close — dramatic
  revealing: 2.6,   // pull back during reveal
  pausing:   2.3,   // continue easing out
  sweeping:  2.2,   // standard viewing distance
  idle:      2.2,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArchitectureGlobe({
  currentYear,
  isDayTheme,
  introPhase,
  onBuildComplete,
  onRevealComplete,
}: ArchitectureGlobeProps) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState<GeoJSONFeature[]>([])

  // Refs for the animation loop (avoids re-creating the loop on prop changes)
  const introPhaseRef = useRef<IntroPhase>(introPhase)
  const currentYearRef = useRef(currentYear)
  const isUserDraggingRef = useRef(false)
  const globeInitializedRef = useRef(false)
  const globeMeshRef = useRef<any>(null) // cached reference to the actual globe mesh
  const dragStartHandlerRef = useRef<(() => void) | null>(null)
  const dragEndHandlerRef = useRef<(() => void) | null>(null)
  const controlsRef = useRef<any>(null)

  introPhaseRef.current = introPhase
  currentYearRef.current = currentYear

  // -------------------------------------------------------------------------
  // Materials
  // -------------------------------------------------------------------------

  const { material: introMaterial } = useGlobeIntroMaterial(
    SEED_LAT,
    SEED_LNG,
    MESOPOTAMIA_LAT,
    MESOPOTAMIA_LNG,
    isDayTheme,
    onBuildComplete,
    onRevealComplete
  )

  const themeMaterial = useThemeGlobeMaterial(isDayTheme)

  // After reveal, switch to lightweight theme material
  const introOver = introPhase === 'pausing' || introPhase === 'sweeping' || introPhase === 'idle'
  const globeMaterial = introOver ? (themeMaterial || introMaterial) : introMaterial

  // -------------------------------------------------------------------------
  // Container resize
  // -------------------------------------------------------------------------

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    observer.observe(container)

    const rect = container.getBoundingClientRect()
    setDimensions({ width: rect.width, height: rect.height })

    return () => observer.disconnect()
  }, [])

  // -------------------------------------------------------------------------
  // Load country borders GeoJSON
  // -------------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false

    fetch('/globe/countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data && data.features) {
          setCountries(data.features)
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [])

  // -------------------------------------------------------------------------
  // Rotation loop — runs from mount, waits for globe ref, then rotates
  // Handles: init, phase-aware speed, user drag pause
  // -------------------------------------------------------------------------

  useEffect(() => {
    let raf: number
    let lastTime = performance.now()
    let currentSpeed = 0        // smoothly lerped rotation speed
    let currentAltitude = PHASE_ALTITUDE.building

    const tick = () => {
      const globe = globeRef.current
      const now = performance.now()

      if (globe) {
        // ── First-time init (runs once when globe ref becomes available) ──
        if (!globeInitializedRef.current) {
          globe.pointOfView({ lat: SEED_LAT, lng: SEED_LNG, altitude: PHASE_ALTITUDE.building })

          const controls = globe.controls()
          if (controls) {
            controls.autoRotate = false // we handle rotation manually
            controls.enableDamping = true
            controls.dampingFactor = 0.1

            // Store references for cleanup
            controlsRef.current = controls
            dragStartHandlerRef.current = () => {
              isUserDraggingRef.current = true
            }
            dragEndHandlerRef.current = () => {
              isUserDraggingRef.current = false
              lastTime = performance.now() // reset dt to avoid jump
            }

            controls.addEventListener('start', dragStartHandlerRef.current)
            controls.addEventListener('end', dragEndHandlerRef.current)
          }

          // Cache the globe mesh — find the ThreeGlobe Group (not camera/lights)
          const scene = globe.scene()
          if (scene) {
            const mesh = scene.children.find(
              (c: any) => c.type === 'Group' && c.children && c.children.length > 0
            )
            globeMeshRef.current = mesh || null
          }

          globeInitializedRef.current = true
          lastTime = now // avoid a big initial dt
        }

        const dt = Math.min((now - lastTime) / 1000, 0.1) // cap to avoid big jumps
        const phase = introPhaseRef.current

        // ── Smooth camera dolly ──
        const targetAltitude = PHASE_ALTITUDE[phase] ?? 2.2
        const altitudeLerp = 1 - Math.pow(0.03, dt) // ~3% per frame at 60fps — very smooth
        currentAltitude += (targetAltitude - currentAltitude) * altitudeLerp

        if (Math.abs(currentAltitude - targetAltitude) > 0.005) {
          const pov = globe.pointOfView()
          globe.pointOfView({ ...pov, altitude: currentAltitude })
        }

        // ── Smooth rotation ramp ──
        if (!isUserDraggingRef.current && globeMeshRef.current) {
          // Target speed for this phase
          let targetSpeed = PHASE_SPEED[phase] ?? BASE_SPEED

          // During sweep: accelerate from base → idle speed
          if (phase === 'sweeping') {
            const progress = Math.max(0, (currentYearRef.current + 3500) / 5525)
            targetSpeed = BASE_SPEED + (IDLE_SPEED - BASE_SPEED) * progress
          }

          // Lerp speed — slower ramp-up (2% per frame) for cinematic feel
          const speedLerp = 1 - Math.pow(0.02, dt)
          currentSpeed += (targetSpeed - currentSpeed) * speedLerp

          globeMeshRef.current.rotation.y += currentSpeed * dt
        }
      }

      lastTime = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)

      // Clean up control event listeners
      if (controlsRef.current) {
        if (dragStartHandlerRef.current) {
          controlsRef.current.removeEventListener('start', dragStartHandlerRef.current)
        }
        if (dragEndHandlerRef.current) {
          controlsRef.current.removeEventListener('end', dragEndHandlerRef.current)
        }
      }
    }
  }, [])

  // -------------------------------------------------------------------------
  // Derived data — arcs and points (only after intro reveal)
  // -------------------------------------------------------------------------

  const showArcs = introPhase === 'pausing' || introPhase === 'sweeping' || introPhase === 'idle'

  const arcsData = useMemo(() => {
    if (!showArcs) return []
    return getArcsForYear(currentYear)
  }, [currentYear, showArcs])

  const pointsData = useMemo(() => {
    if (!showArcs) return []
    return getPointsForYear(currentYear)
  }, [currentYear, showArcs])

  // Golden polygon borders — smooth fade from subtle to prominent
  const borderOpacity = useMemo(() => {
    switch (introPhase) {
      case 'building':  return 0.08
      case 'revealing': return 0.15
      case 'pausing':   return 0.35
      case 'sweeping':  return 0.5
      case 'idle':      return 0.6
      default:          return 0.15
    }
  }, [introPhase])
  const polygonBorderColor = `rgba(212, 165, 74, ${borderOpacity})`

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <GlobeGL
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          {...(globeMaterial
            ? { globeMaterial, globeImageUrl: '' }
            : { globeImageUrl: isDayTheme
                ? '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                : '//unpkg.com/three-globe/example/img/earth-night.jpg'
            }
          )}
          backgroundImageUrl={null as any}
          showAtmosphere={true}
          atmosphereColor="#D4A54A"
          atmosphereAltitude={0.15}
          // Arcs
          arcsData={arcsData}
          arcStartLat={(d: any) => d.fromLat}
          arcStartLng={(d: any) => d.fromLng}
          arcEndLat={(d: any) => d.toLat}
          arcEndLng={(d: any) => d.toLng}
          arcColor={(d: any) => d.eraColor}
          arcAltitude={(d: any) => d.eraAltitude}
          arcStroke={0.5}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcsTransitionDuration={1000}
          // Points
          pointsData={pointsData}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={() => '#D4A54A'}
          pointAltitude={0.01}
          pointRadius={(d: any) => Math.max(0.3, Math.min(1.0, d.connectionCount * 0.08))}
          pointLabel={(d: any) => d.name}
          // Country borders — golden remnant of the gold dissolution
          polygonsData={countries}
          polygonCapColor={() => 'rgba(0,0,0,0)'}
          polygonSideColor={() => 'rgba(0,0,0,0)'}
          polygonStrokeColor={() => polygonBorderColor}
          polygonAltitude={0.001}
        />
      )}
    </div>
  )
}
