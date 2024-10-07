<script setup lang="ts">
import { useStoreStickers } from '#imports'

const datasets = reactive({
  filters: false,
})

onMounted(async () => {
  const storeStickers = useStoreStickers()
  await storeStickers.init()
})
</script>

<template>
  <div class="relative flex flex-col flex-auto overflow-hidden">
    <sticker-browser-header v-model="datasets.filters" />
    <sticker-browser-filters v-model="datasets.filters" />
    <div class="relative grid grid-rows-[max-content_1fr] h-full overflow-auto bg-backgrounds-primary">
      <sticker-browser-default-header />
      <sticker-browser-default-rows />
    </div>
  </div>
</template>
