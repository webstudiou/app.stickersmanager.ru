<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <tiptap-bubble-menu plugin-key="text-menu" :editor :update-delay="0">
    cgfh
  </tiptap-bubble-menu>
</template>

<script lang="ts">
import type { Editor } from '@tiptap/vue-3'

type Props = {
  editor: Editor
}
</script>
