'use client'

import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface UsePWAInstallReturn {
  isInstallable: boolean
  isInstalled: boolean
  isIOSDevice: boolean
  install: () => Promise<boolean>
  dismiss: () => void
  dismissed: boolean
}

const DISMISS_KEY = 'pwa-install-dismissed'
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export function usePWAInstall(): UsePWAInstallReturn {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Check if PWA is already installed
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if running as installed PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isIOSPWA = (window.navigator as any).standalone === true
    setIsInstalled(isStandalone || isIOSPWA)

    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOSDevice(isIOS)

    // Check if previously dismissed
    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY)
      if (dismissedAt) {
        const dismissTime = parseInt(dismissedAt, 10)
        if (Date.now() - dismissTime < DISMISS_DURATION) {
          setDismissed(true)
        } else {
          localStorage.removeItem(DISMISS_KEY)
        }
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [])

  // Listen for install prompt
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = useCallback(async (): Promise<boolean> => {
    if (!installPrompt) return false

    try {
      await installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
        setInstallPrompt(null)
        return true
      }
    } catch (e) {
      console.error('PWA install failed:', e)
    }

    return false
  }, [installPrompt])

  const dismiss = useCallback(() => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString())
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [])

  return {
    isInstallable: !!installPrompt || isIOSDevice,
    isInstalled,
    isIOSDevice,
    install,
    dismiss,
    dismissed,
  }
}
