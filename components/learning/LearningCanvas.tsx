'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft, Play, ChevronLeft, ChevronRight, X, MessageSquare,
  Lightbulb, Sparkles, Pin, Paperclip, BookOpen, Pencil,
  Eye, EyeOff, Zap, Heart, Star, Coffee, Leaf, Sun, Moon,
  Quote, Clock, Trophy, Target, Search, GraduationCap, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { sanitizeHtml } from '@/lib/utils/sanitize'
import { LevelSelector } from '@/components/learn/levels/LevelSelector'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import { Module, CoreTopic } from '@/data/modules'
import { Founder } from '@/components/learning/FounderCard'
import { detectPioneersInContent, SUSTAINABILITY_PIONEERS } from '@/data/sustainabilityPioneers'
import { PioneerModal } from '@/components/learning/PioneerModal'
import { FlashcardStudy, FlashcardDeck, generateFlashcardsFromContent } from '@/components/learning/Flashcards'
import dynamic from 'next/dynamic'

// Dynamically import diagrams
const WaterCycleDiagram = dynamic(() => import('@/components/learning/diagrams/WaterCycleDiagram').then(mod => ({ default: mod.WaterCycleDiagram })), { ssr: false })
const SolarEnergyDiagram = dynamic(() => import('@/components/learning/diagrams/SolarEnergyDiagram').then(mod => ({ default: mod.SolarEnergyDiagram })), { ssr: false })
const SoilLayersDiagram = dynamic(() => import('@/components/learning/diagrams/SoilLayersDiagram').then(mod => ({ default: mod.SoilLayersDiagram })), { ssr: false })
const CompostingProcessDiagram = dynamic(() => import('@/components/learning/diagrams/CompostingProcessDiagram').then(mod => ({ default: mod.CompostingProcessDiagram })), { ssr: false })
const FoodWebDiagram = dynamic(() => import('@/components/learning/diagrams/FoodWebDiagram').then(mod => ({ default: mod.FoodWebDiagram })), { ssr: false })
const PassiveSolarDiagram = dynamic(() => import('@/components/learning/diagrams/PassiveSolarDiagram').then(mod => ({ default: mod.PassiveSolarDiagram })), { ssr: false })
const WasteHierarchyPyramid = dynamic(() => import('@/components/learning/diagrams/WasteHierarchyPyramid').then(mod => ({ default: mod.WasteHierarchyPyramid })), { ssr: false })
const PhotosynthesisDiagram = dynamic(() => import('@/components/learning/diagrams/PhotosynthesisDiagram').then(mod => ({ default: mod.PhotosynthesisDiagram })), { ssr: false })
const CarbonCycleDiagram = dynamic(() => import('@/components/learning/diagrams/CarbonCycleDiagram').then(mod => ({ default: mod.CarbonCycleDiagram })), { ssr: false })
const EnergyFlowDiagram = dynamic(() => import('@/components/learning/diagrams/EnergyFlowDiagram').then(mod => ({ default: mod.EnergyFlowDiagram })), { ssr: false })
const RainwaterHarvestingDiagram = dynamic(() => import('@/components/learning/diagrams/RainwaterHarvestingDiagram').then(mod => ({ default: mod.RainwaterHarvestingDiagram })), { ssr: false })
const ThermalMassDiagram = dynamic(() => import('@/components/learning/diagrams/ThermalMassDiagram').then(mod => ({ default: mod.ThermalMassDiagram })), { ssr: false })

const DIAGRAM_MAP: Record<string, React.ComponentType<{ animated?: boolean; showLabels?: boolean; className?: string }>> = {
  'water-cycle': WaterCycleDiagram,
  'solar-energy': SolarEnergyDiagram,
  'soil-layers': SoilLayersDiagram,
  'composting-process': CompostingProcessDiagram,
  'food-web': FoodWebDiagram,
  'passive-solar': PassiveSolarDiagram,
  'waste-hierarchy': WasteHierarchyPyramid,
  'photosynthesis': PhotosynthesisDiagram,
  'carbon-cycle': CarbonCycleDiagram,
  'energy-flow': EnergyFlowDiagram,
  'rainwater-harvesting': RainwaterHarvestingDiagram,
  'thermal-mass': ThermalMassDiagram,
}

