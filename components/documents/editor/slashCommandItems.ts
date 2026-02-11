import { Editor } from '@tiptap/react'
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Image as ImageIcon,
  Youtube,
  Quote,
  Code,
  Minus,
  Table as TableIcon,
  Info,
  AlertTriangle,
  Lightbulb,
  LucideIcon,
} from 'lucide-react'

export interface SlashCommandItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  category: 'text' | 'lists' | 'media' | 'blocks' | 'callouts'
  keywords: string[]
  action: (editor: Editor) => void
}

export const slashCommandItems: SlashCommandItem[] = [
  // Text commands
  {
    id: 'paragraph',
    title: 'Paragraph',
    description: 'Plain text paragraph',
    icon: Type,
    category: 'text',
    keywords: ['p', 'text', 'normal', 'plain'],
    action: (editor) => {
      editor.chain().focus().setParagraph().run()
    },
  },
  {
    id: 'heading1',
    title: 'Heading 1',
    description: 'Large section heading',
    icon: Heading1,
    category: 'text',
    keywords: ['h1', '#', 'title', 'large', 'big'],
    action: (editor) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    id: 'heading2',
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: Heading2,
    category: 'text',
    keywords: ['h2', '##', 'subtitle', 'medium'],
    action: (editor) => {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
  },
  {
    id: 'heading3',
    title: 'Heading 3',
    description: 'Small section heading',
    icon: Heading3,
    category: 'text',
    keywords: ['h3', '###', 'small', 'subheading'],
    action: (editor) => {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    },
  },

  // List commands
  {
    id: 'bullet-list',
    title: 'Bullet List',
    description: 'Create a bullet list',
    icon: List,
    category: 'lists',
    keywords: ['ul', 'unordered', '-', '*', 'bullets'],
    action: (editor) => {
      editor.chain().focus().toggleBulletList().run()
    },
  },
  {
    id: 'numbered-list',
    title: 'Numbered List',
    description: 'Create a numbered list',
    icon: ListOrdered,
    category: 'lists',
    keywords: ['ol', 'ordered', '1.', 'numbers'],
    action: (editor) => {
      editor.chain().focus().toggleOrderedList().run()
    },
  },
  {
    id: 'task-list',
    title: 'Task List',
    description: 'Track tasks with checkboxes',
    icon: ListChecks,
    category: 'lists',
    keywords: ['todo', 'checkbox', 'checklist', '[]', 'tasks'],
    action: (editor) => {
      editor.chain().focus().toggleTaskList().run()
    },
  },

  // Media commands
  {
    id: 'image',
    title: 'Image',
    description: 'Upload or embed an image',
    icon: ImageIcon,
    category: 'media',
    keywords: ['img', 'picture', 'photo', 'upload'],
    action: (editor) => {
      const url = window.prompt('Enter image URL:')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
  {
    id: 'embed',
    title: 'Embed',
    description: 'Embed YouTube, Vimeo, etc.',
    icon: Youtube,
    category: 'media',
    keywords: ['youtube', 'video', 'vimeo', 'iframe', 'media'],
    action: (editor) => {
      const url = window.prompt('Enter video URL (YouTube, Vimeo):')
      if (url) {
        // Convert YouTube URL to embed format
        let embedUrl = url
        const youtubeMatch = url.match(
          /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
        )
        if (youtubeMatch) {
          embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`
        }

        // Insert iframe as HTML
        editor
          .chain()
          .focus()
          .insertContent(
            `<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1rem 0;"><iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`
          )
          .run()
      }
    },
  },

  // Block commands
  {
    id: 'quote',
    title: 'Quote',
    description: 'Capture a quote',
    icon: Quote,
    category: 'blocks',
    keywords: ['blockquote', '>', 'quotation', 'cite'],
    action: (editor) => {
      editor.chain().focus().toggleBlockquote().run()
    },
  },
  {
    id: 'code-block',
    title: 'Code Block',
    description: 'Display code with syntax',
    icon: Code,
    category: 'blocks',
    keywords: ['```', 'codeblock', 'pre', 'syntax', 'programming'],
    action: (editor) => {
      editor.chain().focus().toggleCodeBlock().run()
    },
  },
  {
    id: 'divider',
    title: 'Divider',
    description: 'Horizontal rule separator',
    icon: Minus,
    category: 'blocks',
    keywords: ['hr', '---', 'line', 'separator', 'horizontal'],
    action: (editor) => {
      editor.chain().focus().setHorizontalRule().run()
    },
  },
  {
    id: 'table',
    title: 'Table',
    description: 'Insert a table',
    icon: TableIcon,
    category: 'blocks',
    keywords: ['grid', 'rows', 'columns', 'cells'],
    action: (editor) => {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    },
  },

  // Callout commands
  {
    id: 'callout-info',
    title: 'Info Callout',
    description: 'Highlight information',
    icon: Info,
    category: 'callouts',
    keywords: ['note', 'information', 'notice', 'tip', 'blue'],
    action: (editor) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'paragraph',
          attrs: { class: 'callout callout-info' },
          content: [
            {
              type: 'text',
              text: 'Info: ',
              marks: [{ type: 'bold' }],
            },
            {
              type: 'text',
              text: 'Your information here...',
            },
          ],
        })
        .run()

      // Apply callout styling via wrapper div
      const { from } = editor.state.selection
      const pos = from - 1
      editor
        .chain()
        .focus()
        .setNode('paragraph')
        .insertContentAt(pos, `<div class="callout-box callout-info" style="padding: 1rem; border-left: 4px solid var(--accent); background: var(--accent)/10; border-radius: 0.5rem; margin: 0.5rem 0;">`)
        .run()
    },
  },
  {
    id: 'callout-warning',
    title: 'Warning Callout',
    description: 'Highlight warnings',
    icon: AlertTriangle,
    category: 'callouts',
    keywords: ['alert', 'caution', 'danger', 'attention', 'yellow', 'orange'],
    action: (editor) => {
      editor
        .chain()
        .focus()
        .insertContent(
          `<div style="padding: 1rem; border-left: 4px solid var(--secondary); background: rgba(212, 102, 67, 0.1); border-radius: 0.5rem; margin: 0.5rem 0;"><strong>Warning:</strong> Your warning here...</div>`
        )
        .run()
    },
  },
  {
    id: 'callout-tip',
    title: 'Tip Callout',
    description: 'Share helpful tips',
    icon: Lightbulb,
    category: 'callouts',
    keywords: ['hint', 'suggestion', 'advice', 'helpful', 'green'],
    action: (editor) => {
      editor
        .chain()
        .focus()
        .insertContent(
          `<div style="padding: 1rem; border-left: 4px solid var(--primary); background: rgba(54, 118, 61, 0.1); border-radius: 0.5rem; margin: 0.5rem 0;"><strong>Tip:</strong> Your tip here...</div>`
        )
        .run()
    },
  },
]

