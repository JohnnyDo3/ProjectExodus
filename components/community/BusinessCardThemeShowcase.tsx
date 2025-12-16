'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Sparkles, Star, TrendingUp } from 'lucide-react'

// 7 Guardian color themes (no names, just visual themes)
const cardThemes = [
  {
    id: 'strength',
    gradient: 'from-red-500 via-orange-500 to-amber-500',
    bgGlow: 'bg-red-500/20',
    accentColor: 'text-red-400',
    borderColor: 'border-red-500/30',
  },
  {
    id: 'revelation',
    gradient: 'from-sky-400 via-blue-500 to-cyan-500',
    bgGlow: 'bg-sky-500/20',
    accentColor: 'text-sky-400',
    borderColor: 'border-sky-500/30',
  },
  {
    id: 'healing',
    gradient: 'from-emerald-400 via-teal-500 to-green-500',
    bgGlow: 'bg-emerald-500/20',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'wisdom',
    gradient: 'from-amber-400 via-yellow-500 to-orange-400',
    bgGlow: 'bg-amber-500/20',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 'love',
    gradient: 'from-pink-400 via-rose-500 to-red-400',
    bgGlow: 'bg-pink-500/20',
    accentColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
  },
  {
    id: 'beauty',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    bgGlow: 'bg-violet-500/20',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/30',
  },
  {
    id: 'mercy',
    gradient: 'from-indigo-400 via-blue-600 to-purple-500',
    bgGlow: 'bg-indigo-500/20',
    accentColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
  },
]

export function BusinessCardThemeShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-cycle through themes
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardThemes.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [isHovered])

  const activeTheme = cardThemes[activeIndex]

  return (
    <div
      className="relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Theme selector dots */}
      <div className="flex justify-center gap-1.5 mb-2">
        {cardThemes.map((theme, index) => (
          <motion.button
            key={theme.id}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-300`}
            animate={{
              scale: index === activeIndex ? 1.4 : 1,
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            whileHover={{ scale: 1.3, opacity: 0.8 }}
          />
        ))}
      </div>

      {/* Main card showcase - fills remaining space */}
      <div className="relative flex-1 flex items-center justify-center min-h-0">
        {/* Ambient glow */}
        <motion.div
          className={`absolute inset-4 rounded-2xl blur-2xl opacity-25 ${activeTheme.bgGlow}`}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTheme.id}
            initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 10, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-[240px]"
            style={{ perspective: '800px' }}
          >
            {/* Card container with 3D effect */}
            <motion.div
              className={`relative bg-[var(--card)] border ${activeTheme.borderColor} rounded-xl overflow-hidden shadow-xl`}
              animate={{
                rotateX: isHovered ? 0 : [0, 1.5, 0, -1.5, 0],
                rotateY: isHovered ? 0 : [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient header - compact */}
              <div className={`h-12 bg-gradient-to-r ${activeTheme.gradient} relative overflow-hidden`}>
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                />

                {/* Guardian badge */}
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  animate={{ rotate: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Shield className="w-3 h-3 text-white" />
                </motion.div>
              </div>

              {/* Avatar - overlapping header */}
              <div className="relative -mt-6 px-3">
                <motion.div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${activeTheme.gradient} p-0.5 shadow-lg`}
                  animate={{
                    boxShadow: [
                      '0 4px 20px rgba(0,0,0,0.15)',
                      '0 6px 25px rgba(0,0,0,0.2)',
                      '0 4px 20px rgba(0,0,0,0.15)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-full h-full rounded-md bg-[var(--card)] flex items-center justify-center">
                    <Sparkles className={`w-5 h-5 ${activeTheme.accentColor}`} />
                  </div>
                </motion.div>
              </div>

              {/* Content - compact */}
              <div className="p-3 pt-1.5">
                {/* Name placeholder */}
                <motion.div
                  className="h-3.5 bg-[var(--muted)] rounded w-24 mb-1.5"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Declaration placeholder */}
                <motion.div
                  className={`text-[10px] ${activeTheme.accentColor} italic mb-2 flex items-center gap-1`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-2.5 h-2.5" />
                  <span>"Your declaration..."</span>
                </motion.div>

                {/* STOCK score - compact */}
                <div className={`flex items-center justify-between py-1.5 px-2 rounded-md bg-gradient-to-r ${activeTheme.gradient}/10`}>
                  <span className="text-[10px] font-medium text-[var(--foreground)]">STOCK</span>
                  <motion.div
                    className="flex items-center gap-0.5"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <TrendingUp className={`w-2.5 h-2.5 ${activeTheme.accentColor}`} />
                    <span className={`text-xs font-bold ${activeTheme.accentColor}`}>247</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Compact tagline */}
      <motion.p
        className="text-[10px] text-center text-[var(--muted-foreground)] mt-2"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        7 themes • Your identity
      </motion.p>
    </div>
  )
}
