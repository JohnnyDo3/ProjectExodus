'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FoodWebDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function FoodWebDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: FoodWebDiagramProps) {
  const [activeLevel, setActiveLevel] = useState<string | null>(null)

  const trophicLevels = [
    {
      id: 'producers',
      name: 'Producers',
      description: 'Plants and algae that make their own food through photosynthesis. The foundation of all food webs!',
      color: '#22C55E',
      organisms: ['grass', 'tree', 'flower', 'algae']
    },
    {
      id: 'primary',
      name: 'Primary Consumers',
      description: 'Herbivores that eat plants. They transfer energy from producers to the rest of the food web.',
      color: '#3B82F6',
      organisms: ['rabbit', 'deer', 'grasshopper', 'caterpillar']
    },
    {
      id: 'secondary',
      name: 'Secondary Consumers',
      description: 'Carnivores and omnivores that eat primary consumers. They help control herbivore populations.',
      color: '#F59E0B',
      organisms: ['fox', 'bird', 'frog', 'snake']
    },
    {
      id: 'tertiary',
      name: 'Tertiary Consumers',
      description: 'Top predators that eat other carnivores. They have few natural enemies.',
      color: '#EF4444',
      organisms: ['eagle', 'wolf', 'lion', 'shark']
    },
    {
      id: 'decomposers',
      name: 'Decomposers',
      description: 'Fungi and bacteria that break down dead matter, returning nutrients to the soil for producers.',
      color: '#8B5CF6',
      organisms: ['mushroom', 'bacteria', 'worm']
    }
  ]

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 800 550"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="pyramidGreen" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#166534"/>
            <stop offset="100%" stopColor="#22C55E"/>
          </linearGradient>
          <linearGradient id="sunburstGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCD34D"/>
            <stop offset="100%" stopColor="#F59E0B"/>
          </linearGradient>
          <filter id="animalShadow">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="800" height="550" fill="#F0FDF4"/>

        {/* Sun - Energy source */}
        <g transform="translate(700, 60)">
          <motion.circle
            cx="0"
            cy="0"
            r="40"
            fill="#FCD34D"
            animate={animated ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.cos(i * 30 * Math.PI / 180) * 45}
              y1={Math.sin(i * 30 * Math.PI / 180) * 45}
              x2={Math.cos(i * 30 * Math.PI / 180) * 60}
              y2={Math.sin(i * 30 * Math.PI / 180) * 60}
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
              animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          <text x="0" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B45309">
            SUNLIGHT
          </text>
          <text x="0" y="95" textAnchor="middle" fontSize="10" fill="#78350F">
            (Energy Source)
          </text>
        </g>

        {/* Energy arrow from sun */}
        <motion.path
          d="M660,80 Q500,50 400,100"
          fill="none"
          stroke="#FCD34D"
          strokeWidth="4"
          strokeDasharray="15,8"
          animate={animated ? { strokeDashoffset: [0, -46] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* PYRAMID STRUCTURE */}

        {/* Tertiary Consumers (Top) */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('tertiary')}
          onMouseEnter={() => setActiveLevel('tertiary')}
          onMouseLeave={() => setActiveLevel(null)}
        >
          <polygon
            points="400,80 320,160 480,160"
            fill={activeLevel === 'tertiary' ? '#FCA5A5' : '#EF4444'}
            stroke={activeLevel === 'tertiary' ? '#B91C1C' : 'none'}
            strokeWidth="3"
          />
          {/* Eagle */}
          <g transform="translate(380, 100)" filter="url(#animalShadow)">
            <ellipse cx="20" cy="25" rx="15" ry="10" fill="#78350F"/>
            <circle cx="25" cy="15" r="8" fill="#92400E"/>
            <polygon points="32,15 45,18 32,21" fill="#F59E0B"/>
            <ellipse cx="10" cy="30" rx="20" ry="8" fill="#451A03" transform="rotate(-30, 10, 30)"/>
            <ellipse cx="30" cy="30" rx="20" ry="8" fill="#451A03" transform="rotate(30, 30, 30)"/>
          </g>
          {showLabels && (
            <text x="400" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
              TERTIARY
            </text>
          )}
        </g>

        {/* Secondary Consumers */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('secondary')}
          onMouseEnter={() => setActiveLevel('secondary')}
          onMouseLeave={() => setActiveLevel(null)}
        >
          <polygon
            points="320,160 240,260 560,260 480,160"
            fill={activeLevel === 'secondary' ? '#FDE68A' : '#F59E0B'}
            stroke={activeLevel === 'secondary' ? '#B45309' : 'none'}
            strokeWidth="3"
          />
          {/* Fox */}
          <g transform="translate(290, 185)" filter="url(#animalShadow)">
            <ellipse cx="25" cy="30" rx="20" ry="15" fill="#EA580C"/>
            <circle cx="35" cy="18" r="12" fill="#EA580C"/>
            <polygon points="25,8 32,20 38,8" fill="#EA580C"/>
            <polygon points="40,8 47,20 53,8" fill="#EA580C"/>
            <circle cx="32" cy="16" r="2" fill="#1F2937"/>
            <circle cx="40" cy="16" r="2" fill="#1F2937"/>
            <polygon points="36,22 40,26 32,26" fill="#1F2937"/>
            <ellipse cx="55" cy="35" rx="15" ry="5" fill="#EA580C"/>
          </g>
          {/* Bird */}
          <g transform="translate(420, 190)" filter="url(#animalShadow)">
            <ellipse cx="15" cy="20" rx="12" ry="10" fill="#3B82F6"/>
            <circle cx="22" cy="12" r="8" fill="#3B82F6"/>
            <polygon points="29,12 40,14 29,16" fill="#F59E0B"/>
            <ellipse cx="5" cy="25" rx="15" ry="6" fill="#1D4ED8" transform="rotate(-20, 5, 25)"/>
            <circle cx="20" cy="10" r="2" fill="#1F2937"/>
          </g>
          {showLabels && (
            <text x="400" y="245" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
              SECONDARY CONSUMERS
            </text>
          )}
        </g>

        {/* Primary Consumers */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('primary')}
          onMouseEnter={() => setActiveLevel('primary')}
          onMouseLeave={() => setActiveLevel(null)}
        >
          <polygon
            points="240,260 160,380 640,380 560,260"
            fill={activeLevel === 'primary' ? '#93C5FD' : '#3B82F6'}
            stroke={activeLevel === 'primary' ? '#1D4ED8' : 'none'}
            strokeWidth="3"
          />
          {/* Rabbit */}
          <g transform="translate(230, 290)" filter="url(#animalShadow)">
            <ellipse cx="25" cy="40" rx="18" ry="15" fill="#D1D5DB"/>
            <circle cx="35" cy="25" r="12" fill="#D1D5DB"/>
            <ellipse cx="28" cy="10" rx="5" ry="15" fill="#F9A8D4"/>
            <ellipse cx="42" cy="10" rx="5" ry="15" fill="#F9A8D4"/>
            <circle cx="32" cy="22" r="2" fill="#1F2937"/>
            <circle cx="40" cy="22" r="2" fill="#1F2937"/>
            <ellipse cx="36" cy="28" rx="3" ry="2" fill="#F9A8D4"/>
            <ellipse cx="50" cy="50" rx="8" ry="6" fill="#E5E7EB"/>
          </g>
          {/* Deer */}
          <g transform="translate(380, 285)" filter="url(#animalShadow)">
            <ellipse cx="30" cy="45" rx="25" ry="20" fill="#A16207"/>
            <ellipse cx="50" cy="30" rx="15" ry="12" fill="#A16207"/>
            <ellipse cx="55" cy="22" rx="8" ry="10" fill="#A16207"/>
            <rect x="20" y="60" width="6" height="25" fill="#78350F"/>
            <rect x="35" y="60" width="6" height="25" fill="#78350F"/>
            {/* Antlers */}
            <path d="M50,15 L45,5 L42,10" fill="none" stroke="#78350F" strokeWidth="3"/>
            <path d="M60,15 L65,5 L68,10" fill="none" stroke="#78350F" strokeWidth="3"/>
            <circle cx="52" cy="20" r="2" fill="#1F2937"/>
          </g>
          {/* Grasshopper */}
          <g transform="translate(500, 320)" filter="url(#animalShadow)">
            <ellipse cx="25" cy="20" rx="20" ry="8" fill="#84CC16"/>
            <circle cx="45" cy="18" r="8" fill="#65A30D"/>
            <circle cx="48" cy="15" r="3" fill="#1F2937"/>
            <line x1="30" y1="28" x2="20" y2="40" stroke="#65A30D" strokeWidth="3"/>
            <line x1="35" y1="28" x2="45" y2="40" stroke="#65A30D" strokeWidth="3"/>
            <line x1="45" y1="25" x2="55" y2="15" stroke="#65A30D" strokeWidth="2"/>
            <line x1="45" y1="25" x2="58" y2="18" stroke="#65A30D" strokeWidth="2"/>
          </g>
          {showLabels && (
            <text x="400" y="365" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
              PRIMARY CONSUMERS (Herbivores)
            </text>
          )}
        </g>

        {/* Producers (Base) */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('producers')}
          onMouseEnter={() => setActiveLevel('producers')}
          onMouseLeave={() => setActiveLevel(null)}
        >
          <polygon
            points="160,380 80,500 720,500 640,380"
            fill={activeLevel === 'producers' ? '#86EFAC' : '#22C55E'}
            stroke={activeLevel === 'producers' ? '#166534' : 'none'}
            strokeWidth="3"
          />
          {/* Plants */}
          {[150, 280, 400, 520, 650].map((x, i) => (
            <motion.g
              key={i}
              transform={`translate(${x}, 420)`}
              animate={animated ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              <rect x="8" y="30" width="4" height="40" fill="#166534"/>
              <ellipse cx="0" cy="25" rx="15" ry="8" fill="#4ADE80"/>
              <ellipse cx="20" cy="30" rx="15" ry="8" fill="#4ADE80"/>
              <ellipse cx="10" cy="15" rx="12" ry="6" fill="#22C55E"/>
              {i % 2 === 0 && <circle cx="10" cy="10" r="6" fill="#FCD34D"/>}
            </motion.g>
          ))}
          {/* Grass */}
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={100 + i * 30}
              y1={495}
              x2={100 + i * 30 + (Math.random() - 0.5) * 10}
              y2={475 + Math.random() * 10}
              stroke="#16A34A"
              strokeWidth="3"
              strokeLinecap="round"
              animate={animated ? { x2: [100 + i * 30 - 3, 100 + i * 30 + 3, 100 + i * 30 - 3] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
          {showLabels && (
            <text x="400" y="485" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              PRODUCERS (Plants)
            </text>
          )}
        </g>

        {/* Decomposers - Side */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveLevel('decomposers')}
          onMouseEnter={() => setActiveLevel('decomposers')}
          onMouseLeave={() => setActiveLevel(null)}
          transform="translate(30, 300)"
        >
          <rect x="0" y="0" width="100" height="180" rx="10" fill={activeLevel === 'decomposers' ? '#C4B5FD' : '#8B5CF6'}/>
          <text x="50" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">DECOMPOSERS</text>

          {/* Mushrooms */}
          <g transform="translate(20, 40)">
            <rect x="10" y="30" width="8" height="20" fill="#E9D5FF"/>
            <ellipse cx="14" cy="30" rx="15" ry="10" fill="#A855F7"/>
            <circle cx="8" cy="28" r="3" fill="#E9D5FF"/>
            <circle cx="20" cy="32" r="2" fill="#E9D5FF"/>
          </g>
          <g transform="translate(50, 50)">
            <rect x="8" y="25" width="6" height="15" fill="#E9D5FF"/>
            <ellipse cx="11" cy="25" rx="12" ry="8" fill="#7C3AED"/>
          </g>

          {/* Bacteria dots */}
          {[...Array(15)].map((_, i) => (
            <motion.circle
              key={i}
              cx={15 + Math.random() * 70}
              cy={100 + Math.random() * 60}
              r="3"
              fill="#C4B5FD"
              animate={animated ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}

          <text x="50" y="175" textAnchor="middle" fontSize="8" fill="white">Returns nutrients</text>

          {/* Arrow back to producers */}
          <motion.path
            d="M100,150 Q150,450 160,480"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeDasharray="8,4"
            animate={animated ? { strokeDashoffset: [0, -24] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Energy flow arrows */}
        <g>
          <defs>
            <marker id="energyArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
            </marker>
          </defs>
          {/* Labels for energy flow */}
          <text x="680" y="220" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="bold">
            Energy flows UP
          </text>
          <motion.path
            d="M680,230 L680,350"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            markerEnd="url(#energyArrow)"
            transform="rotate(180, 680, 290)"
            animate={animated ? { strokeDashoffset: [0, -20] } : {}}
            strokeDasharray="10,5"
            transition={{ duration: 1, repeat: Infinity }}
          />
        </g>

        {/* Energy pyramid percentages */}
        <g transform="translate(720, 150)">
          <text x="0" y="0" fontSize="10" fill="#374151" fontWeight="bold">Energy at each level:</text>
          <text x="0" y="30" fontSize="9" fill="#EF4444">Tertiary: ~0.1%</text>
          <text x="0" y="70" fontSize="9" fill="#F59E0B">Secondary: ~1%</text>
          <text x="0" y="130" fontSize="9" fill="#3B82F6">Primary: ~10%</text>
          <text x="0" y="210" fontSize="9" fill="#22C55E">Producers: 100%</text>
        </g>
      </svg>

      {/* Level Info Panel */}
      {activeLevel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl"
          style={{
            backgroundColor: `${trophicLevels.find(l => l.id === activeLevel)?.color}20`,
            borderColor: trophicLevels.find(l => l.id === activeLevel)?.color,
            borderWidth: 2
          }}
        >
          <h4
            className="font-bold text-lg"
            style={{ color: trophicLevels.find(l => l.id === activeLevel)?.color }}
          >
            {trophicLevels.find(l => l.id === activeLevel)?.name}
          </h4>
          <p className="text-gray-700 mt-1">
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
            className="px-3 py-1 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: activeLevel === level.id ? level.color : `${level.color}30`,
              color: activeLevel === level.id ? 'white' : level.color
            }}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  )
}
