'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
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
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()
  const animationRunning = useRef(false)

  // Client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate sparkles along the arc path
  const generateSparkles = useCallback((startX: number, startY: number, midX: number, midY: number, endX: number, endY: number) => {
    const numSparkles = 12
    const newSparkles: Sparkle[] = []

    for (let i = 0; i < numSparkles; i++) {
      const t = i / numSparkles

      // Quadratic bezier curve point
      const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX
      const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY

      newSparkles.push({
        id: i,
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        size: 6 + Math.random() * 10,
        delay: t * 2.5,
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
        // Use lastPosition which was saved BEFORE the button was hidden
        startPos = lastPosition
        endPos = getHeaderPosition()
      } else {
        startPos = getHeaderPosition()
        endPos = lastPosition || { x: window.innerWidth - 60, y: window.innerHeight - 60 }
      }

      if (!startPos || !endPos) {
        console.warn('SageNapAnimation: Missing positions', { startPos, endPos })
        animationRunning.current = false
        onAnimationComplete(animationPhase)
        return
      }

      // Calculate a dramatic arc that sweeps across the viewport
      const midX = (startPos.x + endPos.x) / 2

      // Make the arc go UP significantly - at least 200px above the midpoint, or to near the top
      const midYBase = Math.min(startPos.y, endPos.y)
      const arcPeak = Math.max(80, midYBase - 250) // Go high up in the viewport

      // Calculate scale
      const startScale = animationPhase === 'going-to-nap' ? 1 : 0.6
      const endScale = animationPhase === 'going-to-nap' ? 0.6 : 1

      // Make visible and set initial position BEFORE any animation
      setIsVisible(true)

      // Immediately position at start
      controls.set({
        x: startPos.x,
        y: startPos.y,
        scale: startScale,
        opacity: 1
      })

      // Wait for the element to render at start position
      await new Promise(resolve => setTimeout(resolve, 50))

      // Generate sparkles along the arc path
      generateSparkles(startPos.x, startPos.y, midX, arcPeak, endPos.x, endPos.y)

      // Animation duration - slow and visible
      const duration = animationPhase === 'going-to-nap' ? 2.5 : 1.5

      // Animate along the arc using keyframes
      await controls.start({
        x: [startPos.x, midX, endPos.x],
        y: [startPos.y, arcPeak, endPos.y],
        scale: [startScale, (startScale + endScale) / 2, endScale],
        opacity: 1,
        transition: {
          duration,
          ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier
          times: [0, 0.5, 1],
        }
      })

      // Brief pause at the end
      await new Promise(resolve => setTimeout(resolve, 150))

      setSparkles([])
      setIsVisible(false)
      animationRunning.current = false
      onAnimationComplete(animationPhase)
    }

    runAnimation()
  }, [sageContext?.animationPhase, mounted, controls, generateSparkles, sageContext])

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
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Sparkles trail */}
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
            duration: 1,
            delay: sparkle.delay,
            ease: 'easeOut',
          }}
          style={{ width: sparkle.size, height: sparkle.size }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.6) 40%, transparent 70%)',
              boxShadow: '0 0 12px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.4)',
            }}
          />
        </motion.div>
      ))}

      {/* Flying Sage Icon */}
      <motion.div
        className="absolute"
        animate={controls}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
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
        <div className="w-16 h-16 bg-gradient-to-br from-moss-600 to-ocean-600 rounded-full flex items-center justify-center shadow-2xl relative">
          <Leaf className="w-8 h-8 text-white" />

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
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateY(-36px) translateX(-50%)`,
                  background: 'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,191,36,0.6) 50%, transparent 70%)',
                  boxShadow: '0 0 8px rgba(251,191,36,0.8)',
                }}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.08,
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
