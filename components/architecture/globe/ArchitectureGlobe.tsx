'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  getArcsForYear,
  getPointsForYear,
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

// Levant — first architectural influence (Natufian, ~12000 BCE)
const SEED_LAT = 31.8
const SEED_LNG = 35.2

// Idle rotation speed — one revolution per 20s
const IDLE_SPEED = (2 * Math.PI) / 20

// Camera altitude — standard viewing distance
const IDLE_ALTITUDE = 2.2

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

  // Refs for the animation loop
  const isUserDraggingRef = useRef(false)
  const globeInitializedRef = useRef(false)
  const globeMeshRef = useRef<any>(null)
  const dragStartHandlerRef = useRef<(() => void) | null>(null)
  const dragEndHandlerRef = useRef<(() => void) | null>(null)
  const controlsRef = useRef<any>(null)
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
  // Rotation loop — idle speed from the start
  // -------------------------------------------------------------------------

  useEffect(() => {
    let raf: number
    let lastTime = performance.now()
    let currentSpeed = 0

    const tick = () => {
      const globe = globeRef.current
      const now = performance.now()

      if (globe) {
        // First-time init
        if (!globeInitializedRef.current) {
          globe.pointOfView({ lat: SEED_LAT, lng: SEED_LNG, altitude: IDLE_ALTITUDE })

          const controls = globe.controls()
          if (controls) {
            controls.autoRotate = false
            controls.enableDamping = true
            controls.dampingFactor = 0.1

            controlsRef.current = controls
            dragStartHandlerRef.current = () => {
              isUserDraggingRef.current = true
            }
            dragEndHandlerRef.current = () => {
              isUserDraggingRef.current = false
              lastTime = performance.now()
            }

            controls.addEventListener('start', dragStartHandlerRef.current)
            controls.addEventListener('end', dragEndHandlerRef.current)
          }

          globeInitializedRef.current = true
          lastTime = now

          // Signal ready
          onReadyRef.current?.()
        }

        // Lazy-find the globe mesh (may not exist on first frame)
        if (!globeMeshRef.current) {
          const scene = globe.scene()
          if (scene) {
            const mesh = scene.children.find(
              (c: any) => c.type === 'Group' && c.children && c.children.length > 0
            )
            if (mesh) globeMeshRef.current = mesh
          }
        }

        const dt = Math.min((now - lastTime) / 1000, 0.1)

        // Smooth rotation
        if (!isUserDraggingRef.current && globeMeshRef.current) {
          const speedLerp = 1 - Math.pow(0.02, dt)
          currentSpeed += (IDLE_SPEED - currentSpeed) * speedLerp
          globeMeshRef.current.rotation.y += currentSpeed * dt
        }
      }

      lastTime = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
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
  // Derived data — arcs and points (always visible)
  // -------------------------------------------------------------------------

  const arcsData = useMemo(() => getArcsForYear(currentYear), [currentYear])
  const pointsData = useMemo(() => getPointsForYear(currentYear), [currentYear])

  // Golden polygon borders — full opacity from the start
  const polygonBorderColor = 'rgba(212, 165, 74, 0.6)'

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
          arcDashLength={1}
          arcDashGap={0}
          arcDashAnimateTime={0}
          arcsTransitionDuration={800}
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
