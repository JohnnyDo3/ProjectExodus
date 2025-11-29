'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Droplet, ShowerHead, Home, Utensils, Shirt,
  ChevronRight, ChevronLeft, Leaf, TrendingDown,
  Waves, CloudRain, Bath, Flower2, Car
} from 'lucide-react'
import Link from 'next/link'

type Category = 'indoor' | 'outdoor' | 'diet' | 'lifestyle'

interface FormData {
  // Indoor
  showerMinutes: number
  showersPerWeek: number
  bathsPerWeek: number
  toiletFlushes: number
  dishwasherLoads: number
  handwashDishes: boolean
  laundryLoads: number
  faucetMinutes: number

  // Outdoor
  lawnSize: 'none' | 'small' | 'medium' | 'large'
  gardenSize: 'none' | 'small' | 'medium' | 'large'
  poolSize: 'none' | 'small' | 'large'
  carWashes: number
  rainwaterHarvest: boolean

  // Diet
  beefServings: number
  porkServings: number
  chickenServings: number
  dairyServings: number
  coffeeServings: number

  // Lifestyle
  newClothes: number
  paperUsage: 'low' | 'medium' | 'high'
}

const initialData: FormData = {
  showerMinutes: 8,
  showersPerWeek: 7,
  bathsPerWeek: 0,
  toiletFlushes: 6,
  dishwasherLoads: 3,
  handwashDishes: false,
  laundryLoads: 2,
  faucetMinutes: 10,
  lawnSize: 'small',
  gardenSize: 'none',
  poolSize: 'none',
  carWashes: 2,
  rainwaterHarvest: false,
  beefServings: 3,
  porkServings: 2,
  chickenServings: 4,
  dairyServings: 14,
  coffeeServings: 7,
  newClothes: 20,
  paperUsage: 'medium'
}

