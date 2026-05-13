'use client'

/**
 * Share buttons for an article — X, Bluesky, LinkedIn, Email, and
 * copy-link. Renders inline (e.g. above the body content) and uses
 * each platform's public share-intent URL so no SDK or per-user auth
 * is required.
 */

import { useEffect, useState } from 'react'
import { Linkedin, Mail, Link2, Check, Share2 } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareButtons({ url, title, description, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  // navigator.share is only available in browser AND on https/localhost.
  // Check after mount to avoid SSR / hydration mismatch (server can't
  // know what the client supports).
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: description, url })
    } catch {
      // User dismissed or browser denied — silent fallback. The
      // platform buttons next to it still work.
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDesc = encodeURIComponent(description || '')

  const targets = [
    {
      key: 'x',
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: XIcon,
    },
    {
      key: 'bluesky',
      label: 'Share on Bluesky',
      href: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
      icon: BlueskyIcon,
    },
    {
      key: 'linkedin',
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      key: 'email',
      label: 'Share via email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc ? `${encodedDesc}%0A%0A` : ''}${encodedUrl}`,
      icon: Mail,
    },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked — fall through silently. The other share
      // targets still work.
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wider text-theme-muted mr-1 hidden sm:inline">
        Share
      </span>
      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Share via your device"
          title="Share"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-theme-primary text-theme-primary hover:bg-[var(--primary)]/10 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
      {targets.map(({ key, label, href, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-[var(--border)] hover:border-theme-primary text-theme-muted hover:text-theme-primary transition-colors"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Link copied!' : 'Copy link'}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full border-2 transition-colors ${
          copied
            ? 'border-theme-primary text-theme-primary bg-[var(--primary)]/10'
            : 'border-[var(--border)] hover:border-theme-primary text-theme-muted hover:text-theme-primary'
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}

// Plain SVG marks for X (Twitter) and Bluesky — lucide-react doesn't
// ship official ones, and these are small enough to inline.
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2H21.5l-7.563 8.65L22.864 22h-6.928l-5.42-7.085L4.244 22H1l8.084-9.243L1.136 2h7.104l4.9 6.479L18.244 2zm-2.43 18h1.92L7.275 4H5.244l10.57 16z" />
    </svg>
  )
}

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.335 5.146C8.95 7.06 11.762 10.94 12.795 13.025c1.034-2.086 3.846-5.964 6.46-7.879 1.886-1.382 4.94-2.452 4.94 0 0 .49-.281 4.123-.446 4.713-.574 2.052-2.679 2.575-4.553 2.262 3.276.548 4.11 2.342 2.31 4.135-3.418 3.406-4.913-.854-5.296-1.946-.07-.2-.103-.293-.103-.214 0-.079-.033.014-.103.214-.383 1.092-1.878 5.352-5.296 1.946-1.8-1.793-.966-3.587 2.31-4.135-1.874.313-3.979-.21-4.553-2.262C8.4 9.27 8.12 5.636 8.12 5.146c0-2.451 3.053-1.382 4.94 0z" transform="translate(-2)" />
    </svg>
  )
}
