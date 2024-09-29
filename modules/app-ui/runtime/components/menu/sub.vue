<script setup lang="ts">
defineOptions({
  name: 'ElsMenuSub',
})

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  disabled: false,
  class: undefined,
  ui: () => ({}),
})

const ins = getCurrentInstance()!
const { ui } = useCore('menu-sub', toRef(props, 'ui'), config)

const { path, parent } = useMenu(
  ins,
  computed(() => props.id),
)

const rootMenu = inject<Menu>('rootMenu')
const subMenu = inject<SubMenu>(`subMenu:${parent.value!.uid}`)

const items = ref<Menu['items']>({})
const subMenus = ref<Menu['subMenus']>({})

const mouseInChild = ref(false)

const opened = computed(() => rootMenu.openedMenus.includes(props.id))
const active = computed(() => {
  let isActive = false

  Object.values(items.value).forEach((item) => {
    if (item.active) {
      isActive = true
    }
  })

  Object.values(subMenus.value).forEach((subItem) => {
    if (subItem.active) {
      isActive = true
    }
  })

  return isActive
})

const item = reactive({
  id: props.id,
  path,
  active,
})

const handleClick = () => {
  if (props.disabled) return

  rootMenu.handleSubMenuClick({
    id: props.id,
    path: path.value,
    active: active.value,
  })
}

{
  const addSubMenu: SubMenu['addSubMenu'] = (item) => {
    subMenus.value[item.id] = item
  }
  const removeSubMenu: SubMenu['removeSubMenu'] = (item) => {
    /**/
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete subMenus.value[item.id]
  }
  provide<SubMenu>(`subMenu:${ins.uid}`, {
    addSubMenu,
    removeSubMenu,
    mouseInChild,
    level: subMenu.level + 1,
  })
}

defineExpose({
  opened,
})

onMounted(() => {
  rootMenu.addSubMenu(item)
  subMenu.addSubMenu(item)
})

onBeforeUnmount(() => {
  subMenu.removeSubMenu(item)
  rootMenu.removeSubMenu(item)
})

const wrapperClass = computed(() => twMerge(twJoin(ui.value.sub.section), props.class))
const menuWrapperClass = computed(() => twMerge(twJoin(ui.value.root.wrapper), 'ml-2.5'))
const itemWrapperClass = computed(() => twJoin(ui.value.item.wrapper, opened.value && ui.value.item.active, ui.value.item.fonts[rootMenu.props.size || 'md'], ui.value.item.rounded[rootMenu.props.size || 'md'], ui.value.item.height[rootMenu.props.size || 'md'], ui.value.item.hover))
const itemContentsClass = computed(() => twJoin(ui.value.item.contents.base, opened.value && ui.value.item.contents.active))
const iconSize = computed(() => ui.value.item.icons[rootMenu.props.size || 'md'])
</script>

<template>
  <els-menu-section :class="wrapperClass">
    <button
      :class="itemWrapperClass"
      role="menuitem"
      tabindex="-1"
      type="button"
      :disabled
      @click="handleClick"
    >
      <span :class="itemContentsClass">
        <els-icon
          v-if="icon"
          :name="icon"
          :size="iconSize"
        />
        <span class="truncate block w-full text-left">
          {{ useLangs(title) }}
        </span>
        <els-icon
          name="chevron-right"
          :class="['transition-all', opened && 'rotate-90']"
          :size="iconSize"
        />
      </span>
    </button>

    <els-transition-collapse>
      <div
        v-show="opened"
        :class="menuWrapperClass"
      >
        <slot />
      </div>
    </els-transition-collapse>
  </els-menu-section>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Menu } from './menu.vue'
import type { MenuItem } from './item.vue'
import { twJoin, twMerge, mergeConfig, useMenu } from '#app-ui/utils'
import { useCore } from '#imports'
import { menu as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.menu, el)

type Props = {
  id: string
  title: string
  icon?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}

export interface SubMenu {
  addSubMenu: (item: MenuItem) => void
  removeSubMenu: (item: MenuItem) => void
  handleMouseleave?: (deepDispatch: boolean) => void
  mouseInChild: Ref<boolean>
  level: number
}
</script>
