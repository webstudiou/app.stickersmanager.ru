<script setup lang="ts">
import { useAppConfig, useStoreStickers } from '#imports'

const { ui } = useAppConfig()

const storeStickers = useStoreStickers()
const entries = computed(() => storeStickers.entries)

const loading = computed(() => storeStickers.loading)

const datasets = reactive({
  editor: false,
  create: {
    disabled: false,
  },
})

const fields = reactive({
  title: '',
})

async function handleEnter() {
  datasets.create.disabled = true

  await $fetch('/api/dashboard/stickers/create', {
    method: 'POST',
    body: {
      title: fields.title,
    },
  })
    .then(({ data }) => {
      fields.title = ''
      storeStickers.entries.unshift(data)
    })
    .catch(e => useErrorHandler(e))
    .finally(() => datasets.create.disabled = false)
}
</script>

<template>
  <div>
    <div v-if="loading" @mouseleave="datasets.editor = false">
      <div class="relative flex cursor-text border-b border-b-backgrounds-secondary">
        <div class="sticky left-0 top-0 z-1 flex gap-1.5 items-center pl-2.5 bg-backgrounds-primary h-[--row-min-height]">
          <els-icon name="square-plus" size="md" class="text-muted" />
          <input
            id="title"
            ref="TitleRef"
            v-model="fields.title"
            required
            :disabled="datasets.create.disabled"
            class="h-full border-none outline-none bg-transparent text-md border-transparent caret-primary"
            :placeholder="useLangs('buttons.create.sticker.title')"
            @keyup.enter="handleEnter"
          >
        </div>
      </div>
      <sticker-browser-default-rows-wrapper v-for="entry in entries" :key="entry.data.id">
        <template #title="{ titleStyle }">
          <sticker-browser-default-rows-slots-title :style="titleStyle" :entry="entry" />
        </template>
        <template #id="{ idStyle }">
          <sticker-browser-default-rows-slots-id :style="idStyle" :entry="entry" />
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
