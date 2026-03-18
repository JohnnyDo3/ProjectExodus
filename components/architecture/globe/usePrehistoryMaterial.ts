'use client'

import { useEffect, useRef, useState } from 'react'

// =============================================================================
// Prehistoric globe build-up shader — Voronoi shard assembly
//
// The globe starts as a dark sphere with faint glowing shard edges.
// Shards fill in with earth texture progressively, spreading outward
// from active architectural regions. Amber glow on shard seams fades
// as the globe completes.
//
// `progress` uniform: 0 = dark shards, 1 = fully textured globe.
// `regionPoints` uniform: up to 8 vec2 lat/lng positions of active regions.
// `regionCount` uniform: number of active regions.
// =============================================================================

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv          = uv;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D nightTexture;
  uniform sampler2D dayTexture;
  uniform float progress;           // 0 → 1
  uniform float time;               // seconds
  uniform vec2 regionPoints[8];     // active region positions in UV space
  uniform int regionCount;

  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  // ---- Voronoi noise for shard pattern ----
  // Hash function for pseudo-random cell positions
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  // Returns (distance to nearest cell center, distance to nearest edge, cell ID hash)
  vec3 voronoi(vec2 uv, float scale) {
    vec2 i = floor(uv * scale);
    vec2 f = fract(uv * scale);

    float minDist  = 1.0;   // distance to closest center
    float minDist2 = 1.0;   // distance to 2nd closest center
    vec2  closestCell = vec2(0.0);

    // Check 3x3 neighborhood
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash2(i + neighbor);
        vec2 diff = neighbor + point - f;
        float d = length(diff);

        if (d < minDist) {
          minDist2 = minDist;
          minDist = d;
          closestCell = i + neighbor + point;
        } else if (d < minDist2) {
          minDist2 = d;
        }
      }
    }

    // Edge distance = difference between 2nd closest and closest
    float edge = minDist2 - minDist;
    // Cell ID as a hash
    float cellId = fract(sin(dot(closestCell, vec2(12.9898, 78.233))) * 43758.5453);

    return vec3(minDist, edge, cellId);
  }

  // Distance from a UV point to the nearest active region (in UV space)
  float distToNearestRegion(vec2 uv) {
    float minD = 10.0;
    for (int i = 0; i < 8; i++) {
      if (i >= regionCount) break;
      // Wrap-aware distance on UV sphere
      vec2 delta = uv - regionPoints[i];
      delta.x = min(abs(delta.x), 1.0 - abs(delta.x)); // wrap longitude
      float d = length(delta);
      minD = min(minD, d);
    }
    return minD;
  }

  void main() {
    // Voronoi at two scales for visual richness
    vec3 v1 = voronoi(vUv, 14.0);  // large shards
    vec3 v2 = voronoi(vUv, 28.0);  // fine detail

    float cellId = v1.z;
    float edge1 = v1.y;
    float edge2 = v2.y;

    // ---- Per-shard reveal threshold ----
    // Each shard has a reveal threshold based on:
    // 1. Distance from nearest active region (closer = reveals earlier)
    // 2. Cell ID randomness (adds variation)
    float regionDist = distToNearestRegion(vUv);
    float threshold = regionDist * 1.4 + cellId * 0.3;
    // Normalise to [0, 1] range approximately
    threshold = clamp(threshold * 0.8, 0.0, 0.95);

    // The shard is "filled" when progress exceeds its threshold
    float fillProgress = smoothstep(threshold - 0.05, threshold + 0.05, progress);

    // ---- Earth textures ----
    vec4 night = texture2D(nightTexture, vUv);
    vec4 day = texture2D(dayTexture, vUv);
    // Use a mix leaning toward night for the build-up phase
    vec4 earth = mix(night, day * 0.5 + night * 0.5, progress * 0.4);

    // ---- Shard edge glow ----
    float edgeLine = smoothstep(0.04, 0.0, edge1);
    float fineEdge = smoothstep(0.06, 0.0, edge2) * 0.3;
    float edgeGlow = (edgeLine + fineEdge);

    // Amber glow colour
    vec3 amberGlow = vec3(0.83, 0.65, 0.29); // #D4A54A

    // Edge brightness: brightest during assembly, fades when complete
    float edgeBrightness = edgeGlow * (1.0 - progress * 0.9);
    // Pulse the edges subtly
    edgeBrightness *= 0.5 + 0.2 * sin(time * 1.5 + cellId * 6.28);

    // ---- Compose final colour ----
    // Unfilled shards: dark with amber edge glow
    vec3 darkShard = amberGlow * edgeBrightness * 0.8;
    // Add a very faint hint of the earth texture even in dark shards
    darkShard += night.rgb * 0.05;

    // Filled shards: earth texture with fading edge glow
    vec3 filledShard = earth.rgb + amberGlow * edgeBrightness * (1.0 - fillProgress) * 0.4;

    vec3 color = mix(darkShard, filledShard, fillProgress);

    // ---- Rim lighting ----
    float rim = 1.0 - max(0.0, dot(normalize(vWorldNormal), normalize(-vWorldPos)));
    color += amberGlow * rim * rim * (0.15 + 0.1 * (1.0 - progress));

    // ---- "Snap" flash when a shard fills in ----
    // Brief bright flash at the moment progress crosses the shard's threshold
    float snapDist = abs(progress - threshold);
    float snap = smoothstep(0.06, 0.0, snapDist) * 0.4;
    color += amberGlow * snap;

    // Alpha: starts slightly transparent, becomes fully opaque
    float alpha = mix(0.6, 1.0, progress);
    // Filled shards are always fully opaque
    alpha = mix(alpha, 1.0, fillProgress);

    gl_FragColor = vec4(color, alpha);
  }
