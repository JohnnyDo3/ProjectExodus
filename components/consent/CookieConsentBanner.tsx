"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

type CookiePrefs = {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = 'exodus_cookie_consent'

const defaultPrefs: CookiePrefs = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
}

function readStoredPrefs(): CookiePrefs | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) return JSON.parse(stored) as CookiePrefs
  } catch {
    // Ignore parse errors
  }

  try {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${CONSENT_KEY}=`))
    if (cookie) {
      const value = decodeURIComponent(cookie.split('=')[1] || '')
      return JSON.parse(value) as CookiePrefs
    }
  } catch {
    // Ignore parse errors
  }

  return null
}

function persistPrefs(prefs: CookiePrefs) {
  const value = encodeURIComponent(JSON.stringify(prefs))
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs))

  const maxAge = 60 * 60 * 24 * 365
  const secure = window.location.protocol === 'https:' ? '; secure' : ''
  document.cookie = `${CONSENT_KEY}=${value}; max-age=${maxAge}; path=/; samesite=lax${secure}`

  document.documentElement.dataset.analyticsConsent = prefs.analytics ? 'granted' : 'denied'
  document.documentElement.dataset.marketingConsent = prefs.marketing ? 'granted' : 'denied'
  document.documentElement.dataset.functionalConsent = prefs.functional ? 'granted' : 'denied'
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs)

  useEffect(() => {
    const stored = readStoredPrefs()
    if (stored) {
      setPrefs({ ...defaultPrefs, ...stored, necessary: true })
      setVisible(false)
      document.documentElement.dataset.analyticsConsent = stored.analytics ? 'granted' : 'denied'
      document.documentElement.dataset.marketingConsent = stored.marketing ? 'granted' : 'denied'
      document.documentElement.dataset.functionalConsent = stored.functional ? 'granted' : 'denied'
    } else {
      setVisible(true)
    }
  }, [])

  const acceptAll = () => {
    const next: CookiePrefs = { necessary: true, functional: true, analytics: true, marketing: true }
    persistPrefs(next)
    setPrefs(next)
    setVisible(false)
  }

  const rejectNonEssential = () => {
    const next: CookiePrefs = { necessary: true, functional: false, analytics: false, marketing: false }
    persistPrefs(next)
    setPrefs(next)
    setVisible(false)
  }

  const savePrefs = () => {
    const next: CookiePrefs = { ...prefs, necessary: true }
    persistPrefs(next)
    setPrefs(next)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <Card className="mx-auto max-w-3xl border-2 border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-[var(--foreground)]">Cookie preferences</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              We use essential cookies for login and core functionality. You can choose whether to allow
              functional, analytics, and marketing cookies.
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              Learn more in our{' '}
              <Link href="/cookies" className="underline text-theme-primary">Cookie Policy</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline text-theme-primary">Privacy Policy</Link>.
            </p>
          </div>

          {showSettings && (
            <div className="grid gap-3 text-sm text-[var(--foreground)]">
              <label className="flex items-center justify-between gap-3">
                <span>Necessary</span>
                <input type="checkbox" checked disabled className="rounded" />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Functional</span>
                <input
                  type="checkbox"
                  checked={prefs.functional}
                  onChange={(e) => setPrefs((prev) => ({ ...prev, functional: e.target.checked }))}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Analytics</span>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((prev) => ({ ...prev, analytics: e.target.checked }))}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Marketing</span>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((prev) => ({ ...prev, marketing: e.target.checked }))}
                  className="rounded"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={acceptAll} className="font-bold">
              Accept all
            </Button>
            <Button variant="ghost" onClick={rejectNonEssential} className="font-semibold">
              Reject non-essential
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSettings((prev) => !prev)}
              className="font-semibold"
            >
              {showSettings ? 'Hide settings' : 'Manage preferences'}
            </Button>
            {showSettings && (
              <Button variant="outline" onClick={savePrefs} className="font-semibold">
                Save preferences
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
