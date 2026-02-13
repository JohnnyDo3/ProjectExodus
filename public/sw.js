// Service Worker for Project Exodus
// Provides offline caching for learning content

const CACHE_VERSION = 'v1'
const STATIC_CACHE = `exodus-static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `exodus-dynamic-${CACHE_VERSION}`
const LEARNING_CACHE = `exodus-learning-${CACHE_VERSION}`

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/learn',
  '/architecture',
  '/architecture/structural',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
]

// Learning pages to cache for offline access
const LEARNING_PAGES = [
  '/learn',
  '/architecture',
  '/architecture/structural',
  '/learn/green-building',
  '/learn/renewable-energy',
  '/learn/sustainable-fashion',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            return (
              key.startsWith('exodus-') &&
              key !== STATIC_CACHE &&
              key !== DYNAMIC_CACHE &&
              key !== LEARNING_CACHE
            )
          })
          .map((key) => {
            console.log('[SW] Removing old cache:', key)
            return caches.delete(key)
          })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (url.origin !== self.location.origin) return

  // Skip API requests (except for caching responses)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
    return
  }

  // Learning content - cache first for offline access
  if (isLearningContent(url.pathname)) {
    event.respondWith(cacheFirst(request, LEARNING_CACHE))
    return
  }

  // Static assets - cache first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // Dynamic content - network first with cache fallback
  event.respondWith(networkFirst(request, DYNAMIC_CACHE))
})

// Cache first strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) {
    // Update cache in background
    fetchAndCache(request, cacheName)
    return cached
  }
  return fetchAndCache(request, cacheName)
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/') || new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
      })
    }
    throw error
  }
}

// Fetch and cache helper
async function fetchAndCache(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.log('[SW] Fetch failed:', request.url)
    throw error
  }
}

// Check if URL is learning content
function isLearningContent(pathname) {
  return (
    pathname.startsWith('/learn') ||
    pathname.startsWith('/architecture') ||
    LEARNING_PAGES.includes(pathname)
  )
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  return (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/images/') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css')
  )
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {}

  switch (type) {
    case 'CACHE_LEARNING_PAGES':
      cacheLearningPages()
      break
    case 'CLEAR_CACHE':
      clearAllCaches()
      break
    case 'SYNC_PROGRESS':
      // Queue progress sync for when online
      if (payload) {
        queueProgressSync(payload)
      }
      break
  }
})

// Cache all learning pages for offline use
async function cacheLearningPages() {
  const cache = await caches.open(LEARNING_CACHE)
  console.log('[SW] Caching learning pages for offline...')

  for (const page of LEARNING_PAGES) {
    try {
      const response = await fetch(page)
      if (response.ok) {
        await cache.put(page, response)
        console.log('[SW] Cached:', page)
      }
    } catch (error) {
      console.log('[SW] Failed to cache:', page)
    }
  }

  // Notify clients that caching is complete
  const clients = await self.clients.matchAll()
  clients.forEach((client) => {
    client.postMessage({ type: 'LEARNING_CACHED' })
  })
}

// Clear all caches
async function clearAllCaches() {
  const keys = await caches.keys()
  await Promise.all(keys.map((key) => caches.delete(key)))
  console.log('[SW] All caches cleared')
}

// Queue progress sync for background sync
let pendingProgressSync = []

function queueProgressSync(data) {
  pendingProgressSync.push({
    ...data,
    timestamp: Date.now(),
  })
  // Try to sync immediately if online
  if (navigator.onLine) {
    syncProgress()
  }
}

// Sync queued progress when online
async function syncProgress() {
  if (pendingProgressSync.length === 0) return

  const itemsToSync = [...pendingProgressSync]
  pendingProgressSync = []

  for (const item of itemsToSync) {
    try {
      await fetch('/api/learn/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      console.log('[SW] Synced progress:', item.moduleId)
    } catch (error) {
      // Re-queue failed items
      pendingProgressSync.push(item)
      console.log('[SW] Failed to sync, re-queued:', item.moduleId)
    }
  }
}

// Background sync when coming back online
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress())
  }
})

// Listen for online/offline events
self.addEventListener('online', () => {
  console.log('[SW] Back online, syncing...')
  syncProgress()
})
