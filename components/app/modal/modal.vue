<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  icon: undefined,
  title: undefined,
  description: undefined,
  preventClose: false,
  ui: () => ({}),
})

const emit = defineEmits(['update:model-value'])

const { ui, attrs } = useCore('app-modal', toRef(props, 'ui'), config, undefined, true)

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:model-value', value)
  },
})
</script>

<template>
  <els-modal
    v-model="isOpen"
    overlay
    transition
    :prevent-close="preventClose"
    :ui="ui"
    v-bind="attrs"
  >
    <div>
      <slot name="header">
        <div :class="ui.header.wrapper">
          <div v-if="icon || $slots.icon" :class="ui.header.icon.wrapper">
            <slot name="icon">
              <els-icon :name="icon" :class="ui.header.icon.base" />
            </slot>
          </div>

          <div class="flex flex-col justify-between items-start py-0.5 h-md">
            <div v-if="title || $slots.title" :class="ui.header.title">
              <slot name="title">
                {{ useLangs(title) }}
              </slot>
            </div>

            <div v-if="description || $slots.description" :class="ui.header.description">
              <slot name="description">
                {{ useLangs(description) }}
              </slot>
            </div>
          </div>
        </div>

        <!--        <UButton
          v-if="closeButton"
          aria-label="Close"
          v-bind="{ ...ui.default.closeButton, ...closeButton }"
          @click="isOpen = false"
        /> -->
      </slot>
      <div :class="ui.body.wrapper">
        <slot />
      </div>
      <div v-if="$slots.footer" :class="ui.footer.wrapper">
        <slot name="footer" />
      </div>
    </div>
  </els-modal>
</template>

<script lang="ts">
import { toRef } from 'vue'
import { useCore, useLangs } from '#imports'
import type { modal as modalConfig } from '#app-ui/configs'

const config = {
  header: {
    wrapper: 'flex items-center gap-1.5 text-md p-2.5 pb-0',
    icon: {
      wrapper: 'flex flex-center shrink-0 rounded-sm bg-gray-6 h-md w-md',
      base: 'text-primary',
    },
    title: '',
    description: 'text-sm text-muted',
  },
  body: {
    wrapper: 'p-2.5',
  },
  footer: {
    wrapper: 'p-2.5 pt-0',
  },
}

type Props = {
  modelValue?: boolean
  icon?: string
  title?: string
  description?: string
  preventClose?: boolean
  ui?: Partial<typeof config & typeof modalConfig>
}
</script>
