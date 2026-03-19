'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// =============================================================================
// Shard Build Material — Globe intro animation
//
// The globe starts invisible. Voronoi shards appear one by one, radiating
// outward from a seed point (the first connection's region). Each shard
// fades in with an amber glow edge. Once fully assembled, the onComplete
// callback fires so the parent can crossfade to the theme material.
//
// This is a standalone intro effect — not tied to the timeline.
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

  uniform sampler2D earthTexture;
  uniform float progress;           // 0 → 1 (driven by time)
  uniform float time;               // seconds elapsed
  uniform vec2 seedPoint;           // UV of first connection region

  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  // ---- Voronoi noise ----
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  vec3 voronoi(vec2 uv, float scale) {
    vec2 i = floor(uv * scale);
    vec2 f = fract(uv * scale);

    float minDist  = 1.0;
    float minDist2 = 1.0;
    vec2  closestCell = vec2(0.0);

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

    float edge = minDist2 - minDist;
    float cellId = fract(sin(dot(closestCell, vec2(12.9898, 78.233))) * 43758.5453);

    return vec3(minDist, edge, cellId);
  }

  // Distance from UV to seed point (wrap-aware)
  float distToSeed(vec2 uv) {
    vec2 delta = uv - seedPoint;
    delta.x = min(abs(delta.x), 1.0 - abs(delta.x));
    return length(delta);
  }

  void main() {
    // Voronoi at two scales
    vec3 v1 = voronoi(vUv, 14.0);
    vec3 v2 = voronoi(vUv, 28.0);

    float cellId = v1.z;
    float edge1 = v1.y;
    float edge2 = v2.y;

    // Per-shard reveal: shards near seed appear first
    float seedDist = distToSeed(vUv);
    float threshold = seedDist * 1.4 + cellId * 0.3;
    threshold = clamp(threshold * 0.8, 0.0, 0.95);

    float fillProgress = smoothstep(threshold - 0.05, threshold + 0.05, progress);

    // Earth texture
    vec4 earth = texture2D(earthTexture, vUv);

    // Shard edge glow
    float edgeLine = smoothstep(0.04, 0.0, edge1);
    float fineEdge = smoothstep(0.06, 0.0, edge2) * 0.3;
    float edgeGlow = edgeLine + fineEdge;

    vec3 amberGlow = vec3(0.83, 0.65, 0.29);

    // Edge brightness fades as assembly completes
    float edgeBrightness = edgeGlow * (1.0 - progress * 0.9);
    edgeBrightness *= 0.5 + 0.2 * sin(time * 1.5 + cellId * 6.28);

    // Unfilled: dark with amber edges
    vec3 darkShard = amberGlow * edgeBrightness * 0.8;
    darkShard += earth.rgb * 0.03;

    // Filled: earth texture with fading glow
    vec3 filledShard = earth.rgb + amberGlow * edgeBrightness * (1.0 - fillProgress) * 0.4;

    vec3 color = mix(darkShard, filledShard, fillProgress);

    // Rim lighting
    float rim = 1.0 - max(0.0, dot(normalize(vWorldNormal), normalize(-vWorldPos)));
    color += amberGlow * rim * rim * (0.15 + 0.1 * (1.0 - progress));

    // Flash when shard fills
    float snapDist = abs(progress - threshold);
    float snap = smoothstep(0.06, 0.0, snapDist) * 0.4;
    color += amberGlow * snap;

    // Alpha: fades in, filled shards fully opaque
    float alpha = mix(0.0, 1.0, smoothstep(0.0, 0.05, progress));
    alpha = mix(alpha * 0.6, 1.0, fillProgress);

    gl_FragColor = vec4(color, alpha);
  }
`

const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'
const DAY_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'

const BUILD_DURATION = 8000 // 8 seconds to fully assemble

function latLngToUV(lat: number, lng: number): [number, number] {
  const u = (lng + 180) / 360
  const v = 1 - (lat + 90) / 180
  return [u, v]
}

/**
 * Creates a shard assembly intro material.
 * Automatically animates from 0→1 over BUILD_DURATION.
 * Calls onComplete when assembly finishes.
 *
 * @param seedLat Latitude of first connection region
 * @param seedLng Longitude of first connection region
 * @param isDayTheme Whether the site theme is day (true) or night (false)
 * @param onComplete Called when shard build reaches 100%
 */
export function useShardBuildMaterial(
  seedLat: number,
  seedLng: number,
  isDayTheme: boolean,
  onComplete: () => void
): { material: any | null; progress: number } {
  const materialRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number>(0)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Create material once
  useEffect(() => {
    let cancelled = false

    async function init() {
      const THREE = await import('three')
      const loader = new THREE.TextureLoader()

      const textureUrl = isDayTheme ? DAY_TEXTURE_URL : NIGHT_TEXTURE_URL

      const earthTex = await new Promise<any>((resolve, reject) =>
        loader.load(textureUrl, resolve, undefined, reject)
      )

      if (cancelled) {
        earthTex.dispose()
        return
      }

      const [seedU, seedV] = latLngToUV(seedLat, seedLng)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          earthTexture: { value: earthTex },
          progress: { value: 0 },
          time: { value: 0 },
          seedPoint: { value: new THREE.Vector2(seedU, seedV) },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
      })

      materialRef.current = material
      startTimeRef.current = performance.now()
      completedRef.current = false
      setReady(true)
    }

    init().catch(() => {})

    return () => {
      cancelled = true
      if (materialRef.current) {
        materialRef.current.dispose()
        materialRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only init once

  // Animate progress 0→1
  useEffect(() => {
    if (!ready || !materialRef.current) return

    let raf: number
    const tick = () => {
      if (!materialRef.current) return
      const elapsed = performance.now() - startTimeRef.current
      const t = Math.min(elapsed / BUILD_DURATION, 1)
      const easedT = 1 - Math.pow(1 - t, 2) // ease-out quad

      materialRef.current.uniforms.progress.value = easedT
      materialRef.current.uniforms.time.value = elapsed / 1000

      setProgress(easedT)

      if (easedT >= 1 && !completedRef.current) {
        completedRef.current = true
        onCompleteRef.current()
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [ready])

  return { material: ready ? materialRef.current : null, progress }
}
