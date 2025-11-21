'use client'

import { useEffect, useRef, useState } from 'react'
import { useSkyTheme } from './SkyThemeProvider'

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
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
  }
]

export function NightSkyConstellations() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeConstellation, setActiveConstellation] = useState<number | null>(null)
  const { currentPhase } = useSkyTheme()
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Only show constellations during night phases
  const isNightTime = ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

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
      { x: 37, y: 75 }, { x: 33, y: 78 }, { x: 28, y: 76 }
    ]

    constellationStarPositions.forEach((pos, index) => {
      const constellationId = constellations.findIndex(c => c.stars.includes(index))
      newStars.push({
        x: (pos.x / 100) * canvas.width,
        y: (pos.y / 100) * canvas.height,
        size: 2 + Math.random() * 1.5,
        brightness: 0.7 + Math.random() * 0.3,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        isConstellation: true,
        constellationId
      })
    })

    // Add random background stars
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 1.5,
        brightness: 0.3 + Math.random() * 0.5,
        twinkleSpeed: 0.5 + Math.random() * 2,
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
  }, [isNightTime])

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

      // Draw stars
      stars.forEach((star, index) => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7
        const alpha = star.brightness * twinkle

        // Highlight constellation stars when hovered
        const isNearMouse = star.isConstellation &&
          activeConstellation === star.constellationId &&
          Math.abs(star.x - mousePos.x) < 100 &&
          Math.abs(star.y - mousePos.y) < 100

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = isNearMouse
          ? `rgba(255, 223, 0, ${alpha})` // Gold for active constellation
          : `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        // Add glow for constellation stars
        if (star.isConstellation) {
          ctx.shadowBlur = isNearMouse ? 15 : 5
          ctx.shadowColor = isNearMouse ? '#FFD700' : '#FFFFFF'
        } else {
          ctx.shadowBlur = 0
        }
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
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveConstellation(null)}
      className="fixed inset-0 pointer-events-auto z-0"
      style={{
        background: 'var(--sky-gradient, linear-gradient(to bottom, #000000 0%, #0A0A0F 20%, #191970 50%, #1C1C3C 100%))'
      }}
    />
  )
}
