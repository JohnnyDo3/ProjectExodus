'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  getArcsForYear,
  getPointsForYear,
  REGION_CENTROIDS,
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

// AutoRotate speeds per phase (OrbitControls units — 2.0 ≈ 30s/revolution)
const ROTATE_SPEED: Record<IntroPhase, number> = {
  building:  1.0,
  revealing: 1.5,
  pausing:   2.0,
  sweeping:  1.5, // base — accelerated during sweep
  idle:      3.0,
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
  // Globe init — face seed region, enable autoRotate
  // -------------------------------------------------------------------------

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    globe.pointOfView({ lat: SEED_LAT, lng: SEED_LNG, altitude: 2.2 })

    const controls = globe.controls()
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = ROTATE_SPEED.building
      controls.enableDamping = true
      controls.dampingFactor = 0.1
    }
  }, [])

  // -------------------------------------------------------------------------
  // Update autoRotate speed based on intro phase (+ sweep acceleration)
  // -------------------------------------------------------------------------

  useEffect(() => {
    const controls = globeRef.current?.controls()
    if (!controls) return

    if (introPhase === 'sweeping') {
      // Slight acceleration: 1.5 → 3.0 as we approach present day
      const progress = Math.max(0, (currentYear + 3500) / (2025 + 3500))
      controls.autoRotateSpeed = 1.5 + progress * 1.5
    } else {
      controls.autoRotateSpeed = ROTATE_SPEED[introPhase]
    }
  }, [introPhase, currentYear])

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

  // Golden polygon borders — subtle during intro, prominent after reveal
  const polygonBorderColor = showArcs
    ? 'rgba(212, 165, 74, 0.6)'
    : 'rgba(212, 165, 74, 0.15)'

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
