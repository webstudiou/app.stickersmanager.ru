<script setup lang="ts">
import { useStoreStickers } from '~/stores'

const storeStickers = useStoreStickers()
const columns = computed(() => storeStickers.columns)
</script>

<template>
  <div class="relative flex items-center h-[--row-min-height] transition-all cursor-pointer gap-1.5 border-t border-t-transparent border-b border-b-transparent will-change-scroll before:transition-all before:-mx-px before:border-t before:border-t-gray-5 before:w-full before:block before:left-0 before:right-0 before:-top-px before:absolute">
    <!--    text-rendering: optimizelegibility; opacity: 0; -->
    <sticker-browser-default-sticker-column v-for="(column, idx) in columns" :key="idx" :column="column">
      <template v-if="column.key === 'title'">
        <els-icon name="square" class="text-muted" />
        <div class="w-full overflow-hidden truncate contain-content">
          title
        </div>
      </template>
    </sticker-browser-default-sticker-column>
  </div>
</template>
