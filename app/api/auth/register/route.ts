import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { isPasswordPwned } from '@/lib/security/pwnedPassword'

// List of known disposable/temporary email domains to block bots
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'yopmail.com',
  'getnada.com', 'dispostable.com', 'trashmail.com', 'maildrop.cc',
  'guerrillamail.info', 'sharklasers.com', 'grr.la', 'guerrillamail.net'
]

// Simple bot-resistant email validation
const isNotDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false
  // Only block known disposable email services
  return !DISPOSABLE_EMAIL_DOMAINS.some(d => domain.includes(d))
}

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim()
    .refine(isNotDisposableEmail, 'Disposable email addresses are not allowed'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 registration attempts per hour
    const rateLimitResult = await rateLimit(req, {
      id: 'register',
      limit: 5,
      windowSeconds: 3600,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const body = await req.json()

    // Validate and sanitize input
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    if (await isPasswordPwned(validatedData.password)) {
      return NextResponse.json(
        {
          error: 'This password has appeared in a known data breach. Please choose a different one.',
          field: 'password',
        },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: 'USER', // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user
      },
      { status: 201 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]
      return NextResponse.json(
        {
          error: firstIssue?.message || 'Validation failed',
          field: firstIssue?.path?.[0] || null,
          details: error.issues
        },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
