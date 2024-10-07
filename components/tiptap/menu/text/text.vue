<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {})

const commands = useTextmenuCommands(props.editor)
const states = useTextmenuStates(props.editor)
</script>

<template>
  <tiptap-bubble-menu
    plugin-key="text-menu"
    :editor
    :should-show="states.shouldShow"
    :update-delay="100"
    :typpy-options="{
      maxWidth: 'calc(100% - 16px)',
      popperOptions: {
        placement: 'top-start',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              padding: 8,
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
            },
          },
        ],
      },
    }"
  >
    <tiptap-ui-toolbar>
      <tiptap-ui-toolbar-button tooltip="Bold" :active="states.isBold" @click="commands.onBold" />

      <els-divider orientation="vertical" />
      <els-divider orientation="vertical" />
    </tiptap-ui-toolbar>
  </tiptap-bubble-menu>
</template>

<script lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { useTextmenuStates, useTextmenuCommands } from '~/composables/editor'

type Props = {
  editor: Editor
}
</script>
