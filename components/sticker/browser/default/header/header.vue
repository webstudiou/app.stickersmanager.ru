<script setup lang="ts">
import { useStoreStickers } from '#imports'

const storeStickers = useStoreStickers()

const columns = computed(() => storeStickers.columns)

const defaultColumns = columns.value.reduce((acc, col) => {
  if (!acc.includes(col.key) && col.key !== 'title') {
    acc.push(col.key)
  }
  return acc
}, [] as string[])

const selectedColumns = ref(columns.value.map((col) => {
  if (col.visible && col.key !== 'title') return col.key
}))

watch(selectedColumns, (newColumns: string[]) => {
  const visible_ids = newColumns.concat('title').map((i) => {
    return i
  })

  columns.value.forEach((_col) => {
    _col.visible = visible_ids.includes(_col.key)
  })
})
</script>

<template>
  <div class="sticky top-0 flex items-center bg-backgrounds-primary border-b border-backgrounds-secondary gap-1.5 z-2 pr-2.5 min-h-[--row-min-height]">
    <sticker-browser-default-header-column v-for="column in columns" :key="column.key" :column="column" />

    <div class="flex ml-auto justify-end min-w-[150px]">
      <els-input-select
        v-model="selectedColumns"
        :options="defaultColumns"
        multiple
        right-icon=""
        size-options="xs"
        :ui="{ bg: 'bg-transparent', options: { active: 'bg-transparent', selected: 'bg-transparent' } }"
      >
        <template #title>
          <div class="w-full" />
          <els-icon name="settings" />
        </template>
        <template #option="{ selected, option }">
          <span class="truncate text-sm cursor-pointer">
            {{ useLangs(`pages.dashboard.stickers.tables.headings.${option.key}`) }}
          </span>
          <els-icon v-if="selected" name="check" size=".875rem" />
        </template>
      </els-input-select>
    </div>
  </div>
</template>
