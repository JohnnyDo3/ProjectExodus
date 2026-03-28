'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useSageContextSafe } from './SageContext'

// Quadratic bezier interpolation helper
function quadraticBezier(t: number, p0: number, p1: number, p2: number): number {
  const mt = 1 - t
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2
}

// Generate points along the bezier curve for animation keyframes
function generateBezierKeyframes(
  startX: number,
  startY: number,
  controlX: number,
  controlY: number,
  endX: number,
  endY: number,
  steps: number = 20
): { x: number[]; y: number[] } {
  const xPoints: number[] = []
  const yPoints: number[] = []

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    xPoints.push(quadraticBezier(t, startX, controlX, endX))
    yPoints.push(quadraticBezier(t, startY, controlY, endY))
  }

  return { x: xPoints, y: yPoints }
}

interface AnimationState {
  isAnimating: boolean
  keyframes: { x: number[]; y: number[] } | null
  duration: number
}

export function SageNapAnimation() {
  const sageContext = useSageContextSafe()
  const [mounted, setMounted] = useState(false)
  const [animState, setAnimState] = useState<AnimationState>({
    isAnimating: false,
    keyframes: null,
    duration: 2,
  })
  const animationRunning = useRef(false)

  // Client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Run animation when phase changes
  useEffect(() => {
    if (!sageContext || !mounted) return
    if (animationRunning.current) return

    const { animationPhase, lastPosition, getHeaderPosition, onAnimationComplete } = sageContext

    if (animationPhase === 'idle') {
      setAnimState({ isAnimating: false, keyframes: null, duration: 2 })
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
      const midX = (startPos.x + endPos.x) / 2
      const minY = Math.min(startPos.y, endPos.y)
      const controlY = Math.max(60, minY - 280)

      // Generate keyframes for the bezier curve
      const keyframes = generateBezierKeyframes(
        startPos.x,
        startPos.y,
        midX,
        controlY,
        endPos.x,
        endPos.y,
        30 // More points for smoother curve
      )

      const duration = animationPhase === 'going-to-nap' ? 2.2 : 1.4

      // Start the animation
      setAnimState({
        isAnimating: true,
        keyframes,
        duration,
      })

      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, duration * 1000 + 300))

      // End animation
      setAnimState({ isAnimating: false, keyframes: null, duration: 2 })

      animationRunning.current = false
      onAnimationComplete(animationPhase)
    }

    runAnimation()
  }, [sageContext?.animationPhase, mounted, sageContext])

  // Reset when animation phase becomes idle
  useEffect(() => {
    if (sageContext?.animationPhase === 'idle') {
      animationRunning.current = false
    }
  }, [sageContext?.animationPhase])

  if (!mounted || !sageContext) return null

  return createPortal(
    <AnimatePresence>
      {animState.isAnimating && animState.keyframes && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Flying Sage Icon */}
          <motion.div
            className="absolute"
            style={{
              // Center the 56px icon on the path point
              marginLeft: -28,
              marginTop: -28,
            }}
            initial={{
              left: animState.keyframes.x[0],
              top: animState.keyframes.y[0],
            }}
            animate={{
              left: animState.keyframes.x,
              top: animState.keyframes.y,
            }}
            transition={{
              duration: animState.duration,
              ease: 'easeInOut',
              times: animState.keyframes.x.map((_, i) => i / (animState.keyframes!.x.length - 1)),
            }}
          >
            {/* Glowing trail effect */}
            <motion.div
              className="absolute inset-0 w-14 h-14 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(34, 197, 94, 0.7), 0 0 60px rgba(34, 197, 94, 0.4), 0 0 90px rgba(34, 197, 94, 0.2)',
                  '0 0 50px rgba(34, 197, 94, 0.9), 0 0 100px rgba(34, 197, 94, 0.6), 0 0 150px rgba(34, 197, 94, 0.3)',
                  '0 0 30px rgba(34, 197, 94, 0.7), 0 0 60px rgba(34, 197, 94, 0.4), 0 0 90px rgba(34, 197, 94, 0.2)',
                ],
              }}
              transition={{
                duration: 0.4,
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
                  duration: 1,
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
                      marginLeft: -5,
                      marginTop: -5,
                      transform: `rotate(${angle}deg) translateY(-32px)`,
                      background: 'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,191,36,0.6) 50%, transparent 70%)',
                      boxShadow: '0 0 8px rgba(251,191,36,0.9)',
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
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

            {/* Trailing particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 8 - i,
                  height: 8 - i,
                  left: 28,
                  top: 28,
                  background: `radial-gradient(circle, rgba(34, 197, 94, ${0.8 - i * 0.1}) 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5],
                  x: [0, -20 - i * 10, -40 - i * 15],
                  y: [0, 10 + i * 5, 20 + i * 8],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
