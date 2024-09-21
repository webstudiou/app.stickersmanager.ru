<script setup lang="ts">
defineOptions({
  name: 'ElsMenu',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  activeId: undefined,
  opens: () => mutable([] as const),
  uniques: true,
  router: false,
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits({
  ['close']: (id: string, path: string[]) => isString(id) && checkIndexPath(path),
  ['open']: (id: string, path: string[]) => isString(id) && checkIndexPath(path),
  ['select']: (
    id: string,
    path: string[],
    item: MenuItemClicked,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    routerResult?: Promise<void | NavigationFailure>,
  ) => isString(id) && checkIndexPath(path) && isObject(item) && (routerResult === undefined || routerResult instanceof Promise),
})

const ins = getCurrentInstance()!
const { ui, attrs } = useCore('menu', toRef(props, 'ui'), config)

const vueRouter = useRouter()
const MenuRef = ref<HTMLUListElement>()
const opens = ref<Menu['opens']>(props.opens && props.opens.slice(0))
const activeId = ref<Menu['activeId']>(props.activeId)
const items = ref<Menu['items']>({})
const subs = ref<Menu['subs']>({})

const init = () => {
  const activeItem = activeId.value && items.value[activeId.value]
  if (!activeItem) return

  const indexPath = activeItem.path

  indexPath.forEach((index: string) => {
    const subMenu = subs.value[index]
    if (subMenu) openMenu(index, subMenu.path)
  })
}

const openMenu: Menu['openMenu'] = (id, path) => {
  if (opens.value.includes(id)) return

  if (props.uniques) {
    opens.value = opens.value.filter((index: string) => path.includes(index))
  }

  opens.value.push(id)
  emits('open', id, path)
}

const close = (index: string) => {
  const i = opens.value.indexOf(index)
  if (i !== -1) {
    opens.value.splice(i, 1)
  }
}

const closeMenu: Menu['closeMenu'] = (id, path) => {
  close(id)
  emits('close', id, path)
}

const handleMenuClick: ({ id, path }: { id: any, path: any }) => void = ({ id, path }) => {
  if (opens.value.includes(id)) {
    closeMenu(id, path)
  }
  else {
    openMenu(id, path)
  }
}

const handleItemClick: Menu['handleItemClick'] = (menuItem: MenuItemClicked) => {
  const { id, path } = menuItem

  if (isNil(id) || isNil(path)) return

  if (props.router && vueRouter) {
    const route = menuItem.route || id
    const routerResult = vueRouter.push(route).then((res) => {
      if (!res) activeId.value = id
      return res
    })
    emits('select', id, path, { id, path, route }, routerResult)
  }
  else {
    activeId.value = id
    emits('select', id, path, { id, path }, undefined)
  }
}

const updateActiveIndex = (val: string) => {
  const itemsInData = items.value
  const item = itemsInData[val] || (activeId.value && itemsInData[activeId.value]) || itemsInData[props.activeId]

  if (item) {
    activeId.value = item.id
  }
  else {
    activeId.value = val
  }
}

watch(
  () => props.activeId,
  (currentActive) => {
    if (!items.value[currentActive]) {
      activeId.value = ''
    }
    updateActiveIndex(currentActive)
  },
)

watch(items.value, init)

{
  const addMenu: Menu['addMenu'] = (item) => {
    subs.value[item.id] = item
  }

  const removeMenu: Menu['removeMenu'] = (item) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete subs.value[item.id]
  }

  const addItem: Menu['addItem'] = (item: MenuItem) => {
    items.value[item.id] = item
  }

  const removeItem: Menu['removeItem'] = (item: MenuItem) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete items.value[item.id]
  }

  provide<Menu>(
    'menu',
    reactive({
      props,
      opens,
      items,
      subs,
      activeId,

      addItem,
      removeItem,
      addMenu,
      removeMenu,
      openMenu,
      closeMenu,
      handleItemClick,
      handleMenuClick,
    }),
  )
  provide<SubMenu>(`submenu:${ins.uid}`, {
    addMenu,
    removeMenu,
    mouseInChild: ref(false),
    level: 0,
  })
}

const open = (id: string) => {
  const { path } = subs.value[id]
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
    ref="MenuRef"
    role="menubar"
    :class="wrapperClass"
    v-bind="{ ...attrs }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { NavigationFailure } from 'vue-router'
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
  activeId?: string
  opens?: Mutable<string[]>
  uniques?: boolean
  router?: boolean
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}

export type Menu = {
  opens: string[]
  items: Record<string, MenuItem>
  subs: Record<string, MenuItem>
  activeId?: string
  props: Props

  addItem: (item: MenuItem) => void
  removeItem: (item: MenuItem) => void
  addMenu: (item: MenuItem) => void
  removeMenu: (item: MenuItem) => void

  openMenu: (id: string, path: string[]) => void
  closeMenu: (id: string, path: string[]) => void

  handleItemClick: (item: MenuItemClicked) => void
  handleMenuClick: (subMenu: MenuItem) => void
}
</script>
