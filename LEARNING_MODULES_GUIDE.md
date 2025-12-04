# 📚 Learning Module System - Complete Guide

## 🎯 Overview

The learning module system allows users to track their progress through educational content, take quizzes, and see their learning journey in the "Your Volition" dashboard.

---

## 🗄️ Database Setup

### Step 1: Run Migration
```bash
npx prisma migrate dev --name add_learning_module_system
```

### Step 2: Seed Example Modules (Optional)
```bash
npx tsx prisma/seed-learning-modules.ts
```

This creates two example modules:
- **Carbon Footprint Basics** - Small quick-read module
- **Renewable Energy Fundamentals** - Large module with 5 tabs + quiz

---

## 📋 Module Types

### SMALL Modules
**Use for:** Quick facts, short guides, tips

**Features:**
- Single content view
- "Mark as Read" button at bottom
- No quiz required
- Completes immediately when marked as read

**Example Use Cases:**
- Quick sustainability tips
- Brief concept explanations
- Fast facts with citations

### LARGE Modules
**Use for:** In-depth courses, comprehensive guides

**Features:**
- Multiple tabs/sections for organized content
- Progress tracking (current tab, percentage)
- 5-question quiz at the end
- Requires perfect score (5/5) to complete
- Can retake quiz unlimited times

**Example Use Cases:**
- Complete topic deep-dives
- Multi-part courses
- Certification-style learning

---

## 🛠️ Creating Modules

### Method 1: Using Prisma Client (Code)

```typescript
import prisma from '@/lib/db/prisma'

// Create a SMALL module
const smallModule = await prisma.article.create({
  data: {
    title: 'Your Module Title',
    slug: 'your-module-slug',
    excerpt: 'Brief description',
    content: '<p>Your HTML content here</p>',
    status: 'PUBLISHED',
    publishedAt: new Date(),
    authorId: 'user-id-here',
    categoryId: 'category-id-here',

    // Learning module fields
    moduleType: 'SMALL',
    estimatedTime: 5, // minutes
    difficulty: 'Beginner', // or 'Intermediate', 'Advanced'
  }
})

// Create a LARGE module
const largeModule = await prisma.article.create({
  data: {
    title: 'Advanced Topic Course',
    slug: 'advanced-topic-course',
    excerpt: 'Master this topic in depth',
    content: 'This is a multi-section module',
    status: 'PUBLISHED',
    publishedAt: new Date(),
    authorId: 'user-id-here',
    categoryId: 'category-id-here',

    // Learning module fields
    moduleType: 'LARGE',
    estimatedTime: 30,
    difficulty: 'Advanced',

    // Tabs (sections)
    moduleTabs: [
      {
        title: 'Section 1: Introduction',
        content: '<h3>Introduction</h3><p>Your content...</p>'
      },
      {
        title: 'Section 2: Deep Dive',
        content: '<h3>Deep Dive</h3><p>More content...</p>'
      },
      // Add up to 10 tabs as needed
    ],

    // Quiz (5 questions required)
    quizQuestions: [
      {
        question: 'What is the main concept?',
        type: 'multiple_choice',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option B'
      },
      {
        question: 'True or False: This statement is correct.',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 'True'
      },
      // Add 3 more questions (5 total required)
    ]
  }
})
```

### Method 2: Direct Database Insert

Use your database GUI (like Prisma Studio, TablePlus, pgAdmin):

```bash
# Open Prisma Studio
npx prisma studio
```

1. Go to **Article** table
2. Click **Add record**
3. Fill in all fields including the new learning module fields
4. For JSON fields (`moduleTabs`, `quizQuestions`), use proper JSON format

---

## 📐 Content Structure

### HTML Content Guidelines

Your `content` and `moduleTabs[].content` should be HTML strings:

```html
<div class="space-y-4">
  <h3 class="text-xl font-bold">Section Title</h3>
  <p class="mb-4">Regular paragraph text...</p>

  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Point 1:</strong> Description</li>
    <li><strong>Point 2:</strong> Description</li>
  </ul>

  <div class="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
    <p class="font-bold">💡 Pro Tip</p>
    <p>Additional information...</p>
  </div>
</div>
```

**Supported Tailwind classes:**
- Typography: `text-xl`, `text-lg`, `font-bold`, `font-semibold`
- Spacing: `mb-4`, `mt-4`, `space-y-2`, `space-y-4`
- Lists: `list-disc`, `list-decimal`, `pl-6`
- Colors: `text-green-600`, `bg-blue-50`, `dark:bg-blue-950`
- Layout: `p-4`, `rounded-lg`

### Quiz Question Format

```typescript
// Multiple Choice
{
  question: 'What is the capital of France?',
  type: 'multiple_choice',
  options: ['London', 'Berlin', 'Paris', 'Madrid'],
  correctAnswer: 'Paris'
}

// True/False
{
  question: 'The Earth is flat.',
  type: 'true_false',
  options: ['True', 'False'],
  correctAnswer: 'False'
}
```

