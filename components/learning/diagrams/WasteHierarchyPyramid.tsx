'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WasteHierarchyPyramidProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function WasteHierarchyPyramid({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: WasteHierarchyPyramidProps) {
  const [activeLevel, setActiveLevel] = useState<string | null>(null)

  const levels = [
    {
      id: 'prevent',
      name: 'Prevent / Reduce',
      description: 'The best waste is waste that never exists! Buy less, choose durable products, avoid packaging.',
      color: '#22C55E',
      icon: '🚫',
      examples: ['Buy only what you need', 'Choose reusable over disposable', 'Avoid overpackaging'],
      impact: 'MOST PREFERRED'
    },
    {
      id: 'reuse',
      name: 'Reuse',
      description: 'Use items multiple times before discarding. Repair, repurpose, donate!',
      color: '#84CC16',
      icon: '♻️',
      examples: ['Repair broken items', 'Donate clothes', 'Use refillable containers'],
      impact: 'HIGHLY PREFERRED'
    },
    {
      id: 'recycle',
      name: 'Recycle / Compost',
      description: 'Transform waste into new materials or return nutrients to the soil.',
      color: '#EAB308',
      icon: '🔄',
      examples: ['Recycle paper, glass, metal', 'Compost food scraps', 'E-waste recycling'],
      impact: 'GOOD OPTION'
    },
    {
      id: 'recover',
      name: 'Energy Recovery',
      description: 'Convert non-recyclable waste to energy through incineration or biogas.',
      color: '#F97316',
      icon: '⚡',
      examples: ['Waste-to-energy plants', 'Biogas from landfills', 'Refuse-derived fuel'],
      impact: 'LESS PREFERRED'
    },
    {
      id: 'dispose',
      name: 'Disposal / Landfill',
      description: 'Last resort! Waste sits in landfills for decades or centuries.',
      color: '#EF4444',
      icon: '🗑️',
      examples: ['Landfill burial', 'Hazardous waste containment', 'Ocean dumping (illegal!)'],
      impact: 'LEAST PREFERRED'
    }
  ]

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 700 550"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {levels.map((lvl) => (
            <linearGradient key={lvl.id} id={`gradient-${lvl.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lvl.color} stopOpacity="0.9"/>
              <stop offset="50%" stopColor={lvl.color}/>
              <stop offset="100%" stopColor={lvl.color} stopOpacity="0.9"/>
            </linearGradient>
          ))}
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="700" height="550" fill="#F9FAFB"/>

        {/* Title */}
        <text x="350" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F2937">
          Waste Hierarchy Pyramid
        </text>
        <text x="350" y="60" textAnchor="middle" fontSize="12" fill="#6B7280">
          From Most Preferred (top) to Least Preferred (bottom)
        </text>

        {/* Pyramid levels */}
        {levels.map((lvl, index) => {
          const baseY = 80 + index * 85
          const topWidth = 100 + index * 110
          const bottomWidth = 100 + (index + 1) * 110
          const centerX = 350

          return (
            <g
              key={lvl.id}
              className="cursor-pointer"
              onClick={() => setActiveLevel(activeLevel === lvl.id ? null : lvl.id)}
              onMouseEnter={() => setActiveLevel(lvl.id)}
              onMouseLeave={() => setActiveLevel(null)}
            >
              <motion.polygon
                points={`
                  ${centerX - topWidth/2},${baseY}
                  ${centerX + topWidth/2},${baseY}
                  ${centerX + bottomWidth/2},${baseY + 80}
                  ${centerX - bottomWidth/2},${baseY + 80}
                `}
                fill={`url(#gradient-${lvl.id})`}
                stroke={activeLevel === lvl.id ? '#1F2937' : 'white'}
                strokeWidth={activeLevel === lvl.id ? 4 : 2}
                animate={activeLevel === lvl.id ? { scale: 1.02 } : { scale: 1 }}
                style={{ transformOrigin: 'center' }}
              />

              {/* Icon */}
              <text
                x={centerX - topWidth/2 + 30}
                y={baseY + 50}
                fontSize="28"
              >
                {lvl.icon}
              </text>

              {/* Level name */}
              <text
                x={centerX}
                y={baseY + 35}
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="white"
              >
                {lvl.name}
              </text>

              {/* Impact label */}
              <text
                x={centerX}
                y={baseY + 55}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                opacity="0.9"
              >
                {lvl.impact}
              </text>

              {/* Arrow indicator on right side */}
              {index < levels.length - 1 && (
                <motion.path
                  d={`M${centerX + bottomWidth/2 + 20},${baseY + 40} L${centerX + bottomWidth/2 + 35},${baseY + 60} L${centerX + bottomWidth/2 + 20},${baseY + 80}`}
                  fill="none"
                  stroke={lvl.color}
                  strokeWidth="3"
                  animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                />
              )}
            </g>
          )
        })}

        {/* Side labels */}
        <g transform="translate(50, 250)">
          <motion.path
            d="M0,0 L0,200"
            stroke="#22C55E"
            strokeWidth="4"
            markerEnd="url(#arrowGreen)"
            animate={animated ? { strokeDashoffset: [0, -20] } : {}}
            strokeDasharray="10,5"
            transition={{ duration: 1, repeat: Infinity }}
          />
          <text x="-10" y="-20" fontSize="12" fontWeight="bold" fill="#22C55E" transform="rotate(-90, -10, -20)">
            Better for Environment
          </text>
        </g>

        <g transform="translate(650, 250)">
          <motion.path
            d="M0,0 L0,200"
            stroke="#EF4444"
            strokeWidth="4"
            markerEnd="url(#arrowRed)"
            animate={animated ? { strokeDashoffset: [0, 20] } : {}}
            strokeDasharray="10,5"
            transition={{ duration: 1, repeat: Infinity }}
          />
          <text x="20" y="100" fontSize="12" fontWeight="bold" fill="#EF4444" transform="rotate(90, 20, 100)">
            Worse for Environment
          </text>
        </g>

        {/* Statistics box */}
        <g transform="translate(30, 450)">
          <rect x="0" y="0" width="280" height="80" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
          <text x="140" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
            Did You Know?
          </text>
          <text x="140" y="45" textAnchor="middle" fontSize="10" fill="#6B7280">
            Reducing waste by 1 kg prevents
          </text>
          <text x="140" y="60" textAnchor="middle" fontSize="10" fill="#6B7280">
            up to 5 kg of CO2 emissions!
          </text>
          <text x="140" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#22C55E">
            Prevention is the best solution!
          </text>
        </g>

        {/* Goal box */}
        <g transform="translate(390, 450)">
          <rect x="0" y="0" width="280" height="80" rx="10" fill="#ECFDF5" stroke="#86EFAC" strokeWidth="2"/>
          <text x="140" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
            Zero Waste Goal
          </text>
          <text x="140" y="45" textAnchor="middle" fontSize="10" fill="#166534">
            Move UP the pyramid!
          </text>
          <text x="140" y="60" textAnchor="middle" fontSize="10" fill="#166534">
            Aim to prevent waste first,
          </text>
          <text x="140" y="75" textAnchor="middle" fontSize="10" fill="#166534">
            then reuse, then recycle.
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22C55E"/>
          </marker>
          <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/>
          </marker>
        </defs>
      </svg>

      {/* Level Info Panel */}
      {activeLevel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl"
          style={{
            backgroundColor: `${levels.find(l => l.id === activeLevel)?.color}15`,
            borderColor: levels.find(l => l.id === activeLevel)?.color,
            borderWidth: 2
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-4xl">{levels.find(l => l.id === activeLevel)?.icon}</span>
            <div>
              <h4
                className="font-bold text-lg"
                style={{ color: levels.find(l => l.id === activeLevel)?.color }}
              >
                {levels.find(l => l.id === activeLevel)?.name}
              </h4>
              <p className="text-gray-700 mt-1">
                {levels.find(l => l.id === activeLevel)?.description}
              </p>
              <div className="mt-2">
                <p className="text-sm font-bold text-gray-600">Examples:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {levels.find(l => l.id === activeLevel)?.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setActiveLevel(activeLevel === lvl.id ? null : lvl.id)}
            className="px-3 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1"
            style={{
              backgroundColor: activeLevel === lvl.id ? lvl.color : `${lvl.color}20`,
              color: activeLevel === lvl.id ? 'white' : lvl.color
            }}
          >
            <span>{lvl.icon}</span>
            {lvl.name}
          </button>
        ))}
      </div>
    </div>
  )
}
