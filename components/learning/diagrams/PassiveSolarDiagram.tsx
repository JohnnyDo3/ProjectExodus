'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PassiveSolarDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  season?: 'winter' | 'summer'
  className?: string
}

export function PassiveSolarDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  season = 'winter',
  className = ''
}: PassiveSolarDiagramProps) {
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null)
  const [currentSeason, setCurrentSeason] = useState<'winter' | 'summer'>(season)

  const principles = [
    {
      id: 'orientation',
      name: 'Orientation',
      description: 'Building faces south to capture maximum sunlight in winter months.',
      icon: '🧭'
    },
    {
      id: 'glazing',
      name: 'South-Facing Windows',
      description: 'Large windows on the south side let in warming sunlight during winter.',
      icon: '🪟'
    },
    {
      id: 'thermal-mass',
      name: 'Thermal Mass',
      description: 'Heavy materials like concrete, stone, or tile store heat during the day and release it at night.',
      icon: '🧱'
    },
    {
      id: 'overhang',
      name: 'Roof Overhang',
      description: 'Extended roof blocks high summer sun but allows low winter sun to enter.',
      icon: '🏠'
    },
    {
      id: 'insulation',
      name: 'Insulation',
      description: 'Keeps heat inside during winter and outside during summer.',
      icon: '🧤'
    }
  ]

  const sunAngle = currentSeason === 'winter' ? 25 : 70

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Season Toggle */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setCurrentSeason('winter')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            currentSeason === 'winter'
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          ❄️ Winter
        </button>
        <button
          onClick={() => setCurrentSeason('summer')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            currentSeason === 'summer'
              ? 'bg-orange-500 text-white'
              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
          }`}
        >
          ☀️ Summer
        </button>
      </div>

      <svg
        viewBox="0 0 900 500"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="winterSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD"/>
            <stop offset="100%" stopColor="#DBEAFE"/>
          </linearGradient>
          <linearGradient id="summerSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8"/>
            <stop offset="100%" stopColor="#BAE6FD"/>
          </linearGradient>
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400E"/>
            <stop offset="100%" stopColor="#B45309"/>
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350F"/>
            <stop offset="100%" stopColor="#451A03"/>
          </linearGradient>
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B7280"/>
            <stop offset="100%" stopColor="#4B5563"/>
          </linearGradient>
          <linearGradient id="sunlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.3"/>
          </linearGradient>

          {/* Heat pattern */}
          <pattern id="heatWaves" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 Q5,5 10,10 Q15,15 20,10" fill="none" stroke="#F97316" strokeWidth="1" opacity="0.5"/>
          </pattern>

          {/* Insulation pattern */}
          <pattern id="insulationPattern" width="15" height="15" patternUnits="userSpaceOnUse">
            <rect width="15" height="15" fill="#FDE68A"/>
            <circle cx="7.5" cy="7.5" r="5" fill="#FBBF24" opacity="0.5"/>
          </pattern>
        </defs>

        {/* Sky */}
        <rect
          x="0"
          y="0"
          width="900"
          height="350"
          fill={currentSeason === 'winter' ? 'url(#winterSky)' : 'url(#summerSky)'}
        />

        {/* Ground */}
        <rect x="0" y="350" width="900" height="150" fill={currentSeason === 'winter' ? '#E5E7EB' : '#22C55E'}/>

        {/* Sun with angle indicator */}
        <g
          className="cursor-pointer"
          onClick={() => setActivePrinciple('orientation')}
          onMouseEnter={() => setActivePrinciple('orientation')}
          onMouseLeave={() => setActivePrinciple(null)}
        >
          <motion.g
            animate={{
              x: currentSeason === 'winter' ? 0 : 100,
              y: currentSeason === 'winter' ? 0 : -80
            }}
            transition={{ duration: 1 }}
          >
            {/* Sun */}
            <motion.circle
              cx="150"
              cy={currentSeason === 'winter' ? 200 : 80}
              r="50"
              fill="#FCD34D"
              animate={animated ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Sun rays */}
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={i}
                x1={150 + Math.cos(i * 30 * Math.PI / 180) * 55}
                y1={(currentSeason === 'winter' ? 200 : 80) + Math.sin(i * 30 * Math.PI / 180) * 55}
                x2={150 + Math.cos(i * 30 * Math.PI / 180) * 75}
                y2={(currentSeason === 'winter' ? 200 : 80) + Math.sin(i * 30 * Math.PI / 180) * 75}
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinecap="round"
                animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}

            {/* Angle label */}
            <text
              x="150"
              y={currentSeason === 'winter' ? 280 : 160}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#B45309"
            >
              {currentSeason === 'winter' ? '~27° Low Winter Sun' : '~73° High Summer Sun'}
            </text>
          </motion.g>
        </g>

        {/* HOUSE CROSS-SECTION */}
        <g transform="translate(300, 100)">

          {/* Roof with overhang */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePrinciple('overhang')}
            onMouseEnter={() => setActivePrinciple('overhang')}
            onMouseLeave={() => setActivePrinciple(null)}
          >
            <polygon
              points="-50,150 250,0 550,150"
              fill="url(#roofGradient)"
              stroke={activePrinciple === 'overhang' ? '#FFD700' : 'none'}
              strokeWidth="4"
            />
            {/* Overhang extension */}
            <rect x="-70" y="145" width="70" height="15" fill="#78350F"/>
            <rect x="500" y="145" width="70" height="15" fill="#78350F"/>

            {/* Overhang label */}
            <line x1="-70" y1="130" x2="-70" y2="145" stroke="#374151" strokeWidth="2"/>
            <line x1="-30" y1="130" x2="-30" y2="145" stroke="#374151" strokeWidth="2"/>
            <line x1="-70" y1="130" x2="-30" y2="130" stroke="#374151" strokeWidth="2"/>
            <text x="-50" y="120" textAnchor="middle" fontSize="10" fill="#374151">Overhang</text>
          </g>

          {/* Walls */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePrinciple('insulation')}
            onMouseEnter={() => setActivePrinciple('insulation')}
            onMouseLeave={() => setActivePrinciple(null)}
          >
            {/* Left wall with insulation */}
            <rect x="0" y="160" width="50" height="190" fill="url(#wallGradient)"/>
            <rect x="5" y="165" width="15" height="180" fill="url(#insulationPattern)"
              stroke={activePrinciple === 'insulation' ? '#FFD700' : 'none'}
              strokeWidth="3"
            />

            {/* Right wall with insulation */}
            <rect x="450" y="160" width="50" height="190" fill="url(#wallGradient)"/>
            <rect x="480" y="165" width="15" height="180" fill="url(#insulationPattern)"
              stroke={activePrinciple === 'insulation' ? '#FFD700' : 'none'}
              strokeWidth="3"
            />

            {/* Back wall */}
            <rect x="50" y="160" width="400" height="20" fill="#7C2D12"/>
          </g>

          {/* Thermal Mass Floor */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePrinciple('thermal-mass')}
            onMouseEnter={() => setActivePrinciple('thermal-mass')}
            onMouseLeave={() => setActivePrinciple(null)}
          >
            <rect
              x="50"
              y="320"
              width="400"
              height="30"
              fill="url(#floorGradient)"
              stroke={activePrinciple === 'thermal-mass' ? '#FFD700' : 'none'}
              strokeWidth="3"
            />
            {/* Tile pattern */}
            {[...Array(20)].map((_, i) => (
              <line
                key={i}
                x1={50 + i * 20}
                y1="320"
                x2={50 + i * 20}
                y2="350"
                stroke="#374151"
                strokeWidth="1"
              />
            ))}

            {/* Heat storage indicators */}
            {animated && currentSeason === 'winter' && (
              <>
                {[100, 200, 300, 400].map((x, i) => (
                  <motion.g key={i}>
                    <motion.path
                      d={`M${x},315 Q${x+5},305 ${x+10},315`}
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="2"
                      animate={{ y: [0, -10], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </motion.g>
                ))}
              </>
            )}
          </g>

          {/* South-facing windows */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePrinciple('glazing')}
            onMouseEnter={() => setActivePrinciple('glazing')}
            onMouseLeave={() => setActivePrinciple(null)}
          >
            {/* Large south windows */}
            <rect
              x="80"
              y="200"
              width="100"
              height="110"
              fill="#87CEEB"
              stroke={activePrinciple === 'glazing' ? '#FFD700' : '#1F2937'}
              strokeWidth={activePrinciple === 'glazing' ? 4 : 2}
            />
            <line x1="130" y1="200" x2="130" y2="310" stroke="#1F2937" strokeWidth="2"/>
            <line x1="80" y1="255" x2="180" y2="255" stroke="#1F2937" strokeWidth="2"/>

            <rect
              x="200"
              y="200"
              width="100"
              height="110"
              fill="#87CEEB"
              stroke={activePrinciple === 'glazing' ? '#FFD700' : '#1F2937'}
              strokeWidth={activePrinciple === 'glazing' ? 4 : 2}
            />
            <line x1="250" y1="200" x2="250" y2="310" stroke="#1F2937" strokeWidth="2"/>
            <line x1="200" y1="255" x2="300" y2="255" stroke="#1F2937" strokeWidth="2"/>

            <rect
              x="320"
              y="200"
              width="100"
              height="110"
              fill="#87CEEB"
              stroke={activePrinciple === 'glazing' ? '#FFD700' : '#1F2937'}
              strokeWidth={activePrinciple === 'glazing' ? 4 : 2}
            />
            <line x1="370" y1="200" x2="370" y2="310" stroke="#1F2937" strokeWidth="2"/>
            <line x1="320" y1="255" x2="420" y2="255" stroke="#1F2937" strokeWidth="2"/>
          </g>

          {/* Sunlight entering (Winter) or blocked (Summer) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentSeason === 'winter' ? (
              /* Winter - Sun enters through windows */
              <g>
                <motion.polygon
                  points="-50,150 130,200 130,310 400,310 400,320 50,320 50,165"
                  fill="url(#sunlightGradient)"
                  animate={animated ? { opacity: [0.3, 0.6, 0.3] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Sun rays entering */}
                {[100, 200, 300].map((x, i) => (
                  <motion.line
                    key={i}
                    x1={-100}
                    y1={50 + i * 30}
                    x2={x + 30}
                    y2={320}
                    stroke="#FCD34D"
                    strokeWidth="3"
                    opacity="0.5"
                    strokeDasharray="15,10"
                    animate={animated ? { strokeDashoffset: [0, -50] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ))}
                {/* Interior warm glow */}
                <rect x="50" y="180" width="400" height="140" fill="#FEF3C7" opacity="0.3"/>
              </g>
            ) : (
              /* Summer - Sun blocked by overhang */
              <g>
                {/* Blocked rays */}
                {[100, 200, 300].map((x, i) => (
                  <motion.line
                    key={i}
                    x1={-150 + i * 50}
                    y1={-50}
                    x2={-70 + i * 50}
                    y2={145}
                    stroke="#FCD34D"
                    strokeWidth="3"
                    opacity="0.4"
                    strokeDasharray="10,8"
                    animate={animated ? { strokeDashoffset: [0, -36] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ))}
                {/* Shadow from overhang */}
                <rect x="50" y="160" width="400" height="60" fill="#1F2937" opacity="0.3"/>
                <text x="250" y="195" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">
                  Shaded by overhang
                </text>
              </g>
            )}
          </motion.g>

          {/* Interior label */}
          <text x="250" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">
            INTERIOR
          </text>
          <text x="250" y="290" textAnchor="middle" fontSize="12" fill="#6B7280">
            {currentSeason === 'winter' ? 'Warm & Cozy' : 'Cool & Comfortable'}
          </text>
        </g>

        {/* North arrow */}
        <g transform="translate(820, 400)">
          <circle cx="0" cy="0" r="30" fill="white" stroke="#374151" strokeWidth="2"/>
          <polygon points="0,-25 5,-5 -5,-5" fill="#EF4444"/>
          <polygon points="0,25 5,5 -5,5" fill="#374151"/>
          <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">N</text>
          <text x="0" y="-35" textAnchor="middle" fontSize="10" fill="#EF4444">↑ North</text>
          <text x="0" y="50" textAnchor="middle" fontSize="10" fill="#374151">↓ South</text>
        </g>

        {/* Temperature comparison */}
        <g transform="translate(700, 200)">
          <rect x="0" y="0" width="150" height="100" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
          <text x="75" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
            {currentSeason === 'winter' ? 'Winter Performance' : 'Summer Performance'}
          </text>
          {currentSeason === 'winter' ? (
            <>
              <text x="75" y="50" textAnchor="middle" fontSize="10" fill="#3B82F6">Outside: -5°C (23°F)</text>
              <text x="75" y="70" textAnchor="middle" fontSize="10" fill="#EF4444">Inside: 20°C (68°F)</text>
              <text x="75" y="90" textAnchor="middle" fontSize="10" fill="#22C55E" fontWeight="bold">No heater needed!</text>
            </>
          ) : (
            <>
              <text x="75" y="50" textAnchor="middle" fontSize="10" fill="#EF4444">Outside: 35°C (95°F)</text>
              <text x="75" y="70" textAnchor="middle" fontSize="10" fill="#3B82F6">Inside: 24°C (75°F)</text>
              <text x="75" y="90" textAnchor="middle" fontSize="10" fill="#22C55E" fontWeight="bold">No AC needed!</text>
            </>
          )}
        </g>

        {/* Labels */}
        {showLabels && (
          <g>
            <text x="50" y="480" fontSize="16" fontWeight="bold" fill="#374151">
              PASSIVE SOLAR DESIGN - {currentSeason.toUpperCase()}
            </text>
          </g>
        )}
      </svg>

      {/* Principle Info Panel */}
      {activePrinciple && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{principles.find(p => p.id === activePrinciple)?.icon}</span>
            <div>
              <h4 className="font-bold text-amber-800 text-lg">
                {principles.find(p => p.id === activePrinciple)?.name}
              </h4>
              <p className="text-amber-700">
                {principles.find(p => p.id === activePrinciple)?.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Principle Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {principles.map((principle) => (
          <button
            key={principle.id}
            onClick={() => setActivePrinciple(activePrinciple === principle.id ? null : principle.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
              activePrinciple === principle.id
                ? 'bg-amber-600 text-white'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            <span>{principle.icon}</span>
            {principle.name}
          </button>
        ))}
      </div>
    </div>
  )
}
