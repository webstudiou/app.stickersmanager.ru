<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: undefined,
  titleFixed: true,
  modelModifiers: () => {},
  rows: 3,
  maxrows: 0,
  autoFocus: false,
  autoresize: false,
  resize: false,
  required: false,
  disabled: false,
  readonly: false,
  loading: false,
  tabIndex: 0,
  size: 'md',
  title: undefined,
  placeholder: undefined,
  hint: undefined,
  square: false,
  fluid: false,
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'focus' | 'blur' | 'change', value: Event): void
  (e: 'click', value: InputEvent): void
  (e: 'update:model-value', value: string | number | null): void
}>()

const ins = getCurrentInstance()!
const { ui, attrs } = useCore('input-text-area', toRef(props, 'ui'), config)
const TextAreaRef = ref<HTMLTextAreaElement | null>(null)
const inputId = computed(() => props.id ?? `input_${ins.uid}`)
const inputName = computed(() => props.name ?? `input-${ins.uid}`)
const modelModifiers = ref(defu({}, props.modelModifiers, { trim: false, lazy: false, number: false }))

const isFocused = ref(false)
const isRequired = computed(() => props.required)
const isDisabled = computed(() => props.loading || props.disabled)
const isReadOnly = computed(() => props.loading || props.readonly)

const { setTouched } = useField(() => inputId.value, '', {
  initialValue: props.modelValue,
  validateOnValueUpdate: true,
  syncVModel: true,
})

const update = (value: string) => {
  if (modelModifiers.value.trim) value = value.trim()
  if (modelModifiers.value.number) value = looseToNumber(value)

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
  emits('change', event)
  if (modelModifiers.value.lazy) update(value)
  if (modelModifiers.value.trim) (event.target as HTMLInputElement).value = value.trim()
}

function input(event: Event) {
  resize()
  if (!modelModifiers.value.lazy) update((event.target as HTMLInputElement).value)
}

const resize = () => {
  if (props.autoresize) {
    if (!TextAreaRef.value) return

    TextAreaRef.value.rows = props.rows

    const styles = window.getComputedStyle(TextAreaRef.value)
    const paddingTop = parseInt(styles.paddingTop)
    const paddingBottom = parseInt(styles.paddingBottom)
    const padding = paddingTop + paddingBottom
    const lineHeight = parseInt(styles.lineHeight)
    const { scrollHeight } = TextAreaRef.value
    const newRows = (scrollHeight - padding) / lineHeight

    if (newRows > props.rows) {
      TextAreaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows
    }
  }
}

const emitValue = (value?: string | number | null) => {
  emits('update:model-value', value)
}

const model = computed({
  get: () => props.modelValue,
  set: (value?: string | number | null) => emitValue(value),
})

const hasValue = computed(() => model.value !== undefined && model.value !== '')

const shouldUp = computed(() => {
  return ((!!props.title || !!props.hint) && (isFocused.value || hasValue.value || !!props.placeholder))
})

watch(() => props.modelValue, () => {
  nextTick(resize)
})

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, props.fluid && ui.value.fluid, ui.value.fonts[props.size]), props.class))
const contentsClass = computed(() => twJoin(ui.value.contents.base, ui.value.bg, ui.value.paddingX[props.size], !props.square && ui.value.rounded[props.size]))
const inputClass = computed(() => twJoin(ui.value.input, ui.value.bg, !props.resize && 'resize-none'))
const iconSize = computed(() => ui.value.icons[props.size])
const labelStyle = computed(() => {
  const style: CSSProperties = {
    transform: shouldUp.value ? 'translate(-200%, 50%)' : 'translate(0, 50%)',
  }
  return style
})
const errorClass = computed(() => twJoin('w-full', 'truncate', 'text-sm', 'text-muted'))

onMounted(() => {
  setTimeout(() => {
    setTouched(props.autoFocus)
    resize()
  }, 100)
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
    </label>
    <div :class="contentsClass">
      <div :class="ui.contents.inner">
        <textarea
          :id="inputId"
          ref="TextAreaRef"
          :value="modelValue"
          :name="inputName"
          v-bind="attrs"
          :class="inputClass"
          :autofocus="autoFocus"
          :placeholder="useLangs(placeholder ?? '')"
          :aria-label="useLangs(title ?? placeholder ?? '')"
          :disabled="isDisabled"
          :readonly="isReadOnly"
          :required="isRequired"
          :tabindex="tabIndex"
          :rows="rows"
          v-on="{
            blur,
            focus,
            change,
            input,
            click,
          }"
        />
        <label
          v-if="title || placeholder"
          :for="inputId"
          :class="ui.contents.label"
          :style="labelStyle"
        >
          {{ useLangs(title || placeholder) }}
        </label>
      </div>
      <div v-if="loading" :class="ui.icons">
        <els-spinner :size="iconSize" class=" translate-y-1/4" />
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
import { inputText } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const el = {
  ...inputText,
  contents: {
    base: 'flex self-stretch gap-2.5 relative border border-transparent',
    inner: 'relative w-full overflow-hidden',
    label: 'absolute left-0 right-auto pointer-events-none w-full text-muted truncate transition',
  },
}
export const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.inputText, el)

type Props = {
  id?: string
  name?: string
  modelValue: string | number | null
  modelModifiers?: { trim?: boolean, lazy?: boolean, number?: boolean }
  rows?: number
  maxrows?: number
  autoFocus?: boolean
  autoresize?: boolean
  resize?: boolean
  required?: boolean
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
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
