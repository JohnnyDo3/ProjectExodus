# API Utilities

This directory contains reusable utilities for Next.js API routes.

## withAuth

A higher-order function that wraps API route handlers with authentication and authorization.

### Features

- **Basic Authentication**: Ensures user is logged in
- **Role-Based Access**: Restricts access based on user roles
- **Ownership Checking**: Helper function to verify resource ownership
- **Consistent Error Responses**: Returns standardized 401/403 error messages
- **Session Passing**: Automatically passes session to handler (no need to call auth() again)

### Usage Examples

#### Basic Authentication

```typescript
import { withAuth } from "@/lib/api/withAuth"
import { NextResponse } from "next/server"

export const GET = withAuth(async (req, session) => {
  // session is guaranteed to exist here
  return NextResponse.json({
    userId: session.user.id,
    email: session.user.email,
  })
})
```

#### Role-Based Authorization

```typescript
import { withAuth } from "@/lib/api/withAuth"
import { NextResponse } from "next/server"

// Only ADMIN can access
export const DELETE = withAuth(async (req, session) => {
  // Perform admin-only operations
  return NextResponse.json({ message: "Resource deleted" })
}, { roles: ['ADMIN'] })

// ADMIN or EDITOR can access
export const PUT = withAuth(async (req, session) => {
  // Perform editor operations
  return NextResponse.json({ message: "Resource updated" })
}, { roles: ['ADMIN', 'EDITOR'] })
```

#### Ownership Checking

```typescript
import { withAuth, checkOwnership } from "@/lib/api/withAuth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const DELETE = withAuth(async (req, session, { params }) => {
  const post = await prisma.post.findUnique({
    where: { id: params.id }
  })

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    )
  }

  // Check if user owns the post (or is admin)
  if (!checkOwnership(session, post.userId)) {
    return NextResponse.json(
      { error: "Forbidden - You can only delete your own posts" },
      { status: 403 }
    )
  }

  await prisma.post.delete({ where: { id: params.id } })
  return NextResponse.json({ message: "Post deleted successfully" })
}, { ownerField: 'userId' })
```

#### Complex Example: Combining Multiple Checks

```typescript
import { withAuth, checkOwnership } from "@/lib/api/withAuth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Only logged-in users can update, but with additional ownership check
export const PATCH = withAuth(async (req, session, { params }) => {
  const { title, content } = await req.json()

  const article = await prisma.article.findUnique({
    where: { id: params.id }
  })

  if (!article) {
    return NextResponse.json(
      { error: "Article not found" },
      { status: 404 }
    )
  }

  // EDITORs can edit any article, but regular users can only edit their own
  const canEdit = session.user.role === 'EDITOR' ||
                  session.user.role === 'ADMIN' ||
                  checkOwnership(session, article.authorId)

  if (!canEdit) {
    return NextResponse.json(
      { error: "Forbidden - You can only edit your own articles" },
      { status: 403 }
    )
  }

  const updated = await prisma.article.update({
    where: { id: params.id },
    data: { title, content }
  })

  return NextResponse.json(updated)
})
```

### API Reference

#### `withAuth(handler, options?)`

**Parameters:**
- `handler`: `(req: NextRequest, session: Session, context?: any) => Promise<NextResponse>`
  - The API route handler function
  - Receives the request, authenticated session, and optional context
  - Must return a NextResponse

- `options?`: `AuthOptions`
  - `roles?`: `string[]` - Array of allowed roles (e.g., `['ADMIN', 'EDITOR']`)
  - `ownerField?`: `string` - Field name for ownership checking (documentation purposes)

**Returns:**
- `(req: NextRequest, context?: any) => Promise<NextResponse>` - Wrapped handler function

#### `checkOwnership(session, resourceOwnerId)`

**Parameters:**
- `session`: `Session` - The user session object
- `resourceOwnerId`: `string` - The ID of the resource owner to compare against

**Returns:**
- `boolean` - `true` if user owns the resource or is an admin, `false` otherwise

### Error Responses

The wrapper returns consistent error responses:

**401 Unauthorized:**
```json
{
  "error": "Unauthorized - Please sign in",
  "status": 401
}
```

**403 Forbidden (Role-based):**
```json
{
  "error": "Forbidden - Required role: ADMIN or EDITOR",
  "status": 403
}
```

**403 Forbidden (Ownership):**
```json
{
  "error": "Forbidden - You can only delete your own posts",
  "status": 403
}
```

### Best Practices

1. **Use Basic Auth by Default**: Start with basic authentication and add role/ownership checks only when needed
2. **Combine with Ownership Checks**: Use `checkOwnership()` helper for fine-grained access control
3. **Consistent Error Messages**: Provide clear, user-friendly error messages in your handlers
4. **Leverage Session**: Access `session.user.id`, `session.user.role`, etc. without calling `auth()` again
5. **Admin Bypass**: The `checkOwnership()` function automatically allows ADMIN and SUPER_ADMIN roles
