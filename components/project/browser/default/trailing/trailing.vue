<script setup lang="ts">
defineOptions({
  name: 'ProjectBrowserDefaultTrailing',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  entries: () => [],
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('project-browser-default-trailing', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>

<template>
  <div v-for="entry in entries" :key="entry.id" :class="ui.fonts[size]">
    <div :class="['flex items-center h-[calc(var(--row-min-height)-1px)]', entry.type !== 'portfolio' ? 'bg-backgrounds-primary' : 'border-b border-backgrounds-secondary']" v-bind="attrs">
      <div v-if="entry.type !== 'portfolio'" class="grid grid-cols-[repeat(3,_minmax(250px,_1fr))] items-center w-full">
        <div class="flex items-center h-[calc(var(--row-min-height)-1px)] px-2.5 bg-backgrounds-primary border-b border-backgrounds-secondary">
          <els-marker :title="entry.title" />
        </div>
        <div class="flex items-center h-[calc(var(--row-min-height)-1px)] px-2.5 bg-backgrounds-primary border-b border-backgrounds-secondary">
          ...
        </div>
        <div class="flex items-center h-[calc(var(--row-min-height)-1px)] px-2.5 bg-backgrounds-primary border-b border-backgrounds-secondary">
          ...
        </div>
      </div>
    </div>
    <els-transition-collapse>
      <div v-show="entry.children?.length && !entry.collapsed">
        <project-browser-default-trailing :entries="entry.children" />
      </div>
    </els-transition-collapse>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { basis } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof basis>(appConfig.ui?.strategy as Strategy, appConfig.ui.basis, basis)

type Props = {
  entries?: Portfolios.NavigatorItem[]
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
