<script setup lang="ts">
defineOptions({
  name: 'ElsMenu',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  defaultId: '',
  openIds: () => mutable([] as const),
  unique: false,
  router: false,
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits({
  close: (id: string, path: string[]) => isString(id) && checkIndexPath(path),
  open: (id: string, path: string[]) => isString(id) && checkIndexPath(path),
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  select: (id: string, path: string[], item: MenuItemClicked, routerResult?: Promise<void | NavigationFailure>) => isString(id) && checkIndexPath(path) && isObject(item) && (routerResult === undefined || routerResult instanceof Promise),
})

const ins = getCurrentInstance()!
const vue_router = ins.appContext.config.globalProperties.$router as Router

const { ui, attrs } = useCore('menu', toRef(props, 'ui'), config)

const openedMenus = ref<Menu['openedMenus']>(props.openIds ? props.openIds.slice(0) : [])
const activeIndex = ref<Menu['activeIndex']>(props.defaultId)
const items = ref<Menu['items']>({})
const subMenus = ref<Menu['subMenus']>({})

const initMenu = () => {
  const activeItem = activeIndex.value && items.value[activeIndex.value]
  if (!activeItem) return

  const path = activeItem.path

  path.forEach((id) => {
    const subMenu = subMenus.value[id]
    if (subMenu) openMenu(id, subMenu.path)
  })
}

const openMenu: Menu['openMenu'] = (id, path) => {
  if (openedMenus.value.includes(id)) return

  if (props.unique) {
    openedMenus.value = openedMenus.value.filter((id: string) =>
      path.includes(id),
    )
  }
  openedMenus.value.push(id)
  emits('open', id, path)
}

const close = (id: string) => {
  const i = openedMenus.value.indexOf(id)
  if (i !== -1) {
    openedMenus.value.splice(i, 1)
  }
}

const closeMenu: Menu['closeMenu'] = (id, path) => {
  close(id)
  emits('close', id, path)
}

const handleSubMenuClick: Menu['handleSubMenuClick'] = ({ id, path }) => {
  switch (openedMenus.value.includes(id)) {
    case true: {
      closeMenu(id, path)
      break
    }
    default: {
      openMenu(id, path)
      break
    }
  }
}

const handleMenuItemClick: Menu['handleMenuItemClick'] = (
  menuItem,
) => {
  const { id, path } = menuItem
  if (isNil(id) || isNil(path)) return

  if (props.router && vue_router) {
    const route = menuItem.route || id
    const routerResult = vue_router.push(route).then((res) => {
      if (!res) activeIndex.value = id
      return res
    })
    emits('select', id, path, { id, path, route }, routerResult)
  }
  else {
    activeIndex.value = id
    emits('select', id, path, { id, path })
  }
}

const updateActiveIndex = (val: string) => {
  const itemsInData = items.value
  const item = itemsInData[val] || (activeIndex.value && itemsInData[activeIndex.value]) || itemsInData[props.defaultId]

  if (item) {
    activeIndex.value = item.id
  }
  else {
    activeIndex.value = val
  }
}

watch(
  () => props.defaultId,
  (currentActive) => {
    if (!items.value[currentActive]) {
      activeIndex.value = ''
    }
    updateActiveIndex(currentActive)
  },
)

watch(items.value, initMenu)

const mouseInChild = ref(false)

{
  const addSubMenu: Menu['addSubMenu'] = (item) => {
    subMenus.value[item.id] = item
  }

  const removeSubMenu: Menu['removeSubMenu'] = (item) => {
    /**/
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete subMenus.value[item.id]
  }

  const addMenuItem: Menu['addMenuItem'] = (item) => {
    items.value[item.id] = item
  }

  const removeMenuItem: Menu['removeMenuItem'] = (item) => {
    /**/
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete items.value[item.id]
  }
  provide<Menu>(
    'rootMenu',
    reactive({
      props,
      openedMenus,
      items,
      subMenus,
      activeIndex,

      addMenuItem,
      removeMenuItem,
      addSubMenu,
      removeSubMenu,
      openMenu,
      closeMenu,
      handleMenuItemClick,
      handleSubMenuClick,
    }),
  )
  provide<SubMenu>(`subMenu:${ins.uid}`, {
    addSubMenu,
    removeSubMenu,
    mouseInChild,
    level: 0,
  })
}

const open = (id: string) => {
  const { path } = subMenus.value[id]
  path.forEach(i => openMenu(i, path))
}

defineExpose({
  open,
  close,
})

const wrapperClass = computed(() => twMerge(twJoin(ui.value.root.wrapper), props.class))
</script>

<template>
  <div
    :class="wrapperClass"
    role="menubar"
    v-bind="{ ...attrs }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { NavigationFailure, Router } from 'vue-router'
import type { HTMLAttributes } from 'vue'
import type { SubMenu } from './sub.vue'
import type { MenuItem, MenuItemClicked } from './item.vue'
import { twJoin, twMerge, mergeConfig, checkIndexPath, isString, mutable, isObject, isNil } from '#app-ui/utils'
import { useCore } from '#imports'
import { menu as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.menu, el)

type Props = {
  defaultId?: string
  openIds?: Mutable<string[]>
  unique?: boolean
  router?: boolean
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}

export interface Menu {
  openedMenus: string[]
  items: Record<string, MenuItem>
  subMenus: Record<string, MenuItem>
  activeIndex?: string
  props: Props

  addMenuItem: (item: MenuItem) => void
  removeMenuItem: (item: MenuItem) => void
  addSubMenu: (item: MenuItem) => void
  removeSubMenu: (item: MenuItem) => void

  openMenu: (id: string, path: string[]) => void
  closeMenu: (id: string, path: string[]) => void

  handleMenuItemClick: (item: MenuItemClicked) => void
  handleSubMenuClick: (subMenu: MenuItem) => void
}
</script>
