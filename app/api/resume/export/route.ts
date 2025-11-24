import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { renderToStream } from '@react-pdf/renderer'
import { ResumePDF } from '@/lib/pdf/resume-template'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        headline: true,
        bio: true,
        location: true,
        website: true,
        linkedin: true,
        twitter: true,
        expertise: true,
        experience: true,
        education: true,
        skills: true,
        certifications: true,
        languages: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare resume data
    const resumeData = {
      name: user.name,
      headline: user.headline,
      bio: user.bio,
      email: user.email,
      location: user.location,
      website: user.website,
      linkedin: user.linkedin,
      twitter: user.twitter,
      expertise: user.expertise || [],
      experience: Array.isArray(user.experience) ? user.experience : null,
      education: Array.isArray(user.education) ? user.education : null,
      skills: Array.isArray(user.skills) ? user.skills : null,
      certifications: Array.isArray(user.certifications) ? user.certifications : null,
      languages: Array.isArray(user.languages) ? user.languages : null
    }

    // Generate PDF
    const pdfStream = await renderToStream(<ResumePDF data={resumeData} />)

    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    for await (const chunk of pdfStream) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    // Return PDF as download
    const fileName = `${user.name?.replace(/\s+/g, '_') || 'Resume'}_CV.pdf`

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': buffer.length.toString()
      }
    })
  } catch (error) {
    console.error('Error generating resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate resume' },
      { status: 500 }
    )
  }
}
