<script setup lang="ts">
import { useStoreConfigs } from '~/stores'

const storeConfigs = useStoreConfigs()
const browser = computed(() => storeConfigs.browser)
</script>

<template>
  <sticker-browser-default v-if="browser === 'default'" />
  <sticker-browser-month v-else-if="browser === 'month'" />
  <sticker-browser-week v-else-if="browser === 'week'" />
  <sticker-browser-gantt v-else-if="browser === 'gantt'" />
  <sticker-browser-matrix v-else-if="browser === 'matrix'" />
</template>

<style scoped>

</style>
