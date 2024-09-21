<script setup lang="ts">
defineOptions({
  name: 'ElsMenuHeader',
})

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  class: undefined,
  ui: () => ({}),
})

const { ui } = useCore('menu-header', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.header.wrapper), props.class))
</script>

<template>
  <div :class="wrapperClass">
    <span
      v-if="title"
      :class="ui.header.title"
    >
      {{ useLangs(title) }}
    </span>
    <div
      v-if="$slots.default"
      class="flex items-center justify-end grow"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { menu as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.menu, el)

type Props = {
  title?: string
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
