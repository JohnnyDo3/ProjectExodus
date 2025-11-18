'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AlertCircle } from 'lucide-react'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The verification token has expired or has already been used.',
    OAuthSignin: 'Error in constructing an authorization URL.',
    OAuthCallback: 'Error in handling the response from an OAuth provider.',
    OAuthCreateAccount: 'Could not create OAuth provider user in the database.',
    EmailCreateAccount: 'Could not create email provider user in the database.',
    Callback: 'Error in the OAuth callback handler route.',
    OAuthAccountNotLinked: 'Email already exists with a different sign-in method.',
    EmailSignin: 'Sending the email with the verification token failed.',
    CredentialsSignin: 'The email or password you entered is incorrect.',
    SessionRequired: 'You must be signed in to access this page.',
    default: 'An error occurred during authentication.',
  }

  const message = error ? errorMessages[error] || errorMessages.default : errorMessages.default

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-moss-50 to-ocean-50 p-4">
      <Card className="w-full max-w-md border-4 border-terra-300 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-terra-500 to-terra-600 flex items-center justify-center shadow-xl">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-black" style={{ color: '#c24f31' }}>
            AUTHENTICATION ERROR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg font-semibold" style={{ color: '#333' }}>
            {message}
          </p>

          <div className="space-y-3">
            <Link href="/auth/signin" className="block">
              <Button className="w-full text-lg py-6 font-black shadow-lg">
                Try Again
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full text-lg py-6 font-bold border-2"
              >
                Go Home
              </Button>
            </Link>
          </div>

          {error && (
            <p className="text-sm text-center font-medium" style={{ color: '#666' }}>
              Error code: {error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  )
}
