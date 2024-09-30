<script setup lang="ts">
import { Dialog as HDialog, DialogPanel as HDialogPanel, TransitionRoot, TransitionChild, provideUseId } from '@headlessui/vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  appear: false,
  overlay: true,
  transition: true,
  preventClose: false,
  fullscreen: false,
  class: () => '',
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'close-prevented' | 'close' | 'after-leave'): void
  (e: 'update:model-value', value: boolean): void
}>()

const { ui, attrs } = useCore('modal', toRef(props, 'ui'), config, toRef(props, 'class'))

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:model-value', value)
  },
})

const transitionClass = computed(() => {
  if (!props.transition) {
    return {}
  }

  return {
    ...ui.value.transition,
  }
})

function close(value: boolean) {
  if (props.preventClose) {
    emits('close-prevented')

    return
  }

  isOpen.value = value

  emits('close')
}

const onAfterLeave = () => {
  emits('after-leave')
}

provideUseId(() => useId())
</script>

<template>
  <TransitionRoot
    :appear="appear"
    :show="isOpen"
    as="template"
    @after-leave="onAfterLeave"
  >
    <HDialog :class="ui.wrapper" v-bind="attrs" @close="close">
      <TransitionChild
        v-if="overlay"
        as="template"
        :appear="appear"
        v-bind="ui.overlay.transition"
      >
        <div :class="[ui.overlay.base, ui.overlay.background]" />
      </TransitionChild>

      <div :class="ui.inner">
        <div :class="[ui.container, !fullscreen && ui.padding]">
          <TransitionChild as="template" :appear="appear" v-bind="transitionClass">
            <HDialogPanel
              :class="[
                ui.base,
                ui.background,
                ui.ring,
                ui.shadow,
                fullscreen ? ui.fullscreen : [ui.width, ui.height, ui.rounded, ui.margin],
              ]"
            >
              <slot />
            </HDialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HDialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { computed, toRef, type HTMLAttributes } from 'vue'
import { useCore, useId } from '#imports'
import { mergeConfig } from '#app-ui/utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { modal } from '#app-ui/configs'

const config = mergeConfig<typeof modal>(appConfig.ui.strategy, appConfig.ui.modal, modal)

 type Props = {
   modelValue?: boolean
   appear?: boolean
   overlay?: boolean
   transition?: boolean
   preventClose?: boolean
   fullscreen?: boolean
   class?: HTMLAttributes['class']
   ui?: Partial<typeof config> & { strategy?: Strategy }
 }
</script>
