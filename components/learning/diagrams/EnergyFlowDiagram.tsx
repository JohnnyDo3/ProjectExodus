'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface EnergyFlowDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function EnergyFlowDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: EnergyFlowDiagramProps) {
  const [activeLevel, setActiveLevel] = useState<string | null>(null)

  const trophicLevels = [
    {
      id: 'sun',
      label: 'Sun (Energy Source)',
      description: 'The sun provides the initial energy that powers all life on Earth',
      energy: '100%',
      color: '#FFD700'
    },
    {
      id: 'producers',
      label: 'Producers (Plants)',
      description: 'Plants capture about 1% of sunlight through photosynthesis',
      energy: '~1%',
      color: '#22C55E'
    },
    {
      id: 'primary',
      label: 'Primary Consumers',
      description: 'Herbivores eat plants and get about 10% of the energy',
      energy: '~0.1%',
      color: '#3B82F6'
    },
    {
      id: 'secondary',
      label: 'Secondary Consumers',
      description: 'Carnivores eat herbivores and receive 10% of that energy',
      energy: '~0.01%',
      color: '#F59E0B'
    },
    {
      id: 'tertiary',
      label: 'Tertiary Consumers',
      description: 'Top predators receive the least amount of original energy',
      energy: '~0.001%',
      color: '#EF4444'
    },
  ]

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="energySkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <filter id="energyGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="800" height="500" fill="url(#energySkyGradient)" />

        {/* Ground */}
        <rect x="0" y="400" width="800" height="100" fill="#8B4513" />
        <rect x="0" y="390" width="800" height="15" fill="#228B22" />

        {/* Sun - Energy Source */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('sun')}
          onMouseEnter={() => setActiveLevel('sun')}
          onMouseLeave={() => setActiveLevel(null)}
        >
          <motion.circle
            cx="100"
            cy="80"
            r="55"
            fill="#FFD700"
            filter="url(#energyGlow)"
            animate={animated ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1={100 + Math.cos(i * 30 * Math.PI / 180) * 60}
              y1={80 + Math.sin(i * 30 * Math.PI / 180) * 60}
              x2={100 + Math.cos(i * 30 * Math.PI / 180) * 80}
              y2={80 + Math.sin(i * 30 * Math.PI / 180) * 80}
              stroke="#FFA500"
              strokeWidth="4"
              strokeLinecap="round"
              animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
          {showLabels && (
            <text x="100" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B45309">
              SUN (100%)
            </text>
          )}
        </g>

        {/* Energy flow arrows from sun */}
        <motion.path
          d="M160,100 Q250,150 300,200"
          fill="none"
          stroke="#FFD700"
          strokeWidth="20"
          opacity="0.4"
          animate={animated ? { opacity: [0.2, 0.5, 0.2] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Producers - Plants */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('producers')}
          onMouseEnter={() => setActiveLevel('producers')}
          onMouseLeave={() => setActiveLevel(null)}
          transform="translate(250, 280)"
        >
          {/* Multiple plants */}
          {[0, 40, 80].map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`}>
              <rect x="10" y="50" width="8" height="60" fill="#166534" />
              <motion.ellipse
                cx="14"
                cy="35"
                rx="25"
                ry="30"
                fill="#22C55E"
                animate={animated ? { scale: [1, 1.03, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </g>
          ))}

          {/* Energy bar */}
          <rect x="0" y="120" width="120" height="20" rx="5" fill="#E5E7EB" />
          <motion.rect
            x="0"
            y="120"
            width="0"
            height="20"
            rx="5"
            fill="#22C55E"
            animate={animated ? { width: [0, 12] } : { width: 12 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          {showLabels && (
            <text x="60" y="155" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
              Producers (~1%)
            </text>
          )}
        </g>

        {/* Energy transfer arrow */}
        <motion.path
          d="M380,350 L420,350"
          fill="none"
          stroke="#22C55E"
          strokeWidth="8"
          markerEnd="url(#arrowGreen)"
          animate={animated ? { strokeDashoffset: [0, -20] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          strokeDasharray="10,5"
        />

        {/* Heat loss indicator */}
        <motion.path
          d="M350,300 Q340,260 360,220"
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
          strokeDasharray="5,3"
          opacity="0.6"
          animate={animated ? { opacity: [0.3, 0.7, 0.3] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="320" y="240" fontSize="9" fill="#EF4444">Heat lost</text>

        {/* Primary Consumers - Herbivores */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('primary')}
          onMouseEnter={() => setActiveLevel('primary')}
          onMouseLeave={() => setActiveLevel(null)}
          transform="translate(430, 300)"
        >
          {/* Rabbit */}
          <motion.g
            animate={animated ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ellipse cx="35" cy="50" rx="30" ry="20" fill="#D1D5DB" />
            <circle cx="55" cy="40" r="15" fill="#D1D5DB" />
            <ellipse cx="50" cy="25" rx="5" ry="15" fill="#D1D5DB" />
            <ellipse cx="60" cy="25" rx="5" ry="15" fill="#D1D5DB" />
            <circle cx="60" cy="38" r="3" fill="#1F2937" />
            <ellipse cx="65" cy="45" rx="4" ry="2" fill="#FFC0CB" />
          </motion.g>

          {/* Energy bar */}
          <rect x="0" y="80" width="80" height="18" rx="5" fill="#E5E7EB" />
          <motion.rect
            x="0"
            y="80"
            width="0"
            height="18"
            rx="5"
            fill="#3B82F6"
            animate={animated ? { width: [0, 8] } : { width: 8 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          {showLabels && (
            <text x="40" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E40AF">
              Primary (~0.1%)
            </text>
          )}
        </g>

        {/* Energy transfer arrow */}
        <motion.path
          d="M520,360 L560,360"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="6"
          markerEnd="url(#arrowBlue)"
          animate={animated ? { strokeDashoffset: [0, -20] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          strokeDasharray="10,5"
        />

        {/* Secondary Consumers - Carnivores */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('secondary')}
          onMouseEnter={() => setActiveLevel('secondary')}
          onMouseLeave={() => setActiveLevel(null)}
          transform="translate(570, 310)"
        >
          {/* Fox */}
          <motion.g
            animate={animated ? { x: [0, 3, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ellipse cx="35" cy="50" rx="35" ry="22" fill="#F59E0B" />
            <ellipse cx="70" cy="40" rx="18" ry="14" fill="#F59E0B" />
            <polygon points="80,30 95,20 90,35" fill="#F59E0B" />
            <polygon points="85,32 100,25 95,38" fill="#F59E0B" />
            <circle cx="78" cy="38" r="3" fill="#1F2937" />
            <ellipse cx="88" cy="44" rx="6" ry="3" fill="#1F2937" />
            <path d="M0,55 Q-15,50 -25,60" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
          </motion.g>

          {/* Energy bar */}
          <rect x="0" y="85" width="80" height="16" rx="5" fill="#E5E7EB" />
          <motion.rect
            x="0"
            y="85"
            width="0"
            height="16"
            rx="5"
            fill="#F59E0B"
            animate={animated ? { width: [0, 4] } : { width: 4 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          {showLabels && (
            <text x="40" y="118" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">
              Secondary (~0.01%)
            </text>
          )}
        </g>

        {/* Energy transfer arrow */}
        <motion.path
          d="M660,360 L700,360"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="4"
          markerEnd="url(#arrowOrange)"
          animate={animated ? { strokeDashoffset: [0, -20] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          strokeDasharray="10,5"
        />

        {/* Tertiary Consumers - Top Predators */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('tertiary')}
          onMouseEnter={() => setActiveLevel('tertiary')}
          onMouseLeave={() => setActiveLevel(null)}
          transform="translate(700, 300)"
        >
          {/* Eagle */}
          <motion.g
            animate={animated ? { y: [0, -5, 0], rotate: [0, 2, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ellipse cx="40" cy="50" rx="25" ry="18" fill="#78350F" />
            <circle cx="60" cy="42" r="12" fill="#FEF3C7" />
            <polygon points="70,42 85,45 70,48" fill="#F59E0B" />
            <circle cx="62" cy="40" r="3" fill="#1F2937" />
            {/* Wings */}
            <path d="M20,45 Q-10,30 -30,40" fill="none" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
            <path d="M60,45 Q90,30 110,40" fill="none" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          </motion.g>

          {/* Energy bar */}
          <rect x="0" y="85" width="80" height="14" rx="5" fill="#E5E7EB" />
          <motion.rect
            x="0"
            y="85"
            width="0"
            height="14"
            rx="5"
            fill="#EF4444"
            animate={animated ? { width: [0, 2] } : { width: 2 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          {showLabels && (
            <text x="40" y="115" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991B1B">
              Tertiary (~0.001%)
            </text>
          )}
        </g>

        {/* 10% Rule Box */}
        <g transform="translate(50, 420)">
          <rect x="0" y="0" width="200" height="70" rx="10" fill="white" opacity="0.95" />
          <text x="100" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
            The 10% Rule
          </text>
          <text x="100" y="45" textAnchor="middle" fontSize="11" fill="#374151">
            Only ~10% of energy transfers
          </text>
          <text x="100" y="60" textAnchor="middle" fontSize="11" fill="#374151">
            to the next trophic level
          </text>
        </g>

        {/* Energy Pyramid visualization */}
        <g transform="translate(600, 150)">
          <text x="80" y="0" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">Energy Pyramid</text>
          <polygon points="80,20 160,130 0,130" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

          {/* Pyramid sections */}
          <motion.rect x="70" y="25" width="20" height="15" fill="#EF4444"
            animate={animated ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.rect x="55" y="45" width="50" height="20" fill="#F59E0B"
            animate={animated ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.rect x="35" y="70" width="90" height="25" fill="#3B82F6"
            animate={animated ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.rect x="10" y="100" width="140" height="28" fill="#22C55E"
            animate={animated ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22C55E" />
          </marker>
          <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
          </marker>
          <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
          </marker>
        </defs>
      </svg>

      {/* Level Info Panel */}
      {activeLevel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: trophicLevels.find(l => l.id === activeLevel)?.color }}
            />
            <p className="font-bold text-blue-700">
              {trophicLevels.find(l => l.id === activeLevel)?.label}
            </p>
            <span className="text-sm bg-blue-200 px-2 py-0.5 rounded-full text-blue-800">
              {trophicLevels.find(l => l.id === activeLevel)?.energy}
            </span>
          </div>
          <p className="text-blue-600 text-sm mt-1">
            {trophicLevels.find(l => l.id === activeLevel)?.description}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {trophicLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => setActiveLevel(activeLevel === level.id ? null : level.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeLevel === level.id
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: level.color }}
            />
            {level.label.split(' (')[0]}
          </button>
        ))}
      </div>
    </div>
  )
}
