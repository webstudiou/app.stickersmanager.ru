<script setup lang="ts">
import Tippy from 'tippy.js/headless'

const props = withDefaults(defineProps<TooltipProps>(), {
  children: undefined,
  enabled: true,
  title: undefined,
  shortcut: () => [],
  tippyOptions: undefined,
  content: undefined,
})

const renderTooltip = (attrs: TippyProps) => (
  h(
    'span',
    {
      class: 'flex items-center gap-2 px-2.5 py-1 bg-white border border-neutral-100 rounded-lg shadow-sm z-[999]',
      tabIndex: -1,
    },
    [
      props.title && h(
        'span',
        {
          class: 'text-xs font-medium text-neutral-500',
        },
        [props.title],
      ),
      props.shortcut && h(
        'span',
        {
          class: 'flex items-center gap-0.5',
        },
        ['1'],
      ),
    ],
  )
)
</script>

<template>
  <Tippy
    v-if="enabled"
    :delay="500"
    :offset="[0, 8]"
    :touch="false"
    z-ndex="99999"
    :append-to="document.body"
    v-bind="{ ...tippyOptions }"
    :render="renderTooltip"
  >
    <span>
      <slot />
    </span>
  </Tippy>
</template>

<script lang="ts">
import type { Placement, Props } from 'tippy.js'

interface TooltipProps {
  children?: string | VNode
  enabled?: boolean
  title?: string
  shortcut?: string[]
  tippyOptions?: Omit<Partial<Props>, 'content'>
  content?: VNode
}

interface TippyProps {
  'data-placement': Placement
  'data-reference-hidden'?: string
  'data-escaped'?: string
}
</script>
