<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  borderBottom: false,
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('app-toolbar', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, props.borderBottom && ui.value.border.bottom), props.class))
</script>

<template>
  <div
    :class="wrapperClass"
    v-bind="attrs"
  >
    <slot />
    <div :class="ui.container">
      <div
        v-if="$slots.left"
        :class="ui.left"
      >
        <slot name="left" />
      </div>
      <div
        v-if="$slots.right"
        :class="ui.right"
      >
        <slot name="right" />
      </div>
    </div>
    <slot name="bottom" />
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#imports'
import { toolbar as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.toolbar, el)

type Props = {
  borderBottom?: boolean
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
