import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getComparisonSetById, getComparisonSetIds } from '@/lib/architecture/comparisonSets'
import ArchitectureComparison from '@/components/architecture/comparison/ArchitectureComparison'

interface Props {
  params: {
    setId: string
  }
}

export async function generateStaticParams() {
  const setIds = getComparisonSetIds()
  return setIds.map((setId) => ({
    setId,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comparisonSet = getComparisonSetById(params.setId)

  if (!comparisonSet) {
    return {
      title: 'Comparison Not Found',
    }
  }

  return {
    title: `${comparisonSet.title} | Architecture Comparison`,
    description: comparisonSet.description || comparisonSet.subtitle,
  }
}

export default function SpecificComparisonPage({ params }: Props) {
  const comparisonSet = getComparisonSetById(params.setId)

  if (!comparisonSet) {
    notFound()
  }

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
            <Link href="/architecture/compare" className="hover:text-foreground transition-colors">
              Compare
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{comparisonSet.title}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{comparisonSet.title}</h1>
              <p className="text-muted-foreground mt-1">{comparisonSet.subtitle}</p>
            </div>
            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
              comparisonSet.difficulty === 'beginner'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : comparisonSet.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {comparisonSet.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Component */}
      <div className="container py-8">
        <ArchitectureComparison comparisonSet={comparisonSet} />
      </div>

      {/* Back to Compare */}
      <div className="container pb-8">
        <Link
          href="/architecture/compare"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          ← Back to all comparisons
        </Link>
      </div>
    </div>
  )
}
