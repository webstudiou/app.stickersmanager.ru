<script setup lang="ts">
defineOptions({
  name: 'ElsMenuSection',
})

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: () => ({}),
})

const { ui } = useCore('menu-section', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.section.wrapper), props.class))
</script>

<template>
  <div :class="wrapperClass">
    <slot />
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
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
