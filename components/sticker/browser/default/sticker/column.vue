<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {})

const style = computed(() => {
  return {
    width: `${props.column.width}px`,
    minWidth: `${props.column.minWidth}px`,
  } as CSSProperties
})
</script>

<template>
  <div v-if="column.key === 'title'" :style class="sticky top-0 bottom-0 mt-px h-[calc(100%_-_1px)] -left-[2px] rounded-sm z-1 gap-1.5 pl-2.5 self-start flex items-center contain-content bg-backgrounds-primary">
    <slot />
  </div>
  <div v-else-if="column.key === 'id'" :style>
    // id
  </div>
  <div v-else-if="column.key === 'project'" :style class="flex items-center contain-content overflow-hidden gap-1.5">
    <slot />
  </div>
  <div v-else-if="column.key === 'board'" :style class="flex items-center contain-content overflow-hidden gap-1.5">
    <slot />
  </div>
  <div v-else-if="column.key === 'column'" :style class="flex items-center contain-content overflow-hidden gap-1.5">
    <slot />
  </div>
  <div v-else-if="column.key === 'executor'" :style class="relative flex items-center justify-start overflow-hidden truncate transition-none">
    <slot />
  </div>
  <div v-else-if="column.key === 'dates'" :style class="relative">
    <slot />
  </div>
  <div v-else-if="column.key === 'priority'" :style>
    <slot />
  </div>
  <div v-else-if="column.key === 'tags'" :style class="overflow-hidden contain-content">
    <slot />
  </div>
  <div v-else-if="column.key === 'actions'" :style class="flex items-center contain-content gap-1.5 justify-end ml-auto pr-2.5">
    <slot />
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

type Props = {
  column: StickerBrowserDefaultColumn
}
</script>
