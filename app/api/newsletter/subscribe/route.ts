import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.status !== 'ACTIVE') {
        // Reactivate if previously unsubscribed
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { status: 'ACTIVE', source },
        })
      }
      // Return same message regardless to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing!',
      })
    }

    // Create new subscription
    await prisma.newsletterSubscription.create({
      data: {
        email,
        source: source || 'footer',
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!',
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404 }
      )
    }

    await prisma.newsletterSubscription.update({
      where: { email },
      data: { status: 'UNSUBSCRIBED' },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    })
  } catch (error) {
    console.error('Error unsubscribing:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}
