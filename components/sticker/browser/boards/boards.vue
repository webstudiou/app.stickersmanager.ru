<script setup lang="ts">
const { ui } = useCore('project-browser-default-header', null, basis, undefined, true)

const size = 'sm'

const datasets = reactive({
  filters: false,
  minimized: false,
})
</script>

<template>
  <div class="relative flex flex-col flex-auto overflow-hidden">
    <sticker-browser-header v-model="datasets.filters" />
    <sticker-browser-filters v-model="datasets.filters" />

    <div class="relative grid grid-cols-[max-content_1fr] h-full overflow-hidden pl-2.5">
      <!--      padding-top: 4px; -->
      <aside class="flex flex-col justify-between overflow-hidden bg-backgrounds-primary mr-2.5 mb-2.5 gap-1.5 pb-2.5 rounded-md transition" :class="[datasets.minimized? 'w-auto' : 'w-[--sidebar-slave-width]']">
        <div class="flex flex-col h-full overflow-hidden">
          <div class="grid gap-1.5 m-1.5 transition" :class="[datasets.minimized ? 'grid-cols-1' : 'grid-cols-[35px_1fr]']">
            <button class="flex flex-center bg-gray-6 text-muted hover:text-primary shrink-0 transition" :class="[ui.width[size], ui.height[size], ui.rounded[size]]" @click="datasets.minimized = !datasets.minimized">
              <els-icon name="menu" :size="ui.icons[size]" />
            </button>
            <els-button v-if="!datasets.minimized" fluid />
          </div>
          <div class="grid overflow-hidden">
            1
          </div>
        </div>
      </aside>

      <div class="grid overflow-hidden">
        <div class="absolute top-0 right-0 bottom-0 left-0 -z-1 w-full h-full">
          <div class="absolute w-full h-full" />
          <div class="absolute w-full h-full bg-no-repeat bg-cover bg-center bg-backgrounds-primary" />
        </div>
        <div class="relative grid grid-flow-col grid-cols-[max-content] overflow-x-auto overflow-y-hidden gap-1.5">
          columns
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCore } from '#imports'
import { basis } from '#app-ui/configs'
</script>
