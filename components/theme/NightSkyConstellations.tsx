'use client'

import { useEffect, useRef, useState } from 'react'
import { useSkyTheme } from './SkyThemeProvider'

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  pulsePhase: number // Random starting phase for pulse animation
  isConstellation: boolean
  constellationId?: number
  color: [number, number, number] // RGB color for star temperature
}

interface Constellation {
  id: number
  name: string
  stars: number[] // indices of stars in this constellation
  connections: [number, number][] // pairs of star indices to connect
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
}

// Key stars that should be brighter/larger (by index)
// 7: Betelgeuse (Orion), 13: Rigel (Orion), 19: Regulus (Leo), 23: Denebola (Leo),
// 25: Deneb (Cygnus), 30: Vega (Lyra), 34: Antares (Scorpius), 40: Altair (Aquila),
// 45: Polaris (Ursa Minor - North Star), 52: Castor (Gemini), 53: Pollux (Gemini),
// 58: Aldebaran (Taurus), 63: Markab (Pegasus), 67: Mirach (Andromeda)
const keyStars = new Set([7, 13, 19, 23, 25, 30, 34, 40, 45, 52, 53, 58, 63, 67])

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
    name: 'Lyra',
    // Stars: Vega, Sulafat, Sheliak, Zeta Lyrae
    stars: [30, 31, 32, 33],
    // Parallelogram with Vega at top
    connections: [[30, 31], [31, 32], [32, 33], [33, 31]]
  },
  {
    id: 6,
    name: 'Scorpius',
    // Stars: Antares, Dschubba, Acrab, Shaula, Lesath, Lambda Sco
    stars: [34, 35, 36, 37, 38, 39],
    // Head: 35-36, Body curve: 35-34-39-38-37
    connections: [[35, 36], [35, 34], [34, 39], [39, 38], [38, 37]]
  },
  {
    id: 7,
    name: 'Aquila',
    // Stars: Altair, Tarazed, Alshain, Delta Aql, Lambda Aql
    stars: [40, 41, 42, 43, 44],
    // Main line through Altair: 41-40-42, Wings: 43-40-44
    connections: [[41, 40], [40, 42], [43, 40], [40, 44]]
  },
  {
    id: 8,
    name: 'Ursa Minor (Little Dipper)',
    // Stars: Polaris, Kochab, Pherkad, and handle stars
    stars: [45, 46, 47, 48, 49, 50, 51],
    // Bowl: 45-46-47-48-45, Handle: 48-49-50-51
    connections: [[45, 46], [46, 47], [47, 48], [48, 45], [48, 49], [49, 50], [50, 51]]
  },
  {
    id: 9,
    name: 'Gemini (The Twins)',
    // Stars: Castor, Pollux, and body stars
    stars: [52, 53, 54, 55, 56, 57],
    // Two parallel figures: Castor line and Pollux line
    connections: [[52, 54], [54, 56], [53, 55], [55, 57], [54, 55]]
  },
  {
    id: 10,
    name: 'Taurus (The Bull)',
    // Stars: Aldebaran, Elnath, and V-shape horns
    stars: [58, 59, 60, 61, 62],
    // V-shape with Aldebaran: 58-60-61-62-59-58
    connections: [[58, 60], [60, 61], [61, 62], [62, 59], [59, 58]]
  },
  {
    id: 11,
    name: 'Pegasus (The Great Square)',
    // Stars: Markab, Scheat, Algenib, Alpheratz
    stars: [63, 64, 65, 66],
    // Perfect square shape
    connections: [[63, 64], [64, 65], [65, 66], [66, 63]]
  },
  {
    id: 12,
    name: 'Andromeda',
    // Stars: Alpheratz (shared with Pegasus), Mirach, Almach, Delta And
    stars: [66, 67, 68, 69],
    // Line extending from Pegasus square
    connections: [[66, 67], [67, 68], [68, 69]]
  },
  {
    id: 13,
    name: 'Draco (The Dragon)',
    // Stars: head and winding body
    stars: [70, 71, 72, 73, 74, 75, 76],
    // Winding dragon shape
    connections: [[70, 71], [71, 72], [72, 73], [73, 74], [74, 75], [75, 76]]
  },
  {
    id: 14,
    name: 'Sagittarius (The Archer)',
    // Stars: teapot asterism
    stars: [77, 78, 79, 80, 81, 82, 83],
    // Teapot shape: spout, lid, handle
    connections: [[77, 78], [78, 79], [79, 80], [80, 81], [81, 82], [82, 83], [83, 77]]
  }
]

