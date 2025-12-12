'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LearningLevel } from '@/types/learning'

interface StoryIllustrationProps {
  theme: IllustrationTheme
  level: LearningLevel
  caption?: string
  className?: string
}

export type IllustrationTheme =
  | 'garden-growing'
  | 'sun-energy'
  | 'water-journey'
  | 'soil-underground'
  | 'compost-magic'
  | 'food-chain'
  | 'house-building'
  | 'waste-sorting'
  | 'tree-planting'
  | 'rain-collecting'
  | 'seeds-planting'
  | 'animals-ecosystem'
  | 'farm-vegetables'
  | 'wind-turbine'
  | 'bicycle-transport'
  | 'recycling-bins'

// SVG-based illustrations with cute, picture book style
export function StoryIllustration({
  theme,
  level,
  caption,
  className = ''
}: StoryIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Only show for elementary and middle school
  const showIllustration = level === 'ELEMENTARY' || level === 'MIDDLE_SCHOOL'

  if (!showIllustration) {
    return null
  }

  const isElementary = level === 'ELEMENTARY'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`my-6 rounded-2xl overflow-hidden border-4 ${
        isElementary
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-emerald-400 bg-emerald-50'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/10] w-full">
        <IllustrationSVG theme={theme} isElementary={isElementary} isHovered={isHovered} />
      </div>
      {caption && (
        <div className={`p-3 text-center ${
          isElementary ? 'bg-yellow-100' : 'bg-emerald-100'
        }`}>
          <p className={`font-bold ${
            isElementary ? 'text-yellow-800 text-lg' : 'text-emerald-800'
          }`}>
            {isElementary ? '🌟 ' : ''}{caption}{isElementary ? ' 🌟' : ''}
          </p>
        </div>
      )}
    </motion.div>
  )
}

// Individual SVG illustrations
function IllustrationSVG({
  theme,
  isElementary,
  isHovered
}: {
  theme: IllustrationTheme
  isElementary: boolean
  isHovered: boolean
}) {
  const bgColor = isElementary ? '#FEF9C3' : '#D1FAE5'
  const accentColor = isElementary ? '#FACC15' : '#10B981'

  switch (theme) {
    case 'garden-growing':
      return <GardenGrowingIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'sun-energy':
      return <SunEnergyIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'water-journey':
      return <WaterJourneyIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'soil-underground':
      return <SoilUndergroundIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'compost-magic':
      return <CompostMagicIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'food-chain':
      return <FoodChainIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'house-building':
      return <HouseBuildingIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'waste-sorting':
      return <WasteSortingIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'tree-planting':
      return <TreePlantingIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'rain-collecting':
      return <RainCollectingIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'seeds-planting':
      return <SeedsPlantingIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'animals-ecosystem':
      return <AnimalsEcosystemIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'farm-vegetables':
      return <FarmVegetablesIllustration isElementary={isElementary} isHovered={isHovered} />
    case 'wind-turbine':
      return <WindTurbineIllustration isElementary={isElementary} isHovered={isHovered} />
    default:
      return <DefaultIllustration isElementary={isElementary} theme={theme} />
  }
}

// Garden Growing - cute plants sprouting
function GardenGrowingIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Sky */}
      <rect x="0" y="0" width="400" height="150" fill={isElementary ? '#87CEEB' : '#7DD3FC'} />

      {/* Sun with face */}
      <motion.g animate={isHovered ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.3 }}>
        <circle cx="340" cy="50" r="35" fill="#FFD700" />
        {isElementary && (
          <>
            <circle cx="330" cy="45" r="4" fill="#333" />
            <circle cx="350" cy="45" r="4" fill="#333" />
            <path d="M330,58 Q340,68 350,58" fill="none" stroke="#333" strokeWidth="2" />
          </>
        )}
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={340 + Math.cos(i * 45 * Math.PI / 180) * 40}
            y1={50 + Math.sin(i * 45 * Math.PI / 180) * 40}
            x2={340 + Math.cos(i * 45 * Math.PI / 180) * 55}
            y2={50 + Math.sin(i * 45 * Math.PI / 180) * 55}
            stroke="#FFD700"
            strokeWidth="4"
            strokeLinecap="round"
            animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.g>

      {/* Clouds */}
      <g opacity="0.9">
        <ellipse cx="80" cy="50" rx="40" ry="20" fill="white" />
        <ellipse cx="50" cy="45" rx="25" ry="15" fill="white" />
        <ellipse cx="110" cy="45" rx="25" ry="15" fill="white" />
      </g>

      {/* Ground */}
      <rect x="0" y="150" width="400" height="100" fill="#8B4513" />
      <rect x="0" y="150" width="400" height="20" fill="#228B22" />

      {/* Plants - growing animation */}
      {[60, 140, 220, 300].map((x, i) => (
        <motion.g
          key={i}
          animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
        >
          {/* Stem */}
          <rect x={x - 3} y="100" width="6" height="70" fill="#228B22" rx="3" />
          {/* Leaves */}
          <ellipse cx={x - 15} cy="120" rx="15" ry="8" fill="#32CD32" transform={`rotate(-30 ${x - 15} 120)`} />
          <ellipse cx={x + 15} cy="110" rx="15" ry="8" fill="#32CD32" transform={`rotate(30 ${x + 15} 110)`} />
          {/* Flower/Fruit */}
          <circle cx={x} cy="95" r={12 + i * 2} fill={['#FF6B6B', '#FFD93D', '#FF8C00', '#FF69B4'][i]} />
          {isElementary && i === 1 && (
            <>
              <circle cx={x - 5} cy="93" r="2" fill="#333" />
              <circle cx={x + 5} cy="93" r="2" fill="#333" />
              <path d={`M${x - 4},98 Q${x},102 ${x + 4},98`} fill="none" stroke="#333" strokeWidth="1.5" />
            </>
          )}
        </motion.g>
      ))}

      {/* Watering can */}
      <motion.g
        animate={isHovered ? { rotate: -15 } : { rotate: 0 }}
        style={{ transformOrigin: '30px 200px' }}
      >
        <ellipse cx="30" cy="200" rx="20" ry="15" fill="#4A90D9" />
        <rect x="10" y="185" width="40" height="15" fill="#4A90D9" rx="5" />
        <path d="M50,195 L70,180 L75,185" fill="none" stroke="#4A90D9" strokeWidth="6" strokeLinecap="round" />
        {isHovered && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 20] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <circle cx="75" cy="190" r="3" fill="#60A5FA" />
            <circle cx="80" cy="195" r="2" fill="#60A5FA" />
          </motion.g>
        )}
      </motion.g>
    </svg>
  )
}

// Sun Energy - solar panels with happy sun
function SunEnergyIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sunnyDay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E90FF" />
          <stop offset="100%" stopColor="#87CEEB" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="180" fill="url(#sunnyDay)" />

      {/* Big happy sun */}
      <motion.g animate={isHovered ? { scale: 1.1 } : { scale: 1 }}>
        <circle cx="200" cy="50" r="50" fill="#FFD700" />
        {isElementary && (
          <>
            <circle cx="185" cy="45" r="6" fill="#333" />
            <circle cx="215" cy="45" r="6" fill="#333" />
            <path d="M180,65 Q200,85 220,65" fill="none" stroke="#333" strokeWidth="3" />
          </>
        )}
        {/* Rays */}
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={i}
            x1={200 + Math.cos(i * 30 * Math.PI / 180) * 55}
            y1={50 + Math.sin(i * 30 * Math.PI / 180) * 55}
            x2={200 + Math.cos(i * 30 * Math.PI / 180) * 80}
            y2={50 + Math.sin(i * 30 * Math.PI / 180) * 80}
            stroke="#FFA500"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
          />
        ))}
      </motion.g>

      {/* Ground */}
      <rect x="0" y="180" width="400" height="70" fill="#90EE90" />

      {/* House with solar panels */}
      <g transform="translate(250, 100)">
        {/* House body */}
        <rect x="0" y="40" width="100" height="80" fill="#FFF5EE" stroke="#8B4513" strokeWidth="2" />
        {/* Roof with solar panels */}
        <polygon points="-10,40 50,-10 110,40" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
        {/* Solar panels on roof */}
        <motion.g animate={isHovered ? { fill: '#2563EB' } : { fill: '#1E40AF' }}>
          <rect x="10" y="5" width="30" height="20" fill="#1E3A8A" rx="2" transform="rotate(-30 25 15)" />
          <rect x="55" y="5" width="30" height="20" fill="#1E3A8A" rx="2" transform="rotate(30 70 15)" />
        </motion.g>
        {/* Window */}
        <rect x="35" y="60" width="30" height="30" fill="#87CEEB" stroke="#8B4513" strokeWidth="2" />
        {/* Door */}
        <rect x="15" y="80" width="25" height="40" fill="#8B4513" />
        <circle cx="35" cy="100" r="3" fill="#FFD700" />
      </g>

      {/* Energy flow lines */}
      <motion.path
        d="M280,110 Q320,80 350,130 Q380,180 350,200"
        fill="none"
        stroke="#FFD700"
        strokeWidth="4"
        strokeDasharray="10,5"
        animate={{ strokeDashoffset: [0, -30] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Light bulb */}
      <motion.g
        animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <ellipse cx="360" cy="210" rx="15" ry="20" fill="#FFD700" />
        <rect x="352" y="228" width="16" height="10" fill="#888" rx="2" />
        {isHovered && (
          <>
            <line x1="340" y1="200" x2="330" y2="190" stroke="#FFD700" strokeWidth="3" />
            <line x1="380" y1="200" x2="390" y2="190" stroke="#FFD700" strokeWidth="3" />
            <line x1="360" y1="185" x2="360" y2="175" stroke="#FFD700" strokeWidth="3" />
          </>
        )}
      </motion.g>

      {/* Happy character */}
      {isElementary && (
        <g transform="translate(60, 180)">
          <circle cx="30" cy="30" r="20" fill="#FFDAB9" />
          <circle cx="23" cy="27" r="3" fill="#333" />
          <circle cx="37" cy="27" r="3" fill="#333" />
          <path d="M23,37 Q30,45 37,37" fill="none" stroke="#333" strokeWidth="2" />
          <rect x="15" y="50" width="30" height="35" fill="#3B82F6" rx="5" />
        </g>
      )}
    </svg>
  )
}

// Water Journey - raindrops with faces traveling
function WaterJourneyIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Rainy sky */}
      <rect x="0" y="0" width="400" height="100" fill="#64748B" />

      {/* Clouds */}
      <g>
        <ellipse cx="100" cy="40" rx="60" ry="30" fill="#94A3B8" />
        <ellipse cx="60" cy="35" rx="35" ry="20" fill="#94A3B8" />
        <ellipse cx="140" cy="35" rx="40" ry="22" fill="#94A3B8" />

        <ellipse cx="300" cy="50" rx="50" ry="25" fill="#94A3B8" />
        <ellipse cx="260" cy="45" rx="30" ry="18" fill="#94A3B8" />
        <ellipse cx="340" cy="45" rx="30" ry="18" fill="#94A3B8" />
      </g>

      {/* Raindrops with faces */}
      {[80, 130, 200, 280, 340].map((x, i) => (
        <motion.g
          key={i}
          animate={{
            y: [0, 100],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          <path
            d={`M${x},70 Q${x - 8},85 ${x},100 Q${x + 8},85 ${x},70`}
            fill="#60A5FA"
          />
          {isElementary && (
            <>
              <circle cx={x - 3} cy={85} r="2" fill="#1E40AF" />
              <circle cx={x + 3} cy={85} r="2" fill="#1E40AF" />
              <path d={`M${x - 3},90 Q${x},94 ${x + 3},90`} fill="none" stroke="#1E40AF" strokeWidth="1" />
            </>
          )}
        </motion.g>
      ))}

      {/* Ground with puddles */}
      <rect x="0" y="180" width="400" height="70" fill="#8B4513" />
      <rect x="0" y="175" width="400" height="10" fill="#228B22" />

      {/* Puddles */}
      <ellipse cx="100" cy="200" rx="40" ry="10" fill="#60A5FA" opacity="0.7" />
      <ellipse cx="300" cy="210" rx="50" ry="12" fill="#60A5FA" opacity="0.7" />

      {/* River */}
      <motion.path
        d="M0,220 Q100,200 200,220 Q300,240 400,220"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="30"
        animate={isHovered ? { d: [
          "M0,220 Q100,200 200,220 Q300,240 400,220",
          "M0,220 Q100,240 200,220 Q300,200 400,220",
          "M0,220 Q100,200 200,220 Q300,240 400,220"
        ] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Fish in river */}
      {isElementary && (
        <motion.g
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ellipse cx="250" cy="225" rx="15" ry="8" fill="#FF6B6B" />
          <polygon points="265,225 280,215 280,235" fill="#FF6B6B" />
          <circle cx="243" cy="223" r="2" fill="#000" />
        </motion.g>
      )}

      {/* Duck */}
      <motion.g
        animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <ellipse cx="150" cy="195" rx="20" ry="12" fill="#FFD700" />
        <circle cx="160" cy="185" r="12" fill="#FFD700" />
        <polygon points="170,185 185,182 170,188" fill="#FF8C00" />
        <circle cx="165" cy="182" r="3" fill="#000" />
      </motion.g>
    </svg>
  )
}

// Soil Underground - cute worms and roots
function SoilUndergroundIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Above ground */}
      <rect x="0" y="0" width="400" height="60" fill="#87CEEB" />
      <rect x="0" y="55" width="400" height="15" fill="#228B22" />

      {/* Plants above */}
      {[60, 200, 340].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y="30" width="6" height="40" fill="#228B22" />
          <ellipse cx={x} cy="25" rx="20" ry="15" fill="#32CD32" />
        </g>
      ))}

      {/* Underground layers */}
      <rect x="0" y="70" width="400" height="60" fill="#8B4513" />
      <rect x="0" y="130" width="400" height="60" fill="#654321" />
      <rect x="0" y="190" width="400" height="60" fill="#4A3728" />

      {/* Roots */}
      {[60, 200, 340].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x},70 Q${x - 20},100 ${x - 30},150`}
            fill="none"
            stroke="#8B6914"
            strokeWidth="4"
          />
          <path
            d={`M${x},70 Q${x + 15},110 ${x + 25},160`}
            fill="none"
            stroke="#8B6914"
            strokeWidth="4"
          />
          <path
            d={`M${x},70 Q${x},120 ${x - 5},180`}
            fill="none"
            stroke="#8B6914"
            strokeWidth="5"
          />
        </g>
      ))}

      {/* Worms with faces */}
      {[
        { x: 100, y: 100, rotation: 20 },
        { x: 280, y: 150, rotation: -30 },
        { x: 150, y: 200, rotation: 10 },
      ].map((worm, i) => (
        <motion.g
          key={i}
          transform={`translate(${worm.x}, ${worm.y}) rotate(${worm.rotation})`}
          animate={isHovered ? { x: [0, 10, 0] } : { x: 0 }}
          transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
        >
          <path
            d="M0,0 Q15,-10 30,0 Q45,10 60,0"
            fill="none"
            stroke="#FF9999"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {isElementary && (
            <>
              <circle cx="5" cy="-2" r="3" fill="#000" />
              <circle cx="15" cy="-2" r="3" fill="#000" />
              <path d="M8,5 Q12,8 16,5" fill="none" stroke="#000" strokeWidth="1" />
            </>
          )}
        </motion.g>
      ))}

      {/* Rocks */}
      <ellipse cx="80" cy="140" rx="15" ry="10" fill="#808080" />
      <ellipse cx="320" cy="180" rx="20" ry="12" fill="#696969" />
      <ellipse cx="180" cy="220" rx="12" ry="8" fill="#778899" />

      {/* Underground treasure/nutrients */}
      {[120, 250, 350].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={130 + i * 30}
          r="6"
          fill="#FFD700"
          animate={isHovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
        />
      ))}

      {/* Layer labels for middle school */}
      {!isElementary && (
        <>
          <text x="370" y="95" fontSize="10" fill="#FFF" fontWeight="bold">Topsoil</text>
          <text x="370" y="155" fontSize="10" fill="#FFF" fontWeight="bold">Subsoil</text>
          <text x="370" y="215" fontSize="10" fill="#FFF" fontWeight="bold">Bedrock</text>
        </>
      )}
    </svg>
  )
}

