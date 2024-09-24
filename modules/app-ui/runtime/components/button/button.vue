<script lang="ts">
import { twJoin, twMerge, mergeConfig, nuxtLinkProps, getNuxtLinkProps } from '#app-ui/utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { button as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.button, el)

export default defineComponent({
  inheritAttrs: false,
  props: {
    ...nuxtLinkProps,
    type: { type: String, default: 'button' },
    fluid: { type: Boolean, default: false },
    title: { type: String, default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    leading: { type: Boolean, default: false },
    trailing: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
    icon: { type: String, default: undefined },
    loaderIcon: { type: String, default: 'spinner' },
    leftIcon: { type: String, default: undefined },
    rightIcon: { type: String, default: undefined },
    size: { type: String as PropType<ELEMENTS.SIZE>, default: () => 'md' },
    color: { type: String as PropType<ELEMENTS.COLOR | 'transparent' | 'input' >, default: () => 'primary' },
    variant: { type: String as PropType<ELEMENTS.VARIANT>, default: () => 'solid' },
    class: { type: [String, Object, Array] as PropType<any>, default: () => undefined },
    ui: { type: Object as PropType<Partial<typeof config>>, default: () => ({}) },
  },
  setup(props) {
    const { ui, attrs } = useCore('button', toRef(props, 'ui'), config)

    const isLeading = computed(() => {
      return (props.icon && props.leading) || (props.icon && !props.trailing) || (props.loading && !props.trailing) || props.leftIcon
    })

    const isTrailing = computed(() => {
      return (props.icon && props.trailing) || (props.loading && props.trailing) || props.rightIcon
    })

    const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper), props.class))
    const buttonClass = computed(() => {
      // @ts-ignore
      const variant = ui.value.color?.[props.color as string]?.[props.variant as string] || ui.value.variant

      return twMerge(
        ui.value.contents,
        ui.value.fonts[props.size],
        ui.value.height[props.size],
        props.icon && ui.value.width[props.size],
        (props.fluid && !props.icon) && ui.value.fluid,
        !props.square && ui.value.rounded[props.size],
        (!props.noPadding && !props.icon) && ui.value.paddingX[props.size],
        variant?.replaceAll('{color}', props.color),
      )
    })

    const leadingIconName = computed(() => props.loading ? props.loaderIcon : (props.leftIcon || props.icon))
    const trailingIconName = computed(() => (props.loading && !isLeading.value) ? props.loaderIcon : (props.rightIcon || props.icon))
    const iconsClass = computed(() => ui.value.iconsWrapper)
    const iconSize = computed(() => ui.value.icons[props.size])

    const linkProps = computed(() => getNuxtLinkProps(props))

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,

      isLeading,
      leadingIconName,
      isTrailing,
      trailingIconName,

      wrapperClass,
      buttonClass,
      iconsClass,
      iconSize,

      linkProps,
    }
  },
})
</script>

<template>
  <div :class="wrapperClass">
    <els-link
      :type="type"
      :disabled="disabled || loading"
      :class="buttonClass"
      v-bind="{ ...linkProps, ...attrs }"
    >
      <slot name="leading" :disabled="disabled" :loading="loading">
        <div v-if="isLeading && leadingIconName" :class="loading ? ui.loader : iconsClass">
          <els-icon :name="leadingIconName" :size="iconSize" aria-hidden="true" />
        </div>
      </slot>

      <span v-if="($slots.default || title) && !icon" :class="['truncate', loading && 'hidden']">
        <slot>
          {{ useLangs(title) }}
        </slot>
      </span>

      <slot name="trailing" :disabled="disabled" :loading="loading">
        <div v-if="isTrailing && trailingIconName" :class="loading ? ui.loader : iconsClass">
          <els-icon :name="trailingIconName" :size="iconSize" aria-hidden="true" />
        </div>
      </slot>
    </els-link>
  </div>
</template>