// Sticky note colors - warm, inviting, hand-picked
const STICKY_COLORS = [
  'bg-yellow-100 border-yellow-300 shadow-yellow-200/50',
  'bg-orange-100 border-orange-300 shadow-orange-200/50',
  'bg-pink-100 border-pink-300 shadow-pink-200/50',
  'bg-blue-100 border-blue-300 shadow-blue-200/50',
  'bg-green-100 border-green-300 shadow-green-200/50',
  'bg-purple-100 border-purple-300 shadow-purple-200/50',
  'bg-teal-100 border-teal-300 shadow-teal-200/50',
]

// Paper textures and types
type NoteStyle = 'sticky' | 'index-card' | 'torn-paper' | 'notebook' | 'polaroid' | 'postcard'

// Content block types for the canvas
interface CanvasBlock {
  id: string
  type: 'text' | 'quote' | 'fact' | 'question' | 'diagram' | 'pioneer' | 'insight' | 'activity'
  content: string
  title?: string
  style: NoteStyle
  colorIndex: number
  rotation: number // degrees
  position: { x: number; y: number } // percentage
  size: 'small' | 'medium' | 'large'
  pioneer?: Founder
  diagramType?: string
  isRevealed: boolean
  connectedTo?: string[] // IDs of connected blocks
}

// Handwritten-style font class
const handwrittenClass = "font-['Caveat',_cursive] text-xl"

