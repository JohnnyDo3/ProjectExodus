'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft } from 'lucide-react'

function SignInForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        setSuccess(true)
        // Show success message briefly before redirecting
        setTimeout(() => {
          router.push(callbackUrl)
          router.refresh()
        }, 1000)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-[var(--muted)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[var(--foreground)]">
              Sign In to Project Exodus
            </CardTitle>
            <CardDescription className="text-theme-muted">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-theme-muted">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-theme-primary hover:opacity-80">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm text-theme-muted">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-theme-primary hover:opacity-80 font-medium">
                  Sign up
                </Link>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] border border-theme-secondary rounded-lg">
                <p className="text-sm text-theme-secondary font-semibold">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] border-2 border-theme-primary rounded-lg">
                <p className="text-sm text-theme-primary font-bold flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  Sign in successful! Redirecting...
                </p>
              </div>
            )}

            {callbackUrl !== '/' && (
              <div className="mt-6 p-4 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border border-theme-accent rounded-lg">
                <p className="text-sm text-theme-accent">
                  <strong>Note:</strong> You need to sign in to access <code className="px-1 py-0.5 bg-[var(--muted)] rounded">{callbackUrl}</code>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--muted)] flex items-center justify-center">
        <p className="text-[var(--foreground)]">Loading...</p>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
