<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {})

const wrapperClass = computed(() => twMerge(
  'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left bg-transparent w-full rounded-sm',
  (!props.isActive && !props.disabled) && 'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200',
  (props.isActive && !props.disabled) && 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
  props.disabled && 'text-neutral-400 cursor-not-allowed dark:text-neutral-600',
  props.class,
))
</script>

<template>
  <button
    :class="wrapperClass"
    :disabled
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from '#imports'

type Props = {
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
  class?: HTMLAttributes['class']
}
</script>
