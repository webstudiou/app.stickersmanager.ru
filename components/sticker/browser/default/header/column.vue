<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useResizable } from '~/composables'
import { useStoreStickers } from '~/stores'

const props = withDefaults(defineProps<Props>(), {})

const storeStickers = useStoreStickers()

const style = computed(() => {
  return {
    width: `${width.value}px`,
    minWidth: `${props.column.minWidth}px`,
  } as CSSProperties
})

const { el, width, onDrag, isDragging } = useResizable(props.column.key, { ...({ min: props.column.minWidth }), value: props.column.width })

watch(width, newWidth => storeStickers.columns.forEach((_col) => {
  if (_col.key === props.column.key) _col.width = newWidth
}))
</script>

<template>
  <div
    v-if="column.visible"
    ref="el"
    class="relative whitespace-nowrap group select-none"
    :class="[isDragging && 'cursor-grab']"
    :style
  >
    <div class="flex items-center h-full -ml-[8px] pl-[8px] transition-[background-color] rounded-[4px]">
      <div class="truncate">
        {{ useLangs(`pages.dashboard.stickers.tables.headings.${column.key}`) }}
      </div>
      <div
        v-if="column.resize"
        class="absolute cursor-grab -right-[5px] w-[10px] px-[2px] transition-[opacity] opacity-0 group-hover:opacity-100"
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
