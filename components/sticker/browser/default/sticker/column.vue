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
  <div v-if="column.key === 'title' && column.visible" :style class="sticky top-0 bottom-0 mt-px h-[calc(100%_-_1px)] -left-[2px] bg-yellow rounded-sm z-1 gap-1.5 pl-2.5 self-start flex items-center contain-content bg-backgrounds-primary">
    <slot />title
  </div>
  <div v-else-if="column.key === 'id' && column.visible" :style class="bg-red px-1.5">
    <span class="bg-gray-6 rounded-xs px-1 py-0.5">
      id
    </span>
  </div>
  <div v-else-if="column.key === 'project' && column.visible" :style class="flex items-center contain-content overflow-hidden gap-1.5 bg-green px-1.5">
    <slot />
    project
  </div>
  <div v-else-if="column.key === 'board' && column.visible" :style class="flex items-center contain-content overflow-hidden gap-1.5 bg-green px-1.5">
    <slot />board
  </div>
  <div v-else-if="column.key === 'column' && column.visible" :style class="flex items-center contain-content overflow-hidden gap-1.5 bg-green px-1.5">
    <slot />column
  </div>
  <div v-else-if="column.key === 'executor' && column.visible" :style class="relative flex items-center justify-start overflow-hidden truncate transition-none">
    <slot />executor
  </div>
  <div v-else-if="column.key === 'dates' && column.visible" :style class="relative bg-green px-1.5">
    <slot />dates
  </div>
  <div v-else-if="column.key === 'priority' && column.visible" :style class=" bg-green px-1.5">
    <slot />priority
  </div>
  <div v-else-if="column.key === 'tags' && column.visible" :style class="overflow-hidden contain-content bg-green px-1.5">
    <slot />tags
  </div>
  <div v-else-if="column.key === 'actions' && column.visible" :style class="flex items-center contain-content gap-1.5 justify-end ml-auto pr-2.5 bg-green">
    <slot />actions
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

type Props = {
  column: StickerBrowserDefaultColumn
}
</script>
