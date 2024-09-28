<script setup lang="ts">
defineOptions({
  name: 'ProjectBrowserDefaultLeadingGhost',
})

withDefaults(defineProps<Props>(), {
  entries: () => [],
  class: undefined,
})
</script>

<template>
  <div v-for="entry in entries" :key="entry.id" class="relative">
    <div :class="['h-[calc(var(--row-min-height)-1px)] py-px border-b border-backgrounds-secondary', entry.type !== 'portfolio' && 'bg-backgrounds-primary']" />
    <els-transition-collapse>
      <div v-show="entry.children?.length && !entry.collapsed">
        <project-browser-default-leading-ghost :entries="entry.children" />
      </div>
    </els-transition-collapse>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'

type Props = {
  entries?: Portfolios.NavigatorItem[]
  class?: HTMLAttributes['class']
}
</script>
