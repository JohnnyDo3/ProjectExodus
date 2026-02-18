'use client'

import { useEffect, useRef } from 'react'
import { useSkyTheme } from './SkyThemeProvider'

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  pulsePhase: number
  isConstellation: boolean
  constellationId?: number
  color: [number, number, number]
}

interface Constellation {
  id: number
  name: string
  stars: number[]
  connections: [number, number][]
}

interface ShootingStar {
  x: number
  y: number
  startX: number
  startY: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
}

// Key stars that should be brighter/larger (by index in the 58-star constellation array)
// 7: Betelgeuse (Orion), 13: Rigel (Orion), 19: Regulus (Leo), 23: Denebola (Leo),
// 25: Deneb (Cygnus), 30: Antares (Scorpius), 36: Polaris (Ursa Minor),
// 43: Castor (Gemini), 44: Pollux (Gemini), 49: Aldebaran (Taurus), 54: Markab (Pegasus)
const keyStars = new Set([7, 13, 19, 23, 25, 30, 36, 43, 44, 49, 54])

const constellations: Constellation[] = [
  {
    id: 0,
    name: 'Ursa Major (Big Dipper)',
    // Stars: Dubhe, Merak, Phecda, Megrez, Alioth, Mizar, Alkaid
    stars: [0, 1, 2, 3, 4, 5, 6],
    // Bowl: Dubhe-Merak-Phecda-Megrez-Dubhe, Handle: Megrez-Alioth-Mizar-Alkaid
    connections: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]]
  },
  {
    id: 1,
    name: 'Orion',
    // Stars: Betelgeuse, Bellatrix, Alnitak, Alnilam, Mintaka, Saiph, Rigel
    stars: [7, 8, 9, 10, 11, 12, 13],
    // Shoulders: 7-8, Belt: 9-10-11, Body: shoulder to belt to feet
    connections: [[7, 8], [9, 10], [10, 11], [7, 9], [8, 11], [9, 12], [11, 13]]
  },
  {
    id: 2,
    name: 'Cassiopeia',
    // Stars form W shape: Schedar, Caph, Gamma, Ruchbah, Segin
    stars: [14, 15, 16, 17, 18],
    connections: [[14, 15], [15, 16], [16, 17], [17, 18]]
  },
  {
    id: 3,
    name: 'Leo',
    // Stars: Regulus, Eta Leo, Algieba, Zosma, Denebola, Chertan
    stars: [19, 20, 21, 22, 23, 24],
    // Sickle (head): 19-20-21, Body/hindquarters: 19-24-22-23
    connections: [[19, 20], [20, 21], [19, 24], [24, 22], [22, 23]]
  },
  {
    id: 4,
    name: 'Cygnus (Northern Cross)',
    // Stars: Deneb, Sadr, Gienah, Delta Cyg, Albireo
    stars: [25, 26, 27, 28, 29],
    // Cross shape: vertical 25-26-29, horizontal 27-26-28
    connections: [[25, 26], [26, 29], [27, 26], [26, 28]]
  },
  {
    id: 5,
    name: 'Scorpius',
    // Stars: Antares, Dschubba, Acrab, Shaula, Lesath, Lambda Sco
    stars: [30, 31, 32, 33, 34, 35],
    // Head: 31-32, Body curve: 31-30-35-34-33
    connections: [[31, 32], [31, 30], [30, 35], [35, 34], [34, 33]]
  },
  {
    id: 6,
    name: 'Ursa Minor (Little Dipper)',
    // Stars: Polaris, Kochab, Pherkad, bowl connector, and handle stars
    stars: [36, 37, 38, 39, 40, 41, 42],
    // Bowl: 36-37-38-39-36, Handle: 39-40-41-42
    connections: [[36, 37], [37, 38], [38, 39], [39, 36], [39, 40], [40, 41], [41, 42]]
  },
  {
    id: 7,
    name: 'Gemini (The Twins)',
    // Stars: Castor, Pollux, and body stars
    stars: [43, 44, 45, 46, 47, 48],
    // Two parallel figures: Castor line and Pollux line, connected at body
    connections: [[43, 45], [45, 47], [44, 46], [46, 48], [45, 46]]
  },
  {
    id: 8,
    name: 'Taurus (The Bull)',
    // Stars: Aldebaran, Elnath, and V-shape face
    stars: [49, 50, 51, 52, 53],
    // V-shape: Aldebaran-upper right-Elnath, Aldebaran-lower left-horn tip
    connections: [[49, 51], [51, 50], [49, 52], [52, 53]]
  },
  {
    id: 9,
    name: 'Pegasus (The Great Square)',
    // Stars: Markab, Scheat, Algenib, Alpheratz
    stars: [54, 55, 56, 57],
    // Perfect square shape
    connections: [[54, 55], [55, 56], [56, 57], [57, 54]]
  }
]

