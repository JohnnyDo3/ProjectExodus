"use client"

import { useEffect } from 'react'

const CONSENT_KEY = 'exodus_cookie_consent'

type CookiePrefs = {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
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

export function ConsentBootstrap() {
  useEffect(() => {
    const prefs = readStoredPrefs()
    if (!prefs) return

    document.documentElement.dataset.analyticsConsent = prefs.analytics ? 'granted' : 'denied'
    document.documentElement.dataset.marketingConsent = prefs.marketing ? 'granted' : 'denied'
    document.documentElement.dataset.functionalConsent = prefs.functional ? 'granted' : 'denied'
    ;(window as any).exodusConsent = prefs
  }, [])

  return null
}
