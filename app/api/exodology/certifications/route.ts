import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// Type definitions for progress/certification records
type ProgressRecord = {
  pathId: string
  lessonId: string
  status: string
}

type CertRecord = {
  certificationId: string
}

// Certification requirements (lesson counts per path)
const CERTIFICATION_REQUIREMENTS = {
  foundations: {
    id: 'exodology-literacy',
    name: 'Exodological Literacy',
    requiredLessons: 44, // All foundations lessons
    pathId: 'foundations'
  },
  applied: {
    id: 'exodology-application',
    name: 'Exodological Application',
    requiredLessons: 36, // All applied lessons
    pathId: 'applied'
  },
  strategic: {
    id: 'exodology-stewardship',
    name: 'Exodological Stewardship',
    requiredLessons: 40, // All strategic lessons
    pathId: 'strategic'
  },
  master: {
    id: 'exodology-master',
    name: 'Master Exodologist',
    requiredCerts: ['exodology-literacy', 'exodology-application', 'exodology-stewardship'],
    pathId: null
  }
}

// GET - Fetch user's certifications
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const certifications = await prisma.exodologyCertification.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: 'desc' }
    })

    // Get progress to show what's close to completion
    const progress = await prisma.exodologyProgress.findMany({
      where: { userId: session.user.id }
    })

    // Calculate progress toward each certification
    const certProgress = {
      foundations: {
        completed: progress.filter((p: ProgressRecord) => p.pathId === 'foundations' && p.status === 'COMPLETED').length,
        required: CERTIFICATION_REQUIREMENTS.foundations.requiredLessons,
        earned: certifications.some((c: CertRecord) => c.certificationId === 'exodology-literacy')
      },
      applied: {
        completed: progress.filter((p: ProgressRecord) => p.pathId === 'applied' && p.status === 'COMPLETED').length,
        required: CERTIFICATION_REQUIREMENTS.applied.requiredLessons,
        earned: certifications.some((c: CertRecord) => c.certificationId === 'exodology-application')
      },
      strategic: {
        completed: progress.filter((p: ProgressRecord) => p.pathId === 'strategic' && p.status === 'COMPLETED').length,
        required: CERTIFICATION_REQUIREMENTS.strategic.requiredLessons,
        earned: certifications.some((c: CertRecord) => c.certificationId === 'exodology-stewardship')
      },
      master: {
        earned: certifications.some((c: CertRecord) => c.certificationId === 'exodology-master'),
        requirements: CERTIFICATION_REQUIREMENTS.master.requiredCerts
      }
    }

    return NextResponse.json({
      certifications,
      progress: certProgress
    })

  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
  }
}

// POST - Claim a certification (if requirements are met)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { certificationId } = body

    if (!certificationId) {
      return NextResponse.json({ error: 'certificationId is required' }, { status: 400 })
    }

    // Check if already earned
    const existing = await prisma.exodologyCertification.findUnique({
      where: {
        userId_certificationId: {
          userId: session.user.id,
          certificationId
        }
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'Certification already earned', certification: existing }, { status: 400 })
    }

    // Verify requirements based on certification type
    const progress = await prisma.exodologyProgress.findMany({
      where: {
        userId: session.user.id,
        status: 'COMPLETED'
      }
    })

    const existingCerts = await prisma.exodologyCertification.findMany({
      where: { userId: session.user.id }
    })

    let isEligible = false
    let pathId: string | null = null

    switch (certificationId) {
      case 'exodology-literacy':
        isEligible = progress.filter((p: ProgressRecord) => p.pathId === 'foundations').length >= CERTIFICATION_REQUIREMENTS.foundations.requiredLessons
        pathId = 'foundations'
        break
      case 'exodology-application':
        isEligible = progress.filter((p: ProgressRecord) => p.pathId === 'applied').length >= CERTIFICATION_REQUIREMENTS.applied.requiredLessons
        pathId = 'applied'
        break
      case 'exodology-stewardship':
        isEligible = progress.filter((p: ProgressRecord) => p.pathId === 'strategic').length >= CERTIFICATION_REQUIREMENTS.strategic.requiredLessons
        pathId = 'strategic'
        break
      case 'exodology-master':
        isEligible = CERTIFICATION_REQUIREMENTS.master.requiredCerts.every(
          (reqCert: string) => existingCerts.some((c: CertRecord) => c.certificationId === reqCert)
        )
        pathId = null
        break
      default:
        return NextResponse.json({ error: 'Invalid certification ID' }, { status: 400 })
    }

    if (!isEligible) {
      return NextResponse.json({ error: 'Requirements not met' }, { status: 403 })
    }

    // Issue certification
    const certification = await prisma.exodologyCertification.create({
      data: {
        userId: session.user.id,
        certificationId,
        pathId
      }
    })

    return NextResponse.json({
      success: true,
      certification,
      message: `Congratulations! You've earned the ${
        certificationId === 'exodology-literacy' ? 'Exodological Literacy' :
        certificationId === 'exodology-application' ? 'Exodological Application' :
        certificationId === 'exodology-stewardship' ? 'Exodological Stewardship' :
        'Master Exodologist'
      } certification!`
    })

  } catch (error) {
    console.error('Error claiming certification:', error)
    return NextResponse.json({ error: 'Failed to claim certification' }, { status: 500 })
  }
}
