'use client'

import { Extension, ReactRenderer } from '@tiptap/react'
import Suggestion, { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'
import { Editor } from '@tiptap/core'
import { ReactNode } from 'react'
import { SlashCommandMenu, SlashCommandMenuRef } from './SlashCommandMenu'
import { SlashCommandItem, slashCommandItems, filterCommands } from './slashCommandItems'

// Plugin key for the slash commands
const SlashCommandsPluginKey = new PluginKey('slashCommands')

// Type for the suggestion options
interface SlashCommandSuggestionOptions {
  suggestion: Omit<SuggestionOptions<SlashCommandItem>, 'editor'>
}

// Create the Slash Commands extension
export const SlashCommands = Extension.create<SlashCommandSuggestionOptions>({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: false,
        pluginKey: SlashCommandsPluginKey,

        command: ({ editor, range, props }) => {
          // Delete the slash and search text
          editor.chain().focus().deleteRange(range).run()

          // Execute the command action
          if (props && typeof props.action === 'function') {
            props.action(editor)
          }
        },

        items: ({ query }) => {
          return filterCommands(query)
        },

        render: () => {
          let component: ReactRenderer<SlashCommandMenuRef> | null = null
          let popup: HTMLDivElement | null = null

          return {
            onStart: (props: SuggestionProps<SlashCommandItem>) => {
              // Create the popup container
              popup = document.createElement('div')
              popup.id = 'slash-command-popup'
              document.body.appendChild(popup)

              // Create the React renderer
              component = new ReactRenderer(SlashCommandMenu, {
                props: {
                  ...props,
                  command: (item: SlashCommandItem) => {
                    props.command(item)
                  },
                },
                editor: props.editor,
              })

              // Mount to popup
              if (component.element) {
                popup.appendChild(component.element)
              }
            },

            onUpdate: (props: SuggestionProps<SlashCommandItem>) => {
              if (component) {
                component.updateProps({
                  ...props,
                  command: (item: SlashCommandItem) => {
                    props.command(item)
                  },
                })
              }
            },

            onKeyDown: (props: { event: KeyboardEvent }) => {
              if (props.event.key === 'Escape') {
                if (popup) {
                  popup.remove()
                  popup = null
                }
                if (component) {
                  component.destroy()
                  component = null
                }
                return true
              }

              // Forward key events to the menu component
              if (component?.ref) {
                return component.ref.onKeyDown(props)
              }

              return false
            },

            onExit: () => {
              if (popup) {
                popup.remove()
                popup = null
              }
              if (component) {
                component.destroy()
                component = null
              }
            },
          }
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

export default SlashCommands
