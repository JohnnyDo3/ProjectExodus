'use client'

import { useEffect, useRef, useState } from 'react'

// =============================================================================
// Globe Intro Material — Two-phase cinematic intro
//
// Phase 1 (BUILD):  Solid golden voronoi shards assemble back-to-front.
//                   No earth texture — just uniform gold with shard edges.
//
// Phase 2 (REVEAL): Earth texture radiates outward from Mesopotamia (~3500 BCE
//                   first architectural record). Gold dissolves completely.
//                   After reveal the parent swaps to the theme MeshBasicMaterial
//                   and the golden country borders (polygon stroke layer) become
//                   the visible "remnant" of the gold.
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
  uniform float time;             // elapsed seconds
  uniform vec2 seedPoint;         // UV of camera-facing point (back-to-front origin)
  uniform vec2 revealCenter;      // UV of Mesopotamia (earth reveal origin)
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
    vec3 v2 = voronoi(vUv, 28.0);

    float cellId = v1.z;
    float edge1  = v1.y;
    float edge2  = v2.y;

    // ═══ PHASE 1: SHARD BUILD (back-to-front) ═══
    float seedDist    = wrapDist(vUv, seedPoint);
    float reversedDist = 1.0 - seedDist;           // far side first
    float threshold   = reversedDist * 1.4 + cellId * 0.3;
    threshold = clamp(threshold * 0.8, 0.0, 0.95);

    float shardFill = smoothstep(threshold - 0.05, threshold + 0.05, buildProgress);

    // Golden color
    vec3 gold = vec3(0.83, 0.65, 0.29);

    // Shard edge glow
    float edgeLine = smoothstep(0.04, 0.0, edge1);
    float fineEdge = smoothstep(0.06, 0.0, edge2) * 0.3;
    float edgeGlow = edgeLine + fineEdge;

    // Pulsing on edges
    float pulse = 0.5 + 0.3 * sin(time * 1.5 + cellId * 6.28);

    // Solid gold shard + edge highlights
    vec3 goldShard = gold * 0.5;
    goldShard += gold * edgeGlow * 0.6 * pulse;

    // Flash when shard snaps in
    float snapDist = abs(buildProgress - threshold);
    float snap = smoothstep(0.06, 0.0, snapDist) * 0.5;
    goldShard += gold * snap;

    // ═══ PHASE 2: EARTH REVEAL (radiate from Mesopotamia) ═══
    vec4 earth = texture2D(earthTexture, vUv);

    float revealDist      = wrapDist(vUv, revealCenter);
    float revealThreshold = revealDist * 1.3;
    float earthFill       = smoothstep(revealThreshold - 0.08, revealThreshold + 0.02, revealProgress);

    // Gold dissolves into earth texture
    vec3 color = mix(goldShard, earth.rgb, earthFill);

    // Gold edge glow fades as reveal progresses
    float edgeFade = 1.0 - revealProgress;
    color += gold * edgeGlow * 0.3 * edgeFade;

    // Rim lighting (subtle, fades with reveal)
    float rim = 1.0 - max(0.0, dot(normalize(vWorldNormal), normalize(-vWorldPos)));
    color += gold * rim * rim * (0.15 * (1.0 - revealProgress * 0.8));

    // Alpha: invisible until shard fills in
    float alpha = shardFill;

    gl_FragColor = vec4(color, alpha);
  }
`

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'
const DAY_TEXTURE_URL   = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'

const BUILD_DURATION  = 6000 // 6 seconds — golden shard assembly
const REVEAL_DURATION = 3000 // 3 seconds — earth texture emergence

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
 * @param seedLat    Camera-facing latitude (shards build away from here → toward here)
 * @param seedLng    Camera-facing longitude
 * @param revealLat  Earth reveal origin latitude  (Mesopotamia ≈ 33.3)
 * @param revealLng  Earth reveal origin longitude (Mesopotamia ≈ 44.4)
 * @param isDayTheme Day texture vs night texture
 * @param onBuildComplete  Called when shard assembly reaches 100%
 * @param onRevealComplete Called when earth texture fully replaces gold
 */
export function useGlobeIntroMaterial(
  seedLat: number,
  seedLng: number,
  revealLat: number,
  revealLng: number,
  isDayTheme: boolean,
  onBuildComplete: () => void,
  onRevealComplete: () => void
): { material: any | null } {
  const materialRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const startTimeRef = useRef<number>(0)
  const buildDoneRef = useRef(false)
  const revealDoneRef = useRef(false)
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
      const [revealU, revealV] = latLngToUV(revealLat, revealLng)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          earthTexture:   { value: earthTex },
          buildProgress:  { value: 0 },
          revealProgress: { value: 0 },
          time:           { value: 0 },
          seedPoint:      { value: new THREE.Vector2(seedU, seedV) },
          revealCenter:   { value: new THREE.Vector2(revealU, revealV) },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
      })

      materialRef.current = material
      startTimeRef.current = performance.now()
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

      const elapsed = performance.now() - startTimeRef.current
      const uniforms = materialRef.current.uniforms

      uniforms.time.value = elapsed / 1000

      if (!buildDoneRef.current) {
        // Phase 1: shard build
        const t = Math.min(elapsed / BUILD_DURATION, 1)
        const eased = 1 - Math.pow(1 - t, 2) // ease-out quad
        uniforms.buildProgress.value = eased

        if (t >= 1) {
          buildDoneRef.current = true
          // Reset timer for reveal phase
          startTimeRef.current = performance.now()
          onBuildCompleteRef.current()
        }
      } else if (!revealDoneRef.current) {
        // Phase 2: earth reveal
        const revealElapsed = performance.now() - startTimeRef.current
        const t = Math.min(revealElapsed / REVEAL_DURATION, 1)
        const eased = 1 - Math.pow(1 - t, 2) // ease-out quad
        uniforms.revealProgress.value = eased

        if (t >= 1) {
          revealDoneRef.current = true
          onRevealCompleteRef.current()
        }
      }

      if (!revealDoneRef.current) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])

  return { material: ready ? materialRef.current : null }
}
