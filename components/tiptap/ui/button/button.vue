<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  active: false,
  activeClass: undefined,
  disabled: false,
  class: undefined,
})

const wrapperClass = computed(() => twMerge(
  'flex group items-center justify-center border border-transparent gap-2 text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap',
  props.class,
))
</script>

<template>
  <button :class="wrapperClass" :disabled>
    <slot />
  </button>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from '#imports'

type Props = {
  active?: boolean
  activeClass?: string
  // buttonSize?: ButtonProps['buttonSize']
  // variant?: ButtonProps['variant']
  disabled?: boolean
  class?: HTMLAttributes['class']
}
</script>
