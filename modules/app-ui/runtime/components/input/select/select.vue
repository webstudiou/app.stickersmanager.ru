<script setup lang="ts">
import {
  Combobox as HCombobox,
  ComboboxButton as HComboboxButton,
  ComboboxOptions as HComboboxOptions,
  ComboboxOption as HComboboxOption,
  ComboboxInput as HComboboxInput,
  Listbox as HListbox,
  ListboxButton as HListboxButton,
  ListboxOptions as HListboxOptions,
  ListboxOption as HListboxOption,
  provideUseId,
} from '@headlessui/vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  query: undefined,
  by: undefined,
  options: () => [],
  id: undefined,
  name: undefined,
  required: false,
  icon: undefined,
  loadingIcon: 'spinner',
  leftIcon: undefined,
  rightIcon: 'chevron-right',
  trailing: false,
  leading: false,
  loading: false,
  disabled: false,
  multiple: false,
  searchable: false,
  searchablePlaceholder: 'models.search.title',
  searchableLazy: false,
  clearSearchOnClose: false,
  debounce: 200,
  creatable: false,
  showCreateOptionWhen: 'empty',
  title: undefined,
  titleFixed: true,
  rules: '',
  hint: undefined,
  fluid: true,
  size: 'md',
  sizeOptions: 'md',
  optionAttribute: 'title',
  valueAttribute: undefined,
  searchAttributes: undefined,
  popper: () => ({}),
  selectClass: undefined,
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'open' | 'close'): void
  (e: 'change', value: any): void
  (e: 'update:query', value: string): void
  (e: 'update:model-value', value: string | number | null | undefined | boolean): void
}>()

const ins = getCurrentInstance()!
const { ui, attrs } = useCore('input-select', toRef(props, 'ui'), config, toRef(props, 'class'))
const { ui: uiInput } = useCore('input-text', null, inputConfig)

const inputId = computed(() => props.id ?? `input_${ins.uid}`)
const inputName = computed(() => props.name ?? `input-${ins.uid}`)

const isRequired = computed(() => props.rules.includes('required') || props.required)
const isDisabled = computed(() => props.loading || props.disabled)

const { errorMessage: error } = useField(() => inputId.value, props.rules, {
  initialValue: props.modelValue,
  validateOnValueUpdate: true,
  syncVModel: true,
})

const popper = computed<PopperOptions>(() => defu({}, props.popper, {
  placement: 'bottom-end',
} as PopperOptions))

const [trigger, container] = usePopper(popper.value)

const internalQuery = ref('')
const query = computed({
  get() {
    return props.query ?? internalQuery.value
  },
  set(value) {
    internalQuery.value = value
    emits('update:query', value)
  },
})

const selected = computed(() => {
  if (props.multiple) {
    if (!Array.isArray(props.modelValue) || !props.modelValue.length) {
      return []
    }

    if (props.valueAttribute) {
      // @ts-ignore
      return options.value.filter(option => (props.modelValue as any[]).includes(option[props.valueAttribute]))
    }
    // @ts-ignore
    return options.value.filter(option => (props.modelValue as any[]).includes(option))
  }

  if (props.valueAttribute) {
    // @ts-ignore
    return options.value.find(option => option[props.valueAttribute] === props.modelValue)
  }

  // @ts-ignore
  return options.value.find(option => option === props.modelValue)
})

const label = computed(() => {
  if (props.multiple) {
    if (Array.isArray(props.modelValue) && props.modelValue.length) {
      return `${selected.value.length} selected`
    }
    else {
      return null
    }
  }
  else if (props.modelValue !== undefined && props.modelValue !== null) {
    if (props.valueAttribute) {
      return selected.value?.[props.optionAttribute] ?? null
    }
    else {
      return ['string', 'number'].includes(typeof props.modelValue) ? props.modelValue : props.modelValue[props.optionAttribute]
    }
  }

  return null
})

const slots = useSlots()

