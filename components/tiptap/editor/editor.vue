<script setup lang="ts">
import { useEditor } from '@tiptap/vue-3'
import type { AnyExtension } from '@tiptap/core'
import { ExtensionKit } from '~/utils'

const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Next.js + Tiptap Block Editor Template',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '1 Welcome to our React Block Editor Template built on top of ',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Next.js + Tiptap Block Editor Template',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '2 Welcome to our React Block Editor Template built on top of ',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Next.js + Tiptap Block Editor Template',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '3 Welcome to our React Block Editor Template built on top of ',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'Next.js + Tiptap Block Editor Template',
        },
      ],
    },
  ],
}

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<{
  (e: 'change' | 'update:model-value', value?: object | string | null): void
}>()

const editor = useEditor(
  {
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    onCreate: (ctx) => {
      if (ctx.editor.isEmpty) {
        ctx.editor.commands.setContent(JSON.parse(props.modelValue) ?? initialContent)
        ctx.editor.commands.focus('start', { scrollIntoView: true })
      }
    },
    onUpdate: ({ editor }) => {
      emits('update:model-value', editor.getJSON())
      emits('change', editor.getJSON())
    },
    extensions: [
      ...ExtensionKit(),
    ].filter((e): e is AnyExtension => e !== undefined),
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'min-h-full',
      },
    },
  },
)

watch (
  () => props.modelValue,
  (newValue) => {
    if (JSON.stringify(editor.value.getJSON()) === JSON.stringify(newValue)) return
    editor.value.commands.setContent(newValue, false)
  },
)

onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>

<template>
  <div class="relative grid grid-rows-[1fr] w-full h-full">
    <div class="relative overflow-auto cursor-text z-1 p-1.5 pl-2.5">
      <tiptap-editor-content v-if="editor" :editor />
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  modelValue: object | string | null
}
</script>
