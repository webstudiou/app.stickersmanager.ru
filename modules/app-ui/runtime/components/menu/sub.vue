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

const { pathId, parent } = useMenu(ins, computed(() => props.id))
const root = inject<Menu>('menu')!
const sub = inject<SubMenu>(`submenu:${parent.value!.uid}`)!

const items = ref<Menu['items']>({})
const subs = ref<Menu['subs']>({})

const mouseInChild = ref(false)
const isSubMenuOpened = computed(() => root.opens.includes(props.id))
const isActive = computed(() => {
  let is_active = false

  Object.values(items.value).forEach((item) => {
    if (item.active) {
      is_active = true
    }
  })

  Object.values(subs.value).forEach((subItem) => {
    if (subItem.active) {
      is_active = true
    }
  })

  return is_active
})

const item = reactive({
  id: props.id,
  path: pathId.value,
  active: isActive,
})

const handleClick = () => {
  if (props.disabled) return

  root.handleMenuClick({
    id: props.id,
    path: pathId.value,
    active: isActive.value,
  })
}

onMounted(() => {
  root.addMenu(item)
  sub.addMenu(item)
})

onBeforeUnmount(() => {
  sub.removeMenu(item)
  root.removeMenu(item)
})

{
  const addMenu: SubMenu['addMenu'] = (item) => {
    subs.value[item.id] = item
  }
  const removeMenu: SubMenu['removeMenu'] = (item) => {
    delete subs.value[item.id]
  }
  provide<SubMenu>(`submenu:${ins.uid}`, {
    addMenu,
    removeMenu,
    mouseInChild,
    level: sub.level + 1,
  })
}

defineExpose({
  opened: isSubMenuOpened,
})

const wrapperClass = computed(() => twMerge(twJoin(ui.value.sub.section), props.class))
const itemWrapperClass = computed(() => twJoin(ui.value.item.wrapper, isSubMenuOpened.value && ui.value.item.active, ui.value.item.fonts[root?.props.size || 'md'], ui.value.item.rounded[root?.props.size || 'md'], ui.value.item.height[root?.props.size || 'md'], ui.value.item.hover))
const itemContentsClass = computed(() => twJoin(ui.value.item.contents.base, isSubMenuOpened.value && ui.value.item.contents.active))
const iconSize = computed(() => ui.value.item.icons[root?.props.size || 'md'])
</script>

<template>
  <els-menu-section :class="wrapperClass">
    <button
      :class="itemWrapperClass"
      role="menuitem"
      tabindex="-1"
      type="button"
      :style="{
        order: 0,
      }"
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
          :class="['transition-all', isSubMenuOpened && 'rotate-90']"
          :size="root?.props.size || 'md'"
        />
      </span>
    </button>

    <els-transition-collapse>
      <els-menu
        v-show="isSubMenuOpened"
        :id
        class="ml-2.5"
        :size="root?.props.size || 'md'"
      >
        <slot />
      </els-menu>
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
  ui?: Partial<typeof config>
}

export type SubMenu = {
  addMenu: (item: MenuItem) => void
  removeMenu: (item: MenuItem) => void

  mouseInChild: Ref<boolean>
  level: number
}
</script>
