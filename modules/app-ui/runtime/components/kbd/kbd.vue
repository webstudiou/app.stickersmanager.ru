<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  value: null,
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('kbd', toRef(props, 'ui'), config)

const kbdClass = computed(() => twMerge(twJoin(
  ui.value.base,
  ui.value.size[props.size],
  ui.value.padding,
  ui.value.rounded,
  ui.value.font,
  ui.value.background,
  ui.value.ring,
), props.class))
</script>

<template>
  <kbd
    :class="kbdClass"
    v-bind="attrs"
  >
    <slot>{{ value }}</slot>
  </kbd>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCore } from '../../composables'
import { mergeConfig, twMerge, twJoin } from '../../utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { kbd as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.kbd, el)

type Props = {
  value?: string
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
