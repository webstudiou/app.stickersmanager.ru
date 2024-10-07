<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  shouldShowContent: true,
  isVertical: true,
  class: undefined,
})

const wrapperClass = computed(() => twMerge(
  'text-black inline-flex h-full leading-none gap-0.5',
  props.isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center',
  props.class,
))
</script>

<template>
  <tiptap-ui-surface v-if="shouldShowContent" :class="wrapperClass">
    <slot />
  </tiptap-ui-surface>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from '#imports'

type Props = {
  shouldShowContent?: boolean
  isVertical?: boolean
  class?: HTMLAttributes['class']
}
</script>
