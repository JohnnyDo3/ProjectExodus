# withAuth Usage Examples

Real-world examples demonstrating how to refactor existing Project Exodus API routes using the `withAuth` utility.

## Example 1: Basic Authentication (Social Post)

### Before (Current Pattern)
```typescript
// app/api/social/post/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content, visibility = 'PUBLIC' } = body

    const post = await prisma.socialPost.create({
      data: {
        content: content.trim(),
        visibility,
        userId: session.user.id,
      }
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
```

### After (Using withAuth)
```typescript
// app/api/social/post/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/withAuth'
import { prisma } from '@/lib/db'

export const POST = withAuth(async (req, session) => {
  try {
    const body = await req.json()
    const { content, visibility = 'PUBLIC' } = body

    const post = await prisma.socialPost.create({
      data: {
        content: content.trim(),
        visibility,
        userId: session.user.id, // session is guaranteed to exist
      }
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
})
```

**Benefits:**
- Removes boilerplate auth check
- Cleaner, more focused code
- Session is guaranteed to exist (TypeScript-safe)
- Consistent error responses

---

## Example 2: Role-Based Authorization (Admin Products)

### Before (Current Pattern)
```typescript
// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user to check role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const products = await prisma.userProduct.findMany({
      include: {
        seller: {
          select: { id: true, name: true, email: true, image: true }
        }
      },
      orderBy: [
        { approvalStatus: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### After (Using withAuth)
```typescript
// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/withAuth'
import { prisma } from '@/lib/db'

export const GET = withAuth(async (req, session) => {
  try {
    const products = await prisma.userProduct.findMany({
      include: {
        seller: {
          select: { id: true, name: true, email: true, image: true }
        }
      },
      orderBy: [
        { approvalStatus: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}, { roles: ['ADMIN', 'SUPER_ADMIN'] })
```

**Benefits:**
- Eliminates role checking boilerplate
- No need for extra database query to fetch user role (already in session)
- Clear declaration of required roles in options
- 50% less code
- Consistent error messages

---

## Example 3: Ownership Check (Delete Social Post)

### Before (Current Pattern)
```typescript
// app/api/social/post/route.ts
export async function DELETE(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('id')

    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Check if user owns the post
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      select: { userId: true }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.socialPost.delete({
      where: { id: postId }
    })

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
```

### After (Using withAuth + checkOwnership)
```typescript
// app/api/social/post/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth, checkOwnership } from '@/lib/api/withAuth'
import { prisma } from '@/lib/db'

export const DELETE = withAuth(async (req, session) => {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('id')

    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      select: { userId: true }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // Simple ownership check with admin bypass
    if (!checkOwnership(session, post.userId)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - You can only delete your own posts' },
        { status: 403 }
      )
    }

    await prisma.socialPost.delete({
      where: { id: postId }
    })

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}, { ownerField: 'userId' })
```

**Benefits:**
- Auth check removed from handler
- Simple `checkOwnership()` helper handles both user check and admin bypass
- More descriptive error message
- `ownerField` option documents the ownership requirement
- Cleaner code flow

---

## Example 4: Complex Route with Params (Article Management)

### Using withAuth with Next.js Route Params
```typescript
// app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth, checkOwnership } from '@/lib/api/withAuth'
import { prisma } from '@/lib/db'

// GET - Public (no auth required)
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { id: true, name: true, image: true }
      }
    }
  })

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json({ article })
}

// PATCH - Requires ownership or EDITOR role
export const PATCH = withAuth(async (req, session, { params }) => {
  const { title, content, published } = await req.json()

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { id: true, authorId: true }
  })

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  // EDITORs can edit any article, regular users only their own
  const canEdit =
    session.user.role === 'EDITOR' ||
    session.user.role === 'ADMIN' ||
    checkOwnership(session, article.authorId)

  if (!canEdit) {
    return NextResponse.json(
      { error: 'Forbidden - You can only edit your own articles' },
      { status: 403 }
    )
  }

  const updated = await prisma.article.update({
    where: { id: article.id },
    data: { title, content, published }
  })

  return NextResponse.json({ article: updated })
})

// DELETE - Requires ownership or ADMIN role
export const DELETE = withAuth(async (req, session, { params }) => {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { id: true, authorId: true }
  })

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  if (!checkOwnership(session, article.authorId)) {
    return NextResponse.json(
      { error: 'Forbidden - You can only delete your own articles' },
      { status: 403 }
    )
  }

  await prisma.article.delete({ where: { id: article.id } })

  return NextResponse.json({ message: 'Article deleted successfully' })
}, { ownerField: 'authorId' })
```

---

## Example 5: Multi-Method Route with Different Auth Requirements

```typescript
// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/withAuth'
import { prisma } from '@/lib/db'

// GET - Public (no auth)
export async function GET(req: NextRequest) {
  const projects = await prisma.project.findMany({
    where: { status: 'ACTIVE' },
    include: {
      owner: {
        select: { id: true, name: true, image: true }
      }
    }
  })

  return NextResponse.json({ projects })
}

// POST - Requires authentication
export const POST = withAuth(async (req, session) => {
  const { title, description, category } = await req.json()

  const project = await prisma.project.create({
    data: {
      title,
      description,
      category,
      ownerId: session.user.id,
      status: 'ACTIVE'
    }
  })

  return NextResponse.json({ project }, { status: 201 })
})

// DELETE - Admin only
export const DELETE = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('id')

  if (!projectId) {
    return NextResponse.json(
      { error: 'Project ID is required' },
      { status: 400 }
    )
  }

  await prisma.project.delete({ where: { id: projectId } })

  return NextResponse.json({ message: 'Project deleted' })
}, { roles: ['ADMIN'] })
```

---

## Migration Checklist

When refactoring existing routes to use `withAuth`:

1. **Import the utility:**
   ```typescript
   import { withAuth, checkOwnership } from '@/lib/api/withAuth'
   ```

2. **Remove auth boilerplate:**
   - Delete `const session = await auth()`
   - Remove `if (!session?.user?.id)` checks
   - Remove manual role checking logic

3. **Update handler signature:**
   - Change `async function POST(request: Request)` to `const POST = withAuth(async (req, session) => { ... })`
   - Update Request to NextRequest for consistency

4. **Add auth options:**
   - For role-based: `{ roles: ['ADMIN'] }`
   - For ownership: `{ ownerField: 'userId' }` and use `checkOwnership()`

5. **Update type imports:**
   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   ```

6. **Test the route:**
   - Verify unauthorized access (401)
   - Verify forbidden access (403)
   - Verify successful authenticated requests
