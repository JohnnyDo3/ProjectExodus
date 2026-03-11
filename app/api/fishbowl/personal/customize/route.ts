import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// Valid species that can be selected per tier
const SPECIES_BY_TIER: Record<number, string[]> = {
  0: ['guppy'],
  1: ['guppy', 'tetra'],
  2: ['guppy', 'tetra', 'angelfish'],
  3: ['guppy', 'tetra', 'angelfish', 'clownfish'],
  4: ['guppy', 'tetra', 'angelfish', 'clownfish', 'tang'],
  5: ['guppy', 'tetra', 'angelfish', 'clownfish', 'tang', 'betta'],
}

const VALID_PATTERNS = ['none', 'scales', 'fine-scales', 'armored', 'shimmer', 'koi']

function getTierFromScore(score: number): number {
  if (score >= 200) return 5
  if (score >= 100) return 4
  if (score >= 50) return 3
  if (score >= 25) return 2
  if (score >= 10) return 1
  return 0
}

function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { species, colors, pattern } = body

    // Get user's current stock score to validate species access
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stockScore: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const tier = getTierFromScore(user.stockScore)
    const availableSpecies = SPECIES_BY_TIER[tier] || ['guppy']

    // Validate species
    if (species && !availableSpecies.includes(species)) {
      return NextResponse.json(
        { success: false, error: 'Species not unlocked at your current tier' },
        { status: 403 }
      )
    }

    // Validate colors
    if (colors) {
      const colorKeys = ['body', 'fin', 'accent', 'eye']
      for (const key of colorKeys) {
        if (colors[key] && !isValidHexColor(colors[key])) {
          return NextResponse.json(
            { success: false, error: `Invalid color for ${key}` },
            { status: 400 }
          )
        }
      }
    }

    // Validate pattern
    if (pattern && !VALID_PATTERNS.includes(pattern)) {
      return NextResponse.json(
        { success: false, error: 'Invalid pattern' },
        { status: 400 }
      )
    }

    const customization = {
      species: species || null,
      colors: colors || null,
      pattern: pattern || 'none',
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { fishCustomization: customization },
    })

    return NextResponse.json({ success: true, data: customization })
  } catch (error) {
    console.error('Error saving fish customization:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save customization' },
      { status: 500 }
    )
  }
}
