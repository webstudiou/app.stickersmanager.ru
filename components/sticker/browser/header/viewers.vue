<script setup lang="ts">
import { useAppConfig, useStoreStickers } from '#imports'

const storeStickers = useStoreStickers()

const { ui } = useAppConfig()

const items = computed(() => {
  const _items = []
  _items.push([
    {
      title: 'pages.dashboard.stickers.viewers.default.title',
      icon: 'list',
      disabled: false,
      class: storeStickers.browser === 'default' && 'text-primary bg-gray-6',
      click: () => storeStickers.browser = 'default',
    },
    {
      title: 'pages.dashboard.stickers.viewers.boards.title',
      icon: 'boards',
      disabled: true,
      class: storeStickers.browser === 'boards' && 'text-primary bg-gray-6',
      click: () => storeStickers.browser = 'boards',
    },
    {
      title: 'pages.dashboard.stickers.viewers.week.title',
      icon: 'week',
      disabled: true,
      class: storeStickers.browser === 'week' && 'text-primary bg-gray-6',
      click: () => storeStickers.browser = 'week',
    },
    {
      title: 'pages.dashboard.stickers.viewers.month.title',
      icon: 'month',
      disabled: true,
      class: storeStickers.browser === 'month' && 'text-primary bg-gray-6',
      click: () => storeStickers.browser = 'month',
    },

    {
      title: 'pages.dashboard.stickers.viewers.gantt.title',
      icon: 'gantt',
      disabled: true,
      class: storeStickers.browser === 'gantt' && 'text-primary bg-gray-6',
      click: () => storeStickers.browser = 'gantt',
    },
    {
      title: 'pages.dashboard.stickers.viewers.matrix.title',
      icon: 'matrix',
      disabled: true,
      class: storeStickers.browser === 'matrix' && 'text-primary bg-gray-6',
      click: () => storeStickers.browser = 'matrix',
    },
  ])
  return _items
})
</script>

<template>
  <div class="relative">
    <els-dropdown
      :items
      :ui="{ width: 'w-full min-w-[150px]', divide: 'divide-dotted' }"
      :popper="{ strategy: 'absolute', placement: 'bottom' }"
      :size="ui.size"
    >
      <div class="flex flex-center w-md rounded-md h-md bg-backgrounds-primary text-muted">
        <els-icon :name="storeStickers.browser === 'default' ? 'list' : storeStickers.browser" :size="ui.size" />
      </div>
    </els-dropdown>
  </div>
</template>
