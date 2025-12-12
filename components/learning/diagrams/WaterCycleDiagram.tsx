'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WaterCycleDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function WaterCycleDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: WaterCycleDiagramProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  const steps = [
    { id: 'evaporation', label: 'Evaporation', description: 'Sun heats water, turning it into vapor' },
    { id: 'condensation', label: 'Condensation', description: 'Water vapor cools and forms clouds' },
    { id: 'precipitation', label: 'Precipitation', description: 'Water falls as rain, snow, or hail' },
    { id: 'collection', label: 'Collection', description: 'Water gathers in rivers, lakes, and oceans' },
    { id: 'infiltration', label: 'Infiltration', description: 'Water soaks into the ground' },
  ]

  // Animation variants for water droplets
  const dropletVariants = {
    fall: {
      y: [0, 100],
      opacity: [1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeIn" as const
      }
    }
  }

  const vaporVariants = {
    rise: {
      y: [0, -80],
      opacity: [0.8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  const sunRayVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const cloudVariants = {
    float: {
      x: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F4FF" />
          </linearGradient>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A90D9" />
            <stop offset="100%" stopColor="#2C5F8D" />
          </linearGradient>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="100%" stopColor="#654321" />
          </linearGradient>
          <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#FF9933" />
          </radialGradient>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B8E6B" />
            <stop offset="100%" stopColor="#4A6B4A" />
          </linearGradient>

          {/* Cloud filter for soft edges */}
          <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Background Sky */}
        <rect x="0" y="0" width="800" height="350" fill="url(#skyGradient)" />

        {/* Sun */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('evaporation')}
          onMouseEnter={() => setActiveStep('evaporation')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <motion.circle
            cx="680"
            cy="80"
            r="50"
            fill="#FFD700"
            variants={animated ? sunRayVariants : {}}
            animate={animated ? "pulse" : undefined}
          />
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.line
              key={i}
              x1={680 + Math.cos(angle * Math.PI / 180) * 55}
              y1={80 + Math.sin(angle * Math.PI / 180) * 55}
              x2={680 + Math.cos(angle * Math.PI / 180) * 70}
              y2={80 + Math.sin(angle * Math.PI / 180) * 70}
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
              variants={animated ? sunRayVariants : {}}
              animate={animated ? "pulse" : undefined}
            />
          ))}
        </g>

        {/* Mountains */}
        <polygon points="500,350 600,200 700,350" fill="url(#mountainGradient)" />
        <polygon points="580,350 650,250 720,350" fill="#5A7A5A" />

        {/* Snow cap */}
        <polygon points="600,200 580,240 620,240" fill="white" />

        {/* Ground */}
        <rect x="0" y="350" width="500" height="150" fill="url(#groundGradient)" />

        {/* Ocean */}
        <ellipse cx="250" cy="420" rx="200" ry="60" fill="url(#oceanGradient)" />

        {/* Ocean waves */}
        <motion.path
          d="M80,410 Q120,400 160,410 Q200,420 240,410 Q280,400 320,410 Q360,420 400,410"
          fill="none"
          stroke="#6BA3D6"
          strokeWidth="3"
          animate={animated ? { d: [
            "M80,410 Q120,400 160,410 Q200,420 240,410 Q280,400 320,410 Q360,420 400,410",
            "M80,410 Q120,420 160,410 Q200,400 240,410 Q280,420 320,410 Q360,400 400,410"
          ]} : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Evaporation arrows */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('evaporation')}
          onMouseEnter={() => setActiveStep('evaporation')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {[180, 220, 260, 300].map((x, i) => (
            <motion.g key={i}>
              {/* Vapor bubbles */}
              <motion.circle
                cx={x}
                cy={380}
                r="6"
                fill="#87CEEB"
                opacity="0.6"
                variants={animated ? vaporVariants : {}}
                animate={animated ? "rise" : undefined}
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <motion.circle
                cx={x + 10}
                cy={390}
                r="4"
                fill="#87CEEB"
                opacity="0.5"
                variants={animated ? vaporVariants : {}}
                animate={animated ? "rise" : undefined}
                style={{ animationDelay: `${i * 0.5 + 0.3}s` }}
              />
            </motion.g>
          ))}

          {/* Evaporation arrow */}
          <path
            d="M250,360 Q300,280 350,200"
            fill="none"
            stroke="#87CEEB"
            strokeWidth="4"
            strokeDasharray="10,5"
            markerEnd="url(#arrowhead)"
          />
        </g>

        {/* Clouds */}
        <motion.g
          filter="url(#cloudShadow)"
          variants={animated ? cloudVariants : {}}
          animate={animated ? "float" : undefined}
          className="cursor-pointer"
          onClick={() => setActiveStep('condensation')}
          onMouseEnter={() => setActiveStep('condensation')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {/* Main cloud */}
          <ellipse cx="200" cy="100" rx="60" ry="35" fill="white" />
          <ellipse cx="250" cy="90" rx="50" ry="30" fill="white" />
          <ellipse cx="280" cy="110" rx="45" ry="25" fill="white" />
          <ellipse cx="160" cy="110" rx="40" ry="25" fill="white" />

          {/* Cloud shadow */}
          <ellipse cx="220" cy="115" rx="80" ry="20" fill="#E8E8E8" opacity="0.5" />
        </motion.g>

        {/* Second cloud */}
        <motion.g
          filter="url(#cloudShadow)"
          variants={animated ? cloudVariants : {}}
          animate={animated ? "float" : undefined}
          style={{ animationDelay: '1s' }}
        >
          <ellipse cx="450" cy="120" rx="50" ry="30" fill="white" />
          <ellipse cx="490" cy="110" rx="40" ry="25" fill="white" />
          <ellipse cx="420" cy="130" rx="35" ry="20" fill="white" />
        </motion.g>

        {/* Rain drops (Precipitation) */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('precipitation')}
          onMouseEnter={() => setActiveStep('precipitation')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {[180, 200, 220, 240, 260].map((x, i) => (
            <motion.ellipse
              key={i}
              cx={x}
              cy={150}
              rx="3"
              ry="8"
              fill="#4A90D9"
              variants={animated ? dropletVariants : {}}
              animate={animated ? "fall" : undefined}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>

        {/* River flowing to ocean */}
        <motion.path
          d="M650,350 Q600,380 550,370 Q500,360 450,380 Q400,400 350,390"
          fill="none"
          stroke="#4A90D9"
          strokeWidth="12"
          strokeLinecap="round"
          animate={animated ? {
            strokeDashoffset: [0, -20]
          } : {}}
          strokeDasharray="15,5"
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Underground water (Infiltration) */}
        <g
          className="cursor-pointer"
          onClick={() => setActiveStep('infiltration')}
          onMouseEnter={() => setActiveStep('infiltration')}
          onMouseLeave={() => setActiveStep(null)}
        >
          {/* Soil layers */}
          <rect x="500" y="380" width="300" height="30" fill="#9B8062" opacity="0.8" />
          <rect x="500" y="410" width="300" height="40" fill="#7A6548" opacity="0.8" />
          <rect x="500" y="450" width="300" height="50" fill="#5A4A38" opacity="0.8" />

          {/* Underground water arrows */}
          <motion.path
            d="M600,360 L600,450"
            stroke="#4A90D9"
            strokeWidth="3"
            strokeDasharray="8,4"
            animate={animated ? { strokeDashoffset: [0, -24] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M650,360 L650,440"
            stroke="#4A90D9"
            strokeWidth="3"
            strokeDasharray="8,4"
            animate={animated ? { strokeDashoffset: [0, -24] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
          />
        </g>

        {/* Trees */}
        <g>
          <rect x="520" y="320" width="10" height="30" fill="#8B4513" />
          <polygon points="525,280 500,320 550,320" fill="#228B22" />
          <polygon points="525,300 505,330 545,330" fill="#228B22" />
        </g>
        <g>
          <rect x="580" y="310" width="12" height="40" fill="#8B4513" />
          <polygon points="586,260 555,310 617,310" fill="#2E8B2E" />
          <polygon points="586,285 560,325 612,325" fill="#2E8B2E" />
        </g>

        {/* Labels */}
        {showLabels && (
          <g className="text-xs font-bold">
            <text x="680" y="150" textAnchor="middle" fill="#FF8C00" fontSize="14">SUN</text>
            <text x="220" y="60" textAnchor="middle" fill="#4A90D9" fontSize="14">CLOUDS</text>
            <text x="320" y="240" textAnchor="middle" fill="#4A90D9" fontSize="12">Evaporation</text>
            <text x="180" y="180" textAnchor="middle" fill="#4A90D9" fontSize="12">Precipitation</text>
            <text x="250" y="460" textAnchor="middle" fill="#2C5F8D" fontSize="14">OCEAN</text>
            <text x="650" y="480" textAnchor="middle" fill="#5A4A38" fontSize="12">Groundwater</text>
            <text x="500" y="395" textAnchor="middle" fill="#4A90D9" fontSize="12">Collection</text>
          </g>
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#87CEEB" />
          </marker>
        </defs>
      </svg>

      {/* Interactive Step Info */}
      {activeStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-xl shadow-lg border border-blue-200"
        >
          <p className="font-bold text-blue-700">
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
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  )
}
