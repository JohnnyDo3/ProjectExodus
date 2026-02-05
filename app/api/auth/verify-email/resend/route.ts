import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { buildVerifyEmail } from '@/lib/email/verify'

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      id: 'verify-email-resend',
      limit: 5,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { success: false, error: 'Email already verified' },
        { status: 400 }
      )
    }

    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    })

    const verifyToken = crypto.randomUUID()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verifyToken,
        expires,
      }
    })

    const baseUrl = new URL(request.url).origin
    const confirmUrl = `${baseUrl}/auth/verify?token=${verifyToken}`
    const emailTemplate = buildVerifyEmail(confirmUrl)

    return NextResponse.json({
      success: true,
      message: 'Verification email sent.',
      confirmUrl: process.env.NODE_ENV !== 'production' ? confirmUrl : undefined,
      emailPreview: process.env.NODE_ENV !== 'production' ? emailTemplate : undefined,
    })
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to resend verification email' },
      { status: 500 }
    )
  }
}