`

const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'
const DAY_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'

// =============================================================================
// Convert lat/lng to UV coordinates (equirectangular projection)
// =============================================================================

function latLngToUV(lat: number, lng: number): [number, number] {
  const u = (lng + 180) / 360
  const v = 1 - (lat + 90) / 180  // flip Y
  return [u, v]
}

// =============================================================================
// Hook
// =============================================================================

/**
 * Creates a Voronoi shard assembly shader that builds the earth from fragments.
 *
 * @param progress 0 → 1 (how assembled the globe is)
 * @param activeRegions Array of {lat, lng} for active architectural regions
 */
export function usePrehistoryMaterial(
  progress: number,
  activeRegions: { lat: number; lng: number }[] = []
): any | null {
  const materialRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const startTimeRef = useRef(Date.now())

  // Create material once
  useEffect(() => {
    let cancelled = false

    async function init() {
      const THREE = await import('three')
      const loader = new THREE.TextureLoader()

      const [nightTex, dayTex] = await Promise.all([
        new Promise<any>((resolve, reject) =>
          loader.load(NIGHT_TEXTURE_URL, resolve, undefined, reject)
        ),
        new Promise<any>((resolve, reject) =>
          loader.load(DAY_TEXTURE_URL, resolve, undefined, reject)
        ),
      ])

      if (cancelled) {
        nightTex.dispose()
        dayTex.dispose()
        return
      }

      // Initial region points as Vector2 array
      const regionPointsArray = Array.from({ length: 8 }, () => new THREE.Vector2(0, 0))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          nightTexture: { value: nightTex },
          dayTexture: { value: dayTex },
          progress: { value: progress },
          time: { value: 0 },
          regionPoints: { value: regionPointsArray },
          regionCount: { value: 0 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
      })

      materialRef.current = material
      startTimeRef.current = Date.now()
      setReady(true)
    }

    init().catch(() => {})

    return () => {
      cancelled = true
      if (materialRef.current) {
        materialRef.current.dispose()
      }
    }
  }, [])

  // Update progress uniform
  useEffect(() => {
    if (!ready || !materialRef.current) return
    materialRef.current.uniforms.progress.value = progress
  }, [progress, ready])

  // Update active region points
  useEffect(() => {
    if (!ready || !materialRef.current) return

    const count = Math.min(activeRegions.length, 8)
    const arr = materialRef.current.uniforms.regionPoints.value as any[]

    for (let i = 0; i < 8; i++) {
      if (i < count) {
        const [u, v] = latLngToUV(activeRegions[i].lat, activeRegions[i].lng)
        arr[i].set(u, v)
      } else {
        arr[i].set(0, 0)
      }
    }

    materialRef.current.uniforms.regionCount.value = count
  }, [activeRegions, ready])

  // Animate `time` uniform
  useEffect(() => {
    if (!ready || !materialRef.current) return

    let raf: number
    const tick = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value =
          (Date.now() - startTimeRef.current) / 1000
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [ready])

  return ready ? materialRef.current : null
}
