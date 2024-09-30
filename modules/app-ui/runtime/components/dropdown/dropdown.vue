<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  mode: 'click',
  open: undefined,
  disabled: false,
  popper: () => ({}),
  openDelay: 0,
  closeDelay: 0,
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const { ui, attrs } = useCore('dropdown', toRef(props, 'ui'), config, toRef(props, 'class'))

const popper = computed<PopperOptions>(() => defu(props.mode === 'hover' ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper as PopperOptions))

const [trigger, container] = usePopper(popper.value)

const menuApi = ref<any>(null)

let openTimeout: NodeJS.Timeout | number = null
let closeTimeout: NodeJS.Timeout | number = null

enum MenuStates {
  Open,
  Closed,
}

onMounted(() => {
  // @ts-expect-error internals
  const menuProvides = trigger.value?.$.provides
  if (!menuProvides) {
    return
  }
  const menuProvidesSymbols = Object.getOwnPropertySymbols(menuProvides)
  menuApi.value = menuProvidesSymbols.length && menuProvides[menuProvidesSymbols[0]]

  if (props.open) {
    menuApi.value?.openMenu()
  }
})

const containerStyle = computed(() => {
  if (props.mode !== 'hover') {
    return {}
  }

  const offsetDistance = (props.popper as PopperOptions)?.offsetDistance || (ui.value.popper as PopperOptions)?.offsetDistance || 8
  const placement = popper.value.placement?.split('-')[0]
  const padding = `${offsetDistance}px`

  if (placement === 'top' || placement === 'bottom') {
    return {
      paddingTop: padding,
      paddingBottom: padding,
    }
  }
  else if (placement === 'left' || placement === 'right') {
    return {
      paddingLeft: padding,
      paddingRight: padding,
    }
  }
  else {
    return {
      paddingTop: padding,
      paddingBottom: padding,
      paddingLeft: padding,
      paddingRight: padding,
    }
  }
})

function onTouchStart(event: TouchEvent) {
  if (!event.cancelable || !menuApi.value) {
    return
  }

  if (menuApi.value.menuState === 0) {
    menuApi.value.closeMenu()
  }
  else {
    menuApi.value.openMenu()
  }
}

function onMouseEnter() {
  if (props.mode !== 'hover' || !menuApi.value) {
    return
  }

  // cancel programmed closing
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  // dropdown already open
  if (menuApi.value.menuState === 0) {
    return
  }
  openTimeout = openTimeout || setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    menuApi.value.openMenu && menuApi.value.openMenu()
    openTimeout = null
  }, props.openDelay)
}

function onMouseLeave() {
  if (props.mode !== 'hover' || !menuApi.value) return

  // cancel programmed opening
  if (openTimeout) {
    clearTimeout(openTimeout)
    openTimeout = null
  }
  // dropdown already closed
  if (menuApi.value.menuState === 1) return

  closeTimeout = closeTimeout || setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    menuApi.value.closeMenu && menuApi.value.closeMenu()
    closeTimeout = null
  }, props.closeDelay)
}

function onClick(e, item, { href, navigate, close, isExternal }) {
  if (item.click) {
    item.click(e)
  }

  if (href && !isExternal) {
    navigate(e)

    close()
  }
}

watch(() => props.open, (newValue: boolean, oldValue: boolean) => {
  if (!menuApi.value) return
  if (oldValue === undefined || newValue === oldValue) return

  if (newValue) {
    menuApi.value.openMenu()
  }
  else {
    menuApi.value.closeMenu()
  }
})

watch(() => menuApi.value?.menuState, (newValue: number, oldValue: number) => {
  if (oldValue === undefined || newValue === oldValue) return

  emits('update:open', newValue === 0)
})

const NuxtLink = resolveComponent('NuxtLink')

provideUseId(() => useId())
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <hls-menu
    v-slot="{ open }"
    as="div"
    :class="ui.wrapper"
    v-bind="attrs"
    @mouseleave="onMouseLeave"
  >
    <hls-menu-button
      ref="trigger"
      as="div"
      :disabled="disabled"
      :class="ui.trigger"
      role="button"
      @mouseenter="onMouseEnter"
      @touchstart.passive="onTouchStart"
    >
      <slot
        :open="open"
        :disabled="disabled"
      >
        <button :disabled="disabled">
          Open
        </button>
      </slot>
    </hls-menu-button>

    <div
      v-if="open && items.length"
      ref="container"
      :class="[ui.container, ui.width, ui.fonts[size]]"
      :style="containerStyle"
      @mouseenter="onMouseEnter"
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

          <hls-menu-items
            :class="[ui.base, ui.divide, ui.rounded[size], ui.shadow, ui.background]"
            static
          >
            <div
              v-for="(subItems, index) of items"
              :key="index"
              :class="ui.padding"
            >
              <NuxtLink
                v-for="(item, subIndex) of subItems"
                :key="subIndex"
                v-slot="{ href, target, rel, navigate, isExternal, isActive }"
                v-bind="getNuxtLinkProps(item)"
                custom
              >
                <hls-menu-item
                  v-slot="{ active, disabled: itemDisabled, close }"
                  :disabled="item.disabled"
                >
                  <component
                    :is="!!href ? 'a' : 'button'"
                    :href="!itemDisabled ? href : undefined"
                    :rel="rel"
                    :target="target"
                    :class="twMerge(twJoin(ui.item.base, ui.paddingX[size], ui.height[size], ui.rounded[size], active || isActive ? ui.item.active : ui.item.inactive, itemDisabled && ui.item.disabled), item.class)"
                    @click="onClick($event, item, { href, navigate, close, isExternal })"
                  >
                    <slot
                      :name="item.slot || 'item'"
                      :item="item"
                    >
                      <els-icon
                        v-if="item.icon"
                        :name="item.icon"
                        :class="twMerge(twJoin(ui.icons[size]), item.iconClass)"
                      />

                      <els-avatar
                        v-else-if="item.avatar"
                        v-bind="{ size: size, ...item.avatar }"
                      />

                      <span :class="twMerge(ui.item.label, item.titleClass)">
                        {{ useLangs(item.title) }}
                      </span>

                      <span
                        v-if="item.shortcuts?.length"
                        :class="ui.item.shortcuts"
                      >
                        <els-kbd
                          v-for="shortcut of item.shortcuts"
                          :key="shortcut"
                          :size
                        >
                          {{ shortcut }}
                        </els-kbd>
                      </span>
                    </slot>
                  </component>
                </hls-menu-item>
              </NuxtLink>
            </div>
          </hls-menu-items>
        </div>
      </Transition>
    </div>
  </hls-menu>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { provideUseId } from '@headlessui/vue'
import { useCore, usePopper, useLangs } from '../../composables'
import { mergeConfig, getNuxtLinkProps, twMerge, twJoin, defu } from '../../utils'
import type { PopperOptions } from '../../types/popper'
// @ts-expect-error
import appConfig from '#build/app.config'
import { dropdown as el } from '#app-ui/configs'
import { useId } from '#imports'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.dropdown, el)

type Props = {
  items?: DropdownItem[][]
  mode?: 'click' | 'hover'
  open?: boolean
  disabled?: boolean
  popper?: PopperOptions
  openDelay?: number
  closeDelay?: number
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
