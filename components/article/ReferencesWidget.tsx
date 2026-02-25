'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChevronDown, ChevronUp, ExternalLink, Link as LinkIcon, BookOpen } from 'lucide-react'

interface Reference {
  id: string
  title: string
  url?: string | null
  description?: string
  authors?: string | null
  year?: string | null
  publisher?: string | null
  format?: string | null
}

interface ReferencesWidgetProps {
  references?: Reference[]
  articleContent?: string
}

// Extract URLs from markdown/HTML content
function extractLinksFromContent(content: string): Reference[] {
  if (!content) return []

  const links: Reference[] = []
  const seenUrls = new Set<string>()

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  let match

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const [, title, url] = match
    if (!seenUrls.has(url)) {
      seenUrls.add(url)
      links.push({
        id: `extracted-${links.length}`,
        title: title || getDomainFromUrl(url),
        url: url
      })
    }
  }

  // Match HTML links: <a href="url">text</a>
  const htmlLinkRegex = /<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi

  while ((match = htmlLinkRegex.exec(content)) !== null) {
    const [, url, title] = match
    if (!seenUrls.has(url)) {
      seenUrls.add(url)
      links.push({
        id: `extracted-${links.length}`,
        title: title || getDomainFromUrl(url),
        url: url
      })
    }
  }

  // Match plain URLs that aren't already captured
  const plainUrlRegex = /(?<!["\(])https?:\/\/[^\s<>\[\]"'\)]+/g

  while ((match = plainUrlRegex.exec(content)) !== null) {
    const url = match[0].replace(/[.,;:!?]+$/, '') // Remove trailing punctuation
    if (!seenUrls.has(url)) {
      seenUrls.add(url)
      links.push({
        id: `extracted-${links.length}`,
        title: getDomainFromUrl(url),
        url: url
      })
    }
  }

  return links
}

// Get a readable title from URL domain
function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace('www.', '')
    // Capitalize first letter of each part
    return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)
  } catch {
    return 'External Link'
  }
}

// Get favicon for a URL
function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
  } catch {
    return ''
  }
}

export function ReferencesWidget({ references = [], articleContent }: ReferencesWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Combine manual references with extracted links from content
  const allReferences = useMemo(() => {
    const manualRefs = references || []
    const extractedLinks = articleContent ? extractLinksFromContent(articleContent) : []

    // Filter out extracted links that match manual references
    const manualUrls = new Set(manualRefs.map(r => r.url).filter(Boolean))
    const uniqueExtracted = extractedLinks.filter(link => !manualUrls.has(link.url))

    return [...manualRefs, ...uniqueExtracted]
  }, [references, articleContent])

  if (allReferences.length === 0) {
    return null
  }

  const displayedRefs = isExpanded ? allReferences : allReferences.slice(0, 3)
  const hasMore = allReferences.length > 3

  return (
    <Card className="border-4 border-[var(--border)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-[var(--foreground)]">
          <BookOpen className="w-4 h-4 text-theme-primary" />
          Works Cited ({allReferences.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-theme-muted mb-3">
          Sources and references used in this article
        </p>

        {displayedRefs.map((ref, index) => {
          // Only allow http/https URLs — block javascript:, data:, vbscript: etc.
          const isSafeUrl = ref.url && ref.url.trim().length > 0 && /^https?:\/\//i.test(ref.url.trim())
          const Wrapper = isSafeUrl ? 'a' : 'div'
          const wrapperProps = isSafeUrl
            ? { href: ref.url!, target: '_blank', rel: 'noopener noreferrer' }
            : {}

          // Build description from structured fields if no description provided
          const description = ref.description
            || [ref.authors, ref.year ? `(${ref.year})` : '', ref.publisher].filter(Boolean).join(' ') || ''

          return (
            <Wrapper
              key={ref.id || index}
              {...wrapperProps}
              className="flex items-start gap-3 p-3 bg-[var(--muted)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors group"
            >
              {/* Icon */}
              <div className="w-6 h-6 rounded bg-[var(--background)] flex items-center justify-center flex-shrink-0 mt-0.5">
                {isSafeUrl ? (
                  <>
                    <img
                      src={getFaviconUrl(ref.url!)}
                      alt=""
                      className="w-4 h-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <LinkIcon className="w-3 h-3 text-theme-muted absolute" />
                  </>
                ) : (
                  <BookOpen className="w-3 h-3 text-theme-muted" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[var(--foreground)] group-hover:text-theme-primary line-clamp-1">
                  {ref.title}
                </p>
                {isSafeUrl && (
                  <p className="text-xs text-theme-muted truncate mt-0.5">
                    {getDomainFromUrl(ref.url!)}
                  </p>
                )}
                {description && (
                  <p className="text-xs text-theme-muted mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
                {ref.format && (
                  <span className="inline-block text-xs px-1.5 py-0.5 bg-[var(--primary)]/20 text-[var(--primary)] rounded mt-1">
                    {ref.format}
                  </span>
                )}
              </div>

              {isSafeUrl && (
                <ExternalLink className="w-4 h-4 text-theme-muted group-hover:text-theme-primary flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Wrapper>
          )
        })}

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-theme-primary hover:text-theme-accent transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show All ({allReferences.length}) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}
