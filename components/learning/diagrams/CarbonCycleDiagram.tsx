'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface CarbonCycleDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function CarbonCycleDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: CarbonCycleDiagramProps) {
  const [activeProcess, setActiveProcess] = useState<string | null>(null)

  const processes = [
    { id: 'photosynthesis', label: 'Photosynthesis', description: 'Plants absorb CO₂ and convert it to glucose using sunlight' },
    { id: 'respiration', label: 'Respiration', description: 'Living organisms release CO₂ by breaking down sugars for energy' },
    { id: 'decomposition', label: 'Decomposition', description: 'Decomposers break down dead matter, releasing carbon back to soil and air' },
    { id: 'combustion', label: 'Combustion', description: 'Burning fossil fuels releases stored carbon as CO₂' },
    { id: 'ocean-absorption', label: 'Ocean Absorption', description: 'Oceans absorb CO₂ from the atmosphere' },
    { id: 'fossilization', label: 'Fossilization', description: 'Dead organisms become fossil fuels over millions of years' },
  ]

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 900 550"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="carbonSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#B0E0E6" />
          </linearGradient>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A90D9" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </linearGradient>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#654321" />
          </linearGradient>
          <filter id="carbonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="900" height="280" fill="url(#carbonSkyGradient)" />

        {/* Atmosphere CO2 cloud */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('atmosphere')}
          onMouseEnter={() => setActiveProcess('atmosphere')}
          onMouseLeave={() => setActiveProcess(null)}
        >
          <motion.ellipse
            cx="450"
            cy="60"
            rx="200"
            ry="40"
            fill="#E5E7EB"
            opacity="0.8"
            animate={animated ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x="450" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4B5563">
            Atmospheric CO₂
          </text>
        </g>

        {/* Sun */}
        <motion.circle
          cx="800"
          cy="80"
          r="50"
          fill="#FFD700"
          filter="url(#carbonGlow)"
          animate={animated ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={800 + Math.cos(i * 45 * Math.PI / 180) * 55}
            y1={80 + Math.sin(i * 45 * Math.PI / 180) * 55}
            x2={800 + Math.cos(i * 45 * Math.PI / 180) * 70}
            y2={80 + Math.sin(i * 45 * Math.PI / 180) * 70}
            stroke="#FFA500"
            strokeWidth="4"
            strokeLinecap="round"
            animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}

        {/* Ground/Soil */}
        <rect x="0" y="280" width="600" height="120" fill="url(#groundGradient)" />
        <rect x="0" y="400" width="600" height="150" fill="#3D2914" />

        {/* Ocean */}
        <rect x="600" y="280" width="300" height="270" fill="url(#oceanGradient)" />

        {/* Ocean waves */}
        <motion.path
          d="M600,280 Q650,270 700,280 Q750,290 800,280 Q850,270 900,280"
          fill="none"
          stroke="#6BB3F0"
          strokeWidth="3"
          animate={animated ? { d: [
            "M600,280 Q650,270 700,280 Q750,290 800,280 Q850,270 900,280",
            "M600,280 Q650,290 700,280 Q750,270 800,280 Q850,290 900,280",
            "M600,280 Q650,270 700,280 Q750,290 800,280 Q850,270 900,280"
          ] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Tree - Photosynthesis */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('photosynthesis')}
          onMouseEnter={() => setActiveProcess('photosynthesis')}
          onMouseLeave={() => setActiveProcess(null)}
        >
          <rect x="115" y="180" width="30" height="100" fill="#8B4513" />
          <motion.ellipse
            cx="130"
            cy="140"
            rx="70"
            ry="60"
            fill="#228B22"
            animate={animated ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <ellipse cx="100" cy="160" rx="40" ry="35" fill="#2E8B2E" />
          <ellipse cx="160" cy="160" rx="40" ry="35" fill="#2E8B2E" />

          {/* CO2 arrows going into tree */}
          <motion.path
            d="M280,80 Q200,100 150,130"
            fill="none"
            stroke="#6B7280"
            strokeWidth="3"
            strokeDasharray="8,4"
            markerEnd="url(#arrowGray)"
            animate={animated ? { strokeDashoffset: [0, -24] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {showLabels && (
            <text x="220" y="90" fontSize="10" fill="#4B5563">CO₂ absorbed</text>
          )}
        </g>

        {/* Animal - Respiration */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('respiration')}
          onMouseEnter={() => setActiveProcess('respiration')}
          onMouseLeave={() => setActiveProcess(null)}
          transform="translate(280, 220)"
        >
          {/* Simple deer */}
          <ellipse cx="40" cy="30" rx="35" ry="20" fill="#C4A484" />
          <ellipse cx="75" cy="20" rx="15" ry="12" fill="#C4A484" />
          <circle cx="82" cy="17" r="3" fill="#000" />
          <line x1="15" y1="50" x2="15" y2="70" stroke="#8B7355" strokeWidth="4" />
          <line x1="35" y1="50" x2="35" y2="70" stroke="#8B7355" strokeWidth="4" />
          <line x1="50" y1="50" x2="50" y2="70" stroke="#8B7355" strokeWidth="4" />
          <line x1="65" y1="50" x2="65" y2="70" stroke="#8B7355" strokeWidth="4" />

          {/* CO2 from respiration */}
          <motion.path
            d="M75,10 Q90,0 100,-20 Q120,-40 140,-50"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="5,3"
            animate={animated ? { strokeDashoffset: [0, 16] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Factory - Combustion */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('combustion')}
          onMouseEnter={() => setActiveProcess('combustion')}
          onMouseLeave={() => setActiveProcess(null)}
          transform="translate(450, 180)"
        >
          <rect x="0" y="40" width="80" height="80" fill="#6B7280" />
          <rect x="10" y="0" width="20" height="60" fill="#4B5563" />
          <rect x="50" y="20" width="15" height="40" fill="#4B5563" />

          {/* Smoke */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={20 + i * 5}
              cy={-10 - i * 20}
              r={8 + i * 3}
              fill="#9CA3AF"
              opacity={0.6 - i * 0.15}
              animate={animated ? {
                y: [-10, -40],
                opacity: [0.6 - i * 0.15, 0],
                scale: [1, 1.5]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          {/* CO2 arrow upward */}
          <motion.path
            d="M20,-30 Q30,-60 40,-80 Q60,-120 80,-140"
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            strokeDasharray="8,4"
            animate={animated ? { strokeDashoffset: [0, 24] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Decomposition - Dead matter in soil */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('decomposition')}
          onMouseEnter={() => setActiveProcess('decomposition')}
          onMouseLeave={() => setActiveProcess(null)}
        >
          {/* Dead leaves */}
          <ellipse cx="200" cy="300" rx="20" ry="8" fill="#8B6914" transform="rotate(-20, 200, 300)" />
          <ellipse cx="240" cy="310" rx="15" ry="6" fill="#A0522D" transform="rotate(15, 240, 310)" />
          <ellipse cx="180" cy="315" rx="18" ry="7" fill="#CD853F" transform="rotate(-10, 180, 315)" />

          {/* Decomposer organisms */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={170 + i * 20}
              cy={340 + Math.sin(i) * 10}
              r="4"
              fill="#90EE90"
              animate={animated ? { opacity: [0.4, 1, 0.4] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          {/* CO2 from decomposition */}
          <motion.path
            d="M210,290 Q220,250 250,200 Q280,150 320,100"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="5,3"
            animate={animated ? { strokeDashoffset: [0, 16] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Fossil fuels underground */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('fossilization')}
          onMouseEnter={() => setActiveProcess('fossilization')}
          onMouseLeave={() => setActiveProcess(null)}
        >
          {/* Oil/Coal deposits */}
          <ellipse cx="300" cy="480" rx="60" ry="25" fill="#1F2937" />
          <ellipse cx="420" cy="500" rx="50" ry="20" fill="#1F2937" />

          {/* Arrow from dead matter to fossil */}
          <motion.path
            d="M220,340 Q250,400 280,460"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeDasharray="6,3"
            opacity="0.6"
            animate={animated ? { strokeDashoffset: [0, -18] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {showLabels && (
            <text x="320" y="520" fontSize="10" fill="#9CA3AF">Fossil Fuels</text>
          )}
          <text x="250" y="420" fontSize="8" fill="#6B7280">Millions of years</text>
        </g>

        {/* Ocean absorption */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveProcess('ocean-absorption')}
          onMouseEnter={() => setActiveProcess('ocean-absorption')}
          onMouseLeave={() => setActiveProcess(null)}
        >
          {/* CO2 arrow into ocean */}
          <motion.path
            d="M580,80 Q620,120 680,200 Q720,260 750,300"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeDasharray="8,4"
            markerEnd="url(#arrowBlue)"
            animate={animated ? { strokeDashoffset: [0, -24] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Dissolved CO2 bubbles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={700 + i * 30}
              cy={350 + i * 20}
              r="6"
              fill="#60A5FA"
              opacity="0.5"
              animate={animated ? {
                cy: [350 + i * 20, 320 + i * 20],
                opacity: [0.5, 0.2]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {/* Marine life (simple fish) */}
          <motion.g
            animate={animated ? { x: [0, 30, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ellipse cx="720" cy="400" rx="25" ry="12" fill="#4A90D9" />
            <polygon points="745,400 760,390 760,410" fill="#4A90D9" />
            <circle cx="708" cy="397" r="3" fill="#1E3A5F" />
          </motion.g>

          {showLabels && (
            <text x="750" y="480" textAnchor="middle" fontSize="11" fill="#87CEEB">Ocean Carbon Sink</text>
          )}
        </g>

        {/* Carbon cycle label */}
        <g transform="translate(30, 450)">
          <rect x="0" y="0" width="180" height="80" rx="10" fill="white" opacity="0.95" />
          <text x="90" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
            The Carbon Cycle
          </text>
          <text x="90" y="45" textAnchor="middle" fontSize="10" fill="#374151">
            Carbon moves between
          </text>
          <text x="90" y="60" textAnchor="middle" fontSize="10" fill="#374151">
            atmosphere, land, and ocean
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
          </marker>
          <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
          </marker>
        </defs>
      </svg>

      {/* Process Info Panel */}
      {activeProcess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl"
        >
          <p className="font-bold text-emerald-700">
            {processes.find(p => p.id === activeProcess)?.label || 'Atmospheric CO₂'}
          </p>
          <p className="text-emerald-600 text-sm">
            {processes.find(p => p.id === activeProcess)?.description || 'Carbon dioxide in the atmosphere acts as a greenhouse gas and is cycled through Earth\'s systems'}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {processes.map((process) => (
          <button
            key={process.id}
            onClick={() => setActiveProcess(activeProcess === process.id ? null : process.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeProcess === process.id
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            {process.label}
          </button>
        ))}
      </div>
    </div>
  )
}