// Constellation star positions as percentages (0-100) of viewport
const constellationPositions = [
  // Ursa Major (Big Dipper) - top left area
  // 0: Dubhe, 1: Merak, 2: Phecda, 3: Megrez, 4: Alioth, 5: Mizar, 6: Alkaid
  { x: 16, y: 12 },   // Dubhe (top-right of bowl)
  { x: 16, y: 15 },   // Merak (bottom-right of bowl)
  { x: 13, y: 15 },   // Phecda (bottom-left of bowl)
  { x: 13, y: 12 },   // Megrez (top-left of bowl, joins handle)
  { x: 11, y: 11 },   // Alioth (first handle star)
  { x: 9, y: 12 },    // Mizar (middle handle)
  { x: 7, y: 13 },    // Alkaid (end of handle)

  // Orion - right side
  // 7: Betelgeuse, 8: Bellatrix, 9: Alnitak, 10: Alnilam, 11: Mintaka, 12: Saiph, 13: Rigel
  { x: 74, y: 45 },   // Betelgeuse (left shoulder, red supergiant) - KEY STAR
  { x: 78, y: 45 },   // Bellatrix (right shoulder)
  { x: 75, y: 50 },   // Alnitak (left belt star)
  { x: 76, y: 50 },   // Alnilam (center belt star)
  { x: 77, y: 50 },   // Mintaka (right belt star)
  { x: 74.5, y: 55 }, // Saiph (left foot)
  { x: 77.5, y: 55 }, // Rigel (right foot, blue supergiant) - KEY STAR

  // Cassiopeia - W shape, top center
  // 14: Schedar, 15: Caph, 16: Gamma Cas, 17: Ruchbah, 18: Segin
  { x: 46, y: 10 },   // Schedar
  { x: 48, y: 8 },    // Caph
  { x: 50, y: 11 },   // Gamma Cas (center of W)
  { x: 52, y: 8 },    // Ruchbah
  { x: 54, y: 10 },   // Segin

  // Leo - center-left
  // 19: Regulus, 20: Eta Leo, 21: Algieba, 22: Zosma, 23: Denebola, 24: Chertan
  { x: 32, y: 62 },   // Regulus (heart of lion) - KEY STAR
  { x: 31, y: 59 },   // Eta Leonis (top of sickle)
  { x: 33, y: 57 },   // Algieba (sickle curve)
  { x: 36, y: 60 },   // Zosma (back)
  { x: 38.5, y: 63 }, // Denebola (tail tip) - KEY STAR
  { x: 35, y: 63 },   // Chertan (hindquarter)

  // Cygnus (Northern Cross) - upper center
  // 25: Deneb, 26: Sadr, 27: Gienah, 28: Delta Cyg, 29: Albireo
  { x: 65, y: 22 },   // Deneb (top of cross, tail) - KEY STAR
  { x: 65, y: 26 },   // Sadr (center of cross)
  { x: 62.5, y: 26 }, // Gienah (left wing)
  { x: 67.5, y: 26 }, // Delta Cyg (right wing)
  { x: 65, y: 31 },   // Albireo (bottom, head of swan)

  // Scorpius - bottom right
  // 30: Antares, 31: Dschubba, 32: Acrab, 33: Shaula, 34: Lesath, 35: Lambda Sco
  { x: 81, y: 73 },   // Antares (red heart of scorpion) - KEY STAR
  { x: 80, y: 70 },   // Dschubba (head)
  { x: 82, y: 70 },   // Acrab (head)
  { x: 87, y: 79 },   // Shaula (stinger tip)
  { x: 86, y: 77.5 }, // Lesath (near stinger)
  { x: 84, y: 75.5 }, // Lambda Sco (tail curve)

  // Ursa Minor (Little Dipper) - near Polaris, top center-left
  // 36: Polaris, 37: Kochab, 38: Pherkad, 39-42: bowl/handle stars
  { x: 18, y: 8 },    // Polaris (North Star) - KEY STAR
  { x: 20, y: 10 },   // Kochab
  { x: 22, y: 10 },   // Pherkad
  { x: 21, y: 12 },   // Bowl connector
  { x: 20, y: 10.5 }, // Handle start
  { x: 19, y: 9.5 },  // Handle mid
  { x: 18.5, y: 8.5 }, // Handle end (Eta UMi)

  // Gemini (The Twins) - upper left
  // 43: Castor, 44: Pollux, 45-48: body stars
  { x: 22, y: 38 },   // Castor (head of twin 1) - KEY STAR
  { x: 25, y: 38 },   // Pollux (head of twin 2) - KEY STAR
  { x: 22, y: 42 },   // Castor body
  { x: 25, y: 42 },   // Pollux body
  { x: 22, y: 46 },   // Castor feet
  { x: 25, y: 46 },   // Pollux feet

  // Taurus (The Bull) - center-left, V-shape
  // 49: Aldebaran, 50: Elnath, 51-53: face stars
  { x: 38, y: 35 },   // Aldebaran (red eye) - KEY STAR
  { x: 42, y: 32 },   // Elnath (horn tip, right)
  { x: 40, y: 33 },   // V-shape upper right
  { x: 37, y: 37 },   // V-shape lower left
  { x: 35, y: 39 },   // Horn tip, left

  // Pegasus (The Great Square) - center
  // 54: Markab, 55: Scheat, 56: Algenib, 57: Alpheratz
  { x: 43, y: 52 },   // Markab (bottom-right) - KEY STAR
  { x: 43, y: 48 },   // Scheat (top-right)
  { x: 47, y: 48 },   // Algenib (top-left)
  { x: 47, y: 52 },   // Alpheratz (bottom-left)
]

