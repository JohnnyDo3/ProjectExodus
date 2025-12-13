'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft, Play, ChevronLeft, ChevronRight, X,
  Lightbulb, Sparkles, Pin, Paperclip, BookOpen, Pencil,
  Eye, Zap, Heart, Star, Quote, Clock, Trophy, Target,
  GraduationCap, Layers, CircleDot, CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import { Module } from '@/data/modules'
import { Founder } from '@/components/learning/FounderCard'
import { detectPioneersInContent } from '@/data/sustainabilityPioneers'
import { PioneerModal } from '@/components/learning/PioneerModal'
import { FlashcardStudy, FlashcardDeck, generateFlashcardsFromContent } from '@/components/learning/Flashcards'
import dynamic from 'next/dynamic'
import { CharcoalFrame, CharcoalFilters, MountainLandscape, WaterLandscape, GardenLandscape, ANCIENT_COLORS } from './CharcoalIllustrations'

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

const DIAGRAM_MAP: Record<string, { component: React.ComponentType<{ animated?: boolean; showLabels?: boolean; className?: string }>, title: string, description: string }> = {
  'water-cycle': {
    component: WaterCycleDiagram,
    title: 'The Water Cycle',
    description: 'Watch how water moves through our planet - evaporating from oceans, forming clouds, falling as rain, and flowing back to the sea. This endless cycle sustains all life on Earth.'
  },
  'solar-energy': {
    component: SolarEnergyDiagram,
    title: 'Solar Energy Systems',
    description: 'See how sunlight transforms into electricity! Photovoltaic cells capture photons and generate clean, renewable power for homes and communities.'
  },
  'soil-layers': {
    component: SoilLayersDiagram,
    title: 'Soil Horizons',
    description: 'Explore the hidden world beneath our feet. Each layer of soil plays a vital role in supporting plant life and filtering water.'
  },
  'composting-process': {
    component: CompostingProcessDiagram,
    title: 'The Composting Process',
    description: 'Nature\'s recycling system! Watch organic matter transform into nutrient-rich soil through the work of microorganisms and decomposers.'
  },
  'food-web': {
    component: FoodWebDiagram,
    title: 'Food Web Connections',
    description: 'Every creature is connected! Trace the flow of energy from plants to herbivores to predators in this intricate web of life.'
  },
  'passive-solar': {
    component: PassiveSolarDiagram,
    title: 'Passive Solar Design',
    description: 'Smart buildings that heat and cool themselves! Learn how orientation, thermal mass, and shading create comfortable spaces naturally.'
  },
  'waste-hierarchy': {
    component: WasteHierarchyPyramid,
    title: 'The Waste Hierarchy',
    description: 'From refuse to resource! This pyramid guides us toward zero waste by prioritizing reduction, reuse, and recycling.'
  },
  'photosynthesis': {
    component: PhotosynthesisDiagram,
    title: 'Photosynthesis',
    description: 'The miracle of green! Plants capture sunlight and transform it into food, releasing life-giving oxygen in the process.'
  },
  'carbon-cycle': {
    component: CarbonCycleDiagram,
    title: 'The Carbon Cycle',
    description: 'Carbon is always on the move! Follow its journey through air, plants, animals, soil, and oceans in this global cycle.'
  },
  'energy-flow': {
    component: EnergyFlowDiagram,
    title: 'Energy Flow in Ecosystems',
    description: 'Only 10% of energy passes to each level! Discover why ecosystems need so many plants to support a few top predators.'
  },
  'rainwater-harvesting': {
    component: RainwaterHarvestingDiagram,
    title: 'Rainwater Harvesting',
    description: 'Capture the sky! Learn how to collect, filter, and store rainwater for gardens, toilets, and even drinking water.'
  },
  'thermal-mass': {
    component: ThermalMassDiagram,
    title: 'Thermal Mass',
    description: 'Buildings that remember! Dense materials absorb heat during the day and release it at night, keeping spaces comfortable naturally.'
  },
}

