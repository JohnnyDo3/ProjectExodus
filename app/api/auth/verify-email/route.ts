import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      id: 'verify-email',
      limit: 10,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Verification token is required' },
        { status: 400 }
      )
    }

    const verification = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verification) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification token' },
        { status: 404 }
      )
    }

    if (verification.expires < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { email: verification.identifier },
      data: { emailVerified: new Date() },
    })

    await prisma.verificationToken.delete({
      where: { token },
    })

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    })
  } catch (error) {
    console.error('Verify email error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}
