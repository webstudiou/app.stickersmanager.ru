<script setup lang="ts">
import { useStoreProjects } from '~/stores'

const storeProjects = useStoreProjects()
const entry = computed(() => storeProjects.entry)

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

function handleChangeSrc(src?: string) {
  datasets.loading = true
  datasets.iframe = 'https://docs.google.com/spreadsheets/d/14DekKx668yr0mOM5aaJudkqyFCwVILWaT2_IiUp1l34/edit?usp=sharing'

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
              <div class="relative rounded-sm mb-1.5 transition-[background-color] bg-backgrounds-primary cursor-pointer" :class="[!datasets.minimized && 'p-1.5']" @click="handleChangeSrc">
                <div class="h-full transition-[background-color]">
                  <div v-if="!datasets.minimized" class="text-md truncate mr-5 mb-2.5">
                    title
                  </div>
                  <div class="flex items-center gap-1.5 text-muted text-sm" :class="[datasets.minimized && 'justify-center h-sm']">
                    <els-icon name="google-sheets" />
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
