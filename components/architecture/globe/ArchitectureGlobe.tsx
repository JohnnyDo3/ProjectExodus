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
// Helpers
// ---------------------------------------------------------------------------

/** Compute the midpoint between two lat/lng pairs (simple average, good enough for globe view) */
function midpoint(lat1: number, lng1: number, lat2: number, lng2: number) {
  return { lat: (lat1 + lat2) / 2, lng: (lng1 + lng2) / 2 }
}

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
  const lastFollowedArcRef = useRef<string | null>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState<GeoJSONFeature[]>([])
  const [ringsData, setRingsData] = useState<RingDatum[]>([])

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

    // Capture initial size
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
      .catch(() => {
        // Silently handle missing geojson
      })

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
  // Keep auto-rotate enabled (re-enable after any pointOfView animation)
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

  const arcsData = useMemo(() => getArcsForYear(currentYear), [currentYear])
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

      // Remove rings after 2 seconds
      const timeout = setTimeout(() => {
        setRingsData((prev) =>
          prev.filter((r) => !newRings.some((nr) => nr.lat === r.lat && nr.lng === r.lng))
        )
      }, 2000)

      ringsTimeoutRef.current.push(timeout)
    }

    prevPointsRef.current = currentRegions

    return () => {
      // Cleanup is handled at unmount level
    }
  }, [pointsData])

  // Cleanup ring timeouts on unmount
  useEffect(() => {
    const timeouts = ringsTimeoutRef.current
    return () => {
      for (const t of timeouts) {
        clearTimeout(t)
      }
    }
  }, [])

  // -------------------------------------------------------------------------
  // Follow the action – ALWAYS pan to show newest arc midpoint while playing
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe || !isPlaying || !globeReadyRef.current) return

    // If we have arcs, follow the newest one
    if (arcsData.length > 0) {
      const newestArc = arcsData[arcsData.length - 1]

      // Only animate if this is a different arc than last time
      if (lastFollowedArcRef.current === newestArc.id) return
      lastFollowedArcRef.current = newestArc.id

      // Compute midpoint between source and target so both are visible
      const mid = midpoint(
        newestArc.fromLat,
        newestArc.fromLng,
        newestArc.toLat,
        newestArc.toLng
      )

      globe.pointOfView(
        { lat: mid.lat, lng: mid.lng, altitude: 2.2 },
        2500 // slower, smoother pan
      )
    } else {
      // No arcs yet (prehistoric beginning) — start at Levant and slowly pan
      // Only set once at the beginning
      if (lastFollowedArcRef.current === null) {
        lastFollowedArcRef.current = '__no_arcs__'
        globe.pointOfView(
          { lat: 31.8, lng: 35.2, altitude: 2.2 },
          2000
        )
      }
    }
  }, [arcsData, isPlaying])

  // -------------------------------------------------------------------------
  // Zoom on region click / zoom out
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    if (zoomedRegion) {
      const centroid = REGION_CENTROIDS[zoomedRegion]
      if (centroid) {
        globe.pointOfView(
          { lat: centroid.lat, lng: centroid.lng, altitude: 0.8 },
          1500
        )
      }
    } else {
      // Fly back to overview
      const newestArc = arcsData.length > 0 ? arcsData[arcsData.length - 1] : null
      const fallback = newestArc
        ? midpoint(newestArc.fromLat, newestArc.fromLng, newestArc.toLat, newestArc.toLng)
        : { lat: 31.8, lng: 35.2 }

      if (fallback) {
        globe.pointOfView(
          { lat: fallback.lat, lng: fallback.lng, altitude: 2.2 },
          1500
        )
      }
    }
  }, [zoomedRegion, arcsData])

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

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl={null as any}
        showAtmosphere={true}
        atmosphereColor="#D4A54A"
        atmosphereAltitude={0.15}
        // Arcs layer
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
        // Polygons layer (country borders)
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