// Parse content into organic canvas blocks
function parseContentIntoBlocks(
  content: string,
  lessonId: string,
  lessonTitle: string
): CanvasBlock[] {
  const blocks: CanvasBlock[] = []
  let blockIndex = 0

  // Strip HTML to analyze content
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

  // Split into paragraphs/sections
  const paragraphs = content.split(/<\/p>|<br\s*\/?>|<\/li>/).filter(p => {
    const text = p.replace(/<[^>]*>/g, '').trim()
    return text.length > 20
  })

  // Detect pioneers
  const pioneers = detectPioneersInContent(content)

  // Generate pseudo-random but consistent positions based on content
  const generatePosition = (index: number, total: number) => {
    const seed = (lessonId.charCodeAt(0) + index * 7) % 100
    const row = Math.floor(index / 3)
    const col = index % 3

    return {
      x: 5 + (col * 30) + ((seed % 15) - 7),
      y: 5 + (row * 25) + ((seed % 10) - 5)
    }
  }

  const generateRotation = (index: number) => {
    const seed = (lessonId.charCodeAt(0) + index * 13) % 100
    return ((seed % 12) - 6) // -6 to +6 degrees
  }

  // Title block
  blocks.push({
    id: `${lessonId}-title`,
    type: 'text',
    title: lessonTitle,
    content: '',
    style: 'torn-paper',
    colorIndex: 0,
    rotation: generateRotation(0),
    position: { x: 35, y: 2 },
    size: 'large',
    isRevealed: true
  })
  blockIndex++

  // Process paragraphs into different block types
  paragraphs.forEach((para, idx) => {
    const cleanText = para.replace(/<[^>]*>/g, '').trim()
    if (cleanText.length < 30) return

    // Detect content type
    const isQuote = para.includes('<blockquote') || cleanText.startsWith('"') || cleanText.includes('said') || cleanText.includes('"')
    const isQuestion = cleanText.includes('?') && cleanText.length < 200
    const isFact = cleanText.toLowerCase().includes('percent') || cleanText.includes('%') || /\d+/.test(cleanText)
    const isInsight = cleanText.toLowerCase().includes('important') || cleanText.toLowerCase().includes('key') || cleanText.toLowerCase().includes('remember')

    let blockType: CanvasBlock['type'] = 'text'
    let style: NoteStyle = 'sticky'

    if (isQuote) {
      blockType = 'quote'
      style = 'postcard'
    } else if (isQuestion) {
      blockType = 'question'
      style = 'notebook'
    } else if (isFact) {
      blockType = 'fact'
      style = 'index-card'
    } else if (isInsight) {
      blockType = 'insight'
      style = 'torn-paper'
    }

    // Truncate long content for better visual presentation
    const displayContent = cleanText.length > 300
      ? cleanText.substring(0, 280) + '...'
      : cleanText

    blocks.push({
      id: `${lessonId}-block-${blockIndex}`,
      type: blockType,
      content: displayContent,
      style,
      colorIndex: blockIndex % STICKY_COLORS.length,
      rotation: generateRotation(blockIndex),
      position: generatePosition(blockIndex, paragraphs.length),
      size: cleanText.length > 200 ? 'large' : cleanText.length > 100 ? 'medium' : 'small',
      isRevealed: blockIndex < 3 // First 3 blocks start revealed
    })
    blockIndex++
  })

  // Add pioneer blocks
  pioneers.forEach((pioneer, idx) => {
    blocks.push({
      id: `${lessonId}-pioneer-${pioneer.id}`,
      type: 'pioneer',
      content: pioneer.shortBio,
      title: pioneer.name,
      style: 'polaroid',
      colorIndex: (blockIndex + idx) % STICKY_COLORS.length,
      rotation: generateRotation(blockIndex + idx),
      position: generatePosition(blocks.length + idx, blocks.length + pioneers.length),
      size: 'medium',
      pioneer,
      isRevealed: false
    })
  })

  // Detect and add diagram block
  const lowerContent = content.toLowerCase()
  let diagramType: string | undefined

  if (lowerContent.includes('water cycle') || (lowerContent.includes('evaporation') && lowerContent.includes('precipitation'))) {
    diagramType = 'water-cycle'
  } else if (lowerContent.includes('solar panel') || lowerContent.includes('photovoltaic')) {
    diagramType = 'solar-energy'
  } else if (lowerContent.includes('soil layer') || lowerContent.includes('topsoil')) {
    diagramType = 'soil-layers'
  } else if (lowerContent.includes('compost') || lowerContent.includes('decomposition')) {
    diagramType = 'composting-process'
  } else if (lowerContent.includes('food web') || lowerContent.includes('food chain')) {
    diagramType = 'food-web'
  } else if (lowerContent.includes('passive solar')) {
    diagramType = 'passive-solar'
  } else if (lowerContent.includes('waste hierarchy')) {
    diagramType = 'waste-hierarchy'
  } else if (lowerContent.includes('photosynthesis')) {
    diagramType = 'photosynthesis'
  } else if (lowerContent.includes('carbon cycle')) {
    diagramType = 'carbon-cycle'
  } else if (lowerContent.includes('rainwater harvest')) {
    diagramType = 'rainwater-harvesting'
  }

  if (diagramType) {
    blocks.push({
      id: `${lessonId}-diagram`,
      type: 'diagram',
      content: 'Interactive Diagram',
      style: 'torn-paper',
      colorIndex: 0,
      rotation: 0,
      position: { x: 55, y: 40 },
      size: 'large',
      diagramType,
      isRevealed: false
    })
  }

  return blocks
}

