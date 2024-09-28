<script setup lang="ts">
import { useStoreStickers } from '~/stores'

const storeStickers = useStoreStickers()
const columns = computed(() => storeStickers.columns)
</script>

<template>
  <div class="sticky top-0 flex items-center bg-backgrounds-primary border-b border-backgrounds-secondary gap-1.5 z-2 pr-[4px] min-h-[--row-min-height]">
    <div class="h-full w-[2px]" />
    <sticker-browser-default-header-column
      v-for="(column, idx) in columns"
      :key="idx"
      :column="column"
      :class="[idx===0 && 'pl-0.5']"
    />
  </div>
</template>
