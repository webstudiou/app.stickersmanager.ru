<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: undefined,
  type: 'text',
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
  (e: 'focus' | 'blur' | 'change', value: Event): void
  (e: 'click', value: InputEvent): void
  (e: 'update:model-value', value: string | number | null | undefined | boolean): void
}>()

const ins = getCurrentInstance()!
const { ui, attrs } = useCore('input-text', toRef(props, 'ui'), config)
const inputId = computed(() => props.id ?? `input_${ins.uid}`)
const inputName = computed(() => props.name ?? `input-${ins.uid}`)
const inputType = computed(() => (isPassword.value ? 'text' : props.type))

const isPassword = ref(false)
const isFocused = ref(false)
const isRequired = computed(() => props.rules.includes('required') || props.required)
const isDisabled = computed(() => props.loading || props.disabled)
const isReadOnly = computed(() => props.loading || props.readonly)

const { errorMessage: error, setTouched } = useField(() => inputId.value, props.rules, {
  initialValue: props.modelValue,
  validateOnValueUpdate: true,
  syncVModel: true,
})

const emitValue = (value?: string | number | null | undefined | boolean) => {
  emits('update:model-value', value)
}

function focus(event: Event) {
  emits('focus', event)
  isFocused.value = true
}

function blur(event: Event) {
  emits('blur', event)
  isFocused.value = false
}
function click(event: InputEvent) {
  emits('click', event)
  isFocused.value = true
}

function change(event: Event) {
  return emits('change', event)
}

const model = computed({
  get: () => props.modelValue,
  set: (value?: string | number | null | undefined | boolean) => emitValue(value),
})

const hasValue = computed(() => model.value !== undefined && model.value !== '')

const shouldUp = computed(() => {
  return ((!!props.title || !!props.hint) && (isFocused.value || hasValue.value || !!props.placeholder || ['date', 'month', 'week'].includes(props.type)))
})

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, props.fluid && ui.value.fluid, ui.value.fonts[props.size]), props.class))
const contentsClass = computed(() => twJoin(ui.value.contents.base, error.value && ui.value.error, ui.value.bg, ui.value.height[props.size], ui.value.paddingX[props.size], !props.square && ui.value.rounded[props.size]))
const inputClass = computed(() => twJoin(ui.value.input, ui.value.bg))
const iconSize = computed(() => ui.value.icons[props.size])
const labelStyle = computed(() => {
  const style: CSSProperties = {
    transform: shouldUp.value ? 'translate(-200%, -50%)' : 'translate(0, -50%)',
  }
  return style
})
const errorClass = computed(() => twJoin('w-full', 'truncate', 'text-sm', error.value ? 'text-danger' : 'text-muted'))

onMounted(() => {
  nextTick(() => {
    setTouched(props.autoFocus)
  })
})
</script>

<template>
  <div :class="wrapperClass">
    <label
      v-if="title && titleFixed"
      :for="inputId"
      :class="ui.label"
    >
      {{ useLangs(title) }}
      <sup
        v-if="isRequired"
        class="text-danger"
      >*</sup>
    </label>
    <div :class="contentsClass">
      <div
        v-if="leftIcon || $slots.leftIcon"
        :class="ui.iconsWrapper"
      >
        <slot
          name="leftIcon"
          :icon-size="iconSize"
        >
          <els-icon
            :name="leftIcon"
            :size="iconSize"
          />
        </slot>
      </div>
      <div :class="ui.contents.inner">
        <input
          :id="inputId"
          v-model="model"
          :name="inputName"
          v-bind="attrs"
          :class="inputClass"
          :inputmode="inputmode"
          :autofocus="autoFocus"
          :placeholder="useLangs(placeholder ?? '')"
          :aria-label="useLangs(title ?? placeholder ?? '')"
          :type="inputType"
          :disabled="isDisabled"
          :readonly="isReadOnly"
          :required="isRequired"
          :tabindex="tabIndex"
          v-on="{
            blur,
            focus,
            change,
            click,
          }"
        >
        <label
          v-if="title || placeholder"
          :for="inputId"
          :class="ui.contents.label"
          :style="labelStyle"
        >
          {{ useLangs(title || placeholder) }}
          <sup
            v-if="isRequired"
            class="text-danger"
          >*</sup>
        </label>
      </div>
      <div
        v-if="rightIcon || loading || $slots.rightIcon"
        :class="ui.iconsWrapper"
      >
        <slot
          v-if="!loading && rightIcon || $slots.rightIcon"
          name="rightIcon"
          :icon-size="iconSize"
        >
          <els-icon
            :name="rightIcon"
            :size="iconSize"
          />
        </slot>
        <els-spinner
          v-else-if="loading"
          :size="iconSize"
        />
      </div>
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="error || hint"
        :class="errorClass"
      >
        {{ error ? useLangs(String(error)) : useLangs(hint || ' ') }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes, CSSProperties } from 'vue'
import { useField } from 'vee-validate'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { inputText as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.inputText, el)

type Props = {
  id?: string
  name?: string
  modelValue: string | number | null | undefined | boolean
  type?:
    | 'text'
    | 'date'
    | 'number'
    | 'tel'
    | 'search'
    | 'url'
    | 'password'
    | 'month'
    | 'time'
    | 'week'
    | 'email'
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
  ui?: Partial<typeof config>
}
</script>
