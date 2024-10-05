<script setup lang="ts">
import { useAppConfig } from '#imports'

const { ui } = useAppConfig()

const datasets = reactive({
  filters: false,
})
</script>

<template>
  <div class="relative flex flex-col flex-auto overflow-hidden">
    <sticker-browser-header v-model="datasets.filters" />
    <sticker-browser-filters v-model="datasets.filters" />
    <div class="relative grid grid-rows-[max-content_1fr] h-full overflow-auto bg-backgrounds-primary">
      <sticker-browser-default-header />
      <div class="">
        <div class="">
          <div class="grid grid-cols-[max-content_1fr] items-center gap-1.5 pl-2.5 cursor-text h-[--row-min-height]">
            <els-icon name="square-plus" :size="ui.size" class="text-muted" />
            <input class="h-full pl-[2px] border-none outline-none bg-transparent text-md border-transparent" placeholder="Create">
          </div>
          <sticker-browser-default-sticker v-for="i in 100" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>
