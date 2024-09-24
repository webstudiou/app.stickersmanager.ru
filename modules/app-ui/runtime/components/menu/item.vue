<script setup lang="ts">
defineOptions({
  name: 'ElsMenuItem',
})

const props = withDefaults(defineProps<Props>(), {
  id: null,
  icon: undefined,
  route: undefined,
  disabled: false,
  class: undefined,
  ui: () => ({}),
})

const emit = defineEmits({
  click: (item: MenuItem) => isString(item.id) && Array.isArray(item.path),
})

const instance = getCurrentInstance()!
const { ui, attrs } = useCore('menu-item', toRef(props, 'ui'), config)

const rootMenu = inject<Menu>('rootMenu')
const { parent, path } = useMenu(instance, toRef(props, 'id'))
const subMenu = inject<SubMenu>(`subMenu:${parent.value.uid}`)

const active = computed(() => props.id === rootMenu.activeIndex)
const item: MenuItem = reactive({
  id: props.id,
  path,
  active,
})

const handleClick = () => {
  if (!props.disabled) {
    rootMenu.handleMenuItemClick({
      id: props.id,
      path: path.value,
      route: props.route,
    })
    emit('click', item)
  }
}

onMounted(() => {
  subMenu.addSubMenu(item)
  rootMenu.addMenuItem(item)
})

onBeforeUnmount(() => {
  subMenu.removeSubMenu(item)
  rootMenu.removeMenuItem(item)
})

const iconSize = computed(() => ui.value.item.icons[rootMenu.props.size || 'md'])

const wrapperClass = computed(() => twMerge(twJoin(ui.value.item.wrapper, active.value && ui.value.item.active, ui.value.item.fonts[rootMenu.props.size || 'md'], ui.value.item.rounded[rootMenu.props.size || 'md'], ui.value.item.height[rootMenu.props.size || 'md'], ui.value.item.hover), props.class))
const contentsClass = computed(() => twJoin(ui.value.item.contents.base, active.value && ui.value.item.contents.active))
</script>

<template>
  <button
    :class="wrapperClass"
    role="menuitem"
    tabindex="-1"
    type="button"
    :disabled="disabled"
    v-bind="attrs"
    @click="handleClick"
  >
    <span :class="contentsClass">
      <els-icon
        v-if="icon"
        :name="icon"
        :size="iconSize"
      />
      <span class="truncate block w-full text-left">
        {{ useLangs(title) }}
      </span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { HTMLAttributes } from 'vue'
import type { Menu } from './menu.vue'
import type { SubMenu } from './sub.vue'
import { twJoin, twMerge, mergeConfig, useMenu, isString } from '#app-ui/utils'
import { useCore } from '#imports'
import { menu as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.menu, el)

type Props = {
  id?: string
  title: string
  icon?: string
  route?: RouteLocationRaw
  disabled?: boolean
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}

export interface MenuItem {
  id: string
  path: string[]
  active: boolean
}
export interface MenuItemClicked {
  id: string
  path: string[]
  route?: RouteLocationRaw
}
</script>
