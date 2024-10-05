<script setup lang="ts">
const datasets = reactive({
  filters: false,
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
