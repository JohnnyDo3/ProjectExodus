'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Car, Home, Plane, ShoppingBag, Utensils, Zap,
  Droplet, Recycle, TreePine, ChevronRight, ChevronLeft,
  Calculator, Leaf, TrendingDown, Award, Target, Info
} from 'lucide-react'
import Link from 'next/link'

type Category = 'transportation' | 'home' | 'food' | 'shopping' | 'results'

interface FormData {
  // Transportation
  carMiles: number
  carType: 'gas' | 'hybrid' | 'electric' | 'none'
  flightsShort: number
  flightsLong: number
  publicTransit: number

  // Home Energy
  electricityBill: number
  gasBill: number
  homeSize: 'small' | 'medium' | 'large'
  renewableEnergy: number

  // Food
  dietType: 'meat-heavy' | 'average' | 'vegetarian' | 'vegan'
  localFood: number
  foodWaste: 'high' | 'medium' | 'low'

  // Shopping
  newClothes: number
  electronics: number
  recyclePercent: number
}

const initialData: FormData = {
  carMiles: 0,
  carType: 'gas',
  flightsShort: 0,
  flightsLong: 0,
  publicTransit: 0,
  electricityBill: 100,
  gasBill: 50,
  homeSize: 'medium',
  renewableEnergy: 0,
  dietType: 'average',
  localFood: 20,
  foodWaste: 'medium',
  newClothes: 20,
  electronics: 2,
  recyclePercent: 30
}

