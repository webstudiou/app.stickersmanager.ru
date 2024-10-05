<script setup lang="ts">
import { useStoreAuth, useStoreProjects, useCoreStates } from '#imports'

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const storeProjects = useStoreProjects()
const storeAuth = useStoreAuth()
const limits = computed(() => storeAuth.limits)
const { isBrowserProjectModalOpened } = useCoreStates()

const datasets = reactive({
  favourites: false,
})

onMounted(async () => {
  await storeProjects.init()
})
</script>

<template>
  <div class="flex flex-col h-full overflow-x-hidden overflow-y-auto mb-1.5 select-none">
    <div class="grid grid-rows-[max-content_1fr] relative">
      <template v-if="storeProjects.favourites.length">
        <div class="flex items-center justify-between truncate px-2.5  mt-2.5 mb-1.5">
          <span class="text-md text-muted uppercase truncate">
            {{ useLangs('pages.dashboard.projects.index.headings.favourites') }}
          </span>
          <div class="cursor-pointer text-muted hover:text-labels-primary mr-1 flex items-center justify-end" @click="datasets.favourites = !datasets.favourites">
            <els-icon name="chevron-right" :class="['transition-all', datasets.favourites && 'rotate-90']" size="1.15rem" />
          </div>
        </div>
        <portfolio-navigator-tree
          v-if="datasets.favourites"
          :entries="storeProjects.favourites"
          :size
          class=" mr-2.5"
        />
      </template>

      <div class="flex items-center justify-between truncate px-2.5  mt-2.5 mb-1.5">
        <span class="text-md text-muted uppercase truncate">
          {{ useLangs('pages.dashboard.projects.index.headings.title') }}
        </span>
        <div class="" />
      </div>

      <div v-if="!limits.max_projects.use" class="rounded bg-gray-6 px-2.5 py-1.5 m-2.5 grid grid-rows-2 items-center">
        <p class="text-footnote">
          {{ useLangs('pages.dashboard.portfolios.navigator.empty.description') }}
        </p>
        <els-button
          title="buttons.add.project.title"
          size="sm"
          fluid
          @click="isBrowserProjectModalOpened = true"
        />
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
