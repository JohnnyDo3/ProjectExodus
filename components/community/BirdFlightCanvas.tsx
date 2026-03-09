'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

/**
 * BirdFlightCanvas — Stormy rainfall seen from below, laying on your back.
 *
 * Creates the perspective of looking straight up at a dark sky while rain
 * pours down toward you. Drops appear tiny at a vanishing point overhead,
 * then rush toward the camera — growing larger and spreading outward as
 * they fall past. Occasional lightning pulses illuminate the scene.
 *
 * Mouse-reactive: tilt your view to see rain shift with parallax.
 * Designed to sit behind the ProjectsPhilosophy hero and fade out on scroll.
 */

// ── Config ───────────────────────────────────────────────────────────────────

const DROP_COUNT = 900
const FIELD_DEPTH = 350
const FIELD_SPREAD = 80
const FALL_SPEED = 1.8
const SPLASH_COUNT = 60

// ── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// ── Component ────────────────────────────────────────────────────────────────

export function BirdFlightCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Scene ─────────────────────────────────────────────────────────────

    const scene = new THREE.Scene()

    // Stormy fog — dark, heavy atmosphere
    const fogColor = new THREE.Color('#2a3540')
    scene.fog = new THREE.FogExp2(fogColor, 0.005)
    scene.background = null // transparent — page bg shows through

    // ── Camera — looking straight up ──────────────────────────────────────

    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(85, aspect, 0.1, FIELD_DEPTH + 50)
    camera.position.set(0, 0, 0)
    // Looking up — rain falls toward us along -Z mapped to "overhead"
    camera.lookAt(0, 0, -1)

    // ── Renderer ──────────────────────────────────────────────────────────

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ── Raindrops — elongated streaks with perspective ────────────────────

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(DROP_COUNT * 3)
    const sizes = new Float32Array(DROP_COUNT)
    const alphas = new Float32Array(DROP_COUNT)
    const speeds = new Float32Array(DROP_COUNT)

    for (let i = 0; i < DROP_COUNT; i++) {
      const i3 = i * 3
      // Spread drops in a cone — tighter near the far point, wider near camera
      const depth = randRange(-FIELD_DEPTH, 10)
      const depthRatio = (depth + FIELD_DEPTH) / FIELD_DEPTH
      const spread = FIELD_SPREAD * depthRatio * 0.6 + 10
      positions[i3] = randRange(-spread, spread)
      positions[i3 + 1] = randRange(-spread * 0.7, spread * 0.7)
      positions[i3 + 2] = depth

      // Closer drops are larger and more visible
      const closeness = 1 - (depth + FIELD_DEPTH) / (FIELD_DEPTH + 10)
      sizes[i] = randRange(2, 6) + closeness * 8
      alphas[i] = randRange(0.15, 0.5) + closeness * 0.3
      speeds[i] = FALL_SPEED * randRange(0.7, 1.4)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    // Custom shader — elongated vertical streaks that look like rain
    const dropMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#b8d4e8') },
        uTime: { value: 0 },
        uFlash: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        varying float vDist;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float dist = -mvPosition.z;
          // Drops get larger as they approach
          gl_PointSize = size * (200.0 / max(dist, 1.0));
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = alpha;
          vDist = dist;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uFlash;
        varying float vAlpha;
        varying float vDist;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);

          // Elongated raindrop shape — stretched vertically
          float dx = uv.x * 3.0;
          float dy = uv.y * 1.0;
          float d = sqrt(dx * dx + dy * dy);
          if (d > 0.5) discard;

          float softEdge = 1.0 - smoothstep(0.15, 0.5, d);

          // Bright core streak down the center
          float coreStreak = exp(-abs(uv.x) * 12.0) * softEdge;

          // Distance fade
          float distFade = 1.0 - smoothstep(40.0, 350.0, vDist);

          // Lightning flash boost
          float flash = 1.0 + uFlash * 2.5;

          float finalAlpha = (vAlpha * softEdge * 0.6 + coreStreak * 0.5) * distFade * flash;
          vec3 color = uColor + vec3(coreStreak * 0.3) + vec3(uFlash * 0.4);

          gl_FragColor = vec4(color, finalAlpha);
        }
      `,
    })

    const drops = new THREE.Points(geometry, dropMaterial)
    scene.add(drops)

    // ── Splash particles — brief bursts where drops "hit" near camera ────

    const splashGeo = new THREE.BufferGeometry()
    const splashPositions = new Float32Array(SPLASH_COUNT * 3)
    const splashAlphas = new Float32Array(SPLASH_COUNT)
    const splashSizes = new Float32Array(SPLASH_COUNT)
    const splashLife = new Float32Array(SPLASH_COUNT) // 0 = dead, >0 = alive

    for (let i = 0; i < SPLASH_COUNT; i++) {
      splashPositions[i * 3] = 0
      splashPositions[i * 3 + 1] = 0
      splashPositions[i * 3 + 2] = -999 // hidden
      splashAlphas[i] = 0
      splashSizes[i] = 0
      splashLife[i] = 0
    }

    splashGeo.setAttribute('position', new THREE.BufferAttribute(splashPositions, 3))
    splashGeo.setAttribute('alpha', new THREE.BufferAttribute(splashAlphas, 1))
    splashGeo.setAttribute('size', new THREE.BufferAttribute(splashSizes, 1))

    const splashMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#cde4f0') },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float dist = -mvPosition.z;
          gl_PointSize = size * (120.0 / max(dist, 1.0));
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = alpha;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          // Expanding ring shape
          float ring = smoothstep(0.3, 0.4, d) * (1.0 - smoothstep(0.4, 0.5, d));
          float dot = 1.0 - smoothstep(0.0, 0.2, d);
          float shape = ring * 0.7 + dot * 0.3;
          gl_FragColor = vec4(uColor, vAlpha * shape);
        }
      `,
    })

    const splashes = new THREE.Points(splashGeo, splashMaterial)
    scene.add(splashes)

    // ── Depth rings — concentric rings overhead for tunnel/vortex feel ────

    const ringGroup = new THREE.Group()
    const ringCount = 14
    for (let i = 0; i < ringCount; i++) {
      const z = -20 - i * (FIELD_DEPTH / ringCount)
      const radius = 8 + i * 6
      const ringGeo = new THREE.RingGeometry(radius - 0.2, radius, 64)
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#5a7a8f'),
        transparent: true,
        opacity: 0.025 - i * 0.001,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.z = z
      ringGroup.add(ring)
    }
    scene.add(ringGroup)

    // ── Animation state ─────────────────────────────────────────────────

    let time = 0
    let nextSplash = 0
    let flashTimer = 0
    let flashActive = false
    let nextFlashTime = randRange(4, 9)

    // ── Animate ─────────────────────────────────────────────────────────

    const clock = new THREE.Clock()

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      time += delta

      // Smooth mouse follow
      const sm = smoothMouseRef.current
      const m = mouseRef.current
      sm.x = lerp(sm.x, m.x, 0.03)
      sm.y = lerp(sm.y, m.y, 0.03)

      // Subtle camera tilt from mouse — looking around while laying down
      camera.rotation.z = -sm.x * 0.06
      camera.rotation.x = sm.y * 0.04
      camera.rotation.y = -sm.x * 0.08

      // Lightning flash
      if (time > nextFlashTime && !flashActive) {
        flashActive = true
        flashTimer = 0
        nextFlashTime = time + randRange(5, 14)
      }
      if (flashActive) {
        flashTimer += delta
        // Quick double-flash pattern
        const t = flashTimer
        let flash = 0
        if (t < 0.06) flash = 1.0
        else if (t < 0.12) flash = 0.1
        else if (t < 0.18) flash = 0.6
        else if (t < 0.3) flash = Math.max(0, 0.6 - (t - 0.18) * 5)
        else flashActive = false
        dropMaterial.uniforms.uFlash.value = flash
      } else {
        dropMaterial.uniforms.uFlash.value = 0
      }

      // Move raindrops toward camera (falling toward viewer)
      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < DROP_COUNT; i++) {
        const i3 = i * 3

        // Fall toward camera
        posAttr.array[i3 + 2] += speeds[i] * (1 + sizes[i] * 0.02)

        // Slight lateral drift — wind
        posAttr.array[i3] += Math.sin(time * 0.5 + i * 0.3) * 0.03
        posAttr.array[i3 + 1] += Math.cos(time * 0.4 + i * 0.2) * 0.02

        // Radial spread as drops get closer — perspective expansion
        const z = posAttr.array[i3 + 2]
        if (z > -50) {
          const pushFactor = (z + 50) / 50
          const angle = Math.atan2(posAttr.array[i3 + 1], posAttr.array[i3])
          posAttr.array[i3] += Math.cos(angle) * pushFactor * 0.15
          posAttr.array[i3 + 1] += Math.sin(angle) * pushFactor * 0.15
        }

        // Mouse-reactive parallax — rain shifts as you look around
        posAttr.array[i3] -= sm.x * 0.04 * (sizes[i] > 8 ? 0.2 : 0.5)
        posAttr.array[i3 + 1] += sm.y * 0.03 * (sizes[i] > 8 ? 0.2 : 0.5)

        // Recycle drops that pass the camera — spawn them far away again
        if (posAttr.array[i3 + 2] > 12) {
          const depth = -FIELD_DEPTH + randRange(-20, 20)
          const depthRatio = (depth + FIELD_DEPTH) / FIELD_DEPTH
          const spread = FIELD_SPREAD * depthRatio * 0.6 + 10
          posAttr.array[i3] = randRange(-spread, spread)
          posAttr.array[i3 + 1] = randRange(-spread * 0.7, spread * 0.7)
          posAttr.array[i3 + 2] = depth

          // Trigger splash at camera plane
          if (nextSplash < SPLASH_COUNT) {
            const si = nextSplash * 3
            const spa = splashGeo.attributes.position as THREE.BufferAttribute
            spa.array[si] = posAttr.array[i3] * 0.3
            spa.array[si + 1] = posAttr.array[i3 + 1] * 0.3
            spa.array[si + 2] = randRange(-5, 5)
            splashLife[nextSplash] = 1.0
            ;(splashGeo.attributes.size as THREE.BufferAttribute).array[nextSplash] = randRange(4, 12)
            spa.needsUpdate = true
            nextSplash = (nextSplash + 1) % SPLASH_COUNT
          }
        }
      }
      posAttr.needsUpdate = true

      // Update splash particles — expand and fade
      const splashPosAttr = splashGeo.attributes.position as THREE.BufferAttribute
      const splashAlphaAttr = splashGeo.attributes.alpha as THREE.BufferAttribute
      const splashSizeAttr = splashGeo.attributes.size as THREE.BufferAttribute
      for (let i = 0; i < SPLASH_COUNT; i++) {
        if (splashLife[i] > 0) {
          splashLife[i] -= delta * 2.5
          splashAlphaAttr.array[i] = Math.max(0, splashLife[i] * 0.4)
          splashSizeAttr.array[i] += delta * 20
          if (splashLife[i] <= 0) {
            splashPosAttr.array[i * 3 + 2] = -999 // hide
          }
        }
      }
      splashAlphaAttr.needsUpdate = true
      splashSizeAttr.needsUpdate = true
      splashPosAttr.needsUpdate = true

      // Depth rings — subtle drift and pulse
      ringGroup.children.forEach((ring, idx) => {
        ring.position.z += FALL_SPEED * 0.3
        if (ring.position.z > 5) {
          ring.position.z = -FIELD_DEPTH + idx * 2
        }
        const pulse = 1 + Math.sin(time * 0.6 + idx * 0.4) * 0.03
        ring.scale.set(pulse, pulse, 1)
      })

      dropMaterial.uniforms.uTime.value = time

      renderer.render(scene, camera)
    }

    animate()

    // ── Mouse listener ──────────────────────────────────────────────────

    window.addEventListener('mousemove', handleMouseMove)

    // ── Resize ──────────────────────────────────────────────────────────

    function handleResize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // ── Cleanup ─────────────────────────────────────────────────────────

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      geometry.dispose()
      dropMaterial.dispose()
      splashGeo.dispose()
      splashMaterial.dispose()
      ringGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          ;(child.material as THREE.Material).dispose()
        }
      })

      renderer.dispose()
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [handleMouseMove])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
