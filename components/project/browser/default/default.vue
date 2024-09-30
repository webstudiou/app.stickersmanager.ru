<script setup lang="ts">
import { useStoreProjects } from '~/stores'
import { useLangs } from '#imports'

const storeProjects = useStoreProjects()
const size: ELEMENTS.SIZE = 'md'

const datasets = reactive({
  filters: false,
})
</script>

<template>
  <div class="flex flex-col flex-auto overflow-hidden bg-gray-6 select-none">
    <project-browser-default-header v-model="datasets.filters" />
    <project-browser-default-filters v-model="datasets.filters" />
    <div class="relative flex flex-col flex-auto overflow-y-auto">
      <!--      z-index: 10; -->
      <div class="relative flex min-h-full">
        <aside
          class="sticky top-0 left-0 z-3 flex flex-col h-fit bg-gray-6 select-none border-r border-backgrounds-secondary min-w-[300px]"
        >
          <div class="min-w-[300px]">
            <div
              class="flex w-full sticky top-0 left-0 z-3 bg-backgrounds-primary border-t border-b border-backgrounds-secondary items-center justify-start px-2.5 text-md h-[--row-min-height]"
            >
              <span class="truncate">
                {{ useLangs('pages.dashboard.projects.tables.headings.title') }}
              </span>
            </div>
            <div class="flex flex-col w-full">
              <div class="relative z-2">
                <div class="absolute left-0 top-0 w-full">
                  <project-browser-default-leading-ghost :entries="storeProjects.entries" />
                </div>
                <project-browser-default-leading :size :entries="storeProjects.entries" />
              </div>
            </div>
          </div>
        </aside>
        <div class="relative flex flex-col flex-auto h-fit">
          <div class="sticky top-0 left-0 z-2 grid grid-cols-[repeat(3,_minmax(250px,_1fr))]">
            <div
              class="bg-backgrounds-primary border-t border-b border-backgrounds-secondary flex items-center justify-start px-2.5 text-md h-[--row-min-height]"
            >
              <span class="truncate">
                {{ useLangs('pages.dashboard.projects.tables.headings.status') }}
              </span>
            </div>
            <div
              class="bg-backgrounds-primary border-t border-b border-backgrounds-secondary flex items-center justify-start px-2.5 text-md h-[--row-min-height]"
            >
              <span class="truncate">
                {{ useLangs('pages.dashboard.projects.tables.headings.dates') }}
              </span>
            </div>
            <div
              class="bg-backgrounds-primary border-t border-b border-backgrounds-secondary flex items-center justify-start px-2.5 text-md h-[--row-min-height]"
            >
              <span class="truncate">
                {{ useLangs('pages.dashboard.projects.tables.headings.creator') }}
              </span>
            </div>
          </div>
          <div>
            <project-browser-default-trailing :size :entries="storeProjects.entries" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
