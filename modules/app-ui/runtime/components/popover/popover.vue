<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  open: false,
  disabled: false,
  openDelay: 0,
  closeDelay: 0,
  overlay: false,
  popper: () => ({}),
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const { ui, attrs } = useCore('popover', toRef(props, 'ui'), config, toRef(props, 'class'))

const popper = computed<PopperOptions>(() => defu(props.mode === 'hover' ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper as PopperOptions))

const [trigger, container] = usePopper(popper.value)

const popover = ref<any>(null)
// https://github.com/tailwindlabs/headlessui/blob/f66f4926c489fc15289d528294c23a3dc2aee7b1/packages/%40headlessui-vue/src/components/popover/popover.ts#L151
const popoverApi = ref<any>(null)

let openTimeout: NodeJS.Timeout | number = null
let closeTimeout: NodeJS.Timeout | number = null

onMounted(() => {
  const popoverProvides = popover.value?.$.provides
  if (!popoverProvides) {
    return
  }
  const popoverProvidesSymbols = Object.getOwnPropertySymbols(popoverProvides)
  popoverApi.value = popoverProvidesSymbols.length && popoverProvides[popoverProvidesSymbols[0]]

  if (props.open) {
    popoverApi.value?.togglePopover()
  }
})

const containerStyle = computed(() => {
  if (props.mode !== 'hover') {
    return {}
  }

  const offsetDistance = (props.popper as PopperOptions)?.offsetDistance || (ui.value.popper as PopperOptions)?.offsetDistance || 8
  const placement = popper.value.placement?.split('-')[0]
  const padding = `${offsetDistance}px`

  if (placement === 'top' || placement === 'bottom') {
    return {
      paddingTop: padding,
      paddingBottom: padding,
    }
  }
  else if (placement === 'left' || placement === 'right') {
    return {
      paddingLeft: padding,
      paddingRight: padding,
    }
  }
  else {
    return {
      paddingTop: padding,
      paddingBottom: padding,
      paddingLeft: padding,
      paddingRight: padding,
    }
  }
})

function onTouchStart(event: TouchEvent) {
  if (!event.cancelable || !popoverApi.value) {
    return
  }

  if (popoverApi.value.popoverState === 0) {
    popoverApi.value.closePopover()
  }
  else {
    popoverApi.value.togglePopover()
  }
}

function onMouseEnter() {
  if (props.mode !== 'hover' || !popoverApi.value) {
    return
  }

  // cancel programmed closing
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  // dropdown already open
  if (popoverApi.value.popoverState === 0) {
    return
  }
  openTimeout = openTimeout || setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    popoverApi.value.togglePopover && popoverApi.value.togglePopover()
    openTimeout = null
  }, props.openDelay)
}

function onMouseLeave() {
  if (props.mode !== 'hover' || !popoverApi.value) {
    return
  }

  // cancel programmed opening
  if (openTimeout) {
    clearTimeout(openTimeout)
    openTimeout = null
  }
  // dropdown already closed
  if (popoverApi.value.popoverState === 1) {
    return
  }
  closeTimeout = closeTimeout || setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    popoverApi.value.closePopover && popoverApi.value.closePopover()
    closeTimeout = null
  }, props.closeDelay)
}

watch(() => props.open, (newValue: boolean, oldValue: boolean) => {
  if (!popoverApi.value) return
  if (oldValue === undefined || newValue === oldValue) return

  if (newValue) {
    // No `openPopover` method and `popoverApi.value.togglePopover` won't work because of the `watch` below
    popoverApi.value.popoverState = 0
  }
  else {
    popoverApi.value.closePopover()
  }
})

watch(() => popoverApi.value?.popoverState, (newValue: number, oldValue: number) => {
  if (oldValue === undefined || newValue === oldValue) return

  emits('update:open', newValue === 0)
})

provideUseId(() => useId())
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <hls-popover
    ref="popover"
    v-slot="{ open, close }"
    :class="ui.wrapper"
    v-bind="attrs"
    @mouseleave="onMouseLeave"
  >
    <hls-popover-button
      ref="trigger"
      as="div"
      :disabled="disabled"
      :class="ui.trigger"
      role="button"
      @mouseenter="onMouseEnter"
      @touchstart.passive="onTouchStart"
    >
      <slot
        :open="open"
        :close="close"
      >
        <button :disabled="disabled">
          Open
        </button>
      </slot>
    </hls-popover-button>

    <Transition
      v-if="overlay"
      appear
      v-bind="ui.overlay.transition"
    >
      <div
        v-if="open"
        :class="[ui.overlay.base, ui.overlay.background]"
      />
    </Transition>

    <div
      v-if="open"
      ref="container"
      :class="[ui.container, ui.width]"
      :style="containerStyle"
      @mouseenter="onMouseEnter"
    >
      <Transition
        appear
        v-bind="ui.transition"
      >
        <div>
          <div
            v-if="popper.arrow"
            data-popper-arrow
            :class="Object.values(ui.arrow)"
          />

          <hls-popover-panel
            :class="[ui.base, ui.background, ui.ring, ui.rounded, ui.shadow]"
            static
          >
            <slot
              name="panel"
              :open="open"
              :close="close"
            />
          </hls-popover-panel>
        </div>
      </Transition>
    </div>
  </hls-popover>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { provideUseId } from '@headlessui/vue'
import { useCore, usePopper } from '../../composables'
import { mergeConfig, defu } from '../../utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { popover as el } from '#app-ui/configs'
import { useId } from '#imports'
import type { PopperOptions } from '#app-ui/types/popper'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.popover, el)

type Props = {
  mode: 'click' | 'hover'
  open: boolean
  disabled: boolean
  openDelay: number
  closeDelay: number
  overlay: boolean
  popper: PopperOptions
  class: HTMLAttributes['class']
  ui: Partial<typeof config> & { strategy?: Strategy }
}
</script>
