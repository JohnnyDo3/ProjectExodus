'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useSageContextSafe } from './SageContext'

interface Sparkle {
  id: number
  progress: number // 0-1 along the path
  size: number
  offset: { x: number; y: number }
}

// Quadratic bezier interpolation helper
function quadraticBezier(t: number, p0: number, p1: number, p2: number): number {
  const mt = 1 - t
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2
}

export function SageNapAnimation() {
  const sageContext = useSageContextSafe()
  const [mounted, setMounted] = useState(false)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const animationRunning = useRef(false)

  // Store animation path parameters
  const pathRef = useRef<{
    startX: number
    startY: number
    controlX: number
    controlY: number
    endX: number
    endY: number
  } | null>(null)

  // Spring-based progress for smooth arc animation
  const progress = useSpring(0, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  })

  // Opacity spring for smooth fade
  const opacity = useSpring(0, {
    stiffness: 200,
    damping: 30,
  })

  // Client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate position along bezier curve based on progress
  const x = useTransform(progress, (p) => {
    if (!pathRef.current) return 0
    const { startX, controlX, endX } = pathRef.current
    return quadraticBezier(p, startX, controlX, endX)
  })

  const y = useTransform(progress, (p) => {
    if (!pathRef.current) return 0
    const { startY, controlY, endY } = pathRef.current
    return quadraticBezier(p, startY, controlY, endY)
  })

  // Generate sparkles along the arc path
  const generateSparkles = useCallback(() => {
    const numSparkles = 10
    const newSparkles: Sparkle[] = []

    for (let i = 0; i < numSparkles; i++) {
      newSparkles.push({
        id: i,
        progress: i / numSparkles,
        size: 6 + Math.random() * 8,
        offset: {
          x: (Math.random() - 0.5) * 24,
          y: (Math.random() - 0.5) * 24,
        },
      })
    }

    setSparkles(newSparkles)
  }, [])

  // Run animation when phase changes
  useEffect(() => {
    if (!sageContext || !mounted) return
    if (animationRunning.current) return

    const { animationPhase, lastPosition, getHeaderPosition, onAnimationComplete } = sageContext

    if (animationPhase === 'idle') {
      setIsVisible(false)
      return
    }

    const runAnimation = async () => {
      animationRunning.current = true

      let startPos, endPos

      if (animationPhase === 'going-to-nap') {
        startPos = lastPosition
        endPos = getHeaderPosition()
      } else {
        startPos = getHeaderPosition()
        endPos = lastPosition || { x: window.innerWidth - 60, y: window.innerHeight - 60 }
      }

      // Use fallback positions if refs aren't available
      const fallbackSagePos = { x: window.innerWidth - 60, y: window.innerHeight - 60 }
      const fallbackHeaderPos = { x: 60, y: 40 }

      if (!startPos) {
        startPos = animationPhase === 'going-to-nap' ? fallbackSagePos : fallbackHeaderPos
      }
      if (!endPos) {
        endPos = animationPhase === 'going-to-nap' ? fallbackHeaderPos : fallbackSagePos
      }

      // Calculate control point for smooth arc
      // The control point is above the midpoint for a nice parabolic arc
      const midX = (startPos.x + endPos.x) / 2
      const minY = Math.min(startPos.y, endPos.y)
      // Arc peaks at 200-300px above the lower of the two points
      const controlY = Math.max(60, minY - 280)

      // Store path parameters
      pathRef.current = {
        startX: startPos.x,
        startY: startPos.y,
        controlX: midX,
        controlY: controlY,
        endX: endPos.x,
        endY: endPos.y,
      }

      // Set initial position immediately (progress = 0)
      progress.jump(0)
      opacity.jump(0)

      // Generate sparkles
      generateSparkles()

      // Make visible
      setIsVisible(true)

      // Small delay to ensure DOM is ready
      await new Promise(resolve => requestAnimationFrame(resolve))

      // Fade in
      opacity.set(1)

      // Wait for fade in
      await new Promise(resolve => setTimeout(resolve, 100))

      // Animate along the arc
      progress.set(1)

      // Wait for spring animation to mostly complete
      const animationDuration = animationPhase === 'going-to-nap' ? 2200 : 1400
      await new Promise(resolve => setTimeout(resolve, animationDuration))

      // Clear sparkles
      setSparkles([])

      // Fade out
      opacity.set(0)

      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 250))

      // Hide
      setIsVisible(false)

      // Brief delay before signaling completion
      await new Promise(resolve => setTimeout(resolve, 50))

      animationRunning.current = false
      onAnimationComplete(animationPhase)
    }

    runAnimation()
  }, [sageContext?.animationPhase, mounted, progress, opacity, generateSparkles, sageContext])

  // Reset when animation phase becomes idle
  useEffect(() => {
    if (sageContext?.animationPhase === 'idle') {
      animationRunning.current = false
    }
  }, [sageContext?.animationPhase])

  if (!mounted || !sageContext) return null

  // Only render when visible
  if (!isVisible) return null

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      style={{
        opacity,
      }}
    >
      {/* Sparkles along the trail */}
      {sparkles.map((sparkle) => {
        // Calculate sparkle position based on current progress
        return (
          <SparkleElement
            key={sparkle.id}
            sparkle={sparkle}
            progress={progress}
            pathRef={pathRef}
          />
        )
      })}

      {/* Flying Sage Icon */}
      <motion.div
        className="absolute"
        style={{
          left: x,
          top: y,
        }}
      >
        {/* Centering wrapper */}
        <div style={{ transform: 'translate(-50%, -50%)' }}>
        {/* Glowing trail effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 30px rgba(34, 197, 94, 0.7), 0 0 60px rgba(34, 197, 94, 0.4), 0 0 90px rgba(34, 197, 94, 0.2)',
              '0 0 40px rgba(34, 197, 94, 0.9), 0 0 80px rgba(34, 197, 94, 0.5), 0 0 120px rgba(34, 197, 94, 0.3)',
              '0 0 30px rgba(34, 197, 94, 0.7), 0 0 60px rgba(34, 197, 94, 0.4), 0 0 90px rgba(34, 197, 94, 0.2)',
            ],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main icon container */}
        <div className="w-14 h-14 bg-gradient-to-br from-moss-600 to-ocean-600 rounded-full flex items-center justify-center shadow-2xl relative">
          <Leaf className="w-7 h-7 text-white" />

          {/* Rotating sparkle ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateY(-32px) translateX(-50%)`,
                  background: 'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,191,36,0.6) 50%, transparent 70%)',
                  boxShadow: '0 0 6px rgba(251,191,36,0.8)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

// Sparkle element that follows the path with a delay
function SparkleElement({
  sparkle,
  progress,
  pathRef,
}: {
  sparkle: Sparkle
  progress: MotionValue<number>
  pathRef: React.MutableRefObject<{
    startX: number
    startY: number
    controlX: number
    controlY: number
    endX: number
    endY: number
  } | null>
}) {
  // Sparkle appears when progress reaches its position, then fades
  const sparkleOpacity = useTransform(progress, (p) => {
    const diff = p - sparkle.progress
    if (diff < 0) return 0
    if (diff > 0.3) return 0
    // Fade in quickly, stay, then fade out
    if (diff < 0.05) return diff / 0.05
    if (diff > 0.2) return 1 - (diff - 0.2) / 0.1
    return 1
  })

  const sparkleScale = useTransform(progress, (p) => {
    const diff = p - sparkle.progress
    if (diff < 0 || diff > 0.3) return 0
    if (diff < 0.1) return 0.5 + (diff / 0.1) * 0.7
    return 1.2 - (diff - 0.1) * 0.5
  })

  const sparkleX = useTransform(progress, () => {
    if (!pathRef.current) return 0
    const { startX, controlX, endX } = pathRef.current
    return quadraticBezier(sparkle.progress, startX, controlX, endX) + sparkle.offset.x
  })

  const sparkleY = useTransform(progress, () => {
    if (!pathRef.current) return 0
    const { startY, controlY, endY } = pathRef.current
    return quadraticBezier(sparkle.progress, startY, controlY, endY) + sparkle.offset.y
  })

  return (
    <motion.div
      className="absolute"
      style={{
        left: sparkleX,
        top: sparkleY,
        opacity: sparkleOpacity,
        scale: sparkleScale,
        width: sparkle.size,
        height: sparkle.size,
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.6) 40%, transparent 70%)',
          boxShadow: '0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.4)',
        }}
      />
    </motion.div>
  )
}
