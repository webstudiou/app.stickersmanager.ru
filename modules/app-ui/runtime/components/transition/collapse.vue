<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('transition-collapse', toRef(props, 'ui'), config, toRef(props, 'class'))

function onEnter(_el: Element, done: () => void) {
  const el = _el as HTMLElement
  el.style.height = '0'
  // @ts-ignore
  el.offsetHeight
  el.style.height = el.scrollHeight + 'px'
  el.addEventListener('transitionend', done, { once: true })
}

function onBeforeLeave(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = el.scrollHeight + 'px'
  // @ts-ignore
  el.offsetHeight
}

function onAfterEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = 'auto'
}

function onLeave(_el: Element, done: () => void) {
  const el = _el as HTMLElement
  el.style.height = '0'

  el.addEventListener('transitionend', done, { once: true })
}
</script>

<template>
  <transition
    v-bind="{ ...ui.transition, ...attrs }"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
// @ts-expect-error
import appConfig from '#build/app.config'

const el = {
  transition: {
    enterActiveClass: 'overflow-hidden transition-[height] duration-150 ease-out',
    leaveActiveClass: 'overflow-hidden transition-[height] duration-150 ease-out',
  },
}

const config = mergeConfig<typeof el>(appConfig.ui.strategy, null, el)

type Props = {
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
