<script setup lang="ts">
import { provideUseId, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

defineOptions({
  name: 'PortfolioNavigatorTree',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  entries: () => [],
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('portfolio-navigator-tree', toRef(props, 'ui'), config, toRef(props, 'class'))

const route = useRoute()
const project_id = computed(() => String(route.params?.project_id))

const getLinkProps = (_entry: Portfolios.NavigatorItem) => {
  return getNuxtLinkProps({
    ..._entry,
    to: _entry.type === 'project' ? { name: 'dashboard-projects-project_id', params: { project_id: _entry.id } } : null,
    active: _entry.id === project_id.value,
  })
}

provideUseId(() => useId())
</script>

<template>
  <div
    v-for="entry in entries"
    :key="entry.id"
    v-bind="attrs"
    :class="ui.wrapper"
  >
    <div :class="[ui.container, ui.rounded[size]]">
      <component
        :is="entry.children?.length ? Disclosure : 'div'"
        v-slot="slotProps"
        as="div"
        :default-open="false"
      >
        <component :is="entry.children?.length ? DisclosureButton : 'div'" as="template">
          <els-link
            v-slot="{ isActive }"
            v-bind="entry.children?.length ? { disabled: entry.disabled } : getLinkProps(entry)"
            :class="[ui.base, ui.rounded[size], ui.minHeight[size]]"
            :active-class="ui.active"
            :inactive-class="(!entry.children?.length && entry.type === 'portfolio') ? ui.static : ui.inactive"
            draggable="false"
          >
            <els-icon :name="entry.type === 'portfolio' ? (slotProps?.open ? 'folder-open' : entry.type) : entry.type" :size="ui.icons[size]" :class="[ui.leadingIcon.base, isActive && ui.leadingIcon.active]" />

            <span :class="ui.title">
              {{ entry.title }}
            </span>

            <els-icon
              v-if="entry.children?.length"
              :size="ui.icons[size]"
              name="chevron-right"
              :class="[ui.trailingIcon.base, slotProps?.open ? ui.trailingIcon.active : ui.trailingIcon.inactive]"
            />
          </els-link>
        </component>
        <els-transition-collapse>
          <component
            :is="entry.children?.length ? DisclosurePanel : 'div'"
            v-if="slotProps?.open"
            static
            as="div"
          >
            <portfolio-navigator-tree :entries="entry.children" v-bind="{ ...ui, size }" />
          </component>
        </els-transition-collapse>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { useId, useCore } from '#imports'
import { basis } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const el = {
  ...basis,
  wrapper: 'relative !min-h-[auto] !min-w-[auto] overflow-hidden',
  container: '!overflow-hidden ml-2.5 mb-1',
  base: 'group relative flex items-center w-full transition gap-1.5 select-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-75',
  static: 'cursor-auto',
  title: 'truncate relative',
  active: 'text-primary bg-gray-6',
  inactive: 'text-labels-primary hover:text-primary hover:bg-gray-6',
  leadingIcon: {
    base: 'relative ml-2.5',
    active: '',
    inactive: '',
  },
  trailingIcon: {
    base: 'ml-auto mr-1 transition-transform',
    active: 'rotate-90',
    inactive: '',
  },
}

const config = mergeConfig<typeof el>(appConfig.ui?.strategy as Strategy, null, el)

type Props = {
  entries?: Portfolios.NavigatorItem[]
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config>
}
</script>
