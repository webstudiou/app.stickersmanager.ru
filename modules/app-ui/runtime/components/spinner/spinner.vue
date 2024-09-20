<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  size: '2em',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('spinner', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper), props.class))
</script>

<template>
  <els-icon
    name="spinner"
    :class="wrapperClass"
    :size
    v-bind="attrs"
  />
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { spinner as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.spinner, el)

type Props = {
  size?: string
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
