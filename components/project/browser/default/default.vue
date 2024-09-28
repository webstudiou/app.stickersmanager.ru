<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col flex-auto overflow-hidden bg-gray-6">
    <project-browser-default-header />
    <project-browser-default-filters />
    <div class="relative flex flex-col flex-auto overflow-y-auto">
      z-index: 10;
      <div class="relative flex min-h-full">
        body
      </div>
    </div>
  </div>
</template>
