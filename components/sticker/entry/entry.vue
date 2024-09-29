<script setup lang="ts">
import { useStoreStickers } from '~/stores'

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
const visible = computed({
  get: () => !!entry.value,
  set: () => storeStickers.entry = undefined,
})

const MainScrollRef = ref<HTMLDivElement | null>(null)
const SectionsRef = ref<HTMLDivElement | null>(null)
const TextAreaRef = ref<HTMLTextAreaElement | null>(null)

const { errorMessage: error, setTouched } = useField(() => 'title', 'required', {
  initialValue: 'props.modelValue',
  validateOnValueUpdate: true,
  syncVModel: true,
})

const resizeTextArea = () => {
  if (!TextAreaRef.value) return

  TextAreaRef.value.rows = 1

  const styles = window.getComputedStyle(TextAreaRef.value)
  const paddingTop = parseInt(styles.paddingTop)
  const paddingBottom = parseInt(styles.paddingBottom)
  const padding = paddingTop + paddingBottom
  const lineHeight = parseInt(styles.lineHeight)
  const { scrollHeight } = TextAreaRef.value
  const newRows = (scrollHeight - padding) / lineHeight

  if (newRows > 1) {
    TextAreaRef.value.rows = newRows
  }
}

/* watch(() => props.modelValue, () => {
  nextTick(resizeTextArea)
}) */

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

onMounted(() => {
  setTimeout(() => {
    setTouched(true)
    resizeTextArea()
  }, 100)
})
</script>

<template>
  <els-slideover
    v-model="visible"
    appear
    side="right"
    :ui="{ width: 'tablet:max-w-[700px]' }"
  >
    <div class="relative flex flex-col overflow-hidden">
      <div class="sticky top-0 grid grid-cols-[max-content_1fr_repeat(4,_max-content)] items-center gap-1.5 p-2.5 bg-backgrounds-primary flex-none border-b border-b-backgrounds-secondary">
        header
        z-index: 12;
      </div>
      <div class="flex h-full overflow-hidden">
        <div ref="MainScrollRef" class="flex-none w-full overflow-y-auto overflow-x-hidden scroll-smooth" @scroll="handleScroll">
          <!--          transition: .2s ease;
          scrollbar-gutter: stable; -->
          <sticker-entry-actions />

          <sticker-entry-parent />

          <textarea
            id="title"
            ref="TextAreaRef"
            name="title"
            :value="'modelValue'"
            required
            autofocus
            class="resize-none overflow-hidden bg-transparent border-none outline-none w-full block p-2.5 text-title3 font-medium"
          />

          <sticker-entry-services-actions :services />
          <sticker-entry-info />

          <els-divider class="px-2.5" />
          <sticker-entry-description />

          <els-divider class="px-2.5" />
          <sticker-entry-services :services />

          <els-divider class="px-2.5" />
          <sticker-entry-comments />
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
