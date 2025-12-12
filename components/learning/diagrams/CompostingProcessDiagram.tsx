'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface CompostingProcessDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function CompostingProcessDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: CompostingProcessDiagramProps) {
  const [activePhase, setActivePhase] = useState<string | null>(null)

  const phases = [
    {
      id: 'inputs',
      name: 'Inputs',
      description: 'Brown materials (carbon) + Green materials (nitrogen) = Perfect compost recipe!',
      icon: '🍂🥬'
    },
    {
      id: 'mesophilic',
      name: 'Mesophilic Phase',
      description: 'Bacteria begin breaking down materials. Temperature rises to 40°C (104°F).',
      icon: '🦠'
    },
    {
      id: 'thermophilic',
      name: 'Thermophilic Phase',
      description: 'Hot composting! Temperature reaches 55-65°C (130-150°F). Pathogens destroyed.',
      icon: '🔥'
    },
    {
      id: 'cooling',
      name: 'Cooling Phase',
      description: 'Fungi and larger organisms move in. More complex breakdown occurs.',
      icon: '🍄'
    },
    {
      id: 'curing',
      name: 'Curing/Maturation',
      description: 'Final stabilization. Humus forms. Ready for your garden!',
      icon: '🌱'
    }
  ]

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 900 500"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="compostBinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5D4E37"/>
            <stop offset="100%" stopColor="#3D3225"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80"/>
            <stop offset="100%" stopColor="#22C55E"/>
          </linearGradient>
          <linearGradient id="brownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A0522D"/>
            <stop offset="100%" stopColor="#8B4513"/>
          </linearGradient>
          <linearGradient id="heatGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FCD34D"/>
            <stop offset="50%" stopColor="#F97316"/>
            <stop offset="100%" stopColor="#DC2626"/>
          </linearGradient>

          {/* Steam effect */}
          <filter id="steam" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
          </filter>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="900" height="500" fill="#F0FDF4"/>

        {/* Title area */}
        <text x="450" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#166534">
          The Composting Process
        </text>

        {/* INPUT SECTION */}
        <g
          className="cursor-pointer"
          onClick={() => setActivePhase('inputs')}
          onMouseEnter={() => setActivePhase('inputs')}
          onMouseLeave={() => setActivePhase(null)}
        >
          {/* Green materials box */}
          <rect x="30" y="80" width="120" height="150" rx="10" fill="url(#greenGradient)" opacity="0.9"/>
          <text x="90" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">GREEN</text>
          <text x="90" y="125" textAnchor="middle" fontSize="10" fill="white">(Nitrogen)</text>

          {/* Green items */}
          <g transform="translate(50, 140)">
            {/* Veggie scraps */}
            <ellipse cx="20" cy="10" rx="15" ry="8" fill="#22C55E"/>
            <ellipse cx="50" cy="20" rx="12" ry="10" fill="#4ADE80"/>
            <rect x="10" y="35" width="25" height="8" rx="4" fill="#15803D"/>
            <circle cx="55" cy="50" r="10" fill="#86EFAC"/>
            <ellipse cx="25" cy="65" rx="18" ry="7" fill="#22C55E"/>
          </g>

          {/* Brown materials box */}
          <rect x="30" y="260" width="120" height="150" rx="10" fill="url(#brownGradient)" opacity="0.9"/>
          <text x="90" y="290" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">BROWN</text>
          <text x="90" y="305" textAnchor="middle" fontSize="10" fill="white">(Carbon)</text>

          {/* Brown items */}
          <g transform="translate(45, 320)">
            {/* Leaves */}
            <ellipse cx="20" cy="10" rx="15" ry="6" fill="#92400E" transform="rotate(-20, 20, 10)"/>
            <ellipse cx="50" cy="15" rx="12" ry="5" fill="#A0522D" transform="rotate(15, 50, 15)"/>
            {/* Twigs */}
            <rect x="10" y="30" width="40" height="4" fill="#78350F" transform="rotate(-10, 30, 32)"/>
            <rect x="25" y="45" width="35" height="3" fill="#92400E" transform="rotate(5, 42, 46)"/>
            {/* Paper/cardboard */}
            <rect x="15" y="60" width="30" height="20" fill="#D4A574" rx="2"/>
            <line x1="20" y1="65" x2="40" y2="65" stroke="#A0522D" strokeWidth="1"/>
            <line x1="20" y1="70" x2="40" y2="70" stroke="#A0522D" strokeWidth="1"/>
          </g>

          {/* Ratio indicator */}
          <text x="90" y="440" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">
            Ideal Ratio
          </text>
          <text x="90" y="460" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#166534">
            30:1 C:N
          </text>
        </g>

        {/* Arrow to bin */}
        <motion.path
          d="M160,200 Q200,200 220,200"
          fill="none"
          stroke="#16A34A"
          strokeWidth="4"
          markerEnd="url(#arrowGreen)"
          animate={animated ? { strokeDashoffset: [20, 0] } : {}}
          strokeDasharray="10,5"
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* COMPOST BIN */}
        <g transform="translate(220, 100)">
          {/* Bin body */}
          <rect x="0" y="50" width="180" height="250" rx="5" fill="url(#compostBinGradient)"/>
          {/* Bin lid */}
          <rect x="-10" y="40" width="200" height="20" rx="5" fill="#4A4035"/>
          {/* Ventilation holes */}
          {[70, 120, 170, 220, 270].map((y, i) => (
            <g key={i}>
              <circle cx="20" cy={y} r="5" fill="#2D2620"/>
              <circle cx="160" cy={y} r="5" fill="#2D2620"/>
            </g>
          ))}

          {/* Compost layers inside */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePhase('mesophilic')}
            onMouseEnter={() => setActivePhase('mesophilic')}
            onMouseLeave={() => setActivePhase(null)}
          >
            <rect x="10" y="250" width="160" height="40" fill="#4A3728" rx="3"/>
            <text x="90" y="275" textAnchor="middle" fontSize="10" fill="#FDE68A">Fresh Layer</text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActivePhase('thermophilic')}
            onMouseEnter={() => setActivePhase('thermophilic')}
            onMouseLeave={() => setActivePhase(null)}
          >
            <rect x="10" y="200" width="160" height="50" fill="#654321" rx="3"/>
            {/* Heat waves */}
            {animated && (
              <>
                <motion.path
                  d="M50,195 Q55,185 60,195"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2"
                  animate={{ y: [-5, -15], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.path
                  d="M90,195 Q95,185 100,195"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2"
                  animate={{ y: [-5, -15], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.path
                  d="M130,195 Q135,185 140,195"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2"
                  animate={{ y: [-5, -15], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
              </>
            )}
            <text x="90" y="230" textAnchor="middle" fontSize="10" fill="#FDE68A">Hot Zone 🔥</text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActivePhase('cooling')}
            onMouseEnter={() => setActivePhase('cooling')}
            onMouseLeave={() => setActivePhase(null)}
          >
            <rect x="10" y="140" width="160" height="60" fill="#8B6914" rx="3"/>
            <text x="90" y="175" textAnchor="middle" fontSize="10" fill="#FDE68A">Cooling Zone</text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActivePhase('curing')}
            onMouseEnter={() => setActivePhase('curing')}
            onMouseLeave={() => setActivePhase(null)}
          >
            <rect x="10" y="70" width="160" height="70" fill="#2D1F0E" rx="3"/>
            <text x="90" y="110" textAnchor="middle" fontSize="10" fill="#FDE68A">Finished Compost</text>
          </g>

          {/* Temperature gauge */}
          <g transform="translate(190, 100)">
            <rect x="0" y="0" width="30" height="150" rx="5" fill="white" stroke="#374151" strokeWidth="2"/>
            <motion.rect
              x="5"
              y="100"
              width="20"
              height="45"
              rx="3"
              fill="url(#heatGradient)"
              animate={animated ? { height: [30, 50, 45, 55, 45] } : { height: 45 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <text x="15" y="165" textAnchor="middle" fontSize="8" fill="#374151">°C</text>
            <text x="15" y="-5" textAnchor="middle" fontSize="8" fill="#374151">65°</text>
            <text x="15" y="80" textAnchor="middle" fontSize="8" fill="#374151">40°</text>
          </g>
        </g>

        {/* Arrow to output */}
        <motion.path
          d="M430,280 Q470,280 500,280"
          fill="none"
          stroke="#166534"
          strokeWidth="4"
          markerEnd="url(#arrowGreen)"
          animate={animated ? { strokeDashoffset: [20, 0] } : {}}
          strokeDasharray="10,5"
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* OUTPUT - Garden */}
        <g transform="translate(510, 120)">
          {/* Garden bed */}
          <rect x="0" y="200" width="350" height="80" rx="5" fill="#5D4037"/>
          <rect x="10" y="180" width="330" height="25" fill="#2D1F0E" rx="3"/>

          {/* Plants growing */}
          {[40, 100, 160, 220, 280].map((x, i) => (
            <motion.g
              key={i}
              transform={`translate(${x}, 120)`}
              animate={animated ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {/* Stem */}
              <rect x="8" y="30" width="4" height="50" fill="#22C55E"/>
              {/* Leaves */}
              <ellipse cx="0" cy="40" rx="12" ry="6" fill="#4ADE80" transform="rotate(-30, 0, 40)"/>
              <ellipse cx="20" cy="45" rx="12" ry="6" fill="#4ADE80" transform="rotate(30, 20, 45)"/>
              <ellipse cx="0" cy="25" rx="10" ry="5" fill="#22C55E" transform="rotate(-40, 0, 25)"/>
              <ellipse cx="20" cy="30" rx="10" ry="5" fill="#22C55E" transform="rotate(40, 20, 30)"/>
              {/* Flower/fruit */}
              {i % 2 === 0 ? (
                <circle cx="10" cy="15" r="10" fill="#EF4444"/>
              ) : (
                <circle cx="10" cy="10" r="8" fill="#FBBF24"/>
              )}
            </motion.g>
          ))}

          {/* Label */}
          <text x="175" y="310" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
            Healthy Garden!
          </text>

          {/* Benefits */}
          <g transform="translate(0, 330)">
            <rect x="0" y="0" width="350" height="80" rx="10" fill="#ECFDF5" stroke="#86EFAC" strokeWidth="2"/>
            <text x="175" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">Benefits of Compost:</text>
            <text x="175" y="45" textAnchor="middle" fontSize="10" fill="#374151">• Enriches soil with nutrients</text>
            <text x="175" y="60" textAnchor="middle" fontSize="10" fill="#374151">• Retains moisture • Reduces waste</text>
            <text x="175" y="75" textAnchor="middle" fontSize="10" fill="#374151">• Sequesters carbon • Supports biodiversity</text>
          </g>
        </g>

        {/* Process Timeline */}
        <g transform="translate(220, 430)">
          <text x="90" y="0" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">Timeline: 2-6 months</text>
          <rect x="0" y="10" width="180" height="8" rx="4" fill="#E5E7EB"/>
          <motion.rect
            x="0"
            y="10"
            width="0"
            height="8"
            rx="4"
            fill="#22C55E"
            animate={animated ? { width: [0, 180] } : { width: 180 }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#16A34A"/>
          </marker>
        </defs>
      </svg>

      {/* Phase Info Panel */}
      {activePhase && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{phases.find(p => p.id === activePhase)?.icon}</span>
            <div>
              <h4 className="font-bold text-green-800 text-lg">
                {phases.find(p => p.id === activePhase)?.name}
              </h4>
              <p className="text-green-700">
                {phases.find(p => p.id === activePhase)?.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Phase Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
              activePhase === phase.id
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <span>{phase.icon}</span>
            {phase.name}
          </button>
        ))}
      </div>
    </div>
  )
}
