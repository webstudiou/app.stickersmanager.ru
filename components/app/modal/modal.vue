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
  closer: false,
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

const size = 'md'
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
              <els-icon :name="icon" :class="ui.header.icon.base" :size="ui.basis.icons[size]" />
            </slot>
          </div>

          <div class="flex flex-col justify-between items-start py-0.5" :class="[ui.basis.height[size]]">
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
        <div
          v-if="closer"
          class="absolute -top-2 -right-2 p-2.5 text-muted bg-backgrounds-primary shadow-[0_5px_20px_0_rgba(0,_0,_0,_0.05)] flex flex-center hover:-translate-x-0.5 hover:translate-y-0.5 transition-transform hover:text-labels-primary cursor-pointer"
          :class="[ui.basis.height[size], ui.basis.width[size], ui.basis.rounded[size]]"
          @click="isOpen = false"
        >
          <els-icon name="x" :size="ui.basis.icons[size]" class="transition-colors" />
        </div>
      </slot>
      <div :class="ui.body.wrapper">
        <slot :size="size" :ui="ui" />
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
import { basis } from '#app-ui/configs'

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
  basis: {
    ...basis,
  },
}

type Props = {
  modelValue?: boolean
  icon?: string
  title?: string
  description?: string
  preventClose?: boolean
  closer?: boolean
  ui?: Partial<typeof config & typeof modalConfig>
}
</script>
