'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SoilLayersDiagramProps {
  level?: 'simple' | 'detailed' | 'advanced'
  animated?: boolean
  showLabels?: boolean
  className?: string
}

export function SoilLayersDiagram({
  level = 'simple',
  animated = true,
  showLabels = true,
  className = ''
}: SoilLayersDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)

  const layers = [
    {
      id: 'organic',
      name: 'O Horizon - Organic Layer',
      description: 'Decomposing leaves, twigs, and organic matter. Home to decomposers!',
      color: '#2D1F0E',
      y: 0,
      height: 40,
      organisms: ['leaf', 'mushroom', 'beetle']
    },
    {
      id: 'topsoil',
      name: 'A Horizon - Topsoil',
      description: 'Dark, nutrient-rich layer where most roots grow. Contains humus and microorganisms.',
      color: '#4A3728',
      y: 40,
      height: 80,
      organisms: ['worm', 'roots', 'bacteria']
    },
    {
      id: 'subsoil',
      name: 'B Horizon - Subsoil',
      description: 'Clay and minerals accumulate here. Less organic matter but holds nutrients.',
      color: '#8B6914',
      y: 120,
      height: 100,
      organisms: ['deeproots']
    },
    {
      id: 'parent',
      name: 'C Horizon - Parent Material',
      description: 'Broken rock and weathered material. The foundation of soil formation.',
      color: '#A0856C',
      y: 220,
      height: 80,
      organisms: []
    },
    {
      id: 'bedrock',
      name: 'R Horizon - Bedrock',
      description: 'Solid rock beneath all soil layers. Takes millions of years to break down.',
      color: '#6B6B6B',
      y: 300,
      height: 60,
      organisms: []
    }
  ]

  const wormVariants = {
    wiggle: {
      d: [
        "M50,70 Q60,65 70,70 Q80,75 90,70",
        "M50,72 Q60,68 70,72 Q80,76 90,72",
        "M50,70 Q60,65 70,70 Q80,75 90,70"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 700 500"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {/* Texture patterns */}
          <pattern id="organicPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#2D1F0E"/>
            <circle cx="5" cy="5" r="2" fill="#1A1308" opacity="0.5"/>
            <circle cx="15" cy="15" r="1.5" fill="#3D2912" opacity="0.5"/>
          </pattern>
          <pattern id="topsoilPattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="#4A3728"/>
            <circle cx="10" cy="10" r="3" fill="#3A2A1D" opacity="0.4"/>
            <circle cx="25" cy="20" r="2" fill="#5A4738" opacity="0.4"/>
          </pattern>
          <pattern id="subsoilPattern" width="25" height="25" patternUnits="userSpaceOnUse">
            <rect width="25" height="25" fill="#8B6914"/>
            <rect x="5" y="5" width="8" height="4" fill="#7A5A10" opacity="0.5" rx="1"/>
            <rect x="15" y="15" width="6" height="3" fill="#9B7924" opacity="0.5" rx="1"/>
          </pattern>
          <pattern id="parentPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#A0856C"/>
            <polygon points="5,5 15,5 12,15 8,15" fill="#8A7060" opacity="0.6"/>
            <polygon points="25,20 35,22 32,32 22,30" fill="#B09580" opacity="0.6"/>
          </pattern>
          <pattern id="bedrockPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="#6B6B6B"/>
            <line x1="0" y1="20" x2="50" y2="25" stroke="#5B5B5B" strokeWidth="2"/>
            <line x1="0" y1="40" x2="50" y2="35" stroke="#7B7B7B" strokeWidth="1"/>
          </pattern>

          {/* Root gradient */}
          <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B4513"/>
            <stop offset="100%" stopColor="#654321"/>
          </linearGradient>
        </defs>

        {/* Sky background */}
        <rect x="0" y="0" width="700" height="60" fill="#87CEEB"/>

        {/* Sun */}
        <motion.circle
          cx="600"
          cy="40"
          r="25"
          fill="#FFD700"
          animate={animated ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Ground surface with grass */}
        <rect x="0" y="50" width="700" height="10" fill="#228B22"/>
        {[...Array(35)].map((_, i) => (
          <motion.line
            key={i}
            x1={20 + i * 20}
            y1={60}
            x2={20 + i * 20 + (Math.random() - 0.5) * 10}
            y2={45 + Math.random() * 10}
            stroke="#32CD32"
            strokeWidth="2"
            animate={animated ? {
              x2: [20 + i * 20 - 3, 20 + i * 20 + 3, 20 + i * 20 - 3]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}

        {/* Tree */}
        <g transform="translate(500, 0)">
          <rect x="40" y="20" width="20" height="40" fill="#8B4513"/>
          <ellipse cx="50" cy="0" rx="40" ry="30" fill="#228B22"/>
          <ellipse cx="30" cy="10" rx="25" ry="20" fill="#2E8B2E"/>
          <ellipse cx="70" cy="10" rx="25" ry="20" fill="#2E8B2E"/>
        </g>

        {/* Soil Layers */}
        {layers.map((layer, index) => (
          <g
            key={layer.id}
            className="cursor-pointer"
            onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <motion.rect
              x="50"
              y={60 + layer.y}
              width="400"
              height={layer.height}
              fill={`url(#${layer.id === 'organic' ? 'organicPattern' :
                          layer.id === 'topsoil' ? 'topsoilPattern' :
                          layer.id === 'subsoil' ? 'subsoilPattern' :
                          layer.id === 'parent' ? 'parentPattern' : 'bedrockPattern'})`}
              stroke={activeLayer === layer.id ? '#FFD700' : 'none'}
              strokeWidth="3"
              animate={activeLayer === layer.id ? { x: 45 } : { x: 50 }}
              transition={{ duration: 0.2 }}
            />

            {/* Layer organisms and features */}
            {layer.id === 'organic' && (
              <g>
                {/* Fallen leaves */}
                <ellipse cx="100" cy="75" rx="15" ry="5" fill="#8B4513" transform="rotate(-15, 100, 75)"/>
                <ellipse cx="200" cy="80" rx="12" ry="4" fill="#CD853F" transform="rotate(10, 200, 80)"/>
                <ellipse cx="300" cy="78" rx="14" ry="5" fill="#A0522D" transform="rotate(-5, 300, 78)"/>
                {/* Mushrooms */}
                <g transform="translate(350, 65)">
                  <ellipse cx="0" cy="15" rx="10" ry="4" fill="#DEB887"/>
                  <rect x="-3" y="10" width="6" height="10" fill="#F5DEB3"/>
                  <ellipse cx="0" cy="10" rx="12" ry="6" fill="#CD853F"/>
                </g>
              </g>
            )}

            {layer.id === 'topsoil' && (
              <g>
                {/* Animated worm */}
                <motion.path
                  d="M120,110 Q140,105 160,110 Q180,115 200,110"
                  fill="none"
                  stroke="#E8B4B8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  animate={animated ? {
                    d: [
                      "M120,110 Q140,105 160,110 Q180,115 200,110",
                      "M125,112 Q145,108 165,112 Q185,117 205,112",
                      "M120,110 Q140,105 160,110 Q180,115 200,110"
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Another worm */}
                <motion.path
                  d="M280,130 Q295,125 310,130 Q325,135 340,130"
                  fill="none"
                  stroke="#E8B4B8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  animate={animated ? {
                    d: [
                      "M280,130 Q295,125 310,130 Q325,135 340,130",
                      "M282,132 Q297,127 312,132 Q327,137 342,132",
                      "M280,130 Q295,125 310,130 Q325,135 340,130"
                    ]
                  } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                />

                {/* Roots from tree */}
                <path
                  d="M520,60 Q500,80 480,100 Q460,120 440,140"
                  fill="none"
                  stroke="url(#rootGradient)"
                  strokeWidth="8"
                />
                <path
                  d="M540,60 Q560,80 580,110 Q590,130 580,150"
                  fill="none"
                  stroke="url(#rootGradient)"
                  strokeWidth="6"
                />

                {/* Small root branches */}
                <path d="M460,120 Q450,125 440,120" fill="none" stroke="#654321" strokeWidth="3"/>
                <path d="M480,110 Q470,115 475,125" fill="none" stroke="#654321" strokeWidth="2"/>

                {/* Bacteria dots */}
                {[...Array(15)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={80 + Math.random() * 350}
                    cy={110 + Math.random() * 50}
                    r="2"
                    fill="#90EE90"
                    animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </g>
            )}

            {layer.id === 'subsoil' && (
              <g>
                {/* Deep roots */}
                <path
                  d="M440,180 Q420,220 430,260 Q440,290 420,310"
                  fill="none"
                  stroke="#654321"
                  strokeWidth="5"
                />
                <path d="M430,220 Q415,230 410,220" fill="none" stroke="#654321" strokeWidth="2"/>
                <path d="M435,260 Q420,270 415,260" fill="none" stroke="#654321" strokeWidth="2"/>

                {/* Clay particles */}
                {[...Array(8)].map((_, i) => (
                  <rect
                    key={i}
                    x={80 + i * 40 + Math.random() * 20}
                    y={190 + Math.random() * 60}
                    width="15"
                    height="8"
                    rx="2"
                    fill="#B8860B"
                    opacity="0.6"
                  />
                ))}
              </g>
            )}

            {layer.id === 'parent' && (
              <g>
                {/* Rock fragments */}
                <polygon points="100,300 130,290 140,310 110,320" fill="#9A8070"/>
                <polygon points="200,295 240,300 235,325 195,315" fill="#A89080"/>
                <polygon points="320,305 350,295 360,320 330,330" fill="#8A7060"/>
              </g>
            )}
          </g>
        ))}

        {/* Depth scale on the right */}
        <g transform="translate(470, 60)">
          <line x1="0" y1="0" x2="0" y2="300" stroke="#374151" strokeWidth="2"/>
          {[0, 50, 100, 150, 200, 250, 300].map((y, i) => (
            <g key={i}>
              <line x1="-5" y1={y} x2="5" y2={y} stroke="#374151" strokeWidth="2"/>
              <text x="15" y={y + 4} fontSize="10" fill="#374151">{y === 0 ? '0' : `${y}cm`}</text>
            </g>
          ))}
        </g>

        {/* Labels panel on right */}
        <g transform="translate(520, 60)">
          {layers.map((layer, index) => (
            <g
              key={layer.id}
              transform={`translate(0, ${layer.y + layer.height/2 - 15})`}
              className="cursor-pointer"
              onClick={() => setActiveLayer(layer.id)}
            >
              <rect
                x="0"
                y="0"
                width="160"
                height="30"
                rx="5"
                fill={activeLayer === layer.id ? layer.color : 'white'}
                stroke={layer.color}
                strokeWidth="2"
              />
              <text
                x="80"
                y="20"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill={activeLayer === layer.id ? 'white' : layer.color}
              >
                {layer.name.split(' - ')[0]}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Layer Info Panel */}
      {activeLayer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl"
        >
          <h4 className="font-bold text-amber-800 text-lg">
            {layers.find(l => l.id === activeLayer)?.name}
          </h4>
          <p className="text-amber-700 mt-1">
            {layers.find(l => l.id === activeLayer)?.description}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: activeLayer === layer.id ? layer.color : '#FEF3C7',
              color: activeLayer === layer.id ? 'white' : layer.color
            }}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: layer.color }}
            />
            {layer.name.split(' - ')[0]}
          </button>
        ))}
      </div>
    </div>
  )
}
