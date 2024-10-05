<script setup lang="ts">
import { useAppConfig } from '#imports'

const { ui } = useAppConfig()

const items = computed(() => {
  const _items = []
  _items.push([
    {
      title: 'pages.dashboard.stickers.viewers.default.title',
      icon: 'list',
      disabled: false,
      click: () => storeStickers.browser = 'default',
    },
    {
      title: 'pages.dashboard.stickers.viewers.boards.title',
      icon: 'boards',
      disabled: true,
      click: () => storeStickers.browser = 'boards',
    },
    {
      title: 'pages.dashboard.stickers.viewers.week.title',
      icon: 'week',
      disabled: true,
      click: () => storeStickers.browser = 'week',
    },
    {
      title: 'pages.dashboard.stickers.viewers.month.title',
      icon: 'month',
      disabled: true,
      click: () => storeStickers.browser = 'month',
    },

    {
      title: 'pages.dashboard.stickers.viewers.gantt.title',
      icon: 'gantt',
      disabled: true,
      click: () => storeStickers.browser = 'gantt',
    },
    {
      title: 'pages.dashboard.stickers.viewers.matrix.title',
      icon: 'matrix',
      disabled: true,
      click: () => storeStickers.browser = 'matrix',
    },
  ])
  return _items
})
</script>

<template>
  <els-dropdown
    :items
    :ui="{ width: 'w-full min-w-[200px]', divide: 'divide-dotted' }"
    :popper="{ strategy: 'absolute', placement: 'bottom' }"
    :size="ui.size"
  >
    <div class="flex items-center min-w-[200px] rounded-md h-md bg-backgrounds-primary text-muted px-2.5 gap-1.5">
      <els-icon name="sort" :size="ui.size" />
      <div class="inline-flex">
        Sort
      </div>
    </div>
  </els-dropdown>
</template>
