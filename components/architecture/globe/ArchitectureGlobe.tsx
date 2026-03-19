'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  getArcsForYear,
  getPointsForYear,
  REGION_CENTROIDS,
  type GlobeArc,
} from '@/data/architecture/globeConnections'
import { useShardBuildMaterial } from './useShardBuildMaterial'
import { useThemeGlobeMaterial } from './useThemeGlobeMaterial'

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false })

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ArchitectureGlobeProps {
  currentYear: number
  isDayTheme: boolean
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

// Rotation speed: full revolution every ~30 seconds (was real-time 86400s)
const GLOBE_ROTATION_SPEED = (2 * Math.PI) / 30 // radians per second

// First connection seed point (Levant)
const SEED_LAT = 31.8
const SEED_LNG = 35.2

// Snap-back duration after user interaction (ms)
const SNAP_BACK_DURATION = 1500

// Duration to smoothly rotate toward new arc centroids (ms)
const ARC_FOLLOW_DURATION = 2000

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArchitectureGlobe({
  currentYear,
  isDayTheme,
}: ArchitectureGlobeProps) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState<GeoJSONFeature[]>([])
  const [buildComplete, setBuildComplete] = useState(false)

  // User interaction tracking for snap-back
  const isUserDraggingRef = useRef(false)
  const snapBackAnimRef = useRef<number>(0)
  const userRotationOffsetRef = useRef(0) // offset in radians from real-time position
  const lastRealRotationRef = useRef(0)
  const rotationBaseTimeRef = useRef(Date.now())

  // Arc-following: smoothly pan to newest arc region
  const arcFollowTargetRef = useRef<{ lat: number; lng: number } | null>(null)
  const arcFollowStartRef = useRef(0)
  const prevArcCountRef = useRef(0)

  // -------------------------------------------------------------------------
  // Materials
  // -------------------------------------------------------------------------

  const handleBuildComplete = useCallback(() => {
    setBuildComplete(true)
  }, [])

  const { material: shardMaterial } = useShardBuildMaterial(
    SEED_LAT,
    SEED_LNG,
    isDayTheme,
    handleBuildComplete
  )

  const themeMaterial = useThemeGlobeMaterial(isDayTheme)

  // Use shard material during build, theme material after
  const globeMaterial = buildComplete ? themeMaterial : shardMaterial

  // -------------------------------------------------------------------------
  // Container resize tracking
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
  // Globe init — starting view facing seed region
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    // Face the first connection region
    globe.pointOfView({ lat: SEED_LAT, lng: SEED_LNG, altitude: 2.2 })

    // Disable auto-rotate (we handle rotation ourselves)
    const controls = globe.controls()
    if (controls) {
      controls.autoRotate = false
      controls.enableDamping = true
      controls.dampingFactor = 0.1
    }

    rotationBaseTimeRef.current = Date.now()
  }, [])

  // -------------------------------------------------------------------------
  // Real-time Earth rotation + user snap-back
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!buildComplete) return

    const globe = globeRef.current
    if (!globe) return

    const controls = globe.controls()
    if (!controls) return

    // Track when user starts/stops dragging
    const onStart = () => {
      isUserDraggingRef.current = true
      // Cancel any running snap-back
      if (snapBackAnimRef.current) {
        cancelAnimationFrame(snapBackAnimRef.current)
        snapBackAnimRef.current = 0
      }
    }

    const onEnd = () => {
      if (!isUserDraggingRef.current) return
      isUserDraggingRef.current = false

      // Calculate how far off the user is from real-time rotation
      const scene = globe.scene()
      if (!scene) return

      const globeMesh = scene.children.find((c: any) => c.type === 'Group' || c.__globeObjType)
        || scene.children[0]
      if (!globeMesh) return

      const currentY = globeMesh.rotation.y
      const elapsed = (Date.now() - rotationBaseTimeRef.current) / 1000
      const realY = elapsed * GLOBE_ROTATION_SPEED

      userRotationOffsetRef.current = currentY - realY
      lastRealRotationRef.current = realY

      // Animate snap-back
      const startOffset = userRotationOffsetRef.current
      const startTime = performance.now()

      const animateSnapBack = (now: number) => {
        const t = Math.min((now - startTime) / SNAP_BACK_DURATION, 1)
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic

        userRotationOffsetRef.current = startOffset * (1 - eased)

        if (t < 1) {
          snapBackAnimRef.current = requestAnimationFrame(animateSnapBack)
        } else {
          userRotationOffsetRef.current = 0
          snapBackAnimRef.current = 0
        }
      }

      snapBackAnimRef.current = requestAnimationFrame(animateSnapBack)
    }

    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)

    // Rotation loop — faster speed + arc-following pan
    let raf: number
    const rotate = () => {
      if (!isUserDraggingRef.current && globeRef.current) {
        const scene = globeRef.current.scene()
        if (scene) {
          const globeMesh = scene.children.find((c: any) => c.type === 'Group' || c.__globeObjType)
            || scene.children[0]
          if (globeMesh) {
            const elapsed = (Date.now() - rotationBaseTimeRef.current) / 1000
            const realY = elapsed * GLOBE_ROTATION_SPEED
            globeMesh.rotation.y = realY + userRotationOffsetRef.current
          }
        }

        // Arc-following: smoothly pan to target region
        const target = arcFollowTargetRef.current
        if (target && arcFollowStartRef.current > 0) {
          const t = Math.min((Date.now() - arcFollowStartRef.current) / ARC_FOLLOW_DURATION, 1)
          if (t < 1) {
            const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
            const pov = globeRef.current.pointOfView()
            if (pov) {
              // Interpolate lat/lng toward target
              const newLat = pov.lat + (target.lat - pov.lat) * eased * 0.05
              const newLng = pov.lng + (target.lng - pov.lng) * eased * 0.05
              globeRef.current.pointOfView({ lat: newLat, lng: newLng }, 0)
            }
          } else {
            // Done following, clear target
            arcFollowTargetRef.current = null
            arcFollowStartRef.current = 0
          }
        }
      }
      raf = requestAnimationFrame(rotate)
    }
    raf = requestAnimationFrame(rotate)

    return () => {
      cancelAnimationFrame(raf)
      if (snapBackAnimRef.current) cancelAnimationFrame(snapBackAnimRef.current)
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('end', onEnd)
    }
  }, [buildComplete])

  // -------------------------------------------------------------------------
  // Derived data — arcs and points from timeline
  // -------------------------------------------------------------------------

  const arcsData = useMemo(() => {
    if (!buildComplete) return []
    return getArcsForYear(currentYear)
  }, [currentYear, buildComplete])

  const pointsData = useMemo(() => {
    if (!buildComplete) return []
    return getPointsForYear(currentYear)
  }, [currentYear, buildComplete])

  // -------------------------------------------------------------------------
  // Arc-following: rotate to face newest arcs when timeline changes
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!buildComplete || !globeRef.current) return
    if (arcsData.length === 0) return

    // Only follow when new arcs appear
    if (arcsData.length > prevArcCountRef.current && prevArcCountRef.current > 0) {
      // Find the newest arcs (ones not in previous set)
      const newArcs = arcsData.slice(prevArcCountRef.current)
      if (newArcs.length > 0) {
        // Calculate centroid of new arc endpoints
        let totalLat = 0, totalLng = 0, count = 0
        for (const arc of newArcs) {
          totalLat += arc.toLat
          totalLng += arc.toLng
          count++
        }
        const targetLat = totalLat / count
        const targetLng = totalLng / count

        // Set follow target — rotation loop will smoothly pan
        arcFollowTargetRef.current = { lat: targetLat, lng: targetLng }
        arcFollowStartRef.current = Date.now()

        // Also do a smooth pointOfView transition
        globeRef.current.pointOfView(
          { lat: targetLat, lng: targetLng, altitude: 2.2 },
          ARC_FOLLOW_DURATION
        )
      }
    }

    prevArcCountRef.current = arcsData.length
  }, [arcsData, buildComplete])

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
          // Arcs layer (only after build)
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
          // Points layer
          pointsData={pointsData}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={() => '#D4A54A'}
          pointAltitude={0.01}
          pointRadius={(d: any) => Math.max(0.3, Math.min(1.0, d.connectionCount * 0.08))}
          pointLabel={(d: any) => d.name}
          // Country borders
          polygonsData={countries}
          polygonCapColor={() => 'rgba(0,0,0,0)'}
          polygonSideColor={() => 'rgba(0,0,0,0)'}
          polygonStrokeColor={() => 'rgba(212, 165, 74, 0.4)'}
          polygonAltitude={0.001}
        />
      )}
    </div>
  )
}
