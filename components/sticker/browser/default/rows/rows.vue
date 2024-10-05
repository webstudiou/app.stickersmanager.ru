<script setup lang="ts">
import { useAppConfig, useStoreStickers } from '#imports'

const { ui } = useAppConfig()

const storeStickers = useStoreStickers()
const entries = computed(() => storeStickers.entries.concat(
  { data: { id: 1 } },
  { data: { id: 2 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
  { data: { id: 3 } },
))

const loading = computed(() => storeStickers.loading)

const datasets = reactive({
  editor: false,
})
</script>

<template>
  <div>
    <div v-if="loading" @mouseleave="datasets.editor = false">
      <div class="relative flex cursor-text border-b border-transparent">
        <div class="sticky left-0 top-0 z-1 flex gap-1.5 items-center pl-2.5 bg-backgrounds-primary h-[--row-min-height]">
          <els-icon name="square-plus" :size="ui.size" class="text-muted" />
          <input class="h-full border-none outline-none bg-transparent text-md border-transparent caret-primary" :placeholder="useLangs('buttons.create.sticker.title')">
        </div>
      </div>
      <sticker-browser-default-rows-wrapper v-for="entry in entries" :key="entry.data.id">
        <template #title="{ titleStyle }">
          <sticker-browser-default-rows-slots-title :style="titleStyle" :entry="entry" />
        </template>
        <template #id>
          id
        </template>
        <template #project>
          project
        </template>
        <template #board>
          board
        </template>
        <template #column>
          column
        </template>
        <template #executor>
          executor
        </template>
        <template #dates>
          dates
        </template>
        <template #priority>
          priority
        </template>
        <template #tags>
          tags
        </template>
        <template #actions />
      </sticker-browser-default-rows-wrapper>
    </div>
  </div>
</template>

<style scoped>

</style>
