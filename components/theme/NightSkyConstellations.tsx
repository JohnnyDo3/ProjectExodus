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

const constellations: Constellation[] = [
  {
    id: 0,
    name: 'Ursa Major (Big Dipper)',
    stars: [0, 1, 2, 3, 4, 5, 6],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]
  },
  {
    id: 1,
    name: 'Orion',
    stars: [7, 8, 9, 10, 11, 12, 13],
    connections: [[7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 7]]
  },
  {
    id: 2,
    name: 'Cassiopeia',
    stars: [14, 15, 16, 17, 18],
    connections: [[14, 15], [15, 16], [16, 17], [17, 18]]
  },
  {
    id: 3,
    name: 'Leo',
    stars: [19, 20, 21, 22, 23, 24],
    connections: [[19, 20], [20, 21], [21, 22], [22, 23], [23, 24], [24, 19]]
  },
  {
    id: 4,
    name: 'Cygnus (Northern Cross)',
    stars: [25, 26, 27, 28, 29],
    connections: [[25, 27], [26, 28], [27, 29]]
  },
  {
    id: 5,
    name: 'Lyra',
    stars: [30, 31, 32, 33],
    connections: [[30, 31], [31, 32], [32, 33], [33, 30]]
  },
  {
    id: 6,
    name: 'Scorpius',
    stars: [34, 35, 36, 37, 38, 39],
    connections: [[34, 35], [35, 36], [36, 37], [37, 38], [38, 39]]
  },
  {
    id: 7,
    name: 'Aquila',
    stars: [40, 41, 42, 43, 44],
    connections: [[40, 41], [41, 42], [42, 43], [43, 44]]
  }
]

interface NightSkyConstellationsProps {
  alwaysShow?: boolean
  starCount?: number
}

export function NightSkyConstellations({ alwaysShow = false, starCount = 1400 }: NightSkyConstellationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeConstellation, setActiveConstellation] = useState<number | null>(null)
  const { currentPhase } = useSkyTheme()
  const animationFrameRef = useRef<number | undefined>(undefined)
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const lastShootingStarTimeRef = useRef(0)
  // Persist rotation start time across re-renders
  const rotationStartTimeRef = useRef<number>(Date.now())

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

    // Add constellation stars first (with specific positions for formations)
    const constellationStarPositions = [
      // Ursa Major (Big Dipper) - top left
      { x: 15, y: 20 }, { x: 20, y: 18 }, { x: 25, y: 19 },
      { x: 28, y: 22 }, { x: 26, y: 26 }, { x: 22, y: 28 }, { x: 18, y: 26 },

      // Orion - right side
      { x: 75, y: 40 }, { x: 78, y: 45 }, { x: 80, y: 50 },
      { x: 78, y: 55 }, { x: 75, y: 58 }, { x: 72, y: 55 }, { x: 73, y: 50 },

      // Cassiopeia - top center
      { x: 45, y: 15 }, { x: 48, y: 18 }, { x: 52, y: 17 }, { x: 55, y: 20 }, { x: 58, y: 18 },

      // Leo - bottom left
      { x: 25, y: 70 }, { x: 30, y: 72 }, { x: 35, y: 70 },
      { x: 37, y: 75 }, { x: 33, y: 78 }, { x: 28, y: 76 },

      // Cygnus (Northern Cross) - upper center-right
      { x: 65, y: 22 }, { x: 60, y: 25 }, { x: 65, y: 28 }, { x: 70, y: 25 }, { x: 65, y: 32 },

      // Lyra - top right
      { x: 85, y: 18 }, { x: 88, y: 20 }, { x: 88, y: 24 }, { x: 85, y: 26 },

      // Scorpius - bottom right (curved)
      { x: 82, y: 68 }, { x: 78, y: 72 }, { x: 73, y: 75 }, { x: 68, y: 77 }, { x: 63, y: 78 }, { x: 58, y: 80 },

      // Aquila - center right
      { x: 88, y: 52 }, { x: 85, y: 55 }, { x: 82, y: 58 }, { x: 85, y: 61 }, { x: 88, y: 64 }
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

    constellationStarPositions.forEach((pos, index) => {
      const constellationId = constellations.findIndex(c => c.stars.includes(index))
      newStars.push({
        x: (pos.x / 100) * canvas.width,
        y: (pos.y / 100) * canvas.height,
        size: 1.5 + Math.random() * 1.5, // Smaller constellation stars (1.5-3px)
        brightness: 0.85 + Math.random() * 0.15, // Brighter constellation stars
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        isConstellation: true,
        constellationId,
        color: getStarColor()
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
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * padding
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

        const starColor = isNearMouse ? [255, 223, 0] : star.color
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
          ctx.shadowColor = isNearMouse ? '#FFD700' : `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, 0.8)`
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
        ctx.strokeStyle = 'rgba(255, 223, 0, 0.5)'
        ctx.lineWidth = 2
        ctx.shadowBlur = 10
        ctx.shadowColor = '#FFD700'

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
        ctx.fillStyle = 'rgba(255, 223, 0, 0.9)'
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
