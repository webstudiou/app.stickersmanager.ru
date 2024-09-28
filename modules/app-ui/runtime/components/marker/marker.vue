<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  color: 'primary',
  square: false,
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('marker', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>

<template>
  <div :class="[ui.wrapper, ui.padding[size], ui.fonts[size], ui.before.base, ui.before.size[size], !square && ui.before.rounded, ui.before.colors[color]]" v-bind="attrs">
    <slot v-if="title || $slots.default">
      {{ useLangs(title) }}
    </slot>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { marker as el } from '#app-ui/configs'

// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.marker, el)

type Props = {
  title?: string
  color?: ELEMENTS.COLOR
  square?: boolean
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