// Sticky note colors
const STICKY_COLORS = [
  { bg: 'bg-yellow-100', border: 'border-yellow-300', shadow: 'shadow-yellow-200/50' },
  { bg: 'bg-orange-100', border: 'border-orange-300', shadow: 'shadow-orange-200/50' },
  { bg: 'bg-pink-100', border: 'border-pink-300', shadow: 'shadow-pink-200/50' },
  { bg: 'bg-blue-100', border: 'border-blue-300', shadow: 'shadow-blue-200/50' },
  { bg: 'bg-green-100', border: 'border-green-300', shadow: 'shadow-green-200/50' },
  { bg: 'bg-purple-100', border: 'border-purple-300', shadow: 'shadow-purple-200/50' },
]

// Handwritten font class
const handwritten = "font-['Caveat',_cursive]"

// Page structure for organized presentation
interface CanvasPage {
  id: string
  title: string
  type: 'intro' | 'content' | 'diagram' | 'pioneer' | 'summary' | 'activity'
  mainContent: string
  bulletPoints?: string[]
  diagram?: string
  diagramExplanation?: string
  pioneers?: Founder[]
  keyTakeaway?: string
  funFact?: string
}

// Parse lesson content into organized pages
function parseLessonIntoPages(
  content: string,
  lessonId: string,
  lessonTitle: string
): CanvasPage[] {
  const pages: CanvasPage[] = []

  // Detect diagram type from content
  const lowerContent = content.toLowerCase()
  let diagramType: string | undefined

  if (lowerContent.includes('water cycle') || (lowerContent.includes('evaporation') && lowerContent.includes('precipitation'))) {
    diagramType = 'water-cycle'
  } else if (lowerContent.includes('solar panel') || lowerContent.includes('photovoltaic') || lowerContent.includes('solar energy')) {
    diagramType = 'solar-energy'
  } else if (lowerContent.includes('soil layer') || lowerContent.includes('topsoil') || lowerContent.includes('horizon')) {
    diagramType = 'soil-layers'
  } else if (lowerContent.includes('compost') || lowerContent.includes('decomposition')) {
    diagramType = 'composting-process'
  } else if (lowerContent.includes('food web') || lowerContent.includes('food chain')) {
    diagramType = 'food-web'
  } else if (lowerContent.includes('passive solar') || lowerContent.includes('thermal mass')) {
    diagramType = 'passive-solar'
  } else if (lowerContent.includes('waste hierarchy') || lowerContent.includes('reduce, reuse')) {
    diagramType = 'waste-hierarchy'
  } else if (lowerContent.includes('photosynthesis') || lowerContent.includes('chlorophyll')) {
    diagramType = 'photosynthesis'
  } else if (lowerContent.includes('carbon cycle')) {
    diagramType = 'carbon-cycle'
  } else if (lowerContent.includes('energy flow') || lowerContent.includes('trophic')) {
    diagramType = 'energy-flow'
  } else if (lowerContent.includes('rainwater harvest') || lowerContent.includes('cistern')) {
    diagramType = 'rainwater-harvesting'
  } else if (lowerContent.includes('thermal mass') && !lowerContent.includes('passive solar')) {
    diagramType = 'thermal-mass'
  }

  // Detect pioneers
  const pioneers = detectPioneersInContent(content)

  // Split by headers
  const headerRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi
  const parts = content.split(headerRegex)

  // Create intro page
  const introText = parts[0]?.replace(/<[^>]*>/g, '').trim() || ''
  if (introText.length > 50) {
    pages.push({
      id: `${lessonId}-intro`,
      title: lessonTitle,
      type: 'intro',
      mainContent: introText.substring(0, 400) + (introText.length > 400 ? '...' : ''),
      keyTakeaway: extractKeyTakeaway(introText)
    })
  } else {
    // If no good intro, create a title page
    pages.push({
      id: `${lessonId}-intro`,
      title: lessonTitle,
      type: 'intro',
      mainContent: `Welcome to this lesson on ${lessonTitle}. Let's explore together!`,
    })
  }

  // Process content sections
  let pageIndex = 1
  for (let i = 1; i < parts.length; i += 2) {
    const sectionTitle = parts[i]?.replace(/<[^>]*>/g, '').trim()
    const sectionContent = parts[i + 1]?.replace(/<[^>]*>/g, '').trim() || ''

    if (!sectionTitle || sectionContent.length < 30) continue

    // Extract bullet points if present
    const bulletPoints = extractBulletPoints(parts[i + 1] || '')

    pages.push({
      id: `${lessonId}-page-${pageIndex}`,
      title: sectionTitle,
      type: 'content',
      mainContent: sectionContent.substring(0, 500) + (sectionContent.length > 500 ? '...' : ''),
      bulletPoints: bulletPoints.length > 0 ? bulletPoints : undefined,
      funFact: extractFunFact(sectionContent)
    })
    pageIndex++
  }

  // Add diagram page if detected
  if (diagramType && DIAGRAM_MAP[diagramType]) {
    const diagramInfo = DIAGRAM_MAP[diagramType]
    pages.push({
      id: `${lessonId}-diagram`,
      title: diagramInfo.title,
      type: 'diagram',
      mainContent: diagramInfo.description,
      diagram: diagramType,
      diagramExplanation: extractDiagramExplanation(content, diagramType)
    })
  }

  // Add pioneer page if detected
  if (pioneers.length > 0) {
    pages.push({
      id: `${lessonId}-pioneers`,
      title: 'Changemakers',
      type: 'pioneer',
      mainContent: 'Meet the people who are making a difference in this field.',
      pioneers
    })
  }

  // Add summary page
  pages.push({
    id: `${lessonId}-summary`,
    title: 'Key Takeaways',
    type: 'summary',
    mainContent: `You've completed ${lessonTitle}!`,
    bulletPoints: extractKeyPoints(content),
    keyTakeaway: 'Remember: Every small action counts toward a sustainable future!'
  })

  return pages
}

