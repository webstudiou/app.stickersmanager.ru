<script setup lang="ts">
import { provideUseId, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

defineOptions({
  name: 'ProjectBrowserDefaultLeading',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  entries: () => [],
  size: 'md',
  class: undefined,
  ui: () => ({}),
})

const emits = defineEmits<{
  (e: 'update:entries', value: Portfolios.NavigatorItem[]): void
}>()

const { ui, attrs } = useCore('project-browser-default-leading', toRef(props, 'ui'), config, toRef(props, 'class'))

let Draggable: any
await import('vuedraggable' as string).then((_Draggable) => {
  Draggable = _Draggable
}).catch()

const options = {
  animation: 0,
  group: 'project-browser',
  delay: 0,
  dragClass: 'el-drag',
  ghostClass: 'el-ghost',
}

// const isDragging = ref(false)

function onChangeCollapse(_entry: Portfolios.NavigatorItem, collapsed: boolean) {
  _entry.collapsed = collapsed
  emits('update:entries', props.entries)
}

const getLinkProps = (_entry: Portfolios.NavigatorItem) => {
  return getNuxtLinkProps({
    ..._entry,
    to: _entry.type === 'project' ? { name: 'dashboard-projects-project_id', params: { project_id: _entry.id } } : null,
    active: false,
  })
}

const getActions = (_entry: Portfolios.NavigatorItem) => {
  const actions: DropdownItem[] = []
  switch (_entry.type) {
    case 'project': {
      break
    }
    case 'portfolio': {
      actions.push({
        icon: 'edit',
        title: 'buttons.edit.title',
      })
      actions.push({
        icon: 'delete',
        title: 'buttons.delete.title',
      })
      break
    }
    default: break
  }

  return [actions]
}

provideUseId(() => useId())
</script>

<template>
  <component
    :is="Draggable"
    :list="entries"
    v-bind="{ ...options, ...attrs }"
    tag="ul"
    item-key="id"
    class="relative !min-h-[auto] !min-w-[auto] list-none overflow-hidden ps-2.5"
  >
    <!-- suppress VueUnrecognizedSlot -->
    <template #item="{ element: entry }">
      <li class="!overflow-hidden list-item">
        <component
          :is="entry.children?.length ? Disclosure : 'div'"
          v-slot="slotProps"
          :default-open="!entry.collapsed"
          as="div"
        >
          <component :is="entry.children?.length ? DisclosureButton : 'div'" as="template">
            <els-link
              v-slot="{ isActive }"
              v-bind="entry.children?.length ? { disabled: entry.disabled } : getLinkProps(entry)"
              :class="[
                'group el relative flex items-center flex-shrink-0 w-full transition gap-1.5 select-none mb-[4px] pt-[4px] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-75',
                'h-[calc(var(--row-min-height)-5px)]',
                'border-b border-transparent',
              ]"
              active-class="text-primary"
              :inactive-class="(entry.type === 'portfolio' && entry.children?.length) ? 'cursor-auto' : 'text-labels-primary hover:text-primary'"
              draggable="false"
              @click="onChangeCollapse(entry, slotProps?.open)"
            >
              <els-icon :name="entry.type === 'portfolio' ? (slotProps?.open ? 'folder-open' : entry.type) : entry.type" :size="ui.icons[size]" :class="['relative', (isActive || slotProps?.open) && 'text-primary']" />

              <span :class="['truncate relative', (entry.type === 'portfolio' && slotProps?.open) && 'text-primary']">
                {{ entry.title }}
              </span>

              <els-icon
                v-if="entry.children?.length"
                :size="ui.icons[size]"
                name="chevron-right"
                :class="['ml-auto mr-1 transition-transform', slotProps?.open && 'rotate-90 text-primary']"
              />

              <els-dropdown
                mode="hover"
                size="sm"
                :items="getActions(entry)"
                :ui="{ shadow: '', width: 'min-w-[150px]' }"
                :popper="{ strategy: 'fixed', placement: 'bottom-end' }"
              >
                <els-icon :size="ui.icons[size]" name="chevron-right" />
              </els-dropdown>
            </els-link>
          </component>
          <els-transition-collapse>
            <component
              :is="entry.children?.length ? DisclosurePanel : 'div'"
              v-if="slotProps?.open || !entry.children?.length"
              static
              as="template"
            >
              <project-browser-default-leading :size :entries="entry.children" />
            </component>
          </els-transition-collapse>
        </component>
      </li>
    </template>
  </component>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { basis } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof basis>(appConfig.ui?.strategy as Strategy, appConfig.ui.basis, basis)

type Props = {
  entries?: Portfolios.NavigatorItem[]
  size?: ELEMENTS.SIZE
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
