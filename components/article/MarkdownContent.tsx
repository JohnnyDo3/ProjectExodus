'use client'

import { sanitizeHtml } from '@/lib/utils/sanitize'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown to HTML conversion for basic syntax
  const convertMarkdownToHTML = (markdown: string): string => {
    let html = markdown

    // Headers - using CSS classes that respect dark mode
    html = html.replace(/^### (.+)$/gm, '<h3 class="article-h3">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="article-h2">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="article-h1">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-black">$1</strong>')

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="article-link" target="_blank" rel="noopener noreferrer">$1</a>')

    // Lists - Ordered
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="article-li">$1</li>')
    html = html.replace(/(<li class="article-li">.*<\/li>\n?)+/g, '<ol class="article-ol">$&</ol>')

    // Lists - Unordered
    html = html.replace(/^[-*]\s+(.+)$/gm, '<li class="article-li-ul">$1</li>')
    html = html.replace(/(<li class="article-li-ul">.*<\/li>\n?)+/g, '<ul class="article-ul">$&</ul>')

    // Paragraphs
    html = html.split('\n\n').map(para => {
      // Don't wrap headers, lists
      if (para.match(/^<[houl]/)) return para
      if (para.trim() === '') return ''
      return `<p class="article-p">${para}</p>`
    }).join('\n')

    // Line breaks
    html = html.replace(/\n/g, '<br />')

    return html
  }

  return (
    <div
      className="article-content text-earth-800 dark:text-sand-200"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(convertMarkdownToHTML(content)) }}
    />
  )
}