// Compost Magic - scraps transforming
function CompostMagicIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="400" height="250" fill="#E8F5E9" />

      {/* Food scraps on left */}
      <g transform="translate(30, 80)">
        <text x="40" y="-10" fontSize="14" fill="#666" fontWeight="bold">Food Scraps</text>
        {/* Banana peel */}
        <path d="M20,30 Q40,10 60,30 Q40,50 20,30" fill="#FFE135" />
        {/* Apple core */}
        <ellipse cx="50" cy="70" rx="15" ry="20" fill="#C41E3A" />
        <rect x="48" y="45" width="4" height="10" fill="#8B4513" />
        {/* Leaf */}
        <ellipse cx="30" cy="100" rx="20" ry="10" fill="#228B22" transform="rotate(-20 30 100)" />
        {/* Eggshell */}
        <ellipse cx="70" cy="110" rx="12" ry="15" fill="#FFF8DC" />

        {isElementary && (
          <>
            <circle cx="50" cy="65" r="2" fill="#000" />
            <circle cx="55" cy="65" r="2" fill="#000" />
            <path d="M48,72 Q52,76 56,72" fill="none" stroke="#000" strokeWidth="1" />
          </>
        )}
      </g>

      {/* Magic arrow */}
      <motion.g
        animate={isHovered ? { x: [0, 10, 0] } : { x: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <path
          d="M120,120 L180,120"
          fill="none"
          stroke="#FFD700"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <polygon points="180,120 165,105 165,135" fill="#FFD700" />
        {/* Sparkles */}
        <motion.text
          x="150"
          y="100"
          fontSize="20"
          animate={{ opacity: [0.5, 1, 0.5], rotate: [0, 10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ✨
        </motion.text>
      </motion.g>

      {/* Compost bin */}
      <g transform="translate(200, 60)">
        <text x="40" y="-10" fontSize="14" fill="#666" fontWeight="bold">Compost Bin</text>
        {/* Bin */}
        <rect x="10" y="20" width="80" height="100" fill="#8B4513" rx="5" />
        <rect x="15" y="25" width="70" height="30" fill="#654321" rx="3" />

        {/* Worms in bin */}
        <motion.path
          d="M30,70 Q40,65 50,70 Q60,75 70,70"
          fill="none"
          stroke="#FF9999"
          strokeWidth="4"
          strokeLinecap="round"
          animate={isHovered ? { d: [
            "M30,70 Q40,65 50,70 Q60,75 70,70",
            "M30,70 Q40,75 50,70 Q60,65 70,70",
            "M30,70 Q40,65 50,70 Q60,75 70,70"
          ] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Steam/heat */}
        {isHovered && [...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${30 + i * 20},20 Q${35 + i * 20},5 ${30 + i * 20},-10`}
            fill="none"
            stroke="#999"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0], y: [0, -10] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </g>

      {/* Arrow to result */}
      <motion.g
        animate={isHovered ? { x: [0, 10, 0] } : { x: 0 }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      >
        <path
          d="M300,120 L350,120"
          fill="none"
          stroke="#228B22"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <polygon points="350,120 335,105 335,135" fill="#228B22" />
      </motion.g>

      {/* Rich soil result */}
      <g transform="translate(330, 70)">
        <text x="20" y="-10" fontSize="14" fill="#666" fontWeight="bold">Rich Soil!</text>
        {/* Soil pile */}
        <ellipse cx="40" cy="100" rx="35" ry="20" fill="#3D2914" />
        <ellipse cx="40" cy="90" rx="30" ry="15" fill="#4A3728" />
        <ellipse cx="40" cy="80" rx="25" ry="12" fill="#5D4037" />

        {/* Happy plant growing from soil */}
        <motion.g
          animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <rect x="37" y="50" width="6" height="35" fill="#228B22" />
          <ellipse cx="30" cy="55" rx="12" ry="8" fill="#32CD32" transform="rotate(-30 30 55)" />
          <ellipse cx="50" cy="50" rx="12" ry="8" fill="#32CD32" transform="rotate(30 50 50)" />
          {isElementary && (
            <>
              <circle cx="37" cy="40" r="8" fill="#FF6B6B" />
              <circle cx="35" cy="38" r="1.5" fill="#000" />
              <circle cx="39" cy="38" r="1.5" fill="#000" />
              <path d="M35,42 Q37,44 39,42" fill="none" stroke="#000" strokeWidth="1" />
            </>
          )}
        </motion.g>
      </g>
    </svg>
  )
}

// Food Chain - animals in a cute chain
function FoodChainIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="400" height="250" fill="#87CEEB" />
      <rect x="0" y="180" width="400" height="70" fill="#228B22" />

      {/* Sun */}
      <circle cx="350" cy="50" r="30" fill="#FFD700" />

      {/* Pyramid levels */}
      {/* Base - Plants */}
      <rect x="50" y="180" width="300" height="40" fill="#32CD32" rx="5" />
      <text x="200" y="205" textAnchor="middle" fontSize="12" fill="#FFF" fontWeight="bold">
        Plants (Producers)
      </text>

      {/* Level 2 - Herbivores */}
      <rect x="100" y="130" width="200" height="45" fill="#90EE90" rx="5" />

      {/* Cute rabbit */}
      <motion.g
        animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <ellipse cx="150" cy="155" rx="15" ry="12" fill="#D1D5DB" />
        <ellipse cx="165" cy="148" rx="8" ry="6" fill="#D1D5DB" />
        <ellipse cx="163" cy="138" rx="4" ry="10" fill="#D1D5DB" />
        <ellipse cx="170" cy="140" rx="4" ry="10" fill="#D1D5DB" />
        {isElementary && (
          <>
            <circle cx="167" cy="146" r="2" fill="#000" />
            <ellipse cx="170" cy="152" rx="3" ry="2" fill="#FFB6C1" />
          </>
        )}
      </motion.g>

      {/* Cute deer */}
      <motion.g
        animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
      >
        <ellipse cx="250" cy="155" rx="20" ry="12" fill="#C4A484" />
        <ellipse cx="270" cy="145" rx="10" ry="8" fill="#C4A484" />
        {isElementary && (
          <>
            <circle cx="273" cy="143" r="2" fill="#000" />
          </>
        )}
      </motion.g>

      <text x="200" y="170" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">
        Herbivores
      </text>

      {/* Level 3 - Carnivores */}
      <rect x="140" y="80" width="120" height="45" fill="#F59E0B" rx="5" />

      {/* Cute fox */}
      <motion.g
        animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <ellipse cx="200" cy="105" rx="18" ry="12" fill="#F97316" />
        <ellipse cx="220" cy="98" rx="10" ry="8" fill="#F97316" />
        <polygon points="225,92 235,85 228,95" fill="#F97316" />
        <polygon points="230,93 238,88 232,97" fill="#F97316" />
        {isElementary && (
          <>
            <circle cx="222" cy="96" r="2" fill="#000" />
            <ellipse cx="228" cy="100" rx="4" ry="2" fill="#000" />
          </>
        )}
      </motion.g>

      <text x="200" y="120" textAnchor="middle" fontSize="10" fill="#FFF" fontWeight="bold">
        Carnivores
      </text>

      {/* Top - Apex */}
      <polygon points="200,30 160,75 240,75" fill="#EF4444" />

      {/* Eagle */}
      <motion.g
        animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ellipse cx="200" cy="55" rx="12" ry="8" fill="#78350F" />
        <ellipse cx="210" cy="50" rx="6" ry="5" fill="#FEF3C7" />
        <polygon points="214,50 222,51 214,53" fill="#F59E0B" />
        {isElementary && <circle cx="211" cy="49" r="1.5" fill="#000" />}
        <path d="M188,52 Q175,45 170,55" fill="none" stroke="#78350F" strokeWidth="4" />
        <path d="M212,52 Q225,45 230,55" fill="none" stroke="#78350F" strokeWidth="4" />
      </motion.g>

      <text x="200" y="70" textAnchor="middle" fontSize="8" fill="#FFF" fontWeight="bold">
        Apex
      </text>

      {/* Energy arrows */}
      <motion.path
        d="M200,175 L200,130"
        fill="none"
        stroke="#FFD700"
        strokeWidth="3"
        strokeDasharray="5,3"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M200,125 L200,80"
        fill="none"
        stroke="#FFD700"
        strokeWidth="3"
        strokeDasharray="5,3"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
    </svg>
  )
}

// House Building - construction scene
function HouseBuildingIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Sky */}
      <rect x="0" y="0" width="400" height="180" fill="#87CEEB" />
      {/* Ground */}
      <rect x="0" y="180" width="400" height="70" fill="#228B22" />

      {/* Sun */}
      <circle cx="50" cy="50" r="30" fill="#FFD700" />

      {/* House under construction */}
      <g transform="translate(100, 60)">
        {/* Foundation */}
        <rect x="0" y="120" width="200" height="20" fill="#808080" />

        {/* Walls */}
        <rect x="10" y="40" width="180" height="80" fill="#FFF5EE" stroke="#8B4513" strokeWidth="2" />

        {/* Roof frame */}
        <polygon points="0,40 100,-20 200,40" fill="none" stroke="#8B4513" strokeWidth="4" />
        <line x1="100" y1="-20" x2="100" y2="40" stroke="#8B4513" strokeWidth="3" />

        {/* Solar panels on roof */}
        <rect x="40" y="0" width="40" height="25" fill="#1E3A8A" rx="2" transform="rotate(-25 60 12)" />
        <rect x="120" y="0" width="40" height="25" fill="#1E3A8A" rx="2" transform="rotate(25 140 12)" />

        {/* Windows */}
        <rect x="30" y="60" width="40" height="40" fill="#87CEEB" stroke="#8B4513" strokeWidth="2" />
        <rect x="130" y="60" width="40" height="40" fill="#87CEEB" stroke="#8B4513" strokeWidth="2" />

        {/* Door */}
        <rect x="80" y="70" width="40" height="50" fill="#8B4513" />

        {/* Insulation visible in wall */}
        <rect x="15" y="45" width="15" height="70" fill="#FFE4B5" opacity="0.8" />
        <text x="22" y="85" fontSize="6" fill="#8B4513" transform="rotate(-90 22 85)">Insulation</text>
      </g>

      {/* Construction worker */}
      {isElementary && (
        <motion.g
          transform="translate(320, 130)"
          animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <circle cx="20" cy="20" r="15" fill="#FFDAB9" />
          <rect x="5" y="0" width="30" height="10" fill="#FFD700" rx="2" />
          <circle cx="13" cy="18" r="3" fill="#000" />
          <circle cx="27" cy="18" r="3" fill="#000" />
          <path d="M15,27 Q20,32 25,27" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="8" y="35" width="24" height="30" fill="#FF8C00" rx="3" />
        </motion.g>
      )}

      {/* Trees */}
      <g transform="translate(30, 140)">
        <rect x="15" y="20" width="10" height="30" fill="#8B4513" />
        <ellipse cx="20" cy="15" rx="25" ry="20" fill="#228B22" />
      </g>

      {/* Labels */}
      <g>
        <text x="140" y="20" fontSize="10" fill="#1E40AF" fontWeight="bold">Solar Panels</text>
        <text x="50" y="110" fontSize="10" fill="#8B4513" fontWeight="bold">Insulation</text>
      </g>
    </svg>
  )
}

// Waste Sorting - recycling bins
function WasteSortingIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="400" height="250" fill="#E8F5E9" />

      {/* Three bins */}
      {[
        { x: 60, color: '#3B82F6', label: 'Recycle', items: '♻️' },
        { x: 175, color: '#22C55E', label: 'Compost', items: '🍎' },
        { x: 290, color: '#6B7280', label: 'Trash', items: '🗑️' },
      ].map((bin, i) => (
        <motion.g
          key={i}
          animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
        >
          {/* Bin body */}
          <rect x={bin.x} y="100" width="70" height="100" fill={bin.color} rx="5" />
          <rect x={bin.x + 5} y="105" width="60" height="20" fill="#FFF" opacity="0.3" rx="3" />

          {/* Bin opening */}
          <ellipse cx={bin.x + 35} cy="100" rx="35" ry="10" fill={bin.color} />
          <ellipse cx={bin.x + 35} cy="100" rx="30" ry="8" fill="#333" />

          {/* Label */}
          <text x={bin.x + 35} y="220" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">
            {bin.label}
          </text>

          {/* Symbol inside */}
          <text x={bin.x + 35} y="160" textAnchor="middle" fontSize="24">
            {bin.items}
          </text>

          {isElementary && (
            <>
              <circle cx={bin.x + 25} cy="145" r="4" fill="#000" />
              <circle cx={bin.x + 45} cy="145" r="4" fill="#000" />
              <path d={`M${bin.x + 25},165 Q${bin.x + 35},175 ${bin.x + 45},165`} fill="none" stroke="#000" strokeWidth="2" />
            </>
          )}
        </motion.g>
      ))}

      {/* Items being sorted */}
      <motion.g
        animate={isHovered ? { y: [0, 20, 40] } : { y: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {/* Bottle to recycle */}
        <rect x="85" y="50" width="20" height="40" fill="#60A5FA" rx="3" />
        <rect x="90" y="45" width="10" height="8" fill="#60A5FA" />
      </motion.g>

      <motion.g
        animate={isHovered ? { y: [0, 20, 40] } : { y: 0 }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      >
        {/* Apple to compost */}
        <circle cx="210" cy="60" r="15" fill="#EF4444" />
        <rect x="208" y="42" width="4" height="8" fill="#8B4513" />
      </motion.g>

      {/* Character */}
      {isElementary && (
        <g transform="translate(350, 100)">
          <circle cx="20" cy="20" r="18" fill="#FFDAB9" />
          <circle cx="13" cy="17" r="3" fill="#000" />
          <circle cx="27" cy="17" r="3" fill="#000" />
          <path d="M13,28 Q20,35 27,28" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="5" y="38" width="30" height="35" fill="#9333EA" rx="5" />
          <text x="20" y="150" textAnchor="middle" fontSize="10" fontWeight="bold">Great job!</text>
        </g>
      )}
    </svg>
  )
}

// Tree Planting
function TreePlantingIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect x="0" y="0" width="400" height="180" fill="#87CEEB" />
      <rect x="0" y="175" width="400" height="75" fill="#8B4513" />
      <rect x="0" y="175" width="400" height="10" fill="#228B22" />

      {/* Sun */}
      <circle cx="350" cy="50" r="35" fill="#FFD700" />

      {/* Small tree being planted */}
      <motion.g
        animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <rect x="195" y="120" width="10" height="60" fill="#8B4513" />
        <ellipse cx="200" cy="100" rx="35" ry="30" fill="#32CD32" />
        <ellipse cx="180" cy="110" rx="20" ry="18" fill="#228B22" />
        <ellipse cx="220" cy="108" rx="22" ry="18" fill="#228B22" />
      </motion.g>

      {/* Hole with dirt pile */}
      <ellipse cx="200" cy="185" rx="30" ry="10" fill="#5D4037" />

      {/* Big trees on sides */}
      <g transform="translate(40, 80)">
        <rect x="25" y="50" width="20" height="70" fill="#8B4513" />
        <ellipse cx="35" cy="35" rx="45" ry="40" fill="#228B22" />
      </g>
      <g transform="translate(280, 70)">
        <rect x="25" y="60" width="25" height="80" fill="#8B4513" />
        <ellipse cx="37" cy="40" rx="55" ry="50" fill="#228B22" />
      </g>

      {/* Gardener */}
      {isElementary && (
        <motion.g
          transform="translate(240, 120)"
          animate={isHovered ? { rotate: [0, 5, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <circle cx="20" cy="20" r="15" fill="#FFDAB9" />
          <circle cx="14" cy="17" r="3" fill="#000" />
          <circle cx="26" cy="17" r="3" fill="#000" />
          <path d="M14,27 Q20,33 26,27" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="5" y="35" width="30" height="35" fill="#22C55E" rx="5" />
          {/* Shovel */}
          <rect x="35" y="30" width="5" height="50" fill="#8B4513" />
          <rect x="30" y="75" width="15" height="8" fill="#6B7280" rx="2" />
        </motion.g>
      )}

      {/* Watering can */}
      <motion.g
        transform="translate(130, 160)"
        animate={isHovered ? { rotate: -20 } : { rotate: 0 }}
        style={{ transformOrigin: '20px 20px' }}
      >
        <ellipse cx="20" cy="20" rx="18" ry="12" fill="#3B82F6" />
        <rect x="5" y="8" width="30" height="12" fill="#3B82F6" rx="3" />
        <path d="M38,15 L55,5" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

// Rain Collecting
function RainCollectingIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Rainy sky */}
      <rect x="0" y="0" width="400" height="130" fill="#64748B" />
      <rect x="0" y="130" width="400" height="120" fill="#228B22" />

      {/* Cloud */}
      <g>
        <ellipse cx="200" cy="50" rx="70" ry="35" fill="#94A3B8" />
        <ellipse cx="150" cy="45" rx="40" ry="25" fill="#94A3B8" />
        <ellipse cx="250" cy="45" rx="45" ry="28" fill="#94A3B8" />
      </g>

      {/* Raindrops */}
      {[150, 180, 210, 240].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x},80 Q${x - 5},95 ${x},110 Q${x + 5},95 ${x},80`}
          fill="#60A5FA"
          animate={{ y: [0, 50], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* House with gutter */}
      <g transform="translate(50, 100)">
        <rect x="20" y="30" width="100" height="80" fill="#FFF5EE" stroke="#8B4513" strokeWidth="2" />
        <polygon points="10,30 70,-20 130,30" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
        {/* Gutter */}
        <rect x="5" y="28" width="130" height="8" fill="#6B7280" />
        {/* Downspout */}
        <rect x="130" y="28" width="8" height="85" fill="#6B7280" />
      </g>

      {/* Rain barrel */}
      <motion.g
        animate={isHovered ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ellipse cx="210" cy="210" rx="30" ry="10" fill="#1E3A5F" />
        <rect x="180" y="160" width="60" height="50" fill="#2563EB" />
        <ellipse cx="210" cy="160" rx="30" ry="10" fill="#3B82F6" />

        {/* Water inside */}
        <motion.rect
          x="185"
          y="175"
          width="50"
          height="30"
          fill="#60A5FA"
          animate={isHovered ? { height: [20, 35, 20] } : { height: 30 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {isElementary && (
          <>
            <circle cx="200" cy="185" r="3" fill="#1E40AF" />
            <circle cx="220" cy="185" r="3" fill="#1E40AF" />
            <path d="M200,195 Q210,200 220,195" fill="none" stroke="#1E40AF" strokeWidth="2" />
          </>
        )}
      </motion.g>

      {/* Water flow */}
      <motion.path
        d="M188,130 Q195,145 210,160"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="6"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        strokeDasharray="10,5"
      />

      {/* Garden */}
      <g transform="translate(280, 170)">
        {[0, 30, 60].map((x, i) => (
          <g key={i}>
            <rect x={x + 5} y="30" width="5" height="30" fill="#228B22" />
            <circle cx={x + 7} cy="25" r="10" fill={['#FF6B6B', '#FFD93D', '#FF8C00'][i]} />
          </g>
        ))}
      </g>

      {/* Watering arrow */}
      <motion.path
        d="M240,200 Q260,190 280,200"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeDasharray="5,3"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  )
}

// Seeds Planting
function SeedsPlantingIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect x="0" y="0" width="400" height="150" fill="#87CEEB" />
      <rect x="0" y="150" width="400" height="100" fill="#8B4513" />

      {/* Sun */}
      <circle cx="350" cy="50" r="30" fill="#FFD700" />

      {/* Seed packet */}
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="60" height="80" fill="#FFF" stroke="#333" strokeWidth="2" rx="5" />
        <text x="30" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">SEEDS</text>
        <circle cx="20" cy="50" r="8" fill="#8B4513" />
        <circle cx="40" cy="50" r="8" fill="#8B4513" />
        <circle cx="30" cy="65" r="8" fill="#8B4513" />
      </g>

      {/* Planting stages */}
      {/* Stage 1: Seed */}
      <g transform="translate(130, 150)">
        <ellipse cx="20" cy="20" rx="8" ry="5" fill="#8B4513" />
        <text x="20" y="50" textAnchor="middle" fontSize="10" fill="#FFF">1. Seed</text>
      </g>

      {/* Stage 2: Sprouting */}
      <motion.g
        transform="translate(200, 130)"
        animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <ellipse cx="20" cy="40" rx="8" ry="5" fill="#8B4513" />
        <rect x="18" y="20" width="4" height="20" fill="#90EE90" />
        <ellipse cx="15" cy="18" rx="8" ry="5" fill="#32CD32" transform="rotate(-30 15 18)" />
        <ellipse cx="25" cy="18" rx="8" ry="5" fill="#32CD32" transform="rotate(30 25 18)" />
        <text x="20" y="70" textAnchor="middle" fontSize="10" fill="#FFF">2. Sprout</text>
      </motion.g>

      {/* Stage 3: Growing */}
      <motion.g
        transform="translate(270, 100)"
        animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <rect x="18" y="30" width="6" height="50" fill="#228B22" />
        <ellipse cx="10" cy="35" rx="15" ry="8" fill="#32CD32" transform="rotate(-20 10 35)" />
        <ellipse cx="32" cy="28" rx="15" ry="8" fill="#32CD32" transform="rotate(20 32 28)" />
        <ellipse cx="8" cy="50" rx="12" ry="6" fill="#228B22" transform="rotate(-30 8 50)" />
        <text x="21" y="100" textAnchor="middle" fontSize="10" fill="#FFF">3. Plant</text>
      </motion.g>

      {/* Stage 4: Fruit */}
      <motion.g
        transform="translate(340, 70)"
        animate={isHovered ? { rotate: [0, 5, 0] } : { rotate: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <rect x="18" y="50" width="8" height="60" fill="#228B22" />
        <ellipse cx="22" cy="35" rx="25" ry="20" fill="#32CD32" />
        <circle cx="12" cy="45" r="10" fill="#FF6347" />
        <circle cx="32" cy="40" r="10" fill="#FF6347" />
        <text x="22" y="130" textAnchor="middle" fontSize="10" fill="#FFF">4. Fruit!</text>
      </motion.g>

      {/* Child planting */}
      {isElementary && (
        <g transform="translate(100, 90)">
          <circle cx="20" cy="20" r="15" fill="#FFDAB9" />
          <circle cx="14" cy="17" r="3" fill="#000" />
          <circle cx="26" cy="17" r="3" fill="#000" />
          <path d="M14,27 Q20,32 26,27" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="8" y="35" width="24" height="25" fill="#EC4899" rx="3" />
        </g>
      )}
    </svg>
  )
}

// Animals Ecosystem
function AnimalsEcosystemIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect x="0" y="0" width="400" height="250" fill="#87CEEB" />
      <rect x="0" y="180" width="400" height="70" fill="#228B22" />

      {/* Sun */}
      <circle cx="50" cy="50" r="30" fill="#FFD700" />

      {/* Tree */}
      <g transform="translate(320, 100)">
        <rect x="20" y="40" width="20" height="60" fill="#8B4513" />
        <ellipse cx="30" cy="30" rx="40" ry="35" fill="#228B22" />
      </g>

      {/* Pond */}
      <ellipse cx="200" cy="210" rx="80" ry="25" fill="#3B82F6" />

      {/* Butterfly */}
      <motion.g
        transform="translate(100, 60)"
        animate={isHovered ? { y: [0, -10, 0], x: [0, 10, 0] } : { y: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="20" cy="15" rx="3" ry="8" fill="#FFD700" />
        <ellipse cx="10" cy="10" rx="12" ry="8" fill="#FF69B4" />
        <ellipse cx="30" cy="10" rx="12" ry="8" fill="#FF69B4" />
        <ellipse cx="10" cy="20" rx="10" ry="6" fill="#FF1493" />
        <ellipse cx="30" cy="20" rx="10" ry="6" fill="#FF1493" />
      </motion.g>

      {/* Frog */}
      <motion.g
        transform="translate(160, 185)"
        animate={isHovered ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <ellipse cx="20" cy="20" rx="18" ry="12" fill="#32CD32" />
        <circle cx="12" cy="12" r="6" fill="#32CD32" />
        <circle cx="28" cy="12" r="6" fill="#32CD32" />
        {isElementary && (
          <>
            <circle cx="12" cy="10" r="3" fill="#FFF" />
            <circle cx="28" cy="10" r="3" fill="#FFF" />
            <circle cx="13" cy="10" r="1.5" fill="#000" />
            <circle cx="29" cy="10" r="1.5" fill="#000" />
            <path d="M15,22 Q20,26 25,22" fill="none" stroke="#228B22" strokeWidth="2" />
          </>
        )}
      </motion.g>

      {/* Duck */}
      <motion.g
        transform="translate(220, 195)"
        animate={isHovered ? { x: [0, 10, 0] } : { x: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="20" cy="15" rx="20" ry="12" fill="#FFD700" />
        <circle cx="35" cy="8" r="10" fill="#FFD700" />
        <polygon points="43,8 55,6 43,11" fill="#FF8C00" />
        {isElementary && <circle cx="38" cy="6" r="2" fill="#000" />}
      </motion.g>

      {/* Rabbit */}
      <motion.g
        transform="translate(50, 160)"
        animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
      >
        <ellipse cx="25" cy="30" rx="20" ry="15" fill="#D1D5DB" />
        <ellipse cx="40" cy="22" rx="10" ry="8" fill="#D1D5DB" />
        <ellipse cx="37" cy="10" rx="5" ry="12" fill="#D1D5DB" />
        <ellipse cx="45" cy="12" rx="5" ry="12" fill="#D1D5DB" />
        {isElementary && (
          <>
            <circle cx="43" cy="20" r="2" fill="#000" />
            <ellipse cx="47" cy="25" rx="4" ry="2" fill="#FFB6C1" />
          </>
        )}
      </motion.g>

      {/* Bird */}
      <motion.g
        transform="translate(280, 40)"
        animate={isHovered ? { y: [0, -5, 0], rotate: [0, 5, 0] } : { y: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ellipse cx="20" cy="15" rx="15" ry="10" fill="#EF4444" />
        <circle cx="32" cy="12" r="8" fill="#EF4444" />
        <polygon points="38,12 48,10 38,14" fill="#FFD700" />
        {isElementary && <circle cx="34" cy="10" r="2" fill="#000" />}
        <path d="M5,12 Q-5,5 -10,15" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
      </motion.g>

      {/* Flowers */}
      {[80, 300, 350].map((x, i) => (
        <g key={i} transform={`translate(${x}, 165)`}>
          <rect x="8" y="10" width="4" height="20" fill="#228B22" />
          <circle cx="10" cy="8" r="8" fill={['#FF69B4', '#FFD700', '#9333EA'][i]} />
        </g>
      ))}
    </svg>
  )
}

// Farm Vegetables
function FarmVegetablesIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect x="0" y="0" width="400" height="150" fill="#87CEEB" />
      <rect x="0" y="150" width="400" height="100" fill="#8B4513" />

      {/* Sun */}
      <circle cx="350" cy="50" r="35" fill="#FFD700" />

      {/* Barn */}
      <g transform="translate(20, 70)">
        <rect x="0" y="30" width="80" height="60" fill="#DC2626" />
        <polygon points="-5,30 40,0 85,30" fill="#991B1B" />
        <rect x="30" y="50" width="20" height="40" fill="#78350F" />
        <rect x="10" y="40" width="15" height="15" fill="#FFF" />
        <line x1="17.5" y1="40" x2="17.5" y2="55" stroke="#333" strokeWidth="1" />
        <line x1="10" y1="47.5" x2="25" y2="47.5" stroke="#333" strokeWidth="1" />
      </g>

      {/* Vegetable rows */}
      {/* Carrots */}
      <g transform="translate(130, 150)">
        {[0, 25, 50].map((x, i) => (
          <motion.g
            key={i}
            animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
          >
            <polygon points={`${x + 10},20 ${x + 5},60 ${x + 15},60`} fill="#FF6B00" />
            <ellipse cx={x + 10} cy={15} rx={12} ry={8} fill="#228B22" />
          </motion.g>
        ))}
        <text x="35" y="80" textAnchor="middle" fontSize="10" fill="#FFF">Carrots</text>
      </g>

      {/* Tomatoes */}
      <g transform="translate(230, 130)">
        <rect x="20" y="30" width="5" height="40" fill="#228B22" />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={22 + (i % 2) * 15}
            cy={35 + Math.floor(i / 2) * 20}
            r="12"
            fill="#EF4444"
            animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
        <text x="25" y="100" textAnchor="middle" fontSize="10" fill="#FFF">Tomatoes</text>
      </g>

      {/* Lettuce */}
      <g transform="translate(310, 155)">
        {[0, 30].map((x, i) => (
          <motion.g
            key={i}
            animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
          >
            <ellipse cx={x + 20} cy={20} rx={18} ry={15} fill="#22C55E" />
            <ellipse cx={x + 15} cy={15} rx={12} ry={10} fill="#4ADE80" />
            <ellipse cx={x + 25} cy={15} rx={12} ry={10} fill="#4ADE80" />
          </motion.g>
        ))}
        <text x="35" y="55" textAnchor="middle" fontSize="10" fill="#FFF">Lettuce</text>
      </g>

      {/* Farmer */}
      {isElementary && (
        <g transform="translate(100, 90)">
          <circle cx="20" cy="20" r="15" fill="#FFDAB9" />
          <ellipse cx="20" cy="8" rx="18" ry="8" fill="#F59E0B" />
          <circle cx="14" cy="18" r="3" fill="#000" />
          <circle cx="26" cy="18" r="3" fill="#000" />
          <path d="M14,27 Q20,32 26,27" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="8" y="35" width="24" height="30" fill="#3B82F6" rx="3" />
        </g>
      )}

      {/* Watering can */}
      <motion.g
        transform="translate(180, 110)"
        animate={isHovered ? { rotate: -15 } : { rotate: 0 }}
        style={{ transformOrigin: '15px 25px' }}
      >
        <ellipse cx="15" cy="25" rx="12" ry="8" fill="#6B7280" />
        <rect x="5" y="15" width="20" height="10" fill="#6B7280" rx="3" />
        <path d="M25,20 L38,12" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

// Wind Turbine
function WindTurbineIllustration({ isElementary, isHovered }: { isElementary: boolean; isHovered: boolean }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect x="0" y="0" width="400" height="200" fill="#87CEEB" />
      <rect x="0" y="195" width="400" height="55" fill="#228B22" />

      {/* Clouds */}
      <motion.g
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <ellipse cx="80" cy="50" rx="40" ry="20" fill="white" />
        <ellipse cx="50" cy="45" rx="25" ry="15" fill="white" />
        <ellipse cx="110" cy="45" rx="25" ry="15" fill="white" />
      </motion.g>

      {/* Wind lines */}
      {[60, 100, 140].map((y, i) => (
        <motion.line
          key={i}
          x1="0"
          y1={y}
          x2="60"
          y2={y}
          stroke="#93C5FD"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ x1: [0, 100], x2: [60, 160], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Wind turbine */}
      <g transform="translate(200, 50)">
        {/* Tower */}
        <polygon points="0,150 -15,200 15,200" fill="#E5E7EB" />

        {/* Hub */}
        <circle cx="0" cy="0" r="12" fill="#4B5563" />

        {/* Blades */}
        <motion.g
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {[0, 120, 240].map((angle, i) => (
            <rect
              key={i}
              x="-8"
              y="-80"
              width="16"
              height="80"
              fill="#FFF"
              stroke="#E5E7EB"
              strokeWidth="1"
              rx="4"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>
      </g>

      {/* Second smaller turbine */}
      <g transform="translate(320, 80)">
        <polygon points="0,120 -10,150 10,150" fill="#E5E7EB" />
        <circle cx="0" cy="0" r="8" fill="#4B5563" />
        <motion.g
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          {[0, 120, 240].map((angle, i) => (
            <rect
              key={i}
              x="-5"
              y="-50"
              width="10"
              height="50"
              fill="#FFF"
              stroke="#E5E7EB"
              strokeWidth="1"
              rx="3"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>
      </g>

      {/* House with lights */}
      <g transform="translate(40, 150)">
        <rect x="0" y="20" width="60" height="40" fill="#FFF5EE" stroke="#8B4513" strokeWidth="2" />
        <polygon points="-5,20 30,-10 65,20" fill="#CD853F" />
        <rect x="20" y="35" width="20" height="25" fill="#8B4513" />

        {/* Window with light */}
        <motion.rect
          x="8"
          y="28"
          width="15"
          height="15"
          fill={isHovered ? "#FFD700" : "#87CEEB"}
          animate={isHovered ? { fill: ["#FFD700", "#FFF", "#FFD700"] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </g>

      {/* Energy flow */}
      <motion.path
        d="M190,180 Q150,170 90,175"
        fill="none"
        stroke="#FFD700"
        strokeWidth="3"
        strokeDasharray="8,4"
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Character */}
      {isElementary && (
        <g transform="translate(110, 155)">
          <circle cx="15" cy="15" r="12" fill="#FFDAB9" />
          <circle cx="11" cy="13" r="2" fill="#000" />
          <circle cx="19" cy="13" r="2" fill="#000" />
          <path d="M11,20 Q15,24 19,20" fill="none" stroke="#000" strokeWidth="1.5" />
          <rect x="5" y="27" width="20" height="20" fill="#9333EA" rx="3" />
        </g>
      )}

      <text x="200" y="240" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">
        Clean Energy from Wind!
      </text>
    </svg>
  )
}

// Default fallback illustration
function DefaultIllustration({ isElementary, theme }: { isElementary: boolean; theme: string }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect x="0" y="0" width="400" height="250" fill={isElementary ? '#FEF9C3' : '#D1FAE5'} />
      <text x="200" y="120" textAnchor="middle" fontSize="40">
        🌱
      </text>
      <text x="200" y="160" textAnchor="middle" fontSize="14" fill="#666">
        {theme.replace('-', ' ')}
      </text>
    </svg>
  )
}

// Helper to detect illustration theme from content
export function detectIllustrationTheme(content: string): IllustrationTheme | undefined {
  const lowerContent = content.toLowerCase()

  if (lowerContent.includes('garden') || lowerContent.includes('growing') || lowerContent.includes('plant')) {
    return 'garden-growing'
  }
  if (lowerContent.includes('solar') || lowerContent.includes('sun energy') || lowerContent.includes('sunlight')) {
    return 'sun-energy'
  }
  if (lowerContent.includes('water cycle') || lowerContent.includes('rain') || lowerContent.includes('river')) {
    return 'water-journey'
  }
  if (lowerContent.includes('soil') || lowerContent.includes('underground') || lowerContent.includes('dirt')) {
    return 'soil-underground'
  }
  if (lowerContent.includes('compost') || lowerContent.includes('decompos')) {
    return 'compost-magic'
  }
  if (lowerContent.includes('food chain') || lowerContent.includes('food web') || lowerContent.includes('predator')) {
    return 'food-chain'
  }
  if (lowerContent.includes('house') || lowerContent.includes('building') || lowerContent.includes('construction')) {
    return 'house-building'
  }
  if (lowerContent.includes('recycle') || lowerContent.includes('waste') || lowerContent.includes('sorting')) {
    return 'waste-sorting'
  }
  if (lowerContent.includes('tree') && (lowerContent.includes('plant') || lowerContent.includes('forest'))) {
    return 'tree-planting'
  }
  if (lowerContent.includes('rainwater') || lowerContent.includes('collect') || lowerContent.includes('barrel')) {
    return 'rain-collecting'
  }
  if (lowerContent.includes('seed') || lowerContent.includes('sprout')) {
    return 'seeds-planting'
  }
  if (lowerContent.includes('animal') || lowerContent.includes('ecosystem') || lowerContent.includes('wildlife')) {
    return 'animals-ecosystem'
  }
  if (lowerContent.includes('farm') || lowerContent.includes('vegetable') || lowerContent.includes('crop')) {
    return 'farm-vegetables'
  }
  if (lowerContent.includes('wind') || lowerContent.includes('turbine')) {
    return 'wind-turbine'
  }

  return undefined
}
