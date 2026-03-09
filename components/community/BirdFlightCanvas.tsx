'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

/**
 * BirdFlightCanvas — First-person aerial bird POV soaring through open sky.
 *
 * Creates an optical illusion of soaring forward through scattered particles
 * (clouds, light motes, atmospheric haze) with:
 *   - Subtle warp/tunnel vignette at the edges
 *   - Wind gust bursts that streak particles sideways
 *   - Mouse-interactive banking (look where you steer)
 *   - Depth-fog that dissolves into the distance
 *
 * Pure aerial perspective — no ground or landscape features.
 * Designed to sit behind the ProjectsPhilosophy hero and fade out on scroll.
 */

// ── Config ───────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 1400
const FIELD_DEPTH = 300
const FIELD_SPREAD = 120
const FLY_SPEED = 0.45
const WIND_GUST_INTERVAL = 3500 // ms between gusts
const WIND_GUST_DURATION = 1200

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
    // Normalise to -1..1
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Scene ─────────────────────────────────────────────────────────────

    const scene = new THREE.Scene()

    // Fog — gives that atmospheric depth-fade
    const fogColor = new THREE.Color('#8db5c7') // cool sky blue, blends with any theme
    scene.fog = new THREE.FogExp2(fogColor, 0.012)
    scene.background = null // transparent — page bg shows through

    // ── Camera ────────────────────────────────────────────────────────────

    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(72, aspect, 0.1, FIELD_DEPTH + 50)
    camera.position.set(0, 0, 0)
    camera.lookAt(0, 0, -1)

    // ── Renderer ──────────────────────────────────────────────────────────

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // perf
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ── Particles — mixed cloud puffs, leaf-like bits, light motes ──────

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const alphas = new Float32Array(PARTICLE_COUNT)
    const types = new Float32Array(PARTICLE_COUNT) // 0=mote, 1=leaf, 2=cloud wisp

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3] = randRange(-FIELD_SPREAD, FIELD_SPREAD)
      positions[i3 + 1] = randRange(-FIELD_SPREAD * 0.6, FIELD_SPREAD * 0.6)
      positions[i3 + 2] = randRange(-FIELD_DEPTH, 10)

      const type = Math.random()
      if (type < 0.55) {
        // Light motes — small atmospheric particles
        types[i] = 0
        sizes[i] = randRange(1.5, 4)
        alphas[i] = randRange(0.15, 0.5)
      } else if (type < 0.82) {
        // Haze wisps — medium atmospheric haze
        types[i] = 1
        sizes[i] = randRange(4, 9)
        alphas[i] = randRange(0.08, 0.25)
      } else {
        // Cloud puffs — large, faint
        types[i] = 2
        sizes[i] = randRange(14, 35)
        alphas[i] = randRange(0.03, 0.1)
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    // Custom shader for soft round particles with per-vertex alpha
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#c8dce8') },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        varying float vDist;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float dist = -mvPosition.z;
          gl_PointSize = size * (180.0 / dist);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = alpha;
          vDist = dist;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uTime;
        varying float vAlpha;
        varying float vDist;
        void main() {
          // Soft circle
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float softEdge = 1.0 - smoothstep(0.25, 0.5, d);

          // Distance fade
          float distFade = 1.0 - smoothstep(40.0, 280.0, vDist);

          gl_FragColor = vec4(uColor, vAlpha * softEdge * distFade);
        }
      `,
    })

    const particles = new THREE.Points(geometry, particleMaterial)
    scene.add(particles)

    // ── Wind streak lines — thin geometry streaks for gust effect ────────

    const streakCount = 60
    const streakGeo = new THREE.BufferGeometry()
    const streakPositions = new Float32Array(streakCount * 6) // 2 verts per line
    const streakAlphas = new Float32Array(streakCount * 2)

    for (let i = 0; i < streakCount; i++) {
      const x = randRange(-FIELD_SPREAD * 0.8, FIELD_SPREAD * 0.8)
      const y = randRange(-FIELD_SPREAD * 0.4, FIELD_SPREAD * 0.4)
      const z = randRange(-FIELD_DEPTH * 0.7, -10)
      const len = randRange(3, 10)
      const i6 = i * 6
      streakPositions[i6] = x
      streakPositions[i6 + 1] = y
      streakPositions[i6 + 2] = z
      streakPositions[i6 + 3] = x + len
      streakPositions[i6 + 4] = y + randRange(-0.5, 0.5)
      streakPositions[i6 + 5] = z
      streakAlphas[i * 2] = 0
      streakAlphas[i * 2 + 1] = 0
    }

    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3))
    streakGeo.setAttribute('alpha', new THREE.BufferAttribute(streakAlphas, 1))

    const streakMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#e0eef5') },
        uGustStrength: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float alpha;
        varying float vAlpha;
        uniform float uGustStrength;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = alpha * uGustStrength;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha * 0.35);
        }
      `,
    })

    const streaks = new THREE.LineSegments(streakGeo, streakMaterial)
    scene.add(streaks)

    // ── Warp ring lines — subtle concentric rings for tunnel feel ────────

    const ringGroup = new THREE.Group()
    const ringCount = 18
    for (let i = 0; i < ringCount; i++) {
      const z = -15 - i * (FIELD_DEPTH / ringCount)
      const radius = 30 + i * 4
      const ringGeo = new THREE.RingGeometry(radius - 0.3, radius, 64)
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#a0c4d4'),
        transparent: true,
        opacity: 0.015 - i * 0.0006,
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
    let gustActive = false
    let gustTimer = 0
    let gustDir = 1
    let gustProgress = 0

    // Wind gust scheduler
    const gustInterval = setInterval(() => {
      gustActive = true
      gustTimer = 0
      gustDir = Math.random() > 0.5 ? 1 : -1
    }, WIND_GUST_INTERVAL)

    // ── Animate ─────────────────────────────────────────────────────────

    const clock = new THREE.Clock()

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      time += delta

      // Smooth mouse follow (bird banking)
      const sm = smoothMouseRef.current
      const m = mouseRef.current
      sm.x = lerp(sm.x, m.x, 0.03)
      sm.y = lerp(sm.y, m.y, 0.03)

      // Tilt camera based on mouse — like a bird banking
      camera.rotation.z = -sm.x * 0.08
      camera.rotation.x = sm.y * 0.05
      camera.rotation.y = -sm.x * 0.12

      // Wind gust handling
      if (gustActive) {
        gustTimer += delta * 1000
        gustProgress = gustTimer / WIND_GUST_DURATION
        if (gustProgress >= 1) {
          gustActive = false
          gustProgress = 0
        }
      }
      const gustStrength = gustActive
        ? Math.sin(gustProgress * Math.PI) // ease in-out
        : 0

      streakMaterial.uniforms.uGustStrength.value = gustStrength

      // Update streak alphas for gust visibility
      const sAlphas = streakGeo.attributes.alpha as THREE.BufferAttribute
      for (let i = 0; i < streakCount; i++) {
        sAlphas.array[i * 2] = gustStrength * randRange(0.3, 1.0)
        sAlphas.array[i * 2 + 1] = gustStrength * randRange(0.1, 0.5)
      }
      sAlphas.needsUpdate = true

      // Move particles toward camera (flying forward illusion)
      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3

        // Forward motion — particles rush toward camera
        posAttr.array[i3 + 2] += FLY_SPEED * (1 + sizes[i] * 0.03)

        // Gentle sway (organic, bird-like drift)
        posAttr.array[i3] += Math.sin(time * 0.3 + i * 0.1) * 0.02
        posAttr.array[i3 + 1] += Math.cos(time * 0.2 + i * 0.07) * 0.015

        // Wind gust push
        if (gustStrength > 0) {
          posAttr.array[i3] += gustDir * gustStrength * 0.4 * (sizes[i] > 10 ? 0.3 : 1)
          posAttr.array[i3 + 1] += gustStrength * 0.08 * Math.sin(i)
        }

        // Mouse-reactive parallax — particles shift opposite to mouse (depth illusion)
        posAttr.array[i3] -= sm.x * 0.06 * (sizes[i] > 10 ? 0.15 : 0.5)
        posAttr.array[i3 + 1] += sm.y * 0.04 * (sizes[i] > 10 ? 0.15 : 0.5)

        // Recycle particles that pass the camera
        if (posAttr.array[i3 + 2] > 15) {
          posAttr.array[i3] = randRange(-FIELD_SPREAD, FIELD_SPREAD)
          posAttr.array[i3 + 1] = randRange(-FIELD_SPREAD * 0.6, FIELD_SPREAD * 0.6)
          posAttr.array[i3 + 2] = -FIELD_DEPTH + randRange(-10, 10)
        }
      }
      posAttr.needsUpdate = true

      // Warp rings — subtle pulse and drift
      ringGroup.children.forEach((ring, idx) => {
        ring.position.z += FLY_SPEED * 0.6
        if (ring.position.z > 5) {
          ring.position.z = -FIELD_DEPTH + idx * 2
        }
        // Gentle scale pulse
        const pulse = 1 + Math.sin(time * 0.8 + idx * 0.5) * 0.02
        ring.scale.set(pulse, pulse, 1)
      })

      particleMaterial.uniforms.uTime.value = time

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
      clearInterval(gustInterval)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      geometry.dispose()
      particleMaterial.dispose()
      streakGeo.dispose()
      streakMaterial.dispose()
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