function getStarColor(): [number, number, number] {
  const temp = Math.random()
  if (temp < 0.1) return [155, 176, 255]   // Blue-white (hot)
  if (temp < 0.3) return [170, 191, 255]   // Blue-white (hot)
  if (temp < 0.6) return [255, 244, 234]   // White (medium)
  if (temp < 0.85) return [255, 248, 231]  // Yellow-white (medium)
  return [255, 204, 111]                    // Orange (cool)
}

function getKeyStarColor(index: number): [number, number, number] {
  // Red supergiants
  if (index === 7 || index === 30 || index === 49) return [255, 100, 60]
  // Blue-white stars
  if (index === 13 || index === 19 || index === 43) return [170, 191, 255]
  // White/blue-white stars
  if (index === 25 || index === 36) return [200, 220, 255]
  // Denebola - warm white
  if (index === 23) return [255, 250, 245]
  // Pollux - orange-yellow
  if (index === 44) return [255, 200, 120]
  // Markab - blue-white
  if (index === 54) return [180, 200, 255]
  return getStarColor()
}

function generateStars(logicalWidth: number, logicalHeight: number, starCount: number): Star[] {
  const stars: Star[] = []

  // Add constellation stars with fixed percentage-based positions
  constellationPositions.forEach((pos, index) => {
    const constellationId = constellations.findIndex(c => c.stars.includes(index))
    const isKeyStar = keyStars.has(index)
    stars.push({
      x: (pos.x / 100) * logicalWidth,
      y: (pos.y / 100) * logicalHeight,
      size: isKeyStar ? 3 + Math.random() : 1.5 + Math.random(),
      brightness: isKeyStar ? 0.95 + Math.random() * 0.05 : 0.8 + Math.random() * 0.15,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
      pulsePhase: Math.random() * Math.PI * 2,
      isConstellation: true,
      constellationId,
      color: isKeyStar ? getKeyStarColor(index) : getStarColor()
    })
  })

  // Generate random background stars in a circular area for smooth rotation
  const diagonal = Math.sqrt(logicalWidth * logicalWidth + logicalHeight * logicalHeight)
  const padding = diagonal * 1.0
  const centerX = logicalWidth / 2
  const centerY = logicalHeight / 2

  for (let i = 0; i < starCount; i++) {
    const depthFactor = Math.random()
    // Size range: 0.3-1.1px (far, 80%) or 0.8-2.0px (near, 20%)
    const size = depthFactor < 0.8 ? 0.3 + Math.random() * 0.8 : 0.8 + Math.random() * 1.2

    // 30% biased toward outer edges to fill rotation gaps
    const isEdgeBiased = i < starCount * 0.3
    const angle = Math.random() * Math.PI * 2
    const radius = isEdgeBiased
      ? padding * 0.6 + Math.random() * padding * 0.4
      : Math.random() * padding

    stars.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      size,
      brightness: 0.3 + Math.random() * 0.7,
      twinkleSpeed: 0.5 + Math.random() * 2,
      pulsePhase: Math.random() * Math.PI * 2,
      isConstellation: false,
      color: getStarColor()
    })
  }

  return stars
}

