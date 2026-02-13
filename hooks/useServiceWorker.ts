'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseServiceWorkerReturn {
  isOnline: boolean
  isInstalled: boolean
  isUpdateAvailable: boolean
  cacheLearningPages: () => void
  clearCache: () => void
  updateServiceWorker: () => void
}

/**
 * useServiceWorker - Hook to manage PWA service worker
 */
export function useServiceWorker(): UseServiceWorkerReturn {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set initial online state
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service worker registered')
          setRegistration(reg)
          setIsInstalled(true)

          // Check for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true)
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('[PWA] Service worker registration failed:', error)
        })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type } = event.data || {}
        if (type === 'LEARNING_CACHED') {
          console.log('[PWA] Learning content cached for offline use')
        }
      })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const cacheLearningPages = useCallback(() => {
    if (registration?.active) {
      registration.active.postMessage({ type: 'CACHE_LEARNING_PAGES' })
    }
  }, [registration])

  const clearCache = useCallback(() => {
    if (registration?.active) {
      registration.active.postMessage({ type: 'CLEAR_CACHE' })
    }
  }, [registration])

  const updateServiceWorker = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }, [registration])

  return {
    isOnline,
    isInstalled,
    isUpdateAvailable,
    cacheLearningPages,
    clearCache,
    updateServiceWorker,
  }
}

/**
 * Queue progress sync via service worker
 */
export function queueProgressSync(data: {
  moduleId: string
  cards: Record<string, unknown>
  version: number
}) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  navigator.serviceWorker.ready.then((registration) => {
    if (registration.active) {
      registration.active.postMessage({
        type: 'SYNC_PROGRESS',
        payload: data,
      })
    }
  })
}
