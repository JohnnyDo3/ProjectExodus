'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useAnimation } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useSageContextSafe } from './SageContext'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function SageNapAnimation() {
  const sageContext = useSageContextSafe()
  const [mounted, setMounted] = useState(false)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const controls = useAnimation()

  // Client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate sparkles along the path
  const generateSparkles = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    const numSparkles = 8
    const newSparkles: Sparkle[] = []

    // Calculate arc that stays within viewport (matching animation)
    const horizontalDist = Math.abs(endX - startX)
    const verticalDist = Math.abs(endY - startY)
    const arcHeight = Math.min(horizontalDist * 0.3, 150, verticalDist * 0.25)
    const midX = (startX + endX) / 2
    const midYBase = (startY + endY) / 2
    const midY = Math.max(60, midYBase - arcHeight)

    for (let i = 0; i < numSparkles; i++) {
      const progress = i / numSparkles

      // Bezier curve point
      const t = progress
      const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX
      const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY

      newSparkles.push({
        id: i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: 4 + Math.random() * 8,
        delay: progress * 2.0, // Slower sparkle trail for sleep animation
      })
    }

    setSparkles(newSparkles)
  }, [])

  // Run animation when phase changes
  useEffect(() => {
    if (!sageContext || !mounted) return

    const { animationPhase, getSagePosition, getHeaderPosition, lastPosition, onAnimationComplete } = sageContext

    if (animationPhase === 'idle') return

    const runAnimation = async () => {
      let startPos, endPos

      if (animationPhase === 'going-to-nap') {
        startPos = getSagePosition() || lastPosition
        endPos = getHeaderPosition()
      } else {
        startPos = getHeaderPosition()
        endPos = lastPosition || { x: window.innerWidth - 60, y: window.innerHeight - 60 }
      }

      if (!startPos || !endPos) {
        onAnimationComplete(animationPhase)
        return
      }

      // Calculate scale based on direction
      const startScale = animationPhase === 'going-to-nap' ? 1 : 0.6
      const endScale = animationPhase === 'going-to-nap' ? 0.6 : 1

      // CRITICAL: Set initial position BEFORE starting animation
      // This prevents the "teleport" effect where the element appears at (0,0) first
      controls.set({
        x: startPos.x,
        y: startPos.y,
        scale: startScale,
        opacity: 1
      })

      // Small delay to ensure the initial position is rendered
      await new Promise(resolve => setTimeout(resolve, 16))

      // Generate sparkles along path
      generateSparkles(startPos.x, startPos.y, endPos.x, endPos.y)

      // Calculate arc control point - gentle curve that stays within viewport
      const horizontalDist = Math.abs(endPos.x - startPos.x)
      const verticalDist = Math.abs(endPos.y - startPos.y)
      const arcHeight = Math.min(horizontalDist * 0.3, 150, verticalDist * 0.25)

      // Calculate midpoint
      const midX = (startPos.x + endPos.x) / 2
      const midYBase = (startPos.y + endPos.y) / 2

      // Arc curves upward but stays within viewport (minimum 60px from top)
      const midY = Math.max(60, midYBase - arcHeight)

      // Animate with custom easing
      // ease-in for going to nap (gradual start, fast end)
      // ease-out for waking (fast start, gradual end)
      const easing: [number, number, number, number] = animationPhase === 'going-to-nap'
        ? [0.4, 0, 1, 1] // ease-in (accelerates toward end)
        : [0, 0, 0.2, 1] // ease-out (decelerates toward end)

      // Slower animation when going to sleep, normal speed when waking
      const duration = animationPhase === 'going-to-nap' ? 3.0 : 1.8

      await controls.start({
        x: [startPos.x, midX, endPos.x],
        y: [startPos.y, midY, endPos.y],
        scale: [startScale, (startScale + endScale) / 2, endScale],
        opacity: [1, 1, animationPhase === 'going-to-nap' ? 0.8 : 1],
        transition: {
          duration,
          ease: easing as [number, number, number, number],
          times: [0, 0.5, 1],
        }
      })

      // Small delay before completing
      await new Promise(resolve => setTimeout(resolve, 100))

      setSparkles([])
      onAnimationComplete(animationPhase)
    }

    runAnimation()
  }, [sageContext?.animationPhase, mounted, controls, generateSparkles, sageContext])

  if (!mounted || !sageContext) return null

  const { animationPhase, isAnimating } = sageContext

  if (!isAnimating || animationPhase === 'idle') return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          initial={{
            x: sparkle.x - sparkle.size / 2,
            y: sparkle.y - sparkle.size / 2,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: sparkle.delay,
            ease: 'easeOut',
          }}
          style={{ width: sparkle.size, height: sparkle.size }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.6) 40%, transparent 70%)',
              boxShadow: '0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.4)',
            }}
          />
        </motion.div>
      ))}

      {/* Flying Sage Icon */}
      <motion.div
        className="absolute"
        initial={{ opacity: 1 }}
        animate={controls}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Shimmer trail */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)',
              '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4)',
              '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)',
            ],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main icon container */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-moss-600 to-ocean-600 rounded-full flex items-center justify-center shadow-2xl relative">
          <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white" />

          {/* Rotating sparkle ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
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
                  background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
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
      </motion.div>
    </div>,
    document.body
  )
}
