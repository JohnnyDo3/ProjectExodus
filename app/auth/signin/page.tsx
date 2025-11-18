'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft } from 'lucide-react'

function SignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement actual authentication with NextAuth
      console.log('Sign in attempt:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('Authentication not yet implemented. This will be connected to NextAuth in the next phase.')
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Failed to sign in')
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
    <div className="min-h-screen bg-sand-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            <CardTitle className="text-2xl" style={{ color: '#000' }}>
              Sign In to Project Exodus
            </CardTitle>
            <CardDescription style={{ color: '#333' }}>
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
                  <span style={{ color: '#333' }}>Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-moss-600 hover:text-moss-700">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm" style={{ color: '#666' }}>
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-moss-600 hover:text-moss-700 font-medium">
                  Sign up
                </Link>
              </div>
            </form>

            {callbackUrl !== '/' && (
              <div className="mt-6 p-4 bg-ocean-50 border border-ocean-200 rounded-lg">
                <p className="text-sm text-ocean-800">
                  <strong>Note:</strong> You need to sign in to access <code className="px-1 py-0.5 bg-ocean-100 rounded">{callbackUrl}</code>
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-moss-50 border border-moss-200 rounded-lg">
              <p className="text-sm text-moss-800">
                <strong>Development Notice:</strong> Authentication is not yet implemented.
                This page demonstrates the admin protection UI. NextAuth will be integrated in the next phase.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand-50 flex items-center justify-center"><p>Loading...</p></div>}>
      <SignInForm />
    </Suspense>
  )
}
