import { ExternalLink } from 'lucide-react'

interface CitationProps {
  sources: {
    title: string
    author: string
    organization: string
    year: number
    url: string
  }[]
  statistic?: string
}

export function Citation({ sources, statistic }: CitationProps) {
  return (
    <div className="mt-4 p-6 bg-[var(--muted)] border-l-4 border-theme-accent rounded-lg">
      {statistic && (
        <p className="font-bold text-sm text-theme-muted mb-3 uppercase tracking-wide">
          Sources for: "{statistic}"
        </p>
      )}
      <div className="space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-theme-primary transition-colors group"
            >
              <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 text-theme-accent group-hover:text-theme-primary" />
              <div>
                <span className="font-bold">{source.author}</span>
                {' '}({source.year}).{' '}
                <span className="italic">{source.title}</span>.{' '}
                <span className="text-theme-muted">{source.organization}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
