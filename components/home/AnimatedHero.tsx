'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagaragraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title on load
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'power4.out',
        })
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        })
      }

      // Animate CTA
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(1.7)',
        })
      }

      // Parallax background effect
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: 200,
          ease: 'none',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return { heroRef, titleRef, subtitleRef, ctaRef }
}