**Important:**
- Exactly 5 questions required
- `correctAnswer` must exactly match one of the `options`
- Users need 5/5 to pass (perfect score)

---

## 🎨 User Journey

### For Users

1. **Browse Modules** → Visit `/learn` page
2. **Start Module** → Click any module card
3. **Module Opens** → ModuleModal appears (auto-saves to "Your Learning")

**Small Module Flow:**
4. Read content
5. Click "Mark as Read" at bottom
6. ✅ Module completed!

**Large Module Flow:**
4. Navigate through tabs with "Next" button (auto-saves)
5. Reach final tab → "Start Quiz" button appears
6. Answer all 5 questions
7. **If 5/5:** ✅ Module completed!
8. **If < 5/5:** Choose to review module or retake quiz

### Tracking Progress

Users see their progress in **Your Volition** page → **Your Learning** widget:
- **Filter:** All | In Progress | Completed
- **Progress bars** for large modules
- **Checkmarks** for completed modules
- **Quiz stats** (attempts, score)

---

## 🔧 API Endpoints

### For Frontend Integration

```typescript
// Start/save a module
POST /api/learning/save
Body: { articleId: 'article-id' }

// Update progress (auto-called on "Next")
PATCH /api/learning/[progressId]/update
Body: { currentTabIndex: 2, progressPercentage: 40 }

// Submit quiz
POST /api/learning/[progressId]/quiz/submit
Body: { answers: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }

// Mark small module as read
PATCH /api/learning/[progressId]/mark-read

// Get user's modules (with optional filter)
GET /api/learning/user?filter=in_progress
GET /api/learning/user?filter=completed
GET /api/learning/user // all modules

// Remove from learning list
DELETE /api/learning/[progressId]
```

---

## 🎯 Best Practices

### Content Creation

1. **Keep it focused:** Each module should cover ONE topic well
2. **Use sections wisely:** 3-7 tabs is ideal for large modules
3. **Make quizzes meaningful:** Test key concepts, not trivia
4. **Estimate time accurately:** Helps users plan their learning

### Small Modules (< 10 minutes)
- Quick tips & tricks
- Brief introductions
- Fast facts
- Summary cards

### Large Modules (10-30 minutes)
- Complete topic coverage
- Step-by-step guides
- Certification courses
- In-depth analyses

### Quiz Questions
- Focus on key learnings
- Mix multiple choice and true/false
- Make distractors plausible but clearly wrong
- Test understanding, not memorization

---

## 📊 Progress Tracking

### What Gets Tracked

- **Status:** `IN_PROGRESS` or `COMPLETED`
- **Progress percentage:** 0-100%
- **Current tab:** Which section user is on
- **Quiz attempts:** How many times taken
- **Quiz score:** Last score achieved (0-5)
- **Timestamps:** Started, completed, last accessed

### Completion Criteria

**Small Module:**
- User clicks "Mark as Read" → Status = COMPLETED

**Large Module:**
- User completes ALL tabs
- User achieves 5/5 on quiz → Status = COMPLETED

---

## 🚀 Converting Existing Pages

If you have existing static learning pages (like `/app/learn/renewable-energy/page.tsx`), you can:

### Option 1: Keep Static, Add Database Entry
1. Keep the static page for SEO/content
2. Create matching database entry with same slug
3. Link will still work, progress will track

### Option 2: Full Migration
1. Copy content from static page
2. Create database entry with content
3. Delete static page
4. Users access via ModuleModal

---

## 📝 Example: Creating Your First Module

```typescript
// In your admin script or Prisma Studio

await prisma.article.create({
  data: {
    // Basic fields
    title: 'Composting 101',
    slug: 'composting-101',
    excerpt: 'Learn the basics of home composting',
    content: `
      <h3 class="text-xl font-bold mb-4">Why Compost?</h3>
      <p>Composting reduces waste and creates nutrient-rich soil!</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Reduces landfill waste by 30%</li>
        <li>Creates free fertilizer</li>
        <li>Reduces methane emissions</li>
      </ul>
    `,
    status: 'PUBLISHED',
    publishedAt: new Date(),

    // Required relationships
    authorId: 'your-user-id',
    categoryId: 'your-category-id',

    // Learning module specific
    moduleType: 'SMALL',
    estimatedTime: 5,
    difficulty: 'Beginner',
  }
})
```

---

## 🎓 Summary

Your learning module system is now complete with:
- ✅ Database schema for modules and progress
- ✅ 6 API routes for all operations
- ✅ ModuleModal for focused learning
- ✅ QuizComponent with perfect score requirement
- ✅ Progress tracking in Volition dashboard
- ✅ Filter system (All/In Progress/Completed)

**Next Steps:**
1. Run the migration when deploying
2. Create your first modules using the seed script or manually
3. Test the user journey
4. Build an admin UI for easier module creation (optional)

---

**Questions? Check the code examples in:**
- `prisma/seed-learning-modules.ts` - Full examples
- `components/learn/ModuleModal.tsx` - Frontend logic
- `app/api/learning/` - API implementation

Happy teaching, Professor Sage! 🎓
