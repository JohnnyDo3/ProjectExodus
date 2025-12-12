'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ThermalMassDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
  season?: 'summer' | 'winter'
}

export function ThermalMassDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = '',
  season: initialSeason = 'summer'
}: ThermalMassDiagramProps) {
  const [season, setSeason] = useState<'summer' | 'winter'>(initialSeason)
  const [activeElement, setActiveElement] = useState<string | null>(null)

  const elements = [
    {
      id: 'thermal-mass',
      label: 'Thermal Mass',
      description: season === 'summer'
        ? 'Absorbs excess heat during hot days, keeping interior cool'
        : 'Releases stored heat at night, keeping interior warm'
    },
    {
      id: 'insulation',
      label: 'Insulation',
      description: 'Prevents heat transfer between inside and outside, maintaining stable temperatures'
    },
    {
      id: 'ventilation',
      label: 'Natural Ventilation',
      description: season === 'summer'
        ? 'Cool night air flushes out daytime heat'
        : 'Closed to retain warm air inside'
    },
    {
      id: 'sun',
      label: 'Solar Heat',
      description: season === 'summer'
        ? 'Overhang blocks high summer sun'
        : 'Low winter sun enters and heats thermal mass'
    },
  ]

  const isSummer = season === 'summer'

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Season Toggle */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg bg-gray-200 p-1">
          <button
            onClick={() => setSeason('summer')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              season === 'summer'
                ? 'bg-orange-500 text-white shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ☀️ Summer
          </button>
          <button
            onClick={() => setSeason('winter')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              season === 'winter'
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ❄️ Winter
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 800 450"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="thermalSummerSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="100%" stopColor="#87CEEB" />
          </linearGradient>
          <linearGradient id="thermalWinterSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="heatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="coolGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <pattern id="thermalMassPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#78716C" />
            <rect x="0" y="0" width="9" height="9" fill="#57534E" />
            <rect x="10" y="10" width="9" height="9" fill="#57534E" />
          </pattern>
          <pattern id="insulationPattern" width="15" height="15" patternUnits="userSpaceOnUse">
            <rect width="15" height="15" fill="#FEF08A" />
            <circle cx="7.5" cy="7.5" r="3" fill="#FDE047" opacity="0.5" />
          </pattern>
        </defs>

        {/* Sky Background */}
        <rect
          x="0"
          y="0"
          width="800"
          height="450"
          fill={isSummer ? 'url(#thermalSummerSky)' : 'url(#thermalWinterSky)'}
        />

        {/* Sun */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveElement('sun')}
          onMouseEnter={() => setActiveElement('sun')}
          onMouseLeave={() => setActiveElement(null)}
        >
          <motion.circle
            cx={isSummer ? 150 : 100}
            cy={isSummer ? 60 : 120}
            r="50"
            fill="#FFD700"
            animate={animated ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1={(isSummer ? 150 : 100) + Math.cos(i * 30 * Math.PI / 180) * 55}
              y1={(isSummer ? 60 : 120) + Math.sin(i * 30 * Math.PI / 180) * 55}
              x2={(isSummer ? 150 : 100) + Math.cos(i * 30 * Math.PI / 180) * 75}
              y2={(isSummer ? 60 : 120) + Math.sin(i * 30 * Math.PI / 180) * 75}
              stroke="#FFA500"
              strokeWidth="3"
              strokeLinecap="round"
              animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
          {showLabels && (
            <text
              x={isSummer ? 150 : 100}
              y={isSummer ? 130 : 190}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#B45309"
            >
              {isSummer ? 'HIGH SUN' : 'LOW SUN'}
            </text>
          )}
        </g>

        {/* Sun rays to building */}
        {isSummer ? (
          /* Summer - rays blocked by overhang */
          <g>
            <motion.path
              d="M200,80 L380,200"
              stroke="#FFD700"
              strokeWidth="20"
              opacity="0.4"
              animate={animated ? { opacity: [0.2, 0.5, 0.2] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Blocked indicator */}
            <motion.line
              x1="380"
              y1="195"
              x2="430"
              y2="195"
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <text x="450" y="200" fontSize="10" fill="#EF4444">Blocked!</text>
          </g>
        ) : (
          /* Winter - rays enter through window */
          <motion.path
            d="M150,140 L400,300"
            stroke="#FFD700"
            strokeWidth="30"
            opacity="0.4"
            animate={animated ? { opacity: [0.3, 0.6, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Ground */}
        <rect x="0" y="380" width="800" height="70" fill={isSummer ? '#228B22' : '#E2E8F0'} />

        {/* House Cross-Section */}
        <g transform="translate(250, 150)">
          {/* Roof with overhang */}
          <polygon
            points="-30,50 150,0 330,50 300,50 150,10 0,50"
            fill="#78350F"
            stroke="#451A03"
            strokeWidth="2"
          />

          {/* Overhang highlight for summer */}
          {isSummer && (
            <motion.polygon
              points="-30,50 0,50 150,10 150,0"
              fill="#FFD700"
              opacity="0.3"
              animate={animated ? { opacity: [0.2, 0.4, 0.2] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Outer walls with insulation */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveElement('insulation')}
            onMouseEnter={() => setActiveElement('insulation')}
            onMouseLeave={() => setActiveElement(null)}
          >
            {/* Left wall */}
            <rect x="0" y="50" width="30" height="180" fill="url(#insulationPattern)" />
            <rect x="0" y="50" width="30" height="180" fill="none" stroke={activeElement === 'insulation' ? '#FBBF24' : '#D1D5DB'} strokeWidth="2" />

            {/* Right wall */}
            <rect x="270" y="50" width="30" height="180" fill="url(#insulationPattern)" />
            <rect x="270" y="50" width="30" height="180" fill="none" stroke={activeElement === 'insulation' ? '#FBBF24' : '#D1D5DB'} strokeWidth="2" />
          </g>

          {/* Interior space */}
          <rect x="30" y="50" width="240" height="180" fill={isSummer ? '#E0F2FE' : '#FEF3C7'} />

          {/* Thermal Mass Floor */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveElement('thermal-mass')}
            onMouseEnter={() => setActiveElement('thermal-mass')}
            onMouseLeave={() => setActiveElement(null)}
          >
            <rect
              x="30"
              y="200"
              width="240"
              height="30"
              fill="url(#thermalMassPattern)"
              stroke={activeElement === 'thermal-mass' ? (isSummer ? '#3B82F6' : '#EF4444') : '#57534E'}
              strokeWidth={activeElement === 'thermal-mass' ? 3 : 1}
            />

            {/* Heat waves from/to thermal mass */}
            {animated && (
              <g>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.path
                    key={i}
                    d={`M${60 + i * 50},${isSummer ? 200 : 230} Q${70 + i * 50},${isSummer ? 190 : 220} ${80 + i * 50},${isSummer ? 200 : 230}`}
                    fill="none"
                    stroke={isSummer ? '#3B82F6' : '#EF4444'}
                    strokeWidth="2"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: isSummer ? [0, -20] : [0, -30]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </g>
            )}

            {showLabels && (
              <text x="150" y="250" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#57534E">
                THERMAL MASS (Concrete/Stone)
              </text>
            )}
          </g>

          {/* Window */}
          <g>
            <rect x="100" y="80" width="100" height="100" fill={isSummer ? '#87CEEB' : '#FEF3C7'} stroke="#374151" strokeWidth="2" />
            <line x1="150" y1="80" x2="150" y2="180" stroke="#374151" strokeWidth="2" />
            <line x1="100" y1="130" x2="200" y2="130" stroke="#374151" strokeWidth="2" />

            {/* Sunlight through window in winter */}
            {!isSummer && animated && (
              <motion.rect
                x="100"
                y="80"
                width="100"
                height="100"
                fill="#FFD700"
                opacity="0.3"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </g>

          {/* Ventilation */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveElement('ventilation')}
            onMouseEnter={() => setActiveElement('ventilation')}
            onMouseLeave={() => setActiveElement(null)}
          >
            {/* Vent on top */}
            <rect
              x="220"
              y="55"
              width="30"
              height="20"
              fill={isSummer ? '#60A5FA' : '#9CA3AF'}
              stroke={activeElement === 'ventilation' ? '#3B82F6' : '#374151'}
              strokeWidth="2"
            />

            {/* Airflow arrows for summer */}
            {isSummer && animated && (
              <g>
                <motion.path
                  d="M235,45 L235,30"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="3"
                  markerEnd="url(#arrowBlueUp)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <text x="250" y="35" fontSize="9" fill="#3B82F6">Hot air out</text>
              </g>
            )}

            {/* Closed indicator for winter */}
            {!isSummer && (
              <text x="255" y="70" fontSize="9" fill="#6B7280">Closed</text>
            )}
          </g>

          {/* Interior temperature indicator */}
          <g transform="translate(60, 100)">
            <rect x="0" y="0" width="25" height="60" rx="12" fill="#E5E7EB" />
            <motion.rect
              x="3"
              y={isSummer ? 20 : 35}
              width="19"
              height={isSummer ? 37 : 22}
              rx="9"
              fill={isSummer ? '#60A5FA' : '#EF4444'}
              animate={animated ? {
                height: isSummer ? [35, 40, 35] : [20, 25, 20],
                y: isSummer ? [22, 17, 22] : [37, 32, 37]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <circle cx="12.5" cy="50" r="8" fill={isSummer ? '#3B82F6' : '#EF4444'} />
            <text x="12.5" y="80" textAnchor="middle" fontSize="9" fill="#374151">
              {isSummer ? '22°C' : '20°C'}
            </text>
          </g>

          {/* Person for scale */}
          <g transform="translate(180, 120)">
            <circle cx="15" cy="0" r="12" fill="#F5D0C5" />
            <rect x="5" y="12" width="20" height="40" rx="5" fill={isSummer ? '#60A5FA' : '#EF4444'} />
            <rect x="7" y="52" width="8" height="25" fill="#374151" />
            <rect x="17" y="52" width="8" height="25" fill="#374151" />
          </g>
        </g>

        {/* Outdoor temperature */}
        <g transform="translate(650, 80)">
          <rect x="0" y="0" width="100" height="60" rx="10" fill="white" opacity="0.95" />
          <text x="50" y="20" textAnchor="middle" fontSize="10" fill="#374151">Outside</text>
          <text x="50" y="45" textAnchor="middle" fontSize="18" fontWeight="bold" fill={isSummer ? '#EF4444' : '#3B82F6'}>
            {isSummer ? '35°C' : '-5°C'}
          </text>
        </g>

        {/* Info box */}
        <g transform="translate(30, 350)">
          <rect x="0" y="0" width="250" height="80" rx="10" fill="white" opacity="0.95" />
          <text x="125" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
            Thermal Mass: {isSummer ? 'Summer Cooling' : 'Winter Heating'}
          </text>
          <text x="125" y="45" textAnchor="middle" fontSize="10" fill="#374151">
            {isSummer
              ? 'Mass absorbs heat during day, releases at night'
              : 'Mass stores solar heat, releases when needed'}
          </text>
          <text x="125" y="65" textAnchor="middle" fontSize="11" fill="#22C55E" fontWeight="bold">
            🌡️ Stable indoor temperature!
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowBlueUp" markerWidth="10" markerHeight="7" refX="5" refY="7" orient="auto">
            <polygon points="0 7, 5 0, 10 7" fill="#60A5FA" />
          </marker>
        </defs>
      </svg>

      {/* Element Info Panel */}
      {activeElement && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-xl border-2 ${
            isSummer
              ? 'bg-blue-50 border-blue-200'
              : 'bg-orange-50 border-orange-200'
          }`}
        >
          <p className={`font-bold ${isSummer ? 'text-blue-700' : 'text-orange-700'}`}>
            {elements.find(e => e.id === activeElement)?.label}
          </p>
          <p className={`text-sm ${isSummer ? 'text-blue-600' : 'text-orange-600'}`}>
            {elements.find(e => e.id === activeElement)?.description}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {elements.map((element) => (
          <button
            key={element.id}
            onClick={() => setActiveElement(activeElement === element.id ? null : element.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeElement === element.id
                ? isSummer
                  ? 'bg-blue-600 text-white'
                  : 'bg-orange-600 text-white'
                : isSummer
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            {element.label}
          </button>
        ))}
      </div>
    </div>
  )
}
