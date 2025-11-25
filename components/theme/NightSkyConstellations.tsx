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
}

interface Constellation {
  id: number
  name: string
  stars: number[] // indices of stars in this constellation
  connections: [number, number][] // pairs of star indices to connect
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

    constellationStarPositions.forEach((pos, index) => {
      const constellationId = constellations.findIndex(c => c.stars.includes(index))
      newStars.push({
        x: (pos.x / 100) * canvas.width,
        y: (pos.y / 100) * canvas.height,
        size: 3 + Math.random() * 3, // Enhanced size variation for depth (3-6px)
        brightness: 0.85 + Math.random() * 0.15, // Brighter constellation stars
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        isConstellation: true,
        constellationId
      })
    })

    // Add random background stars (densely packed and more visible)
    for (let i = 0; i < starCount; i++) {
      // Create depth variation: smaller stars (far) to larger stars (near)
      const depthFactor = Math.random()
      const size = depthFactor < 0.7 ? 0.5 + Math.random() * 1.5 : 2 + Math.random() * 3

      newStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size, // Enhanced size variation for depth perception (0.5-5px)
        brightness: 0.3 + Math.random() * 0.7, // Wide brightness range
        twinkleSpeed: 0.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        isConstellation: false
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw stars - static (no animation for performance)
      stars.forEach((star, index) => {
        // Highlight constellation stars when hovered
        const isNearMouse = star.isConstellation &&
          activeConstellation === star.constellationId &&
          Math.abs(star.x - mousePos.x) < 100 &&
          Math.abs(star.y - mousePos.y) < 100

        const starColor = isNearMouse ? [255, 223, 0] : [255, 255, 255]
        const alpha = star.brightness

        // Draw 4-point star shape
        ctx.save()
        ctx.translate(star.x, star.y)

        // Set glow based on star type
        if (star.isConstellation) {
          ctx.shadowBlur = isNearMouse ? 20 : 8
          ctx.shadowColor = isNearMouse ? '#FFD700' : '#FFFFFF'
        } else {
          ctx.shadowBlur = 3
          ctx.shadowColor = '#FFFFFF'
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

      // Draw constellation lines when hovering nearby
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
      }

      ctx.shadowBlur = 0

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
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent'
      }}
    />
  )
}
