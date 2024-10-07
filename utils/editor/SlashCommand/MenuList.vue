<script setup lang="ts">
import type { MenuListProps } from './types'

const props = withDefaults(defineProps<MenuListProps>(), {})

const scrollContainer = ref<HTMLDivElement>()
const activeItem = ref<HTMLButtonElement>()

const datasets = reactive({
  selectedGroupIndex: 0,
  selectedCommandIndex: 0,
})

watch(
  () => props.items,
  () => {
    datasets.selectedCommandIndex = 0
    datasets.selectedGroupIndex = 0
  },
)

const selectItem = (groupIndex: number, commandIndex: number) => {
  const command = props.items[groupIndex].commands[commandIndex]
  props.command(command)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    if (!props.items.length) {
      return false
    }

    const commands = props.items[datasets.selectedGroupIndex].commands

    let newCommandIndex = datasets.selectedCommandIndex + 1
    let newGroupIndex = datasets.selectedGroupIndex

    if (commands.length - 1 < newCommandIndex) {
      newCommandIndex = 0
      newGroupIndex = datasets.selectedGroupIndex + 1
    }

    if (props.items.length - 1 < newGroupIndex) {
      newGroupIndex = 0
    }

    datasets.selectedCommandIndex = newCommandIndex
    datasets.selectedGroupIndex = newGroupIndex

    return true
  }

  if (event.key === 'ArrowUp') {
    if (!props.items.length) {
      return false
    }

    let newCommandIndex = datasets.selectedCommandIndex - 1
    let newGroupIndex = datasets.selectedGroupIndex

    if (newCommandIndex < 0) {
      newGroupIndex = datasets.selectedGroupIndex - 1
      newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0
    }

    if (newGroupIndex < 0) {
      newGroupIndex = props.items.length - 1
      newCommandIndex = props.items[newGroupIndex].commands.length - 1
    }

    datasets.selectedCommandIndex = newCommandIndex
    datasets.selectedGroupIndex = newGroupIndex

    return true
  }

  if (event.key === 'Enter') {
    if (!props.items.length || datasets.selectedGroupIndex === -1 || datasets.selectedCommandIndex === -1) {
      return false
    }

    selectItem(datasets.selectedGroupIndex, datasets.selectedCommandIndex)

    return true
  }

  return false
}

watch(
  () => datasets,
  () => {
    if (activeItem.value.current && scrollContainer.value.current) {
      const offsetTop = activeItem.value.current.offsetTop
      const offsetHeight = activeItem.value.current.offsetHeight

      scrollContainer.value.current.scrollTop = offsetTop - offsetHeight
    }
  },
)

const createCommandClickHandler = (groupIndex: number, commandIndex: number) => {
  return () => {
    selectItem(groupIndex, commandIndex)
  }
}

defineExpose({
  scrollContainer,
  onKeyDown,
})
</script>

<template>
  <tiptap-ui-surface
    v-if="items.length"
    ref="scrollContainer"
    class="text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-2"
    @keydown="onKeyDown"
  >
    <div class="grid grid-cols-1 gap-0.5">
      <template v-for="(group, groupIndex) in props.items" :key="`${group.title}-wrapper`">
        <div class="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5">
          {{ group.title }}
        </div>
        <template v-for="(command, commandIndex) in group.commands" :key="command.label">
          <tiptap-ui-dropdown-button
            :ref="datasets.selectedGroupIndex === groupIndex && datasets.selectedCommandIndex === commandIndex ? activeItem : null"
            :is-active="datasets.selectedGroupIndex === groupIndex && datasets.selectedCommandIndex === commandIndex"
            @click="createCommandClickHandler(groupIndex, commandIndex)"
          >
            <!--            <els-icon :name="command.iconName" class="mr-1" /> -->
            {{ command.label }}
          </tiptap-ui-dropdown-button>
        </template>
      </template>
    </div>
  </tiptap-ui-surface>
</template>
