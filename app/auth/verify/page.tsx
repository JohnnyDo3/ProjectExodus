"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string>('Verifying your email...')
  const [countdown, setCountdown] = useState(5)
  const [resendEmail, setResendEmail] = useState('')
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Missing verification token.')
      return
    }

    const verify = async () => {
      setStatus('loading')
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
        const data = await res.json()
        if (res.ok) {
          setStatus('success')
          setMessage(data.message || 'Email verified successfully.')
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed.')
        }
      } catch {
        setStatus('error')
        setMessage('Verification failed.')
      }
    }

    verify()
  }, [token])

  useEffect(() => {
    if (status !== 'success') return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/auth/signin'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [status])

  const handleResend = async () => {
    if (!resendEmail.trim()) {
      setResendMessage('Enter your email to resend the verification link.')
      return
    }
    setResendMessage(null)
    try {
      const res = await fetch('/api/auth/verify-email/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail }),
      })
      const data = await res.json()
      if (res.ok) {
        setResendMessage(data.message || 'Verification email sent.')
      } else {
        setResendMessage(data.error || 'Failed to resend verification email.')
      }
    } catch {
      setResendMessage('Failed to resend verification email.')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--muted)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[var(--foreground)]">
              Verify your email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm font-semibold text-theme-muted">
              {message}
            </p>
            {status === 'success' && (
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth/signin">
                    Continue to sign in
                  </Link>
                </Button>
                <p className="text-xs text-theme-muted">
                  Redirecting in {countdown}s...
                </p>
              </div>
            )}
            {status === 'error' && (
              <div className="space-y-3">
                <div className="space-y-2 text-left">
                  <label className="block text-xs font-bold text-[var(--foreground)]">
                    Resend verification email
                  </label>
                  <input
                    type="email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                    placeholder="you@example.com"
                  />
                  <Button onClick={handleResend} variant="outline" className="w-full">
                    Resend verification link
                  </Button>
                  {resendMessage && (
                    <p className="text-xs text-theme-muted">{resendMessage}</p>
                  )}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/signin?verify=1">
                    Back to sign in
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
