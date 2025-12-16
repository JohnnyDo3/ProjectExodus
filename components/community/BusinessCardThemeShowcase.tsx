'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Sparkles, Star, MapPin, Globe, TrendingUp } from 'lucide-react'

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
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered])

  const activeTheme = cardThemes[activeIndex]

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Theme selector dots */}
      <div className="flex justify-center gap-2 mb-4">
        {cardThemes.map((theme, index) => (
          <motion.button
            key={theme.id}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-300`}
            animate={{
              scale: index === activeIndex ? 1.3 : 1,
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            whileHover={{ scale: 1.2, opacity: 0.8 }}
          />
        ))}
      </div>

      {/* Main card showcase */}
      <div className="relative h-[280px] flex items-center justify-center">
        {/* Ambient glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl blur-3xl opacity-30 ${activeTheme.bgGlow}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
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
            initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 15, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full max-w-[320px]"
            style={{ perspective: '1000px' }}
          >
            {/* Card container with 3D effect */}
            <motion.div
              className={`relative bg-[var(--card)] border ${activeTheme.borderColor} rounded-2xl overflow-hidden shadow-2xl`}
              animate={{
                rotateX: isHovered ? 0 : [0, 2, 0, -2, 0],
                rotateY: isHovered ? 0 : [0, 3, 0, -3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient header */}
              <div className={`h-20 bg-gradient-to-r ${activeTheme.gradient} relative overflow-hidden`}>
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                />

                {/* Guardian badge */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Shield className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Avatar */}
              <div className="relative -mt-10 px-5">
                <motion.div
                  className={`w-20 h-20 rounded-xl bg-gradient-to-br ${activeTheme.gradient} p-1 shadow-lg`}
                  animate={{
                    boxShadow: [
                      '0 10px 40px rgba(0,0,0,0.2)',
                      '0 15px 50px rgba(0,0,0,0.3)',
                      '0 10px 40px rgba(0,0,0,0.2)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-full h-full rounded-lg bg-[var(--card)] flex items-center justify-center">
                    <Sparkles className={`w-8 h-8 ${activeTheme.accentColor}`} />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5 pt-3">
                {/* Name placeholder */}
                <motion.div
                  className="h-5 bg-[var(--muted)] rounded-md w-32 mb-2"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Declaration placeholder */}
                <motion.div
                  className={`text-xs ${activeTheme.accentColor} italic mb-3 flex items-center gap-1`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-3 h-3" />
                  <span>"Your declaration here..."</span>
                </motion.div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <MapPin className="w-3 h-3" />
                    <span>Location</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <Globe className="w-3 h-3" />
                    <span>Website</span>
                  </div>
                </div>

                {/* STOCK score */}
                <div className={`flex items-center justify-between p-2 rounded-lg bg-gradient-to-r ${activeTheme.gradient} bg-opacity-10`}>
                  <span className="text-xs font-medium text-[var(--foreground)]">YOUR STOCK</span>
                  <motion.div
                    className="flex items-center gap-1"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <TrendingUp className={`w-3 h-3 ${activeTheme.accentColor}`} />
                    <span className={`text-sm font-bold ${activeTheme.accentColor}`}>247</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-[var(--muted-foreground)] mb-2">
          Choose your theme. Define your identity.
        </p>
      </motion.div>
    </div>
  )
}
