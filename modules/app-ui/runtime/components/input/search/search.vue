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
  disabled: false,
  loading: false,
  tabIndex: 0,
  size: 'md',
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
const { ui, attrs } = useCore('input-search', toRef(props, 'ui'), config)
const inputId = computed(() => props.id ?? `input_${ins.uid}`)
const inputName = computed(() => props.name ?? `input-${ins.uid}`)

const isFocused = ref(false)
const isDisabled = computed(() => props.loading || props.disabled)
const isReadOnly = computed(() => props.loading || props.readonly)

const { setTouched } = useField(() => inputId.value, '', {
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
const contentsClass = computed(() => twJoin(ui.value.contents.base, ui.value.bg, ui.value.height[props.size], ui.value.paddingX[props.size], !props.square && ui.value.rounded[props.size]))
const inputClass = computed(() => twJoin(ui.value.input, ui.value.bg))
const iconSize = computed(() => ui.value.icons[props.size])
const labelStyle = computed(() => {
  const style: CSSProperties = {
    transform: shouldUp.value ? 'translate(-200%, -50%)' : 'translate(0, -50%)',
  }
  return style
})
const errorClass = computed(() => twJoin('w-full', 'truncate', 'text-sm', 'text-muted'))

onMounted(() => {
  nextTick(() => {
    setTouched(props.autoFocus)
  })
})
</script>

<template>
  <div :class="wrapperClass">
    <label v-if="title && titleFixed" :for="inputId" :class="ui.label">
      {{ useLangs(title) }}
    </label>
    <div :class="contentsClass">
      <div :class="ui.iconsWrapper">
        <slot name="leftIcon" :icon-size="iconSize">
          <els-icon name="search" :size="iconSize" />
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
          :type
          :disabled="isDisabled"
          :readonly="isReadOnly"
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
        </label>
      </div>
      <div v-if="loading" :class="ui.iconsWrapper">
        <els-spinner :size="iconSize" />
      </div>
    </div>
    <els-transition-collapse>
      <div v-if="hint" :class="errorClass">
        {{ useLangs(hint || ' ') }}
      </div>
    </els-transition-collapse>
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

export const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.inputText, el)

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
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  tabIndex?: string | number
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