// Helper to extract bullet points from HTML
function extractBulletPoints(html: string): string[] {
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi) || []
  return liMatches
    .map(li => li.replace(/<[^>]*>/g, '').trim())
    .filter(text => text.length > 10 && text.length < 200)
    .slice(0, 5)
}

// Helper to extract a key takeaway
function extractKeyTakeaway(text: string): string | undefined {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 20)
  const importantSentence = sentences.find(s =>
    s.toLowerCase().includes('important') ||
    s.toLowerCase().includes('key') ||
    s.toLowerCase().includes('remember') ||
    s.toLowerCase().includes('essential')
  )
  return importantSentence?.trim()
}

// Helper to extract fun facts
function extractFunFact(text: string): string | undefined {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 20)
  const factSentence = sentences.find(s =>
    /\d+%/.test(s) ||
    s.toLowerCase().includes('billion') ||
    s.toLowerCase().includes('million') ||
    s.toLowerCase().includes('amazing') ||
    s.toLowerCase().includes('surprising')
  )
  return factSentence?.trim()
}

// Helper to extract diagram explanation
function extractDiagramExplanation(content: string, diagramType: string): string {
  const keywordMap: Record<string, string[]> = {
    'water-cycle': ['evaporation', 'condensation', 'precipitation', 'collection'],
    'solar-energy': ['photovoltaic', 'inverter', 'grid', 'panel'],
    'soil-layers': ['topsoil', 'subsoil', 'bedrock', 'organic'],
    'composting-process': ['decompose', 'bacteria', 'nitrogen', 'carbon'],
    'food-web': ['producer', 'consumer', 'predator', 'prey'],
  }

  const keywords = keywordMap[diagramType] || []
  const sentences = content.split(/[.!?]/).filter(s =>
    keywords.some(k => s.toLowerCase().includes(k))
  )

  return sentences.slice(0, 2).join('. ').trim() || 'Explore the diagram to understand how each part works together!'
}

// Helper to extract key points for summary
function extractKeyPoints(content: string): string[] {
  const text = content.replace(/<[^>]*>/g, '')
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 30)

  // Get sentences with key indicators
  const keyIndicators = ['is', 'are', 'means', 'helps', 'creates', 'provides']
  const keySentences = sentences.filter(s =>
    keyIndicators.some(k => s.toLowerCase().includes(` ${k} `))
  )

  return keySentences.slice(0, 4).map(s => s.trim())
}

