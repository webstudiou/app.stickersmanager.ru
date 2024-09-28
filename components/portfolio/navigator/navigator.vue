<script setup lang="ts">
import { useStoreProjects } from '~/stores'

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const storeProjects = useStoreProjects()

onMounted(async () => {
  await storeProjects.init()
})
</script>

<template>
  <div class="flex flex-col h-full overflow-x-hidden overflow-y-auto mb-1.5">
    <div class="grid grid-rows-[max-content_1fr] relative">
      <div class="flex items-center justify-between truncate px-2.5">
        <span class="text-md text-muted uppercase truncate">
          {{ useLangs('pages.dashboard.projects.index.headings.title') }}
        </span>
        <div class="">
          action
        </div>
      </div>
      <portfolio-navigator-tree :entries="storeProjects.entries" :size class=" mr-2.5" />
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  size?: ELEMENTS.SIZE
}
</script>
