'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface RainwaterHarvestingDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function RainwaterHarvestingDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: RainwaterHarvestingDiagramProps) {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const components = [
    { id: 'catchment', label: 'Catchment (Roof)', description: 'The roof collects rainfall and directs it to gutters' },
    { id: 'gutters', label: 'Gutters & Downspouts', description: 'Channel water from roof to storage system' },
    { id: 'filter', label: 'First Flush Filter', description: 'Diverts initial dirty water and filters debris' },
    { id: 'storage', label: 'Storage Tank', description: 'Stores harvested rainwater for later use' },
    { id: 'pump', label: 'Pump System', description: 'Distributes water to garden or home uses' },
    { id: 'overflow', label: 'Overflow', description: 'Safely redirects excess water to garden or drain' },
  ]

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="rainySkygradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="tankGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </linearGradient>
          <pattern id="roofPattern" width="30" height="20" patternUnits="userSpaceOnUse">
            <rect width="30" height="20" fill="#78350F" />
            <rect x="0" y="0" width="28" height="8" rx="1" fill="#92400E" />
            <rect x="15" y="10" width="28" height="8" rx="1" fill="#92400E" />
          </pattern>
        </defs>

        {/* Rainy Sky Background */}
        <rect x="0" y="0" width="800" height="500" fill="url(#rainySkygradient)" />

        {/* Rain clouds */}
        <g>
          <motion.ellipse
            cx="200"
            cy="60"
            rx="80"
            ry="35"
            fill="#64748B"
            animate={animated ? { x: [0, 10, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.ellipse
            cx="160"
            cy="50"
            rx="50"
            ry="25"
            fill="#475569"
            animate={animated ? { x: [0, 8, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
          />
          <motion.ellipse
            cx="240"
            cy="55"
            rx="50"
            ry="28"
            fill="#475569"
            animate={animated ? { x: [0, 8, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, delay: 0.4 }}
          />
        </g>

        {/* Raindrops */}
        {animated && [...Array(20)].map((_, i) => (
          <motion.line
            key={i}
            x1={80 + (i % 10) * 35 + Math.random() * 20}
            y1={100}
            x2={80 + (i % 10) * 35 + Math.random() * 20 + 5}
            y2={115}
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, 200],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}

        {/* Ground */}
        <rect x="0" y="420" width="800" height="80" fill="#166534" />
        <rect x="0" y="415" width="800" height="10" fill="#22C55E" />

        {/* House */}
        <g>
          {/* House body */}
          <rect x="150" y="250" width="200" height="170" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />

          {/* Roof - Catchment Area */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveComponent('catchment')}
            onMouseEnter={() => setActiveComponent('catchment')}
            onMouseLeave={() => setActiveComponent(null)}
          >
            <polygon
              points="130,250 250,150 370,250"
              fill="url(#roofPattern)"
              stroke={activeComponent === 'catchment' ? '#3B82F6' : '#78350F'}
              strokeWidth={activeComponent === 'catchment' ? 4 : 2}
            />

            {/* Water flowing on roof */}
            {animated && (
              <motion.path
                d="M170,210 L250,170"
                stroke="#60A5FA"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {showLabels && (
              <text x="250" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350F">
                CATCHMENT
              </text>
            )}
          </g>

          {/* Windows */}
          <rect x="180" y="280" width="40" height="50" fill="#87CEEB" stroke="#92400E" strokeWidth="2" />
          <line x1="200" y1="280" x2="200" y2="330" stroke="#92400E" strokeWidth="2" />
          <line x1="180" y1="305" x2="220" y2="305" stroke="#92400E" strokeWidth="2" />

          <rect x="280" y="280" width="40" height="50" fill="#87CEEB" stroke="#92400E" strokeWidth="2" />
          <line x1="300" y1="280" x2="300" y2="330" stroke="#92400E" strokeWidth="2" />
          <line x1="280" y1="305" x2="320" y2="305" stroke="#92400E" strokeWidth="2" />

          {/* Door */}
          <rect x="230" y="350" width="40" height="70" fill="#78350F" stroke="#92400E" strokeWidth="2" />
          <circle cx="260" cy="385" r="4" fill="#FFD700" />
        </g>

        {/* Gutters */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveComponent('gutters')}
          onMouseEnter={() => setActiveComponent('gutters')}
          onMouseLeave={() => setActiveComponent(null)}
        >
          {/* Gutter along roof edge */}
          <rect
            x="125"
            y="248"
            width="250"
            height="10"
            fill={activeComponent === 'gutters' ? '#60A5FA' : '#6B7280'}
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Downspout */}
          <rect x="365" y="248" width="15" height="170" fill="#6B7280" stroke="#374151" strokeWidth="1" />

          {/* Water in downspout */}
          {animated && (
            <motion.rect
              x="367"
              y="250"
              width="11"
              height="30"
              fill="#60A5FA"
              initial={{ y: 250 }}
              animate={{ y: [250, 380] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          {showLabels && (
            <text x="400" y="320" fontSize="10" fontWeight="bold" fill="#374151">
              DOWNSPOUT
            </text>
          )}
        </g>

        {/* First Flush Diverter / Filter */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveComponent('filter')}
          onMouseEnter={() => setActiveComponent('filter')}
          onMouseLeave={() => setActiveComponent(null)}
          transform="translate(380, 350)"
        >
          <rect
            x="0"
            y="0"
            width="50"
            height="70"
            rx="5"
            fill={activeComponent === 'filter' ? '#22C55E' : '#9CA3AF'}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Filter mesh lines */}
          {[15, 30, 45].map((y, i) => (
            <line key={i} x1="5" y1={y} x2="45" y2={y} stroke="#6B7280" strokeWidth="2" />
          ))}

          {/* Debris being filtered */}
          <motion.circle
            cx="25"
            cy="10"
            r="4"
            fill="#8B4513"
            animate={animated ? { cy: [10, 60], opacity: [1, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />

          {showLabels && (
            <text x="25" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#374151">
              FILTER
            </text>
          )}
        </g>

        {/* Pipe to storage */}
        <path
          d="M430,385 L480,385 L480,400"
          fill="none"
          stroke="#6B7280"
          strokeWidth="12"
        />

        {/* Water flow in pipe */}
        {animated && (
          <motion.circle
            cx="430"
            cy="385"
            r="5"
            fill="#60A5FA"
            animate={{ cx: [430, 480], cy: [385, 385, 400] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Storage Tank */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveComponent('storage')}
          onMouseEnter={() => setActiveComponent('storage')}
          onMouseLeave={() => setActiveComponent(null)}
          transform="translate(450, 330)"
        >
          {/* Tank body */}
          <ellipse cx="60" cy="90" rx="60" ry="20" fill="#1E3A5F" />
          <rect
            x="0"
            y="0"
            width="120"
            height="90"
            fill="url(#tankGradient)"
            stroke={activeComponent === 'storage' ? '#60A5FA' : '#1E3A5F'}
            strokeWidth={activeComponent === 'storage' ? 4 : 2}
          />
          <ellipse cx="60" cy="0" rx="60" ry="20" fill="#2563EB" />

          {/* Water level inside */}
          <motion.rect
            x="5"
            y="30"
            width="110"
            height="55"
            fill="#60A5FA"
            opacity="0.7"
            animate={animated ? { height: [40, 55, 40] } : {}}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {/* Tank gauge */}
          <rect x="125" y="10" width="10" height="80" fill="#E5E7EB" stroke="#6B7280" />
          <motion.rect
            x="127"
            y="30"
            width="6"
            height="58"
            fill="#3B82F6"
            animate={animated ? { height: [45, 58, 45], y: [43, 30, 43] } : {}}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {showLabels && (
            <text x="60" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E40AF">
              STORAGE TANK
            </text>
          )}
          <text x="60" y="140" textAnchor="middle" fontSize="10" fill="#3B82F6">
            5,000 Liters
          </text>
        </g>

        {/* Pump System */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveComponent('pump')}
          onMouseEnter={() => setActiveComponent('pump')}
          onMouseLeave={() => setActiveComponent(null)}
          transform="translate(590, 380)"
        >
          <rect
            x="0"
            y="0"
            width="40"
            height="35"
            rx="5"
            fill={activeComponent === 'pump' ? '#22C55E' : '#374151'}
            stroke="#1F2937"
            strokeWidth="2"
          />

          {/* Pump indicator */}
          <motion.circle
            cx="20"
            cy="17"
            r="8"
            fill="#22C55E"
            animate={animated ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />

          {showLabels && (
            <text x="20" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#374151">
              PUMP
            </text>
          )}
        </g>

        {/* Pipe from pump to garden */}
        <path
          d="M630,397 L680,397 L680,430"
          fill="none"
          stroke="#6B7280"
          strokeWidth="8"
        />

        {/* Garden / Usage Area */}
        <g transform="translate(640, 430)">
          {/* Garden bed */}
          <rect x="0" y="0" width="100" height="50" fill="#8B4513" rx="5" />

          {/* Plants */}
          {[15, 40, 65, 90].map((x, i) => (
            <g key={i} transform={`translate(${x}, -10)`}>
              <line x1="0" y1="10" x2="0" y2="30" stroke="#166534" strokeWidth="3" />
              <motion.ellipse
                cx="0"
                cy="5"
                rx="12"
                ry="10"
                fill="#22C55E"
                animate={animated ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            </g>
          ))}

          {/* Water droplets on plants */}
          {animated && [20, 50, 80].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={-5}
              r="3"
              fill="#60A5FA"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 0], y: [-20, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.4 + 0.5 }}
            />
          ))}

          {showLabels && (
            <text x="50" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">
              GARDEN IRRIGATION
            </text>
          )}
        </g>

        {/* Overflow pipe */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveComponent('overflow')}
          onMouseEnter={() => setActiveComponent('overflow')}
          onMouseLeave={() => setActiveComponent(null)}
        >
          <path
            d="M510,355 L510,340 L550,340 L550,420"
            fill="none"
            stroke={activeComponent === 'overflow' ? '#F59E0B' : '#9CA3AF'}
            strokeWidth="8"
          />

          {showLabels && (
            <text x="555" y="380" fontSize="9" fill="#6B7280">Overflow</text>
          )}
        </g>

        {/* Info Box */}
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="180" height="90" rx="10" fill="white" opacity="0.95" />
          <text x="90" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E40AF">
            Rainwater Harvesting
          </text>
          <text x="90" y="45" textAnchor="middle" fontSize="10" fill="#374151">
            Collecting and storing rain
          </text>
          <text x="90" y="60" textAnchor="middle" fontSize="10" fill="#374151">
            for sustainable water use
          </text>
          <text x="90" y="80" textAnchor="middle" fontSize="11" fill="#22C55E" fontWeight="bold">
            💧 Save up to 50% water!
          </text>
        </g>
      </svg>

      {/* Component Info Panel */}
      {activeComponent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
        >
          <p className="font-bold text-blue-700">
            {components.find(c => c.id === activeComponent)?.label}
          </p>
          <p className="text-blue-600 text-sm">
            {components.find(c => c.id === activeComponent)?.description}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {components.map((component) => (
          <button
            key={component.id}
            onClick={() => setActiveComponent(activeComponent === component.id ? null : component.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeComponent === component.id
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {component.label}
          </button>
        ))}
      </div>
    </div>
  )
}
