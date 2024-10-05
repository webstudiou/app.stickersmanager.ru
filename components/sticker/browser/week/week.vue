<script setup lang="ts">
import dayjs from 'dayjs'
import { useDates } from '~/composables/useDates'

const datasets = reactive({
  day_slice_idx: 0,
})

const today = dayjs()
const getNextDate = (day: number) => {
  return useDates(today.add(day + datasets.day_slice_idx - 1, 'day')).date
}
</script>

<template>
  <div class="relative flex flex-col flex-auto overflow-hidden">
    <sticker-browser-header v-model="datasets.filters" />
    <sticker-browser-filters v-model="datasets.filters" />

    <div class="relative flex flex-auto overflow-hidden">
      <div class="absolute top-0 right-0 bottom-0 left-0 -z-1 w-full h-full">
        <div class="absolute w-full h-full" />
        <div class="absolute w-full h-full bg-no-repeat bg-cover bg-center bg-backgrounds-primary" />
      </div>
      <div class="flex flex-col flex-auto overflow-hidden overflow-x-auto w-full px-2.5 max-h-full">
        <!--        max-height: calc(100vh - 119px); -->
        <div class="grid grid-flow-col auto-cols-max h-full pb-2.5 gap-2.5">
          <sticker-browser-week-column v-for="i in 7" :key="i" :date="getNextDate(i)">
            body
          </sticker-browser-week-column>
        </div>
      </div>
    </div>
  </div>
<!--  <app-page>
    <app-container class="bg-gray-6">
      <div class="relative flex flex-col flex-auto overflow-hidden">
        <sticker-browser-week-today v-model="datasets.day_slice_idx" />
      </div>
    </app-container>
  </app-page> -->
</template>

<style scoped>

</style>
