'use client'

/**
 * Brainstorm with Sage — the chat-driven path of Step 0.
 *
 * Layout: side panel (chat) on the right, live preview ("what Sage has
 * gathered") on the left. The user can expand the chat to a fullscreen
 * takeover. Each chat turn round-trips to /brainstorm and returns BOTH
 * Sage's reply and the latest extractedFields snapshot, which auto-saves
 * to the draft.
 *
 * "Draft my initiative" hands the latest extractedFields back to the
 * parent which then drops the user into the existing 6-step wizard.
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import {
  Sparkles, Send, Loader2, Maximize2, Minimize2, X, Check,
} from 'lucide-react'
import type { ExtractedFields } from '@/lib/projects/ai/extractedFieldsSchema'

interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
  ts?: number
}

interface BrainstormPanelProps {
  draftId: string
  onClose: () => void
  onDraftInitiative: (fields: ExtractedFields, draftId: string) => void
}

const SAGE_OPENER_FRESH: ChatTurn = {
  role: 'assistant',
  content:
    "Hey — I'm Sage. Let's design your initiative together. What are you trying to build, and what's pulling you toward it?",
}

const sageOpenerFromPlan = (name?: string): ChatTurn => ({
  role: 'assistant',
  content: name
    ? `I read your plan — ${name} sounds great. What do you want to refine or talk through?`
    : 'I read your plan. What do you want to refine or talk through?',
})

export default function BrainstormPanel({
  draftId,
  onClose,
  onDraftInitiative,
}: BrainstormPanelProps) {
  const [history, setHistory] = useState<ChatTurn[]>([])
  const [fields, setFields] = useState<ExtractedFields>({})
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [fullscreen, setFullscreen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow the textarea as the user types, capped at half the viewport
  // so the chat above stays readable. Recalculated whenever input changes.
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const cap = Math.round(window.innerHeight * 0.5)
    el.style.height = `${Math.min(el.scrollHeight, cap)}px`
  }, [input])

  // Fetch existing draft state on mount so resumed brainstorms pick up
  // exactly where they left off, and hybrid drafts (paste then chat) get
  // an opener that acknowledges the plan Sage has already read.
  useEffect(() => {
    let cancelled = false
    fetch(`/api/projects/drafts/${draftId}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (cancelled) return
        const draft = data.draft
        const existingHistory = (draft.chatHistory ?? []) as ChatTurn[]
        const existingFields = (draft.extractedFields ?? {}) as ExtractedFields
        setFields(existingFields)
        if (existingHistory.length > 0) {
          setHistory(existingHistory)
        } else {
          setHistory([
            draft.path === 'PASTE' || draft.path === 'HYBRID'
              ? sageOpenerFromPlan(existingFields.name)
              : SAGE_OPENER_FRESH,
          ])
        }
      })
      .catch(() => { if (!cancelled) setHistory([SAGE_OPENER_FRESH]) })
    return () => { cancelled = true }
  }, [draftId])

  // Auto-scroll the chat to the latest turn.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history.length, pending])

  const send = async () => {
    const trimmed = input.trim()
    if (!trimmed || pending) return
    setError(null)
    setInput('')
    const optimistic: ChatTurn = { role: 'user', content: trimmed, ts: Date.now() }
    setHistory(h => [...h, optimistic])
    setPending(true)
    try {
      const res = await fetch(`/api/projects/drafts/${draftId}/brainstorm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: trimmed }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const errorMsg = body.error || 'Sage hit a snag.'
        // Only append detail when it adds new info — when both fields
        // already carry the same friendly message, appending it would
        // produce "(X) (X)" noise.
        const detail = body?.detail && !errorMsg.includes(body.detail) && !body.detail.includes(errorMsg)
          ? ` (${body.detail})`
          : ''
        throw new Error(errorMsg + detail)
      }
      const data = await res.json()
      setHistory(h => [...h, { role: 'assistant', content: data.reply, ts: Date.now() }])
      if (data.extractedFields) setFields(data.extractedFields as ExtractedFields)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      // Roll the optimistic user message back so they can retry without losing it.
      setHistory(h => h.slice(0, -1))
      setInput(trimmed)
    } finally {
      setPending(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const hasAnyFields = useMemo(() => {
    const keys = Object.keys(fields).filter(k => k !== 'sageNotes')
    return keys.some(k => {
      const v = (fields as Record<string, unknown>)[k]
      if (v == null) return false
      if (typeof v === 'string') return v.length > 0
      if (Array.isArray(v)) return v.length > 0
      if (typeof v === 'boolean') return true
      return true
    })
  }, [fields])

  // Always cover the full viewport. The fullscreen toggle only changes
  // the relative widths of the preview vs chat columns inside.
  // z-[110] sits above the site header (z-[100] in components/layout/Header.tsx).
  const wrapperClass = 'fixed inset-0 z-[110] bg-[var(--background)] flex'

  return (
    <div className={wrapperClass}>
      {/* Live preview — left column. Hidden on small screens unless fullscreen=false. */}
      {(!fullscreen || true) && (
        <div className={`hidden md:flex flex-col bg-[var(--card)] border-r border-[var(--border)] ${fullscreen ? 'w-80' : 'flex-1'}`}>
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <span className="font-black text-sm">What Sage has so far</span>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm">
            <FieldsPreview fields={fields} hasAnyFields={hasAnyFields} />
          </div>
          <div className="p-4 border-t border-[var(--border)]">
            <button
              onClick={() => onDraftInitiative(fields, draftId)}
              disabled={!hasAnyFields || pending}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-theme-primary text-black font-black text-sm disabled:opacity-50"
            >
              <Check className="w-4 h-4" /> Draft my initiative
            </button>
            {!hasAnyFields && (
              <p className="text-[11px] text-theme-muted mt-2 text-center">
                Chat with Sage a bit and this button will light up.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Chat — right column (or full width on mobile / fullscreen). */}
      <div className={`flex-1 flex flex-col ${fullscreen ? '' : 'md:max-w-xl md:border-l md:border-[var(--border)]'}`}>
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <span className="font-black text-sm">Brainstorm with Sage</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFullscreen(f => !f)}
              className="p-2 rounded hover:bg-[var(--card)] text-theme-muted"
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-[var(--card)] text-theme-muted"
              aria-label="Close brainstorm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {history.map((t, i) => (
            <ChatBubble key={i} turn={t} />
          ))}
          {pending && (
            <div className="flex items-center gap-2 text-sm text-theme-muted">
              <Loader2 className="w-4 h-4 animate-spin" /> Sage is thinking…
            </div>
          )}
          {error && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        {/* Fullscreen-only floating Draft button so the user can finish from the takeover too. */}
        {fullscreen && (
          <div className="px-5 pb-2">
            <button
              onClick={() => onDraftInitiative(fields, draftId)}
              disabled={!hasAnyFields || pending}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-theme-primary text-black font-black text-sm disabled:opacity-50"
            >
              <Check className="w-4 h-4" /> Draft my initiative
            </button>
          </div>
        )}

        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="Tell Sage what you're thinking…"
              disabled={pending}
              style={{ maxHeight: '50vh' }}
              className="flex-1 resize-none rounded-lg border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-theme-primary focus:outline-none disabled:opacity-50 overflow-y-auto"
            />
            <button
              onClick={send}
              disabled={pending || !input.trim()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-theme-primary text-black disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ turn }: { turn: ChatTurn }) {
  const isUser = turn.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
          isUser
            ? 'bg-theme-primary text-black rounded-br-sm'
            : 'bg-[var(--card)] border border-[var(--border)] rounded-bl-sm'
        }`}
      >
        {turn.content}
      </div>
    </div>
  )
}

function FieldsPreview({ fields, hasAnyFields }: { fields: ExtractedFields; hasAnyFields: boolean }) {
  if (!hasAnyFields) {
    return (
      <div className="text-theme-muted">
        <p className="leading-relaxed">
          As you and Sage talk, the pieces of your initiative will collect here —
          name, mission, goals, sub-projects, the works.
        </p>
      </div>
    )
  }
  return (
    <>
      {fields.name && <Row label="Name" value={fields.name} />}
      {fields.tagline && <Row label="Tagline" value={fields.tagline} />}
      {fields.description && <Row label="Description" value={fields.description} multi />}
      {fields.mission && <Row label="Mission" value={fields.mission} multi />}
      {fields.goal && <Row label="Goal" value={fields.goal} multi />}
      {fields.category && <Row label="Category" value={fields.category} />}
      {fields.projectStatus && <Row label="Status" value={fields.projectStatus} />}
      {fields.theme && <Row label="Theme" value={fields.theme} />}
      {fields.tags && fields.tags.length > 0 && (
        <Row label="Tags" value={fields.tags.join(', ')} />
      )}
      {fields.subprojects && fields.subprojects.length > 0 && (
        <Row label={`Subprojects (${fields.subprojects.length})`}
          value={fields.subprojects.map(s => `• ${s.name}`).join('\n')} multi />
      )}
      {fields.mindMapNodes && fields.mindMapNodes.length > 0 && (
        <Row label={`Mind map (${fields.mindMapNodes.length} nodes)`}
          value={fields.mindMapNodes.map(n => `• ${n.label}`).join('\n')} multi />
      )}
      {fields.sageNotes && (
        <div className="mt-2 p-3 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-xs italic text-theme-muted">
          {fields.sageNotes}
        </div>
      )}
    </>
  )
}

function Row({ label, value, multi }: { label: string; value: string; multi?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-theme-muted mb-1">
        {label}
      </div>
      <div className={`text-sm ${multi ? 'whitespace-pre-wrap' : 'truncate'}`}>{value}</div>
    </div>
  )
}
