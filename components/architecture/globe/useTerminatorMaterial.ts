'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as SunCalc from 'suncalc'

// =============================================================================
// Subsolar point calculation
// =============================================================================

interface SubsolarPoint {
  lat: number
  lng: number
}

function getSubsolarPoint(date: Date = new Date()): SubsolarPoint {
  // Solar declination — latitude where sun is directly overhead
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const declination = 23.44 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81))

  // Subsolar longitude — based on UTC time
  const utcHours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  const lng = (12 - utcHours) * 15

  return { lat: declination, lng }
}

function latLngToDirection(lat: number, lng: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ]
}

// =============================================================================
// Shader source
// =============================================================================

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec2 vUv;

  void main() {
    // World-space normal for sun direction comparison
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec3 sunDirection;

  varying vec3 vWorldNormal;
  varying vec2 vUv;

  void main() {
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);

    float intensity = dot(normalize(vWorldNormal), normalize(sunDirection));

    // Smooth terminator — wider transition band for more realistic look
    float blend = smoothstep(-0.15, 0.15, intensity);

    // Slight ambient boost on day side, slight city-light glow on night side
    vec4 day = dayColor * (0.6 + 0.4 * max(intensity, 0.0));
    vec4 night = nightColor * 1.1;

    gl_FragColor = mix(night, day, blend);
  }
`

// =============================================================================
// Texture URLs
// =============================================================================

const DAY_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'

// =============================================================================
// Hook
// =============================================================================

/**
 * Creates a Three.js ShaderMaterial that blends day/night earth textures
 * based on the real-time sun position calculated via SunCalc.
 *
 * Returns null while textures are loading.
 */
export function useTerminatorMaterial(): any | null {
  const materialRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  // Create material once on mount
  useEffect(() => {
    let cancelled = false

    async function init() {
      // Dynamic import Three.js (only runs client-side)
      const THREE = await import('three')

      const loader = new THREE.TextureLoader()

      const [dayTex, nightTex] = await Promise.all([
        new Promise<any>((resolve, reject) =>
          loader.load(DAY_TEXTURE_URL, resolve, undefined, reject)
        ),
        new Promise<any>((resolve, reject) =>
          loader.load(NIGHT_TEXTURE_URL, resolve, undefined, reject)
        ),
      ])

      if (cancelled) {
        dayTex.dispose()
        nightTex.dispose()
        return
      }

      // Initial sun direction
      const subsolar = getSubsolarPoint()
      const sunDir = latLngToDirection(subsolar.lat, subsolar.lng)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          dayTexture: { value: dayTex },
          nightTexture: { value: nightTex },
          sunDirection: { value: new THREE.Vector3(...sunDir) },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      })

      materialRef.current = material
      setReady(true)
    }

    init().catch(() => {
      // If texture loading fails, fall back to no custom material
    })

    return () => {
      cancelled = true
      if (materialRef.current) {
        materialRef.current.dispose()
      }
    }
  }, [])

  // Update sun direction every 60 seconds
  useEffect(() => {
    if (!ready || !materialRef.current) return

    const interval = setInterval(() => {
      const subsolar = getSubsolarPoint()
      const sunDir = latLngToDirection(subsolar.lat, subsolar.lng)
      const uniform = materialRef.current?.uniforms?.sunDirection
      if (uniform) {
        uniform.value.set(...sunDir)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [ready])

  return ready ? materialRef.current : null
}
