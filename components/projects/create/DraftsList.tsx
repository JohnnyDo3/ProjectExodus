'use client'

/**
 * Lightweight resumable-drafts list shown above the Step 0 picker.
 * Auto-resumes the most recent draft via the parent's onResume callback,
 * which inspects the draft and routes to the brainstorm panel or wizard
 * pre-fill as appropriate.
 */

import { useEffect, useState } from 'react'
import { Clock, FileText, MessageSquareText, Sparkles, Trash2, ChevronDown } from 'lucide-react'

interface DraftSummary {
  id: string
  title: string
  path: 'BLANK' | 'PASTE' | 'BRAINSTORM' | 'HYBRID'
  originalPlanFilename: string | null
  chatMessageCount: number
  draftAttempts: number
  createdAt: string
  updatedAt: string
}

interface DraftsListProps {
  onResume: (draftId: string) => void
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const min = 60_000, hr = 60 * min, day = 24 * hr
  if (diff < min) return 'just now'
  if (diff < hr) return `${Math.round(diff / min)}m ago`
  if (diff < day) return `${Math.round(diff / hr)}h ago`
  if (diff < 7 * day) return `${Math.round(diff / day)}d ago`
  return new Date(iso).toLocaleDateString()
}

function pathLabel(p: DraftSummary['path']): { label: string; Icon: React.ElementType } {
  switch (p) {
    case 'PASTE': return { label: 'From plan', Icon: FileText }
    case 'BRAINSTORM': return { label: 'Brainstorm', Icon: MessageSquareText }
    case 'HYBRID': return { label: 'Plan + chat', Icon: Sparkles }
    default: return { label: 'Blank', Icon: Clock }
  }
}

export default function DraftsList({ onResume }: DraftsListProps) {
  const [drafts, setDrafts] = useState<DraftSummary[] | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects/drafts')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (!cancelled) setDrafts(data.drafts ?? []) })
      .catch(() => { if (!cancelled) setDrafts([]) })
    return () => { cancelled = true }
  }, [])

  const discard = async (id: string) => {
    if (!confirm('Discard this draft?')) return
    try {
      const res = await fetch(`/api/projects/drafts/${id}`, { method: 'DELETE' })
      if (res.ok) setDrafts(d => d?.filter(x => x.id !== id) ?? [])
    } catch {}
  }

  if (!drafts || drafts.length === 0) return null

  const [latest, ...rest] = drafts

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8">
      <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <DraftRow draft={latest} onResume={onResume} onDiscard={discard} highlighted />
        {rest.length > 0 && (
          <>
            <button
              onClick={() => setExpanded(e => !e)}
              className="w-full flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-wider text-theme-muted hover:bg-[var(--background)] border-t border-[var(--border)]"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              {expanded ? 'Hide' : `Show ${rest.length} more draft${rest.length === 1 ? '' : 's'}`}
            </button>
            {expanded && rest.map(d => (
              <DraftRow key={d.id} draft={d} onResume={onResume} onDiscard={discard} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function DraftRow({
  draft, onResume, onDiscard, highlighted,
}: {
  draft: DraftSummary
  onResume: (id: string) => void
  onDiscard: (id: string) => void
  highlighted?: boolean
}) {
  const { label, Icon } = pathLabel(draft.path)
  return (
    <div className={`flex items-center gap-3 px-4 py-3 border-t border-[var(--border)] first:border-t-0 ${highlighted ? 'bg-[var(--primary)]/5' : ''}`}>
      <Icon className={`w-4 h-4 shrink-0 ${highlighted ? 'text-theme-primary' : 'text-theme-muted'}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm truncate">{draft.title || 'Untitled draft'}</span>
          {highlighted && (
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-theme-primary text-black shrink-0">
              Latest
            </span>
          )}
        </div>
        <div className="text-xs text-theme-muted mt-0.5">
          {label}
          {draft.originalPlanFilename ? ` · ${draft.originalPlanFilename}` : ''}
          {draft.chatMessageCount > 0 ? ` · ${draft.chatMessageCount} messages` : ''}
          {' · '}
          {relativeTime(draft.updatedAt)}
        </div>
      </div>
      <button
        onClick={() => onResume(draft.id)}
        className="text-xs font-black px-3 py-1.5 rounded-lg bg-theme-primary text-black"
      >
        Resume
      </button>
      <button
        onClick={() => onDiscard(draft.id)}
        className="p-1.5 text-theme-muted hover:text-red-500"
        aria-label="Discard draft"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
