"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const AGE_GATE_KEY = 'exodus_age_gate'

type AgeGateState = {
  confirmed: boolean
  timestamp: string
}

function readAgeGate(): AgeGateState | null {
  try {
    const stored = localStorage.getItem(AGE_GATE_KEY)
    if (stored) return JSON.parse(stored) as AgeGateState
  } catch {
    // Ignore parse errors
  }
  return null
}

function persistAgeGate() {
  const value = JSON.stringify({ confirmed: true, timestamp: new Date().toISOString() })
  localStorage.setItem(AGE_GATE_KEY, value)
}

export function AgeGateModal() {
  const [visible, setVisible] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const stored = readAgeGate()
    if (!stored?.confirmed) {
      setVisible(true)
    }
  }, [])

  const handleConfirm = () => {
    persistAgeGate()
    setVisible(false)
  }

  const handleUnderage = () => {
    setBlocked(true)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
      <Card className="w-full max-w-md border-2 border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="p-6 space-y-4 text-center">
          <h2 className="text-2xl font-black text-[var(--foreground)]">Age confirmation</h2>
          {!blocked ? (
            <>
              <p className="text-sm text-[var(--muted-foreground)]">
                You must be 13+ to use Project Exodus. If you are under 18, you need parental or guardian consent.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={handleConfirm} className="font-black">
                  I am 13 or older
                </Button>
                <Button variant="outline" onClick={handleUnderage} className="font-semibold">
                  I am under 13
                </Button>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">
                Learn more in our{' '}
                <Link href="/terms" className="underline text-theme-primary">Terms of Service</Link>.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-[var(--muted-foreground)]">
                Project Exodus is not available for users under 13.
              </p>
              <Button variant="outline" onClick={() => setBlocked(false)} className="font-semibold">
                Go back
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
