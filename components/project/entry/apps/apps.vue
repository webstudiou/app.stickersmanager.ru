<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { useStoreProjects } from '~/stores'

const storeProjects = useStoreProjects()
const apps = computed(() => storeProjects.entry?.data.relationships.apps || [])

const IFrameRef = ref<HTMLIFrameElement | null>(null)

const datasets = reactive({
  iframe: '#',
  loading: true,
  minimized: false,
  fullscreen: false,
  search: '',
})

const width = computed(() => datasets.minimized ? 'w-[50px]' : 'w-[300px]')
const fullscreen = computed(() => datasets.fullscreen ? 'fixed top-0 left-0 z-[1000] h-full bg-gray-6' : '')

const options = computedAsync(async () => {
  return apps.value || []
}, [], {
  lazy: false,
})

const filteredApps = computed(() => {
  if (!datasets.search) {
    return apps.value
  }

  // @ts-ignore
  return options.value.filter((option: any) => {
    return ['title'].some((searchAttribute: any) => {
      if (['string', 'number'].includes(typeof option)) {
        return String(option).search(new RegExp(datasets.search, 'i')) !== -1
      }

      const child = get(option, searchAttribute)

      return child !== null && child !== undefined && String(child).search(new RegExp(datasets.search, 'i')) !== -1
    })
  })
})

function handleChangeSrc(src: string) {
  datasets.loading = true
  datasets.iframe = src

  IFrameRef.value.onload = () => datasets.loading = false
}
</script>

<template>
  <div class="flex flex-col flex-auto overflow-hidden">
    <project-entry-apps-header />

    <div class="relative flex flex-auto overflow-hidden">
      <div class="grid grid-cols-[max-content_1fr] w-full" :class="fullscreen">
        <div class="flex flex-col h-full overflow-hidden border-r border-backgrounds-secondary transition-[width]" :class="width">
          <div class="p-2.5 pb-0" :class="width">
            <div class="flex items-center mb-2.5 gap-2.5">
              <div class="flex gap-2.5">
                <button class="flex flex-center bg-backgrounds-primary rounded-sm w-sm h-sm text-muted hover:text-primary shrink-0" @click="datasets.minimized = !datasets.minimized">
                  <els-icon name="menu" />
                </button>
                <button class="flex flex-center bg-backgrounds-primary rounded-sm w-sm h-sm text-muted hover:text-primary shrink-0" @click="datasets.fullscreen = !datasets.fullscreen">
                  <els-icon name="fullscreen" />
                </button>
              </div>
              <div class="w-full">
                <els-input-search
                  v-model="datasets.search"
                  :ui="{ bg: 'bg-backgrounds-primary' }"
                  size="sm"
                  title="models.search.title"
                  :title-fixed="false"
                  fluid
                />
              </div>
            </div>
            <div class="flex gap-2.5 flex-wrap" :class="width">
              <button class="flex flex-center bg-backgrounds-primary rounded-sm w-sm h-sm text-muted hover:text-primary shrink-0">
                <els-icon name="plus" />
              </button>
            </div>
          </div>
          <div class="flex flex-col h-full overflow-hidden pb-2.5" :class="width">
            <div />
            <div class="flex flex-col p-2.5 overflow-auto">
              <div
                v-for="app in filteredApps"
                :key="app.data.id"
                class="relative rounded-sm mb-1.5 transition-[background-color] bg-backgrounds-primary cursor-pointer"
                :class="[!datasets.minimized && 'p-1.5']"
                @click="handleChangeSrc(app.data.attributes.href)"
              >
                <div class="h-full transition-[background-color]">
                  <div v-if="!datasets.minimized" class="text-md truncate mr-5 mb-2.5">
                    {{ app.data.attributes.title }}
                  </div>
                  <div class="flex items-center gap-1.5 text-muted text-sm" :class="[datasets.minimized && 'justify-center h-sm']">
                    <els-icon :name="app.data.attributes.icon" />
                    <div v-if="!datasets.minimized" class="truncate">
                      Service
                    </div>
                  </div>
                  <div v-if="!datasets.minimized" class="absolute top-1.5 right-1.5 cursor-pointer">
                    <els-icon name="menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hidden bg-backgrounds-primary" :class="width">
            <div class="p-2.5" />
          </div>
        </div>
        <div class="relative">
          <!-- Empty -->
          <div v-if="datasets.iframe === '#'" class="flex flex-col flex-center w-full h-full gap-1.5 bg-backgrounds-primary">
            <els-icon name="empty" class="text-primary" />
            <h6 class="uppercase text-muted text-caption1">
              {{ useLangs('actions.app.title') }}
            </h6>
          </div>

          <!-- Loading -->
          <div v-if="datasets.loading && datasets.iframe !== '#'" class="absolute top-0 left-0 flex flex-col flex-center w-full h-full bg-backgrounds-primary">
            <els-icon name="spinner" class="text-primary" />
            <h6 class="uppercase text-muted text-caption1 mb-1.5">
              {{ useLangs('loadings.index.title') }}
            </h6>
          </div>

          <!-- Selected -->
          <iframe
            ref="IFrameRef"
            :src="datasets.iframe"
            class="w-full h-full border-none"
            :class="[datasets.loading && 'invisible']"
          />
        </div>
      </div>
    </div>
  </div>
</template>