const selectClass = computed(() => twMerge(twJoin(ui.value.select, ui.value.rounded[props.size], ui.value.height[props.size], (isLeading.value || slots.leading) && ui.value.paddingStart[props.size], (isTrailing.value || slots.trailing) && ui.value.paddingEnd[props.size]), props.selectClass))
const placeholderClass = computed(() => twJoin(props.title && !props.modelValue && ui.value.placeholder))

const isLeading = computed(() => (props.icon && props.leading) || (props.icon && !props.trailing) || (props.loading && !props.trailing) || props.leftIcon)
const isTrailing = computed(() => (props.icon && props.trailing) || (props.loading && props.trailing) || props.rightIcon)

const leadingIconName = computed(() => {
  if (props.loading) {
    return props.loadingIcon
  }

  return props.leftIcon || props.icon
})

const trailingIconName = computed(() => {
  if (props.loading && !isLeading.value) {
    return props.loadingIcon
  }

  return props.rightIcon || props.icon
})

const leadingWrapperIconClass = computed(() => twJoin(ui.value.icon.leading.wrapper, ui.value.icon.leading.pointer, ui.value.paddingX[props.size]))

const leadingIconClass = computed(() => {
  return twJoin(
    // ui.value.icon.base,
    // props.loading && ui.value.icon.loading,
  )
})

const trailingWrapperIconClass = computed(() => twJoin(ui.value.icon.trailing.wrapper, ui.value.icon.trailing.pointer, ui.value.paddingX[props.size]))

const trailingIconClass = computed(() => {
  return twJoin(
    // ui.value.icon.base,
    // props.loading && !isLeading.value && ui.value.icon.loading,
  )
})

const debouncedSearch = props.searchable && typeof props.searchable === 'function' ? useDebounceFn(props.searchable, props.debounce) : undefined

const options = computedAsync(async () => {
  if (debouncedSearch) {
    return debouncedSearch(query.value)
  }

  return props.options || []
}, [], {
  lazy: props.searchableLazy,
})

const filteredOptions = computed(() => {
  if (!query.value || debouncedSearch) {
    return options.value
  }

  // @ts-ignore
  return options.value.filter((option: any) => {
    return (props.searchAttributes?.length ? props.searchAttributes : [props.optionAttribute]).some((searchAttribute: any) => {
      if (['string', 'number'].includes(typeof option)) {
        return String(option).search(new RegExp(query.value, 'i')) !== -1
      }

      const child = get(option, searchAttribute)

      return child !== null && child !== undefined && String(child).search(new RegExp(query.value, 'i')) !== -1
    })
  })
})

const createOption = computed(() => {
  if (query.value === '') {
    return null
  }
  if (props.showCreateOptionWhen === 'empty' && filteredOptions.value.length) {
    return null
  }
  if (props.showCreateOptionWhen === 'always') {
    const existingOption = filteredOptions.value.find(option => ['string', 'number'].includes(typeof option) ? option === query.value : option[props.optionAttribute] === query.value)
    if (existingOption) {
      return null
    }
  }
  if (typeof props.showCreateOptionWhen === 'function') {
    if (!props.showCreateOptionWhen(query.value, filteredOptions.value)) {
      return null
    }
  }
  return ['string', 'number'].includes(typeof props.modelValue) ? query.value : { [props.optionAttribute]: query.value }
})

function clearOnClose() {
  if (props.clearSearchOnClose) {
    query.value = ''
  }
}

watch(container, (value) => {
  if (value) {
    emits('open')
  }
  else {
    clearOnClose()
    emits('close')
  }
})

function onUpdate(value: any) {
  emits('update:model-value', value)
  emits('change', value)
}

