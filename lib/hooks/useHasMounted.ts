'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true after the first client-side render. Use this to gate any
 * UI that must NOT differ between SSR output and the initial client
 * render — e.g. NextAuth's `status === 'loading'` branches, which fire
 * on the client during hydration but never on the server (where auth()
 * has already resolved). Avoids React hydration mismatches (#418).
 *
 * Usage:
 *   const hasMounted = useHasMounted()
 *   if (hasMounted && status === 'loading') return <Spinner />
 */
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => { setHasMounted(true) }, [])
  return hasMounted
}
