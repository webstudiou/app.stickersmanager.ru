<script setup lang="ts">
import { useStoreStickers } from '~/stores'

const storeStickers = useStoreStickers()
const entry = computed(() => storeStickers.entry)
</script>

<template>
  <div v-if="entry">
    ENTRY
  </div>
</template>

<style scoped>

</style>
