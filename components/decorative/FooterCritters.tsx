'use client'

import { useEffect, useState } from 'react'
import { useSkyTheme } from '@/components/theme/SkyThemeProvider'

interface Critter {
  id: number
  type: 'squirrel' | 'rabbit' | 'hedgehog' | 'fox' | 'deer'
  speed: number // seconds to cross screen
  delay: number // seconds before starting
  yOffset: number // vertical position variation
}

interface NightCreature {
  id: number
  type: 'owl' | 'firefly' | 'bat'
  speed?: number // seconds to cross screen (for bats)
  delay: number // seconds before starting
  xPosition?: number // horizontal position (for owls/fireflies)
  yOffset: number // vertical position variation
}

export function FooterCritters() {
  const { currentPhase } = useSkyTheme()
  const isNightTime = ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

  const [critters, setCritters] = useState<Critter[]>([])
  const [nightCreatures, setNightCreatures] = useState<NightCreature[]>([])

  useEffect(() => {
    const initialCritters: Critter[] = [
      { id: 1, type: 'squirrel', speed: 35, delay: 0, yOffset: 0 },
      { id: 2, type: 'rabbit', speed: 25, delay: 5, yOffset: -2 },
      { id: 3, type: 'hedgehog', speed: 50, delay: 10, yOffset: 2 },
      { id: 4, type: 'fox', speed: 30, delay: 15, yOffset: -1 },
      { id: 5, type: 'deer', speed: 28, delay: 20, yOffset: 0 },
      { id: 6, type: 'squirrel', speed: 38, delay: 25, yOffset: 1 },
      { id: 7, type: 'rabbit', speed: 27, delay: 30, yOffset: -1 },
      { id: 8, type: 'hedgehog', speed: 48, delay: 35, yOffset: 3 },
    ]
    setCritters(initialCritters)

    const initialNightCreatures: NightCreature[] = [
      // Owls (stationary, perched)
      { id: 1, type: 'owl', delay: 0, xPosition: 15, yOffset: -5 },
      { id: 2, type: 'owl', delay: 2, xPosition: 85, yOffset: -3 },

      // Fireflies (glowing, floating)
      { id: 3, type: 'firefly', delay: 0, xPosition: 20, yOffset: 10 },
      { id: 4, type: 'firefly', delay: 1, xPosition: 35, yOffset: 15 },
      { id: 5, type: 'firefly', delay: 2, xPosition: 50, yOffset: 8 },
      { id: 6, type: 'firefly', delay: 0.5, xPosition: 65, yOffset: 12 },
      { id: 7, type: 'firefly', delay: 1.5, xPosition: 80, yOffset: 18 },
      { id: 8, type: 'firefly', delay: 2.5, xPosition: 25, yOffset: 20 },
      { id: 9, type: 'firefly', delay: 1, xPosition: 45, yOffset: 5 },
      { id: 10, type: 'firefly', delay: 2, xPosition: 70, yOffset: 14 },

      // Bats (flying)
      { id: 11, type: 'bat', speed: 20, delay: 0, yOffset: -8 },
      { id: 12, type: 'bat', speed: 25, delay: 8, yOffset: -12 },
      { id: 13, type: 'bat', speed: 22, delay: 16, yOffset: -6 },
      { id: 14, type: 'bat', speed: 24, delay: 24, yOffset: -10 },
    ]
    setNightCreatures(initialNightCreatures)
  }, [])

  const renderCritter = (critter: Critter) => {
    switch (critter.type) {
      case 'squirrel':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[var(--foreground)]">
            {/* Squirrel body */}
            <ellipse cx="16" cy="20" rx="6" ry="8" />
            {/* Head */}
            <circle cx="16" cy="12" r="5" />
            {/* Ear */}
            <circle cx="13" cy="8" r="2" />
            <circle cx="19" cy="8" r="2" />
            {/* Bushy tail */}
            <path d="M 10,22 Q 5,20 4,14 Q 3,10 6,8 Q 8,10 9,14 Q 10,18 10,22" opacity="0.8" />
            {/* Eye */}
            <circle cx="14" cy="11" r="1" fill="white" />
            <circle cx="18" cy="11" r="1" fill="white" />
            {/* Legs */}
            <rect x="13" y="26" width="2" height="4" rx="1" />
            <rect x="17" y="26" width="2" height="4" rx="1" />
          </svg>
        )

      case 'rabbit':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[var(--foreground)]">
            {/* Rabbit body */}
            <ellipse cx="16" cy="21" rx="7" ry="7" />
            {/* Head */}
            <ellipse cx="16" cy="14" rx="5" ry="6" />
            {/* Long ears */}
            <ellipse cx="13" cy="6" rx="2" ry="6" />
            <ellipse cx="19" cy="6" rx="2" ry="6" />
            {/* Eye */}
            <circle cx="14" cy="13" r="1.5" fill="white" />
            <circle cx="18" cy="13" r="1.5" fill="white" />
            {/* Nose */}
            <circle cx="16" cy="16" r="1" />
            {/* Legs */}
            <ellipse cx="13" cy="26" rx="2" ry="3" />
            <ellipse cx="19" cy="26" rx="2" ry="3" />
            {/* Fluffy tail */}
            <circle cx="10" cy="22" r="3" opacity="0.7" />
          </svg>
        )

      case 'hedgehog':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[var(--foreground)]">
            {/* Hedgehog body */}
            <ellipse cx="16" cy="22" rx="8" ry="6" />
            {/* Spiky back */}
            <path d="M 10,18 L 8,14 M 12,17 L 11,13 M 14,16 L 14,12 M 16,16 L 16,11 M 18,16 L 18,12 M 20,17 L 21,13 M 22,18 L 24,14"
                  stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            {/* Pointed face */}
            <path d="M 16,22 L 12,20 L 10,19 Q 8,18 8,20 Q 8,21 10,21 L 16,22" />
            {/* Eye */}
            <circle cx="11" cy="19" r="1" fill="white" />
            {/* Legs */}
            <rect x="12" y="26" width="2" height="3" rx="1" />
            <rect x="18" y="26" width="2" height="3" rx="1" />
          </svg>
        )

      case 'fox':
        return (
          <svg width="36" height="32" viewBox="0 0 36 32" fill="currentColor" className="text-[var(--foreground)]">
            {/* Fox body */}
            <ellipse cx="20" cy="21" rx="8" ry="7" />
            {/* Head */}
            <circle cx="14" cy="14" r="6" />
            {/* Pointed ears */}
            <path d="M 10,10 L 8,4 L 12,8" />
            <path d="M 18,10 L 20,4 L 16,8" />
            {/* Snout */}
            <ellipse cx="11" cy="16" rx="3" ry="2.5" opacity="0.9" />
            {/* Eye */}
            <circle cx="13" cy="13" r="1.5" fill="white" />
            {/* Bushy tail */}
            <path d="M 26,22 Q 30,20 32,16 Q 33,12 30,10 Q 28,12 27,16 Q 26,20 26,22" opacity="0.8" />
            {/* Legs */}
            <rect x="16" y="25" width="2" height="5" rx="1" />
            <rect x="21" y="25" width="2" height="5" rx="1" />
          </svg>
        )

      case 'deer':
        return (
          <svg width="36" height="32" viewBox="0 0 36 32" fill="currentColor" className="text-[var(--foreground)]">
            {/* Deer body */}
            <ellipse cx="20" cy="20" rx="9" ry="8" />
            {/* Head */}
            <ellipse cx="12" cy="14" rx="4" ry="5" />
            {/* Neck */}
            <path d="M 14,17 L 16,20" strokeWidth="4" stroke="currentColor" />
            {/* Small antlers */}
            <path d="M 10,10 L 8,6 M 10,10 L 12,6 M 14,10 L 13,6 M 14,10 L 16,7"
                  stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Eye */}
            <circle cx="11" cy="13" r="1.5" fill="white" />
            {/* Legs */}
            <rect x="16" y="25" width="1.5" height="6" rx="0.5" />
            <rect x="19" y="25" width="1.5" height="6" rx="0.5" />
            <rect x="22" y="25" width="1.5" height="6" rx="0.5" />
            <rect x="25" y="25" width="1.5" height="6" rx="0.5" />
            {/* Short tail */}
            <ellipse cx="28" cy="20" rx="2" ry="3" opacity="0.7" />
          </svg>
        )

      default:
        return null
    }
  }

  const renderNightCreature = (creature: NightCreature) => {
    switch (creature.type) {
      case 'owl':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" className="text-[var(--foreground)]">
            {/* Owl body */}
            <ellipse cx="20" cy="24" rx="10" ry="12" />
            {/* Head (part of body, owl style) */}
            <circle cx="20" cy="16" r="9" />
            {/* Ear tufts */}
            <path d="M 14,8 L 12,4 L 16,8" />
            <path d="M 26,8 L 28,4 L 24,8" />
            {/* Eyes (large, round) */}
            <circle cx="16" cy="16" r="4" fill="white" />
            <circle cx="24" cy="16" r="4" fill="white" />
            {/* Pupils */}
            <circle cx="16" cy="16" r="2" fill="currentColor" />
            <circle cx="24" cy="16" r="2" fill="currentColor" />
            {/* Beak */}
            <path d="M 20,18 L 18,22 L 22,22 Z" />
            {/* Wing */}
            <ellipse cx="12" cy="24" rx="4" ry="8" opacity="0.7" />
            <ellipse cx="28" cy="24" rx="4" ry="8" opacity="0.7" />
            {/* Feet */}
            <path d="M 17,34 L 15,38 M 17,34 L 17,38 M 17,34 L 19,38" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M 23,34 L 21,38 M 23,34 L 23,38 M 23,34 L 25,38" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        )

      case 'firefly':
        return (
          <svg width="8" height="8" viewBox="0 0 8 8">
            {/* Glow effect */}
            <circle cx="4" cy="4" r="3" fill="rgba(255, 255, 100, 0.3)" className="firefly-glow" />
            {/* Core */}
            <circle cx="4" cy="4" r="1.5" fill="rgba(255, 255, 150, 0.9)" className="firefly-core" />
          </svg>
        )

      case 'bat':
        return (
          <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor" className="text-[var(--foreground)]">
            {/* Body */}
            <ellipse cx="16" cy="12" rx="3" ry="4" />
            {/* Head */}
            <circle cx="16" cy="8" r="2.5" />
            {/* Ears */}
            <path d="M 14,6 L 13,3 L 15,6" />
            <path d="M 18,6 L 19,3 L 17,6" />
            {/* Left wing */}
            <path d="M 13,12 Q 8,10 4,12 Q 2,13 3,15 Q 5,14 8,13 Q 11,12 13,13" opacity="0.9" />
            <path d="M 10,13 Q 6,14 3,16 Q 1,17 2,19 Q 4,17 7,15 Q 9,14 10,14" opacity="0.8" />
            {/* Right wing */}
            <path d="M 19,12 Q 24,10 28,12 Q 30,13 29,15 Q 27,14 24,13 Q 21,12 19,13" opacity="0.9" />
            <path d="M 22,13 Q 26,14 29,16 Q 31,17 30,19 Q 28,17 25,15 Q 23,14 22,14" opacity="0.8" />
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 pointer-events-none z-10 overflow-hidden">
      {/* Day creatures */}
      <div
        className="transition-opacity duration-[2000ms]"
        style={{ opacity: isNightTime ? 0 : 1 }}
      >
        {critters.map((critter) => (
          <div
            key={critter.id}
            className="absolute"
            style={{
              bottom: `${8 + critter.yOffset}px`,
              animation: `walkCritter ${critter.speed}s linear ${critter.delay}s infinite`,
            }}
          >
            {renderCritter(critter)}
          </div>
        ))}
      </div>

      {/* Night creatures */}
      <div
        className="transition-opacity duration-[2000ms]"
        style={{ opacity: isNightTime ? 1 : 0 }}
      >
        {nightCreatures.map((creature) => {
          if (creature.type === 'bat') {
            // Bats fly across the screen like day critters
            return (
              <div
                key={creature.id}
                className="absolute"
                style={{
                  bottom: `${8 + creature.yOffset}px`,
                  animation: `walkCritter ${creature.speed}s linear ${creature.delay}s infinite`,
                }}
              >
                {renderNightCreature(creature)}
              </div>
            )
          } else if (creature.type === 'owl') {
            // Owls are stationary
            return (
              <div
                key={creature.id}
                className="absolute"
                style={{
                  bottom: `${8 + creature.yOffset}px`,
                  left: `${creature.xPosition}%`,
                  animation: `owlSway 4s ease-in-out ${creature.delay}s infinite`,
                }}
              >
                {renderNightCreature(creature)}
              </div>
            )
          } else if (creature.type === 'firefly') {
            // Fireflies float and glow
            return (
              <div
                key={creature.id}
                className="absolute"
                style={{
                  bottom: `${8 + creature.yOffset}px`,
                  left: `${creature.xPosition}%`,
                  animation: `fireflyFloat 3s ease-in-out ${creature.delay}s infinite`,
                }}
              >
                {renderNightCreature(creature)}
              </div>
            )
          }
          return null
        })}
      </div>

      <style jsx>{`
        @keyframes walkCritter {
          0% {
            left: -50px;
            transform: scaleX(1);
          }
          49% {
            transform: scaleX(1);
          }
          50% {
            left: 50%;
            transform: scaleX(-1);
          }
          99% {
            transform: scaleX(-1);
          }
          100% {
            left: calc(100% + 50px);
            transform: scaleX(1);
          }
        }

        @keyframes fireflyFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-8px) translateX(4px);
          }
          66% {
            transform: translateY(-4px) translateX(-4px);
          }
        }

        @keyframes owlSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        :global(.firefly-glow) {
          animation: fireflyGlow 2s ease-in-out infinite;
        }

        :global(.firefly-core) {
          animation: fireflyGlow 2s ease-in-out infinite;
        }

        @keyframes fireflyGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
