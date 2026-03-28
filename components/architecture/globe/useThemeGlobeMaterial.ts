'use client'

import { useEffect, useRef, useState } from 'react'

// =============================================================================
// Theme Globe Material — simple texture swap based on site theme
//
// Day theme → Blue Marble texture
// Night theme → Night city lights texture
// No sun tracking, no shader blending — just one texture at a time.
// =============================================================================

const DAY_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const NIGHT_TEXTURE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg'

/**
 * Returns a MeshBasicMaterial with the appropriate earth texture
 * based on whether the site theme is day or night.
 */
export function useThemeGlobeMaterial(isDayTheme: boolean): any | null {
  const materialRef = useRef<any>(null)
  const texturesRef = useRef<{ day: any; night: any }>({ day: null, night: null })
  const [ready, setReady] = useState(false)

  // Load both textures once, create material
  useEffect(() => {
    let cancelled = false

    async function init() {
      const THREE = await import('three')
      const loader = new THREE.TextureLoader()

      const [dayTex, nightTex] = await Promise.all([
        new Promise<any>((resolve, reject) =>
          loader.load(DAY_TEXTURE_URL, resolve, undefined, reject)
        ),
        new Promise<any>((resolve, reject) =>
          loader.load(NIGHT_TEXTURE_URL, resolve, undefined, reject)
        ),
      ])

      if (cancelled) {
        dayTex.dispose()
        nightTex.dispose()
        return
      }

      texturesRef.current = { day: dayTex, night: nightTex }

      const material = new THREE.MeshBasicMaterial({
        map: isDayTheme ? dayTex : nightTex,
      })

      materialRef.current = material
      setReady(true)
    }

    init().catch(() => {})

    return () => {
      cancelled = true
      if (materialRef.current) {
        materialRef.current.dispose()
      }
      if (texturesRef.current.day) texturesRef.current.day.dispose()
      if (texturesRef.current.night) texturesRef.current.night.dispose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Swap texture when theme changes
  useEffect(() => {
    if (!ready || !materialRef.current) return
    const textures = texturesRef.current
    if (!textures.day || !textures.night) return

    materialRef.current.map = isDayTheme ? textures.day : textures.night
    materialRef.current.needsUpdate = true
  }, [isDayTheme, ready])

  return ready ? materialRef.current : null
}