function onQueryChange(event: any) {
  query.value = event.target.value
}

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, props.fluid && ui.value.fluid, ui.value.fonts[props.size]), props.class))
const triggerClass = computed(() => twJoin(ui.value.trigger, ui.value.bg, ui.value.rounded[props.size], ui.value.height[props.size]))
const searchClass = computed(() => twJoin(uiInput.value.input, ui.value.rounded[props.size], ui.value.bg, ui.value.paddingX[props.size], 'mb-1.5'))
const errorClass = computed(() => twJoin('w-full', 'truncate', 'text-sm', error.value ? 'text-danger' : 'text-muted'))
provideUseId(() => useId())
</script>

<template>
  <div :class="wrapperClass">
    <label
      v-if="title && titleFixed"
      :for="inputId"
      :class="uiInput.label"
    >
      {{ useLangs(title) }}
    </label>
    <component
      :is="searchable ? HCombobox : HListbox"
      v-slot="{ open }"
      :by
      :name="inputName"
      :model-value="multiple ? (Array.isArray(modelValue) ? modelValue : []) : modelValue"
      :multiple="multiple"
      :disabled="isDisabled"
      as="div"
      class="relative"
      @update:model-value="onUpdate"
    >
      <input
        v-if="isRequired"
        :value="modelValue"
        :required="isRequired"
        class="absolute inset-0 w-px opacity-0 cursor-default"
        tabindex="-1"
        aria-hidden="true"
      >

      <component
        :is="searchable ? HComboboxButton : HListboxButton"
        ref="trigger"
        as="div"
        role="button"
        :class="triggerClass"
      >
        <slot
          :open="open"
          :disabled="isDisabled"
          :loading="loading"
        >
          <button
            :id="inputId"
            :class="selectClass"
            :disabled="isDisabled"
            type="button"
            v-bind="attrs"
          >
            <span
              v-if="(isLeading && leadingIconName) || $slots.leading"
              :class="leadingWrapperIconClass"
            >
              <slot
                name="leading"
                :selected="selected"
                :disabled="isDisabled"
                :loading="loading"
              >
                <els-icon
                  :name="leadingIconName"
                  :class="leadingIconClass"
                  :size="ui.icons[size]"
                />
              </slot>
            </span>

            <slot
              name="title"
              :selected="selected"
            >
              <span
                v-if="label"
                class="block truncate"
              >
                {{ useLangs(label) }}
              </span>
              <span
                v-else
                class="block truncate"
                :class="placeholderClass"
              >
                {{ useLangs(title) || '&nbsp;' }}
              </span>
            </slot>

            <span
              v-if="(isTrailing && trailingIconName) || $slots.trailing"
              :class="[trailingWrapperIconClass, open && 'rotate-90']"
            >
              <slot
                name="trailing"
                :selected="selected"
                :disabled="isDisabled"
                :loading="loading"
              >
                <els-icon
                  :name="trailingIconName"
                  :class="trailingIconClass"
                  :size="ui.icons[size]"
                  aria-hidden="true"
                />
              </slot>
            </span>
          </button>
        </slot>
      </component>

      <div
        v-if="open"
        ref="container"
        class="z-15 group w-full"
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

            <component
              :is="searchable ? HComboboxOptions : HListboxOptions"
              static
              :class="[ui.dropdown.base, ui.dropdown.ring, ui.rounded[sizeOptions], ui.dropdown.shadow, ui.dropdown.height]"
            >
              <HComboboxInput
                v-if="searchable"
                :display-value="() => query"
                name="q"
                :placeholder="useLangs(searchablePlaceholder)"
                autofocus
                autocomplete="off"
                :class="searchClass"
                @change="onQueryChange"
              />
              <component
                :is="searchable ? HComboboxOption : HListboxOption"
                v-for="(option, index) in filteredOptions"
                v-slot="{ active, selected: optionSelected, disabled: optionDisabled }"
                :key="index"
                as="template"
                :value="valueAttribute ? option[valueAttribute] : option"
                :disabled="option.disabled"
              >
                <li :class="[ui.options.base, ui.rounded[sizeOptions], ui.paddingX[sizeOptions], ui.height[sizeOptions], active ? ui.options.active : ui.options.inactive, optionSelected && ui.options.selected, optionDisabled && ui.options.disabled]">
                  <div :class="ui.options.container">
                    <slot
                      name="option"
                      :option="option"
                      :active="active"
                      :selected="optionSelected"
                    >
                      <els-icon
                        v-if="option.icon"
                        :name="option.icon"
                        :size="ui.icons[sizeOptions]"
                        :class="option.iconClass"
                        aria-hidden="true"
                      />
                      <els-avatar
                        v-else-if="option.avatar"
                        v-bind="{ size: sizeOptions, ...option.avatar }"
                        aria-hidden="true"
                      />

                      <span class="truncate">
                        {{ ['string', 'number'].includes(typeof option) ? useLangs(option) : useLangs(option[optionAttribute]) }}
                      </span>
                    </slot>
                  </div>
                </li>
              </component>

              <component
                :is="searchable ? HComboboxOption : HListboxOption"
                v-if="creatable && createOption"
                v-slot="{ active, selected: optionSelected }"
                :value="createOption"
                as="template"
              >
                <li :class="[ui.options.base, ui.rounded[sizeOptions], ui.paddingX[sizeOptions], ui.height[sizeOptions], active ? ui.options.active : ui.options.inactive]">
                  <div :class="ui.options.container">
                    <slot
                      name="option-create"
                      :option="createOption"
                      :active="active"
                      :selected="optionSelected"
                    >
                      <span class="block truncate">
                        {{ useLangs('models.create.for', { title: createOption[optionAttribute] }) }}
                      </span>
                    </slot>
                  </div>
                </li>
              </component>
              <p
                v-else-if="searchable && query && !filteredOptions?.length"
                :class="[ui.placeholder, 'mb-1.5', ui.fonts[sizeOptions]]"
              >
                <slot
                  name="option-empty"
                  :query="query"
                >
                  {{ useLangs('models.search.emptyFor', { q: query }) }}
                </slot>
              </p>
              <p
                v-else-if="!filteredOptions?.length"
                :class="[ui.placeholder, 'mb-1.5', ui.fonts[sizeOptions]]"
              >
                <slot
                  name="empty"
                  :query="query"
                >
                  {{ useLangs('models.empty.title') }}
                </slot>
              </p>
            </component>
          </div>
        </Transition>
      </div>
    </component>
    <els-transition-collapse>
      <div
        v-if="error || hint"
        :class="errorClass"
      >
        {{ error ? useLangs(String(error)) : useLangs(hint || ' ') }}
      </div>
    </els-transition-collapse>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { computedAsync, useDebounceFn } from '@vueuse/core'
