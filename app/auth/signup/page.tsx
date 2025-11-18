'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    // Validation
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      // TODO: Implement actual registration with API
      console.log('Sign up attempt:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('Registration not yet implemented. This will be connected to the API in the next phase.')
    } catch (error) {
      console.error('Sign up error:', error)
      alert('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[e.target.name]
        return newErrors
      })
    }
  }

  const passwordStrength = (password: string) => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    return strength
  }

  const strength = passwordStrength(formData.password)
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const strengthColors = ['', 'bg-terra-500', 'bg-terra-400', 'bg-moss-400', 'bg-moss-500', 'bg-moss-600']

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

        <Card className="border-4 border-moss-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black" style={{ color: '#000' }}>
              JOIN PROJECT EXODUS
            </CardTitle>
            <CardDescription className="text-base font-semibold" style={{ color: '#333' }}>
              Create your account and start your sustainability journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.name}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.password}
                  hint="At least 8 characters"
                />

                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            level <= strength ? strengthColors[strength] : 'bg-sand-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: '#666' }}>
                      Password strength: {strengthLabels[strength]}
                    </p>
                  </div>
                )}
              </div>

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.confirmPassword}
              />

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" required className="mt-1 rounded" />
                  <span style={{ color: '#333' }}>
                    I agree to the{' '}
                    <Link href="/legal/terms" className="text-moss-600 hover:text-moss-700 font-medium underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/legal/privacy" className="text-moss-600 hover:text-moss-700 font-medium underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 rounded" />
                  <span style={{ color: '#333' }}>
                    Send me updates about new sustainable products and features
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full text-lg py-6 font-black shadow-lg"
                disabled={loading}
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </Button>

              <div className="text-center text-sm" style={{ color: '#666' }}>
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-moss-600 hover:text-moss-700 font-bold">
                  Sign in
                </Link>
              </div>
            </form>

            <div className="mt-6 p-5 bg-moss-50 border-2 border-moss-200 rounded-lg">
              <div className="space-y-3">
                <p className="text-sm font-bold text-moss-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Why Join Project Exodus?
                </p>
                <ul className="space-y-2 text-sm text-moss-800">
                  <li className="flex items-start gap-2">
                    <span className="text-moss-600 mt-0.5">✓</span>
                    <span>Save your favorite sustainable products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss-600 mt-0.5">✓</span>
                    <span>Track your environmental impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss-600 mt-0.5">✓</span>
                    <span>Connect with the sustainability community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss-600 mt-0.5">✓</span>
                    <span>Get personalized product recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-ocean-50 border border-ocean-200 rounded-lg">
              <p className="text-sm text-ocean-800">
                <strong>Development Notice:</strong> User registration is not yet fully implemented.
                This page demonstrates the signup flow. API integration will be completed in the next phase.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
