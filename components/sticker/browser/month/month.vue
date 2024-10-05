<script setup lang="ts">
const datasets = reactive({
  filters: false,
})
</script>

<template>
  <div class="relative flex flex-col flex-auto overflow-hidden">
    <sticker-browser-header v-model="datasets.filters" />
    <sticker-browser-filters v-model="datasets.filters" />
  </div>
</template>
