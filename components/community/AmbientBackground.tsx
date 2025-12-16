'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Floating orb component
function FloatingOrb({
  color,
  size,
  initialX,
  initialY,
  duration,
  delay,
}: {
  color: string
  size: number
  initialX: string
  initialY: string
  duration: number
  delay: number
}) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} blur-3xl opacity-20 pointer-events-none`}
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
      }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.15, 0.25, 0.15, 0.2, 0.15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// Particle component for floating dots
function FloatingParticle({
  delay,
  duration,
  startX,
  startY,
}: {
  delay: number
  duration: number
  startX: string
  startY: string
}) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[var(--primary)] opacity-30 pointer-events-none"
      style={{ left: startX, top: startY }}
      animate={{
        y: [0, -100, -200],
        x: [0, 20, -10],
        opacity: [0, 0.4, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

// Connection line that pulses
function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: string
  y1: string
  x2: string
  y2: string
  delay: number
}) {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--primary)"
        strokeWidth="1"
        strokeOpacity="0.1"
        strokeLinecap="round"
        animate={{
          strokeOpacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  )
}

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient layers */}
      <div className="day-only absolute inset-0">
        {/* Warm sunrise palette */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-transparent to-emerald-100/30"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Sun glow */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-radial from-amber-200/30 to-transparent rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="night-only absolute inset-0">
        {/* Cool night palette */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-indigo-900/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Aurora effect */}
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent"
          animate={{
            x: [-50, 50, -50],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating orbs - soft colored blurs that move slowly */}
      <FloatingOrb
        color="bg-blue-500"
        size={300}
        initialX="10%"
        initialY="20%"
        duration={20}
        delay={0}
      />
      <FloatingOrb
        color="bg-purple-500"
        size={250}
        initialX="70%"
        initialY="60%"
        duration={25}
        delay={5}
      />
      <FloatingOrb
        color="bg-emerald-500"
        size={200}
        initialX="80%"
        initialY="10%"
        duration={22}
        delay={3}
      />
      <FloatingOrb
        color="bg-amber-500"
        size={180}
        initialX="20%"
        initialY="70%"
        duration={18}
        delay={8}
      />
      <FloatingOrb
        color="bg-pink-500"
        size={220}
        initialX="50%"
        initialY="40%"
        duration={24}
        delay={2}
      />

      {/* Floating particles - tiny dots that rise up */}
      <FloatingParticle delay={0} duration={8} startX="15%" startY="90%" />
      <FloatingParticle delay={2} duration={10} startX="35%" startY="95%" />
      <FloatingParticle delay={4} duration={9} startX="55%" startY="88%" />
      <FloatingParticle delay={1} duration={11} startX="75%" startY="92%" />
      <FloatingParticle delay={3} duration={8} startX="85%" startY="85%" />
      <FloatingParticle delay={5} duration={10} startX="25%" startY="80%" />
      <FloatingParticle delay={6} duration={9} startX="65%" startY="90%" />
      <FloatingParticle delay={7} duration={12} startX="45%" startY="95%" />

      {/* Connection lines - subtle network visualization */}
      <ConnectionLine x1="20%" y1="30%" x2="40%" y2="20%" delay={0} />
      <ConnectionLine x1="40%" y1="20%" x2="60%" y2="35%" delay={1} />
      <ConnectionLine x1="60%" y1="35%" x2="80%" y2="25%" delay={2} />
      <ConnectionLine x1="30%" y1="60%" x2="50%" y2="50%" delay={3} />
      <ConnectionLine x1="50%" y1="50%" x2="70%" y2="65%" delay={4} />
      <ConnectionLine x1="25%" y1="45%" x2="45%" y2="55%" delay={5} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--background) 100%)',
          opacity: 0.4,
        }}
      />
    </div>
  )
}
