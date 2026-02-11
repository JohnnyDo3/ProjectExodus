'use client'

import { Mark, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export interface CommentMarkOptions {
  HTMLAttributes: Record<string, any>
  onCommentClick?: (commentId: string) => void
}

export interface CommentMarkStorage {
  comments: Map<string, { from: number; to: number; commentId: string; isResolved: boolean }>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    commentMark: {
      /**
       * Set a comment mark
       */
      setComment: (commentId: string) => ReturnType
      /**
       * Unset a comment mark
       */
      unsetComment: () => ReturnType
      /**
       * Toggle a comment mark
       */
      toggleComment: (commentId: string) => ReturnType
    }
  }
}

/**
 * CommentMark - TipTap extension for highlighting commented text ranges
 *
 * This extension creates a mark that highlights text associated with comments.
 * When text is selected and a comment is created, this mark is applied to show
 * the commented region with a yellow/amber background.
 */
export const CommentMark = Mark.create<CommentMarkOptions, CommentMarkStorage>({
  name: 'comment',

  addOptions() {
    return {
      HTMLAttributes: {},
      onCommentClick: undefined,
    }
  },

  addStorage() {
    return {
      comments: new Map(),
    }
  },

  addAttributes() {
    return {
      commentId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-comment-id'),
        renderHTML: (attributes) => {
          if (!attributes.commentId) {
            return {}
          }
          return {
            'data-comment-id': attributes.commentId,
          }
        },
      },
      isResolved: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-resolved') === 'true',
        renderHTML: (attributes) => {
          return {
            'data-resolved': attributes.isResolved ? 'true' : 'false',
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-comment-id]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const isResolved = HTMLAttributes['data-resolved'] === 'true'

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `comment-highlight ${isResolved ? 'comment-resolved' : 'comment-active'}`,
        style: isResolved
          ? 'background-color: rgba(156, 163, 175, 0.2); border-bottom: 2px solid rgba(156, 163, 175, 0.4); cursor: pointer;'
          : 'background-color: rgba(251, 191, 36, 0.3); border-bottom: 2px solid rgba(251, 191, 36, 0.6); cursor: pointer;',
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setComment:
        (commentId: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { commentId })
        },
      unsetComment:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
      toggleComment:
        (commentId: string) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, { commentId })
        },
    }
  },

  addProseMirrorPlugins() {
    const { onCommentClick } = this.options

    return [
      new Plugin({
        key: new PluginKey('commentClick'),
        props: {
          handleClick(view, pos, event) {
            const target = event.target as HTMLElement
            const commentId = target.getAttribute('data-comment-id')

            if (commentId && onCommentClick) {
              onCommentClick(commentId)
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})

/**
 * Create decorations for comments that don't use marks
 * This is useful for showing comment highlights based on position data
 * from the database without modifying the document content.
 */
export function createCommentDecorations(
  comments: Array<{
    id: string
    position: { from: number; to: number } | null
    isResolved: boolean
  }>,
  onCommentClick?: (commentId: string) => void
): Plugin {
  const key = new PluginKey('commentDecorations')

  return new Plugin({
    key,
    state: {
      init() {
        return DecorationSet.empty
      },
      apply(tr, decorationSet) {
        // Map decorations through document changes
        decorationSet = decorationSet.map(tr.mapping, tr.doc)

        // If comments were updated, rebuild decorations
        const meta = tr.getMeta(key)
        if (meta?.updateComments) {
          const decorations: Decoration[] = []

          for (const comment of meta.comments) {
            if (comment.position && comment.position.from < comment.position.to) {
              const { from, to } = comment.position

              // Make sure positions are within document bounds
              const docSize = tr.doc.content.size
              const validFrom = Math.max(0, Math.min(from, docSize))
              const validTo = Math.max(validFrom, Math.min(to, docSize))

              if (validFrom < validTo) {
                decorations.push(
                  Decoration.inline(validFrom, validTo, {
                    class: `comment-highlight ${comment.isResolved ? 'comment-resolved' : 'comment-active'}`,
                    'data-comment-id': comment.id,
                    style: comment.isResolved
                      ? 'background-color: rgba(156, 163, 175, 0.2); border-bottom: 2px solid rgba(156, 163, 175, 0.4); cursor: pointer;'
                      : 'background-color: rgba(251, 191, 36, 0.3); border-bottom: 2px solid rgba(251, 191, 36, 0.6); cursor: pointer;',
                  })
                )
              }
            }
          }

          return DecorationSet.create(tr.doc, decorations)
        }

        return decorationSet
      },
    },
    props: {
      decorations(state) {
        return this.getState(state)
      },
      handleClick(view, pos, event) {
        const target = event.target as HTMLElement
        const commentId = target.getAttribute('data-comment-id')

        if (commentId && onCommentClick) {
          onCommentClick(commentId)
          return true
        }

        return false
      },
    },
  })
}

/**
 * Helper function to update comment decorations
 */
export function updateCommentDecorations(
  view: any,
  comments: Array<{
    id: string
    position: { from: number; to: number } | null
    isResolved: boolean
  }>
) {
  const key = new PluginKey('commentDecorations')
  const tr = view.state.tr.setMeta(key, {
    updateComments: true,
    comments,
  })
  view.dispatch(tr)
}

export default CommentMark
