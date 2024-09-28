<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  resize: false,
  class: '',
})

const columnStyle = (column: StickerBrowserDefaultColumn) => {
  return {
    width: `${column.width}px`,
    minWidth: `${column.width}px`,
  } as CSSProperties
}
</script>

<template>
  <div v-if="column.visible" class="relative whitespace-nowrap group" :style="columnStyle(column)">
    <div class="flex items-center h-full -ml-[8px] pl-[8px] transition-[background-color] rounded-[4px]" :class>
      <div class="truncate">
        {{ column.key }}
      </div>
      <div class="absolute cursor-grab -right-[5px] w-[10px] px-[2px] transition-[opacity] opacity-0 group-hover:opacity-100">
        <div class="flex flex-center w-[6px] transition-[background-color] bg-backgrounds-primary h-[24px] rounded-[123px]">
          <div class="w-[2px] bg-primary rounded-[2px] h-[20px] transition-[background-color]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes, CSSProperties } from 'vue'

type Props = {
  column: StickerBrowserDefaultColumn
  resize?: boolean
  class?: HTMLAttributes['class']
}
</script>
