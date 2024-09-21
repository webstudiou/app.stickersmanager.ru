<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  scrollable: false,
  loading: false,
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('app-page', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, (props.scrollable && !props.loading) && ui.value.scrollable), props.class))
</script>

<template>
  <div
    :class="wrapperClass"
    v-bind="attrs"
  >
    <slot v-if="!loading" />
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
// @ts-expect-error
import appConfig from '#build/app.config'

const el = {
  wrapper: 'flex-1 flex flex-col overflow-hidden h-full',
  scrollable: 'overflow-y-auto',
}

const config = mergeConfig<typeof el>(appConfig.ui?.strategy as Strategy, null, el)

type Props = {
  scrollable?: boolean
  loading?: boolean
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
