'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollReveal(scrollDistance = 400) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealProgress, setRevealProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const isIntersecting = useRef(false)

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    // Start reveal when container top enters viewport bottom
    const distanceFromViewportBottom = rect.top - viewportHeight
    // progress: 0 when just entering, 1 when fully scrolled past scrollDistance
    const raw = Math.max(0, Math.min(1, -distanceFromViewportBottom / scrollDistance))
    setRevealProgress(raw)
  }, [scrollDistance])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting
        if (entry.isIntersecting) {
          const tick = () => {
            updateProgress()
            if (isIntersecting.current) {
              rafRef.current = requestAnimationFrame(tick)
            }
          }
          rafRef.current = requestAnimationFrame(tick)
        } else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    )

    observer.observe(el)
    // Initial check
    updateProgress()

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateProgress])

  return { revealProgress, containerRef }
}
