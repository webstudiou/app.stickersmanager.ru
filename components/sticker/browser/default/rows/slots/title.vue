<script setup lang="ts">
withDefaults(defineProps<Props>(), {})

const { ui } = useAppConfig()

const datasets = reactive({
  editor: false,
})
</script>

<template>
  <div class="sticky top-0 bottom-0 mt-px h-[calc(100%_-_1px)] left-0 z-1 gap-1.5 pl-2.5 self-start flex items-center contain-content bg-backgrounds-primary" :style="style" @mouseleave="datasets.editor=false">
    <els-icon name="square" class="text-muted hover:text-primary" :size="ui.size" />
    <div class="w-full overflow-hidden truncate contain-content">
      {{ entry }}
    </div>
    <div class="inline-flex group-hover/row:opacity-100 opacity-0 transition-[opacity,color] text-muted hover:text-primary" :class="[datasets.editor && 'text-primary opacity-100']">
      <els-icon name="edit" size="1rem" @click="datasets.editor = true" />
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { useAppConfig } from '#imports'

type Props = {
  entry: Stickers.Sticker
  style: HTMLAttributes['style']
}
</script>
