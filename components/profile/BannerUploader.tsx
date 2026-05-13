'use client'

/**
 * Inline banner uploader — surfaced only to the profile owner. Sits
 * absolutely-positioned in the corner of the profile banner so it's
 * always accessible without a trip to Settings. Reuses the same
 * /api/upload endpoint the TipTap editor and onboarding profile step
 * already use.
 */

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Loader2, Check } from 'lucide-react'

interface BannerUploaderProps {
  userId: string
}

export function BannerUploader({ userId }: BannerUploaderProps) {
  const router = useRouter()
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('JPEG, PNG, or WebP only.')
      e.target.value = ''
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Banner must be under 8 MB.')
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

      const upload = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, folder: 'banners' }),
      })
      const uploadData = await upload.json()
      if (!uploadData.success || !uploadData.data?.url) {
        throw new Error(uploadData.error || 'Upload failed.')
      }

      const save = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banner: uploadData.data.url }),
      })
      if (!save.ok) {
        const body = await save.json().catch(() => ({}))
        throw new Error(body.error || 'Save failed.')
      }

      setJustSaved(true)
      // Refresh server-rendered page so the new banner shows.
      router.refresh()
      setTimeout(() => setJustSaved(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Banner update failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        disabled={uploading}
        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-bold uppercase tracking-wider border border-white/30 hover:bg-black/80 hover:border-white/60 transition-colors disabled:opacity-60"
        aria-label="Change banner image"
      >
        {uploading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Uploading…
          </>
        ) : justSaved ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Updated
          </>
        ) : (
          <>
            <Camera className="w-3.5 h-3.5" />
            Change banner
          </>
        )}
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onFile}
        className="hidden"
      />
      {error && (
        <div className="absolute top-16 right-4 px-3 py-2 rounded-lg bg-red-500/90 text-white text-xs font-bold shadow-lg max-w-xs">
          {error}
        </div>
      )}
    </>
  )
}
