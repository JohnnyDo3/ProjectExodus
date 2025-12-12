'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PhotosynthesisDiagramProps {
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function PhotosynthesisDiagram({
  animated = true,
  showLabels = true,
  className = ''
}: PhotosynthesisDiagramProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  const steps = [
    { id: 'sunlight', label: 'Sunlight', description: 'Energy from the sun powers the whole process' },
    { id: 'water', label: 'Water (H₂O)', description: 'Absorbed through roots from the soil' },
    { id: 'co2', label: 'Carbon Dioxide (CO₂)', description: 'Taken in through tiny holes in leaves (stomata)' },
    { id: 'chlorophyll', label: 'Chlorophyll', description: 'Green pigment that captures light energy' },
    { id: 'glucose', label: 'Glucose (C₆H₁₂O₆)', description: 'Sugar made as food for the plant' },
    { id: 'oxygen', label: 'Oxygen (O₂)', description: 'Released into the air - what we breathe!' },
  ]

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        <defs>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E"/>
            <stop offset="100%" stopColor="#16A34A"/>
          </linearGradient>
          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534"/>
            <stop offset="100%" stopColor="#15803D"/>
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="800" height="500" fill="#F0FDF4"/>

        {/* Sun */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('sunlight')}
          onMouseEnter={() => setActiveStep('sunlight')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.circle
            cx="650"
            cy="80"
            r="50"
            fill="#FCD34D"
            animate={animated ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1={650 + Math.cos(i * 30 * Math.PI / 180) * 55}
              y1={80 + Math.sin(i * 30 * Math.PI / 180) * 55}
              x2={650 + Math.cos(i * 30 * Math.PI / 180) * 75}
              y2={80 + Math.sin(i * 30 * Math.PI / 180) * 75}
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          {showLabels && (
            <text x="650" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#B45309">
              SUNLIGHT
            </text>
          )}
        </g>

        {/* Light rays to leaf */}
        <motion.path
          d="M600,100 L400,180"
          stroke="#FCD34D"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
          animate={animated ? { opacity: [0.3, 0.7, 0.3] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main Leaf */}
        <g transform="translate(200, 120)">
          {/* Leaf shape */}
          <motion.ellipse
            cx="150"
            cy="100"
            rx="150"
            ry="80"
            fill="url(#leafGradient)"
            stroke="#166534"
            strokeWidth="3"
            animate={animated ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Leaf veins */}
          <path d="M0,100 L300,100" stroke="#166534" strokeWidth="3"/>
          <path d="M75,100 L50,60" stroke="#166534" strokeWidth="2"/>
          <path d="M75,100 L50,140" stroke="#166534" strokeWidth="2"/>
          <path d="M150,100 L130,50" stroke="#166534" strokeWidth="2"/>
          <path d="M150,100 L130,150" stroke="#166534" strokeWidth="2"/>
          <path d="M225,100 L250,60" stroke="#166534" strokeWidth="2"/>
          <path d="M225,100 L250,140" stroke="#166534" strokeWidth="2"/>

          {/* Chloroplasts (simplified) */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveStep('chlorophyll')}
            onMouseEnter={() => setActiveStep('chlorophyll')}
            onMouseLeave={() => setActiveStep(null)}
          >
            {[80, 150, 220].map((x, i) => (
              <motion.ellipse
                key={i}
                cx={x}
                cy={100}
                rx="20"
                ry="12"
                fill="#15803D"
                opacity="0.7"
                animate={animated ? { opacity: [0.5, 0.8, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </g>

          {showLabels && (
            <text x="150" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
              LEAF (with Chlorophyll)
            </text>
          )}
        </g>

        {/* Stem */}
        <rect x="345" y="300" width="20" height="150" fill="url(#stemGradient)"/>

        {/* Roots */}
        <g transform="translate(355, 450)">
          <path d="M0,0 Q-30,30 -40,60" stroke="#8B4513" strokeWidth="6" fill="none"/>
          <path d="M0,0 Q-10,40 -20,80" stroke="#8B4513" strokeWidth="5" fill="none"/>
          <path d="M0,0 Q10,40 20,80" stroke="#8B4513" strokeWidth="5" fill="none"/>
          <path d="M0,0 Q30,30 40,60" stroke="#8B4513" strokeWidth="6" fill="none"/>
        </g>

        {/* Water input */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('water')}
          onMouseEnter={() => setActiveStep('water')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.path
            d="M250,480 Q300,430 355,380"
            stroke="#3B82F6"
            strokeWidth="4"
            strokeDasharray="10,5"
            fill="none"
            markerEnd="url(#arrowBlue)"
            animate={animated ? { strokeDashoffset: [0, -30] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="220" y="490" fontSize="12" fontWeight="bold" fill="#2563EB">H₂O (Water)</text>
          <text x="220" y="505" fontSize="10" fill="#3B82F6">from roots</text>
        </g>

        {/* CO2 input */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('co2')}
          onMouseEnter={() => setActiveStep('co2')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.path
            d="M100,220 L200,200"
            stroke="#6B7280"
            strokeWidth="4"
            strokeDasharray="10,5"
            fill="none"
            markerEnd="url(#arrowGray)"
            animate={animated ? { strokeDashoffset: [0, -30] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="50" y="220" fontSize="12" fontWeight="bold" fill="#4B5563">CO₂</text>
          <text x="50" y="235" fontSize="10" fill="#6B7280">from air</text>
        </g>

        {/* Oxygen output */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('oxygen')}
          onMouseEnter={() => setActiveStep('oxygen')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.path
            d="M500,180 L580,140"
            stroke="#22C55E"
            strokeWidth="4"
            strokeDasharray="10,5"
            fill="none"
            markerEnd="url(#arrowGreen)"
            animate={animated ? { strokeDashoffset: [30, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="590" y="140" fontSize="12" fontWeight="bold" fill="#16A34A">O₂</text>
          <text x="590" y="155" fontSize="10" fill="#22C55E">released!</text>
        </g>

        {/* Glucose output */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('glucose')}
          onMouseEnter={() => setActiveStep('glucose')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.path
            d="M400,270 L450,320"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeDasharray="10,5"
            fill="none"
            markerEnd="url(#arrowYellow)"
            animate={animated ? { strokeDashoffset: [30, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="460" y="340" fontSize="12" fontWeight="bold" fill="#D97706">Glucose</text>
          <text x="460" y="355" fontSize="10" fill="#F59E0B">(plant food)</text>
        </g>

        {/* Equation box */}
        <g transform="translate(50, 350)">
          <rect x="0" y="0" width="280" height="80" rx="10" fill="white" stroke="#22C55E" strokeWidth="2"/>
          <text x="140" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
            Photosynthesis Equation
          </text>
          <text x="140" y="50" textAnchor="middle" fontSize="11" fill="#374151">
            6CO₂ + 6H₂O + Light →
          </text>
          <text x="140" y="70" textAnchor="middle" fontSize="11" fill="#374151">
            C₆H₁₂O₆ + 6O₂
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6"/>
          </marker>
          <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280"/>
          </marker>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22C55E"/>
          </marker>
          <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B"/>
          </marker>
        </defs>
      </svg>

      {/* Step Info */}
      {activeStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
        >
          <p className="font-bold text-green-700">{steps.find(s => s.id === activeStep)?.label}</p>
          <p className="text-green-600 text-sm">{steps.find(s => s.id === activeStep)?.description}</p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeStep === step.id
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  )
}
