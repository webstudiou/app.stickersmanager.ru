<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  icon: undefined,
  size: 'md',
  class: '',
  ui: () => ({}),
})

const { ui, attrs } = useCore('page-info', toRef(props, 'ui'), config)

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper), props.class))
const iconSize = computed(() => ui.value.icons[props.size])
</script>

<template>
  <div
    :class="wrapperClass"
    v-bind="{ ...attrs }"
  >
    <slot name="icon">
      <div
        v-if="icon"
        :class="[twMerge(ui.icon, ui.height[size], ui.width[size], ui.rounded[size])]"
      >
        <els-icon
          :name="icon"
          :size="iconSize"
        />
      </div>
    </slot>
    <div>
      <h6 class="text-subheadline">
        <slot name="title">
          {{ useLangs(title) }}
        </slot>
      </h6>
      <p class="text-footnote font-regular text-muted">
        <slot name="description">
          {{ useLangs(description) }}
        </slot>
      </p>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#imports'
import { pageInfo as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui?.strategy as Strategy, appConfig.ui.pageInfo, el)

type Props = {
  title?: string
  description?: string
  icon?: string
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
