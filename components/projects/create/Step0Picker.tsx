'use client'

/**
 * Step 0 of the create-initiative wizard. Lets the user choose how to
 * start: from a pasted plan / uploaded file, by brainstorming with Sage,
 * or with a blank form (today's behavior).
 *
 * On a successful "paste/upload" extraction, calls onPlanExtracted with
 * the structured fields Sage produced. The parent then pre-fills the
 * existing 6-step form and advances to step 1.
 */

import { useRef, useState } from 'react'
import { Sparkles, FileText, Upload, MessageSquareText, Forward, Loader2, AlertTriangle, ArrowRight } from 'lucide-react'
import type { ExtractedFields } from '@/lib/projects/ai/extractedFieldsSchema'

interface Step0PickerProps {
  /** Called once the parent should advance to step 1. */
  onSkip: () => void
  /** Sage extracted fields from the pasted plan. */
  onPlanExtracted: (fields: ExtractedFields, draftId: string) => void
  /** Called when the user picks the brainstorm path. */
  onBrainstormPlaceholder?: () => void
}

type Mode = 'choose' | 'paste'

// Generous client cap. Server-side belt-and-suspenders ceiling sits at
// 250k in the extract-plan route's zod schema.
const MAX_PASTE_CHARS = 120_000
const MIN_PASTE_CHARS = 40

