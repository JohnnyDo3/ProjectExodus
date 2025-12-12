'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SolarEnergyDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function SolarEnergyDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: SolarEnergyDiagramProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  const steps = [
    { id: 'sunlight', label: 'Sunlight', description: 'Photons from the sun carry energy to Earth' },
    { id: 'absorption', label: 'Absorption', description: 'Solar panels absorb light energy' },
    { id: 'conversion', label: 'Conversion', description: 'Photovoltaic cells convert light to electricity' },
    { id: 'inverter', label: 'Inverter', description: 'DC electricity is converted to AC power' },
    { id: 'usage', label: 'Usage', description: 'Clean electricity powers your home' },
  ]

  const photonVariants = {
    flow: {
      x: [0, 200],
      y: [0, 150],
      opacity: [1, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "linear" as const
      }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const electricityVariants = {
    flow: {
      pathLength: [0, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  }

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 800 450"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="solarSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="100%" stopColor="#87CEEB" />
          </linearGradient>
          <linearGradient id="panelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a365d" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="cellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="800" height="450" fill="url(#solarSkyGradient)" />

        {/* Sun */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('sunlight')}
          onMouseEnter={() => setActiveStep('sunlight')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.circle
            cx="100"
            cy="80"
            r="60"
            fill="#FFD700"
            filter="url(#glow)"
            variants={animated ? pulseVariants : {}}
            animate={animated ? "pulse" : undefined}
          />
          {/* Sun rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <motion.line
              key={i}
              x1={100 + Math.cos(angle * Math.PI / 180) * 65}
              y1={80 + Math.sin(angle * Math.PI / 180) * 65}
              x2={100 + Math.cos(angle * Math.PI / 180) * 85}
              y2={80 + Math.sin(angle * Math.PI / 180) * 85}
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0.5 }}
              animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </g>

        {/* Photon rays traveling to panel */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('absorption')}
          onMouseEnter={() => setActiveStep('absorption')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              cx={150}
              cy={120}
              r="8"
              fill="#FFE066"
              filter="url(#glow)"
              variants={animated ? photonVariants : {}}
              animate={animated ? "flow" : undefined}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          {/* Light beam */}
          <motion.path
            d="M160,130 L350,270"
            stroke="#FFE066"
            strokeWidth="40"
            strokeLinecap="round"
            opacity="0.3"
            animate={animated ? { opacity: [0.2, 0.4, 0.2] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>

        {/* Solar Panel */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('conversion')}
          onMouseEnter={() => setActiveStep('conversion')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {/* Panel frame */}
          <rect x="300" y="250" width="200" height="120" rx="5" fill="#374151" />
          <rect x="305" y="255" width="190" height="110" rx="3" fill="url(#panelGradient)" />

          {/* Solar cells grid */}
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
              <motion.rect
                key={`${row}-${col}`}
                x={310 + col * 23}
                y={260 + row * 17}
                width="20"
                height="14"
                rx="1"
                fill="url(#cellGradient)"
                stroke="#1e3a5f"
                strokeWidth="0.5"
                animate={animated ? {
                  fill: ['#3b82f6', '#60a5fa', '#3b82f6']
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (row + col) * 0.1
                }}
              />
            ))
          )}

          {/* Panel mounting */}
          <rect x="380" y="370" width="40" height="60" fill="#6B7280" />
          <rect x="370" y="365" width="60" height="10" fill="#4B5563" rx="2" />
        </g>

        {/* Electricity flow lines */}
        <g>
          {/* DC line from panel */}
          <motion.path
            d="M400,375 L400,400 L500,400"
            fill="none"
            stroke="#EAB308"
            strokeWidth="4"
            strokeDasharray="10,5"
            animate={animated ? { strokeDashoffset: [0, -30] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Inverter Box */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('inverter')}
          onMouseEnter={() => setActiveStep('inverter')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="500" y="370" width="80" height="60" rx="5" fill="#374151" />
          <rect x="505" y="375" width="70" height="50" rx="3" fill="#1F2937" />

          {/* Inverter display */}
          <rect x="515" y="385" width="50" height="20" rx="2" fill="#10B981" opacity="0.8" />
          <motion.text
            x="540"
            y="400"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontFamily="monospace"
            animate={animated ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            AC 120V
          </motion.text>

          {/* LED indicators */}
          <motion.circle
            cx="525"
            cy="415"
            r="4"
            fill="#22C55E"
            animate={animated ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <circle cx="540" cy="415" r="4" fill="#3B82F6" />
          <circle cx="555" cy="415" r="4" fill="#EAB308" />

          {/* DC/AC labels */}
          <text x="490" y="405" fill="#EAB308" fontSize="10" fontWeight="bold">DC</text>
          <text x="585" y="405" fill="#22C55E" fontSize="10" fontWeight="bold">AC</text>
        </g>

        {/* AC line to house */}
        <motion.path
          d="M580,400 L650,400 L650,350"
          fill="none"
          stroke="#22C55E"
          strokeWidth="4"
          strokeDasharray="10,5"
          animate={animated ? { strokeDashoffset: [0, -30] } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* House */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('usage')}
          onMouseEnter={() => setActiveStep('usage')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {/* House body */}
          <rect x="620" y="280" width="120" height="70" fill="#8B4513" />
          {/* Roof */}
          <polygon points="600,280 680,220 760,280" fill="#654321" />
          {/* Door */}
          <rect x="665" y="310" width="25" height="40" fill="#4A3728" />
          <circle cx="685" cy="332" r="3" fill="#FFD700" />
          {/* Windows */}
          <rect x="630" y="295" width="25" height="25" fill="#87CEEB" />
          <line x1="642.5" y1="295" x2="642.5" y2="320" stroke="#654321" strokeWidth="2" />
          <line x1="630" y1="307.5" x2="655" y2="307.5" stroke="#654321" strokeWidth="2" />

          <rect x="700" y="295" width="25" height="25" fill="#87CEEB" />
          <line x1="712.5" y1="295" x2="712.5" y2="320" stroke="#654321" strokeWidth="2" />
          <line x1="700" y1="307.5" x2="725" y2="307.5" stroke="#654321" strokeWidth="2" />

          {/* Light glow from window */}
          <motion.rect
            x="630"
            y="295"
            width="25"
            height="25"
            fill="#FFE066"
            opacity="0.3"
            animate={animated ? { opacity: [0.2, 0.5, 0.2] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>

        {/* Ground */}
        <rect x="0" y="430" width="800" height="20" fill="#228B22" />

        {/* Labels */}
        {showLabels && (
          <g className="font-bold" fill="#1F2937">
            <text x="100" y="170" textAnchor="middle" fontSize="14" fill="#B45309">SUNLIGHT</text>
            <text x="400" y="240" textAnchor="middle" fontSize="14" fill="#1E40AF">SOLAR PANEL</text>
            <text x="540" y="360" textAnchor="middle" fontSize="12" fill="#374151">INVERTER</text>
            <text x="680" y="210" textAnchor="middle" fontSize="14" fill="#7C2D12">HOME</text>

            {/* Energy flow labels */}
            <text x="450" y="420" textAnchor="middle" fontSize="10" fill="#EAB308">DC Power</text>
            <text x="615" y="420" textAnchor="middle" fontSize="10" fill="#22C55E">AC Power</text>
          </g>
        )}

        {/* Efficiency indicator */}
        <g transform="translate(50, 350)">
          <rect x="0" y="0" width="120" height="60" rx="8" fill="white" opacity="0.9" />
          <text x="60" y="20" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">Efficiency</text>
          <motion.rect
            x="10"
            y="30"
            width="0"
            height="15"
            rx="3"
            fill="#22C55E"
            animate={animated ? { width: [0, 80] } : { width: 80 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <rect x="10" y="30" width="100" height="15" rx="3" fill="none" stroke="#D1D5DB" strokeWidth="2" />
          <text x="60" y="58" textAnchor="middle" fontSize="10" fill="#374151">~20% of sunlight</text>
        </g>
      </svg>

      {/* Interactive Step Info */}
      {activeStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-xl shadow-lg border border-yellow-200"
        >
          <p className="font-bold text-yellow-700">
            {steps.find(s => s.id === activeStep)?.label}
          </p>
          <p className="text-sm text-gray-600">
            {steps.find(s => s.id === activeStep)?.description}
          </p>
        </motion.div>
      )}

      {/* Step Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeStep === step.id
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  )
}