import { useField } from 'vee-validate'
import { config as inputConfig } from '../text/text.vue'
import { mergeConfig, twMerge, twJoin } from '#app-ui/utils'
import { useCore, useLangs } from '#app-ui/composables'
import type { PopperOptions } from '#app-ui/types/popper'
import { inputSelect as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.inputSelect, el)

type Props = {
  modelValue?: string | number | object | any[] | boolean
  query?: string
  by?: string
  options?: { [key: string]: any, disabled?: boolean }[] | string[]
  id?: string
  name?: string
  required?: boolean
  icon?: string
  loadingIcon?: string
  leftIcon?: string
  rightIcon?: string
  trailing?: boolean
  leading?: boolean
  loading?: boolean
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean | ((query: string) => Promise<any[]> | any[])
  searchablePlaceholder?: string
  searchableLazy?: boolean
  clearSearchOnClose?: boolean
  debounce?: number
  creatable?: boolean
  showCreateOptionWhen?: 'always' | 'empty' | ((query: string, results: any[]) => boolean)
  title?: string
  titleFixed?: boolean
  rules?: string
  hint?: string
  fluid?: boolean
  size?: ELEMENTS.SIZE
  sizeOptions?: ELEMENTS.SIZE
  optionAttribute?: string
  valueAttribute?: string
  searchAttributes?: any[]
  popper?: PopperOptions
  selectClass?: HTMLAttributes['class']
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
