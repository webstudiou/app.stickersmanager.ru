<script setup lang="ts">
import { useDates, useStoreStickers } from '#imports'

const storeStickers = useStoreStickers()
const entry = computed(() => storeStickers.entry)
const { datetime } = useDates(entry.value.data.timestamps.created_at, { seconds: false })
</script>

<template>
  <div class="grid grid-cols-[repeat(2,_max-content)_1fr] gap-1.5 m-2.5">
    <els-button
      variant="bezeled"
      title="start"
      left-icon="play"
      size="sm"
      color="success"
    />
    <els-button
      variant="bezeled"
      title="over"
      left-icon="check-square"
      size="sm"
      color="input"
    />
    <div class="grid grid-rows-[repeat(2,_max-content)] gap-1.5 ml-auto justify-end text-sm">
      <div>
        {{ entry.data.relationships.owner.data.attributes.name }}
      </div>
      <div>
        {{ datetime }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
