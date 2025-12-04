'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChevronDown, ChevronUp, ExternalLink, Link as LinkIcon } from 'lucide-react'

interface Reference {
  id: string
  title: string
  url: string
  description?: string
}

interface ReferencesWidgetProps {
  references: Reference[]
}

export function ReferencesWidget({ references }: ReferencesWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!references || references.length === 0) {
    return null
  }

  const displayedRefs = isExpanded ? references : references.slice(0, 3)
  const hasMore = references.length > 3

  return (
    <Card className="border-4 border-ocean-300 dark:border-ocean-700 dark:bg-earth-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-earth-900 dark:text-sand-100">
          <LinkIcon className="w-4 h-4 text-ocean-600 dark:text-ocean-400" />
          References ({references.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedRefs.map((ref, index) => (
          <a
            key={ref.id || index}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-ocean-50 dark:bg-earth-700 hover:bg-ocean-100 dark:hover:bg-earth-600 rounded-lg transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-ocean-800 dark:text-ocean-300 group-hover:text-ocean-600 dark:group-hover:text-ocean-200 line-clamp-2">
                  {ref.title}
                </p>
                {ref.description && (
                  <p className="text-xs text-earth-600 dark:text-sand-400 mt-1 line-clamp-2">
                    {ref.description}
                  </p>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-ocean-500 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
            </div>
          </a>
        ))}

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-ocean-600 dark:text-ocean-400 hover:text-ocean-800 dark:hover:text-ocean-300 transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show All ({references.length}) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}