// Individual Note Component
function CanvasNote({
  block,
  onReveal,
  onPioneerClick,
  isInteractive = true
}: {
  block: CanvasBlock
  onReveal: (id: string) => void
  onPioneerClick?: (pioneer: Founder) => void
  isInteractive?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Get style classes based on note type
  const getStyleClasses = () => {
    const baseClasses = 'absolute transform transition-all duration-300 cursor-pointer'
    const colorClass = STICKY_COLORS[block.colorIndex] || STICKY_COLORS[0]

    const sizeClasses = {
      small: 'w-40 md:w-48',
      medium: 'w-52 md:w-64',
      large: 'w-64 md:w-80'
    }

    const styleSpecific = {
      'sticky': `rounded-sm shadow-lg border-l-4 ${colorClass}`,
      'index-card': 'bg-white rounded border-2 border-gray-300 shadow-md',
      'torn-paper': 'bg-amber-50 rounded-none shadow-lg border border-amber-200',
      'notebook': 'bg-white rounded border border-gray-200 shadow-md bg-[linear-gradient(transparent_31px,#e5e5e5_31px)] bg-[size:100%_32px]',
      'polaroid': 'bg-white rounded p-2 pb-8 shadow-xl border border-gray-100',
      'postcard': 'bg-gradient-to-br from-amber-50 to-orange-50 rounded shadow-lg border border-amber-300'
    }

    return `${baseClasses} ${sizeClasses[block.size]} ${styleSpecific[block.style]}`
  }

  const getTypeIcon = () => {
    switch (block.type) {
      case 'quote': return <Quote className="w-4 h-4 text-amber-600" />
      case 'fact': return <Zap className="w-4 h-4 text-blue-600" />
      case 'question': return <Lightbulb className="w-4 h-4 text-yellow-600" />
      case 'insight': return <Star className="w-4 h-4 text-purple-600" />
      case 'pioneer': return <Heart className="w-4 h-4 text-pink-600" />
      case 'diagram': return <Eye className="w-4 h-4 text-green-600" />
      default: return <Pencil className="w-4 h-4 text-gray-600" />
    }
  }

  // Handle click/reveal
  const handleClick = () => {
    if (!block.isRevealed && isInteractive) {
      onReveal(block.id)
      return
    }

    if (block.type === 'pioneer' && block.pioneer && onPioneerClick) {
      onPioneerClick(block.pioneer)
    } else if (block.type === 'diagram') {
      setIsExpanded(!isExpanded)
    }
  }

  // Unrevealed state - mysterious silhouette
  if (!block.isRevealed && isInteractive) {
    return (
      <motion.div
        className={`${getStyleClasses()} overflow-hidden`}
        style={{
          left: `${block.position.x}%`,
          top: `${block.position.y}%`,
          rotate: `${block.rotation}deg`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, zIndex: 50 }}
        onClick={handleClick}
      >
        <div className="relative p-4 bg-gray-200/80 backdrop-blur-sm min-h-[80px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)]" />
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <Search className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Click to discover</span>
          </motion.div>
        </div>
        {/* Pin decoration */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <Pin className="w-6 h-6 text-red-500 drop-shadow-md" />
        </div>
      </motion.div>
    )
  }

  // Diagram expanded view
  if (block.type === 'diagram' && isExpanded && block.diagramType) {
    const DiagramComponent = DIAGRAM_MAP[block.diagramType]

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsExpanded(false)}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Interactive Diagram</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {DiagramComponent && <DiagramComponent animated showLabels />}
        </motion.div>
      </motion.div>
    )
  }

  // Revealed content
  return (
    <>
      <motion.div
        className={getStyleClasses()}
        style={{
          left: `${block.position.x}%`,
          top: `${block.position.y}%`,
          rotate: `${block.rotation}deg`,
          zIndex: isHovered ? 40 : 10
        }}
        initial={{ opacity: 0, scale: 0, rotate: block.rotation - 180 }}
        animate={{ opacity: 1, scale: 1, rotate: block.rotation }}
        whileHover={{
          scale: 1.08,
          rotate: 0,
          zIndex: 50,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Pin/clip decoration */}
        {block.style === 'sticky' && (
          <div className="absolute -top-2 left-4">
            <Pin className="w-5 h-5 text-red-500 drop-shadow-sm transform rotate-12" />
          </div>
        )}
        {block.style === 'polaroid' && (
          <div className="absolute -top-1 -right-1">
            <Paperclip className="w-6 h-6 text-gray-400 transform rotate-45" />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Title for title block */}
          {block.type === 'text' && block.title && !block.content && (
            <h2 className={`${handwrittenClass} text-3xl font-bold text-gray-800 text-center`}>
              {block.title}
            </h2>
          )}

          {/* Type indicator */}
          {block.type !== 'text' && (
            <div className="flex items-center gap-2 mb-2">
              {getTypeIcon()}
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                {block.type === 'pioneer' ? 'Changemaker' : block.type}
              </span>
            </div>
          )}

          {/* Pioneer content */}
          {block.type === 'pioneer' && block.pioneer && (
            <div className="text-center">
              {block.pioneer.portrait && (
                <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-4 border-white shadow-inner">
                  <img
                    src={block.pioneer.portrait}
                    alt={block.pioneer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h4 className={`${handwrittenClass} text-lg font-bold text-gray-800`}>
                {block.pioneer.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{block.pioneer.title}</p>
              <p className="text-xs text-blue-600 mt-2 underline">Click to learn more</p>
            </div>
          )}

          {/* Diagram preview */}
          {block.type === 'diagram' && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Eye className="w-10 h-10 text-green-600" />
              <span className={`${handwrittenClass} text-gray-700`}>
                Click to explore diagram
              </span>
            </div>
          )}

          {/* Regular text content */}
          {block.content && block.type !== 'pioneer' && block.type !== 'diagram' && (
            <p className={`${block.style === 'notebook' ? handwrittenClass : 'text-sm'} text-gray-700 leading-relaxed`}>
              {block.type === 'quote' && '"'}
              {block.content}
              {block.type === 'quote' && '"'}
            </p>
          )}

          {/* Doodle decorations based on type */}
          {block.type === 'insight' && (
            <div className="absolute -bottom-1 -right-1 text-2xl">
              {['💡', '✨', '🌟'][block.colorIndex % 3]}
            </div>
          )}
          {block.type === 'fact' && (
            <div className="absolute bottom-1 right-2 text-xs text-blue-400">
              ═══
            </div>
          )}
        </div>

        {/* Tape decoration for torn paper */}
        {block.style === 'torn-paper' && (
          <>
            <div className="absolute -top-2 left-1/4 w-12 h-4 bg-amber-200/60 transform -rotate-6 rounded-sm" />
            <div className="absolute -top-2 right-1/4 w-10 h-4 bg-amber-200/60 transform rotate-3 rounded-sm" />
          </>
        )}
      </motion.div>
    </>
  )
}

// Connection strings between related notes
function ConnectionStrings({ blocks }: { blocks: CanvasBlock[] }) {
  // Simple connections - can be expanded
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {blocks.slice(0, -1).map((block, idx) => {
        if (!block.isRevealed) return null
        const nextBlock = blocks[idx + 1]
        if (!nextBlock?.isRevealed) return null

        return (
          <motion.line
            key={`${block.id}-${nextBlock.id}`}
            x1={`${block.position.x + 10}%`}
            y1={`${block.position.y + 5}%`}
            x2={`${nextBlock.position.x + 10}%`}
            y2={`${nextBlock.position.y + 5}%`}
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )
      })}
    </svg>
  )
}

// Progress tracker that looks like a to-do list
function ProgressTracker({
  totalBlocks,
  revealedCount,
  lessonTitle
}: {
  totalBlocks: number
  revealedCount: number
  lessonTitle: string
}) {
  const percentage = Math.round((revealedCount / totalBlocks) * 100)

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-4 border-2 border-gray-100 z-40"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-5 h-5 text-[var(--primary)]" />
        <span className={`${handwrittenClass} text-gray-800`}>Discovery Progress</span>
      </div>

      <div className="relative w-48 h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span>{revealedCount} / {totalBlocks} discoveries</span>
        <span className="font-bold text-[var(--primary)]">{percentage}%</span>
      </div>
    </motion.div>
  )
}

// Welcome overlay
function WelcomeOverlay({
  moduleTitle,
  lessonTitle,
  level,
  onStart
}: {
  moduleTitle: string
  lessonTitle: string
  level: LearningLevel
  onStart: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
    >
      {/* Scattered decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${STICKY_COLORS[i % STICKY_COLORS.length].split(' ')[0]} w-16 h-16 rounded shadow-lg`}
            style={{
              left: `${5 + (i * 7) % 90}%`,
              top: `${10 + (i * 11) % 80}%`,
              transform: `rotate(${(i * 23) % 30 - 15}deg)`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.4,
              scale: 1,
              transition: { delay: i * 0.05 }
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-4 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Decorative pins */}
        <div className="absolute -top-3 left-1/4">
          <Pin className="w-8 h-8 text-red-500 transform -rotate-12" />
        </div>
        <div className="absolute -top-3 right-1/4">
          <Pin className="w-8 h-8 text-blue-500 transform rotate-12" />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="mb-6"
        >
          <Sparkles className="w-16 h-16 mx-auto text-[var(--primary)]" />
        </motion.div>

        <h1 className={`${handwrittenClass} text-4xl md:text-5xl text-gray-800 mb-2`}>
          {lessonTitle}
        </h1>
        <p className="text-gray-500 mb-6">{moduleTitle}</p>

        <div className="bg-amber-50 rounded-xl p-4 mb-6 border-2 border-dashed border-amber-200">
          <p className={`${handwrittenClass} text-gray-700 text-lg`}>
            Your learning board awaits!
            <br />
            Click on the hidden notes to discover knowledge.
            <br />
            <span className="text-[var(--primary)]">Every click reveals something new...</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>Level: {LEARNING_LEVELS[level].icon} {LEARNING_LEVELS[level].label}</span>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="text-xl px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          <Play className="w-6 h-6 mr-2" />
          Start Exploring
        </Button>
      </motion.div>
    </motion.div>
  )
}

// Main Learning Canvas Props
interface LearningCanvasProps {
  module: Module
  levelContent: {
    description: string
    duration: number
    lessons: Array<{
      id: string
      title: string
      order: number
      content: string
      duration: number
      hasActivity?: boolean
      activityType?: string
    }>
    quiz: {
      id: string
      passingScore: number
      questions: Array<{
        id: string
        question: string
        options: string[]
        correctIndex: number
        explanation: string
      }>
    }
  }
  selectedLevel: LearningLevel
  onLevelChange: (level: LearningLevel) => void
  topicSlug: string
}

export function LearningCanvas({
  module,
  levelContent,
  selectedLevel,
  onLevelChange,
  topicSlug
}: LearningCanvasProps) {
  const [started, setStarted] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [blocks, setBlocks] = useState<CanvasBlock[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [selectedPioneer, setSelectedPioneer] = useState<Founder | null>(null)
  const [showPioneerModal, setShowPioneerModal] = useState(false)

  const lesson = levelContent.lessons[currentLesson]
  const totalLessons = levelContent.lessons.length

  // Parse lesson into blocks
  useEffect(() => {
    if (lesson) {
      const newBlocks = parseContentIntoBlocks(lesson.content, lesson.id, lesson.title)
      setBlocks(newBlocks)
    }
  }, [lesson])

  // Count revealed blocks
  const revealedCount = blocks.filter(b => b.isRevealed).length

  // Reveal a block
  const handleReveal = useCallback((id: string) => {
    setBlocks(prev => prev.map(block =>
      block.id === id ? { ...block, isRevealed: true } : block
    ))
  }, [])

  // Pioneer click handler
  const handlePioneerClick = useCallback((pioneer: Founder) => {
    setSelectedPioneer(pioneer)
    setShowPioneerModal(true)
  }, [])

  // Generate flashcards
  const lessonFlashcards = useMemo<FlashcardDeck | null>(() => {
    if (!lesson) return null
    const pioneers = detectPioneersInContent(lesson.content)
    const cards = generateFlashcardsFromContent(
      lesson.id,
      lesson.title,
      lesson.content,
      selectedLevel,
      pioneers
    )
    if (cards.length === 0) return null
    return {
      id: `${lesson.id}-flashcards`,
      title: `${lesson.title} Flashcards`,
      description: 'Study key concepts',
      lessonId: lesson.id,
      cards,
      level: selectedLevel
    }
  }, [lesson, selectedLevel])

  // Check if all blocks revealed - lesson complete
  useEffect(() => {
    if (blocks.length > 0 && revealedCount === blocks.length) {
      setCompletedLessons(prev => new Set([...prev, lesson.id]))
    }
  }, [revealedCount, blocks.length, lesson?.id])

  // Navigation
  const goToNextLesson = () => {
    if (currentLesson < totalLessons - 1) {
      setCurrentLesson(currentLesson + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  // Welcome screen
  if (!started) {
    return (
      <AnimatePresence>
        <WelcomeOverlay
          moduleTitle={module.title}
          lessonTitle={lesson.title}
          level={selectedLevel}
          onStart={() => setStarted(true)}
        />
      </AnimatePresence>
    )
  }

  // Quiz screen
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className={`${handwrittenClass} text-3xl text-gray-800 mb-2`}>
                Knowledge Check!
              </h2>
              <p className="text-gray-500">
                Let's see what you discovered...
              </p>
            </div>

            {/* Simple quiz display - can reuse existing quiz component */}
            <div className="space-y-4">
              {levelContent.quiz.questions.map((q, idx) => (
                <div key={q.id} className="bg-gray-50 rounded-xl p-4">
                  <p className="font-bold text-gray-800 mb-3">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_5%,white)] transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setShowQuiz(false)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Board
              </Button>
              <Link href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}>
                <Button>
                  Continue Learning
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Main canvas view
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50 relative overflow-hidden">
      {/* Cork board texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Header navigation */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Topic</span>
          </Link>

          <h1 className={`${handwrittenClass} text-xl text-gray-800`}>
            {module.title}
          </h1>

          <div className="flex items-center gap-2">
            {lessonFlashcards && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFlashcards(true)}
                className="text-xs"
              >
                <Layers className="w-4 h-4 mr-1" />
                Flashcards
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowQuiz(true)}
              className="text-xs"
            >
              <Trophy className="w-4 h-4 mr-1" />
              Quiz
            </Button>
          </div>
        </div>
      </div>

      {/* Lesson tabs */}
      <div className="bg-white/50 border-b border-gray-200 px-4 py-2 overflow-x-auto">
        <div className="container mx-auto flex gap-2">
          {levelContent.lessons.map((les, idx) => {
            const isComplete = completedLessons.has(les.id)
            const isCurrent = idx === currentLesson

            return (
              <button
                key={les.id}
                onClick={() => setCurrentLesson(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[var(--primary)] text-white shadow-lg'
                    : isComplete
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isComplete ? '✓' : idx + 1}. {les.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative min-h-[calc(100vh-180px)] p-4 md:p-8">
        {/* Connection strings */}
        <ConnectionStrings blocks={blocks} />

        {/* Canvas blocks */}
        {blocks.map(block => (
          <CanvasNote
            key={block.id}
            block={block}
            onReveal={handleReveal}
            onPioneerClick={handlePioneerClick}
          />
        ))}

        {/* Progress tracker */}
        <ProgressTracker
          totalBlocks={blocks.length}
          revealedCount={revealedCount}
          lessonTitle={lesson.title}
        />

        {/* Reveal all button (for accessibility) */}
        {revealedCount < blocks.length && (
          <motion.button
            className="fixed bottom-6 left-6 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50 z-40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            onClick={() => setBlocks(prev => prev.map(b => ({ ...b, isRevealed: true })))}
          >
            <Eye className="w-4 h-4" />
            Reveal All
          </motion.button>
        )}
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousLesson}
            disabled={currentLesson === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="text-center">
            <p className={`${handwrittenClass} text-gray-700`}>
              Lesson {currentLesson + 1} of {totalLessons}
            </p>
            <p className="text-xs text-gray-500">
              {revealedCount === blocks.length
                ? '✨ All discoveries found!'
                : `${blocks.length - revealedCount} hidden notes remaining`
              }
            </p>
          </div>

          <Button onClick={goToNextLesson}>
            {currentLesson === totalLessons - 1 ? 'Take Quiz' : 'Next Lesson'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Flashcard modal */}
      <AnimatePresence>
        {showFlashcards && lessonFlashcards && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <FlashcardStudy
                deck={lessonFlashcards}
                onComplete={() => {}}
                onClose={() => setShowFlashcards(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pioneer modal */}
      <PioneerModal
        pioneer={selectedPioneer}
        isOpen={showPioneerModal}
        onClose={() => {
          setShowPioneerModal(false)
          setSelectedPioneer(null)
        }}
      />
    </div>
  )
}
