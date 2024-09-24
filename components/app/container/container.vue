<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('container', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper), props.class))
</script>

<template>
  <div
    :class="wrapperClass"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#imports'
// @ts-expect-error
import appConfig from '#build/app.config'

const el = {
  wrapper: 'w-full max-w-full mx-auto px-2.5',
}

const config = mergeConfig<typeof el>(appConfig.ui.strategy, null, el)

type Props = {
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