export default function CarbonCalculatorPage() {
  const [currentStep, setCurrentStep] = useState<Category>('transportation')
  const [formData, setFormData] = useState<FormData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const steps: { id: Category; title: string; icon: any }[] = [
    { id: 'transportation', title: 'Transportation', icon: Car },
    { id: 'home', title: 'Home Energy', icon: Home },
    { id: 'food', title: 'Food & Diet', icon: Utensils },
    { id: 'shopping', title: 'Shopping', icon: ShoppingBag },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = () => {
    let total = 0

    // Transportation (tons CO2/year)
    const carFactors = { gas: 0.404, hybrid: 0.257, electric: 0.1, none: 0 }
    total += (formData.carMiles * 52 * carFactors[formData.carType]) / 1000
    total += formData.flightsShort * 0.255 // Short flights ~255kg CO2
    total += formData.flightsLong * 1.5 // Long flights ~1.5 tons CO2
    total += (formData.publicTransit * 52 * 0.089) / 1000

    // Home Energy
    total += (formData.electricityBill * 12 * 0.0004) // ~0.4kg CO2 per kWh
    total += (formData.gasBill * 12 * 0.005) // ~5kg CO2 per therm
    const homeSizeFactors = { small: 0.8, medium: 1, large: 1.3 }
    total *= homeSizeFactors[formData.homeSize]
    total *= (1 - formData.renewableEnergy / 100 * 0.5)

    // Food
    const dietFactors = { 'meat-heavy': 3.3, average: 2.5, vegetarian: 1.7, vegan: 1.5 }
    let foodFootprint = dietFactors[formData.dietType]
    foodFootprint *= (1 - formData.localFood / 100 * 0.1)
    const wasteFactors = { high: 1.2, medium: 1, low: 0.85 }
    foodFootprint *= wasteFactors[formData.foodWaste]
    total += foodFootprint

    // Shopping
    total += formData.newClothes * 0.025 // ~25kg CO2 per item
    total += formData.electronics * 0.3 // ~300kg CO2 per device
    total *= (1 - formData.recyclePercent / 100 * 0.05)

    return Math.round(total * 10) / 10
  }

  const footprint = calculateFootprint()
  const usAverage = 16 // US average is about 16 tons CO2/year
  const globalAverage = 4.5 // Global average
  const sustainableTarget = 2 // Paris Agreement target

  const getFootprintRating = () => {
    if (footprint <= sustainableTarget) return { label: 'Excellent', color: 'moss', emoji: '🌟' }
    if (footprint <= globalAverage) return { label: 'Good', color: 'ocean', emoji: '👍' }
    if (footprint <= usAverage * 0.7) return { label: 'Average', color: 'terra', emoji: '📊' }
    return { label: 'High', color: 'red', emoji: '⚠️' }
  }

  const rating = getFootprintRating()

  const getRecommendations = () => {
    const recs = []

    if (formData.carType === 'gas' && formData.carMiles > 100) {
      recs.push({
        title: 'Consider an Electric Vehicle',
        desc: 'Switching to an EV could save up to 4.6 tons of CO2 annually',
        impact: 'High',
        icon: Car
      })
    }

    if (formData.flightsLong > 2) {
      recs.push({
        title: 'Reduce Long-Haul Flights',
        desc: 'One less international flight saves ~1.5 tons of CO2',
        impact: 'High',
        icon: Plane
      })
    }

    if (formData.renewableEnergy < 50) {
      recs.push({
        title: 'Switch to Renewable Energy',
        desc: 'Green energy plans can reduce your home emissions by 50%+',
        impact: 'High',
        icon: Zap
      })
    }

    if (formData.dietType === 'meat-heavy' || formData.dietType === 'average') {
      recs.push({
        title: 'Reduce Meat Consumption',
        desc: 'Going vegetarian 3 days/week saves ~0.5 tons CO2 annually',
        impact: 'Medium',
        icon: Utensils
      })
    }

    if (formData.recyclePercent < 50) {
      recs.push({
        title: 'Improve Recycling Habits',
        desc: 'Recycling and composting can significantly reduce waste emissions',
        impact: 'Medium',
        icon: Recycle
      })
    }

    if (formData.localFood < 30) {
      recs.push({
        title: 'Buy Local & Seasonal',
        desc: 'Local food reduces transportation emissions and supports community',
        impact: 'Low',
        icon: Leaf
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
        <span className="text-2xl font-black text-moss-600 dark:text-moss-400">
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
        className="w-full h-3 bg-sand-200 dark:bg-earth-700 rounded-lg appearance-none cursor-pointer accent-moss-500"
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
          ? 'bg-moss-500 text-white shadow-lg scale-105'
          : 'bg-sand-100 dark:bg-earth-700 text-earth-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-earth-600'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-moss-50 via-sand-50 to-ocean-50 dark:from-earth-900 dark:via-earth-800 dark:to-earth-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-moss-600 to-ocean-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Calculator className="w-6 h-6" />
              <span className="font-bold">INTERACTIVE TOOL</span>
            </div>
            <h1 className="text-5xl font-black mb-4">CARBON FOOTPRINT CALCULATOR</h1>
            <p className="text-xl font-medium text-moss-100">
              Discover your environmental impact and get personalized tips to reduce it
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
                        ? 'bg-moss-500 text-white shadow-lg'
                        : i < currentStepIndex
                        ? 'bg-moss-200 dark:bg-moss-800 text-moss-700 dark:text-moss-300'
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
            <Card className="border-4 border-moss-300 dark:border-moss-700 shadow-2xl">
              <CardHeader className="border-b-2 border-sand-200 dark:border-earth-700">
                <CardTitle className="text-2xl font-black text-earth-900 dark:text-sand-100 flex items-center gap-3">
                  {(() => {
                    const StepIcon = steps[currentStepIndex].icon
                    return <StepIcon className="w-8 h-8 text-moss-600 dark:text-moss-400" />
                  })()}
                  {steps[currentStepIndex].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Transportation */}
                {currentStep === 'transportation' && (
                  <>
                    <SliderInput
                      label="Weekly Car Miles"
                      value={formData.carMiles}
                      onChange={(val) => updateField('carMiles', val)}
                      min={0}
                      max={500}
                      unit=" mi"
                      helpText="Average miles you drive per week"
                    />

                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Vehicle Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['none', 'electric', 'hybrid', 'gas'] as const).map((type) => (
                          <OptionButton
                            key={type}
                            selected={formData.carType === type}
                            onClick={() => updateField('carType', type)}
                          >
                            {type === 'none' ? 'No Car' : type.charAt(0).toUpperCase() + type.slice(1)}
                          </OptionButton>
                        ))}
                      </div>
                    </div>

                    <SliderInput
                      label="Short Flights per Year"
                      value={formData.flightsShort}
                      onChange={(val) => updateField('flightsShort', val)}
                      min={0}
                      max={20}
                      helpText="Flights under 3 hours"
                    />

                    <SliderInput
                      label="Long Flights per Year"
                      value={formData.flightsLong}
                      onChange={(val) => updateField('flightsLong', val)}
                      min={0}
                      max={10}
                      helpText="International/cross-country flights"
                    />

                    <SliderInput
                      label="Public Transit (hours/week)"
                      value={formData.publicTransit}
                      onChange={(val) => updateField('publicTransit', val)}
                      min={0}
                      max={40}
                      unit=" hrs"
                    />
                  </>
                )}

                {/* Home Energy */}
                {currentStep === 'home' && (
                  <>
                    <SliderInput
                      label="Monthly Electricity Bill"
                      value={formData.electricityBill}
                      onChange={(val) => updateField('electricityBill', val)}
                      min={0}
                      max={500}
                      unit="$"
                    />

                    <SliderInput
                      label="Monthly Gas Bill"
                      value={formData.gasBill}
                      onChange={(val) => updateField('gasBill', val)}
                      min={0}
                      max={300}
                      unit="$"
                    />

                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Home Size</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['small', 'medium', 'large'] as const).map((size) => (
                          <OptionButton
                            key={size}
                            selected={formData.homeSize === size}
                            onClick={() => updateField('homeSize', size)}
                          >
                            {size === 'small' ? 'Small (<1000 sqft)' : size === 'medium' ? 'Medium' : 'Large (>2000 sqft)'}
                          </OptionButton>
                        ))}
                      </div>
                    </div>

                    <SliderInput
                      label="Renewable Energy %"
                      value={formData.renewableEnergy}
                      onChange={(val) => updateField('renewableEnergy', val)}
                      min={0}
                      max={100}
                      unit="%"
                      helpText="Percentage of electricity from renewable sources"
                    />
                  </>
                )}

                {/* Food */}
                {currentStep === 'food' && (
                  <>
                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Diet Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {([
                          { value: 'vegan', label: 'Vegan' },
                          { value: 'vegetarian', label: 'Vegetarian' },
                          { value: 'average', label: 'Average (some meat)' },
                          { value: 'meat-heavy', label: 'Meat-Heavy' }
                        ] as const).map((diet) => (
                          <OptionButton
                            key={diet.value}
                            selected={formData.dietType === diet.value}
                            onClick={() => updateField('dietType', diet.value)}
                          >
                            {diet.label}
                          </OptionButton>
                        ))}
                      </div>
                    </div>

                    <SliderInput
                      label="Local/Seasonal Food %"
                      value={formData.localFood}
                      onChange={(val) => updateField('localFood', val)}
                      min={0}
                      max={100}
                      unit="%"
                      helpText="How much of your food is locally sourced"
                    />

                    <div className="space-y-3">
                      <label className="font-bold text-earth-800 dark:text-sand-200">Food Waste Level</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['low', 'medium', 'high'] as const).map((level) => (
                          <OptionButton
                            key={level}
                            selected={formData.foodWaste === level}
                            onClick={() => updateField('foodWaste', level)}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Shopping */}
                {currentStep === 'shopping' && (
                  <>
                    <SliderInput
                      label="New Clothing Items per Year"
                      value={formData.newClothes}
                      onChange={(val) => updateField('newClothes', val)}
                      min={0}
                      max={100}
                      helpText="Including shoes, accessories"
                    />

                    <SliderInput
                      label="New Electronics per Year"
                      value={formData.electronics}
                      onChange={(val) => updateField('electronics', val)}
                      min={0}
                      max={10}
                      helpText="Phones, laptops, tablets, etc."
                    />

                    <SliderInput
                      label="Recycling Rate"
                      value={formData.recyclePercent}
                      onChange={(val) => updateField('recyclePercent', val)}
                      min={0}
                      max={100}
                      unit="%"
                      helpText="How much of your waste do you recycle/compost"
                    />
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
                  <Button onClick={nextStep} className="font-bold">
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
              <Card className="border-4 border-moss-400 dark:border-moss-600 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-moss-500 to-ocean-500 p-8 text-white text-center">
                  <h2 className="text-2xl font-bold mb-2">Your Annual Carbon Footprint</h2>
                  <div className="text-8xl font-black mb-2">{footprint}</div>
                  <div className="text-2xl font-bold">tons of CO2</div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="text-5xl">{rating.emoji}</span>
                    <div>
                      <div className={`text-3xl font-black text-${rating.color}-600 dark:text-${rating.color}-400`}>
                        {rating.label}
                      </div>
                      <div className="text-earth-600 dark:text-sand-400 font-medium">
                        {footprint <= globalAverage
                          ? "You're below the global average!"
                          : footprint <= usAverage
                          ? "Below US average, room to improve"
                          : "Higher than average - let's reduce it!"}
                      </div>
                    </div>
                  </div>

                  {/* Comparison Bars */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-moss-700 dark:text-moss-400">Your Footprint</span>
                        <span>{footprint} tons</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-moss-500 to-moss-600 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((footprint / usAverage) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-ocean-700 dark:text-ocean-400">Global Average</span>
                        <span>{globalAverage} tons</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-full"
                          style={{ width: `${(globalAverage / usAverage) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-terra-700 dark:text-terra-400">US Average</span>
                        <span>{usAverage} tons</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-terra-500 to-terra-600 rounded-full w-full" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-moss-700 dark:text-moss-400">Sustainable Target</span>
                        <span>{sustainableTarget} tons</span>
                      </div>
                      <div className="h-4 bg-sand-200 dark:bg-earth-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-moss-400 to-moss-500 rounded-full"
                          style={{ width: `${(sustainableTarget / usAverage) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-4 border-ocean-300 dark:border-ocean-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-earth-900 dark:text-sand-100 flex items-center gap-3">
                    <TrendingDown className="w-8 h-8 text-ocean-600" />
                    Personalized Recommendations
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
                          <div className="w-12 h-12 rounded-xl bg-ocean-100 dark:bg-ocean-900 flex items-center justify-center flex-shrink-0">
                            <rec.icon className="w-6 h-6 text-ocean-600 dark:text-ocean-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-earth-900 dark:text-sand-100">{rec.title}</h4>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                rec.impact === 'High'
                                  ? 'bg-moss-100 text-moss-700 dark:bg-moss-900 dark:text-moss-400'
                                  : rec.impact === 'Medium'
                                  ? 'bg-ocean-100 text-ocean-700 dark:bg-ocean-900 dark:text-ocean-400'
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
                <Link href="/learn">
                  <Button className="font-bold w-full sm:w-auto">
                    <Leaf className="w-5 h-5 mr-2" />
                    Learn to Reduce Your Footprint
                  </Button>
                </Link>
              </div>

              {/* Trees Equivalent */}
              <Card className="border-2 border-moss-300 dark:border-moss-700 bg-moss-50 dark:bg-moss-900/30">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-16 h-16 text-moss-600 dark:text-moss-400 mx-auto mb-4" />
                  <p className="text-xl font-bold text-earth-800 dark:text-sand-200">
                    To offset your footprint, you'd need to plant approximately
                  </p>
                  <p className="text-5xl font-black text-moss-600 dark:text-moss-400 my-4">
                    {Math.round(footprint * 45)} trees
                  </p>
                  <p className="text-earth-600 dark:text-sand-400">
                    Or reduce your emissions by making sustainable choices every day
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
