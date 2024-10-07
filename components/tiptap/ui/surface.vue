<script setup lang="ts">
const props = withDefaults(defineProps<SurfaceProps>(), {
  range: undefined,
  withShadow: true,
  withBorder: true,
  class: undefined,
})

const wrapperClass = computed(() => twMerge(
  'bg-backgrounds-primary rounded-md',
  props.withShadow ? 'shadow' : '',
  props.withBorder ? 'border border-neutral-200 dark:border-neutral-800' : '',
  props.class,
))

const Surface = ref<HTMLDivElement>()

defineExpose({
  Surface,
})
</script>

<template>
  <div ref="Surface" :class="wrapperClass" v-bind="{ ...props }">
    <slot />
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from '#imports'

type SurfaceProps = {
  range?: any
  withShadow?: boolean
  withBorder?: boolean
  class?: HTMLAttributes['class']
}
</script>
