'use client'

import { useEffect, useRef, useState } from 'react'

// =============================================================================
// Prehistoric globe build-up shader
//
// During -12000 → -3500, the globe starts as a wireframe hologram grid and
// progressively materialises into the full earth texture.
//
// `progress` uniform: 0 = pure wireframe, 1 = fully textured globe.
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
  uniform sampler2D nightTexture;
  uniform float progress;           // 0 → 1
  uniform float time;               // seconds, for subtle animation

  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  // Wireframe grid lines — latitude / longitude
  float grid(vec2 uv, float lineWidth) {
    float latLines  = abs(sin(uv.y * 3.14159 * 9.0));   // 9 latitude bands
    float lngLines  = abs(sin(uv.x * 3.14159 * 18.0));  // 18 longitude bands
    float lat = smoothstep(lineWidth, lineWidth + 0.02, latLines);
    float lng = smoothstep(lineWidth, lineWidth + 0.02, lngLines);
    return 1.0 - lat * lng; // 1 on lines, 0 elsewhere
  }

  void main() {
    // Base wireframe colour — amber hologram
    vec3 wireColor = vec3(0.83, 0.65, 0.29); // #D4A54A
    float lineWidth = 0.06 + 0.02 * sin(time * 0.5);
    float wire = grid(vUv, lineWidth);

    // Pulse / scan-line effect moving from top to bottom
    float scanY = fract(time * 0.08);
    float scan = smoothstep(0.03, 0.0, abs(vUv.y - scanY)) * 0.4;

    // Wireframe globe appearance
    float glow = wire * (0.4 + 0.15 * sin(time * 1.2));
    vec4 wireframe = vec4(wireColor * (glow + scan), glow * 0.8 + 0.05);

    // Earth texture (night)
    vec4 earth = texture2D(nightTexture, vUv);
    // Brighten slightly and add atmosphere tint at edge
    float rim = 1.0 - max(0.0, dot(normalize(vWorldNormal), normalize(-vWorldPos)));
    earth.rgb += wireColor * rim * rim * 0.3;

    // Mix based on progress
    // 0.0-0.3: mostly wireframe
    // 0.3-0.8: crossfade
    // 0.8-1.0: mostly earth
    float t = smoothstep(0.1, 0.9, progress);

    vec4 color = mix(wireframe, earth, t);

    // During early stages, add extra wireframe on top of the earth blend
    float extraWire = wire * (1.0 - t) * 0.3;
    color.rgb += wireColor * extraWire;

    gl_FragColor = color;
  }
`

const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'

/**
 * Creates a ShaderMaterial that transitions from a wireframe hologram grid
 * to a fully textured earth globe.
 *
 * @param progress 0 → 1 representing how built-up the globe is.
 *                 Typically maps linearly from -12000 (0) to -3500 (1).
 */
export function usePrehistoryMaterial(progress: number): any | null {
  const materialRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const startTimeRef = useRef(Date.now())

  // Create material once
  useEffect(() => {
    let cancelled = false

    async function init() {
      const THREE = await import('three')
      const loader = new THREE.TextureLoader()

      const nightTex = await new Promise<any>((resolve, reject) =>
        loader.load(NIGHT_TEXTURE_URL, resolve, undefined, reject)
      )

      if (cancelled) {
        nightTex.dispose()
        return
      }

      const material = new THREE.ShaderMaterial({
        uniforms: {
          nightTexture: { value: nightTex },
          progress: { value: progress },
          time: { value: 0 },
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

  // Update progress + time uniforms
  useEffect(() => {
    if (!ready || !materialRef.current) return

    materialRef.current.uniforms.progress.value = progress
  }, [progress, ready])

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