export default function WaterCalculatorPage() {
  const [currentStep, setCurrentStep] = useState<Category>('indoor')
  const [formData, setFormData] = useState<FormData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const steps: { id: Category; title: string; icon: any }[] = [
    { id: 'indoor', title: 'Indoor Usage', icon: Home },
    { id: 'outdoor', title: 'Outdoor Usage', icon: Flower2 },
    { id: 'diet', title: 'Food & Diet', icon: Utensils },
    { id: 'lifestyle', title: 'Lifestyle', icon: Shirt },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = () => {
    let directDaily = 0
    let virtualDaily = 0

    // Indoor Direct Use (gallons/day)
    // Shower: ~2 gal/min
    directDaily += (formData.showerMinutes * formData.showersPerWeek * 2) / 7
    // Bath: ~36 gallons
    directDaily += (formData.bathsPerWeek * 36) / 7
    // Toilet: ~1.6 gal/flush (modern) or 3.5 (old)
    directDaily += formData.toiletFlushes * 1.6
    // Dishwasher: ~6 gal/load
    directDaily += (formData.dishwasherLoads * 6) / 7
    // Hand washing dishes: ~27 gal if yes
    if (formData.handwashDishes) directDaily += 27
    // Laundry: ~40 gal/load
    directDaily += (formData.laundryLoads * 40) / 7
    // Faucet: ~2 gal/min
    directDaily += formData.faucetMinutes * 2

    // Outdoor (gallons/day average)
    const lawnFactors = { none: 0, small: 50, medium: 150, large: 300 }
    const gardenFactors = { none: 0, small: 10, medium: 30, large: 60 }
    const poolFactors = { none: 0, small: 20, large: 50 }
    let outdoorDaily = lawnFactors[formData.lawnSize] + gardenFactors[formData.gardenSize] + poolFactors[formData.poolSize]
    // Only water 3 months of summer, averaged
    outdoorDaily = outdoorDaily * 0.25
    // Car wash: ~50 gal
    outdoorDaily += (formData.carWashes * 50) / 30
    // Rainwater harvesting reduces by 30%
    if (formData.rainwaterHarvest) outdoorDaily *= 0.7

    directDaily += outdoorDaily

    // Virtual Water (gallons/day from food and products)
    // Beef: ~1,800 gal per serving
    virtualDaily += (formData.beefServings * 1800) / 7
    // Pork: ~720 gal per serving
    virtualDaily += (formData.porkServings * 720) / 7
    // Chicken: ~518 gal per serving
    virtualDaily += (formData.chickenServings * 518) / 7
    // Dairy: ~65 gal per serving
    virtualDaily += (formData.dairyServings * 65) / 7
    // Coffee: ~37 gal per cup
    virtualDaily += (formData.coffeeServings * 37) / 7

    // Clothing: ~700 gal per item (averaged over year)
    virtualDaily += (formData.newClothes * 700) / 365

    // Paper
    const paperFactors = { low: 10, medium: 30, high: 60 }
    virtualDaily += paperFactors[formData.paperUsage]

    return {
      direct: Math.round(directDaily),
      virtual: Math.round(virtualDaily),
      total: Math.round(directDaily + virtualDaily)
    }
  }

  const footprint = calculateFootprint()
  const usAverage = 2000 // US average total water footprint per day
  const globalAverage = 1000
  const efficientTarget = 500

  const getFootprintRating = () => {
    if (footprint.total <= efficientTarget) return { label: 'Excellent', color: 'ocean', emoji: '🌟' }
    if (footprint.total <= globalAverage) return { label: 'Good', color: 'moss', emoji: '👍' }
    if (footprint.total <= usAverage * 0.7) return { label: 'Average', color: 'terra', emoji: '📊' }
    return { label: 'High', color: 'red', emoji: '⚠️' }
  }

  const rating = getFootprintRating()

  const getRecommendations = () => {
    const recs = []

    if (formData.showerMinutes > 5) {
      recs.push({
        title: 'Shorter Showers',
        desc: `Reducing shower time by ${formData.showerMinutes - 5} minutes saves ${Math.round((formData.showerMinutes - 5) * formData.showersPerWeek * 2)} gal/week`,
        impact: 'High',
        icon: ShowerHead
      })
    }

    if (formData.beefServings > 2) {
      recs.push({
        title: 'Reduce Beef Consumption',
        desc: 'Beef has the highest water footprint. One less serving saves 1,800 gallons!',
        impact: 'High',
        icon: Utensils
      })
    }

    if (formData.lawnSize !== 'none' && !formData.rainwaterHarvest) {
      recs.push({
        title: 'Install Rain Barrels',
        desc: 'Harvest rainwater for lawn/garden and reduce outdoor water use by 30%',
        impact: 'High',
        icon: CloudRain
      })
    }

    if (formData.bathsPerWeek > 2) {
      recs.push({
        title: 'Switch Baths to Showers',
        desc: 'A bath uses 36 gallons vs ~16 for an 8-minute shower',
        impact: 'Medium',
        icon: Bath
      })
    }

    if (formData.newClothes > 30) {
      recs.push({
        title: 'Buy Less Clothing',
        desc: 'Each clothing item requires ~700 gallons to produce. Buy secondhand!',
        impact: 'Medium',
        icon: Shirt
      })
    }

    if (formData.coffeeServings > 3) {
      recs.push({
        title: 'Reduce Coffee Intake',
        desc: 'Each cup of coffee takes 37 gallons of water to produce',
        impact: 'Low',
        icon: Utensils
      })
    }

    return recs.slice(0, 4)
  }

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (showResults) {
      setShowResults(false)
    } else if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id)
    }
  }

  const SliderInput = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = '',
    helpText
  }: {
    label: string
    value: number
    onChange: (val: number) => void
    min: number
    max: number
    step?: number
    unit?: string
    helpText?: string
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="font-bold text-earth-800 dark:text-sand-200">{label}</label>
        <span className="text-2xl font-black text-ocean-600 dark:text-ocean-400">
          {value}{unit}
        </span>
      </div>
      {helpText && (
        <p className="text-sm text-earth-600 dark:text-sand-400">{helpText}</p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-sand-200 dark:bg-earth-700 rounded-lg appearance-none cursor-pointer accent-ocean-500"
      />
      <div className="flex justify-between text-xs font-medium text-earth-500 dark:text-sand-500">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )

  const OptionButton = ({
    selected,
    onClick,
    children
  }: {
    selected: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-xl font-bold transition-all ${
        selected
          ? 'bg-ocean-500 text-white shadow-lg scale-105'
          : 'bg-sand-100 dark:bg-earth-700 text-earth-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-earth-600'
      }`}
    >
      {children}
    </button>
  )

  const ToggleButton = ({
    value,
    onChange,
    label
  }: {
    value: boolean
    onChange: (val: boolean) => void
    label: string
  }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-full p-4 rounded-xl font-bold transition-all border-2 ${
        value
          ? 'bg-ocean-100 dark:bg-ocean-900 border-ocean-500 text-ocean-700 dark:text-ocean-300'
          : 'bg-sand-50 dark:bg-earth-800 border-sand-300 dark:border-earth-600 text-earth-600 dark:text-sand-400'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-ocean-500' : 'bg-sand-300 dark:bg-earth-600'}`}>
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : ''}`} />
        </div>
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-sand-50 to-moss-50 dark:from-earth-900 dark:via-earth-800 dark:to-earth-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-ocean-600 to-moss-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Droplet className="w-6 h-6" />
              <span className="font-bold">INTERACTIVE TOOL</span>
            </div>
            <h1 className="text-5xl font-black mb-4">WATER FOOTPRINT CALCULATOR</h1>
            <p className="text-xl font-medium text-ocean-100">
              Discover your total water usage - direct and virtual (hidden in products)
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          {!showResults && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                      currentStep === step.id
                        ? 'bg-ocean-500 text-white shadow-lg'
                        : i < currentStepIndex
                        ? 'bg-ocean-200 dark:bg-ocean-800 text-ocean-700 dark:text-ocean-300'
                        : 'bg-sand-200 dark:bg-earth-700 text-earth-500 dark:text-sand-500'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{step.title}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-earth-400 mx-1" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form Content */}
          {!showResults ? (
            <Card className="border-4 border-ocean-300 dark:border-ocean-700 shadow-2xl">
              <CardHeader className="border-b-2 border-sand-200 dark:border-earth-700">
                <CardTitle className="text-2xl font-black text-earth-900 dark:text-sand-100 flex items-center gap-3">
                  {(() => {
                    const StepIcon = steps[currentStepIndex].icon
                    return <StepIcon className="w-8 h-8 text-ocean-600 dark:text-ocean-400" />
                  })()}
                  {steps[currentStepIndex].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Indoor */}
                {currentStep === 'indoor' && (
                  <>
                    <SliderInput
                      label="Shower Duration"
                      value={formData.showerMinutes}
                      onChange={(val) => updateField('showerMinutes', val)}
                      min={1}
                      max={30}
                      unit=" min"
                    />

                    <SliderInput
                      label="Showers per Week"
                      value={formData.showersPerWeek}
                      onChange={(val) => updateField('showersPerWeek', val)}
                      min={0}
                      max={14}
                    />

                    <SliderInput
                      label="Baths per Week"
                      value={formData.bathsPerWeek}
                      onChange={(val) => updateField('bathsPerWeek', val)}
                      min={0}
                      max={7}
                    />

                    <SliderInput
                      label="Toilet Flushes per Day"
                      value={formData.toiletFlushes}
                      onChange={(val) => updateField('toiletFlushes', val)}
                      min={1}
                      max={15}
                    />

                    <SliderInput
                      label="Dishwasher Loads per Week"
                      value={formData.dishwasherLoads}
                      onChange={(val) => updateField('dishwasherLoads', val)}
                      min={0}
                      max={14}
                    />

                    <ToggleButton
                      label="I also hand-wash dishes daily"
                      value={formData.handwashDishes}
                      onChange={(val) => updateField('handwashDishes', val)}
                    />

                    <SliderInput
                      label="Laundry Loads per Week"
                      value={formData.laundryLoads}
                      onChange={(val) => updateField('laundryLoads', val)}
                      min={0}
                      max={10}
                    />
                  </>
                )}

                {/* Outdoor */}
                {currentStep === 'outdoor' && (
                  <>
                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Lawn Size</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['none', 'small', 'medium', 'large'] as const).map((size) => (
                          <OptionButton
                            key={size}
                            selected={formData.lawnSize === size}
                            onClick={() => updateField('lawnSize', size)}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </OptionButton>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Garden Size</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['none', 'small', 'medium', 'large'] as const).map((size) => (
                          <OptionButton
                            key={size}
                            selected={formData.gardenSize === size}
                            onClick={() => updateField('gardenSize', size)}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </OptionButton>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Pool</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['none', 'small', 'large'] as const).map((size) => (
                          <OptionButton
                            key={size}
                            selected={formData.poolSize === size}
                            onClick={() => updateField('poolSize', size)}
                          >
                            {size === 'none' ? 'No Pool' : size.charAt(0).toUpperCase() + size.slice(1)}
                          </OptionButton>
                        ))}
                      </div>
                    </div>

                    <SliderInput
                      label="Car Washes per Month"
                      value={formData.carWashes}
                      onChange={(val) => updateField('carWashes', val)}
                      min={0}
                      max={10}
                    />

                    <ToggleButton
                      label="I harvest rainwater for outdoor use"
                      value={formData.rainwaterHarvest}
                      onChange={(val) => updateField('rainwaterHarvest', val)}
                    />
                  </>
                )}

                {/* Diet */}
                {currentStep === 'diet' && (
                  <>
                    <div className="p-4 rounded-xl bg-ocean-50 dark:bg-ocean-900/30 border-2 border-ocean-200 dark:border-ocean-800">
                      <p className="text-sm font-medium text-ocean-700 dark:text-ocean-300">
                        <strong>Virtual Water:</strong> The hidden water used to produce food.
                        Beef requires 1,800 gallons per serving - 10x more than chicken!
                      </p>
                    </div>

                    <SliderInput
                      label="Beef Servings per Week"
                      value={formData.beefServings}
                      onChange={(val) => updateField('beefServings', val)}
                      min={0}
                      max={14}
                      helpText="~1,800 gallons per serving"
                    />

                    <SliderInput
                      label="Pork Servings per Week"
                      value={formData.porkServings}
                      onChange={(val) => updateField('porkServings', val)}
                      min={0}
                      max={14}
                      helpText="~720 gallons per serving"
                    />

                    <SliderInput
                      label="Chicken Servings per Week"
                      value={formData.chickenServings}
                      onChange={(val) => updateField('chickenServings', val)}
                      min={0}
                      max={14}
                      helpText="~518 gallons per serving"
                    />

                    <SliderInput
                      label="Dairy Servings per Week"
                      value={formData.dairyServings}
                      onChange={(val) => updateField('dairyServings', val)}
                      min={0}
                      max={28}
                      helpText="Milk, cheese, yogurt - ~65 gal/serving"
                    />

                    <SliderInput
                      label="Cups of Coffee per Week"
                      value={formData.coffeeServings}
                      onChange={(val) => updateField('coffeeServings', val)}
                      min={0}
                      max={35}
                      helpText="~37 gallons per cup"
                    />
                  </>
                )}

                {/* Lifestyle */}
                {currentStep === 'lifestyle' && (
                  <>
                    <SliderInput
                      label="New Clothing Items per Year"
                      value={formData.newClothes}
                      onChange={(val) => updateField('newClothes', val)}
                      min={0}
                      max={100}
                      helpText="Each item uses ~700 gallons to produce"
                    />

                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Paper Usage</label>
                      <p className="text-sm text-earth-600 dark:text-sand-400">
                        Includes printing, paper towels, napkins, etc.
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {(['low', 'medium', 'high'] as const).map((level) => (
                          <OptionButton
                            key={level}
                            selected={formData.paperUsage === level}
                            onClick={() => updateField('paperUsage', level)}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t-2 border-sand-200 dark:border-earth-700">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStepIndex === 0}
                    className="font-bold"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button onClick={nextStep} className="font-bold bg-ocean-500 hover:bg-ocean-600">
                    {currentStepIndex === steps.length - 1 ? 'Calculate Results' : 'Next'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Results */
            <div className="space-y-8">
              {/* Main Result */}
              <Card className="border-4 border-ocean-400 dark:border-ocean-600 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-ocean-500 to-moss-500 p-8 text-white text-center">
                  <h2 className="text-2xl font-bold mb-2">Your Daily Water Footprint</h2>
                  <div className="text-8xl font-black mb-2">{footprint.total.toLocaleString()}</div>
                  <div className="text-2xl font-bold">gallons per day</div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="text-5xl">{rating.emoji}</span>
                    <div>
                      <div className={`text-3xl font-black text-${rating.color}-600 dark:text-${rating.color}-400`}>
                        {rating.label}
                      </div>
                      <div className="text-earth-600 dark:text-sand-400 font-medium">
                        {footprint.total <= globalAverage
                          ? "You're below the global average!"
                          : footprint.total <= usAverage
                          ? "Below US average, room to improve"
                          : "Higher than average - let's reduce it!"}
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-xl bg-ocean-50 dark:bg-ocean-900/30 border-2 border-ocean-200 dark:border-ocean-800 text-center">
                      <Droplet className="w-10 h-10 text-ocean-500 mx-auto mb-2" />
                      <div className="text-3xl font-black text-ocean-600 dark:text-ocean-400">
                        {footprint.direct}
                      </div>
                      <div className="font-bold text-earth-700 dark:text-sand-300">Direct Usage</div>
                      <div className="text-sm text-earth-500 dark:text-sand-500">Showers, toilets, lawn, etc.</div>
                    </div>
                    <div className="p-6 rounded-xl bg-moss-50 dark:bg-moss-900/30 border-2 border-moss-200 dark:border-moss-800 text-center">
                      <Waves className="w-10 h-10 text-moss-500 mx-auto mb-2" />
                      <div className="text-3xl font-black text-moss-600 dark:text-moss-400">
                        {footprint.virtual}
                      </div>
                      <div className="font-bold text-earth-700 dark:text-sand-300">Virtual Water</div>
                      <div className="text-sm text-earth-500 dark:text-sand-500">Hidden in food & products</div>
                    </div>
                  </div>

                  {/* Comparison Bars */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-ocean-700 dark:text-ocean-400">Your Footprint</span>
                        <span>{footprint.total.toLocaleString()} gal/day</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((footprint.total / usAverage) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-moss-700 dark:text-moss-400">Global Average</span>
                        <span>{globalAverage.toLocaleString()} gal/day</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-moss-500 to-moss-600 rounded-full"
                          style={{ width: `${(globalAverage / usAverage) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-terra-700 dark:text-terra-400">US Average</span>
                        <span>{usAverage.toLocaleString()} gal/day</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-terra-500 to-terra-600 rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-4 border-moss-300 dark:border-moss-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-earth-900 dark:text-sand-100 flex items-center gap-3">
                    <TrendingDown className="w-8 h-8 text-moss-600" />
                    Ways to Reduce Your Footprint
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {getRecommendations().map((rec, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-sand-50 dark:bg-earth-800 border-2 border-sand-200 dark:border-earth-700"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-moss-100 dark:bg-moss-900 flex items-center justify-center flex-shrink-0">
                            <rec.icon className="w-6 h-6 text-moss-600 dark:text-moss-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-earth-900 dark:text-sand-100">{rec.title}</h4>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                rec.impact === 'High'
                                  ? 'bg-ocean-100 text-ocean-700 dark:bg-ocean-900 dark:text-ocean-400'
                                  : rec.impact === 'Medium'
                                  ? 'bg-moss-100 text-moss-700 dark:bg-moss-900 dark:text-moss-400'
                                  : 'bg-sand-200 text-earth-600 dark:bg-earth-700 dark:text-sand-400'
                              }`}>
                                {rec.impact} Impact
                              </span>
                            </div>
                            <p className="text-sm text-earth-600 dark:text-sand-400">{rec.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setShowResults(false)} variant="outline" className="font-bold">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Adjust Answers
                </Button>
                <Link href="/learn/modules/water-conservation">
                  <Button className="font-bold w-full sm:w-auto bg-ocean-500 hover:bg-ocean-600">
                    <Droplet className="w-5 h-5 mr-2" />
                    Learn Water Conservation
                  </Button>
                </Link>
              </div>

              {/* Fun Fact */}
              <Card className="border-2 border-ocean-300 dark:border-ocean-700 bg-ocean-50 dark:bg-ocean-900/30">
                <CardContent className="p-6 text-center">
                  <Waves className="w-16 h-16 text-ocean-600 dark:text-ocean-400 mx-auto mb-4" />
                  <p className="text-xl font-bold text-earth-800 dark:text-sand-200">
                    Your annual water footprint equals approximately
                  </p>
                  <p className="text-5xl font-black text-ocean-600 dark:text-ocean-400 my-4">
                    {Math.round((footprint.total * 365) / 18000)} swimming pools
                  </p>
                  <p className="text-earth-600 dark:text-sand-400">
                    (Based on an average 18,000-gallon pool)
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