// Page component - organized layout with organic styling (fits viewport)
function CanvasPageView({
  page,
  pageNumber,
  totalPages,
  onPioneerClick,
  onNext,
  onPrevious,
  canGoBack,
  nextLabel
}: {
  page: CanvasPage
  pageNumber: number
  totalPages: number
  onPioneerClick: (pioneer: Founder) => void
  onNext: () => void
  onPrevious: () => void
  canGoBack: boolean
  nextLabel: string
}) {
  const colorIndex = pageNumber % STICKY_COLORS.length
  const color = STICKY_COLORS[colorIndex]

  // Get diagram component if this is a diagram page
  const DiagramInfo = page.diagram ? DIAGRAM_MAP[page.diagram] : null
  const DiagramComponent = DiagramInfo?.component

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col"
    >
      {/* Main page content - constrained to viewport with internal scroll if needed */}
      <div className="flex-1 min-h-0 container mx-auto px-4 max-w-5xl flex flex-col justify-center overflow-hidden">

        {/* INTRO PAGE - Ancient carved aesthetic - Responsive WYSIWYG */}
        {page.type === 'intro' && (
          <div className="h-full flex flex-col items-center justify-center text-center relative overflow-y-auto">
            <CharcoalFilters />

            {/* Decorative top ornament */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-3 sm:mb-4 md:mb-6 flex-shrink-0"
            >
              <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto" viewBox="0 0 100 100">
                {/* Lotus-inspired ornament */}
                <circle cx="50" cy="50" r="35" fill="none" stroke={ANCIENT_COLORS.ochre} strokeWidth="1.5" opacity="0.4" />
                <circle cx="50" cy="50" r="25" fill="none" stroke={ANCIENT_COLORS.terracotta} strokeWidth="1" opacity="0.3" />
                <circle cx="50" cy="50" r="8" fill={ANCIENT_COLORS.ochre} opacity="0.5" />
                {/* Rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <line
                    key={i}
                    x1={50 + Math.cos(angle * Math.PI / 180) * 12}
                    y1={50 + Math.sin(angle * Math.PI / 180) * 12}
                    x2={50 + Math.cos(angle * Math.PI / 180) * 22}
                    y2={50 + Math.sin(angle * Math.PI / 180) * 22}
                    stroke={ANCIENT_COLORS.ochre}
                    strokeWidth="1.5"
                    opacity="0.5"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </motion.div>

            <h1
              className={`${handwritten} text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 tracking-wide flex-shrink-0`}
              style={{ color: ANCIENT_COLORS.charcoal }}
            >
              {page.title}
            </h1>

            {/* Decorative divider */}
            <svg className="w-28 sm:w-32 md:w-40 h-3 sm:h-4 mx-auto mb-3 sm:mb-4 md:mb-6 opacity-30 flex-shrink-0" viewBox="0 0 160 16">
              <path
                d="M0,8 L60,8 M100,8 L160,8"
                stroke={ANCIENT_COLORS.charcoal}
                strokeWidth="1"
              />
              <circle cx="80" cy="8" r="4" fill="none" stroke={ANCIENT_COLORS.terracotta} strokeWidth="1" />
            </svg>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl sm:max-w-2xl mx-auto p-3 sm:p-4 md:p-6 rounded-sm relative flex-shrink-0"
              style={{
                backgroundColor: `${ANCIENT_COLORS.papyrus}`,
                boxShadow: `inset 0 0 30px ${ANCIENT_COLORS.sand}40`
              }}
            >
              {/* Corner decorations - hidden on mobile */}
              {['tl', 'tr', 'bl', 'br'].map((corner) => (
                <svg
                  key={corner}
                  className={`absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hidden sm:block ${
                    corner === 'tl' ? 'top-1.5 sm:top-2 left-1.5 sm:left-2' :
                    corner === 'tr' ? 'top-1.5 sm:top-2 right-1.5 sm:right-2 -scale-x-100' :
                    corner === 'bl' ? 'bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 -scale-y-100' :
                    'bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 -scale-x-100 -scale-y-100'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4,4 L4,16 M4,4 L16,4"
                    fill="none"
                    stroke={ANCIENT_COLORS.sienna}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              ))}

              <p
                className={`${handwritten} text-base sm:text-lg md:text-xl leading-relaxed line-clamp-[6] sm:line-clamp-[8]`}
                style={{ color: ANCIENT_COLORS.charcoal }}
              >
                {page.mainContent}
              </p>
            </motion.div>

            {page.keyTakeaway && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 sm:mt-4 md:mt-6 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-sm border flex-shrink-0"
                style={{
                  backgroundColor: `${ANCIENT_COLORS.ochre}15`,
                  borderColor: `${ANCIENT_COLORS.ochre}40`
                }}
              >
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: ANCIENT_COLORS.deepOchre }} />
                <span
                  className={`${handwritten} text-sm sm:text-base md:text-lg line-clamp-1`}
                  style={{ color: ANCIENT_COLORS.sienna }}
                >
                  {page.keyTakeaway}
                </span>
              </motion.div>
            )}
          </div>
        )}

        {/* CONTENT PAGE - Responsive WYSIWYG */}
        {page.type === 'content' && (
          <div className="h-full flex flex-col overflow-y-auto">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`${handwritten} text-xl sm:text-2xl md:text-3xl text-gray-800 mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 flex-shrink-0`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                {pageNumber}
              </div>
              <span className="line-clamp-1">{page.title}</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 flex-1 min-h-0">
              {/* Main content card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`${color.bg} ${color.border} border sm:border-2 rounded-lg p-2.5 sm:p-3 md:p-4 shadow-lg transform sm:-rotate-1 relative overflow-hidden`}
              >
                <div className="absolute -top-1.5 sm:-top-2 left-3 sm:left-4">
                  <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <p className={`${handwritten} text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mt-1 line-clamp-[8] sm:line-clamp-[10]`}>
                  {page.mainContent}
                </p>
              </motion.div>

              {/* Bullet points card */}
              {page.bulletPoints && page.bulletPoints.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white border sm:border-2 border-gray-200 rounded-lg p-2.5 sm:p-3 md:p-4 shadow-lg transform sm:rotate-1 overflow-hidden"
                >
                  <h3 className={`${handwritten} text-base sm:text-lg md:text-xl text-gray-800 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2`}>
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                    Key Points
                  </h3>
                  <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    {page.bulletPoints.slice(0, 3).map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-start gap-1.5 sm:gap-2"
                      >
                        <CircleDot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--primary)] mt-1 sm:mt-1.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 line-clamp-2">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Fun fact - only show on larger screens or if no bullet points */}
            {page.funFact && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 sm:mt-3 md:mt-4 bg-gradient-to-r from-purple-100 to-pink-100 border sm:border-2 border-purple-200 rounded-lg p-2 sm:p-3 max-w-md mx-auto transform sm:rotate-1 flex-shrink-0"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  <span className={`${handwritten} text-sm sm:text-base font-bold text-purple-800`}>Did you know?</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-700 line-clamp-2">{page.funFact}</p>
              </motion.div>
            )}
          </div>
        )}

        {/* DIAGRAM PAGE - Charcoal carved aesthetic */}
        {page.type === 'diagram' && DiagramComponent && (
          <div className="relative h-full overflow-y-auto">
            <CharcoalFilters />

            {/* Aged parchment background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-[#f8f4e9] via-[#f5f0e1] to-[#efe8d8] rounded-lg -z-10"
            />

            {/* Decorative header with hieroglyphic styling */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-4"
            >
              {/* Decorative top border */}
              <svg className="w-48 h-4 mx-auto mb-3 opacity-40" viewBox="0 0 200 16">
                <path
                  d="M10,8 Q50,4 100,8 Q150,12 190,8"
                  fill="none"
                  stroke={ANCIENT_COLORS.sienna}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="8" r="3" fill={ANCIENT_COLORS.ochre} opacity="0.6" />
              </svg>

              <h2 className={`${handwritten} text-3xl sm:text-4xl tracking-wide`}
                style={{ color: ANCIENT_COLORS.charcoal }}
              >
                {page.title}
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`${handwritten} text-lg italic mt-2 max-w-xl mx-auto`}
                style={{ color: `${ANCIENT_COLORS.sienna}cc` }}
              >
                {page.mainContent}
              </motion.p>
            </motion.div>

            {/* Diagram in charcoal frame */}
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Explanation sidebar - styled as marginalia */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1 space-y-3"
              >
                <div
                  className="relative p-4 rounded-sm border-l-2"
                  style={{
                    backgroundColor: `${ANCIENT_COLORS.turquoise}15`,
                    borderColor: ANCIENT_COLORS.turquoise
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4" style={{ color: ANCIENT_COLORS.teal }} />
                    <span className={`${handwritten} text-lg`} style={{ color: ANCIENT_COLORS.teal }}>
                      Observe:
                    </span>
                  </div>
                  <p className={`${handwritten} text-base`} style={{ color: ANCIENT_COLORS.charcoal }}>
                    {page.diagramExplanation}
                  </p>
                </div>

                <div
                  className="relative p-4 rounded-sm border-l-2"
                  style={{
                    backgroundColor: `${ANCIENT_COLORS.terracotta}15`,
                    borderColor: ANCIENT_COLORS.terracotta
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" style={{ color: ANCIENT_COLORS.rust }} />
                    <span className={`${handwritten} text-lg`} style={{ color: ANCIENT_COLORS.rust }}>
                      Contemplate:
                    </span>
                  </div>
                  <p className={`${handwritten} text-base`} style={{ color: ANCIENT_COLORS.charcoal }}>
                    How does each element connect to the whole system?
                  </p>
                </div>
              </motion.div>

              {/* Diagram - wrapped in charcoal frame */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="lg:col-span-3"
              >
                <CharcoalFrame title="">
                  <div
                    className="relative overflow-hidden rounded"
                    style={{ filter: 'sepia(0.08) contrast(1.02)' }}
                  >
                    <DiagramComponent animated={false} showLabels className="w-full max-h-[45vh]" />
                  </div>
                </CharcoalFrame>
              </motion.div>
            </div>

            {/* Decorative footer border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex justify-center"
            >
              <svg className="w-32 h-6 opacity-30" viewBox="0 0 128 24">
                <path
                  d="M10,12 L50,12 M78,12 L118,12"
                  fill="none"
                  stroke={ANCIENT_COLORS.charcoal}
                  strokeWidth="1"
                />
                <circle cx="64" cy="12" r="6" fill="none" stroke={ANCIENT_COLORS.ochre} strokeWidth="1" />
                <circle cx="64" cy="12" r="2" fill={ANCIENT_COLORS.ochre} opacity="0.5" />
              </svg>
            </motion.div>
          </div>
        )}

        {/* PIONEER PAGE - Responsive WYSIWYG */}
        {page.type === 'pioneer' && page.pioneers && (
          <div className="h-full flex flex-col overflow-y-auto">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`${handwritten} text-xl sm:text-2xl md:text-3xl text-center text-gray-800 mb-1 sm:mb-2 flex-shrink-0`}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 inline-block text-pink-500 mr-1 sm:mr-2" />
              {page.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-600 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm flex-shrink-0"
            >
              {page.mainContent}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 flex-1 min-h-0">
              {page.pioneers.slice(0, 3).map((pioneer, i) => (
                <motion.button
                  key={pioneer.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => onPioneerClick(pioneer)}
                  className="bg-white rounded-lg shadow-lg p-2.5 sm:p-3 md:p-4 border sm:border-2 border-gray-100 hover:border-pink-300 hover:shadow-xl transition-all transform hover:scale-[1.02] text-left"
                  style={{ transform: `rotate(${(i % 3 - 1) * 1}deg)` }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-inner flex-shrink-0">
                      {pioneer.portrait ? (
                        <img src={pioneer.portrait} alt={pioneer.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className={`${handwritten} text-sm sm:text-base md:text-lg text-gray-600`}>
                          {pioneer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`${handwritten} text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate`}>{pioneer.name}</h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">{pioneer.title}</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">{pioneer.shortBio}</p>
                  <p className="text-[10px] sm:text-xs text-pink-600 mt-1 font-medium">Click to learn more →</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* SUMMARY PAGE - Responsive WYSIWYG */}
        {page.type === 'summary' && (
          <div className="h-full flex flex-col items-center justify-center text-center overflow-y-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="mb-2 sm:mb-3 md:mb-4 flex-shrink-0"
            >
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto text-green-500" />
            </motion.div>

            <h2 className={`${handwritten} text-xl sm:text-2xl md:text-3xl text-gray-800 mb-1 sm:mb-2 flex-shrink-0`}>
              {page.title}
            </h2>

            <p className={`${handwritten} text-base sm:text-lg md:text-xl text-gray-600 mb-2 sm:mb-3 md:mb-4 flex-shrink-0`}>
              {page.mainContent}
            </p>

            {page.bulletPoints && page.bulletPoints.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-50 to-teal-50 border sm:border-2 border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-xl mx-auto text-left flex-shrink-0"
              >
                <h3 className={`${handwritten} text-base sm:text-lg md:text-xl text-green-800 mb-2 sm:mb-3`}>Remember these points:</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {page.bulletPoints.slice(0, 3).map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-1.5 sm:gap-2"
                    >
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 line-clamp-2">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {page.keyTakeaway && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2 sm:mt-3 md:mt-4 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-100 border sm:border-2 border-yellow-300 rounded-full flex-shrink-0"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                <span className={`${handwritten} text-sm sm:text-base text-yellow-800 line-clamp-1`}>
                  {page.keyTakeaway}
                </span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Navigation controls inside page - Responsive */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 md:py-4 mt-auto flex-shrink-0 bg-white/50">
        <button
          onClick={onPrevious}
          disabled={!canGoBack}
          className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            canGoBack
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page dots - compact on mobile */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`h-1 sm:h-1.5 rounded-full transition-all ${
                i === pageNumber - 1
                  ? 'w-4 sm:w-6 bg-[var(--primary)]'
                  : i < pageNumber - 1
                  ? 'w-1 sm:w-1.5 bg-green-400'
                  : 'w-1 sm:w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[var(--primary)] text-white hover:opacity-90 transition-all"
        >
          <span className="hidden sm:inline">{nextLabel}</span>
          <span className="sm:hidden">{nextLabel === 'Quiz' ? 'Quiz' : 'Next'}</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
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
  const [currentPage, setCurrentPage] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [selectedPioneer, setSelectedPioneer] = useState<Founder | null>(null)
  const [showPioneerModal, setShowPioneerModal] = useState(false)

  const lesson = levelContent.lessons[currentLesson]
  const totalLessons = levelContent.lessons.length

  // Parse lesson into pages
  const lessonPages = useMemo(() => {
    if (!lesson) return []
    return parseLessonIntoPages(lesson.content, lesson.id, lesson.title)
  }, [lesson])

  const totalPages = lessonPages.length
  const currentPageData = lessonPages[currentPage]

  // Reset page when changing lessons
  useEffect(() => {
    setCurrentPage(0)
  }, [currentLesson])

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

  // Navigation
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      // Lesson complete
      setCompletedLessons(prev => new Set([...prev, lesson.id]))
      if (currentLesson < totalLessons - 1) {
        setCurrentLesson(currentLesson + 1)
        setCurrentPage(0)
      } else {
        setShowQuiz(true)
      }
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
      // Will go to last page of previous lesson
    }
  }

  // Pioneer click
  const handlePioneerClick = useCallback((pioneer: Founder) => {
    setSelectedPioneer(pioneer)
    setShowPioneerModal(true)
  }, [])

  // Welcome screen - WYSIWYG viewport fit
  if (!started) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-blue-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 max-w-xl sm:max-w-2xl text-center relative w-full"
        >
          <div className="absolute -top-3 sm:-top-4 left-1/4"><Pin className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 transform -rotate-12" /></div>
          <div className="absolute -top-3 sm:-top-4 right-1/4"><Pin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 transform rotate-12" /></div>

          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto text-[var(--primary)] mb-3 sm:mb-4 md:mb-6" />

          <h1 className={`${handwritten} text-3xl sm:text-4xl md:text-5xl text-gray-800 mb-2 sm:mb-3 md:mb-4`}>
            {module.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 line-clamp-3">{levelContent.description}</p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1 sm:gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              {levelContent.duration} min
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              {LEARNING_LEVELS[selectedLevel].label}
            </span>
          </div>

          <Button
            size="lg"
            onClick={() => setStarted(true)}
            className="text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-xl"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Start Learning
          </Button>
        </motion.div>
      </div>
    )
  }

  // Quiz screen - WYSIWYG viewport fit
  if (showQuiz) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-amber-50 via-white to-blue-50 p-3 sm:p-4">
        <div className="container mx-auto max-w-3xl flex-1 flex flex-col min-h-0">
          <motion.div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex-1 flex flex-col min-h-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-3 sm:mb-4 md:mb-6 flex-shrink-0">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto text-yellow-500 mb-2 sm:mb-3" />
              <h2 className={`${handwritten} text-2xl sm:text-3xl md:text-4xl text-gray-800`}>
                Knowledge Check!
              </h2>
            </div>

            {/* Scrollable questions area */}
            <div className="flex-1 overflow-y-auto min-h-0 space-y-3 sm:space-y-4 pr-1">
              {levelContent.quiz.questions.map((q, idx) => (
                <div key={q.id} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">{idx + 1}. {q.question}</p>
                  <div className="space-y-1.5 sm:space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        className="w-full text-left p-2 sm:p-3 rounded-lg border-2 border-gray-200 hover:border-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_5%,white)] transition-all text-xs sm:text-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 flex justify-between flex-shrink-0 pt-2 border-t border-gray-100">
              <Button variant="outline" onClick={() => setShowQuiz(false)} className="text-xs sm:text-sm">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Back
              </Button>
              <Link href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}>
                <Button className="text-xs sm:text-sm">
                  Continue
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Determine next button label
  const nextLabel = currentPage === totalPages - 1 && currentLesson === totalLessons - 1
    ? 'Quiz'
    : currentPage === totalPages - 1
    ? 'Next Lesson'
    : 'Next'

  const canGoBack = currentLesson > 0 || currentPage > 0

  // Main page view - full viewport, no scroll
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Back</span>
          </Link>

          <h1 className={`${handwritten} text-lg text-gray-800`}>
            {lesson.title}
          </h1>

          <div className="flex items-center gap-2">
            {lessonFlashcards && (
              <Button size="sm" variant="outline" onClick={() => setShowFlashcards(true)} className="text-xs py-1 px-2">
                <Layers className="w-3 h-3 mr-1" />
                Cards
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => setShowQuiz(true)} className="text-xs py-1 px-2">
              <Trophy className="w-3 h-3 mr-1" />
              Quiz
            </Button>
          </div>
        </div>
      </div>

      {/* Lesson tabs */}
      <div className="flex-shrink-0 bg-white/50 border-b border-gray-200 px-4 py-1.5 overflow-x-auto">
        <div className="container mx-auto flex gap-2">
          {levelContent.lessons.map((les, idx) => {
            const isComplete = completedLessons.has(les.id)
            const isCurrent = idx === currentLesson
            return (
              <button
                key={les.id}
                onClick={() => { setCurrentLesson(idx); setCurrentPage(0); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
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

      {/* Page content - takes remaining space */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPageData && (
            <CanvasPageView
              key={currentPageData.id}
              page={currentPageData}
              pageNumber={currentPage + 1}
              totalPages={totalPages}
              onPioneerClick={handlePioneerClick}
              onNext={goToNextPage}
              onPrevious={goToPreviousPage}
              canGoBack={canGoBack}
              nextLabel={nextLabel}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Flashcard modal - properly centered */}
      <AnimatePresence>
        {showFlashcards && lessonFlashcards && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFlashcards(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
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
