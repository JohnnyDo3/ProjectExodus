'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getAllComparisonSets, getComparisonSetsByCategory, type ComparisonSet } from '@/lib/architecture/comparisonSets'
import ArchitectureComparison from '@/components/architecture/comparison/ArchitectureComparison'
import { greekColumnsComparison, bracingTypesComparison } from '@/lib/architecture/comparisonSets'
import { HardHat, Building2, Columns3, Church, Shield } from 'lucide-react'

// Category tabs for filtering
const categoryTabs = [
  { id: 'all', name: 'All Sets', icon: Building2 },
  { id: 'structural', name: 'Structural Engineering', icon: HardHat },
  { id: 'columns', name: 'Columns', icon: Columns3 },
  { id: 'arches', name: 'Arches', icon: Church },
  { id: 'windows', name: 'Windows', icon: Shield },
]

export default function CompareMainPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all')
  const [displayedSets, setDisplayedSets] = useState<ComparisonSet[]>([])

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  useEffect(() => {
    if (activeCategory === 'all') {
      setDisplayedSets(getAllComparisonSets())
    } else {
      setDisplayedSets(getComparisonSetsByCategory(activeCategory as ComparisonSet['category']))
    }
  }, [activeCategory])

  // Get default comparison based on category
  const defaultComparison = activeCategory === 'structural' ? bracingTypesComparison : greekColumnsComparison
  const defaultTitle = activeCategory === 'structural'
    ? 'Featured: Bracing Systems'
    : 'Featured: The Three Greek Orders'
  const defaultDescription = activeCategory === 'structural'
    ? 'Start here with lateral force resisting systems - essential for earthquake and wind engineering'
    : 'Start here with the most fundamental comparison in Classical architecture'

  return (
    <div className="min-h-screen bg-background">
      {/* Header with breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Compare</span>
            {activeCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-primary font-medium capitalize">{activeCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold">
            {activeCategory === 'structural' ? 'Structural Engineering' : 'Compare Architectural Elements'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {activeCategory === 'structural'
              ? 'Learn bracing, trusses, foundations, and load types through interactive comparisons'
              : 'Learn to distinguish similar elements through side-by-side comparison'}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b bg-muted/10">
        <div className="container py-3">
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeCategory === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Comparison Set Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {displayedSets.map((set) => (
            <Link
              key={set.id}
              href={`/architecture/compare/${set.id}`}
              className="block group"
            >
              <div className="border-2 rounded-lg p-6 hover:border-primary transition-all hover:shadow-md h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {set.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {set.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      set.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : set.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {set.difficulty}
                    </span>
                  </div>
                </div>

                {set.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {set.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    {set.elements.length} elements
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {set.features.length} features
                  </span>
                </div>

                <div className="mt-4 text-sm text-primary group-hover:underline">
                  Start comparison →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Default: Show featured comparison based on category */}
        <div className="border-t pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{defaultTitle}</h2>
            <p className="text-muted-foreground">
              {defaultDescription}
            </p>
          </div>
          <ArchitectureComparison comparisonSet={defaultComparison} />
        </div>
      </div>
    </div>
  )
}