interface NightSkyConstellationsProps {
  alwaysShow?: boolean
  starCount?: number
}

export function NightSkyConstellations({ alwaysShow = false, starCount = 2200 }: NightSkyConstellationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeConstellation, setActiveConstellation] = useState<number | null>(null)
  const { currentPhase } = useSkyTheme()
  const animationFrameRef = useRef<number | undefined>(undefined)
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const lastShootingStarTimeRef = useRef(0)
  // Persist rotation start time across re-renders (set on client only)
  const rotationStartTimeRef = useRef<number>(0)

  // Initialize rotation start time on client only
  useEffect(() => {
    if (rotationStartTimeRef.current === 0) {
      rotationStartTimeRef.current = Date.now()
    }
  }, [])

  // Only show constellations during night phases (unless alwaysShow is true)
  const isNightTime = alwaysShow || ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

  useEffect(() => {
    if (!isNightTime) return

    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Generate stars
    const newStars: Star[] = []

    // Add constellation stars first (with accurate astronomical positions)
    // All constellations scaled to half size for better sky coverage
    const constellationStarPositions = [
      // Ursa Major (Big Dipper) - ladle shape, top left area (scaled to 50%)
      // 0: Dubhe, 1: Merak, 2: Phecda, 3: Megrez, 4: Alioth, 5: Mizar, 6: Alkaid
      { x: 16, y: 12 }, // Dubhe (top-right of bowl)
      { x: 16, y: 15 }, // Merak (bottom-right of bowl)
      { x: 13, y: 15 }, // Phecda (bottom-left of bowl)
      { x: 13, y: 12 }, // Megrez (top-left of bowl, joins handle)
      { x: 11, y: 11 }, // Alioth (first handle star)
      { x: 9, y: 12 },  // Mizar (middle handle)
      { x: 7, y: 13 },  // Alkaid (end of handle)

      // Orion - hunter shape, right side (scaled to 50%)
      // 7: Betelgeuse, 8: Bellatrix, 9: Alnitak, 10: Alnilam, 11: Mintaka, 12: Saiph, 13: Rigel
      { x: 74, y: 45 }, // Betelgeuse (left shoulder, red supergiant) - KEY STAR
      { x: 78, y: 45 }, // Bellatrix (right shoulder)
      { x: 75, y: 50 }, // Alnitak (left belt star)
      { x: 76, y: 50 }, // Alnilam (center belt star)
      { x: 77, y: 50 }, // Mintaka (right belt star)
      { x: 74.5, y: 55 }, // Saiph (left foot)
      { x: 77.5, y: 55 }, // Rigel (right foot, blue supergiant) - KEY STAR

      // Cassiopeia - W shape, top center (scaled to 50%)
      // 14: Schedar, 15: Caph, 16: Gamma Cas, 17: Ruchbah, 18: Segin
      { x: 46, y: 10 }, // Schedar
      { x: 48, y: 8 },  // Caph
      { x: 50, y: 11 }, // Gamma Cas (center of W)
      { x: 52, y: 8 },  // Ruchbah
      { x: 54, y: 10 }, // Segin

      // Leo - sickle (head) + triangle (body), center-left (scaled to 50%)
      // 19: Regulus, 20: Eta Leo, 21: Algieba, 22: Zosma, 23: Denebola, 24: Chertan
      { x: 32, y: 62 }, // Regulus (heart of lion) - KEY STAR
      { x: 31, y: 59 }, // Eta Leonis (top of sickle)
      { x: 33, y: 57 }, // Algieba (sickle curve)
      { x: 36, y: 60 }, // Zosma (back)
      { x: 38.5, y: 63 }, // Denebola (tail tip) - KEY STAR
      { x: 35, y: 63 }, // Chertan (hindquarter)

      // Cygnus (Northern Cross) - cross shape, upper center (scaled to 50%)
      // 25: Deneb, 26: Sadr, 27: Gienah, 28: Delta Cyg, 29: Albireo
      { x: 65, y: 22 }, // Deneb (top of cross, tail) - KEY STAR
      { x: 65, y: 26 }, // Sadr (center of cross)
      { x: 62.5, y: 26 }, // Gienah (left wing)
      { x: 67.5, y: 26 }, // Delta Cyg (right wing)
      { x: 65, y: 31 }, // Albireo (bottom, head of swan)

      // Lyra - parallelogram with bright Vega, top right (scaled to 50%)
      // 30: Vega, 31: Sulafat, 32: Sheliak, 33: Zeta Lyrae
      { x: 56, y: 23 }, // Vega (5th brightest star in sky) - KEY STAR
      { x: 57, y: 25.5 }, // Sulafat
      { x: 55.5, y: 27 }, // Sheliak
      { x: 54, y: 25.5 }, // Zeta Lyrae

      // Scorpius - curved scorpion tail, bottom right (scaled to 50%)
      // 34: Antares, 35: Dschubba, 36: Acrab, 37: Shaula, 38: Lesath, 39: Lambda Sco
      { x: 81, y: 73 }, // Antares (red heart of scorpion) - KEY STAR
      { x: 80, y: 70 }, // Dschubba (head)
      { x: 82, y: 70 }, // Acrab (head)
      { x: 87, y: 79 }, // Shaula (stinger tip)
      { x: 86, y: 77.5 }, // Lesath (near stinger)
      { x: 84, y: 75.5 }, // Lambda Sco (tail curve)

      // Aquila - eagle with Altair at center, center-right (scaled to 50%)
      // 40: Altair, 41: Tarazed, 42: Alshain, 43: Delta Aql, 44: Lambda Aql
      { x: 72, y: 43 }, // Altair (12th brightest star) - KEY STAR
      { x: 71.5, y: 41 }, // Tarazed (above Altair)
      { x: 72.5, y: 45 }, // Alshain (below Altair)
      { x: 70, y: 43 }, // Delta Aql (left wing)
      { x: 74, y: 43 }, // Lambda Aql (right wing)

      // Ursa Minor (Little Dipper) - smaller dipper near Polaris, top center-left (NEW)
      // 45: Polaris, 46: Kochab, 47: Pherkad, 48, 49, 50, 51: handle stars
      { x: 18, y: 8 },  // Polaris (North Star) - KEY STAR
      { x: 20, y: 10 }, // Kochab
      { x: 22, y: 10 }, // Pherkad
      { x: 21, y: 12 }, // Bowl connector
      { x: 20, y: 10.5 }, // Handle start
      { x: 19, y: 9.5 },  // Handle mid
      { x: 18, y: 8 },  // Back to Polaris

      // Gemini (The Twins) - parallel figures, upper left (NEW)
      // 52: Castor, 53: Pollux, 54-57: body stars
      { x: 22, y: 38 }, // Castor (head of twin 1) - KEY STAR
      { x: 25, y: 38 }, // Pollux (head of twin 2) - KEY STAR
      { x: 22, y: 42 }, // Castor body
      { x: 25, y: 42 }, // Pollux body
      { x: 22, y: 46 }, // Castor feet
      { x: 25, y: 46 }, // Pollux feet

      // Taurus (The Bull) - V-shaped horns with Aldebaran, center-left (NEW)
      // 58: Aldebaran, 59-62: horn stars
      { x: 38, y: 35 }, // Aldebaran (red eye) - KEY STAR
      { x: 42, y: 32 }, // Elnath (horn tip 1)
      { x: 40, y: 33 }, // V-shape point 1
      { x: 38, y: 35 }, // Center (Aldebaran)
      { x: 36, y: 37 }, // V-shape point 2

      // Pegasus (The Great Square) - perfect square, center (NEW)
      // 63: Markab, 64: Scheat, 65: Algenib, 66: Alpheratz
      { x: 43, y: 52 }, // Markab (bottom-right) - KEY STAR
      { x: 43, y: 48 }, // Scheat (top-right)
      { x: 47, y: 48 }, // Algenib (top-left)
      { x: 47, y: 52 }, // Alpheratz (bottom-left, shared with Andromeda)

      // Andromeda - extending from Pegasus, center-right (NEW)
      // 66: Alpheratz (shared), 67: Mirach, 68: Almach, 69: Delta And
      { x: 47, y: 52 }, // Alpheratz (shared with Pegasus)
      { x: 50, y: 54 }, // Mirach - KEY STAR
      { x: 53, y: 56 }, // Almach
      { x: 56, y: 58 }, // Delta And

      // Draco (The Dragon) - winding shape, top area (NEW)
      // 70-76: winding dragon body
      { x: 28, y: 6 },  // Dragon head
      { x: 32, y: 8 },  // Neck
      { x: 35, y: 12 }, // Body curve 1
      { x: 34, y: 16 }, // Body curve 2
      { x: 30, y: 18 }, // Body curve 3
      { x: 26, y: 16 }, // Body curve 4
      { x: 24, y: 12 }, // Tail

      // Sagittarius (The Archer/Teapot) - bottom center (NEW)
      // 77-83: teapot shape
      { x: 58, y: 82 }, // Teapot spout tip
      { x: 60, y: 80 }, // Spout base
      { x: 62, y: 78 }, // Pot body
      { x: 64, y: 76 }, // Pot body
      { x: 64, y: 80 }, // Lid
      { x: 66, y: 82 }, // Handle top
      { x: 66, y: 84 }, // Handle bottom
    ]

    // Helper function to get star color based on temperature
    const getStarColor = (): [number, number, number] => {
      const temp = Math.random()
      if (temp < 0.1) return [155, 176, 255] // Blue-white (hot)
      if (temp < 0.3) return [170, 191, 255] // Blue-white (hot)
      if (temp < 0.6) return [255, 244, 234] // White (medium)
      if (temp < 0.85) return [255, 248, 231] // Yellow-white (medium)
      return [255, 204, 111] // Orange (cool)
    }

    // Get specific star colors for famous stars
    const getKeyStarColor = (index: number): [number, number, number] => {
      // Betelgeuse (7), Antares (34), Aldebaran (58) are red supergiants
      if (index === 7 || index === 34 || index === 58) return [255, 100, 60]
      // Rigel (13), Regulus (19) are blue-white
      if (index === 13 || index === 19) return [170, 191, 255]
      // Vega (30), Deneb (25), Altair (40), Polaris (45) are white/blue-white
      if (index === 30 || index === 25 || index === 40 || index === 45) return [200, 220, 255]
      // Denebola (23) is white
      if (index === 23) return [255, 250, 245]
      // Castor (52) is blue-white
      if (index === 52) return [170, 191, 255]
      // Pollux (53) is orange-yellow
      if (index === 53) return [255, 200, 120]
      // Markab (63) is blue-white
      if (index === 63) return [180, 200, 255]
      // Mirach (67) is red-orange
      if (index === 67) return [255, 150, 90]
      return getStarColor()
    }

    constellationStarPositions.forEach((pos, index) => {
      const constellationId = constellations.findIndex(c => c.stars.includes(index))
      const isKeyStar = keyStars.has(index)
      newStars.push({
        x: (pos.x / 100) * canvas.width,
        y: (pos.y / 100) * canvas.height,
        // Key stars are larger (3-4px), regular constellation stars (1.5-2.5px)
        size: isKeyStar ? 3 + Math.random() * 1 : 1.5 + Math.random() * 1,
        // Key stars are brighter
        brightness: isKeyStar ? 0.95 + Math.random() * 0.05 : 0.8 + Math.random() * 0.15,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        isConstellation: true,
        constellationId,
        color: getKeyStarColor(index)
      })
    })

    // Add random background stars (densely packed and more visible)
    // Generate stars in a larger circular area to account for rotation
    // The diagonal of the screen determines how far stars need to extend
    const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
    const padding = diagonal * 1.0 // Extra padding beyond the diagonal for smooth rotation (full diagonal radius)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < starCount; i++) {
      // Create depth variation: smaller stars (far) to larger stars (near)
      const depthFactor = Math.random()
      // Smaller star sizes across the board
      const size = depthFactor < 0.8 ? 0.3 + Math.random() * 0.8 : 0.8 + Math.random() * 1.2

      // Generate stars in a circular area centered on screen
      // This ensures stars fill the view no matter the rotation angle
      // 30% of stars are biased toward the outer edges to fill empty space
      const isEdgeBiased = i < starCount * 0.3
      const angle = Math.random() * Math.PI * 2
      const radius = isEdgeBiased
        ? padding * 0.6 + Math.random() * padding * 0.4 // Outer 40% radius for edge stars
        : Math.random() * padding // Random radius for other stars
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      newStars.push({
        x,
        y,
        size, // Enhanced size variation for depth perception (0.5-5px)
        brightness: 0.3 + Math.random() * 0.7, // Wide brightness range
        twinkleSpeed: 0.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        isConstellation: false,
        color: getStarColor()
      })
    }

    setStars(newStars)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isNightTime, starCount])

  // Animation loop
  useEffect(() => {
    if (!isNightTime || stars.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0
    // 1 full rotation per 30 minutes = 360 degrees / 1800000 ms
    const rotationSpeed = 360 / (30 * 60 * 1000)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Calculate rotation angle based on real time elapsed (using persistent ref)
      const elapsedMs = Date.now() - rotationStartTimeRef.current
      const rotationAngle = (elapsedMs * rotationSpeed) % 360
      const rotationRadians = (rotationAngle * Math.PI) / 180

      // Shooting star management
      const currentTime = Date.now()
      const timeSinceLastShootingStar = currentTime - lastShootingStarTimeRef.current
      const activeShootingStars = shootingStarsRef.current.filter(s => s.active).length

      // Spawn new shooting star (random interval 3-8 seconds, max 3 at a time)
      if (activeShootingStars < 3 && timeSinceLastShootingStar > 3000 + Math.random() * 5000) {
        const angle = -Math.PI / 6 + (Math.random() - 0.5) * Math.PI / 4 // Slight downward angle
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4, // Upper portion of sky
          length: 60 + Math.random() * 80,
          speed: 8 + Math.random() * 6,
          angle,
          opacity: 0,
          active: true
        })
        lastShootingStarTimeRef.current = currentTime
      }

      // Update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        if (!star.active) return false

        // Fade in/out
        if (star.opacity < 1) {
          star.opacity += 0.05
        }

        // Move shooting star
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Deactivate if off screen
        if (star.x > canvas.width + 200 || star.y > canvas.height + 200 || star.x < -200 || star.y < -200) {
          star.active = false
          return false
        }

        // Gradually fade out near end of trajectory
        const distanceTraveled = Math.sqrt(Math.pow(star.x, 2) + Math.pow(star.y, 2))
        if (distanceTraveled > canvas.width * 0.8) {
          star.opacity -= 0.02
          if (star.opacity <= 0) {
            star.active = false
            return false
          }
        }

        return true
      })

      // Draw deep black space background (non-rotating base)
      const blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      blackGradient.addColorStop(0, 'rgba(0, 0, 5, 1)')
      blackGradient.addColorStop(0.7, 'rgba(0, 0, 10, 1)')
      blackGradient.addColorStop(1, 'rgba(5, 5, 15, 1)')
      ctx.fillStyle = blackGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply rotation for celestial objects (stars, Milky Way, nebulas)
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rotationRadians)
      // Expand drawing area to cover rotation overhang
      ctx.translate(-canvas.width / 2, -canvas.height / 2)

      // Draw Milky Way band - horizontal arched band across the sky
      // Main galactic band (horizontal with slight arch)
      const milkyCenterY = canvas.height * 0.45 // Slightly above center
      const bandHeight = canvas.height * 0.6 // Wider band for more stunning effect
      // Extend width to cover rotation (use diagonal + extra)
      const milkyDiagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
      const bandWidth = milkyDiagonal * 1.5
      const bandStartX = (canvas.width - bandWidth) / 2

      // Create vertical gradient for the main band
      const milkyWayGradient = ctx.createLinearGradient(0, milkyCenterY - bandHeight/2, 0, milkyCenterY + bandHeight/2)
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
      ctx.fillRect(bandStartX, milkyCenterY - bandHeight/2, bandWidth, bandHeight)

      // Galactic center - brighter concentrated region with enhanced opacity
      const galacticCenterX = canvas.width * 0.6
      const galacticCenterY = milkyCenterY
      const galacticRadius = canvas.width * 0.25
      const centerGradient = ctx.createRadialGradient(
        galacticCenterX, galacticCenterY, 0,
        galacticCenterX, galacticCenterY, galacticRadius
      )
      centerGradient.addColorStop(0, 'rgba(180, 160, 200, 0.35)')
      centerGradient.addColorStop(0.3, 'rgba(130, 120, 160, 0.22)')
      centerGradient.addColorStop(0.6, 'rgba(80, 90, 130, 0.12)')
      centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = centerGradient
      // Use arc instead of fillRect for circular galactic center
      ctx.beginPath()
      ctx.arc(galacticCenterX, galacticCenterY, galacticRadius, 0, Math.PI * 2)
      ctx.fill()

      // Add dark dust lanes (characteristic rifts in the Milky Way) - use circular gradients
      const dustLanes = [
        { x: canvas.width * 0.35, y: milkyCenterY - 30, radius: 120 },
        { x: canvas.width * 0.58, y: milkyCenterY + 40, radius: 100 },
        { x: canvas.width * 0.78, y: milkyCenterY - 10, radius: 90 }
      ]

      dustLanes.forEach(lane => {
        const dustGradient = ctx.createRadialGradient(
          lane.x, lane.y, 0,
          lane.x, lane.y, lane.radius
        )
        dustGradient.addColorStop(0, 'rgba(5, 8, 15, 0.3)')
        dustGradient.addColorStop(0.4, 'rgba(5, 8, 15, 0.15)')
        dustGradient.addColorStop(0.7, 'rgba(5, 8, 15, 0.05)')
        dustGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = dustGradient
        ctx.beginPath()
        ctx.arc(lane.x, lane.y, lane.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Enhanced nebula regions within the Milky Way - more purple/blue hints
      const nebulas = [
        { x: canvas.width * 0.35, y: milkyCenterY - 60, radius: 180, color: 'rgba(180, 140, 220, 0.08)' },
        { x: canvas.width * 0.65, y: milkyCenterY + 40, radius: 220, color: 'rgba(140, 160, 220, 0.07)' },
        { x: canvas.width * 0.8, y: milkyCenterY - 30, radius: 150, color: 'rgba(160, 150, 210, 0.06)' },
        { x: canvas.width * 0.45, y: milkyCenterY + 70, radius: 190, color: 'rgba(150, 140, 200, 0.05)' }
      ]

      nebulas.forEach(nebula => {
        const nebulaGradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        )
        nebulaGradient.addColorStop(0, nebula.color)
        nebulaGradient.addColorStop(0.5, nebula.color.replace(/[\d.]+\)$/, '0.02)'))
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = nebulaGradient
        // Use arc instead of fillRect for circular nebulas
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw stars - static (no animation for performance)
      stars.forEach((star, index) => {
        // Highlight constellation stars when hovered
        const isNearMouse = star.isConstellation &&
          activeConstellation === star.constellationId &&
          Math.abs(star.x - mousePos.x) < 100 &&
          Math.abs(star.y - mousePos.y) < 100

        const starColor = isNearMouse ? [255, 255, 255] : star.color
        // Add subtle twinkling animation
        const twinkle = 0.8 + 0.2 * Math.sin(time * star.twinkleSpeed + star.pulsePhase)
        // Boost brightness for better visibility and stunning galaxy effect
        const alpha = Math.min(1, star.brightness * 1.5 * twinkle)

        // Draw 4-point star shape
        ctx.save()
        ctx.translate(star.x, star.y)

        // Enhanced glow for better visibility with star color
        if (star.isConstellation) {
          ctx.shadowBlur = isNearMouse ? 15 : 10
          ctx.shadowColor = isNearMouse ? '#FFFFFF' : `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, 0.8)`
        } else {
          // Subtle glow for smaller stars
          ctx.shadowBlur = star.size > 1 ? 4 : 2
          ctx.shadowColor = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, 0.5)`
        }

        // Draw the 4-point star
        ctx.beginPath()
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI / 2) - Math.PI / 4 // 4 points at 45° intervals
          const outerRadius = star.size
          const innerRadius = star.size * 0.4

          // Outer point
          const outerX = Math.cos(angle) * outerRadius
          const outerY = Math.sin(angle) * outerRadius

          // Inner point (between outer points)
          const innerAngle = angle + Math.PI / 4
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

      // Draw constellation lines when hovering nearby (inside rotation context so they rotate with stars)
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

        // Draw constellation name
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

      // End rotation context (shooting stars and UI elements stay fixed)
      ctx.restore()

      // Light pollution from city below - orange/amber glow at bottom (non-rotating)
      const lightPollutionHeight = canvas.height * 0.4
      const pollutionGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - lightPollutionHeight)
      pollutionGradient.addColorStop(0, 'rgba(255, 140, 50, 0.15)')
      pollutionGradient.addColorStop(0.3, 'rgba(255, 160, 70, 0.08)')
      pollutionGradient.addColorStop(0.6, 'rgba(255, 180, 90, 0.03)')
      pollutionGradient.addColorStop(1, 'rgba(255, 200, 100, 0)')
      ctx.fillStyle = pollutionGradient
      ctx.fillRect(0, canvas.height - lightPollutionHeight, canvas.width, lightPollutionHeight)

      // Add localized light pollution hotspots (simulating cities)
      const cityLights = [
        { x: canvas.width * 0.25, intensity: 0.12 },
        { x: canvas.width * 0.5, intensity: 0.18 }, // Brightest - main city
        { x: canvas.width * 0.75, intensity: 0.10 }
      ]

      cityLights.forEach(city => {
        const cityGlow = ctx.createRadialGradient(
          city.x, canvas.height, 0,
          city.x, canvas.height, canvas.width * 0.3
        )
        cityGlow.addColorStop(0, `rgba(255, 160, 60, ${city.intensity})`)
        cityGlow.addColorStop(0.4, `rgba(255, 180, 80, ${city.intensity * 0.5})`)
        cityGlow.addColorStop(0.7, `rgba(255, 200, 100, ${city.intensity * 0.2})`)
        cityGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = cityGlow
        // Use arc instead of fillRect for circular city glow
        ctx.beginPath()
        ctx.arc(city.x, canvas.height, canvas.width * 0.3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw shooting stars
      shootingStarsRef.current.forEach(star => {
        if (!star.active) return

        ctx.save()

        // Draw glowing trail
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
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

        // Draw bright head
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [stars, mousePos, activeConstellation, isNightTime])

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })

    // Check if near any constellation
    let nearestConstellation: number | null = null
    let minDistance = Infinity

    constellations.forEach((constellation) => {
      constellation.stars.forEach((starIdx) => {
        const star = stars[starIdx]
        if (star) {
          const distance = Math.sqrt(
            Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2)
          )
          if (distance < 80 && distance < minDistance) {
            minDistance = distance
            nearestConstellation = constellation.id
          }
        }
      })
    })

    setActiveConstellation(nearestConstellation)
  }

  if (!isNightTime) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
      style={{
        background: 'transparent',
        cursor: activeConstellation !== null ? 'pointer' : 'default'
      }}
    />
  )
}
