'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  getArcsForYear,
  getPointsForYear,
  getDensityCenterForYear,
} from '@/data/architecture/globeConnections'
import { useThemeGlobeMaterial } from './useThemeGlobeMaterial'

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false })

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ArchitectureGlobeProps {
  currentYear: number
  isDayTheme: boolean
  onReady?: () => void
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

// Camera altitude — standard viewing distance
const IDLE_ALTITUDE = 2.4

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArchitectureGlobe({
  currentYear,
  isDayTheme,
  onReady,
}: ArchitectureGlobeProps) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState<GeoJSONFeature[]>([])

  const globeInitializedRef = useRef(false)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  // -------------------------------------------------------------------------
  // Material — always use theme material (day/night texture)
  // -------------------------------------------------------------------------

  const globeMaterial = useThemeGlobeMaterial(isDayTheme)

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
  // Init — center on densest arc cluster, no auto-rotation (manual only)
  // -------------------------------------------------------------------------

  useEffect(() => {
    let raf: number

    const tryInit = () => {
      const globe = globeRef.current
      if (!globe || globeInitializedRef.current) return

      // Center camera on the region with the most connections
      const center = getDensityCenterForYear(currentYear)
      const lat = center?.lat ?? 33.3
      const lng = center?.lng ?? 44.4
      globe.pointOfView({ lat, lng, altitude: IDLE_ALTITUDE })

      const controls = globe.controls()
      if (controls) {
        controls.autoRotate = false
        controls.enableDamping = true
        controls.dampingFactor = 0.1
        controls.enableRotate = true
        controls.enableZoom = true
        controls.enablePan = false
        // Touch: one finger rotates, two fingers zoom
        controls.touches = { ONE: 0, TWO: 1 } // ROTATE=0, DOLLY=1
        controls.rotateSpeed = 0.8
        controls.zoomSpeed = 0.6
        controls.minDistance = 120
        controls.maxDistance = 600
      }

      globeInitializedRef.current = true
      onReadyRef.current?.()
    }

    // Poll until globe ref is available
    const poll = () => {
      if (!globeInitializedRef.current) {
        tryInit()
        raf = requestAnimationFrame(poll)
      }
    }
    raf = requestAnimationFrame(poll)

    return () => cancelAnimationFrame(raf)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -------------------------------------------------------------------------
  // Derived data — arcs and points (always visible)
  // -------------------------------------------------------------------------

  const arcsData = useMemo(() => getArcsForYear(currentYear), [currentYear])
  const pointsData = useMemo(() => getPointsForYear(currentYear), [currentYear])

  // Golden polygon borders — subtle, cinematic
  const polygonBorderColor = 'rgba(212, 165, 74, 0.3)'

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div ref={containerRef} className="w-full h-full" style={{ touchAction: 'none' }}>
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
          atmosphereColor="rgba(212, 165, 74, 0.8)"
          atmosphereAltitude={0.18}
          // Arcs
          arcsData={arcsData}
          arcStartLat={(d: any) => d.fromLat}
          arcStartLng={(d: any) => d.fromLng}
          arcEndLat={(d: any) => d.toLat}
          arcEndLng={(d: any) => d.toLng}
          arcColor={(d: any) => d.eraColor}
          arcAltitude={(d: any) => d.eraAltitude}
          arcStroke={0.4}
          arcDashLength={1}
          arcDashGap={0}
          arcDashAnimateTime={0}
          arcsTransitionDuration={500}
          // Points
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
          polygonStrokeColor={() => polygonBorderColor}
          polygonAltitude={0.001}
        />
      )}
    </div>
  )
}
