'use client'

import { memo, useEffect, useState, useRef } from 'react'

// ─── Clown Pleco (Bottom Feeder) ────────────────────────────────────
// Two plecos that stay near the bottom, always near each other (mates for life)

const ClownPlecoSVG = memo(({ id, facingRight, size = 40 }: { id: string; facingRight: boolean; size?: number }) => {
  // SVG draws head on left (x≈14) and tail on right (x≈62).
  // Default orientation faces LEFT, so mirror when facingRight.
  const scaleX = facingRight ? -1 : 1
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" fill="none">
      <defs>
        <radialGradient id={`pleco-body-${id}`} cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#5C4A3A" />
          <stop offset="100%" stopColor="#2E1F14" />
        </radialGradient>
        <linearGradient id={`pleco-stripe-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A54A" />
          <stop offset="100%" stopColor="#B8862D" />
        </linearGradient>
      </defs>
      <g transform={`translate(40, 20) scale(${scaleX}, 1) translate(-40, -20)`}>
        {/* Body - flat elongated bottom feeder shape */}
        <ellipse cx="38" cy="22" rx="28" ry="10" fill={`url(#pleco-body-${id})`} />
        {/* Flat belly */}
        <ellipse cx="38" cy="27" rx="24" ry="5" fill="#3A2A1E" opacity="0.6" />
        {/* Clown stripes - golden/orange bands */}
        <path d="M18 16 Q20 12 24 14 L24 28 Q20 30 18 26 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.8" />
        <path d="M30 13 Q33 10 36 12 L36 30 Q33 32 30 29 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.7" />
        <path d="M42 12 Q45 10 48 13 L48 29 Q45 31 42 28 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.8" />
        <path d="M54 14 Q56 12 58 15 L58 27 Q56 29 54 26 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.7" />
        {/* Head - broad flat snout */}
        <ellipse cx="14" cy="22" rx="10" ry="8" fill="#3E2E20" />
        <ellipse cx="12" cy="24" rx="8" ry="5" fill="#4A3828" />
        {/* Sucker mouth (bottom feeder!) */}
        <ellipse cx="8" cy="25" rx="4" ry="3" fill="#2A1A10" stroke="#5C4A3A" strokeWidth="0.5" />
        <ellipse cx="8" cy="25" rx="2.5" ry="1.8" fill="#1A0E08" />
        {/* Eyes - small, set high on head */}
        <circle cx="16" cy="17" r="2.5" fill="#1A0E08" />
        <circle cx="16" cy="16.5" r="1.2" fill="#4A3020" />
        <circle cx="16.5" cy="16" r="0.5" fill="#D4A54A" />
        {/* Dorsal fin - tall sail-like */}
        <path d="M28 14 Q32 4 38 6 Q42 8 44 14" fill="#3E2E20" opacity="0.9" />
        <path d="M30 12 Q34 6 38 7" stroke="#D4A54A" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* Pectoral fins - wide, flat */}
        <path d="M22 26 Q16 34 12 32 Q14 28 20 26" fill="#3E2E20" opacity="0.7" />
        <path d="M32 26 Q28 34 24 32 Q26 28 30 26" fill="#3E2E20" opacity="0.7" />
        {/* Tail fin - fan shaped */}
        <path d="M62 18 Q72 10 74 16 Q76 22 74 26 Q72 32 62 24" fill="#3E2E20" opacity="0.85" />
        <path d="M64 18 Q70 14 72 20" stroke="#D4A54A" strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M64 24 Q70 28 72 22" stroke="#D4A54A" strokeWidth="0.6" fill="none" opacity="0.5" />
        {/* Armor plates texture */}
        <path d="M20 18 L24 17 L28 18" stroke="#5C4A3A" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M34 17 L38 16 L42 17" stroke="#5C4A3A" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M46 18 L50 17 L54 18" stroke="#5C4A3A" strokeWidth="0.4" fill="none" opacity="0.4" />
      </g>
    </svg>
  )
})
ClownPlecoSVG.displayName = 'ClownPlecoSVG'

