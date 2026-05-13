'use client'

/**
 * Step 2 of post-signup onboarding: the lightweight digital ID /
 * business card. Intentionally minimal — just five fields readers
 * actually care about: photo, headline, bio, location, interests.
 * Everything else (guardian archetype, declaration, social links,
 * phone, etc.) lives in the full Settings page for later.
 *
 * "Skip" routes to the welcome page; "Save & continue" PATCHes the
 * fields the user filled in and then routes there.
 */

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Upload, MapPin, User as UserIcon, Sparkles, Tag, Loader2 } from 'lucide-react'

const MAX_BIO = 600
const MAX_HEADLINE = 120
const MAX_LOCATION = 80
const MAX_INTERESTS = 10

export default function ProfileOnboardingPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const userId = session?.user?.id

  const [image, setImage] = useState<string | null>(null)
  const [headline, setHeadline] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [interestsRaw, setInterestsRaw] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/signin?callbackUrl=/onboarding/profile')
  }, [status, router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Use a JPEG, PNG, or WebP image.')
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5 MB.')
      e.target.value = ''
      return
    }
    setError(null)
    setUploading(true)
    try {
      const reader = new FileReader()
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, folder: 'avatars' }),
      })
      const data = await res.json()
      if (!data.success || !data.data?.url) {
        throw new Error(data.error || 'Image upload failed.')
      }
      setImage(data.data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const saveAndContinue = async () => {
    if (!userId) return
    setSaving(true)
    setError(null)
    try {
      // Only send fields the user actually filled in.
      const update: Record<string, unknown> = {}
      if (image) update.image = image
      if (headline.trim()) update.headline = headline.trim().slice(0, MAX_HEADLINE)
      if (bio.trim()) update.bio = bio.trim().slice(0, MAX_BIO)
      if (location.trim()) update.location = location.trim().slice(0, MAX_LOCATION)
      const interests = interestsRaw
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .slice(0, MAX_INTERESTS)
      if (interests.length > 0) update.interests = interests

      if (Object.keys(update).length > 0) {
        const res = await fetch(`/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || 'Couldn\'t save your profile.')
        }
      }
      router.push('/onboarding/welcome')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.')
      setSaving(false)
    }
  }

  const skipToNext = () => router.push('/onboarding/welcome')
  const skipEverything = () => router.push('/onboarding/welcome')

  if (status === 'loading' || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-10 h-10 animate-spin text-theme-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      {/* Step indicator + skip-everything in the top bar */}
      <div className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-theme-primary" />
          <span className="w-8 h-2 rounded-full bg-theme-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-theme-muted ml-2">
            Step 2 of 2 · Your digital ID
          </span>
        </div>
        <button
          onClick={skipEverything}
          className="text-xs font-bold uppercase tracking-wider text-theme-muted hover:text-theme-foreground"
        >
          Skip everything →
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-2">
            Your digital ID
          </h1>
          <p className="text-theme-muted">
            How others on Project Exodus will see you. Anything left blank
            you can fill in later from Settings.
          </p>
        </div>

        <div className="bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Photo */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 block">
              Profile photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-theme-primary bg-[var(--muted)] shrink-0 flex items-center justify-center">
                {image ? (
                  <Image src={image} alt="" fill sizes="80px" className="object-cover" unoptimized />
                ) : (
                  <UserIcon className="w-8 h-8 text-theme-primary" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--muted)] hover:bg-theme-primary hover:text-[var(--primary-foreground)] text-sm font-bold border-2 border-theme-primary transition-colors disabled:opacity-50"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? 'Uploading…' : image ? 'Replace' : 'Upload'}
              </button>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label htmlFor="headline" className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 block">
              Headline
            </label>
            <input
              id="headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Climate engineer · permaculture nerd"
              maxLength={MAX_HEADLINE}
              className="w-full rounded-lg border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-theme-primary focus:outline-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 block">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A paragraph or two about you and what you care about."
              maxLength={MAX_BIO}
              rows={4}
              className="w-full rounded-lg border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-theme-primary focus:outline-none resize-y"
            />
            <p className="text-[11px] text-theme-muted mt-1">{bio.length}/{MAX_BIO}</p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 block flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Brooklyn, NY"
              maxLength={MAX_LOCATION}
              className="w-full rounded-lg border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-theme-primary focus:outline-none"
            />
          </div>

          {/* Interests */}
          <div>
            <label htmlFor="interests" className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 block flex items-center gap-1">
              <Tag className="w-3 h-3" /> Interests
            </label>
            <input
              id="interests"
              type="text"
              value={interestsRaw}
              onChange={(e) => setInterestsRaw(e.target.value)}
              placeholder="solar, regenerative-ag, urban-planning"
              className="w-full rounded-lg border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-theme-primary focus:outline-none"
            />
            <p className="text-[11px] text-theme-muted mt-1">Comma-separated. Up to {MAX_INTERESTS}.</p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={skipToNext}
              disabled={saving}
              className="px-4 py-2 text-sm font-bold text-theme-muted hover:text-theme-foreground disabled:opacity-50"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={saveAndContinue}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-theme-primary text-black font-black text-sm hover:opacity-90 disabled:opacity-50"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Save &amp; finish</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
