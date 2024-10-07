<script setup lang="ts">
defineOptions({
  name: 'ElsSkeletonItem',
})

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  size: 'md',
  animated: true,
  first: false,
  last: false,
})

const { ui } = useCore('skeleton-item', null, config)

const wrapperClass = computed(() => twMerge(
  ui.value.items.base,
  props.animated ? ui.value.items.animated : ui.value.items.bg,
  ui.value.rounded[props.size],
  ui.value.items.height[props.size],

  ui.value.items.el[props.variant],

  (props.variant === 'div' && props.first) && ui.value.items.first,
  (props.variant === 'div' && props.last) && ui.value.items.last,
))
</script>

<template>
  <div :class="wrapperClass">
    <!--    <picture-filled v-if="variant === 'image'" /> -->
  </div>
</template>

<script lang="ts">
import { mergeConfig, twMerge } from '../../utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { skeleton as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.skeleton, el)

type Props = {
  variant?: 'circle' | 'rect' | 'h1' | 'h3' | 'text' | 'caption' | 'div' | 'image' | 'button'
  size?: 'xxs' | ELEMENTS.SIZE
  animated?: boolean
  first?: boolean
  last?: boolean
}
</script>
