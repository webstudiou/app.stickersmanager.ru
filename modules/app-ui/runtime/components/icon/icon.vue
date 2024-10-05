<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  size: '1.25em',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('icon', toRef(props, 'ui'), config)

const iconStyle = computed(() => {
  const _size = (['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) ? ui.value.icons[props.size] : props.size
  return {
    width: _size,
    height: _size,
  }
})

const iconSize = computed(() => (['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) ? ui.value.icons[props.size] : props.size)

const wrapperClass = computed(() => {
  return twMerge(twJoin(ui.value.wrapper), props.class)
})
</script>

<template>
  <icon
    :name="name"
    :class="wrapperClass"
    :size="iconSize"
    v-bind="{ ...attrs }"
    :style="iconStyle"
  />
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { icon as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.icon, el)

type Props = {
  name: string
  size?: string | ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
