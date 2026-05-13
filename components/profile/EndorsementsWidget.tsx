'use client'

/**
 * LinkedIn-style skill endorsements. Renders the profile owner's
 * expertise list, each chip carrying an endorsement count and a
 * one-click toggle for the signed-in viewer to endorse / unendorse.
 *
 * Mounted on the public profile page in place of the plain Expertise
 * chip list. Self-suppresses for viewers who aren't signed in (they
 * see counts only). The owner sees the list but the endorse button
 * is hidden on their own profile.
 */

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Sparkles, ThumbsUp, Loader2 } from 'lucide-react'

interface SkillRow {
  skill: string
  count: number
  endorsedByMe: boolean
}

interface EndorsementsWidgetProps {
  userId: string
  isOwnProfile: boolean
}

export function EndorsementsWidget({ userId, isOwnProfile }: EndorsementsWidgetProps) {
  const { data: session } = useSession()
  const [rows, setRows] = useState<SkillRow[] | null>(null)
  const [pending, setPending] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/profile/${userId}/endorsements`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (!cancelled) setRows(data.skills ?? []) })
      .catch(() => { if (!cancelled) setRows([]) })
    return () => { cancelled = true }
  }, [userId])

  if (rows === null) {
    return (
      <Card className="border-4 border-theme-primary/40">
        <CardContent className="p-4 flex items-center gap-2 text-sm text-theme-muted">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading endorsements…
        </CardContent>
      </Card>
    )
  }
  if (rows.length === 0) return null

  const toggle = async (skill: string) => {
    if (!session?.user?.id) return
    if (isOwnProfile) return
    setPending(skill)
    try {
      const res = await fetch(`/api/profile/${userId}/endorsements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill }),
      })
      if (!res.ok) throw new Error('failed')
      const data = await res.json()
      setRows(prev =>
        (prev ?? []).map(r =>
          r.skill === skill
            ? { ...r, endorsedByMe: !!data.endorsedByMe, count: data.count ?? r.count }
            : r,
        ),
      )
    } catch {
      // silent — UI doesn't shift, user can retry
    } finally {
      setPending(null)
    }
  }

  const canEndorse = !!session?.user?.id && !isOwnProfile

  return (
    <Card className="border-4 border-theme-primary/40">
      <CardContent className="p-4">
        <h2 className="text-sm font-black mb-3 text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-theme-primary" />
          Expertise
        </h2>
        <ul className="space-y-2">
          {rows.map(({ skill, count, endorsedByMe }) => (
            <li key={skill} className="flex items-center gap-2">
              <span className="flex-1 px-2 py-1 bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] text-[var(--primary-foreground)] rounded-lg font-bold text-xs shadow-theme-md">
                {skill}
              </span>
              {canEndorse ? (
                <button
                  onClick={() => toggle(skill)}
                  disabled={pending === skill}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border-2 transition-colors ${
                    endorsedByMe
                      ? 'bg-theme-primary text-[var(--primary-foreground)] border-theme-primary'
                      : 'bg-[var(--background)] text-theme-primary border-theme-primary/40 hover:border-theme-primary'
                  } disabled:opacity-50`}
                  title={endorsedByMe ? 'Remove endorsement' : 'Endorse this skill'}
                  aria-pressed={endorsedByMe}
                >
                  {pending === skill ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <ThumbsUp className="w-3 h-3" fill={endorsedByMe ? 'currentColor' : 'none'} />
                  )}
                  <span className="tabular-nums">{count}</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-theme-muted border-2 border-transparent">
                  <ThumbsUp className="w-3 h-3" />
                  <span className="tabular-nums">{count}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
