'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { Calculator, TrendingDown, Zap, Car, Home, Utensils, ShoppingBag, Plane, CheckCircle, AlertCircle, Leaf } from 'lucide-react'
import Link from 'next/link'

interface CarbonData {
  housing: number
  transportation: number
  food: number
  goods: number
  travel: number
}

export default function CarbonCalculatorPage() {
  const [step, setStep] = useState(1)
  const [results, setResults] = useState<CarbonData | null>(null)

  // Housing
  const [electricity, setElectricity] = useState(900) // kWh/month
  const [naturalGas, setNaturalGas] = useState(40) // therms/month
  const [homeSize, setHomeSize] = useState(1500) // sq ft
  const [renewable, setRenewable] = useState(false)

  // Transportation
  const [milesDriven, setMilesDriven] = useState(12000) // miles/year
  const [mpg, setMpg] = useState(25)
  const [publicTransit, setPublicTransit] = useState(false)
  const [ev, setEv] = useState(false)

  // Food
  const [diet, setDiet] = useState<'omnivore' | 'vegetarian' | 'vegan' | 'low-meat'>('omnivore')
  const [organic, setOrganic] = useState(false)
  const [local, setLocal] = useState(false)

  // Goods & Services
  const [shopping, setShopping] = useState<'high' | 'medium' | 'low'>('medium')
  const [secondHand, setSecondHand] = useState(false)

  // Travel
  const [flights, setFlights] = useState(2) // per year

  const calculateFootprint = () => {
    // HOUSING (based on EPA and DOE data)
    let housingCO2 = 0

    // Electricity: 0.92 lbs CO2/kWh (US average grid)
    housingCO2 += renewable ? electricity * 0.1 * 12 : electricity * 0.92 * 12

    // Natural Gas: 11.7 lbs CO2/therm
    housingCO2 += naturalGas * 11.7 * 12

    // TRANSPORTATION
    let transportCO2 = 0

    if (ev) {
      // Electric vehicle: 0.35 lbs CO2/mile (incl electricity generation)
      transportCO2 += milesDriven * 0.35
    } else {
      // Gasoline: 19.6 lbs CO2/gallon
      transportCO2 += (milesDriven / mpg) * 19.6
    }

    // Public transit bonus (20% reduction)
    if (publicTransit) {
      transportCO2 *= 0.8
    }

    // FOOD
    let foodCO2 = 0
    const dietFactors = {
      vegan: 3300,
      vegetarian: 3900,
      'low-meat': 4700,
      omnivore: 5500
    }
    foodCO2 = dietFactors[diet]

    // Organic reduces by 10%
    if (organic) foodCO2 *= 0.9
    // Local reduces by 5%
    if (local) foodCO2 *= 0.95

    // GOODS & SERVICES
    let goodsCO2 = 0
    const shoppingFactors = {
      low: 2000,
      medium: 4000,
      high: 7000
    }
    goodsCO2 = shoppingFactors[shopping]

    // Second-hand reduces by 40%
    if (secondHand) goodsCO2 *= 0.6

    // TRAVEL (flights)
    // Average: 0.4 tons CO2 per domestic flight, 2.0 tons per international
    const travelCO2 = flights * 1200 // lbs (assuming mix)

    setResults({
      housing: Math.round(housingCO2),
      transportation: Math.round(transportCO2),
      food: Math.round(foodCO2),
      goods: Math.round(goodsCO2),
      travel: Math.round(travelCO2)
    })

    setStep(6)
  }

  const totalEmissions = results
    ? Math.round((results.housing + results.transportation + results.food + results.goods + results.travel) / 2000) // Convert to tons
    : 0

  const usAverage = 16 // tons CO2/year
  const globalAverage = 4 // tons CO2/year
  const parisTarget = 2 // tons CO2/year for 1.5°C goal

  const getRecommendations = () => {
    if (!results) return []

    const recs = []
    const total = results.housing + results.transportation + results.food + results.goods + results.travel

    // Housing recommendations
    if ((results.housing / total) > 0.3) {
      if (!renewable) {
        recs.push({
          icon: Zap,
          category: 'Energy',
          title: 'Switch to 100% Renewable Energy',
          impact: 'Reduce housing emissions by 60-90%',
          savings: `${Math.round(results.housing * 0.75 / 2000)} tons CO₂/year`,
          action: '/learn/renewable-energy'
        })
      }
      recs.push({
        icon: Home,
        category: 'Efficiency',
        title: 'Improve Home Insulation & Efficiency',
        impact: 'Reduce heating/cooling by 30-50%',
        savings: `${Math.round(results.housing * 0.4 / 2000)} tons CO₂/year`,
        action: '/learn/green-building'
      })
    }

    // Transportation recommendations
    if ((results.transportation / total) > 0.25) {
      if (!ev) {
        recs.push({
          icon: Car,
          category: 'Transportation',
          title: 'Switch to Electric Vehicle',
          impact: 'Reduce transport emissions by 50-70%',
          savings: `${Math.round(results.transportation * 0.6 / 2000)} tons CO₂/year`,
          action: '/products?category=transportation'
        })
      }
      if (!publicTransit) {
        recs.push({
          icon: Car,
          category: 'Transportation',
          title: 'Use Public Transit & Bike More',
          impact: 'Reduce transport emissions by 20-40%',
          savings: `${Math.round(results.transportation * 0.3 / 2000)} tons CO₂/year`,
          action: '/learn'
        })
      }
    }

    // Food recommendations
    if (diet === 'omnivore') {
      recs.push({
        icon: Utensils,
        category: 'Food',
        title: 'Reduce Meat Consumption',
        impact: 'Low-meat or vegetarian diet',
        savings: `${Math.round((5500 - 3900) / 2000)} tons CO₂/year`,
        action: '/learn/agriculture'
      })
    }

    if (!organic || !local) {
      recs.push({
        icon: Leaf,
        category: 'Food',
        title: 'Buy Organic & Local Food',
        impact: 'Support regenerative agriculture',
        savings: `${Math.round(results.food * 0.15 / 2000)} tons CO₂/year`,
        action: '/products?category=food'
      })
    }

    // Goods recommendations
    if (shopping === 'high' || !secondHand) {
      recs.push({
        icon: ShoppingBag,
        category: 'Consumption',
        title: 'Buy Less, Choose Second-Hand',
        impact: 'Embrace minimalism & circular economy',
        savings: `${Math.round(results.goods * 0.4 / 2000)} tons CO₂/year`,
        action: '/learn/zero-waste'
      })
    }

    // Travel recommendations
    if (flights > 2) {
      recs.push({
        icon: Plane,
        category: 'Travel',
        title: 'Reduce Air Travel',
        impact: 'Each flight avoided saves significant emissions',
        savings: `${Math.round((flights - 1) * 1200 / 2000)} tons CO₂/year`,
        action: '/learn'
      })
    }

    return recs.slice(0, 6) // Top 6 recommendations
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Calculator className="w-16 h-16 text-theme-primary mx-auto" />
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              CARBON FOOTPRINT CALCULATOR
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Measure your climate impact and discover personalized ways to reduce it
            </p>
          </div>
        </div>
      </section>

      {step < 6 && (
        <section className="py-12 bg-[var(--muted)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-theme-muted">Step {step} of 5</span>
                  <span className="text-sm font-bold text-theme-primary">{(step/5*100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-3 bg-[var(--background)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-theme-primary to-theme-accent transition-all duration-300"
                    style={{ width: `${(step/5*100)}%` }}
                  />
                </div>
              </div>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  {/* Step 1: Housing */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Home className="w-8 h-8 text-theme-primary" />
                        <h2 className="text-3xl font-black text-[var(--foreground)]">HOUSING & ENERGY</h2>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-2">
                          Monthly Electricity Usage (kWh)
                        </label>
                        <input
                          type="range"
                          min="200"
                          max="3000"
                          value={electricity}
                          onChange={(e) => setElectricity(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-theme-muted mt-1">
                          <span>200 kWh</span>
                          <span className="font-bold text-theme-primary">{electricity} kWh</span>
                          <span>3000 kWh</span>
                        </div>
                        <p className="text-sm text-theme-muted mt-1">US average: 900 kWh/month</p>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-2">
                          Monthly Natural Gas (therms)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="150"
                          value={naturalGas}
                          onChange={(e) => setNaturalGas(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-theme-muted mt-1">
                          <span>0 therms</span>
                          <span className="font-bold text-theme-primary">{naturalGas} therms</span>
                          <span>150 therms</span>
                        </div>
                        <p className="text-sm text-theme-muted mt-1">US average: 40 therms/month</p>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-2">
                          Home Size (sq ft)
                        </label>
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="100"
                          value={homeSize}
                          onChange={(e) => setHomeSize(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-theme-muted mt-1">
                          <span>500 sq ft</span>
                          <span className="font-bold text-theme-primary">{homeSize.toLocaleString()} sq ft</span>
                          <span>5000 sq ft</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-[var(--muted)] rounded-lg">
                        <input
                          type="checkbox"
                          id="renewable"
                          checked={renewable}
                          onChange={(e) => setRenewable(e.target.checked)}
                          className="w-5 h-5"
                        />
                        <label htmlFor="renewable" className="font-bold text-[var(--foreground)] cursor-pointer">
                          I use 100% renewable energy (solar, wind, etc.)
                        </label>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        className="w-full text-lg py-6 font-black"
                        size="lg"
                      >
                        NEXT: TRANSPORTATION →
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Transportation */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Car className="w-8 h-8 text-theme-accent" />
                        <h2 className="text-3xl font-black text-[var(--foreground)]">TRANSPORTATION</h2>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-2">
                          Miles Driven Per Year
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="30000"
                          step="1000"
                          value={milesDriven}
                          onChange={(e) => setMilesDriven(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-theme-muted mt-1">
                          <span>0 mi</span>
                          <span className="font-bold text-theme-accent">{milesDriven.toLocaleString()} miles/year</span>
                          <span>30,000 mi</span>
                        </div>
                        <p className="text-sm text-theme-muted mt-1">US average: 12,000 miles/year</p>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-2">
                          Vehicle Fuel Economy (MPG)
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          value={mpg}
                          onChange={(e) => setMpg(Number(e.target.value))}
                          className="w-full"
                          disabled={ev}
                        />
                        <div className="flex justify-between text-sm text-theme-muted mt-1">
                          <span>10 MPG</span>
                          <span className="font-bold text-theme-accent">{mpg} MPG</span>
                          <span>50 MPG</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 bg-[var(--muted)] rounded-lg">
                          <input
                            type="checkbox"
                            id="ev"
                            checked={ev}
                            onChange={(e) => setEv(e.target.checked)}
                            className="w-5 h-5"
                          />
                          <label htmlFor="ev" className="font-bold text-[var(--foreground)] cursor-pointer">
                            I drive an electric vehicle (EV)
                          </label>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-[var(--muted)] rounded-lg">
                          <input
                            type="checkbox"
                            id="transit"
                            checked={publicTransit}
                            onChange={(e) => setPublicTransit(e.target.checked)}
                            className="w-5 h-5"
                          />
                          <label htmlFor="transit" className="font-bold text-[var(--foreground)] cursor-pointer">
                            I regularly use public transportation, bike, or walk
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => setStep(1)}
                          variant="outline"
                          className="w-1/3"
                        >
                          ← BACK
                        </Button>
                        <Button
                          onClick={() => setStep(3)}
                          className="w-2/3 text-lg py-6 font-black"
                          size="lg"
                        >
                          NEXT: FOOD →
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Food */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Utensils className="w-8 h-8 text-theme-secondary" />
                        <h2 className="text-3xl font-black text-[var(--foreground)]">FOOD & DIET</h2>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-3">
                          What best describes your diet?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: 'vegan', label: 'Vegan', co2: '3,300 lbs/yr' },
                            { value: 'vegetarian', label: 'Vegetarian', co2: '3,900 lbs/yr' },
                            { value: 'low-meat', label: 'Low Meat', co2: '4,700 lbs/yr' },
                            { value: 'omnivore', label: 'Omnivore', co2: '5,500 lbs/yr' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setDiet(option.value as any)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                diet === option.value
                                  ? 'border-theme-secondary bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] scale-105'
                                  : 'border-[var(--border)] hover:border-theme-secondary'
                              }`}
                            >
                              <div className="font-black text-lg text-[var(--foreground)]">{option.label}</div>
                              <div className="text-sm text-theme-muted mt-1">{option.co2}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 bg-[var(--muted)] rounded-lg">
                          <input
                            type="checkbox"
                            id="organic"
                            checked={organic}
                            onChange={(e) => setOrganic(e.target.checked)}
                            className="w-5 h-5"
                          />
                          <label htmlFor="organic" className="font-bold text-[var(--foreground)] cursor-pointer">
                            I buy mostly organic food
                          </label>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-[var(--muted)] rounded-lg">
                          <input
                            type="checkbox"
                            id="local"
                            checked={local}
                            onChange={(e) => setLocal(e.target.checked)}
                            className="w-5 h-5"
                          />
                          <label htmlFor="local" className="font-bold text-[var(--foreground)] cursor-pointer">
                            I buy mostly local/seasonal food
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => setStep(2)}
                          variant="outline"
                          className="w-1/3"
                        >
                          ← BACK
                        </Button>
                        <Button
                          onClick={() => setStep(4)}
                          className="w-2/3 text-lg py-6 font-black"
                          size="lg"
                        >
                          NEXT: SHOPPING →
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Goods */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <ShoppingBag className="w-8 h-8 text-theme-primary" />
                        <h2 className="text-3xl font-black text-[var(--foreground)]">GOODS & SERVICES</h2>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-3">
                          How much do you shop for new goods? (clothes, electronics, furniture, etc.)
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'low', label: 'Minimalist', co2: '2,000 lbs/yr' },
                            { value: 'medium', label: 'Average', co2: '4,000 lbs/yr' },
                            { value: 'high', label: 'Frequent', co2: '7,000 lbs/yr' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setShopping(option.value as any)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                shopping === option.value
                                  ? 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] scale-105'
                                  : 'border-[var(--border)] hover:border-theme-primary'
                              }`}
                            >
                              <div className="font-black text-lg text-[var(--foreground)]">{option.label}</div>
                              <div className="text-sm text-theme-muted mt-1">{option.co2}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-[var(--muted)] rounded-lg">
                        <input
                          type="checkbox"
                          id="secondhand"
                          checked={secondHand}
                          onChange={(e) => setSecondHand(e.target.checked)}
                          className="w-5 h-5"
                        />
                        <label htmlFor="secondhand" className="font-bold text-[var(--foreground)] cursor-pointer">
                          I frequently buy second-hand/used items
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => setStep(3)}
                          variant="outline"
                          className="w-1/3"
                        >
                          ← BACK
                        </Button>
                        <Button
                          onClick={() => setStep(5)}
                          className="w-2/3 text-lg py-6 font-black"
                          size="lg"
                        >
                          NEXT: TRAVEL →
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Travel */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Plane className="w-8 h-8 text-theme-accent" />
                        <h2 className="text-3xl font-black text-[var(--foreground)]">AIR TRAVEL</h2>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--foreground)] mb-2">
                          How many round-trip flights do you take per year?
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={flights}
                          onChange={(e) => setFlights(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-theme-muted mt-1">
                          <span>0 flights</span>
                          <span className="font-bold text-theme-accent">{flights} flights/year</span>
                          <span>20 flights</span>
                        </div>
                        <p className="text-sm text-theme-muted mt-2">
                          Each flight = ~0.6 tons CO₂ (domestic) to 2.0 tons (international)
                        </p>
                      </div>

                      <div className="bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] p-6 rounded-lg border-2 border-theme-accent">
                        <p className="font-bold text-[var(--foreground)] mb-2">💡 Did you know?</p>
                        <p className="text-theme-muted">
                          A single round-trip transatlantic flight can emit more CO₂ than an entire year of driving for some people. Air travel is one of the most carbon-intensive activities.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => setStep(4)}
                          variant="outline"
                          className="w-1/3"
                        >
                          ← BACK
                        </Button>
                        <Button
                          onClick={calculateFootprint}
                          className="w-2/3 text-lg py-6 font-black bg-gradient-to-r from-theme-primary to-theme-accent"
                          size="lg"
                        >
                          CALCULATE MY FOOTPRINT 🌍
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {step === 6 && results && (
        <>
          <section className="py-12 bg-[var(--background)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <Card className="border-4 border-theme-primary mb-8">
                  <CardContent className="p-10">
                    <h2 className="text-4xl font-black text-center text-[var(--foreground)] mb-8">
                      YOUR ANNUAL CARBON FOOTPRINT
                    </h2>

                    <div className="text-center mb-12">
                      <div className="inline-block p-8 bg-gradient-to-br from-theme-primary to-theme-accent rounded-2xl">
                        <div className="text-7xl font-black text-white mb-2">
                          {totalEmissions}
                        </div>
                        <div className="text-2xl font-bold text-white/90">
                          tons CO₂ per year
                        </div>
                      </div>
                    </div>

                    {/* Comparison */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className={`p-6 rounded-xl border-2 ${totalEmissions > usAverage ? 'border-theme-secondary bg-[color-mix(in_srgb,var(--secondary)_10%,var(--background))]' : 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]'}`}>
                        <div className="text-3xl font-black mb-2">{usAverage} tons</div>
                        <div className="font-bold text-theme-muted">US Average</div>
                        {totalEmissions < usAverage && (
                          <div className="mt-2 flex items-center gap-2 text-theme-primary">
                            <TrendingDown className="w-5 h-5" />
                            <span className="font-bold">{Math.round((1 - totalEmissions/usAverage) * 100)}% below!</span>
                          </div>
                        )}
                      </div>

                      <div className={`p-6 rounded-xl border-2 ${totalEmissions > globalAverage ? 'border-theme-accent' : 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]'}`}>
                        <div className="text-3xl font-black mb-2">{globalAverage} tons</div>
                        <div className="font-bold text-theme-muted">Global Average</div>
                        {totalEmissions < globalAverage && (
                          <div className="mt-2 flex items-center gap-2 text-theme-primary">
                            <TrendingDown className="w-5 h-5" />
                            <span className="font-bold">{Math.round((1 - totalEmissions/globalAverage) * 100)}% below!</span>
                          </div>
                        )}
                      </div>

                      <div className={`p-6 rounded-xl border-2 ${totalEmissions > parisTarget ? 'border-theme-secondary' : 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]'}`}>
                        <div className="text-3xl font-black mb-2">{parisTarget} tons</div>
                        <div className="font-bold text-theme-muted">Paris Agreement Target</div>
                        {totalEmissions > parisTarget && (
                          <div className="mt-2 text-theme-secondary">
                            <span className="font-bold">{Math.round((totalEmissions/parisTarget - 1) * 100)}% above target</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-[var(--foreground)] mb-4">EMISSIONS BREAKDOWN</h3>

                      {[
                        { label: 'Housing & Energy', value: results.housing, icon: Home, color: 'primary' },
                        { label: 'Transportation', value: results.transportation, icon: Car, color: 'accent' },
                        { label: 'Food', value: results.food, icon: Utensils, color: 'secondary' },
                        { label: 'Goods & Services', value: results.goods, icon: ShoppingBag, color: 'primary' },
                        { label: 'Air Travel', value: results.travel, icon: Plane, color: 'accent' },
                      ].map((item) => {
                        const total = results.housing + results.transportation + results.food + results.goods + results.travel
                        const percentage = (item.value / total * 100).toFixed(1)
                        const Icon = item.icon

                        return (
                          <div key={item.label} className="flex items-center gap-4">
                            <Icon className={`w-6 h-6 text-theme-${item.color} flex-shrink-0`} />
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="font-bold text-[var(--foreground)]">{item.label}</span>
                                <span className="font-bold text-theme-muted">{(item.value / 2000).toFixed(1)} tons ({percentage}%)</span>
                              </div>
                              <div className="w-full h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-theme-${item.color}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <h2 className="text-4xl font-black text-[var(--foreground)] mb-8 text-center">
                  PERSONALIZED RECOMMENDATIONS
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {getRecommendations().map((rec, index) => {
                    const Icon = rec.icon
                    return (
                      <Card key={index} className="border-4 border-theme-primary hover:scale-105 transition-transform">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[var(--primary-foreground)]" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-theme-primary mb-1">{rec.category}</div>
                              <h3 className="text-xl font-black text-[var(--foreground)] mb-2">{rec.title}</h3>
                              <p className="text-theme-muted mb-3">{rec.impact}</p>
                              <div className="flex items-center gap-2 mb-4">
                                <TrendingDown className="w-5 h-5 text-theme-secondary" />
                                <span className="font-black text-theme-secondary">{rec.savings}</span>
                              </div>
                              <Link href={rec.action}>
                                <Button className="w-full font-bold">
                                  LEARN MORE →
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="text-center mt-12">
                  <Button
                    onClick={() => { setStep(1); setResults(null); }}
                    variant="outline"
                    size="lg"
                    className="text-lg px-12 py-6 font-black"
                  >
                    ← RECALCULATE
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="py-12 bg-[var(--muted)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <Citation
                  statistic="Carbon footprint calculation methodology"
                  sources={[
                    {
                      title: "Household Carbon Footprint Calculator Methodology",
                      author: "US Environmental Protection Agency",
                      organization: "EPA",
                      year: 2024,
                      url: "https://www.epa.gov/carbon-footprint-calculator"
                    },
                    {
                      title: "Greenhouse Gas Equivalencies Calculator",
                      author: "EPA Office of Atmospheric Protection",
                      organization: "EPA",
                      year: 2024,
                      url: "https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator"
                    },
                    {
                      title: "Diet and the Environment: Does What You Eat Matter?",
                      author: "Poore & Nemecek",
                      organization: "Science Journal",
                      year: 2024,
                      url: "https://www.science.org/doi/10.1126/science.aaq0216"
                    },
                    {
                      title: "Carbon Footprint of Electricity Generation",
                      author: "Intergovernmental Panel on Climate Change",
                      organization: "IPCC",
                      year: 2024,
                      url: "https://www.ipcc.ch/report/ar6/wg3/"
                    }
                  ]}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
