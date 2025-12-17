import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { rateLimit } from '@/lib/rate-limit'
import {
  generateProjectSystemPrompt,
  SageProjectMode,
  ProjectContext,
  WaiverContext
} from '@/lib/projects/ai/sageProjectPrompt'
import { getProjectFallbackResponse } from '@/lib/projects/ai/sageFallback'

const GEMINI_API_KEY = process.env.GOOGLE_AI_API_KEY

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface SageRequest {
  messages: Message[]
  mode: SageProjectMode
  waiverContext?: {
    userId: string
  }
}

// Rate limit: 20 messages per minute for project Sage
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    try {
      await limiter.check(20, ip)
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body: SageRequest = await request.json()
    const { messages, mode = 'general', waiverContext: waiverReq } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Get project context
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: true,
        subgroups: true,
        learningModules: true,
        discussions: true,
        researchPosts: true,
        prerequisites: true,
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Check if user is a member (or admin) - they need access to use Sage
    const membership = project.members.find(m => m.userId === session.user.id)
    const isCreator = project.creatorId === session.user.id

    if (!membership && !isCreator) {
      return NextResponse.json(
        { error: 'You must be a project member to use Sage' },
        { status: 403 }
      )
    }

    // Build project context
    const projectContext: ProjectContext = {
      projectId: project.id,
      projectName: project.name,
      projectDescription: project.description,
      projectGoal: project.goal || undefined,
      memberCount: project.members.length,
      subgroupCount: project.subgroups.length,
      learningModuleCount: project.learningModules.length,
      discussionCount: project.discussions.length,
      researchCount: project.researchPosts.length,
    }

    // Build waiver context if needed
    let waiverContext: WaiverContext | undefined
    if (mode === 'waiver' && waiverReq?.userId) {
      const targetUser = await prisma.user.findUnique({
        where: { id: waiverReq.userId },
        include: {
          learningProgress: {
            where: { status: 'COMPLETED' },
            include: { article: true }
          }
        }
      })

      if (targetUser) {
        // Calculate STOCK score
        const [projectCount, articleCount, followersCount, connectionsCount, modulesCount] = await Promise.all([
          prisma.project.count({ where: { creatorId: targetUser.id } }),
          prisma.article.count({ where: { authorId: targetUser.id, status: 'PUBLISHED' } }),
          prisma.userFollow.count({ where: { followingId: targetUser.id } }),
          prisma.connection.count({ where: {
            OR: [
              { userId: targetUser.id, status: 'ACCEPTED' },
              { connectedUserId: targetUser.id, status: 'ACCEPTED' }
            ]
          }}),
          targetUser.learningProgress.length
        ])

        const stockScore = (projectCount * 10) + (articleCount * 5) + (modulesCount * 3) + (followersCount * 1) + (connectionsCount * 2)

        // Find relevant courses based on project prerequisites
        const prereqTags = project.prerequisites
          .filter(p => p.requiredTag)
          .map(p => p.requiredTag as string)

        const relevantCourses = targetUser.learningProgress
          .filter(lp => {
            if (!lp.article) return false
            // Check if article tags match any prerequisite tags
            // This is simplified - in production you'd have proper tag matching
            return prereqTags.some(tag =>
              lp.article.title.toLowerCase().includes(tag.toLowerCase())
            )
          })
          .map(lp => lp.article.title)

        waiverContext = {
          userId: targetUser.id,
          userName: targetUser.name || 'Unknown User',
          userStockScore: stockScore,
          userCoursesCompleted: targetUser.learningProgress.length,
          userMemberSince: targetUser.createdAt,
          relevantCoursesCompleted: relevantCourses,
          projectPrerequisites: project.prerequisites.map(p => p.displayName || p.type)
        }
      }
    }

    // Generate system prompt
    const systemPrompt = generateProjectSystemPrompt(mode, projectContext, waiverContext)

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1]?.content || ''

    // Try AI response, fall back to keyword-based
    let responseText: string

    if (GEMINI_API_KEY) {
      try {
        responseText = await callGeminiAPI(systemPrompt, messages)
      } catch (error) {
        console.error('Gemini API error, using fallback:', error)
        responseText = getProjectFallbackResponse({
          mode,
          query: lastUserMessage,
          projectContext,
          waiverContext
        })
      }
    } else {
      responseText = getProjectFallbackResponse({
        mode,
        query: lastUserMessage,
        projectContext,
        waiverContext
      })
    }

    return NextResponse.json({
      message: responseText,
      mode,
      projectContext: {
        name: projectContext.projectName,
        memberCount: projectContext.memberCount,
      }
    })

  } catch (error) {
    console.error('Project Sage error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

/**
 * Call Gemini API with project context
 */
async function callGeminiAPI(systemPrompt: string, messages: Message[]): Promise<string> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`

  // Build conversation history
  const conversationParts = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }))

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: conversationParts,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.95,
        topK: 40
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`)
  }

  const data = await response.json()

  // Extract text from response
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('No text in Gemini response')
  }

  return text
}

// GET endpoint to check Sage status and get project info
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            members: true,
            subgroups: true,
            learningModules: true,
            discussions: true,
            researchPosts: true,
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      available: true,
      aiEnabled: !!GEMINI_API_KEY,
      project: {
        id: project.id,
        name: project.name,
        memberCount: project._count.members,
        subgroupCount: project._count.subgroups,
        learningModuleCount: project._count.learningModules,
        discussionCount: project._count.discussions,
        researchCount: project._count.researchPosts,
      }
    })

  } catch (error) {
    console.error('Project Sage status error:', error)
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    )
  }
}
