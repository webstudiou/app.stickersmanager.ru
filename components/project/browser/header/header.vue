<script setup lang="ts">
const { title } = useCrumbs()
</script>

<template>
  <div class="relative flex items-center w-full gap-2.5 min-h-[--row-min-height] p-2.5 bg-gray-6">
    <!--    z-index: 10; -->
    <div>
      {{ useLangs(title) }}
    </div>
    <div class="flex items-center" />
  </div>
</template>
