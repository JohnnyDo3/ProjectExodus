'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'

export default function SignOutPage() {
  useEffect(() => {
    // Auto sign out after 3 seconds if user doesn't click
    const timer = setTimeout(() => {
      handleSignOut()
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--muted)_50%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))] p-4">
      <Card className="w-full max-w-md border-4 border-theme-primary shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-xl">
            <LogOut className="w-10 h-10 text-[var(--primary-foreground)]" />
          </div>
          <CardTitle className="text-3xl font-black text-[var(--foreground)]">
            SIGN OUT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg font-semibold text-theme-muted">
            Are you sure you want to sign out?
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleSignOut}
              className="w-full text-lg py-6 font-black shadow-lg"
            >
              Yes, Sign Me Out
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full text-lg py-6 font-bold border-2"
            >
              Cancel
            </Button>
          </div>

          <p className="text-sm text-center font-medium text-theme-muted">
            You will be automatically signed out in 5 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
