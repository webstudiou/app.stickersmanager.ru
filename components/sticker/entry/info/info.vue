<script setup lang="ts">

</script>

<template>
  <div class="m-2.5">
    <div v-for="i in 7" :key="i" class="grid grid-cols-[150px_1fr] items-center gap-1.5 min-h-[32px] w-max">
      <div class="grid grid-cols-[repeat(2,_max-content)] gap-1.5 items-center text-muted">
        <els-icon name="plus" size="sm" />
        Title
      </div>
      <div>
        Selectors
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
