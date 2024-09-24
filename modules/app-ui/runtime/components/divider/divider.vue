<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  size: 'xs',
  color: 'opaque',
  orientation: 'horizontal',
  type: 'dashed',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('divider', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper.base, ui.value.wrapper[props.orientation]), props.class))
const containerClass = computed(() => twJoin(ui.value.container.base, ui.value.container[props.orientation]))
const borderClass = computed(() => twJoin(ui.value.border.base, ui.value.border[props.orientation], ui.value.border.size[props.orientation][props.size], ui.value.border.type[props.type], ui.value.color[props.color]))
</script>

<template>
  <div
    :class="wrapperClass"
    v-bind="attrs"
  >
    <div :class="borderClass" />

    <template v-if="$slots.default">
      <div :class="containerClass">
        <slot />
      </div>

      <div :class="borderClass" />
    </template>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { mergeConfig } from '../../utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { divider as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.divider, el)

type Props = {
  size?: ELEMENTS.SIZE
  color?: 'opaque' | 'non-opaque'
  orientation?: 'horizontal' | 'vertical'
  type?: 'solid' | 'dotted' | 'dashed'
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
