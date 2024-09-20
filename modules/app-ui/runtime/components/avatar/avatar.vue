<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  as: 'img',
  src: undefined,
  alt: undefined,
  icon: undefined,
  title: undefined,
  size: 'md',
  color: 'primary',
  badge: false,
  badgePosition: 'bottom-right',
  loading: false,
  imgClass: undefined,
  style: undefined,
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('avatar', toRef(props, 'ui'), config)
const url = computed(() => typeof props.src === 'boolean' ? null : props.src)
const placeholder = computed(() => (props.alt || '').split(' ').map(word => word.charAt(0)).join('').substring(0, 2))
const error = ref(false)

watch(() => props.src, () => {
  if (error.value) {
    error.value = false
  }
})

function onError() {
  error.value = true
}

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper.base, ui.value.wrapper[props.size], (!url.value && error) && ui.value.colors[props.color]), props.class))
const imgClass = computed(() => twMerge(twJoin(ui.value.img.base), props.imgClass))
const iconSize = computed(() => twJoin(ui.value.icons[props.size]))
const badgeClass = computed(() => twJoin(ui.value.badges.base, ui.value.badges[props.size], ui.value.badges.positions[props.badgePosition], ui.value.colors[props.color]))
const loadingClass = computed(() => twJoin(ui.value.loading.base, ui.value.colors[props.color]))
</script>

<template>
  <div
    :class="wrapperClass"
    :style="style"
    v-bind="attrs"
  >
    <div
      v-if="loading"
      :class="loadingClass"
    >
      <els-spinner
        class="text-white"
        size="1rem"
      />
    </div>

    <div :class="ui.avatar.base">
      <component
        :is="as"
        v-if="url && !error"
        :class="imgClass"
        :alt="alt"
        :src="url"
        @error="onError"
      />

      <els-icon
        v-else-if="icon"
        :name="icon"
        :size="iconSize"
      />

      <div
        v-else-if="(placeholder || title) && props.class?.includes('is-last')"
        :class="ui.placeholders.base"
      >
        {{ useLangs(placeholder ?? title) }}
      </div>
      <div
        v-if="title && props.class?.includes('is-last')"
        :class="ui.placeholders.base"
      >
        {{ useLangs(title) }}
      </div>
    </div>

    <div
      v-if="$slots.badge || badge"
      :class="badgeClass"
    >
      <slot name="badge" />
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
import { useCore } from '#imports'
import { avatar as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.avatar, el)

export type AvatarSize = ELEMENTS.SIZE | '2xl' | '3xl'

export interface Avatar {
  src?: string | boolean
  alt?: string
  title?: string
  size?: AvatarSize
}

type Props = {
  as?: string | object
  src?: string | boolean
  alt?: string
  icon?: string
  title?: string
  size?: AvatarSize
  color?: ELEMENTS.COLOR
  badge?: boolean
  badgePosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  loading?: boolean
  imgClass?: HTMLAttributes['class']
  style?: HTMLAttributes['style']
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
