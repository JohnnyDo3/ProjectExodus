import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'

// All species — guppy variants (all tier 0) + species per tier
const ALL_SPECIES = [
  'guppy', 'swift-guppy', 'fancy-guppy', 'delta-guppy', 'veil-guppy', 'supreme-guppy',
  'endler', 'molly', 'platy', 'danio', 'minnow',
  'neon-tetra', 'rasbora', 'cardinal-tetra', 'white-cloud', 'killifish',
  'betta', 'gourami', 'swordtail', 'ram-cichlid', 'pleco',
  'angelfish', 'clownfish', 'mandarin', 'wrasse', 'butterflyfish',
  'discus', 'tang', 'moorish-idol', 'lionfish', 'seahorse',
  'arowana', 'koi', 'dragonet', 'mantis-shrimp', 'leafy-seadragon',
]

const VALID_PATTERNS = ['none', 'scales', 'fine-scales', 'armored', 'shimmer', 'koi']

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

    // Validate species - all guppy variants are available to everyone
    if (species && !ALL_SPECIES.includes(species)) {
      return NextResponse.json(
        { success: false, error: 'Invalid species' },
        { status: 400 }
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

    // Check if this is the user's first customization (one-time bonus)
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { fishCustomization: true },
    })
    const isFirstCustomization = !currentUser?.fishCustomization

    await prisma.user.update({
      where: { id: session.user.id },
      data: { fishCustomization: customization },
    })

    // Award stock points for first fish customization (one-time)
    if (isFirstCustomization) {
      incrementStockScore(session.user.id, STOCK_POINTS.FISH_CUSTOMIZED).catch(() => {})
    }

    return NextResponse.json({ success: true, data: customization })
  } catch (error) {
    console.error('Error saving fish customization:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save customization' },
      { status: 500 }
    )
  }
}
