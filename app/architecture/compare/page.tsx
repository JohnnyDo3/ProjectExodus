import { Metadata } from 'next'
import Link from 'next/link'
import { getAllComparisonSets } from '@/lib/architecture/comparisonSets'
import ArchitectureComparison from '@/components/architecture/comparison/ArchitectureComparison'
import { greekColumnsComparison } from '@/lib/architecture/comparisonSets'

export const metadata: Metadata = {
  title: 'Compare Architectural Elements | Architecture Learning',
  description: 'Side-by-side comparisons of architectural elements. Learn the differences between Doric, Ionic, and Corinthian columns, different arch types, and more.',
}

export default function CompareMainPage() {
  const allSets = getAllComparisonSets()

  return (
    <div className="min-h-screen bg-background">
      {/* Header with breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/architecture/dashboard" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Compare</span>
          </div>
          <h1 className="text-3xl font-bold">Compare Architectural Elements</h1>
          <p className="text-muted-foreground mt-1">
            Learn to distinguish similar elements through side-by-side comparison
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Comparison Set Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {allSets.map((set) => (
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

        {/* Default: Show Greek Columns Comparison */}
        <div className="border-t pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Featured: The Three Greek Orders</h2>
            <p className="text-muted-foreground">
              Start here with the most fundamental comparison in Classical architecture
            </p>
          </div>
          <ArchitectureComparison comparisonSet={greekColumnsComparison} />
        </div>
      </div>
    </div>
  )
}
