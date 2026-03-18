'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  getArcsForYear,
  getPointsForYear,
  REGION_CENTROIDS,
  type GlobeArc,
  type GlobePoint,
} from '@/data/architecture/globeConnections'
import { useTerminatorMaterial } from './useTerminatorMaterial'
import { usePrehistoryMaterial } from './usePrehistoryMaterial'

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false })

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ArchitectureGlobeProps {
  currentYear: number
  onRegionClick?: (region: string) => void
  onArcHover?: (arc: GlobeArc | null) => void
  zoomedRegion: string | null
  isPlaying: boolean
}

interface RingDatum {
  lat: number
  lng: number
  maxR: number
  propagationSpeed: number
  repeatPeriod: number
}

// ---------------------------------------------------------------------------
// GeoJSON type for country polygons
// ---------------------------------------------------------------------------

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

const PREHISTORY_END = -3500

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArchitectureGlobe({
  currentYear,
  onRegionClick,
  onArcHover,
  zoomedRegion,
  isPlaying,
}: ArchitectureGlobeProps) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevPointsRef = useRef<Set<string>>(new Set())
  const ringsTimeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const globeReadyRef = useRef(false)

  // Region queue camera state
  const regionQueueRef = useRef<string[]>([])
  const regionQueueIndexRef = useRef(0)
  const regionCameraTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastRegionSetRef = useRef<string>('')
  const isPanningRef = useRef(false)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState<GeoJSONFeature[]>([])
  const [ringsData, setRingsData] = useState<RingDatum[]>([])

  // Prehistory vs post-prehistory material
  const isPrehistory = currentYear < PREHISTORY_END
  const prehistoryProgress = isPrehistory
    ? Math.max(0, Math.min(1, (currentYear - (-12000)) / (PREHISTORY_END - (-12000))))
    : 1

  const terminatorMaterial = useTerminatorMaterial()
  const prehistoryMaterial = usePrehistoryMaterial(prehistoryProgress)

  // Pick the right material
  const globeMaterial = isPrehistory ? prehistoryMaterial : terminatorMaterial

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

    return () => {
      observer.disconnect()
    }
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

    return () => {
      cancelled = true
    }
  }, [])

  // -------------------------------------------------------------------------
  // Globe initialisation – auto-rotate & starting view
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    // Starting point of view: Levant (first architectural region)
    globe.pointOfView({ lat: 31.8, lng: 35.2, altitude: 2.2 })

    const controls = globe.controls()
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.4
      controls.enableDamping = true
      controls.dampingFactor = 0.1
    }

    globeReadyRef.current = true
  }, [])

  // -------------------------------------------------------------------------
  // Keep auto-rotate enabled while playing (re-enable after POV animations)
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      const globe = globeRef.current
      if (!globe) return
      const controls = globe.controls()
      if (controls && !controls.autoRotate) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.4
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // -------------------------------------------------------------------------
  // Derived data
  // -------------------------------------------------------------------------

  const arcsData = useMemo(() => {
    // No arcs during prehistory
    if (isPrehistory) return []
    return getArcsForYear(currentYear)
  }, [currentYear, isPrehistory])

  const pointsData = useMemo(() => getPointsForYear(currentYear), [currentYear])

  // -------------------------------------------------------------------------
  // Rings – shockwave effect when new regions appear
  // -------------------------------------------------------------------------

  useEffect(() => {
    const currentRegions = new Set(pointsData.map((p) => p.region))
    const prevRegions = prevPointsRef.current
    const newRegions: GlobePoint[] = []

    for (const point of pointsData) {
      if (!prevRegions.has(point.region)) {
        newRegions.push(point)
      }
    }

    if (newRegions.length > 0) {
      const newRings: RingDatum[] = newRegions.map((p) => ({
        lat: p.lat,
        lng: p.lng,
        maxR: 3,
        propagationSpeed: 2,
        repeatPeriod: 800,
      }))

      setRingsData((prev) => [...prev, ...newRings])

      const timeout = setTimeout(() => {
        setRingsData((prev) =>
          prev.filter((r) => !newRings.some((nr) => nr.lat === r.lat && nr.lng === r.lng))
        )
      }, 2000)

      ringsTimeoutRef.current.push(timeout)
    }

    prevPointsRef.current = currentRegions
  }, [pointsData])

  // Cleanup ring timeouts on unmount
  useEffect(() => {
    const timeouts = ringsTimeoutRef.current
    return () => {
      for (const t of timeouts) clearTimeout(t)
    }
  }, [])

  // -------------------------------------------------------------------------
  // REGION PRIORITY QUEUE CAMERA
  //
  // Sorts active regions west → east by longitude.
  // Cycles through them, spending equal time on each.
  // New regions interrupt the queue briefly.
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe || !isPlaying || !globeReadyRef.current || zoomedRegion) return

    // Build sorted region list (west → east by longitude)
    const sorted = [...pointsData].sort((a, b) => a.lng - b.lng)
    const regionIds = sorted.map((p) => p.region)
    const regionKey = regionIds.join(',')

    // Detect new regions appearing
    const prevIds = new Set(regionQueueRef.current)
    const newRegions = sorted.filter((p) => !prevIds.has(p.region))

    // Update the queue
    regionQueueRef.current = regionIds

    // If a new region appeared, interrupt and fly to it
    if (newRegions.length > 0 && regionKey !== lastRegionSetRef.current) {
      lastRegionSetRef.current = regionKey
      const newest = newRegions[newRegions.length - 1]
      const idx = regionIds.indexOf(newest.region)
      regionQueueIndexRef.current = idx >= 0 ? idx : 0

      const centroid = REGION_CENTROIDS[newest.region]
      if (centroid) {
        // Altitude adapts to number of active regions
        const altitude = regionIds.length <= 4 ? 1.8 : regionIds.length <= 8 ? 2.2 : 2.5
        globe.pointOfView(
          { lat: centroid.lat, lng: centroid.lng, altitude },
          3000
        )
      }
      return
    }

    lastRegionSetRef.current = regionKey

    // If no regions, nothing to track
    if (regionIds.length === 0) return

    // Dwell time per region: more regions → shorter dwell, but minimum 4s
    const dwellTime = Math.max(4000, Math.round(8000 / regionIds.length))

    // Set up the cycling timer
    if (regionCameraTimerRef.current) {
      clearTimeout(regionCameraTimerRef.current)
    }

    const advanceCamera = () => {
      const queue = regionQueueRef.current
      if (queue.length === 0 || !globeRef.current) return

      regionQueueIndexRef.current = (regionQueueIndexRef.current + 1) % queue.length
      const regionId = queue[regionQueueIndexRef.current]
      const centroid = REGION_CENTROIDS[regionId]

      if (centroid) {
        const altitude = queue.length <= 4 ? 1.8 : queue.length <= 8 ? 2.2 : 2.5
        globeRef.current.pointOfView(
          { lat: centroid.lat, lng: centroid.lng, altitude },
          3000 // 3 second pan
        )
      }

      regionCameraTimerRef.current = setTimeout(advanceCamera, dwellTime)
    }

    regionCameraTimerRef.current = setTimeout(advanceCamera, dwellTime)

    return () => {
      if (regionCameraTimerRef.current) {
        clearTimeout(regionCameraTimerRef.current)
        regionCameraTimerRef.current = null
      }
    }
  }, [pointsData, isPlaying, zoomedRegion])

  // -------------------------------------------------------------------------
  // Zoom on region click / zoom out
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    if (zoomedRegion) {
      // Stop the queue camera
      if (regionCameraTimerRef.current) {
        clearTimeout(regionCameraTimerRef.current)
        regionCameraTimerRef.current = null
      }

      const centroid = REGION_CENTROIDS[zoomedRegion]
      if (centroid) {
        globe.pointOfView(
          { lat: centroid.lat, lng: centroid.lng, altitude: 0.8 },
          1500
        )
      }
    } else {
      // Fly back to overview — let the queue camera take over
      const queue = regionQueueRef.current
      if (queue.length > 0) {
        const idx = regionQueueIndexRef.current % queue.length
        const regionId = queue[idx]
        const centroid = REGION_CENTROIDS[regionId]
        if (centroid) {
          globe.pointOfView(
            { lat: centroid.lat, lng: centroid.lng, altitude: 2.2 },
            1500
          )
        }
      }
    }
  }, [zoomedRegion])

  // -------------------------------------------------------------------------
  // Callbacks
  // -------------------------------------------------------------------------

  const handleArcHover = useCallback(
    (arc: any) => {
      onArcHover?.(arc as GlobeArc | null)
    },
    [onArcHover]
  )

  const handlePointClick = useCallback(
    (point: any) => {
      onRegionClick?.(point.region)
    },
    [onRegionClick]
  )

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  // Country border opacity: fade in during prehistory
  const borderOpacity = isPrehistory
    ? Math.max(0.05, prehistoryProgress * 0.4)
    : 0.4

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        // Use appropriate material based on era
        {...(globeMaterial
          ? { globeMaterial, globeImageUrl: '' }
          : { globeImageUrl: '//unpkg.com/three-globe/example/img/earth-night.jpg' }
        )}
        backgroundImageUrl={null as any}
        showAtmosphere={true}
        atmosphereColor={isPrehistory ? '#D4A54A' : '#D4A54A'}
        atmosphereAltitude={isPrehistory ? 0.08 + prehistoryProgress * 0.07 : 0.15}
        // Arcs layer (empty during prehistory)
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
        onArcHover={handleArcHover}
        // Points layer
        pointsData={pointsData}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#D4A54A'}
        pointAltitude={0.01}
        pointRadius={(d: any) => Math.max(0.3, Math.min(1.0, d.connectionCount * 0.08))}
        pointLabel={(d: any) => d.name}
        onPointClick={handlePointClick}
        // Rings layer (shockwaves)
        ringsData={ringsData}
        ringLat={(d: any) => d.lat}
        ringLng={(d: any) => d.lng}
        ringMaxRadius={(d: any) => d.maxR}
        ringPropagationSpeed={(d: any) => d.propagationSpeed}
        ringRepeatPeriod={(d: any) => d.repeatPeriod}
        ringColor={() => '#D4A54A'}
        // Polygons layer (country borders — fade in during prehistory)
        polygonsData={countries}
        polygonCapColor={() => 'rgba(0,0,0,0)'}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={() => `rgba(212, 165, 74, ${borderOpacity})`}
        polygonAltitude={0.001}
      />
      )}
    </div>
  )
}
