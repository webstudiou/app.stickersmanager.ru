<script setup lang="ts">
import { useStoreStickers } from '~/stores'

const storeStickers = useStoreStickers()
const browser = computed(() => storeStickers.browser)
</script>

<template>
  <app-page class="bg-gray-6">
    <sticker-browser-default v-if="browser === 'default'" />
    <sticker-browser-month v-else-if="browser === 'month'" />
    <sticker-browser-week v-else-if="browser === 'week'" />
    <sticker-browser-gantt v-else-if="browser === 'gantt'" />
    <sticker-browser-matrix v-else-if="browser === 'matrix'" />
    <sticker-browser-boards v-else-if="browser === 'boards'" />

    <sticker-entry />
  </app-page>
</template>
