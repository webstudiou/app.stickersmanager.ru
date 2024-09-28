<script setup lang="ts">
const isSidebar = inject<boolean | undefined>('isSidebar', undefined)
</script>

<template>
  <div class="flex items-center justify-between px-2.5 gap-x-2.5 min-w-0 relative flex-shrink-0 bg-backgrounds-primary h-[--header-height] border-b border-backgrounds-secondary">
    <div class="truncate">
      <app-breadcrumbs />
    </div>
    <div class="flex flex-center">
      <button class="flex flex-center m-0 p-0 outline:none border-0 transparent tablet:hidden" @click="isSidebar = !isSidebar">
        <els-icon name="menu" size="2rem" class="text-gray-1 hover:text-labels-primary transition-colors" />
      </button>
      <app-header-watch />
    </div>
  </div>
</template>

<style scoped>

</style>
