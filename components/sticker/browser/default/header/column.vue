<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useResizable, useStoreStickers } from '#imports'

const props = withDefaults(defineProps<Props>(), {})

const storeStickers = useStoreStickers()

const style = computed(() => {
  return {
    width: `${width.value}px`,
    minWidth: `${props.column.minWidth}px`,
  } as CSSProperties
})

const { el, width, onDrag, isDragging } = useResizable(props.column.key, { ...({ min: props.column.minWidth }), value: props.column.width, storage: '' })

watch(width, newWidth => storeStickers.columns.forEach((_col) => {
  if (_col.key === props.column.key) _col.width = newWidth
}))
</script>

<template>
  <div
    v-if="column.visible"
    ref="el"
    class="whitespace-nowrap group select-none"
    :class="[isDragging && 'cursor-col-resize', column.key==='title' ? 'sticky top-0 left-0 bg-backgrounds-primary z-1' : 'relative']"
    :style
  >
    <div class="flex items-center h-full transition-[background-color] rounded-xs" :class="[isDragging && 'bg-gray-6', column.key==='title' ? 'pl-2.5' : '-ml-2.5 pl-2.5']">
      <div class="truncate">
        {{ useLangs(`pages.dashboard.stickers.tables.headings.${column.key}`) }}
      </div>
      <div
        v-if="column.resize"
        class="absolute -right-[5px] w-[10px] px-[2px] transition-[opacity] opacity-0 group-hover:opacity-100"
        :class="[isDragging ? 'cursor-col-resize' : 'hover:cursor-grab']"
        @mousedown="onDrag"
      >
        <div class="flex flex-center w-[6px] transition-[background-color] bg-backgrounds-primary h-[24px] rounded-[123px]">
          <div class="w-[2px] bg-primary rounded-[2px] h-[20px] transition-[background-color]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  column: StickerBrowserDefaultColumn
}
</script>
