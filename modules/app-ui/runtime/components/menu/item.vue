<script setup lang="ts">
defineOptions({
  name: 'ElsMenuItem',
})

const props = withDefaults(defineProps<Props>(), {
  id: null,
  icon: undefined,
  order: undefined,
  route: undefined,
  routes: () => [],
  disabled: false,
  soon: false,
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits({
  ['click']: (menuItem: MenuItem) => isString(menuItem.id) && Array.isArray(menuItem.path),
})

const ins = getCurrentInstance()!
const { ui } = useCore('menu-item', toRef(props, 'ui'), config)
const root = inject<Menu>('menu')!
const { parent, pathId } = useMenu(ins, toRef(props, 'id'))
const sub = inject<SubMenu>(`submenu:${parent.value?.uid}`)

const router = useRouter()
const location: ComputedRef<string> = computed(() => String(router.currentRoute.value.name))
const isItemActive = computed(() => props.id === root?.activeId || props.routes.includes(location.value))
const iconSize = computed(() => ui.value.item.icons[root?.props.size || 'md'])

const menuItem: MenuItem = reactive({
  id: String(props.id),
  path: pathId,
  active: isItemActive,
})

const handleClick = () => {
  if (!props.disabled) {
    root.handleItemClick({
      id: String(props.id),
      path: pathId.value,
      route: props.route,
    })
    emits('click', menuItem)
  }
}

const item_order = ref<number>(0)

onMounted(() => {
  sub?.addMenu(menuItem)
  root.addItem(menuItem)
  item_order.value = props.order ?? Object.keys(root.items).length + 1
})

onBeforeUnmount(() => {
  sub?.removeMenu(menuItem)
  root.removeItem(menuItem)
})

const wrapperClass = computed(() => twMerge(twJoin(ui.value.item.wrapper, isItemActive.value && ui.value.item.active, ui.value.item.fonts[root?.props.size || 'md'], ui.value.item.rounded[root?.props.size || 'md'], ui.value.item.height[root?.props.size || 'md'], ui.value.item.hover), props.class))
const contentsClass = computed(() => twJoin(ui.value.item.contents.base, isItemActive.value && ui.value.item.contents.active))
</script>

<template>
  <button
    :class="wrapperClass"
    role="menuitem"
    tabindex="-1"
    type="button"
    :style="{
      order: item_order,
    }"
    :disabled="disabled"
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
  order?: number | undefined
  route?: RouteLocationRaw
  routes?: Array<string>
  disabled?: boolean
  soon?: boolean
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}

export type MenuItem = {
  id: string
  path: string[]
  active: boolean
}

export type MenuItemClicked = {
  id: string
  path: string[]
  route?: RouteLocationRaw
}
</script>