// Category labels for grouping
export const categoryLabels: Record<SlashCommandItem['category'], string> = {
  text: 'Text',
  lists: 'Lists',
  media: 'Media',
  blocks: 'Blocks',
  callouts: 'Callouts',
}

// Category order for display
export const categoryOrder: SlashCommandItem['category'][] = [
  'text',
  'lists',
  'media',
  'blocks',
  'callouts',
]

// Helper function to filter commands based on search query
export function filterCommands(query: string): SlashCommandItem[] {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) {
    return slashCommandItems
  }

  return slashCommandItems.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(lowerQuery)
    const descriptionMatch = item.description.toLowerCase().includes(lowerQuery)
    const keywordMatch = item.keywords.some((keyword) =>
      keyword.toLowerCase().includes(lowerQuery)
    )

    return titleMatch || descriptionMatch || keywordMatch
  })
}

// Helper function to group commands by category
export function groupCommandsByCategory(
  commands: SlashCommandItem[]
): Map<SlashCommandItem['category'], SlashCommandItem[]> {
  const grouped = new Map<SlashCommandItem['category'], SlashCommandItem[]>()

  for (const category of categoryOrder) {
    const categoryCommands = commands.filter((cmd) => cmd.category === category)
    if (categoryCommands.length > 0) {
      grouped.set(category, categoryCommands)
    }
  }

  return grouped
}