export default function Step0Picker({
  onSkip,
  onPlanExtracted,
  onBrainstormPlaceholder,
}: Step0PickerProps) {
  const [mode, setMode] = useState<Mode>('choose')
  const [planText, setPlanText] = useState('')
  const [filename, setFilename] = useState<string | null>(null)
  const [parsing, setParsing] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [truncated, setTruncated] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const charCount = planText.length
  const tooShort = charCount > 0 && charCount < MIN_PASTE_CHARS
  const tooLong = charCount > MAX_PASTE_CHARS

  const handleFile = async (file: File) => {
    setError(null)
    setFilename(file.name)
    setParsing(true)
    try {
      const ext = file.name.split('.').pop()?.toLowerCase()
      const endpoint =
        ext === 'pdf' ? '/api/articles/parse-pdf' :
        ext === 'docx' || ext === 'doc' ? '/api/articles/parse-docx' :
        null
      if (!endpoint) {
        throw new Error('Only PDF or DOCX files are supported. For other formats, paste the text directly.')
      }
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(endpoint, { method: 'POST', body: fd })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Couldn't parse ${file.name}`)
      }
      const data = await res.json()
      const text: string = data.text || ''
      if (text.length < MIN_PASTE_CHARS) {
        throw new Error('That file didn\'t contain enough readable text. Try pasting the contents directly.')
      }
      setPlanText(text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'File parsing failed')
      setFilename(null)
    } finally {
      setParsing(false)
    }
  }

  const handleExtract = async () => {
    if (charCount < MIN_PASTE_CHARS || charCount > MAX_PASTE_CHARS) return
    setError(null)
    setExtracting(true)
    setTruncated(false)
    try {
      // 1) Create a draft to attach the extraction to.
      const draftRes = await fetch('/api/projects/drafts', { method: 'POST' })
      if (!draftRes.ok) {
        const body = await draftRes.json().catch(() => ({}))
        throw new Error(body.error || 'Couldn\'t start a draft')
      }
      const { draft } = await draftRes.json()

      // 2) Run extraction.
      const extractRes = await fetch(`/api/projects/drafts/${draft.id}/extract-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planText, filename: filename ?? undefined }),
      })
      if (!extractRes.ok) {
        const body = await extractRes.json().catch(() => ({}))
        throw new Error(body.error || 'Sage couldn\'t extract from that plan')
      }
      const data = await extractRes.json()
      if (data.truncated) setTruncated(true)
      onPlanExtracted(data.extractedFields as ExtractedFields, draft.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Extraction failed')
    } finally {
      setExtracting(false)
    }
  }

  if (mode === 'paste') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <button
          onClick={() => { setMode('choose'); setError(null) }}
          className="text-sm text-theme-muted hover:text-theme-foreground"
        >
          ← Back
        </button>

        <div>
          <h2 className="text-3xl font-black mb-2">Paste your plan</h2>
          <p className="text-theme-muted">
            Sage will read your business plan, LCA, outline, or any other document
            describing your initiative and pre-fill the form for you.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={parsing || extracting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border-2 border-theme-primary/40 hover:border-theme-primary text-sm font-bold disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {filename ? `Replace file (${filename})` : 'Upload PDF or DOCX'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
                e.target.value = ''
              }}
              className="hidden"
            />
            {parsing && (
              <span className="inline-flex items-center gap-2 text-sm text-theme-muted">
                <Loader2 className="w-4 h-4 animate-spin" /> Reading file…
              </span>
            )}
          </div>

          <textarea
            value={planText}
            onChange={(e) => setPlanText(e.target.value)}
            placeholder="Paste your plan, outline, LCA, or any document about your initiative here…"
            className="w-full min-h-[280px] rounded-lg border-2 border-[var(--border)] bg-[var(--background)] p-4 text-sm font-mono leading-relaxed focus:border-theme-primary focus:outline-none"
            disabled={extracting}
          />

          <div className="flex items-center justify-between text-xs text-theme-muted">
            <span>
              {charCount.toLocaleString()} / {MAX_PASTE_CHARS.toLocaleString()} characters
              {tooShort && ' · a bit more text helps Sage extract more'}
              {tooLong && ' · over the limit — trim or upload as a file'}
            </span>
            <span>~{Math.max(1, Math.round(charCount / 1500))} pages</span>
          </div>

          {truncated && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
              <span>
                Heads up — your plan was longer than Sage can process at once. She read the first
                ~30 pages. For richer extraction on the rest, paste the most important sections directly.
              </span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onSkip}
              disabled={extracting}
              className="px-4 py-2 text-sm font-bold text-theme-muted hover:text-theme-foreground disabled:opacity-50"
            >
              Skip and start blank
            </button>
            <button
              onClick={handleExtract}
              disabled={extracting || tooShort || tooLong || charCount === 0 || parsing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-theme-primary text-black font-black text-sm disabled:opacity-50"
            >
              {extracting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sage is reading…</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Let Sage extract</>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // mode === 'choose'
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-3">Start your initiative</h1>
        <p className="text-theme-muted text-lg">
          You can give Sage something to work from, or build it from scratch.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => setMode('paste')}
          className="group p-6 text-left rounded-2xl border-2 border-[var(--border)] hover:border-theme-primary bg-[var(--card)] transition-all hover:-translate-y-0.5"
        >
          <FileText className="w-8 h-8 mb-4 text-theme-primary" />
          <h3 className="text-lg font-black mb-2">Paste a plan</h3>
          <p className="text-sm text-theme-muted leading-relaxed">
            Got a business plan, LCA, or outline? Paste it or upload as PDF / DOCX
            and Sage will fill out as much as she can.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-theme-primary">
            <Sparkles className="w-3.5 h-3.5" /> Recommended
          </div>
        </button>

        <button
          onClick={() => onBrainstormPlaceholder?.()}
          className="group p-6 text-left rounded-2xl border-2 border-[var(--border)] hover:border-theme-primary bg-[var(--card)] transition-all hover:-translate-y-0.5"
        >
          <MessageSquareText className="w-8 h-8 mb-4 text-theme-primary" />
          <h3 className="text-lg font-black mb-2">Brainstorm with Sage</h3>
          <p className="text-sm text-theme-muted leading-relaxed">
            Don't have anything written yet? Talk it out with Sage and she'll
            draft your initiative when you're ready.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-theme-primary">
            <ArrowRight className="w-3.5 h-3.5" /> Open chat
          </div>
        </button>

        <button
          onClick={onSkip}
          className="group p-6 text-left rounded-2xl border-2 border-[var(--border)] hover:border-theme-primary bg-[var(--card)] transition-all hover:-translate-y-0.5"
        >
          <Forward className="w-8 h-8 mb-4 text-theme-muted" />
          <h3 className="text-lg font-black mb-2">Start blank</h3>
          <p className="text-sm text-theme-muted leading-relaxed">
            Skip the assist and build your initiative manually using the
            existing 6-step wizard.
          </p>
        </button>
      </div>
    </div>
  )
}
