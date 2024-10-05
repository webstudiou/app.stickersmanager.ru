<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {})

const datasets = reactive({
  editor: false,
})

const title = ref(props.entry.data.attributes.title)

function handleShowEditor() {
  datasets.editor = true
}

function handleSave() {
  datasets.editor = false
}
</script>

<template>
  <div class="sticky top-0 bottom-0 mt-px h-[calc(100%_-_1px)] left-0 z-1 gap-1.5 pl-2.5 self-start flex items-center contain-content bg-backgrounds-primary" :style="style">
    <div class="flex items-center w-full overflow-hidden gap-1.5">
      <els-icon name="square" class="text-muted hover:text-success flex items-center flex-none" size="md" />
      <div class="flex w-full overflow-hidden gap-1.5">
        <input
          v-if="datasets.editor"
          v-model="title"
          autofocus
          placeholder=""
          class="w-full outline-none border-none bg-transparent p-0 text-md caret-primary"
          @keyup.enter="handleSave"
        >
        <div v-else class="truncate text-md">
          {{ entry.data.attributes.title }}
        </div>
      </div>
      <div class="flex items-center group-hover/row:opacity-100 opacity-0 transition-[opacity,color] text-muted hover:text-primary" :class="[datasets.editor && 'text-primary opacity-100']">
        <els-icon name="edit" size="sm" @click="handleShowEditor" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'

type Props = {
  entry: Stickers.Sticker
  style: HTMLAttributes['style']
}
</script>
