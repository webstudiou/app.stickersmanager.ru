<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  animated: true,
  count: 1,
  rows: 0,
  loading: true,
  throttle: undefined,
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const { ui } = useCore('skeleton', toRef(props, 'ui'), config, toRef(props, 'class'))

const isLoading = useThrottleRender(toRef(props, 'loading'), props.throttle)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper), props.class))

defineExpose({
  isLoading,
})
</script>

<template>
  <template v-if="isLoading">
    <div :class="wrapperClass" v-bind="$attrs">
      <template v-for="i in count" :key="i">
        <slot v-if="loading" :key="i" name="template">
          <els-skeleton-item
            first
            variant="div"
            :animated
            :size
          />
          <els-skeleton-item
            v-for="item in rows"
            :key="item"
            :last="item === rows && rows > 1"
            :class="[
              // ns.e('paragraph'),
            ]"
            variant="div"
            :animated
            :size
          />
        </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs" />
  </template>
</template>

<script lang="ts">
import { type HTMLAttributes, toRef } from 'vue'
import { mergeConfig, twMerge, twJoin } from '../../utils'
import { useThrottleRender } from '../../composables'
// @ts-expect-error
import appConfig from '#build/app.config'
import { skeleton as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.skeleton, el)

type Props = {
  animated?: boolean
  count?: number
  rows?: number
  loading?: boolean
  throttle?: number
  size?: 'xxs' | ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
