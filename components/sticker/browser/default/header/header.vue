<script setup lang="ts">
import { useStoreConfigs } from '~/stores'

const storeConfigs = useStoreConfigs()
const columns = computed(() => storeConfigs.columns)
</script>

<template>
  <div class="sticky top-0 flex items-center bg-backgrounds-primary border-b border-backgrounds-secondary gap-2.5 z-1">
    <!--    line-height: 100%;
    height: 36px;
    padding: 0 4px 0 0;
    column-gap: 20px; -->
    <div class="h-full w-[2px]" />
    <sticker-browser-default-header-column
      v-for="(column, idx) in columns"
      :key="idx"
      :column="column"
      :resize="idx > 0 && idx < columns.length"
      :class="[idx===0 && 'pl-2.5']"
    />

    <div class="relative whitespace-nowrap group w-[225px] min-w-[225px]">
      <div class="flex items-center h-full -ml-[8px] pl-[8px] transition-[background-color] rounded-[4px]">
        <div class="truncate">
          actions
        </div>
        <div class="absolute cursor-grab -right-[5px] w-[10px] px-[2px] transition-[opacity] opacity-0 group-hover:opacity-100">
          <div class="flex flex-center w-[6px] transition-[background-color] bg-backgrounds-primary h-[24px] rounded-[123px]">
            <div class="w-[2px] bg-primary rounded-[2px] h-[20px] transition-[background-color]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
