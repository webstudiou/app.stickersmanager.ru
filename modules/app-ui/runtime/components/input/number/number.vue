<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: undefined,
  type: 'number',
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  step: 1,
  titleFixed: true,
  autoFocus: false,
  required: false,
  disabled: false,
  readonly: false,
  loading: false,
  rules: '',
  tabIndex: 0,
  size: 'md',
  leftIcon: undefined,
  rightIcon: undefined,
  title: undefined,
  placeholder: undefined,
  hint: undefined,
  inputmode: 'text',
  square: false,
  fluid: false,
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'focus' | 'blur' | 'change' | 'click', value: Event): void
  (e: 'update:model-value', value: number | null | undefined): void
}>()

const currentValue = computed({
  get: () => props.modelValue,
  set: value => emitValue(value),
})

function findClosestStep(number: number) {
  return Math.round(number / props.step) * props.step
}

const checkValue = (value?: number) => {
  if (typeof value !== 'number') return
  if (value <= props.min) return props.min
  return value >= props.max ? props.max : findClosestStep(value)
}

const emitDebounced = debounce((value?: number) => emitValue(value), 300)

const emitValue = (newValue?: number) => {
  newValue = checkValue(newValue)
  if (currentValue.value === newValue) return
  emits('update:model-value', newValue)
}

emitValue(currentValue.value)

const incrementDisabled = computed(() => props.modelValue && props.modelValue >= props.max)
const decrementDisabled = computed(() => props.modelValue && props.modelValue <= props.min)

const increment = () => {
  if (props.disabled || incrementDisabled.value) return

  if ((currentValue.value === undefined || currentValue.value === null) && Number.isFinite(props.min)) {
    currentValue.value = props.min
    return
  }

  currentValue.value = (currentValue.value ?? 0) + props.step
}
const decrement = () => {
  if (props.disabled || decrementDisabled.value) return

  if ((currentValue.value === undefined || currentValue.value === null) && Number.isFinite(props.min)) {
    currentValue.value = props.min
    return
  }

  currentValue.value = (currentValue.value ?? 0) - props.step
}

const { ui, attrs } = useCore('input-number', toRef(props, 'ui'), config)

function blur(event: Event) {
  if (typeof currentValue.value !== 'number' && props.min) currentValue.value = props.min
  emitValue(currentValue.value)
  emits('blur', event)
}
</script>

<template>
  <els-input-text
    :id
    :name
    :auto-focus="autoFocus"
    :required
    :disabled
    :readonly
    :loading
    :rules
    :tab-index="tabIndex"
    :title
    :title-fixed="titleFixed"
    :placeholder
    :hint
    :square
    :fluid
    :size
    :model-value="currentValue"
    :type="type"
    v-bind="attrs"
    :inputmode
    :ui
    @keydown.up.prevent="increment"
    @keydown.down.prevent="decrement"
    @focus="$emit('focus', $event)"
    @change="$emit('change', $event)"
    @blur="blur"
    @click="$emit('click', $event)"
    @update:model-value="emitDebounced($event as number | undefined)"
  >
    <template #leftIcon>
      <button
        type="button"
        tabindex="-1"
        :disabled="decrementDisabled || disabled"
        class="border-0 outline-0 inline-flex flex-center"
        @click="decrement"
      >
        <els-icon name="minus-square" :size="ui.icons[size]" :class="[(decrementDisabled || disabled) && 'opacity-25']" />
      </button>
    </template>
    <template #rightIcon>
      <button
        tabindex="-1"
        :disabled="incrementDisabled || disabled"
        class="border-0 outline-0 flex flex-center"
        type="button"
        @click="increment"
      >
        <els-icon name="plus-square" :size="ui.icons[size]" :class="[(incrementDisabled || disabled) && 'opacity-25']" />
      </button>
    </template>
  </els-input-text>
</template>

<script lang="ts">
import debounce from 'lodash/debounce'
import type { HTMLAttributes } from 'vue'
import { mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { inputText as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

export const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.inputText, el)

type Props = {
  modelValue: number | null | undefined
  max?: number
  min?: number
  step?: number
  id?: string
  name?: string
  type?: 'number'
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  rules?: string
  tabIndex?: string | number
  leftIcon?: string
  rightIcon?: string
  title?: string
  titleFixed?: boolean
  placeholder?: string
  hint?: string
  square?: boolean
  fluid?: boolean
  size?: ELEMENTS.SIZE
  inputmode?: HTMLAttributes['inputmode']
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
