'use client'

import { useEffect, useRef, useState } from 'react'

// =============================================================================
// Globe Intro Material — Two-phase cinematic intro
//
// Phase 1 (BUILD):  Glass-like golden voronoi shards assemble back-to-front,
//                   wrapping around the globe like a coat — Levant is the last shard.
//
// Phase 2 (REVEAL): Earth texture ripples outward from the Levant (the last shard,
//                   center of the first architectural influence — Natufian, ~12000 BCE).
//                   Gold dissolves into earth. After reveal the parent swaps to the
//                   theme MeshBasicMaterial.
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

  uniform float buildProgress;    // 0 → 1  shard assembly
  uniform float revealProgress;   // 0 → 1  earth texture emergence
  uniform float fadeOut;          // 0 → 1  smooth crossfade to basic material
  uniform float time;             // elapsed seconds
  uniform vec2 seedPoint;         // UV of Levant (back-to-front origin & reveal center)
  uniform sampler2D earthTexture;

  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  // ---- Voronoi helpers ----
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

  // Wrap-aware UV distance
  float wrapDist(vec2 a, vec2 b) {
    vec2 delta = a - b;
    delta.x = min(abs(delta.x), 1.0 - abs(delta.x));
    return length(delta);
  }

  void main() {
    vec3 v1 = voronoi(vUv, 14.0);

    float cellId = v1.z;
    float edge1  = v1.y;

    // ═══ PHASE 1: SHARD BUILD (back-to-front, Levant last) ═══
    // Each shard appears as a discrete solid piece — no gold-fill expansion
    float seedDist    = wrapDist(vUv, seedPoint);
    float reversedDist = 1.0 - seedDist;           // far side first
    float threshold   = reversedDist * 1.4 + cellId * 0.3;
    threshold = clamp(threshold * 0.8, 0.0, 0.95);

    // Tight step: shard snaps in as a solid piece (0.005 range vs old 0.10)
    float shardFill = smoothstep(threshold - 0.005, threshold + 0.005, buildProgress);

    // Clean glass-shard gold
    vec3 gold = vec3(0.83, 0.65, 0.29);

    // Crisp shard edge line for faceted look
    float edgeLine = smoothstep(0.03, 0.0, edge1);
    vec3 goldShard = gold + gold * edgeLine * 0.5;

    // ═══ PHASE 2: EARTH REVEAL (ripples from Levant — the last shard) ═══
    vec4 earth = texture2D(earthTexture, vUv);

    float revealDist      = wrapDist(vUv, seedPoint);
    float revealThreshold = revealDist * 1.3;
    float earthFill       = smoothstep(revealThreshold - 0.08, revealThreshold + 0.02, revealProgress);

    // Gold dissolves into earth texture
    vec3 color = mix(goldShard, earth.rgb, earthFill);

    // Subtle leading-edge glow at the reveal wavefront
    float wavefrontDist = abs(revealProgress - revealThreshold);
    float wavefrontGlow = smoothstep(0.10, 0.0, wavefrontDist) * revealProgress * (1.0 - earthFill * 0.8);
    color += vec3(1.0, 0.85, 0.4) * wavefrontGlow * 0.6;

    // Alpha: invisible until shard fills in
    float alpha = shardFill;

    // Crossfade: blend toward raw earth texture for seamless material swap
    vec3 finalColor = mix(color, earth.rgb, fadeOut);
    float finalAlpha = mix(alpha, 1.0, fadeOut);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'
const DAY_TEXTURE_URL   = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'

const BUILD_DURATION   = 8000 // 8 seconds — deliberate golden shard assembly
const REVEAL_DURATION  = 3500 // 3.5 seconds — earth texture emergence
const FADEOUT_DURATION = 1500 // 1.5 seconds — smooth crossfade to basic material

function latLngToUV(lat: number, lng: number): [number, number] {
  const u = (lng + 180) / 360
  const v = 1 - (lat + 90) / 180
  return [u, v]
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Two-phase intro material for the globe cinematic entrance.
 *
 * @param seedLat    Camera-facing latitude — Levant (last shard, reveal origin)
 * @param seedLng    Camera-facing longitude
 * @param isDayTheme Day texture vs night texture
 * @param onBuildComplete  Called when shard assembly reaches 100%
 * @param onRevealComplete Called when earth texture fully replaces gold
 */
export function useGlobeIntroMaterial(
  seedLat: number,
  seedLng: number,
  isDayTheme: boolean,
  onBuildComplete: () => void,
  onRevealComplete: () => void
): { material: any | null; fadeOutComplete: boolean } {
  const materialRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [fadeOutComplete, setFadeOutComplete] = useState(false)
  const mountTimeRef = useRef<number>(0)    // never resets — drives shader `time`
  const buildStartRef = useRef<number>(0)   // start of build phase
  const revealStartRef = useRef<number>(0)  // start of reveal phase
  const fadeOutStartRef = useRef<number>(0) // start of crossfade to basic material
  const buildDoneRef = useRef(false)
  const revealDoneRef = useRef(false)
  const fadeOutDoneRef = useRef(false)
  const onBuildCompleteRef = useRef(onBuildComplete)
  const onRevealCompleteRef = useRef(onRevealComplete)
  onBuildCompleteRef.current = onBuildComplete
  onRevealCompleteRef.current = onRevealComplete

  // Create shader material
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
          earthTexture:   { value: earthTex },
          buildProgress:  { value: 0 },
          revealProgress: { value: 0 },
          fadeOut:         { value: 0 },
          time:           { value: 0 },
          seedPoint:      { value: new THREE.Vector2(seedU, seedV) },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
      })

      materialRef.current = material
      mountTimeRef.current = performance.now()
      buildStartRef.current = performance.now()
      buildDoneRef.current = false
      revealDoneRef.current = false
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
  }, [])

  // Animate: build 0→1, then reveal 0→1
  useEffect(() => {
    if (!ready || !materialRef.current) return

    let raf: number
    const tick = () => {
      if (!materialRef.current) return

      const now = performance.now()
      const uniforms = materialRef.current.uniforms

      // Shader time: monotonic from mount, never resets (avoids pulse animation jump)
      uniforms.time.value = (now - mountTimeRef.current) / 1000

      if (!buildDoneRef.current) {
        // Phase 1: shard build
        const buildElapsed = now - buildStartRef.current
        const t = Math.min(buildElapsed / BUILD_DURATION, 1)
        const eased = 1 - Math.pow(1 - t, 2) // ease-out quad
        uniforms.buildProgress.value = eased

        if (t >= 1) {
          buildDoneRef.current = true
          revealStartRef.current = now
          onBuildCompleteRef.current()
        }
      } else if (!revealDoneRef.current) {
        // Phase 2: earth reveal
        const revealElapsed = now - revealStartRef.current
        const t = Math.min(revealElapsed / REVEAL_DURATION, 1)
        const eased = 1 - Math.pow(1 - t, 2) // ease-out quad
        uniforms.revealProgress.value = eased

        if (t >= 1) {
          revealDoneRef.current = true
          fadeOutStartRef.current = now
          onRevealCompleteRef.current()
        }
      } else if (!fadeOutDoneRef.current) {
        // Phase 3: crossfade shader → basic material (eliminates jolt)
        const fadeElapsed = now - fadeOutStartRef.current
        const t = Math.min(fadeElapsed / FADEOUT_DURATION, 1)
        const eased = t * t // ease-in — starts gentle
        uniforms.fadeOut.value = eased

        if (t >= 1) {
          fadeOutDoneRef.current = true
          setFadeOutComplete(true)
        }
      }

      if (!fadeOutDoneRef.current) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])

  return { material: ready ? materialRef.current : null, fadeOutComplete }
}