// Animated pleco pair that stays together at the bottom
export const PlecoPair = memo(({ containerWidth }: { containerWidth: number }) => {
  const [pos, setPos] = useState({ x: containerWidth * 0.3, direction: 1 })
  const animRef = useRef<number>(0)
  const timeRef = useRef(Math.random() * 1000)

  useEffect(() => {
    if (containerWidth === 0) return

    const animate = () => {
      timeRef.current += 0.008
      const t = timeRef.current

      // Slow wandering along the bottom
      const baseX = containerWidth * 0.15 + Math.sin(t * 0.3) * (containerWidth * 0.3)
      // direction = derivative sign: cos(t*0.3) > 0 means moving right
      const direction = Math.cos(t * 0.3) > 0 ? 1 : -1

      setPos({ x: baseX, direction })
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [containerWidth])

  const facingRight = pos.direction > 0
  // Second pleco follows close behind
  const pleco2X = pos.x + (facingRight ? -35 : 35)
  const pleco2Y = 2

  return (
    <div className="absolute bottom-[18px] left-0 w-full z-20 pointer-events-none" style={{ height: '40px' }}>
      {/* Pleco 1 */}
      <div
        className="absolute"
        style={{
          left: `${pos.x}px`,
          bottom: '0px',
          transition: 'left 0.5s linear',
        }}
      >
        <ClownPlecoSVG id="pleco-1" facingRight={facingRight} size={38} />
      </div>
      {/* Pleco 2 (mate) - follows closely */}
      <div
        className="absolute"
        style={{
          left: `${pleco2X}px`,
          bottom: `${pleco2Y}px`,
          transition: 'left 0.7s linear',
        }}
      >
        <ClownPlecoSVG id="pleco-2" facingRight={facingRight} size={34} />
      </div>
      {/* Love indicator - tiny hearts that occasionally appear between them */}
      <PlecoHearts x1={pos.x} x2={pleco2X} />
    </div>
  )
})
PlecoPair.displayName = 'PlecoPair'

// Tiny floating hearts between the pleco pair
const PlecoHearts = memo(({ x1, x2 }: { x1: number; x2: number }) => {
  const [showHeart, setShowHeart] = useState(false)
  const midX = (x1 + x2) / 2

  useEffect(() => {
    const show = () => {
      setShowHeart(true)
      setTimeout(() => setShowHeart(false), 2000)
    }

    const interval = setInterval(show, 6000 + Math.random() * 4000)
    const initialTimeout = setTimeout(show, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [])

  if (!showHeart) return null

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${midX + 10}px`,
        bottom: '28px',
        animation: 'heartFloat 2s ease-out forwards',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B8A" opacity="0.8">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  )
})
PlecoHearts.displayName = 'PlecoHearts'


// ─── Glass Snail ────────────────────────────────────────────────────
// Snails that crawl along the glass — edges AND across the front glass

interface SnailColor {
  shell: string
  shellLight: string
  shellDark: string
  body: string
}

const SNAIL_COLORS: Record<string, SnailColor> = {
  pink: {
    shell: '#E8789A',
    shellLight: '#F5A0B8',
    shellDark: '#C45678',
    body: '#F0C8D4',
  },
  blue: {
    shell: '#5B8EC9',
    shellLight: '#85B0E0',
    shellDark: '#3A6CA0',
    body: '#B8D4F0',
  },
  gold: {
    shell: '#D4A43A',
    shellLight: '#E8C468',
    shellDark: '#B8862D',
    body: '#F0DCA8',
  },
}

const SnailSVG = memo(({ id, color, facingRight, size = 20 }: { id: string; color: SnailColor; facingRight: boolean; size?: number }) => {
  // SVG draws head on left (x≈7), shell on right (x≈22).
  // Default orientation faces LEFT, so mirror when facingRight.
  const scaleX = facingRight ? -1 : 1
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <radialGradient id={`snail-shell-${id}`} cx="0.4" cy="0.35" r="0.55">
          <stop offset="0%" stopColor={color.shellLight} />
          <stop offset="60%" stopColor={color.shell} />
          <stop offset="100%" stopColor={color.shellDark} />
        </radialGradient>
      </defs>
      <g transform={`translate(20, 20) scale(${scaleX}, 1) translate(-20, -20)`}>
        {/* Body/foot - elongated slug shape */}
        <ellipse cx="18" cy="32" rx="14" ry="4" fill={color.body} opacity="0.8" />
        <ellipse cx="18" cy="31" rx="12" ry="3" fill={color.body} />
        {/* Head */}
        <ellipse cx="7" cy="28" rx="5" ry="4" fill={color.body} />
        {/* Eye stalks */}
        <line x1="5" y1="26" x2="3" y2="20" stroke={color.body} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9" y1="25" x2="8" y2="19" stroke={color.body} strokeWidth="1.2" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="3" cy="19" r="1.5" fill="#1A1A2E" />
        <circle cx="3" cy="18.5" r="0.6" fill="white" opacity="0.8" />
        <circle cx="8" cy="18" r="1.5" fill="#1A1A2E" />
        <circle cx="8" cy="17.5" r="0.6" fill="white" opacity="0.8" />
        {/* Shell - spiral */}
        <circle cx="22" cy="23" r="11" fill={`url(#snail-shell-${id})`} />
        {/* Shell spiral lines */}
        <path d="M22 23 Q18 18 22 14 Q28 10 32 16 Q35 22 30 27 Q25 31 20 28" stroke={color.shellDark} strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M22 23 Q20 20 22 18 Q26 15 28 19 Q30 22 27 25" stroke={color.shellDark} strokeWidth="0.6" fill="none" opacity="0.4" />
        {/* Shell highlight */}
        <ellipse cx="19" cy="18" rx="3" ry="2.5" fill="white" opacity="0.15" />
        {/* Slime trail hint */}
        <ellipse cx="32" cy="33" rx="3" ry="1" fill={color.body} opacity="0.2" />
      </g>
    </svg>
  )
})
SnailSVG.displayName = 'SnailSVG'

type SnailEdge = 'bottom' | 'left' | 'right' | 'front'

interface SnailState {
  edge: SnailEdge
  progress: number // 0-1 along that edge
  speed: number
  // For front-glass: random waypoints
  frontPath: { startX: number; startY: number; endX: number; endY: number }
}

// Pick a random front-glass path (diagonal/curvy traverse)
function randomFrontPath(containerWidth: number, containerHeight: number) {
  // Start from a random edge point, end at another random edge point
  const side = Math.random()
  let startX: number, startY: number, endX: number, endY: number

  if (side < 0.25) {
    // Start from bottom
    startX = Math.random() * containerWidth
    startY = containerHeight - 30
    endX = Math.random() * containerWidth
    endY = containerHeight * (0.15 + Math.random() * 0.3)
  } else if (side < 0.5) {
    // Start from left
    startX = 10
    startY = containerHeight * (0.3 + Math.random() * 0.5)
    endX = containerWidth * (0.4 + Math.random() * 0.5)
    endY = containerHeight * (0.1 + Math.random() * 0.4)
  } else if (side < 0.75) {
    // Start from right
    startX = containerWidth - 30
    startY = containerHeight * (0.3 + Math.random() * 0.5)
    endX = containerWidth * (0.1 + Math.random() * 0.4)
    endY = containerHeight * (0.1 + Math.random() * 0.4)
  } else {
    // Start from top area
    startX = Math.random() * containerWidth
    startY = containerHeight * 0.15
    endX = Math.random() * containerWidth
    endY = containerHeight * (0.5 + Math.random() * 0.35)
  }

  return { startX, startY, endX, endY }
}

// Single snail that crawls along glass edges AND across the front glass
const GlassSnail = memo(({ id, colorName, containerWidth, containerHeight, initialEdge, initialProgress }: {
  id: string
  colorName: 'pink' | 'blue' | 'gold'
  containerWidth: number
  containerHeight: number
  initialEdge: SnailEdge
  initialProgress: number
}) => {
  const color = SNAIL_COLORS[colorName]
  const [state, setState] = useState<SnailState>(() => ({
    edge: initialEdge,
    progress: initialProgress,
    speed: 0.00015 + Math.random() * 0.0001,
    frontPath: randomFrontPath(containerWidth || 800, containerHeight || 600),
  }))
  const animRef = useRef<number>(0)
  const prevProgressRef = useRef(initialProgress)

  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    const animate = () => {
      setState(prev => {
        let { edge, progress, speed, frontPath } = prev
        prevProgressRef.current = progress
        progress += speed

        // Transition between edges
        if (progress >= 1) {
          progress = 0
          if (edge === 'front') {
            // After crossing the glass, go to a random edge
            const pick = Math.random()
            if (pick < 0.4) edge = 'bottom'
            else if (pick < 0.65) edge = 'left'
            else if (pick < 0.9) edge = 'right'
            else {
              edge = 'front'
              frontPath = randomFrontPath(containerWidth, containerHeight)
            }
          } else if (edge === 'bottom') {
            // From bottom, sometimes go across glass, sometimes edges
            const pick = Math.random()
            if (pick < 0.4) edge = 'front'
            else if (pick < 0.7) edge = 'right'
            else edge = 'left'
            if (edge === 'front') frontPath = randomFrontPath(containerWidth, containerHeight)
          } else if (edge === 'left') {
            const pick = Math.random()
            if (pick < 0.35) edge = 'front'
            else edge = 'bottom'
            if (edge === 'front') frontPath = randomFrontPath(containerWidth, containerHeight)
          } else {
            // right
            const pick = Math.random()
            if (pick < 0.35) edge = 'front'
            else edge = 'bottom'
            if (edge === 'front') frontPath = randomFrontPath(containerWidth, containerHeight)
          }
        }

        return { ...prev, edge, progress, frontPath }
      })
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [containerWidth, containerHeight])

  // Calculate position and rotation based on edge
  let x = 0, y = 0, rotation = 0, facingRight = true

  switch (state.edge) {
    case 'bottom':
      x = state.progress * containerWidth
      y = containerHeight - 22
      rotation = 0
      facingRight = true // moving left to right along bottom
      break
    case 'left':
      x = 4
      y = containerHeight - 22 - state.progress * (containerHeight * 0.6)
      rotation = 90
      facingRight = true // moving upward on left wall
      break
    case 'right':
      x = containerWidth - 24
      y = containerHeight - 22 - state.progress * (containerHeight * 0.6)
      rotation = -90
      facingRight = true // moving upward on right wall
      break
    case 'front': {
      // Crawling across the front glass — lerp between start and end
      const { startX, startY, endX, endY } = state.frontPath
      const t = state.progress
      x = startX + (endX - startX) * t
      y = startY + (endY - startY) * t
      // Face the direction of travel
      const dx = endX - startX
      const dy = endY - startY
      rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      facingRight = dx > 0
      break
    }
  }

  // On front glass, add slight transparency to simulate being pressed against glass
  const isFront = state.edge === 'front'

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'left 0.3s linear, top 0.3s linear, transform 0.4s ease',
        opacity: isFront ? 0.85 : 1,
        filter: isFront ? 'drop-shadow(0 0 3px rgba(100,200,255,0.15))' : 'none',
      }}
    >
      <SnailSVG id={id} color={color} facingRight={facingRight} size={isFront ? 22 : 18} />
      {/* Slime trail on glass */}
      {isFront && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '6px',
            height: '6px',
            background: `radial-gradient(circle, ${color.body}30 0%, transparent 70%)`,
            left: '50%',
            top: '100%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </div>
  )
})
GlassSnail.displayName = 'GlassSnail'

// All three snails
export const SnailTrio = memo(({ containerWidth, containerHeight }: { containerWidth: number; containerHeight: number }) => {
  if (containerWidth === 0 || containerHeight === 0) return null

  return (
    <>
      <GlassSnail
        id="snail-pink"
        colorName="pink"
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        initialEdge="front"
        initialProgress={0.1}
      />
      <GlassSnail
        id="snail-blue"
        colorName="blue"
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        initialEdge="left"
        initialProgress={0.3}
      />
      <GlassSnail
        id="snail-gold"
        colorName="gold"
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        initialEdge="bottom"
        initialProgress={0.6}
      />
    </>
  )
})
SnailTrio.displayName = 'SnailTrio'
