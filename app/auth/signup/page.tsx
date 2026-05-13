'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import SocialLoginButtons from '@/components/auth/SocialLoginButtons'

export default function SignUpPage() {
  const router = useRouter()
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
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must include an uppercase letter'
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must include a lowercase letter'
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must include a number'
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = 'Password must include a special character'
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
      // Register the user
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const registerData = await registerRes.json()

      if (!registerRes.ok) {
        const fallbackMessage = registerData?.error || 'Registration failed'
        const field = typeof registerData?.field === 'string' ? registerData.field : null
        if (field && ['name', 'email', 'password'].includes(field)) {
          setErrors({ [field]: fallbackMessage })
        } else {
          setErrors({ email: fallbackMessage })
        }
        setLoading(false)
        return
      }

      // Auto sign in after registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.ok) {
        // New users go through the onboarding flow (fish design →
        // digital ID → welcome). Each step is skippable.
        router.push('/onboarding/fish')
        router.refresh()
      } else {
        // Registration worked but signin failed - redirect to signin page
        router.push('/auth/signin?registered=true')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      setErrors({ email: 'An unexpected error occurred' })
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
  const passwordChecks = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: '1 uppercase letter (A-Z)', met: /[A-Z]/.test(formData.password) },
    { label: '1 lowercase letter (a-z)', met: /[a-z]/.test(formData.password) },
    { label: '1 number (0-9)', met: /[0-9]/.test(formData.password) },
    { label: '1 special character (e.g. !@#$)', met: /[^A-Za-z0-9]/.test(formData.password) },
  ]

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

        <Card className="border-4 border-theme-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-[var(--foreground)]">
              JOIN PROJECT EXODUS
            </CardTitle>
            <CardDescription className="text-base font-semibold text-theme-muted">
              Create your account and start your sustainability journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SocialLoginButtons callbackUrl="/" mode="signup" />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--card)] px-3 text-[var(--muted-foreground)] font-medium">
                  or create account with email
                </span>
              </div>
            </div>

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
                  hint="At least 8 characters, with upper/lower/number/symbol"
                />

                {formData.password && (
                  <div className="mt-2">
                    <ul className="space-y-1 text-xs">
                      {passwordChecks.map((check) => (
                        <li
                          key={check.label}
                          className={check.met ? 'text-moss-600' : 'text-terra-600'}
                        >
                          {check.label}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            level <= strength ? strengthColors[strength] : 'bg-[var(--border)]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-theme-muted">
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
                  <span className="text-theme-muted">
                    I agree to the{' '}
                    <Link href="/legal/terms" className="text-theme-primary hover:opacity-80 font-medium underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/legal/privacy" className="text-theme-primary hover:opacity-80 font-medium underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 rounded" />
                  <span className="text-theme-muted">
                    Send me updates about new sustainable products and features
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full text-lg py-6 font-black shadow-lg"
                disabled={loading}
              >
                {loading ? 'CREATING ACCOUNT...' : 'CONTINUE'}
              </Button>

              <div className="text-center text-sm text-theme-muted">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-theme-primary hover:opacity-80 font-bold">
                  Sign in
                </Link>
              </div>
            </form>

            <div className="mt-6 p-5 bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] border-2 border-theme-primary rounded-lg">
              <div className="space-y-3">
                <p className="text-sm font-bold text-theme-primary flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Why Join Project Exodus?
                </p>
                <ul className="space-y-2 text-sm text-[var(--foreground)]">
                  <li className="flex items-start gap-2">
                    <span className="text-theme-primary mt-0.5">✓</span>
                    <span>Save your favorite sustainable products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-theme-primary mt-0.5">✓</span>
                    <span>Track your environmental impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-theme-primary mt-0.5">✓</span>
                    <span>Connect with the sustainability community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-theme-primary mt-0.5">✓</span>
                    <span>Get personalized product recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
