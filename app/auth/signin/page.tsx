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
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            <CardTitle className="text-2xl text-earth-900 dark:text-sand-100">
              Sign In to Project Exodus
            </CardTitle>
            <CardDescription className="text-earth-700 dark:text-sand-300">
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
                  <span className="text-earth-700 dark:text-sand-300">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-moss-600 dark:text-moss-400 hover:text-moss-700 dark:hover:text-moss-300">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm text-earth-600 dark:text-sand-400">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-moss-600 dark:text-moss-400 hover:text-moss-700 dark:hover:text-moss-300 font-medium">
                  Sign up
                </Link>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-terra-50 dark:bg-terra-900 border border-terra-300 dark:border-terra-700 rounded-lg">
                <p className="text-sm text-terra-800 dark:text-terra-200 font-semibold">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-moss-50 dark:bg-moss-900 border-2 border-moss-500 dark:border-moss-600 rounded-lg">
                <p className="text-sm text-moss-800 dark:text-moss-200 font-bold flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  Sign in successful! Redirecting...
                </p>
              </div>
            )}

            {callbackUrl !== '/' && (
              <div className="mt-6 p-4 bg-ocean-50 dark:bg-ocean-900 border border-ocean-200 dark:border-ocean-700 rounded-lg">
                <p className="text-sm text-ocean-800 dark:text-ocean-200">
                  <strong>Note:</strong> You need to sign in to access <code className="px-1 py-0.5 bg-ocean-100 dark:bg-ocean-800 rounded">{callbackUrl}</code>
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
      <div className="min-h-screen bg-sand-50 dark:bg-earth-900 flex items-center justify-center">
        <p className="text-earth-900 dark:text-sand-100">Loading...</p>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
