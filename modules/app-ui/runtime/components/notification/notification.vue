<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  icon: undefined,
  timeout: 5000,
  actions: () => [],
  callback: undefined,
  color: 'default',
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'close'): void
}>()

const { ui, attrs } = useCore('notification', toRef(props, 'ui'), config)

let timer: null | ReturnType<typeof useTimer> = null
const remaining = ref(props.timeout)

const size = 'md'

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, ui.value.color[props.color], ui.value.rounded[size]), props.class))
const progressClass = computed(() => twJoin(ui.value.progress, props.color === 'default' ? 'bg-primary' : 'bg-white'))

const progressStyle = computed(() => {
  const remainingPercent = remaining.value / props.timeout * 100
  return { width: `${remainingPercent || 0}%` }
})

function onMouseover() {
  if (timer) {
    timer.pause()
  }
}

function onMouseleave() {
  if (timer) {
    timer.resume()
  }
}

function onClose() {
  if (timer) {
    timer.stop()
  }

  if (props.callback) {
    props.callback()
  }

  emits('close')
}

function onAction(action: NotificationAction) {
  if (timer) {
    timer.stop()
  }

  if (action.click) {
    action.click()
  }

  emits('close')
}

function initTimer() {
  if (timer) {
    timer.stop()
  }

  if (!props.timeout) {
    return
  }

  timer = useTimer(() => {
    onClose()
  }, props.timeout)

  watchEffect(() => {
    remaining.value = timer.remaining.value
  })
}

watch(() => props.timeout, initTimer)

onMounted(initTimer)

onUnmounted(() => {
  if (timer) {
    timer.stop()
  }
})
</script>

<template>
  <transition appear v-bind="ui.transition">
    <div
      :class="wrapperClass"
      role="status"
      v-bind="attrs"
      @mouseover="onMouseover"
      @mouseleave="onMouseleave"
    >
      <div :class="[ui.container, ui.rounded[size]]">
        <div class="p-2.5 flex flex-col gap-1.5">
          <div v-if="icon || title || $slots.title" class="flex items-center justify-start gap-1.5 relative">
            <els-icon v-if="icon" :name="icon" :size="ui.icons[size]" />
            <div v-if="title" class="font-medium w-full mr-5" :class="[ui.fonts[size]]">
              <slot name="title" :title="title">
                {{ useLangs(title) }}
              </slot>
            </div>
          </div>
          <div v-if="description || $slots.description" class="font-light text-footnote">
            <slot name="description" :title="description">
              {{ useLangs(description) }}
            </slot>
          </div>
          <div v-if="actions.length" class="flex justify-end">
            <els-button
              v-for="(action, index) of actions"
              :key="index"
              size="xs"
              v-bind="{ ...action }"
              @click.stop="onAction(action)"
            />
          </div>
        </div>
        <div v-if="timeout" :class="progressClass" :style="progressStyle" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { useTimer, useCore, useLangs } from '../../composables'
import { mergeConfig, twJoin, twMerge } from '../../utils'
import type { NotificationAction, NotificationColor } from '#app-ui/types/notification'
// @ts-expect-error
import appConfig from '#build/app.config'
import { notification as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.notification, el)

type Props = {
  id: string | number
  title?: string
  description?: string
  icon?: string
  timeout?: number
  actions?: NotificationAction[]
  callback?: VoidFunction
  color?: NotificationColor
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