interface NightSkyConstellationsProps {
  alwaysShow?: boolean
  starCount?: number
}

export function NightSkyConstellations({ alwaysShow = false, starCount = 3000 }: NightSkyConstellationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const nextShootingStarTimeRef = useRef(0)
  const rotationStartTimeRef = useRef<number>(0)
  const rotationAngleRef = useRef(0)
  const starsRef = useRef<Star[]>([])
  const dimensionsRef = useRef({ w: 0, h: 0 })
  const mousePosRef = useRef({ x: 0, y: 0 })
  const activeConstellationRef = useRef<number | null>(null)

  const { currentPhase } = useSkyTheme()
  const isNightTime = alwaysShow || ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

  // Initialize rotation start time on client only
  useEffect(() => {
    if (rotationStartTimeRef.current === 0) {
      rotationStartTimeRef.current = Date.now()
    }
  }, [])

  // Main effect: canvas setup, star generation, animation loop
  useEffect(() => {
    if (!isNightTime) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas with device pixel ratio for crisp rendering
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      return { dpr, w, h }
    }

    let { dpr, w, h } = setupCanvas()
    let stars = generateStars(w, h, starCount)
    starsRef.current = stars
    dimensionsRef.current = { w, h }

    const handleResize = () => {
      const result = setupCanvas()
      dpr = result.dpr
      w = result.w
      h = result.h
      stars = generateStars(w, h, starCount)
      starsRef.current = stars
      dimensionsRef.current = { w, h }
    }

    window.addEventListener('resize', handleResize)

    // Animation state
    let time = 0
    const rotationSpeed = 360 / (30 * 60 * 1000) // 1 full rotation per 30 minutes

    const animate = () => {
      // Apply DPR scaling, reset any prior transforms
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      time += 0.01

      // Calculate rotation
      const elapsedMs = Date.now() - rotationStartTimeRef.current
      const rotationAngle = (elapsedMs * rotationSpeed) % 360
      const rotationRadians = (rotationAngle * Math.PI) / 180
      rotationAngleRef.current = rotationRadians

      // Read interactive state from refs
      const activeConstellation = activeConstellationRef.current
      const mousePos = mousePosRef.current

      // --- Shooting star management ---
      const currentTime = Date.now()
      const activeShootingStars = shootingStarsRef.current.filter(s => s.active).length

      // Spawn on a fixed schedule (set next time on spawn, not random each frame)
      if (activeShootingStars < 3 && currentTime > nextShootingStarTimeRef.current) {
        const angle = -Math.PI / 6 + (Math.random() - 0.5) * Math.PI / 4
        const startX = Math.random() * w
        const startY = Math.random() * h * 0.4
        shootingStarsRef.current.push({
          x: startX,
          y: startY,
          startX,
          startY,
          length: 60 + Math.random() * 80,
          speed: 8 + Math.random() * 6,
          angle,
          opacity: 0,
          active: true
        })
        nextShootingStarTimeRef.current = currentTime + 3000 + Math.random() * 5000
      }

      // Update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        if (!star.active) return false

        if (star.opacity < 1) star.opacity += 0.05

        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Off-screen culling
        if (star.x > w + 200 || star.y > h + 200 || star.x < -200 || star.y < -200) {
          return false
        }

        // Fade out based on distance from spawn point
        const distanceTraveled = Math.sqrt(
          (star.x - star.startX) ** 2 + (star.y - star.startY) ** 2
        )
        if (distanceTraveled > w * 0.5) {
          star.opacity -= 0.02
          if (star.opacity <= 0) return false
        }

        return true
      })

      // --- Draw background ---
      const blackGradient = ctx.createLinearGradient(0, 0, 0, h)
      blackGradient.addColorStop(0, 'rgba(0, 0, 5, 1)')
      blackGradient.addColorStop(0.7, 'rgba(0, 0, 10, 1)')
      blackGradient.addColorStop(1, 'rgba(5, 5, 15, 1)')
      ctx.fillStyle = blackGradient
      ctx.fillRect(0, 0, w, h)

      // --- Begin rotation context for celestial objects ---
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.rotate(rotationRadians)
      ctx.translate(-w / 2, -h / 2)

      // --- Milky Way band ---
      const milkyCenterY = h * 0.45
      const bandHeight = h * 0.6
      const milkyDiagonal = Math.sqrt(w * w + h * h)
      const bandWidth = milkyDiagonal * 1.5
      const bandStartX = (w - bandWidth) / 2

      const milkyWayGradient = ctx.createLinearGradient(0, milkyCenterY - bandHeight / 2, 0, milkyCenterY + bandHeight / 2)
      milkyWayGradient.addColorStop(0, 'rgba(15, 20, 40, 0)')
      milkyWayGradient.addColorStop(0.2, 'rgba(40, 50, 80, 0.12)')
      milkyWayGradient.addColorStop(0.35, 'rgba(70, 80, 120, 0.25)')
      milkyWayGradient.addColorStop(0.45, 'rgba(90, 100, 140, 0.35)')
      milkyWayGradient.addColorStop(0.5, 'rgba(110, 120, 160, 0.42)')
      milkyWayGradient.addColorStop(0.55, 'rgba(90, 100, 140, 0.35)')
      milkyWayGradient.addColorStop(0.65, 'rgba(70, 80, 120, 0.25)')
      milkyWayGradient.addColorStop(0.8, 'rgba(40, 50, 80, 0.12)')
      milkyWayGradient.addColorStop(1, 'rgba(15, 20, 40, 0)')
      ctx.fillStyle = milkyWayGradient
      ctx.fillRect(bandStartX, milkyCenterY - bandHeight / 2, bandWidth, bandHeight)

      // Galactic center
      const galacticCenterX = w * 0.6
      const galacticRadius = w * 0.25
      const centerGradient = ctx.createRadialGradient(
        galacticCenterX, milkyCenterY, 0,
        galacticCenterX, milkyCenterY, galacticRadius
      )
      centerGradient.addColorStop(0, 'rgba(180, 160, 200, 0.35)')
      centerGradient.addColorStop(0.3, 'rgba(130, 120, 160, 0.22)')
      centerGradient.addColorStop(0.6, 'rgba(80, 90, 130, 0.12)')
      centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = centerGradient
      ctx.beginPath()
      ctx.arc(galacticCenterX, milkyCenterY, galacticRadius, 0, Math.PI * 2)
      ctx.fill()

      // Dark dust lanes
      const dustLanes = [
        { x: w * 0.35, y: milkyCenterY - 30, radius: 120 },
        { x: w * 0.58, y: milkyCenterY + 40, radius: 100 },
        { x: w * 0.78, y: milkyCenterY - 10, radius: 90 }
      ]
      dustLanes.forEach(lane => {
        const dustGradient = ctx.createRadialGradient(lane.x, lane.y, 0, lane.x, lane.y, lane.radius)
        dustGradient.addColorStop(0, 'rgba(5, 8, 15, 0.3)')
        dustGradient.addColorStop(0.4, 'rgba(5, 8, 15, 0.15)')
        dustGradient.addColorStop(0.7, 'rgba(5, 8, 15, 0.05)')
        dustGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = dustGradient
        ctx.beginPath()
        ctx.arc(lane.x, lane.y, lane.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Nebula regions
      const nebulas = [
        { x: w * 0.35, y: milkyCenterY - 60, radius: 180, color: 'rgba(180, 140, 220, 0.08)' },
        { x: w * 0.65, y: milkyCenterY + 40, radius: 220, color: 'rgba(140, 160, 220, 0.07)' },
        { x: w * 0.8, y: milkyCenterY - 30, radius: 150, color: 'rgba(160, 150, 210, 0.06)' },
        { x: w * 0.45, y: milkyCenterY + 70, radius: 190, color: 'rgba(150, 140, 200, 0.05)' }
      ]
      nebulas.forEach(nebula => {
        const nebulaGradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        nebulaGradient.addColorStop(0, nebula.color)
        nebulaGradient.addColorStop(0.5, nebula.color.replace(/[\d.]+\)$/, '0.02)'))
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = nebulaGradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- Draw stars ---
      stars.forEach(star => {
        const isHighlighted = star.isConstellation &&
          activeConstellation === star.constellationId

        const starColor = isHighlighted ? [255, 255, 255] : star.color
        const twinkle = 0.8 + 0.2 * Math.sin(time * star.twinkleSpeed + star.pulsePhase)
        const alpha = Math.min(1, star.brightness * 1.5 * twinkle)

        ctx.save()
        ctx.translate(star.x, star.y)

        // Glow effect
        if (star.isConstellation) {
          ctx.shadowBlur = isHighlighted ? 15 : 10
          ctx.shadowColor = isHighlighted ? '#FFFFFF' : `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, 0.8)`
        } else if (star.size > 1) {
          ctx.shadowBlur = 4
          ctx.shadowColor = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, 0.5)`
        }

        // Draw 4-point star shape
        ctx.beginPath()
        for (let i = 0; i < 4; i++) {
          const pointAngle = (i * Math.PI / 2) - Math.PI / 4
          const outerRadius = star.size
          const innerRadius = star.size * 0.4

          const outerX = Math.cos(pointAngle) * outerRadius
          const outerY = Math.sin(pointAngle) * outerRadius
          const innerAngle = pointAngle + Math.PI / 4
          const innerX = Math.cos(innerAngle) * innerRadius
          const innerY = Math.sin(innerAngle) * innerRadius

          if (i === 0) {
            ctx.moveTo(outerX, outerY)
          } else {
            ctx.lineTo(outerX, outerY)
          }
          ctx.lineTo(innerX, innerY)
        }
        ctx.closePath()

        ctx.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${alpha})`
        ctx.fill()
        ctx.restore()
      })

      // --- Draw constellation lines on hover ---
      if (activeConstellation !== null) {
        const constellation = constellations[activeConstellation]
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.shadowBlur = 10
        ctx.shadowColor = '#FFFFFF'

        constellation.connections.forEach(([startIdx, endIdx]) => {
          const start = stars[startIdx]
          const end = stars[endIdx]
          if (start && end) {
            ctx.beginPath()
            ctx.moveTo(start.x, start.y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()
          }
        })

        // Constellation name
        ctx.font = 'bold 20px sans-serif'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = 15
        ctx.textAlign = 'center'
        const firstStar = stars[constellation.stars[0]]
        if (firstStar) {
          ctx.fillText(constellation.name, firstStar.x, firstStar.y - 30)
        }
        ctx.shadowBlur = 0
      }

      // --- End rotation context ---
      ctx.restore()

      // --- Light pollution (non-rotating) ---
      const lightPollutionHeight = h * 0.4
      const pollutionGradient = ctx.createLinearGradient(0, h, 0, h - lightPollutionHeight)
      pollutionGradient.addColorStop(0, 'rgba(255, 140, 50, 0.15)')
      pollutionGradient.addColorStop(0.3, 'rgba(255, 160, 70, 0.08)')
      pollutionGradient.addColorStop(0.6, 'rgba(255, 180, 90, 0.03)')
      pollutionGradient.addColorStop(1, 'rgba(255, 200, 100, 0)')
      ctx.fillStyle = pollutionGradient
      ctx.fillRect(0, h - lightPollutionHeight, w, lightPollutionHeight)

      // City light hotspots
      const cityLights = [
        { x: w * 0.25, intensity: 0.12 },
        { x: w * 0.5, intensity: 0.18 },
        { x: w * 0.75, intensity: 0.10 }
      ]
      cityLights.forEach(city => {
        const cityGlow = ctx.createRadialGradient(city.x, h, 0, city.x, h, w * 0.3)
        cityGlow.addColorStop(0, `rgba(255, 160, 60, ${city.intensity})`)
        cityGlow.addColorStop(0.4, `rgba(255, 180, 80, ${city.intensity * 0.5})`)
        cityGlow.addColorStop(0.7, `rgba(255, 200, 100, ${city.intensity * 0.2})`)
        cityGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = cityGlow
        ctx.beginPath()
        ctx.arc(city.x, h, w * 0.3, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- Shooting stars (non-rotating) ---
      shootingStarsRef.current.forEach(star => {
        if (!star.active) return

        ctx.save()

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.9})`)
        gradient.addColorStop(0.3, `rgba(200, 220, 255, ${star.opacity * 0.6})`)
        gradient.addColorStop(0.7, `rgba(150, 180, 255, ${star.opacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(100, 150, 255, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.shadowBlur = 15
        ctx.shadowColor = `rgba(200, 220, 255, ${star.opacity * 0.8})`

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.shadowBlur = 20
        ctx.shadowColor = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isNightTime, starCount])

  // Document-level mouse move handler with rotation-aware hit detection
  // Uses document listener so hover works even when page content overlays the canvas
  useEffect(() => {
    if (!isNightTime) return

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const screenX = e.clientX - rect.left
      const screenY = e.clientY - rect.top

      mousePosRef.current = { x: screenX, y: screenY }

      // Inverse-rotate mouse coordinates to match star positions in pre-rotation space
      const { w, h } = dimensionsRef.current
      const angle = -rotationAngleRef.current
      const cx = w / 2
      const cy = h / 2
      const dx = screenX - cx
      const dy = screenY - cy
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const rotX = dx * cosA - dy * sinA + cx
      const rotY = dx * sinA + dy * cosA + cy

      // Find nearest constellation using rotation-corrected coordinates
      const stars = starsRef.current
      let nearestConstellation: number | null = null
      let minDistance = Infinity

      constellations.forEach(constellation => {
        constellation.stars.forEach(starIdx => {
          const star = stars[starIdx]
          if (star) {
            const distance = Math.sqrt((star.x - rotX) ** 2 + (star.y - rotY) ** 2)
            if (distance < 80 && distance < minDistance) {
              minDistance = distance
              nearestConstellation = constellation.id
            }
          }
        })
      })

      activeConstellationRef.current = nearestConstellation
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isNightTime])

  if (!isNightTime) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        background: 'transparent',
      }}
    />
  )
}
