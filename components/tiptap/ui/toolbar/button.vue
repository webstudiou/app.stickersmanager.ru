<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  active: false,
  activeClass: undefined,
  tooltip: undefined,
  tooltipShortcut: () => [],
  class: undefined,
})

const wrapperClass = computed(() => twMerge(
  'gap-1 min-w-[2rem] px-2 w-auto',
  props.class,
))
</script>

<template>
  <tiptap-ui-tooltip v-if="tooltip" :title="tooltip" :shortcut="tooltipShortcut">
    <tiptap-ui-button :class="wrapperClass" :active-class="activeClass">
      <slot />
    </tiptap-ui-button>
  </tiptap-ui-tooltip>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from '#imports'
// import { useData, useContentItemActions } from '~/composables/editor'

type Props = {
  active?: boolean
  activeClass?: string
  tooltip?: string
  tooltipShortcut?: string[]
  // buttonSize?: ButtonProps['buttonSize']
  // variant?: ButtonProps['variant']
  class?: HTMLAttributes['class']
}
</script>
