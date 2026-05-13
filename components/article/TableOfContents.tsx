'use client'

/**
 * Auto-generated table of contents for long-form articles. Parses the
 * article's HTML body for <h2> / <h3> tags, slugs them, and renders a
 * sticky sidebar list that highlights the current section as the user
 * scrolls (IntersectionObserver). Smooth scroll on click.
 *
 * Idempotent on the body: in addition to rendering the TOC, the
 * component also patches the rendered article DOM so each heading
 * receives a matching id="..." attribute the first time TOC mounts.
 * This means the body content stored in the DB doesn't need pre-baked
 * IDs and existing articles work without re-saving.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ListOrdered, ChevronDown, ChevronUp } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  /** Rendered HTML body of the article. Same string that MarkdownContent renders. */
  body: string
}

const slugify = (raw: string): string =>
  raw
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export function TableOfContents({ body }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Parse headings out of the body HTML. Done once per body change.
  const items = useMemo<TocItem[]>(() => {
    if (!body) return []
    const re = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi
    const seen = new Set<string>()
    const out: TocItem[] = []
    let m: RegExpExecArray | null
    while ((m = re.exec(body)) !== null) {
      const text = m[2].replace(/<[^>]+>/g, '').trim()
      if (!text) continue
      let id = slugify(text)
      if (!id) continue
      // De-dupe slugs by appending -2, -3, etc.
      let n = 2
      let candidate = id
      while (seen.has(candidate)) {
        candidate = `${id}-${n++}`
      }
      seen.add(candidate)
      out.push({ id: candidate, text, level: m[1] === '2' ? 2 : 3 })
    }
    return out
  }, [body])

  // After the body renders, patch each heading element with the matching
  // id attribute so anchor jumps / IntersectionObserver work. Uses the
  // same ordering as the parser so slugs line up exactly.
  useEffect(() => {
    if (items.length === 0) return
    const article = document.querySelector('.article-content')
    if (!article) return
    const headings = Array.from(article.querySelectorAll('h2, h3'))
    headings.forEach((el, i) => {
      const item = items[i]
      if (!item) return
      if (!el.id) el.id = item.id
      el.setAttribute('data-toc-target', '1')
    })
  }, [items])

  // Highlight the section currently in view. We treat the closest
  // visible heading to the top of the viewport as "active".
  useEffect(() => {
    if (items.length === 0) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0.1 }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [items])

  const onJump = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    // Offset to clear sticky headers
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  // Don't render for very short articles — TOC only makes sense for
  // long reads with multiple sections.
  if (items.length < 3) return null

  return (
    <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
      <CardHeader className="pb-3">
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-between text-left"
        >
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-theme-primary" />
            In this article
            <span className="text-xs font-medium text-theme-muted">
              ({items.length})
            </span>
          </CardTitle>
          {expanded ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
        </button>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <nav aria-label="Table of contents">
            <ul className="space-y-1.5 text-sm">
              {items.map(item => (
                <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => onJump(item.id, e)}
                    className={`block py-1 leading-snug rounded transition-colors ${
                      activeId === item.id
                        ? 'text-theme-primary font-bold'
                        : 'text-theme-muted hover:text-theme-foreground'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      )}
    </Card>
  )
}
