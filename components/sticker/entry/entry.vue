<script setup lang="ts">
import { useStoreStickers, useCoreStates } from '#imports'

const { isStickerEditorOpened, stickerEditorId } = useCoreStates()

const datasets = reactive({
  fullscreen: false,
  loading: true,
})

const services: IService[] = [
  {
    key: 'substickers',
    icon: 'substickers',
    disabled: false,
  },
  {
    key: 'files',
    icon: 'files',
    disabled: false,
  },
  {
    key: 'relationships',
    icon: '',
    disabled: false,
  },
  {
    key: 'times',
    icon: 'clock',
    disabled: false,
  },
  {
    key: 'logs',
    icon: 'logs',
    disabled: false,
  },
]

const storeStickers = useStoreStickers()
const entry = computed(() => storeStickers.entry)

const MainScrollRef = ref<HTMLDivElement | null>(null)
const SectionsRef = ref<HTMLDivElement | null>(null)

function handleScroll() {
  if (!SectionsRef.value || !MainScrollRef.value) return

  const SectionsDiv = SectionsRef.value as HTMLDivElement
  const offsetTop = SectionsDiv.offsetTop

  const ScrollDiv = MainScrollRef.value as HTMLDivElement
  const scrollTop = ScrollDiv.offsetTop + ScrollDiv.scrollTop

  switch (offsetTop === scrollTop) {
    case true: {
      SectionsDiv.classList.add('!border-b-backgrounds-secondary')
      break
    }
    default: {
      SectionsDiv.classList.remove('!border-b-backgrounds-secondary')
      break
    }
  }
}

async function handleFullScreen() {
  isStickerEditorOpened.value = false
  await nextTick()
  await nextTick()

  datasets.fullscreen = !datasets.fullscreen
  await nextTick()
  await nextTick()

  isStickerEditorOpened.value = true
}

watch(stickerEditorId, async (id) => {
  if (!id) return
  await storeStickers.editor(id)
    .then(() => {
      datasets.loading = false
    })
})
</script>

<template>
  <els-slideover
    v-model="isStickerEditorOpened"
    appear
    side="right"
    :ui="{ width: datasets.fullscreen ? 'tablet:max-w-full max-w-full tablet:min-w-full min-w-full transition-[transform]' : 'tablet:max-w-[700px] transition-[transform]' }"
  >
    <div v-if="entry" class="relative flex flex-col overflow-hidden">
      <div class="sticky top-0 grid grid-cols-[max-content_1fr_repeat(4,_max-content)] items-center gap-1.5 p-1.5 bg-backgrounds-primary flex-none border-b border-b-backgrounds-secondary">
        <!--        header
        z-index: 12; -->
        <button class="inline-flex text-muted hover:text-primary shrink-0" @click="handleFullScreen">
          <els-icon :name="datasets.fullscreen ? 'lucide:minimize' : 'lucide:fullscreen'" size="md" />
        </button>

        <div>
          &nbsp;
        </div>
        <div>
          &nbsp;
        </div>
        <div>
          &nbsp;
        </div>
        <button class="inline-flex text-muted hover:text-primary shrink-0" @click="isStickerEditorOpened = false">
          <els-icon name="ellipsis-vertical" size="md" />
        </button>
        <button class="inline-flex text-muted hover:text-primary shrink-0" @click="isStickerEditorOpened = false">
          <els-icon name="x" size="md" />
        </button>
      </div>
      <div class="flex h-full overflow-hidden" :class="[datasets.fullscreen && 'grid grid-cols-[repeat(2,_1fr)]']">
        <div ref="MainScrollRef" class="flex-none w-full overflow-y-auto overflow-x-hidden scroll-smooth" @scroll="handleScroll">
          <!--          transition: .2s ease;
          scrollbar-gutter: stable; -->

          <sticker-entry-actions />

          <!--          <sticker-entry-parent />
          <div /> -->
          <div class="m-2.5 mb-0">
            <els-input-text-area
              v-model="entry.data.attributes.title"
              name="editor_title"
              autofocus
              square
              fluid
              autoresize
              :rows="1"
              class="text-title2 font-semibold"
              :ui="{
                bg: 'bg-backgrounds-primary',
                paddingX: {
                  md: 'px-0',
                },
                input: 'text-title-2',
              }"
            />
          </div>

          <sticker-entry-services-actions :services />
          <sticker-entry-info />

          <els-divider class="px-2.5" />
          <sticker-entry-description />

          <els-divider class="px-2.5" />
          <sticker-entry-services :services />

          <els-divider class="px-2.5" />
          <sticker-entry-comments />
        </div>
        <div v-if="datasets.fullscreen" class="relative grid grid-rows-[] w-full min-w-[unset] h-full overflow-x-hidden overflow-y-auto transition scroll-smooth border-l border-l-backgrounds-secondary">
          side
        </div>
      </div>
    </div>
  </els-slideover>
</template>

<script lang="ts">
export interface IService {
  key: string
  icon: string
  disabled: boolean
}
</script>
