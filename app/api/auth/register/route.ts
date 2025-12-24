import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

// List of common disposable/temporary email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'yopmail.com',
  'getnada.com', 'dispostable.com', 'trashmail.com', 'maildrop.cc'
]

// Custom email validation that checks for real email patterns
const validateEmail = (email: string): boolean => {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) return false

  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false

  // Check for disposable email domains
  if (DISPOSABLE_EMAIL_DOMAINS.some(d => domain.includes(d))) return false

  // Ensure domain has valid TLD (at least 2 chars)
  const tld = domain.split('.').pop()
  if (!tld || tld.length < 2) return false

  // Block obviously fake patterns
  if (domain.includes('test') && !domain.includes('gmail') && !domain.includes('outlook')) return false

  return true
}

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim()
    .refine(validateEmail, 'Please use a valid, non-disposable email address'),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
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
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
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
